// app/blog/search/page.tsx
import { client } from '@/sanity/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const POSTS_PER_PAGE = 10;

type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  description?: string;
  tags?: string[];
  thumbnail?: {
    asset: { url: string };
    alt?: string;
  };
};

// ── Data Fetching ──
async function searchPosts(
  query: string,
  tag: string,
  sort: string,
  page: number
): Promise<{ posts: Post[]; total: number }> {
  const filters = [`_type == "post"`];
  const params: Record<string, string> = {};

  if (tag) {
    filters.push(`$tag in tags`);
    params.tag = tag;
  }

  if (query) {
    filters.push(`(title match $queryWild || description match $queryWild)`);
    params.queryWild = `${query}*`;
  }

  const groqFilter = filters.join(' && ');

  // ── Sort order ──
  const order =
    sort === 'oldest' ? 'publishedAt asc'
    : sort === 'az'   ? 'title asc'
    : sort === 'za'   ? 'title desc'
    :                   'publishedAt desc'; // default: newest

  const start = (page - 1) * POSTS_PER_PAGE;
  const end   = start + POSTS_PER_PAGE;

  const projection = `{
    title,
    "slug": slug.current,
    publishedAt,
    description,
    tags,
    thumbnail {
      asset-> { url },
      alt
    }
  }`;

  // Fetch paginated posts and total count in one go
  const [posts, total] = await Promise.all([
    client.fetch<Post[]>(
      `*[${groqFilter}] | order(${order}) [${start}...${end}] ${projection}`,
      params,
      { next: { revalidate: 60 } }
    ),
    client.fetch<number>(
      `count(*[${groqFilter}])`,
      params,
      { next: { revalidate: 60 } }
    ),
  ]);

  return { posts, total };
}

async function getAllTags(): Promise<string[]> {
  const tags = await client.fetch<string[]>(
    `array::unique(array::compact(*[_type == "post" && defined(tags)].tags[]))`,
    {},
    { next: { revalidate: 60 } }
  );
  return [...tags].sort();
}

// ── Types ──
type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: string;
    page?: string;
  }>;
};

// ── SEO Metadata ──
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const { q, tag } = await searchParams;

  const title = q
    ? `Search results for "${q}" · Sam Nicklaus`
    : tag
    ? `Posts tagged "${tag}" · Sam Nicklaus`
    : 'Blog Search · Sam Nicklaus';

  const description = q
    ? `Browse blog posts matching "${q}" on samnicklaus.com.`
    : tag
    ? `All blog posts tagged with "${tag}" on samnicklaus.com.`
    : 'Search and filter all blog posts on samnicklaus.com.';

  return {
    title,
    alternates: {
      canonical: '/blog/search',
    },
    description,
    robots: 'noindex, nofollow',
  };
}

// ── Page Component ──
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, tag, sort, page } = await searchParams;

  const query        = q    ?? '';
  const resolvedTag  = tag  ?? '';
  const resolvedSort = sort ?? 'newest';
  const resolvedPage = Math.max(1, parseInt(page ?? '1', 10));

  const [{ posts, total }, allTags] = await Promise.all([
    searchPosts(query, resolvedTag, resolvedSort, resolvedPage),
    getAllTags(),
  ]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  const heading =
    resolvedTag && !query
      ? `Posts tagged "${resolvedTag}"`
      : query && !resolvedTag
      ? `Results for "${query}"`
      : query && resolvedTag
      ? `Results for "${query}" in "${resolvedTag}"`
      : 'All Posts';

  // ── Helper to build URLs preserving existing params ──
  function buildUrl(overrides: Record<string, string | number>) {
    const params = new URLSearchParams();
    if (query)                     params.set('q',    query);
    if (resolvedTag)               params.set('tag',  resolvedTag);
    if (resolvedSort !== 'newest') params.set('sort', resolvedSort);
    if (resolvedPage !== 1)        params.set('page', String(resolvedPage));
    Object.entries(overrides).forEach(([k, v]) => {
      if (v === '' || v === 'newest' || v === 1) {
        params.delete(k);
      } else {
        params.set(k, String(v));
      }
    });
    const qs = params.toString();
    return `/blog/search${qs ? `?${qs}` : ''}`;
  }

  return (
    <main className="bg-white min-h-screen text-slate-800">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* ── Back Link ── */}
        <Link
          href="/blog"
          className="text-sm text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Blog
        </Link>

        {/* ── Heading ── */}
        <h1 className="text-3xl font-bold text-slate-800 mb-6">{heading}</h1>

        {/* ── Filter Bar ── */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl">

          {/* Sort */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Sort By
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'newest', label: '🕒 Newest' },
                { value: 'oldest', label: '📅 Oldest' },
                { value: 'az',     label: '🔤 A → Z'  },
                { value: 'za',     label: '🔤 Z → A'  },
              ].map(({ value, label }) => (
                <Link
                  key={value}
                  href={buildUrl({ sort: value, page: 1 })}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                    resolvedSort === value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Filter by Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {/* All tags option */}
                <Link
                  href={buildUrl({ tag: '', page: 1 })}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                    !resolvedTag
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  All
                </Link>
                {allTags.map((t) => (
                  <Link
                    key={t}
                    href={buildUrl({ tag: t, page: 1 })}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                      resolvedTag === t
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Active filters + clear */}
          {(query || resolvedTag || resolvedSort !== 'newest') && (
            <div className="flex items-center gap-2 w-full pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-400">Active filters:</span>
              {query && (
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                  Search: {query}
                </span>
              )}
              {resolvedTag && (
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                  Tag: {resolvedTag}
                </span>
              )}
              {resolvedSort !== 'newest' && (
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                  Sort: {resolvedSort}
                </span>
              )}
              <Link
                href="/blog/search"
                className="ml-auto text-xs text-red-400 hover:text-red-600 hover:underline"
              >
                ✕ Clear all
              </Link>
            </div>
          )}
        </div>

        {/* ── Result Count ── */}
        <p className="text-sm text-slate-400 mb-6">
          {total} {total === 1 ? 'post' : 'posts'} found
          {totalPages > 1 && ` · Page ${resolvedPage} of ${totalPages}`}
        </p>

        {/* ── Empty State ── */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 mt-16 text-center">
            <p className="text-slate-500 text-lg font-medium">No posts found.</p>
            <p className="text-slate-400 text-sm">
              Try a different search term or browse by tag.
            </p>
            <Link
              href="/blog/search"
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              ← Clear filters
            </Link>
          </div>
        ) : (
          <>
            {/* ── Results List ── */}
            <div className="flex flex-col gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-4 border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                >
                  {/* Thumbnail */}
                  {post.thumbnail?.asset?.url && (
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={post.thumbnail.asset.url}
                        alt={post.thumbnail.alt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-1">
                    <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {post.tags?.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {/* Prev */}
                {resolvedPage > 1 ? (
                  <Link
                    href={buildUrl({ page: resolvedPage - 1 })}
                    className="px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-150"
                  >
                    ← Prev
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-sm rounded-xl border border-slate-100 text-slate-300 cursor-not-allowed">
                    ← Prev
                  </span>
                )}

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isNearCurrent = Math.abs(p - resolvedPage) <= 1;
                  const isEdge = p === 1 || p === totalPages;

                  if (!isNearCurrent && !isEdge) {
                    if (p === 2 || p === totalPages - 1) {
                      return (
                        <span key={p} className="text-slate-400 text-sm px-1">
                          …
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Link
                      key={p}
                      href={buildUrl({ page: p })}
                      className={`w-9 h-9 flex items-center justify-center text-sm rounded-xl border transition-colors duration-150 ${
                        p === resolvedPage
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}

                {/* Next */}
                {resolvedPage < totalPages ? (
                  <Link
                    href={buildUrl({ page: resolvedPage + 1 })}
                    className="px-4 py-2 text-sm rounded-xl border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors duration-150"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-sm rounded-xl border border-slate-100 text-slate-300 cursor-not-allowed">
                    Next →
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
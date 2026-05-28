// app/blog/[slug]/page.tsx
import { client } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogSidebar from '@/components/BlogSidebar';
import Image from 'next/image';

// ── Types ──
type Post = {
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  body: any[];
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    keywords?: string[];
    noIndex?: boolean;
  };
};

// ── Data Fetching ──
async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      description,
      tags,
      body,
      "thumbnailUrl": thumbnail.asset->url,
      "thumbnailAlt": thumbnail.alt,
      seo {
        metaTitle,
        metaDescription,
        "ogImageUrl": ogImage.asset->url,
        keywords,
        noIndex
      }
    }`,
    { slug }
  );
}

// ── Static Params ──
export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

// ── SEO Metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const metaTitle       = post.seo?.metaTitle       || post.title;
  const metaDescription = post.seo?.metaDescription || post.description;
  const ogImage         = post.seo?.ogImageUrl       || post.thumbnailUrl;
  const keywords        = post.seo?.keywords?.length
                            ? post.seo.keywords
                            : post.tags;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    robots: post.seo?.noIndex
      ? 'noindex, nofollow'
      : 'index, follow',
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  };
}

// ── Page Component ──
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <main className="bg-white min-h-screen text-slate-800">
      <Navbar />

      {/* ── Page Wrapper ── */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* ── Two Column Layout: stacks on mobile, side-by-side on lg ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ── LEFT: Article ── */}
          <article className="flex-1 min-w-0">

            {/* ── Back Button ── */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* ── Top Tags ── */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ── Title ── */}
            <h1 className="text-4xl font-bold text-slate-800 mb-3 leading-tight">
              {post.title}
            </h1>

            {/* ── Date ── */}
            <p className="text-sm text-slate-400 mb-4">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            {/* ── Description ── */}
            <p className="text-lg text-slate-500 leading-relaxed mb-8 border-l-4 border-blue-200 pl-4 italic">
              {post.description}
            </p>

            {/* ── Thumbnail ── */}
            {post.thumbnailUrl && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 shadow-sm">
                <Image
                  src={post.thumbnailUrl}
                  alt={post.thumbnailAlt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* ── Divider ── */}
            <div className="border-t border-blue-100 mb-10" />

            {/* ── Body ── */}
            <div className="prose prose-slate max-w-none">
              <PortableText value={post.body} />
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-blue-100 mt-12 pt-6">

              {/* ── Bottom Tags ── */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </article>

          {/* ── RIGHT: Sidebar — moves below article on mobile ── */}
          <BlogSidebar />

        </div>
      </div>

      <Footer />
    </main>
  );
}
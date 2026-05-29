import type { Metadata } from 'next';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/imageUrl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/BlogSidebar';

// ── Types ──
type Post = {
  title: string;
  slug: string;
  publishedAt: string;
  description: string;
  tags: string[];
  thumbnail?: {
    asset: { _ref: string };
    alt?: string;
  };
};

// ── SEO Metadata ──
export const metadata: Metadata = {
  title: 'Sam Nicklaus Blog | PLM, Teamcenter & Software Insights',
  description:
    'Explore articles on PLM solutions, Siemens Teamcenter, software implementation, systems engineering, and smart manufacturing — written by a practicing PLM consultant.',
  keywords: [
    'PLM blog',
    'Teamcenter blog',
    'Product Lifecycle Management',
    'Siemens Teamcenter',
    'PLM solutions',
    'software implementation',
    'systems engineering',
    'smart manufacturing',
    'MBSE',
    'CAD PDM',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Blog | PLM, Teamcenter & Software Insights',
    description:
      'Thoughts on PLM systems, Siemens Teamcenter, software engineering, and everything in between.',
    type: 'website',
    url: 'https://samnicklaus.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | PLM, Teamcenter & Software Insights',
    description:
      'Thoughts on PLM systems, Siemens Teamcenter, software engineering, and everything in between.',
  },
};

// ── Data Fetching ──
async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...6] {
      title,
      "slug": slug.current,
      publishedAt,
      description,
      tags,
      thumbnail {
        asset,
        alt
      }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

// ── Page Component ──
export default async function BlogPage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <main className="bg-white min-h-screen text-slate-800">
      <Navbar />

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'PLM & Teamcenter Blog',
            description:
              'Articles on PLM solutions, Siemens Teamcenter, software implementation, and systems engineering.',
            url: 'https://yoursite.com/blog',
            author: {
              '@type': 'Person',
              name: 'Sam Nicklaus',
            },
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.publishedAt,
              url: `https://yoursite.com/blog/${post.slug}`,
            })),
          }),
        }}
      />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* ── Page Title ── */}
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to my Blog!</h1>
        <p className="text-slate-500 mb-8">
          Thoughts on software, PLM systems, and everything in between.
        </p>

        {/* ── Two Column Layout ── */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── LEFT: Article Grid ── */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-3 border-b border-blue-100">
              Recent Articles
            </h2>

            {posts.length === 0 && (
              <p className="text-slate-400">No posts yet. Check back soon!</p>
            )}

            {/* ── 2-Column Card Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <div
                  key={post.slug}
                  className="group bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* ── Thumbnail ── */}
                  {post.thumbnail?.asset ? (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative w-full h-44 overflow-hidden">
                        <Image
                          src={urlFor(post.thumbnail).width(600).url()}
                          alt={post.thumbnail.alt ?? post.title}
                          fill
                          loading="eager"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  ) : (
                    /* ── Fallback if no thumbnail ── */
                    <div className="w-full h-44 bg-blue-50 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-blue-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* ── Card Body ── */}
                  <div className="flex flex-col flex-1 p-5">

                    {/* ── Tags (top - category style) ── */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
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
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200 leading-snug mb-1">
                        {post.title}
                      </h3>
                    </Link>

                    {/* ── Date ── */}
                    <p className="text-xs text-slate-400 mb-2">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    {/* ── Description ── */}
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    {/* ── Read More ── */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      Read more →
                    </Link>

                    {/* ── Divider ── */}
                    <div className="border-t border-blue-50 mt-4 pt-3">

                      {/* ── Tags (bottom - all tags) ── */}
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

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <BlogSidebar posts={posts} />

        </div>
      </section>

      <Footer />
    </main>
  );
}

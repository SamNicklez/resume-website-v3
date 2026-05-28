// app/blog/[slug]/page.tsx
import { client } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Post = {
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  body: any[];
};

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      publishedAt,
      description,
      tags,
      body
    }`,
    { slug }
  );
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  );
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

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
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 flex gap-12 items-start">

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

        {/* ── RIGHT: Sticky Sidebar ── */}
        <aside className="w-64 shrink-0 sticky top-32 self-start">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 text-center">

            {/* ── Avatar ── */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-blue-600">
              S
            </div>

            {/* ── Name & Title ── */}
            <h3 className="text-sm font-semibold text-slate-800">Sam Nicklaus</h3>
            <p className="text-xs text-slate-400 mt-0.5">Software Implementation Consultant</p>

            {/* ── Divider ── */}
            <div className="border-t border-blue-50 my-4" />

            {/* ── Bio ── */}
            <p className="text-xs text-slate-500 leading-relaxed">
              Passionate about PLM, systems engineering, and building tools that make engineers' lives easier.
            </p>

            {/* ── Buttons ── */}
            <div className="flex flex-col gap-3 mt-5">

              {/* ── LinkedIn Button ── */}
              <a
                href="https://www.linkedin.com/in/sam-nicklaus/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Let's Connect
              </a>

              {/* ── Contact Button ── */}
              <a
                href="/#contact"
                className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Contact
              </a>

            </div>
          </div>
        </aside>

      </div>

      <Footer />
    </main>
  );
}
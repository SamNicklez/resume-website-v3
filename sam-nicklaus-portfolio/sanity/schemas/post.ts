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
type Attachment = {
  label?: string;
  file?: {
    asset?: {
      url: string;
      originalFilename?: string;
      size?: number;
      mimeType?: string;
    };
  };
};

type Post = {
  title: string;
  publishedAt: string;
  description: string;
  tags: string[];
  body: any[];
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  attachments?: Attachment[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
    keywords?: string[];
    noIndex?: boolean;
  };
};

// ── Portable Text Custom Components ──
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-slate-800 mt-10 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-slate-800 mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-slate-700 mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-base text-slate-600 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-300 pl-4 italic text-slate-500 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-slate-600">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-slate-600">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-slate-800">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-slate-600">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-slate-100 text-blue-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
};

// ── File Size Formatter ──
function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── File Icon by MIME type ──
function FileIcon({ mimeType }: { mimeType?: string }) {
  if (mimeType?.includes('pdf')) {
    return (
      <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM9.5 17H8v-5h1.5c1.1 0 1.75.65 1.75 1.75S10.6 15.5 9.5 15.5H9v1.5zm0-2.75H9v1.25h.5c.4 0 .75-.2.75-.625S9.9 14.25 9.5 14.25zm4.25 2.75h-1.5v-5h1.5c1.38 0 2.25.87 2.25 2.5s-.87 2.5-2.25 2.5zm0-3.5h-.5v2h.5c.75 0 1.25-.45 1.25-1s-.5-1-1.25-1zm4.25 0v1h1.5v1.25H18V17h-1v-5h3v1.25H18z"/>
      </svg>
    );
  }
  if (mimeType?.includes('image')) {
    return (
      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (mimeType?.includes('zip') || mimeType?.includes('compressed')) {
    return (
      <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  }
  // Default file icon
  return (
    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

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
      attachments[] {
        label,
        file {
          asset-> {
            url,
            originalFilename,
            size,
            mimeType
          }
        }
      },
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
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
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

  const validAttachments = post.attachments?.filter(
    (a) => a.file?.asset?.url
  ) ?? [];

  return (
    <main className="bg-white min-h-screen text-slate-800">
      <Navbar />

      {/* ── Page Wrapper ── */}
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

        {/* ── Two Column Layout ── */}
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
            <div className="max-w-none">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>

            {/* ── Downloadable Files ── */}
            {validAttachments.length > 0 && (
              <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">

                {/* Section Header */}
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <h2 className="text-base font-semibold text-slate-700">
                    Downloadable Files
                  </h2>
                  <span className="ml-auto text-xs text-slate-400">
                    {validAttachments.length} {validAttachments.length === 1 ? 'file' : 'files'}
                  </span>
                </div>

                {/* File List */}
                <ul className="flex flex-col gap-3">
                  {validAttachments.map((attachment, index) => {
                    const { url, originalFilename, size, mimeType } =
                      attachment.file!.asset!;
                    const label =
                      attachment.label || originalFilename || `File ${index + 1}`;
                    const fileSize = formatFileSize(size);

                    return (
                      <li key={index}>
                        <a
                          href={url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all duration-200 group"
                        >
                          {/* Icon */}
                          <FileIcon mimeType={mimeType} />

                          {/* Label + filename */}
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                              {label}
                            </span>
                            {originalFilename && attachment.label && (
                              <span className="text-xs text-slate-400 truncate">
                                {originalFilename}
                              </span>
                            )}
                          </div>

                          {/* File size + download icon */}
                          <div className="ml-auto flex items-center gap-2 shrink-0">
                            {fileSize && (
                              <span className="text-xs text-slate-400">
                                {fileSize}
                              </span>
                            )}
                            <svg
                              className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

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

          {/* ── RIGHT: Sidebar ── */}
          <BlogSidebar />

        </div>
      </div>

      <Footer />
    </main>
  );
}
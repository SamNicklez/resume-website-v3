// components/BlogSidebar.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Post = {
  tags?: string[];
};

type BlogSidebarProps = {
  posts?: Post[];
};

export default function BlogSidebar({ posts }: BlogSidebarProps) {
  const router = useRouter();

  const allTags = posts
    ? [...new Set(posts.flatMap((p) => p.tags ?? []))]
    : [];

  function handleTagClick(tag: string) {
    router.push(`/blog/search?tag=${encodeURIComponent(tag)}`);
  }

  return (
    <aside className="w-full lg:w-72 flex flex-col gap-6 shrink-0">

      {/* ── Bio Card ── */}
      <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
          <Image
            src="/SNicklaus_Headshot.png"
            alt="Sam Nicklaus"
            sizes="80px"
            fill
            className="object-cover"
          />
        </div>

        <h3 className="text-lg font-bold text-slate-800">Sam Nicklaus</h3>
        <p className="text-sm text-blue-600 font-medium mb-3">
          Software Engineer & PLM Consultant
        </p>
        <p className="text-sm text-slate-500 leading-relaxed">
          MSSE student at Weber State University. I write about software
          engineering, PLM systems, and building cool things on the web.
        </p>

        <div className="flex flex-col gap-3 mt-5">
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

      {/* ── Browse by Tag Card ── */}
      {allTags.length > 0 && (
        <div className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
            Browse by Tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full font-medium hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
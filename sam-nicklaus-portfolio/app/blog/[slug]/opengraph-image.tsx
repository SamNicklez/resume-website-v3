import { ImageResponse } from 'next/og';
import { client } from '@/sanity/client';

export const runtime = 'nodejs';
export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 }; // ← stays the same (meta tag hint only)
export const contentType = 'image/png';

// ── Fetch just what we need for the OG image ──
async function getPostMeta(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      description,
      publishedAt,
      tags,
      "thumbnailUrl": thumbnail.asset->url,
      seo {
        metaTitle,
        metaDescription,
      }
    }`,
    { slug }
  );
}

// ── OG Image Component ──
export default async function PostOGImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostMeta(params.slug);

  const title       = post?.seo?.metaTitle       || post?.title       || 'Blog Post';
  const description = post?.seo?.metaDescription || post?.description || '';
  const date        = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const tags = post?.tags?.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '2400px',               // ← 2x
          height: '1260px',              // ← 2x
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '144px 160px',        // ← 2x
          fontFamily: 'sans-serif',
          borderTop: '16px solid #2563eb', // ← 2x
        }}
      >
        {/* ── Top: Site Label ── */}
        <div
          style={{
            fontSize: '40px',            // ← 2x
            color: '#2563eb',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Sam Nicklaus · Blog
        </div>

        {/* ── Middle: Title + Description ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}> {/* ← 2x gap */}

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '24px' }}> {/* ← 2x gap */}
              {tags.map((tag: string) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '2px solid #bfdbfe',   // ← 2x
                    borderRadius: '999px',
                    padding: '12px 36px',           // ← 2x
                    fontSize: '36px',               // ← 2x
                    color: '#2563eb',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: '116px',         // ← 2x
              fontWeight: 800,
              color: '#1e293b',
              lineHeight: 1.1,
              maxWidth: '1800px',        // ← 2x
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: '48px',        // ← 2x
                color: '#64748b',
                lineHeight: 1.5,
                maxWidth: '1720px',      // ← 2x
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </div>
          )}
        </div>

        {/* ── Bottom: Date + URL ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '36px', color: '#94a3b8' }}>{date}</div> {/* ← 2x */}
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '2px solid #bfdbfe',  // ← 2x
              borderRadius: '999px',
              padding: '20px 48px',          // ← 2x
              fontSize: '36px',              // ← 2x
              color: '#2563eb',
              fontWeight: 600,
            }}
          >
            samnicklaus.com/blog
          </div>
        </div>

      </div>
    ),
    {
      width: 2400,  // ← 2x output
      height: 1260, // ← 2x output
    }
  );
}
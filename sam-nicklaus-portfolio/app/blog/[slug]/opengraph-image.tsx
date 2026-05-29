import { ImageResponse } from 'next/og';
import { client } from '@/sanity/client';

export const runtime = 'nodejs';
export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 };
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
          width: '1200px',
          height: '630px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          borderTop: '8px solid #2563eb',
        }}
      >
        {/* ── Top: Site Label ── */}
        <div
          style={{
            fontSize: '20px',
            color: '#2563eb',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Sam Nicklaus · Blog
        </div>

        {/* ── Middle: Title + Description ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {tags.map((tag: string) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '999px',
                    padding: '6px 18px',
                    fontSize: '18px',
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
              fontSize: '58px',
              fontWeight: 800,
              color: '#1e293b',
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: '24px',
                color: '#64748b',
                lineHeight: 1.5,
                maxWidth: '860px',
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
          <div style={{ fontSize: '18px', color: '#94a3b8' }}>{date}</div>
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              color: '#2563eb',
              fontWeight: 600,
            }}
          >
            yoursite.com/blog
          </div>
        </div>

      </div>
    ),
    { ...size }
  );
}
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'PLM & Teamcenter Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function BlogOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          borderTop: '8px solid #2563eb',
        }}
      >
        {/* ── Top Label ── */}
        <div
          style={{
            fontSize: '20px',
            color: '#2563eb',
            fontWeight: 600,
            marginBottom: '24px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Sam Nicklaus · Blog
        </div>

        {/* ── Main Heading ── */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#1e293b',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          PLM, Teamcenter &amp; Software Insights
        </div>

        {/* ── Subtitle ── */}
        <div
          style={{
            fontSize: '26px',
            color: '#64748b',
            lineHeight: 1.5,
          }}
        >
          Thoughts on software, PLM systems, and everything in between.
        </div>

        {/* ── Bottom Badge ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
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
    ),
    { ...size }
  );
}
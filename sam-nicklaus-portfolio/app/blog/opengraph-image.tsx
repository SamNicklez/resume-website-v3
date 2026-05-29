import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'PLM & Teamcenter Blog';
export const size = { width: 1200, height: 630 }; // ← stays the same (meta tag hint only)
export const contentType = 'image/png';

export default function BlogOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '2400px',           // ← 2x
          height: '1260px',          // ← 2x
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '160px',          // ← 2x
          fontFamily: 'sans-serif',
          borderTop: '16px solid #2563eb', // ← 2x
        }}
      >
        {/* ── Top Label ── */}
        <div
          style={{
            fontSize: '40px',        // ← 2x
            color: '#2563eb',
            fontWeight: 600,
            marginBottom: '48px',    // ← 2x
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Sam Nicklaus · Blog
        </div>

        {/* ── Main Heading ── */}
        <div
          style={{
            fontSize: '128px',       // ← 2x
            fontWeight: 800,
            color: '#1e293b',
            lineHeight: 1.1,
            marginBottom: '48px',    // ← 2x
          }}
        >
          PLM, Teamcenter & Software Insights
        </div>

        {/* ── Subtitle ── */}
        <div
          style={{
            fontSize: '52px',        // ← 2x
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
            bottom: '120px',         // ← 2x
            right: '160px',          // ← 2x
            backgroundColor: '#eff6ff',
            border: '2px solid #bfdbfe', // ← 2x
            borderRadius: '999px',
            padding: '20px 48px',    // ← 2x
            fontSize: '36px',        // ← 2x
            color: '#2563eb',
            fontWeight: 600,
          }}
        >
          samnicklaus.com/blog
        </div>
      </div>
    ),
    {
      width: 2400,  // ← 2x output
      height: 1260, // ← 2x output
    }
  );
}
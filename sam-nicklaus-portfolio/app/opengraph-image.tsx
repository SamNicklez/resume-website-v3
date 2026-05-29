import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Sam Nicklaus | PLM Consultant & Defense Systems Specialist';
export const size = { width: 1200, height: 630 }; // ← stays the same (meta tag hint only)
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '2400px',                 // ← 2x
          height: '1260px',                // ← 2x
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '144px 160px',          // ← 2x
          fontFamily: 'sans-serif',
          borderTop: '16px solid #2563eb', // ← 2x
        }}
      >

        {/* ── Top: Site Label ── */}
        <div
          style={{
            fontSize: '40px',              // ← 2x
            color: '#2563eb',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          samnicklaus.com
        </div>

        {/* ── Middle: Name + Title + Description ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}> {/* ← 2x gap */}

          {/* Name */}
          <div
            style={{
              fontSize: '144px',           // ← 2x
              fontWeight: 800,
              color: '#1e293b',
              lineHeight: 1.0,
            }}
          >
            Sam Nicklaus
          </div>

          {/* Job Title Badges */}
          <div style={{ display: 'flex', gap: '24px' }}> {/* ← 2x gap */}
            {['PLM Consultant', 'Defense Systems', 'MSSE Student'].map((label) => (
              <div
                key={label}
                style={{
                  backgroundColor: '#eff6ff',
                  border: '2px solid #bfdbfe',  // ← 2x
                  borderRadius: '999px',
                  padding: '16px 40px',          // ← 2x
                  fontSize: '36px',              // ← 2x
                  color: '#2563eb',
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '48px',            // ← 2x
              color: '#64748b',
              lineHeight: 1.5,
              maxWidth: '1800px',          // ← 2x
            }}
          >
            Teamcenter PLM consultant specializing in Active Workspace, BMIDE,
            and workflow development for mission-critical U.S. defense programs.
          </div>

        </div>

        {/* ── Bottom: Credentials Bar ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left: Credentials */}
          <div style={{ display: 'flex', gap: '24px' }}> {/* ← 2x gap */}
            {['Siemens Government Technologies', 'CompTIA Security+', 'ASEP'].map((cred) => (
              <div
                key={cred}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '2px solid #e2e8f0',  // ← 2x
                  borderRadius: '16px',          // ← 2x
                  padding: '16px 32px',          // ← 2x
                  fontSize: '32px',              // ← 2x
                  color: '#475569',
                  fontWeight: 500,
                }}
              >
                {cred}
              </div>
            ))}
          </div>

          {/* Right: URL pill */}
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '2px solid #bfdbfe',      // ← 2x
              borderRadius: '999px',
              padding: '20px 48px',              // ← 2x
              fontSize: '36px',                  // ← 2x
              color: '#2563eb',
              fontWeight: 600,
            }}
          >
            samnicklaus.com
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
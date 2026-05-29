import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sam Nicklaus | PLM Consultant & Defense Systems Specialist';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          samnicklaus.com
        </div>

        {/* ── Middle: Name + Title + Description ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Name */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#1e293b',
              lineHeight: 1.0,
            }}
          >
            Sam Nicklaus
          </div>

          {/* Job Title Badge */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {['PLM Consultant', 'Defense Systems', 'MSSE Student'].map((label) => (
              <div
                key={label}
                style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '18px',
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
              fontSize: '24px',
              color: '#64748b',
              lineHeight: 1.5,
              maxWidth: '900px',
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
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Siemens Government Technologies', 'CompTIA Security+', 'ASEP'].map((cred) => (
              <div
                key={cred}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '16px',
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
              border: '1px solid #bfdbfe',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              color: '#2563eb',
              fontWeight: 600,
            }}
          >
            samnicklaus.com
          </div>
        </div>

      </div>
    ),
    { ...size }
  );
}
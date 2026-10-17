import { ImageResponse } from 'next/og';

export const alt = 'ResumeBuilder - 100% Free AI Resume Builder & ATS Resume Checker';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#100F0C',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.2), rgba(16, 15, 12, 0))',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#047857',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            RB
          </div>
          <span style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            Resume<span style={{ color: '#10B981' }}>Builder</span>
          </span>
          <span
            style={{
              marginLeft: '12px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            100% Free &amp; Open
          </span>
        </div>

        {/* Main Value Proposition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '960px' }}>
          <h1
            style={{
              fontSize: '56px',
              lineHeight: 1.1,
              fontWeight: '800',
              letterSpacing: '-1.5px',
              margin: 0,
            }}
          >
            Build ATS-Friendly Resumes That Land Interviews.
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#94A3B8',
              margin: 0,
            }}
          >
            30+ recruiter-approved templates, real-time A4 GhostDOM page splitting, vector PDF export, and zero hidden paywalls.
          </p>
        </div>

        {/* Feature Badges Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#E2E8F0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>98% ATS Pass Rate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#E2E8F0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>No Sign-Up Required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#E2E8F0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Instant Vector PDF Download</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', color: '#E2E8F0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Tested on Workday &amp; Taleo</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

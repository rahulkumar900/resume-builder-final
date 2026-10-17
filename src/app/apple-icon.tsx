import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)',
          borderRadius: '40px',
        }}
      >
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 92,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-2px',
          }}
        >
          RB
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

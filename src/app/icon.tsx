import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 18,
            fontWeight: 800,
            color: '#ffffff',
          }}
        >
          R
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}

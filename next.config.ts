import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Opt out native Node.js packages from Server Components bundling
  serverExternalPackages: ['puppeteer', 'mammoth', 'word-extractor'],

  // Image optimization with modern next-gen formats
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

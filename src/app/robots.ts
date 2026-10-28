import { MetadataRoute } from 'next';

const DISALLOWED_PATHS = [
  '/api/',
  '/print/',
  '/auth/',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'PerplexityBot',
          'ChatGPT-User',
          'GPTBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
        ],
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: 'https://resumebabu.com/sitemap.xml',
  };
}

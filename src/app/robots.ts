import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/print/', '/dashboard/', '/dashboard', '/builder/'],
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
        disallow: ['/api/', '/print/', '/dashboard/', '/builder/'],
      },
    ],
    sitemap: 'https://resumebabu.com/sitemap.xml',
  };
}

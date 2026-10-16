import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/print/', '/dashboard/', '/dashboard', '/builder/'],
    },
    sitemap: 'https://resumebuilder.app/sitemap.xml',
  };
}

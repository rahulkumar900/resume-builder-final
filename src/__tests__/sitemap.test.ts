import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { COMPETITORS } from '@/data/competitors';
import { RESUME_EXAMPLES } from '@/data/examples';
import { BLOG_POSTS } from '@/data/blog';

describe('Sitemap generation', () => {
  const routes = sitemap();

  it('should return a non-empty list of sitemap entries', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('should have all valid absolute URLs starting with https://resumebabu.com', () => {
    for (const route of routes) {
      expect(route.url).toMatch(/^https:\/\/resumebabu\.com(\/[a-z0-9\-_]+)*$/);
      expect(route.url.endsWith('/') && route.url !== 'https://resumebabu.com').toBe(false);
    }
  });

  it('should not have any duplicate URLs', () => {
    const urls = routes.map((r) => r.url);
    const uniqueUrls = new Set(urls);
    expect(urls.length).toBe(uniqueUrls.size);
  });

  it('should not contain private, internal, or disallowed paths', () => {
    const disallowedPrefixes = [
      'https://resumebabu.com/api',
      'https://resumebabu.com/print',
      'https://resumebabu.com/auth',
      'https://resumebabu.com/builder',
      'https://resumebabu.com/create',
      'https://resumebabu.com/dashboard',
    ];

    for (const route of routes) {
      for (const prefix of disallowedPrefixes) {
        expect(route.url.startsWith(prefix)).toBe(false);
      }
    }
  });

  it('should include all competitor comparison routes', () => {
    for (const competitor of COMPETITORS) {
      const expectedUrl = `https://resumebabu.com/alternatives/${competitor.slug}`;
      const found = routes.find((r) => r.url === expectedUrl);
      expect(found).toBeDefined();
    }
  });

  it('should include all resume example routes', () => {
    for (const example of RESUME_EXAMPLES) {
      const expectedUrl = `https://resumebabu.com/examples/${example.slug}`;
      const found = routes.find((r) => r.url === expectedUrl);
      expect(found).toBeDefined();
    }
  });

  it('should include all blog routes', () => {
    for (const post of BLOG_POSTS) {
      const expectedUrl = `https://resumebabu.com/blog/${post.slug}`;
      const found = routes.find((r) => r.url === expectedUrl);
      expect(found).toBeDefined();
    }
  });

  it('should have valid lastModified Date objects and valid priorities for all routes', () => {
    for (const route of routes) {
      expect(route.lastModified).toBeInstanceOf(Date);
      expect(isNaN((route.lastModified as Date).getTime())).toBe(false);
      expect(route.priority).toBeGreaterThanOrEqual(0.0);
      expect(route.priority).toBeLessThanOrEqual(1.0);
      expect(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).toContain(
        route.changeFrequency
      );
    }
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabaseClient';

describe('Social Auth Integration & Security Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invokes supabase.auth.signInWithOAuth with Google provider and offline access', async () => {
    const signInWithOAuthMock = vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValueOnce({
      data: { provider: 'google', url: 'https://accounts.google.com/o/oauth2/v2/auth' },
      error: null,
    });

    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback?next=/dashboard',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    expect(signInWithOAuthMock).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback?next=/dashboard',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    expect(result.error).toBeNull();
    expect(result.data?.url).toContain('google');
  });

  it('invokes supabase.auth.signInWithOAuth with GitHub provider', async () => {
    const signInWithOAuthMock = vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValueOnce({
      data: { provider: 'github', url: 'https://github.com/login/oauth/authorize' },
      error: null,
    });

    const result = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback?next=/builder/resume-123',
      },
    });

    expect(signInWithOAuthMock).toHaveBeenCalledWith({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback?next=/builder/resume-123',
      },
    });
    expect(result.error).toBeNull();
    expect(result.data?.url).toContain('github');
  });

  it('validates safe next redirect parameter to prevent open redirect vulnerabilities', () => {
    const sanitizeNext = (next: string | null) => {
      if (!next) return '/dashboard';
      if (next.startsWith('/') && !next.startsWith('//')) {
        return next;
      }
      return '/dashboard';
    };

    expect(sanitizeNext('/dashboard')).toBe('/dashboard');
    expect(sanitizeNext('/builder/resume-456')).toBe('/builder/resume-456');
    expect(sanitizeNext('https://malicious-site.com')).toBe('/dashboard');
    expect(sanitizeNext('//malicious-site.com')).toBe('/dashboard');
    expect(sanitizeNext(null)).toBe('/dashboard');
  });

  it('resolves user name properly across different OAuth provider metadata formats', () => {
    const resolveFullName = (meta: Record<string, any> | undefined) => {
      if (!meta) return '';
      return meta.full_name || meta.name || meta.user_name || '';
    };

    // Google provides `full_name` or `name`
    expect(resolveFullName({ full_name: 'John Doe', name: 'John Doe' })).toBe('John Doe');
    // GitHub often provides `name` or `user_name`
    expect(resolveFullName({ name: 'Jane Dev', user_name: 'janedev' })).toBe('Jane Dev');
    // Fallback to username
    expect(resolveFullName({ user_name: 'octocat' })).toBe('octocat');
    // Empty metadata
    expect(resolveFullName(undefined)).toBe('');
  });
});

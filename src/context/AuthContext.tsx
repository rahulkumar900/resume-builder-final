'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { migrateGuestResumesToAccount, clearLocalResumesCache } from '@/lib/storage';

export interface UserProfile {
  id?: string;
  user_id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  target_market?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  authModalMessage: string | null;
  openAuthModal: (mode?: 'signin' | 'signup', message?: string) => void;
  closeAuthModal: () => void;
  signInWithPassword: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithPassword: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signInWithOAuth: (provider: 'google' | 'github') => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [authModalMessage, setAuthModalMessage] = useState<string | null>(null);

  const ensureUserProfile = async (
    userId: string,
    email?: string,
    fullName?: string
  ): Promise<UserProfile | null> => {
    try {
      // 1. Check if profile exists
      const { data: existing, error: fetchErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (existing) {
        setProfile(existing as UserProfile);
        return existing as UserProfile;
      }

      // 2. Create new profile if not found
      const newProfile: Partial<UserProfile> = {
        user_id: userId,
        email: email || '',
        full_name: fullName || '',
        target_market: 'global',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data: inserted, error: insertErr } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select('*')
        .single();

      if (!insertErr && inserted) {
        setProfile(inserted as UserProfile);
        return inserted as UserProfile;
      } else {
        // Fallback local representation if DB insert returned error (e.g. table not created yet)
        const fallback = newProfile as UserProfile;
        setProfile(fallback);
        return fallback;
      }
    } catch (err) {
      console.warn('[Profile] Error ensuring user profile:', err);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await ensureUserProfile(user.id, user.email, user.user_metadata?.full_name);
    }
  };

  useEffect(() => {
    // 1. Initial session load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      if (session?.user?.id) {
        ensureUserProfile(
          session.user.id,
          session.user.email,
          session.user.user_metadata?.full_name
        ).catch(() => {});
      }
    }).catch((err) => {
      console.warn('Error fetching Supabase session:', err);
      setIsLoading(false);
    });

    // 2. Auth state subscription
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);

      if (currentSession?.user?.id) {
        ensureUserProfile(
          currentSession.user.id,
          currentSession.user.email,
          currentSession.user.user_metadata?.full_name ||
            currentSession.user.user_metadata?.name ||
            currentSession.user.user_metadata?.user_name
        ).catch(() => {});

        if (event === 'SIGNED_IN') {
          migrateGuestResumesToAccount(currentSession.user.id).catch(console.error);
        }
      } else {
        setProfile(null);
        if (event === 'SIGNED_OUT') {
          clearLocalResumesCache();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin', message?: string) => {
    setAuthModalMode(mode);
    setAuthModalMessage(message || null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalMessage(null);
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error && data?.user) {
      await ensureUserProfile(
        data.user.id,
        data.user.email,
        data.user.user_metadata?.full_name
      );
      setIsAuthModalOpen(false);
    }
    return { error };
  };

  const signUpWithPassword = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || '',
        },
      },
    });

    if (!error && data?.user) {
      // Automatically create user profile
      await ensureUserProfile(data.user.id, email, fullName);
      setIsAuthModalOpen(false);
    }
    return { error };
  };

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback?next=/dashboard`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { error };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[Auth] Error signing out of supabase:', err);
    }
    clearLocalResumesCache();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        authModalMessage,
        openAuthModal,
        closeAuthModal,
        signInWithPassword,
        signUpWithPassword,
        signInWithOAuth,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    authModalMessage,
    openAuthModal,
    signInWithPassword,
    signUpWithPassword,
    signInWithOAuth,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode with context state when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    setOauthLoading(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setOauthLoading(provider);

    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        setErrorMessage(error.message);
        setOauthLoading(null);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during social authentication.');
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUpWithPassword(email, password, fullName);
        if (error) {
          setErrorMessage(error.message);
        } else {
          setSuccessMessage('Account created successfully! Your resumes are now backed up in the cloud.');
          setTimeout(() => {
            closeAuthModal();
          }, 1500);
        }
      } else {
        const { error } = await signInWithPassword(email, password);
        if (error) {
          setErrorMessage(error.message);
        } else {
          closeAuthModal();
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#141412] rounded-2xl shadow-2xl border border-slate-100 dark:border-white/[0.08] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 dark:from-emerald-900 dark:to-teal-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <h3 className="font-bold text-lg">
              {mode === 'signin' ? 'Sign In to Kindley' : 'Create Your Account'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${
              mode === 'signin'
                ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 bg-white dark:bg-[#141412]'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${
              mode === 'signup'
                ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 bg-white dark:bg-[#141412]'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            {mode === 'signin'
              ? 'Sign in to access and automatically sync your resumes across all your devices.'
              : 'Sign up to safely persist your resumes in the cloud and access premium export features.'}
          </p>

          {authModalMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-blue-800 text-xs font-medium flex items-center gap-2.5 shadow-xs">
              <Lock className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>{authModalMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Social Auth Buttons (Google & GitHub) */}
          <div className="space-y-2.5 mb-5">
            <button
              type="button"
              disabled={isLoading || !!oauthLoading}
              onClick={() => handleOAuthSignIn('google')}
              className="w-full py-2.5 px-4 bg-white dark:bg-[#181816] hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/10 shadow-2xs hover:border-slate-300 dark:hover:border-white/20 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
            >
              {oauthLoading === 'google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>
                {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
              </span>
            </button>

            <button
              type="button"
              disabled={isLoading || !!oauthLoading}
              onClick={() => handleOAuthSignIn('github')}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-900 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
            >
              {oauthLoading === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
              <span>
                {mode === 'signin' ? 'Sign in with GitHub' : 'Sign up with GitHub'}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 dark:border-white/10 w-full" />
            <span className="bg-white dark:bg-[#141412] px-3 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-white/[0.08] transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-white/[0.08] transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white dark:focus:bg-white/[0.08] transition-all text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {mode === 'signin'
                  ? isLoading ? 'Signing In...' : 'Sign In'
                  : isLoading ? 'Creating Account...' : 'Create Account'}
              </span>
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Sign up now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

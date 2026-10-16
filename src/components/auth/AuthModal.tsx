'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, authModalMessage, openAuthModal, signInWithPassword, signUpWithPassword } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode with context state when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

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
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <h3 className="font-bold text-lg">
              {mode === 'signin' ? 'Sign In to Kindley' : 'Create Your Account'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-center transition-colors ${
              mode === 'signin'
                ? 'text-emerald-700 border-b-2 border-blue-600 bg-white'
                : 'text-slate-500 hover:text-slate-800'
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
                ? 'text-emerald-700 border-b-2 border-blue-600 bg-white'
                : 'text-slate-500 hover:text-slate-800'
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                  className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
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

          <div className="mt-5 text-center text-xs text-slate-500">
            {mode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-emerald-700 hover:underline"
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
                  className="font-bold text-emerald-700 hover:underline"
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

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime error to console or error tracking service
    console.error('Unhandled app route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 font-sans antialiased relative">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Application Error
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred while loading this page. You can retry loading or return safely to the home page.
          </p>
        </div>

        {error?.digest && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-400">
            Error ID: {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Fatal root layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900 antialiased">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">
              System Error
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              A critical error occurred while initializing the application. Please reload or click the button below to recover.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        // 1. Check if Supabase client already established a session from the OAuth redirect URL
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          if (isMounted) setErrorMsg(error.message);
          return;
        }

        if (session) {
          const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
          router.replace(safeNext);
          return;
        }

        // 2. If session is not immediately ready, listen for onAuthStateChange
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
          if (currentSession && isMounted) {
            subscription.unsubscribe();
            const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
            router.replace(safeNext);
          }
        });

        // 3. Fallback timeout to prevent hanging
        const timeout = setTimeout(() => {
          subscription.unsubscribe();
          if (isMounted) {
            router.replace('/dashboard');
          }
        }, 3500);

        return () => {
          subscription.unsubscribe();
          clearTimeout(timeout);
        };
      } catch (err: any) {
        if (isMounted) setErrorMsg(err?.message || 'Error completing authentication');
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [router, next]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#141412] p-4">
      <div className="flex flex-col items-center gap-3 text-center max-w-sm">
        {errorMsg ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm">
            <p className="font-bold mb-1">Authentication Failed</p>
            <p className="text-xs mb-3">{errorMsg}</p>
            <button
              onClick={() => router.replace('/')}
              className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Return Home
            </button>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Signing You In...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connecting your account and synchronizing your resumes.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#141412]">
          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

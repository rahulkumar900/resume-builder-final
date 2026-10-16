'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BlogBackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/blog');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/[0.14] border border-black/[0.06] dark:border-white/[0.08] transition-colors cursor-pointer shrink-0"
      title="Back to previous page"
      aria-label="Back"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Back</span>
    </button>
  );
};

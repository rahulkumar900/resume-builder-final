'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredResumes, createBlankResume } from '@/lib/storage';
import { Loader2 } from 'lucide-react';

export default function BuilderRootPage() {
  const router = useRouter();

  useEffect(() => {
    const resumes = getStoredResumes();
    if (resumes.length > 0) {
      // Redirect to most recent resume
      router.replace(`/builder/${resumes[0].id}`);
    } else {
      // Create new resume and redirect
      const newResume = createBlankResume('prawira');
      router.replace(`/builder/${newResume.id}`);
    }
  }, [router]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      <p className="text-sm font-medium">Opening Resume Builder...</p>
    </div>
  );
}

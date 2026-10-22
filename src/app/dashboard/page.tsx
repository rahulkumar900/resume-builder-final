'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { HeaderSection } from '@/components/dashboard/HeaderSection';
import { MyResumeSection } from '@/components/dashboard/MyResumeSection';
import { QuickActionCards } from '@/components/dashboard/QuickActionCards';
import { Footer } from '@/components/dashboard/Footer';
import { ScoreResumeModal } from '@/components/dashboard/ScoreResumeModal';
import { JobTailorModal } from '@/components/builder/JobTailorModal';
import {
  getStoredResumes,
  saveStoredResumes,
  saveResume,
  deleteResume,
  duplicateResume,
  syncAndFetchUserResumes,
} from '@/lib/storage';
import { ResumeData, TemplateId } from '@/types/resume';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { analyzeResumeAts } from '@/lib/ats/ats-analyzer';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, openAuthModal, isLoading } = useAuth();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [isSyncingCloud, setIsSyncingCloud] = useState<boolean>(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [selectedResumeForScore, setSelectedResumeForScore] = useState<ResumeData | null>(null);
  const [isJobTailorModalOpen, setIsJobTailorModalOpen] = useState(false);
  const [selectedResumeForTailor, setSelectedResumeForTailor] = useState<ResumeData | null>(null);
  const [loadingPdfId, setLoadingPdfId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Always load local resumes immediately so user sees their work without delay
    setResumes(getStoredResumes());

    if (user?.id) {
      setIsSyncingCloud(true);
      syncAndFetchUserResumes(user.id)
        .then((consolidated) => {
          setResumes(consolidated);
        })
        .catch((err) => {
          console.error('[Dashboard] Error synchronizing cloud resumes:', err);
        })
        .finally(() => {
          setIsSyncingCloud(false);
        });
    } else {
      setIsSyncingCloud(false);
    }
  }, [user?.id, isLoading]);

  const handleRefreshCloud = async () => {
    if (!user?.id) return;
    setIsSyncingCloud(true);
    try {
      const refreshed = await syncAndFetchUserResumes(user.id);
      setResumes(refreshed);
    } catch (err) {
      console.error('[Dashboard] Manual refresh failed:', err);
    } finally {
      setIsSyncingCloud(false);
    }
  };

  // Live Summary Stats Computed Directly from Real Resumes
  const draftCount = useMemo(() => resumes.filter((r) => r.status === 'draft').length, [resumes]);
  const completedCount = useMemo(() => resumes.filter((r) => r.status === 'completed').length, [resumes]);

  const avgAtsScore = useMemo(() => {
    if (resumes.length === 0) return null;
    const total = resumes.reduce((acc, r) => acc + analyzeResumeAts(r).overallScore, 0);
    return Math.round(total / resumes.length);
  }, [resumes]);

  const handleSelectTemplate = (templateId: TemplateId) => {
    router.push(`/create?template=${templateId}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this resume?')) {
      const updated = deleteResume(id);
      setResumes([...updated]);
    }
  };

  const handleDuplicate = (id: string) => {
    const duplicated = duplicateResume(id);
    if (duplicated) {
      setResumes(getStoredResumes());
    }
  };

  const handleOpenScore = (resume?: ResumeData) => {
    if (resume) {
      setSelectedResumeForScore(resume);
    } else if (resumes.length > 0) {
      setSelectedResumeForScore(resumes[0]);
    }
    setIsScoreModalOpen(true);
  };

  const handleOpenTailor = (resume?: ResumeData) => {
    if (resume) {
      setSelectedResumeForTailor(resume);
    } else if (resumes.length > 0) {
      setSelectedResumeForTailor(resumes[0]);
    }
    setIsJobTailorModalOpen(true);
  };

  const handleApplyTailoredResumeFromDashboard = (tailoredResume: ResumeData, isNewClone: boolean) => {
    saveResume(tailoredResume);
    const updated = getStoredResumes();
    setResumes([...updated]);
    router.push(`/builder/${tailoredResume.id}`);
  };

  const handleDownloadPdf = async (resume: ResumeData) => {
    if (!user) {
      openAuthModal('signin', 'Please sign in or create an account to download your resume as a PDF.');
      return;
    }

    setLoadingPdfId(resume.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ resumeData: resume }),
      });

      if (res.status === 401) {
        openAuthModal('signin', 'Please sign in or create an account to download your resume.');
        return;
      }

      if (!res.ok) {
        window.open(`/print/${resume.id}`, '_blank');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(resume.title || 'Resume').replace(/[^a-z0-9]/gi, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('PDF export failed:', err);
      if (user) {
        window.open(`/print/${resume.id}`, '_blank');
      }
    } finally {
      setLoadingPdfId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-700 dark:text-emerald-400 mb-3" />
          <p className="text-sm font-semibold text-slate-500">Loading your dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-xs border border-emerald-300/80 dark:border-emerald-800">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Sign In to Access Your Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2.5 mb-8 max-w-md leading-relaxed">
            Your resume dashboard and cloud backups are saved securely to your account. Please sign in or create a free account to view and manage your resumes.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => openAuthModal('signin', 'Sign in to access your resumes and dashboard.')}
              className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-full shadow-xs transition-all cursor-pointer"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-2.5 px-4 bg-white/80 dark:bg-[#161614] hover:bg-white text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-full border border-black/[0.08] dark:border-white/[0.08] transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-border w-full text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => router.push('/create')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors cursor-pointer"
            >
              + Create New Resume
            </button>
            <span>&bull;</span>
            <button
              onClick={() => router.push('/templates')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors cursor-pointer"
            >
              Browse 28+ Templates
            </button>
            <span>&bull;</span>
            <button
              onClick={() => router.push('/examples')}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors cursor-pointer"
            >
              Resume Examples
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
      {/* Clean Authenticated Navbar */}
      <Navbar onOpenScore={() => handleOpenScore()} />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Real Metrics Header (With single prominent + Create New Resume button) */}
        <HeaderSection
          userName={userName}
          totalResumes={resumes.length}
          draftCount={draftCount}
          completedCount={completedCount}
          avgAtsScore={avgAtsScore}
          onNewResume={() => router.push('/create')}
          onOpenScore={() => handleOpenScore()}
        />

        {/* My Resumes: Front & Center */}
        <MyResumeSection
          resumes={resumes}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onDownloadPdf={handleDownloadPdf}
          onScoreResume={handleOpenScore}
          onTailorResume={handleOpenTailor}
          loadingPdfId={loadingPdfId}
          isSyncingCloud={isSyncingCloud}
          onRefreshCloud={user ? handleRefreshCloud : undefined}
        />

        {/* Real ATS & Job Matching Hub */}
        <QuickActionCards
          onScoreResume={() => handleOpenScore()}
          onOpenJobScanner={() => handleOpenTailor()}
        />

        {/* Clean Template Discovery Banner */}
        <div className="bg-gradient-to-r from-emerald-100/60 to-emerald-50/40 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-2xl border border-emerald-300/60 dark:border-emerald-800/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Looking for a different layout? Explore all 28+ ATS-Compliant Templates
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Verified single and two-column layouts tested against Workday, Taleo, and Greenhouse parsers.
            </p>
          </div>
          <button
            onClick={() => router.push('/templates')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-full shadow-2xs transition-all self-start sm:self-center cursor-pointer shrink-0"
          >
            <span>Browse Templates</span>
          </button>
        </div>
      </main>

      {/* Real Platform Footer */}
      <Footer />

      {/* Modals */}
      <ScoreResumeModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        resumes={resumes}
        initialResumeId={selectedResumeForScore?.id}
      />

      {/* Flagship Job-Specific Resume Tailor Modal */}
      {selectedResumeForTailor && (
        <JobTailorModal
          isOpen={isJobTailorModalOpen}
          onClose={() => setIsJobTailorModalOpen(false)}
          resume={selectedResumeForTailor}
          onApplyTailoredResume={handleApplyTailoredResumeFromDashboard}
        />
      )}
    </div>
  );
}

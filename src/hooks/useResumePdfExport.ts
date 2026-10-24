/**
 * @fileoverview Custom React Hook for Exporting and Printing Resumes as PDF.
 * Encapsulates authentication checks, serverless PDF generation requests,
 * and high-DPI browser print window navigation.
 */

import { useState, useCallback } from 'react';
import { ResumeData } from '@/types/resume';
import { supabase } from '@/lib/supabaseClient';
import { analyzeResumeAts, AtsSuggestion } from '@/lib/ats/ats-analyzer';

export interface UseResumePdfExportOptions {
  resume: ResumeData | null;
  user: any;
  openAuthModal: (mode: 'signin' | 'signup', message?: string) => void;
  flushSave: () => void;
  onCriticalIssuesDetected?: (
    criticalIssues: AtsSuggestion[],
    proceedDownload: () => Promise<void>
  ) => void;
}

export interface UseResumePdfExportReturn {
  isDownloading: boolean;
  handleDownloadPdf: (skipCriticalCheck?: boolean) => Promise<void>;
  handlePrint: () => void;
}

/**
 * Handles exporting a resume to PDF via backend Puppeteer generation.
 * Enforces authentication so unauthenticated users are prompted to log in/sign up.
 * Authenticated users with critical ATS check issues are prompted with a confirmation warning.
 */
export function useResumePdfExport({
  resume,
  user,
  openAuthModal,
  flushSave,
  onCriticalIssuesDetected,
}: UseResumePdfExportOptions): UseResumePdfExportReturn {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = useCallback(async (skipCriticalCheck = false) => {
    flushSave();
    if (!resume) return;

    // Enforce Authentication: If not logged in, prompt sign in / create account
    if (!user) {
      openAuthModal('signin', 'Please sign in or create a free account to download your PDF resume.');
      return;
    }

    // Critical ATS Issues Check: Prompt confirmation modal if critical errors exist
    if (!skipCriticalCheck && onCriticalIssuesDetected) {
      const audit = analyzeResumeAts(resume);
      const critical = (audit?.suggestions || []).filter((s) => s.severity === 'critical');
      if (critical.length > 0) {
        onCriticalIssuesDetected(critical, async () => {
          await handleDownloadPdf(true);
        });
        return;
      }
    }

    setIsDownloading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ resumeData: resume }),
      });

      if (res.status === 401) {
        openAuthModal('signin', 'Please sign in or create an account to download your resume.');
        return;
      }

      if (!res.ok) {
        window.open(`/print/${resume.id}?autoPrint=true`, '_blank');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(resume.personalInfo?.fullName || resume.title).replace(/[^a-z0-9]/gi, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('PDF generation failed, falling back to print preview:', err);
      window.open(`/print/${resume.id}?autoPrint=true`, '_blank');
    } finally {
      setIsDownloading(false);
    }
  }, [resume, user, openAuthModal, flushSave, onCriticalIssuesDetected]);

  const handlePrint = useCallback(() => {
    flushSave();
    if (!resume) return;
    window.open(`/print/${resume.id}`, '_blank');
  }, [resume, flushSave]);

  return {
    isDownloading,
    handleDownloadPdf,
    handlePrint,
  };
}

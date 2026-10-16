/**
 * @fileoverview Custom React Hook for Exporting and Printing Resumes as PDF.
 * Encapsulates authentication checks, serverless PDF generation requests,
 * and high-DPI browser print window navigation.
 */

import { useState, useCallback } from 'react';
import { ResumeData } from '@/types/resume';
import { supabase } from '@/lib/supabaseClient';

export interface UseResumePdfExportOptions {
  resume: ResumeData | null;
  user: any;
  openAuthModal: (mode: 'signin' | 'signup', message?: string) => void;
  flushSave: () => void;
}

export interface UseResumePdfExportReturn {
  isDownloading: boolean;
  handleDownloadPdf: () => Promise<void>;
  handlePrint: () => void;
}

/**
 * Handles exporting a resume to PDF via backend Puppeteer generation or browser print fallback.
 * Allows frictionless guest export via browser vector print while offering 1-click cloud PDF for signed-in users.
 */
export function useResumePdfExport({
  resume,
  user,
  openAuthModal,
  flushSave,
}: UseResumePdfExportOptions): UseResumePdfExportReturn {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    flushSave();
    if (!resume) return;

    // Frictionless Guest Export: If not logged in, immediately open print view with auto-print
    if (!user) {
      window.open(`/print/${resume.id}?autoPrint=true`, '_blank');
      return;
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
  }, [resume, user, openAuthModal, flushSave]);

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

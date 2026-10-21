'use client';

import React, { useEffect, useState, use } from 'react';
import { getResumeById, getStoredResumes } from '@/lib/storage';
import { ResumeData } from '@/types/resume';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';
import { getPageFormatConfig } from '@/lib/page-format';
import { useAuth } from '@/context/AuthContext';
import { Printer, ArrowLeft, CloudUpload, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PrintPageProps {
  params: Promise<{ id: string }>;
}

export default function PrintResumePage({ params }: PrintPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { user, openAuthModal } = useAuth();
  const [resume, setResume] = useState<ResumeData | null>(null);

  const handleBackToEditor = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(`/builder/${resume?.id || id}`);
    }
  };

  useEffect(() => {
    const found = getResumeById(id);
    if (found) {
      setResume(found);
    } else {
      const list = getStoredResumes();
      if (list.length > 0) setResume(list[0]);
    }
  }, [id]);

  // Auto-trigger print dialog if requested
  useEffect(() => {
    if (resume && typeof window !== 'undefined' && window.location.search.includes('autoPrint=true')) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [resume]);

  const formatConfig = getPageFormatConfig(resume?.layout?.format);

  if (!resume) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-semibold text-slate-500">
        Preparing document for print...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white flex flex-col items-center py-6 print:py-0 print:m-0">
      {/* Print Toolbar - Hidden in Print Mode */}
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-3 w-full px-4" style={{ maxWidth: `${formatConfig.widthMm}mm` }}>
        <button
          type="button"
          onClick={handleBackToEditor}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Editor</span>
        </button>

        {/* Guest vs Logged In Status Pill */}
        {!user ? (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-full text-[11px] font-medium">
            <span>Free Guest Export Active</span>
            <span className="text-amber-400">•</span>
            <button
              type="button"
              onClick={() => openAuthModal('signup', 'Create a free account to back up and sync your resumes across all devices.')}
              className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer inline-flex items-center gap-1"
            >
              <CloudUpload className="w-3 h-3" />
              <span>Save to Free Cloud</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full text-[11px] font-medium">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>High-DPI Vector Export Ready</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* A4 Document Container */}
      <div className="bg-transparent print:w-auto print:m-0 print:p-0" style={{ width: `${formatConfig.widthMm}mm` }}>
        <ResumeRenderer data={resume} isPrint={true} />
      </div>

      {/* Embedded Print CSS */}
      <style jsx global>{`
        @page {
          size: ${formatConfig.cssPageSize};
          margin: 0;
        }
        @media print {
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

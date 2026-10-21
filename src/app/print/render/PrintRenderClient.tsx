'use client';

import React, { useEffect, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';
import { getPageFormatConfig } from '@/lib/page-format';

interface PrintRenderClientProps {
  initialResume: ResumeData | null;
}

export function PrintRenderClient({ initialResume }: PrintRenderClientProps) {
  const [resume, setResume] = useState<ResumeData | null>(initialResume);

  useEffect(() => {
    if (resume) return;

    if (typeof window !== 'undefined') {
      // 1. Check worker injected window variable
      const workerData = (window as any).__WORKER_RESUME_DATA__;
      if (workerData) {
        setResume(workerData);
        return;
      }

      // 2. Check sessionStorage fallback
      try {
        const stored = sessionStorage.getItem('worker_resume_data');
        if (stored) {
          setResume(JSON.parse(stored));
          return;
        }
      } catch (e) {
        // ignore
      }
    }
  }, [resume]);

  if (!resume) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8 text-sm text-slate-500 font-medium">
        Document not found for export.
      </div>
    );
  }

  const formatConfig = getPageFormatConfig(resume.layout?.format);

  return (
    <div className="print-render-container bg-white m-0 p-0 w-full flex flex-col items-center print:block print:w-auto">
      <ResumeRenderer data={resume} isPrint={true} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: ${formatConfig.cssPageSize};
              margin: 0;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              html, body, .print-render-container, #a4-resume-document {
                display: block !important;
                width: ${formatConfig.widthMm}mm !important;
                margin: 0 auto !important;
                padding: 0 !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}

import React, { use } from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';
import { getRenderResume } from '@/lib/render-store';
import { getResumeById } from '@/lib/storage';

interface PageProps {
  searchParams: Promise<{ id?: string; data?: string }>;
}

export default function PrintRenderPage({ searchParams }: PageProps) {
  const { id, data: dataParam } = use(searchParams);

  let resume: ResumeData | null = null;

  if (id) {
    resume = getRenderResume(id);
    if (!resume) {
      resume = getResumeById(id);
    }
  }

  if (!resume && dataParam) {
    try {
      resume = JSON.parse(dataParam);
    } catch {
      try {
        const decoded = decodeURIComponent(dataParam);
        resume = JSON.parse(decoded);
      } catch (e) {
        console.error('Failed to parse dataParam:', e);
      }
    }
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8 text-sm text-slate-500 font-medium">
        Document not found for export.
      </div>
    );
  }

  return (
    <div className="print-render-container bg-white m-0 p-0 w-full flex flex-col items-center print:block print:w-auto">
      <ResumeRenderer data={resume} isPrint={true} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 portrait;
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
                width: 210mm !important;
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

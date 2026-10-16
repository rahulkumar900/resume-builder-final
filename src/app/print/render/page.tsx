import React, { use } from 'react';
import { ResumeData } from '@/types/resume';
import { getRenderResume } from '@/lib/render-store';
import { getResumeById } from '@/lib/storage';
import { PrintRenderClient } from './PrintRenderClient';

interface PageProps {
  searchParams: Promise<{ id?: string; data?: string }>;
}

export default function PrintRenderPage({ searchParams }: PageProps) {
  const { id, data: dataParam } = use(searchParams);

  let initialResume: ResumeData | null = null;

  if (id) {
    initialResume = getRenderResume(id);
    if (!initialResume) {
      initialResume = getResumeById(id);
    }
  }

  if (!initialResume && dataParam) {
    try {
      initialResume = JSON.parse(dataParam);
    } catch {
      try {
        const decoded = decodeURIComponent(dataParam);
        initialResume = JSON.parse(decoded);
      } catch (e) {
        console.error('Failed to parse dataParam:', e);
      }
    }
  }

  return <PrintRenderClient initialResume={initialResume} />;
}


import React from 'react';
import type { Metadata } from 'next';
import { TemplatesShowcaseClient } from '@/components/templates/TemplatesShowcaseClient';

export const metadata: Metadata = {
  title: '30+ Free ATS-Friendly Resume Templates | ResumeBuilder',
  description:
    'Explore 30+ professionally engineered, ATS-compliant resume templates. Tested across Workday, Taleo, and Greenhouse with instant A4 pagination and custom color palettes.',
  keywords: [
    'resume templates',
    'free resume templates',
    'ATS resume templates',
    'single column resume',
    'two column resume',
    'Harvard resume format',
    'modern CV template',
    'fresher resume format',
  ],
  alternates: {
    canonical: 'https://resumebuilder.app/templates',
  },
  openGraph: {
    title: '30+ Free ATS-Friendly Resume Templates | ResumeBuilder',
    description:
      'Browse and customize 30+ ATS-optimized resume templates. 100% free with real-time vector PDF export.',
    url: 'https://resumebuilder.app/templates',
    siteName: 'ResumeBuilder',
    locale: 'en_US',
    type: 'website',
  },
};

export default function TemplatesShowcasePage() {
  return <TemplatesShowcaseClient />;
}

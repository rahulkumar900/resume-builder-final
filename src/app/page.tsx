import React from 'react';
import type { Metadata } from 'next';
import { RxNavbar } from '@/components/home/RxNavbar';
import { TechStudioLanding } from '@/components/home/TechStudioLanding';

export const metadata: Metadata = {
  title: {
    absolute: 'ResumeBabu - Free AI Resume Builder & ATS Checker',
  },
  description:
    'Build an ATS-friendly resume tailored to any job description. 30 free templates, instant A4 pagination, and vector PDF exports without watermarks.',
  alternates: {
    canonical: 'https://resumebabu.com',
  },
  openGraph: {
    title: 'ResumeBabu - Free AI Resume Builder & ATS Resume Checker',
    description:
      'Create an ATS-friendly resume tailored to your target job. 30 templates, real-time A4 page-split, vector PDF export without watermark or subscription.',
    url: 'https://resumebabu.com',
    siteName: 'ResumeBabu',
    locale: 'en_US',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900 antialiased relative">
      {/* Top Tech Studio Sticky Navigation */}
      <RxNavbar />

      {/* Modern High-End Tech Studio Landing Page */}
      <main id="main">
        <TechStudioLanding />
      </main>
    </div>
  );
}

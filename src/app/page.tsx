import React from 'react';
import type { Metadata } from 'next';
import { RxNavbar } from '@/components/home/RxNavbar';
import { RxStoryScenes } from '@/components/home/RxStoryScenes';
import { ScrollProgressBar } from '@/components/home/ScrollProgressBar';

export const metadata: Metadata = {
  title: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Checker',
  description:
    'Build an ATS-friendly resume tailored to any job description. 30 professional templates, instant real-time A4 formatting, and vector PDF exports without paywalls or hidden watermarks.',
  alternates: {
    canonical: 'https://resumebuilder.app',
  },
  openGraph: {
    title: 'ResumeBuilder - 100% Free AI Resume Builder & ATS Resume Checker',
    description:
      'Create an ATS-friendly resume tailored to your target job. 30 templates, real-time A4 page-split, vector PDF export without watermark or subscription.',
    url: 'https://resumebuilder.app',
    siteName: 'ResumeBuilder',
    locale: 'en_US',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900 antialiased relative">
      {/* Global Scroll-Driven Progress Bar */}
      <ScrollProgressBar />

      {/* Top Editorial Sticky Navigation with Story Tabs & Lightbulb Switcher */}
      <RxNavbar />

      {/* Complete Scroll-Driven Story Experience */}
      <main id="main">
        <RxStoryScenes />
      </main>
    </div>
  );
}

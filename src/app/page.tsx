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

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ResumeBabu really 100% free with no watermarks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely. Unlike other resume builders that charge $19–$34/mo subscriptions at the download screen, ResumeBabu generates clean, full-resolution vector PDFs with zero watermarks, zero paywalls, and zero hidden credit card prompts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the 30-Point ATS Auditor ensure my resume passes parser algorithms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applicant Tracking Systems like Workday, Taleo, Greenhouse, and Lever often fail to parse floating textboxes, tables, and complex columns. ResumeBabu generates single-layer semantic vector trees with tested typography that parse at a 98.4%+ pass rate across major ATS platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Google X-Y-Z formula for bullet points?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Google recruiters recommend framing accomplishments as: 'Accomplished [X], as measured by [Y], by doing [Z]'. ResumeBabu integrates this AI bullet rewriter to transform weak job duties into quantified, high-impact business achievements.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does ResumeBabu store or sell my personal career data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never. Your resume drafts are saved securely in your browser local storage. If you choose to log in, data is encrypted via Cloud Firestore under strict per-user security rules. ResumeBabu does not sell user data to recruiters or third-party advertisers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I tailor my resume to different job descriptions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Paste any job posting into ResumeBabu's AI Job Tailor tool, and it instantly analyzes required keywords, highlights skill gaps, and suggests tailored bullet improvements to maximize your ATS match score.",
      },
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-100 selection:text-emerald-900 antialiased relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {/* Top Tech Studio Sticky Navigation */}
      <RxNavbar />

      {/* Modern High-End Tech Studio Landing Page */}
      <main id="main">
        <TechStudioLanding />
      </main>
    </div>
  );
}

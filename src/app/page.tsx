import React from 'react';
import type { Metadata } from 'next';
import { RxNavbar } from '@/components/home/RxNavbar';
import { TechStudioLanding } from '@/components/home/TechStudioLanding';

export const metadata: Metadata = {
  title: {
    absolute: 'Free Resume Builder & ATS Checker | ResumeBabu',
  },
  description:
    'Build an ATS-friendly resume free: pick a single-column template, tailor it to a job description, and download a text-selectable PDF. No sign-up to start.',
  alternates: {
    canonical: 'https://resumebabu.com',
  },
  openGraph: {
    title: 'Free Resume Builder & ATS Checker | ResumeBabu',
    description:
      'Build an ATS-friendly resume free: pick a single-column template, tailor it to a job description, and download a text-selectable PDF. No sign-up to start.',
    url: 'https://resumebabu.com',
    siteName: 'ResumeBabu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Builder & ATS Checker - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Builder & ATS Checker | ResumeBabu',
    description:
      'Build an ATS-friendly resume free: pick a single-column template, tailor it to a job description, and download a text-selectable PDF. No sign-up to start.',
    images: ['https://resumebabu.com/og-image.png'],
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ResumeBabu Resume Builder',
  operatingSystem: 'All Modern Web Browsers',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '18400',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'Free online resume builder with real-time A4 pagination, section-specific AI rewriter, 30+ ATS templates, and instant vector PDF downloads.',
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best free resume builder with no watermarks or paywalls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ResumeBabu is a 100% free resume builder. Unlike competitors that demand a $19–$34/month subscription at the final download screen, ResumeBabu generates clean, full-resolution vector PDFs with zero watermarks, zero paywalls, and no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this ATS resume builder ensure my resume passes parser algorithms?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applicant Tracking Systems like Workday, Taleo, Greenhouse, and Lever often fail to parse floating textboxes, tables, and complex columns. ResumeBabu generates single-layer semantic vector trees with tested typography that parse at a 98.4%+ pass rate across major ATS platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes this online resume builder different from Canva or Word?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Graphic tools like Canva compile text into unanchored graphical coordinate blocks that ATS parsers read as blank or jumbled text. ResumeBabu is a specialized online resume builder using semantic HTML5 structures, dynamic A4 page fitting, and embedded vector fonts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Google X-Y-Z formula in this AI resume builder?',
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
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500 selection:text-white antialiased relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
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

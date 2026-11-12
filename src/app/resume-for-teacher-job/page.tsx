import React from 'react';
import { Metadata } from 'next';
import { MainTeacherPage } from '@/components/teacher-cluster/MainTeacherPage';

export const metadata: Metadata = {
  title: 'Resume for Teacher Job: Format & Samples',
  description:
    'Build a resume for teacher job vacancies. Free fresher, experienced, PRT, TGT & PGT samples, 2026 writing guide, and instant Word & PDF download.',
  keywords: [
    'resume for teacher job',
    'teacher resume format',
    'resume for teacher job for freshers',
    'resume for experienced teacher',
    'resume for primary teacher job',
    'resume for pgt teacher job',
    'resume for tgt teacher job',
    'teacher resume builder',
  ],
  openGraph: {
    title: 'Resume for Teacher Job: Format & Samples (2026) | ResumeBabu',
    description:
      'Build a resume for teacher job vacancies. Free fresher, experienced, PRT, TGT & PGT samples, 2026 writing guide, and instant Word & PDF download.',
    type: 'website',
    url: 'https://resumebabu.com/resume-for-teacher-job',
    siteName: 'ResumeBabu',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume for Teacher Job - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume for Teacher Job: Format & Samples (2026) | ResumeBabu',
    description:
      'Build a resume for teacher job vacancies. Free fresher, experienced, PRT, TGT & PGT samples, 2026 writing guide, and instant Word & PDF download.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-for-teacher-job',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://resumebabu.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resume for Teacher Job',
          item: 'https://resumebabu.com/resume-for-teacher-job',
        },
      ],
    },
    {
      '@type': 'WebApplication',
      name: 'ResumeBabu Teacher Resume Builder',
      url: 'https://resumebabu.com/resume-for-teacher-job',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Free ATS-friendly teacher resume builder with fresher, experienced, PRT, TGT, and PGT samples plus Word and PDF export.',
    },
  ],
};

export default function ResumeForTeacherJobPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainTeacherPage />
    </>
  );
}

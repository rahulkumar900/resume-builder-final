import React from 'react';
import type { Metadata } from 'next';
import { ResumeExamplesHubClient } from '@/components/examples/ResumeExamplesHubClient';

export const metadata: Metadata = {
  title: '20+ Recruiter Resume Examples & Guides',
  description:
    'Browse 20+ recruiter-approved resume examples with proven STAR bullet points, ATS formatting, and free templates for tech, freshers, and business roles.',
  keywords: [
    'resume examples',
    'software engineer resume sample',
    'fresher resume format',
    'product manager resume example',
    'ATS resume examples',
    'data scientist resume',
    'BTech resume sample',
  ],
  alternates: {
    canonical: 'https://resumebabu.com/examples',
  },
  openGraph: {
    title: 'Resume Examples & Samples for Every Job Title (2026) | ResumeBabu',
    description:
      'Proven, high-scoring resume samples tailored for top Indian and global hiring bars. 1-click editable and ATS-optimized.',
    url: 'https://resumebabu.com/examples',
    siteName: 'ResumeBabu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Examples & Samples - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Examples & Samples for Every Job Title (2026)',
    description:
      'Proven, high-scoring resume samples tailored for top Indian and global hiring bars. 1-click editable and ATS-optimized.',
    images: ['https://resumebabu.com/og-image.png'],
  },
};

export default function ResumeExamplesHubPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Resume Examples',
        item: 'https://resumebabu.com/examples',
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resume Examples & Samples for Every Job Title',
    description:
      'Browse 20+ recruiter-approved resume examples with proven STAR bullet points and ATS-friendly formatting.',
    url: 'https://resumebabu.com/examples',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <ResumeExamplesHubClient />
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { ResumeExamplesHubClient } from '@/components/examples/ResumeExamplesHubClient';

export const metadata: Metadata = {
  title: 'Resume Examples & Samples for Every Job Title (2026)',
  description:
    'Browse 20+ recruiter-approved resume examples with proven STAR bullet points, ATS-friendly formatting, and 1-click editable templates for software engineers, product managers, freshers, and data scientists.',
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
    canonical: 'https://resumebuilder.app/examples',
  },
  openGraph: {
    title: 'Resume Examples & Samples for Every Job Title (2026) | ResumeBuilder',
    description:
      'Proven, high-scoring resume samples tailored for top Indian and global hiring bars. 1-click editable and ATS-optimized.',
    url: 'https://resumebuilder.app/examples',
    siteName: 'ResumeBuilder',
    locale: 'en_US',
    type: 'website',
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
        item: 'https://resumebuilder.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume Examples',
        item: 'https://resumebuilder.app/examples',
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resume Examples & Samples for Every Job Title',
    description:
      'Browse 20+ recruiter-approved resume examples with proven STAR bullet points and ATS-friendly formatting.',
    url: 'https://resumebuilder.app/examples',
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

import React from 'react';
import type { Metadata } from 'next';
import { TemplatesShowcaseClient } from '@/components/templates/TemplatesShowcaseClient';

export const metadata: Metadata = {
  title: '30+ Free ATS-Friendly Resume Templates',
  description:
    'Explore 30+ professionally engineered, ATS-compliant resume templates. Tested across Workday and Taleo with instant A4 pagination and free PDF downloads.',
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
    canonical: 'https://resumebabu.com/templates',
  },
  openGraph: {
    title: '30+ Free ATS-Friendly Resume Templates | ResumeBabu',
    description:
      'Browse and customize 30+ ATS-optimized resume templates. 100% free with real-time vector PDF export.',
    url: 'https://resumebabu.com/templates',
    siteName: 'ResumeBabu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '30+ Free ATS-Friendly Resume Templates - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '30+ Free ATS-Friendly Resume Templates',
    description:
      'Browse and customize 30+ ATS-optimized resume templates. 100% free with real-time vector PDF export.',
    images: ['https://resumebabu.com/og-image.png'],
  },
};

export default function TemplatesShowcasePage() {
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
        name: 'Templates',
        item: 'https://resumebabu.com/templates',
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '30+ Free ATS-Friendly Resume Templates',
    description:
      'Explore 30+ professionally engineered, ATS-compliant resume templates tested across Workday, Taleo, and Greenhouse with instant A4 pagination.',
    url: 'https://resumebabu.com/templates',
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
      <TemplatesShowcaseClient />
    </>
  );
}

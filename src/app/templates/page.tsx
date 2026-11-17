import React from 'react';
import type { Metadata } from 'next';
import { TemplatesShowcaseClient } from '@/components/templates/TemplatesShowcaseClient';

export const metadata: Metadata = {
  title: 'Free Resume Templates: ATS-Friendly & Fresher',
  description:
    'Browse free resume templates by role and experience: single-column ATS-safe layouts, fresher and campus formats, and Indian CV styles. Download as PDF.',
  alternates: {
    canonical: 'https://resumebabu.com/templates',
  },
  openGraph: {
    title: 'Free Resume Templates: ATS-Friendly & Fresher | ResumeBabu',
    description:
      'Browse free resume templates by role and experience: single-column ATS-safe layouts, fresher and campus formats, and Indian CV styles. Download as PDF.',
    url: 'https://resumebabu.com/templates',
    siteName: 'ResumeBabu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Templates - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Templates: ATS-Friendly & Fresher | ResumeBabu',
    description:
      'Browse free resume templates by role and experience: single-column ATS-safe layouts, fresher and campus formats, and Indian CV styles. Download as PDF.',
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

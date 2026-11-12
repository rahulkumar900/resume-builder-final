import type { Metadata } from 'next';
import type { SubPageData } from '@/data/teacher-cluster/subpages';

const BASE_URL = 'https://resumebabu.com';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export function buildTeacherSubpageMetadata(data: SubPageData): Metadata {
  const canonicalUrl = `${BASE_URL}${data.path}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${data.metaTitle} | ResumeBabu`,
      description: data.metaDescription,
      type: 'article',
      url: canonicalUrl,
      siteName: 'ResumeBabu',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${data.h1} - ResumeBabu`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.metaTitle} | ResumeBabu`,
      description: data.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export function buildTeacherSubpageJsonLd(data: SubPageData) {
  const canonicalUrl = `${BASE_URL}${data.path}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resume for Teacher Job',
            item: `${BASE_URL}/resume-for-teacher-job`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: data.h1,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: data.h1,
        description: data.metaDescription,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'ResumeBabu',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'ResumeBabu',
          url: BASE_URL,
        },
      },
    ],
  };
}

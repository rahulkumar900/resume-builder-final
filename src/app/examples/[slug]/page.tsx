import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { RESUME_EXAMPLES, getResumeExampleBySlug } from '@/lib/examples-data';
import { ResumeExampleDetailClient } from '@/components/examples/ResumeExampleDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESUME_EXAMPLES.map((example) => ({
    slug: example.slug,
  }));
}

const EXAMPLE_SEO_TITLES: Record<string, string> = {
  'software-engineer-resume': 'Software Engineer Resume Example',
  'btech-fresher-resume': 'B.Tech Fresher Resume Example',
  'frontend-developer-resume': 'Frontend Developer Resume Example',
  'data-analyst-resume': 'Data Analyst Resume Example',
  'naukri-resume-format': 'Naukri IT Resume Format Guide',
  'mba-resume': 'MBA & Product Manager Resume Example',
  'bca-fresher-resume': 'BCA Fresher Resume Example',
  'bcom-fresher-resume': 'B.Com Fresher Resume Example',
  'mechanical-engineer-fresher-resume': 'Mechanical Engineer Resume Example',
  'cgpa-resume-format': 'CGPA Placement Resume Format',
  'backend-developer-resume': 'Backend Developer Resume Example',
  'hr-resume': 'HR Executive Resume Example',
  'digital-marketing-resume': 'Digital Marketing Resume Example',
  'accountant-resume': 'Senior Accountant Resume Example',
  'sales-resume': 'B2B Sales Executive Resume Example',
  'fresher-resume-india': 'Fresher Resume Format India',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = getResumeExampleBySlug(slug);

  if (!example) {
    return {
      title: 'Resume Example Not Found',
    };
  }

  const seoTitle = EXAMPLE_SEO_TITLES[slug] || `${example.role.slice(0, 30)} Resume Example`;

  return {
    title: seoTitle,
    description: example.metaDescription,
    keywords: [
      `${example.role} resume`,
      `${example.role} resume example`,
      `${example.role} resume format`,
      'ATS resume format',
      'free resume builder',
      ...example.targetKeywords,
    ],
    openGraph: {
      title: `${seoTitle} | ResumeBabu`,
      description: example.metaDescription,
      type: 'article',
      url: `https://resumebabu.com/examples/${example.slug}`,
      images: [
        {
          url: 'https://resumebabu.com/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${seoTitle} - ResumeBabu`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seoTitle} | ResumeBabu`,
      description: example.metaDescription,
      images: ['https://resumebabu.com/twitter-image'],
    },
    alternates: {
      canonical: `https://resumebabu.com/examples/${example.slug}`,
    },
  };
}

export default async function ResumeExampleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const example = getResumeExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  // Schema.org Structured Data for Google Rich Snippets (Valid TechArticle, no invalid JobPosting)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${example.role} Resume Example & Guide`,
    description: example.metaDescription,
    image: 'https://resumebabu.com/opengraph-image',
    datePublished: '2026-01-15T00:00:00Z',
    dateModified: '2026-10-25T00:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'ResumeBabu Editorial Team',
      url: 'https://resumebabu.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ResumeBabu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://resumebabu.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://resumebabu.com/examples/${example.slug}`,
    },
    about: {
      '@type': 'Thing',
      name: example.role,
      description: `${example.role} career profile and ATS resume format`,
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
      {/* Google Rich Snippet Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ResumeExampleDetailClient example={example} />
      </main>

      <Footer />
    </div>
  );
}

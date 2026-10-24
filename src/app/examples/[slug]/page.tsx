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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = getResumeExampleBySlug(slug);

  if (!example) {
    return {
      title: 'Resume Example Not Found | ResumeBabu',
    };
  }

  return {
    title: `${example.title} | Free ATS Template & Keywords`,
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
      title: `${example.title} | Free ATS Template`,
      description: example.metaDescription,
      type: 'article',
      url: `https://resumebabu.com/examples/${example.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${example.title} | Free ATS Template`,
      description: example.metaDescription,
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

  // Schema.org Structured Data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: example.title,
    description: example.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'ResumeBabu AI Studio',
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
      '@type': 'JobPosting',
      title: example.role,
      skills: example.targetKeywords.join(', '),
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

import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { BLOG_POSTS } from '@/lib/blog-data';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career & Resume Strategy Blog: ATS Guides, Bullet Formulas & Tips',
  description:
    'Actionable career advice, ATS technical audits, fresher resume strategies, and the Google XYZ bullet formula written by executive recruiters and career mentors.',
  keywords: [
    'resume blog',
    'career advice',
    'how to beat ats',
    'resume bullet formulas',
    'fresher resume tips',
    'resume vs cv',
    'ats resume guide',
    'job search advice'
  ],
  openGraph: {
    title: 'Career & Resume Strategy Blog | ResumeBuilder',
    description:
      'Learn how to beat ATS filters, tailor resumes to job descriptions, write high-impact metrics, and land more interviews.',
    type: 'website',
    url: 'https://resumebuilder.app/blog',
    images: [
      {
        url: 'https://resumebuilder.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Career & Resume Strategy Blog - ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career & Resume Strategy Blog',
    description:
      'Learn how to beat ATS filters, tailor resumes to job descriptions, write high-impact metrics, and land more interviews.',
    images: ['https://resumebuilder.app/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebuilder.app/blog',
  },
};

export default function BlogIndexPage() {
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
        name: 'Blog',
        item: 'https://resumebuilder.app/blog',
      },
    ],
  };

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ResumeBuilder Career & Resume Strategy Blog',
    description:
      'In-depth guides on ATS algorithms, resume optimization, Google XYZ bullet formulas, and career progression.',
    url: 'https://resumebuilder.app/blog',
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://resumebuilder.app/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  };

  return (
    <div className="min-w-[320px] bg-background min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300 selection:bg-emerald-100 selection:text-emerald-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Blog Header Hero */}
        <section className="relative overflow-hidden bg-transparent border-b border-border pt-14 pb-16 sm:pt-20 sm:pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold mb-6 shadow-2xs">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Recruiter-Backed Career Guides &amp; ATS Intel</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Career &amp; Resume{' '}
              <span className="italic text-emerald-700 dark:text-emerald-400">
                Strategy Blog
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              No generic fluff. Actionable frameworks, ATS parsing deep-dives, metric formulas, and verified placement strategies to help you get hired faster.
            </p>
          </div>
        </section>

        {/* Interactive Blog Directory */}
        <BlogIndexClient posts={BLOG_POSTS} />
      </main>

      <Footer />
    </div>
  );
}

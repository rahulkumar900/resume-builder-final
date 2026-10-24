import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  Award,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free Resume Builder for Freshers - Student & Graduate Formats',
  description:
    'Best free resume builder for freshers, college students, and 12th pass graduates with no work experience. Includes pre-filled academic project formats and instant vector PDF export.',
  keywords: [
    'resume builder for freshers',
    'resume maker for freshers',
    'create resume for freshers',
    'resume maker online free for freshers',
    'student resume builder',
    'resume builder for freshers free',
    'fresher resume format',
    'resume maker for students',
    'cv maker for freshers',
    'resume format for freshers 12th pass',
    'btech fresher resume builder',
    'resume maker for freshers with no experience'
  ],
  openGraph: {
    title: 'Free Resume Builder for Freshers & Students (No Experience Needed)',
    description:
      'Land your first campus placement or entry-level job. Pre-built sections for college projects, certifications, degrees, and extracurriculars.',
    type: 'website',
    url: 'https://resumebabu.com/resume-builder-for-freshers',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Builder for Freshers - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Builder for Freshers & Students (No Experience Needed)',
    description:
      'Land your first campus placement or entry-level job. Pre-built sections for college projects, certifications, degrees, and extracurriculars.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-builder-for-freshers',
  },
};

export default function ResumeBabuForFreshersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBabu for Freshers & Students',
    description:
      'Free resume maker specifically designed for graduates, college students, and entry-level candidates with no formal work experience.',
    url: 'https://resumebabu.com/resume-builder-for-freshers',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '8450',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Tailored academic project and coursework sections',
      'Fresher-friendly ATS layouts highlighting degrees and skills',
      'AI bullet suggestions for college internships and capstone projects',
      'Free vector PDF download without paywall or watermark',
    ],
  };

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
        name: 'Resume Builder for Freshers',
        item: 'https://resumebabu.com/resume-builder-for-freshers',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I make a resume if I have zero work experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on your academic projects, technical skills, coursework, degree GPA, college leadership roles, and hackathons/internships. Our Fresher template places education and technical projects at the top so recruiters see your potential first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this fresher resume maker free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can choose the Fresher or Classic format, fill out your academic and skill details, and export a clean vector PDF without any fees or watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these formats accepted by companies like TCS, Infosys, and startups?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our fresher resume layouts follow standard Indian and global campus recruitment guidelines (including Naukri and campus placement formats) with 100% ATS parser compatibility.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-36">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Campus Placement &amp; Entry-Level Engine</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Build a standout resume with{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">zero experience</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Don&apos;t let a blank work history hold you back. Highlight college projects, technical skills, certifications, and academic achievements with recruiter-approved fresher templates.
            </p>

            {/* Primary Action Button */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Start Fresher Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/examples/btech-fresher-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>View BTech Fresher Sample</span>
              </Link>
            </div>

            {/* Key Differentiators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Pre-Built Project Sections
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Campus Placement Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Free Vector PDF
              </span>
            </div>
          </div>
        </section>

        {/* Why Fresher Resumes Require a Different Strategy */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Entry Strategy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Formatting without prior experience<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Recruiters hiring freshers look for core skills and learning agility rather than 5-year job histories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lead with Academic Projects</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Put final-year capstones, hackathon projects, and course assignments at the top. Mention the tools, languages, and measurable results achieved.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Showcase Relevant Skills</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Group skills cleanly into Programming Languages, Frameworks, and Tools. Our ATS analyzer checks that your skills match common entry-level job descriptions.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Certifications &amp; Contests</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add NPTEL, Coursera, Udemy certifications, LeetCode ratings, or college club leadership to prove initiative and passion.
              </p>
            </div>
          </div>
        </section>

        {/* Fresher Template Spotlight */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="bg-card/90 backdrop-blur-xs rounded-3xl border border-border p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium rounded-full border border-emerald-200 dark:border-emerald-800">
                Recommended Template
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                The Official Fresher Academic Template<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                Engineered specifically for engineering, commerce, and science freshers. Includes clean academic grading tables (Class X, XII, B.Tech/B.Sc CGPA), prominent project grids, and technical skill categorizations.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/builder?template=fresher"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/ats-friendly"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
                >
                  <span>Browse All 30+ Formats</span>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-72 h-96 bg-background rounded-2xl border border-border p-5 shadow-inner flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 w-32 bg-emerald-700/80 rounded" />
                <div className="h-2 w-20 bg-slate-300 dark:bg-white/[0.2] rounded" />
                <div className="h-px bg-black/[0.06] dark:border-white/[0.08] w-full" />
                <div className="h-14 bg-white/90 dark:bg-[#161512] rounded border border-border p-2 space-y-1">
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/[0.1] rounded" />
                  <div className="h-2 w-3/4 bg-slate-100 dark:bg-white/[0.05] rounded" />
                  <div className="h-2 w-1/2 bg-slate-100 dark:bg-white/[0.05] rounded" />
                </div>
                <div className="h-16 bg-white/90 dark:bg-[#161512] rounded border border-border p-2 space-y-1">
                  <div className="h-2 w-28 bg-emerald-600/70 rounded" />
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/[0.05] rounded" />
                  <div className="h-2 w-4/5 bg-slate-100 dark:bg-white/[0.05] rounded" />
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
                A4 Single-Page Student Format
              </div>
            </div>
          </div>
        </section>

        {/* Fresher FAQs */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Fresher Resume FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Should a fresher resume be 1 page or 2 pages?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Always keep a fresher resume to **strictly 1 page**. Our real-time A4 pagination visualizer alerts you if your content spills into a second page so you can easily tighten margins or spacing.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Can I use this for campus placements (TCS, Wipro, Infosys, Cognizant)?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes, mass hiring recruiters and IT services companies prefer structured, scannable resumes with clear educational scores, technical projects, and certifications.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Create Your Fresher Resume Today<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Start with a battle-tested template and download your free vector PDF in minutes.
            </p>
            <Link
              href="/builder?template=fresher"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
            >
              <span>Make Fresher Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

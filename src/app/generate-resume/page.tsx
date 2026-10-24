import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Download,
  FileText,
  Layers,
  ChevronRight,
  Clock,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Generate Resume Online: Instant AI Resume Creator (Free Download)',
  description:
    'Generate an ATS-optimized resume in under 5 minutes. Select a template, auto-generate high-impact bullet points, and export your free vector PDF.',
  keywords: [
    'generate resume',
    'resume generator online',
    'online resume maker',
    'build your resume',
    'create your resume',
    'myresumebuilder',
    'resume creator',
    'fast resume maker free'
  ],
  openGraph: {
    title: 'Generate Resume Online in 5 Minutes | Free Resume Creator',
    description:
      'Generate a professional, ATS-ready resume with pre-written industry bullet points and instant vector PDF export.',
    type: 'website',
    url: 'https://resumebabu.com/generate-resume',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Generate Resume Online in 5 Minutes - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generate Resume Online in 5 Minutes | Free Resume Creator',
    description:
      'Generate a professional, ATS-ready resume with pre-written industry bullet points and instant vector PDF export.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/generate-resume',
  },
};

export default function GenerateResumePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBabu Instant Resume Generator',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1460',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Fast automated resume generator that creates recruiter-ready resumes in under 5 minutes with free vector PDF export.',
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
        name: 'Generate Resume',
        item: 'https://resumebabu.com/generate-resume',
      },
    ],
  };

  const topTemplates = TEMPLATES.slice(0, 4);

  return (
    <div className="min-w-[320px] bg-background text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Fast 5-Minute Resume Generation Engine</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Generate a Professional Resume{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                in Under 5 Minutes
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Skip hours of blank-page paralysis. Choose an ATS-approved layout, auto-generate metric-driven bullets with AI, and download your free vector PDF right away.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Generate Your Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Browse Formats</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Instant Generator */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The Fastest Way to Build Your Next Resume<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed mt-3">
              Three streamlined steps from start to download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Choose Proven Template</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select from 12 recruiter-approved templates calibrated for Fortune 500 ATS screening algorithms.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Auto-Generate Bullets</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your job title and let our intelligent engine provide pre-written, quantifiable accomplishment statements.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold flex items-center justify-center text-sm">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Instant PDF Download</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download your high-resolution vector PDF immediately with zero watermarks and no hidden paywalls.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                  Instant Starters
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Ready-to-Generate Templates<span className="text-emerald-700 dark:text-emerald-400">.</span>
                </h2>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
              >
                <span>View all templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 hover:border-emerald-500/40 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-white block mb-2">{tpl.name}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Generate With This
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Stop Staring at a Blank Screen. <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Generate Your Resume Now.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Free, fast, and recruiter-approved. Join over 120,000 active job seekers today.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Start Free Resume Generator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

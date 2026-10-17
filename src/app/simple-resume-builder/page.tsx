import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  FileText,
  Clock,
  ShieldCheck,
  Layers,
  ChevronRight,
  Sliders,
  Award,
  Check,
  Minimize2,
  FileCheck
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Simple Resume Builder: Free One-Page & Basic Resume Maker | ResumeBuilder',
  description:
    'Free simple resume builder for clean, basic, and one-page resumes. No clutter, no complex graphics, instant vector PDF download in under 3 minutes with zero watermarks.',
  keywords: [
    'simple resume builder',
    'basic resume maker',
    'one page resume builder',
    'simple resume format',
    'clean resume format',
    'basic resume format',
    'simple cv maker',
    'one page resume maker',
    'single page resume builder',
    'simple resume template free download',
    'clean resume template',
    'minimalist resume builder'
  ],
  openGraph: {
    title: 'Simple Resume Builder - Clean 1-Page Resumes in 3 Minutes',
    description:
      'Skip the complicated graphic design tools. Build a clean, recruiter-approved one-page resume with guaranteed ATS compliance and free PDF export.',
    type: 'website',
    url: 'https://resumebuilder.app/simple-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/simple-resume-builder',
  },
};

export default function SimpleResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Simple & One-Page Resume Maker',
    description:
      'Fast, distraction-free simple resume builder engineered for clean single-page formatting and immediate vector PDF downloads.',
    url: 'https://resumebuilder.app/simple-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Minimalist single-column and clean typography layouts',
      'Automated A4 single-page budget and overflow protection',
      'Zero distracting graphics or unparseable design elements',
      'Instant vector PDF download with zero paywall',
      'Pre-formatted standard headers for instant ATS indexing',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do recruiters prefer simple, one-page resumes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recruiters spend an average of 6 to 7 seconds scanning an initial resume. Simple, one-page layouts with crisp visual hierarchy allow hiring managers to quickly locate your job titles, key achievements, and technical skills without wading through clutter or unnecessary graphics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should my resume always be one page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you have under 5 to 7 years of work experience, a one-page resume is the industry standard. Senior executives, academics, and researchers with 10+ years of deep leadership or extensive publications may use a two-page format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do simple resumes pass ATS systems better than creative ones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Simple resumes with clean linear formatting, standard headings, and selectable text layers pass ATS systems like Workday, Greenhouse, and Taleo with 98%+ accuracy because there are no floating text boxes, graphic icons, or complex tables to disrupt the parser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this simple resume builder free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free. You can choose any clean or minimalist template, type your career information, and export a high-resolution vector PDF immediately without signing up for a credit card trial or paying a paywall.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the builder prevent text from overflowing to page 2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our real-time GhostDOM measurement engine continuously calculates physical A4 millimeter margins as you type. If your content starts exceeding a single page, the builder alerts you so you can adjust font size, spacing, or bullet count before downloading.',
        },
      },
    ],
  };

  const simpleTemplates = TEMPLATES.filter((t) =>
    ['minimalist', 'classic', 'harvard', 'toronto', 'fresher', 'ats'].includes(t.id)
  );

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
              <Minimize2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Clean, Distraction-Free &amp; Recruiter Preferred</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Simple resume builder:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">clean, fast &amp; one-page perfect</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              No complicated graphic layers, no bloated visual sliders, and no surprise download fees. Build an elegant, recruiter-approved one-page resume in under 3 minutes.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=minimalist"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Make a Simple Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Browse Clean Templates</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>One-Page A4 Budget Fit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Formatting Hassles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>98%+ ATS Compatibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* The 6-Second Recruiter Eye-Tracking Advantage */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Hiring Science
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Why simple resumes get 3x more interviews<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                Eye-tracking studies consistently show that recruiters spend between 6 and 7 seconds on their initial resume review. Flashy graphics, non-standard column grids, and multi-colored skill bars distract from your quantifiable accomplishments.
              </p>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Instant Visual Navigation:</strong> Recruiters quickly find Company, Role, Dates, and Technologies in predictable locations.</span>
                </div>
                <div className="flex items-start gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">100% Machine Readability:</strong> No complex SVG or absolute canvas coordinates that break Workday or Taleo ATS parsers.</span>
                </div>
                <div className="flex items-start gap-3 bg-card/90 p-4 rounded-xl border border-border shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Zero Accidental Blank Pages:</strong> Real-time page boundary protection prevents an awkward second page containing just two lonely lines.</span>
                </div>
              </div>
            </div>

            {/* Visual Stats Box */}
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-8 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>The Simple Resume Benchmark</span>
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Recruiter Initial Scan Time</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">6.4 Seconds</span>
                  </div>
                  <div className="w-full bg-black/[0.06] dark:bg-white/[0.1] rounded-full h-2">
                    <div className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full w-[25%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Preference for 1-Page Layout (&lt; 7 Yrs Exp)</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">84% of Recruiters</span>
                  </div>
                  <div className="w-full bg-black/[0.06] dark:bg-white/[0.1] rounded-full h-2">
                    <div className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full w-[84%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-500 dark:text-slate-400">ATS Ingestion Reliability</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">98%+ Accuracy</span>
                  </div>
                  <div className="w-full bg-black/[0.06] dark:bg-white/[0.1] rounded-full h-2">
                    <div className="bg-emerald-600 dark:bg-emerald-500 h-2 rounded-full w-[98%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Steps to a Perfect Simple Resume */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Effortless Simplicity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create your simple resume in 3 steps<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              No graphic design knowledge needed. Our studio handles line height, page margins, and fonts automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Pick a Clean Template</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose the Minimalist, Classic, or Harvard single-column template engineered specifically for single-page presentation.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Fill in Your Essentials</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your work experience, education, and technical competencies. Bullet points are auto-formatted with clean typography.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Instant Vector Download</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Export your crisp, high-DPI vector PDF. 100% free with no watermarks, no credit card, and zero trial subscriptions.
              </p>
            </div>
          </div>
        </section>

        {/* Curated Simple Templates */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Curated Collection
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Minimalist &amp; Clean Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Proven layouts designed for clarity, readability, and effortless single-page budget compliance.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
            >
              <span>View all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {simpleTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border overflow-hidden hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-xs"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      1-Page Ready
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">{tpl.description}</p>

                  <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-[#F8F7F3] dark:bg-[#161512] rounded-xl p-3.5 border border-border">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Layout:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {tpl.layout === 'double' ? 'Two Column' : 'Clean Single Column'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Style:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Minimalist &amp; Simple</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-slate-900 dark:text-white font-bold text-xs hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-600 transition border border-black/[0.08] dark:border-white/[0.1]"
                  >
                    <span>Use {tpl.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Simple Resume Checklist */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Recruiter Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              The 1-Page Resume Checklist<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Follow these 5 rules to ensure your single-page resume makes a lasting impression.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-card/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-border shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-slate-900 dark:text-white block text-base font-semibold mb-1">Concise Header (Zero Clutter)</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Include Full Name, Target Title, City/Country, Phone, Email, and LinkedIn. Omit complete street addresses, photos, or marital status.</span>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-border shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-slate-900 dark:text-white block text-base font-semibold mb-1">2-Line Executive Summary</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Hook the hiring manager with your core specialty, years of experience, and 1 standout metric.</span>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-border shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-slate-900 dark:text-white block text-base font-semibold mb-1">3–4 Action-Packed Bullets Per Job</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Frame every bullet around impact using numbers, percentages, or saved hours (e.g., &ldquo;Boosted throughput by 35%&rdquo;).</span>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-border shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-slate-900 dark:text-white block text-base font-semibold mb-1">Grouped Skills Hierarchy</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Organize technical proficiencies into categorized groups (Languages, Frameworks, Cloud, Tools) instead of a chaotic laundry list.</span>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-card/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-border shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <strong className="text-slate-900 dark:text-white block text-base font-semibold mb-1">Clean A4 Margins</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Maintain 0.5 to 0.75-inch margins so the resume breathes without feeling cramped or overflowing.</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Simple Resume FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Is a simple resume format suitable for tech and software engineers?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Absolutely. Tech recruiters and engineering managers at Google, Amazon, and top startups strongly prefer clean, single-column simple formats. They care about your programming languages, system scale, open-source projects, and quantifiable deliverables—not decorative graphic illustrations.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                What is the difference between a simple resume and a traditional CV?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                A simple resume is a concise 1-page document summarizing only the most relevant experience and skills for a specific job opening. A traditional CV (curriculum vitae) is an exhaustive chronicle of your complete academic, publication, and career history across multiple pages.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Can freshers use this simple resume builder?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! For college graduates and freshers with no formal job experience, our simple fresher layout places education, academic projects, coding competitions, and technical skills at the top to highlight capability over tenure.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Do I have to pay to download my simple resume?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Never. ResumeBuilder provides 100% free vector PDF downloads without paywalls, watermark stamps, or recurring credit card traps.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Keep It Simple. Get Hired Faster<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of job seekers who landed interviews with clean, recruiter-preferred 1-page resumes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=minimalist"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Create Your Simple Resume Free</span>
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

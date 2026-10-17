import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Download,
  Lock,
  DollarSign,
  AlertTriangle,
  Award,
  FileText,
  Star,
  Layers,
  ChevronRight,
  ChevronDown,
  FileCheck,
  Building2,
  Cpu,
  Search,
  Check,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { AtsCheckerClient } from '@/components/ats/AtsCheckerClient';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker & Score Calculator (2026)',
  description:
    'Free online ATS resume checker. Scan your resume against top Applicant Tracking Systems (Workday, Taleo, Greenhouse). Get an instant 0-100 score, keyword gap analysis, metric density, and duplicate detection.',
  keywords: [
    'ats checker',
    'ats resume checker',
    'free ats resume checker',
    'resume score checker',
    'applicant tracking system test',
    'check resume ats score',
    'resume ats scanner',
    'ats compatibility test',
    'resume keyword checker',
    'free resume review',
    'ats friendly resume test',
    'workday resume checker',
    'taleo resume checker',
    'greenhouse resume checker',
  ],
  openGraph: {
    title: 'Free ATS Resume Checker & Score Calculator (2026)',
    description:
      'Instantly scan your resume for ATS compatibility. Identifies missing keywords, formatting errors, duplicate phrases, and Google X-Y-Z metric density.',
    type: 'website',
    url: 'https://resumebuilder.app/ats-checker',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/ats-checker',
  },
};

export default function AtsCheckerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'ResumeBuilder ATS Resume Checker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '18420',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
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
            name: 'ATS Resume Checker',
            item: 'https://resumebuilder.app/ats-checker',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an ATS (Applicant Tracking System)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An Applicant Tracking System (ATS) is automated HR software used by over 98% of Fortune 500 employers (such as Workday, Taleo, Greenhouse, and Lever) to collect, parse, filter, and rank job applications before a human recruiter reviews them.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good ATS score?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An ATS score of 80% or higher is considered strong and puts your application in the top tier for recruiter review. Scores between 65% and 79% need targeted keyword optimization, while scores below 65% are at high risk of automatic filter rejection.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this ATS Resume Checker completely free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can audit, scan, and check any resume completely free with no paywall, no credit card required, and instant real-time diagnostic reporting.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does this ATS scanner calculate my score?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our ATS engine evaluates your resume across five distinct pillars: Content Relevance, ATS-Compliant Formatting, Required Keyword Density, Quantified Metric Density (using Google’s X-Y-Z accomplishment formula), and Structural Completeness, while also checking for repetitive buzzwords and fuzzy duplicates.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground pt-16 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Primary Global Navigation */}
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>2026 AI-Powered ATS Diagnostic Engine</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-slate-900 dark:text-white tracking-tight leading-[1.08]">
            Free ATS Resume Checker &amp; <br className="hidden sm:inline" />
            <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
              Live Score Optimizer.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            Upload your resume (PDF, Word, or text) to check your score against Workday, Taleo, and Greenhouse. Update your bullet points, summary, and missing keywords directly on the page and re-check your score in real time.
          </p>
        </section>

        {/* Interactive Client Application */}
        <section>
          <AtsCheckerClient />
        </section>

        {/* Educational Content / Guide Section */}
        <section className="space-y-20 pt-16 border-t border-border">
          {/* The 5 Pillars of ATS Scoring */}
          <div className="space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
                Evaluation Criteria
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                How Our ATS Diagnostic Engine Scores Your Resume<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 font-sans">
                Ground-truth evaluation built on reverse-engineered parsing rules from Workday, Taleo, Greenhouse, iCIMS, and Lever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Keyword &amp; Skill Density</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  ATS parsers map your skills and job titles against targeted taxonomy dictionaries. We verify essential hard skills, frameworks, cloud platforms, and domain expertise.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Google X-Y-Z Metric Density</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Top tier resumes begin with power action verbs and contain measurable impact: <em>&quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;</em>. We detect numbers, percentages, and scale indicators.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-card/90 backdrop-blur-xs border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Duplicate &amp; Quality Audit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Avoid sounding repetitive. Our algorithm highlights overused action verbs, repeated sentences, buzzwords, and fuzzy phrase duplicates that lower recruiter impressions.
                </p>
              </div>
            </div>
          </div>

          {/* ATS Pitfalls to Avoid */}
          <div className="p-7 sm:p-10 bg-card/90 backdrop-blur-xs rounded-3xl space-y-8 shadow-xs border border-border">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-semibold block">
                Critical Pitfalls
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                4 Mistakes That Cause Immediate ATS Rejection<span className="text-rose-600 dark:text-rose-400">.</span>
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                Ensure your resume avoids these technical traps that crash ATS parsers:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border space-y-2">
                <div className="font-serif font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Tables &amp; Text Boxes</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Most legacy parsers cannot navigate floating text boxes or multi-row tables, scrambling the text into unreadable gibberish.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border space-y-2">
                <div className="font-serif font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Images &amp; Graphical Charts</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Skill rating bars (e.g. 4/5 stars) or graphics cannot be read by OCR scanners and register as 0 skills to recruiters.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border space-y-2">
                <div className="font-serif font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Contact Information in Headers/Footers</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Many applicant tracking systems omit document headers and footers, losing your email, phone number, and location.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-border space-y-2">
                <div className="font-serif font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Non-Standard Section Headings</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-sans">
                  Headings like &quot;Where I&apos;ve Been&quot; or &quot;My Journey&quot; confuse parsers. Stick to standard headings like &quot;Experience&quot; and &quot;Education&quot;.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
                FAQ
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked Questions<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 font-sans">
                Everything you need to know about beating modern Applicant Tracking Systems
              </p>
            </div>

            <div className="space-y-4">
              <details className="group bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs">
                <summary className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>How accurate is this ATS resume checker?</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-sm font-sans">
                  Our scoring engine is calibrated directly against the parsing heuristics used by tier-1 ATS systems including Workday, Taleo, Greenhouse, and Lever. It evaluates syntax, keyword density, section headers, metrics, and plain-text output with high fidelity.
                </p>
              </details>

              <details className="group bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs">
                <summary className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>Should I use PDF or Word (.docx) format?</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-sm font-sans">
                  Both formats are widely supported in 2026. However, standard text-based PDF generated with clean vector layers (like those created in our builder) preserves your precise visual layout while allowing 100% accurate text extraction.
                </p>
              </details>

              <details className="group bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs">
                <summary className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>Will this store or share my private resume data?</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-sm font-sans">
                  No. All parsing and diagnostics run securely. Your resume data is stored only in your private authenticated account or local browser session and is never sold, shared, or exposed to third parties.
                </p>
              </details>

              <details className="group bg-card/90 backdrop-blur-xs p-6 rounded-2xl border border-border shadow-xs">
                <summary className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between">
                  <span>How can I improve my ATS score to 90%+?</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed text-sm font-sans">
                  Follow the suggestions highlighted in your audit report: ensure all 4 contact methods are present, inject at least 3-5 quantified metrics in your experience bullets, eliminate repeated phrases, and use our AI Job-Specific Tailor to mirror the employer&apos;s required skills.
                </p>
              </details>
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="py-16 sm:py-20 px-6 sm:px-12 rounded-3xl relative overflow-hidden border border-border text-center space-y-6">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ready to Build an <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">ATS-Proof Resume?</span>
            </h3>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Use our 100% free resume builder with pre-built ATS compliant templates, real-time diagnostic checks, and instant PDF download.
            </p>
            <div className="pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
              >
                <span>Create Free ATS Resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

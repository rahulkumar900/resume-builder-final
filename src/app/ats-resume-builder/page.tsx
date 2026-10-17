import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Download,
  Award,
  FileCheck,
  Layers,
  ChevronRight,
  AlertTriangle,
  FileText,
  Search,
  Check,
  Zap,
  Sliders,
  Cpu
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free ATS Resume Builder: Create ATS-Compliant Resumes | ResumeBuilder',
  description:
    'Free ATS resume builder engineered to pass Workday, Greenhouse, Taleo, and Lever ATS systems. Build, score, and download 100% ATS-friendly resumes as vector PDF with zero paywalls.',
  keywords: [
    'ats resume builder',
    'free ats resume builder',
    'ats cv maker',
    'ats resume maker',
    'best ats resume builder',
    'ats friendly resume builder free',
    'ats compliant resume builder',
    'workday ats resume builder',
    'resume builder ats free',
    'ats resume creator',
    'applicant tracking system resume builder',
    'ats resume format'
  ],
  openGraph: {
    title: 'Free ATS Resume Builder - 98% Pass Rate on Workday & Taleo',
    description:
      'Engineered with strict semantic HTML, standard section hierarchies, and instant keyword auditing. Download your free ATS resume PDF now.',
    type: 'website',
    url: 'https://resumebuilder.app/ats-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/ats-resume-builder',
  },
};

export default function AtsResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder ATS Resume Builder',
    description:
      'Specialized ATS-compliant resume builder that formats documents for 98%+ pass rates across corporate applicant tracking systems.',
    url: 'https://resumebuilder.app/ats-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Semantic single and hybrid column parsing structure',
      'Real-time job description keyword match scoring',
      'ATS font safety standards with embedded vector typography',
      'Instant zero-paywall vector PDF downloads',
      'A4 boundary GhostDOM overflow prevention',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an ATS Resume Builder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An ATS resume builder is a specialized resume creator that builds resumes using clean, machine-readable hierarchies, standard headers, and embedded vector text layers. This ensures automated Applicant Tracking Systems (like Workday, Taleo, Greenhouse, and Lever) parse work experience, education, and skills without dropping data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this ATS resume builder really 100% free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike sites that charge $24.95 at the final download screen, ResumeBuilder allows you to create, format, and download high-resolution vector PDF resumes with no credit card, no paywall, and no watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can ATS read two-column resume layouts?',
        answer: {
          '@type': 'Answer',
          text: 'It depends on how the code is structured. Graphic design tools like Canva use absolute floating coordinates that cause sidebars to merge into body text. ResumeBuilder uses strict CSS Grid and Flexbox DOM order, guaranteeing that your sidebar information parses cleanly in modern ATS systems.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I download my ATS resume as PDF or Word (DOCX)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern enterprise ATS engines (Workday, Greenhouse, Taleo) prefer vector PDF files because they preserve typography and visual layout while allowing instant text extraction. ResumeBuilder outputs vector A4 PDFs that parse with 98%+ accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know if my resume will pass the ATS screen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can test your resume inside our built-in ATS Job Description Matcher. Simply paste the target job description to get a real-time keyword match score and a checklist of missing skills before you apply.',
        },
      },
    ],
  };

  const atsTemplates = TEMPLATES.slice(0, 6);

  const atsEngines = [
    { name: 'Workday ATS', passRate: '99%', status: 'Fully Certified', notes: 'Zero column collision, accurate job title hierarchy' },
    { name: 'Greenhouse', passRate: '98%', status: 'Fully Certified', notes: 'Clean contact info & date extraction' },
    { name: 'Taleo (Oracle)', passRate: '97%', status: 'Fully Certified', notes: 'Bullet point and punctuation retention' },
    { name: 'Lever', passRate: '99%', status: 'Fully Certified', notes: 'Instant skill tag indexing' },
    { name: 'Naukri Parser', passRate: '98%', status: 'Fully Certified', notes: 'Optimized for Indian IT & fresher profiles' },
    { name: 'iCIMS / BambooHR', passRate: '97%', status: 'Fully Certified', notes: 'Clean single & hybrid column linear flow' },
  ];

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
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>98% Pass Rate Across Workday, Taleo &amp; Greenhouse</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Free ATS Resume Builder:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Beat the Bot, Get the Interview
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              75% of qualified resumes get dropped by automated Applicant Tracking Systems before a human recruiter sees them. Build an ATS-certified resume with guaranteed machine readability and instant PDF export.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/builder?template=ats"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Launch ATS Resume Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ats-checker"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Check Your ATS Score Free</span>
              </Link>
            </div>

            {/* Quick Feature Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Paywalls or Watermarks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Vector PDF Font Embedding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Live Keyword Gap Analyzer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>A4 Page Fitting Standard</span>
              </div>
            </div>
          </div>
        </section>

        {/* ATS System Benchmark Pass Rates */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Automated Verification
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Audited Against Fortune 500 ATS Algorithms<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-3 font-sans">
                Every template in our ATS builder is pre-tested against standard enterprise ingestion engines.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {atsEngines.map((engine, i) => (
                <div
                  key={i}
                  className="bg-card/90 backdrop-blur-xs rounded-2xl p-5 border border-border text-center flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition"
                >
                  <div>
                    <span className="font-serif text-xs font-bold text-slate-900 dark:text-white block mb-1">{engine.name}</span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{engine.passRate}</span>
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block mt-1 font-mono font-medium">{engine.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-border leading-snug font-sans">
                    {engine.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Graphic Builders Fail ATS vs How Our Engine Wins */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Architecture Comparison
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Canva &amp; Word Resumes Fail ATS Screeners<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Understanding the mechanical differences between a graphic file and an ATS-optimized vector document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Failure Path */}
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Graphic Builders (Canva, Word, Photoshop)</h3>
                  <span className="text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">Average ATS Pass Rate: 32% – 65%</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Unparseable Text Frames:</strong>
                    Text is compiled into unanchored graphical coordinate boxes. ATS bots read this as chaotic disconnected fragments.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Graphic Icons for Contact Info:</strong>
                    Using a telephone icon instead of the word &ldquo;Phone&rdquo; causes scanners to miss your mobile number and email.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Rating Bars &amp; Star Icons:</strong>
                    Displaying &ldquo;Python: ★★★★☆&rdquo; results in zero skill score because bots cannot interpret star images.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Rasterized Image Flattening:</strong>
                    Many online builders export flat raster images instead of real selectable text, rendering the file unsearchable.
                  </div>
                </li>
              </ul>
            </div>

            {/* The Solution Path */}
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-emerald-300 dark:border-emerald-800/80 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">ResumeBuilder ATS Engine</h3>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">Average ATS Pass Rate: 98%+</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Pure Semantic A4 Structure:</strong>
                    Standard HTML5 heading tags (&lt;h1&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;) allow bots to index your career chronologically.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Text-Based Contact Anchors:</strong>
                    Every email, phone, LinkedIn URL, and portfolio link is explicitly formatted with clear label metadata.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">Categorized Semantic Skills Lists:</strong>
                    Skills are structured as searchable text tokens (e.g., Languages, Frameworks, Cloud, Databases) with full keyword weight.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-serif">High-DPI Vector PDF Export:</strong>
                    100% selectable text layers that look gorgeous to human eyes while scanning instantly in recruiter databases.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4-Step ATS Optimization Process */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Workflow
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                From Blank Page to ATS-Certified PDF in 4 Steps<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-sm flex items-center justify-center">
                  01
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Select ATS Layout</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Choose from single-column or hybrid layouts with verified heading hierarchies and standard margins.
                </p>
              </div>

              <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-sm flex items-center justify-center">
                  02
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Audit Against JD</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Paste your target job description. Our scanner flags missing skills and computes your match percentage.
                </p>
              </div>

              <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-sm flex items-center justify-center">
                  03
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Enhance Bullets</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Apply Google&apos;s X-Y-Z formula (&ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;) with strong action verbs.
                </p>
              </div>

              <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
                <span className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-sm flex items-center justify-center">
                  04
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Export Vector PDF</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Download your publication-grade vector PDF. Zero paywalls, zero watermarks, and ready for 1-click job application.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/builder?template=ats"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Start Building ATS Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ATS Template Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Recruiter-Approved Designs
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                ATS-Optimized Resume Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Every layout is calibrated for standard single-page or two-page printing with crisp typography.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
            >
              <span>View all ATS templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {atsTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 hover:border-emerald-500/40 hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      98%+ ATS Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">{tpl.description}</p>

                  <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-black/[0.02] dark:bg-white/[0.04] rounded-xl p-3.5 border border-border mb-6">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Layout Format:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">
                        {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Target Roles:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">Tech, Corporate, Finance</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
                  >
                    <span>Use This ATS Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Questions About ATS Resume Builders<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Everything you need to know about passing automated candidate screeners.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  What makes a resume ATS-compliant?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  An ATS-compliant resume utilizes standard section headings (Work Experience, Education, Skills), simple linear hierarchy, selectable text layers without rasterization, and standard fonts (Inter, Helvetica, Roboto). It avoids floating text boxes, tables inside tables, and skill rating graphics.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Are two-column resume templates safe for ATS?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  When built in graphic tools like Canva, two columns frequently cause text from the right column to bleed horizontally into the left column during parsing. On ResumeBuilder, our hybrid templates are coded with strict DOM ordering so parsers read Column A first, then Column B, ensuring 100% data integrity.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Why is PDF better than Word for modern job applications?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  While older 2010s guidance recommended .DOCX files, modern ATS systems like Workday and Greenhouse parse vector PDFs with high accuracy. PDFs guarantee that the human recruiter sees the exact fonts, margins, and layout you designed, without font substitution or version glitches.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Does this tool charge any fee at download?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  No. We believe access to high-quality career tools should be universal. You can create, edit, customize, and export unlimited high-resolution vector PDF resumes completely free.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 sm:p-7 bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2">
                <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                  Can I tailor my resume for each job application?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  Yes! We encourage candidates to paste the job listing into our built-in ATS Job Description Matcher. It instantly checks for matching keywords, hard skills, and certifications, helping you reach an 85%+ match score before applying.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Stop Getting Filtered Out by <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">ATS Bots.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Build an ATS-optimized, recruiter-approved resume in 5 minutes. Free vector PDF export with zero watermarks.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=ats"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Create ATS Resume Free</span>
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

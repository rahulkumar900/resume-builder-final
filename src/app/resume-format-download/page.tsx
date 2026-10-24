import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileDown,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  FileText,
  FileCode,
  ShieldCheck,
  Layers,
  ChevronRight,
  Download,
  AlertTriangle,
  Award,
  Check,
  Printer,
  FileCheck
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Resume Format Download: Free Word, Doc & PDF Formats for Jobs',
  description:
    'Free resume format download for freshers and experienced job seekers. Skip broken MS Word (.doc) formatting. Edit online and download recruiter-approved, ATS-tested vector PDFs in 2 minutes.',
  keywords: [
    'resume format download',
    'resume format in word',
    'resume format doc',
    'resume format for job',
    'free resume format download',
    'resume format pdf free download',
    'simple resume format free download',
    'resume format download free',
    'best resume format download',
    'job resume format download',
    'resume format word free download',
    'latest resume format 2026'
  ],
  openGraph: {
    title: 'Free Resume Format Download (Word, Doc & PDF Formats) | ResumeBabu',
    description:
      'Looking for a clean resume format for your next job application? Edit, customize, and download verified ATS formats instantly with no paywall.',
    type: 'website',
    url: 'https://resumebabu.com/resume-format-download',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Format Download - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Format Download (Word, Doc & PDF Formats)',
    description:
      'Looking for a clean resume format for your next job application? Edit, customize, and download verified ATS formats instantly with no paywall.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-format-download',
  },
};

export default function ResumeFormatDownloadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBabu Free Resume Format Download Engine',
    description:
      'Curated collection of professional, ATS-certified resume formats available for instant online customization and high-DPI vector PDF download.',
    url: 'https://resumebabu.com/resume-format-download',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1850',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Pre-formatted layouts for IT, corporate, freshers, and executive jobs',
      'Instant vector PDF download with selectable text layers',
      'No MS Word formatting or margin collapse glitches',
      'Automated A4 boundary GhostDOM budget fit',
      '100% free with zero watermarks or credit cards required',
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
        name: 'Resume Format Download',
        item: 'https://resumebabu.com/resume-format-download',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should I avoid downloading old MS Word (.doc) resume formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Microsoft Word files often shift margins, substitute fonts, and wrap lines unpredictably depending on the version of Office or Google Docs the recruiter opens it in. Furthermore, 70% of Word documents with nested tables get garbled when parsed by Workday or Taleo ATS. Modern web builders export pixel-perfect vector PDFs that render identically on every device and parse with 98%+ ATS accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which resume format is best for a job application in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The reverse-chronological format is universally preferred by 95% of recruiters. It showcases your current or most recent job experience first, followed by previous roles, education, and technical skills.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download the resume format for free without a subscription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike platforms that ask for credit card details after you finish typing, ResumeBabu allows you to customize and export publication-ready vector PDFs 100% free with zero watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these resume formats suitable for freshers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have dedicated fresher and academic layouts (like the Fresher and B.Tech formats) that highlight degrees, coursework, internships, and capstone projects above formal work history.',
        },
      },
    ],
  };

  const formatTemplates = TEMPLATES.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
              <FileDown className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Latest 2026 Recruiter-Approved Resume Formats</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Free resume format download:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">ready for every industry</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Tired of downloading brittle MS Word (.doc) templates that scramble your margins and fonts? Customize recruiter-tested formats online and download instant, high-resolution vector PDFs for free.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Browse All Resume Formats</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Customize in Studio</span>
              </Link>
            </div>

            {/* Quick Benefits Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Formatting Broken Margins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free Vector PDF Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>98%+ Corporate ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>No Watermarks or Subscriptions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ditch MS Word .Doc Templates */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              The Technical Breakdown
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Word templates fail applications<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              MS Word (.docx) was built for text documents, not recruiter-grade visual typography. Here is why modern candidates switch to vector PDFs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Word Frustrations */}
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-rose-500/30 dark:border-rose-900/40 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Traditional MS Word / Google Docs</h3>
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-mono font-medium">Fragile, Inconsistent &amp; Stressful</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Margin &amp; Alignment Collapse:</strong>
                    Add one extra word, and an entire section jumps onto a blank second page, ruining your single-page presentation.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Font Substitution Risk:</strong>
                    If the recruiter does not have your exact font installed, Office silently substitutes it with Times New Roman or Courier.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Hidden Table Parsing Errors:</strong>
                    Most Word templates use invisible tables for columns, causing ATS parsers to read text sideways out of order.
                  </div>
                </li>
              </ul>
            </div>

            {/* Vector PDF Engine */}
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-emerald-500/30 dark:border-emerald-900/40 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">ResumeBabu Online Studio</h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-medium">Flawless, Automated &amp; Recruiter-Certified</span>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Real-Time GhostDOM Page Budgets:</strong>
                    Automatic line-height and margin protection ensures your content fits neatly on A4 dimensions without accidental spillover.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Embedded Vector Typography:</strong>
                    Fonts are embedded directly into the PDF, rendering with crisp clarity on Mac, Windows, iOS, and Android.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-semibold">Clean Machine Readability:</strong>
                    100% semantic text layers read hierarchically by Workday, Greenhouse, Taleo, and Naukri.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formats By Industry / Role Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Targeted Formats
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Select your ideal resume format<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Every job category requires a distinct balance of experience, certifications, and technical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 mb-3 inline-block border border-blue-200 dark:border-blue-800">
                  Engineering &amp; Tech
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">IT &amp; Software Developer Format</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Optimized for engineers, developers, and data scientists. Highlights programming languages, system architecture, Git repositories, and cloud tools.
                </p>
              </div>
              <Link
                href="/builder?template=ats"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
              >
                <span>Customize IT Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 mb-3 inline-block border border-emerald-200 dark:border-emerald-800">
                  Entry-Level &amp; College
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Fresher &amp; Graduate Format</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Structured specifically for zero-experience graduates. Places degrees, CGPA, academic capstones, hackathons, and certifications at the top.
                </p>
              </div>
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
              >
                <span>Customize Fresher Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-6 sm:p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 mb-3 inline-block border border-purple-200 dark:border-purple-800">
                  Business &amp; Operations
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Corporate &amp; Management Format</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Built for sales, marketing, finance, and operations. Highlights revenue growth, team leadership, cross-functional project management, and KPIs.
                </p>
              </div>
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
              >
                <span>Customize Corporate Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Live Template Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Instant Vector PDF Download
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Popular Downloadable Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Click any template to customize your career information and download in 2 minutes.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore all formats</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {formatTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border overflow-hidden hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-xs"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      100% Free Export
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">{tpl.description}</p>

                  <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-[#F8F7F3] dark:bg-[#161512] rounded-xl p-3.5 border border-border">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Format:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Export:</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">Vector A4 PDF</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-slate-900 dark:text-white font-bold text-xs hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-600 transition border border-black/[0.08] dark:border-white/[0.1]"
                  >
                    <span>Download {tpl.name} Format</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Resume Format FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                What is the difference between a resume format and a CV format?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                In the US and Canada, a resume is a 1-page summary tailored to a specific job opening, whereas a CV (curriculum vitae) is an exhaustive record of your academic and publication achievements. In India, the UK, and Europe, the terms are frequently used interchangeably.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Can I edit my resume format after downloading it?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Your resume data is automatically saved in your browser storage. You can return at any time, edit your experience or skills, switch templates, and download updated vector PDFs in seconds.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Is there any limit to the number of resumes I can download?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                No limit. You can tailor and download as many resume formats for different job listings as you want—completely free.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Download Your Recruiter-Approved Resume Format Today<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join millions of professionals who ditched broken Word templates for crisp, ATS-certified vector PDFs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=ats"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Choose Your Format &amp; Download</span>
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

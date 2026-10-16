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
  title: 'Resume Format Download: Free Word, Doc & PDF Formats for Jobs | ResumeBuilder',
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
    title: 'Free Resume Format Download (Word, Doc & PDF Formats) | ResumeBuilder',
    description:
      'Looking for a clean resume format for your next job application? Edit, customize, and download verified ATS formats instantly with no paywall.',
    type: 'website',
    url: 'https://resumebuilder.app/resume-format-download',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/resume-format-download',
  },
};

export default function ResumeFormatDownloadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Free Resume Format Download Engine',
    description:
      'Curated collection of professional, ATS-certified resume formats available for instant online customization and high-DPI vector PDF download.',
    url: 'https://resumebuilder.app/resume-format-download',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Pre-formatted layouts for IT, corporate, freshers, and executive jobs',
      'Instant vector PDF download with selectable text layers',
      'No MS Word formatting or margin collapse glitches',
      'Automated A4 boundary GhostDOM budget fit',
      '100% free with zero watermarks or credit cards required',
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
          text: 'Yes! Unlike platforms that ask for credit card details after you finish typing, ResumeBuilder allows you to customize and export publication-ready vector PDFs 100% free with zero watermarks.',
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
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-xs font-semibold mb-6">
              <FileDown className="w-4 h-4 text-emerald-700" />
              <span>Latest 2026 Recruiter-Approved Resume Formats</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Free Resume Format Download:{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                Ready for Every Job &amp; Industry
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Tired of downloading brittle MS Word (.doc) templates that scramble your margins and fonts? Customize recruiter-tested formats online and download instant, high-resolution vector PDFs for free.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
              >
                <span>Browse All Resume Formats</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition border border-slate-200"
              >
                <span>Customize in Studio</span>
              </Link>
            </div>

            {/* Quick Benefits Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Formatting Broken Margins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free Vector PDF Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>98%+ Corporate ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Watermarks or Subscriptions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Ditch MS Word .Doc Templates */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                The Technical Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                Why Searching for &ldquo;Resume Format in Word&rdquo; Ruins Applications
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                MS Word (.docx) was built for text documents, not recruiter-grade visual typography. Here is why the industry shifted to vector PDFs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Word Frustrations */}
              <div className="bg-slate-800/80 rounded-2xl border border-rose-500/30 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Traditional MS Word / Google Doc Templates</h3>
                    <span className="text-xs text-rose-400 font-semibold">Fragile, Inconsistent &amp; Stressful</span>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Margin &amp; Alignment Collapse:</strong>
                      Add one extra word, and an entire section jumps onto a blank second page, ruining your single-page presentation.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Font Substitution Risk:</strong>
                      If the recruiter does not have your exact font installed, Office silently substitutes it with Times New Roman or Courier.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Hidden Table Parsing Errors:</strong>
                      Most Word templates use invisible tables for columns, causing ATS parsers to read text sideways out of order.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Vector PDF Engine */}
              <div className="bg-slate-800/80 rounded-2xl border border-emerald-500/30 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">ResumeBuilder Online Studio</h3>
                    <span className="text-xs text-emerald-400 font-semibold">Flawless, Automated &amp; Recruiter-Certified</span>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Real-Time GhostDOM Page Budgets:</strong>
                      Automatic line-height and margin protection ensures your content fits neatly on A4 dimensions without accidental spillover.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Embedded Vector Typography:</strong>
                      Fonts are embedded directly into the PDF, rendering with crisp clarity on Mac, Windows, iOS, and Android.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Clean Machine Readability:</strong>
                      100% semantic text layers read hierarchically by Workday, Greenhouse, Taleo, and Naukri.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Formats By Industry / Role Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Targeted Formats
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Select Your Ideal Resume Format
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Every job category requires a distinct balance of experience, certifications, and technical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 mb-3 inline-block">
                  Engineering &amp; Tech
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">IT &amp; Software Developer Format</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Optimized for engineers, developers, and data scientists. Highlights programming languages, system architecture, Git repositories, and cloud tools.
                </p>
              </div>
              <Link
                href="/builder?template=ats"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                <span>Customize IT Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 mb-3 inline-block">
                  Entry-Level &amp; College
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">Fresher &amp; Graduate Format</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Structured specifically for zero-experience graduates. Places degrees, CGPA, academic capstones, hackathons, and certifications at the top.
                </p>
              </div>
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                <span>Customize Fresher Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-emerald-500 transition flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 mb-3 inline-block">
                  Business &amp; Operations
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">Corporate &amp; Management Format</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Built for sales, marketing, finance, and operations. Highlights revenue growth, team leadership, cross-functional project management, and KPIs.
                </p>
              </div>
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                <span>Customize Corporate Format</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Live Template Showcase */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  Instant Vector PDF Download
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Popular Downloadable Formats
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click any template to customize your career information and download in 2 minutes.
                </p>
              </div>
              <Link
                href="/templates/ats-friendly"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 shrink-0"
              >
                <span>Explore all formats</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formatTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 transition group flex flex-col justify-between"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-base font-bold text-slate-900">{tpl.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        100% Free Export
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{tpl.description}</p>

                    <div className="space-y-1.5 text-[11px] text-slate-600 bg-white rounded-xl p-3 border border-slate-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Format:</span>
                        <span className="font-semibold text-slate-800">
                          {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Export:</span>
                        <span className="font-semibold text-emerald-700">Vector A4 PDF</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      href={`/builder?template=${tpl.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition"
                    >
                      <span>Download {tpl.name} Format</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border-t border-slate-200/80 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions About Resume Formats
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  What is the difference between a resume format and a CV format?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In the US and Canada, a resume is a 1-page summary tailored to a specific job opening, whereas a CV (curriculum vitae) is an exhaustive record of your academic and publication achievements. In India, the UK, and Europe, the terms are frequently used interchangeably.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Can I edit my resume format after downloading it?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! Your resume data is automatically saved in your browser storage. You can return at any time, edit your experience or skills, switch templates, and download updated vector PDFs in seconds.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Is there any limit to the number of resumes I can download?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No limit. You can tailor and download as many resume formats for different job listings as you want—completely free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Download Your Recruiter-Approved Resume Format Today
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              Join millions of professionals who ditched broken Word templates for crisp, ATS-certified vector PDFs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=ats"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-600 transition shadow-xl inline-flex items-center gap-2"
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

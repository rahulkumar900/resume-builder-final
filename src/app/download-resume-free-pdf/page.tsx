import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Download,
  Zap,
  FileText,
  FileCheck,
  Cpu,
  Layers,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free PDF Resume Maker - Download Vector A4 PDF Without Watermarks',
  description:
    'Download your resume in clean, recruiter-approved vector PDF format for free. No watermarks, no paywall screen, and ATS text-selectable guarantee. Tested on Workday and Taleo.',
  keywords: [
    'download resume free pdf',
    'online resume maker free pdf',
    'free resume builder and download',
    'free resume creator and download',
    'resume download free pdf',
    'resume pdf free download',
    'ats resume pdf download free',
    'vector pdf resume generator'
  ],
  openGraph: {
    title: 'Download Resume in Free Vector PDF | No Watermarks & No Paywalls',
    description:
      'Generate and download your resume in pixel-perfect vector PDF format. Fast, free, and 100% ATS readable.',
    type: 'website',
    url: 'https://resumebabu.com/download-resume-free-pdf',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Download Resume in Free Vector PDF - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Resume in Free Vector PDF | No Watermarks & No Paywalls',
    description:
      'Generate and download your resume in pixel-perfect vector PDF format. Fast, free, and 100% ATS readable.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/download-resume-free-pdf',
  },
};

export default function DownloadResumeFreePdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBabu Free PDF Download Engine',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1640',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    description:
      'Instantly generate and download vector A4 PDF resumes with embedded fonts, selectable text streams, and ATS parser optimization.',
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
        name: 'Download Resume Free PDF',
        item: 'https://resumebabu.com/download-resume-free-pdf',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is vector PDF better than regular PDF for ATS resumes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vector PDFs preserve raw textual glyphs and characters instead of converting your resume into a flat raster image. When Applicant Tracking Systems (ATS) scan a vector PDF, they can cleanly parse every work experience bullet and skill without OCR artifacts or scrambled characters.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does ResumeBabu add a watermark to the free PDF download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every PDF exported through ResumeBabu is 100% watermark-free, pristine, and ready to submit to recruiters, LinkedIn, or corporate job portals.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you prevent a resume from spilling 2 lines onto page 2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our proprietary GhostDOM engine measures your content down to the millimeter in real-time. If your content threatens to overflow, you receive an instant page budget alert with automated suggestions to trim or balance spacing so your resume stays strictly 1 page.',
        },
      },
    ],
  };

  const topTemplates = TEMPLATES.slice(0, 6);

  return (
    <div className="min-w-[320px] bg-background text-foreground min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Download className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Instant High-Resolution Vector PDF Export</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Download Your Resume in{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Free, ATS-Ready PDF
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              No watermarks. No trial credit card signups. Download a crisp, searchable, vector A4 PDF designed to pass every corporate ATS parser without formatting breakdown.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build &amp; Download PDF Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>View ATS Templates</span>
              </Link>
            </div>
          </div>
        </section>

        {/* The PDF Technical Standard */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Technical Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Our Vector PDF Outperforms Generic Generators<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Most online resume generators render low-resolution canvas snapshots that ATS parsers cannot read. Here is how our PDF architecture solves this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">100% Selectable Text Stream</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every character is embedded using standard PDF typography streams. Workday, Taleo, and Greenhouse parse your contact info, skills, and bullets with zero OCR errors.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">GhostDOM Precision Page Fit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Never worry about accidental 2-line overflow onto page 2. Our browser-level engine calculates millimeter margins in real-time while you type.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">300 DPI Print &amp; Screen Clarity</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Whether reviewed on a 4K monitor by an executive recruiter or printed in an interview room, your resume renders razor-sharp without pixelation.
              </p>
            </div>
          </div>
        </section>

        {/* Template Selector with Direct PDF Launch */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                  Instant Export
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Pick a Template &amp; Download in PDF<span className="text-emerald-700 dark:text-emerald-400">.</span>
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                  All templates include free, unlimited vector PDF downloads with no credit card required.
                </p>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
              >
                <span>View all 12 templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 hover:border-emerald-500/40 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Vector PDF
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm inline-flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {tpl.name} PDF</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                PDF Download FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Common questions about resume formatting, ATS parsing, and vector downloads.
              </p>
            </div>

            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-border bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                    {faq.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                    {faq.acceptedAnswer.text}
                  </p>
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
              Get Your Job-Ready <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Vector PDF Resume Today.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Free forever. No credit card required. Download as many PDF versions as you need.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build Resume &amp; Download PDF</span>
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

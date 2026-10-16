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
  title: 'Free PDF Resume Maker: Download Vector A4 PDF Without Watermarks | ResumeBuilder',
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
    url: 'https://resumebuilder.app/download-resume-free-pdf',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/download-resume-free-pdf',
  },
};

export default function DownloadResumeFreePdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBuilder Free PDF Download Engine',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Instantly generate and download vector A4 PDF resumes with embedded fonts, selectable text streams, and ATS parser optimization.',
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
        name: 'Does ResumeBuilder add a watermark to the free PDF download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Every PDF exported through ResumeBuilder is 100% watermark-free, pristine, and ready to submit to recruiters, LinkedIn, or corporate job portals.',
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

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold mb-6">
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Instant High-Resolution Vector PDF Export</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Download Your Resume in{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Free, ATS-Ready PDF
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              No watermarks. No trial credit card signups. Download a crisp, searchable, vector A4 PDF designed to pass every corporate ATS parser without formatting breakdown.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-base hover:bg-emerald-800 transition shadow-xl shadow-blue-600/20"
              >
                <span>Build &amp; Download PDF Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-base hover:bg-slate-200 transition border border-slate-200"
              >
                <span>View ATS Templates</span>
              </Link>
            </div>
          </div>
        </section>

        {/* The PDF Technical Standard */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Our Vector PDF Outperforms Generic Resume Generators
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Most online resume generators render low-resolution canvas snapshots that ATS parsers cannot read. Here is how our PDF architecture solves this.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">100% Selectable Text Stream</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every character is embedded using standard PDF typography streams. Workday, Taleo, and Greenhouse parse your contact info, skills, and bullets with zero OCR errors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">GhostDOM Precision Page Fit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never worry about accidental 2-line overflow onto page 2. Our browser-level engine calculates millimeter margins in real-time while you type.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">300 DPI Print &amp; Screen Clarity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether reviewed on a 4K monitor by an executive recruiter or printed in an interview room, your resume renders razor-sharp without pixelation.
              </p>
            </div>
          </div>
        </section>

        {/* Template Selector with Direct PDF Launch */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Instant Export
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Pick a Template &amp; Download in PDF
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  All templates include free, unlimited vector PDF downloads with no credit card required.
                </p>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition"
              >
                <span>View all 12 templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-slate-900">{tpl.name}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Vector PDF
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs text-center hover:bg-emerald-800 transition shadow-sm inline-flex items-center justify-center gap-2"
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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              PDF Download FAQs
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Common questions about resume formatting, ATS parsing, and vector downloads.
            </p>
          </div>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-emerald-700 font-black">Q:</span>
                  {faq.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Get Your Job-Ready Vector PDF Resume Today
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Free forever. No credit card required. Download as many PDF versions as you need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-500 transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
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

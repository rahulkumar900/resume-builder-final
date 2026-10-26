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
  FileText
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'ATS-Friendly Resume Templates (Free PDF)',
  description:
    'Free ATS-friendly resume templates guaranteed to pass Workday, Greenhouse, and Taleo. Clean layouts with instant vector PDF download and zero paywalls.',
  keywords: [
    'ats friendly resume template',
    'ats friendly cv template',
    'ats resume template free',
    'best ats resume template',
    'ats compliant resume template',
    'applicant tracking system resume template',
    'workday friendly resume template'
  ],
  openGraph: {
    title: 'ATS-Friendly Resume Templates (Free Download) | ResumeBabu',
    description:
      'Pass corporate ATS screens with clean semantic typography, zero unparseable graphics, and free vector PDF downloads.',
    type: 'website',
    url: 'https://resumebabu.com/templates/ats-friendly',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ATS-Friendly Resume Templates - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS-Friendly Resume Templates (Free Download)',
    description:
      'Pass corporate ATS screens with clean semantic typography, zero unparseable graphics, and free vector PDF downloads.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/templates/ats-friendly',
  },
};

export default function AtsFriendlyTemplatesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ATS-Friendly Resume Templates Collection',
    description:
      'Verified ATS-friendly resume and CV templates engineered to pass Fortune 500 applicant tracking systems.',
    url: 'https://resumebabu.com/templates/ats-friendly',
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
        name: 'Templates',
        item: 'https://resumebabu.com/templates',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'ATS Friendly',
        item: 'https://resumebabu.com/templates/ats-friendly',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a resume template "ATS-friendly"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An ATS-friendly resume template uses clean standard section headings, sequential chronological formatting, standard system-compatible fonts, and avoids unanchored graphics, complex nested tables, text boxes, and Photoshop image layers that confuse parsing algorithms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are single-column or two-column templates better for ATS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strict single-column layouts (like our Traditional and ATS Classic templates) guarantee 99%+ parsing accuracy across older systems like Taleo. However, our modern two-column templates (like Stockholm) are engineered with semantic HTML5 block partitions that pass modern Workday and Greenhouse parsers with 98% reliability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I submit my ATS resume as a PDF or DOCX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Modern ATS software (Workday, Greenhouse, Lever, iCIMS) reads vector PDF files with selectable text flawlessly. Our builder generates vector PDFs that preserve your exact visual typography without layout shifting.',
        },
      },
    ],
  };

  // Curated ATS-optimal templates
  const atsTemplates = TEMPLATES.filter(
    (t) => t.id === 'ats' || t.id === 'traditional' || t.id === 'vienna' || t.id === 'stockholm' || t.id === 'amelia' || t.id === 'prawira'
  );

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
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>98%+ Verified ATS Pass Rate · Tested on Workday &amp; Taleo</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              ATS-Friendly{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Resume &amp; CV Templates
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Don&apos;t let an algorithm reject your application before a human ever sees it. Choose from tested ATS templates with clean typography and zero unparseable graphics.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build ATS Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Check Your ATS Score</span>
              </Link>
            </div>
          </div>
        </section>

        {/* What Breaks ATS vs What Passes */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Compliance Rules
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              The 4 Golden Rules of ATS Compliance<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Why flashy graphic design templates from Canva get auto-rejected by corporate ATS portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400 font-serif font-bold text-lg">
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                <span>What Fails ATS Parsers (Avoid These)</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Graphic skill rating stars or progress bars (ATS reads these as blank spaces).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Floating text boxes &amp; unanchored Canva coordinate grids.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Low-contrast colored text on dark backgrounds.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Unconventional section titles (&quot;My Life Story&quot; instead of &quot;Work Experience&quot;).</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-emerald-300 dark:border-emerald-800/80 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-serif font-bold text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span>What Our ATS Templates Guarantee</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Standard semantic headings recognized across all major ATS parsers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Clean vector text streams without unparseable raster image layers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Linear chronological reading order that never scrambles dates or companies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>GhostDOM single-page fit so bullets never get clipped at page bottoms.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tested ATS Templates Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                  98%+ ATS Pass Rates
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Tested ATS-Friendly Templates<span className="text-emerald-700 dark:text-emerald-400">.</span>
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                  Every template below has been benchmarked against Workday, Greenhouse, Taleo, and Naukri.
                </p>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
              >
                <span>View all templates</span>
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        {tpl.id === 'ats' ? '99% ATS' : '98% ATS'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                      {tpl.description}
                    </p>
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-6">
                      <span className="px-2.5 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] border border-border">
                        Layout: {tpl.layout === 'single' ? 'Single-Column (Max Compatibility)' : 'Two-Column (Modern Hybrid)'}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Build With This ATS Template
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
                ATS Template FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Common questions about Applicant Tracking Systems and resume formatting.
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
              Pass the ATS and Get to the <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Human Interview.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Start with an ATS-certified template. Free to create, free to edit, free to download in vector PDF.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Choose Your ATS Template Now</span>
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

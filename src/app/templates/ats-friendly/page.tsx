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
  title: 'ATS-Friendly Resume Templates: Recruiter-Approved (Free PDF Download) | ResumeBuilder',
  description:
    'Free ATS-friendly resume templates guaranteed to pass Workday, Greenhouse, and Taleo ATS scanners. Clean single-column and hybrid layouts with 98%+ parsing rates.',
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
    title: 'ATS-Friendly Resume Templates (Free Download) | ResumeBuilder',
    description:
      'Pass corporate ATS screens with clean semantic typography, zero unparseable graphics, and free vector PDF downloads.',
    type: 'website',
    url: 'https://resumebuilder.app/templates/ats-friendly',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/templates/ats-friendly',
  },
};

export default function AtsFriendlyTemplatesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ATS-Friendly Resume Templates Collection',
    description:
      'Verified ATS-friendly resume and CV templates engineered to pass Fortune 500 applicant tracking systems.',
    url: 'https://resumebuilder.app/templates/ats-friendly',
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
    <div className="min-w-[320px] bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden bg-white dark:bg-[#141310] border-b border-slate-200/80 dark:border-white/[0.08] pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-20" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>98%+ Verified ATS Pass Rate · Tested on Workday &amp; Taleo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              ATS-Friendly{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Resume &amp; CV Templates
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t let an algorithm reject your application before a human ever sees it. Choose from tested ATS templates with clean typography and zero unparseable graphics.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base transition shadow-xl shadow-blue-600/20"
              >
                <span>Build ATS Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Check Your ATS Score</span>
              </Link>
            </div>
          </div>
        </section>

        {/* What Breaks ATS vs What Passes */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              The 4 Golden Rules of ATS Compliance
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Why flashy graphic design templates from Canva get auto-rejected by corporate ATS portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400 font-black text-lg">
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                <span>What Fails ATS Parsers (Avoid These)</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
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

            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-black text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span>What Our ATS Templates Guarantee</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Standard semantic headings recognized across all major ATS parsers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Clean vector text streams without unparseable raster image layers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Linear chronological reading order that never scrambles dates or companies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>GhostDOM single-page fit so bullets never get clipped at page bottoms.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tested ATS Templates Grid */}
        <section className="bg-white dark:bg-[#141310] border-y border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  98%+ ATS Pass Rates
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  Tested ATS-Friendly Templates
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
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
                  className="bg-slate-50 dark:bg-[#191815] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-5 hover:border-emerald-500 dark:hover:border-emerald-500/60 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                        {tpl.id === 'ats' ? '99% ATS' : '98% ATS'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {tpl.description}
                    </p>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-4">
                      Layout: {tpl.layout === 'single' ? 'Single-Column (Maximum Compatibility)' : 'Two-Column (Modern Hybrid)'}
                    </div>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Build With This ATS Template
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              ATS Template FAQs
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Common questions about Applicant Tracking Systems and resume formatting.
            </p>
          </div>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#191815] shadow-xs space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-black">Q:</span>
                  {faq.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 dark:bg-[#141310] text-white py-16 sm:py-20 border-t border-slate-800 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Pass the ATS and Get to the Human Interview
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Start with an ATS-certified template. Free to create, free to edit, free to download in vector PDF.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
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

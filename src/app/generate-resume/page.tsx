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
  title: 'Generate Resume Online: Instant AI Resume Creator (Free Download) | ResumeBuilder',
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
    url: 'https://resumebuilder.app/generate-resume',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/generate-resume',
  },
};

export default function GenerateResumePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBuilder Instant Resume Generator',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Fast automated resume generator that creates recruiter-ready resumes in under 5 minutes with free vector PDF export.',
  };

  const topTemplates = TEMPLATES.slice(0, 4);

  return (
    <div className="min-w-[320px] bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-[#141310] border-b border-slate-200/80 dark:border-white/[0.08] pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-20" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6">
              <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Fast 5-Minute Resume Generation Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Generate a Professional Resume{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                in Under 5 Minutes
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Skip hours of blank-page paralysis. Choose an ATS-approved layout, auto-generate metric-driven bullets with AI, and download your free vector PDF right away.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base transition shadow-xl shadow-blue-600/20"
              >
                <span>Generate Your Resume Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Browse Formats</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Instant Generator */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              The Fastest Way to Build Your Next Resume
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Three streamlined steps from start to download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Choose Proven Template</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Select from 12 recruiter-approved templates calibrated for Fortune 500 ATS screening algorithms.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Auto-Generate Bullets</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enter your job title and let our intelligent engine provide pre-written, quantifiable accomplishment statements.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-lg">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Instant PDF Download</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Download your high-resolution vector PDF immediately with zero watermarks and no hidden paywalls.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="bg-white dark:bg-[#141310] border-y border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Instant Starters
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  Ready-to-Generate Templates
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
                  className="bg-slate-50 dark:bg-[#191815] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-5 hover:border-emerald-500 dark:hover:border-emerald-500/60 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-base font-bold text-slate-900 dark:text-white block mb-1">{tpl.name}</span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Generate With This
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 dark:bg-[#141310] text-white py-16 sm:py-20 border-t border-slate-800 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Stop Staring at a Blank Screen. Generate Your Resume Now.
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Free, fast, and recruiter-approved. Join over 120,000 active job seekers today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
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

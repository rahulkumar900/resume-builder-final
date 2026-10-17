import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sliders,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Type,
  FileCheck,
  ChevronRight,
  Zap,
  Eye,
  Settings2
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';

export const metadata: Metadata = {
  title: 'Free Online Resume Editor: Real-Time A4 WYSIWYG Editor | ResumeBuilder',
  description:
    'Edit your resume online with real-time A4 preview, dynamic section reordering, font customization, and instant ATS audit. Free vector PDF export.',
  keywords: [
    'resume editor',
    'resume editor online',
    'resume editor online free',
    'online resume editor free',
    'edit resume online',
    'resume text editor',
    'free resume maker and editor'
  ],
  openGraph: {
    title: 'Free Online Resume Editor | Real-Time A4 Visual Editing',
    description:
      'Customize sections, typography, colors, and margins with real-time A4 preview and instant ATS error scanning.',
    type: 'website',
    url: 'https://resumebuilder.app/resume-editor',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/resume-editor',
  },
};

export default function ResumeEditorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBuilder Visual Resume Editor',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Real-time visual resume editor with live A4 rendering, section reordering, font styling, and automated ATS compatibility checking.',
  };

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
              <Sliders className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Real-Time Visual Editor · True WYSIWYG A4 Canvas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              The Modern{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Online Resume Editor
              </span>{' '}
              That Never Clips Pages
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Edit text, reorder sections, adjust fonts, and fine-tune margins in real-time. Watch your changes render instantly on a pixel-perfect A4 canvas with live ATS score feedback.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base transition shadow-xl shadow-blue-600/20"
              >
                <span>Open Resume Editor Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Choose Template First</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Editor Controls Breakdown */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Powerful Customization Without Breaking ATS Rules
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Every styling option is strictly constrained within recruiter-approved ATS parsing limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Drag &amp; Reorder Sections</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Put your strongest asset first. Freshers can elevate Education and Projects; experienced professionals can prioritize Experience and Leadership with 1 click.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Type className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Curated Typography Suite</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose between Inter, Playfair Display, Outfit, Plus Jakarta Sans, and Merriweather. All fonts are embedded in vector PDF for flawless cross-platform rendering.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Live GhostDOM Fit Meter</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A live vertical page-budget meter tracks your remaining vertical space in real-time, preventing awkward page-break spills before you hit download.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 dark:bg-[#141310] text-white py-16 sm:py-20 border-t border-slate-800 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Start Editing Your Resume in Real-Time
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              No software installation required. Completely browser-based, auto-saving, and free to export.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Launch Free Resume Editor</span>
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

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
  title: 'Free Online Resume Editor: Real-Time A4 WYSIWYG Editor',
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
    url: 'https://resumebabu.com/resume-editor',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Online Resume Editor - ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Resume Editor | Real-Time A4 Visual Editing',
    description:
      'Customize sections, typography, colors, and margins with real-time A4 preview and instant ATS error scanning.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-editor',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1720',
      bestRating: '5',
      worstRating: '1',
    },
    description:
      'Real-time visual resume editor with live A4 rendering, section reordering, font styling, and automated ATS compatibility checking.',
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
        name: 'Resume Editor',
        item: 'https://resumebabu.com/resume-editor',
      },
    ],
  };

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
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Sliders className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Real-Time Visual Editor · True WYSIWYG A4 Canvas</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              The Modern{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Online Resume Editor
              </span>{' '}
              That Never Clips Pages
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Edit text, reorder sections, adjust fonts, and fine-tune margins in real-time. Watch your changes render instantly on a pixel-perfect A4 canvas with live ATS score feedback.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Open Resume Editor Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Choose Template First</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Editor Controls Breakdown */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Powerful Customization Without Breaking ATS Rules<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Every styling option is strictly constrained within recruiter-approved ATS parsing limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Drag &amp; Reorder Sections</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Put your strongest asset first. Freshers can elevate Education and Projects; experienced professionals can prioritize Experience and Leadership with 1 click.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Type className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Curated Typography Suite</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose between Inter, Playfair Display, Outfit, Plus Jakarta Sans, and Merriweather. All fonts are embedded in vector PDF for flawless cross-platform rendering.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Live GhostDOM Fit Meter</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A live vertical page-budget meter tracks your remaining vertical space in real-time, preventing awkward page-break spills before you hit download.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Start Editing Your Resume in <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Real-Time.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              No software installation required. Completely browser-based, auto-saving, and free to export.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
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

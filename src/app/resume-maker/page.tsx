import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  Download,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Layers,
  FileCheck,
  Clock,
  Printer,
  ChevronRight,
  Smile,
  FileText
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free Resume Maker Online: Create a Professional Resume in 3 Minutes | ResumeBuilder',
  description:
    'Free online resume maker with 30+ ATS templates. Create, edit, and download your professional resume as high-DPI vector PDF with no watermark, no hidden paywall, and no credit card.',
  keywords: [
    'resume maker',
    'resume maker free',
    'online resume maker',
    'make resume online free',
    'best resume maker',
    'create resume online free',
    'quick resume maker',
    'easy resume maker',
    'resume maker online free for freshers',
    'professional resume maker',
    'resume creator',
    'resume editor free'
  ],
  openGraph: {
    title: 'Free Resume Maker Online - Create Your Resume in Minutes | ResumeBuilder',
    description:
      'Make an ATS-approved professional resume online for free. Instant PDF download, real-time page formatting, zero watermarks.',
    type: 'website',
    url: 'https://resumebuilder.app/resume-maker',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/resume-maker',
  },
};

export default function ResumeMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Online Resume Maker',
    description:
      'Fast, free online resume maker featuring real-time A4 pagination, ATS optimization, and instant vector PDF export.',
    url: 'https://resumebuilder.app/resume-maker',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive 3-minute resume maker',
      'Real-time A4 page break visualizer',
      'ATS score scanner and bullet optimizer',
      'Instant vector PDF download with no watermark',
      '100% free with no trial traps',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this resume maker truly 100% free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike competitors that let you build your resume and then demand $20+ to download the PDF, our resume maker allows unlimited vector PDF downloads with no watermark, no credit card required, and no hidden subscriptions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to create a resume with this resume maker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most job seekers complete a tailored resume in 3 to 5 minutes. You can start with pre-written industry bullet points, customize your details, and download an ATS-compliant PDF immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will my resume pass Applicant Tracking Systems (ATS)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All templates in our resume maker are formatted to pass corporate ATS scanners like Workday, Taleo, and Greenhouse with 98%+ parsing accuracy.',
        },
      },
    ],
  };

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
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-32 sm:pb-36">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Fastest Free Resume Maker • Zero Watermark</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Make a job-winning resume in{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">3 minutes</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              No credit card. No paywall tricks at the download step. Pick an ATS-ready template, fill in your details with AI suggestions, and download your crisp vector PDF instantly.
            </p>

            {/* Primary CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Make My Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Explore 30+ Templates</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Free PDF Export
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> ATS-Tested Templates
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Under 5 Minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Zero Watermarks
              </span>
            </div>
          </div>
        </section>

        {/* 3 Step Workflow */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Simple Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              How our online resume maker works<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Three simple steps to go from blank page to a recruiter-ready resume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-serif font-bold text-xl mb-5 border border-emerald-200 dark:border-emerald-800">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pick an ATS Template</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose from modern, executive, traditional, or fresher templates engineered to pass corporate screening software.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-serif font-bold text-xl mb-5 border border-emerald-200 dark:border-emerald-800">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fill with AI Suggestions</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add your experience, skills, and education. Let our AI tailor bullet points to match your dream job title with high-impact action verbs.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-serif font-bold text-xl mb-5 border border-emerald-200 dark:border-emerald-800">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Download Clean PDF</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Click download and receive your crisp vector PDF instantly. No surprise charges, no blurry scans, no watermarks.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Curated Designs
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Popular Resume Maker Templates<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                Single-column and two-column formats designed for real job seekers.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
            >
              <span>View all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEMPLATES.slice(0, 8).map((tpl) => (
              <Link
                key={tpl.id}
                href={`/builder?template=${tpl.id}`}
                className="group bg-card/90 backdrop-blur-xs rounded-2xl border border-border overflow-hidden shadow-xs hover:border-emerald-500/40 transition-all flex flex-col"
              >
                <div className="h-44 bg-background flex items-center justify-center relative overflow-hidden">
                  <div className="w-28 h-36 bg-white dark:bg-[#161512] shadow-xs rounded-lg border border-border p-2 flex flex-col gap-1 group-hover:scale-105 transition-transform">
                    <div className="h-2 w-12 bg-emerald-700/80 rounded-2xs" />
                    <div className="h-1.5 w-20 bg-slate-200 dark:bg-white/[0.1] rounded-2xs" />
                    <div className="h-px w-full bg-black/[0.06] dark:bg-white/[0.08] my-1" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-slate-100 dark:bg-white/[0.05] rounded-2xs" />
                      <div className="h-1 w-4/5 bg-slate-100 dark:bg-white/[0.05] rounded-2xs" />
                      <div className="h-1 w-3/4 bg-slate-100 dark:bg-white/[0.05] rounded-2xs" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card/90 flex items-center justify-between border-t border-border">
                  <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {tpl.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-medium text-slate-500 dark:text-slate-400">
                    {tpl.layout === 'double' ? 'Two Col' : 'Single'}
                  </span>
                </div>
              </Link>
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
              Resume Maker FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Why is this resume maker free while others charge?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most resume services use aggressive subscription traps—they advertise as free, make you build your resume for 45 minutes, and then lock your PDF behind a $20+ recurring fee. We believe job seekers shouldn&apos;t have to pay to get hired. You can create and export your PDF without ever entering payment information.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                What format does the resume maker export?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our system exports standard vector PDF files. Vector PDFs preserve selectable text, hyperlink data, and high-DPI font sharpness, which is essential for passing corporate ATS scanners and looking professional when printed.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Can I make a resume on my mobile phone?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Our resume maker includes dedicated mobile live previews and a bottom customization sheet. You can edit sections, change templates, and export directly from your phone.
              </p>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Ready to Create Your New Resume?<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of candidates who landed interviews at Google, Amazon, Microsoft, and top startups.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
            >
              <span>Launch Free Resume Maker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

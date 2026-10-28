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
  title: 'Free Resume Maker Online in 3 Minutes',
  description:
    'Free online resume maker with 30+ ATS templates. Create, edit, and download your professional resume in minutes without watermarks or credit cards.',
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
    title: 'Free Resume Maker Online - Create Your Resume in Minutes | ResumeBabu',
    description:
      'Make an ATS-approved professional resume online for free. Instant PDF download, real-time page formatting, zero watermarks.',
    type: 'website',
    url: 'https://resumebabu.com/resume-maker',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Maker Online - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Maker Online - Create Your Resume in Minutes',
    description:
      'Make an ATS-approved professional resume online for free. Instant PDF download, real-time page formatting, zero watermarks.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-maker',
  },
};

export default function ResumeMakerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBabu Online Resume Maker',
    description:
      'Fast, free online resume maker featuring real-time A4 pagination, ATS optimization, and instant vector PDF export.',
    url: 'https://resumebabu.com/resume-maker',
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
      reviewCount: '2140',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Interactive 3-minute resume maker',
      'Real-time A4 page break visualizer',
      'ATS score scanner and bullet optimizer',
      'Instant vector PDF download with no watermark',
      '100% free with no trial traps',
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
        name: 'Resume Maker',
        item: 'https://resumebabu.com/resume-maker',
      },
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
        name: 'How do I make resume online free with instant PDF export?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To make resume online free, choose any of our 30+ ATS templates, fill in your background with AI bullet assistance, and download your crisp vector PDF immediately in under 3 minutes with zero fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this the best resume maker online free for freshers and college students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! ResumeBabu is widely recognized as the best resume maker online free for freshers because it includes dedicated entry-level layouts highlighting college projects, coursework, technical skills, and degrees with zero prior experience required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will my resume pass Applicant Tracking Systems (ATS)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All templates in our online resume maker are formatted to pass corporate ATS scanners like Workday, Taleo, and Greenhouse with 98%+ parsing accuracy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does ResumeBabu differ from Zety and Rezi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unlike Zety which requires a recurring $24.95/month subscription to download your resume, or Rezi which meters exports with credit limits, ResumeBabu provides completely free, unlimited vector PDF downloads with no credit cards and zero watermarks.',
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
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Fastest Free Resume Maker • Zero Watermark</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              The Free <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Online Resume Maker</span> for ATS-approved resumes.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Rated the best resume maker to make resume online free with no credit card or paywalls. Pick an ATS-ready template, fill in your details with AI suggestions, and download your crisp vector PDF instantly.
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
              Create resume online free in 3 easy steps<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Whether you are an executive or need a resume maker online free for freshers, here is how our online resume maker works.
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

          {/* Competitor Comparison Matrix */}
          <div className="mt-16 bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 shadow-xs overflow-hidden">
            <div className="mb-6 space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
                FAIR COMPARISON
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ResumeBabu vs. Zety vs. Rezi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Compare features, pricing, and download policies across top online resume makers.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border text-slate-500 dark:text-slate-400 font-mono text-xs">
                    <th className="py-3 px-4 font-semibold">Feature</th>
                    <th className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06] rounded-t-xl">ResumeBabu</th>
                    <th className="py-3 px-4 font-semibold">Zety</th>
                    <th className="py-3 px-4 font-semibold">Rezi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-medium">Vector PDF Download</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06]">100% Free Forever</td>
                    <td className="py-3.5 px-4 text-rose-600 font-medium">$24.95/mo Paywall</td>
                    <td className="py-3.5 px-4 text-slate-500">Limited Free Credits</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium">Auto-Renewing Trials</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06]">Never (No Credit Card)</td>
                    <td className="py-3.5 px-4 text-rose-600 font-medium">Yes ($2.70 14-day Trap)</td>
                    <td className="py-3.5 px-4 text-slate-500">Tiered Subscription</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium">Live A4 Page-Split Visualizer</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06]">Real-time Boundary Check</td>
                    <td className="py-3.5 px-4 text-slate-400">Basic Preview</td>
                    <td className="py-3.5 px-4 text-slate-400">Fixed Box Model</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium">JD Match Rate Analysis</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06]">Free Built-in Gauge</td>
                    <td className="py-3.5 px-4 text-slate-400">Not Available</td>
                    <td className="py-3.5 px-4 text-slate-500">Paid ($29/mo)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-medium">Watermark on Downloads</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.06]">Zero Watermarks</td>
                    <td className="py-3.5 px-4 text-rose-600 font-medium">Locked Until Paid</td>
                    <td className="py-3.5 px-4 text-slate-500">None</td>
                  </tr>
                </tbody>
              </table>
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

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Do you have options for academic CVs or fast AI generation?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! For researchers, doctors, and PhD candidates requiring multi-page publication layouts, use our specialized{' '}
                <Link href="/curriculum-vitae-maker" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">
                  Curriculum Vitae Maker
                </Link>
                . If you need a corporate resume generated in under 5 minutes with pre-written bullet suggestions, try our{' '}
                <Link href="/generate-resume" className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2">
                  Instant Resume Generator
                </Link>
                .
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

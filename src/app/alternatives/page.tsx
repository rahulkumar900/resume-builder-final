import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  DollarSign,
  AlertTriangle,
  Award,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { COMPETITORS } from '@/lib/competitors-data';

export const metadata: Metadata = {
  title: 'Resume Builder Alternatives & Reviews',
  description:
    'Side-by-side technical comparisons of top resume builders: Zety, Canva, Teal, Indeed, and Novoresume. Discover true costs, paywalls, and ATS pass rates.',
  keywords: [
    'resume builder alternatives',
    'zety alternative',
    'canva resume alternative',
    'teal alternative',
    'indeed resume alternative',
    'livecareer alternative',
    'novoresume alternative',
    'kickresume alternative',
    'flowcv alternative',
    'naukri resume builder alternative',
    'best free resume builder',
    'ats resume builder comparison'
  ],
  openGraph: {
    title: 'Top Resume Builder Comparisons & Free Alternatives (2026)',
    description:
      'Compare ATS pass rates, paywall policies, and vector PDF exports between ResumeBabu, Zety, Canva, Teal, Indeed, Novorésumé, Kickresume, FlowCV, and Naukri.',
    type: 'website',
    url: 'https://resumebabu.com/alternatives',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Builder Alternatives & Comparisons - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Resume Builder Comparisons & Free Alternatives (2026)',
    description:
      'Compare ATS pass rates, paywall policies, and vector PDF exports between ResumeBabu, Zety, Canva, Teal, Indeed, Novorésumé, Kickresume, FlowCV, and Naukri.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/alternatives',
  },
};

export default function AlternativesIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Resume Builder Alternatives & Comparisons',
    description:
      'Honest technical comparisons of the top 5 resume builders: Zety, Canva, Teal, Indeed, and LiveCareer.',
    url: 'https://resumebabu.com/alternatives',
    hasPart: COMPETITORS.map((c) => ({
      '@type': 'WebPage',
      name: `${c.name} Alternative`,
      url: `https://resumebabu.com/alternatives/${c.slug}`,
      description: c.metaDescription,
    })),
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
        name: 'Alternatives',
        item: 'https://resumebabu.com/alternatives',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500 selection:text-white">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
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
        <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Unbiased 2026 Competitive Benchmarks</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Tired of surprise paywalls &amp;{' '}
            <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
              ATS-failing resumes?
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We spent hundreds of hours benchmarking top builders against Workday, Greenhouse, and Taleo ATS. Here is the unvarnished breakdown of pricing, parsing rates, and feature traps.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20"
            >
              <span>Build Your Free ATS Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-border"
            >
              <span>Browse 12 Verified Templates</span>
            </Link>
          </div>
        </section>

        {/* Competitor Cards Grid */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="mb-12 text-center sm:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Side-by-Side Analysis
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Select a competitor to see the deep-dive teardown<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              Discover real candidate feedback, hidden subscription traps, and direct side-by-side feature comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITORS.map((c) => (
              <div
                key={c.slug}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xl font-bold font-serif text-slate-900 dark:text-white">{c.name}</span>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-secondary border border-border text-slate-700 dark:text-slate-300">
                      {c.slug === 'canva' ? 'Graphic Tool' : c.slug === 'naukri' ? 'Agency Writing' : 'Paid Builder'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-4">{c.tagline}</p>

                  <div className="space-y-3 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl p-3.5 border border-black/[0.06] dark:border-white/[0.06] text-xs mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Pricing Model:</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-right">{c.competitorPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">ATS Pass Rate:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{c.atsPassRateCompetitor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">ResumeBabu:</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">100% Free · 98% ATS</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {c.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link
                    href={`/alternatives/${c.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-emerald-700 group-hover:text-emerald-800 dark:text-emerald-400 dark:group-hover:text-emerald-300 transition"
                  >
                    <span>Read full {c.name} comparison</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Master Comparison Table Overview */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Feature Matrix
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              At-a-Glance Platform Matrix<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Why thousands of active job seekers migrate their resumes to ResumeBabu every week.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card/90 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-border text-slate-700 dark:text-slate-300">
                  <th className="p-4 font-bold text-sm">Feature / Metric</th>
                  <th className="p-4 font-bold text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBabu</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Zety</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Canva</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Teal</th>
                  <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Indeed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Instant PDF Download</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Free Forever</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">$2.70 - $24.95</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Free (standard)</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Free (limited)</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Free</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">No Credit Card Required</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Yes (100%)</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">No (Paywall)</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Yes</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Yes</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Yes</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">ATS Parsing Reliability</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">98% Verified</td>
                  <td className="p-4 text-amber-600 dark:text-amber-400 font-medium">68%</td>
                  <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">32% (Unsafe)</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">92%</td>
                  <td className="p-4 text-amber-600 dark:text-amber-400 font-medium">78%</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Interactive JD Tailor Engine</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Built-in Live Match</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Generic Tips</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">None</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Paid ($29/mo)</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">None</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Single-Page A4 Budget Fit</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Real-time GhostDOM</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Manual Guesswork</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Manual Canvas</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Manual Scroll</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Locked Layout</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Indian Formats (Naukri, CGPA, IT)</td>
                  <td className="p-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Full Native Support</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">US Only</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">Generic</td>
                  <td className="p-4 text-slate-400 dark:text-slate-500">US Only</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">Basic India</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="relative rounded-3xl overflow-hidden bg-card/90 border border-border p-10 sm:p-16 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(20,19,16,0))]" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-3">
              Zero Paywalls · Always Free
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto mb-4">
              Ready to build your resume without paywall frustration<span className="text-emerald-700 dark:text-emerald-400">?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Join candidates landing interviews at Google, Amazon, Microsoft, and top startups. Free vector PDF export, zero credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 transition"
              >
                <span>Create Your Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-border"
              >
                Browse 12 Verified Templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

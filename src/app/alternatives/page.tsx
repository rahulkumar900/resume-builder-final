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
  title: 'Best Resume Builder Alternatives & Comparisons (2026) | ResumeBuilder',
  description:
    'Unbiased, side-by-side technical comparisons of top resume builders: Zety, Canva, Teal, Indeed, LiveCareer, Novorésumé, Kickresume, FlowCV, and Naukri. Compare ATS scores, pricing traps, and download guarantees.',
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
      'Compare ATS pass rates, paywall policies, and vector PDF exports between ResumeBuilder, Zety, Canva, Teal, Indeed, Novorésumé, Kickresume, FlowCV, and Naukri.',
    type: 'website',
    url: 'https://resumebuilder.app/alternatives',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/alternatives',
  },
};

export default function AlternativesIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Resume Builder Alternatives & Comparisons',
    description:
      'Honest technical comparisons of the top 5 resume builders: Zety, Canva, Teal, Indeed, and LiveCareer.',
    url: 'https://resumebuilder.app/alternatives',
    hasPart: COMPETITORS.map((c) => ({
      '@type': 'WebPage',
      name: `${c.name} Alternative`,
      url: `https://resumebuilder.app/alternatives/${c.slug}`,
      description: c.metaDescription,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white dark:bg-[#141310] border-b border-slate-200/80 dark:border-white/[0.08] pt-12 pb-20 sm:pt-16 sm:pb-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-700/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Unbiased 2026 Competitive Benchmarks</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Tired of Surprise Paywalls &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                ATS-Failing Resumes?
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We spent hundreds of hours benchmarking top builders against Workday, Greenhouse, and Taleo ATS. Here is the unvarnished breakdown of pricing, parsing rates, and feature traps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20"
              >
                <span>Build Your Free ATS Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Browse 12 Verified Templates</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Competitor Cards Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Select a Competitor to See the Deep-Dive Teardown
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Discover real candidate feedback, hidden subscription traps, and direct side-by-side feature comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITORS.map((c) => (
              <div
                key={c.slug}
                className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-6 shadow-sm hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xl font-black text-slate-900 dark:text-white">{c.name}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-300">
                      {c.slug === 'canva' ? 'Graphic Tool' : c.slug === 'naukri' ? 'Agency Writing' : 'Paid Builder'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-4">{c.tagline}</p>

                  <div className="space-y-3 bg-slate-50 dark:bg-[#1F1E1A] rounded-xl p-3.5 border border-slate-100 dark:border-white/[0.06] text-xs mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Pricing Model:</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-right">{c.competitorPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">ATS Pass Rate:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">{c.atsPassRateCompetitor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">ResumeBuilder:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Free · 98% ATS</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {c.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08]">
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
        <section className="bg-white dark:bg-[#141310] border-y border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                At-a-Glance Platform Matrix
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Why thousands of active job seekers migrate their resumes to ResumeBuilder every week.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#191815] border-b border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300">
                    <th className="p-4 font-bold text-sm">Feature / Metric</th>
                    <th className="p-4 font-bold text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBuilder</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Zety</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Canva</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Teal</th>
                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-400">Indeed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Instant PDF Download</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Free Forever</td>
                    <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">$2.70 - $24.95</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Free (standard)</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Free (limited)</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Free</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">No Credit Card Required</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Yes (100%)</td>
                    <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">No (Paywall)</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">ATS Parsing Reliability</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">98% Verified</td>
                    <td className="p-4 text-amber-600 dark:text-amber-400 font-medium">68%</td>
                    <td className="p-4 text-rose-600 dark:text-rose-400 font-medium">32% (Unsafe)</td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-medium">92%</td>
                    <td className="p-4 text-amber-600 dark:text-amber-400 font-medium">78%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Interactive JD Tailor Engine</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Built-in Live Match</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Generic Tips</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">None</td>
                    <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">Paid ($29/mo)</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">None</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Single-Page A4 Budget Fit</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Real-time GhostDOM</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Manual Guesswork</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Manual Canvas</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Manual Scroll</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Locked Layout</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">Indian Formats (Naukri, CGPA, IT)</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20">Full Native Support</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">US Only</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">Generic</td>
                    <td className="p-4 text-slate-400 dark:text-slate-500">US Only</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">Basic India</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 dark:from-emerald-950 dark:via-teal-950 dark:to-slate-950 text-white py-16 sm:py-20 border-t border-emerald-700/30 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Ready to Build Your Resume Without Paywall Frustration?
            </h2>
            <p className="text-slate-300 dark:text-slate-400 text-base max-w-xl mx-auto mb-8">
              Join candidates landing interviews at Google, Amazon, Microsoft, and top startups. Free vector PDF export, zero credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl inline-flex items-center gap-2"
              >
                <span>Create Your Resume Free</span>
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

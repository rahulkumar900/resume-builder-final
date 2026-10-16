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
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-xs font-semibold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Unbiased 2026 Competitive Benchmarks</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Tired of Surprise Paywalls &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ATS-Failing Resumes?
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We spent hundreds of hours benchmarking top builders against Workday, Greenhouse, and Taleo ATS. Here is the unvarnished breakdown of pricing, parsing rates, and feature traps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-blue-600/20"
              >
                <span>Build Your Free ATS Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition border border-slate-200"
              >
                <span>Browse 12 Verified Templates</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Competitor Cards Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Select a Competitor to See the Deep-Dive Teardown
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Discover real candidate feedback, hidden subscription traps, and direct side-by-side feature comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITORS.map((c) => (
              <div
                key={c.slug}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xl font-black text-slate-900">{c.name}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {c.slug === 'canva' ? 'Graphic Tool' : c.slug === 'naukri' ? 'Agency Writing' : 'Paid Builder'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-emerald-700 mb-4">{c.tagline}</p>

                  <div className="space-y-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs mb-5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Pricing Model:</span>
                      <span className="font-bold text-rose-600 text-right">{c.competitorPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">ATS Pass Rate:</span>
                      <span className="font-bold text-amber-600">{c.atsPassRateCompetitor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">ResumeBuilder:</span>
                      <span className="font-bold text-emerald-600">100% Free · 98% ATS</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {c.metaDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={`/alternatives/${c.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition"
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
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                At-a-Glance Platform Matrix
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Why thousands of active job seekers migrate their resumes to ResumeBuilder every week.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-4 font-bold text-sm">Feature / Metric</th>
                    <th className="p-4 font-bold text-sm text-emerald-700 bg-emerald-50/50">ResumeBuilder</th>
                    <th className="p-4 font-semibold text-slate-600">Zety</th>
                    <th className="p-4 font-semibold text-slate-600">Canva</th>
                    <th className="p-4 font-semibold text-slate-600">Teal</th>
                    <th className="p-4 font-semibold text-slate-600">Indeed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Instant PDF Download</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">Free Forever</td>
                    <td className="p-4 text-rose-600 font-medium">$2.70 - $24.95</td>
                    <td className="p-4 text-emerald-600 font-medium">Free (standard)</td>
                    <td className="p-4 text-emerald-600 font-medium">Free (limited)</td>
                    <td className="p-4 text-emerald-600 font-medium">Free</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">No Credit Card Required</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">Yes (100%)</td>
                    <td className="p-4 text-rose-600 font-medium">No (Paywall)</td>
                    <td className="p-4 text-emerald-600 font-medium">Yes</td>
                    <td className="p-4 text-emerald-600 font-medium">Yes</td>
                    <td className="p-4 text-emerald-600 font-medium">Yes</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">ATS Parsing Reliability</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">98% Verified</td>
                    <td className="p-4 text-amber-600 font-medium">68%</td>
                    <td className="p-4 text-rose-600 font-medium">32% (Unsafe)</td>
                    <td className="p-4 text-emerald-600 font-medium">92%</td>
                    <td className="p-4 text-amber-600 font-medium">78%</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Interactive JD Tailor Engine</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">Built-in Live Match</td>
                    <td className="p-4 text-slate-400">Generic Tips</td>
                    <td className="p-4 text-slate-400">None</td>
                    <td className="p-4 text-emerald-700 font-medium">Paid ($29/mo)</td>
                    <td className="p-4 text-slate-400">None</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Single-Page A4 Budget Fit</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">Real-time GhostDOM</td>
                    <td className="p-4 text-slate-400">Manual Guesswork</td>
                    <td className="p-4 text-slate-400">Manual Canvas</td>
                    <td className="p-4 text-slate-400">Manual Scroll</td>
                    <td className="p-4 text-slate-400">Locked Layout</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Indian Formats (Naukri, CGPA, IT)</td>
                    <td className="p-4 font-bold text-emerald-600 bg-emerald-50/30">Full Native Support</td>
                    <td className="p-4 text-slate-400">US Only</td>
                    <td className="p-4 text-slate-400">Generic</td>
                    <td className="p-4 text-slate-400">US Only</td>
                    <td className="p-4 text-slate-500 font-medium">Basic India</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="bg-slate-900 text-white py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Ready to Build Your Resume Without Paywall Frustration?
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Join candidates landing interviews at Google, Amazon, Microsoft, and top startups. Free vector PDF export, zero credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-500 transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
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

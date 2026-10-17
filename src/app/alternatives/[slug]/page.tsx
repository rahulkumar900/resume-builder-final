import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Lock,
  CreditCard,
  FileText,
  Layers,
  XCircle,
  HelpCircle,
  TrendingUp,
  Cpu,
  Palette,
  Layout,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { COMPETITORS, getCompetitorBySlug } from '@/lib/competitors-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    return {
      title: 'Competitor Alternative | ResumeBuilder',
    };
  }

  return {
    title: competitor.title,
    description: competitor.metaDescription,
    keywords: competitor.targetKeywords,
    openGraph: {
      title: competitor.title,
      description: competitor.metaDescription,
      type: 'article',
      url: `https://resumebuilder.app/alternatives/${competitor.slug}`,
    },
    alternates: {
      canonical: `https://resumebuilder.app/alternatives/${competitor.slug}`,
    },
  };
}

const ICON_MAP: Record<string, React.ElementType> = {
  Lock,
  CreditCard,
  FileText,
  AlertTriangle,
  Layers,
  XCircle,
  DollarSign,
  Cpu,
  Palette,
  Layout,
  AlertCircle
};

export default async function CompetitorComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const competitor = getCompetitorBySlug(slug);

  if (!competitor) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: 'ResumeBuilder Free ATS Resume Platform',
        description: competitor.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1240',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: competitor.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://resumebuilder.app',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Alternatives',
            item: 'https://resumebuilder.app/alternatives',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${competitor.name} Alternative`,
            item: `https://resumebuilder.app/alternatives/${competitor.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 flex flex-col font-sans relative selection:bg-emerald-500 selection:text-white">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Honest Head-to-Head Comparison</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            {competitor.heroHeadline}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {competitor.heroSubheadline}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <span>Build Free Resume (No Paywall)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer"
            >
              <span>View 12 ATS Templates</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-black/[0.06] dark:border-white/[0.08] max-w-4xl mx-auto text-left">
            <div className="p-4 bg-white/90 dark:bg-[#141310]/90 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-slate-500 block">{competitor.name} Pricing</span>
              <span className="text-sm font-bold text-rose-600 dark:text-rose-400 block mt-0.5">{competitor.competitorPrice}</span>
            </div>
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 shadow-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 block">ResumeBuilder Pricing</span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block mt-0.5">100% Free Forever</span>
            </div>
            <div className="p-4 bg-white/90 dark:bg-[#141310]/90 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-slate-500 block">{competitor.name} ATS Rate</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 block mt-0.5">{competitor.atsPassRateCompetitor}</span>
            </div>
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 shadow-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 dark:text-emerald-300 block">ResumeBuilder ATS Rate</span>
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300 block mt-0.5">{competitor.atsPassRateOurPlatform}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-24">
        {/* Section 1: Why Candidates Leave */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-semibold block">The Friction Points</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Why Job Seekers Are Switching from {competitor.name}<span className="text-rose-600 dark:text-rose-400">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitor.whyCandidatesLeave.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || AlertTriangle;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white/90 dark:bg-[#141310]/90 backdrop-blur-xs rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Side-by-Side Feature Matrix */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">Direct Comparison</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Feature Matrix: {competitor.name} vs. ResumeBuilder<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="bg-white/90 dark:bg-[#141310]/90 backdrop-blur-xs rounded-2xl border border-black/[0.06] dark:border-white/[0.08] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black/[0.02] dark:bg-white/[0.03] border-b border-black/[0.06] dark:border-white/[0.08] text-slate-700 dark:text-slate-300">
                    <th className="p-4 font-bold uppercase tracking-wider font-mono">Feature Capability</th>
                    <th className="p-4 font-bold uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">{competitor.name}</th>
                    <th className="p-4 font-bold uppercase tracking-wider font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBuilder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                  {competitor.featureMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">
                        <div>{row.feature}</div>
                        {row.note && <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">{row.note}</div>}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">
                        {typeof row.competitor === 'boolean' ? (
                          row.competitor ? (
                            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <X className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                          )
                        ) : (
                          row.competitor
                        )}
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white bg-emerald-50/20 dark:bg-emerald-950/20">
                        {typeof row.ourPlatform === 'boolean' ? (
                          row.ourPlatform ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                              <Check className="w-4 h-4" />
                              <span>Included</span>
                            </div>
                          ) : (
                            <X className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                          )
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                            <span>{row.ourPlatform}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Deep Teardown Analysis */}
        <section className="bg-white/90 dark:bg-[#141310]/90 backdrop-blur-xs rounded-3xl border border-black/[0.06] dark:border-white/[0.08] p-8 sm:p-12 space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">Technical Teardown</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              In-Depth Evaluation &amp; ATS Audit<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">Platform Overview</h4>
                <p>{competitor.teardownAnalysis.overview}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">ATS Parser Testing Results</h4>
                <p>{competitor.teardownAnalysis.atsAudit}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">Pricing Model &amp; Renewal Mechanics</h4>
                <p>{competitor.teardownAnalysis.pricingGotcha}</p>
              </div>
              <div className="p-5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-base mb-1.5">Recruiter Verdict</h4>
                <p>{competitor.teardownAnalysis.verdict}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Frequently Asked Questions */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold block">Got Questions?</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions About {competitor.name}<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {competitor.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/90 dark:bg-[#141310]/90 p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Conversion Action Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-[#141310]/90 border border-black/[0.06] dark:border-white/[0.08] p-10 sm:p-16 text-center shadow-xs">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(20,19,16,0))]" />
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-3">
            100% Free · Instant Vector PDF Export
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto mb-4">
            Stop paying for download paywalls. Build your resume for free<span className="text-emerald-700 dark:text-emerald-400">.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of candidates who left paywalled builders for ResumeBuilder. Tested against major ATS platforms with zero credit card traps.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/create"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/20 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Build Free Resume in 2 Minutes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/examples"
              className="px-8 py-4 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 font-bold text-sm rounded-xl border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer"
            >
              <span>Browse 16 Role Guides</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

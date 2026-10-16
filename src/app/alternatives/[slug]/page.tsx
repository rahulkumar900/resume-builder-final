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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Honest Head-to-Head Comparison</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {competitor.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {competitor.heroSubheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Build Free Resume (No Paywall)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
            >
              <span>View 12 ATS Templates</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-100 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{competitor.name} Pricing</span>
              <span className="text-sm font-black text-rose-600 block mt-0.5">{competitor.competitorPrice}</span>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">ResumeBuilder Pricing</span>
              <span className="text-sm font-black text-emerald-700 block mt-0.5">100% Free Forever</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{competitor.name} ATS Rate</span>
              <span className="text-sm font-black text-slate-700 block mt-0.5">{competitor.atsPassRateCompetitor}</span>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">ResumeBuilder ATS Rate</span>
              <span className="text-sm font-black text-emerald-800 block mt-0.5">{competitor.atsPassRateOurPlatform}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Analysis Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Section 1: Why Candidates Leave */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600">The Friction Points</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Job Seekers Are Switching from {competitor.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitor.whyCandidatesLeave.map((item, idx) => {
              const IconComp = ICON_MAP[item.icon] || AlertTriangle;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Side-by-Side Feature Matrix */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Direct Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Feature Matrix: {competitor.name} vs. ResumeBuilder
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="p-4 font-bold uppercase tracking-wider">Feature Capability</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-slate-500">{competitor.name}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50/50">ResumeBuilder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {competitor.featureMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">
                        <div>{row.feature}</div>
                        {row.note && <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.note}</div>}
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {typeof row.competitor === 'boolean' ? (
                          row.competitor ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <X className="w-4 h-4 text-rose-500" />
                          )
                        ) : (
                          row.competitor
                        )}
                      </td>
                      <td className="p-4 font-bold text-slate-900 bg-emerald-50/20">
                        {typeof row.ourPlatform === 'boolean' ? (
                          row.ourPlatform ? (
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <Check className="w-4 h-4" />
                              <span>Included</span>
                            </div>
                          ) : (
                            <X className="w-4 h-4 text-rose-500" />
                          )
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-800">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
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
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Technical Teardown</span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              In-Depth Evaluation &amp; ATS Audit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Platform Overview</h4>
                <p>{competitor.teardownAnalysis.overview}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">ATS Parser Testing Results</h4>
                <p>{competitor.teardownAnalysis.atsAudit}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">Pricing Model &amp; Renewal Mechanics</h4>
                <p>{competitor.teardownAnalysis.pricingGotcha}</p>
              </div>
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-900">
                <h4 className="font-bold text-blue-950 text-sm mb-1">Recruiter Verdict</h4>
                <p>{competitor.teardownAnalysis.verdict}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Frequently Asked Questions */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions About {competitor.name}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {competitor.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Conversion Action Banner */}
        <section className="bg-gradient-to-br from-slate-950 to-blue-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 text-blue-200 text-xs font-bold border border-blue-800">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free · Instant Vector PDF Export
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Stop Paying for Download Paywalls. Build Your Resume for Free.
          </h2>

          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
            Join thousands of candidates who left paywalled builders for ResumeBuilder. Tested against major ATS platforms with zero credit card traps.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-emerald-50 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <span>Build Free Resume in 2 Minutes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/examples"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-xl border border-blue-700 transition-all cursor-pointer"
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

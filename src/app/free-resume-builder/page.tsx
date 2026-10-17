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
  Download,
  Lock,
  DollarSign,
  AlertTriangle,
  Award,
  FileText,
  Star,
  Layers,
  ChevronRight,
  FileCheck,
  Building2,
  Cpu
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: '100% Free Resume Builder & Download: No Paywall, No Credit Card | ResumeBuilder',
  description:
    'Build and download your resume in high-resolution PDF for free. No credit card required, no 14-day trial traps, no watermarks. Trusted by over 120,000 job seekers.',
  keywords: [
    'free resume builder',
    'free resume builder and download',
    'resume maker free',
    'cv maker free',
    'create resume online free',
    'online resume maker free pdf',
    'build your resume for free',
    'free easy resume builder',
    'free resume creator and download',
    'help making a resume for free',
    'make your resume online free',
    'free resume template builder',
    'cv builder free',
    'cv creator free',
    'make resume online free',
    'build cv online free'
  ],
  openGraph: {
    title: '100% Free Resume Builder & PDF Download | No Paywalls',
    description:
      'Tired of spending 45 minutes formatting only to hit a $24.95 download paywall? Use our 100% free resume builder with instant vector PDF download.',
    type: 'website',
    url: 'https://resumebuilder.app/free-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/free-resume-builder',
  },
};

export default function FreeResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBuilder Free Resume Maker',
    operatingSystem: 'Web Browser',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12480',
    },
    description:
      'Free online resume builder and CV maker with zero paywalls, instant vector PDF downloads, and real-time ATS compatibility checking.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this resume builder really 100% free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Unlike Zety, LiveCareer, or Novoresume that let you build for free but demand a credit card at the final download screen, ResumeBuilder exports clean, high-resolution vector A4 PDFs completely free of charge with zero watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to enter a credit card or start a trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never. You do not need to submit any payment details or credit card information. You can create your account and download your PDF resume immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will my downloaded PDF be ATS friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every template uses strict semantic HTML typography and single or structured two-column grids tested against Workday, Greenhouse, Taleo, and Naukri ATS parsers for a 98%+ pass rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download multiple versions for different job applications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can duplicate your resumes, tailor them to specific job descriptions with our AI assistant, and export as many PDF versions as you need.',
        },
      },
    ],
  };

  // Feature templates highlight
  const featuredTemplates = TEMPLATES.slice(0, 6);

  return (
    <div className="min-w-[320px] bg-[#F8F7F3] dark:bg-[#100F0C] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden bg-white dark:bg-[#141310] border-b border-slate-200/80 dark:border-white/[0.08] pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-20" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero Paywall Guarantee · No Credit Card Required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              The Truly{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Free Resume Builder
              </span>{' '}
              With Instant PDF Download
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              No subscription traps. No 14-day auto-renewing trials. No blurry watermarks. Build your ATS-optimized resume in under 10 minutes and export it immediately.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base transition shadow-xl shadow-blue-600/20"
              >
                <span>Build Free Resume Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Explore Free Templates</span>
              </Link>
            </div>

            {/* Micro Trust Proof */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>No Credit Card at Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>98% ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Zero Watermarks</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Truth About "Free" Resume Builders */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              How Most &quot;Free&quot; Resume Builders Trick Candidates
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              The bait-and-switch subscription model is broken. Here is why job seekers are switching to our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Competitor Trap */}
            <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400 font-black text-lg mb-4">
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                <span>Other &quot;Free&quot; Builders (Zety, LiveCareer, etc.)</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span><strong>The Sunk Cost Trap:</strong> Let you spend 45 minutes writing your resume, then reveal a $24.95 paywall at the download button.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span><strong>Sneaky Auto-Renewals:</strong> A &quot;$2.70 14-day trial&quot; that quietly bills $24.95 every month unless you fight with customer support.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span><strong>Watermarked or Text-Only Exports:</strong> Free tier forces huge watermarks or low-res raster images that break ATS scanners.</span>
                </li>
              </ul>
            </div>

            {/* Our Platform Guarantee */}
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-black text-lg mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <span>ResumeBuilder (Our Guarantee)</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span><strong>Genuinely Free PDF Export:</strong> Download crisp, high-resolution vector A4 PDFs anytime without paying a dime.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span><strong>No Payment Credentials:</strong> We never ask for your credit card, debit card, or billing address.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero Watermarks:</strong> Clean, recruiter-grade presentation that looks 100% professional to hiring managers.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free Templates Showcase */}
        <section className="bg-white dark:bg-[#141310] border-y border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Ready-to-Use Layouts
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                  100% Free ATS-Compliant Resume Templates
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Single-column and double-column formats calibrated for corporate ATS systems and executive recruiters.
                </p>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
              >
                <span>View all 12 templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 dark:bg-[#191815] rounded-2xl border border-slate-200 dark:border-white/[0.08] p-5 hover:border-emerald-500 dark:hover:border-emerald-500/60 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                        Free PDF
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                      {tpl.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-5">
                      <span className="px-2 py-1 rounded bg-white dark:bg-[#1F1E1A] border border-slate-200 dark:border-white/[0.08]">
                        {tpl.layout === 'single' ? 'Single Column (Strict ATS)' : 'Two-Column Hybrid'}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/create?template=${tpl.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Use Free &amp; Download PDF
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Free Resume Workflow */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Create Your Free Resume in 4 Simple Steps
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              From blank page to job application in less than 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-black flex items-center justify-center text-base">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Select Free Template</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose an ATS-compliant single or two-column layout tailored to your industry and experience level.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-base">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Add Experience &amp; Skills</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Use built-in bullet points or let our AI rephrase your achievements into high-impact metric statements.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-base">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Check ATS Score</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Run an instant 6-pillar ATS audit to ensure zero formatting errors, missing keywords, or overflow clipping.
              </p>
            </div>

            <div className="bg-white dark:bg-[#191815] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-black flex items-center justify-center text-base">
                4
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Instant Vector Download</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Click download and instantly receive your pixel-perfect, recruiter-ready A4 PDF without watermarks.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white dark:bg-[#141310] border-t border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions About Our Free Resume Maker
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Everything you need to know about our zero-paywall policy and PDF download engine.
              </p>
            </div>

            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#191815] space-y-2"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-black">Q:</span>
                    {faq.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 dark:bg-[#141310] text-white py-16 sm:py-20 border-t border-slate-800 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Stop Paying For Resume Downloads. Build Yours Free Now.
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Join 120,000+ candidates who got hired without paying a single dollar for resume formatting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Create Your Free Resume Now</span>
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

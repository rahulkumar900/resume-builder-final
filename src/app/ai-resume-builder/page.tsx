import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  FileText,
  Cpu,
  RefreshCw,
  Layers,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Bot
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder & AI Resume Maker: Tailor Resumes in Minutes | ResumeBuilder',
  description:
    'Free AI resume builder and smart AI resume maker. Automatically rewrite bullet points using the Google XYZ formula, optimize ATS keywords for any job description, and download vector PDFs with zero paywalls.',
  keywords: [
    'ai resume builder',
    'ai resume maker',
    'free ai resume builder',
    'best ai resume builder',
    'free ai resume maker',
    'ai resume builder free',
    'ai cv maker',
    'ai resume generator free',
    'generate resume',
    'resume generator online',
    'smart resume maker',
    'ai cv generator',
    'ai resume writer',
    'ai resume tailoring',
    'jd to resume ai'
  ],
  openGraph: {
    title: 'Free AI Resume Builder & Smart AI Resume Maker | ResumeBuilder',
    description:
      'Generate high-impact resume bullets with quantifiable metrics and match any job description with real-time AI keyword analysis.',
    type: 'website',
    url: 'https://resumebuilder.app/ai-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/ai-resume-builder',
  },
};

export default function AiResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ResumeBuilder AI Resume Generator',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Section-specific AI resume writer that generates recruiter-grade bullet points with metrics and tailors resumes to job descriptions.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does the AI Job Tailoring engine work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You paste any target Job Description (JD) into our builder. Our AI parses the required skills, core competencies, and experience qualifications, compares them against your active resume, and pinpoints exact matching keywords (✓) and missing gaps (✗) so you can optimize before applying.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will recruiters know I used an AI resume builder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Unlike generic ChatGPT prompts that generate repetitive clichés (like "dynamic go-getter"), our section-specific models are trained strictly on executive recruiter frameworks and the Google XYZ bullet formula: Accomplished [X] as measured by [Y], by doing [Z].',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the AI Resume Generator free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can generate bullets, tailor your resume to job postings, and download your final vector PDF for free without entering a credit card.',
        },
      },
    ],
  };

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Section-Specific AI Models · Google XYZ Formula</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Build a Job-Winning Resume with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Targeted AI
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t settle for generic AI text. Transform passive job duties into quantifiable achievement bullets, extract keywords from your target JD, and pass ATS filters automatically.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base transition shadow-xl shadow-blue-600/20"
              >
                <span>Generate Resume With AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 dark:hover:bg-white/[0.1] transition border border-slate-200 dark:border-white/[0.1]"
              >
                <span>Check Resume ATS Score</span>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Bullet Transformation Interactive Demo */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              See How Our AI Rewrites Weak Bullets
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Recruiters spend 6 seconds scanning. Compare passive duty statements to our metric-driven XYZ bullet rewrites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#191815] rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold">
                <span>Before (Weak &amp; Passive)</span>
              </div>
              <blockquote className="text-slate-600 dark:text-slate-400 italic text-sm border-l-2 border-rose-400 pl-3">
                &ldquo;Responsible for managing software updates, helping team members with bug fixes, and improving application speed.&rdquo;
              </blockquote>
              <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold pt-2">
                Problem: Lacks metrics, action verbs, and business impact.
              </div>
            </div>

            <div className="bg-white dark:bg-[#191815] rounded-2xl border border-emerald-200/80 dark:border-emerald-800/40 p-6 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>After AI Rewriter (Google XYZ Format)</span>
              </div>
              <blockquote className="text-slate-800 dark:text-slate-200 font-medium text-sm border-l-2 border-emerald-500 pl-3">
                &ldquo;Architected automated CI/CD deployment pipelines across 6 microservices, reducing deployment cycle times by 42% and eliminating 18 hours of manual overhead per sprint.&rdquo;
              </blockquote>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold pt-2">
                Impact: Recruiter-grade action verb + exact percentage + time saved.
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Our AI Architecture */}
        <section className="bg-white dark:bg-[#141310] border-y border-slate-200/80 dark:border-white/[0.08] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Engineered for High ATS Pass Rates
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Unlike simple chatbot wrappers, our system uses dedicated micro-models for every resume section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#191815] border border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">JD Semantic Alignment</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Extracts target keywords, core tools, and technical competencies directly from your job description, ensuring 95%+ keyword parity with the recruiter&apos;s ATS filter.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#191815] border border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Quantifiable Metric Injector</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Prompts you to add revenue, efficiency percentages, team sizes, and performance velocity so your resume proves real tangible business results.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#191815] border border-slate-200 dark:border-white/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Cliché Elimination Filter</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Automatically flags and replaces overused filler words (&quot;hard worker&quot;, &quot;synergy&quot;, &quot;detail-oriented&quot;) with strong contextual action verbs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Learn how AI transforms your job search without compromising authenticity.
            </p>
          </div>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#191815] shadow-xs space-y-2"
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
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 dark:bg-[#141310] text-white py-16 sm:py-20 border-t border-slate-800 dark:border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Write a Stronger Resume in Seconds with AI
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
              Experience the difference of AI calibrated by executive recruiters. Free to generate, free to download.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-xl shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Launch AI Resume Writer</span>
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

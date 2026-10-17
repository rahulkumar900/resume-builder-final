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
    <div className="min-w-[320px] bg-background text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-32">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
              <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Section-Specific AI Models · Google XYZ Formula</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Build a Job-Winning Resume with{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
                Targeted AI
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
              Don&apos;t settle for generic AI text. Transform passive job duties into quantifiable achievement bullets, extract keywords from your target JD, and pass ATS filters automatically.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Generate Resume With AI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Check Resume ATS Score</span>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Bullet Transformation Interactive Demo */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Before &amp; After
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              See How Our AI Rewrites Weak Bullets<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Recruiters spend 6 seconds scanning. Compare passive duty statements to our metric-driven XYZ bullet rewrites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-7 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-mono font-medium">
                <span>Before (Weak &amp; Passive)</span>
              </div>
              <blockquote className="text-slate-600 dark:text-slate-400 italic text-sm sm:text-base border-l-2 border-rose-400 dark:border-rose-700 pl-4 py-1 leading-relaxed">
                &ldquo;Responsible for managing software updates, helping team members with bug fixes, and improving application speed.&rdquo;
              </blockquote>
              <div className="text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold pt-2">
                Problem: Lacks metrics, action verbs, and business impact.
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-emerald-300 dark:border-emerald-800/80 p-6 sm:p-7 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>After AI Rewriter (Google XYZ Format)</span>
              </div>
              <blockquote className="text-slate-800 dark:text-slate-200 font-medium text-sm sm:text-base border-l-2 border-emerald-600 dark:border-emerald-400 pl-4 py-1 leading-relaxed">
                &ldquo;Architected automated CI/CD deployment pipelines across 6 microservices, reducing deployment cycle times by 42% and eliminating 18 hours of manual overhead per sprint.&rdquo;
              </blockquote>
              <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-2">
                Impact: Recruiter-grade action verb + exact percentage + time saved.
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars of Our AI Architecture */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Engineered for High ATS Pass Rates<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed mt-4">
              Unlike simple chatbot wrappers, our system uses dedicated micro-models for every resume section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">JD Semantic Alignment</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Extracts target keywords, core tools, and technical competencies directly from your job description, ensuring 95%+ keyword parity with the recruiter&apos;s ATS filter.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Quantifiable Metric Injector</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Prompts you to add revenue, efficiency percentages, team sizes, and performance velocity so your resume proves real tangible business results.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-3 hover:border-emerald-500/40 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">Cliché Elimination Filter</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Automatically flags and replaces overused filler words (&quot;hard worker&quot;, &quot;synergy&quot;, &quot;detail-oriented&quot;) with strong contextual action verbs.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Questions About AI Resumes<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Learn how AI transforms your job search without compromising authenticity.
              </p>
            </div>

            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-border bg-white/80 dark:bg-[#141310]/80 backdrop-blur-xs space-y-2"
                >
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
                    {faq.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Write a Stronger Resume in Seconds <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">with AI.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
              Experience the difference of AI calibrated by executive recruiters. Free to generate, free to download.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
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

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  ArrowRight,
  FileText,
  Clock,
  ShieldCheck,
  Layers,
  ChevronRight,
  Sliders,
  Award,
  Check,
  Minimize2,
  FileCheck
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Simple Resume Builder: Free One-Page & Basic Resume Maker | ResumeBuilder',
  description:
    'Free simple resume builder for clean, basic, and one-page resumes. No clutter, no complex graphics, instant vector PDF download in under 3 minutes with zero watermarks.',
  keywords: [
    'simple resume builder',
    'basic resume maker',
    'one page resume builder',
    'simple resume format',
    'clean resume format',
    'basic resume format',
    'simple cv maker',
    'one page resume maker',
    'single page resume builder',
    'simple resume template free download',
    'clean resume template',
    'minimalist resume builder'
  ],
  openGraph: {
    title: 'Simple Resume Builder - Clean 1-Page Resumes in 3 Minutes',
    description:
      'Skip the complicated graphic design tools. Build a clean, recruiter-approved one-page resume with guaranteed ATS compliance and free PDF export.',
    type: 'website',
    url: 'https://resumebuilder.app/simple-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/simple-resume-builder',
  },
};

export default function SimpleResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Simple & One-Page Resume Maker',
    description:
      'Fast, distraction-free simple resume builder engineered for clean single-page formatting and immediate vector PDF downloads.',
    url: 'https://resumebuilder.app/simple-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Minimalist single-column and clean typography layouts',
      'Automated A4 single-page budget and overflow protection',
      'Zero distracting graphics or unparseable design elements',
      'Instant vector PDF download with zero paywall',
      'Pre-formatted standard headers for instant ATS indexing',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why do recruiters prefer simple, one-page resumes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Recruiters spend an average of 6 to 7 seconds scanning an initial resume. Simple, one-page layouts with crisp visual hierarchy allow hiring managers to quickly locate your job titles, key achievements, and technical skills without wading through clutter or unnecessary graphics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should my resume always be one page?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you have under 5 to 7 years of work experience, a one-page resume is the industry standard. Senior executives, academics, and researchers with 10+ years of deep leadership or extensive publications may use a two-page format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do simple resumes pass ATS systems better than creative ones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Simple resumes with clean linear formatting, standard headings, and selectable text layers pass ATS systems like Workday, Greenhouse, and Taleo with 98%+ accuracy because there are no floating text boxes, graphic icons, or complex tables to disrupt the parser.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this simple resume builder free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free. You can choose any clean or minimalist template, type your career information, and export a high-resolution vector PDF immediately without signing up for a credit card trial or paying a paywall.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the builder prevent text from overflowing to page 2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our real-time GhostDOM measurement engine continuously calculates physical A4 millimeter margins as you type. If your content starts exceeding a single page, the builder alerts you so you can adjust font size, spacing, or bullet count before downloading.',
        },
      },
    ],
  };

  const simpleTemplates = TEMPLATES.filter((t) =>
    ['minimalist', 'classic', 'harvard', 'toronto', 'fresher', 'ats'].includes(t.id)
  );

  return (
    <div className="min-w-[320px] bg-slate-50 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
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
        <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-xs font-semibold mb-6">
              <Minimize2 className="w-4 h-4 text-emerald-700" />
              <span>Clean, Distraction-Free &amp; Recruiter Preferred</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Simple Resume Builder:{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                Clean, Fast &amp; One-Page Perfect
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              No complicated graphic layers, no bloated visual sliders, and no surprise download fees. Build an elegant, recruiter-approved one-page resume in under 3 minutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/builder?template=minimalist"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
              >
                <span>Make a Simple Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition border border-slate-200"
              >
                <span>Browse Clean Templates</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One-Page A4 Budget Fit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Formatting Hassles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>98%+ ATS Compatibility</span>
              </div>
            </div>
          </div>
        </section>

        {/* The 6-Second Recruiter Eye-Tracking Advantage */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Hiring Science
                </span>
                <h2 className="text-3xl font-black tracking-tight mt-1 mb-4">
                  Why Simple Resumes Get 3x More Interviews
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Eye-tracking studies consistently show that recruiters spend between 6 and 7 seconds on their initial resume review. Flashy graphics, non-standard column grids, and multi-colored skill bars distract from your quantifiable accomplishments.
                </p>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Instant Visual Navigation:</strong> Recruiters quickly find Company, Role, Dates, and Technologies in predictable locations.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Machine Readability:</strong> No complex SVG or absolute canvas coordinates that break Workday or Taleo ATS parsers.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Accidental Blank Pages:</strong> Real-time page boundary protection prevents an awkward second page containing just two lonely lines.</span>
                  </div>
                </div>
              </div>

              {/* Visual Stats Box */}
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 shadow-xl">
                <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>The Simple Resume Benchmark</span>
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Recruiter Initial Scan Time</span>
                      <span className="text-emerald-400 font-bold">6.4 Seconds</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-[25%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">Preference for 1-Page Layout (Under 7 Yrs Exp)</span>
                      <span className="text-emerald-400 font-bold">84% of Recruiters</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-[84%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">ATS Ingestion Reliability</span>
                      <span className="text-emerald-400 font-bold">98%+ Accuracy</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full w-[98%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Steps to a Perfect Simple Resume */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Effortless Simplicity
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              How to Create Your Simple Resume in 3 Steps
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              No graphic design knowledge needed. Our studio handles line height, page margins, and fonts automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Pick a Clean Template</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose the Minimalist, Classic, or Harvard single-column template engineered specifically for single-page presentation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Fill in Your Essentials</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your work experience, education, and technical competencies. Bullet points are auto-formatted with clean typography.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Instant Vector Download</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export your crisp, high-DPI vector PDF. 100% free with no watermarks, no credit card, and zero trial subscriptions.
              </p>
            </div>
          </div>
        </section>

        {/* Curated Simple Templates */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  Curated Collection
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Minimalist &amp; Clean Resume Formats
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Proven layouts designed for clarity, readability, and effortless single-page budget compliance.
                </p>
              </div>
              <Link
                href="/templates/ats-friendly"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 shrink-0"
              >
                <span>View all templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {simpleTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 transition group flex flex-col justify-between"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-base font-bold text-slate-900">{tpl.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        1-Page Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{tpl.description}</p>

                    <div className="space-y-1.5 text-[11px] text-slate-600 bg-white rounded-xl p-3 border border-slate-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Layout:</span>
                        <span className="font-semibold text-slate-800">
                          {tpl.layout === 'double' ? 'Two Column' : 'Clean Single Column'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Style:</span>
                        <span className="font-semibold text-slate-800">Minimalist &amp; Simple</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      href={`/builder?template=${tpl.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-emerald-700 transition"
                    >
                      <span>Use {tpl.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Simple Resume Checklist */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200/80 p-8 sm:p-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                The 1-Page Simple Resume Checklist
              </h2>
              <p className="text-xs text-slate-600 mt-2">
                Follow these 5 rules to ensure your single-page resume makes a lasting impression.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Concise Header (Zero Clutter)</strong>
                  Include Full Name, Target Title, City/Country, Phone, Email, and LinkedIn. Omit complete street addresses, photos, or marital status.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">2-Line Executive Summary</strong>
                  Hook the hiring manager with your core specialty, years of experience, and 1 standout metric.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">3–4 Action-Packed Bullets Per Job</strong>
                  Frame every bullet around impact using numbers, percentages, or saved hours (e.g., &ldquo;Boosted throughput by 35%&rdquo;).
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Grouped Skills Hierarchy</strong>
                  Organize technical proficiencies into categorized groups (Languages, Frameworks, Cloud, Tools) instead of a chaotic laundry list.
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block text-sm">Clean A4 Margins</strong>
                  Maintain 0.5 to 0.75-inch margins so the resume breathes without feeling cramped or overflowing.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border-t border-slate-200/80 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions About Simple Resumes
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Is a simple resume format suitable for tech and software engineers?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Absolutely. Tech recruiters and engineering managers at Google, Amazon, and top startups strongly prefer clean, single-column simple formats. They care about your programming languages, system scale, open-source projects, and quantifiable deliverables—not decorative graphic illustrations.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  What is the difference between a simple resume and a traditional CV?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A simple resume is a concise 1-page document summarizing only the most relevant experience and skills for a specific job opening. A traditional CV (curriculum vitae) is an exhaustive chronicle of your complete academic, publication, and career history across multiple pages.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Can freshers use this simple resume builder?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! For college graduates and freshers with no formal job experience, our simple fresher layout places education, academic projects, coding competitions, and technical skills at the top to highlight capability over tenure.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Do I have to pay to download my simple resume?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never. ResumeBuilder provides 100% free vector PDF downloads without paywalls, watermark stamps, or recurring credit card traps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Keep It Simple. Get Hired Faster.
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              Join thousands of job seekers who landed interviews with clean, recruiter-preferred 1-page resumes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=minimalist"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-600 transition shadow-xl inline-flex items-center gap-2"
              >
                <span>Create Your Simple Resume Free</span>
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

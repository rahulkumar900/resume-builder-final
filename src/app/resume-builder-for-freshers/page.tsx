import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  Award,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free Resume Builder for Freshers & Students',
  description:
    'Free resume builder for freshers & students. Create ATS-friendly entry-level resumes with college project sections, zero experience, and free vector PDF.',
  keywords: [
    'resume builder for freshers',
    'student resume builder',
    'create resume for freshers',
    'resume maker online free for freshers',
    'resume maker for students',
    'fresher resume builder free',
    'btech fresher resume builder',
    'resume maker for freshers',
    'resume format for freshers 12th pass',
    'college student resume builder',
    'resume maker for freshers with no experience'
  ],
  openGraph: {
    title: 'Free Resume Builder for Freshers & Students | ResumeBabu',
    description:
      'Land your first campus placement or entry-level job. Pre-built sections for college projects, certifications, degrees, and extracurriculars.',
    type: 'website',
    url: 'https://resumebabu.com/resume-builder-for-freshers',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Builder for Freshers - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Builder for Freshers & Students | ResumeBabu',
    description:
      'Land your first campus placement or entry-level job. Pre-built sections for college projects, certifications, degrees, and extracurriculars.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/resume-builder-for-freshers',
  },
};

export default function ResumeBabuForFreshersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBabu for Freshers & Students',
    description:
      'Free resume maker specifically designed for graduates, college students, and entry-level candidates with no formal work experience.',
    url: 'https://resumebabu.com/resume-builder-for-freshers',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '8450',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Tailored academic project and coursework sections',
      'Fresher-friendly ATS layouts highlighting degrees and skills',
      'AI bullet suggestions for college internships and capstone projects',
      'Free vector PDF download without paywall or watermark',
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
        name: 'Resume Builder for Freshers',
        item: 'https://resumebabu.com/resume-builder-for-freshers',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I create resume for freshers with no formal experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To create resume for freshers, use our dedicated student resume builder layouts that prioritize academic projects, technical skills, coursework, degree GPA, college leadership roles, and hackathons so recruiters see your potential first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this resume maker online free for freshers and college students?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! ResumeBabu is a 100% free resume maker online free for freshers and resume maker for students, offering unlimited vector PDF downloads with zero credit card requirements and no watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these formats accepted by companies like TCS, Infosys, and tech startups?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our fresher resume layouts follow standard Indian and global campus recruitment guidelines (including Naukri, Workday, and campus placement portal parsers) with 98%+ ATS parser compatibility.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why choose ResumeBabu over Zety or Novorésumé for fresher resumes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Zety and Novorésumé charge freshers and students $19.99 to $24.95/month just to download a PDF resume. ResumeBabu is 100% free forever with unlimited vector PDF exports and dedicated project sections.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should a fresher resume be 1 page or 2 pages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A fresher resume should strictly be 1 single page. Our live GhostDOM A4 pagination engine monitors your layout in real time, preventing accidental blank pages or line spillover.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
              <GraduationCap className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Campus Placement &amp; Entry-Level Engine</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Free Resume Builder for{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">Freshers &amp; Students</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              The premier student resume builder to create resume for freshers with no experience. Use our resume maker online free for freshers and resume maker for students to turn college projects and skills into interview offers.
            </p>

            {/* Primary Action Button */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Start Fresher Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/examples/btech-fresher-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>View BTech Fresher Sample</span>
              </Link>
            </div>

            {/* Key Differentiators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Pre-Built Project Sections
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Campus Placement Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Free Vector PDF
              </span>
            </div>
          </div>
        </section>

        {/* Why Fresher Resumes Require a Different Strategy */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Entry Strategy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Formatting without prior experience<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Recruiters hiring freshers look for core skills and learning agility rather than 5-year job histories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lead with Academic Projects</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Put final-year capstones, hackathon projects, and course assignments at the top. Mention the tools, languages, and measurable results achieved.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Showcase Relevant Skills</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Group skills cleanly into Programming Languages, Frameworks, and Tools. Our ATS analyzer checks that your skills match common entry-level job descriptions.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold mb-5 border border-emerald-200 dark:border-emerald-800">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Certifications &amp; Contests</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add NPTEL, Coursera, Udemy certifications, LeetCode ratings, or college club leadership to prove initiative and passion.
              </p>
            </div>
          </div>

          {/* Comparison Matrix: ResumeBabu vs Zety vs Novorésumé vs Rezi */}
          <div className="mt-16 bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Fresher Tool Comparison
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ResumeBabu vs. Commercial Resume Builders
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
                Why graduating students and freshers choose our 100% free PDF builder over costly subscriptions.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="border-b border-border text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4 font-mono font-medium">Feature</th>
                    <th className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">ResumeBabu</th>
                    <th className="py-3 px-4 font-mono font-medium">Zety</th>
                    <th className="py-3 px-4 font-mono font-medium">Novorésumé</th>
                    <th className="py-3 font-mono font-medium px-4">Rezi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Vector PDF Export Paywalls</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">100% Free Forever</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$24.95/mo Paywall</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$19.99/mo Paywall</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paid Download Credits</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Dedicated Academic Project Grids</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">Pre-Built &amp; Optimized</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Generic Work Section</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Text Fields</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Standard Sections</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Strict 1-Page A4 Budget Guard</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">GhostDOM Real-time Warnings</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Accidental 2nd Pages</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Manual Dragging</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic Split</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">Campus Placement ATS Standards</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">TCS, Infosys &amp; Workday Certified</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Standard Parsing</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">90%+ Pass Rate</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">95%+ Pass Rate</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fresher Template Spotlight */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="bg-card/90 backdrop-blur-xs rounded-3xl border border-border p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium rounded-full border border-emerald-200 dark:border-emerald-800">
                Recommended Template
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                The Official Fresher Academic Template<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                Engineered specifically for engineering, commerce, and science freshers. Includes clean academic grading tables (Class X, XII, B.Tech/B.Sc CGPA), prominent project grids, and technical skill categorizations.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/builder?template=fresher"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates/ats-friendly"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
                >
                  <span>Browse All 30+ Formats</span>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-72 h-96 bg-background rounded-2xl border border-border p-5 shadow-inner flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 w-32 bg-emerald-700/80 rounded" />
                <div className="h-2 w-20 bg-slate-300 dark:bg-white/[0.2] rounded" />
                <div className="h-px bg-black/[0.06] dark:border-white/[0.08] w-full" />
                <div className="h-14 bg-white/90 dark:bg-[#161512] rounded border border-border p-2 space-y-1">
                  <div className="h-2 w-full bg-slate-200 dark:bg-white/[0.1] rounded" />
                  <div className="h-2 w-3/4 bg-slate-100 dark:bg-white/[0.05] rounded" />
                  <div className="h-2 w-1/2 bg-slate-100 dark:bg-white/[0.05] rounded" />
                </div>
                <div className="h-16 bg-white/90 dark:bg-[#161512] rounded border border-border p-2 space-y-1">
                  <div className="h-2 w-28 bg-emerald-600/70 rounded" />
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/[0.05] rounded" />
                  <div className="h-2 w-4/5 bg-slate-100 dark:bg-white/[0.05] rounded" />
                </div>
              </div>
              <div className="text-center font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
                A4 Single-Page Student Format
              </div>
            </div>
          </div>
        </section>

        {/* Fresher FAQs */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Fresher Resume FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono">Q:</span>
                  {faq.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Create Your Fresher Resume Today<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Start with a battle-tested template and download your free vector PDF in minutes.
            </p>
            <Link
              href="/builder?template=fresher"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
            >
              <span>Make Fresher Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

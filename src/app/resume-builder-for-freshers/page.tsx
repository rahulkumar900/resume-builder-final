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
  title: 'Free Resume Builder for Freshers: Make Student & Graduate Resumes | ResumeBuilder',
  description:
    'Best free resume builder for freshers, college students, and 12th pass graduates with no work experience. Includes pre-filled academic project formats and instant vector PDF export.',
  keywords: [
    'resume builder for freshers',
    'resume maker for freshers',
    'create resume for freshers',
    'resume maker online free for freshers',
    'student resume builder',
    'resume builder for freshers free',
    'fresher resume format',
    'resume maker for students',
    'cv maker for freshers',
    'resume format for freshers 12th pass',
    'btech fresher resume builder',
    'resume maker for freshers with no experience'
  ],
  openGraph: {
    title: 'Free Resume Builder for Freshers & Students (No Experience Needed)',
    description:
      'Land your first campus placement or entry-level job. Pre-built sections for college projects, certifications, degrees, and extracurriculars.',
    type: 'website',
    url: 'https://resumebuilder.app/resume-builder-for-freshers',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/resume-builder-for-freshers',
  },
};

export default function ResumeBuilderForFreshersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder for Freshers & Students',
    description:
      'Free resume maker specifically designed for graduates, college students, and entry-level candidates with no formal work experience.',
    url: 'https://resumebuilder.app/resume-builder-for-freshers',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Tailored academic project and coursework sections',
      'Fresher-friendly ATS layouts highlighting degrees and skills',
      'AI bullet suggestions for college internships and capstone projects',
      'Free vector PDF download without paywall or watermark',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I make a resume if I have zero work experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on your academic projects, technical skills, coursework, degree GPA, college leadership roles, and hackathons/internships. Our Fresher template places education and technical projects at the top so recruiters see your potential first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this fresher resume maker free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can choose the Fresher or Classic format, fill out your academic and skill details, and export a clean vector PDF without any fees or watermarks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these formats accepted by companies like TCS, Infosys, and startups?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our fresher resume layouts follow standard Indian and global campus recruitment guidelines (including Naukri and campus placement formats) with 100% ATS parser compatibility.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
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
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-200">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Engineered for Freshers, Students & Recent Graduates</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Build a Standout Resume with{' '}
              <span className="text-blue-700 underline decoration-blue-300 decoration-wavy underline-offset-8">
                Zero Experience
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Don&apos;t let a blank work history hold you back. Highlight your college projects, technical skills, certifications, and academic achievements with recruiter-approved fresher templates.
            </p>

            {/* Primary Action Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white text-base font-bold rounded-xl shadow-lg shadow-blue-700/20 hover:shadow-blue-700/30 transition-all hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-blue-200" />
                <span>Start Fresher Resume Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/examples/btech-fresher-resume"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-slate-50 text-slate-700 text-base font-semibold rounded-xl border border-slate-300 shadow-xs transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>View BTech Fresher Sample</span>
              </Link>
            </div>

            {/* Key Differentiators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Pre-Built Project Sections
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Campus Placement Ready
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 100% Free PDF (No Watermark)
              </span>
            </div>
          </div>
        </section>

        {/* Why Fresher Resumes Require a Different Strategy */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                How to Format a Resume When You Have No Experience
              </h2>
              <p className="mt-3 text-slate-600 text-base">
                Recruiters hiring freshers look for core skills and learning agility rather than 5-year job histories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Lead with Academic Projects</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Put final-year capstones, hackathon projects, and course assignments at the top. Mention the tools, languages, and measurable results achieved.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Showcase Relevant Skills</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Group skills cleanly into Programming Languages, Frameworks, and Tools. Our ATS analyzer checks that your skills match common entry-level job descriptions.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Certifications & Contests</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Add NPTEL, Coursera, Udemy certifications, LeetCode ratings, or college club leadership to prove initiative and passion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fresher Template Spotlight */}
        <section className="py-16 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-1 space-y-4">
                <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Recommended Template
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  The Official Fresher Academic Template
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Engineered specifically for engineering, commerce, and science freshers. Includes clean academic grading tables (Class X, XII, B.Tech/B.Sc CGPA), prominent project grids, and technical skill categorizations.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/builder?template=fresher"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                  >
                    <span>Use This Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/templates/ats-friendly"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
                  >
                    <span>Browse All 30+ Formats</span>
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-72 h-96 bg-slate-100 rounded-2xl border border-slate-200 p-4 shadow-inner flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-32 bg-blue-700/80 rounded" />
                  <div className="h-2 w-20 bg-slate-300 rounded" />
                  <div className="h-px bg-slate-200 w-full" />
                  <div className="h-14 bg-white rounded border border-slate-200 p-2 space-y-1">
                    <div className="h-2 w-full bg-slate-200 rounded" />
                    <div className="h-2 w-3/4 bg-slate-100 rounded" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                  </div>
                  <div className="h-16 bg-white rounded border border-slate-200 p-2 space-y-1">
                    <div className="h-2 w-28 bg-blue-600/70 rounded" />
                    <div className="h-2 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-4/5 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="text-center text-xs text-slate-500 font-semibold">
                  A4 Single-Page Student Format
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fresher FAQs */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-10">
              Fresher Resume FAQs
            </h2>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Should a fresher resume be 1 page or 2 pages?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Always keep a fresher resume to **strictly 1 page**. Our real-time A4 pagination visualizer alerts you if your content spills into a second page so you can easily tighten margins or spacing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Can I use this for campus placements (TCS, Wipro, Infosys, Cognizant)?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Yes, mass hiring recruiters and IT services companies prefer structured, scannable resumes with clear educational scores, technical projects, and certifications.
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center p-8 bg-blue-700 text-white rounded-3xl shadow-xl shadow-blue-900/10">
              <h3 className="text-2xl sm:text-3xl font-black mb-3">
                Create Your Fresher Resume Today
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
                Start with a battle-tested template and download your free vector PDF in minutes.
              </p>
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-800 hover:bg-blue-50 font-black rounded-xl text-base shadow-md transition-all hover:scale-105"
              >
                <span>Make Fresher Resume Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

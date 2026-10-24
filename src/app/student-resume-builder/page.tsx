import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  Award,
  ShieldCheck,
  Star,
  Users,
  Heart,
  Check,
  Backpack
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Free Student Resume Builder: High School, College & Internship Formats',
  description:
    'Free student resume builder for high schoolers, 12th pass graduates, college students, and first-time job seekers. Turn coursework, volunteer work, and clubs into a job-winning resume with instant vector PDF download.',
  keywords: [
    'student resume builder',
    'resume format for freshers 12th pass',
    'internship resume builder',
    'resume for high school students',
    'college student resume builder',
    'first job resume builder',
    'resume builder for students free',
    'high school resume maker',
    'internship resume format',
    'resume format for diploma students',
    'entry level student resume format',
    'part time job resume builder'
  ],
  openGraph: {
    title: 'Free Student Resume Builder - Land Your First Job or Internship',
    description:
      'No formal job experience? No problem. Convert academic achievements, school clubs, volunteer work, and coursework into a recruiter-approved resume.',
    type: 'website',
    url: 'https://resumebabu.com/student-resume-builder',
    images: [
      {
        url: 'https://resumebabu.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Student Resume Builder - ResumeBabu',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Student Resume Builder - Land Your First Job or Internship',
    description:
      'No formal job experience? No problem. Convert academic achievements, school clubs, volunteer work, and coursework into a recruiter-approved resume.',
    images: ['https://resumebabu.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://resumebabu.com/student-resume-builder',
  },
};

export default function StudentResumeBabuPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBabu Student & Internship Resume Maker',
    description:
      'Free resume maker for high school students, college undergraduates, and first-time applicants with no formal employment history.',
    url: 'https://resumebabu.com/student-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1540',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Tailored coursework, club leadership, and volunteer work sections',
      'Automatic A4 single-page budget protection',
      'High school, 12th pass, and undergraduate templates',
      'Instant vector PDF download with zero watermarks',
      '100% free with no credit card required',
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
        name: 'Student Resume Builder',
        item: 'https://resumebabu.com/student-resume-builder',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I write a student resume with no work experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Put your Education section right at the top! Include your school or college name, GPA or percentage, honors, advanced coursework, and expected graduation date. Then highlight school club leadership, sports, community volunteer work, class projects, and technical skills.',
        },
      },
      {
        '@type': 'Question',
        name: 'What can 12th pass or diploma freshers put on a resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For 12th pass or diploma students, focus on your academic stream (Science, Commerce, Arts, Vocational), computer skills (Excel, Word, Python, Typing speed), communication abilities, extracurricular awards, and any part-time tutoring, retail, or family business help.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this builder to apply for summer internships?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our student and fresher templates are specifically calibrated for competitive summer internship screening, university research fellowships, and entry-level corporate internships.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this student resume builder completely free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% free. We believe students and early-career job seekers should never have to pay for career tools. There are zero watermarks, no paywalls, and no credit card required.',
        },
      },
    ],
  };

  const studentTemplates = TEMPLATES.filter((t) =>
    ['fresher', 'minimalist', 'classic', 'ats', 'harvard'].includes(t.id)
  );

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
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
              <Backpack className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>For High Schoolers, 12th Pass &amp; College Students</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Student resume builder:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">land your first internship</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              No formal employment history? You don&apos;t need one. Turn your class projects, leadership roles, volunteer hours, and skills into an interview-winning resume in under 3 minutes.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build Student Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Browse Student Templates</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Experience Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>One-Page A4 Budget Fit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>No Watermarks or Card Needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Student Experience Matrix: What to Include */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Zero Experience Strategy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              What to put when you have no job history<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Recruiters hiring students look for work ethic, curiosity, and capability—not 5 years of tenure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Education &amp; Honors</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  School or college name, GPA or percentage, Honor Roll, AP / IB coursework, Dean&apos;s List, or relevant electives.
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Clubs &amp; Leadership</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Student council, debate club, robotics, school newspaper, cultural committee, or sports team captain roles.
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-400 mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Volunteering &amp; Service</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Community food drives, peer tutoring, animal shelter assistance, NGO volunteering, or school event organizing.
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Projects &amp; Side Gigs</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Science fair projects, coding experiments, freelance graphic design, video editing, pet sitting, or lawn care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Step Quick Creation */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Simple 3-Step Process
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              From blank page to job-ready PDF in 3 minutes<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Choose Fresher Layout</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Select a layout that highlights your academics, coursework, and technical skills rather than 5 years of missing work history.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Enter Your Highlights</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Add your school, expected graduation date, honors, and clubs. Our auto-formatting engine takes care of fonts, margins, and line height.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl p-7 border border-border shadow-xs hover:border-emerald-500/40 transition-all flex flex-col items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-5 border border-emerald-200 dark:border-emerald-800">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">Instant Download</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Click export to get a clean, high-resolution vector PDF ready to email to hiring managers or attach to job applications.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Recommended For Students
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Student &amp; Internship Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Single-page formats that maximize your academic and extracurricular credentials.
              </p>
            </div>
            <Link
              href="/templates/ats-friendly"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 inline-flex items-center gap-1 shrink-0"
            >
              <span>View all templates</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studentTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border overflow-hidden hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-xs"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Student Ready
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">{tpl.description}</p>

                  <div className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-300 bg-[#F8F7F3] dark:bg-[#161512] rounded-xl p-3.5 border border-border">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Layout:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Ideal For:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">High School, College, Internships</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-slate-900 dark:text-white font-bold text-xs hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-600 transition border border-black/[0.08] dark:border-white/[0.1]"
                  >
                    <span>Use {tpl.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Student Resume FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                How long should a student resume be?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Exactly one page! As a high school student, college undergraduate, or recent graduate, your resume should never exceed a single page. Our GhostDOM boundary protection guarantees your text never spills over onto page 2.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                What skills should high school or college students list?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Include both hard skills (Google Docs, Excel, Python, Canva, Social Media Management, Typing Speed) and soft skills (Communication, Teamwork, Time Management, Problem Solving). Wherever possible, back up soft skills with concrete examples from your school projects or clubs.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Should I include my GPA or high school marks?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                If your GPA is 3.5 or higher (or 75%+ in 10th/12th board exams), it is generally beneficial to include it. If your GPA is lower, you can omit it and focus on coursework, awards, and practical projects instead.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Are there any hidden fees or subscriptions?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                None. You will never be asked for a credit card. You can download and edit your student resume as many times as you want completely free.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Get Ready for Your First Interview<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of students who landed their dream internships and entry-level jobs with ResumeBabu.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Create Student Resume Free</span>
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

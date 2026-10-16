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
  title: 'Free Student Resume Builder: High School, College & Internship Formats | ResumeBuilder',
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
    url: 'https://resumebuilder.app/student-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/student-resume-builder',
  },
};

export default function StudentResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Student & Internship Resume Maker',
    description:
      'Free resume maker for high school students, college undergraduates, and first-time applicants with no formal employment history.',
    url: 'https://resumebuilder.app/student-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Tailored coursework, club leadership, and volunteer work sections',
      'Automatic A4 single-page budget protection',
      'High school, 12th pass, and undergraduate templates',
      'Instant vector PDF download with zero watermarks',
      '100% free with no credit card required',
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
              <Backpack className="w-4 h-4 text-emerald-700" />
              <span>For High Schoolers, 12th Pass &amp; College Students</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Student Resume Builder:{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                Land Your First Job or Internship
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              No formal employment history? You don&apos;t need one. Turn your class projects, leadership roles, volunteer hours, and skills into an interview-winning resume in under 3 minutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/builder?template=fresher"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
              >
                <span>Build Student Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition border border-slate-200"
              >
                <span>Browse Student Templates</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Experience Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>One-Page A4 Budget Fit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No Watermarks or Card Needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Student Experience Matrix: What to Include */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Zero Experience Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                What to Put on Your Resume When You Have No Job History
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Recruiters hiring students look for work ethic, curiosity, and capability—not 5 years of tenure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Education &amp; Honors</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    School or college name, GPA or percentage, Honor Roll, AP / IB coursework, Dean&apos;s List, or relevant electives.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Clubs &amp; Leadership</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Student council, debate club, robotics, school newspaper, cultural committee, or sports team captain roles.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Volunteering &amp; Service</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Community food drives, peer tutoring, animal shelter assistance, NGO volunteering, or school event organizing.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Projects &amp; Side Gigs</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Science fair projects, coding experiments, freelance graphic design, video editing, pet sitting, or lawn care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Step Quick Creation */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              From Blank Page to Job-Ready PDF in 3 Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Choose Fresher Layout</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select a layout that highlights your academics, coursework, and technical skills rather than 5 years of missing work history.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Enter Your Highlights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add your school, expected graduation date, honors, and clubs. Our auto-formatting engine takes care of fonts, margins, and line height.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Instant Download</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click export to get a clean, high-resolution vector PDF ready to email to hiring managers or attach to job applications.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  Recommended For Students
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Student &amp; Internship Resume Formats
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Single-page formats that maximize your academic and extracurricular credentials.
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
              {studentTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 transition group flex flex-col justify-between"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-base font-bold text-slate-900">{tpl.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Student Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">{tpl.description}</p>

                    <div className="space-y-1.5 text-[11px] text-slate-600 bg-white rounded-xl p-3 border border-slate-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Layout:</span>
                        <span className="font-semibold text-slate-800">
                          {tpl.layout === 'double' ? 'Two Column' : 'Single Column'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ideal For:</span>
                        <span className="font-semibold text-slate-800">High School, College, Internships</span>
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

        {/* FAQ Section */}
        <section className="bg-white border-t border-slate-200/80 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions for Students
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  How long should a student resume be?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exactly one page! As a high school student, college undergraduate, or recent graduate, your resume should never exceed a single page. Our GhostDOM boundary protection guarantees your text never spills over onto page 2.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  What skills should high school or college students list?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Include both hard skills (Google Docs, Excel, Python, Canva, Social Media Management, Typing Speed) and soft skills (Communication, Teamwork, Time Management, Problem Solving). Wherever possible, back up soft skills with concrete examples from your school projects or clubs.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Should I include my GPA or high school marks?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If your GPA is 3.5 or higher (or 75%+ in 10th/12th board exams), it is generally beneficial to include it. If your GPA is lower, you can omit it and focus on coursework, awards, and practical projects instead.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Are there any hidden fees or subscriptions?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  None. You will never be asked for a credit card. You can download and edit your student resume as many times as you want completely free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Get Ready for Your First Interview
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              Join thousands of students who landed their dream internships and entry-level jobs with ResumeBuilder.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=fresher"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-600 transition shadow-xl inline-flex items-center gap-2"
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

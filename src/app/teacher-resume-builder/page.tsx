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
  School,
  Library
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';

export const metadata: Metadata = {
  title: 'Teacher Resume Builder: Free Resume Maker for Teachers & Educators | ResumeBuilder',
  description:
    'Free teacher resume builder for primary, high school, fresher, and experienced educators. Formats for B.Ed, CTET, CBSE, ICSE, and international schools. Instant vector PDF download with zero watermarks.',
  keywords: [
    'teacher resume builder',
    'teacher resume format',
    'resume format for teachers',
    'resume format for school teacher',
    'resume format for primary teacher',
    'resume for teachers with experience',
    'teaching resume format',
    'resume for fresher teacher',
    'academic resume builder',
    'bed fresher resume format',
    'resume format for prt tgt pgt teacher',
    'curriculum vitae for teachers'
  ],
  openGraph: {
    title: 'Free Teacher Resume Builder - Land Teaching & Faculty Roles',
    description:
      'Engineered for educators, lecturers, and school teachers. Showcase your B.Ed, CTET, curriculum planning, classroom technology, and student success metrics.',
    type: 'website',
    url: 'https://resumebuilder.app/teacher-resume-builder',
  },
  alternates: {
    canonical: 'https://resumebuilder.app/teacher-resume-builder',
  },
};

export default function TeacherResumeBuilderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ResumeBuilder Teacher & Educator Resume Maker',
    description:
      'Specialized resume maker calibrated for primary teachers (PRT), trained graduate teachers (TGT), post graduate teachers (PGT), and academic lecturers.',
    url: 'https://resumebuilder.app/teacher-resume-builder',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Pre-formatted sections for B.Ed, CTET, state teacher qualifications, and licenses',
      'Curriculum planning, lesson design, and classroom management bullet points',
      'CBSE, ICSE, State Board, and IB/Cambridge international school compatibility',
      'Free vector PDF download with zero watermarks',
      'Single-page A4 budget fit protection',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What should a teacher include on their resume?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A strong teacher resume includes your Teaching Credentials & Certifications (B.Ed, D.El.Ed, CTET, State TET), Subject Specialization (e.g., Mathematics, English, Physics), Grade Level Expertise (PRT, TGT, PGT), Classroom Achievements (board exam pass rates, learning improvements), and Co-Curricular Involvements (Science Fair, House In-Charge, Cultural Committees).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do fresher teachers write a resume with no formal classroom experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fresher teachers should prominently feature their B.Ed / D.El.Ed student teaching internship or practicum. Detail the grade levels taught, lesson plans created, interactive teaching aids used, and any home tutoring, coaching institute teaching, or volunteer teaching experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which resume format do school principals and hiring committees prefer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Principals prefer a clean, reverse-chronological format that highlights your highest educational qualification and teaching certifications at the top, followed by structured teaching history and measurable student outcomes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this teacher resume builder free to download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can customize your teaching profile, choose an academic layout, and export clean, high-resolution vector PDFs with zero paywalls, no watermarks, and no credit card required.',
        },
      },
    ],
  };

  const teacherTemplates = TEMPLATES.filter((t) =>
    ['classic', 'harvard', 'minimalist', 'ats', 'fresher'].includes(t.id)
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
              <School className="w-4 h-4 text-emerald-700" />
              <span>For PRT, TGT, PGT, Lecturers &amp; School Teachers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Teacher Resume Builder:{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                Inspire Hiring Committees &amp; Principals
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Showcase your B.Ed, CTET, pedagogical methods, classroom management skills, and student success metrics. Build a recruiter-approved academic resume in under 3 minutes.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-lg shadow-emerald-700/20"
              >
                <span>Build Teacher Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition border border-slate-200"
              >
                <span>Browse Academic Templates</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>B.Ed &amp; CTET Section Layouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CBSE, ICSE &amp; IB Formats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Watermarks or Paywalls</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of a School-Winning Teacher Resume */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Pedagogical Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                What School Principals &amp; School Boards Look For
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                Principals scan hundreds of educator applications. Here are the 4 signals that secure teaching interviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Qualifications &amp; TET</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Clear display of B.Ed, M.Ed, CTET (Paper I &amp; II), State TET, or international teaching certificates with percentages and subjects.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Curriculum Delivery</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Experience with NCERT, CBSE, ICSE, Cambridge IGCSE, or IB curriculum frameworks and lesson planning standards.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Classroom Tech</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Proficiency in Smart Boards, Google Classroom, Canvas LMS, Microsoft Teams for Education, and interactive quizzes (Kahoot, Quizizz).
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Star className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">Student Achievements</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Measurable results: 100% board exam pass rates, Olympiad mentoring, debate coaching, or remedial student improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Verbs & Examples for Teachers */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
              High-Impact Bullet Points
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Proven Bullet Point Formats for Educators
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Transform generic job duties into compelling, metric-driven achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 mb-4 inline-block">
                Weak &amp; Generic (Avoid)
              </span>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Responsible for teaching English to Class 8 and 9 students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Prepared lesson plans and graded exam papers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Handled classroom discipline and spoke to parents.</span>
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-6 sm:p-8">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-4 inline-block">
                High-Impact &amp; Metric-Driven (Use This)
              </span>
              <ul className="space-y-3 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Spearheaded Class 10 Board Prep:</strong> Mentored 120+ students to achieve a 100% pass rate with 42 distinctions in CBSE English.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Integrated Digital Pedagogy:</strong> Implemented Google Classroom &amp; Smart Board interactive modules, increasing classroom engagement by 35%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Remedial Support:</strong> Designed tailored remedial learning plans that lifted struggling students&apos; grade averages from 45% to 68%.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="bg-white border-y border-slate-200/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  Academic Formats
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Teacher &amp; Faculty Resume Formats
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Single-column and clean typography layouts with clear qualification sections.
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
              {teacherTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald-500 transition group flex flex-col justify-between"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-base font-bold text-slate-900">{tpl.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Academic Ready
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
                        <span className="text-slate-500">Recommended For:</span>
                        <span className="font-semibold text-slate-800">PRT, TGT, PGT, Faculty</span>
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
                Frequently Asked Questions for Teachers
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  What is the difference between PRT, TGT, and PGT resume formats?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PRT (Primary Teacher: Classes 1–5) highlights foundational literacy, play-way methods, and D.El.Ed / B.Ed. TGT (Trained Graduate Teacher: Classes 6–10) emphasizes subject specialization, graduation degree, and CTET Paper II. PGT (Post Graduate Teacher: Classes 11–12) requires a Master&apos;s degree, specialized subject depth, board exam outcomes, and college prep mentoring.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Should teachers include co-curricular and committee work?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes! School administrators value teachers who contribute beyond the classroom. Mentioning your role as House In-Charge, Annual Day Coordinator, Debate Coach, or Science Exhibition In-Charge gives you a significant advantage over other applicants.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 text-sm mb-2">
                  Can I download my teaching resume for free?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes, 100% free. You can customize, update, and download high-resolution vector PDF resumes with no watermarks, no trial subscriptions, and zero paywalls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Step Into Your Next Classroom With Confidence
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              Join thousands of educators who landed teaching positions at top public, private, and international schools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=classic"
                className="px-8 py-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-600 transition shadow-xl inline-flex items-center gap-2"
              >
                <span>Create Teacher Resume Free</span>
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

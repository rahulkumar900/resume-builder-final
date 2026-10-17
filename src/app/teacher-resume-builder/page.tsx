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
  title: 'Teacher Resume Builder: Free Resume Maker for Teachers & Educators',
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
    images: [
      {
        url: 'https://resumebuilder.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Teacher Resume Builder - ResumeBuilder',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Teacher Resume Builder - Land Teaching & Faculty Roles',
    description:
      'Engineered for educators, lecturers, and school teachers. Showcase your B.Ed, CTET, curriculum planning, classroom technology, and student success metrics.',
    images: ['https://resumebuilder.app/og-image.png'],
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1380',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Pre-formatted sections for B.Ed, CTET, state teacher qualifications, and licenses',
      'Curriculum planning, lesson design, and classroom management bullet points',
      'CBSE, ICSE, State Board, and IB/Cambridge international school compatibility',
      'Free vector PDF download with zero watermarks',
      'Single-page A4 budget fit protection',
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
        item: 'https://resumebuilder.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Teacher Resume Builder',
        item: 'https://resumebuilder.app/teacher-resume-builder',
      },
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
              <School className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>For PRT, TGT, PGT, Lecturers &amp; School Teachers</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Teacher resume builder:{' '}
              <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">inspire hiring committees</span>.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Showcase your B.Ed, CTET, pedagogical methods, classroom management skills, and student success metrics. Build a recruiter-approved academic resume in under 3 minutes.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=classic"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
              >
                <span>Build Teacher Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates/ats-friendly"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
              >
                <span>Browse Academic Templates</span>
              </Link>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>B.Ed &amp; CTET Section Layouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>CBSE, ICSE &amp; IB Formats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Free Vector PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Watermarks or Paywalls</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of a School-Winning Teacher Resume */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Pedagogical Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              What school principals &amp; boards look for<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Principals scan hundreds of educator applications. Here are the 4 signals that secure teaching interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-700 dark:text-blue-400 mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Qualifications &amp; TET</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clear display of B.Ed, M.Ed, CTET (Paper I &amp; II), State TET, or international teaching certificates with percentages and subjects.
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Curriculum Delivery</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Experience with NCERT, CBSE, ICSE, Cambridge IGCSE, or IB curriculum frameworks and lesson planning standards.
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-400 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Classroom Tech</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Proficiency in Smart Boards, Google Classroom, Canvas LMS, Microsoft Teams for Education, and interactive quizzes (Kahoot, Quizizz).
                </p>
              </div>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-4">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Student Achievements</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Measurable results: 100% board exam pass rates, Olympiad mentoring, debate coaching, or remedial student improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Verbs & Examples for Teachers */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              High-Impact Bullet Points
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Proven bullet point formats for educators<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              Transform generic job duties into compelling, metric-driven achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-rose-500/30 dark:border-rose-900/40 p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 mb-4 inline-block border border-rose-200 dark:border-rose-800">
                Weak &amp; Generic (Avoid)
              </span>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Responsible for teaching English to Class 8 and 9 students.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Prepared lesson plans and graded exam papers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>Handled classroom discipline and spoke to parents.</span>
                </li>
              </ul>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-emerald-500/30 dark:border-emerald-900/40 p-6 sm:p-8 shadow-xs">
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-4 inline-block border border-emerald-200 dark:border-emerald-800">
                High-Impact &amp; Metric-Driven (Use This)
              </span>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Spearheaded Class 10 Board Prep:</strong> Mentored 120+ students to achieve a 100% pass rate with 42 distinctions in CBSE English.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Integrated Digital Pedagogy:</strong> Implemented Google Classroom &amp; Smart Board interactive modules, increasing classroom engagement by 35%.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900 dark:text-white">Remedial Support:</strong> Designed tailored remedial learning plans that lifted struggling students&apos; grade averages from 45% to 68%.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                Academic Formats
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Teacher &amp; Faculty Formats<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Single-column and clean typography layouts with clear qualification sections.
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
            {teacherTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border overflow-hidden hover:border-emerald-500/40 transition-all group flex flex-col justify-between shadow-xs"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Academic Ready
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
                      <span className="text-slate-500 dark:text-slate-400">Recommended For:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">PRT, TGT, PGT, Faculty</span>
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
              Teacher Resume FAQs<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                What is the difference between PRT, TGT, and PGT resume formats?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                PRT (Primary Teacher: Classes 1–5) highlights foundational literacy, play-way methods, and D.El.Ed / B.Ed. TGT (Trained Graduate Teacher: Classes 6–10) emphasizes subject specialization, graduation degree, and CTET Paper II. PGT (Post Graduate Teacher: Classes 11–12) requires a Master&apos;s degree, specialized subject depth, board exam outcomes, and college prep mentoring.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Should teachers include co-curricular and committee work?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! School administrators value teachers who contribute beyond the classroom. Mentioning your role as House In-Charge, Annual Day Coordinator, Debate Coach, or Science Exhibition In-Charge gives you a significant advantage over other applicants.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-xs rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                Can I download my teaching resume for free?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes, 100% free. You can customize, update, and download high-resolution vector PDF resumes with no watermarks, no trial subscriptions, and zero paywalls.
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 relative overflow-hidden rounded-3xl bg-card/90 border border-border p-8 sm:p-14 text-center shadow-xs">
            <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.08),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),rgba(16,15,12,0))]" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Step Into Your Next Classroom With Confidence<span className="text-emerald-700 dark:text-emerald-400">.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of educators who landed teaching positions at top public, private, and international schools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/builder?template=classic"
                className="px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 inline-flex items-center gap-2 cursor-pointer"
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

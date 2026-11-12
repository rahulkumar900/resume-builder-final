'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  School,
  X,
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import {
  FRESHER_TEACHER_RESUME,
  EXPERIENCED_TEACHER_RESUME,
  PRIMARY_TEACHER_RESUME,
  PGT_TEACHER_RESUME,
  TGT_TEACHER_RESUME,
} from '@/data/teacher-cluster/samples';
import { COMPLETE_TEACHER_GUIDE } from '@/data/teacher-cluster/complete-guide';
import {
  CreateTeacherResumeButton,
  TeacherResumePreviewBox,
  CopySnippetBox,
  TeacherClusterLinks,
} from './TeacherClusterHelpers';

export function MainTeacherPage() {
  const g = COMPLETE_TEACHER_GUIDE;

  const examplesDirectory = [
    {
      title: 'Fresher Teacher Resume',
      desc: 'For B.Ed. / D.El.Ed. freshers highlighting teaching practice and projects.',
      href: '/resume-for-teacher-job/freshers',
      sample: FRESHER_TEACHER_RESUME,
      image: '/templates/teacher-fresher.webp',
    },
    {
      title: 'Experienced Teacher Resume',
      desc: 'Reverse-chronological format showcasing 2, 5, and 10+ years of classroom results.',
      href: '/resume-for-teacher-job/experienced',
      sample: EXPERIENCED_TEACHER_RESUME,
      image: '/templates/teacher-experienced.webp',
    },
    {
      title: 'Primary Teacher (PRT) Resume',
      desc: 'Classes 1–5 format focusing on phonics, activity-based learning & CTET Paper I.',
      href: '/resume-for-teacher-job/primary-teacher',
      sample: PRIMARY_TEACHER_RESUME,
      image: '/templates/teacher-primary.webp',
    },
    {
      title: 'TGT Teacher Resume',
      desc: 'Classes 6–10 format highlighting graduation, B.Ed., lesson planning & assessment.',
      href: '/resume-for-teacher-job/tgt-teacher',
      sample: TGT_TEACHER_RESUME,
      image: '/templates/teacher-tgt.webp',
    },
    {
      title: 'PGT Teacher Resume',
      desc: 'Classes 11–12 format emphasizing Master’s degree, board prep & lab oversight.',
      href: '/resume-for-teacher-job/pgt-teacher',
      sample: PGT_TEACHER_RESUME,
      image: '/templates/teacher-pgt.webp',
    },
  ];

  const actionVerbs = [
    { category: 'Teaching', verbs: 'Taught, Instructed, Educated, Guided, Mentored' },
    { category: 'Planning', verbs: 'Developed, Designed, Prepared, Organized, Implemented' },
    { category: 'Assessment', verbs: 'Evaluated, Assessed, Reviewed, Monitored, Measured' },
    { category: 'Leadership', verbs: 'Led, Coordinated, Supervised, Managed, Directed' },
    { category: 'Communication', verbs: 'Communicated, Presented, Collaborated, Advised' },
    { category: 'Student Support', verbs: 'Supported, Encouraged, Motivated, Assisted, Counselled' },
    { category: 'Achievement', verbs: 'Improved, Increased, Achieved, Introduced, Enhanced' },
  ];

  const faqs = [
    {
      q: '1. How do I write a teacher resume?',
      a: 'Start with your contact information and a professional summary. Add your educational qualifications, teaching experience, certifications, skills, and achievements. If you are a fresher, highlight internships, teaching practice, academic projects, and relevant skills.',
    },
    {
      q: '2. What should a fresher include in a teacher resume?',
      a: 'Freshers should include their educational qualifications, B.Ed. or D.El.Ed. details where applicable, CTET or TET qualifications if earned, teaching practice, internships, subject knowledge, lesson-planning skills, and academic achievements.',
    },
    {
      q: '3. How do I write a teacher resume with no experience?',
      a: 'Focus on your academic background, teaching-related coursework, classroom practice, internships, volunteer tutoring, academic projects, and communication skills. Use a skills-focused or combination format to demonstrate your teaching potential.',
    },
    {
      q: '4. What is a good professional summary for a teacher?',
      a: 'A good teacher summary briefly describes your qualifications, teaching experience, subject specialization, and relevant skills. Example: "Dedicated and qualified English Teacher with 4 years of experience in lesson planning, classroom management, and student assessment. Skilled in developing interactive learning activities and improving students’ reading, writing, and communication abilities."',
    },
    {
      q: '5. Should I include B.Ed. in my teacher resume?',
      a: 'Yes, if you have completed a B.Ed. qualification, include it prominently in your education section. It is an important professional teaching qualification for many teaching positions. However, specific eligibility requirements depend on the school and recruitment rules.',
    },
    {
      q: '6. Should I mention CTET or TET in my resume?',
      a: 'Yes. If you have qualified CTET or a relevant State TET, include the examination name, paper, qualification status, and year. These qualifications can be important for certain school teaching positions.',
    },
    {
      q: '7. What skills should a teacher put on a resume?',
      a: 'Common teaching skills include lesson planning, classroom management, curriculum implementation, student assessment, communication, subject knowledge, educational technology, student engagement, and parent-teacher communication. Choose skills according to the subject and grade level you teach.',
    },
    {
      q: '8. Should a teacher resume include a photograph?',
      a: 'A photograph is generally not necessary for most private-sector and international teaching applications unless the school specifically requests one. Follow the employer’s instructions.',
    },
    {
      q: '9. How long should a teacher resume be?',
      a: 'A fresher teacher can usually create a one-page resume. Teachers with several years of experience may use two pages to include relevant teaching responsibilities, qualifications, and achievements.',
    },
    {
      q: '10. Which resume format is best for teachers?',
      a: 'A reverse-chronological format is a strong choice for experienced teachers. Freshers can use a combination format to highlight education, teaching practice, internships, and skills.',
    },
    {
      q: '11. Should teachers include hobbies in their resumes?',
      a: 'You can include relevant interests such as reading, educational activities, sports coaching, creative arts, or community involvement. Keep this section brief.',
    },
    {
      q: '12. What is the best file format for a teacher resume?',
      a: 'PDF is generally recommended because it preserves the layout and formatting. However, submit the file format requested by the school or employer.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16">
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section className="pt-14 pb-16 sm:pt-24 sm:pb-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium mb-5">
              <School className="w-3.5 h-3.5" />
              <span>Teacher Resume Builder &amp; Complete 2026 Guide</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Create a Professional Resume for Your{' '}
              <span className="italic text-emerald-700 dark:text-emerald-400 font-medium">
                Teacher Job
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Build a professional resume for school teacher vacancies. Whether you are a fresher or an experienced teacher, create a resume that highlights your qualifications, teaching skills, and experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <CreateTeacherResumeButton
                sample={FRESHER_TEACHER_RESUME}
                label="Create Teacher Resume"
                className="w-full sm:w-auto"
              />
              <a
                href="#teacher-examples"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition border border-border"
              >
                <span>View Teacher Resume Examples</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              {['ATS-friendly templates', 'Easy editing', 'PDF download', 'Fresher and experienced formats'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{item}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: CHOOSE YOUR TEACHING EXPERIENCE */}
        <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Choose Your Teaching Experience Level
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Select the path that matches your background to start with the right section order and sample content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition">
              <div>
                <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  No Prior Job Experience
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-3">
                  Fresher Teacher
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  For candidates applying for their first teaching job. Highlights B.Ed. / D.El.Ed. education, CTET/TET scores, teaching practice internships, and academic projects first.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                <CreateTeacherResumeButton
                  sample={FRESHER_TEACHER_RESUME}
                  label="Create Fresher Resume"
                  className="w-full whitespace-nowrap"
                />
                <Link
                  href="/resume-for-teacher-job/freshers"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Read Fresher Guide →
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition">
              <div>
                <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                  2 to 10+ Years Experience
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-3">
                  Experienced Teacher
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  For teachers with previous school or teaching experience. Leads with classroom experience, board exam preparation, student assessment, and achievements.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 pt-2">
                <CreateTeacherResumeButton
                  sample={EXPERIENCED_TEACHER_RESUME}
                  label="Create Experienced Resume"
                  className="w-full whitespace-nowrap"
                />
                <Link
                  href="/resume-for-teacher-job/experienced"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Read Experienced Guide →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TEACHER RESUME EXAMPLES DIRECTORY */}
        <section id="teacher-examples" className="w-full py-12 sm:py-16 border-b border-border bg-slate-50/50 dark:bg-[#100f0c]/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Teacher Resume Examples by Role
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Explore role-specific examples or load a template directly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {examplesDirectory.map((ex) => (
                <div
                  key={ex.href}
                  className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition shadow-2xs"
                >
                  <Link
                    href={ex.href}
                    className="relative bg-slate-100 dark:bg-[#12110e] pt-4 px-4 pb-0 border-b border-border flex justify-center items-start h-72 overflow-hidden group"
                  >
                    <img
                      src={ex.image}
                      alt={`${ex.title} template preview`}
                      width={794}
                      height={1123}
                      className="w-full max-w-[340px] h-auto rounded-t-sm shadow-xs border-x border-t border-slate-200 dark:border-slate-700 bg-white group-hover:scale-[1.02] transition-transform"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-100/95 dark:from-[#12110e]/95 to-transparent" />
                  </Link>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                        {ex.title}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {ex.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <Link
                        href={ex.href}
                        className="px-4 py-2.5 rounded-lg border border-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition whitespace-nowrap"
                      >
                        View Example
                      </Link>
                      <CreateTeacherResumeButton
                        sample={ex.sample}
                        label="Use Template"
                        compact={true}
                        className="flex-1 py-2.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT TO INCLUDE IN A TEACHER RESUME */}
        <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              What to Include in a Teacher Resume
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Include these 8 essential components so school administrators can quickly verify your eligibility and teaching skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Contact Information', desc: 'Name, phone, email, city/state & LinkedIn.' },
              { title: 'Professional Summary', desc: '2–4 sentence pitch of degrees, subject & approach.' },
              { title: 'Educational Qualifications', desc: 'Graduation, Master’s & university scores.' },
              { title: 'Teaching Experience', desc: 'Schools taught, classes handled & outcomes (or internship).' },
              { title: 'Teaching Skills', desc: 'Lesson planning, classroom management & EdTech.' },
              { title: 'B.Ed. / D.El.Ed.', desc: 'Mandatory teacher training with methodology subjects.' },
              { title: 'CTET / TET Status', desc: 'Paper I / II qualification status and year.' },
              { title: 'Certifications & Awards', desc: 'Workshops, DIKSHA courses & recognition.' },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl border border-border p-4 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: COMPLETE 2026 GUIDE (ALL 11 SECTIONS WITHOUT MISSING KEYPOINTS) */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-14">
          {/* Intro */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
              Complete 2026 Guide
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              How to Write a Teacher Resume: Complete Guide with Examples (2026)
            </h2>
            {g.introParagraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* 1. Understand What Makes a Good Teacher Resume */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section1.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Before writing your resume, understand what schools typically look for in a teaching candidate:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {g.section1.whatSchoolsLookFor.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-2">
              <div className="font-bold text-sm text-slate-900 dark:text-white">A good teacher resume should be:</div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {g.section1.fiveQualities.map((q) => (
                  <li key={q.label}>
                    <span className="font-semibold text-slate-900 dark:text-white">{q.label}:</span> {q.desc}
                  </li>
                ))}
              </ul>
              <p className="text-xs italic text-slate-500 pt-2">{g.section1.reminder}</p>
            </div>
          </div>

          {/* 2. Customize Your Resume for the Teaching Position */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section2.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{g.section2.intro}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {g.section2.identifyItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Example: Primary School Teacher</div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {g.section2.primaryExample.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Example: Mathematics Teacher</div>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {g.section2.mathsExample.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300">
              Tip: {g.section2.tip}
            </p>
          </div>

          {/* 3. Choose the Right Teacher Resume Format */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section3.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {g.section3.formats.map((fmt) => (
                <div key={fmt.name} className="bg-card p-5 rounded-2xl border border-border space-y-2">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{fmt.name}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{fmt.desc}</p>
                  <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                    {fmt.suitableFor.map((s) => (
                      <li key={s}>• {s}</li>
                    ))}
                  </ul>
                  {fmt.example && (
                    <p className="text-[11px] font-mono bg-slate-50 dark:bg-[#161512] p-2.5 rounded-lg border border-border whitespace-pre-line text-slate-700 dark:text-slate-300">
                      {fmt.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#161512] p-4 rounded-xl border border-border">
              <strong>Which Resume Format Is Best for Teachers?</strong> {g.section3.verdict}
            </p>
          </div>

          {/* 4. Essential Sections A–K */}
          <div className="space-y-8">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section4.title}
            </h3>

            {/* 4A Contact Info */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">A. Contact Information</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Include: {g.section4.contactItems.join(' • ')}.
              </p>
              <CopySnippetBox label="Contact Header Example" text={g.section4.contactExample} />
              <p className="text-xs text-slate-500 dark:text-slate-400">{g.section4.contactNote}</p>
            </div>

            {/* 4B Professional Summary */}
            <div className="space-y-3">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">B. Professional Summary for Teachers</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Mention: {g.section4.summaryChecklist.join(' • ')}.
              </p>
              <div className="space-y-3">
                {g.section4.summaries.map((sum) => (
                  <CopySnippetBox key={sum.label} label={sum.label} text={sum.text} />
                ))}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                {g.section4.summaryTips.map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>

            {/* 4C Teaching Experience */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">C. Teaching Experience</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {g.section4.experienceExamples.map((ex) => (
                  <div key={ex.title} className="bg-card p-5 rounded-2xl border border-border space-y-2">
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{ex.title}</h5>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {ex.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {g.section4.bulletProgressions.map((bp, i) => (
                  <div key={i} className="bg-card p-4 rounded-xl border border-border text-xs space-y-1">
                    <p className="text-rose-700 dark:text-rose-400"><span className="font-semibold">Weak:</span> {bp.weak}</p>
                    <p className="text-amber-700 dark:text-amber-400"><span className="font-semibold">Better:</span> {bp.better}</p>
                    <p className="text-emerald-700 dark:text-emerald-400"><span className="font-semibold">Stronger:</span> {bp.stronger}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">Genuine numbers to include:</span> {g.section4.genuineNumbers.join(' • ')}. Never invent academic results or student statistics.
              </p>
            </div>

            {/* 4D Education & 4E Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <div className="font-bold text-lg text-slate-900 dark:text-white">D. Education</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  For freshers, Education appears before experience. For experienced teachers, place it after work experience.
                </p>
                <CopySnippetBox label="Education Format Example" text={g.section4.educationExample} />
              </div>
              <div className="space-y-2.5">
                <div className="font-bold text-lg text-slate-900 dark:text-white">E. Teaching Certifications &amp; Eligibility</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Include: {g.section4.certificationsList.join(', ')}. Clearly distinguish between completed, qualified, and currently pursuing. Reference official portals for{' '}
                  <a href="https://ctet.nic.in/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 underline hover:no-underline">CTET</a>,{' '}
                  <a href="https://www.cbse.gov.in/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 underline hover:no-underline">CBSE</a>, and{' '}
                  <a href="https://ncert.nic.in/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 underline hover:no-underline">NCERT</a>{' '}
                  standards.
                </p>
                <CopySnippetBox label="Certifications Example" text={g.section4.certificationsExample} />
              </div>
            </div>

            {/* 4F Teaching Skills (All 5 Categories) */}
            <div className="space-y-3">
              <div className="font-bold text-lg text-slate-900 dark:text-white">F. Teaching Skills (5 Essential Categories)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.section4.skillCategories.map((cat) => (
                  <div key={cat.name} className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{cat.name}</div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {cat.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 4G Internship & 4H Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-5 rounded-2xl border border-border space-y-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">G. Internship and Teaching Practice</h4>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{g.section4.internshipExample.role}</p>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {g.section4.internshipExample.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card p-5 rounded-2xl border border-border space-y-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">H. Projects and Academic Activities</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Examples: {g.section4.projectExamples.join(', ')}.
                </p>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">{g.section4.sampleProject.title}</p>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  {g.section4.sampleProject.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4I Awards, 4J Languages, 4K Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">I. Awards &amp; Achievements</h4>
                {g.section4.awardsExamples.map((a) => (
                  <p key={a} className="text-slate-600 dark:text-slate-400">• {a}</p>
                ))}
              </div>
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">J. Languages</h4>
                <p className="text-slate-600 dark:text-slate-400">{g.section4.languagesExample}</p>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">K. Additional Information</h4>
                <p className="text-slate-600 dark:text-slate-400">{g.section4.additionalInfo.join(' • ')}</p>
              </div>
            </div>
          </div>

          {/* 5. How to Write a Teacher Resume Without Experience */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section5.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <strong>Fresher Section Priority Order:</strong> {g.section5.fresherPriorityOrder.join(' → ')}
            </p>
            <div className="bg-card p-5 rounded-2xl border border-border space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{g.section5.fresherPracticeExample.role}</h4>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {g.section5.fresherPracticeExample.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong>What if you have no internship?</strong> Highlight {g.section5.noInternshipOptions.join(', ')}. Never create fictional employment history.
            </p>
          </div>

          {/* 6. Strong Bullet Points & Action Verbs */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section6.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Formula: <strong className="text-slate-900 dark:text-white">{g.section6.formula}</strong>
            </p>
            <div className="bg-card rounded-2xl border border-border p-5">
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-3">Powerful Action Verbs for Teachers</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {actionVerbs.map((row) => (
                  <div key={row.category}>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{row.category}:</span>{' '}
                    <span className="text-slate-600 dark:text-slate-400">{row.verbs}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-5 space-y-1.5">
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-2">8 Examples of Strong Teacher Resume Bullet Points</div>
              {g.section6.strongExamples.map((ex) => (
                <p key={ex} className="text-xs text-slate-600 dark:text-slate-400">• {ex}</p>
              ))}
            </div>
          </div>

          {/* 7. Formatting & 8. ATS-Friendly */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border border-border p-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{g.section7.title}</h3>
              <p><strong>Recommended Fonts:</strong> {g.section7.fonts.join(', ')}</p>
              <div className="space-y-1">
                <strong>Font Sizes:</strong>
                {g.section7.fontSizes.map((fs) => (
                  <p key={fs.element}>• {fs.element}: {fs.size}</p>
                ))}
              </div>
              <p><strong>Margins:</strong> {g.section7.margins}</p>
              <div className="space-y-1">
                <strong>Page Length:</strong>
                {g.section7.pageLength.map((pl) => (
                  <p key={pl}>• {pl}</p>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">{g.section8.title}</h3>
              <ul className="space-y-1">
                {g.section8.practices.map((pr) => (
                  <li key={pr}>• {pr}</li>
                ))}
              </ul>
              <p className="pt-1">
                <strong>Important Teaching Keywords:</strong> {g.section8.keywords.join(', ')}.
              </p>
            </div>
          </div>

          {/* 9. Common Mistakes */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section9.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.section9.mistakes.map((m) => (
                <div key={m.title} className="bg-card p-4 rounded-xl border border-border space-y-1">
                  <div className="font-bold text-xs text-rose-700 dark:text-rose-400 flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{m.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Use AI */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section10.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              AI can help you: {g.section10.uses.join(' • ')}
            </p>
            <CopySnippetBox label="Example AI Prompt for a Teacher Resume" text={g.section10.prompt} />
          </div>

          {/* 11. Final Teacher Resume Checklist */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {g.section11.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Content Checklist</div>
                {g.section11.contentChecklist.map((c) => (
                  <p key={c}>✓ {c}</p>
                ))}
              </div>
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Formatting Checklist</div>
                {g.section11.formattingChecklist.map((c) => (
                  <p key={c}>✓ {c}</p>
                ))}
              </div>
              <div className="bg-card p-4 rounded-xl border border-border space-y-1.5">
                <div className="font-bold text-sm text-slate-900 dark:text-white">Final Review</div>
                {g.section11.finalReview.map((c) => (
                  <p key={c}>✓ {c}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: COMPLETE LIVE TEACHER RESUME SAMPLE */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Complete Teacher Resume Sample
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Preview our ready-to-edit sample below, download it in Word (.doc), or customize it directly in the builder to export a clean PDF.
            </p>
          </div>

          <TeacherResumePreviewBox
            sample={FRESHER_TEACHER_RESUME}
            badge="Complete Fresher Sample"
            title="Fresher Teacher Resume (B.Ed. & CTET)"
            description="Follows the recommended fresher order: Summary → Education → Teaching Practice Internship → Skills → Certifications → Projects."
            viewExampleHref="/resume-for-teacher-job/freshers"
          />
        </section>

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS & CONCLUSION */}
        <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions About Teacher Resumes
          </h2>

          <div className="space-y-6 mb-14">
            {faqs.map((item) => (
              <div key={item.q} className="pb-6 border-b border-border last:border-b-0">
                <div className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {item.q}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Conclusion</h3>
            {g.conclusion.map((p, i) => (
              <p key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* CLUSTER NAVIGATION LINKS */}
        <TeacherClusterLinks currentPath="/resume-for-teacher-job" />

        {/* SECTION 8: SOCIAL SHARE & FINAL CTA */}
        <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card border border-border px-5 py-4">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Share this Teacher Resume Guide &amp; Samples:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fresumebabu.com%2Fresume-for-teacher-job"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
              >
                LinkedIn
              </a>
              <a
                href="https://api.whatsapp.com/send?text=Resume%20for%20Teacher%20Job%3A%20Format%20%26%20Samples%20-%20https%3A%2F%2Fresumebabu.com%2Fresume-for-teacher-job"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
              >
                WhatsApp
              </a>
              <a
                href="https://twitter.com/intent/tweet?text=Resume%20for%20Teacher%20Job%3A%20Format%20%26%20Samples&url=https%3A%2F%2Fresumebabu.com%2Fresume-for-teacher-job"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
              >
                X / Twitter
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fresumebabu.com%2Fresume-for-teacher-job"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 dark:bg-[#161512] border border-border p-8 sm:p-12 text-center">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Ready to Apply for Your Teaching Job?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
              Create your professional resume for teacher job vacancies on ResumeBabu using our free format and samples, then download it in PDF format.
            </p>
            <CreateTeacherResumeButton
              sample={FRESHER_TEACHER_RESUME}
              label="Build My Teacher Resume"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

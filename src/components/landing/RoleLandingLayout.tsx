'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  School,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
  Copy,
  Download,
  Sparkles,
  BookOpen,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import {
  RoleLandingPageContent,
  TeacherResumeExample,
  FullTextResumeData,
} from '@/data/landing/types';
import { ResumeData } from '@/types/resume';
import {
  FRESHER_TEACHER_SAMPLE_RESUME,
  TEACHER_SAMPLE_RESUME,
  createTeacherResumeFromSample,
} from '@/data/landing/teacher-sample-resume';
import { saveResume } from '@/lib/storage';
import { DynamicResumeCardPreview } from '@/components/dashboard/DynamicResumeCardPreview';

interface RoleLandingLayoutProps {
  content: RoleLandingPageContent;
}

export function RoleLandingLayout({ content }: RoleLandingLayoutProps) {
  const router = useRouter();

  const {
    jsonLd,
    hero,
    resumeExamples,
    fresherMasterclass,
    howToWriteGuide,
    experiencedExtraDetails,
    dosAndDonts,
    differentApproaches,
    skillsMatrix,
    recommendedTemplates,
    faqSection,
    bottomCta,
  } = content;

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fresherExample =
    resumeExamples.find((ex) => ex.roleType === 'Fresher') || resumeExamples[0];
  const experiencedExample =
    resumeExamples.find((ex) => ex.roleType === 'Experienced') || resumeExamples[1];
  const otherRoleExamples = resumeExamples.filter(
    (ex) => ex.id !== fresherExample?.id && ex.id !== experiencedExample?.id
  );

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const buildResumeDataForExample = (example: TeacherResumeExample): ResumeData => {
    const isFresher = example.roleType === 'Fresher';
    const base = isFresher ? FRESHER_TEACHER_SAMPLE_RESUME : TEACHER_SAMPLE_RESUME;

    const mappedExperience = example.resumeData.experience.map((exp, idx) => ({
      id: `exp-${idx}-${Date.now()}`,
      role: exp.role,
      company: exp.institution,
      location: 'India',
      startDate: exp.period.split('–')[0]?.trim() || '2021',
      endDate: exp.period.includes('Present') ? '' : exp.period.split('–')[1]?.trim() || '',
      current: exp.period.includes('Present'),
      highlights: exp.bullets,
    }));

    return {
      ...base,
      id: `resume-${example.id}-${Date.now()}`,
      title: `${example.resumeData.personalInfo.name} - Teacher Resume`,
      templateId: 'academic_teaching',
      themeColor: '#7a1f2b',
      experienceLevel: isFresher ? 'entry' : 'experienced',
      sectionOrder: isFresher
        ? { singleColumn: ['summary', 'education', 'internships', 'skills', 'certifications', 'projects'] }
        : { singleColumn: ['summary', 'experience', 'education', 'skills', 'certifications', 'achievements'] },
      personalInfo: {
        ...base.personalInfo,
        fullName: example.resumeData.personalInfo.name,
        jobTitle: example.resumeData.personalInfo.targetTitle,
        summary: example.resumeData.summary,
        location: example.resumeData.personalInfo.location,
      },
      experience: isFresher ? [] : mappedExperience,
      internships: isFresher ? mappedExperience : [],
      education: example.resumeData.education.map((edu, idx) => ({
        id: `edu-${idx}-${Date.now()}`,
        degree: edu.degree,
        school: edu.institution,
        location: 'India',
        graduationDate: edu.year,
        gpa: edu.scoreOrSpecialization,
        highlights: [],
      })),
      certifications: example.resumeData.certifications.map((c, idx) => ({
        id: `cert-${idx}-${Date.now()}`,
        name: c,
        issuer: c.includes('CBSE') ? 'CBSE' : 'Educational Board',
        date: '2024',
      })),
      skills: [
        {
          id: `sk-1-${Date.now()}`,
          category: 'Pedagogy & Curriculum',
          items: example.resumeData.skills.pedagogy,
        },
        {
          id: `sk-2-${Date.now()}`,
          category: 'EdTech & Digital Tools',
          items: example.resumeData.skills.techAndTools,
        },
        {
          id: `sk-3-${Date.now()}`,
          category: 'Classroom & Leadership',
          items: example.resumeData.skills.softSkills,
        },
      ],
    };
  };

  const handleOpenInBuilder = (example?: TeacherResumeExample, preferFresher = true) => {
    const resumeToSave: ResumeData = example
      ? buildResumeDataForExample(example)
      : createTeacherResumeFromSample(undefined, preferFresher);

    saveResume(resumeToSave);
    router.push(`/builder/${resumeToSave.id}`);
  };

  const handleDownloadWord = (example: TeacherResumeExample) => {
    const data = example.resumeData;
    const filename = `${example.title.replace(/[^a-zA-Z0-9]/g, '_')}_ResumeBabu`;

    const experienceHtml = data.experience
      .map(
        (exp) => `
        <div style="margin-bottom: 12pt;">
          <p style="margin: 0;">
            <strong style="font-size: 11pt; color: #0f172a;">${exp.role}</strong> — 
            <span style="font-style: italic; color: #334155;">${exp.institution}</span>
            <span style="float: right; color: #64748b; font-size: 10pt;">${exp.period}</span>
          </p>
          <ul style="margin: 3pt 0 6pt 18pt; padding: 0;">
            ${exp.bullets.map((b) => `<li style="margin-bottom: 3pt; color: #334155; font-size: 10.5pt;">${b}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    const educationHtml = data.education
      .map(
        (edu) => `
        <div style="margin-bottom: 6pt;">
          <p style="margin: 0;">
            <strong style="color: #0f172a;">${edu.degree}</strong>
            <span style="float: right; color: #64748b; font-size: 10pt;">${edu.year}</span>
          </p>
          <p style="margin: 0; color: #475569; font-size: 10pt;">${edu.institution} ${edu.scoreOrSpecialization ? `• <em>${edu.scoreOrSpecialization}</em>` : ''}</p>
        </div>
      `
      )
      .join('');

    const certificationsHtml = `
      <ul style="margin: 3pt 0 6pt 18pt; padding: 0;">
        ${data.certifications.map((c) => `<li style="margin-bottom: 2pt; color: #334155; font-size: 10pt;">${c}</li>`).join('')}
      </ul>
    `;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${example.title}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.35; color: #1e293b; margin: 20pt; }
          h1 { font-size: 18pt; font-weight: bold; margin: 0 0 2pt 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5pt; }
          .headline { font-size: 11pt; font-weight: bold; color: #7a1f2b; margin: 0 0 4pt 0; }
          .contact { font-size: 9.5pt; color: #475569; margin: 0 0 14pt 0; border-bottom: 1.5pt solid #7a1f2b; padding-bottom: 6pt; }
          h2 { font-size: 12pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin-top: 14pt; margin-bottom: 6pt; color: #7a1f2b; }
          p { margin: 0 0 4pt 0; }
        </style>
      </head>
      <body>
        <h1>${data.personalInfo.name}</h1>
        <p class="headline">${data.personalInfo.targetTitle}</p>
        <p class="contact">${data.personalInfo.contactLine} | ${data.personalInfo.location}</p>

        <h2>Professional Summary</h2>
        <p style="text-align: justify; color: #334155; margin-bottom: 10pt;">${data.summary}</p>

        <h2>Teaching Experience</h2>
        ${experienceHtml}

        <h2>Education &amp; Pedagogical Degrees</h2>
        ${educationHtml}

        <h2>Teacher Certifications &amp; Licensures</h2>
        ${certificationsHtml}

        <h2>Core Skills &amp; Pedagogical Competencies</h2>
        <p style="margin-bottom: 3pt;"><strong>Pedagogy:</strong> ${data.skills.pedagogy.join(', ')}</p>
        <p style="margin-bottom: 3pt;"><strong>EdTech &amp; Tools:</strong> ${data.skills.techAndTools.join(', ')}</p>
        <p style="margin-bottom: 6pt;"><strong>Classroom Management:</strong> ${data.skills.softSkills.join(', ')}</p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatePlainTextResume = (data: FullTextResumeData) => {
    return `
${data.personalInfo.name.toUpperCase()}
${data.personalInfo.targetTitle}
${data.personalInfo.contactLine} | ${data.personalInfo.location}

PROFESSIONAL SUMMARY
${data.summary}

TEACHING EXPERIENCE
${data.experience
  .map(
    (exp) => `
${exp.role} - ${exp.institution} (${exp.period})
${exp.bullets.map((b) => `• ${b}`).join('\n')}
`
  )
  .join('\n')}

EDUCATION
${data.education
  .map(
    (edu) =>
      `• ${edu.degree} - ${edu.institution} (${edu.year}) ${
        edu.scoreOrSpecialization ? `[${edu.scoreOrSpecialization}]` : ''
      }`
  )
  .join('\n')}

LICENSURES & CERTIFICATIONS
${data.certifications.map((c) => `• ${c}`).join('\n')}

CORE SKILLS
Pedagogy: ${data.skills.pedagogy.join(', ')}
EdTech Tools: ${data.skills.techAndTools.join(', ')}
Management: ${data.skills.softSkills.join(', ')}
`.trim();
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex flex-col font-sans pt-16 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* 1. CLEAN HERO SECTION */}
        <section className="relative pt-14 pb-16 sm:pt-24 sm:pb-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium mb-6">
              <School className="w-3.5 h-3.5" />
              <span>{hero.badge.text}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              {hero.title}{' '}
              <span className="italic text-emerald-700 dark:text-emerald-400 font-medium">
                {hero.highlightedPhrase}
              </span>
              .
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => handleOpenInBuilder(fresherExample, true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{hero.ctaPrimary.text}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDownloadWord(fresherExample)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-secondary text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition border border-border cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Fresher Word (.doc)</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              {hero.trustBadges.map((badge, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. FRESHER GUIDE: STARTING WITH ZERO EXPERIENCE */}
        <section id="fresher-guide" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Step 1 • Fresher Foundation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {fresherMasterclass.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {fresherMasterclass.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {fresherMasterclass.strategies.map((strat, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-emerald-600/40 pl-4 py-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {idx + 1}. {strat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {strat.description}
                </p>
                <p className="text-xs font-mono text-emerald-800 dark:text-emerald-300 pt-1">
                  Tip: {strat.actionableTip}
                </p>
              </div>
            ))}
          </div>

          {/* Clean Copyable Career Objectives */}
          <div className="bg-slate-50/70 dark:bg-[#161512] rounded-2xl border border-border p-5 sm:p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Ready-to-Use Fresher Career Objectives
            </h3>
            <div className="space-y-3">
              {fresherMasterclass.careerObjectives.slice(0, 2).map((obj, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card p-4 rounded-xl border border-border text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic"
                >
                  <p className="leading-relaxed">&ldquo;{obj}&rdquo;</p>
                  <button
                    onClick={() => handleCopy(`obj-${idx}`, obj)}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === `obj-${idx}` ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CLEAN SECTION-BY-SECTION GUIDE */}
        <section id="how-to-write" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Step 2 • Section-by-Section Guide
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              How to Write Every Essential Resume Section
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Follow this exact order from top to bottom so school principals find your eligibility and strengths immediately.
            </p>
          </div>

          <div className="space-y-8">
            {howToWriteGuide.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-8 border-b border-border/60 last:border-b-0 last:pb-0"
              >
                <div className="shrink-0">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-sm">
                    0{step.stepNumber}
                  </span>
                </div>

                <div className="flex-1 space-y-2.5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.summary}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {step.bulletTips.slice(0, 3).map((tip, tipIdx) => (
                      <li
                        key={tipIdx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>

                  {step.exampleSnippet && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#161512] border border-border text-xs font-mono text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5">
                          {step.exampleSnippet.label}
                        </span>
                        <span>{step.exampleSnippet.content}</span>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(`step-${step.stepNumber}`, step.exampleSnippet!.content)
                        }
                        className="text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === `step-${step.stepNumber}` ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EXTRA DETAILS FOR EXPERIENCED TEACHERS */}
        <section id="experienced-extra" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Step 3 • Upgrading With Experience
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {experiencedExtraDetails.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {experiencedExtraDetails.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiencedExtraDetails.extraPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-card/90 rounded-2xl border border-border p-5 sm:p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>{pillar.badge}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.whyItMatters}
                </p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#161512] border border-border text-xs text-slate-700 dark:text-slate-300 italic">
                  &ldquo;{pillar.exampleBullet}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TEMPLATES & LIVE RESUME SAMPLES (NO TABS, NO SHOW/HIDE) */}
        <section id="templates" className="py-16 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto border-b border-border bg-slate-50/40 dark:bg-[#100f0c]/40">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Templates &amp; Real Samples
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Teacher Resume Templates &amp; Ready Examples
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Preview our Fresher and Experienced teacher resumes in the Scholar / Teacher template. Download directly in Word (.doc) or customize inside our free PDF builder.
            </p>
          </div>

          {/* 2 Side-by-Side Live A4 Resume Showcases: Fresher vs Experienced */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Fresher Live Showcase */}
            {fresherExample && (
              <div className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      Fresher / No Experience
                    </span>
                    <span className="text-xs font-mono text-slate-500">B.Ed &amp; CTET</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    {fresherExample.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {fresherExample.whyThisWorks.measurableImpact}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-[#12110e] p-3 sm:p-4 rounded-2xl border border-border flex justify-center">
                  <div className="w-full max-w-[380px]">
                    <DynamicResumeCardPreview
                      resume={FRESHER_TEACHER_SAMPLE_RESUME}
                      showAllPages={true}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleOpenInBuilder(fresherExample, true)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer"
                  >
                    <span>Customize in Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDownloadWord(fresherExample)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Word (.doc)</span>
                  </button>
                  <button
                    onClick={() =>
                      handleCopy(
                        'fresher-text',
                        generatePlainTextResume(fresherExample.resumeData)
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-secondary text-slate-700 dark:text-slate-300 border border-border font-mono font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === 'fresher-text' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Experienced Live Showcase */}
            {experiencedExample && (
              <div className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                      Experienced Teacher (7+ Yrs)
                    </span>
                    <span className="text-xs font-mono text-slate-500">CBSE / ICSE</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    {experiencedExample.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {experiencedExample.whyThisWorks.measurableImpact}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-[#12110e] p-3 sm:p-4 rounded-2xl border border-border flex justify-center">
                  <div className="w-full max-w-[380px]">
                    <DynamicResumeCardPreview
                      resume={TEACHER_SAMPLE_RESUME}
                      showAllPages={true}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleOpenInBuilder(experiencedExample, false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer"
                  >
                    <span>Customize in Builder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDownloadWord(experiencedExample)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Word (.doc)</span>
                  </button>
                  <button
                    onClick={() =>
                      handleCopy(
                        'exp-text',
                        generatePlainTextResume(experiencedExample.resumeData)
                      )
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-secondary text-slate-700 dark:text-slate-300 border border-border font-mono font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedKey === 'exp-text' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary (PRT) & PGT Quick Word Download Row */}
          {otherRoleExamples.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {otherRoleExamples.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-card rounded-2xl border border-border p-5 sm:p-6 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 dark:text-emerald-400">
                      {ex.experienceLabel}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                      {ex.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      &ldquo;{ex.resumeData.summary}&rdquo;
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={() => handleOpenInBuilder(ex, false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer"
                    >
                      <span>Open in Builder</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDownloadWord(ex)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Word (.doc)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Available Academic Builder Layouts */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Academic Layouts Included in Builder
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedTemplates.slice(0, 3).map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {tpl.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {tpl.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const baseSample =
                        tpl.id === 'fresher'
                          ? FRESHER_TEACHER_SAMPLE_RESUME
                          : TEACHER_SAMPLE_RESUME;
                      const resumeToSave: ResumeData = {
                        ...baseSample,
                        id: `resume-teacher-${Date.now()}`,
                        title: `Teacher Resume - ${tpl.name}`,
                        updatedAt: 'Just now',
                        templateId: tpl.id as any,
                      };
                      saveResume(resumeToSave);
                      router.push(`/builder/${resumeToSave.id}`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-secondary text-slate-900 dark:text-white font-bold text-xs hover:bg-emerald-700 hover:text-white transition border border-border cursor-pointer"
                  >
                    Use {tpl.name} Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CLEAN DO'S & DON'TS + TEACHING LEVELS */}
        <section id="dos-and-donts" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
              Quick Reference
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              What to Do vs. What NOT to Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>What to Do</span>
              </h3>
              <ul className="space-y-4">
                {dosAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    <strong className="text-slate-900 dark:text-white block">{item.title}</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <X className="w-4 h-4" />
                <span>What NOT to Do</span>
              </h3>
              <ul className="space-y-4">
                {dosAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    <strong className="text-slate-900 dark:text-white block">{item.title}</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Role Approaches Summary Grid (PRT vs TGT vs PGT) */}
          <div className="pt-10 border-t border-border">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
              Different Approaches: PRT vs. TGT vs. PGT
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentApproaches.approaches.map((app) => (
                <div
                  key={app.id}
                  className="bg-card rounded-2xl border border-border p-5 space-y-2.5"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                    {app.badge}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {app.roleTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {app.coreStrategy}
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                    <strong>Required:</strong> {app.mandatoryCredentials.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. ESSENTIAL SKILLS KEYWORDS */}
        <section id="skills-matrix" className="py-16 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
          <div className="max-w-3xl mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Essential Teacher Skills &amp; ATS Keywords
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Incorporate these terms into your skills and experience bullets to clear school screening portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillsMatrix.categories.map((cat, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>{cat.categoryName}</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {cat.skills.slice(0, 6).map((sk, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CLEAN DIRECTLY VISIBLE FAQS (NO SHOW/HIDE) */}
        <section id="faq" className="py-16 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqSection.faqs.map((faq, idx) => (
              <div key={idx} className="pb-6 border-b border-border last:border-b-0">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* BOTTOM CTA */}
          <div className="mt-14 rounded-3xl bg-slate-50 dark:bg-[#161512] border border-border p-8 sm:p-12 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {bottomCta.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
              {bottomCta.subtitle}
            </p>
            <button
              onClick={() => handleOpenInBuilder(fresherExample, true)}
              className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{bottomCta.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

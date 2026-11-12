'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  AlertCircle,
  HelpCircle,
  X,
} from 'lucide-react';
import { ResumeExample, RESUME_EXAMPLES } from '@/data/examples';
import { DynamicResumeCardPreview } from '@/components/dashboard/DynamicResumeCardPreview';
import { saveResume } from '@/lib/storage';
import { downloadResumeDocx } from '@/lib/export/docxExporter';

interface ResumeExampleDetailClientProps {
  example: ResumeExample;
}

export const ResumeExampleDetailClient: React.FC<ResumeExampleDetailClientProps> = ({
  example,
}) => {
  const router = useRouter();
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [copiedKeywords, setCopiedKeywords] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleCopyKeywords = () => {
    navigator.clipboard.writeText(example.targetKeywords.join(', '));
    setCopiedKeywords(true);
    setTimeout(() => setCopiedKeywords(false), 2000);
  };

  const handleCopyResumeText = () => {
    const p = example.sampleResumeData.personalInfo;
    const expText = example.sampleResumeData.experience
      .map(
        (e) =>
          `${e.role} — ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})\n${e.highlights.map((h) => `• ${h}`).join('\n')}`
      )
      .join('\n\n');
    const eduText = example.sampleResumeData.education
      .map((ed) => `${ed.degree} — ${ed.school} (${ed.graduationDate})`)
      .join('\n');
    const skillText = example.sampleResumeData.skills
      .map((s) => `${s.category}: ${s.items.join(', ')}`)
      .join('\n');

    const fullText = [
      p.fullName,
      `${p.jobTitle} | ${p.location} | ${p.email} | ${p.phone}`,
      '',
      'SUMMARY',
      p.summary,
      '',
      'EXPERIENCE',
      expText,
      '',
      'EDUCATION',
      eduText,
      '',
      'SKILLS',
      skillText,
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(fullText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadWord = async () => {
    await downloadResumeDocx(example.sampleResumeData, example.slug);
  };

  const handleCustomizeInBuilder = () => {
    const newId = `resume-${Date.now()}`;
    const cloneData = {
      ...example.sampleResumeData,
      id: newId,
      title: `${example.role} - Custom Resume`,
      updatedAt: 'Just now',
    };
    saveResume(cloneData);
    router.push(`/builder/${newId}`);
  };

  const otherExamples = RESUME_EXAMPLES.filter((e) => e.slug !== example.slug).slice(0, 3);
  const shareUrl = `https://resumebabu.com/examples/${example.slug}`;

  return (
    <div className="bg-background text-foreground">
      {/* HERO SECTION (matches resume-for-teacher-job editorial style) */}
      <section className="pt-12 pb-14 px-4 sm:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link
              href="/examples"
              className="inline-flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Resume Examples</span>
            </Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold">{example.role}</span>
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            {example.experienceLevel} • ATS Verified Example
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {example.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {example.metaDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCustomizeInBuilder}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Use This {example.role} Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card hover:border-emerald-500/40 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
            >
              Browse All 50+ Templates
            </Link>
          </div>
        </div>
      </section>

      {/* SAMPLE PREVIEW & EXPORT SECTION */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
        <div className="bg-card rounded-3xl border border-border p-5 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
                Recommended Template: {example.recommendedTemplate.toUpperCase()}
              </span>
              <div className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {example.role} Resume Sample (A4 Preview)
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              100% ATS Compliant
            </span>
          </div>

          <div className="bg-slate-100 dark:bg-[#12110e] p-3 sm:p-6 rounded-2xl border border-border flex justify-center">
            <div className="w-full max-w-[540px] rounded-sm overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 bg-white">
              <DynamicResumeCardPreview resume={example.sampleResumeData} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleCustomizeInBuilder}
              className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              <span>Use This Template (Free PDF)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleDownloadWord}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border bg-background hover:border-emerald-500/40 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Download Word (.docx)</span>
            </button>
            <button
              type="button"
              onClick={handleCopyResumeText}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-border bg-background hover:border-emerald-500/40 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Copied Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* WHY THIS RESUME WORKS */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
            Recruiter Analysis
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Why This Resume Shortlists for {example.role} Roles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {example.whyItWorks.map((item, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl border border-border p-5 space-y-1.5"
            >
              <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TOP ATS KEYWORDS & SKILLS TAXONOMY */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
              Keywords Taxonomy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Top ATS Keywords for {example.role}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCopyKeywords}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-card hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl border border-border transition cursor-pointer"
          >
            {copiedKeywords ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied Keywords!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All Keywords</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(example.skillsGrouped).map(([catName, skills]) => (
            <div key={catName} className="bg-card rounded-2xl border border-border p-5 space-y-2.5">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {catName}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#1F1E1A] text-slate-800 dark:text-slate-200 border border-border"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COPYABLE X-Y-Z EXPERIENCE BULLETS */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
            Google X-Y-Z Formula
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Copyable {example.role} Bullet Points
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click copy on any accomplishment bullet to adapt it for your own resume.
          </p>
        </div>

        <div className="space-y-2.5">
          {example.experienceBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="bg-card p-4 rounded-xl border border-border flex items-start justify-between gap-3 hover:border-emerald-500/40 transition"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                • {bullet}
              </p>
              <button
                type="button"
                onClick={() => handleCopyBullet(bullet, idx)}
                className="p-2 rounded-lg bg-background hover:text-emerald-700 dark:hover:text-emerald-400 border border-border shrink-0 transition cursor-pointer"
                title="Copy bullet point"
              >
                {copiedBulletIdx === idx ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON MISTAKES & INTERVIEW PREP */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            <AlertCircle className="w-4 h-4" />
            <span>Common Application Pitfalls</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Mistakes to Avoid for {example.role} Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {example.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="bg-card p-4 rounded-xl border border-border flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <HelpCircle className="w-4 h-4" />
            <span>Interview Preparation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Key Interview Questions for {example.role}
          </h2>
          <div className="space-y-4">
            {example.interviewQuestions.map((qObj, idx) => (
              <div
                key={idx}
                className="bg-card p-5 rounded-2xl border border-border space-y-1.5"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Q: {qObj.q}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Recruiter Tip:
                  </span>{' '}
                  {qObj.tip}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Resume formatting standards aligned with{' '}
            <a
              href="https://careerservices.fas.harvard.edu/resources/bullet-point-writing-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 underline hover:no-underline"
            >
              Harvard OCS Action-Verb Guidelines
            </a>{' '}
            and{' '}
            <a
              href="https://www.ncs.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 underline hover:no-underline"
            >
              National Career Service (NCS)
            </a>
            .
          </p>
        </div>
      </section>

      {/* EXPLORE MORE EXAMPLES */}
      <section className="py-14 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border space-y-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
            Related Resume Samples
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Explore More Career Resume Examples
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherExamples.map((ex) => (
            <Link
              key={ex.slug}
              href={`/examples/${ex.slug}`}
              className="bg-card p-5 rounded-2xl border border-border hover:border-emerald-500/40 transition flex flex-col justify-between space-y-3 group"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {ex.experienceLevel}
                </span>
                <div className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                  {ex.role}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                  {ex.metaDescription}
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                <span>View Example &amp; Guide</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL SHARE & FINAL CTA */}
      <section className="py-14 px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card border border-border px-5 py-4">
          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            Share this {example.role} Resume Example on ResumeBabu:
          </span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${example.role} Resume Example - ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${example.role} Resume Example`)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              X / Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 dark:bg-[#161512] border border-border p-8 sm:p-12 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to Build Your {example.role} Resume?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-6">
            Pre-load this {example.role} resume format and example bullet points on ResumeBabu and export your ATS-ready PDF in minutes.
          </p>
          <button
            type="button"
            onClick={handleCustomizeInBuilder}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize This Resume (Free PDF)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

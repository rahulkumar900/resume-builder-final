'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Copy, Download, Sparkles } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { createTeacherResumeFromSample } from '@/data/teacher-cluster/samples';
import { saveResume } from '@/lib/storage';
import { downloadResumeDocx } from '@/lib/export/docxExporter';

export const TEACHER_CLUSTER_PAGES = [
  {
    href: '/resume-for-teacher-job',
    title: 'Main Teacher Resume Guide',
    subtitle: 'Complete format, examples & 2026 guide',
    badge: 'Hub',
  },
  {
    href: '/resume-for-teacher-job/freshers',
    title: 'Fresher Teacher Resume',
    subtitle: 'For B.Ed / D.El.Ed with no experience',
    badge: 'Fresher',
  },
  {
    href: '/resume-for-teacher-job/experienced',
    title: 'Experienced Teacher Resume',
    subtitle: '2, 5 & 10+ years teaching examples',
    badge: 'Experienced',
  },
  {
    href: '/resume-for-teacher-job/primary-teacher',
    title: 'Primary Teacher (PRT) Resume',
    subtitle: 'Classes 1–5, phonics & activity learning',
    badge: 'PRT',
  },
  {
    href: '/resume-for-teacher-job/tgt-teacher',
    title: 'TGT Teacher Resume',
    subtitle: 'Classes 6–10, graduation & B.Ed',
    badge: 'TGT',
  },
  {
    href: '/resume-for-teacher-job/pgt-teacher',
    title: 'PGT Teacher Resume',
    subtitle: 'Classes 11–12, Master’s & board prep',
    badge: 'PGT',
  },
];

export async function downloadSampleAsWord(sample: ResumeData, customFilename?: string) {
  await downloadResumeDocx(sample, customFilename);
}

export function CreateTeacherResumeButton({
  sample,
  label = 'Create Teacher Resume',
  variant = 'primary',
  compact = false,
  className = '',
}: {
  sample: ResumeData;
  label?: string;
  variant?: 'primary' | 'secondary';
  compact?: boolean;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    const cloned = createTeacherResumeFromSample(sample);
    saveResume(cloned);
    router.push(`/builder/${cloned.id}`);
  };

  if (variant === 'secondary') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-secondary text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition border border-border cursor-pointer ${className}`}
      >
        <span>{label}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    );
  }

  if (compact) {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-xs cursor-pointer ${className}`}
      >
        <span>{label}</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition shadow-md cursor-pointer ${className}`}
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 shrink-0" />
    </button>
  );
}

const SAMPLE_IMAGE_MAP: Record<string, string> = {
  'sample-fresher-teacher': '/templates/teacher-fresher.webp',
  'sample-experienced-teacher': '/templates/teacher-experienced.webp',
  'sample-primary-teacher': '/templates/teacher-primary.webp',
  'sample-tgt-teacher': '/templates/teacher-tgt.webp',
  'sample-pgt-teacher': '/templates/teacher-pgt.webp',
};

export function TeacherResumePreviewBox({
  sample,
  badge,
  title,
  description,
  viewExampleHref,
}: {
  sample: ResumeData;
  badge?: string;
  title: string;
  description?: string;
  viewExampleHref?: string;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const imgSrc = SAMPLE_IMAGE_MAP[sample.id] || '/templates/teacher-fresher.webp';

  const handleUseTemplate = () => {
    const cloned = createTeacherResumeFromSample(sample);
    saveResume(cloned);
    router.push(`/builder/${cloned.id}`);
  };

  const handleCopyText = () => {
    const p = sample.personalInfo;
    const expList = sample.experience?.length ? sample.experience : sample.internships || [];
    const text = [
      p.fullName,
      p.jobTitle,
      [p.phone, p.email, p.location].filter(Boolean).join(' | '),
      '',
      'PROFESSIONAL SUMMARY',
      p.summary,
      '',
      sample.experience?.length ? 'TEACHING EXPERIENCE' : 'TEACHING PRACTICE / INTERNSHIP',
      ...expList.flatMap((e) => [
        `${e.role} | ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})`,
        ...(e.highlights || []).map((h) => `• ${h}`),
      ]),
      '',
      'EDUCATION',
      ...(sample.education || []).map((ed) => `• ${ed.degree} — ${ed.school} (${ed.graduationDate})`),
      '',
      'SKILLS',
      ...(sample.skills || []).map((s) => `${s.category}: ${s.items.join(', ')}`),
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-3xl border border-border p-5 sm:p-7 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          {badge && (
            <span className="inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-1.5">
              {badge}
            </span>
          )}
          <div className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          )}
        </div>
        {viewExampleHref && (
          <Link
            href={viewExampleHref}
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
          >
            View Dedicated Guide →
          </Link>
        )}
      </div>

      <div className="bg-slate-100 dark:bg-[#12110e] p-3 sm:p-5 rounded-2xl border border-border flex justify-center">
        <div className="w-full max-w-[520px]">
          <img
            src={imgSrc}
            alt={`${title} sample template`}
            width={794}
            height={1123}
            className="w-full h-auto rounded-sm shadow-md border border-slate-200 dark:border-slate-700 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={handleUseTemplate}
          className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
        >
          <span>Use This Template (Free PDF)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => downloadSampleAsWord(sample)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Word (.docx)</span>
        </button>
        <button
          onClick={handleCopyText}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-secondary text-slate-700 dark:text-slate-300 border border-border font-mono font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
}

export function CopySnippetBox({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#161512] rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="space-y-1">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
          {label}
        </span>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>
      <button
        onClick={onCopy}
        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0 cursor-pointer"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}

export function TeacherClusterLinks({ currentPath }: { currentPath: string }) {
  return (
    <section className="py-14 px-4 sm:px-8 max-w-5xl mx-auto border-t border-border">
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
          Explore Specific Teaching Roles
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Teacher Resume Guides by Role &amp; Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEACHER_CLUSTER_PAGES.map((item) => {
          const isCurrent = item.href === currentPath;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                isCurrent
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-700'
                  : 'bg-card border-border hover:border-emerald-500/40'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {item.badge}
                </span>
                <div className="font-bold text-slate-900 dark:text-white text-sm mt-2">
                  {item.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{item.subtitle}</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-3 inline-flex items-center gap-1">
                <span>{isCurrent ? 'Current Page' : 'View Guide & Sample'}</span>
                {!isCurrent && <ArrowRight className="w-3 h-3" />}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

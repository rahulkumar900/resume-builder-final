'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  AlertCircle,
  HelpCircle,
  Code2,
  Layers,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { ResumeExample, RESUME_EXAMPLES } from '@/data/examples';
import { DynamicResumeCardPreview } from '@/components/dashboard/DynamicResumeCardPreview';
import { saveResume } from '@/lib/storage';

interface ResumeExampleDetailClientProps {
  example: ResumeExample;
}

export const ResumeExampleDetailClient: React.FC<ResumeExampleDetailClientProps> = ({ example }) => {
  const router = useRouter();
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);
  const [copiedKeywords, setCopiedKeywords] = useState(false);

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

  const handleCustomizeInBuilder = () => {
    // Generate fresh resume with this example's data
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

  return (
    <div className="space-y-12">
      {/* Top Breadcrumb & Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/examples" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">Resume Examples</Link>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300">{example.role}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {example.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {example.metaDescription}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <button
            onClick={handleCustomizeInBuilder}
            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize in Builder</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Live A4 Resume Preview Frame */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-md p-3 sm:p-4 overflow-hidden group">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/[0.06] text-xs text-slate-400 dark:text-slate-500 mb-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">A4 Document Preview</span>
              <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/40">
                100% ATS Verified
              </span>
            </div>

            <div className="relative w-full rounded-lg border border-slate-200/80 dark:border-white/[0.08] overflow-hidden shadow-2xs">
              <DynamicResumeCardPreview resume={example.sampleResumeData} />

              {/* Hover overlay button */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs pointer-events-auto">
                <button
                  onClick={handleCustomizeInBuilder}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg transform scale-95 group-hover:scale-100 transition-all cursor-pointer"
                >
                  Edit &amp; Export Vector PDF →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/80 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-800/40 p-4 space-y-2 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Recommended Template: {example.recommendedTemplate.toUpperCase()}</span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-400/90 leading-relaxed">
              This layout preserves critical ATS section tags while maintaining ideal visual hierarchy for human recruiters.
            </p>
          </div>
        </div>

        {/* Right Column: In-Depth ATS Breakdown & Content Blocks */}
        <div className="lg:col-span-7 space-y-10">
          {/* 1. Why This Resume Works */}
          <section className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recruiter Analysis</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Why This Resume Shortlists for {example.role} Roles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {example.whyItWorks.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#1F1E1A] border border-slate-100 dark:border-white/[0.06] space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Target ATS Keywords & Skills Taxonomy */}
          <section className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  Keywords Taxonomy
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Top ATS Keywords for {example.role}
                </h2>
              </div>
              <button
                onClick={handleCopyKeywords}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/[0.06] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-bold rounded-lg border border-slate-200 dark:border-white/[0.1] transition-all cursor-pointer"
              >
                {copiedKeywords ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3">
              {Object.entries(example.skillsGrouped).map(([catName, skills]) => (
                <div key={catName} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    {catName}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((sk) => (
                      <span
                        key={sk}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#1F1E1A] text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-white/[0.08] shadow-2xs"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Accomplishment Bullets (X-Y-Z Formula) */}
          <section className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                Google X-Y-Z Formula
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Battle-Tested Experience Bullet Points
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click the copy icon on any bullet point to add it directly into your own resume.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              {example.experienceBullets.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#1F1E1A]/70 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 border border-slate-200/70 dark:border-white/[0.06] flex items-start justify-between gap-3 group transition-colors"
                >
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    &bull; {bullet}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyBullet(bullet, idx)}
                    className="p-1.5 rounded-lg bg-white dark:bg-[#191815] text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 shadow-xs border border-slate-200 dark:border-white/[0.1] shrink-0 transition-colors cursor-pointer"
                    title="Copy bullet point"
                  >
                    {copiedBulletIdx === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Common Red Flags to Avoid */}
          <section className="bg-rose-50/40 dark:bg-rose-950/20 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" />
              <span>Common Application Pitfalls</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Mistakes Candidates Make When Applying for {example.role}
            </h2>
            <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-300">
              {example.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 dark:text-rose-400 font-bold">&times;</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. Top Interview Questions & Preparation Tips */}
          <section className="bg-white dark:bg-[#191815] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              <HelpCircle className="w-4 h-4" />
              <span>Technical Interview Preparation</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Key Interview Questions for {example.role}
            </h2>
            <div className="space-y-3 pt-1">
              {example.interviewQuestions.map((qObj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-purple-50/40 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/40 space-y-1.5">
                  <div className="text-xs font-bold text-purple-950 dark:text-purple-200">Q: {qObj.q}</div>
                  <div className="text-[11px] text-purple-900 dark:text-purple-300 leading-relaxed">
                    <strong>Recruiter Tip:</strong> {qObj.tip}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Sticky CTA Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 dark:border-white/[0.08]">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Ready to Build Your {example.role} Resume?
          </h2>
          <p className="text-xs sm:text-sm text-blue-200">
            Pre-load this exact layout and bullet points into the editor and tailor it in under 5 minutes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCustomizeInBuilder}
          className="px-8 py-4 bg-white hover:bg-emerald-50 text-blue-900 font-black text-sm rounded-xl shadow-lg transition-all shrink-0 cursor-pointer"
        >
          Use This Example in Builder →
        </button>
      </div>

      {/* Related Examples Section */}
      <div className="pt-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Explore More Career Resume Examples
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherExamples.map((ex) => (
            <Link
              key={ex.slug}
              href={`/examples/${ex.slug}`}
              className="bg-white dark:bg-[#191815] p-5 rounded-xl border border-slate-200/90 dark:border-white/[0.08] hover:border-blue-300 dark:hover:border-emerald-500/50 shadow-2xs hover:shadow-md transition-all space-y-2 group block"
            >
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {ex.role}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {ex.metaDescription}
              </div>
              <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 pt-1">
                <span>View Example</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

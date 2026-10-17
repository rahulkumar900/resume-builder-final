'use client';

import React from 'react';
import { Award, Target, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface QuickActionCardsProps {
  onScoreResume: () => void;
  onOpenJobScanner?: () => void;
}

export const QuickActionCards: React.FC<QuickActionCardsProps> = ({
  onScoreResume,
  onOpenJobScanner,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Card 1: ATS Compatibility Audit */}
      <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-border p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/60">
              <Award className="w-5 h-5 stroke-[2]" />
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10.5px] font-mono font-semibold border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-3 h-3" />
              6-Pillar Audit
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-1.5">
            ATS Score &amp; Compliance Audit
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Run automated diagnostics across quantifiable metrics, 120+ active action verbs, pronoun penalties, contact accuracy, and semantic parser hierarchy.
          </p>
        </div>

        <button
          onClick={onScoreResume}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-950/60 hover:bg-emerald-200/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-300 dark:border-emerald-800 transition-all self-start cursor-pointer group"
        >
          <span>Run Resume Audit</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Card 2: Job Description Keyword Matcher */}
      <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-border p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-800/60">
              <Target className="w-5 h-5 stroke-[2]" />
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10.5px] font-mono font-semibold border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-3 h-3" />
              Tailor to Job Postings
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-1.5">
            Job Description Keyword Matcher
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Paste any job posting from LinkedIn, Indeed, or Greenhouse to extract critical hard and soft skills. Instantly detect gaps and add missing keywords with one click.
          </p>
        </div>

        <button
          onClick={onOpenJobScanner || onScoreResume}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-950/60 hover:bg-emerald-200/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-300 dark:border-emerald-800 transition-all self-start cursor-pointer group"
        >
          <span>Match Against Job Post</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

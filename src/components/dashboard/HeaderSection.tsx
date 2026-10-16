'use client';

import React from 'react';
import { Plus, FileText, CheckCircle2, Clock, Award, Sparkles } from 'lucide-react';

interface HeaderSectionProps {
  userName?: string;
  totalResumes: number;
  draftCount: number;
  completedCount: number;
  avgAtsScore: number | null;
  onNewResume: () => void;
  onOpenScore?: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  userName,
  totalResumes,
  draftCount,
  completedCount,
  avgAtsScore,
  onNewResume,
  onOpenScore,
}) => {
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: 'Elite', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 65) return { label: 'Good', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Needs Work', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  return (
    <div className="pt-6 pb-6 space-y-6">
      {/* Title & Actions Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>ATS Resume Command Center</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {userName ? `Welcome back, ${userName}` : 'Your Professional Resumes'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Create, audit, and optimize ATS-compliant resumes tailored for high-callback recruitment pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenScore && totalResumes > 0 && (
            <button
              onClick={onOpenScore}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-[#161614] hover:bg-white text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-full border border-black/[0.08] dark:border-white/[0.08] shadow-2xs transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>ATS Audit</span>
            </button>
          )}

          <button
            onClick={onNewResume}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-full shadow-xs hover:shadow transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Resume</span>
          </button>
        </div>
      </div>

      {/* Real Live Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Total Resumes */}
        <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-3.5 sm:p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/80 dark:border-emerald-800/60">
            <FileText className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">Total Resumes</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-serif">{totalResumes}</div>
          </div>
        </div>

        {/* Metric 2: Completed */}
        <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-3.5 sm:p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/80 dark:border-emerald-800/60">
            <CheckCircle2 className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">Ready to Apply</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-serif">{completedCount}</div>
          </div>
        </div>

        {/* Metric 3: Drafts */}
        <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-3.5 sm:p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/80 dark:border-amber-800/60">
            <Clock className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono">In Progress</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-serif">{draftCount}</div>
          </div>
        </div>

        {/* Metric 4: Average ATS Score */}
        <div className="bg-white/90 dark:bg-[#161614] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] p-3.5 sm:p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/80 dark:border-emerald-800/60">
            <Award className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium font-mono truncate">Avg. ATS Readiness</div>
            {avgAtsScore !== null ? (
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-slate-900">{avgAtsScore}%</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold border ${getScoreBadge(avgAtsScore).color}`}>
                  {getScoreBadge(avgAtsScore).label}
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 font-medium">Ready to calculate</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

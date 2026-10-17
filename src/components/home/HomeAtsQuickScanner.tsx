'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

const PRESET_BULLETS = [
  {
    label: 'Needs Work (42/100)',
    text: 'Managed team and worked on software features for the website.',
  },
  {
    label: 'Average (71/100)',
    text: 'Built new user analytics dashboard using React and TypeScript, improving web performance.',
  },
  {
    label: 'Google XYZ (98/100)',
    text: 'Architected distributed Redis caching cluster reducing p99 API latency by 42% across 12M daily requests.',
  },
];

export function HomeAtsQuickScanner() {
  const [inputText, setInputText] = useState(PRESET_BULLETS[2].text);

  const evaluation = useMemo(() => {
    const text = inputText.trim();
    if (!text) {
      return {
        score: 0,
        verbFound: false,
        metricsFound: false,
        lengthScore: 0,
        feedback: 'Enter a bullet point or select a preset above.',
      };
    }

    // Strong action verbs regex
    const strongVerbs = /\b(architected|engineered|spearheaded|orchestrated|delivered|accelerated|streamlined|automated|reduced|scaled|generated|designed|developed|launched|optimized)\b/i;
    const hasStrongVerb = strongVerbs.test(text);

    // Metric / number regex (e.g. 42%, $1.2M, 12M, 500k, 10x)
    const metricRegex = /(\d+[%xXkKMmBb]|\$\d+|\d+\+?)/;
    const hasMetric = metricRegex.test(text);

    // Word count check
    const words = text.split(/\s+/).length;
    const isOptimalLength = words >= 10 && words <= 28;

    let score = 30;
    if (hasStrongVerb) score += 35;
    if (hasMetric) score += 25;
    if (isOptimalLength) score += 10;
    score = Math.min(99, score);

    return {
      score,
      verbFound: hasStrongVerb,
      metricsFound: hasMetric,
      lengthScore: isOptimalLength ? 10 : 4,
      words,
    };
  }, [inputText]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-[#161614] rounded-3xl border border-border p-6 sm:p-8 shadow-xl backdrop-blur-xs transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 mb-2">
            <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Diagnostic Widget</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Test Any Resume Bullet Point in Real Time
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            See how modern Applicant Tracking Systems score your achievements against the Google X-Y-Z formula.
          </p>
        </div>

        {/* Live Score Dial */}
        <div className="flex items-center gap-3 bg-background px-5 py-3 rounded-2xl border border-border shrink-0 self-start sm:self-center">
          <div className="text-right">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Live Score
            </span>
            <span className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
              {evaluation.score}
              <span className="text-sm font-sans font-normal text-slate-400">/100</span>
            </span>
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
              evaluation.score >= 85
                ? 'bg-emerald-600 text-white'
                : evaluation.score >= 60
                ? 'bg-amber-500 text-white'
                : 'bg-rose-500 text-white'
            }`}
          >
            {evaluation.score >= 85 ? 'A+' : evaluation.score >= 60 ? 'B' : 'C-'}
          </div>
        </div>
      </div>

      {/* Preset Pill Buttons */}
      <div className="space-y-2 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
          Try a sample bullet:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_BULLETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setInputText(preset.text)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all cursor-pointer ${
                inputText === preset.text
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs font-semibold'
                  : 'bg-black/[0.03] dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Text Area */}
      <div className="relative mb-6">
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or type one of your resume bullet points here..."
          className="w-full p-4 bg-background rounded-2xl border border-black/[0.08] dark:border-white/[0.1] text-slate-900 dark:text-slate-100 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all resize-none"
        />
      </div>

      {/* Breakdown Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2.5">
          {evaluation.verbFound ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Action Verb
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {evaluation.verbFound ? 'Strong Executive Verb' : 'Needs Power Verb'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2.5">
          {evaluation.metricsFound ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Quantified Impact
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {evaluation.metricsFound ? 'Metrics & % Detected' : 'Missing Numbers / %'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Length &amp; Density
            </span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {evaluation.words} words (Optimal)
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          Ready to audit your entire resume across all 5 pillars with real Workday / Taleo compliance?
        </p>

        <Link
          href="/ats-checker"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <span>Run Full 5-Pillar ATS Scan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

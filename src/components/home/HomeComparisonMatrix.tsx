'use client';

import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

const MATRIX_ROWS = [
  {
    feature: 'Crisp Vector PDF Export',
    us: '100% Free Forever (Selectable Text)',
    competitors: 'Rasterized or Paywalled ($19–$34/mo)',
    usCheck: true,
  },
  {
    feature: 'Watermarks & Branding',
    us: 'Zero Watermark (100% Clean)',
    competitors: 'Forced Watermark on Free Tier',
    usCheck: true,
  },
  {
    feature: 'Real-Time A4 Page-Split',
    us: 'Visual A4 Canvas with Page Safety Margin',
    competitors: 'Random Line Breaks Mid-Bullet',
    usCheck: true,
  },
  {
    feature: 'ATS Diagnostic Engine',
    us: '5-Pillar Score with Workday / Taleo Rules',
    competitors: 'Basic Keyword Matcher Behind Paywall',
    usCheck: true,
  },
  {
    feature: 'AI Bullet Re-writer',
    us: 'Google X-Y-Z Quantified Formula',
    competitors: 'Generic Lorem Ipsum Prompts',
    usCheck: true,
  },
  {
    feature: 'Data Privacy & Cloud Sync',
    us: 'Instant Local Drafts + Cloud Encryption',
    competitors: 'Forced Email Lock-in Before Preview',
    usCheck: true,
  },
];

export function HomeComparisonMatrix() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>The Honest Comparison</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Why Job Seekers Choose Us<span className="text-emerald-700 dark:text-emerald-400">.</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          No surprise subscriptions when you click download. Transparent, recruiter-grade tools engineered for career impact.
        </p>
      </div>

      {/* Mobile-Friendly Comparison Cards (Visible on screens < 640px) */}
      <div className="sm:hidden space-y-3 px-1">
        {MATRIX_ROWS.map((row, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-border bg-white/95 dark:bg-[#161614] shadow-sm space-y-2.5"
          >
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-slate-900 dark:text-white">
              {row.feature}
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-500/[0.08] dark:bg-emerald-950/40 border border-emerald-500/20">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-400">
                  ResumeBuilder
                </div>
                <div className="text-xs font-semibold text-emerald-950 dark:text-emerald-200">
                  {row.us}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05]">
              <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider font-medium text-slate-400">
                  Legacy Resume Apps
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {row.competitors}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet Full Table (Visible on sm and up) */}
      <div className="hidden sm:block overflow-hidden rounded-3xl border border-border bg-white/90 dark:bg-[#161614] shadow-xl backdrop-blur-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border bg-black/[0.02] dark:bg-white/[0.02]">
                <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Feature / Capability
                </th>
                <th className="py-4 px-6 font-serif text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.04]">
                  ResumeBuilder
                </th>
                <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Legacy Resume Apps
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
              {MATRIX_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-500/[0.03]">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{row.us}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{row.competitors}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

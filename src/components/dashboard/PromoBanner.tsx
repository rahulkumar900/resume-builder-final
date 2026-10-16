'use client';

import React from 'react';
import { Rocket } from 'lucide-react';

interface PromoBannerProps {
  onUpgrade: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onUpgrade }) => {
  return (
    <div className="w-full bg-[#1e2538] text-white rounded-2xl p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-lg border border-slate-700/50">
      <div className="flex items-start sm:items-center gap-4">
        {/* Rocket Icon Box with subtle radial gradient */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-slate-600 flex items-center justify-center shrink-0 shadow-inner">
          <span className="text-2xl" role="img" aria-label="rocket">
            🚀
          </span>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
            Get the most out of Kindley
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            Upgrade your subscription to get unlimited features and unlock premium templates and create more resumes.
          </p>
        </div>
      </div>

      <button
        onClick={onUpgrade}
        className="px-6 py-2.5 bg-[#4ade80] hover:bg-[#22c55e] text-slate-900 font-bold text-xs rounded-full shadow hover:shadow-md transition-all active:scale-[0.98] shrink-0 self-start sm:self-center"
      >
        Upgrade to Pro
      </button>
    </div>
  );
};

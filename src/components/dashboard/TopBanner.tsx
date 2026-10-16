'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const TopBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#1e2538] text-slate-200 text-xs py-2 px-4 flex items-center justify-between transition-all duration-200">
      <div className="flex-1 text-center flex items-center justify-center gap-1.5 font-normal">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
        <span>Little work experience? Boost your resume with Kindley&apos;s Resume Course.</span>
        <a
          href="#course"
          onClick={(e) => {
            e.preventDefault();
            alert('Welcome to Kindley Resume Masterclass! Interactive curriculum loaded.');
          }}
          className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 ml-1 transition-colors"
        >
          Check out Kindley Course
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-slate-400 hover:text-white p-1 rounded-sm transition-colors shrink-0"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

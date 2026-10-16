'use client';

import React from 'react';
import { Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { TemplateId } from '@/types/resume';
import {
  PrawiraCardPreview,
  AmeliaCardPreview,
  ChastainCardPreview,
  RahadianCardPreview,
} from './SampleCardPreviews';

interface SampleResumeSectionProps {
  onCreateBlank: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onSeeAll: () => void;
}

export const SampleResumeSection: React.FC<SampleResumeSectionProps> = ({
  onCreateBlank,
  onSelectTemplate,
  onSeeAll,
}) => {
  const templateCards: Array<{
    id: TemplateId;
    name: string;
    category: string;
    preview: React.ReactNode;
  }> = [
    {
      id: 'prawira',
      name: 'Prawira Modern',
      category: 'Clean Single-Column • Tech & Business',
      preview: <PrawiraCardPreview />,
    },
    {
      id: 'ats',
      name: 'ATS Standard',
      category: 'Single Column • 99% Parser Compliance',
      preview: <PrawiraCardPreview />,
    },
    {
      id: 'chastain',
      name: 'Chastain Executive',
      category: 'Serif Hierarchy • Senior & Finance',
      preview: <ChastainCardPreview />,
    },
    {
      id: 'amelia',
      name: 'Amelia Minimal',
      category: 'Two-Tone Header • Product & Ops',
      preview: <AmeliaCardPreview />,
    },
  ];

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Start from a Verified ATS Template
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              100% Free & ATS Tested
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose any layout to start building. Every template produces true searchable vector text.
          </p>
        </div>
        <button
          onClick={onSeeAll}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group cursor-pointer"
        >
          <span>View All 12</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 5 Column Uniform Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Card 1: Create Blank Resume */}
        <button
          onClick={onCreateBlank}
          className="group relative flex flex-col items-center justify-center h-[320px] bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/20 transition-all p-5 shadow-2xs hover:shadow-md cursor-pointer text-center"
        >
          <div className="w-11 h-11 rounded-full bg-slate-50 group-hover:bg-blue-100/80 flex items-center justify-center text-slate-400 group-hover:text-emerald-700 mb-3 transition-colors">
            <Plus className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
            Create Blank Resume
          </span>
          <span className="text-[11px] text-slate-400 mt-1 font-normal">
            Start from scratch
          </span>
        </button>

        {/* Cards 2-5: Real Free ATS Template Cards */}
        {templateCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onSelectTemplate(card.id)}
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col overflow-hidden relative h-[320px]"
          >
            {/* Top Preview Area */}
            <div className="h-[240px] w-full bg-[#f8fafc] p-2 border-b border-slate-100 flex items-center justify-center overflow-hidden relative group-hover:bg-slate-100/50 transition-colors">
              <div className="w-full h-full rounded shadow-xs overflow-hidden pointer-events-none">
                {card.preview}
              </div>
            </div>

            {/* Bottom Info Footer */}
            <div className="p-3 pt-2.5 flex-1 flex flex-col justify-between bg-white">
              <div>
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {card.name}
                </h3>
                <p className="text-[10.5px] text-slate-400 font-medium truncate mt-0.5">
                  {card.category}
                </p>
              </div>

              {/* Action prompt */}
              <div className="flex items-center justify-between text-[10.5px] text-emerald-700 font-semibold pt-1">
                <span>Use Template</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

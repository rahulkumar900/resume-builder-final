'use client';

import React, { useState } from 'react';
import { TemplateDefinition, TemplateId } from '@/types/resume';
import { TemplateCardRealPreview } from './TemplateCardRealPreview';
import { CircleDot } from 'lucide-react';

interface ResumeTemplateCardProps {
  template: TemplateDefinition;
  onSelect: (templateId: TemplateId, color: string) => void;
  customRole?: string;
  customName?: string;
  initialColor?: string;
  isSelected?: boolean;
}

const TEMPLATE_PALETTES: Record<string, string[]> = {
  ats: [], // Monochrome
  prawira: ['#1d4ed8', '#0f766e', '#1e293b', '#d97706', '#dc2626'],
  chastain: ['#1e293b', '#1d4ed8', '#059669', '#7c3aed', '#d97706'],
  rahadian: ['#eab308', '#2563eb', '#1e293b', '#059669', '#dc2626'],
  santoso: ['#f59e0b', '#2563eb', '#0f766e', '#7c3aed', '#e11d48'],
  stockholm: ['#1e293b', '#2563eb', '#059669', '#7c3aed', '#dc2626'],
  dublin: ['#0f766e', '#1d4ed8', '#1e293b', '#d97706', '#991b1b'],
  sydney: ['#4f46e5', '#2563eb', '#059669', '#d97706', '#e11d48'],
  vienna: ['#334155', '#1d4ed8', '#0f766e', '#7c3aed', '#b91c1c'],
  madrid: ['#b91c1c', '#1d4ed8', '#1e293b', '#059669', '#d97706'],
  traditional: ['#0f766e', '#1e3a8a', '#1e293b', '#7c3aed', '#991b1b'],
  naukri: ['#0077b5', '#1e3a8a', '#0f766e', '#1e293b', '#b91c1c'],
  fresher: ['#0f766e', '#2563eb', '#1e293b', '#7c3aed', '#d97706'],
  sarkari: ['#1e293b', '#1e3a8a', '#334155', '#0f766e', '#991b1b'],
  harvard: ['#1e293b', '#991b1b', '#1e3a8a', '#0f766e', '#334155'],
  harvard_tech: ['#0f172a', '#1e293b', '#0369a1', '#047857', '#334155'],
  harvard_experienced: ['#991b1b', '#1e293b', '#1e3a8a', '#0f766e', '#475569'],
  cascade: ['#1e3a8a', '#0f766e', '#1e293b', '#7c3aed', '#b91c1c'],
  novoresume: ['#0f766e', '#2563eb', '#1e293b', '#d97706', '#dc2626'],
  toronto: ['#2563eb', '#0f766e', '#1e293b', '#7c3aed', '#d97706'],
  enhancv: ['#4f46e5', '#2563eb', '#0f766e', '#d97706', '#e11d48'],
  flow: ['#0284c7', '#2563eb', '#059669', '#1e293b', '#7c3aed'],
  silicon: ['#2563eb', '#1e293b', '#059669', '#7c3aed', '#dc2626'],
  oxford: ['#1e3a8a', '#1e293b', '#0f766e', '#991b1b', '#334155'],
  canva: ['#db2777', '#7c3aed', '#2563eb', '#059669', '#d97706'],
  europass: ['#0369a1', '#1e3a8a', '#059669', '#1e293b', '#7c3aed'],
  canvapastel: ['#fb7185', '#a855f7', '#38bdf8', '#facc15', '#10b981'],
  canvanotebook: ['#f43f5e', '#0284c7', '#10b981', '#f59e0b', '#8b5cf6'],
  canvaeditorial: ['#1d4ed8', '#ea580c', '#0f172a', '#047857', '#b91c1c'],
  canvaretro: ['#2e1065', '#f97316', '#ec4899', '#0284c7', '#15803d'],
  canvaaesthetic: ['#c2410c', '#059669', '#b45309', '#1e293b', '#6b7280'],
  ribbon: ['#26235A', '#1e293b', '#0f766e', '#831843', '#1e3a8a'],
  marigold: ['#17332E', '#1e293b', '#1e3a8a', '#3f3f46', '#713f12'],
  stamp: ['#45214A', '#1e293b', '#0f766e', '#1e3a8a', '#9a3412'],
};

export const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
  template,
  onSelect,
  customRole,
  customName,
  initialColor,
  isSelected = false,
}) => {
  const [activeColor, setActiveColor] = useState<string>(
    initialColor || template.accentColor || '#1d4ed8'
  );

  const swatches = TEMPLATE_PALETTES[template.id] || [
    '#1e293b',
    '#1d4ed8',
    '#059669',
    '#d97706',
    '#dc2626',
  ];

  const isMonochrome = template.id === 'ats';

  return (
    <div className="flex flex-col group text-left">
      {/* 1. Outer Box Container with minimal padding */}
      <div
        onClick={() => onSelect(template.id, activeColor)}
        className={`relative bg-[#f1f4f9] dark:bg-[#1c1b18] hover:bg-[#ebf0f7] dark:hover:bg-[#23221e] rounded-2xl p-3 sm:p-3.5 pt-3.5 sm:pt-4 pb-3 sm:pb-3.5 flex flex-col items-center justify-between border cursor-pointer transition-all duration-200 ${
          isSelected
            ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
            : 'border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15] shadow-xs hover:shadow-md'
        }`}
      >

        {/* 2. Full-Width White A4 Paper Preview - Big & Clear with No Extra Padding */}
        <div className="relative w-full flex items-center justify-center my-0.5">
          <TemplateCardRealPreview
            templateId={template.id}
            themeColor={activeColor}
            customRole={customRole}
            customName={customName}
            className="shadow-[0_4px_16px_-2px_rgba(0,0,0,0.06)] group-hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300"
          />

          {/* Hover Overlay: Centered "Use this template" Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900/5 backdrop-blur-[0.5px] rounded-[3px] z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template.id, activeColor);
              }}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-lg transform scale-95 group-hover:scale-100 transition-all cursor-pointer"
            >
              Use this template
            </button>
          </div>
        </div>

        {/* 3. Bottom Controls Row (Palette on left, Format badges on right, no divider line) */}
        <div className="w-full flex items-center justify-between pt-3.5 px-0.5 z-20">
          {/* Left: Palette circles or Monochrome indicator */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {isMonochrome || swatches.length === 0 ? (
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                <CircleDot className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Monochrome</span>
              </div>
            ) : (
              swatches.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setActiveColor(hex)}
                  style={{ backgroundColor: hex }}
                  title={`Select color ${hex}`}
                  className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                    activeColor === hex
                      ? 'ring-2 ring-offset-2 ring-emerald-600 scale-125'
                      : 'hover:scale-110 opacity-90 hover:opacity-100'
                  }`}
                />
              ))
            )}
          </div>

          {/* Right: PDF & DOCX Badges */}
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-[#cbd5e1]/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-extrabold text-[9px] rounded-xs tracking-wider">
              PDF
            </span>
            <span className="px-1.5 py-0.5 bg-[#cbd5e1]/70 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-extrabold text-[9px] rounded-xs tracking-wider">
              DOCX
            </span>
          </div>
        </div>
      </div>

      {/* 4. Outside Title and Description */}
      <div className="pt-3 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            onClick={() => onSelect(template.id, activeColor)}
            className={`font-bold text-base sm:text-lg transition-colors cursor-pointer ${
              isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
            }`}
          >
            {template.name}
          </h3>
          {['harvard', 'harvard_tech', 'harvard_experienced'].includes(template.id) && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Harvard FAS Standard
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-0.5">
          {template.description}
        </p>
      </div>
    </div>
  );
};

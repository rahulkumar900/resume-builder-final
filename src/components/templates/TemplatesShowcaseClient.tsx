'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';
import { TemplateId, TemplateDefinition } from '@/types/resume';
import { ResumeTemplateCard } from '@/components/common/ResumeTemplateCard';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import {
  ShieldCheck,
  Sliders,
  Check,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PALETTES = [
  { name: 'Forest Emerald', hex: '#15803d' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Deep Slate', hex: '#1e293b' },
  { name: 'Violet Indigo', hex: '#7c3aed' },
  { name: 'Warm Amber', hex: '#d97706' },
  { name: 'Ruby Rose', hex: '#e11d48' },
];

export function TemplatesShowcaseClient() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'harvard' | 'top10' | 'indian' | 'ats' | 'double' | 'single' | 'creative' | 'executive'>('all');
  const [selectedColor, setSelectedColor] = useState('#15803d');
  const [previewModalTemplate, setPreviewModalTemplate] = useState<{
    template: TemplateDefinition;
    color: string;
  } | null>(null);

  const filtered = TEMPLATES.filter((tpl) => {
    if (activeFilter === 'harvard') return ['harvard', 'harvard_tech', 'harvard_experienced', 'oxford', 'ats', 'silicon', 'traditional'].includes(tpl.id);
    if (activeFilter === 'top10') return ['harvard', 'cascade', 'novoresume', 'toronto', 'enhancv', 'flow', 'silicon', 'oxford', 'canva', 'europass'].includes(tpl.id);
    if (activeFilter === 'indian') return ['traditional', 'naukri', 'fresher', 'sarkari'].includes(tpl.id);
    if (activeFilter === 'ats') return tpl.id === 'ats' || tpl.id === 'harvard' || tpl.id === 'harvard_tech' || tpl.id === 'harvard_experienced' || tpl.id === 'silicon' || tpl.layout === 'single';
    if (activeFilter === 'single') return tpl.layout === 'single';
    if (activeFilter === 'double') return tpl.layout === 'double';
    if (activeFilter === 'creative') return ['santoso', 'rahadian', 'chastain', 'canva', 'enhancv', 'canvapastel', 'canvanotebook', 'canvaeditorial', 'canvaretro', 'canvaaesthetic'].includes(tpl.id);
    if (activeFilter === 'executive') return ['prawira', 'stockholm', 'oxford', 'harvard', 'harvard_experienced', 'chastain'].includes(tpl.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 pt-16 transition-colors duration-300">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-transparent border-b border-border py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Recruiter-Approved &amp; ATS Friendly
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Professional Resume Templates
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every layout is engineered to pass Applicant Tracking Systems (ATS) while presenting your career achievements with visual polish and precise A4 pagination.
          </p>
        </div>
      </section>

      {/* Showcase Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Controls Bar: Filters & Live Color Picker */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 dark:bg-[#161614] backdrop-blur-xs p-4 rounded-2xl border border-border shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: `All Templates (${TEMPLATES.length})` },
              { id: 'harvard', label: '🎓 Harvard & Ivy League' },
              { id: 'top10', label: '🏆 Top Classics (10)' },
              { id: 'indian', label: '🇮🇳 Indian Formats' },
              { id: 'ats', label: 'ATS-Optimized' },
              { id: 'double', label: 'Two-Column Modern' },
              { id: 'single', label: 'Single-Column Classic' },
              { id: 'executive', label: 'Executive & Senior' },
              { id: 'creative', label: 'Creative & Tech' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-emerald-700 dark:bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Color Switcher */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" />
              Palette Preview:
            </span>
            <div className="flex items-center gap-1.5">
              {PALETTES.map((p) => (
                <button
                  key={p.hex}
                  onClick={() => setSelectedColor(p.hex)}
                  title={p.name}
                  style={{ backgroundColor: p.hex }}
                  className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center cursor-pointer ${
                    selectedColor === p.hex
                      ? 'scale-110 ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-[#100F0C]'
                      : 'hover:scale-105'
                  }`}
                >
                  {selectedColor === p.hex && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => (
            <ResumeTemplateCard
              key={tpl.id}
              template={tpl}
              initialColor={selectedColor}
              onSelect={(tplId, color) => {
                router.push(`/create?template=${tplId}&color=${encodeURIComponent(color)}`);
              }}
              onPreview={(template, color) => {
                setPreviewModalTemplate({ template, color });
              }}
            />
          ))}
        </div>
      </main>

      {/* High-Resolution Template Fullscreen Preview Modal (Mobile & Desktop) */}
      {previewModalTemplate && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={() => setPreviewModalTemplate(null)}
        >
          <div
            className="relative bg-white dark:bg-[#161614] rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/80 dark:bg-card">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {previewModalTemplate.template.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {previewModalTemplate.template.layout === 'double' ? 'Two-Column ATS Layout' : 'Single-Column Classic ATS'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const tplId = previewModalTemplate.template.id;
                    const color = previewModalTemplate.color;
                    setPreviewModalTemplate(null);
                    router.push(`/create?template=${tplId}&color=${encodeURIComponent(color)}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 min-h-[38px]"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModalTemplate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Real Vector Preview */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-center justify-center bg-slate-100/70 dark:bg-black/30">
              <div className="w-full max-w-[580px] shadow-2xl rounded-lg overflow-hidden border border-slate-200 dark:border-white/10">
                <TemplateCardRealPreview
                  templateId={previewModalTemplate.template.id}
                  themeColor={previewModalTemplate.color}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/dashboard/Navbar';
import { Footer } from '@/components/dashboard/Footer';
import { TEMPLATES } from '@/lib/templates';
import { TemplateId } from '@/types/resume';
import { ResumeTemplateCard } from '@/components/common/ResumeTemplateCard';
import {
  ShieldCheck,
  Sliders,
  Check,
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'top10' | 'indian' | 'ats' | 'double' | 'single' | 'creative' | 'executive'>('all');
  const [selectedColor, setSelectedColor] = useState('#15803d');

  const filtered = TEMPLATES.filter((tpl) => {
    if (activeFilter === 'top10') return ['harvard', 'cascade', 'novoresume', 'toronto', 'enhancv', 'flow', 'silicon', 'oxford', 'canva', 'europass'].includes(tpl.id);
    if (activeFilter === 'indian') return ['traditional', 'naukri', 'fresher', 'sarkari'].includes(tpl.id);
    if (activeFilter === 'ats') return tpl.id === 'ats' || tpl.id === 'harvard' || tpl.id === 'silicon' || tpl.layout === 'single';
    if (activeFilter === 'single') return tpl.layout === 'single';
    if (activeFilter === 'double') return tpl.layout === 'double';
    if (activeFilter === 'creative') return ['santoso', 'rahadian', 'chastain', 'canva', 'enhancv', 'canvapastel', 'canvanotebook', 'canvaeditorial', 'canvaretro', 'canvaaesthetic'].includes(tpl.id);
    if (activeFilter === 'executive') return ['amelia', 'prawira', 'stockholm', 'oxford', 'harvard'].includes(tpl.id);
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
              onSelect={(tplId) => {
                router.push(`/create?template=${tplId}`);
              }}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';
import { TEMPLATES } from '@/lib/templates';

export function TemplateMarquee() {
  // Curate 10 standout templates for the marquee track
  const marqueeTemplates = [
    {
      id: 'infrastructure_engineer',
      name: 'Vertical',
      role: 'Tech & Architecture',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#FFD23F',
    },
    {
      id: 'boxed_engineer',
      name: 'Blueprint',
      role: 'Engineering & Grid',
      layout: 'Dual Column',
      ats: '98% ATS',
      accent: '#0F3B73',
    },
    {
      id: 'editorial_hr',
      name: 'Cascade',
      role: 'Operations & People',
      layout: 'Single Column',
      ats: '100% ATS',
      accent: '#E4572E',
    },
    {
      id: 'neobrutalist',
      name: 'Brutal',
      role: 'High-Contrast Neo-Brutalist',
      layout: 'Dual Column',
      ats: '97% ATS',
      accent: '#FFE14D',
    },
    {
      id: 'accentbar',
      name: 'Meridian',
      role: 'Clean ATS Modern',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#1F3DD6',
    },
    {
      id: 'neon_creative',
      name: 'Aurora',
      role: 'Dark Gradient & Glow',
      layout: 'Dual Column',
      ats: '96% ATS',
      accent: '#7C3AED',
    },
    {
      id: 'executive_finance',
      name: 'Quiet',
      role: 'Minimalist Executive',
      layout: 'Single Column',
      ats: '100% ATS',
      accent: '#111111',
    },
    {
      id: 'stamp',
      name: 'Stamp',
      role: 'Perforated Badge & Tech',
      layout: 'Dual Column',
      ats: '98% ATS',
      accent: '#45214A',
    },
    {
      id: 'ribbon',
      name: 'Ribbon',
      role: 'Editorial & Monogram',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#26235A',
    },
    {
      id: 'numbered',
      name: 'Ledger',
      role: 'Indexed Numbered Header',
      layout: 'Single Column',
      ats: '98% ATS',
      accent: '#A36B00',
    },
    {
      id: 'marginalia',
      name: 'Marginalia',
      role: 'Margin Headline Metrics',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#B45309',
    },
    {
      id: 'dossier',
      name: 'Dossier',
      role: 'Case File & Folder Tabs',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#E11D48',
    },
    {
      id: 'career_gantt',
      name: 'Career Gantt',
      role: 'Tenure Timeline Visualizer',
      layout: 'Dual Column',
      ats: '98% ATS',
      accent: '#0F766E',
    },
    {
      id: 'monogram',
      name: 'Monogram',
      role: 'Watermark Monogram Display',
      layout: 'Dual Column',
      ats: '98% ATS',
      accent: '#581C87',
    },
    {
      id: 'binder_tabs',
      name: 'Binder Tabs',
      role: 'Right-Edge Binder Index Tabs',
      layout: 'Single Column',
      ats: '99% ATS',
      accent: '#0F172A',
    },
    {
      id: 'competency_radar',
      name: 'Competency Radar',
      role: 'Hexagonal Competency Radar',
      layout: 'Dual Column',
      ats: '97% ATS',
      accent: '#D6246E',
    },
  ];

  // Duplicate arrays to achieve infinite seamless loop
  const row1 = [...marqueeTemplates, ...marqueeTemplates];
  const row2 = [...marqueeTemplates.slice().reverse(), ...marqueeTemplates.slice().reverse()];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100 overflow-hidden relative">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300/70 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span>Curated Recruiter Layouts</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
          Recruiter-Tested Designs, Ready In Seconds
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
          Hover over any template to pause. Switch between single and dual-column layouts anytime without retyping.
        </p>
      </div>

      {/* Marquee Row 1: Leftward continuous scroll */}
      <div className="relative w-full overflow-hidden mb-6 py-2">
        {/* Left & Right gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-5 hover:[animation-play-state:paused]">
          {row1.map((item, idx) => (
            <Link
              key={`row1-${item.id}-${idx}`}
              href={`/create?template=${item.id}`}
              className="group w-[280px] shrink-0 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{item.ats}</span>
                  </div>
                </div>

                {/* Stylized Miniature Resume Preview */}
                <div className="bg-slate-50 rounded-lg p-2.5 mb-3 border border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                  <div className="h-2 w-16 bg-slate-300 rounded mb-1.5" />
                  <div className="h-1.5 w-24 bg-slate-200 rounded mb-2.5" />
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-slate-200/80 rounded" />
                    <div className="h-1.5 w-4/5 bg-slate-200/80 rounded" />
                    <div className="h-1.5 w-3/4 bg-slate-200/60 rounded" />
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.role}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                <span className="text-[10px] text-slate-400">{item.layout}</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  <span>Use Template</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Rightward continuous scroll */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex gap-5 hover:[animation-play-state:paused]">
          {row2.map((item, idx) => (
            <Link
              key={`row2-${item.id}-${idx}`}
              href={`/create?template=${item.id}`}
              className="group w-[280px] shrink-0 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300/60">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>{item.ats}</span>
                  </div>
                </div>

                {/* Stylized Miniature Resume Preview */}
                <div className="bg-slate-50 rounded-lg p-2.5 mb-3 border border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                  <div className="h-2 w-20 bg-slate-300 rounded mb-1.5" />
                  <div className="h-1.5 w-28 bg-slate-200 rounded mb-2.5" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-slate-200/80 rounded" />
                      <div className="h-1.5 w-3/4 bg-slate-200/80 rounded" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-slate-200/60 rounded" />
                      <div className="h-1.5 w-2/3 bg-slate-200/60 rounded" />
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.role}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                <span className="text-[10px] text-slate-400">{item.layout}</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  <span>Use Template</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

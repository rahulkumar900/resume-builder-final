'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  FileSearch,
  Layout,
  Layers,
  ChevronRight,
  ExternalLink,
  Laptop,
} from 'lucide-react';

interface TourStep {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  urlPill: string;
  ctaText: string;
  ctaHref: string;
  highlights: { title: string; desc: string }[];
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'setup',
    tabLabel: '01. Role Setup',
    badge: 'Step 1 • Onboarding Wizard',
    title: 'Smart Career Archetypes & Dynamic Ordering',
    subtitle:
      'Choose whether to start fresh or paste an existing resume. Select your target role and experience level, and our engine automatically structures your dynamic section order (projects & coursework for freshers; quantified achievements for seniors).',
    imageSrc: '/images/flow/01-role-setup.png',
    urlPill: 'resumebabu.com/create',
    ctaText: 'Start Wizard Free',
    ctaHref: '/create',
    highlights: [
      { title: 'Zero Signup Required', desc: 'Jump straight into building without creating an account or providing credit card details.' },
      { title: 'Smart Role Suggester', desc: 'Pre-fills suggested technical competencies and optimal template layouts for 50+ job titles.' },
      { title: 'Section Priority Engine', desc: 'Automatically reorders Education, Experience, and Internships based on career tenure.' },
    ],
  },
  {
    id: 'editor',
    tabLabel: '02. Studio Editor',
    badge: 'Step 2 • Real-Time Studio',
    title: 'WYSIWYG Dual-Pane Editor with Live A4 Fitting',
    subtitle:
      'Edit your details on the left and watch your resume compile on the right in real time. Our GhostDOM™ page-fitting algorithm continuously calculates line height and padding so you never get accidental 2-line spills onto a blank second page.',
    imageSrc: '/images/flow/02-studio-editor.png',
    urlPill: 'resumebabu.com/builder/senior-engineer',
    ctaText: 'Launch Studio Editor',
    ctaHref: '/create?template=prawira',
    highlights: [
      { title: 'Real-Time A4 Pagination', desc: 'Visual A4 boundary guide with automatic zoom fit for 100% accurate print preview.' },
      { title: 'Google X-Y-Z Bullet Helper', desc: 'Transforms weak task descriptions into quantified business impact statements on demand.' },
      { title: 'Instant Local Auto-Save', desc: 'Continuous offline-first local persistence ensures your edits are never lost.' },
    ],
  },
  {
    id: 'design',
    tabLabel: '03. Design Studio',
    badge: 'Step 3 • Executive Styling',
    title: 'Curated Typography & Professional Palette Tokens',
    subtitle:
      'Switch between 50+ templates with zero data loss. Fine-tune your executive look with ATS-safe font pairings (Inter, Space Grotesk, Fraunces, Merriweather), custom line height, section spacing, and recruitment-tested accent palettes.',
    imageSrc: '/images/flow/03-design-studio.png',
    urlPill: 'resumebabu.com/builder/senior-engineer?mode=design',
    ctaText: 'Explore Design Tools',
    ctaHref: '/templates',
    highlights: [
      { title: '50+ Swappable Layouts', desc: 'Single-column technical standards, two-column formats, and fresh graduate designs.' },
      { title: '1-Click Color Themes', desc: 'Recruiter-tested executive navy, emerald, slate, and modern monochromatic tokens.' },
      { title: 'Precision Spacing Sliders', desc: 'Adjust margins, line heights, and section gaps in 1px increments to achieve the perfect 1-page fit.' },
    ],
  },
  {
    id: 'audit',
    tabLabel: '04. ATS Diagnostic',
    badge: 'Step 4 • Built-in Scanner',
    title: 'Live 30-Point ATS Audit & 1-Click Error Resolvers',
    subtitle:
      'The built-in parser inspector verifies your resume against real ATS parsing rules (Workday, Taleo, Greenhouse, Lever). Catch missing contact details, unquantified bullets, or formatting traps before submitting your job application.',
    imageSrc: '/images/flow/04-ats-score-audit.png',
    urlPill: 'resumebabu.com/builder/senior-engineer?mode=check',
    ctaText: 'Run Resume Audit',
    ctaHref: '/ats-checker',
    highlights: [
      { title: 'Real-Time Score Gauge', desc: 'Color-coded 0–100 score benchmarked against top-tier corporate applicant pools.' },
      { title: 'One-Click "Fix" Shortcuts', desc: 'Directly jumps to the exact field needing update so you can resolve flags in seconds.' },
      { title: 'Parser Trap Protection', desc: 'Ensures no unanchored text boxes, confusing tables, or invalid icon fonts get exported.' },
    ],
  },
  {
    id: 'scanner',
    tabLabel: '05. ATS Scanner',
    badge: 'Step 5 • Standalone Scanner',
    title: 'Pre-Flight Document Scanner & Job Matcher',
    subtitle:
      'Already have a resume? Upload your PDF, Word doc, or paste text into our standalone scanner. Instantly inspect your parsing score across 5 key pillars and benchmark your resume against specific target job description keywords.',
    imageSrc: '/images/flow/05-ats-checker.png',
    urlPill: 'resumebabu.com/ats-checker',
    ctaText: 'Test Drive Scanner Free',
    ctaHref: '/ats-checker',
    highlights: [
      { title: '5-Pillar Compatibility Breakdown', desc: 'Contact, Summary, Quantified Metrics, Hard Keywords, and Machine Parsing checks.' },
      { title: 'Keyword Gap Analysis', desc: 'Highlights missing hard skills from the target job posting to maximize interview callbacks.' },
      { title: 'Instant Sample Report', desc: 'Test-drive the full diagnostic engine with one click before uploading your document.' },
    ],
  },
  {
    id: 'templates',
    tabLabel: '06. Template Suite',
    badge: 'Step 6 • Template Catalog',
    title: '50+ ATS-Optimized Technical & Executive Templates',
    subtitle:
      'Browse our complete library of single-column technical layouts, modern two-column designs, Harvard/Oxford academic formats, and India-specific layouts (Naukri-ready, CGPA tables, and Sarkari format).',
    imageSrc: '/images/flow/06-templates-catalog.png',
    urlPill: 'resumebabu.com/templates',
    ctaText: 'Browse All 50+ Templates',
    ctaHref: '/templates',
    highlights: [
      { title: '100% Vector PDF Output', desc: 'Razor-sharp typography at any zoom level with a clean, fully selectable text layer.' },
      { title: 'Zero Watermark Guarantee', desc: 'Export full-resolution print-ready PDFs without branding stamps or paywalls.' },
      { title: 'Filtered by Career Level', desc: 'Dedicated views for Tech Engineers, Executives, Campus Freshers, and Designers.' },
    ],
  },
];

export function SaaSProductTour() {
  const [activeStepIndex, setActiveStepIndex] = useState(1); // Default to Studio Editor (Step 2)
  const current = TOUR_STEPS[activeStepIndex];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive SaaS Product Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Designed for engineers. Built for recruiters.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Experience the complete end-to-end resume creation workflow — from initial role onboarding to real-time vector A4 rendering and enterprise ATS verification.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <div className="bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex gap-1 shrink-0">
            {TOUR_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>{step.tabLabel}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-slate-950/90 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Mock Browser Top Header Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* URL Pill Bar */}
            <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 text-xs font-mono">
              <span className="text-emerald-400 text-[10px]">🔒 https://</span>
              <span className="truncate">{current.urlPill}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="hidden md:inline px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                100% Free • No Paywall
              </span>
            </div>
          </div>

          {/* Body: Split View with Feature Details & Real Screenshot Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left: Feature Details & Value Prop */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/50">
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/80 mb-3">
                    {current.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {current.subtitle}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-3 pt-2">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{h.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step CTA */}
              <div className="pt-8">
                <Link
                  href={current.ctaHref}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 px-1">
                  <span>Step {activeStepIndex + 1} of 6 in creation pipeline</span>
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev + 1) % TOUR_STEPS.length)}
                    className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Next Step <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: High-Resolution Flow Screenshot Preview */}
            <div className="lg:col-span-7 bg-slate-900/40 p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] relative overflow-hidden group">
              <div className="w-full h-full relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 transition-transform duration-300 group-hover:scale-[1.01]">
                <Image
                  src={current.imageSrc}
                  alt={current.title}
                  width={1440}
                  height={900}
                  priority={activeStepIndex === 1}
                  className="w-full h-auto object-cover object-top transition-all duration-300"
                />

                {/* Subtle Gradient Overlay at bottom for clean depth */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Pill Bar at bottom */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Free Vector PDF Export</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">50+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">ATS-Tested Templates</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">30-Point</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Live Scoring Diagnostics</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">0s</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Signup Delay To Start</div>
          </div>
        </div>
      </div>
    </section>
  );
}

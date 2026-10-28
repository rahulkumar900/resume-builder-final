'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Palette,
  ShieldCheck,
  Download,
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  Zap,
  FileCheck2,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

const FULL_SUGGESTION_TEXT =
  'Architected distributed Go microservices on AWS EKS, slashing p99 API latency by 45% and sustaining 99.98% SLA across 12M daily queries.';

export function ScrollStorySection() {
  // Section 1: Typewriter & Strikethrough state
  const section1Ref = useRef<HTMLDivElement>(null);
  const [s1InView, setS1InView] = useState(false);
  const [typedChars, setTypedChars] = useState(0);

  // Section 2: Design Layout & Palette state
  const [activeLayout, setActiveLayout] = useState<'single' | 'double' | 'banner'>('single');
  const [activeColor, setActiveColor] = useState<string>('#10b981');

  // Section 3: ATS Laser & Score state
  const section3Ref = useRef<HTMLDivElement>(null);
  const [s3InView, setS3InView] = useState(false);
  const [atsScore, setAtsScore] = useState(42);

  // Section 4: Vector PDF Export state
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  // IntersectionObserver for Section 1 (Typewriter animation)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setS1InView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (section1Ref.current) observer.observe(section1Ref.current);
    return () => observer.disconnect();
  }, []);

  // Run typewriter when Section 1 is visible
  useEffect(() => {
    if (!s1InView) return;
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= FULL_SUGGESTION_TEXT.length) {
        setTypedChars(FULL_SUGGESTION_TEXT.length);
        clearInterval(interval);
      } else {
        setTypedChars(current);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [s1InView]);

  // IntersectionObserver for Section 3 (ATS Score counter animation)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setS3InView(true);
        }
      },
      { threshold: 0.3 }
    );
    if (section3Ref.current) observer.observe(section3Ref.current);
    return () => observer.disconnect();
  }, []);

  // Increment ATS score when Section 3 enters view
  useEffect(() => {
    if (!s3InView) return;
    let score = 42;
    const interval = setInterval(() => {
      score += 2;
      if (score >= 98) {
        setAtsScore(98);
        clearInterval(interval);
      } else {
        setAtsScore(score);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [s3InView]);

  const handleSimulateExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setHasExported(true);
      fireConfetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.7 },
      });
    }, 700);
  };

  return (
    <div className="w-full">
      {/* =======================================================================
          SCENE 1: WRITE (100% Screen Height)
          ======================================================================= */}
      <section
        ref={section1Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Explanation */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800">
              <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>STEP 01 · AI BULLET REWRITER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Turn passive task lists into quantified business impact.
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Recruiters instantly reject resumes full of vague task descriptions. As you build your resume, our integrated AI rewriter automatically detects weak verbs and reframes them using the Google X-Y-Z formula.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-card/80 dark:bg-[#0c1411]/80 rounded-xl border border-border">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block">Formula</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Google X-Y-Z</span>
              </div>
              <div className="p-3.5 bg-card/80 dark:bg-[#0c1411]/80 rounded-xl border border-border">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-semibold block">Impact Boost</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+45% Interview Rate</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Try Bullet Rewriter Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Animated Document Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-6">
              {/* Document Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    REAL-TIME AI REWRITER WORKSPACE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Google X-Y-Z Mode
                </span>
              </div>

              {/* Step A: Weak Draft with Animated Strikethrough */}
              <div className="p-4 bg-red-50/60 dark:bg-red-950/20 rounded-2xl border border-red-200 dark:border-red-900/50 space-y-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-red-600 dark:text-red-400">
                  <span>BEFORE: PASSIVE DUTY (42/100 RECRUITER IMPACT)</span>
                  <span>Filtered</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 line-through decoration-red-500 decoration-2 font-sans italic">
                  &quot;Responsible for working on backend microservices and databases for high traffic web applications.&quot;
                </p>
              </div>

              {/* Step B: AI Streamed Rewrite */}
              <div className="p-5 bg-emerald-50/80 dark:bg-emerald-950/30 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>AFTER: QUANTIFIED LEADERSHIP (98/100 ATS SCORE)</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-200/80 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                    Validated
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-900 dark:text-white font-medium leading-relaxed font-sans min-h-[56px]">
                  • {FULL_SUGGESTION_TEXT.slice(0, Math.max(16, typedChars))}
                  {typedChars < FULL_SUGGESTION_TEXT.length && (
                    <span className="inline-block w-2 h-4 bg-emerald-600 dark:bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </p>

                <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Metric Extracted: 45% Latency Reduction · 12M Queries</span>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Applied to Resume</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SCENE 2: DESIGN & LAYOUT MORPHER (100% Screen Height)
          ======================================================================= */}
      <section className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-teal-500/[0.02] to-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Interactive Controls */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold border border-teal-300 dark:border-teal-800">
              <Palette className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>STEP 02 · REAL-TIME LAYOUT MORPHER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Switch layouts & palettes in 1 click without losing text.
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Switching templates in traditional builders breaks margins and reformats your career data. In ResumeBabu, your content is stored in an independent semantic data layer that reflows instantly into any single-column or dual-column layout.
            </p>

            {/* Layout Switcher Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Select Layout Architecture:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'single', label: 'Harvard Classic', tag: 'Single Column' },
                  { id: 'double', label: 'Silicon Tech', tag: 'Dual Column' },
                  { id: 'banner', label: 'Executive Lead', tag: 'Header Accent' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayout(l.id as typeof activeLayout)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      activeLayout === l.id
                        ? 'bg-teal-600 text-white font-bold border-teal-600 shadow-md'
                        : 'bg-card text-slate-700 dark:text-slate-300 border-border hover:bg-accent'
                    }`}
                  >
                    <span className="block truncate font-bold">{l.label}</span>
                    <span className="text-[10px] opacity-80 block truncate">{l.tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Palette Picker */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Accent Theme Color:
              </label>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Emerald', hex: '#10b981' },
                  { name: 'Teal', hex: '#0f766e' },
                  { name: 'Royal Blue', hex: '#2563eb' },
                  { name: 'Executive Navy', hex: '#1e3a8a' },
                  { name: 'Tech Violet', hex: '#7c3aed' },
                ].map((pal) => (
                  <button
                    key={pal.hex}
                    onClick={() => setActiveColor(pal.hex)}
                    className={`w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                      activeColor === pal.hex
                        ? 'scale-125 ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-950 shadow-md'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: pal.hex }}
                    title={pal.name}
                  >
                    {activeColor === pal.hex && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Morphing Layout Preview */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-5 transition-all">
              {/* Document Banner / Header based on layout selection */}
              <div
                className={`p-4 rounded-2xl transition-all ${
                  activeLayout === 'banner'
                    ? 'bg-slate-900 text-white'
                    : 'border-b border-border pb-4'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold tracking-tight transition-colors"
                      style={{
                        color: activeLayout === 'banner' ? '#ffffff' : activeColor,
                      }}
                    >
                      Alex Morgan
                    </h3>
                    <p
                      className={`text-xs font-medium ${
                        activeLayout === 'banner' ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Senior Cloud Infrastructure Engineer · Bengaluru, India
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase"
                    style={{
                      backgroundColor: `${activeColor}15`,
                      color: activeColor,
                    }}
                  >
                    {activeLayout === 'single' ? 'Harvard Single' : activeLayout === 'double' ? 'Silicon Dual' : 'Executive'}
                  </span>
                </div>
              </div>

              {/* Dynamic Body adapting to layout */}
              <div
                className={`transition-all duration-300 ${
                  activeLayout === 'double' ? 'grid grid-cols-1 sm:grid-cols-12 gap-5' : 'space-y-4'
                }`}
              >
                {/* Main Content Column */}
                <div className={activeLayout === 'double' ? 'sm:col-span-8 space-y-3' : 'space-y-3'}>
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: activeColor }}>
                      Experience · Stripe
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      Architected distributed Go microservices on AWS EKS, slashing p99 latency by 45%. Led 8-engineer squad migrating 120+ database tables to sharded PostgreSQL instances.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: activeColor }}>
                      Education · B.Tech Computer Science
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans">
                      Indian Institute of Technology · GPA 8.9/10 · Dean&apos;s Honor List
                    </p>
                  </div>
                </div>

                {/* Sidebar Column (when in dual mode) or Footer Tags (when in single mode) */}
                <div
                  className={
                    activeLayout === 'double'
                      ? 'sm:col-span-4 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-3'
                      : 'pt-2 flex flex-wrap gap-1.5'
                  }
                >
                  <div className="text-[11px] font-mono font-bold uppercase" style={{ color: activeColor }}>
                    Core Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Go', 'AWS EKS', 'Kubernetes', 'PostgreSQL', 'Docker', 'Terraform', 'Kafka'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SCENE 3: ATS AUDITOR & LASER SCANNER (100% Screen Height)
          ======================================================================= */}
      <section
        ref={section3Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>STEP 03 · 30-POINT ATS DIAGNOSTIC</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Pre-flight checks engineered to beat enterprise ATS parsers.
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever) discard resumes with floating boxes, non-standard headings, or unsearchable graphics. Our 30-point diagnostic engine verifies parser passability before you apply.
            </p>

            {/* Big ATS Live Match Meter */}
            <div className="p-5 bg-card/80 dark:bg-[#0c1411]/80 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">ATS Readiness Score</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {atsScore}% Pass Rate
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Top 2% Tier
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/ats-checker"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Check Your Resume ATS Score</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Laser Scanline Card with Checkmarks */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-5 overflow-hidden">
              {/* Laser Scanning Line Animation */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 via-teal-400 to-transparent shadow-[0_0_20px_#10b981] animate-[laserScan_3.5s_ease-in-out_infinite] pointer-events-none z-20" />

              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    LIVE ATS PARSER AUDIT ENGINE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  PASS: 30 / 30 RULES
                </span>
              </div>

              {/* 6 Automated Verification Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { title: 'Single-Layer Semantic Vector Tree', sub: 'No floating textboxes or canvas raster' },
                  { title: 'Standard Header Hierarchy', sub: 'Recognized H1, H2, and Workday sections' },
                  { title: 'Extractable Contact & LinkedIn Data', sub: 'Email & GitHub parsed with 100% fidelity' },
                  { title: 'Quantified KPI Metric Density', sub: 'Meets 40%+ quantifiable metric threshold' },
                  { title: 'Font Embedding Compliance', sub: 'Standard typefaces embedded in vector node' },
                  { title: 'Zero Multi-Page Spillover Risk', sub: 'Calculated A4 boundary margin safety' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 flex items-start gap-2.5 text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          SCENE 4: VECTOR PDF EXPORT (100% Screen Height)
          ======================================================================= */}
      <section className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Action */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold border border-teal-300 dark:border-teal-800">
              <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>STEP 04 · ZERO-PAYWALL VECTOR PDF</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Export crisp vector PDFs with zero watermarks & zero paywalls.
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Unlike other resume builders that trap your hours of work behind a surprise \$24/mo paywall or blurry rasterized watermark, ResumeBabu generates native, uncompressed vector PDFs that recruiters can search, highlight, and print at full 1200 DPI clarity.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateExport}
                disabled={isExporting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating Vector PDF...' : 'Test Vector PDF Export'}</span>
              </button>

              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-accent text-slate-800 dark:text-slate-200 border border-border font-bold text-sm transition-all shadow-xs cursor-pointer"
              >
                <span>Build Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {hasExported && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Vector PDF Generated! 100% Vector Nodes · Zero Watermark</span>
              </div>
            )}
          </div>

          {/* Right Column: Visual Export Metrics Box */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  EXPORT QUALITY SPECIFICATIONS
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  ENTERPRISE GRADE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">1200 DPI</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Full Vector Resolution</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">0 KB</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Zero Watermarks</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Selectable Text</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                💡 <strong>Why Vector PDF Matters:</strong> Unlike rasterized images or canvas screenshots that become blurry when zoomed in or read by OCR bots, vector PDFs preserve mathematical glyphs and hyperlinks, guaranteeing perfect rendering on any recruiter screen or ATS database.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

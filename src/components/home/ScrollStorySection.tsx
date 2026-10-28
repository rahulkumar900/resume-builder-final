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
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

const FULL_SUGGESTION_TEXT =
  'Architected distributed Go microservices on AWS EKS, slashing p99 API latency by 45% and sustaining 99.98% SLA across 12M daily queries.';

type StoryScene = 'write' | 'design' | 'check' | 'export';

export function ScrollStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState<StoryScene>('write');

  // Interactive overrides (if user clicks controls manually)
  const [manualColor, setManualColor] = useState<string>('#10b981');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [hasExported, setHasExported] = useState<boolean>(false);

  // Mouse spotlight lamp tracker
  const [lampPos, setLampPos] = useState({ x: 300, y: 300, isHovered: false });

  // Handle continuous scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;

      if (totalDistance <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalDistance));
      setScrollProgress(progress);

      // Determine active scene based on scroll thresholds
      if (progress < 0.28) {
        setActiveScene('write');
      } else if (progress < 0.58) {
        setActiveScene('design');
      } else if (progress < 0.84) {
        setActiveScene('check');
      } else {
        setActiveScene('export');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific scene smoothly on tab click
  const scrollToScene = (scene: StoryScene) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalDistance = rect.height - window.innerHeight;

    let targetP = 0;
    if (scene === 'write') targetP = 0.05;
    else if (scene === 'design') targetP = 0.38;
    else if (scene === 'check') targetP = 0.68;
    else if (scene === 'export') targetP = 0.92;

    window.scrollTo({
      top: scrollTop + totalDistance * targetP,
      behavior: 'smooth',
    });
  };

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

  // Derive scene-specific sub-progresses
  // 1. Write scene: Strikethrough (0.03 -> 0.12) & Typewriter (0.10 -> 0.25)
  const strikeProgress = Math.min(1, Math.max(0, (scrollProgress - 0.03) / 0.1));
  const typeProgress = Math.min(1, Math.max(0, (scrollProgress - 0.1) / 0.15));
  const typedCharCount = Math.floor(typeProgress * FULL_SUGGESTION_TEXT.length);

  // 2. Design scene: Layout morphing
  const designProgress = Math.min(1, Math.max(0, (scrollProgress - 0.28) / 0.3));
  const activeDesignLayout =
    designProgress < 0.45 ? 'single' : designProgress < 0.8 ? 'double' : 'banner';

  // 3. Check scene: Laser scan line progress and checkmarks
  const checkProgress = Math.min(1, Math.max(0, (scrollProgress - 0.58) / 0.26));
  const calculatedScore = Math.floor(62 + checkProgress * 36); // 62% to 98%
  const checkedCount = Math.floor(checkProgress * 6.5); // 0 to 6

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative h-[360vh] bg-slate-50/50 dark:bg-[#070c0a] border-y border-border/80 transition-colors duration-300"
    >
      {/* Sticky Fullscreen Storytelling Canvas */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex flex-col justify-between overflow-hidden py-4 sm:py-6">
        {/* Subtle background hairline grid */}
        <div className="absolute inset-0 pointer-events-none -z-20 opacity-40 dark:opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        {/* Ambient Mouse Lamp Follower */}
        {lampPos.isHovered && (
          <div
            className="absolute pointer-events-none -z-10 transition-opacity duration-300"
            style={{
              left: lampPos.x - 300,
              top: lampPos.y - 300,
              width: 600,
              height: 600,
              background:
                'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.02) 45%, transparent 70%)',
            }}
          />
        )}

        {/* 1. Header with Sticky Story Navigation Bar (RxResume Style) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/80 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Scroll-Driven Resume Builder Superpowers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Watch Your Resume Evolve As You Scroll
              </h2>
            </div>

            {/* 4 Interactive Story Navigation Pills */}
            <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-white/10 p-1 rounded-full border border-border shadow-2xs">
              {[
                { id: 'write', label: '1. Write (AI)', icon: PenTool },
                { id: 'design', label: '2. Design', icon: Palette },
                { id: 'check', label: '3. ATS Audit', icon: ShieldCheck },
                { id: 'export', label: '4. Vector PDF', icon: Download },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeScene === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToScene(tab.id as StoryScene)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-border'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Main Stage: Two Columns (Narrative Controls on Left, Live Morphing Document on Right) */}
        <div
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setLampPos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              isHovered: true,
            });
          }}
          onMouseLeave={() => setLampPos((prev) => ({ ...prev, isHovered: false }))}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto min-h-0 py-4"
        >
          {/* Left Column: Story Chapter Explanation & Interactive Tweaks */}
          <div className="lg:col-span-5 space-y-5">
            {activeScene === 'write' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-800">
                  <PenTool className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Phase 01 · Real-Time Google XYZ Rewriter</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
                  Turn passive task lists into quantifiable metric bullets
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  As you scroll, notice how weak duty statements get struck through in real-time while our AI resume builder generates recruiter-grade achievements character-by-character.
                </p>

                <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="font-semibold">Scroll Progress:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    {Math.round((scrollProgress / 0.28) * 100)}% through Write Phase
                  </span>
                </div>
              </div>
            )}

            {activeScene === 'design' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-100/80 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 text-[11px] font-bold border border-teal-300 dark:border-teal-800">
                  <Palette className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Phase 02 · Scroll-Driven Layout Morph</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
                  Switch between ATS Single Column and Modern Dual Column
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Keep scrolling to watch the resume document morph smoothly between Ivy Classic, Tech Dual Column, and Executive layouts without losing a single character of content.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                      Accent Color Theme
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { name: 'Emerald', hex: '#10b981' },
                        { name: 'Teal', hex: '#0f766e' },
                        { name: 'Royal Blue', hex: '#2563eb' },
                        { name: 'Tech Violet', hex: '#7c3aed' },
                        { name: 'Charcoal', hex: '#334155' },
                      ].map((pal) => (
                        <button
                          key={pal.hex}
                          onClick={() => setManualColor(pal.hex)}
                          className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                            manualColor === pal.hex
                              ? 'scale-125 ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-950'
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: pal.hex }}
                          title={pal.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeScene === 'check' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Phase 03 · 30-Point Live ATS Diagnostic</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
                  Live parser verification with keyword detection
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  The green laser scans down the page as you scroll. Each critical section ticks green as it passes corporate ATS compliance checks, boosting your interview readiness.
                </p>

                <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-200">ATS Match Readiness:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{calculatedScore}% Score</span>
                </div>
              </div>
            )}

            {activeScene === 'export' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-100/80 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 text-[11px] font-bold border border-teal-300 dark:border-teal-800">
                  <Download className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Phase 04 · Vector PDF & Recruiter Ready</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
                  Instant vector PDF export with zero watermarks
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Your tailored resume is now parsed, styled, and validated. Test our vector PDF export engine below or jump straight into the full online resume builder.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleSimulateExport}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isExporting ? 'Generating PDF...' : 'Simulate Vector PDF Export'}</span>
                  </button>
                  {hasExported && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in">
                      <Check className="w-4 h-4 stroke-[3]" />
                      Vector Ready!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Morphing Resume Document Driven by Scroll Progress */}
          <div className="lg:col-span-7 relative">
            <div className="relative bg-white dark:bg-[#0c1411] rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 overflow-hidden transition-all duration-300">
              
              {/* ATS Laser Beam across Document during Scene 3 */}
              {activeScene === 'check' && (
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_18px_#10b981] z-30 pointer-events-none transition-all duration-100"
                  style={{ top: `${Math.min(95, Math.max(5, checkProgress * 100))}%` }}
                />
              )}

              {/* Top Document Header Bar */}
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {activeScene === 'write' && 'Phase 01 · Active Editor & AI Tuning'}
                    {activeScene === 'design' && `Phase 02 · ${activeDesignLayout === 'single' ? 'Single Column Classic' : activeDesignLayout === 'double' ? 'Modern Dual Column' : 'Executive Banner'}`}
                    {activeScene === 'check' && 'Phase 03 · ATS Parsing Verification'}
                    {activeScene === 'export' && 'Phase 04 · Print-Ready Vector PDF'}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                  {activeScene === 'design' && (
                    <span className="text-teal-700 dark:text-teal-300 font-bold bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                      {activeDesignLayout === 'single' ? 'Layout: Ivy League' : activeDesignLayout === 'double' ? 'Layout: Silicon Dual' : 'Layout: Executive'}
                    </span>
                  )}
                  {activeScene !== 'design' && 'A4 · Vector Engine'}
                </div>
              </div>

              {/* Resume Header Area */}
              <div
                className={`pb-4 border-b border-border transition-all ${
                  activeScene === 'design' && activeDesignLayout === 'banner'
                    ? 'bg-slate-900 dark:bg-black text-white p-4 -mx-6 sm:-mx-8 -mt-4 mb-4 rounded-t-2xl'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className="text-base sm:text-lg font-bold transition-colors"
                      style={{
                        color:
                          activeScene === 'design' && activeDesignLayout === 'banner'
                            ? '#ffffff'
                            : manualColor,
                      }}
                    >
                      Alex Morgan
                    </div>
                    <p
                      className={`text-xs font-medium ${
                        activeScene === 'design' && activeDesignLayout === 'banner'
                          ? 'text-slate-300'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Senior Cloud Infrastructure Engineer · Bengaluru, India
                    </p>
                  </div>
                  {activeScene === 'check' && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
                      <span>{calculatedScore}% ATS Match</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Dynamic Body: Morphs according to active scene and scroll position */}
              <div className="pt-2 space-y-4">
                
                {/* SCENE 1: WRITE (Scroll-Driven Strikethrough & Typewriter) */}
                {activeScene === 'write' && (
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Experience Bullet Point (Senior Architect)
                    </div>

                    {/* Original Draft with scroll-driven Strikethrough */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border text-xs text-slate-600 dark:text-slate-300 leading-relaxed relative overflow-hidden">
                      <span className="font-semibold text-slate-400 dark:text-slate-500 block mb-1">Original Passive Draft:</span>
                      <p className="relative">
                        • Responsible for working on backend microservices and databases for high traffic web applications.
                        {/* Red Animated Strikethrough Line */}
                        <span
                          className="absolute left-0 top-1/2 h-[2px] bg-rose-500 transition-all duration-100"
                          style={{ width: `${strikeProgress * 100}%` }}
                        />
                      </p>
                    </div>

                    {/* AI Suggestion Container with Scroll-Driven Character Progression */}
                    <div className="relative pl-4 border-l-2 border-dashed border-emerald-400 space-y-2 animate-in fade-in">
                      <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            AI Bullet Optimizer (Google XYZ Formula):
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                            +45% Recruiter Impact
                          </span>
                        </div>

                        {/* Streamed Characters Driven by Scroll */}
                        <p className="text-slate-900 dark:text-white font-medium">
                          • {FULL_SUGGESTION_TEXT.slice(0, Math.max(12, typedCharCount))}
                          {typedCharCount < FULL_SUGGESTION_TEXT.length && (
                            <span className="inline-block w-1.5 h-3.5 bg-emerald-600 dark:bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                          )}
                        </p>

                        <div className="pt-2 flex items-center justify-between border-t border-emerald-200 dark:border-emerald-800/60">
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                            Scroll down to keep typing
                          </span>
                          <span className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-700 dark:bg-emerald-600 rounded-md shadow-2xs flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Accepted</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCENE 2: DESIGN (Scroll-Driven Layout Transitions) */}
                {activeScene === 'design' && (
                  <div
                    className={`transition-all duration-500 ${
                      activeDesignLayout === 'double'
                        ? 'grid grid-cols-1 sm:grid-cols-12 gap-4'
                        : 'space-y-3'
                    }`}
                  >
                    <div className={activeDesignLayout === 'double' ? 'sm:col-span-8 space-y-2' : 'space-y-2'}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Experience · Stripe
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Led 8-engineer pod deploying Kubernetes cluster automation. Engineered PostgreSQL partitioning strategy reducing query wait times by 40%.
                      </p>
                    </div>

                    <div
                      className={
                        activeDesignLayout === 'double'
                          ? 'sm:col-span-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border space-y-2'
                          : 'pt-2 flex flex-wrap gap-1.5'
                      }
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: manualColor }}>
                        Core Skills
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {['Kubernetes', 'Go', 'PostgreSQL', 'AWS', 'Docker'].map((sk) => (
                          <span
                            key={sk}
                            className="text-[10px] font-semibold px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-border text-slate-800 dark:text-slate-200"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SCENE 3: CHECK (Scroll-Driven Sequential ATS Checkmarks) */}
                {activeScene === 'check' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span>ATS Hard Skills Verification:</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{Math.min(6, checkedCount)} / 6 Checked</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Distributed Systems Architecture',
                        'Kubernetes & Docker Containerization',
                        'SQL Query & Index Optimization',
                        'AWS Cloud Infrastructure',
                        'CI/CD GitHub Actions',
                        'Microservices REST / gRPC',
                      ].map((item, idx) => {
                        const isChecked = idx < checkedCount;
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] transition-all duration-300 ${
                              isChecked
                                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
                                : 'bg-slate-50/40 dark:bg-slate-900/30 border-border text-slate-400 dark:text-slate-600 opacity-40'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isChecked ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                            <span className="truncate font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SCENE 4: TAILOR & EXPORT (Keywords Highlighted & High-DPI Output) */}
                {activeScene === 'export' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800">
                      <span>Target Role Matched: Lead Infrastructure Engineer</span>
                      <span className="font-bold">99% Tailored</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">1200 DPI</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Vector Print</div>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">0 KB</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Watermark</div>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border">
                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">Searchable Text</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-1 font-sans">
                      Text remains selectable and searchable vector nodes rather than rasterized canvas pixels.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Progress Bar in Sticky Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 shrink-0">
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Scroll down to advance through scenes</span>
            <div className="flex-1 max-w-xs h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

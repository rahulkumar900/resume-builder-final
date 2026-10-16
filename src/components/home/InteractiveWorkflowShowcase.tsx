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
  RefreshCw,
  Sliders,
  Layers,
  FileText,
  Star,
  Zap,
  GripVertical,
  ArrowUpDown,
  Type,
  CheckCircle,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

type WorkflowStep = 'writing' | 'designing' | 'checking' | 'exporting';

const FULL_SUGGESTION_TEXT =
  'Architected distributed Go microservices on AWS EKS, slashing p99 API latency by 45% and sustaining 99.98% SLA across 12M daily queries.';

export function InteractiveWorkflowShowcase() {
  const [activeStep, setActiveStep] = useState<WorkflowStep>('writing');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Spotlight / Lamp Tracker (rxresu.me data-lamp effect)
  const containerRef = useRef<HTMLDivElement>(null);
  const [lampPos, setLampPos] = useState({ x: 300, y: 200, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setLampPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setLampPos((prev) => ({ ...prev, isHovered: false }));
  };

  // 1. Writing simulation state (RxResume Typewriter & Assistant Inline Card)
  const [bulletAccepted, setBulletAccepted] = useState<boolean>(true);
  const [typedChars, setTypedChars] = useState<number>(FULL_SUGGESTION_TEXT.length);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const startTypewriter = () => {
    setIsTyping(true);
    setTypedChars(0);
    setBulletAccepted(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 3;
      if (current >= FULL_SUGGESTION_TEXT.length) {
        setTypedChars(FULL_SUGGESTION_TEXT.length);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedChars(current);
      }
    }, 28);
  };

  // 2. Designing simulation state (rxresu.me Section Morph & Reorder)
  const [previewColor, setPreviewColor] = useState<string>('#2563eb');
  const [previewLayout, setPreviewLayout] = useState<'single' | 'double'>('double');
  const [sectionOrder, setSectionOrder] = useState<'expFirst' | 'skillsFirst'>('expFirst');
  const [previewFont, setPreviewFont] = useState<'sans' | 'serif'>('sans');

  // 3. Checking (ATS) simulation state (RxResume Sequential Checkmark Ticks & Score Increment)
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number>(98);
  const [visibleTicks, setVisibleTicks] = useState<number>(6);

  // 4. Exporting simulation state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [hasExported, setHasExported] = useState<boolean>(false);

  // Auto-rotation timer if user doesn't manually interact
  useEffect(() => {
    if (!autoRotate) return;
    const steps: WorkflowStep[] = ['writing', 'designing', 'checking', 'exporting'];
    const timer = setInterval(() => {
      setActiveStep((curr) => {
        const nextIdx = (steps.indexOf(curr) + 1) % steps.length;
        const nextStep = steps[nextIdx];
        if (nextStep === 'checking') runAtsScan();
        return nextStep;
      });
    }, 8500);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const handleManualTabClick = (step: WorkflowStep) => {
    setAutoRotate(false);
    setActiveStep(step);
    if (step === 'checking') {
      runAtsScan();
    }
  };

  const runAtsScan = () => {
    setIsScanning(true);
    setAtsScore(58);
    setVisibleTicks(0);

    // Incrementally pop checkmarks and increase score
    const timeouts = [
      setTimeout(() => { setVisibleTicks(1); setAtsScore(68); }, 250),
      setTimeout(() => { setVisibleTicks(2); setAtsScore(76); }, 450),
      setTimeout(() => { setVisibleTicks(3); setAtsScore(84); }, 650),
      setTimeout(() => { setVisibleTicks(4); setAtsScore(90); }, 850),
      setTimeout(() => { setVisibleTicks(5); setAtsScore(95); }, 1050),
      setTimeout(() => {
        setVisibleTicks(6);
        setAtsScore(98);
        setIsScanning(false);
      }, 1250),
    ];

    return () => timeouts.forEach(clearTimeout);
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

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Delicate background hairline pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-40 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-300/80 text-blue-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-spin-slow" />
            <span>Interactive Workflow Experience</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-slate-900 tracking-tight leading-[1.15]">
            Write Beside A Live Page
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Experience real-time AI tuning, instant layout transitions, and strict ATS verification as you create.
          </p>
        </div>

        {/* 4 Interactive Workflow Navigation Pills (Reactive Resume Style) */}
        <div className="flex items-center justify-center gap-2 max-w-xl mx-auto bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 backdrop-blur-xs">
          {[
            { id: 'writing', label: '1. Writing', icon: PenTool },
            { id: 'designing', label: '2. Designing', icon: Palette },
            { id: 'checking', label: '3. Checking', icon: ShieldCheck },
            { id: 'exporting', label: '4. Exporting', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStep === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleManualTabClick(tab.id as WorkflowStep)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split('. ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Studio Stage with rxresu.me Cursor Lamp Tracker */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl relative overflow-hidden"
        >
          {/* RxResume Cursor Lamp / Radial Spotlight Follower */}
          {lampPos.isHovered && (
            <div
              className="absolute pointer-events-none -z-0 transition-opacity duration-300"
              style={{
                left: lampPos.x - 275,
                top: lampPos.y - 275,
                width: 550,
                height: 550,
                background:
                  'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.02) 45%, transparent 70%)',
              }}
            />
          )}

          {/* Left Column: Interactive Control Panel */}
          <div className="lg:col-span-5 space-y-6 z-10">
            {activeStep === 'writing' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100/60 text-blue-800 text-[11px] font-bold">
                  <PenTool className="w-3 h-3 text-emerald-700" />
                  <span>AI STAR Rewriter</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-slate-900 leading-snug">
                  Transform passive job duties into quantifiable achievements
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Watch our domain rewriter strike through generic statements and live-type metric-backed results with high recruiter impact.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={startTypewriter}
                    disabled={isTyping}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-xs transition-all cursor-pointer disabled:opacity-60"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTyping ? 'animate-spin' : ''}`} />
                    <span>{isTyping ? 'Typing in real-time...' : 'Live Type AI Suggestion'}</span>
                  </button>
                  <button
                    onClick={() => setBulletAccepted(!bulletAccepted)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-full border border-slate-200 transition-all cursor-pointer"
                  >
                    <span>{bulletAccepted ? 'View Original Draft' : 'Apply AI Rewrite'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeStep === 'designing' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-100/60 text-purple-800 text-[11px] font-bold">
                  <Palette className="w-3 h-3 text-purple-600" />
                  <span>Live Design Morph</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-slate-900 leading-snug">
                  Reorder sections and morph aesthetics with zero content loss
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Test instant section re-ordering, font pairings, and color themes. Your resume adapts fluidly without breaking spacing.
                </p>

                <div className="space-y-3.5 pt-1">
                  {/* Theme Accent Swatches */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Accent Theme Color
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { name: 'Royal Blue', hex: '#2563eb' },
                        { name: 'Emerald', hex: '#059669' },
                        { name: 'Violet', hex: '#7c3aed' },
                        { name: 'Ruby', hex: '#e11d48' },
                        { name: 'Slate', hex: '#1e293b' },
                      ].map((pal) => (
                        <button
                          key={pal.hex}
                          onClick={() => setPreviewColor(pal.hex)}
                          className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                            previewColor === pal.hex ? 'scale-125 ring-2 ring-blue-500 ring-offset-2' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: pal.hex }}
                          title={pal.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section Order Re-arrangement */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Section Arrangement
                    </label>
                    <button
                      onClick={() =>
                        setSectionOrder((prev) => (prev === 'expFirst' ? 'skillsFirst' : 'expFirst'))
                      }
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs transition-all cursor-pointer"
                    >
                      <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
                      <span>
                        {sectionOrder === 'expFirst'
                          ? 'Swap: Skills Before Experience'
                          : 'Swap: Experience Before Skills'}
                      </span>
                    </button>
                  </div>

                  {/* Column Layout Mode & Font */}
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Layout Mode
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewLayout('double')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            previewLayout === 'double'
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Dual Column
                        </button>
                        <button
                          onClick={() => setPreviewLayout('single')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            previewLayout === 'single'
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Single Column
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Font Family
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewFont('sans')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            previewFont === 'sans'
                              ? 'bg-slate-900 text-white'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          Inter
                        </button>
                        <button
                          onClick={() => setPreviewFont('serif')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                            previewFont === 'serif'
                              ? 'bg-slate-900 text-white'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          Serif
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 'checking' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100/60 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Real-Time ATS Audit</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-slate-900 leading-snug">
                  Live parser verification with keyword detection
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Watch the laser beam scan through each resume section, sequentially ticking off ATS compliance rules and calculating match confidence.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={runAtsScan}
                    disabled={isScanning}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-full shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isScanning ? 'Scanning Document...' : 'Re-Run ATS Laser Scan'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeStep === 'exporting' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/60 text-amber-800 text-[11px] font-bold">
                  <Download className="w-3 h-3 text-amber-700" />
                  <span>Vector PDF Engine</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-slate-900 leading-snug">
                  1200 DPI vector exports with zero watermarks
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Unlike platforms that rasterize text into blurry image scans, our vector output remains crisp, clean, and 100% searchable by ATS scanners.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleSimulateExport}
                    disabled={isExporting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-full shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isExporting ? 'Generating PDF...' : 'Simulate PDF Export'}</span>
                  </button>
                  {hasExported && (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                      <Check className="w-4 h-4 stroke-[3]" />
                      Export Ready!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Resume Stage with rxresu.me Animations */}
          <div className="lg:col-span-7 relative z-10">
            <div
              className={`relative bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8 overflow-hidden transition-all duration-300 ${
                previewFont === 'serif' ? 'font-serif' : 'font-sans'
              }`}
            >
              {/* Animated ATS Laser Scan Beam */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_18px_#10b981] animate-scan-beam z-30 pointer-events-none" />
              )}

              {/* Top Banner on Document Stage */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">
                    {activeStep === 'writing' && 'Active Editor & AI Tuning'}
                    {activeStep === 'designing' && 'Theme & Column Layout Engine'}
                    {activeStep === 'checking' && 'ATS Parsing Verification'}
                    {activeStep === 'exporting' && 'High-DPI Print Ready Render'}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400">A4 &bull; Vector Engine</div>
              </div>

              {/* Resume Header Area */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 transition-colors" style={{ color: previewColor }}>
                      Alex Morgan
                    </h4>
                    <p className="text-xs font-medium text-slate-500">
                      Senior Cloud Infrastructure Engineer &bull; Bengaluru, India
                    </p>
                  </div>
                  {activeStep === 'checking' && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold animate-in fade-in">
                      <span>{atsScore}% ATS Match</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Body Content */}
              <div className="pt-4 space-y-4">
                {/* 1. Writing Step: RxResume Live Typewriter & Assistant Inline Suggestion Card */}
                {activeStep === 'writing' && (
                  <div className="space-y-3 font-sans">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Experience Bullet Point
                    </div>

                    {/* Original Draft with animated Strikethrough when replaced */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed transition-all">
                      <span className="font-semibold text-slate-400 block mb-1">Original Draft:</span>
                      <p className={bulletAccepted ? 'line-through text-slate-400 opacity-60' : 'text-slate-800'}>
                        &bull; Responsible for working on backend microservices and databases for high traffic web applications.
                      </p>
                    </div>

                    {/* AI Suggestion Container with Live Typewriter */}
                    {bulletAccepted && (
                      <div className="relative pl-4 border-l-2 border-dashed border-blue-400 space-y-2 animate-in fade-in duration-200">
                        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-300 text-xs text-slate-800 leading-relaxed space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-700 text-[11px] flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                              AI Assistant Suggestion (STAR Formula):
                            </span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              +45% Recruiter Impact
                            </span>
                          </div>

                          {/* Live Character Typed Output */}
                          <p className="text-slate-900 font-medium">
                            &bull; {FULL_SUGGESTION_TEXT.slice(0, typedChars)}
                            {typedChars < FULL_SUGGESTION_TEXT.length && (
                              <span className="inline-block w-1.5 h-3.5 bg-emerald-700 ml-0.5 animate-blink align-middle" />
                            )}
                          </p>

                          {/* Interactive Assistant Action Card with Accept / Keep Mine Buttons (rxresu.me style) */}
                          <div className="pt-2 flex items-center justify-between border-t border-blue-100">
                            <span className="text-[10px] text-emerald-700 font-semibold">
                              Action Verbs &bull; Metric Driven
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setBulletAccepted(false)}
                                className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 rounded-md hover:bg-white/80 transition-colors cursor-pointer"
                              >
                                Keep mine
                              </button>
                              <button
                                onClick={() => {
                                  fireConfetti({ particleCount: 30, spread: 45 });
                                }}
                                className="px-3 py-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shadow-2xs flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Accepted</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Designing Step: Real-Time Section Morph & Layout Reordering */}
                {activeStep === 'designing' && (
                  <div
                    className={`transition-all duration-300 ${
                      previewLayout === 'double' ? 'grid grid-cols-1 sm:grid-cols-12 gap-4' : 'space-y-3'
                    }`}
                  >
                    {/* Section 1: Experience */}
                    <div
                      className={`transition-all duration-300 ${
                        previewLayout === 'double' ? 'sm:col-span-8' : ''
                      } ${sectionOrder === 'skillsFirst' ? 'order-2' : 'order-1'} space-y-2`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <span className="flex items-center gap-1">
                          <GripVertical className="w-3 h-3 text-slate-300" />
                          Experience (Lead Architect)
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">2022 &mdash; Present</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Led 8-engineer pod deploying Kubernetes cluster automation. Engineered PostgreSQL partitioning strategy reducing query wait times.
                      </p>
                    </div>

                    {/* Section 2: Core Skills */}
                    <div
                      className={`transition-all duration-300 ${
                        previewLayout === 'double'
                          ? 'sm:col-span-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2'
                          : 'pt-2 flex flex-wrap gap-1.5'
                      } ${sectionOrder === 'skillsFirst' ? 'order-1' : 'order-2'}`}
                    >
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: previewColor }}>
                        <GripVertical className="w-3 h-3 text-slate-300" />
                        Core Skills
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {['Kubernetes', 'Go', 'PostgreSQL', 'AWS', 'Docker'].map((sk) => (
                          <span
                            key={sk}
                            className="text-[10px] font-semibold px-1.5 py-0.5 bg-white rounded border border-slate-200 transition-colors"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Checking Step: RxResume Sequential Spring Checkmarks Pop-In */}
                {activeStep === 'checking' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>ATS Hard Skills Verification:</span>
                      <span className="text-emerald-600">{visibleTicks} / 6 Checked</span>
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
                        const isVisible = idx < visibleTicks;
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] transition-all duration-300 ${
                              isVisible
                                ? 'bg-emerald-50/70 border-emerald-200/80 text-slate-800 animate-pop-in'
                                : 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-30'
                            }`}
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isVisible ? 'text-emerald-600' : 'text-slate-300'
                              }`}
                            />
                            <span className="truncate font-medium">{item}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Exporting Step: Vector PDF Metrics */}
                {activeStep === 'exporting' && (
                  <div className="space-y-3 font-sans">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-sm font-bold text-slate-900">1200 DPI</div>
                        <div className="text-[10px] text-slate-500">Vector Print</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-sm font-bold text-slate-900">0 KB</div>
                        <div className="text-[10px] text-slate-500">Watermark</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-sm font-bold text-emerald-600">100%</div>
                        <div className="text-[10px] text-slate-500">Searchable Text</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center pt-1">
                      Text remains selectable and searchable vector nodes rather than rasterized canvas pixels.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

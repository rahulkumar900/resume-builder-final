'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  UploadCloud,
  FileText,
  Target,
  Palette,
  Sparkles,
  ShieldCheck,
  Download,
  Check,
  CheckCircle2,
  ArrowRight,
  Plus,
  AlertTriangle,
  RotateCcw,
  Zap,
  Eye,
  Sliders,
  Layers,
  ChevronRight,
  FileCheck2,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import type { TemplateId } from '@/types/resume';

// Sample Job Description Presets for Step 2
const JD_PRESETS = [
  {
    id: 'stripe',
    role: 'Frontend Engineer',
    company: 'Stripe',
    baseScore: 68,
    targetScore: 96,
    keywords: [
      { name: 'TypeScript', impact: '+8% match', added: true },
      { name: 'React 19 & Next.js', impact: '+9% match', added: true },
      { name: 'GraphQL & REST', impact: '+6% match', added: false },
      { name: 'Tailwind CSS', impact: '+5% match', added: false },
      { name: 'Web Vitals & Performance', impact: '+8% match', added: false },
    ],
  },
  {
    id: 'amazon',
    role: 'Cloud Solutions Architect',
    company: 'Amazon Web Services',
    baseScore: 62,
    targetScore: 98,
    keywords: [
      { name: 'AWS EKS & Kubernetes', impact: '+10% match', added: true },
      { name: 'Terraform IaC', impact: '+9% match', added: true },
      { name: 'Distributed Go Systems', impact: '+8% match', added: false },
      { name: 'PostgreSQL Sharding', impact: '+5% match', added: false },
      { name: 'CI/CD Pipelines', impact: '+4% match', added: false },
    ],
  },
  {
    id: 'meta',
    role: 'Product Manager',
    company: 'Meta',
    baseScore: 71,
    targetScore: 95,
    keywords: [
      { name: 'A/B Experimentation', impact: '+9% match', added: true },
      { name: 'User Retention KPIs', impact: '+8% match', added: true },
      { name: 'Cross-Functional Roadmaps', impact: '+7% match', added: false },
      { name: 'SQL Data Extraction', impact: '+6% match', added: false },
    ],
  },
];

// Curated Templates for Step 3
const CURATED_TEMPLATES: { id: TemplateId; name: string; role: string }[] = [
  { id: 'harvard', name: 'Harvard Classic', role: 'Ivy League / Corporate ATS' },
  { id: 'silicon', name: 'Silicon Valley SDE', role: 'Tech Lead / Dual Column' },
  { id: 'oxford', name: 'Oxford Academic', role: 'Executive & Research' },
  { id: 'stockholm', name: 'Stockholm Minimal', role: 'Nordic Clean / Design' },
  { id: 'prawira', name: 'Prawira Modern', role: 'Balanced Dual Architecture' },
  { id: 'flow', name: 'Flow Creative', role: 'Consulting & Strategy' },
];

const CURATED_PALETTES = [
  { name: 'Emerald Forest', color: '#15803d' },
  { name: 'Royal Blue', color: '#2563eb' },
  { name: 'Executive Navy', color: '#1e3a8a' },
  { name: 'Tech Violet', color: '#7c3aed' },
  { name: 'Charcoal Teal', color: '#0f766e' },
  { name: 'Warm Terracotta', color: '#c2410c' },
];

// AI Rewrite Styles for Step 4
const AI_REWRITE_STYLES = [
  {
    id: 'xyz',
    label: 'Google X-Y-Z Formula',
    tag: 'Quantified KPI',
    output:
      'Architected distributed Go microservices on AWS EKS, slashing p99 API latency by 45% and sustaining 99.98% SLA across 12M daily queries.',
    metrics: ['45% Latency Cut', '99.98% SLA', '12M Queries/Day'],
  },
  {
    id: 'leadership',
    label: 'Technical Leadership',
    tag: 'Senior Scope',
    output:
      'Spearheaded an 8-engineer cloud migration squad, modernizing legacy monolithic infrastructure to Kubernetes and reducing annual AWS spend by $140,000.',
    metrics: ['Led 8 Engineers', '$140k Annual Savings', '0 Downtime'],
  },
  {
    id: 'par',
    label: 'Problem-Action-Result',
    tag: 'STAR Standard',
    output:
      'Resolved database connection bottlenecks by designing a Redis distributed caching cluster, tripling checkout throughput during peak Q4 traffic.',
    metrics: ['3x Throughput', '0 Bottlenecks', 'Redis Cluster'],
  },
];

const STORY_STEPS = [
  { id: 1, title: 'Import', label: 'AI Parser', icon: UploadCloud, href: 'story-step-1' },
  { id: 2, title: 'Target', label: 'Job Matcher', icon: Target, href: 'story-step-2' },
  { id: 3, title: 'Design', label: '30 Templates', icon: Palette, href: 'story-step-3' },
  { id: 4, title: 'Rewrite', label: 'Google X-Y-Z', icon: Sparkles, href: 'story-step-4' },
  { id: 5, title: 'Audit', label: 'ATS & Safety', icon: ShieldCheck, href: 'story-step-5' },
  { id: 6, title: 'Export', label: 'Vector PDF', icon: Download, href: 'story-step-6' },
];

export function ScrollStorySection() {
  // Global Scroll-Driven Story State
  const [activeStep, setActiveStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<Record<number, boolean>>({ 1: true });

  // Section Refs for scroll tracking
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const step5Ref = useRef<HTMLDivElement>(null);
  const step6Ref = useRef<HTMLDivElement>(null);

  // In-View Flags for triggering animations
  const [step1InView, setStep1InView] = useState(false);
  const [step2InView, setStep2InView] = useState(false);
  const [step3InView, setStep3InView] = useState(false);
  const [step4InView, setStep4InView] = useState(false);
  const [step5InView, setStep5InView] = useState(false);
  const [step6InView, setStep6InView] = useState(false);

  // Step 1 State: Upload vs Scratch
  const [creationTab, setCreationTab] = useState<'upload' | 'scratch'>('upload');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [parsedItemsVisible, setParsedItemsVisible] = useState(false);

  // Step 2 State: Target Role & Keyword Matcher
  const [activeJdIdx, setActiveJdIdx] = useState(0);
  const activeJd = JD_PRESETS[activeJdIdx];
  const [userAddedKeywords, setUserAddedKeywords] = useState<Record<string, boolean>>({});
  const [animatedScore, setAnimatedScore] = useState<number>(68);

  const totalKw = activeJd.keywords.length;
  const initialAdded = activeJd.keywords.filter((k) => k.added).length;
  const currentAdded = activeJd.keywords.filter(
    (k) => userAddedKeywords[`${activeJd.id}-${k.name}`] ?? k.added
  ).length;
  const targetMatchScore = Math.min(
    99,
    Math.round(
      activeJd.baseScore +
        ((currentAdded - initialAdded) / (totalKw - initialAdded || 1)) *
          (activeJd.targetScore - activeJd.baseScore)
    )
  );

  // Step 3 State: Templates & Palette
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('harvard');
  const [selectedColor, setSelectedColor] = useState<string>('#15803d');
  const [isReflowing, setIsReflowing] = useState(false);

  // Step 4 State: AI Bullet Rewriter
  const [activeBulletStyle, setActiveBulletStyle] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [kpisVisible, setKpisVisible] = useState(false);

  // Step 5 State: 30-Point ATS Auditor & Page Safety
  const [selectedAuditRule, setSelectedAuditRule] = useState(0);
  const [pageLinesCount, setPageLinesCount] = useState(18);
  const [auditCheckCount, setAuditCheckCount] = useState(0);
  const isOverflowing = pageLinesCount > 18;

  // Step 6 State: Vector PDF Export
  const [isExporting, setIsExporting] = useState(false);
  const [exportStage, setExportStage] = useState<string>('');
  const [hasExported, setHasExported] = useState(false);

  // =========================================================================
  // SCROLL-DRIVEN INTERSECTION OBSERVER
  // =========================================================================
  useEffect(() => {
    const refs = [
      { step: 1, ref: step1Ref, setInView: setStep1InView },
      { step: 2, ref: step2Ref, setInView: setStep2InView },
      { step: 3, ref: step3Ref, setInView: setStep3InView },
      { step: 4, ref: step4Ref, setInView: setStep4InView },
      { step: 5, ref: step5Ref, setInView: setStep5InView },
      { step: 6, ref: step6Ref, setInView: setStep6InView },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepAttr = entry.target.getAttribute('data-step');
          const stepNum = Number(stepAttr);
          if (entry.isIntersecting && stepNum) {
            setActiveStep(stepNum);
            setVisitedSteps((prev) => ({ ...prev, [stepNum]: true }));
            const match = refs.find((r) => r.step === stepNum);
            if (match) match.setInView(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    refs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Step 1: Auto-trigger parsed fields animation when scrolled into view
  useEffect(() => {
    if (step1InView && !uploadComplete) {
      const timer = setTimeout(() => {
        setParsedItemsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [step1InView, uploadComplete]);

  // Step 2: Animated Score Counter on View or Score Change
  useEffect(() => {
    if (!step2InView) return;
    let current = animatedScore;
    const target = targetMatchScore;
    const diff = target - current;
    if (diff === 0) return;

    const stepSize = diff > 0 ? 1 : -1;
    const interval = setInterval(() => {
      current += stepSize;
      setAnimatedScore(current);
      if (current === target) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [step2InView, targetMatchScore]);

  // Step 4: Streamed Typewriter Animation on Step 4 View or Style Change
  useEffect(() => {
    if (!step4InView) return;
    setKpisVisible(false);
    let current = 0;
    const text = AI_REWRITE_STYLES[activeBulletStyle].output;
    const interval = setInterval(() => {
      current += 2;
      if (current >= text.length) {
        setTypedChars(text.length);
        setKpisVisible(true);
        clearInterval(interval);
      } else {
        setTypedChars(current);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [step4InView, activeBulletStyle]);

  // Step 5: Sequential Audit Checks Lighting Up
  useEffect(() => {
    if (!step5InView) return;
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setAuditCheckCount(count);
      if (count >= 4) clearInterval(interval);
    }, 220);
    return () => clearInterval(interval);
  }, [step5InView]);

  // Handlers
  const scrollToStep = (stepId: number) => {
    const el = document.getElementById(`story-step-${stepId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleKeyword = (kwName: string) => {
    const key = `${activeJd.id}-${kwName}`;
    const nextState = !(userAddedKeywords[key] ?? activeJd.keywords.find((k) => k.name === kwName)?.added);
    setUserAddedKeywords((prev) => ({ ...prev, [key]: nextState }));
    if (nextState) {
      fireConfetti({ particleCount: 25, spread: 45 });
    }
  };

  const handleSelectTemplate = (id: TemplateId) => {
    setSelectedTemplate(id);
    setIsReflowing(true);
    setTimeout(() => setIsReflowing(false), 400);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setIsReflowing(true);
    setTimeout(() => setIsReflowing(false), 300);
  };

  const handleSimulateUpload = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
      setUploadComplete(true);
      setParsedItemsVisible(true);
      fireConfetti({ particleCount: 50, spread: 60 });
    }, 750);
  };

  const handleSimulateExport = () => {
    setIsExporting(true);
    setExportStage('Rendering Vector Nodes (1200 DPI)...');
    setTimeout(() => {
      setExportStage('Verifying 0 KB Watermark Guarantee...');
      setTimeout(() => {
        setIsExporting(false);
        setHasExported(true);
        setExportStage('');
        fireConfetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
      }, 500);
    }, 600);
  };

  return (
    <div className="w-full relative">
      {/* =======================================================================
          WORKFLOW OVERVIEW BANNER
          ======================================================================= */}
      <div className="pt-20 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive 6-Step Engineering Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            How our free resume builder works from start to finish.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Scroll down to advance through each step of our studio engine — with real-time AI parsing, keyword matching, live template reflow, and instant vector PDF export.
          </p>
        </div>
      </div>

      {/* =======================================================================
          STICKY SCROLL-DRIVEN STORY PROGRESS DOCK
          ======================================================================= */}
      <div className="sticky top-18 z-40 max-w-5xl mx-auto px-3 sm:px-6 py-2.5 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)] p-2 sm:p-2.5 flex items-center justify-between gap-1 sm:gap-2 transition-all">
          
          {/* Step Track Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {STORY_STEPS.map((s) => {
              const isActive = activeStep === s.id;
              const isVisited = visitedSteps[s.id];
              const StepIcon = s.icon;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToStep(s.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-102 ring-2 ring-emerald-400/40'
                      : isVisited
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/80 border border-emerald-200/60 dark:border-emerald-800/60'
                      : 'bg-card text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-border'
                  }`}
                >
                  <StepIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span className="text-[11px] font-bold">0{s.id}</span>
                  <span className={`text-[11px] hidden md:inline font-sans font-semibold ${isActive ? 'text-white' : ''}`}>
                    {s.title}
                  </span>
                  {isVisited && !isActive && (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3] ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Step Counter Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-border shrink-0">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">
              Step {activeStep} of 6:
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-sans">
              {STORY_STEPS.find((s) => s.id === activeStep)?.label}
            </span>
          </div>
        </div>
      </div>

      {/* =======================================================================
          STEP 01: RESUME CREATION & AI IMPORT (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-1"
        data-step="1"
        ref={step1Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <UploadCloud className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>STEP 01 · RESUME CREATION & AI IMPORT</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Start fresh or import your existing resume with 0 manual typing.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Have an existing resume? Upload your PDF or Word document. Our parser automatically extracts your work history, degrees, and skills into clean, editable fields in seconds.
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCreationTab('upload')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  creationTab === 'upload'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-card text-slate-700 dark:text-slate-300 border border-border'
                }`}
              >
                Upload Existing Resume
              </button>
              <button
                type="button"
                onClick={() => setCreationTab('scratch')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  creationTab === 'scratch'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-card text-slate-700 dark:text-slate-300 border border-border'
                }`}
              >
                Start from Scratch with AI
              </button>
            </div>

            <div className="pt-2">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Start Creating in Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Dropzone & Automated Parser Stream */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-5 overflow-hidden">
              {/* Shimmer sweep line when active */}
              {step1InView && (
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent pointer-events-none" />
              )}

              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  SMART RESUME IMPORTER
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  PDF · DOCX · TXT COMPLIANT
                </span>
              </div>

              {creationTab === 'upload' ? (
                <div className="p-6 sm:p-8 border-2 border-dashed border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl bg-emerald-50/30 dark:bg-emerald-950/20 text-center space-y-4 relative">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                    <UploadCloud className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Drop your resume here or click to simulate import
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-1">
                      Supports PDF and Word formats up to 10MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateUpload}
                    disabled={isSimulatingUpload}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    {isSimulatingUpload ? 'Extracting Career Data...' : 'Simulate 1-Click Upload'}
                  </button>

                  {/* Animated Parsed Data Stream */}
                  {parsedItemsVisible && (
                    <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-900/50 space-y-2.5 text-left text-xs">
                      <div className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase flex items-center justify-between">
                        <span>Extracted Career Schema</span>
                        <span className="bg-emerald-200/70 dark:bg-emerald-900 px-2 py-0.5 rounded text-[9px]">100% Parsed</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-between shadow-2xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          👤 Alex Morgan · Senior Full-Stack Engineer
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-between shadow-2xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          💼 3 Work Roles (Stripe, Amazon, CloudOps)
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>

                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-between shadow-2xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          ⚡ 14 Technical Skills Tagged (TypeScript, Go, React, AWS)
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-4 text-left">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Curated Role Templates for Fast Start
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Software Engineer', 'Product Manager', 'Data Scientist', 'Business Analyst'].map((r) => (
                      <div key={r} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-border flex items-center justify-between">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{r}</span>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-sans">
                    Pre-populated with industry-standard section headings and Google-tested bullet frameworks.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          STEP 02: TARGET ROLE & JOB DESCRIPTION MATCHER (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-2"
        data-step="2"
        ref={step2Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold border border-teal-300 dark:border-teal-800 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>STEP 02 · TARGET JOB & KEYWORD MATCHER</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Paste any job description to pinpoint missing keywords.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Applicant Tracking Systems scan for exact keyword matches. Select a target employer below or paste any job description. Watch your ATS match score surge in real-time as you add missing high-impact keywords.
            </p>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {JD_PRESETS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveJdIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    activeJdIdx === idx
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-card text-slate-700 dark:text-slate-300 border-border hover:bg-accent'
                  }`}
                >
                  {p.company} ({p.role})
                </button>
              ))}
            </div>

            {/* Clickable Keywords */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Click missing keywords to add them to your resume:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeJd.keywords.map((kw) => {
                  const isAdded = userAddedKeywords[`${activeJd.id}-${kw.name}`] ?? kw.added;
                  return (
                    <button
                      key={kw.name}
                      type="button"
                      onClick={() => toggleKeyword(kw.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-200 border border-teal-400 font-bold shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-teal-500'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{kw.name}</span>
                      <span className="text-[10px] opacity-75">{kw.impact}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Animated Match Meter */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-5">
              <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/5 dark:bg-teal-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    Target ATS Match Readiness
                  </span>
                  <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-950 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping inline-block" />
                    {animatedScore >= 90 ? 'INTERVIEW READY' : 'NEEDS KEYWORDS'}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-6xl font-normal text-slate-900 dark:text-white transition-all">
                    {animatedScore}%
                  </span>
                  <span className="text-xs text-slate-500 font-sans">
                    Matching target criteria for {activeJd.company}
                  </span>
                </div>

                {/* Animated Meter Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(20,184,166,0.6)]"
                    style={{ width: `${animatedScore}%` }}
                  />
                </div>
              </div>

              {/* Sample Job Description Analysis */}
              <div className="p-4 rounded-xl border border-border bg-slate-50 dark:bg-white/[0.02] space-y-2 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                  Extracted Job Requirements
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  Targeting: <strong>{activeJd.role}</strong> at <strong>{activeJd.company}</strong>. High-weight scoring applied to distributed infrastructure, clean API architecture, and quantifiable KPI impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          STEP 03: 30 RECRUITER-TESTED ATS TEMPLATES & DESIGN (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-3"
        data-step="3"
        ref={step3Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <Palette className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>STEP 03 · 30 TESTED ATS TEMPLATES & PALETTES</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Switch templates & palettes live with zero content loss.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Choose from 30 single-column (Harvard, Oxford, Naukri) and dual-column (Silicon Valley, Prawira) templates. Your content reflows instantly with sub-millimeter typography precision.
            </p>

            {/* Template Selector Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Select Layout Architecture:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CURATED_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tmpl.id)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-950/30 font-bold text-slate-900 dark:text-white shadow-2xs'
                          : 'bg-card border-border text-slate-600 dark:text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <span className="block truncate font-serif font-bold">{tmpl.name}</span>
                      <span className="text-[10px] text-slate-400 font-sans block truncate">{tmpl.role}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Palette Picker */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Executive Accent Color:
              </label>
              <div className="flex items-center gap-3">
                {CURATED_PALETTES.map((p) => {
                  const isSelected = selectedColor === p.color;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => handleSelectColor(p.color)}
                      title={p.name}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'scale-125 border-slate-900 dark:border-white shadow-md'
                          : 'border-transparent hover:scale-110'
                      }`}
                      style={{ backgroundColor: p.color }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={`/create?template=${selectedTemplate}&color=${encodeURIComponent(selectedColor)}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Open Builder with This Design</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Morphing A4 Card Preview with Shimmer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className={`relative w-[280px] sm:w-[320px] aspect-[794/1123] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white transition-all duration-300 ${isReflowing ? 'scale-98 opacity-80' : 'scale-100 opacity-100'}`}>
              <TemplateCardRealPreview
                templateId={selectedTemplate}
                themeColor={selectedColor}
                customRole="Senior Software Engineer"
                customName="Alex Morgan"
                className="w-full h-full"
              />
              {/* Shimmer sweep on reflow */}
              {isReflowing && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-shimmer pointer-events-none" />
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-slate-400 dark:text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Live 1:1 Vector Reflow · 0ms Shift</span>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          STEP 04: LIVE SPLIT-SCREEN EDITOR & AI BULLET OPTIMIZER (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-4"
        data-step="4"
        ref={step4Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold border border-teal-300 dark:border-teal-800 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>STEP 04 · LIVE SPLIT-SCREEN & AI BULLET REWRITER</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Turn passive task lists into quantified Google X-Y-Z metrics.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              As you type in the split-screen editor, our AI bullet rewriter automatically identifies weak verbs and restructures them using Google recruiters&apos; formula: Accomplished [X], measured by [Y], by doing [Z].
            </p>

            {/* AI Focus Switcher */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                Select AI Optimization Focus:
              </span>
              <div className="space-y-2">
                {AI_REWRITE_STYLES.map((style, idx) => {
                  const isSelected = activeBulletStyle === idx;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => {
                        setActiveBulletStyle(idx);
                        fireConfetti({ particleCount: 20, spread: 40 });
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                          : 'bg-card text-slate-700 dark:text-slate-300 border-border hover:bg-accent'
                      }`}
                    >
                      <span>{style.label}</span>
                      <span className="font-mono text-[10px] opacity-80">{style.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Strikethrough & Streamed Typewriter */}
          <div className="lg:col-span-7 space-y-4">
            {/* Before (Passive with Red Strikethrough) */}
            <div className="p-4 rounded-2xl border border-red-500/25 bg-red-500/5 dark:bg-red-950/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-red-600 dark:text-red-400 font-bold uppercase">
                <span>BEFORE: VAGUE JOB DUTY (42/100 ATS SCORE)</span>
                <span>Filtered by Workday</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans italic relative">
                <span className="line-through decoration-red-500 decoration-2">
                  &quot;Responsible for working on backend microservices and databases for high traffic web applications.&quot;
                </span>
              </p>
            </div>

            {/* After Streamed Typewriter */}
            <div className="p-5 rounded-2xl border border-teal-500/40 bg-teal-500/10 dark:bg-teal-950/30 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-teal-700 dark:text-teal-300 font-bold uppercase">
                <span>AFTER: QUANTIFIED GOOGLE X-Y-Z FORMULA (98/100 ATS)</span>
                <span className="bg-teal-200/60 dark:bg-teal-900 px-2 py-0.5 rounded text-[10px]">Validated</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-sans font-medium leading-relaxed min-h-[50px]">
                • {AI_REWRITE_STYLES[activeBulletStyle].output.slice(0, Math.max(16, typedChars))}
                {typedChars < AI_REWRITE_STYLES[activeBulletStyle].output.length && (
                  <span className="inline-block w-2 h-4 bg-teal-600 dark:bg-teal-400 ml-0.5 animate-pulse align-middle" />
                )}
              </p>

              {/* Animated Pop-in KPI Badges */}
              <div className="pt-2 border-t border-teal-500/20 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">
                  KPIs Detected:
                </span>
                {kpisVisible &&
                  AI_REWRITE_STYLES[activeBulletStyle].metrics.map((m, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 border border-teal-500/30 shadow-2xs animate-pop-in"
                    >
                      {m}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          STEP 05: 30-POINT ATS AUDITOR & A4 PAGE SAFETY (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-5"
        data-step="5"
        ref={step5Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>STEP 05 · 30-POINT ATS AUDIT & PAGE SAFETY</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Pre-flight checks engineered to beat enterprise ATS parsers.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Our automated scanner audits 30 parser failure modes across Workday, Taleo, Greenhouse, and Lever. Simultaneously, our A4 Page Safety Engine prevents awkward single-bullet spillovers to Page 2.
            </p>

            {/* Slider Control for Page Safety */}
            <div className="space-y-3 p-4 rounded-xl border border-border bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between text-xs font-mono font-semibold">
                <span>Simulated Content Volume</span>
                <span>{pageLinesCount} Bullet Points</span>
              </div>
              <input
                type="range"
                min={12}
                max={24}
                value={pageLinesCount}
                onChange={(e) => setPageLinesCount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>12 Bullets (Light)</span>
                <span>18 (Page 1 Limit)</span>
                <span>24 (2 Full Pages)</span>
              </div>
            </div>

            {/* Status Banner */}
            {isOverflowing ? (
              <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 dark:bg-amber-950/20 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Warning: {pageLinesCount - 18} bullet(s) spilling onto Page 2</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPageLinesCount(17);
                    fireConfetti({ particleCount: 40, spread: 60 });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
                >
                  Auto-Fit to 1 Page
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Perfect 1-Page Layout · Standard US Letter / International A4 Compliant</span>
              </div>
            )}
          </div>

          {/* Right Column: Laser Scanline Card & Sequential Pillar Audits */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-[#0c1411] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-teal-500/30 p-6 sm:p-8 space-y-4 overflow-hidden">
              {/* Laser Scanning Line Animation */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 via-teal-400 to-transparent shadow-[0_0_20px_#10b981] animate-[laserScan_3.5s_ease-in-out_infinite] pointer-events-none z-20" />

              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    ATS PARSER COMPLIANCE AUDIT
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  98 / 100 HEALTH SCORE
                </span>
              </div>

              {/* 4 Clickable Rule Pillars with Sequential In-View Checkmarks */}
              <div className="space-y-2 pt-1">
                {[
                  {
                    title: 'Standard Semantic Section Tags',
                    desc: 'Maps Experience, Education, Skills, and Projects to standard ISO ATS keys without confusing custom labels.',
                    pillar: 'Pillar 1: Structural Hierarchy',
                  },
                  {
                    title: 'Embedded OTF/TTF Vector Typography',
                    desc: 'Guarantees pure selectable vector glyphs. Zero rasterization or canvas image flattening.',
                    pillar: 'Pillar 2: Font Integrity',
                  },
                  {
                    title: 'Metric & Action Verb Density Test',
                    desc: 'Ensures over 65% of bullet points contain measurable business impact (%, $, X improvements).',
                    pillar: 'Pillar 3: Google X-Y-Z',
                  },
                  {
                    title: 'Zero Nested Table or Floating Textbox Traps',
                    desc: 'Taleo and Workday crash when extracting nested HTML tables. Our single-stream DOM guarantees clean parsing.',
                    pillar: 'Pillar 4: Parser Trap Audit',
                  },
                ].map((rule, idx) => {
                  const isSelected = selectedAuditRule === idx;
                  const isPassed = auditCheckCount > idx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAuditRule(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/50 dark:bg-emerald-950/20 shadow-xs'
                          : 'bg-card border-border/80 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span className="text-emerald-700 dark:text-emerald-400 uppercase">{rule.pillar}</span>
                        <span className={`px-2 py-0.5 rounded transition-all duration-300 ${isPassed ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                          {isPassed ? 'PASS' : 'CHECKING...'}
                        </span>
                      </div>
                      <div className="font-serif text-xs font-bold text-slate-900 dark:text-white mt-0.5 flex items-center justify-between">
                        <span>{rule.title}</span>
                        {isPassed && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans mt-0.5">
                        {rule.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          STEP 06: ZERO-PAYWALL 1200 DPI VECTOR PDF EXPORT (100% Screen Height)
          ======================================================================= */}
      <section
        id="story-step-6"
        data-step="6"
        ref={step6Ref}
        className="min-h-screen w-full flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border/70 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100/80 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold border border-teal-300 dark:border-teal-800 shadow-2xs">
              <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>STEP 06 · ZERO-PAYWALL VECTOR PDF EXPORT</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Export crisp vector PDFs with zero watermarks & zero paywalls.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Unlike other resume builders that trap your hours of work behind a surprise $24/mo paywall or blurry rasterized watermark, ResumeBabu generates native, uncompressed vector PDFs that recruiters can search, highlight, and print at full 1200 DPI clarity.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateExport}
                disabled={isExporting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Compiling Vector PDF...' : 'Test Vector PDF Export'}</span>
              </button>

              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-accent text-slate-800 dark:text-slate-200 border border-border font-bold text-sm transition-all shadow-xs cursor-pointer"
              >
                <span>Build My Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Export Stage Status */}
            {isExporting && (
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 rounded-xl text-xs font-mono text-teal-800 dark:text-teal-300 flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                <span>{exportStage}</span>
              </div>
            )}

            {hasExported && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-pop-in">
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
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">1200 DPI</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Full Vector Print</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1 hover:border-emerald-500/40 transition-colors">
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">0 KB</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Zero Watermarks</div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border space-y-1 hover:border-emerald-500/40 transition-colors">
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

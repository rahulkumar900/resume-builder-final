'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sliders,
  ChevronDown,
  LayoutTemplate,
  Target,
  Download,
  Check,
  FileCheck2,
  Maximize2,
  RotateCcw,
  Plus,
  RefreshCw,
  Eye,
  Type,
  Palette,
  AlertTriangle,
  Flame,
  Award,
} from 'lucide-react';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import { HomeComparisonMatrix } from '@/components/home/HomeComparisonMatrix';
import { HomeRoleExamplesGallery } from '@/components/home/HomeRoleExamplesGallery';
import { ScrollStorySection } from '@/components/home/ScrollStorySection';
import { ScrollReveal } from '@/components/home/ScrollReveal';
import { RxFooter } from '@/components/common/RxFooter';
import { TEMPLATES } from '@/lib/templates';
import { fireConfetti } from '@/lib/confetti';
import { useAuth } from '@/context/AuthContext';
import { getStoredResumes, getAllResumesFromDatabase } from '@/lib/storage';
import type { TemplateId, ResumeData } from '@/types/resume';

// Curated Design Studio Colors
const STUDIO_PALETTES = [
  { name: 'Emerald Forest', color: '#15803d' },
  { name: 'Royal Blue', color: '#2563eb' },
  { name: 'Executive Navy', color: '#1e3a8a' },
  { name: 'Tech Violet', color: '#7c3aed' },
  { name: 'Charcoal Teal', color: '#0f766e' },
  { name: 'Warm Terracotta', color: '#c2410c' },
];

// Curated Studio Templates
const STUDIO_TEMPLATES: { id: TemplateId; name: string; role: string; desc: string }[] = [
  { id: 'harvard', name: 'Harvard Classic', role: 'Ivy League / Corporate', desc: 'Single-column academic standard, 100% ATS parser pass rate.' },
  { id: 'silicon', name: 'Silicon Valley SDE', role: 'FAANG / Tech Lead', desc: 'Engineered for GitHub links, tech stacks, and quantifiable KPI metrics.' },
  { id: 'prawira', name: 'Prawira Modern', role: 'Product / UI Design', desc: 'Clean dual-column architectural balance with subtle accent highlights.' },
  { id: 'stockholm', name: 'Stockholm Minimal', role: 'Nordic Clean / Exec', desc: 'Generous whitespace with focused typography hierarchy.' },
  { id: 'flow', name: 'Flow Creative', role: 'Consulting / Strategy', desc: 'High-contrast modern styling for senior managers and consultants.' },
];

// Presets for the Interactive AI Job Tailor
const TAILOR_PRESETS = [
  {
    id: 'stripe-sde',
    title: 'Senior Backend Engineer (Stripe)',
    company: 'Fintech & Cloud Payments',
    baseScore: 62,
    targetScore: 98,
    keywords: [
      { name: 'Distributed Systems', added: true, impact: '+8%' },
      { name: 'AWS EKS', added: true, impact: '+6%' },
      { name: 'Kafka Streaming', added: false, impact: '+12%' },
      { name: 'PostgreSQL Idempotency', added: false, impact: '+10%' },
      { name: 'p99 Latency Optimization', added: false, impact: '+9%' },
    ],
    sampleBullet: {
      before: 'Maintained payment APIs and updated backend database queries for new features.',
      after: 'Architected distributed Go payment gateway handling 14,000 tx/sec with PostgreSQL idempotency; reduced p99 latency by 38%.',
    },
  },
  {
    id: 'figma-pm',
    title: 'Lead Product Manager (Figma)',
    company: 'Collaborative Design Platform',
    baseScore: 68,
    targetScore: 97,
    keywords: [
      { name: 'Product Discovery', added: true, impact: '+7%' },
      { name: 'A/B Experimentation', added: true, impact: '+8%' },
      { name: 'SQL & Amplitude', added: false, impact: '+11%' },
      { name: 'B2B Enterprise Growth', added: false, impact: '+10%' },
      { name: 'Net Promoter Score (NPS)', added: false, impact: '+9%' },
    ],
    sampleBullet: {
      before: 'Coordinated with engineering team to launch new workspace sharing options.',
      after: 'Spearheaded enterprise team permission overhaul across 12-engineer squad, lifting enterprise seat expansion by 34% ($1.2M ARR).',
    },
  },
  {
    id: 'campus-grad',
    title: 'Campus SDE / Fresher (Google)',
    company: 'Software Engineering Graduate',
    baseScore: 54,
    targetScore: 96,
    keywords: [
      { name: 'Data Structures & Algorithms', added: true, impact: '+10%' },
      { name: 'TypeScript & Next.js', added: true, impact: '+8%' },
      { name: 'REST APIs & GraphQL', added: false, impact: '+12%' },
      { name: 'Docker & CI/CD', added: false, impact: '+11%' },
      { name: 'Open-Source Contributions', added: false, impact: '+9%' },
    ],
    sampleBullet: {
      before: 'Built a web application for university final year project with user login.',
      after: 'Engineered full-stack responsive commerce application with Next.js & Stripe API; achieved 98/100 Lighthouse score with 40+ unit tests.',
    },
  },
];

// Presets for the Google X-Y-Z Bullet Re-writer
const BULLET_REWRITE_STYLES = [
  {
    id: 'quantified',
    label: 'Google X-Y-Z (Business ROI)',
    tag: 'RECRUITER FAVORITE',
    output:
      'Architected Stripe checkout redesign utilizing Next.js & serverless webhooks, decreasing drop-off by 24% and generating $340k in Q3 annual recurring revenue.',
    metrics: ['24% decrease', '$340k Q3 ARR', 'Next.js & serverless webhooks'],
    boost: '+38% Impact Score',
  },
  {
    id: 'technical',
    label: 'Deep Systems & Tech Stack',
    tag: 'STAFF ENG FOCUS',
    output:
      'Engineered idempotent Redis event queue processing 14,000 requests/sec with Go microservices; sustained 99.99% uptime with sub-45ms p99 API latency.',
    metrics: ['14,000 req/sec', '99.99% uptime', 'sub-45ms p99 latency'],
    boost: '+35% Impact Score',
  },
  {
    id: 'leadership',
    label: 'Cross-Functional Leadership',
    tag: 'EXECUTIVE & LEAD',
    output:
      'Spearheaded 7-engineer sprint squad across design and infrastructure to deliver multi-currency billing across 14 European markets 2 weeks ahead of roadmap deadline.',
    metrics: ['7-engineer squad', '14 European markets', '2 weeks early'],
    boost: '+32% Impact Score',
  },
];

export function TechStudioLanding() {
  const { user } = useAuth();
  const [userResume, setUserResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    // 1. Immediately check local stored resumes
    const local = getStoredResumes();
    if (local && local.length > 0) {
      setUserResume(local[0]);
    }

    // 2. If authenticated, fetch latest from database
    if (user?.id) {
      getAllResumesFromDatabase(user.id).then((cloud) => {
        if (cloud && cloud.length > 0) {
          setUserResume(cloud[0]);
        }
      });
    }
  }, [user?.id]);

  // Main Playground Tab Switcher
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'design' | 'tailor' | 'ats' | 'bullet' | 'canvas'>('design');

  // Feature 1: Design Studio Live Morpher State
  const [studioTemplate, setStudioTemplate] = useState<TemplateId>('harvard');
  const [studioColor, setStudioColor] = useState<string>('#15803d');
  const [studioFont, setStudioFont] = useState<'sans' | 'serif' | 'mono'>('serif');
  const [studioSpacing, setStudioSpacing] = useState<'compact' | 'normal' | 'relaxed'>('normal');

  // Feature 2: AI Job Tailor State
  const [activePresetIdx, setActivePresetIdx] = useState<number>(0);
  const activePreset = TAILOR_PRESETS[activePresetIdx];
  const [userAddedKeywords, setUserAddedKeywords] = useState<Record<string, boolean>>({});

  // Dynamic Tailor Match Score calculation
  const totalKeywords = activePreset.keywords.length;
  const initialAdded = activePreset.keywords.filter((k) => k.added).length;
  const currentAdded = activePreset.keywords.filter(
    (k) => userAddedKeywords[`${activePreset.id}-${k.name}`] ?? k.added
  ).length;
  const computedMatchScore = Math.min(
    99,
    Math.round(activePreset.baseScore + ((currentAdded - initialAdded) / (totalKeywords - initialAdded || 1)) * (activePreset.targetScore - activePreset.baseScore))
  );

  const toggleKeyword = (kwName: string) => {
    const key = `${activePreset.id}-${kwName}`;
    const nextState = !(userAddedKeywords[key] ?? activePreset.keywords.find((k) => k.name === kwName)?.added);
    setUserAddedKeywords((prev) => ({ ...prev, [key]: nextState }));
    if (nextState) {
      fireConfetti({ particleCount: 30, spread: 50 });
    }
  };

  // Feature 3: ATS Auditor State
  const [selectedAuditRule, setSelectedAuditRule] = useState<number>(0);

  // Feature 4: Google X-Y-Z Bullet Re-writer State
  const [activeBulletStyle, setActiveBulletStyle] = useState<number>(0);

  // Feature 5: A4 Page Safety Engine State
  const [pageLinesCount, setPageLinesCount] = useState<number>(18);
  const isOverflowing = pageLinesCount > 18;
  const isAutoFitted = pageLinesCount === 17;

  // Filterable Templates Section State
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const templateCategories = [
    { id: 'all', label: 'All Templates (30)' },
    { id: 'ats', label: 'ATS Tech Pro' },
    { id: 'executive', label: 'Executive & Finance' },
    { id: 'minimal', label: 'Modern Minimal' },
    { id: 'creative', label: 'Canva & Creative' },
    { id: 'fresher', label: 'Freshers & Campus' },
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (selectedTemplateCategory === 'all') return true;
    if (selectedTemplateCategory === 'ats') {
      return ['silicon', 'harvard', 'naukri', 'ats', 'oxford'].includes(t.id);
    }
    if (selectedTemplateCategory === 'executive') {
      return ['harvard', 'oxford', 'cascade', 'toronto'].includes(t.id);
    }
    if (selectedTemplateCategory === 'minimal') {
      return ['stockholm', 'vienna', 'dublin', 'madrid', 'flow'].includes(t.id);
    }
    if (selectedTemplateCategory === 'creative') {
      return ['canva', 'canvapastel', 'canvanotebook', 'canvaeditorial', 'canvaretro', 'canvaaesthetic'].includes(t.id);
    }
    if (selectedTemplateCategory === 'fresher') {
      return ['fresher', 'btech', 'sarkari', 'traditional'].includes(t.id);
    }
    return true;
  }).slice(0, 12);

  const faqs = [
    {
      q: 'Is ResumeBabu really 100% free with no watermarks?',
      a: 'Yes, completely. Unlike other resume builders that let you build a resume and then demand a $19–$34/mo subscription at the download button, ResumeBabu generates clean, full-resolution vector PDFs with zero watermarks, zero paywalls, and zero hidden credit card prompts.',
    },
    {
      q: 'How does the 30-Point ATS Auditor ensure my resume passes parser algorithms?',
      a: 'Applicant Tracking Systems like Workday, Taleo, Greenhouse, and Lever often fail to parse floating textboxes, tables, complex columns, and rasterized fonts. Our engine generates single-layer semantic vector trees with standard headings and tested typography that parse at 98%+ accuracy across major ATS platforms.',
    },
    {
      q: 'What is the Google X-Y-Z formula for bullet points?',
      a: 'Google recruiters recommend framing accomplishments as: "Accomplished [X], as measured by [Y], by doing [Z]". Our AI bullet rewriter automatically transforms weak job duties into quantified business achievements with measurable business impact.',
    },
    {
      q: 'Does ResumeBabu store or sell my personal career data?',
      a: 'Never. Your resume drafts are saved securely in your browser local storage. If you choose to log in, data is encrypted via Cloud Firestore under strict per-user security rules. We do not sell user data to recruiters or third-party advertisers.',
    },
    {
      q: 'Can I tailor my resume to different job descriptions?',
      a: 'Yes. You can paste any target job description into our AI Job Tailor tool. It identifies missing high-frequency keywords, skills gaps, and suggests tailored bullet points to maximize your ATS match score before you submit.',
    },
    {
      q: 'Can I export my resume as a vector PDF or print it?',
      a: 'Our primary export is a high-fidelity vector PDF with selectable text and embedded fonts. This is the exact format required by enterprise ATS parsers and human recruiters to ensure flawless printing and screen rendering.',
    },
  ];

  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/15 via-emerald-600/5 to-transparent blur-3xl opacity-70 dark:opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 pt-24 sm:pt-32 pb-16">
        {/* =======================================================================
            HERO SECTION
            ======================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Personalized User Resume Banner (If user has a resume in database/local storage) */}
          {userResume && (
            <div className="mb-6 p-3 sm:p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30 backdrop-blur-md max-w-xl mx-auto flex items-center justify-between gap-4 text-left shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {userResume.personalInfo?.fullName ? userResume.personalInfo.fullName[0].toUpperCase() : 'R'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-slate-900 dark:text-white truncate">
                      {userResume.title || 'My Resume'}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-200/80 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full shrink-0">
                      SAVED IN YOUR DATABASE
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-sans block truncate">
                    {userResume.personalInfo?.fullName || 'Your Name'} · {userResume.personalInfo?.jobTitle || 'Your Role'}
                  </span>
                </div>
              </div>

              <Link
                href={`/builder/${userResume.id}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-transform hover:scale-105 shrink-0 flex items-center gap-1 shadow-md"
              >
                <span>Edit Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium shadow-xs mb-6 hover:border-emerald-500/40 transition-all">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free Forever · No Paywalls · Zero Watermarks · Vector PDF</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.08]">
            The Free{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">
              Resume Builder
            </span>{' '}
            Engineered to Beat the ATS.
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Build recruiter-tested resumes in minutes with the best free online resume builder. Powered by real-time A4 vector rendering, instant job description tailoring, and a 30-point ATS diagnostic engine.
          </p>

          {/* CTA Buttons - Premium Single-Line Responsive Layout */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto px-4">
            <Link
              href="/create"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-400 text-white font-bold text-sm sm:text-base tracking-tight shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] border border-emerald-400/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap overflow-hidden"
            >
              {/* Subtle neon shimmer highlight */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
              <span>Build My Resume Free</span>
              <ArrowRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/ats-checker"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-100 font-bold text-sm sm:text-base tracking-tight border border-slate-200 dark:border-white/15 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 shadow-md hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap backdrop-blur-md"
            >
              <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Check ATS Score</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              45,000+ Resumes Exported
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              98.4% ATS Parsing Rate
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              30 Recruiter-Approved Layouts
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              No Credit Card Required
            </span>
          </div>

          {/* =======================================================================
              HERO STUDIO WORKSPACE SHOWCASE (Modern SaaS Clean Light & Dark Aurora)
              ======================================================================= */}
          <div className="mt-14 sm:mt-24 max-w-6xl mx-auto text-left relative px-2 sm:px-0">
            
            {/* -------------------------------------------------------------
                THE AURORA LIGHT CREST & CONE
                Luminous wave of teal/cyan light that adapts seamlessly to both Light & Dark modes
                ------------------------------------------------------------- */}
            <div className="absolute inset-x-0 -top-24 sm:-top-40 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
              <div className="relative w-full max-w-5xl h-[460px] sm:h-[620px]">
                {/* 1. Volumetric Ambient Glow - Soft in light mode, deep in dark mode */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_75%,rgba(16,185,129,0.18),rgba(6,182,212,0.12),transparent_75%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_50%_75%,rgba(45,212,191,0.35),rgba(6,182,212,0.2),rgba(5,150,105,0.1),transparent_75%)] blur-3xl opacity-80 dark:opacity-100" />

                {/* 2. Parabolic Curved Light Crest */}
                <svg
                  viewBox="0 0 1000 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full opacity-40 dark:opacity-90 blur-xl drop-shadow-[0_0_40px_rgba(45,212,191,0.35)]"
                >
                  <defs>
                    <radialGradient id="auroraCrestGrad" cx="50%" cy="100%" r="70%" fx="50%" fy="100%">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.85" />
                      <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.65" />
                      <stop offset="55%" stopColor="#0d9488" stopOpacity="0.3" />
                      <stop offset="85%" stopColor="#0d9488" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M0 600 C 260 580, 340 180, 500 70 C 660 180, 740 580, 1000 600 Z"
                    fill="url(#auroraCrestGrad)"
                  />
                </svg>

                {/* 3. Center Teal Core Flare */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-20 w-44 sm:w-80 h-64 sm:h-96 bg-gradient-to-t from-teal-400/40 via-cyan-400/20 to-transparent dark:from-teal-300/80 dark:via-cyan-400/50 dark:to-transparent rounded-full blur-2xl opacity-75" />
              </div>
            </div>

            {/* -------------------------------------------------------------
                STUDIO WORKSPACE WINDOW (Modern Clean SaaS Frame)
                ------------------------------------------------------------- */}
            <div className="relative z-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-teal-500/35 bg-white/95 dark:bg-[#070c0a]/95 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_0_60px_rgba(45,212,191,0.2),0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden backdrop-blur-2xl group transition-all duration-300">
              
              {/* Top Accent Line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500/60 via-teal-400 to-transparent dark:via-cyan-400 dark:via-teal-300 dark:shadow-[0_0_14px_#2dd4bf]" />

              {/* Window Titlebar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-teal-500/20 bg-slate-50/95 dark:bg-[#0a1210]/90 text-xs font-mono backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block shadow-2xs" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block shadow-2xs" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block shadow-2xs" />
                  <span className="ml-2 hidden sm:inline text-slate-600 dark:text-teal-200/80 text-[11px] font-sans font-medium">
                    ResumeBabu Pro Studio — Live Split-Screen Workspace
                  </span>
                </div>

                {/* Center URL / State Bar (Visible on tablets and desktop) */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-slate-200 dark:border-teal-500/40 text-[11px] text-slate-700 dark:text-teal-100 shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-teal-400 shadow-[0_0_8px_#10b981]" />
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700 dark:text-teal-400 font-bold">HTTPS</span>
                  <span className="font-sans font-medium truncate max-w-[140px] sm:max-w-none text-slate-800 dark:text-slate-200">resumebabu.com/create</span>
                  <span className="text-slate-400 dark:text-teal-400/80 font-mono hidden md:inline text-[10px]">· 0ms Vector Sync</span>
                </div>

                {/* Right Action Tag */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-gradient-to-r dark:from-teal-500 dark:to-cyan-500 dark:hover:from-teal-400 dark:hover:to-cyan-400 dark:text-slate-950 font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>Launch Editor</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Clean Editor Screenshot Container */}
              <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src="/images/editor-screenshot.png"
                  alt="ResumeBabu Live Editor Split Screen: Real-Time Form Controls and Vector A4 Preview"
                  width={1024}
                  height={500}
                  className="w-full h-auto object-cover sm:object-contain transition-transform duration-500 group-hover:scale-[1.008]"
                  priority
                />
              </div>

              {/* Bottom Feature Capability Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 dark:divide-teal-500/20 border-t border-slate-200/80 dark:border-teal-500/30 bg-slate-50/90 dark:bg-[#091210]/90">
                <div className="p-3.5 sm:p-4 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400 dark:drop-shadow-[0_0_6px_rgba(45,212,191,0.7)] shrink-0" />
                    <span>0ms Latency Vector Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-teal-200/60 mt-0.5">
                    Every keystroke updates the live A4 preview instantaneously.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400 dark:drop-shadow-[0_0_6px_rgba(45,212,191,0.7)] shrink-0" />
                    <span>30 Professional Templates</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-teal-200/60 mt-0.5">
                    Switch between Harvard, Oxford, and Modern layouts in 1 click.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400 dark:drop-shadow-[0_0_6px_rgba(45,212,191,0.7)] shrink-0" />
                    <span>Built-In ATS Validator</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-teal-200/60 mt-0.5">
                    Live check scoring typography, margins, and parsable headings.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-teal-400 dark:drop-shadow-[0_0_6px_rgba(45,212,191,0.7)] shrink-0" />
                    <span>1-Click Vector PDF Export</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-teal-200/60 mt-0.5">
                    Clean, full-res downloadable PDF with zero watermarks or fee.
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                THE GLOWING HORIZON LINE
                Clean and balanced across both modes
                ------------------------------------------------------------- */}
            <div className="relative w-full mt-10 sm:mt-14 mb-8 sm:mb-12 flex items-center justify-center">
              <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/50 via-emerald-500/60 to-transparent dark:via-cyan-400 dark:via-teal-300 dark:via-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)] dark:shadow-[0_0_25px_#2dd4bf,0_0_50px_#06b6d4]" />
            </div>

            {/* -------------------------------------------------------------
                DEPTH TYPOGRAPHY SECTION (Clean, High-Contrast Modern SaaS)
                ------------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 px-4 sm:px-8">
              {/* Left Column: ATS Safe */}
              <div className="space-y-2">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline gap-2">
                  <span>ATS Safe</span>
                  <span className="text-emerald-600 dark:text-teal-400/90 font-sans font-light blur-[0.5px]">100%</span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-md leading-relaxed">
                  Single-layer semantic vector trees parsed with 98.4% accuracy across Workday, Taleo, Greenhouse & Lever algorithms.
                </p>
              </div>

              {/* Right Column: Fast & Accurate */}
              <div className="space-y-2 md:text-right flex flex-col md:items-end">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-baseline gap-2">
                  <span>Fast &</span>
                  <span className="text-teal-600 dark:text-cyan-400/90 font-sans font-light blur-[0.5px]">Accurate</span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans max-w-md leading-relaxed">
                  0ms continuous vector A4 layout sync. Exactly what you see is what exports to crisp, print-ready vector PDF.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            RECRUITER BENCHMARK LOGOS
            ======================================================================= */}
        <section className="mt-16 border-y border-border/60 py-8 bg-slate-50/50 dark:bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold block mb-4">
              ENGINEERED TO PASS SCREENING AT TOP GLOBAL COMPANIES
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Stripe', 'Apple', 'Goldman Sachs', 'McKinsey'].map((co, idx) => (
                <span
                  key={idx}
                  className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-200 select-none"
                >
                  {co}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            SCROLL-DRIVEN FEATURE STORY ENGINE (Reactive Resume Style)
            ======================================================================= */}
        <ScrollReveal animation="fade-in">
          <ScrollStorySection />
        </ScrollReveal>

        {/* =======================================================================
            APP FEATURES PLAYGROUND (Live Interactive Demos of Real Superpowers)
            ======================================================================= */}
        <section id="features" className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Interactive Superpowers</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Features built into our online resume builder.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
                Interact with our live design studio, keyword tailor, ATS auditor, and bullet re-writer before writing a single word.
              </p>
            </div>
          </ScrollReveal>

          {/* Playground Mode Tabs - Horizontal scroll on mobile for native app feel */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 mb-8 pb-2 sm:pb-0 px-2 sm:px-0 select-none">
            {[
              { id: 'design', label: '1. Design Studio Morpher', icon: Palette },
              { id: 'tailor', label: '2. AI Job Keyword Matcher', icon: Target },
              { id: 'ats', label: '3. 30-Point ATS Auditor', icon: ShieldCheck },
              { id: 'bullet', label: '4. Google X-Y-Z Re-writer', icon: Sparkles },
              { id: 'canvas', label: '5. A4 Page Safety Engine', icon: FileCheck2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePlaygroundTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePlaygroundTab(tab.id as typeof activePlaygroundTab)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md font-semibold'
                      : 'bg-card hover:bg-accent text-slate-700 dark:text-slate-300 border border-border/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* PLAYGROUND STAGE BOX */}
          <div className="rounded-3xl border border-border/80 dark:border-white/10 bg-card/60 dark:bg-[#121210]/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10 transition-all">
            
            {/* -------------------------------------------------------------------
                PLAYGROUND 1: DESIGN STUDIO MORPHER
                ------------------------------------------------------------------- */}
            {activePlaygroundTab === 'design' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Controls */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                      FEATURE 01 · REAL-TIME DESIGN ENGINE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      Morph templates, palettes & fonts live.
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                      Click any template, color palette, or typography setting. Watch the live A4 vector preview respond with sub-millimeter precision.
                    </p>
                  </div>

                  {/* 1. Pick Template */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                      Select Layout Template ({STUDIO_TEMPLATES.length} Curated)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {STUDIO_TEMPLATES.map((tmpl) => {
                        const isSelected = studioTemplate === tmpl.id;
                        return (
                          <button
                            key={tmpl.id}
                            type="button"
                            onClick={() => setStudioTemplate(tmpl.id)}
                            className={`p-2 rounded-lg text-left border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-500/10 border-emerald-500 dark:bg-emerald-950/30 font-semibold text-slate-900 dark:text-white shadow-2xs'
                                : 'bg-slate-50 dark:bg-white/[0.02] border-border text-slate-600 dark:text-slate-400 hover:border-slate-400'
                            }`}
                          >
                            <span className="block truncate font-serif">{tmpl.name}</span>
                            <span className="text-[10px] text-slate-400 font-sans block truncate">{tmpl.role}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Pick Color Palette */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                      Executive Color Palette
                    </label>
                    <div className="flex items-center gap-3">
                      {STUDIO_PALETTES.map((p) => {
                        const isSelected = studioColor === p.color;
                        return (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setStudioColor(p.color)}
                            title={p.name}
                            className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'scale-115 border-slate-900 dark:border-white shadow-md'
                                : 'border-transparent hover:scale-105'
                            }`}
                            style={{ backgroundColor: p.color }}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Launch Editor CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/create?template=${studioTemplate}&color=${encodeURIComponent(studioColor)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Open in Builder with This Theme</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Live Morphing A4 Card Preview */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center">
                  <div className="relative w-[280px] sm:w-[320px] aspect-[794/1123] rounded-md shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white transition-all">
                    <TemplateCardRealPreview
                      templateId={studioTemplate}
                      themeColor={studioColor}
                      customRole={userResume?.personalInfo?.jobTitle || "Senior Software Engineer"}
                      customName={userResume?.personalInfo?.fullName || user?.user_metadata?.full_name || "Alex Morgan"}
                      className="w-full h-full"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500 mt-3 text-center">
                    {userResume?.personalInfo?.fullName
                      ? `Your Resume Data: ${userResume.personalInfo.fullName} (${STUDIO_TEMPLATES.find((t) => t.id === studioTemplate)?.name})`
                      : `Live 1:1 Vector Rendering · ${STUDIO_TEMPLATES.find((t) => t.id === studioTemplate)?.name} (${studioColor})`}
                  </span>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                PLAYGROUND 2: AI JOB KEYWORD MATCHER
                ------------------------------------------------------------------- */}
            {activePlaygroundTab === 'tailor' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                      FEATURE 02 · AI JOB DESCRIPTION MATCHER
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      Extract missing keywords. Watch score rise.
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                      Select a target role below. Click on any missing keyword chip to add it to your resume skills and watch your ATS match score climb in real time.
                    </p>
                  </div>

                  {/* Preset Selector */}
                  <div className="flex flex-wrap gap-2">
                    {TAILOR_PRESETS.map((p, idx) => {
                      const isSelected = activePresetIdx === idx;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActivePresetIdx(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
                              : 'bg-card text-slate-600 dark:text-slate-300 border-border hover:bg-accent'
                          }`}
                        >
                          {p.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Keywords Interactive Chips */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                      Target Job Keywords (Click to add to resume):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePreset.keywords.map((kw) => {
                        const isAdded = userAddedKeywords[`${activePreset.id}-${kw.name}`] ?? kw.added;
                        return (
                          <button
                            key={kw.name}
                            type="button"
                            onClick={() => toggleKeyword(kw.name)}
                            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-400 font-semibold shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                            }`}
                          >
                            {isAdded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{kw.name}</span>
                            <span className="text-[10px] opacity-75">{kw.impact}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Tailor Full Resume in Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Live Match Score Gauge & Bullet Tailor Demo */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Live Match Score Gauge */}
                  <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                        ATS Parser Match Score
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        {computedMatchScore >= 90 ? 'INTERVIEW READY' : 'NEEDS TAILORING'}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-6xl font-normal text-slate-900 dark:text-white">
                        {computedMatchScore}%
                      </span>
                      <span className="text-xs text-slate-500 font-sans">
                        Targeting {activePreset.company}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${computedMatchScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Before / After Tailored Bullet */}
                  <div className="p-4 rounded-xl border border-border/80 bg-slate-50 dark:bg-white/[0.02] space-y-3 text-xs">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-bold block mb-1">
                        Original Resume Bullet
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 font-sans italic">
                        &quot;{activePreset.sampleBullet.before}&quot;
                      </p>
                    </div>
                    <div className="pt-2 border-t border-border/60">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                        Tailored AI Bullet (Keywords Weaved In)
                      </span>
                      <p className="text-slate-900 dark:text-slate-100 font-sans font-medium">
                        &quot;{activePreset.sampleBullet.after}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                PLAYGROUND 3: 30-POINT ATS AUDITOR
                ------------------------------------------------------------------- */}
            {activePlaygroundTab === 'ats' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                      FEATURE 03 · 30-POINT AUDITOR DIAGNOSTIC
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      Workday, Taleo & Greenhouse Tested.
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                      Our automated scanner audits 30 parser failure modes across 5 core pillars. Click any rule to inspect why applicant tracking systems fail it.
                    </p>
                  </div>

                  <div className="space-y-2 p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-bold block">
                      Parser Health Score
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-5xl font-bold text-slate-900 dark:text-white">98</span>
                      <span className="text-xl text-slate-400">/ 100</span>
                      <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        TOP 2% TIER
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-sans block pt-1">
                      0 parser traps detected · 30 of 30 tests passing
                    </span>
                  </div>

                  <div>
                    <Link
                      href="/ats-checker"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Upload & Check Your Existing Resume</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Interactive 4-Pillar Rules */}
                <div className="lg:col-span-7 space-y-3">
                  {[
                    {
                      title: 'Standard Semantic Section Tags',
                      desc: 'Maps Experience, Education, Skills, and Projects to standard ISO ATS keys without confusing custom labels.',
                      status: 'PASS',
                      pillar: 'Pillar 1: Structural Hierarchy',
                    },
                    {
                      title: 'Embedded OTF/TTF Vector Typography',
                      desc: 'Guarantees pure selectable vector glyphs. Zero rasterization or canvas image flattening that makes text unsearchable.',
                      status: 'PASS',
                      pillar: 'Pillar 2: Font Integrity',
                    },
                    {
                      title: 'Metric & Action Verb Density Test',
                      desc: 'Ensures over 65% of bullet points contain measurable business impact (%, $, X improvements).',
                      status: 'PASS',
                      pillar: 'Pillar 3: Google X-Y-Z',
                    },
                    {
                      title: 'Zero Nested Table or Floating Textbox Traps',
                      desc: 'Taleo and Workday crash when extracting nested HTML tables. Our single-stream DOM guarantees clean line extraction.',
                      status: 'PASS',
                      pillar: 'Pillar 4: Parser Trap Audit',
                    },
                  ].map((rule, idx) => {
                    const isSelected = selectedAuditRule === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAuditRule(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/50 dark:bg-emerald-950/20 shadow-xs'
                            : 'bg-card border-border/80 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                            {rule.pillar}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                            {rule.status}
                          </span>
                        </div>
                        <div className="font-serif text-sm font-bold text-slate-900 dark:text-white mt-1">
                          {rule.title}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-0.5">
                          {rule.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                PLAYGROUND 4: GOOGLE X-Y-Z BULLET RE-WRITER
                ------------------------------------------------------------------- */}
            {activePlaygroundTab === 'bullet' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                      FEATURE 04 · GOOGLE X-Y-Z BULLET RE-WRITER
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      From vague duties to quantifiable achievements.
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                      Select one of our 3 AI rewrite tones to see how our engine transforms weak task summaries into high-impact recruiter magnets.
                    </p>
                  </div>

                  {/* Style Switcher */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                      Choose AI Rewrite Focus:
                    </span>
                    <div className="space-y-2">
                      {BULLET_REWRITE_STYLES.map((style, idx) => {
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
                                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
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

                  <div>
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Rewrite Bullets in Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Interactive Before / After Transformer */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Original Input */}
                  <div className="p-4 rounded-xl border border-red-500/25 bg-red-500/5 dark:bg-red-950/20 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-red-600 dark:text-red-400 font-bold uppercase">
                      <span>BEFORE: VAGUE JOB DUTY (42/100 ATS)</span>
                      <span>Filtered by recruiters</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans italic">
                      &quot;Managed the website checkout, updated customer billing, and helped fix software bugs.&quot;
                    </p>
                  </div>

                  {/* Transformed Output */}
                  <div className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-950/30 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                      <span>AFTER: QUANTIFIED GOOGLE X-Y-Z FORMULA (98/100 ATS)</span>
                      <span>{BULLET_REWRITE_STYLES[activeBulletStyle].boost}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-sans font-medium leading-relaxed">
                      &quot;{BULLET_REWRITE_STYLES[activeBulletStyle].output}&quot;
                    </p>

                    {/* Extracted Metrics Chips */}
                    <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">
                        Quantified KPIs Detected:
                      </span>
                      {BULLET_REWRITE_STYLES[activeBulletStyle].metrics.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------------
                PLAYGROUND 5: REAL-TIME A4 PAGE SAFETY ENGINE
                ------------------------------------------------------------------- */}
            {activePlaygroundTab === 'canvas' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                      FEATURE 05 · A4 PAGE BUDGET & SAFETY ENGINE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      Never suffer from accidental page spillovers.
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                      Drag the content length slider below. Notice how the engine warns when a single bullet spills over onto Page 2, and test our 1-click &quot;Auto-Fit to 1 Page&quot; feature!
                    </p>
                  </div>

                  {/* Slider Control */}
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

                  <div>
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Open Live A4 Canvas</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right: Visual Page Boundary Diagram */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="relative w-[260px] sm:w-[300px] h-[380px] bg-white rounded-md shadow-2xl border border-slate-300 dark:border-slate-700 p-4 overflow-hidden flex flex-col justify-between">
                    {/* Mock header */}
                    <div className="border-b pb-2 space-y-1">
                      <div className="h-3 bg-slate-900 rounded w-1/2" />
                      <div className="h-2 bg-emerald-600 rounded w-1/3" />
                    </div>

                    {/* Mock body lines */}
                    <div className="space-y-1.5 flex-1 pt-3">
                      {Array.from({ length: Math.min(18, pageLinesCount) }).map((_, i) => (
                        <div key={i} className="h-2 bg-slate-200 rounded w-full" />
                      ))}
                    </div>

                    {/* Page 1 Boundary Indicator */}
                    <div className="border-t-2 border-dashed border-red-500 pt-1 flex items-center justify-between text-[9px] font-mono text-red-600 font-bold uppercase">
                      <span>PAGE 1 A4 SAFETY MARGIN</span>
                      <span>100% VECTOR</span>
                    </div>

                    {/* Overflow representation */}
                    {isOverflowing && (
                      <div className="absolute inset-x-0 bottom-0 bg-amber-500/20 border-t-2 border-amber-500 p-2 text-center text-[10px] font-mono font-bold text-amber-900">
                        {pageLinesCount - 18} Line(s) Overflowing to Page 2
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* =======================================================================
            TEMPLATE SHOWCASE: Fast Filterable Grid (30 Designs)
            ======================================================================= */}
        <section id="templates" className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>30 Tested Designs</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Free Resume Builder Templates for Every Career Level.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
                Switch between ATS-tested resume templates in one click. Your career content automatically reflows to every layout.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {templateCategories.map((cat) => {
              const isSelected = selectedTemplateCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedTemplateCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                      : 'bg-card hover:bg-accent text-slate-700 dark:text-slate-300 border border-border/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group relative flex flex-col p-3 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 hover:border-emerald-500/50 hover:shadow-2xl transition-all"
              >
                <div className="w-full aspect-[794/1123] rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200/90 dark:border-slate-800 relative group-hover:scale-[1.01] transition-transform">
                  <TemplateCardRealPreview
                    templateId={tmpl.id as TemplateId}
                    themeColor="#15803d"
                    customRole="Senior Software Engineer"
                    customName="Alex Morgan"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Link
                      href={`/create?template=${tmpl.id}`}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105"
                    >
                      Use Template →
                    </Link>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {tmpl.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans block">
                      Single / Dual Column ATS
                    </span>
                  </div>
                  <Link
                    href={`/create?template=${tmpl.id}`}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Edit →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card hover:bg-accent text-slate-800 dark:text-slate-200 border border-border font-medium text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>View All 30 Resume Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* =======================================================================
            ROLE-BASED EXAMPLES GALLERY
            ======================================================================= */}
        <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <HomeRoleExamplesGallery />
          </ScrollReveal>
        </section>

        {/* =======================================================================
            HONEST COMPARISON MATRIX
            ======================================================================= */}
        <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <HomeComparisonMatrix />
          </ScrollReveal>
        </section>

        {/* =======================================================================
            FAQ SECTION
            ======================================================================= */}
        <section className="mt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center space-y-3 mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                <span>Transparent Answers</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Frequently Asked Questions About Our Resume Builder
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
                Everything you need to know about ATS scoring, vector PDF export, and zero-paywall privacy.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-border/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </section>

        {/* =======================================================================
            FINAL HIGH-IMPACT STUDIO CTA BANNER
            ======================================================================= */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  100% FREE · NO SUBSCRIPTION REQUIRED
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Ready to land interviews at top companies?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans">
                  Build a recruiter-approved, ATS-tested resume in under 5 minutes with our free resume builder. Instant vector PDF export included.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/create"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-xl shadow-emerald-600/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Build My Resume Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/templates"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-card hover:bg-accent text-slate-800 dark:text-slate-200 border border-border font-medium text-base transition-all shadow-xs cursor-pointer"
                  >
                    <span>Explore Templates</span>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* =======================================================================
            FOOTER
            ======================================================================= */}
        <div className="mt-24">
          <RxFooter />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  FileText,
  Sliders,
  Layers,
  ChevronDown,
  LayoutTemplate,
  Target,
  Download,
  Check,
  Star,
  Users,
  Eye,
  MousePointerClick,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import { HomeAtsQuickScanner } from '@/components/home/HomeAtsQuickScanner';
import { HomeComparisonMatrix } from '@/components/home/HomeComparisonMatrix';
import { HomeRoleExamplesGallery } from '@/components/home/HomeRoleExamplesGallery';
import { RxFooter } from '@/components/common/RxFooter';
import { TEMPLATES } from '@/lib/templates';
import type { TemplateId } from '@/types/resume';

type StudioHeroTab = 'editor' | 'ats' | 'tailor' | 'templates';

export function TechStudioLanding() {
  const [activeHeroTab, setActiveHeroTab] = useState<StudioHeroTab>('editor');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Template categories for showcase
  const templateCategories = [
    { id: 'all', label: 'All Templates (30)' },
    { id: 'ats', label: 'ATS Tech Pro' },
    { id: 'executive', label: 'Executive & Finance' },
    { id: 'minimal', label: 'Modern Minimal' },
    { id: 'creative', label: 'Canva & Creative' },
    { id: 'fresher', label: 'Freshers & Campus' },
  ];

  // Curate templates with tags
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

  // FAQs
  const faqs = [
    {
      q: 'Is ResumeBuilder really 100% free with no watermarks?',
      a: 'Yes, completely. Unlike other resume builders that let you build a resume and then demand a $19–$34/mo subscription at the download button, ResumeBuilder generates clean, full-resolution vector PDFs with zero watermarks, zero paywalls, and zero hidden credit card prompts.',
    },
    {
      q: 'How does the 30-Point ATS Auditor ensure my resume passes parser algorithms?',
      a: 'Applicant Tracking Systems like Workday, Taleo, Greenhouse, and Lever often fail to parse floating textboxes, tables, complex columns, and rasterized fonts. Our engine generates single-layer semantic vector trees with standard headings and tested typography that parse at 98%+ accuracy across major ATS platforms.',
    },
    {
      q: 'What is the Google X-Y-Z formula for bullet points?',
      a: 'Google recruiters recommend framing accomplishments as: "Accomplished [X], as measured by [Y], by doing [Z]". Our AI bullet rewriter automatically transforms weak job duties (e.g. "Worked on backend") into quantified business achievements (e.g. "Architected distributed Redis cache reducing p99 latency by 42% across 12M requests").',
    },
    {
      q: 'Does ResumeBuilder store or sell my personal career data?',
      a: 'Never. Your resume drafts are saved securely in your browser local storage. If you choose to log in, data is encrypted via Cloud Firestore under strict per-user security rules. We do not sell user data to recruiters or third-party advertisers.',
    },
    {
      q: 'Can I tailor my resume to different job descriptions?',
      a: 'Yes. You can paste any target job description into our AI Job Tailor tool. It identifies missing high-frequency keywords, skills gaps, and suggests tailored bullet points to maximize your ATS match score before you submit.',
    },
    {
      q: 'Can I export my resume as a Word document or vector PDF?',
      a: 'Our primary export is a high-fidelity vector PDF with selectable text and embedded fonts. This is the exact format required by enterprise ATS parsers and human recruiters to ensure flawless printing and screen rendering.',
    },
  ];

  return (
    <div className="relative w-full bg-background text-foreground overflow-hidden">
      {/* =========================================================================
          BACKGROUND ATMOSPHERE: High-End Studio Ambient Glows & Grid Pattern
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Top Radial Glow */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/15 via-emerald-600/5 to-transparent blur-3xl opacity-70 dark:opacity-50" />
        {/* Subtle Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 pt-24 sm:pt-32 pb-16">
        {/* =======================================================================
            HERO SECTION
            ======================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium shadow-xs mb-6 hover:border-emerald-500/40 transition-all">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free Forever · No Paywalls · Zero Watermarks · Vector PDF</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.08]">
            The resume builder engineered to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-500">
              beat the ATS.
            </span>
          </h1>

          {/* Punchy Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Build recruiter-tested resumes in minutes. Powered by real-time A4 vector rendering, instant job description tailoring, and a 30-point ATS diagnostic engine.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Build My Resume Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/ats-checker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-accent/60 text-slate-800 dark:text-slate-200 border border-border/80 font-medium text-sm sm:text-base transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Check ATS Score</span>
            </Link>
          </div>

          {/* Micro-Trust Metrics */}
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
              INTERACTIVE HERO STUDIO SHOWCASE (Tabs without scroll-locking)
              ======================================================================= */}
          <div className="mt-14 max-w-5xl mx-auto">
            {/* Window Chrome Container */}
            <div className="rounded-2xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-[#121210]/70 backdrop-blur-xl shadow-2xl overflow-hidden transition-all">
              
              {/* Window Header with Tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-border/60 dark:border-white/10 px-4 py-3 bg-slate-50/70 dark:bg-white/[0.02] gap-3">
                {/* Traffic lights */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400 dark:text-slate-500 hidden md:inline">
                    resumebuilder.app/studio
                  </span>
                </div>

                {/* Studio Feature Tabs */}
                <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60 border border-black/5 dark:border-white/5">
                  {[
                    { id: 'editor', label: 'Live Vector Editor', icon: Sliders },
                    { id: 'ats', label: '30-Pt ATS Auditor', icon: ShieldCheck },
                    { id: 'tailor', label: 'AI Job Match', icon: Target },
                    { id: 'templates', label: '30 Templates', icon: LayoutTemplate },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeHeroTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveHeroTab(tab.id as StudioHeroTab)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Quick Action */}
                <Link
                  href="/create"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>Launch Editor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Showcase Content Area */}
              <div className="p-4 sm:p-6 lg:p-8 min-h-[460px] flex items-center justify-center">
                
                {/* TAB 1: LIVE VECTOR EDITOR */}
                {activeHeroTab === 'editor' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                    <div className="md:col-span-6 space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300/60 dark:border-emerald-800/60">
                        <span>LIVE 1:1 VECTOR CANVAS</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        What you type is exactly what prints.
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Zero awkward line wraps or unexpected page jumps. Real-time A4 boundary detection guarantees that your resume fits perfectly on standard international paper.
                      </p>

                      {/* Mock interactive input */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-border/80 space-y-2">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                          AI Assistant Rewrite Prompt
                        </span>
                        <div className="text-xs text-slate-700 dark:text-slate-200 font-mono bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-border/60">
                          &quot;Architected distributed microservices on AWS, slashing p99 latency by 42% across 14M daily queries.&quot;
                        </div>
                        <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Google X-Y-Z formula applied
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">+34% impact</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/create"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                        >
                          <span>Try Live Editor</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-6 flex justify-center">
                      <div className="relative w-[280px] sm:w-[320px] aspect-[794/1123] rounded-md shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white">
                        <TemplateCardRealPreview
                          templateId="harvard"
                          themeColor="#15803d"
                          customRole="Senior Product Designer"
                          customName="Alex Morgan"
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: 30-PT ATS AUDITOR */}
                {activeHeroTab === 'ats' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                    <div className="md:col-span-5 space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300/60 dark:border-emerald-800/60">
                        <span>30-POINT DIAGNOSTIC SCANNER</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Pre-screened for Workday, Taleo & Greenhouse.
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Over 75% of resumes are discarded by ATS filters before reaching human eyes. Our automated auditor inspects headings, metric density, and typography integrity in real time.
                      </p>

                      <div className="space-y-1">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          ATS Parser Readability
                        </span>
                        <div className="flex items-baseline gap-3">
                          <span className="font-serif text-5xl font-normal text-slate-900 dark:text-white">98</span>
                          <span className="text-xl font-sans text-slate-400">/ 100</span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            RECRUITER READY
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/ats-checker"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                        >
                          <span>Scan Your Resume (Free)</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-2.5">
                      {[
                        { title: 'Standard Section Headings', desc: 'Experience, Education, Skills tags mapped to standard ATS fields.', ok: true },
                        { title: 'Embedded Vector Fonts (OTF/TTF)', desc: 'Pure selectable text with zero rasterized or blurred font images.', ok: true },
                        { title: 'Quantified Metric & Verb Density', desc: 'Over 68% of bullet points contain measurable business impact KPIs.', ok: true },
                        { title: 'Table & Floating Textbox Audit', desc: 'Single-stream DOM avoids unparseable nested tables that crash parsers.', ok: true },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20 flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-sans block mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: AI JOB TAILOR */}
                {activeHeroTab === 'tailor' && (
                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                    <div className="md:col-span-6 space-y-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300/60 dark:border-emerald-800/60">
                        <span>INSTANT JD MATCHING</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Tailor to any job description in 30 seconds.
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Paste the target job posting to surface missing high-value keywords. Our AI seamlessly weaves missing qualifications directly into your existing experience.
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {['AWS EKS', 'Distributed Systems', 'Kafka', 'GraphQL', 'TypeScript', 'Kubernetes'].map((kw, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            {kw}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/create"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                        >
                          <span>Tailor My Resume</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-3">
                      <div className="p-4 rounded-xl border border-border/80 bg-slate-50 dark:bg-white/[0.02] space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                          Target Job Posting
                        </span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-mono italic">
                          &quot;Looking for a Senior Backend Engineer to architect cloud-native microservices with Go and Kubernetes...&quot;
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
                          Suggested Resume Enhancement
                        </span>
                        <p className="text-xs text-slate-800 dark:text-slate-200 font-mono">
                          &quot;Architected Go microservices deployed on Kubernetes, delivering 99.98% uptime and scaling to 15,000 req/sec.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: 30 TEMPLATES */}
                {activeHeroTab === 'templates' && (
                  <div className="w-full space-y-6 text-center">
                    <div className="max-w-xl mx-auto space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                        30 templates engineered for every career stage.
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                        Switch templates with one click. Your content adapts instantly with zero re-typing.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {[
                        { id: 'silicon', name: 'Silicon Valley SDE', color: '#059669', role: 'FAANG & Big Tech' },
                        { id: 'harvard', name: 'Harvard Classic', color: '#15803d', role: 'Corporate & Finance' },
                        { id: 'prawira', name: 'Prawira Modern', color: '#7c3aed', role: 'Product & Design' },
                        { id: 'flow', name: 'Flow Creative', color: '#2563eb', role: 'Consulting & Startups' },
                      ].map((tmpl) => (
                        <Link
                          key={tmpl.id}
                          href={`/create?template=${tmpl.id}`}
                          className="group relative flex flex-col items-center p-2 rounded-xl border border-border/80 bg-slate-50 dark:bg-white/[0.02] hover:border-emerald-500/50 hover:shadow-xl transition-all"
                        >
                          <div className="w-full aspect-[794/1123] rounded-md overflow-hidden bg-white shadow-xs group-hover:scale-[1.02] transition-transform">
                            <TemplateCardRealPreview
                              templateId={tmpl.id as TemplateId}
                              themeColor={tmpl.color}
                              customRole="Senior Engineer"
                              customName="Alex Morgan"
                              className="w-full h-full"
                            />
                          </div>
                          <span className="font-serif text-xs font-bold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {tmpl.name}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-sans">
                            {tmpl.role}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/templates"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        <span>Explore all 30 ATS templates</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            RECRUITER BENCHMARK LOGOS
            ======================================================================= */}
        <section className="mt-20 border-y border-border/60 py-10 bg-slate-50/50 dark:bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold block mb-6">
              ENGINEERED TO PASS SCREENING AT TOP GLOBAL COMPANIES
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Stripe', 'Apple', 'Goldman Sachs', 'McKinsey'].map((co, idx) => (
                <span
                  key={idx}
                  className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 select-none"
                >
                  {co}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================================
            BENTO GRID: "Engineered Different"
            ======================================================================= */}
        <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Engineered Different</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Every detail built for career impact.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
              No generic templates. No paywalls at download. Pure vector precision built to convert recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1: AI Bullet Rewriter (Span 8) */}
            <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  01 / QUANTIFIED BULLET FORMULA
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Turn boring tasks into quantified business ROI.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Weak bullets get filtered out. Our AI instantly formats your achievements into the Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z].
                </p>
              </div>

              {/* Before / After micro-card */}
              <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                    BEFORE (Weak task duty)
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 font-sans">
                    &quot;Helped redesign the company website and added new payment options for customers.&quot;
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                    AFTER (Quantified Google X-Y-Z)
                  </span>
                  <p className="text-slate-900 dark:text-slate-100 font-sans font-medium">
                    &quot;Architected modern checkout revamp with Next.js & Stripe, lifting conversion by 28% and generating $340k ARR.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Bento Card 2: 30-Point ATS Auditor (Span 4) */}
            <div className="md:col-span-4 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  02 / ATS SHIELD
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  30-Point ATS Parser Audit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                  Tests semantic tags, typography integrity, and parser compatibility before you send your application.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between text-xs font-mono font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">Taleo / Workday Score</span>
                  <span className="text-emerald-700 dark:text-emerald-400">98 / 100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full w-[98%]" />
                </div>
              </div>
            </div>

            {/* Bento Card 3: True Vector PDF Export (Span 4) */}
            <div className="md:col-span-4 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  03 / VECTOR ENGINE
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Crisp Vector PDF Export
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans">
                  Zero rasterized text or blurry JPEG compression. Selectable, searchable, and crystal-clear on 4K retina displays.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Download className="w-4 h-4" />
                  Selectable Text PDF
                </span>
                <span className="font-mono text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  100% Free
                </span>
              </div>
            </div>

            {/* Bento Card 4: Real-time A4 Multi-page Engine (Span 8) */}
            <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#121210]/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  04 / ZERO ORPHAN HEADINGS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Real-time A4 page margin & budget safety.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  Never suffer from an accidental second page with just one bullet point. Our dynamic canvas warns you before overflow and lets you fine-tune line spacing with millimeter precision.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Visual A4 page break indicator
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Adjustable typography leading (tight / relaxed)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Standard US Letter & International A4
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            TEMPLATE SHOWCASE: Fast Filterable Carousel / Grid
            ======================================================================= */}
        <section id="templates" className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <LayoutTemplate className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>30 Tested Designs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Pick your template. Customize in seconds.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans">
              Switch between templates at any point. Your text automatically adapts to every design.
            </p>
          </div>

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
                {/* Live Real Preview */}
                <div className="w-full aspect-[794/1123] rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200/90 dark:border-slate-800 relative group-hover:scale-[1.01] transition-transform">
                  <TemplateCardRealPreview
                    templateId={tmpl.id as TemplateId}
                    themeColor="#15803d"
                    customRole="Senior Software Engineer"
                    customName="Alex Morgan"
                    className="w-full h-full"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Link
                      href={`/create?template=${tmpl.id}`}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg transition-transform hover:scale-105"
                    >
                      Use Template →
                    </Link>
                  </div>
                </div>

                {/* Footer details */}
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {tmpl.name}
                    </h4>
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
            LIVE ATS BULLET EVALUATOR WIDGET
            ======================================================================= */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeAtsQuickScanner />
        </section>

        {/* =======================================================================
            ROLE-BASED EXAMPLES GALLERY
            ======================================================================= */}
        <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeRoleExamplesGallery />
        </section>

        {/* =======================================================================
            HONEST COMPARISON MATRIX
            ======================================================================= */}
        <section className="mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeComparisonMatrix />
        </section>

        {/* =======================================================================
            FAQ SECTION
            ======================================================================= */}
        <section className="mt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-300 dark:border-emerald-800 shadow-2xs">
              <span>Transparent Answers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
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
        </section>

        {/* =======================================================================
            FINAL HIGH-IMPACT STUDIO CTA BANNER
            ======================================================================= */}
        <section className="mt-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                100% FREE · NO SUBSCRIPTION REQUIRED
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Ready to land interviews at top companies?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans">
                Build a recruiter-approved, ATS-tested resume in under 5 minutes. Instant vector PDF export included.
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

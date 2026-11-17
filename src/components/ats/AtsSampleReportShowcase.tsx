'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  FileText,
  Code,
  Check,
  Zap,
  Target,
  BarChart3,
  Sliders,
  Layers,
} from 'lucide-react';

export function AtsSampleReportShowcase() {
  const [activeTab, setActiveTab] = useState<'fixes' | 'plaintext' | 'methodology'>('fixes');

  return (
    <div className="bg-card/90 backdrop-blur-xs rounded-3xl border border-border shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-semibold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Sample Report Preview</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Senior Full-Stack Engineer Resume Audit
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans">
            Calibrated against Workday, Greenhouse &amp; Taleo parsing rules. Target Job: Staff / Senior Engineer.
          </p>
        </div>

        {/* Big Score Gauge */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400"
                strokeDasharray="76, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-bold text-lg text-white font-mono">76</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-300 font-mono block">Needs Keyword Tuning</span>
            <span className="text-[11px] text-slate-300">Passing threshold is 80/100</span>
          </div>
        </div>
      </div>

      {/* 5-Pillar Score Bar Summary */}
      <div className="p-6 sm:p-8 bg-slate-50/50 dark:bg-white/[0.02] border-b border-border">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          The 5 Evaluation Pillars
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Keywords &amp; Skills</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">68%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block truncate">3 target skills missing</span>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Google X-Y-Z Metrics</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">72%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block truncate">2 bullets lack metrics</span>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">ATS Layout Architecture</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">98%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block truncate">Linear vector DOM</span>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Language Quality</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">94%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block truncate">Zero fuzzy duplicates</span>
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Contact &amp; Structure</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">100%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] text-slate-500 block truncate">Email, phone, LinkedIn verified</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="px-6 sm:px-8 border-b border-border bg-card flex items-center gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('fixes')}
          className={`py-3.5 border-b-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'fixes'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Top 3 Critical Fixes (Before vs. After)</span>
        </button>

        <button
          onClick={() => setActiveTab('plaintext')}
          className={`py-3.5 border-b-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'plaintext'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>&quot;What the ATS Sees&quot; Plain-Text View</span>
        </button>

        <button
          onClick={() => setActiveTab('methodology')}
          className={`py-3.5 border-b-2 text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'methodology'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Scoring Algorithm &amp; Weights</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Tab 1: Top 3 Critical Fixes */}
        {activeTab === 'fixes' && (
          <div className="space-y-6">
            {/* Fix 1: Keywords */}
            <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Fix #1: 3 Critical Hard Skills Missing from Job Requirements</span>
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                  +12 Points Potential
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The employer JD specified <strong>Docker</strong>, <strong>PostgreSQL</strong>, and <strong>AWS EKS</strong>. None appear in the candidate&apos;s technical skills section.
              </p>
              <div className="p-3.5 rounded-xl bg-card border border-border text-xs space-y-1">
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold block">
                  ✓ Recommended Action:
                </span>
                <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                  Add to Technical Skills: <span className="underline decoration-emerald-500 decoration-2">Docker</span>, <span className="underline decoration-emerald-500 decoration-2">PostgreSQL</span>, <span className="underline decoration-emerald-500 decoration-2">AWS (EKS, S3, RDS)</span>
                </span>
              </div>
            </div>

            {/* Fix 2: Google X-Y-Z Metrics */}
            <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-950/60 bg-amber-50/30 dark:bg-amber-950/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Fix #2: Unquantified Bullet Point (Missing Measurable Metric)</span>
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                  +8 Points Potential
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 block uppercase">
                    ✗ Before (Weak Passive Responsibility):
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    &quot;Responsible for backend API performance and managing PostgreSQL database queries.&quot;
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
                    ✓ After (Google X-Y-Z Quantified Impact):
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">
                    &quot;Refactored PostgreSQL indexing and connection pooling, lowering API p99 latency by <strong>42%</strong> across <strong>1.4M daily requests</strong>.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Fix 3: Section Normalization */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Fix #3: Non-Standard Section Heading Normalized</span>
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                  +4 Points Potential
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The original resume labeled its experience section as <em>&quot;My Career Journey&quot;</em>. Workday &amp; Taleo failed to parse dates and company names under non-standard headings. Normalized to standard <strong>&quot;Work Experience&quot;</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: What the ATS Sees */}
        {activeTab === 'plaintext' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.04] text-xs text-slate-600 dark:text-slate-400">
              <p>
                This is the raw linear text stream extracted when an enterprise parser (Workday, Greenhouse, Taleo) reads your PDF document. If text appears scrambled, missing, or merged across columns here, the recruiter will never see it.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0F172A] text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
              <pre className="whitespace-pre-wrap">
{`ALEX MERCER
San Francisco, CA | (415) 555-0192 | alex.mercer@example.com | linkedin.com/in/alexmercer-dev

SUMMARY
Full-Stack Software Engineer with 6+ years architecting fault-tolerant microservices, distributed caching, and cloud data pipelines handling 10M+ daily events.

TECHNICAL SKILLS
Languages: TypeScript, Go, Python, SQL, Java
Frameworks: React, Next.js, Node.js, Express, FastAPI
Databases & Cloud: PostgreSQL, Redis, AWS (S3, EKS, RDS), Docker, Kubernetes, Kafka

WORK EXPERIENCE
Senior Software Engineer | Stripe Integration Partners | San Francisco, CA | 2021 – Present
• Architected payment processing microservice executing 4.2M daily transactions with 99.98% uptime.
• Refactored PostgreSQL indexing and connection pooling, lowering API p99 latency by 42% across 1.4M daily requests.
• Mentored 8 software engineers on distributed systems design and automated CI/CD deployment pipelines.

Software Engineer | FinTech Systems Inc. | Austin, TX | 2018 – 2021
• Migrated monolithic Rails billing backend into Go event-driven microservices, reducing infrastructure cloud costs by $85,000 annually.
• Built automated reconciliation system in TypeScript, catching $240,000 in monthly payment discrepancies with zero false positives.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin | Austin, TX | 2014 – 2018
GPA: 3.86 / 4.0 | Honors: Dean's List (6 Semesters)`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Methodology */}
        {activeTab === 'methodology' && (
          <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                  1. Keyword &amp; Skills Alignment (30% Weight)
                </span>
                <p>
                  Extracts technical competencies, frameworks, tools, and methodologies from your resume and matches them against target job descriptions and standardized taxonomy dictionaries.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                  2. Google X-Y-Z Metric Density (25% Weight)
                </span>
                <p>
                  Detects measurable achievement indicators: currency values ($), percentages (%), multiplier metrics (3x), and user counts (10k+). Rewards bullets demonstrating measurable business outcomes.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                  3. ATS Format &amp; DOM Architecture (20% Weight)
                </span>
                <p>
                  Verifies that layout partitions remain strictly linear in the PDF text layer. Penalizes floating graphic text boxes, multi-row HTML tables, and non-selectable image text.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card space-y-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                  4. Section &amp; Contact Integrity (15% Weight)
                </span>
                <p>
                  Ensures all 4 primary contact elements are present (professional email, telephone number, city/state, LinkedIn/GitHub) and verifies that section headers map to standard recruitment categories.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-300">
              <strong>Benchmark Target:</strong> Resumes scoring <strong>80/100 or above</strong> have an estimated 95%+ pass rate through automated candidate filters at Fortune 500 tech companies and high-volume recruiting agencies.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

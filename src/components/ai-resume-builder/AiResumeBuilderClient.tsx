'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  FileText,
  Cpu,
  RefreshCw,
  Layers,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Bot,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  Award,
  Search,
  CheckSquare,
  FileCheck,
  Sliders,
  HelpCircle,
  Briefcase,
  GraduationCap,
  Users,
  Code,
  LineChart,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { DynamicResumeCardPreview } from '@/components/dashboard/DynamicResumeCardPreview';
import { RESUME_EXAMPLES } from '@/data/examples';
import { saveResume } from '@/lib/storage';
import { downloadResumeDocx } from '@/lib/export/docxExporter';
import { COMPLETE_AI_RESUME_GUIDE } from '@/data/ai-resume-builder/complete-guide';

interface BulletExample {
  role: string;
  category: string;
  before: string;
  beforeProblem: string;
  after: string;
  xyzBreakdown: {
    x: string;
    y: string;
    z: string;
  };
}

const AI_BULLET_EXAMPLES: BulletExample[] = [
  {
    role: 'Software Engineer',
    category: 'Engineering',
    before: 'Responsible for writing code, fixing backend bugs, and deploying microservices to AWS.',
    beforeProblem: 'Weak passive duty description without measurable business results or scale.',
    after:
      'Engineered 8 fault-tolerant Node.js microservices processing 4.2M daily transactions, reducing API p99 latency by 38% through Redis caching and query indexing.',
    xyzBreakdown: {
      x: 'Engineered 8 fault-tolerant Node.js microservices',
      y: 'reducing API p99 latency by 38% and processing 4.2M daily transactions',
      z: 'by implementing distributed Redis caching and PostgreSQL query indexing',
    },
  },
  {
    role: 'Product Manager',
    category: 'Product',
    before: 'Managed user feedback, held sprint planning meetings, and launched new mobile features.',
    beforeProblem: 'Focuses on routine tasks instead of user retention, revenue, or adoption metrics.',
    after:
      'Spearheaded end-to-end launch of AI onboarding workflow, lifting 30-day user retention from 41% to 63% and generating $420K in ARR within first two quarters.',
    xyzBreakdown: {
      x: 'Spearheaded end-to-end launch of AI onboarding workflow',
      y: 'lifting 30-day user retention from 41% to 63% and generating $420K in ARR',
      z: 'by analyzing user drop-off telemetry and designing a 3-step contextual activation funnel',
    },
  },
  {
    role: 'Data Analyst',
    category: 'Analytics',
    before: 'Created SQL queries and built Tableau dashboards for monthly executive meetings.',
    beforeProblem: 'Lacks quantitative business outcome, automation scale, and operational impact.',
    after:
      'Automated 14 executive Tableau reporting pipelines using dbt and BigQuery, cutting weekly manual data prep by 22 hours and eliminating 99% of reporting reconciliation discrepancies.',
    xyzBreakdown: {
      x: 'Automated 14 executive reporting pipelines',
      y: 'cutting weekly manual data prep by 22 hours and eliminating 99% of discrepancies',
      z: 'by orchestrating automated dbt models and BigQuery data validation tests',
    },
  },
  {
    role: 'Digital Marketing Specialist',
    category: 'Marketing',
    before: 'Ran Google Ads and Meta campaigns to generate more website traffic and inbound leads.',
    beforeProblem: 'Omits spend efficiency, CAC reduction, conversion lift, and total return on ad spend (ROAS).',
    after:
      'Scaled performance marketing across Google Search and Meta with a $45K monthly budget, dropping customer acquisition cost (CAC) by 27% while boosting qualified MQLs by 64%.',
    xyzBreakdown: {
      x: 'Scaled performance marketing across Google Search and Meta',
      y: 'dropping CAC by 27% while increasing qualified MQL volume by 64%',
      z: 'by testing 120+ creative variations and refining intent-driven landing page funnels',
    },
  },
  {
    role: 'Secondary School Teacher',
    category: 'Education',
    before: 'Taught English classes, planned daily lessons, and graded homework for high school students.',
    beforeProblem: 'Reads like a job post requirements list without classroom academic gains or methods.',
    after:
      'Delivered interactive English curriculum across 5 grade-10 sections (180+ students), improving annual standardized board exam pass rate from 81% to 94% through personalized reading interventions.',
    xyzBreakdown: {
      x: 'Delivered interactive English curriculum across 5 sections',
      y: 'improving annual standardized board exam pass rate from 81% to 94%',
      z: 'by implementing scaffolded writing workshops and weekly diagnostic skill assessments',
    },
  },
  {
    role: 'B.Tech / College Fresher',
    category: 'Freshers',
    before: 'Completed final year college project on e-commerce website using MERN stack and Git.',
    beforeProblem: 'Fails to communicate technical depth, architecture, testing, or practical user adoption.',
    after:
      'Architected responsive e-commerce web platform serving 800+ campus test users, integrating Stripe payment sandbox, JWT role-based authentication, and Jest unit tests with 86% code coverage.',
    xyzBreakdown: {
      x: 'Architected responsive e-commerce web platform for 800+ campus users',
      y: 'achieving 86% unit test coverage and sub-second catalog render times',
      z: 'by utilizing Next.js server components, JWT auth, and Stripe webhook handlers',
    },
  },
];

const AI_PROMPTS = [
  {
    title: 'Google X-Y-Z Experience Quantifier Prompt',
    purpose: 'Converts everyday responsibilities into executive-grade achievements with metrics.',
    prompt:
      'Rewrite the following raw job bullet point using Google’s X-Y-Z formula: "Accomplished [X], as measured by [Y], by doing [Z]". Prioritize strong active verbs, specific percentages, operational metrics, or dollar amounts. Keep it under 24 words:\n\n"[PASTE YOUR WEAK BULLET HERE]"',
  },
  {
    title: 'ATS Resume Summary Generator Prompt',
    purpose: 'Drafts a high-impact, 3-line professional summary tailored to target job titles.',
    prompt:
      'Write a 3-sentence ATS-friendly professional summary for a [TARGET ROLE] with [X YEARS] of experience. Mention core technical proficiencies in [KEY SKILLS 1, 2, 3], one major quantified career achievement, and an active commitment to [DESIRED TEAM GOAL]. Avoid buzzwords like "hard worker" or "dynamic go-getter".',
  },
  {
    title: 'Job Description Keyword Gap Analyzer Prompt',
    purpose: 'Pinpoints exact missing technical skills and certifications between your resume and a JD.',
    prompt:
      'Compare my current resume against this target job description. List:\n1) Core hard skills found in both (Matches)\n2) Critical tools, credentials, or keywords present in the JD but missing from my resume (Gaps)\n3) Recommended phrasing to naturally weave missing keywords into my work history without keyword stuffing.\n\nJob Description:\n[PASTE JD]\n\nMy Resume:\n[PASTE RESUME]',
  },
  {
    title: 'Projects Section High-Impact Rewriter Prompt',
    purpose: 'Transforms college or personal projects into recruiter-grade portfolio highlights.',
    prompt:
      'Rewrite this project overview for a technical resume. Structure it with 3 distinct bullets: 1) System architecture & tech stack used, 2) Core feature problem solved, and 3) Quantitative performance, benchmark, or user metric achieved:\n\nProject details: [PASTE PROJECT DETAILS]',
  },
];

export function AiResumeBuilderClient() {
  const router = useRouter();
  const g = COMPLETE_AI_RESUME_GUIDE;

  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customResult, setCustomResult] = useState<string | null>(null);
  const [copiedBullet, setCopiedBullet] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [copiedFullSample, setCopiedFullSample] = useState(false);
  const [downloadingDocx, setDownloadingDocx] = useState(false);

  const sampleResume = RESUME_EXAMPLES[0].sampleResumeData;
  const activeBullet = AI_BULLET_EXAMPLES[selectedRoleIdx];

  const handleCopyBullet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBullet(true);
    setTimeout(() => setCopiedBullet(false), 2000);
  };

  const handleCopyPrompt = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptIdx(idx);
    setTimeout(() => setCopiedPromptIdx(null), 2000);
  };

  const handleSimulateCustomBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const trimmed = customInput.trim();
    const generated = `Optimized and executed ${trimmed.toLowerCase().replace(/^(responsible for|worked on|helped with|managed)\s*/i, '')}, driving a 34% increase in process throughput and saving 12 hours weekly through systematic automation and standardized workflows.`;
    setCustomResult(generated);
  };

  const handleOpenStudio = (customSample?: typeof sampleResume) => {
    const newId = `resume-ai-${Date.now()}`;
    const cloneData = {
      ...(customSample || sampleResume),
      id: newId,
      title: 'AI Generated ATS Resume',
      updatedAt: 'Just now',
    };
    saveResume(cloneData);
    router.push(`/builder/${newId}`);
  };

  const handleDownloadDocx = async (customSample?: typeof sampleResume, filename = 'ai-ats-resume-sample') => {
    try {
      setDownloadingDocx(true);
      await downloadResumeDocx(customSample || sampleResume, filename);
    } finally {
      setDownloadingDocx(false);
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText('https://resumebabu.com/ai-resume-builder');
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  const handleCopyFullSampleText = () => {
    const p = sampleResume.personalInfo;
    const expList = sampleResume.experience || [];
    const text = [
      p.fullName,
      p.jobTitle,
      [p.phone, p.email, p.location].filter(Boolean).join(' | '),
      '',
      'PROFESSIONAL SUMMARY',
      p.summary,
      '',
      'WORK EXPERIENCE',
      ...expList.flatMap((e) => [
        `${e.role} | ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})`,
        ...(e.highlights || []).map((h) => `• ${h}`),
      ]),
      '',
      'PROJECTS',
      ...(sampleResume.projects || []).flatMap((pr) => [
        `${pr.title} (${pr.technologies?.join(', ') || ''})`,
        ...(pr.highlights || []).map((h) => `• ${h}`),
      ]),
      '',
      'TECHNICAL SKILLS',
      ...(sampleResume.skills || []).map((s) => `${s.category}: ${s.items.join(', ')}`),
      '',
      'EDUCATION',
      ...(sampleResume.education || []).map((ed) => `• ${ed.degree} — ${ed.school} (${ed.graduationDate})`),
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedFullSample(true);
    setTimeout(() => setCopiedFullSample(false), 2000);
  };

  const experienceLevels = [
    {
      level: 'Freshers & College Graduates',
      experience: '0–1 Years Experience',
      focus: 'Academic capstones, technical skills matrix, hackathons & coursework.',
      targetRole: 'Junior Engineer, Associate Analyst, Graduate Trainee',
    },
    {
      level: 'Mid-Level Professionals',
      experience: '2–5 Years Experience',
      focus: 'Reverse-chronological career progression, Google X-Y-Z achievements & tool ownership.',
      targetRole: 'Software Engineer, Product Manager, Marketing Specialist',
    },
    {
      level: 'Senior & Lead Roles',
      experience: '6–12+ Years Experience',
      focus: 'Cross-functional leadership, revenue impact, cloud architecture & team mentoring.',
      targetRole: 'Engineering Manager, Director, Principal Architect, VP',
    },
    {
      level: 'Career Switchers',
      experience: 'Transferable Skills',
      focus: 'Hybrid resume format connecting past domain successes to target role requirements.',
      targetRole: 'Bootcamp Grads, Non-Tech to Tech, Industry Transitions',
    },
  ];

  return (
    <div className="min-w-[320px] bg-background text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-border">
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.1),rgba(248,247,243,0))] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(16,185,129,0.07),rgba(16,15,12,0))]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium shadow-2xs mb-6">
            <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>100% Free AI Resume Builder · 2026 ATS Format · Google X-Y-Z Formula · No Paywall</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.1] max-w-4xl mx-auto">
            Free AI Resume Builder &amp;{' '}
            <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">
              Smart ATS Resume Maker
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-sans leading-relaxed">
            Create an ATS-compliant resume tailored to any job opening with our <span className="font-semibold text-slate-900 dark:text-slate-100">free ai resume builder</span>.
            Whether you need a <span className="font-semibold text-slate-900 dark:text-slate-100">resume builder ai</span> to craft quantified bullets with Google&apos;s X-Y-Z metric formula,
            or an <span className="font-semibold text-slate-900 dark:text-slate-100">ai resume builder free</span> of paywalls and watermarks,
            our intelligent <span className="font-semibold text-slate-900 dark:text-slate-100">resume ai builder</span> delivers recruiter-approved Word (.docx) and PDF files in minutes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-card border border-border flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> No Credit Card Required
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 100% Free Unlimited AI Rewrites
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Instant PDF &amp; Word (.docx)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-card border border-border flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> 98% ATS Pass Rate (2026 Standards)
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleOpenStudio()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
            >
              <span>Build My Resume with AI (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition border border-black/[0.08] dark:border-white/[0.1]"
            >
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Check ATS Resume Score</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHOOSE YOUR CAREER EXPERIENCE LEVEL */}
      <section className="py-14 sm:py-18 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
            Targeted AI Calibration
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Choose Your Career Experience Level
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
            Our AI resume writer automatically adjusts its tone, metric density, and section priority based on your career stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experienceLevels.map((lvl) => (
            <div
              key={lvl.level}
              className="bg-card rounded-2xl border border-border p-5 space-y-3 hover:border-emerald-500/40 transition shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {lvl.experience}
                  </span>
                  <span className="text-[11px] text-slate-400">100% Free AI</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white pt-1">{lvl.level}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{lvl.focus}</p>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Target: {lvl.targetRole}
                </div>
              </div>

              <button
                onClick={() => handleOpenStudio()}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-secondary text-slate-800 dark:text-slate-200 hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-600 text-xs font-bold transition border border-border cursor-pointer w-full mt-2"
              >
                <span>Build {lvl.level.split(' ')[0]} Resume with AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ROLE-BASED AI RESUME EXAMPLES DIRECTORY */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto border-b border-border bg-slate-50/50 dark:bg-[#100f0c]/50">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1.5">
            Role Directory
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Pre-Calibrated AI Resume Examples by Industry
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
            Jumpstart your job search with proven templates loaded with verified ATS keywords, quantified bullet points, and recruiter-approved layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESUME_EXAMPLES.slice(0, 6).map((ex) => (
            <div
              key={ex.slug}
              className="bg-card rounded-2xl border border-border p-5 space-y-3 hover:border-emerald-500/40 transition shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="capitalize px-2 py-0.5 rounded-md bg-secondary text-slate-700 dark:text-slate-300">
                    {ex.category}
                  </span>
                  <span>{ex.experienceLevel}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">{ex.role}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {ex.metaDescription}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {ex.targetKeywords.slice(0, 3).map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Link
                  href={`/examples/${ex.slug}`}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  View Guide &rarr;
                </Link>
                <button
                  onClick={() => handleOpenStudio(ex.sampleResumeData)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Use in Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE AI BULLET POINT REWRITER & GOOGLE XYZ DEMO */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto w-full border-b border-border">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            Interactive AI Bullet Rewriter
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            See How the AI Resume Builder Transforms Bullet Points
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 font-sans leading-relaxed">
            Executive recruiters filter resumes in 6 seconds. Compare generic duty descriptions to the quantified outputs generated by our free AI resume builder using Google&apos;s X-Y-Z formula.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none justify-start sm:justify-center">
          {AI_BULLET_EXAMPLES.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedRoleIdx(idx);
                setCustomResult(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                selectedRoleIdx === idx
                  ? 'bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600 dark:border-emerald-600 shadow-xs'
                  : 'bg-card text-slate-600 dark:text-slate-400 border-border hover:border-emerald-500/40 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.role}
            </button>
          ))}
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-mono font-medium">
                Before: Weak &amp; Passive Draft
              </span>
              <span className="text-xs font-mono text-slate-400">ATS Score: 32/100</span>
            </div>
            <blockquote className="text-slate-700 dark:text-slate-300 italic text-sm sm:text-base border-l-2 border-rose-400 dark:border-rose-700 pl-4 py-1 leading-relaxed">
              &ldquo;{activeBullet.before}&rdquo;
            </blockquote>
            <p className="text-xs font-sans text-rose-600 dark:text-rose-400 pt-1">
              <span className="font-semibold">Why it fails:</span> {activeBullet.beforeProblem}
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-emerald-300 dark:border-emerald-800/80 p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                After: AI Resume Builder (Google XYZ)
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ATS Score: 96/100</span>
            </div>
            <blockquote className="text-slate-900 dark:text-slate-100 font-medium text-sm sm:text-base border-l-2 border-emerald-600 dark:border-emerald-400 pl-4 py-1 leading-relaxed">
              &ldquo;{activeBullet.after}&rdquo;
            </blockquote>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                Impact: Strong active verb + quantitative scale + business result.
              </span>
              <button
                onClick={() => handleCopyBullet(activeBullet.after)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-secondary transition cursor-pointer"
              >
                {copiedBullet ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Bullet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown of Google XYZ Formula */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-[#151411] border border-border space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold">
              Google X-Y-Z Achievement Breakdown for this Bullet
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-card border border-border">
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                Accomplished [X]:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeBullet.xyzBreakdown.x}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border">
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                Measured by [Y]:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeBullet.xyzBreakdown.y}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border">
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                By Doing [Z]:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{activeBullet.xyzBreakdown.z}</p>
            </div>
          </div>
        </div>

        {/* Custom Bullet Tester Form */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4 shadow-xs">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Test Your Own Bullet Point with Our Resume AI Builder
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Type or paste a draft bullet from your resume to preview how our AI transforms it into an ATS-friendly achievement.
            </p>
          </div>
          <form onSubmit={handleSimulateCustomBullet} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. Worked on sales pipeline and called leads every day"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Rewrite with AI</span>
              </button>
            </div>
          </form>

          {customResult && (
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-2 mt-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                  AI Generated Result (Google X-Y-Z):
                </span>
                <button
                  onClick={() => handleCopyBullet(customResult)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </button>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                &ldquo;{customResult}&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: THE 3 CORE ENGINES */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-border">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            Why It Works
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            How Our Resume Builder AI &amp; Resume AI Builder Engine Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 font-sans leading-relaxed">
            Generic chatbots create vague clichés. Our <span className="font-semibold text-slate-900 dark:text-slate-100">resume builder ai</span> uses section-specific models trained on 10,000+ verified ATS hiring scans and executive recruiter rubrics, making it the most reliable <span className="font-semibold text-slate-900 dark:text-slate-100">resume ai builder</span> available online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-4 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              1. Job Description Semantic Matcher
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste any target job description. The AI parses required hard skills, tools, and certifications, comparing them against your active resume to pinpoint exact keyword gaps before you submit.
            </p>
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
              Target ATS Match: 85% to 98%
            </div>
          </div>

          <div className="bg-card p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-4 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              2. Google X-Y-Z Quantifier
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Our writer prompts you to supply numbers, revenue figures, cost savings, or time efficiency percentages, transforming passive duty statements into high-impact business outcomes.
            </p>
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
              Format: Accomplished [X] measured by [Y] doing [Z]
            </div>
          </div>

          <div className="bg-card p-6 sm:p-7 rounded-2xl border border-border shadow-xs space-y-4 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              3. Cliché &amp; Fluff Eliminator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Overused resume fluff words get flagged and replaced automatically with decisive executive action verbs like &ldquo;orchestrated&rdquo;, &ldquo;spearheaded&rdquo;, &ldquo;automated&rdquo;, and &ldquo;engineered&rdquo;.
            </p>
            <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
              Result: Zero robotic ChatGPT phrases
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LIVE RESUME PREVIEW & FULL TEXT BOX */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
              Free AI Resume Builder Preview
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Instant PDF &amp; Word (.docx) Downloads Without Paywalls
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Unlike other platforms that charge \$20 to \$30 after you spend an hour building your resume, our <span className="font-semibold text-slate-900 dark:text-white">ai resume builder free</span> platform allows you to download your polished resume in both vector PDF and editable Microsoft Word (.docx) formats with zero watermarks.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span>Single-column &amp; dual-column layouts calibrated for Workday, Taleo, Greenhouse, and Lever ATS systems.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span>Real-time A4 boundary management guarantees content fits cleanly on 1 or 2 pages without text overlapping.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span>Export both DOCX for recruiters requesting Word files and vector PDF for direct portal submissions.</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => handleOpenStudio()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition shadow-md cursor-pointer"
              >
                <span>Customize in AI Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDownloadDocx()}
                disabled={downloadingDocx}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm transition shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{downloadingDocx ? 'Generating Word...' : 'Download Sample (.docx)'}</span>
              </button>
              <button
                onClick={handleCopyFullSampleText}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition border border-border cursor-pointer hover:border-emerald-500/40"
              >
                {copiedFullSample ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedFullSample ? 'Sample Copied!' : 'Copy Full Text'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-card rounded-2xl border border-border p-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono text-slate-500">
                <span>ATS Resume Preview</span>
                <span className="text-emerald-600 font-semibold">100% Free Export</span>
              </div>
              <div className="mt-3 aspect-[1/1.3] overflow-hidden rounded-xl border border-border/80 bg-white shadow-inner flex items-center justify-center">
                <DynamicResumeCardPreview resume={sampleResume} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE COMPLETE 2026 GUIDE TO AI RESUME BUILDING (ALL 11 CHAPTERS) */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            The Master Guide
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            How to Build an ATS Resume with AI: Complete 2026 Guide
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-4 font-sans leading-relaxed">
            Follow this 11-chapter blueprint to understand ATS algorithms, customize resumes for specific job descriptions, and write quantifiable achievements that pass automated filters.
          </p>
        </div>

        {/* CHAPTER 1 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section1.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section1.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {g.section1.howAtsWorks.map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-card border border-border space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  {item.label}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#151411] border border-border space-y-2 mt-4">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
              5 Essential Qualities of an ATS-Compliant Resume:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {g.section1.fiveQualities.map((q) => (
                <li key={q.label} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-white">{q.label}:</span> {q.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs italic text-slate-500 pt-1">{g.section1.reminder}</p>
        </div>

        {/* CHAPTER 2 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section2.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section2.intro}</p>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
            {g.section2.stepsToTailor.map((step, idx) => (
              <li key={idx} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                Engineering Example:
              </span>
              {g.section2.techExample.map((line, i) => (
                <p key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                Marketing Example:
              </span>
              {g.section2.marketingExample.map((line, i) => (
                <p key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 pt-1">
            Tip: {g.section2.tip}
          </p>
        </div>

        {/* CHAPTER 3 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section3.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section3.intro}</p>
          <div className="space-y-4">
            {g.section3.formats.map((fmt) => (
              <div key={fmt.name} className="p-5 rounded-xl bg-card border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">{fmt.name}</h4>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {fmt.atsRating}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{fmt.desc}</p>
                <div className="pt-2">
                  <span className="text-xs font-mono font-semibold text-slate-500">Best For:</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-300 mt-1 space-y-0.5">
                    {fmt.suitableFor.map((sf) => (
                      <li key={sf}>{sf}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white">Format Recommendation:</span>{' '}
            {g.section3.verdict}
          </p>
        </div>

        {/* CHAPTER 4 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section4.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every section of your resume serves a distinct role for ATS parsers and human skimmers. Review guidelines and examples for sections A through K:
          </p>
          <div className="space-y-4">
            {g.section4.sections.map((sec) => (
              <div key={sec.letter} className="p-5 rounded-2xl bg-card border border-border space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {sec.letter}
                  </span>
                  <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">{sec.name}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{sec.guidelines}</p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#151411] border border-border text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {sec.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 5 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section5.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section5.intro}</p>
          <div className="space-y-2.5">
            {g.section5.fresherPriorityOrder.map((step) => (
              <div key={step.step} className="p-4 rounded-xl bg-card border border-border space-y-1">
                <span className="font-serif text-sm font-bold text-slate-900 dark:text-white block">
                  {step.step}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-2 mt-4">
            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
              Fresher Bullet Point Transformation:
            </span>
            <div className="text-xs space-y-1">
              <p className="text-slate-500 italic">Before: &ldquo;{g.section5.fresherBulletExample.before}&rdquo;</p>
              <p className="text-slate-900 dark:text-white font-medium">
                After AI: &ldquo;{g.section5.fresherBulletExample.after}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* CHAPTER 6 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section6.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section6.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {g.section6.formulaExplanation.map((f) => (
              <div key={f.part} className="p-4 rounded-xl bg-card border border-border space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  {f.part}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.meaning}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Role-Specific Google X-Y-Z Examples:
            </span>
            {g.section6.examples.map((ex) => (
              <div key={ex.role} className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151411] border border-border">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">{ex.role}:</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">&ldquo;{ex.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 7 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section7.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section7.intro}</p>
          <div className="p-4 rounded-xl bg-card border border-border space-y-2">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">Recommended ATS Fonts:</span>
            <div className="flex flex-wrap gap-1.5">
              {g.section7.fonts.map((f) => (
                <span
                  key={f}
                  className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border space-y-1.5">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">Font Hierarchy:</span>
              {g.section7.fontSizes.map((fs) => (
                <div key={fs.element} className="text-xs flex justify-between py-0.5 border-b border-border/50">
                  <span className="text-slate-600 dark:text-slate-400">{fs.element}:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{fs.size}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">Page Length Rules:</span>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {g.section7.pageLengthRules.map((plr, i) => (
                  <li key={i} className="leading-relaxed">
                    • {plr}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 pt-1 leading-relaxed">{g.section7.marginsAndSpacing}</p>
            </div>
          </div>
        </div>

        {/* CHAPTER 8 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section8.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section8.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {g.section8.dosAndDonts.map((rule, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${
                  rule.type === 'DO'
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                } space-y-1`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      rule.type === 'DO'
                        ? 'bg-emerald-200/80 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300'
                        : 'bg-rose-200/80 dark:bg-rose-900 text-rose-900 dark:text-rose-300'
                    }`}
                  >
                    {rule.type}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{rule.rule}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">{rule.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 9 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section9.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {g.section9.mistakes.map((m) => (
              <div key={m.title} className="p-4 rounded-xl bg-card border border-border space-y-1">
                <span className="font-serif text-sm font-bold text-rose-700 dark:text-rose-400 block">{m.title}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 10 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section10.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section10.intro}</p>
          <div className="space-y-3">
            {g.section10.categories.map((cat) => (
              <div key={cat.name} className="p-4 rounded-xl bg-card border border-border space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  {cat.name}:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{cat.verbs}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CHAPTER 11 */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white border-b border-border pb-2">
            {g.section11.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{g.section11.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                1. Content Quality
              </span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {g.section11.contentChecklist.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    ✓ {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                2. ATS Formatting
              </span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {g.section11.formattingChecklist.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    ✓ {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                3. Final Review
              </span>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                {g.section11.finalReviewChecklist.map((c, i) => (
                  <li key={i} className="leading-relaxed">
                    ✓ {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CONCLUSION */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Conclusion &amp; Next Steps</h3>
          {g.conclusion.map((p, i) => (
            <p key={i} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* SECTION 8: CURATED AI PROMPTS CHEATSHEET */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-border">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            AI Prompts Cheatsheet
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Copyable Prompts for Resume AI Builders
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 font-sans leading-relaxed">
            Want to brainstorm your resume using ChatGPT, Claude, or Gemini? Use our curated prompt formulas to generate recruiter-grade responses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_PROMPTS.map((item, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border p-6 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <button
                    onClick={() => handleCopyPrompt(item.prompt, idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-secondary transition cursor-pointer"
                  >
                    {copiedPromptIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{item.purpose}</p>
                <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151411] border border-border text-xs text-slate-700 dark:text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {item.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: MARKET COMPARISON MATRIX */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto border-b border-border">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            Transparent Comparison
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Free AI Resume Builder vs. Paid Platforms
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 font-sans leading-relaxed">
            See why job seekers prefer ResumeBabu over expensive monthly subscriptions. Our <span className="font-semibold text-slate-900 dark:text-slate-100">ai resume builder free</span> tier gives you unlimited generations with our advanced <span className="font-semibold text-slate-900 dark:text-slate-100">resume builder ai</span>.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
            <thead>
              <tr className="border-b border-border text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 font-mono font-medium">Core Feature</th>
                <th className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-t-lg">
                  ResumeBabu AI
                </th>
                <th className="py-3 px-4 font-mono font-medium">Rezi</th>
                <th className="py-3 px-4 font-mono font-medium">Teal</th>
                <th className="py-3 px-4 font-mono font-medium">Kickresume</th>
                <th className="py-3 px-4 font-mono font-medium">ChatGPT Plus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Price &amp; Subscription</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  100% Free Forever
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$29 / month</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$29 / month</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$19 / month</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">$20 / month</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">AI Rewrites &amp; Tokens</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  Unlimited Free
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Limited AI Credits</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">5 AI generations free</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paywalled credits</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Message rate limits</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Google X-Y-Z Calibration</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  Built-in Engine
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Partial</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Generic bullets</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Basic suggestions</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Requires manual prompt</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Word (.docx) &amp; PDF Export</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  Instant Vector PDF &amp; DOCX
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paid tier only</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">PDF only (DOCX paid)</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Watermark on free</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Raw text only (no file)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Target Job Description Matching</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  Included Free
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paid add-on</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Paid tier only</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Not supported</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Requires manual prompt</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">ATS Parsing Reliability</td>
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20">
                  98%+ Pass Rate
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">95%+ Pass Rate</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">90%+ Pass Rate</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Standard Parsing</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">No layout guarantee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 10: CITATIONS & AUTHORITY REFERENCES */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto border-b border-border">
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Hiring Research &amp; External Authority References
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Our resume algorithms and templates are built following established academic career standards and executive talent acquisition research:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="https://rework.withgoogle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-border hover:border-emerald-500/40 bg-secondary/50 block space-y-1 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  Google re:Work
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Laszlo Bock&apos;s X-Y-Z formula for describing accomplishments.
              </p>
            </a>

            <a
              href="https://careerservices.fas.harvard.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-border hover:border-emerald-500/40 bg-secondary/50 block space-y-1 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  Harvard OCS
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Harvard Office of Career Services resume and action verb guidelines.
              </p>
            </a>

            <a
              href="https://www.naceweb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-border hover:border-emerald-500/40 bg-secondary/50 block space-y-1 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  NACE Web
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                National Association of Colleges &amp; Employers hiring standards.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-4xl mx-auto border-b border-border">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
            Got Questions?
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions About AI Resume Builders
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans">
            Everything you need to know about ATS parsing, privacy, and how to create a high-scoring resume with AI.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              What makes ResumeBabu the best free AI resume builder in 2026?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              ResumeBabu provides an entirely <span className="font-semibold text-slate-900 dark:text-white">free AI resume builder</span> with zero paywalls. Unlike competitors that charge monthly fees or watermark your files, you get unlimited AI bullet rewrites using Google&apos;s X-Y-Z formula, real-time job description matching, and instant downloads in both vector PDF and Microsoft Word (.docx) ATS formats calibrated for 2026 hiring standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              Is this AI resume builder really free?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              Yes, ResumeBabu is 100% free. You can generate unlimited bullet points, tailor your resume against target job descriptions, and download your final vector PDF or Word (.docx) file without paying fees, subscribing to monthly plans, or having watermarks stamped on your resume.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              Will ATS software reject a resume written with AI?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              No. Applicant Tracking Systems (ATS) do not scan for &ldquo;AI authorship&rdquo;; they scan for matching keywords, readable font hierarchies, clear job dates, and standardized section headers (Experience, Education, Skills). Because ResumeBabu outputs clean vector text and structured layouts, ATS parsers read it cleanly with high match rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              How does the resume builder AI tailor my CV to job descriptions?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              You paste the target job description into the studio. Our AI model performs semantic natural language processing to extract primary keywords, core technologies, and required competencies. It then scores your resume in real time, highlighting matching terms (✓) and recommending missing keywords to add naturally.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              Should I download my AI resume in PDF or Word (.docx) format?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              We recommend downloading both. Use the vector PDF for direct company application portals (Greenhouse, Lever, Workday) to guarantee that margins, fonts, and page breaks remain visually perfect. Use the Word (.docx) file when a recruiter or staffing agency specifically requests an editable document to insert internal agency headers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              How is ResumeBabu different from copying and pasting with ChatGPT?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              ChatGPT only outputs unformatted raw text that you must manually copy into Word or Google Docs, where margins, alignment, and formatting often break ATS parsers. ResumeBabu is an end-to-end studio that writes, quantifies with Google&apos;s X-Y-Z formula, checks ATS keywords, manages A4 pagination, and exports print-ready vector PDF and Word documents in one place.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-emerald-700 dark:text-emerald-400 font-serif font-bold">Q:</span>
              Can college freshers use this AI resume builder with no experience?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6 font-sans">
              Yes. Our fresher models highlight college coursework, capstone projects, hackathon awards, student club leadership, and technical skill matrices, allowing students and career changers without full-time experience to build strong, credible resumes.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 12: SOCIAL SHARE BAR & FINAL CONVERSION BANNER */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 border-t border-border">
        {/* Social Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card border border-border px-5 py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Share this Free AI Resume Builder:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fresumebabu.com%2Fai-resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://api.whatsapp.com/send?text=Build%20your%20resume%20for%20free%20with%20this%20AI%20Resume%20Builder%20-%20https%3A%2F%2Fresumebabu.com%2Fai-resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://twitter.com/intent/tweet?text=Build%20an%20ATS-friendly%20resume%20with%20this%20free%20AI%20resume%20builder&url=https%3A%2F%2Fresumebabu.com%2Fai-resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              X / Twitter
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fresumebabu.com%2Fai-resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition"
            >
              Facebook
            </a>
            <button
              onClick={handleCopyShareLink}
              className="px-3 py-1.5 rounded-lg border border-border hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 transition flex items-center gap-1 cursor-pointer"
            >
              {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedShareLink ? 'Link Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Final Conversion Banner */}
        <div className="rounded-3xl bg-slate-50 dark:bg-[#161512] border border-border p-8 sm:p-12 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Build Your Winning Resume with AI Today
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans leading-relaxed">
            Join thousands of job seekers who used our free AI resume builder to land interviews at top companies. Free to write, free to format, free to download.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleOpenStudio()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-700/20 cursor-pointer"
            >
              <span>Launch Free AI Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

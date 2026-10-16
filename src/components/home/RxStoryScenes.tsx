'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  Copy,
  Lock,
  Globe,
  FileText,
  FileCode,
  ShieldCheck,
  Download,
  Zap,
  Sliders,
  Layers,
  Search,
  Maximize2,
  Eye,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import { TemplateId } from '@/types/resume';
import { HomeAtsQuickScanner } from './HomeAtsQuickScanner';
import { HomeRoleExamplesGallery } from './HomeRoleExamplesGallery';
import { HomeComparisonMatrix } from './HomeComparisonMatrix';
import { RxFooter } from '@/components/common/RxFooter';

const FULL_SUGGESTION_TEXT =
  'Architected distributed microservices handling 12M daily requests on AWS EKS, reducing p99 API latency by 42%.';

export const TEMPLATE_DISPLAY_NAMES: Partial<Record<TemplateId, string>> = {
  canva: 'Canva Minimalist',
  canvapastel: 'Canva Pastel Creative',
  canvanotebook: 'Canva Notebook Binder',
  canvaeditorial: 'Canva Vogue Editorial',
  canvaretro: 'Canva Retro Pop',
  canvaaesthetic: 'Canva Soft Boho',
  silicon: 'Silicon Tech SDE',
  prawira: 'Prawira Modern',
  harvard: 'Harvard Classic',
  cascade: 'Cascade Two-Tone',
  amelia: 'Amelia Executive',
  novoresume: 'Novorésumé Pro',
  dublin: 'Dublin Compact',
  stockholm: 'Stockholm Modern',
  sydney: 'Sydney Header',
  toronto: 'Toronto Corporate',
  flow: 'Flow Creative',
  oxford: 'Oxford Academic',
  europass: 'Europass Standard',
  chastain: 'Chastain Minimal',
  santoso: 'Santoso Creative',
  madrid: 'Madrid Grid',
  traditional: 'Traditional Formal',
  naukri: 'Naukri Tech India',
  fresher: 'Fresher Campus',
  sarkari: 'Sarkari PSU',
  vienna: 'Vienna Clean',
  ats: 'ATS Optimized',
  rahadian: 'Rahadian Executive',
  enhancv: 'Enhancv Modern',
};

export type ArchitecturalLayoutKey = 'modern' | 'harvard' | 'silicon' | 'executive' | 'ats';

export interface ArchitecturalLayoutInfo {
  key: ArchitecturalLayoutKey;
  name: string;
  templateId: TemplateId;
  tagline: string;
  description: string;
  badge: string;
  bestFor: string;
  highlights: string[];
}

export const DESIGN_LAYOUT_CONFIG: Record<ArchitecturalLayoutKey, ArchitecturalLayoutInfo> = {
  modern: {
    key: 'modern',
    name: 'Modern Two-Column Grid',
    templateId: 'prawira',
    tagline: 'Asymmetric Balance with High Skill Visibility',
    description: 'Separates technical stacks, competencies, and achievements into a scannable two-column architectural hierarchy with a dedicated skill column.',
    badge: 'High Visual Balance',
    bestFor: 'Full-Stack Developers, Cloud Architects, UI/UX & Tech Consultants',
    highlights: ['2-Column Asymmetric Grid', 'Highlighted Skill Sidebar', 'Optimized White Space'],
  },
  harvard: {
    key: 'harvard',
    name: 'Ivy League Single-Column',
    templateId: 'harvard',
    tagline: 'Classic Academic & Corporate Gold Standard',
    description: 'Timeless single-column typography with clean horizontal rules, favored by Goldman Sachs, McKinsey, and Fortune 500 leadership.',
    badge: 'Wall Street & Ivy Standard',
    bestFor: 'Investment Banking, Management Consulting, Law & Academia',
    highlights: ['Strict Single-Column Flow', 'Classic Serif Typography', 'Horizontal Rule Hierarchy'],
  },
  silicon: {
    key: 'silicon',
    name: 'Silicon Tech SDE Architecture',
    templateId: 'silicon',
    tagline: 'Engineered for Software Engineers & SREs',
    description: 'Developer-centric architecture with inline technology chips, GitHub/commit metrics, and deep system architecture bullets.',
    badge: 'High Density Code Specs',
    bestFor: 'Software Engineers, DevOps, Systems Architects & ML Researchers',
    highlights: ['Inline Technology Tags', 'System Architecture Bullets', 'Terminal-Clean Layout'],
  },
  executive: {
    key: 'executive',
    name: 'Executive Leadership Suite',
    templateId: 'amelia',
    tagline: 'Commanding Presence for Directors & C-Suite',
    description: 'High-contrast header blocks and executive summary styling designed to showcase P&L ownership, team scale, and board impact.',
    badge: 'C-Suite & Board Approved',
    bestFor: 'VP of Engineering, General Managers, Directors & Executives',
    highlights: ['High-Impact Header Accent', 'P&L Ownership Styling', 'Strategic Career Trajectory'],
  },
  ats: {
    key: 'ats',
    name: '100% ATS Single-Column Clean',
    templateId: 'ats',
    tagline: 'Zero-Margin Parser Compliance Engine',
    description: 'Ultra-pure single-column layout tested against Taleo, Workday, Greenhouse, and iCIMS for 100/100 machine indexability.',
    badge: '100/100 Parser Indexable',
    bestFor: 'High-Volume Enterprise Applications & Government Portals',
    highlights: ['Zero-Column Parsing Traps', 'Standard Header Anchors', 'Instant Text Extraction'],
  },
};

export interface DesignStyleSpec {
  id: string;
  label: string;
  number: string;
  templateId: TemplateId;
  themeColor: string;
  badge: string;
}

export const DESIGN_STYLES: DesignStyleSpec[] = [
  {
    id: 'classic',
    label: 'Classic',
    number: 'No. 01',
    templateId: 'harvard',
    themeColor: '#15803d',
    badge: 'No. 01 - Classic',
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    number: 'No. 02',
    templateId: 'prawira',
    themeColor: '#0284c7',
    badge: 'No. 02 - Sidebar',
  },
  {
    id: 'banner',
    label: 'Banner',
    number: 'No. 03',
    templateId: 'canvaeditorial',
    themeColor: '#b8532f',
    badge: 'No. 03 - Banner',
  },
  {
    id: 'mono',
    label: 'Mono',
    number: 'No. 04',
    templateId: 'ats',
    themeColor: '#0f172a',
    badge: 'No. 04 - Mono',
  },
  {
    id: 'editorial',
    label: 'Editorial',
    number: 'No. 05',
    templateId: 'canva',
    themeColor: '#15803d',
    badge: 'No. 05 - Editorial',
  },
];

export const DESIGN_17_TEMPLATES: { id: TemplateId; name: string; color: string }[] = [
  { id: 'harvard', name: 'Harvard Classic', color: '#1e3a8a' },
  { id: 'prawira', name: 'Sidebar Modern', color: '#0284c7' },
  { id: 'canvaeditorial', name: 'Banner Editorial', color: '#b8532f' },
  { id: 'ats', name: 'Clean Mono', color: '#0f172a' },
  { id: 'silicon', name: 'Silicon Tech', color: '#059669' },
  { id: 'cascade', name: 'Cascade Two-Tone', color: '#0284c7' },
  { id: 'amelia', name: 'Amelia Executive', color: '#4338ca' },
  { id: 'stockholm', name: 'Stockholm Modern', color: '#d97706' },
  { id: 'canva', name: 'Yours · Editorial', color: '#15803d' },
  { id: 'dublin', name: 'Dublin Compact', color: '#0f766e' },
  { id: 'sydney', name: 'Sydney Header', color: '#0369a1' },
  { id: 'novoresume', name: 'Novorésumé Pro', color: '#2563eb' },
  { id: 'toronto', name: 'Toronto Corporate', color: '#334155' },
  { id: 'flow', name: 'Flow Creative', color: '#7c3aed' },
  { id: 'fresher', name: 'Fresher Campus', color: '#16a34a' },
  { id: 'canvapastel', name: 'Canva Pastel', color: '#db2777' },
  { id: 'canvanotebook', name: 'Canva Notebook', color: '#ea580c' },
  { id: 'oxford', name: 'Oxford Corporate', color: '#1e293b' },
];

export function AlexMorganClassicResume({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full bg-white text-slate-800 p-5 sm:p-6 flex flex-col justify-between font-sans text-left select-none overflow-hidden ${className}`}>
      {/* Top Header */}
      <div>
        <h1 className="font-serif text-[22px] sm:text-[25px] font-normal tracking-tight text-slate-900 leading-none">
          Alex Morgan
        </h1>
        <div className="text-[10px] sm:text-[11px] font-medium text-[#15803d] mt-1">
          Senior Product Designer
        </div>
        <div className="text-[8.5px] sm:text-[9.5px] text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
          <span>alexmorgan.design</span>
          <span>&bull;</span>
          <span>Lisbon, Portugal</span>
          <span>&bull;</span>
          <span>/in/alex-design</span>
        </div>
        <div className="h-[1px] bg-[#15803d]/40 mt-2 mb-2.5" />
      </div>

      {/* Profile */}
      <div>
        <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#15803d] mb-0.5">
          Profile
        </div>
        <p className="text-[9px] sm:text-[9.5px] text-slate-600 leading-relaxed font-sans">
          Product designer with nine years of experience building design systems and reconstructed products for B2B teams.
        </p>
      </div>

      {/* Experience */}
      <div className="space-y-1.5">
        <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#15803d]">
          Experience
        </div>
        <div>
          <div className="flex items-baseline justify-between text-[9px] sm:text-[10px]">
            <span className="font-bold text-slate-900">Lead Product Designer</span>
            <span className="text-[8px] text-slate-400 font-mono">2021 &mdash; Present</span>
          </div>
          <div className="text-[8px] sm:text-[8.5px] text-slate-500 font-medium">FinEntire Labs &bull; Lisbon</div>
          <ul className="text-[8px] sm:text-[8.5px] text-slate-600 mt-0.5 space-y-0.5 list-disc list-inside leading-snug">
            <li>Built a shared design system used by six product teams, cutting UI review time by 40%.</li>
            <li>Led user research for the onboarding redesign; activation rose from 31% to 44%.</li>
          </ul>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-[9px] sm:text-[10px]">
            <span className="font-bold text-slate-900">Product Designer</span>
            <span className="text-[8px] text-slate-400 font-mono">2017 &mdash; 2021</span>
          </div>
          <div className="text-[8px] sm:text-[8.5px] text-slate-500 font-medium">Format &amp; Co. &bull; Porto</div>
          <ul className="text-[8px] sm:text-[8.5px] text-slate-600 mt-0.5 space-y-0.5 list-disc list-inside leading-snug">
            <li>Shipped accessible checkout flows for web and iOS, meeting WCAG 2.1 AA.</li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#15803d] mb-0.5">
          Education
        </div>
        <div className="flex items-baseline justify-between text-[9px] sm:text-[10px]">
          <span className="font-bold text-slate-900">BA, Communication Design</span>
          <span className="text-[8px] text-slate-400 font-mono">2013 &mdash; 2017</span>
        </div>
        <div className="text-[8px] sm:text-[8.5px] text-slate-500 font-medium">University of Porto</div>
      </div>

      {/* Two columns: Skills | Languages */}
      <div className="grid grid-cols-2 gap-3 pt-1.5 border-t border-slate-100">
        <div>
          <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#15803d] mb-0.5">
            Skills
          </div>
          <div className="text-[8px] sm:text-[8.5px] text-slate-600 space-y-0.5 leading-snug">
            <div>Design systems</div>
            <div>User research</div>
            <div>Accessibility</div>
            <div>Prototyping</div>
            <div>Figma, HTML and CSS</div>
          </div>
        </div>
        <div>
          <div className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider text-[#15803d] mb-0.5">
            Languages
          </div>
          <div className="text-[8px] sm:text-[8.5px] text-slate-600 space-y-0.5 leading-snug">
            <div>English (native)</div>
            <div>Portuguese (native)</div>
            <div>Spanish (B2)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderDesignTemplateLayer(style: DesignStyleSpec, className = '') {
  if (style.id === 'classic') {
    return <AlexMorganClassicResume className={className} />;
  }
  return (
    <TemplateCardRealPreview
      templateId={style.templateId}
      themeColor={style.themeColor}
      customRole="Senior Product Designer"
      customName="Alex Morgan"
      className={`w-full h-full border-none shadow-none rounded-[2px] ${className}`}
    />
  );
}

export const PATHWAY_DATA = {
  fresher: {
    stage: 'College & Graduate (0–2 YOE)',
    templateId: 'fresher' as TemplateId,
    templateName: 'Fresher Campus Single-Column',
    badge: 'Project & Skill Priority',
    role: 'Junior Full-Stack Developer',
    name: 'Aarav Patel',
    priorities: [
      {
        tag: 'PRIORITY #1',
        title: 'Project-First Architectural Flow',
        desc: 'Elevates hands-on GitHub builds, hackathons, and technical capstones to the top third of the page where recruiters verify coding ability.',
      },
      {
        tag: 'SKILL STRATEGY',
        title: 'CS Fundamentals & Modern Stacks',
        desc: 'Highlights Data Structures, Algorithms, TypeScript, React, and REST APIs with dedicated tags to bypass zero-experience ATS screening filters.',
      },
      {
        tag: 'PAGE DENSITY',
        title: 'Zero Awkward Margins',
        desc: 'Engineered single-column spacing makes 1–2 internships and personal projects look completely full, polished, and accomplished.',
      },
    ],
    beforeAfter: {
      before: 'Built an e-commerce website with user login and shopping cart for college final year project.',
      after: 'Architected responsive full-stack commerce web application with Next.js, Prisma, and Stripe checkout; achieved 98/100 Lighthouse performance with 40+ unit tests.',
    },
    cta: 'Build Graduate Resume',
  },
  experienced: {
    stage: 'Mid-Senior Specialist (3–8 YOE)',
    templateId: 'silicon' as TemplateId,
    templateName: 'Silicon Tech SDE Architecture',
    badge: 'Quantified Business ROI',
    role: 'Senior Distributed Systems SDE',
    name: 'Rohit Sharma',
    priorities: [
      {
        tag: 'PRIORITY #1',
        title: 'Business Impact & Production Scale',
        desc: 'Translates daily engineering tasks into measurable business ROI—API latency reduction, TPS capacity, AWS infrastructure cost savings, and MTTR improvements.',
      },
      {
        tag: 'SKILL STRATEGY',
        title: 'System Design & Cross-Squad Ownership',
        desc: 'Spotlights microservice decoupling, distributed caching, CI/CD pipeline modernization, and technical mentorship across junior and mid-level pods.',
      },
      {
        tag: 'PAGE DENSITY',
        title: 'High-Density 1-to-2 Page Grid',
        desc: 'Dual-column technical architecture tested across recruiters at Amazon, Stripe, and Google for maximum recruiter scanning speed.',
      },
    ],
    beforeAfter: {
      before: 'Managed backend microservices, fixed database bottlenecks, and helped the team ship code faster.',
      after: 'Re-architected core payment microservices handling 12M daily requests on AWS EKS, slashing p99 latency by 42% and trimming annual cloud spend by $180K.',
    },
    cta: 'Build Senior Engineer Resume',
  },
  executive: {
    stage: 'Tech Lead & Director (8+ YOE)',
    templateId: 'amelia' as TemplateId,
    templateName: 'Amelia Executive Leadership',
    badge: 'Strategic Vision & Scale',
    role: 'VP of Engineering & Platform Director',
    name: 'Amelia Stanford',
    priorities: [
      {
        tag: 'PRIORITY #1',
        title: 'P&L Ownership & Multi-Squad Scale',
        desc: 'Elevates org-level transformation, headcount scaling from 12 to 65+ engineers, multi-million dollar vendor negotiations, and board reporting.',
      },
      {
        tag: 'SKILL STRATEGY',
        title: 'Executive Presence & Governance',
        desc: 'Spotlights enterprise SOC-2/ISO compliance, developer velocity metrics, patent portfolios, and technical roadmaps aligned to company EBITDA targets.',
      },
      {
        tag: 'PAGE DENSITY',
        title: 'Refined Executive Header Spotlight',
        desc: 'Clean typography with dedicated executive career spotlights, suited for comprehensive multi-page chronologies.',
      },
    ],
    beforeAfter: {
      before: 'Led engineering teams, hired developers, and managed quarterly sprint planning across squads.',
      after: 'Directed 48-engineer org across 5 distributed squads; reduced platform MTTR by 68%, scaled release frequency by 3.4x, and delivered $14M enterprise roadmap on budget.',
    },
    cta: 'Build Executive Leadership Resume',
  },
};

// Hook to calculate scroll progress (0.0 -> 1.0) through a tall section
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / totalDistance));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}

export function RxStoryScenes() {
  // Section refs for calculating scroll progress
  const heroRef = useRef<HTMLElement>(null);
  const writeRef = useRef<HTMLElement>(null);
  const designRef = useRef<HTMLElement>(null);
  const atsRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLElement>(null);
  const tailorRef = useRef<HTMLElement>(null);

  // Scroll progresses (0.0 to 1.0)
  const heroP = useSectionProgress(heroRef);
  const writeP = useSectionProgress(writeRef);
  const designP = useSectionProgress(designRef);
  const atsP = useSectionProgress(atsRef);
  const canvasP = useSectionProgress(canvasRef);
  const tailorP = useSectionProgress(tailorRef);

  // Manual interactive overrides if user clicks buttons
  const [manualLayout, setManualLayout] = useState<ArchitecturalLayoutKey | null>(null);

  // Split-Screen Hero Interactive State
  const [heroRole, setHeroRole] = useState<'engineer' | 'product' | 'designer'>('engineer');
  const [manualHeroTemplate, setManualHeroTemplate] = useState<TemplateId | null>(null);
  const [topTimerIndex, setTopTimerIndex] = useState(0);
  const [heroPromptInput, setHeroPromptInput] = useState('');
  const [isHeroOptimizing, setIsHeroOptimizing] = useState(false);
  const [heroScoreBonus, setHeroScoreBonus] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live Canvas Interactive Playground State
  const [canvasFont, setCanvasFont] = useState<'Inter' | 'Merriweather' | 'JetBrains Mono'>('Inter');
  const [canvasSpacing, setCanvasSpacing] = useState<'compact' | 'normal' | 'relaxed'>('normal');
  const [activePage, setActivePage] = useState<1 | 2>(1);

  // Pathways interactive selector state
  const [activePathway, setActivePathway] = useState<'fresher' | 'experienced' | 'executive'>('experienced');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // SCENE 1 (WRITE) DERIVATIONS
  const strikeWidth = Math.min(100, Math.max(0, ((writeP - 0.12) / 0.26) * 100));
  const typeRatio = Math.min(1, Math.max(0, (writeP - 0.35) / 0.40));
  const typedChars = Math.floor(typeRatio * FULL_SUGGESTION_TEXT.length);
  const showAssistantCard = writeP > 0.40;
  const isAssistantAccepted = writeP > 0.78;

  // SCENE 2 (DESIGN) DERIVATIONS: Cinematic Hero Card Docking into 18-Card Grid
  const [manualDesignStyle, setManualDesignStyle] = useState<number | null>(null);
  const [wiperMouseX, setWiperMouseX] = useState<number | null>(null);
  const wiperCardRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardSlotAnchorRef = useRef<HTMLDivElement>(null);

  const [dockMetrics, setDockMetrics] = useState<{
    slotOffsetX: number;
    slotOffsetY: number;
    slotWidth: number;
  }>({ slotOffsetX: 0, slotOffsetY: 0, slotWidth: 150 });

  const updateDockMetrics = useCallback(() => {
    if (!cardSlotAnchorRef.current || !stickyRef.current) return;
    const anchorRect = cardSlotAnchorRef.current.getBoundingClientRect();
    const stickyRect = stickyRef.current.getBoundingClientRect();
    if (anchorRect.width === 0 || stickyRect.width === 0) return;

    // Use anchorRect's layout position relative to stickyRect
    const slotCenterX = anchorRect.left + anchorRect.width / 2;
    const slotCenterY = anchorRect.top + anchorRect.height / 2;
    const viewportCenterX = stickyRect.left + stickyRect.width / 2;
    const viewportCenterY = stickyRect.top + stickyRect.height / 2;

    const slotOffsetX = slotCenterX - viewportCenterX;
    const slotOffsetY = slotCenterY - viewportCenterY;
    setDockMetrics({ slotOffsetX, slotOffsetY, slotWidth: anchorRect.width });
  }, []);

  useEffect(() => {
    updateDockMetrics();
    const timer1 = setTimeout(updateDockMetrics, 60);
    const timer2 = setTimeout(updateDockMetrics, 200);
    const timer3 = setTimeout(updateDockMetrics, 500);
    const timer4 = setTimeout(updateDockMetrics, 1000);
    window.addEventListener('resize', updateDockMetrics);
    window.addEventListener('scroll', updateDockMetrics, { passive: true });
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('resize', updateDockMetrics);
      window.removeEventListener('scroll', updateDockMetrics);
    };
  }, [updateDockMetrics]);

  // Phase 1 (Wipe One by One through 4 transitions): designP 0.0 -> 0.48
  // Phase 2 (Card Docks into Grid Slot & Grid Reveals): designP 0.48 -> 1.0
  const designPhase1Threshold = 0.48;
  const gridProgress = Math.min(1, Math.max(0, (designP - designPhase1Threshold) / 0.44));

  // Scroll ratio through Phase 1 (0.0 to 1.0)
  const phase1ScrollRatio = Math.min(1, Math.max(0, designP / designPhase1Threshold));

  // 4 Transitions between 5 styles: Classic -> Sidebar -> Banner -> Mono -> Editorial
  const totalTransitions = 4;
  const transitionFloat = phase1ScrollRatio * totalTransitions;
  const segmentIdx = Math.min(totalTransitions - 1, Math.floor(transitionFloat));
  const segmentFraction = transitionFloat - segmentIdx; // 0.0 -> 1.0 within this specific wipe

  // Active style badge & pill (switches cleanly at 50% through each wipe)
  const scrollActiveStyleIdx = segmentFraction >= 0.5 ? segmentIdx + 1 : segmentIdx;
  const activeStyleIdx = manualDesignStyle !== null ? manualDesignStyle : scrollActiveStyleIdx;
  const currentStyle = DESIGN_STYLES[activeStyleIdx] || DESIGN_STYLES[2];

  // Base layer (layer 1) & revealing layer (layer 2) for the current wipe
  const layer1Style = manualDesignStyle !== null
    ? (activeStyleIdx === 1 ? DESIGN_STYLES[0] : DESIGN_STYLES[1])
    : DESIGN_STYLES[segmentIdx];
  const layer2Style = manualDesignStyle !== null
    ? DESIGN_STYLES[activeStyleIdx]
    : DESIGN_STYLES[segmentIdx + 1];

  // 100% Scroll-Driven Wiper: sweeps 0% -> 100% across the card for each template one by one
  const scrollWiperPos = segmentFraction * 100;
  const wiperPos = wiperMouseX !== null
    ? wiperMouseX
    : (manualDesignStyle !== null ? 50 : scrollWiperPos);

  // Smooth cubic ease-out for docking motion
  const easeDock = 1 - Math.pow(1 - gridProgress, 3);
  const targetHeroHeight = isMounted && typeof window !== 'undefined'
    ? Math.min(460, window.innerHeight * 0.54)
    : 440;
  const targetHeroWidth = targetHeroHeight * (794 / 1123);
  const targetZoom = dockMetrics.slotWidth > 0 ? targetHeroWidth / dockMetrics.slotWidth : 2.3;

  // At easeDock = 1 (docked), cardTx = 0, cardTy = 0, cardScale = 1.0 (Guaranteed 100% native grid placement!)
  const cardTx = -dockMetrics.slotOffsetX * (1 - easeDock);
  const cardTy = -dockMetrics.slotOffsetY * (1 - easeDock);
  const cardScale = 1.0 + (targetZoom - 1.0) * (1 - easeDock);

  const isWiperActive = wiperPos > 1.5 && wiperPos < 98.5 && gridProgress <= 0.05 && designP > 0.01;

  // SCENE 3 (ATS AUDITOR) DERIVATIONS
  const currentAtsScore = Math.floor(54 + atsP * 44); // 54 -> 98
  const magTranslateY = atsP * 240;
  const magTranslateX = Math.sin(atsP * Math.PI) * 45;

  // SCENE 4 (LIVE A4 CANVAS) DERIVATIONS
  // Zoom & scale dynamic preview based on scroll
  const canvasScale = 0.92 + canvasP * 0.12;

  // SCENE 5 (JD TAILOR) DERIVATIONS
  const currentTailorScore = Math.floor(62 + tailorP * 34); // 62% -> 96%
  const threadDashOffset = Math.max(0, (1 - tailorP) * 300);

  // HERO TEMPLATE SHUFFLE DERIVATION
  // Includes all templates (Canva, Silicon, Harvard, Prawira, Cascade, etc.) in ONE unified carousel!
  const HERO_SHUFFLE_TEMPLATES: TemplateId[] = [
    'silicon',
    'canvapastel',
    'harvard',
    'canvanotebook',
    'prawira',
    'canvaeditorial',
    'cascade',
    'canvaretro',
    'amelia',
    'canvaaesthetic',
    'novoresume',
    'canva',
    'dublin',
    'stockholm',
    'sydney',
    'toronto',
    'flow',
    'oxford',
    'europass',
    'chastain',
    'santoso',
    'madrid',
    'traditional',
    'naukri',
    'fresher',
    'sarkari',
    'vienna',
  ];

  // Auto-cycle through templates smoothly if user is at top and hasn't manually selected (4.2s smooth pacing, not too fast)
  useEffect(() => {
    if (heroP > 0.04 || manualHeroTemplate) return;
    const interval = setInterval(() => {
      setTopTimerIndex((prev) => (prev + 1) % HERO_SHUFFLE_TEMPLATES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [heroP, manualHeroTemplate, HERO_SHUFFLE_TEMPLATES.length]);

  // When scrolling down, step smoothly through templates without rapid flickering
  const scrollStep = Math.floor(heroP / 0.08);
  const autoHeroTemplateIndex = heroP > 0.03
    ? (topTimerIndex + scrollStep) % HERO_SHUFFLE_TEMPLATES.length
    : topTimerIndex;

  const activeHeroTemplate = manualHeroTemplate || HERO_SHUFFLE_TEMPLATES[autoHeroTemplateIndex] || 'silicon';

  // 3D Tilt physics kicks in smoothly after initial scroll
  const tiltProgress = Math.max(0, (heroP - 0.20) / 0.80);

  const handleExportConfetti = () => {
    fireConfetti();
  };

  return (
    <div className="bg-[#F8F7F3] dark:bg-[#100F0C] text-[#1a1a1a] dark:text-[#f3f4f6] font-sans transition-colors duration-300">
      
      {/* =========================================================================
          HERO SCENE: SPLIT-SCREEN INTERACTIVE HERO
          Left: Bold headline + value props + role selector + instant start/upload input
          Right: Animated live resume card transforming in real time with metrics & ATS gauge
          ========================================================================= */}
      {/* =========================================================================
          HERO SCENE: SPLIT-SCREEN PINNED STAGE (SCROLL-DRIVEN ANIMATION)
          TALL CONTAINER h-[200vh] + STICKY VIEWPORT h-screen
          Scrolling smoothly drives 3D tilt, parallax drift, metric bonus & headline translation
          ========================================================================= */}
      <section
        id="top"
        ref={heroRef}
        className="relative h-[200vh] bg-[#F8F7F3] dark:bg-[#100F0C]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Soft ambient aura without distracting background lines or pens */}
          <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(16,185,129,0.06),rgba(255,255,255,0))]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full my-auto">
          
          {/* =========================================================
              LEFT COLUMN: Headline + Pitch + Role Switcher + Instant Input
              (Parallax slides gently on scroll)
              ========================================================= */}
          <div
            className="lg:col-span-7 space-y-4 xl:space-y-5 text-left transition-transform duration-75"
            style={{
              transform: `translateY(${-heroP * 35}px)`,
              opacity: Math.max(0.2, 1 - heroP * 1.2),
            }}
          >
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-[11px] font-mono font-medium shadow-2xs">
              <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Next-Gen AI Resume &bull; 99% ATS Pass Rate</span>
            </div>

            {/* Main Punchy Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-normal tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Land 3x more interviews with a <span className="italic font-serif text-emerald-700 dark:text-emerald-400 font-medium">recruiter-proven</span> resume.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl font-sans leading-relaxed">
              Transform raw work history into metric-backed STAR statements. Tested on Workday, Taleo, and Greenhouse with zero parser traps.
            </p>

            {/* Interactive Role Switcher Pills */}
            <div className="space-y-2 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Select your target field to preview:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'engineer', label: 'Cloud & Software Engineer', icon: Briefcase },
                  { id: 'product', label: 'Product Manager', icon: Layers },
                  { id: 'designer', label: 'Design System Lead', icon: Sliders },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setHeroRole(role.id as any);
                      setHeroScoreBonus(5);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      heroRole === role.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs font-semibold'
                        : 'bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Start & Quick Upload Input Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-2.5 border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsHeroOptimizing(true);
                  setHeroScoreBonus((prev) => prev + 3);
                  setTimeout(() => {
                    setIsHeroOptimizing(false);
                  }, 1200);
                }}
                className="flex flex-col sm:flex-row items-stretch gap-2"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={heroPromptInput}
                    onChange={(e) => setHeroPromptInput(e.target.value)}
                    placeholder={
                      heroRole === 'engineer'
                        ? 'e.g. Senior Backend / DevOps AWS'
                        : heroRole === 'product'
                        ? 'e.g. Lead Technical Product Manager'
                        : 'e.g. Principal UI/UX & Design Systems'
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/create?role=${heroRole}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Start Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/ats-checker"
                    title="Upload existing resume PDF"
                    className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200 dark:border-slate-700 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Upload PDF
                  </Link>
                </div>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Starter
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Watermarks
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1200 DPI Vector PDF
              </span>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: Clean Full-Scale A4 Resume Stage with Scroll-Driven Animation
              ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            
            {/* Unified Stage Wrapper with consistent max-width */}
            <div className="w-full max-w-[320px] sm:max-w-[350px] xl:max-w-[380px] flex flex-col">
              
              {/* Clean Top Toolbar */}
              <div className="w-full flex items-center justify-between gap-2 mb-2 px-0.5">
                {/* Active Template Chip */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate">
                    {TEMPLATE_DISPLAY_NAMES[activeHeroTemplate] || activeHeroTemplate}
                  </span>
                </div>

                {/* Single Unified Action Pill */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const curIdx = HERO_SHUFFLE_TEMPLATES.indexOf(activeHeroTemplate);
                      const nextIdx = (curIdx + 1) % HERO_SHUFFLE_TEMPLATES.length;
                      setManualHeroTemplate(HERO_SHUFFLE_TEMPLATES[nextIdx]);
                      setHeroScoreBonus((prev) => (prev >= 6 ? 2 : prev + 2));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-2xs transition-all cursor-pointer"
                    title="Shuffle to next template"
                  >
                    <Zap className="w-3 h-3 text-emerald-600" />
                    <span>Shuffle</span>
                    <span className="text-[9px] opacity-60">
                      ({HERO_SHUFFLE_TEMPLATES.indexOf(activeHeroTemplate) + 1}/{HERO_SHUFFLE_TEMPLATES.length})
                    </span>
                  </button>

                  {manualHeroTemplate && (
                    <button
                      type="button"
                      onClick={() => setManualHeroTemplate(null)}
                      className="text-[9px] font-mono uppercase tracking-wider text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                      title="Resume auto shuffle on scroll"
                    >
                      Auto
                    </button>
                  )}
                </div>
              </div>

              {/* Complete Full A4 Resume Page Preview with Smooth Animation & 3D Tilt */}
              <div
                className="relative w-full transition-all duration-300 ease-out group"
                style={{
                  transform: `perspective(1000px) rotateX(${tiltProgress * 12}deg) rotateY(${-tiltProgress * 9}deg) scale(${1 - tiltProgress * 0.05})`,
                }}
              >
                {/* Subtle soft backdrop glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/15 via-transparent to-emerald-700/15 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Real Full A4 Document Preview Card */}
                <div className="relative rounded-lg shadow-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white">
                  <TemplateCardRealPreview
                    templateId={activeHeroTemplate}
                    themeColor="#15803d"
                    customRole={
                      heroRole === 'engineer'
                        ? 'Lead Cloud Architect & Distributed Systems Engineer'
                        : heroRole === 'product'
                        ? 'Staff Product Manager & Head of Growth'
                        : 'Lead Product Designer & Design Systems Director'
                    }
                    customName={
                      heroRole === 'engineer'
                        ? 'Rohit Sharma'
                        : heroRole === 'product'
                        ? 'Ananya Rao'
                        : 'Alex Morgan'
                    }
                    className="shadow-inner"
                  />

                  {/* Interactive Overlay on Hover to Edit in Studio */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all flex items-center justify-center p-4">
                    <Link
                      href={`/create?template=${activeHeroTemplate}&role=${heroRole}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                    >
                      <span>Customize in Full Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Clean Unobstructed Footer */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 px-0.5">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  Template {HERO_SHUFFLE_TEMPLATES.indexOf(activeHeroTemplate) + 1} of {HERO_SHUFFLE_TEMPLATES.length}
                </span>
                <Link
                  href={`/create?template=${activeHeroTemplate}`}
                  className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline shrink-0"
                >
                  <span>Use This</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono shrink-0 pt-4 border-t border-black/[0.05] dark:border-white/[0.05] mt-auto">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Scroll to trigger AI rewrite &amp; layout morphing
          </span>
          <div className="flex items-center gap-2">
            <span>SCROLL DOWN</span>
            <span className="animate-bounce">&darr;</span>
          </div>
        </div>
      </div>
    </section>

      {/* =========================================================================
          SCENE 1: #write (AI STAR RE-WRITE ENGINE - KEPT & ENHANCED)
          ========================================================================= */}
      <section
        id="write"
        ref={writeRef}
        className="relative h-[260vh] bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-4 z-10">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                01 / AI STAR RE-WRITE ENGINE
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Write<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Never write generic job duties again. Our AI rewrites passive descriptions into punchy, metric-backed STAR statements that prove your business impact.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-500">
                <span className="px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05]">
                  &bull; Situation &bull; Task &bull; Action &bull; Result
                </span>
              </div>
            </div>

            {/* Right Interactive Card: The Bullet Transformation Stage */}
            <div className="lg:col-span-7 relative z-10">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6">
                
                {/* Header label */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Live Experience Editor &bull; Work Experience #1
                  </span>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    {writeP < 0.35 ? 'Passive Draft' : writeP < 0.78 ? 'Optimizing...' : 'Quantified Impact'}
                  </span>
                </div>

                {/* The Original Passive Draft (with scroll-driven strikethrough line) */}
                <div className="relative text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-serif">
                  <span className="relative inline-block">
                    Managed cloud servers, worked on microservices and helped team speed up deployment cycles.
                    {/* The Strikethrough Line drawn dynamically by scroll */}
                    <span
                      className="absolute left-0 top-1/2 h-[2.5px] bg-red-500/80 rounded transition-all duration-75"
                      style={{ width: `${strikeWidth}%` }}
                    />
                  </span>
                </div>

                {/* AI Assistant Suggestion Popover (Appears after writeP > 0.40) */}
                {showAssistantCard && (
                  <div
                    className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                      isAssistantAccepted
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Executive Recruiter Recommendation:</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                        {isAssistantAccepted ? 'Accepted &bull; +28 ATS Pts' : 'Evaluating...'}
                      </span>
                    </div>

                    {/* Scroll-driven character by character typewriter stream */}
                    <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white font-sans leading-relaxed">
                      {FULL_SUGGESTION_TEXT.slice(0, typedChars)}
                      {typedChars < FULL_SUGGESTION_TEXT.length && (
                        <span className="inline-block w-2 h-4 ml-1 bg-emerald-600 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Action buttons inside card */}
                    <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Powered by Claude &amp; Gemini 2.5 Pro
                      </span>
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                          isAssistantAccepted
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{isAssistantAccepted ? 'Applied' : 'Applying on scroll'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 2: #design (SPLIT WIPER COMPARISON -> MORPH -> 17-TEMPLATE GRID)
          ========================================================================= */}
      <section
        id="design"
        ref={designRef}
        className="relative h-[380vh] bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div ref={stickyRef} className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          
          {/* Faint Background "DESIGN." Typography from Image 1 & 2 (reveals only during grid phase) */}
          <div
            className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 font-serif text-[7rem] sm:text-[11rem] lg:text-[13rem] font-bold text-slate-900 dark:text-white tracking-widest pointer-events-none select-none uppercase z-0 leading-none transition-opacity duration-300"
            style={{
              opacity: Math.min(0.04, Math.max(0, (gridProgress - 0.15) * 0.08)),
            }}
          >
            DESIGN.
          </div>

          {/* Unified Animated 18-Template Grid (Slots 0..17, Slot 8 is "Yours") */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-10">
            <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 lg:gap-3.5">
              {DESIGN_17_TEMPLATES.map((tmpl, idx) => {
                if (idx === 8) {
                  // SLOT 8: The Hero Template that Wipes in Phase 1 and Docks into Row 2, Col 3 in Phase 2!
                  return (
                    <div
                      key={tmpl.id}
                      className="group relative flex flex-col items-center"
                    >
                      {/* Invisible untransformed slot anchor for measuring grid docking coordinates */}
                      <div
                        ref={cardSlotAnchorRef}
                        className="w-full aspect-[794/1123] pointer-events-none opacity-0 select-none"
                        aria-hidden="true"
                      />

                      <div
                        ref={wiperCardRef}
                        suppressHydrationWarning
                        onMouseMove={(e) => {
                          if (!wiperCardRef.current || gridProgress > 0.05) return;
                          const rect = wiperCardRef.current.getBoundingClientRect();
                          const x = Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100));
                          setWiperMouseX(x);
                        }}
                        onMouseLeave={() => setWiperMouseX(null)}
                        style={{
                          transform: `translate3d(${cardTx}px, ${cardTy}px, 0) scale(${cardScale})`,
                          transformOrigin: 'center center',
                          zIndex: gridProgress < 0.95 ? 30 : 10,
                          boxShadow: gridProgress >= 0.95
                            ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                            : '0 20px 50px -12px rgba(0, 0, 0, 0.16), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                        }}
                        className="absolute inset-x-0 top-0 w-full aspect-[794/1123] rounded-[2px] shadow-xs group-hover:shadow-xl transition-all overflow-hidden bg-white border border-slate-200/90 dark:border-slate-800 cursor-pointer pointer-events-auto"
                      >
                        {/* Underlying Base Template (Layer 1) */}
                        <div className="absolute inset-0">
                          {renderDesignTemplateLayer(layer1Style)}
                        </div>

                        {/* Active Incoming Template (Layer 2) */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            clipPath: gridProgress > 0.05
                              ? 'none'
                              : `polygon(0% 0%, ${wiperPos}% 0%, ${wiperPos}% 100%, 0% 100%)`,
                          }}
                        >
                          {renderDesignTemplateLayer(layer2Style)}
                        </div>

                        {/* Vertical Wiper Divider Line with Center Drag Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-[2px] bg-slate-900 dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)] z-20 pointer-events-none transition-opacity duration-200"
                          style={{
                            left: `${Math.max(1, Math.min(99, wiperPos))}%`,
                            opacity: isWiperActive ? 1 : 0,
                          }}
                        >
                          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl flex items-center justify-center text-[10px] font-bold border-2 border-white dark:border-slate-900 select-none">
                            &#8596;
                          </div>
                        </div>

                        {/* Interactive Link when docked in grid */}
                        <Link
                          href={`/create?template=${layer2Style.templateId}`}
                          className="absolute inset-0 z-30"
                          aria-label={`Use ${layer2Style.label} template`}
                        />
                      </div>

                      <Link
                        href={`/create?template=${layer2Style.templateId}`}
                        className="text-[10px] sm:text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold mt-1 truncate max-w-full hover:underline transition-opacity duration-200"
                        style={{ opacity: easeDock }}
                      >
                        {activeStyleIdx === 4 ? 'Yours · Editorial' : `Yours · ${currentStyle.label}`}
                      </Link>
                    </div>
                  );
                }

                // Surrounding 17 templates
                return (
                  <div
                    key={tmpl.id}
                    className="group relative flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:z-20 cursor-pointer"
                    style={{
                      opacity: easeDock,
                      transform: `scale(${0.92 + 0.08 * easeDock})`,
                      pointerEvents: gridProgress >= 0.85 ? 'auto' : 'none',
                    }}
                  >
                    <div className="w-full rounded-[2px] shadow-xs group-hover:shadow-xl group-hover:ring-2 group-hover:ring-emerald-600 transition-all overflow-hidden bg-white border border-slate-200/90 dark:border-slate-800 relative">
                      <TemplateCardRealPreview
                        templateId={tmpl.id}
                        themeColor={tmpl.color}
                        customRole="Senior Product Designer"
                        customName="Alex Morgan"
                        className="w-full aspect-[794/1123]"
                      />
                      <Link
                        href={`/create?template=${tmpl.id}`}
                        className="absolute inset-0 z-10"
                        aria-label={`Use ${tmpl.name} template`}
                      />
                    </div>
                    <Link
                      href={`/create?template=${tmpl.id}`}
                      className="text-[10px] sm:text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium mt-1 truncate max-w-full hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    >
                      {tmpl.name}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Centered Editorial Footer Heading from Image 1 & 2 */}
            <div
              className="mt-6 sm:mt-8 text-center transition-all duration-300"
              style={{
                opacity: Math.min(1, Math.max(0, (gridProgress - 0.20) * 1.3)),
                transform: `translateY(${(1 - gridProgress) * 15}px)`,
                visibility: gridProgress < 0.05 ? 'hidden' : 'visible',
              }}
            >
              <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-slate-900 dark:text-white">
                17 templates.{' '}
                <span className="italic text-emerald-800 dark:text-emerald-400 font-serif">
                  Make any of them yours.
                </span>
              </h3>
            </div>
          </div>

          {/* Top Heading: "Design." with green period - Perfectly centered horizontally and balanced above the card */}
          <div
            className="absolute top-4 sm:top-6 lg:top-8 left-1/2 -translate-x-1/2 text-center pointer-events-auto transition-all duration-300 z-20"
            style={{
              opacity: Math.max(0, 1 - gridProgress * 2.5),
              transform: `translate(-50%, -${gridProgress * 30}px)`,
              pointerEvents: gridProgress > 0.2 ? 'none' : 'auto',
            }}
          >
            <h2 className="font-serif not-italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-slate-900 dark:text-white leading-none text-center">
              Design<span className="text-[#15803d] dark:text-emerald-400 font-serif">.</span>
            </h2>
          </div>

          {/* Bottom Pill Switcher - Perfectly centered horizontally directly below the card */}
          <div
            className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 inline-flex items-center justify-center p-1 bg-white/95 dark:bg-[#1c1b18]/95 backdrop-blur-md rounded-full border border-black/[0.08] dark:border-white/[0.1] shadow-xs pointer-events-auto transition-all duration-300 z-20"
            style={{
              opacity: Math.max(0, 1 - gridProgress * 2.5),
              transform: `translate(-50%, ${gridProgress * 30}px)`,
              pointerEvents: gridProgress > 0.2 ? 'none' : 'auto',
            }}
          >
            {DESIGN_STYLES.map((style, idx) => {
              const isActive = activeStyleIdx === idx;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setManualDesignStyle(idx)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                  }`}
                >
                  {style.label}
                </button>
              );
            })}
          </div>

          {/* Bottom-left Note */}
          <div
            className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 max-w-xs z-10 hidden sm:block text-left transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - gridProgress * 2.5) }}
          >
            <div className="font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-1.5">
              02 / DESIGN
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Pick from 17 templates, then set the type, color and spacing. The words stay put, so try as many looks as you like.
            </p>
          </div>

          {/* Floating French Curve Ruler Doodle on Right */}
        </div>
      </section>

      {/* =========================================================================
          SCENE 3: #ats (DEEP 30-POINT ATS AUDIT DIAGNOSTIC & SCANNER)
          ========================================================================= */}
      <section
        id="ats"
        ref={atsRef}
        className="relative h-[250vh] bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column: Live ATS Score Dial + 30-Point Audit Engine */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                03 / 30-POINT ATS AUDITOR
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                Inspect<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>

              {/* Dynamic ATS Score Counter driven by scroll */}
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                  PARSER READABILITY SCORE
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-6xl sm:text-7xl font-normal text-slate-900 dark:text-white">
                    {currentAtsScore}
                  </span>
                  <span className="text-2xl font-sans text-slate-400">/ 100</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {currentAtsScore >= 90 ? 'RECRUITER READY' : currentAtsScore >= 75 ? 'GOOD' : 'NEEDS FIXES'}
                  </span>
                </div>
              </div>

              {/* Live Categorized Checks ticking green with scroll */}
              <div className="space-y-3 pt-2">
                {[
                  { title: 'Semantic Headings Check', desc: 'Standard tags (Experience, Skills, Education)', minScore: 60 },
                  { title: 'Vector Font Integrity', desc: 'Embedded OTF/TTF text (Zero image rasterization)', minScore: 72 },
                  { title: 'Action Verb & Metric Density', desc: 'Over 65% of bullets feature measurable business KPIs', minScore: 84 },
                  { title: 'Workday & Taleo Parser Trap Audit', desc: 'Zero unparseable floating textboxes or nested tables', minScore: 92 },
                ].map((item, idx) => {
                  const passed = currentAtsScore >= item.minScore;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        passed
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-slate-100'
                          : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                        <span className="font-bold text-xs">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 ml-6">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-1">
                <Link
                  href="/ats-checker"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <span>Launch Full Standalone ATS Scanner Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Real Live ATS Diagnostic Document with Dynamic Scanning Beam */}
            <div className="lg:col-span-7 relative">
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 text-slate-900 dark:text-slate-100 max-w-lg mx-auto overflow-hidden">
                
                {/* Live Scanner Optical Beam across the document */}
                <div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_16px_rgba(16,185,129,0.9)] pointer-events-none z-20 transition-all duration-75"
                  style={{ top: `${Math.min(92, Math.max(8, atsP * 100))}%` }}
                />

                {/* Candidate Header with ATS Extraction Badges */}
                <div className="border-b border-emerald-600/30 dark:border-emerald-500/30 pb-3 mb-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                      Rohit Sharma
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <Check className="w-3 h-3" />
                      HEADER PARSED
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Lead Cloud Architect &bull; Amazon Web Services / GCP &bull; Bengaluru
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    rohit@dev.io &bull; +91 98765 43210 &bull; linkedin.com/in/rohit-cloud &bull; github.com/rohit
                  </p>
                </div>

                {/* Parsed Sections with Real Content and Verification Chips */}
                <div className="space-y-3 text-xs">
                  {/* Experience Section */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        Work Experience &bull; 100% Indexable
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">4 KPIs Detected</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100 text-[11px]">
                        <span>Cloud Architecture Pod &bull; Principal Architect</span>
                        <span className="text-[10px] text-slate-400 font-normal">2021 &ndash; Present</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        Spearheaded core banking migration to event-driven Kafka clusters, processing <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">18,000 TPS</strong> while achieving <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">99.995% availability</strong>.
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        Architected multi-region AWS EKS deployments across 18 backend pods, reducing p99 latency by <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">42%</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Skills Section with Detected ATS Tokens */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        Extracted ATS Skills &bull; 9/9 Exact Match
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Zero Synonyms Dropped</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Kubernetes',
                        'AWS EKS',
                        'Golang',
                        'Apache Kafka',
                        'Terraform',
                        'PostgreSQL',
                        'Python',
                        'gRPC',
                        'Docker',
                      ].map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">B.Tech Computer Science &bull; IIT Madras</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1.5">9.4 CGPA &bull; AWS Solutions Architect Pro</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-600 font-bold">100% PARSED</span>
                    </div>
                  </div>

                  {/* ATS Compliance Footer */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WORKDAY &bull; TALEO &bull; GREENHOUSE TESTED</span>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">PARSER READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE ATS QUICK-SCANNER DIAGNOSTIC WIDGET
          ========================================================================= */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <HomeAtsQuickScanner />
      </section>

      {/* =========================================================================
          SCENE 4: #canvas (LIVE A4 PAGINATION & STYLE STUDIO PLAYGROUND)
          ========================================================================= */}
      <section
        id="canvas"
        ref={canvasRef}
        className="relative h-[250vh] bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left Column: Interactive Controls (Font, Color, Spacing, Page) */}
            <div className="lg:col-span-5 space-y-6 z-10">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                04 / REAL-TIME A4 ENGINE
              </div>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Canvas<span className="text-emerald-700 dark:text-emerald-400">.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                What you see is exactly what prints. Strict A4 millimeter pagination guarantees zero awkward page breaks or orphaned headers. Test the live controls below:
              </p>

              {/* Interactive Tool Palette */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                
                {/* Font Selector */}
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Typography Engine
                  </span>
                  <div className="flex gap-2">
                    {(['Inter', 'Merriweather', 'JetBrains Mono'] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setCanvasFont(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          canvasFont === f
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs font-semibold'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spacing density */}
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Line Density &amp; Spacing
                  </span>
                  <div className="flex gap-2">
                    {(['compact', 'normal', 'relaxed'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCanvasSpacing(s)}
                        className={`px-3 py-1 rounded-md text-[11px] font-mono capitalize transition-all cursor-pointer ${
                          canvasSpacing === s
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Live Responding A4 Sheet (Light & Dark Mode) */}
            <div className="lg:col-span-7 flex justify-center relative">
              <div
                className="bg-white dark:bg-slate-900 rounded-md shadow-2xl border border-slate-300 dark:border-slate-800 p-6 sm:p-8 w-full max-w-md transition-all duration-300 text-slate-900 dark:text-slate-100"
                style={{
                  transform: `scale(${canvasScale})`,
                  fontFamily: canvasFont === 'Merriweather' ? 'serif' : canvasFont === 'JetBrains Mono' ? 'monospace' : 'sans-serif',
                }}
              >
                {/* Page indicator pill */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-4 text-[10px] font-mono text-slate-400">
                  <span>PREVIEW CANVAS &bull; PAGE {activePage} OF 2</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setActivePage(1)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        activePage === 1
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      P1
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePage(2)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        activePage === 2
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      P2
                    </button>
                  </div>
                </div>

                {activePage === 1 ? (
                  <>
                    <div className="border-b border-emerald-600/30 dark:border-emerald-500/30 pb-3 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Rohit Sharma</h3>
                      <p className="text-xs font-semibold mt-0.5 text-emerald-700 dark:text-emerald-400">
                        Lead Cloud Architect &bull; Bengaluru &bull; rohit@dev.io
                      </p>
                    </div>

                    <div
                      className={`text-xs space-y-3 ${
                        canvasSpacing === 'compact' ? 'space-y-1.5 leading-snug' : canvasSpacing === 'relaxed' ? 'space-y-4 leading-relaxed' : 'space-y-2.5'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">Cloud Architecture Pod &bull; TechCorp</span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Architected high-throughput microservices handling 12M daily requests on AWS EKS, reducing p99 API latency by 42%.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">Distributed Reliability &amp; Chaos Engineering</span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Standardized Terraform pipelines across 18 backend pods, slashing deployment cycle from 4 days to 18 minutes.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">Core Technical Skills</span>
                        <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px]">
                          Go, Python, Docker, Kubernetes, AWS EKS, PostgreSQL, Kafka, Terraform
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-b border-emerald-600/30 dark:border-emerald-500/30 pb-2 mb-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Page 2 &bull; Key Projects &amp; Education</h4>
                    </div>

                    <div className="text-xs space-y-3">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">Fintech Event Pipeline (Open Source)</span>
                        <p className="text-slate-600 dark:text-slate-400">
                          Engineered Kafka event streaming cluster processing 45,000 events/sec with zero message duplication.
                        </p>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-slate-100 block">B.Tech Computer Science &bull; IIT Madras</span>
                        <p className="text-slate-600 dark:text-slate-400">First Class Distinction &bull; 9.4 CGPA</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>ISO 216 &bull; 210 × 297 MM</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">100% VECTOR PDF READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 5: #tailor (JOB DESCRIPTION MATCHER & KEYWORD GAP SCANNER)
          ========================================================================= */}
      <section
        id="tailor"
        ref={tailorRef}
        className="relative h-[250vh] bg-[#F8F7F3] dark:bg-[#100F0C] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left: Job Posting Card */}
            <div className="lg:col-span-5 space-y-4 z-10">
              <div>
                <h2 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Tailor<span className="text-emerald-700 dark:text-emerald-400">.</span>
                </h2>
              </div>

              <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
                05 / TARGET JOB MATCHER
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Paste any target Job Description. Our engine maps missing keywords in real time, automatically draws match threads, and aligns your bullets to recruiter criteria.
              </p>

              {/* Posting Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 font-bold">
                      TARGET JOB POSTING
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      Lead Cloud Infrastructure Engineer
                    </h4>
                    <p className="text-[11px] text-slate-500">Stripe &bull; Remote / Hybrid</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{currentTailorScore}%</div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">KEYWORD FIT</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Looking for someone who will lead our <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-1 rounded font-semibold">Kubernetes platform</span>, manage <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 px-1 rounded font-semibold">multi-region microservices</span>, and enforce strict reliability.
                </div>
              </div>
            </div>

            {/* Center / Right: Connected Resume Canvas via Curved Thread */}
            <div className="lg:col-span-7 relative z-10">
              {/* Dynamic Thread Line that draws with scroll */}
              <svg className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 w-28 h-48 pointer-events-none z-20" viewBox="0 0 100 200">
                <path
                  d="M 0 50 C 50 50, 50 80, 100 80"
                  stroke="#15803D"
                  strokeWidth="2.5"
                  strokeDasharray="300"
                  strokeDashoffset={threadDashOffset}
                  fill="none"
                />
              </svg>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xl text-slate-900">
                <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                  <span className="font-bold text-sm">Tailored Resume Impact Output</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    Target Alignment: {currentTailorScore}%
                  </span>
                </div>
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Matched Keyword: Kubernetes Platform</span>
                    Architected high-throughput microservices handling 12M daily requests on AWS EKS, reducing p99 API latency by 42%.
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Matched Keyword: Multi-Region Microservices</span>
                    Scaled cross-region data replication across 3 clusters with zero data discrepancy and automated failover in under 4 seconds.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCENE 6: #pathways (TARGET CAREER PATHWAYS: FRESHER VS EXPERIENCED VS EXEC)
          ========================================================================= */}
      <section
        id="pathways"
        className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
            06 / TAILORED FOR YOUR CAREER STAGE
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Built for Every Stage<span className="text-emerald-700 dark:text-emerald-400">.</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Whether you&apos;re a college grad or VP of Engineering, our engine adapts section priorities and phrasing.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="inline-flex p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-full border border-black/[0.05] mt-4">
            {[
              { id: 'fresher', label: 'College & Fresher', icon: GraduationCap },
              { id: 'experienced', label: 'Mid-Senior Specialist', icon: Briefcase },
              { id: 'executive', label: 'Tech Lead & Director', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePathway(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activePathway === tab.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Pathway Card Display with Real Live Template Preview */}
        {(() => {
          const currentData = PATHWAY_DATA[activePathway];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              {/* Left Column: Spec Priorities & Before/After Impact */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-300 dark:border-emerald-800">
                    {currentData.stage}
                  </span>
                  <span className="text-xs font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-semibold">
                    {currentData.badge}
                  </span>
                </div>

                {/* 3 Priority Spec Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentData.priorities.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                          {item.tag}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1.5 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real Before vs After STAR Transformation Box */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
                      STAR Formula Phrasing Audit
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      HIGH CONVERSION
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Before */}
                    <div className="p-3 rounded-lg bg-red-50/70 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/40">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-700 dark:text-red-400 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Weak / Passive Phrasing (Low ATS Visibility):
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic">
                        &ldquo;{currentData.beforeAfter.before}&rdquo;
                      </p>
                    </div>

                    {/* After */}
                    <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Architected STAR Phrasing (Target Score: 98/100):
                      </div>
                      <p className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                        &ldquo;{currentData.beforeAfter.after}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Action */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/create?template=${currentData.templateId}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-md transition-all cursor-pointer"
                  >
                    <span>{currentData.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[11px] font-mono text-slate-500">
                    Preloaded with {currentData.name}&apos;s verified credentials
                  </span>
                </div>
              </div>

              {/* Right Column: Miniature Visual Live A4 Template Card */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[340px] sm:max-w-[380px] relative group">
                  {/* Subtle Glow */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/15 via-transparent to-emerald-700/15 blur-md opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Document Card Frame */}
                  <div className="relative rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <TemplateCardRealPreview
                      templateId={currentData.templateId}
                      themeColor="#15803d"
                      customRole={currentData.role}
                      customName={currentData.name}
                      className="shadow-inner"
                    />

                    {/* Interactive Overlay on Hover */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all flex items-center justify-center p-4">
                      <Link
                        href={`/create?template=${currentData.templateId}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
                      >
                        <span>Open {currentData.templateName.split(' ')[0]} in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Card Footer Badge */}
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {currentData.templateName}
                    </span>
                    <Link
                      href={`/create?template=${currentData.templateId}`}
                      className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      <span>Preview</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
          PROVEN ROLE RESUME EXAMPLES & BLUEPRINTS GALLERY
          ========================================================================= */}
      <section id="role-examples" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <HomeRoleExamplesGallery />
      </section>

      {/* =========================================================================
          PRICING & SOCIAL PROOF: Transparent Pricing Plans
          ========================================================================= */}
      <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
            07 / TRANSPARENT PRICING
          </div>
          <h2 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            Honest Plans<span className="text-emerald-700 dark:text-emerald-400">.</span>
          </h2>
          <p className="font-serif text-xl sm:text-2xl italic text-slate-700 dark:text-slate-300">
            Build free forever. Upgrade when you need unlimited AI tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Forever Tier */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold">
                  STARTER
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  FREE FOREVER
                </span>
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                $0 <span className="text-base font-sans font-normal text-slate-400">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Everything you need to build and export a job-ready ATS resume.
              </p>

              <ul className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Full Access to All 12+ Templates</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unlimited High-Res Vector PDF Exports</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Basic ATS Compliance Audit</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 10 Free AI STAR Bullet Re-writes</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 0 Watermarks Guaranteed</li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/create"
                className="w-full text-center block py-3 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white transition-all"
              >
                Start Free Now
              </Link>
            </div>
          </div>

          {/* Pro Career Tier */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-emerald-600 dark:border-emerald-500 shadow-xl space-y-6 relative flex flex-col justify-between">
            <div className="absolute -top-3 right-6 bg-emerald-700 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full font-bold">
              MOST POPULAR
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                  CAREER PRO
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  ALL-INCLUSIVE
                </span>
              </div>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                $9 <span className="text-base font-sans font-normal text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                For active job seekers who want to tailor to multiple roles.
              </p>

              <ul className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> <strong>Unlimited</strong> AI STAR Optimizations</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Instant Job Description Tailor &amp; Keyword Match</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> AI Cover Letter Generator</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Custom Hosted Web Links &amp; Passwords</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Live ATS Fix Assistant &amp; Export Formats</li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/create"
                className="w-full text-center block py-3 rounded-full text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-all cursor-pointer"
              >
                Upgrade to Career Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHY RESUMEBUILDER HONEST COMPARISON MATRIX
          ========================================================================= */}
      <section id="comparison" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <HomeComparisonMatrix />
      </section>

      {/* =========================================================================
          FAQ: Asked and answered.
          ========================================================================= */}
      <section id="faq" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-2">
                QUESTIONS
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-normal text-slate-900 dark:text-white">
                Asked and<br />
                <span className="italic text-emerald-700 dark:text-emerald-400">answered.</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Straight answers before you begin crafting your resume.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {[
              {
                q: 'Will my resume pass Applicant Tracking Systems (ATS)?',
                a: 'Yes, 100%. All ResumeBuilder templates output clean, standards-compliant vector PDFs. Recruiter software like Greenhouse, Workday, Taleo, and Lever parse the headings and text without glitching or dropping sections.',
              },
              {
                q: 'How does the AI STAR bullet re-writer work?',
                a: 'It analyzes your draft and extracts the action, metric, and outcome. If you are missing quantifiable numbers, it prompts you for estimates (e.g. latency, revenue, team size) and structures your sentence for maximum recruiter impact.',
              },
              {
                q: 'Can I export to PDF without any watermarks?',
                a: 'Yes! Even on our free plan, every PDF export is completely watermark-free, vector-rendered at 1200 DPI, and ready for immediate job application submissions.',
              },
              {
                q: 'Can I import an existing PDF or LinkedIn profile?',
                a: 'Yes. You can upload an existing PDF resume or paste your LinkedIn experience. Our parser populates your fields instantly so you never have to start from scratch.',
              },
              {
                q: 'Is my personal information secure?',
                a: 'All data is encrypted in transit and at rest. We never sell your career information to third-party recruiters or data brokers.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-serif text-base sm:text-lg text-slate-900 dark:text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl font-light text-slate-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA & EDITORIAL FOOTER
          ========================================================================= */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 text-center border-t border-black/[0.06] dark:border-white/[0.08] max-w-5xl mx-auto space-y-6">
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold">
          LAND YOUR NEXT OFFER
        </span>
        <h2 className="font-serif text-5xl sm:text-7xl font-normal tracking-tight text-slate-900 dark:text-white">
          Put it all on <span className="italic text-emerald-700 dark:text-emerald-400">one page.</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          It takes less than 3 minutes to build a professional, recruiter-ready resume.
        </p>

        <div className="pt-4">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Build Your Resume Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Universal Typographic Editorial Brand Footer */}
      <RxFooter />
    </div>
  );
}

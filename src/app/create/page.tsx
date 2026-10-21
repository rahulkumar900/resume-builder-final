'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  TrendingUp,
  Sliders,
  Check,
  Star,
  Users,
  UploadCloud,
  FileText,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  FolderGit2,
  Languages,
  FileCheck,
  Code,
  RotateCcw,
  Wrench,
} from 'lucide-react';
import { TEMPLATES, getDefaultSectionOrder } from '@/lib/templates';
import { createCustomResume, saveResume } from '@/lib/storage';
import { TemplateId, ResumeData } from '@/types/resume';
import { ResumeTemplateCard } from '@/components/common/ResumeTemplateCard';
import { getRecommendedTemplates, getDynamicSections } from '@/lib/onboarding-logic';
import { transformExtractedToResumeData } from '@/lib/resume-transformer';
import { useAuth } from '@/context/AuthContext';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';

const POPULAR_ROLES = [
  'Frontend Developer',
  'Full Stack Engineer',
  'Product Manager',
  'Data Scientist',
  'UI/UX Designer',
  'DevOps Engineer',
  'Marketing Specialist',
  'Financial Analyst',
  'Project Manager',
  'Account Executive',
];

const EXPERIENCE_LEVELS = [
  {
    id: 'entry',
    label: 'Fresher / Entry-Level',
    years: '0 - 2 years',
    desc: 'Fresh graduate, career changer, or building your first industry track record.',
    icon: Sparkles,
  },
  {
    id: 'experienced',
    label: 'Experienced Professional',
    years: '3+ years',
    desc: 'Demonstrated experience executing complex projects with measurable impact.',
    icon: TrendingUp,
  },
];

const COLOR_PALETTES = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Deep Slate', hex: '#1e293b' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Violet Indigo', hex: '#7c3aed' },
  { name: 'Warm Amber', hex: '#d97706' },
  { name: 'Rose Red', hex: '#e11d48' },
];

function CreateResumeFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();
  const realName = profile?.full_name || user?.user_metadata?.full_name || '';

  const queryTemplate = (searchParams.get('template') as TemplateId) || 'prawira';
  const queryRole = searchParams.get('targetRole') || searchParams.get('role');
  const initialStep = searchParams.get('step') ? parseInt(searchParams.get('step') as string, 10) : 1;

  const [step, setStep] = useState<number>(initialStep);
  const [targetRole, setTargetRole] = useState(queryRole || '');
  const [fullName, setFullName] = useState(realName || '');
  const [hasPendingJd, setHasPendingJd] = useState(false);

  useEffect(() => {
    if (queryRole) {
      setTargetRole(queryRole);
    }
  }, [queryRole]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pending = sessionStorage.getItem('kindley_pending_jd');
      if (pending && pending.trim().length > 0) {
        setHasPendingJd(true);
      }
    }
  }, []);

  useEffect(() => {
    const s = searchParams.get('step');
    if (s) {
      const parsed = parseInt(s, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 4) {
        setStep(parsed);
      }
    } else {
      setStep(1);
    }
  }, [searchParams]);

  useEffect(() => {
    if (realName && !fullName) {
      setFullName(realName);
    }
  }, [realName, fullName]);
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'experienced'>('entry');
  const [experienceYears, setExperienceYears] = useState<'0-1' | '1-2' | '2-3' | '4+'>('1-2');
  const [creationMethod, setCreationMethod] = useState<'new' | 'upload'>('new');
  
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(queryTemplate);
  const [selectedColor, setSelectedColor] = useState('#2563eb');
  const [categoryFilter, setCategoryFilter] = useState<'recommended' | 'all' | 'ats' | 'creative'>('recommended');
  const [isCreating, setIsCreating] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Review step state for extracted resume
  const [extractedReview, setExtractedReview] = useState<any | null>(null);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [reviewRole, setReviewRole] = useState('');
  const [reviewTemplate, setReviewTemplate] = useState<TemplateId>(queryTemplate);
  const [showRawJson, setShowRawJson] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
  });

  const toggleSectionExpand = (secId: string) => {
    setExpandedSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  const toggleSectionSelect = (secId: string) => {
    setSelectedSections((prev) =>
      prev.includes(secId) ? prev.filter((s) => s !== secId) : [...prev, secId]
    );
  };

  const triggerExtraction = async () => {
    if (!uploadFile && !pastedText.trim()) {
      alert('Please select a resume file (.pdf/.docx) or paste your resume text first.');
      return;
    }
    setIsCreating(true);
    try {
      const formData = new FormData();
      if (uploadFile) formData.append('file', uploadFile);
      if (pastedText.trim()) formData.append('text', pastedText.trim());
      formData.append('targetMarket', 'global');
      formData.append('autoMagic', 'true');

      const response = await fetch('/api/extract-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const chosenTemplate = (result.recommendedTemplate as TemplateId) || selectedTemplate || 'ats';
        const detectedRole = result.recommendedRole || targetRole || 'Professional';

        // Transform into 100% compliant ResumeData
        const normalized = transformExtractedToResumeData({
          extracted: result,
          templateId: chosenTemplate,
          targetRole: detectedRole,
          themeColor: selectedColor || '#2563eb',
        });

        setExtractedReview({ ...result, resumeData: normalized });
        setReviewRole(detectedRole);
        setTargetRole(detectedRole);
        setReviewTemplate(chosenTemplate);
        setSelectedTemplate(chosenTemplate);

        const recSecs: string[] = Array.isArray(result.recommendedSections) && result.recommendedSections.length > 0
          ? result.recommendedSections
          : ['personal', 'experience', 'education', 'skills'];
        setSelectedSections(recSecs);

        if (normalized.personalInfo.fullName) {
          setFullName(normalized.personalInfo.fullName);
        }
      } else {
        const errText = await response.text();
        console.error('Failed to extract:', errText);
        alert('Failed to parse resume document. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to resume extraction service.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleConfirmAndProceedToEditor = () => {
    if (!extractedReview) return;

    const newResumeId = `resume-${Date.now()}`;
    const chosenTemplate = reviewTemplate || 'ats';

    // Use transformExtractedToResumeData to ensure 100% schema accuracy
    const finalResume = transformExtractedToResumeData({
      id: newResumeId,
      extracted: extractedReview,
      templateId: chosenTemplate,
      targetRole: reviewRole || 'Professional',
      themeColor: selectedColor || '#2563eb',
      selectedSections,
      candidateName: fullName,
    });

    // Save directly into kindley_resumes_v1 and localStorage key
    saveResume(finalResume);

    router.push(`/builder/${finalResume.id}`);
  };

  const renderReviewSectionCard = (
    secId: string,
    title: string,
    Icon: React.ElementType,
    children: React.ReactNode,
    itemCount: number
  ) => {
    const isSelected = selectedSections.includes(secId);
    const isExpanded = !!expandedSections[secId];

    return (
      <div
        key={secId}
        className={`rounded-xl border transition-all ${
          isSelected
            ? 'border-emerald-300 dark:border-emerald-700 bg-white dark:bg-[#161614] shadow-2xs'
            : 'border-slate-200 dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] opacity-60'
        }`}
      >
        <div className="p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <input
              type="checkbox"
              id={`sec-chk-${secId}`}
              checked={isSelected}
              onChange={() => toggleSectionSelect(secId)}
              className="w-4 h-4 text-emerald-700 rounded border-slate-300 cursor-pointer shrink-0"
            />
            <label
              htmlFor={`sec-chk-${secId}`}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2 truncate">
                  <span>{title}</span>
                  {itemCount > 0 && (
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.08] px-1.5 py-0.2 rounded-full border border-slate-200 dark:border-white/10">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">• Included</span>
                  )}
                </div>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={() => toggleSectionExpand(secId)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
            title={isExpanded ? 'Collapse' : 'Expand preview'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isExpanded && isSelected && (
          <div className="px-4 pb-4 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
            {children}
          </div>
        )}
      </div>
    );
  };
  
  // Recommend templates based on role
  const recommendedIds = getRecommendedTemplates(targetRole);

  useEffect(() => {
    // If they change role and they are on recommended filter, we can auto-select the first recommended template
    if (categoryFilter === 'recommended' && recommendedIds.length > 0) {
      if (!recommendedIds.includes(selectedTemplate)) {
        setSelectedTemplate(recommendedIds[0]);
      }
    }
  }, [targetRole, categoryFilter]);

  // Filter templates
  const filteredTemplates = TEMPLATES.filter((tpl) => {
    if (categoryFilter === 'recommended') return recommendedIds.includes(tpl.id);
    if (categoryFilter === 'ats') return tpl.id === 'ats' || tpl.layout === 'single';
    if (categoryFilter === 'creative') return tpl.id === 'santoso' || tpl.id === 'rahadian' || tpl.id === 'chastain';
    return true; // 'all'
  });

  const handleFinishAndCreate = async (chosenTemplateId: TemplateId, colorOverride?: string) => {
    setIsCreating(true);
    try {
      const expLevel = experienceLevel === 'entry' ? 'entry' : (experienceYears === '0-1' || experienceYears === '1-2' ? 'entry' : experienceYears === '2-3' ? 'mid' : 'senior');
      const sectionOrder = getDynamicSections(targetRole, experienceLevel, experienceYears);

      if (creationMethod === 'upload' && (pastedText.trim().length > 0 || uploadFile)) {
        // AI Extraction Flow
        const formData = new FormData();
        if (uploadFile) formData.append('file', uploadFile);
        if (pastedText.trim()) formData.append('text', pastedText.trim());
        formData.append('targetMarket', 'global'); // or pass based on user selection

        const response = await fetch('/api/extract-resume', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const newResumeId = `resume-${Date.now()}`;
          const newResume = {
            id: newResumeId,
            name: `${targetRole.trim() || 'Software Engineer'} Resume`,
            templateId: chosenTemplateId,
            lastModified: new Date().toISOString(),
            themeColor: colorOverride || selectedColor,
            experienceLevel: expLevel,
            sectionOrder: data.sectionOrder || sectionOrder,
            typography: { primaryFont: 'Inter', secondaryFont: 'Inter', lineHeight: 1.5 },
            layout: { format: 'A4', dateFormat: 'Short Name (Jan YYYY)', margins: { topBottom: 0.5, leftRight: 0.5, headerFooter: 0.5 }, spacing: { betweenSections: 12, betweenTitlesContent: 6, betweenBlocks: 8, insideBlock: 4 } },
            ...data
          };
          
          saveResume(newResume as unknown as ResumeData);
          localStorage.setItem(newResumeId, JSON.stringify(newResume));
          
          const allResumesJson = localStorage.getItem('all_resumes') || '[]';
          const allResumes = JSON.parse(allResumesJson);
          allResumes.push({
            id: newResumeId,
            name: newResume.name,
            templateId: newResume.templateId,
            lastModified: newResume.lastModified
          });
          localStorage.setItem('all_resumes', JSON.stringify(allResumes));

          router.push(`/builder/${newResumeId}`);
        } else {
          console.error('Failed to extract:', await response.text());
          setIsCreating(false);
          alert('Failed to parse resume text. Please try again.');
        }
      } else {
        // Fresh Blank Resume Creation
        const finalRole = targetRole.trim();
        const newResume = createCustomResume({
          title: finalRole ? `${finalRole} Resume` : 'Untitled Resume',
          targetRole: finalRole,
          fullName: fullName.trim() || realName || '',
          templateId: chosenTemplateId,
          themeColor: colorOverride || selectedColor,
          experienceLevel: expLevel,
          starterType: 'blank',
          sectionOrder,
        });

        router.push(`/builder/${newResume.id}`);
      }
    } catch (e) {
      console.error('Failed to create resume:', e);
      setIsCreating(false);
    }
  };

  const handleNext = async () => {
    if (step === 1 && creationMethod === 'upload') {
      await triggerExtraction();
      return;
    }
    const nextStep = Math.min(step + 1, 4);
    setStep(nextStep);
    const p = new URLSearchParams(searchParams.toString());
    p.set('step', String(nextStep));
    router.push(`/create?${p.toString()}`);
  };

  const handleBack = () => {
    if (extractedReview) {
      setExtractedReview(null);
      return;
    }
    if (step > 1) {
      const prevStep = Math.max(step - 1, 1);
      setStep(prevStep);
      const p = new URLSearchParams(searchParams.toString());
      p.set('step', String(prevStep));
      router.push(`/create?${p.toString()}`);
      return;
    }
    // If on Step 1, go back in history if available, else fallback to home
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const stepTitles = [
    "Method",
    "Role",
    "Experience",
    "Template"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Header */}
      <header className="w-full bg-[#F8F7F3]/95 dark:bg-[#100F0C]/95 backdrop-blur-md border-b border-border sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Back"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Stepper Progress */}
          {extractedReview ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Reviewing Extracted Resume</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono font-semibold overflow-x-auto">
              {stepTitles.map((title, index) => {
                const num = index + 1;
                const isActive = step === num;
                const isPast = step > num;
                return (
                  <div key={num} className="flex items-center gap-2 sm:gap-4">
                    <button
                      onClick={() => setStep(num)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                          : isPast
                          ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200/80'
                          : 'bg-secondary text-slate-500 dark:text-slate-400 hover:bg-black/[0.08]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full text-center flex items-center justify-center text-[10px] ${isActive ? 'bg-white/20' : isPast ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-black/[0.08] dark:bg-white/[0.1] text-slate-500'}`}>
                        {num}
                      </span>
                      <span className="hidden sm:inline">{title}</span>
                      {isPast && <CheckCircle2 className="w-3.5 h-3.5 ml-0.5 hidden sm:inline" />}
                    </button>
                    {num < 4 && <div className="w-4 sm:w-8 h-0.5 bg-black/[0.08] dark:bg-white/[0.08] shrink-0"></div>}
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 hidden md:block">
            {extractedReview ? 'Review Mode' : `Step ${step} of 4`}
          </div>
        </div>
      </header>

      {/* Main Flow Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 flex flex-col justify-center">
        {hasPendingJd && !extractedReview && (
          <div className="max-w-2xl mx-auto w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-100/60 to-emerald-50/40 dark:from-emerald-950/40 dark:to-emerald-900/20 border border-emerald-300/60 dark:border-emerald-800/40 flex items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Job Description Attached for Tailoring</p>
                <p className="text-slate-600">Once your template is chosen, our AI will automatically optimize your bullets and skills for this role.</p>
              </div>
            </div>
            <span className="shrink-0 px-2 py-1 rounded-md bg-emerald-100/70 text-emerald-800 font-bold text-[11px]">
              Ready
            </span>
          </div>
        )}

        {extractedReview ? (
          <div className="max-w-4xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-16">
            {/* Header Card */}
            <div className="bg-white dark:bg-[#161614] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    AI Extracted Successfully
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Gemini 3.6 Flash</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Review Extracted Resume
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspect the extracted text below, toggle the sections you want in your resume, and confirm your role &amp; template before entering the editor.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setExtractedReview(null)}
                  className="px-3.5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] rounded-xl border border-slate-200 dark:border-white/[0.08] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Upload Different File</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAndProceedToEditor}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Go Next &rarr;</span>
                </button>
              </div>
            </div>

            {/* Role, Candidate & Template Confirmation Card */}
            <div className="bg-white dark:bg-[#161614] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Target Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Job Role
                </label>
                <input
                  type="text"
                  value={reviewRole}
                  onChange={(e) => setReviewRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Template */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Template
                  </label>
                  <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                    Recommended: {extractedReview.recommendedTemplate?.toUpperCase() || 'ATS'}
                  </span>
                </div>
                <select
                  value={reviewTemplate}
                  onChange={(e) => setReviewTemplate(e.target.value as TemplateId)}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 capitalize cursor-pointer"
                >
                  {TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.layout === 'double' ? '2-Column' : '1-Column'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sections Selector & Review Inspector */}
            <div className="bg-white dark:bg-[#161614] p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Extracted Resume Schema Sections</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedSections.length} sections selected. Check/uncheck sections to include or exclude them from your resume.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSections(['personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'])}
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 px-2.5 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSections(['personal', 'experience'])}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    Minimal
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setShowRawJson(!showRawJson)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>{showRawJson ? 'Hide Raw JSON' : 'View Raw JSON'}</span>
                  </button>
                </div>
              </div>

              {/* Raw JSON View */}
              {showRawJson && (
                <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-80 overflow-y-auto space-y-2 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>Full Raw JSON Output:</span>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(extractedReview, null, 2))}
                      className="text-slate-400 hover:text-white text-[10px] underline cursor-pointer"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap">{JSON.stringify(extractedReview, null, 2)}</pre>
                </div>
              )}

              {/* List of Extracted Sections */}
              <div className="space-y-3">
                {/* 1. Personal & Summary */}
                {renderReviewSectionCard('personal', 'Personal Details & Summary', Users, (
                  <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-50 dark:bg-white/[0.04] p-2.5 rounded-lg border border-slate-100 dark:border-white/[0.08]">
                      <div><span className="font-semibold text-slate-400">Name:</span> {extractedReview.resumeData?.personalInfo?.fullName || 'N/A'}</div>
                      <div><span className="font-semibold text-slate-400">Email:</span> {extractedReview.resumeData?.personalInfo?.email || 'N/A'}</div>
                      <div><span className="font-semibold text-slate-400">Phone:</span> {extractedReview.resumeData?.personalInfo?.phone || 'N/A'}</div>
                      <div><span className="font-semibold text-slate-400">Location:</span> {extractedReview.resumeData?.personalInfo?.location || 'N/A'}</div>
                    </div>
                    {extractedReview.resumeData?.personalInfo?.summary && (
                      <div className="bg-slate-50 dark:bg-white/[0.04] p-2.5 rounded-lg border border-slate-100 dark:border-white/[0.08]">
                        <span className="font-bold text-[11px] text-slate-500 dark:text-slate-400 uppercase block mb-1">Extracted Summary</span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">{extractedReview.resumeData.personalInfo.summary}</p>
                      </div>
                    )}
                  </div>
                ), 1)}

                {/* 2. Experience */}
                {renderReviewSectionCard('experience', 'Work Experience', Briefcase, (
                  <div className="space-y-2">
                    {(extractedReview.resumeData?.experience || []).map((exp: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 dark:bg-white/[0.04] p-3 rounded-lg border border-slate-100 dark:border-white/[0.08] text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">{exp.role} <span className="font-normal text-slate-500 dark:text-slate-400">at</span> {exp.company}</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{exp.startDate} - {exp.endDate || 'Present'}</span>
                        </div>
                        {exp.location && <div className="text-[11px] text-slate-400 mb-1.5">{exp.location}</div>}
                        {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-300 pl-1 text-[11px]">
                            {exp.highlights.map((h: string, hIdx: number) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.experience?.length || 0)}

                {/* 3. Education */}
                {renderReviewSectionCard('education', 'Education', GraduationCap, (
                  <div className="space-y-2">
                    {(extractedReview.resumeData?.education || []).map((edu: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 dark:bg-white/[0.04] p-3 rounded-lg border border-slate-100 dark:border-white/[0.08] text-xs flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{edu.degree}</div>
                          <div className="text-slate-600 dark:text-slate-300">{edu.school || edu.institution}</div>
                          {(edu.gpa || edu.score) && <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">Grade / Score: {edu.gpa || edu.score}</div>}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium shrink-0">
                          {edu.graduationDate || edu.endDate || edu.startDate || ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.education?.length || 0)}

                {/* 4. Skills */}
                {renderReviewSectionCard('skills', 'Skills & Technical Expertise', Wrench, (
                  <div className="space-y-2">
                    {(extractedReview.resumeData?.skills || []).map((cat: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 dark:bg-white/[0.04] p-2.5 rounded-lg border border-slate-100 dark:border-white/[0.08] text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1.5">{cat.category || 'Skills'}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(cat.items || []).map((skill: string, sIdx: number) => (
                            <span key={sIdx} className="px-2 py-0.5 bg-white dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 rounded-md text-[11px] font-medium text-slate-700 dark:text-slate-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.skills?.length || 0)}

                {/* 5. Projects */}
                {renderReviewSectionCard('projects', 'Projects', FolderGit2, (
                  <div className="space-y-2">
                    {(extractedReview.resumeData?.projects || []).map((proj: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                          <span>{proj.title || proj.name}</span>
                          {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-emerald-700 text-[11px] font-normal hover:underline">{proj.link}</a>}
                        </div>
                        {Array.isArray(proj.highlights) && proj.highlights.length > 0 && (
                          <p className="text-slate-600 mb-1.5 text-[11px]">{proj.highlights[0]}</p>
                        )}
                        {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {proj.technologies.map((t: string, tIdx: number) => (
                              <span key={tIdx} className="px-1.5 py-0.2 bg-emerald-50 text-emerald-800 rounded text-[10px] font-medium">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.projects?.length || 0)}

                {/* 6. Certifications */}
                {renderReviewSectionCard('certifications', 'Certifications', Award, (
                  <div className="space-y-1.5">
                    {(extractedReview.resumeData?.certifications || []).map((cert: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-900">{cert.name}</span>
                          {cert.issuer && <span className="text-slate-500 ml-1.5">• {cert.issuer}</span>}
                        </div>
                        {cert.date && <span className="text-[11px] text-slate-400">{cert.date}</span>}
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.certifications?.length || 0)}

                {/* 7. Languages */}
                {renderReviewSectionCard('languages', 'Languages', Languages, (
                  <div className="flex flex-wrap gap-2">
                    {(extractedReview.resumeData?.languages || []).map((lang: any, idx: number) => (
                      <div key={idx} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-1.5">
                        <span className="font-bold">{lang.language || lang.name}</span>
                        {lang.proficiency && <span className="text-slate-400 text-[11px]">({lang.proficiency})</span>}
                      </div>
                    ))}
                  </div>
                ), extractedReview.resumeData?.languages?.length || 0)}
              </div>
            </div>

            {/* Bottom Bar for Review */}
            <div className="bg-white dark:bg-[#161614] p-5 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm flex items-center justify-between">
              <button
                type="button"
                onClick={() => setExtractedReview(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.08] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back / Re-Upload</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmAndProceedToEditor}
                className="px-8 py-3 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Confirm & Go to Editor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {step === 2 && (
              <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                    <Briefcase className="w-3.5 h-3.5" />
                    Career Target
                  </span>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    What job role are you applying for?
                  </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We'll use this to tailor your suggested skills, summary, and recommend the best templates.
              </p>
            </div>

            <div className="bg-white dark:bg-[#161614] p-6 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Target Job Title
                </label>
                <JobTitleAutocomplete
                  value={targetRole}
                  onChange={setTargetRole}
                  placeholder="e.g. Senior Frontend Engineer"
                  icon={<Briefcase className="w-4 h-4 text-slate-400" />}
                  autoFocus
                  className="py-2.5 bg-slate-50/50 dark:bg-[#100F0C] border-slate-200 dark:border-white/[0.08] rounded-xl text-sm font-semibold text-slate-900 dark:text-white"
                  onKeyDown={(e) => e.key === 'Enter' && targetRole && handleNext()}
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                  Popular Roles
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_ROLES.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRole(role)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                        targetRole === role
                          ? 'bg-emerald-700 text-white font-bold shadow-xs'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-white/[0.1]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <TrendingUp className="w-3.5 h-3.5" />
                Background
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                What is your experience level?
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                This helps us structure your resume sections. For example, freshers should highlight projects and education first.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXPERIENCE_LEVELS.map((lvl) => {
                  const Icon = lvl.icon;
                  const isSelected = experienceLevel === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => setExperienceLevel(lvl.id as any)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-600 shadow-md'
                          : 'bg-white dark:bg-[#161614] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isSelected ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">{lvl.label}</div>
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{lvl.years}</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-emerald-700 bg-emerald-700' : 'border-slate-300 dark:border-white/20'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{lvl.desc}</p>
                    </div>
                  );
                })}
              </div>
              
              {experienceLevel === 'experienced' && (
                <div className="mt-6 p-5 bg-white dark:bg-[#161614] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-sm animate-in slide-in-from-top-2 fade-in duration-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3 text-center">
                    Exactly how many years of experience?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['0-1', '1-2', '2-3', '4+'].map((years) => (
                      <button
                        key={years}
                        type="button"
                        onClick={() => setExperienceYears(years as any)}
                        className={`text-sm py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                          experienceYears === years
                            ? 'bg-emerald-700 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        {years} {years === '4+' ? 'years' : 'yrs'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <FileText className="w-3.5 h-3.5" />
                Creation Method
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                How would you like to start?
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We can pre-fill your resume with AI suggestions or import an existing document.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div
                onClick={() => setCreationMethod('new')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                  creationMethod === 'new'
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-600 shadow-md'
                    : 'bg-white dark:bg-[#161614] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]'
                }`}
              >
                <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${creationMethod === 'new' ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'}`}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Create New Resume</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Start with a fresh clean resume tailored for your target role. Add your details with on-demand AI assistance and instant ATS scoring.
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${creationMethod === 'new' ? 'border-emerald-700 bg-emerald-700' : 'border-slate-300 dark:border-white/20'}`}>
                  {creationMethod === 'new' && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>

              <div
                onClick={() => setCreationMethod('upload')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-4 ${
                  creationMethod === 'upload'
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-600 shadow-md'
                    : 'bg-white dark:bg-[#161614] border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${creationMethod === 'upload' ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Upload Existing Resume</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Paste your old resume text below (PDF upload coming soon) and we will instantly build a new resume.
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${creationMethod === 'upload' ? 'border-emerald-700 bg-emerald-700' : 'border-slate-300 dark:border-white/20'}`}>
                    {creationMethod === 'upload' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                {creationMethod === 'upload' && (
                  <div className="mt-4 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                    <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl p-6 text-center hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors">
                      <input 
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setUploadFile(file);
                        }}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <UploadCloud className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {uploadFile ? uploadFile.name : "Click to upload PDF or DOCX"}
                        </span>
                        {!uploadFile && <span className="text-xs text-slate-500 dark:text-slate-400">Max 5MB</span>}
                      </label>
                    </div>
                    
                    <div className="text-center relative">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/[0.08]"></div></div>
                      <span className="relative bg-white dark:bg-[#161614] px-2 text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">OR PASTE TEXT</span>
                    </div>

                    <textarea 
                      value={pastedText}
                      onChange={(e) => setPastedText(e.target.value)}
                      placeholder="Paste your LinkedIn export or resume text here..."
                      className="w-full h-24 p-3 text-sm border-2 border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white rounded-xl focus:border-emerald-600 focus:outline-none"
                    />

                    <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {uploadFile ? `Selected: ${uploadFile.name}` : pastedText.trim() ? `${pastedText.trim().split(/\s+/).length} words ready` : 'Choose a file or paste text'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerExtraction();
                        }}
                        disabled={isCreating || (!uploadFile && !pastedText.trim())}
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {isCreating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Extracting with AI...</span>
                          </>
                        ) : (
                          <>
                            <span>Extract & Review Resume</span>
                            <Sparkles className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-6xl mx-auto w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center space-y-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <Layers className="w-3.5 h-3.5" />
                Template
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Choose your template
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                We've recommended templates that perform best for {targetRole || 'your role'}.
              </p>
            </div>

            {/* Template Filters */}
            <div className="flex items-center justify-center gap-2 pb-4">
              <button
                onClick={() => setCategoryFilter('recommended')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  categoryFilter === 'recommended'
                    ? 'bg-emerald-800 dark:bg-emerald-600 text-white'
                    : 'bg-white dark:bg-[#161614] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Star className="w-3.5 h-3.5" /> Recommended
              </button>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-emerald-800 dark:bg-emerald-600 text-white'
                    : 'bg-white dark:bg-[#161614] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                All Templates
              </button>
              <button
                onClick={() => setCategoryFilter('ats')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  categoryFilter === 'ats'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                ATS-Friendly
              </button>
              <button
                onClick={() => setCategoryFilter('creative')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  categoryFilter === 'creative'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Creative
              </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <ResumeTemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onSelect={(id, color) => {
                    setSelectedTemplate(id);
                    if (color) setSelectedColor(color);
                  }}
                  initialColor={selectedColor}
                />
              ))}
            </div>
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                No templates found for this filter.
              </div>
            )}
          </div>
        )}
      </>
    )}

    {/* Floating Navigation Footer */}
    {!extractedReview && (
      <>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-[#100F0C]/90 backdrop-blur-md border-t border-slate-200 dark:border-white/10 flex justify-center z-40">
          <div className="max-w-4xl w-full flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={step === 2 && !targetRole.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm transition-all disabled:opacity-50"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleFinishAndCreate(selectedTemplate, selectedColor)}
                disabled={isCreating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Generating Resume...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Finish & Build Resume
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        {/* Spacer for fixed footer */}
        <div className="h-20" />
      </>
    )}
  </main>
    </div>
  );
}

export default function CreateResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full" /></div>}>
      <CreateResumeFlow />
    </Suspense>
  );
}

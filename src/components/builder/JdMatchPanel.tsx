'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Building,
  Briefcase,
  Layers,
  TrendingUp,
  Zap,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Calendar,
  X,
  Copy,
} from 'lucide-react';
import { ResumeData, SkillCategory } from '@/types/resume';
import { matchJobDescriptionKeywords, KeywordMatchResult } from '@/lib/ats/keyword-matcher';
import { SAMPLE_PRESET_JDS } from '@/lib/ai/job-tailor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface JdMatchPanelProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onOpenTailorStudio?: (jd: string) => void;
  onClose?: () => void;
}

export const JdMatchPanel: React.FC<JdMatchPanelProps> = ({
  resume,
  onChange,
  onOpenTailorStudio,
  onClose,
}) => {
  // Initialize with resume.targetJob if already saved, or empty
  const [jobDescription, setJobDescription] = useState<string>(
    resume.targetJob?.jobDescription || ''
  );
  const [targetTitle, setTargetTitle] = useState<string>(
    resume.targetJob?.title || resume.personalInfo?.jobTitle || ''
  );
  const [companyName, setCompanyName] = useState<string>(
    resume.targetJob?.company || ''
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'match' | 'jd'>('match');
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  // Keep targetJob synced back into resume data on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({
        targetJob: {
          title: targetTitle,
          company: companyName,
          jobDescription,
        },
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [jobDescription, targetTitle, companyName, onChange]);

  // Run live keyword match against candidate resume
  const keywordResult: KeywordMatchResult = useMemo(() => {
    return matchJobDescriptionKeywords(jobDescription, resume);
  }, [jobDescription, resume]);

  // Extract detected years of experience from JD text
  const detectedJdExperience = useMemo(() => {
    if (!jobDescription) return null;
    const match = jobDescription.match(/(\d+)\+?\s*(?:-\s*(\d+))?\s*(?:to\s*(\d+))?\s*years?(?:\s+of)?\s+(?:hands-on\s+)?experience/i);
    if (match) {
      return match[1] ? `${match[1]}+ years` : null;
    }
    return null;
  }, [jobDescription]);

  // Calculate candidate's approximate total years of experience from resume
  const candidateYearsExp = useMemo(() => {
    const exps = resume.experience || [];
    if (exps.length === 0) return 0;
    // Count number of distinct roles / estimation
    let totalMonths = 0;
    exps.forEach((exp) => {
      if (exp.startDate) {
        const start = new Date(exp.startDate).getTime();
        const end = exp.current || !exp.endDate ? Date.now() : new Date(exp.endDate).getTime();
        if (!isNaN(start) && !isNaN(end) && end > start) {
          totalMonths += (end - start) / (1000 * 60 * 60 * 24 * 30.4);
        } else {
          totalMonths += 12; // fallback estimate 1 year per role
        }
      } else {
        totalMonths += 12;
      }
    });
    return Math.max(1, Math.round(totalMonths / 12));
  }, [resume.experience]);

  // Check education degree mentioned in JD
  const detectedDegree = useMemo(() => {
    if (!jobDescription) return null;
    const jdLower = jobDescription.toLowerCase();
    if (jdLower.includes('master') || jdLower.includes('ms ') || jdLower.includes('m.s.')) return "Master's Degree";
    if (jdLower.includes('bachelor') || jdLower.includes('bs ') || jdLower.includes('b.s.') || jdLower.includes('b.tech') || jdLower.includes('degree')) return "Bachelor's Degree";
    return null;
  }, [jobDescription]);

  const candidateHighestDegree = useMemo(() => {
    const edus = resume.education || [];
    if (edus.length === 0) return null;
    return edus[0].degree || edus[0].school || null;
  }, [resume.education]);

  // Handle adding a missing skill directly to resume.skills
  const handleAddSkill = (skillName: string, category?: string) => {
    const currentCategories: SkillCategory[] = resume.skills || [];
    const targetCatName = category || 'Key Competencies';

    let updated: SkillCategory[];

    // Check if category exists
    const catIndex = currentCategories.findIndex(
      (c) => c.category?.toLowerCase() === targetCatName.toLowerCase()
    );

    if (catIndex >= 0) {
      const existing = currentCategories[catIndex];
      const items = existing.items || [];
      if (!items.some((i) => i.toLowerCase() === skillName.toLowerCase())) {
        const nextItems = [...items, skillName];
        updated = currentCategories.map((c, i) => (i === catIndex ? { ...c, items: nextItems } : c));
      } else {
        updated = currentCategories;
      }
    } else if (currentCategories.length > 0) {
      // Append to the first category if target category not present
      const first = currentCategories[0];
      const items = first.items || [];
      if (!items.some((i) => i.toLowerCase() === skillName.toLowerCase())) {
        updated = [
          { ...first, items: [...items, skillName] },
          ...currentCategories.slice(1),
        ];
      } else {
        updated = currentCategories;
      }
    } else {
      // Create fresh category
      updated = [
        {
          id: `sk-${Date.now()}`,
          category: targetCatName,
          items: [skillName],
        },
      ];
    }

    setAddedSkills((prev) => new Set(prev).add(skillName));
    onChange({ skills: updated });
  };

  // Preset selector
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = SAMPLE_PRESET_JDS.find((p) => p.id === presetId);
    if (found) {
      setJobDescription(found.text);
      setTargetTitle(found.role);
      setCompanyName(found.company);
    }
  };

  const matchRate = keywordResult.matchRate;

  // Determine badge colors and verdict
  const scoreBadge = useMemo(() => {
    if (!jobDescription || jobDescription.trim().length < 20) {
      return {
        label: 'No JD Entered',
        verdict: 'Paste a job description to calculate your live keyword match rate.',
        color: 'text-slate-500 dark:text-slate-400',
        stroke: '#94a3b8',
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      };
    }
    if (matchRate >= 80) {
      return {
        label: 'Excellent Match',
        verdict: 'High ATS keyword density. Your resume strongly matches recruiter scan criteria.',
        color: 'text-emerald-600 dark:text-emerald-400',
        stroke: '#059669',
        bg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      };
    }
    if (matchRate >= 60) {
      return {
        label: 'Good Match',
        verdict: 'Competitive candidate. Add 2–3 missing skills below to qualify for top-tier ranking.',
        color: 'text-blue-600 dark:text-blue-400',
        stroke: '#2563eb',
        bg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      };
    }
    if (matchRate >= 40) {
      return {
        label: 'Fair Match',
        verdict: 'Partial alignment. Essential hard skills from the job description are missing.',
        color: 'text-amber-600 dark:text-amber-400',
        stroke: '#d97706',
        bg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    }
    return {
      label: 'Low Match',
      verdict: 'High risk of ATS screen-out. Core job requirements are missing from your resume.',
      color: 'text-rose-600 dark:text-rose-400',
      stroke: '#e11d48',
      bg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
  }, [matchRate, jobDescription]);

  // Circular gauge math (radius = 38, circumference = 2 * Math.PI * 38 = 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (matchRate / 100) * circumference;

  return (
    <div className="flex flex-col h-full bg-slate-50/70 dark:bg-background overflow-hidden min-h-0 font-sans">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white dark:bg-card border-b border-slate-200/80 dark:border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Target Job Matcher</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                Live ATS Gauge
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-muted-foreground">
              Compare your resume against any job description side-by-side
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent transition-colors"
            title="Return to Write Mode"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Segmented Switcher (Match Overview vs Job Description Input) */}
      <div className="px-4 py-2 bg-white dark:bg-card border-b border-slate-200/60 dark:border-border/60 shrink-0">
        <div className="flex bg-slate-100 dark:bg-muted p-0.5 rounded-xl text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('match')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer text-xs font-semibold',
              activeTab === 'match'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Match Rate & Keywords</span>
            {keywordResult.totalJobKeywords > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                {matchRate}%
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jd')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all cursor-pointer text-xs font-semibold',
              activeTab === 'jd'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Job Description</span>
            {jobDescription && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-4">
        {activeTab === 'jd' ? (
          /* TAB 1: Job Description Input & Preset Selector */
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Sample Target Roles</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_PRESET_JDS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.id)}
                    className={cn(
                      'p-2.5 rounded-xl border text-left transition-all cursor-pointer text-xs',
                      selectedPresetId === preset.id
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <div className="font-semibold line-clamp-1">{preset.title}</div>
                    <div className="text-[10px] text-slate-400 dark:text-muted-foreground line-clamp-1 mt-0.5">
                      {preset.company}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Role & Company inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Target Job Title
                </label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={targetTitle}
                    onChange={(e) => setTargetTitle(e.target.value)}
                    className="h-8.5 pl-8 text-xs font-medium"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="e.g. Stripe, Google"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-8.5 pl-8 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Job Description Text
                </label>
                <span className="text-slate-400 font-mono">
                  {jobDescription.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={11}
                placeholder="Paste the full job posting, responsibilities, and required qualifications here..."
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setSelectedPresetId('custom');
                }}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y font-mono leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {jobDescription && (
                <button
                  type="button"
                  onClick={() => {
                    setJobDescription('');
                    setSelectedPresetId('');
                  }}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Text</span>
                </button>
              )}
              <Button
                type="button"
                onClick={() => setActiveTab('match')}
                disabled={!jobDescription || jobDescription.trim().length < 10}
                className="ml-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-8 px-4 rounded-xl cursor-pointer"
              >
                <span>Analyze Match Rate</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          /* TAB 2: Live Match Rate & Keyword Analysis */
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Empty State if no JD pasted */}
            {!jobDescription || jobDescription.trim().length < 20 ? (
              <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-border bg-white dark:bg-card text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    No Job Description Entered Yet
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Paste the target job requirements to see your real-time ATS match rate and missing keywords.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setActiveTab('jd')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold h-8.5 px-4 rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Paste Target Job Description</span>
                </Button>
              </div>
            ) : (
              <>
                {/* 1. The Real-time Radial Gauge Card */}
                <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-xs">
                  <div className="flex items-center gap-4">
                    {/* SVG Radial Progress Ring */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 96 96">
                        {/* Background Track */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="7"
                          fill="transparent"
                          className="text-slate-100 dark:text-muted/40"
                        />
                        {/* Dynamic Progress Arc */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          stroke={scoreBadge.stroke}
                          strokeWidth="7"
                          strokeLinecap="round"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>
                      {/* Center Score Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                          {matchRate}%
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          Match
                        </span>
                      </div>
                    </div>

                    {/* Verdict & Stat Breakdown */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold border', scoreBadge.bg)}>
                          {scoreBadge.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {scoreBadge.verdict}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[10.5px] font-mono text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          {keywordResult.matchedKeywords.length} Matched
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                          <AlertTriangle className="w-3 h-3" />
                          {keywordResult.missingKeywords.length} Missing
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Experience & Degree Quick Sanity Check */}
                  {(detectedJdExperience || detectedDegree) && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-border/60 grid grid-cols-2 gap-2 text-xs">
                      {detectedJdExperience && (
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-muted/40 border border-slate-200/60 dark:border-border/40">
                          <div className="text-[10px] text-slate-400 font-semibold">Experience Target</div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                            {detectedJdExperience}
                          </div>
                          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                            Your resume: ~{candidateYearsExp} yrs
                          </div>
                        </div>
                      )}
                      {detectedDegree && (
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-muted/40 border border-slate-200/60 dark:border-border/40">
                          <div className="text-[10px] text-slate-400 font-semibold">Education Target</div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                            {detectedDegree}
                          </div>
                          <div className="text-[9.5px] text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                            {candidateHighestDegree || 'Not specified'}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Missing Keywords & 1-Click "Add to Skills" */}
                {keywordResult.missingKeywords.length > 0 && (
                  <div className="p-4 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-white dark:bg-card shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                          Missing High-Priority Keywords ({keywordResult.missingKeywords.length})
                        </h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Click + to add</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      Recruiters and ATS scan for these exact terms. Click <strong className="font-semibold text-emerald-700 dark:text-emerald-400">+ Add</strong> to append them to your skills list and immediately boost your score:
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {keywordResult.missingKeywords.map((item) => {
                        const isJustAdded = addedSkills.has(item.keyword);
                        return (
                          <button
                            key={item.keyword}
                            type="button"
                            onClick={() => handleAddSkill(item.keyword, item.category)}
                            className={cn(
                              'group inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer',
                              isJustAdded
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold'
                                : 'bg-rose-50/60 dark:bg-rose-950/20 hover:bg-emerald-50 hover:border-emerald-300 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 hover:text-emerald-700'
                            )}
                            title={`Click to add "${item.keyword}" to your resume skills`}
                          >
                            {isJustAdded ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Plus className="w-3 h-3 text-rose-500 group-hover:text-emerald-600 transition-colors" />
                            )}
                            <span>{item.keyword}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Matched Keywords Verified in Resume */}
                {keywordResult.matchedKeywords.length > 0 && (
                  <div className="p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 bg-white dark:bg-card shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                          Verified Matched Keywords ({keywordResult.matchedKeywords.length})
                        </h3>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                        ✓ In Resume
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {keywordResult.matchedKeywords.map((item) => (
                        <span
                          key={item.keyword}
                          className="inline-flex items-center gap-1 px-2 py-0.8 rounded-lg text-xs font-medium bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300"
                        >
                          <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                          <span>{item.keyword}</span>
                          {item.count > 1 && (
                            <span className="text-[10px] font-mono opacity-70">
                              ({item.count}x)
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Instant Action to Launch AI Tailor Studio */}
                {onOpenTailorStudio && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-indigo-50/40 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-indigo-950/20 border border-emerald-200/70 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Need tailored bullet points?</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Let AI automatically rewrite your summary and experience bullets for this role.
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onOpenTailorStudio(jobDescription)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-8 px-3 rounded-xl cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      <span>Launch AI Studio</span>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

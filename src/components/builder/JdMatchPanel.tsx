'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Check,
  ChevronRight,
  FileText,
  Building,
  Briefcase,
  Layers,
  TrendingUp,
  Zap,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  UserCheck,
  Link2,
  Award,
  BarChart3,
  X,
  ExternalLink,
  ShieldAlert,
  ListChecks,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { ResumeData, SkillCategory } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import {
  analyzeJobDescriptionFit,
  JdAnalysisReport,
  MandatorySectionCheck,
  JdRequirementItem,
} from '@/lib/ats/jd-analyzer';
import { SAMPLE_PRESET_JDS } from '@/lib/ai/job-tailor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface JdMatchPanelProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onOpenTailorStudio?: (jd: string) => void;
  onNavigateSection?: (sectionKey: SectionKey) => void;
  onClose?: () => void;
}

type JdMatchTab = 'overview' | 'mandatory' | 'requirements' | 'skills' | 'jd';

export const JdMatchPanel: React.FC<JdMatchPanelProps> = ({
  resume,
  onChange,
  onOpenTailorStudio,
  onNavigateSection,
  onClose,
}) => {
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
  const [activeTab, setActiveTab] = useState<JdMatchTab>('overview');
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  // Debounced auto-save of targetJob into resume data
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

  // Master 360-degree JD Analysis Report
  const report: JdAnalysisReport = useMemo(() => {
    return analyzeJobDescriptionFit(jobDescription, resume);
  }, [jobDescription, resume]);

  // Handle adding a missing skill directly to resume.skills
  const handleAddSkill = (skillName: string, category?: string) => {
    const currentCategories: SkillCategory[] = resume.skills || [];
    const targetCatName = category || 'Key Competencies';

    let updated: SkillCategory[];

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

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = SAMPLE_PRESET_JDS.find((p) => p.id === presetId);
    if (found) {
      setJobDescription(found.text);
      setTargetTitle(found.role);
      setCompanyName(found.company);
    }
  };

  const score = report.overallScore;

  // Visual styling for overall score
  const scoreBadge = useMemo(() => {
    if (!jobDescription || jobDescription.trim().length < 20) {
      return {
        label: 'No JD Entered',
        stroke: '#94a3b8',
        bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-border',
      };
    }
    if (score >= 85) {
      return {
        label: 'Exceptional Fit',
        stroke: '#059669',
        bg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      };
    }
    if (score >= 70) {
      return {
        label: 'Strong Fit',
        stroke: '#10b981',
        bg: 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      };
    }
    if (score >= 55) {
      return {
        label: 'Moderate Match',
        stroke: '#d97706',
        bg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    }
    return {
      label: 'High Risk / Gaps',
      stroke: '#e11d48',
      bg: 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
  }, [score, jobDescription]);

  // Circular gauge math (radius = 38, circumference = 2 * Math.PI * 38 = 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const missingMandatoryCount = report.mandatorySections.filter((s) => s.status === 'missing').length;
  const missingReqCount = report.jdRequirements.filter((r) => r.status === 'missing').length;

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
              <span>Job Fit & Requirements Audit</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                360° Recruiter Scan
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-muted-foreground">
              Auditing mandatory sections, role requirements & technical keywords
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

      {/* Segmented Sub-Tab Switcher */}
      <div className="px-3 py-2 bg-white dark:bg-card border-b border-slate-200/60 dark:border-border/60 shrink-0">
        <div className="flex bg-slate-100 dark:bg-muted p-0.5 rounded-xl text-xs font-semibold gap-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer text-[11px] font-semibold min-h-[32px]',
              activeTab === 'overview'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
            title="Fit Overview & Score"
          >
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span>Overview</span>
            {score > 0 && (
              <span className="px-1.5 py-0.1 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                {score}%
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mandatory')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer text-[11px] font-semibold min-h-[32px]',
              activeTab === 'mandatory'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
            title="Mandatory Sections Health"
          >
            <ListChecks className="w-3.5 h-3.5 shrink-0" />
            <span>Sections</span>
            {missingMandatoryCount > 0 && (
              <span className="px-1.5 py-0.1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                {missingMandatoryCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('requirements')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer text-[11px] font-semibold min-h-[32px]',
              activeTab === 'requirements'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
            title="JD Requirements Audit (Experience, Degree, Certifications, Links)"
          >
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>Criteria</span>
            {missingReqCount > 0 && (
              <span className="px-1.5 py-0.1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {missingReqCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('skills')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer text-[11px] font-semibold min-h-[32px]',
              activeTab === 'skills'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
            title="Keywords & Hard Skills"
          >
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span>Keywords</span>
            {report.keywordMatch.missingKeywords.length > 0 && (
              <span className="px-1.5 py-0.1 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-muted text-slate-700 dark:text-slate-300">
                {report.keywordMatch.missingKeywords.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jd')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer text-[11px] font-semibold min-h-[32px]',
              activeTab === 'jd'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            )}
            title="Target Job Description Input"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Target JD</span>
            {jobDescription && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-4">
        {activeTab === 'jd' ? (
          /* TAB: Target Job Description Input & Presets */
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
                onClick={() => setActiveTab('overview')}
                disabled={!jobDescription || jobDescription.trim().length < 10}
                className="ml-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs h-8 px-4 rounded-xl cursor-pointer"
              >
                <span>Run 360° Fit Audit</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        ) : !jobDescription || jobDescription.trim().length < 20 ? (
          /* Empty State if no JD pasted */
          <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-border bg-white dark:bg-card text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                No Job Description Entered Yet
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Paste the target job description to audit mandatory resume sections, experience requirements, degree match, and technical keywords.
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
        ) : activeTab === 'overview' ? (
          /* TAB: Overview & Holistic Score */
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* 1. Main Radial Gauge Card */}
            <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-xs">
              <div className="flex items-center gap-4">
                {/* SVG Radial Progress Ring */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 96 96">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="7"
                      fill="transparent"
                      className="text-slate-100 dark:text-muted/40"
                    />
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                      {score}%
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Fit Score
                    </span>
                  </div>
                </div>

                {/* Verdict & Breakdown */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold border', scoreBadge.bg)}>
                      {report.verdict}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Grade: {report.grade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {report.verdictDescription}
                  </p>
                </div>
              </div>

              {/* 4 Pillars Breakdown Progress Bars */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-border/60 grid grid-cols-2 gap-2.5">
                {/* 1. Technical Keywords */}
                <div
                  onClick={() => setActiveTab('skills')}
                  className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-muted/30 border border-slate-200/60 dark:border-border/40 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span>Keywords</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {report.breakdown.skillsMatch.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-muted h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${report.breakdown.skillsMatch.score}%` }}
                    />
                  </div>
                  <div className="text-[9.5px] text-slate-400 mt-1">
                    {report.breakdown.skillsMatch.matchedCount} matched, {report.breakdown.skillsMatch.missingCount} missing
                  </div>
                </div>

                {/* 2. Mandatory Sections */}
                <div
                  onClick={() => setActiveTab('mandatory')}
                  className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-muted/30 border border-slate-200/60 dark:border-border/40 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <ListChecks className="w-3 h-3 text-emerald-500" />
                      <span>Sections</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {report.breakdown.mandatorySections.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-muted h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${report.breakdown.mandatorySections.score}%` }}
                    />
                  </div>
                  <div className="text-[9.5px] text-slate-400 mt-1">
                    {report.breakdown.mandatorySections.passedCount}/{report.breakdown.mandatorySections.totalCount} sections complete
                  </div>
                </div>

                {/* 3. Experience Alignment */}
                <div
                  onClick={() => setActiveTab('requirements')}
                  className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-muted/30 border border-slate-200/60 dark:border-border/40 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-500" />
                      <span>Experience</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {report.breakdown.experienceAlignment.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-muted h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${report.breakdown.experienceAlignment.score}%` }}
                    />
                  </div>
                  <div className="text-[9.5px] text-slate-400 mt-1 truncate">
                    ~{report.breakdown.experienceAlignment.actualYears} yrs vs {report.breakdown.experienceAlignment.requiredYears !== null ? `${report.breakdown.experienceAlignment.requiredYears}+ yrs` : 'Flexible'}
                  </div>
                </div>

                {/* 4. Education & Credentials */}
                <div
                  onClick={() => setActiveTab('requirements')}
                  className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-muted/30 border border-slate-200/60 dark:border-border/40 hover:border-slate-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-indigo-500" />
                      <span>Education</span>
                    </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {report.breakdown.educationAlignment.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-muted h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${report.breakdown.educationAlignment.score}%` }}
                    />
                  </div>
                  <div className="text-[9.5px] text-slate-400 mt-1 truncate">
                    {report.breakdown.educationAlignment.actualDegree || 'Listed in resume'}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Top Action Items (Prioritized Fixes) */}
            {report.actionItems.length > 0 && (
              <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Top Priority Fixes for This Job ({report.actionItems.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400">Recruiter Checklist</span>
                </div>

                <div className="space-y-2">
                  {report.actionItems.slice(0, 4).map((action) => (
                    <div
                      key={action.id}
                      className={cn(
                        'p-2.5 rounded-xl border text-xs flex items-start justify-between gap-3 transition-colors',
                        action.severity === 'critical'
                          ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20'
                          : 'border-slate-200 dark:border-border bg-slate-50/60 dark:bg-muted/30'
                      )}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full shrink-0',
                              action.severity === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                            )}
                          />
                          <span className="font-bold text-slate-900 dark:text-white">
                            {action.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-3">
                          {action.description}
                        </p>
                      </div>

                      {action.sectionKey && onNavigateSection && (
                        <button
                          type="button"
                          onClick={() => onNavigateSection(action.sectionKey!)}
                          className="shrink-0 text-[10.5px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer mt-0.5"
                        >
                          <span>Fix</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. AI Tailor Banner */}
            {onOpenTailorStudio && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-indigo-50/40 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-indigo-950/20 border border-emerald-200/70 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Auto-Tailor Summary & Bullets?</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Generate custom accomplishment bullets injected with missing JD keywords.
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
          </div>
        ) : activeTab === 'mandatory' ? (
          /* TAB: Mandatory Sections Health Check */
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <strong className="font-bold text-emerald-800 dark:text-emerald-300">ATS Mandatory Sections Audit:</strong>{' '}
              Recruiter screening systems require every resume to have fully populated contact info, summary, experience, education, and skills.
            </div>

            <div className="space-y-2.5">
              {report.mandatorySections.map((sec) => (
                <div
                  key={sec.id}
                  className={cn(
                    'p-3.5 rounded-xl border bg-white dark:bg-card shadow-2xs space-y-2 transition-all',
                    sec.status === 'passed'
                      ? 'border-emerald-200/70 dark:border-emerald-900/40'
                      : sec.status === 'warning'
                      ? 'border-amber-200/80 dark:border-amber-900/40'
                      : 'border-rose-200 dark:border-rose-900/60'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sec.status === 'passed' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : sec.status === 'warning' ? (
                        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <X className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {sec.name}
                        </span>
                        {sec.isRequiredByJd && (
                          <span className="ml-2 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                            Required
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {sec.score}%
                      </span>
                      {onNavigateSection && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => onNavigateSection(sec.sectionKey)}
                          className="h-6 px-2 text-[10px] font-semibold rounded-lg"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {sec.recommendation}
                  </p>

                  {sec.missingItems.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {sec.missingItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/50"
                        >
                          ⚠ {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'requirements' ? (
          /* TAB: Specific JD Requirements Audit */
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <strong className="font-bold text-blue-800 dark:text-blue-300">Job Qualification Matching:</strong>{' '}
              Verifying candidate experience duration, educational degree, role title, certifications, and portfolio links directly against criteria parsed from the JD.
            </div>

            <div className="space-y-2.5">
              {report.jdRequirements.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-xl border border-slate-200/90 dark:border-border bg-white dark:bg-card shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      {req.status === 'matched' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : req.status === 'partial' ? (
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {req.label}
                      </span>
                    </div>

                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0',
                        req.status === 'matched'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200'
                          : req.status === 'partial'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200'
                      )}
                    >
                      {req.status === 'matched' ? '✓ Matched' : req.status === 'partial' ? '⚠ Partial' : '✕ Missing'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] p-2 rounded-lg bg-slate-50 dark:bg-muted/40 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">JD Expected</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{req.expected}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Resume Actual</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 truncate block">
                        {req.actual}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {req.detail}
                  </p>

                  {req.recommendation && (
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-amber-700 dark:text-amber-400 text-[10.5px]">
                        💡 {req.recommendation}
                      </span>
                      {req.sectionKey && onNavigateSection && (
                        <button
                          type="button"
                          onClick={() => onNavigateSection(req.sectionKey!)}
                          className="text-emerald-700 dark:text-emerald-400 font-semibold text-[10px] hover:underline cursor-pointer ml-2 shrink-0"
                        >
                          Go to section
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* TAB: Keywords & Hard Skills with 1-Click Ingestion */
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* 1. Missing Keywords */}
            {report.keywordMatch.missingKeywords.length > 0 ? (
              <div className="p-4 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 bg-white dark:bg-card shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Missing High-Priority Keywords ({report.keywordMatch.missingKeywords.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Click + to add</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Recruiters and ATS scan for these exact terms. Click <strong className="font-semibold text-emerald-700 dark:text-emerald-400">+ Add</strong> to append them to your skills list and immediately boost your score:
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.keywordMatch.missingKeywords.map((item) => {
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
            ) : (
              <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  All Key Technical Skills Matched!
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Your resume contains all primary industry keywords detected in the Job Description.
                </p>
              </div>
            )}

            {/* 2. Matched Keywords */}
            {report.keywordMatch.matchedKeywords.length > 0 && (
              <div className="p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/40 bg-white dark:bg-card shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Verified Matched Keywords ({report.keywordMatch.matchedKeywords.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                    ✓ In Resume
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.keywordMatch.matchedKeywords.map((item) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

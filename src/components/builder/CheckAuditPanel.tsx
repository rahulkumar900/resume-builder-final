'use client';

import React, { useState, useMemo } from 'react';
import {
  Award,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Target,
  Copy,
  Check,
  Plus,
  RefreshCw,
  Search,
  FileText,
  X,
} from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { analyzeResumeAts, AtsAuditResult, AtsSuggestion } from '@/lib/ats/ats-analyzer';
import { matchJobDescriptionKeywords, KeywordMatchResult } from '@/lib/ats/keyword-matcher';
import { Button } from '@/components/ui/button';

interface CheckAuditPanelProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onNavigateSection?: (sectionKey: SectionKey) => void;
  onClose?: () => void;
}

type TabType = 'issues' | 'keywords' | 'overview';
type FilterType = 'all' | 'critical' | 'recommended' | 'duplicates';

export const CheckAuditPanel: React.FC<CheckAuditPanelProps> = ({
  resume,
  onChange,
  onNavigateSection,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('issues');
  const [filter, setFilter] = useState<FilterType>('all');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [copiedPlainText, setCopiedPlainText] = useState<boolean>(false);
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  // Run real-time ATS audit
  const auditResult: AtsAuditResult = useMemo(() => {
    return analyzeResumeAts(resume);
  }, [resume]);

  // Run keyword analysis against pasted JD
  const keywordResult: KeywordMatchResult = useMemo(() => {
    return matchJobDescriptionKeywords(jobDescription, resume);
  }, [jobDescription, resume]);

  const criticalIssues = useMemo(() => {
    return (auditResult?.suggestions || []).filter((s) => s.severity === 'critical');
  }, [auditResult?.suggestions]);

  const recommendedIssues = useMemo(() => {
    return (auditResult?.suggestions || []).filter((s) => s.severity === 'recommended');
  }, [auditResult?.suggestions]);

  const duplicatesAndQualityCount = useMemo(() => {
    return (auditResult?.suggestions || []).filter((s) => Boolean(s.duplicateMeta)).length;
  }, [auditResult?.suggestions]);

  const filteredSuggestions = useMemo(() => {
    if (!auditResult?.suggestions) return [];
    if (filter === 'all') return auditResult.suggestions;
    if (filter === 'duplicates') {
      return auditResult.suggestions.filter((s) => Boolean(s.duplicateMeta));
    }
    return auditResult.suggestions.filter((s) => s.severity === filter);
  }, [auditResult?.suggestions, filter]);

  const totalFixes = auditResult?.suggestions?.length || 0;

  const handleCopyPlainText = () => {
    if (!auditResult?.atsPlainText) return;
    navigator.clipboard.writeText(auditResult.atsPlainText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2000);
  };

  const handleAddSkillToResume = (skillName: string) => {
    const existingCats = [...(resume.skills || [])];
    if (existingCats.length === 0) {
      existingCats.push({
        id: `sk-${Date.now()}`,
        category: 'Core Competencies',
        items: [skillName],
      });
    } else {
      if (!existingCats[0].items.includes(skillName)) {
        existingCats[0] = {
          ...existingCats[0],
          items: [...existingCats[0].items, skillName],
        };
      }
    }
    onChange({ skills: existingCats });
    setAddedSkills((prev) => new Set(prev).add(skillName.toLowerCase()));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/70 dark:bg-background border-r border-slate-200 dark:border-border select-none overflow-hidden">
      {/* 1. Sleek Minimal Panel Header with Integrated ATS Score */}
      <div className="p-3 sm:px-4 sm:py-3 bg-white dark:bg-card border-b border-slate-200 dark:border-border shrink-0 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Title + Minimal Score Pill */}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-foreground tracking-tight shrink-0">
              Resume Check
            </h2>

            {/* Compact ATS Score Pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border transition-colors ${
                auditResult.overallScore >= 80
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                  : auditResult.overallScore >= 65
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <span className="font-extrabold text-xs">{auditResult.overallScore}</span>
              <span className="text-[10px] opacity-60 font-medium">/100</span>
              <span className="text-[10px] font-semibold opacity-90">
                &bull; Grade {auditResult.tier.grade}
              </span>
            </div>
          </div>

          {/* Right: Issues count status & Close button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {criticalIssues.length > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40">
                {criticalIssues.length} Critical
              </span>
            ) : totalFixes > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                {totalFixes} {totalFixes === 1 ? 'Issue' : 'Issues'}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                All Passed
              </span>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-md transition-colors cursor-pointer"
                title="Close Panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher: Issues / Job Match / Categories */}
        <div className="flex p-0.5 bg-slate-100 dark:bg-muted rounded-lg gap-0.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('issues')}
            className={`flex-1 py-1 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'issues'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Issues ({totalFixes})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('keywords')}
            className={`flex-1 py-1 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'keywords'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-primary" />
            <span>Job Match</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-1 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-card text-foreground shadow-2xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-purple-500" />
            <span>Categories</span>
          </button>
        </div>
      </div>

      {/* 2. Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {/* TAB 1: Issues List */}
        {activeTab === 'issues' && (
          <div className="space-y-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-foreground dark:text-background'
                    : 'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-accent'
                }`}
              >
                All ({auditResult.suggestions.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('critical')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                  filter === 'critical'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-accent'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Critical ({criticalIssues.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('recommended')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                  filter === 'recommended'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-accent'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Recommended ({recommendedIssues.length})
              </button>
              {duplicatesAndQualityCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('duplicates')}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                    filter === 'duplicates'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white dark:bg-card border-slate-200 dark:border-border text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-accent'
                  }`}
                >
                  Duplicates ({duplicatesAndQualityCount})
                </button>
              )}
            </div>

            {/* List of Issue Cards */}
            {filteredSuggestions.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-slate-200 dark:border-border rounded-xl bg-white dark:bg-card space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-foreground">
                  No issues in this filter!
                </h3>
                <p className="text-xs text-slate-500 dark:text-muted-foreground">
                  Your resume meets corporate ATS standards in this category.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSuggestions.map((issue) => {
                  const isCritical = issue.severity === 'critical';
                  const isDuplicate = Boolean(issue.duplicateMeta);

                  return (
                    <div
                      key={issue.id}
                      className={`p-4 rounded-xl border bg-white dark:bg-card shadow-2xs space-y-2.5 transition-all ${
                        isCritical
                          ? 'border-rose-200 dark:border-rose-900/40'
                          : isDuplicate
                          ? 'border-purple-200 dark:border-purple-900/40'
                          : 'border-slate-200 dark:border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isCritical
                                ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40'
                                : isDuplicate
                                ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
                                : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40'
                            }`}
                          >
                            {isDuplicate ? 'Duplicate' : issue.severity}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 dark:text-muted-foreground uppercase">
                            {issue.category}
                          </span>
                        </div>

                        {issue.sectionKey && onNavigateSection && (
                          <button
                            type="button"
                            onClick={() => onNavigateSection(issue.sectionKey!)}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <span>Fix</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-foreground">
                          {issue.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {issue.description}
                        </p>
                      </div>

                      {issue.fixHint && (
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-muted/40 border border-slate-100 dark:border-border text-xs text-slate-700 dark:text-slate-300 font-medium">
                          <span className="font-bold text-primary">Pro Tip: </span>
                          {issue.fixHint}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Job Description Match & Keywords */}
        {activeTab === 'keywords' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-foreground uppercase tracking-wider block">
                Target Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here to check keyword match..."
                className="w-full h-28 p-3 text-xs rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {jobDescription.trim() ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-500 dark:text-muted-foreground">Keyword Match Rate:</span>
                    <div className="text-lg font-black text-slate-900 dark:text-foreground">
                      {keywordResult.matchRate}%
                    </div>
                  </div>
                  <div className="text-xs text-right">
                    <span className="text-slate-500 dark:text-muted-foreground">
                      {keywordResult.totalMatched} of {keywordResult.totalJobKeywords} Found
                    </span>
                  </div>
                </div>

                {keywordResult.missingKeywords.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                      Missing Keywords (Click + to Add)
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {keywordResult.missingKeywords.map((kwItem) => {
                        const kwText = kwItem.keyword;
                        const isAdded = addedSkills.has(kwText.toLowerCase());
                        return (
                          <button
                            key={kwText}
                            type="button"
                            onClick={() => handleAddSkillToResume(kwText)}
                            disabled={isAdded}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200'
                                : 'bg-white dark:bg-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-border hover:border-primary hover:text-primary'
                            }`}
                          >
                            <span>{kwText}</span>
                            {isAdded ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Plus className="w-3 h-3 text-slate-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-6 border border-dashed border-slate-200 dark:border-border rounded-xl bg-white dark:bg-card text-xs text-slate-500 dark:text-muted-foreground space-y-1">
                <Target className="w-8 h-8 text-slate-300 dark:text-muted-foreground mx-auto mb-1" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Paste a job description to scan keyword gaps
                </p>
                <p>We'll extract required skills and compare them directly against your resume.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Category Breakdown */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {/* ATS Score & Tier Summary Card */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-border bg-white dark:bg-card shadow-2xs flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-foreground">
                    Grade {auditResult.tier.grade} &bull; {auditResult.tier.label.split('—')[0].trim()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground mt-0.5 max-w-[260px] leading-relaxed">
                  {auditResult.tier.description}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-black text-slate-900 dark:text-foreground">
                  {auditResult.overallScore}/100
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-muted-foreground">
                  Overall Score
                </div>
              </div>
            </div>

            {Object.entries(auditResult.categories).map(([key, cat]) => (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-white dark:bg-card border border-slate-200 dark:border-border space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-foreground capitalize">{cat.name}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {cat.score} / {cat.maxScore} pts ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      cat.percentage >= 80
                        ? 'bg-emerald-500'
                        : cat.percentage >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-muted-foreground">{cat.summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Panel Bottom Bar: Copy Plain Text ATS Format */}
      <div className="p-3 sm:px-5 bg-white dark:bg-card border-t border-slate-200 dark:border-border flex items-center justify-between shrink-0">
        <span className="text-[11px] text-slate-400 dark:text-muted-foreground">
          ATS Engine v2.4 &bull; 100% compliant
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopyPlainText}
          className="text-xs font-semibold gap-1.5 h-8 cursor-pointer"
        >
          {copiedPlainText ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied Plain Text!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy ATS Text</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

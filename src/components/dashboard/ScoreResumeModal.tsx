'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { analyzeResumeAts, AtsAuditResult, AtsSuggestion } from '@/lib/ats/ats-analyzer';
import { matchJobDescriptionKeywords, KeywordMatchResult } from '@/lib/ats/keyword-matcher';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  FileText,
  Target,
  Copy,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

interface ScoreResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumes: ResumeData[];
  initialResumeId?: string;
  onNavigateSection?: (sectionKey: SectionKey) => void;
  onAddSkill?: (skill: string) => void;
}

type TabType = 'overview' | 'suggestions' | 'jobMatch' | 'plainText';
type FilterType = 'all' | 'critical' | 'recommended' | 'duplicates';

export const ScoreResumeModal: React.FC<ScoreResumeModalProps> = ({
  isOpen,
  onClose,
  resumes,
  initialResumeId,
  onNavigateSection,
  onAddSkill,
}) => {
  const [selectedResumeId, setSelectedResumeId] = useState<string>(
    initialResumeId || resumes[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [suggestionFilter, setSuggestionFilter] = useState<FilterType>('all');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [copiedPlainText, setCopiedPlainText] = useState<boolean>(false);
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());

  // Keep selected ID in sync with incoming resumes or initial selection
  useEffect(() => {
    if (initialResumeId && resumes.some((r) => r.id === initialResumeId)) {
      setSelectedResumeId(initialResumeId);
    } else if (resumes.length > 0 && (!selectedResumeId || !resumes.some((r) => r.id === selectedResumeId))) {
      setSelectedResumeId(resumes[0].id);
    }
  }, [resumes, selectedResumeId, initialResumeId, isOpen]);

  const activeResume = useMemo(() => {
    return resumes.find((r) => r.id === selectedResumeId) || resumes[0];
  }, [resumes, selectedResumeId]);

  // Run comprehensive ATS Audit
  const auditResult: AtsAuditResult = useMemo(() => {
    return analyzeResumeAts(activeResume);
  }, [activeResume]);

  // Run Job Description keyword scanner
  const keywordResult: KeywordMatchResult = useMemo(() => {
    return matchJobDescriptionKeywords(jobDescription, activeResume);
  }, [jobDescription, activeResume]);

  const handleCelebrate = () => {
    fireConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleCopyPlainText = () => {
    if (!auditResult?.atsPlainText) return;
    navigator.clipboard.writeText(auditResult.atsPlainText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2000);
  };

  const handleAddSkillToResume = (skillName: string) => {
    if (onAddSkill) {
      onAddSkill(skillName);
      setAddedSkills((prev) => new Set(prev).add(skillName.toLowerCase()));
    }
  };

  const duplicatesAndQualityCount = useMemo(() => {
    return (auditResult?.suggestions || []).filter((s) => Boolean(s.duplicateMeta)).length;
  }, [auditResult?.suggestions]);

  const filteredSuggestions = useMemo(() => {
    if (!auditResult?.suggestions) return [];
    if (suggestionFilter === 'all') return auditResult.suggestions;
    if (suggestionFilter === 'duplicates') {
      return auditResult.suggestions.filter((s) => Boolean(s.duplicateMeta));
    }
    return auditResult.suggestions.filter((s) => s.severity === suggestionFilter);
  }, [auditResult?.suggestions, suggestionFilter]);

  if (!isOpen) return null;

  const criticalCount = auditResult.suggestions.filter((s) => s.severity === 'critical').length;
  const recommendedCount = auditResult.suggestions.filter((s) => s.severity === 'recommended').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh] text-slate-800 font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-none">
                  ATS Diagnostic &amp; Optimizer
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  Pro Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Enterprise ATS parsing simulator &amp; keyword calibration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Selector Banner (if multiple resumes) */}
        {resumes.length > 1 && (
          <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Analyzing Resume:</span>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-md px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.personalInfo?.fullName || 'Candidate'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-5 pt-1 overflow-x-auto scrollbar-none gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Audit &amp; Score</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('suggestions')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'suggestions'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Actionable Fixes</span>
            {criticalCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-black">
                {criticalCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jobMatch')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'jobMatch'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Job Description Match</span>
            {keywordResult.matchRate > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">
                {keywordResult.matchRate}%
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('plainText')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'plainText'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ATS Plain Text</span>
          </button>
        </div>

        {/* Tab 1: Overview & Audit Breakdown */}
        {activeTab === 'overview' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* Score Hero Banner */}
            <div className="bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 p-5 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
              <div className="space-y-1.5 z-10 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[11px] font-semibold backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{auditResult.tier.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Grade {auditResult.tier.grade} &mdash; {auditResult.overallScore}/100
                </div>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                  {auditResult.tier.description}
                </p>
              </div>

              {/* Interactive Score Circle */}
              <div
                onClick={handleCelebrate}
                className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:bg-white/15 transition-all shrink-0 z-10 group"
                title="Click for celebration confetti!"
              >
                <span className="text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">
                  {auditResult.overallScore}
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                  / 100 PTS
                </span>
              </div>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-lg font-black text-slate-900">{auditResult.actionVerbsCount}</div>
                <div className="text-[11px] font-semibold text-slate-500">Action Verbs</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-lg font-black text-slate-900">{auditResult.metricsCount}</div>
                <div className="text-[11px] font-semibold text-slate-500">Impact Metrics</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-lg font-black text-slate-900">{auditResult.totalSkillsCount}</div>
                <div className="text-[11px] font-semibold text-slate-500">Key Skills Listed</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <div className="text-lg font-black text-slate-900">{criticalCount}</div>
                <div className="text-[11px] font-semibold text-slate-500">Critical Fixes</div>
              </div>
            </div>

            {/* Content Hygiene & Duplicates Diagnostics */}
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    <Copy className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Content Quality &amp; Duplicate Check
                  </h4>
                </div>
                {duplicatesAndQualityCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('suggestions');
                      setSuggestionFilter('duplicates');
                    }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Review {duplicatesAndQualityCount} Warnings</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <CheckCircle className="w-3 h-3" />
                    <span>Pristine</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Duplicate Content */}
                <div
                  onClick={() => {
                    if (
                      (auditResult.contentQuality?.duplicateBulletsCount || 0) +
                      (auditResult.contentQuality?.duplicateSkillsCount || 0) >
                      0
                    ) {
                      setActiveTab('suggestions');
                      setSuggestionFilter('duplicates');
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    (auditResult.contentQuality?.duplicateBulletsCount || 0) +
                    (auditResult.contentQuality?.duplicateSkillsCount || 0) >
                    0
                      ? 'bg-rose-50/80 border-rose-200 hover:bg-rose-100/80'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Duplicates</div>
                  <div className="text-xs font-black mt-0.5 text-slate-800">
                    {(auditResult.contentQuality?.duplicateBulletsCount || 0) +
                    (auditResult.contentQuality?.duplicateSkillsCount || 0) >
                    0
                      ? `${
                          (auditResult.contentQuality?.duplicateBulletsCount || 0) +
                          (auditResult.contentQuality?.duplicateSkillsCount || 0)
                        } Flagged`
                      : '0 Detected'}
                  </div>
                </div>

                {/* 2. Verb Variety */}
                <div
                  onClick={() => {
                    if ((auditResult.contentQuality?.repetitiveVerbsCount || 0) > 0) {
                      setActiveTab('suggestions');
                      setSuggestionFilter('duplicates');
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    (auditResult.contentQuality?.repetitiveVerbsCount || 0) > 0
                      ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/80'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Verb Variety</div>
                  <div className="text-xs font-black mt-0.5 text-slate-800">
                    {(auditResult.contentQuality?.repetitiveVerbsCount || 0) > 0
                      ? `${auditResult.contentQuality?.repetitiveVerbsCount} Repetitive`
                      : 'High Variety'}
                  </div>
                </div>

                {/* 3. Buzzwords */}
                <div
                  onClick={() => {
                    if ((auditResult.contentQuality?.buzzwordsCount || 0) > 0) {
                      setActiveTab('suggestions');
                      setSuggestionFilter('duplicates');
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    (auditResult.contentQuality?.buzzwordsCount || 0) > 0
                      ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/80'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Buzzwords</div>
                  <div className="text-xs font-black mt-0.5 text-slate-800">
                    {(auditResult.contentQuality?.buzzwordsCount || 0) > 0
                      ? `${auditResult.contentQuality?.buzzwordsCount} Flagged`
                      : '0 Buzzwords'}
                  </div>
                </div>

                {/* 4. Active Voice */}
                <div
                  onClick={() => {
                    if ((auditResult.contentQuality?.passiveVoiceCount || 0) > 0) {
                      setActiveTab('suggestions');
                      setSuggestionFilter('duplicates');
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    (auditResult.contentQuality?.passiveVoiceCount || 0) > 0
                      ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/80'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tone &amp; Voice</div>
                  <div className="text-xs font-black mt-0.5 text-slate-800">
                    {(auditResult.contentQuality?.passiveVoiceCount || 0) > 0
                      ? `${auditResult.contentQuality?.passiveVoiceCount} Passive`
                      : 'Active Voice'}
                  </div>
                </div>
              </div>
            </div>

            {/* 6 Category Breakdown Progress Bars */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Core Pillar Breakdown</span>
                <span className="text-[11px] font-normal text-slate-400">Target: 80%+ per pillar</span>
              </h4>

              <div className="space-y-2.5">
                {Object.values(auditResult.categories).map((cat) => {
                  const barColor =
                    cat.percentage >= 80
                      ? 'bg-emerald-500'
                      : cat.percentage >= 60
                      ? 'bg-emerald-600'
                      : cat.percentage >= 45
                      ? 'bg-amber-500'
                      : 'bg-rose-500';

                  return (
                    <div
                      key={cat.id}
                      className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-800">{cat.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 text-[11px] font-medium">
                            {cat.score}/{cat.maxScore} pts
                          </span>
                          <span
                            className={`font-black text-xs ${
                              cat.percentage >= 80
                                ? 'text-emerald-600'
                                : cat.percentage >= 60
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : cat.percentage >= 45
                                ? 'text-amber-600'
                                : 'text-rose-600'
                            }`}
                          >
                            {cat.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1.5">{cat.summary}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action to Fixes */}
            {auditResult.suggestions.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-900">
                      {auditResult.suggestions.length} Improvements Available
                    </div>
                    <p className="text-[11px] text-amber-700">
                      Resolving these will increase your interview callback chances by up to 3x.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('suggestions')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <span>Review Fixes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Actionable Fixes & Suggestions */}
        {activeTab === 'suggestions' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSuggestionFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    suggestionFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({auditResult.suggestions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSuggestionFilter('critical')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    suggestionFilter === 'critical'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Critical ({criticalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSuggestionFilter('recommended')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    suggestionFilter === 'recommended'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Recommended ({recommendedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSuggestionFilter('duplicates')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    suggestionFilter === 'duplicates'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  Duplicates &amp; Quality ({duplicatesAndQualityCount})
                </button>
              </div>

              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click "Fix in Section" to edit directly
              </span>
            </div>

            {/* Suggestion Cards */}
            {filteredSuggestions.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">
                  No issues found in this category!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your resume satisfies all primary ATS benchmark standards for this filter.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSuggestions.map((sug) => {
                  const isCritical = sug.severity === 'critical';
                  const isDuplicateType = Boolean(sug.duplicateMeta);
                  return (
                    <div
                      key={sug.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCritical
                          ? 'bg-rose-50/40 border-rose-200/80'
                          : isDuplicateType
                          ? 'bg-indigo-50/30 border-indigo-200/70'
                          : 'bg-amber-50/40 border-amber-200/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                isCritical
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-amber-600 text-white'
                              }`}
                            >
                              {sug.severity}
                            </span>
                            {sug.duplicateMeta?.type && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                                {sug.duplicateMeta.type}
                              </span>
                            )}
                            <span className="text-xs font-bold text-slate-900">{sug.title}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {sug.description}
                          </p>

                          {/* Duplicate metadata & locations */}
                          {sug.duplicateMeta && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-white/90 border border-slate-200/90 text-[11px] space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                                <Copy className="w-3 h-3 text-indigo-600 shrink-0" />
                                <span>Locations:</span>
                                <span className="text-slate-900 font-semibold truncate">
                                  {sug.duplicateMeta.locations.join(' • ')}
                                </span>
                              </div>
                              {sug.duplicateMeta.snippet && (
                                <div className="font-mono text-[10.5px] bg-slate-50 text-slate-700 p-1.5 rounded border border-slate-200/60 truncate">
                                  {sug.duplicateMeta.snippet}
                                </div>
                              )}
                            </div>
                          )}

                          {sug.fixHint && (
                            <div className="mt-2 p-2.5 rounded-lg bg-white/80 border border-slate-200 text-[11.5px] text-slate-700">
                              <span className="font-bold text-slate-900">How to fix: </span>
                              <span>{sug.fixHint}</span>
                            </div>
                          )}
                        </div>

                        {onNavigateSection && sug.sectionKey && (
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onNavigateSection(sug.sectionKey!);
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-blue-200 hover:border-blue-400 font-bold text-xs rounded-lg transition-colors shrink-0 shadow-2xs cursor-pointer flex items-center gap-1 self-start"
                          >
                            <span>Fix</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Target Job Description Keyword Matcher */}
        {activeTab === 'jobMatch' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Paste Target Job Description</span>
              </label>
              <p className="text-[11px] text-slate-500">
                Paste the requirements section from LinkedIn, Indeed, or the job posting to see your exact keyword match rate.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here (e.g. 'Looking for a Senior React Engineer with experience in Next.js, TypeScript, Docker, AWS, and PostgreSQL...')"
                className="w-full h-28 text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono leading-relaxed"
              />
            </div>

            {jobDescription.trim().length > 15 ? (
              <div className="space-y-4">
                {/* Match Result Banner */}
                <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                      Match Compatibility
                    </span>
                    <div className="text-xl font-black">
                      {keywordResult.matchRate}% Match Rate
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Found {keywordResult.totalMatched} of {keywordResult.totalJobKeywords} key job requirements in your resume
                    </div>
                  </div>

                  <div className="w-14 h-14 rounded-full border-4 border-emerald-600 flex items-center justify-center font-black text-lg bg-white/10">
                    {keywordResult.matchRate}%
                  </div>
                </div>

                {/* Missing Keywords Warning Box */}
                {keywordResult.missingKeywords.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Missing Keywords in Resume ({keywordResult.missingKeywords.length})</span>
                      </span>
                      {onAddSkill && (
                        <span className="text-[11px] text-slate-400">Click "+" to add to skills</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {keywordResult.missingKeywords.map((item) => {
                        const isAdded = addedSkills.has(item.keyword.toLowerCase());
                        return (
                          <span
                            key={item.keyword}
                            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border font-medium transition-colors ${
                              isAdded
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-rose-50 border-rose-200 text-rose-800'
                            }`}
                          >
                            <span>{item.keyword}</span>
                            {onAddSkill && (
                              <button
                                type="button"
                                onClick={() => handleAddSkillToResume(item.keyword)}
                                disabled={isAdded}
                                className={`p-0.5 rounded transition-colors ${
                                  isAdded
                                    ? 'text-emerald-700 cursor-default'
                                    : 'hover:bg-rose-200/80 cursor-pointer text-rose-700'
                                }`}
                                title={isAdded ? 'Added to Skills' : 'Add to Skills section'}
                              >
                                {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                              </button>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Matched Keywords Box */}
                {keywordResult.matchedKeywords.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Matched Keywords Found in Your Resume ({keywordResult.matchedKeywords.length})</span>
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                      {keywordResult.matchedKeywords.map((item) => (
                        <span
                          key={item.keyword}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{item.keyword}</span>
                          <span className="text-[10px] text-emerald-600 bg-emerald-100/70 px-1 rounded">
                            {item.count}x
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
                <Target className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-xs font-bold text-slate-700">Ready to Match</div>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Paste the requirements or responsibilities text from the target job listing above to see your real-time compatibility score.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Plain Text ATS Parser Simulation */}
        {activeTab === 'plainText' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Raw ATS Parser Extraction Preview
                </h4>
                <p className="text-[11px] text-slate-500">
                  This simulates how applicant tracking software strips formatting and parses your content sequentially.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyPlainText}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPlainText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap border border-slate-800 selection:bg-emerald-700 selection:text-white">
              {auditResult.atsPlainText || 'No content found in resume.'}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Scores are computed dynamically against 100+ recruitment benchmarks.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

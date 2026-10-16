'use client';

import React, { useState, useMemo } from 'react';
import { ResumeData } from '@/types/resume';
import {
  Wand2,
  CheckCircle2,
  Zap,
  X,
  AlertCircle,
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { checkGrammar, autoCorrectText, applySingleFix } from '@/lib/grammar/grammarEngine';
import { GrammarIssue, GrammarCategory } from '@/lib/grammar/types';

interface GrammarAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
}

interface SectionIssueItem {
  sectionKey: 'summary' | 'experience' | 'projects' | 'internships' | 'education';
  sectionLabel: string;
  itemIndex?: number;
  highlightIndex?: number;
  originalSnippet: string;
  issue: GrammarIssue;
}

export const GrammarAssistantModal: React.FC<GrammarAssistantModalProps> = ({
  isOpen,
  onClose,
  resume,
  onChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory | 'all'>('all');
  const [justFixedCount, setJustFixedCount] = useState<number | null>(null);

  // Scan all fields in the resume for grammar issues
  const allSectionIssues = useMemo(() => {
    const list: SectionIssueItem[] = [];

    // 1. Summary
    if (resume.personalInfo?.summary) {
      const res = checkGrammar(resume.personalInfo.summary);
      res.issues.forEach((issue) => {
        list.push({
          sectionKey: 'summary',
          sectionLabel: 'Professional Summary',
          originalSnippet: resume.personalInfo.summary || '',
          issue,
        });
      });
    }

    // 2. Experience
    (resume.experience || []).forEach((exp, eIdx) => {
      (exp.highlights || []).forEach((h, hIdx) => {
        const res = checkGrammar(h);
        res.issues.forEach((issue) => {
          list.push({
            sectionKey: 'experience',
            sectionLabel: `Experience: ${exp.role || 'Role'} at ${exp.company || 'Company'}`,
            itemIndex: eIdx,
            highlightIndex: hIdx,
            originalSnippet: h,
            issue,
          });
        });
      });
    });

    // 3. Projects
    (resume.projects || []).forEach((proj, pIdx) => {
      (proj.highlights || []).forEach((h, hIdx) => {
        const res = checkGrammar(h);
        res.issues.forEach((issue) => {
          list.push({
            sectionKey: 'projects',
            sectionLabel: `Project: ${proj.title || 'Project'}`,
            itemIndex: pIdx,
            highlightIndex: hIdx,
            originalSnippet: h,
            issue,
          });
        });
      });
    });

    // 4. Internships
    (resume.internships || []).forEach((intern, iIdx) => {
      (intern.highlights || []).forEach((h, hIdx) => {
        const res = checkGrammar(h);
        res.issues.forEach((issue) => {
          list.push({
            sectionKey: 'internships',
            sectionLabel: `Internship: ${intern.role || 'Intern'} at ${intern.company || 'Company'}`,
            itemIndex: iIdx,
            highlightIndex: hIdx,
            originalSnippet: h,
            issue,
          });
        });
      });
    });

    // 5. Education
    (resume.education || []).forEach((edu, edIdx) => {
      (edu.highlights || []).forEach((h, hIdx) => {
        const res = checkGrammar(h);
        res.issues.forEach((issue) => {
          list.push({
            sectionKey: 'education',
            sectionLabel: `Education: ${edu.degree || 'Degree'} at ${edu.school || 'School'}`,
            itemIndex: edIdx,
            highlightIndex: hIdx,
            originalSnippet: h,
            issue,
          });
        });
      });
    });

    return list;
  }, [resume]);

  const filteredIssues = useMemo(() => {
    if (selectedCategory === 'all') return allSectionIssues;
    return allSectionIssues.filter((i) => i.issue.category === selectedCategory);
  }, [allSectionIssues, selectedCategory]);

  const healthScore = Math.max(0, 100 - allSectionIssues.length * 5);

  // Fix a single issue in resume data
  const handleFixSingle = (item: SectionIssueItem) => {
    if (item.sectionKey === 'summary') {
      const current = resume.personalInfo?.summary || '';
      const updated = applySingleFix(current, item.issue);
      onChange({
        personalInfo: {
          ...resume.personalInfo,
          summary: updated,
        },
      });
    } else if (item.sectionKey === 'experience' && item.itemIndex !== undefined && item.highlightIndex !== undefined) {
      const expList = [...(resume.experience || [])];
      const targetExp = { ...expList[item.itemIndex] };
      const highlights = [...(targetExp.highlights || [])];
      highlights[item.highlightIndex] = applySingleFix(highlights[item.highlightIndex], item.issue);
      targetExp.highlights = highlights;
      expList[item.itemIndex] = targetExp;
      onChange({ experience: expList });
    } else if (item.sectionKey === 'projects' && item.itemIndex !== undefined && item.highlightIndex !== undefined) {
      const projList = [...(resume.projects || [])];
      const targetProj = { ...projList[item.itemIndex] };
      const highlights = [...(targetProj.highlights || [])];
      highlights[item.highlightIndex] = applySingleFix(highlights[item.highlightIndex], item.issue);
      targetProj.highlights = highlights;
      projList[item.itemIndex] = targetProj;
      onChange({ projects: projList });
    } else if (item.sectionKey === 'internships' && item.itemIndex !== undefined && item.highlightIndex !== undefined) {
      const internList = [...(resume.internships || [])];
      const targetIntern = { ...internList[item.itemIndex] };
      const highlights = [...(targetIntern.highlights || [])];
      highlights[item.highlightIndex] = applySingleFix(highlights[item.highlightIndex], item.issue);
      targetIntern.highlights = highlights;
      internList[item.itemIndex] = targetIntern;
      onChange({ internships: internList });
    } else if (item.sectionKey === 'education' && item.itemIndex !== undefined && item.highlightIndex !== undefined) {
      const eduList = [...(resume.education || [])];
      const targetEdu = { ...eduList[item.itemIndex] };
      const highlights = [...(targetEdu.highlights || [])];
      highlights[item.highlightIndex] = applySingleFix(highlights[item.highlightIndex], item.issue);
      targetEdu.highlights = highlights;
      eduList[item.itemIndex] = targetEdu;
      onChange({ education: eduList });
    }
  };

  // 1-Click Auto-Correct Entire Resume
  const handleAutoCorrectEntireResume = () => {
    let totalFixed = 0;

    // 1. Summary
    let updatedPersonalInfo = resume.personalInfo;
    if (resume.personalInfo?.summary) {
      const res = autoCorrectText(resume.personalInfo.summary);
      if (res.fixedCount > 0) {
        totalFixed += res.fixedCount;
        updatedPersonalInfo = {
          ...resume.personalInfo,
          summary: res.updatedHtml,
        };
      }
    }

    // 2. Experience
    const updatedExperience = (resume.experience || []).map((exp) => {
      const newHighlights = (exp.highlights || []).map((h) => {
        const res = autoCorrectText(h);
        totalFixed += res.fixedCount;
        return res.updatedHtml;
      });
      return { ...exp, highlights: newHighlights };
    });

    // 3. Projects
    const updatedProjects = (resume.projects || []).map((proj) => {
      const newHighlights = (proj.highlights || []).map((h) => {
        const res = autoCorrectText(h);
        totalFixed += res.fixedCount;
        return res.updatedHtml;
      });
      return { ...proj, highlights: newHighlights };
    });

    // 4. Internships
    const updatedInternships = (resume.internships || []).map((intern) => {
      const newHighlights = (intern.highlights || []).map((h) => {
        const res = autoCorrectText(h);
        totalFixed += res.fixedCount;
        return res.updatedHtml;
      });
      return { ...intern, highlights: newHighlights };
    });

    // 5. Education
    const updatedEducation = (resume.education || []).map((edu) => {
      const newHighlights = (edu.highlights || []).map((h) => {
        const res = autoCorrectText(h);
        totalFixed += res.fixedCount;
        return res.updatedHtml;
      });
      return { ...edu, highlights: newHighlights };
    });

    onChange({
      personalInfo: updatedPersonalInfo,
      experience: updatedExperience,
      projects: updatedProjects,
      internships: updatedInternships,
      education: updatedEducation,
    });

    setJustFixedCount(totalFixed);
    setTimeout(() => setJustFixedCount(null), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-card rounded-2xl shadow-2xl border border-slate-200 dark:border-border w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Resume Grammar &amp; Spell Checker</h2>
              <p className="text-xs text-purple-200">
                Audit every section for spelling, passive phrasing, and ATS conventions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quality Banner & Global Fix Button */}
        <div className="bg-slate-50 dark:bg-muted/40 border-b border-slate-200 dark:border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold font-mono text-sm border shadow-2xs',
                healthScore >= 90
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : healthScore >= 70
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
              )}
            >
              <span>{healthScore}%</span>
              <span className="text-[9px] uppercase font-sans tracking-tight">Health</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-foreground text-sm flex items-center gap-1.5">
                {allSectionIssues.length === 0 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Your resume is 100% typo-free!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>{allSectionIssues.length} suggestions across your resume</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                {allSectionIssues.length === 0
                  ? 'Ready for recruiters, job boards, and strict ATS parsers.'
                  : 'Correct typos and upgrade weak phrasing to stand out.'}
              </p>
            </div>
          </div>

          {allSectionIssues.length > 0 && (
            <Button
              type="button"
              onClick={handleAutoCorrectEntireResume}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-xs cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Auto-Correct Entire Resume</span>
            </Button>
          )}
        </div>

        {/* Notification pill if just fixed */}
        {justFixedCount !== null && (
          <div className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 px-4 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in border-b border-emerald-200 dark:border-emerald-800">
            <span>🎉 Successfully auto-corrected {justFixedCount} issues across your resume!</span>
            <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="px-5 py-2.5 border-b border-slate-200/80 dark:border-border bg-white dark:bg-card flex items-center gap-1.5 overflow-x-auto shrink-0">
          {(['all', 'spelling', 'verb', 'capitalization', 'grammar', 'punctuation'] as const).map(
            (cat) => {
              const count =
                cat === 'all'
                  ? allSectionIssues.length
                  : allSectionIssues.filter((i) => i.issue.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer',
                    selectedCategory === cat
                      ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 font-bold'
                      : 'text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-muted'
                  )}
                >
                  <span className="capitalize">{cat}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        'px-1.5 py-0.2 rounded-full text-[10px]',
                        selectedCategory === cat
                          ? 'bg-purple-200 dark:bg-purple-900/80 text-purple-950 dark:text-purple-200 font-bold'
                          : 'bg-slate-200 dark:bg-muted-foreground/20 text-slate-700 dark:text-slate-300'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* Issue List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredIssues.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-foreground text-sm">No issues found in this category</h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground max-w-sm mx-auto">
                All reviewed sections are properly formatted and pass our resume style and grammar audits.
              </p>
            </div>
          ) : (
            filteredIssues.map((item, idx) => (
              <div
                key={`${item.issue.id}-${idx}`}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-border bg-white dark:bg-card hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                    {item.sectionLabel}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider',
                      item.issue.category === 'spelling'
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                        : item.issue.category === 'verb'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : item.issue.category === 'capitalization'
                        ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                    )}
                  >
                    {item.issue.category}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="line-through text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                      {item.issue.originalText}
                    </span>
                    <span className="text-slate-400 dark:text-muted-foreground font-bold">&rarr;</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                      {item.issue.suggestedText}
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="xs"
                    onClick={() => handleFixSingle(item)}
                    className="h-7 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 self-end sm:self-auto cursor-pointer"
                  >
                    Fix
                  </Button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.issue.explanation}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-muted/30 border-t border-slate-200 dark:border-border flex items-center justify-between text-xs text-slate-500 dark:text-muted-foreground shrink-0">
          <span>100% Free client-side algorithmic spell &amp; grammar check. Zero AI cost.</span>
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

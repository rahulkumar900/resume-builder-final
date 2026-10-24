'use client';

import React, { useState } from 'react';
import { ExperienceItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Briefcase, Info, ArrowRight, ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';

interface ExperienceSectionProps extends SectionComponentProps<ExperienceItem[]> {
  targetRole?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data = [],
  onChange,
  targetRole,
  hideHeader = false,
}) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);
  const [aiModalState, setAiModalState] = useState<{
    isOpen: boolean;
    expIndex: number;
    anchorRect: DOMRect | null;
  }>({
    isOpen: false,
    expIndex: 0,
    anchorRect: null,
  });

  const handleItemClick = (id: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileEditingId(id);
    } else {
      setExpandedDesktopIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }
  };

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: true,
      highlights: [''],
    };
    onChange([newItem, ...data]);
    setMobileEditingId(newItem.id);
  };

  const updateExperience = (index: number, updated: Partial<ExperienceItem>) => {
    const next = [...data];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const next = [...data];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    onChange(next);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Convert highlights array to HTML for rich text editor
  const getHtmlForExp = (exp: ExperienceItem): string => {
    if (!exp.highlights || exp.highlights.length === 0) return '';
    // If it already contains HTML block tags (<ul, <ol, <p, etc.)
    if (exp.highlights.length === 1 && /<(ul|ol|p|div)/i.test(exp.highlights[0])) {
      return exp.highlights[0];
    }
    // If multiple items contain block HTML
    if (exp.highlights.some((h) => /<(ul|ol|p|div)/i.test(h))) {
      return exp.highlights.join('');
    }
    return `<ul>${exp.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`;
  };

  // Convert HTML back to highlights array, preserving rich formatting (bold, italic, links, lists)
  const extractHighlightsFromHtml = (html: string): string[] => {
    if (!html || html.trim() === '') return [];

    const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches && liMatches.length > 0) {
      return liMatches
        .map((li) => li.replace(/<\/?li[^>]*>/gi, '').trim())
        .filter(Boolean);
    }

    const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (pMatches && pMatches.length > 0) {
      return pMatches
        .map((p) => p.replace(/<\/?p[^>]*>/gi, '').trim())
        .filter(Boolean);
    }

    return html
      .split(/\n+/)
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
  };

  const handleRichTextChange = (index: number, html: string) => {
    if (!html || html.trim() === '' || html === '<br>' || html === '<p><br></p>') {
      updateExperience(index, { highlights: [] });
      return;
    }
    updateExperience(index, { highlights: [html] });
  };

  const openAiModal = (index: number, rect?: DOMRect) => {
    setAiModalState({
      isOpen: true,
      expIndex: index,
      anchorRect: rect || null,
    });
  };

  const currentExpForAi = data[aiModalState.expIndex];

  const mobileEditingIndex = data.findIndex((item) => item.id === mobileEditingId);
  const mobileEditingItem = mobileEditingIndex !== -1 ? data[mobileEditingIndex] : null;

  const renderExperienceForm = (exp: ExperienceItem, idx: number) => (
    <div className="space-y-4 sm:space-y-4.5 pt-1">
      {/* Job Title / Role - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Job Title / Role
        </Label>
        <JobTitleAutocomplete
          value={exp.role}
          placeholder="Lead Software Engineer"
          onChange={(val) => updateExperience(idx, { role: val })}
          className="h-10 text-sm font-semibold"
        />
      </div>

      {/* Company / Organization - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Company / Organization
        </Label>
        <Input
          type="text"
          value={exp.company}
          placeholder="Stripe, Inc."
          onChange={(e) => updateExperience(idx, { company: e.target.value })}
          className="h-10 text-sm font-semibold"
        />
      </div>

      {/* Location - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Location
        </Label>
        <Input
          type="text"
          value={exp.location}
          placeholder="San Francisco, CA or Remote"
          onChange={(e) => updateExperience(idx, { location: e.target.value })}
          className="h-10 text-sm"
        />
      </div>

      {/* Start Date & End Date - 1/2 Width (2 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Start Date
          </Label>
          <Input
            type="text"
            value={exp.startDate}
            placeholder="e.g. Jan 2022"
            onChange={(e) => updateExperience(idx, { startDate: e.target.value })}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              End Date
            </Label>
            <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(idx, { current: e.target.checked })}
                className="rounded border-slate-300 dark:border-border text-primary focus:ring-0"
              />
              <span>Present</span>
            </label>
          </div>
          <Input
            type="text"
            value={exp.current ? 'Present' : exp.endDate}
            disabled={exp.current}
            placeholder="e.g. Dec 2024"
            onChange={(e) => updateExperience(idx, { endDate: e.target.value })}
            className="h-10 text-sm disabled:opacity-60"
          />
        </div>
      </div>

      {/* Rich Text Editor for Responsibilities & Accomplishments */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-semibold text-slate-800 dark:text-foreground">
              Roles &amp; Accomplishments
            </Label>
            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">
              Use bullet points, bolding, and metric highlights to showcase quantifiable outcomes
            </p>
          </div>
        </div>

        <RichTextEditor
          value={getHtmlForExp(exp)}
          placeholder="• Architected distributed system cutting p99 latency by 45%...&#10;• Led sprint delivery for team of 6 engineers..."
          minHeight="140px"
          onOpenAiSuggestions={(rect) => openAiModal(idx, rect)}
          aiButtonLabel="AI Suggestions"
          sectionName="Experience"
          roleContext={exp.role}
          defaultBulletList={true}
          onChange={(html) => handleRichTextChange(idx, html)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {!hideHeader && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">Work Experience</h2>
          <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
            Your career timeline, responsibilities, and quantified milestones
          </p>
        </div>
      )}

      {data.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-foreground">
              No work experience added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
              Add your past roles, responsibilities, and key metrics to showcase your professional trajectory.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={addExperience}
              className="gap-1.5 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((exp, idx) => {
          const isExpandedDesktop = expandedDesktopIds.has(exp.id);
          return (
            <div
              key={exp.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              <div
                onClick={() => handleItemClick(exp.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {exp.role || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {exp.startDate || 'Start date'} &ndash; {exp.current ? 'Present' : exp.endDate || 'End date'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Mobile-only prominent Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileEditingId(exp.id);
                    }}
                    className="lg:hidden px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-emerald-100 transition-colors mr-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveExperience(idx, 'up')}
                    disabled={idx === 0}
                    title="Move up"
                    className="h-7 w-7 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveExperience(idx, 'down')}
                    disabled={idx === data.length - 1}
                    title="Move down"
                    className="h-7 w-7 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeExperience(idx)}
                    className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete position"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  {/* Desktop-only accordion expand chevron */}
                  <button
                    type="button"
                    onClick={() => handleItemClick(exp.id)}
                    className="hidden lg:flex p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                    title={isExpandedDesktop ? 'Collapse position' : 'Expand position'}
                  >
                    {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Desktop-only inline expanded form */}
              {isExpandedDesktop && (
                <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  {renderExperienceForm(exp, idx)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addExperience}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Position</span>
        </button>
      )}

      {/* Mobile-only Full-screen Form Modal */}
      {mobileEditingItem && (
        <MobileFullscreenItemModal
          isOpen={Boolean(mobileEditingItem)}
          onClose={() => setMobileEditingId(null)}
          title={mobileEditingItem.role || 'New Position'}
          subtitle={mobileEditingItem.company ? `@ ${mobileEditingItem.company}` : 'Work Experience'}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this position?')) {
              removeExperience(mobileEditingIndex);
              setMobileEditingId(null);
            }
          }}
          deleteLabel="Delete Position"
        >
          {renderExperienceForm(mobileEditingItem, mobileEditingIndex)}
        </MobileFullscreenItemModal>
      )}

      {/* AI Suggestions Modal for Experience */}
      {aiModalState.isOpen && currentExpForAi && (
        <AiSuggestionModal
          isOpen={aiModalState.isOpen}
          onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
          anchorRect={aiModalState.anchorRect}
          type="bullet"
          roleContext={currentExpForAi.role}
          companyContext={currentExpForAi.company}
          onUpdateRole={(newRole) => {
            updateExperience(aiModalState.expIndex, { role: newRole });
          }}
          onInsert={(text, mode) => {
            const expIdx = aiModalState.expIndex;
            const currentHighlights = data[expIdx]?.highlights || [];
            if (mode === 'replace' || currentHighlights.length === 0) {
              updateExperience(expIdx, { highlights: [`<ul><li>${text}</li></ul>`] });
            } else {
              const first = currentHighlights[0] || '';
              if (/<ul[^>]*>([\s\S]*)<\/ul>/i.test(first)) {
                const updated = first.replace(/<\/ul>/i, `<li>${text}</li></ul>`);
                updateExperience(expIdx, { highlights: [updated] });
              } else if (/<ol[^>]*>([\s\S]*)<\/ol>/i.test(first)) {
                const updated = first.replace(/<\/ol>/i, `<li>${text}</li></ol>`);
                updateExperience(expIdx, { highlights: [updated] });
              } else {
                updateExperience(expIdx, { highlights: [...currentHighlights, text] });
              }
            }
          }}
        />
      )}
    </div>
  );
};

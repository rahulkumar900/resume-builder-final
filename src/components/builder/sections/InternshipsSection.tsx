'use client';

import React, { useState } from 'react';
import { InternshipItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, GraduationCap, Info, ChevronDown, ChevronUp, Pencil, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';
import { SortableList } from '@/components/ui/sortable-list';

interface InternshipsSectionProps extends SectionComponentProps<InternshipItem[]> {
  targetRole?: string;
  hideHeader?: boolean;
}

export const InternshipsSection: React.FC<InternshipsSectionProps> = ({
  data = [],
  onChange,
  targetRole,
  hideHeader = false,
}) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);
  const [aiModalState, setAiModalState] = useState<{
    isOpen: boolean;
    intIndex: number;
    anchorRect: DOMRect | null;
  }>({
    isOpen: false,
    intIndex: 0,
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

  const addInternship = () => {
    const newItem: InternshipItem = {
      id: `int-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [''],
    };
    onChange([newItem, ...data]);
    setMobileEditingId(newItem.id);
  };

  const updateInternship = (index: number, updated: Partial<InternshipItem>) => {
    const next = [...data];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const moveInternship = (index: number, direction: 'up' | 'down') => {
    const next = [...data];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= next.length) return;
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    onChange(next);
  };

  const removeInternship = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Convert highlights / description to HTML for rich text editor
  const getHtmlForInt = (item: InternshipItem): string => {
    const raw = (item.highlights && item.highlights.length > 0)
      ? item.highlights
      : (item.description ? [item.description] : []);

    if (!raw || raw.length === 0) return '';
    if (raw.length === 1 && /<(ul|ol|p|div)/i.test(raw[0])) {
      return raw[0];
    }
    if (raw.some((h) => /<(ul|ol|p|div)/i.test(h))) {
      return raw.join('');
    }
    return `<ul>${raw.map((h) => `<li>${h}</li>`).join('')}</ul>`;
  };

  // Convert HTML back to highlights array
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
      updateInternship(index, { highlights: [], description: '' });
      return;
    }
    updateInternship(index, { highlights: [html], description: html });
  };

  const openAiModal = (index: number, rect?: DOMRect) => {
    setAiModalState({
      isOpen: true,
      intIndex: index,
      anchorRect: rect || null,
    });
  };

  const currentIntForAi = data[aiModalState.intIndex];
  const mobileEditingIndex = data.findIndex((item) => item.id === mobileEditingId);
  const mobileEditingItem = mobileEditingIndex !== -1 ? data[mobileEditingIndex] : null;

  const renderInternshipForm = (item: InternshipItem, idx: number) => (
    <div className="space-y-4 sm:space-y-4.5 pt-1">
      {/* Internship Role / Title - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Internship Role / Title
        </Label>
        <Input
          type="text"
          value={item.role || item.title || ''}
          placeholder="e.g. Software Engineering Intern"
          onChange={(e) => updateInternship(idx, { role: e.target.value, title: e.target.value })}
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
          value={item.company}
          placeholder="e.g. Acme Technologies"
          onChange={(e) => updateInternship(idx, { company: e.target.value })}
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
          value={item.location || ''}
          placeholder="e.g. Remote / San Francisco, CA"
          onChange={(e) => updateInternship(idx, { location: e.target.value })}
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
            value={item.startDate}
            placeholder="e.g. May 2024"
            onChange={(e) => updateInternship(idx, { startDate: e.target.value })}
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
                checked={item.current || false}
                onChange={(e) => updateInternship(idx, { current: e.target.checked })}
                className="rounded border-slate-300 text-primary focus:ring-0"
              />
              <span>Ongoing</span>
            </label>
          </div>
          <Input
            type="text"
            value={item.current ? 'Present' : item.endDate || ''}
            disabled={item.current}
            placeholder="e.g. Aug 2024"
            onChange={(e) => updateInternship(idx, { endDate: e.target.value })}
            className="h-10 text-sm disabled:opacity-60"
          />
        </div>
      </div>

      {/* Rich Text Editor for Responsibilities & Accomplishments */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-semibold text-slate-800 dark:text-foreground">
              Internship Description &amp; Key Accomplishments
            </Label>
            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">
              Describe core responsibilities, deliverables built, and tools mastered during your internship
            </p>
          </div>
        </div>

        <RichTextEditor
          value={getHtmlForInt(item)}
          placeholder="• Assisted in building customer-facing dashboard using React and TypeScript...&#10;• Reduced unit test run times by 20% by refactoring test fixtures..."
          minHeight="110px"
          onOpenAiSuggestions={(rect) => openAiModal(idx, rect)}
          aiButtonLabel="AI Suggestions"
          sectionName="Internships"
          roleContext={item.role || item.title}
          defaultBulletList={true}
          onChange={(html) => handleRichTextChange(idx, html)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {!hideHeader && (
        <>
          {/* Helpful Fresher Callout */}
          <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-800/40 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-3.5 shadow-2xs">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-emerald-950 dark:text-emerald-100">
                Internships &amp; Practical Training
              </p>
              <p className="text-emerald-800 dark:text-emerald-300/90 leading-relaxed text-xs sm:text-[13px]">
                Internships give fresh graduates a strong competitive edge by showcasing real-world application, teamwork, and deliverables. You can add summer internships, industrial training, or co-ops here. If you don&apos;t have any internships yet, this section can remain blank!
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">Internships</h2>
            <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
              Summer internships, industrial training, co-ops, or trainee roles
            </p>
          </div>
        </>
      )}

      {data.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-foreground">
              No internships added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
              Listing 1&ndash;2 internships or training programs highlights hands-on experience for entry-level roles. Click below to add an internship.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={addInternship}
              className="gap-1.5 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Internship</span>
            </Button>
          </div>
        </div>
      )}

      <SortableList
        items={data}
        onReorder={onChange}
        renderItem={(item, idx, { dragHandleProps, isDragging, setNodeRef, style }) => {
          const isExpandedDesktop = expandedDesktopIds.has(item.id);

          return (
            <div
              key={item.id}
              ref={setNodeRef}
              style={style}
              className={`rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors ${
                isDragging ? 'shadow-lg ring-2 ring-emerald-500/50 opacity-90' : ''
              }`}
            >
              <div
                onClick={() => handleItemClick(item.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                  {/* Drag Grip Handle */}
                  <div
                    {...dragHandleProps}
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-grab active:cursor-grabbing p-1.5 -ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-muted rounded-md shrink-0 transition-colors"
                    title="Drag to reorder"
                    aria-label="Drag to reorder internship"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {item.role || 'New Internship'} {item.company ? `@ ${item.company}` : ''}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {item.startDate || 'Start date'} &ndash; {item.current ? 'Present' : item.endDate || 'End date'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Mobile-only prominent Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileEditingId(item.id);
                    }}
                    className="lg:hidden min-h-[36px] px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-colors mr-1"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveInternship(idx, 'up')}
                    disabled={idx === 0}
                    title="Move up"
                    aria-label="Move internship up"
                    className="h-8 w-8 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => moveInternship(idx, 'down')}
                    disabled={idx === data.length - 1}
                    title="Move down"
                    aria-label="Move internship down"
                    className="h-8 w-8 text-slate-400 hover:text-slate-700"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInternship(idx)}
                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete internship"
                    aria-label="Delete internship"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  {/* Desktop-only accordion expand chevron */}
                  <button
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-muted dark:hover:text-slate-200 ml-1 cursor-pointer transition-colors"
                    title={isExpandedDesktop ? 'Collapse internship' : 'Expand internship'}
                    aria-label={isExpandedDesktop ? 'Collapse internship' : 'Expand internship'}
                  >
                    {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Desktop-only inline expanded form */}
              {isExpandedDesktop && (
                <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  {renderInternshipForm(item, idx)}
                </div>
              )}
            </div>
          );
        }}
      />

      {data.length > 0 && (
        <button
          type="button"
          onClick={addInternship}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Internship</span>
        </button>
      )}

      {/* Mobile-only Full-screen Form Modal */}
      {mobileEditingItem && (
        <MobileFullscreenItemModal
          isOpen={Boolean(mobileEditingItem)}
          onClose={() => setMobileEditingId(null)}
          title={mobileEditingItem.role || 'Internship Details'}
          subtitle={mobileEditingItem.company ? `@ ${mobileEditingItem.company}` : 'Internships'}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this internship?')) {
              removeInternship(mobileEditingIndex);
              setMobileEditingId(null);
            }
          }}
          deleteLabel="Delete Internship"
        >
          {renderInternshipForm(mobileEditingItem, mobileEditingIndex)}
        </MobileFullscreenItemModal>
      )}

      {/* AI Suggestions Modal */}
      {aiModalState.isOpen && currentIntForAi && (
        <AiSuggestionModal
          isOpen={aiModalState.isOpen}
          onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
          anchorRect={aiModalState.anchorRect}
          type="bullet"
          roleContext={currentIntForAi.role || targetRole || 'Software Engineering Intern'}
          companyContext={currentIntForAi.company}
          onUpdateRole={(newRole) => {
            updateInternship(aiModalState.intIndex, { role: newRole });
          }}
          onInsert={(text, mode) => {
            const intIdx = aiModalState.intIndex;
            const currentHighlights = data[intIdx]?.highlights || [];
            if (mode === 'replace' || currentHighlights.length === 0) {
              updateInternship(intIdx, { highlights: [`<ul><li>${text}</li></ul>`] });
            } else {
              const first = currentHighlights[0] || '';
              if (/<ul[^>]*>([\s\S]*)<\/ul>/i.test(first)) {
                const updated = first.replace(/<\/ul>/i, `<li>${text}</li></ul>`);
                updateInternship(intIdx, { highlights: [updated] });
              } else if (/<ol[^>]*>([\s\S]*)<\/ol>/i.test(first)) {
                const updated = first.replace(/<\/ol>/i, `<li>${text}</li></ol>`);
                updateInternship(intIdx, { highlights: [updated] });
              } else {
                updateInternship(intIdx, { highlights: [...currentHighlights, text] });
              }
            }
          }}
        />
      )}
    </div>
  );
};

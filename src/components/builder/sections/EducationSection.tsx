'use client';

import React, { useState } from 'react';
import { EducationItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, ChevronDown, ChevronUp, GraduationCap, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';

export const EducationSection: React.FC<SectionComponentProps<EducationItem[]>> = ({
  data = [],
  onChange,
  hideHeader = false,
}) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);
  const [aiModalState, setAiModalState] = useState<{
    isOpen: boolean;
    eduIndex: number;
    anchorRect: DOMRect | null;
  }>({
    isOpen: false,
    eduIndex: 0,
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

  const openAiModal = (index: number, rect?: DOMRect) => {
    setAiModalState({
      isOpen: true,
      eduIndex: index,
      anchorRect: rect || null,
    });
  };
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      highlights: [],
    };
    onChange([...data, newItem]);
    setMobileEditingId(newItem.id);
  };

  const updateEducation = (index: number, updated: Partial<EducationItem>) => {
    const next = [...data];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const getHtmlForEdu = (edu: EducationItem): string => {
    if (!edu.highlights || edu.highlights.length === 0) return '';
    if (edu.highlights.length === 1 && /<(ul|ol|p|div)/i.test(edu.highlights[0])) {
      return edu.highlights[0];
    }
    if (edu.highlights.some((h) => /<(ul|ol|p|div)/i.test(h))) {
      return edu.highlights.join('');
    }
    return `<ul>${edu.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`;
  };

  const extractHighlightsFromHtml = (html: string): string[] => {
    if (!html || html.trim() === '') return [];

    const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches && liMatches.length > 0) {
      return liMatches
        .map((li) => li.replace(/^<li[^>]*>|<\/li>$/gi, '').trim())
        .filter(Boolean);
    }

    const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (pMatches && pMatches.length > 0) {
      return pMatches
        .map((p) => p.replace(/^<p[^>]*>|<\/p>$/gi, '').trim())
        .filter(Boolean);
    }

    return html
      .split(/\n+/)
      .map((line) => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean);
  };

  const handleRichTextChange = (index: number, html: string) => {
    if (!html || html.trim() === '' || html === '<br>' || html === '<p><br></p>') {
      updateEducation(index, { highlights: [] });
      return;
    }
    updateEducation(index, { highlights: [html] });
  };

  const mobileEditingIndex = data.findIndex((item) => item.id === mobileEditingId);
  const mobileEditingItem = mobileEditingIndex !== -1 ? data[mobileEditingIndex] : null;

  const renderEducationForm = (edu: EducationItem, idx: number) => (
    <div className="space-y-4 sm:space-y-4.5 pt-1">
      {/* Degree / Major - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Degree / Major</Label>
        <Input
          type="text"
          value={edu.degree}
          placeholder="B.S. in Computer Science"
          onChange={(e) => updateEducation(idx, { degree: e.target.value })}
          className="h-10 text-sm font-semibold"
        />
      </div>

      {/* University / School - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">University / School</Label>
        <Input
          type="text"
          value={edu.school}
          placeholder="University of California, Berkeley"
          onChange={(e) => updateEducation(idx, { school: e.target.value })}
          className="h-10 text-sm font-semibold"
        />
      </div>

      {/* Location - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</Label>
        <Input
          type="text"
          value={edu.location}
          placeholder="Berkeley, CA"
          onChange={(e) => updateEducation(idx, { location: e.target.value })}
          className="h-10 text-sm"
        />
      </div>

      {/* Date & GPA - Half Width (2 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Graduation Date</Label>
          <Input
            type="text"
            value={edu.graduationDate}
            placeholder="e.g. May 2021"
            onChange={(e) => updateEducation(idx, { graduationDate: e.target.value })}
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">GPA / Honors (Optional)</Label>
          <Input
            type="text"
            value={edu.gpa || ''}
            placeholder="e.g. 3.8 / 4.0 or Magna Cum Laude"
            onChange={(e) => updateEducation(idx, { gpa: e.target.value })}
            className="h-10 text-sm"
          />
        </div>
      </div>

      {/* Highlights / Coursework */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-border/60">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Highlights / Coursework / Honors</Label>
          <span className="text-[11px] text-slate-400">Rich text &amp; bullet lists supported</span>
        </div>
        <RichTextEditor
          value={getHtmlForEdu(edu)}
          placeholder="• Course Curriculum: Law Enforcement Ethics, Foundations in Criminal Law...&#10;• Honors: Dean's Honor List, Academic Excellence Award..."
          minHeight="110px"
          onOpenAiSuggestions={(rect) => openAiModal(idx, rect)}
          aiButtonLabel="AI Suggestions"
          sectionName="Education"
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">Education</h2>
          <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">Your academic history, institutions, and credentials</p>
        </div>
      )}

      {data.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200/60 dark:border-blue-800">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-foreground">
              No education added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
              Add your university degrees, colleges, diplomas, or academic credentials.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={addEducation}
              className="gap-1.5 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Degree</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((edu, idx) => {
          const isExpandedDesktop = expandedDesktopIds.has(edu.id);
          return (
            <div
              key={edu.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              <div
                onClick={() => handleItemClick(edu.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200/60 dark:border-blue-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {edu.degree || 'Degree'} {edu.school ? `@ ${edu.school}` : ''}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {edu.graduationDate || 'Graduation date'} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Mobile-only prominent Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileEditingId(edu.id);
                    }}
                    className="lg:hidden px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-100 transition-colors mr-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEducation(idx)}
                    className="h-8 w-8 hover:text-rose-600"
                    title="Delete degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {/* Desktop-only accordion expand chevron */}
                  <button
                    type="button"
                    onClick={() => handleItemClick(edu.id)}
                    className="hidden lg:flex p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                    title={isExpandedDesktop ? 'Collapse degree' : 'Expand degree'}
                  >
                    {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Desktop-only inline expanded form */}
              {isExpandedDesktop && (
                <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  {renderEducationForm(edu, idx)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addEducation}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Degree</span>
        </button>
      )}

      {/* Mobile-only Full-screen Form Modal */}
      {mobileEditingItem && (
        <MobileFullscreenItemModal
          isOpen={Boolean(mobileEditingItem)}
          onClose={() => setMobileEditingId(null)}
          title={mobileEditingItem.degree || 'Degree Details'}
          subtitle={mobileEditingItem.school ? `@ ${mobileEditingItem.school}` : 'Education'}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this education entry?')) {
              removeEducation(mobileEditingIndex);
              setMobileEditingId(null);
            }
          }}
          deleteLabel="Delete Degree"
        >
          {renderEducationForm(mobileEditingItem, mobileEditingIndex)}
        </MobileFullscreenItemModal>
      )}

      {/* AI Suggestions Modal for Education */}
      {aiModalState.isOpen && data[aiModalState.eduIndex] && (
        <AiSuggestionModal
          isOpen={aiModalState.isOpen}
          onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
          anchorRect={aiModalState.anchorRect}
          type="education"
          roleContext={data[aiModalState.eduIndex].degree || 'Student'}
          companyContext={data[aiModalState.eduIndex].school}
          onInsert={(text, mode) => {
            const eduIdx = aiModalState.eduIndex;
            const currentHighlights = data[eduIdx]?.highlights || [];
            if (mode === 'replace' || currentHighlights.length === 0) {
              updateEducation(eduIdx, { highlights: [`<ul><li>${text}</li></ul>`] });
            } else {
              const first = currentHighlights[0] || '';
              if (/<ul[^>]*>([\s\S]*)<\/ul>/i.test(first)) {
                const updated = first.replace(/<\/ul>/i, `<li>${text}</li></ul>`);
                updateEducation(eduIdx, { highlights: [updated] });
              } else if (/<ol[^>]*>([\s\S]*)<\/ol>/i.test(first)) {
                const updated = first.replace(/<\/ol>/i, `<li>${text}</li></ol>`);
                updateEducation(eduIdx, { highlights: [updated] });
              } else {
                updateEducation(eduIdx, { highlights: [...currentHighlights, text] });
              }
            }
          }}
        />
      )}
    </div>
  );
};

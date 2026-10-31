'use client';

import React, { useState } from 'react';
import { ResumeData, SectionOrderConfig, CustomSectionType } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { SECTION_TITLES, normalizeCustomSectionType } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Trash2,
  PlusCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  GripVertical,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  BookOpen,
  Tag,
  Sliders,
  TrendingUp,
  AlignLeft,
  Users,
  Sparkles,
  ExternalLink,
  Layers,
  X,
} from 'lucide-react';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';
import { SortableList } from '@/components/ui/sortable-list';

interface GenericSectionEditorProps {
  sectionKey: SectionKey;
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  hideHeader?: boolean;
}

const getHtmlForHighlights = (highlights?: string[]): string => {
  if (!highlights || highlights.length === 0) return '';
  if (highlights.length === 1 && highlights[0]) {
    const first = highlights[0];
    if (first.includes('<') && first.includes('>')) {
      return first;
    }
  }
  const items = highlights.filter((h) => h && h.trim().length > 0);
  if (items.length === 0) return '';
  return `<ul>${items.map((h) => `<li>${h}</li>`).join('')}</ul>`;
};

export const GenericSectionEditor: React.FC<GenericSectionEditorProps> = ({
  sectionKey,
  resume,
  onChange,
  hideHeader = false,
}) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);

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

  const title = (SECTION_TITLES as any)[sectionKey] || sectionKey;

  const renderHeader = (headerTitle: string, subtitle?: string, actionBtn?: React.ReactNode) => {
    if (hideHeader) {
      return actionBtn ? (
        <div className="flex items-center justify-end">
          {actionBtn}
        </div>
      ) : null;
    }
    return (
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">{headerTitle}</h2>
        {subtitle && <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    );
  };

  // 1. Experience-like sections
  if (
    [
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
    ].includes(sectionKey)
  ) {
    const items: any[] = (resume as any)[sectionKey] || [];

    const addItem = () => {
      const newItem = {
        id: `${sectionKey}-${Date.now()}`,
        role: '',
        company: '',
        organization: '',
        institution: '',
        client: '',
        branch: '',
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        highlights: [],
      };
      onChange({ [sectionKey]: [...items, newItem] });
      setMobileEditingId(newItem.id);
    };

    const updateItem = (index: number, patch: any) => {
      const next = [...items];
      next[index] = { ...next[index], ...patch };
      onChange({ [sectionKey]: next });
    };

    const removeItem = (index: number) => {
      onChange({ [sectionKey]: items.filter((_, i) => i !== index) });
    };

    const orgLabel =
      sectionKey === 'teaching' || sectionKey === 'research'
        ? 'Institution / University'
        : sectionKey === 'freelance'
        ? 'Client / Platform'
        : sectionKey === 'militaryService'
        ? 'Military Branch'
        : sectionKey === 'internships'
        ? 'Company'
        : 'Organization';

    const roleLabel =
      sectionKey === 'militaryService'
        ? 'Role / Rank'
        : sectionKey === 'research'
        ? 'Research Topic / Title'
        : 'Role / Position';

    const mobileEditingIndex = items.findIndex((item) => (item.id || '') === mobileEditingId);
    const mobileEditingItem = mobileEditingIndex !== -1 ? items[mobileEditingIndex] : null;

    const renderExperienceLikeForm = (item: any, idx: number) => {
      const orgVal =
        item.organization || item.company || item.institution || item.client || item.branch || '';
      const roleVal = item.role || item.title || '';

      return (
        <div className="space-y-4 sm:space-y-4.5 pt-1">
          {/* Role / Title - Full Width */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {roleLabel}
            </label>
            <Input
              value={roleVal}
              onChange={(e) => {
                if (sectionKey === 'research') {
                  updateItem(idx, { title: e.target.value, role: e.target.value });
                } else {
                  updateItem(idx, { role: e.target.value });
                }
              }}
              placeholder="e.g. Lead Volunteer, Consultant"
              className="h-10 text-sm font-semibold"
            />
          </div>

          {/* Organization / Company - Full Width */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {orgLabel}
            </label>
            <Input
              value={orgVal}
              onChange={(e) => {
                updateItem(idx, {
                  organization: e.target.value,
                  company: e.target.value,
                  institution: e.target.value,
                  client: e.target.value,
                  branch: e.target.value,
                });
              }}
              placeholder="e.g. Red Cross, Stanford Lab"
              className="h-10 text-sm font-semibold"
            />
          </div>

          {/* Location - Full Width */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Location</label>
            <Input
              value={item.location || ''}
              onChange={(e) => updateItem(idx, { location: e.target.value })}
              placeholder="e.g. New York, NY"
              className="h-10 text-sm"
            />
          </div>

          {/* Start Date & End Date - 1/2 Width (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Start Date</label>
              <Input
                value={item.startDate || ''}
                onChange={(e) => updateItem(idx, { startDate: e.target.value })}
                placeholder="e.g. Sep 2021"
                className="h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">End Date</label>
              <Input
                value={item.current ? 'Present' : item.endDate || ''}
                disabled={item.current}
                onChange={(e) => updateItem(idx, { endDate: e.target.value })}
                placeholder="e.g. Present"
                className="h-10 text-sm disabled:opacity-60"
              />
            </div>
          </div>

          {/* Key Highlights & Rich Text */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-border/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-foreground block">
                Key Highlights &amp; Accomplishments
              </label>
              <span className="text-[11px] text-slate-400">Rich text &amp; bullet lists supported</span>
            </div>
            <RichTextEditor
              value={getHtmlForHighlights(item.highlights)}
              onChange={(html) =>
                updateItem(idx, {
                  highlights: [html],
                  description: html,
                })
              }
              placeholder="• Led impactful initiatives and contributed to team goals...&#10;• Streamlined processes and delivered key outcomes..."
              minHeight="100px"
              defaultBulletList={true}
            />
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {renderHeader(title, 'Add details and impact bullets')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No entries added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add your {title.toLowerCase()} to highlight additional leadership, projects, and achievements.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first {title.toLowerCase()}</span>
              </Button>
            </div>
          </div>
        ) : (
          <SortableList
            items={items.map((it, idx) => ({ ...it, id: it.id || `${sectionKey}-${idx}` }))}
            onReorder={(newItems) => onChange({ [sectionKey]: newItems })}
            renderItem={(item, idx, { dragHandleProps, isDragging, setNodeRef, style }) => {
              const orgValue =
                item.organization || item.company || item.institution || item.client || item.branch || '';
              const roleValue = item.role || item.title || '';
              const itemId = item.id || `${sectionKey}-${idx}`;
              const isExpandedDesktop = expandedDesktopIds.has(itemId);

              return (
                <div
                  key={itemId}
                  ref={setNodeRef}
                  style={style}
                  className={`rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors ${
                    isDragging ? 'shadow-lg ring-2 ring-emerald-500/50 opacity-90' : ''
                  }`}
                >
                  <div
                    onClick={() => handleItemClick(itemId)}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                      {/* Drag Grip Handle */}
                      <div
                        {...dragHandleProps}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-grab active:cursor-grabbing p-1.5 -ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-muted rounded-md shrink-0 transition-colors"
                        title="Drag to reorder"
                        aria-label="Drag to reorder entry"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                        #{idx + 1}
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                          {roleValue || `New ${title}`} {orgValue ? `@ ${orgValue}` : ''}
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
                          setMobileEditingId(itemId);
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
                        onClick={() => removeItem(idx)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete entry"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleItemClick(itemId)}
                        className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-muted dark:hover:text-slate-200 ml-1 cursor-pointer transition-colors"
                        title={isExpandedDesktop ? 'Collapse entry' : 'Expand entry'}
                        aria-label={isExpandedDesktop ? 'Collapse entry' : 'Expand entry'}
                      >
                        {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Desktop-only inline expanded form */}
                  {isExpandedDesktop && (
                    <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                      {renderExperienceLikeForm(item, idx)}
                    </div>
                  )}
                </div>
              );
            }}
          />
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Entry</span>
          </button>
        )}

        {/* Mobile-only Full-screen Form Modal */}
        {mobileEditingItem && (
          <MobileFullscreenItemModal
            isOpen={Boolean(mobileEditingItem)}
            onClose={() => setMobileEditingId(null)}
            title={mobileEditingItem.role || mobileEditingItem.title || `Edit ${title}`}
            subtitle={mobileEditingItem.organization || mobileEditingItem.company || title}
            onDelete={() => {
              if (confirm('Are you sure you want to delete this entry?')) {
                removeItem(mobileEditingIndex);
                setMobileEditingId(null);
              }
            }}
            deleteLabel="Delete Entry"
          >
            {renderExperienceLikeForm(mobileEditingItem, mobileEditingIndex)}
          </MobileFullscreenItemModal>
        )}
      </div>
    );
  }

  // 2. Scholarly: publications, conferences, patents
  if (['publications', 'conferences', 'patents'].includes(sectionKey)) {
    const items: any[] = (resume as any)[sectionKey] || [];

    const addItem = () => {
      const newItem =
        sectionKey === 'patents'
          ? { id: `pat-${Date.now()}`, title: '', patentNumber: '', issuer: '', date: '', summary: '' }
          : sectionKey === 'conferences'
          ? { id: `conf-${Date.now()}`, name: '', topic: '', location: '', date: '' }
          : { id: `pub-${Date.now()}`, title: '', publisher: '', date: '', authors: '', summary: '' };
      onChange({ [sectionKey]: [...items, newItem] });
    };

    const updateItem = (index: number, patch: any) => {
      const next = [...items];
      next[index] = { ...next[index], ...patch };
      onChange({ [sectionKey]: next });
    };

    const removeItem = (index: number) => {
      onChange({ [sectionKey]: items.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        {renderHeader(title, 'Add scholarly and IP entries')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No entries added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add your {title.toLowerCase()} to document your academic, research, or intellectual property contributions.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add {title}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="p-4 sm:p-5 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Title / Name</label>
                      <Input
                        value={item.title || item.name || ''}
                        onChange={(e) => updateItem(idx, { title: e.target.value, name: e.target.value })}
                        placeholder="e.g. Distributed Consensus in Cloud Systems"
                        className="h-10 text-sm font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                        {sectionKey === 'patents' ? 'Patent # / Issuer' : sectionKey === 'conferences' ? 'Topic' : 'Publisher / Journal'}
                      </label>
                      <Input
                        value={item.publisher || item.patentNumber || item.topic || ''}
                        onChange={(e) =>
                          updateItem(idx, {
                            publisher: e.target.value,
                            patentNumber: e.target.value,
                            topic: e.target.value,
                            issuer: e.target.value,
                          })
                        }
                        placeholder={sectionKey === 'patents' ? 'US 10,123,456' : 'IEEE / ACM'}
                        className="h-10 text-sm font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Location or URL</label>
                      <Input
                        value={item.location || item.url || ''}
                        onChange={(e) => updateItem(idx, { location: e.target.value, url: e.target.value })}
                        placeholder="e.g. https://doi.org/... or Boston, MA"
                        className="h-10 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Date / Year</label>
                        <Input
                          value={item.date || ''}
                          onChange={(e) => updateItem(idx, { date: e.target.value })}
                          placeholder="e.g. 2023"
                          className="h-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(idx)}
                    className="text-slate-400 hover:text-red-600 shrink-0 mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Summary / Authors</label>
                  <Textarea
                    value={item.summary || item.authors || ''}
                    onChange={(e) => updateItem(idx, { summary: e.target.value, authors: e.target.value })}
                    placeholder="Brief description or co-authors..."
                    rows={2}
                    className="text-sm rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Entry</span>
          </button>
        )}
      </div>
    );
  }

  // 3. Credentials & Recognitions: achievements, awards, courses, licenses, organizations, testScores
  if (['achievements', 'awards', 'courses', 'licenses', 'organizations', 'testScores'].includes(sectionKey)) {
    const items: any[] = (resume as any)[sectionKey] || [];

    const addItem = () => {
      const newItem =
        sectionKey === 'testScores'
          ? { id: `test-${Date.now()}`, testName: '', score: '', date: '', maxScore: '' }
          : sectionKey === 'licenses'
          ? { id: `lic-${Date.now()}`, name: '', issuingAuthority: '', licenseNumber: '', date: '' }
          : sectionKey === 'courses'
          ? { id: `course-${Date.now()}`, name: '', institution: '', completionDate: '' }
          : sectionKey === 'organizations'
          ? { id: `org-${Date.now()}`, name: '', role: '', startDate: '', endDate: '' }
          : sectionKey === 'awards'
          ? { id: `award-${Date.now()}`, title: '', issuer: '', date: '', summary: '' }
          : { id: `ach-${Date.now()}`, title: '', date: '', description: '' };
      onChange({ [sectionKey]: [...items, newItem] });
    };

    const updateItem = (index: number, patch: any) => {
      const next = [...items];
      next[index] = { ...next[index], ...patch };
      onChange({ [sectionKey]: next });
    };

    const removeItem = (index: number) => {
      onChange({ [sectionKey]: items.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        {renderHeader(title, 'Credentials, honors, and affiliations')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No entries added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add your {title.toLowerCase()} to strengthen your profile with official accreditations and recognitions.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add {title}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={item.id || idx} className="p-4 sm:p-5 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Title / Name</label>
                      <Input
                        value={item.title || item.name || item.testName || ''}
                        onChange={(e) =>
                          updateItem(idx, {
                            title: e.target.value,
                            name: e.target.value,
                            testName: e.target.value,
                          })
                        }
                        placeholder="e.g. Employee of the Year, CFA Level 1"
                        className="h-10 text-sm font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                        {sectionKey === 'testScores'
                          ? 'Score'
                          : sectionKey === 'licenses'
                          ? 'Issuing Authority'
                          : sectionKey === 'courses'
                          ? 'Institution / Platform'
                          : sectionKey === 'organizations'
                          ? 'Role'
                          : 'Issuer / Organization'}
                      </label>
                      <Input
                        value={item.issuer || item.issuingAuthority || item.institution || item.role || item.score || ''}
                        onChange={(e) =>
                          updateItem(idx, {
                            issuer: e.target.value,
                            issuingAuthority: e.target.value,
                            institution: e.target.value,
                            role: e.target.value,
                            score: e.target.value,
                          })
                        }
                        placeholder="e.g. Microsoft, Coursera, 99th Percentile"
                        className="h-10 text-sm font-semibold"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Date</label>
                        <Input
                          value={item.date || item.completionDate || item.startDate || ''}
                          onChange={(e) =>
                            updateItem(idx, {
                              date: e.target.value,
                              completionDate: e.target.value,
                              startDate: e.target.value,
                            })
                          }
                          placeholder="e.g. 2023 or Nov 2022"
                          className="h-10 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                          {sectionKey === 'licenses' ? 'License Number' : sectionKey === 'testScores' ? 'Max Score' : 'Details'}
                        </label>
                        <Input
                          value={item.licenseNumber || item.maxScore || item.summary || item.description || ''}
                          onChange={(e) =>
                            updateItem(idx, {
                              licenseNumber: e.target.value,
                              maxScore: e.target.value,
                              summary: e.target.value,
                              description: e.target.value,
                            })
                          }
                          placeholder="Additional details..."
                          className="h-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(idx)}
                    className="text-slate-400 hover:text-red-600 shrink-0 mt-6"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Entry</span>
          </button>
        )}
      </div>
    );
  }

  // 4. Interests / Hobbies
  if (sectionKey === 'interests') {
    const items: any[] = resume.interests || [];

    const addItem = () => {
      onChange({ interests: [...items, { id: `int-${Date.now()}`, name: '' }] });
    };

    const updateItem = (index: number, name: string) => {
      const next = [...items];
      next[index] = { ...next[index], name };
      onChange({ interests: next });
    };

    const removeItem = (index: number) => {
      onChange({ interests: items.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        {renderHeader('Interests & Hobbies', 'Personal passions, outdoor pursuits, and extracurricular activities')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No interests or hobbies added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add personal passions or hobbies to showcase your well-rounded personality and culture fit.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first interest</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/60 dark:border-emerald-800">
                  #{idx + 1}
                </div>
                <div className="flex-1">
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(idx, e.target.value)}
                    placeholder="e.g. Marathon Running, Open Source Contributing, Astronomy, Chess"
                    className="h-10 text-sm font-semibold w-full"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(idx)}
                  className="h-8 w-8 text-slate-400 hover:text-red-500 shrink-0"
                  title="Remove interest"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Interest</span>
          </button>
        )}
      </div>
    );
  }

  // 5. Links, Portfolio, Open Source, Speaking
  if (['professionalLinks', 'socialLinks', 'portfolio', 'openSource', 'speaking'].includes(sectionKey)) {
    const items: any[] = (resume as any)[sectionKey] || [];

    const addItem = () => {
      const newItem =
        sectionKey === 'openSource'
          ? { id: `os-${Date.now()}`, projectName: '', repoUrl: '', role: '', description: '' }
          : sectionKey === 'speaking'
          ? { id: `spk-${Date.now()}`, topic: '', eventName: '', date: '', location: '' }
          : sectionKey === 'portfolio'
          ? { id: `port-${Date.now()}`, title: '', url: '', description: '' }
          : { id: `link-${Date.now()}`, label: '', url: '' };
      onChange({ [sectionKey]: [...items, newItem] });
    };

    const updateItem = (index: number, patch: any) => {
      const next = [...items];
      next[index] = { ...next[index], ...patch };
      onChange({ [sectionKey]: next });
    };

    const removeItem = (index: number) => {
      onChange({ [sectionKey]: items.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        {renderHeader(title, 'Online links, showcases, and appearances')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No entries added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add links, profiles, repositories, or presentations to showcase your online presence.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first {title.toLowerCase()}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="p-4 sm:p-5 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-4">
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Label / Name</label>
                    <Input
                      value={item.label || item.title || item.projectName || item.topic || ''}
                      onChange={(e) =>
                        updateItem(idx, {
                          label: e.target.value,
                          title: e.target.value,
                          projectName: e.target.value,
                          topic: e.target.value,
                        })
                      }
                      placeholder="e.g. GitHub, Medium, Talk Title"
                      className="h-10 text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">URL / Event</label>
                    <Input
                      value={item.url || item.repoUrl || item.eventName || ''}
                      onChange={(e) =>
                        updateItem(idx, {
                          url: e.target.value,
                          repoUrl: e.target.value,
                          eventName: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="h-10 text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(idx)}
                  className="text-slate-400 hover:text-red-600 shrink-0 mt-6"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {(sectionKey === 'portfolio' || sectionKey === 'openSource' || sectionKey === 'speaking') && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Description</label>
                  <Input
                    value={item.description || item.location || ''}
                    onChange={(e) => updateItem(idx, { description: e.target.value, location: e.target.value })}
                    placeholder="Brief description or context..."
                    className="h-10 text-sm"
                  />
                </div>
              )}
            </div>
          ))}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Entry</span>
          </button>
        )}
      </div>
    );
  }

  // 6. References
  if (sectionKey === 'references') {
    const items: any[] = resume.references || [];

    const addItem = () => {
      onChange({
        references: [
          ...items,
          { id: `ref-${Date.now()}`, name: '', position: '', company: '', email: '', phone: '' },
        ],
      });
    };

    const updateItem = (index: number, patch: any) => {
      const next = [...items];
      next[index] = { ...next[index], ...patch };
      onChange({ references: next });
    };

    const removeItem = (index: number) => {
      onChange({ references: items.filter((_, i) => i !== index) });
    };

    return (
      <div className="space-y-6">
        {renderHeader('References', 'Professional contacts available upon request')}

        {items.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No references added yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add trusted colleagues, supervisors, or mentors who can vouch for your work.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addItem}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first reference</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="p-4 sm:p-5 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-4">
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Full Name</label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(idx, { name: e.target.value })}
                      placeholder="e.g. Dr. Sarah Jenkins"
                      className="h-10 text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Role &amp; Company</label>
                    <Input
                      value={item.position ? `${item.position}${item.company ? ` at ${item.company}` : ''}` : item.company || ''}
                      onChange={(e) => updateItem(idx, { position: e.target.value, company: '' })}
                      placeholder="e.g. VP of Engineering at Acme"
                      className="h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Contact Email/Phone</label>
                    <Input
                      value={item.email || item.phone || ''}
                      onChange={(e) => updateItem(idx, { email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="h-10 text-sm"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(idx)}
                  className="text-slate-400 hover:text-red-600 shrink-0 mt-6"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={addItem}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            <span>Add Another Reference</span>
          </button>
        )}
      </div>
    );
  }

  // 7. Custom Section with Type Archetype Selection
  if (sectionKey === 'customSections') {
    const customSections = resume.customSections || [];

    const customTypeOptions: {
      type: CustomSectionType;
      label: string;
      badge: string;
      icon: React.ElementType;
      hint: string;
      defaultTitle: string;
    }[] = [
      {
        type: 'custom_timeline',
        label: 'Timeline',
        badge: 'Roles & Dates',
        icon: Briefcase,
        hint: 'Custom roles, organizations, dates, location & accomplishments',
        defaultTitle: 'Leadership & Advisory',
      },
      {
        type: 'custom_showcase',
        label: 'Showcase',
        badge: 'Projects',
        icon: FolderGit2,
        hint: 'Project showcase, tech stack, external links & deliverables',
        defaultTitle: 'Side Projects & Ventures',
      },
      {
        type: 'custom_academic',
        label: 'Academic',
        badge: 'Degrees',
        icon: GraduationCap,
        hint: 'Degrees, institutions, location, dates, GPA & coursework',
        defaultTitle: 'Extended Education & Coursework',
      },
      {
        type: 'custom_awards',
        label: 'Accreditations',
        badge: 'Awards',
        icon: Award,
        hint: 'Certificates, special honors, issuer & credential ID',
        defaultTitle: 'Accreditations & Honors',
      },
      {
        type: 'custom_publication',
        label: 'Publications',
        badge: 'Papers',
        icon: BookOpen,
        hint: 'Research papers, articles, conferences, DOIs & abstracts',
        defaultTitle: 'Publications & Research',
      },
      {
        type: 'custom_tags',
        label: 'Tag List',
        badge: 'Pill Tags',
        icon: Tag,
        hint: 'Competency categories, tools & comma-separated tags',
        defaultTitle: 'Technical Toolsets & Domains',
      },
      {
        type: 'custom_levels',
        label: 'Levels',
        badge: 'Skill Levels',
        icon: Sliders,
        hint: 'Ranked competencies or languages with 5-tier proficiency',
        defaultTitle: 'Core Proficiencies & Levels',
      },
      {
        type: 'custom_metrics',
        label: 'Key Metrics',
        badge: 'KPI Stats',
        icon: TrendingUp,
        hint: 'Prominent metric stats, percentage gains, KPIs & context',
        defaultTitle: 'Key Business Metrics & Impact',
      },
      {
        type: 'custom_statement',
        label: 'Statement',
        badge: 'Narrative',
        icon: AlignLeft,
        hint: 'Freeform text block, executive philosophy or client reviews',
        defaultTitle: 'Executive Statement & Philosophy',
      },
      {
        type: 'custom_contacts',
        label: 'Contacts',
        badge: 'Referees',
        icon: Users,
        hint: 'Referee names, job titles, companies, email & phone',
        defaultTitle: 'Professional References & Mentors',
      },
    ];

    const addSection = (chosenType: CustomSectionType = 'custom_timeline') => {
      const typeOpt = customTypeOptions.find((o) => o.type === chosenType);
      const defaultTitle = typeOpt ? typeOpt.defaultTitle : `Custom Section #${customSections.length + 1}`;

      const newSec = {
        id: `custom-${Date.now()}`,
        title: defaultTitle,
        type: chosenType,
        content: '',
        items: [
          {
            id: `citem-${Date.now()}`,
            title: '',
            subtitle: '',
            date: '',
            location: '',
            description: '',
            highlights: [''],
            link: '',
            issuer: '',
            score: '',
            items: [],
            email: '',
            phone: '',
            level: 'Intermediate',
          },
        ],
      };
      onChange({ customSections: [...customSections, newSec] });
    };

    const updateSection = (sIdx: number, patch: any) => {
      const next = [...customSections];
      next[sIdx] = { ...next[sIdx], ...patch };
      onChange({ customSections: next });
    };

    const removeSection = (sIdx: number) => {
      onChange({ customSections: customSections.filter((_, i) => i !== sIdx) });
    };

    return (
      <div className="space-y-6">
        {renderHeader('Custom Sections', 'Create customizable sections and choose their layout type')}

        {customSections.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 flex items-center justify-center mx-auto border border-purple-200/60 dark:border-purple-800 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No custom sections created yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Add unique sections like consulting projects, advisory boards, patents, or client testimonials, and choose any format shape.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {customTypeOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <Button
                    key={opt.type}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection(opt.type)}
                    className="gap-1.5 font-medium text-xs shadow-2xs hover:border-purple-300 dark:hover:border-purple-700"
                  >
                    <Icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>+ {opt.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {customSections.map((sec, sIdx) => {
              const normType = normalizeCustomSectionType(sec.type);
              const activeTypeInfo =
                customTypeOptions.find((o) => normalizeCustomSectionType(o.type) === normType) ||
                customTypeOptions[0];

              return (
                <div
                  key={sec.id}
                  className="p-5 sm:p-6 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-5"
                >
                  {/* Top Bar: Section Title & Delete */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-border">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">
                        Section Header Title
                      </label>
                      <Input
                        value={sec.title}
                        onChange={(e) => updateSection(sIdx, { title: e.target.value })}
                        placeholder="e.g. Major Consulting Engagements, Key Clients, Speaking"
                        className="font-bold text-base"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(sIdx)}
                      className="text-slate-400 hover:text-rose-600 gap-1 self-end sm:self-center"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-xs">Remove Section</span>
                    </Button>
                  </div>

                  {/* Section Type Selector (User can pick ANY type) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Section Type:
                      </span>
                      <span className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                        {activeTypeInfo.hint}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-muted/40 border border-slate-200/80 dark:border-border">
                      {customTypeOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = normalizeCustomSectionType(opt.type) === normType;

                        return (
                          <button
                            key={opt.type}
                            type="button"
                            onClick={() => updateSection(sIdx, { type: opt.type })}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-white dark:bg-card text-purple-700 dark:text-purple-300 shadow-xs border border-purple-200 dark:border-purple-800 font-bold'
                                : 'text-slate-600 dark:text-muted-foreground hover:bg-white/60 dark:hover:bg-card/60'
                            }`}
                          >
                            <Icon className={`w-4 h-4 mb-1 shrink-0 ${isSelected ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400'}`} />
                            <span className="text-[11px] font-semibold leading-tight">{opt.label}</span>
                            <span className="text-[9px] text-slate-400 opacity-80 leading-tight hidden xs:block">{opt.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic Form Content by Section Type */}

                  {/* 1. TEXT BLOCK TYPE */}
                  {normType === 'statement' && (
                    <div className="space-y-2 pt-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                        Paragraph Content / Narrative
                      </label>
                      <Textarea
                        value={sec.content || sec.items?.[0]?.description || ''}
                        onChange={(e) => updateSection(sIdx, { content: e.target.value })}
                        placeholder="Write your custom statement, personal philosophy, declaration, or client review here..."
                        rows={5}
                        className="text-xs leading-relaxed"
                      />
                    </div>
                  )}

                  {/* 2. LIST & TAGS TYPE */}
                  {normType === 'tags' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => {
                        const rawTags = item.description || (item.items || []).join(', ');
                        const tagList = rawTags
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);

                        return (
                          <div
                            key={item.id || iIdx}
                            className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                Tag Group #{iIdx + 1}
                              </span>
                              {(sec.items || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                    updateSection(sIdx, { items: nextItems });
                                  }}
                                  className="text-slate-400 hover:text-rose-600 text-xs"
                                >
                                  Delete
                                </button>
                              )}
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-slate-500 font-medium">Category / Group Name (Optional)</label>
                              <Input
                                value={item.title || ''}
                                onChange={(e) => {
                                  const newItems = [...sec.items];
                                  newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                  updateSection(sIdx, { items: newItems });
                                }}
                                placeholder="e.g. Methodologies, Tools, Focus Areas"
                                className="text-xs font-semibold"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] text-slate-500 font-medium">Items (comma-separated)</label>
                              <Input
                                value={rawTags}
                                onChange={(e) => {
                                  const newItems = [...sec.items];
                                  const tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                                  newItems[iIdx] = {
                                    ...newItems[iIdx],
                                    description: e.target.value,
                                    items: tags,
                                  };
                                  updateSection(sIdx, { items: newItems });
                                }}
                                placeholder="Agile, Scrum, Design Thinking, CI/CD, Product Strategy"
                                className="text-xs"
                              />
                            </div>

                            {tagList.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {tagList.map((tag, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="inline-flex items-center gap-1 text-[11px] bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-md font-medium group"
                                  >
                                    <span>{tag}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = tagList.filter((_, idx) => idx !== tIdx);
                                        const newItems = [...sec.items];
                                        newItems[iIdx] = {
                                          ...newItems[iIdx],
                                          description: updated.join(', '),
                                          items: updated,
                                        };
                                        updateSection(sIdx, { items: newItems });
                                      }}
                                      className="text-purple-400 hover:text-rose-600 dark:hover:text-rose-400 p-0.5 rounded cursor-pointer"
                                      title={`Remove tag "${tag}"`}
                                    >
                                      <X className="w-2.5 h-2.5" />
                                    </button>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', description: '', items: [] },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Tag Group</span>
                      </Button>
                    </div>
                  )}

                  {/* 3. REFERENCE TYPE */}
                  {normType === 'contacts' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Referee #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Full Name (e.g. Dr. Jane Doe)"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Job Title (e.g. Engineering Director)"
                              className="text-xs"
                            />
                            <Input
                              value={item.description || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Company / University"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.email || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], email: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Email Address"
                              className="text-xs"
                            />
                            <Input
                              value={item.phone || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], phone: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Phone Number / Relationship"
                              className="text-xs"
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', description: '', email: '', phone: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Referee</span>
                      </Button>
                    </div>
                  )}

                  {/* 4. CREDENTIAL / AWARD TYPE */}
                  {normType === 'awards' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Credential #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Award / Certification Title"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || item.issuer || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value, issuer: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Issuer / Organization / Authority"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.date || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], date: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Date / Year"
                              className="text-xs"
                            />
                            <Input
                              value={item.score || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], score: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Credential ID / Score / URL (Optional)"
                              className="text-xs"
                            />
                          </div>

                          <Input
                            value={item.description || ''}
                            onChange={(e) => {
                              const newItems = [...sec.items];
                              newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                              updateSection(sIdx, { items: newItems });
                            }}
                            placeholder="Brief description / scope (Optional)"
                            className="text-xs"
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', date: '', score: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Credential</span>
                      </Button>
                    </div>
                  )}

                  {/* 5. ACADEMIC / EXTENDED EDUCATION TYPE */}
                  {normType === 'academic' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Program #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Degree / Program Title"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Institution / University"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <Input
                              value={item.location || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], location: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Location"
                              className="text-xs"
                            />
                            <Input
                              value={item.date || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], date: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Date / Period"
                              className="text-xs"
                            />
                            <Input
                              value={item.score || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], score: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="GPA / Honors (Optional)"
                              className="text-xs"
                            />
                          </div>

                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => {
                              const newItems = [...sec.items];
                              newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                              updateSection(sIdx, { items: newItems });
                            }}
                            placeholder="Coursework, research honors, activities..."
                            rows={3}
                            className="text-xs leading-relaxed"
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', location: '', date: '', score: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Program</span>
                      </Button>
                    </div>
                  )}

                  {/* 6. PUBLICATION / RESEARCH TYPE */}
                  {normType === 'publication' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Publication #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Paper / Article / Book Title"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Journal / Conference / Publisher"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.date || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], date: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Publication Date / Year"
                              className="text-xs"
                            />
                            <Input
                              value={item.link || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], link: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="DOI / Link (e.g. doi.org/...)"
                              className="text-xs"
                            />
                          </div>

                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => {
                              const newItems = [...sec.items];
                              newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                              updateSection(sIdx, { items: newItems });
                            }}
                            placeholder="Abstract, co-authors, key discoveries..."
                            rows={3}
                            className="text-xs leading-relaxed"
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', date: '', link: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Publication</span>
                      </Button>
                    </div>
                  )}

                  {/* 7. LEVELS / RANKED SKILLS TYPE */}
                  {normType === 'levels' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => {
                        const levelSegments: { key: string; label: string; score: number }[] = [
                          { key: 'Beginner', label: 'Beginner', score: 1 },
                          { key: 'Elementary', label: 'Elementary', score: 2 },
                          { key: 'Intermediate', label: 'Intermediate', score: 3 },
                          { key: 'Advanced', label: 'Advanced', score: 4 },
                          { key: 'Expert', label: 'Expert', score: 5 },
                        ];
                        const currentLevel = item.level || item.subtitle || 'Intermediate';
                        const currentScore =
                          levelSegments.find((l) => l.key === currentLevel)?.score || 3;

                        return (
                          <div
                            key={item.id || iIdx}
                            className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                Proficiency #{iIdx + 1}
                              </span>
                              {(sec.items || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                    updateSection(sIdx, { items: nextItems });
                                  }}
                                  className="text-slate-400 hover:text-rose-600 text-xs"
                                >
                                  Delete
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[11px] text-slate-500 font-medium">Competency / Language Name</label>
                                <Input
                                  value={item.title || ''}
                                  onChange={(e) => {
                                    const newItems = [...sec.items];
                                    newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                    updateSection(sIdx, { items: newItems });
                                  }}
                                  placeholder="e.g. TypeScript, German, Cloud Architecture"
                                  className="text-xs font-semibold"
                                />
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-[11px] text-slate-500 font-medium">Level</label>
                                  <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                                    {currentLevel} ({currentScore}/5)
                                  </span>
                                </div>
                                <div className="grid grid-cols-5 gap-1 p-0.5 rounded-lg bg-slate-200/60 dark:bg-muted border border-slate-200 dark:border-border">
                                  {levelSegments.map((lvl) => {
                                    const isSelected = currentLevel === lvl.key;
                                    const isFilled = currentScore >= lvl.score;
                                    return (
                                      <button
                                        key={lvl.key}
                                        type="button"
                                        onClick={() => {
                                          const newItems = [...sec.items];
                                          newItems[iIdx] = {
                                            ...newItems[iIdx],
                                            level: lvl.key,
                                            subtitle: lvl.key,
                                          };
                                          updateSection(sIdx, { items: newItems });
                                        }}
                                        className={`py-1.5 px-0.5 text-center rounded text-[10px] font-bold transition-all cursor-pointer truncate ${
                                          isSelected
                                            ? 'bg-purple-600 text-white shadow-xs'
                                            : isFilled
                                            ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300'
                                            : 'bg-white dark:bg-card text-slate-500 hover:bg-slate-50'
                                        }`}
                                      >
                                        {lvl.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: 'Intermediate', level: 'Intermediate' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Proficiency</span>
                      </Button>
                    </div>
                  )}

                  {/* 8. METRICS / KEY IMPACT STATS TYPE */}
                  {normType === 'metrics' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Metric #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[11px] text-slate-500 font-medium">Metric Stat / Number</label>
                              <Input
                                value={item.title || ''}
                                onChange={(e) => {
                                  const newItems = [...sec.items];
                                  newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                  updateSection(sIdx, { items: newItems });
                                }}
                                placeholder="e.g. +145%, $12M+, 99.99%, #1"
                                className="text-sm font-bold text-purple-700 dark:text-purple-400"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] text-slate-500 font-medium">Metric Label / Headline</label>
                              <Input
                                value={item.subtitle || ''}
                                onChange={(e) => {
                                  const newItems = [...sec.items];
                                  newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                  updateSection(sIdx, { items: newItems });
                                }}
                                placeholder="e.g. ARR Growth, System Uptime, Cost Reduction"
                                className="text-xs font-semibold"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] text-slate-500 font-medium">Context / Description</label>
                            <Input
                              value={item.description || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="e.g. Scaled across 4 distributed engineering teams and 500k active users"
                              className="text-xs"
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Metric</span>
                      </Button>
                    </div>
                  )}

                  {/* 5. PROJECT TYPE */}
                  {normType === 'showcase' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Project #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Project Name"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Technologies / Role"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.link || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], link: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Project Link / URL (e.g. github.com/...)"
                              className="text-xs"
                            />
                            <Input
                              value={item.date || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], date: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Date / Period"
                              className="text-xs"
                            />
                          </div>

                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => {
                              const newItems = [...sec.items];
                              newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                              updateSection(sIdx, { items: newItems });
                            }}
                            placeholder="Project description, deliverables & impact..."
                            rows={3}
                            className="text-xs leading-relaxed"
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', link: '', date: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Project</span>
                      </Button>
                    </div>
                  )}

                  {/* 6. EXPERIENCE / TIMELINE TYPE (Default) */}
                  {normType === 'timeline' && (
                    <div className="space-y-3 pt-1">
                      {(sec.items || []).map((item, iIdx) => (
                        <div
                          key={item.id || iIdx}
                          className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Position #{iIdx + 1}
                            </span>
                            {(sec.items || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = sec.items.filter((_, i) => i !== iIdx);
                                  updateSection(sIdx, { items: nextItems });
                                }}
                                className="text-slate-400 hover:text-rose-600 text-xs"
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.title || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Position / Role Title"
                              className="text-xs font-semibold"
                            />
                            <Input
                              value={item.subtitle || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Company / Organization"
                              className="text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Input
                              value={item.location || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], location: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Location (e.g. Remote, City)"
                              className="text-xs"
                            />
                            <Input
                              value={item.date || ''}
                              onChange={(e) => {
                                const newItems = [...sec.items];
                                newItems[iIdx] = { ...newItems[iIdx], date: e.target.value };
                                updateSection(sIdx, { items: newItems });
                              }}
                              placeholder="Date / Period (e.g. 2022 - Present)"
                              className="text-xs"
                            />
                          </div>

                          <Textarea
                            value={item.description || ''}
                            onChange={(e) => {
                              const newItems = [...sec.items];
                              newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                              updateSection(sIdx, { items: newItems });
                            }}
                            placeholder="Description, key responsibilities & accomplishments..."
                            rows={3}
                            className="text-xs leading-relaxed"
                          />
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newItems = [
                            ...(sec.items || []),
                            { id: `citem-${Date.now()}`, title: '', subtitle: '', location: '', date: '', description: '' },
                          ];
                          updateSection(sIdx, { items: newItems });
                        }}
                        className="text-xs gap-1 h-8"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Item</span>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return null;
};

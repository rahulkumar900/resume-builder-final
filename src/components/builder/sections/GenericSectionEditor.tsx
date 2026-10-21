'use client';

import React, { useState } from 'react';
import { ResumeData, SectionOrderConfig } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { SECTION_TITLES } from '@/lib/templates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, PlusCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

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
  const [collapsedItemIds, setCollapsedItemIds] = useState<Set<string>>(new Set());

  const toggleCollapse = (id: string) => {
    setCollapsedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first {title.toLowerCase()}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, idx) => {
              const orgValue =
                item.organization || item.company || item.institution || item.client || item.branch || '';
              const roleValue = item.role || item.title || '';
              const itemId = item.id || `${sectionKey}-${idx}`;
              const isCollapsed = collapsedItemIds.has(itemId);

              return (
                <div
                  key={itemId}
                  className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
                >
                  <div
                    onClick={() => toggleCollapse(itemId)}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(idx)}
                        className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <button
                        type="button"
                        onClick={() => toggleCollapse(itemId)}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                        title={isCollapsed ? 'Expand entry' : 'Collapse entry'}
                      >
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                      <div className="space-y-4 sm:space-y-4.5 pt-3">
                        {/* Role / Title - Full Width */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                            {roleLabel}
                          </label>
                          <Input
                            value={roleValue}
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
                            value={orgValue}
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
                  )}
                </div>
              );
            })}
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

  // 7. Custom Section
  if (sectionKey === 'customSections') {
    const customSections = resume.customSections || [];

    const addSection = () => {
      const newSec = {
        id: `custom-${Date.now()}`,
        title: 'Custom Section',
        items: [
          {
            id: `citem-${Date.now()}`,
            title: '',
            subtitle: '',
            date: '',
            description: '',
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
        {renderHeader('Custom Sections', 'Create user-defined custom resume sections')}

        {customSections.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200/60 dark:border-emerald-800 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No custom sections created yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
                Need to add something unique like consulting work, side projects, or press coverage? Create a custom section.
              </p>
            </div>
            <div className="pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addSection}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create custom section</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {customSections.map((sec, sIdx) => (
              <div key={sec.id} className="p-5 bg-white dark:bg-card rounded-2xl border border-slate-200 dark:border-border shadow-xs space-y-4">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Section Header Title</label>
                    <Input
                      value={sec.title}
                      onChange={(e) => updateSection(sIdx, { title: e.target.value })}
                      placeholder="e.g. Major Consulting Engagements"
                      className="font-bold text-base"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSection(sIdx)}
                    className="text-slate-400 hover:text-red-600 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Items */}
                <div className="space-y-3 pt-2">
                  {(sec.items || []).map((item, iIdx) => (
                    <div key={item.id || iIdx} className="p-3.5 bg-slate-50 dark:bg-muted/40 rounded-xl border border-slate-200/60 dark:border-border space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...sec.items];
                            newItems[iIdx] = { ...newItems[iIdx], title: e.target.value };
                            updateSection(sIdx, { items: newItems });
                          }}
                          placeholder="Item Title"
                          className="text-xs font-semibold"
                        />
                        <Input
                          value={item.subtitle || ''}
                          onChange={(e) => {
                            const newItems = [...sec.items];
                            newItems[iIdx] = { ...newItems[iIdx], subtitle: e.target.value };
                            updateSection(sIdx, { items: newItems });
                          }}
                          placeholder="Subtitle / Organization"
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
                      <Input
                        value={item.description || ''}
                        onChange={(e) => {
                          const newItems = [...sec.items];
                          newItems[iIdx] = { ...newItems[iIdx], description: e.target.value };
                          updateSection(sIdx, { items: newItems });
                        }}
                        placeholder="Description..."
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
                        { id: `citem-${Date.now()}`, title: '', subtitle: '', date: '', description: '' },
                      ];
                      updateSection(sIdx, { items: newItems });
                    }}
                    className="text-xs gap-1 h-7"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

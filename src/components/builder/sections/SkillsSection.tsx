'use client';

/**
 * @file SkillsSection.tsx
 * @description Interactive skills editor with section-specific AI suggestion integration.
 *
 * SOLID Principles:
 * - Single Responsibility: Manages user interaction for skill categorization and invokes AI suggestion modal.
 */

import React, { useState } from 'react';
import { SkillCategory } from '@/types/resume';
import { Plus, Trash2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { SkillGroupSuggestion } from '@/lib/ai/types';

interface SkillsSectionProps {
  data: SkillCategory[];
  onChange: (updated: SkillCategory[]) => void;
  targetRole?: string;
  hideHeader?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  data = [],
  onChange,
  targetRole = '',
  hideHeader = false,
}) => {
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<Set<string>>(new Set());
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnchorRect, setAiAnchorRect] = useState<DOMRect | null>(null);

  const toggleCollapse = (id: string) => {
    setCollapsedGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `sk-${Date.now()}`,
      category: '',
      items: [],
    };
    onChange([...data, newCat]);
  };

  const updateSkillCategory = (index: number, category: string, itemsString: string) => {
    const next = [...data];
    next[index] = {
      ...next[index],
      category,
      items: itemsString
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onChange(next);
  };

  const removeSkillCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Handle AI Skill Insertion
  const handleInsertSingleSkill = (skillText: string) => {
    if (data.length === 0) {
      const newCat: SkillCategory = {
        id: `sk-${Date.now()}`,
        category: 'Core Competencies',
        items: [skillText],
      };
      onChange([newCat]);
      return;
    }
    // Append to the first or active category
    const next = [...data];
    if (!next[0].items.includes(skillText)) {
      next[0] = {
        ...next[0],
        items: [...next[0].items, skillText],
      };
      onChange(next);
    }
  };

  const handleInsertSkillGroups = (
    groups: SkillGroupSuggestion[],
    mode: 'insert' | 'replace'
  ) => {
    const converted: SkillCategory[] = groups.map((g, idx) => ({
      id: `sk-ai-${Date.now()}-${idx}`,
      category: g.category,
      items: g.items,
    }));

    if (mode === 'replace') {
      onChange(converted);
    } else {
      onChange([...data, ...converted]);
    }
  };

  return (
    <div className="space-y-5">
      {hideHeader ? (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              setAiAnchorRect(e.currentTarget.getBoundingClientRect());
              setIsAiModalOpen(true);
            }}
            className="border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 font-semibold gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>AI Suggest Skills</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">Skills &amp; Competencies</h2>
            <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
              Categorized toolsets, frameworks, languages, and methodologies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                setAiAnchorRect(e.currentTarget.getBoundingClientRect());
                setIsAiModalOpen(true);
              }}
              className="border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 font-semibold gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>AI Suggest Skills</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((cat, idx) => {
          const isCollapsed = collapsedGroupIds.has(cat.id);

          return (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              <div
                onClick={() => toggleCollapse(cat.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 border border-purple-200/60 dark:border-purple-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {cat.category || 'Skill Category'}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {cat.items?.length || 0} {cat.items?.length === 1 ? 'skill' : 'skills'}: {cat.items?.slice(0, 4).join(', ') || 'No skills added'}
                      {(cat.items?.length || 0) > 4 ? '...' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSkillCategory(idx)}
                    className="h-8 w-8 hover:text-rose-600"
                    title="Delete group"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(cat.id)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                    title={isCollapsed ? 'Expand group' : 'Collapse group'}
                  >
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  <div className="space-y-1.5 pt-3">
                    <Label className="text-xs text-slate-500 dark:text-muted-foreground uppercase tracking-wider font-bold">
                      Category Title
                    </Label>
                    <Input
                      type="text"
                      value={cat.category}
                      placeholder="e.g. Technical Skills or Tools"
                      onChange={(e) => updateSkillCategory(idx, e.target.value, cat.items.join(', '))}
                      className="font-bold text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-600 dark:text-muted-foreground">Skills (comma-separated):</Label>
                    <Input
                      type="text"
                      value={cat.items.join(', ')}
                      placeholder="React, TypeScript, Next.js, PostgreSQL, Docker..."
                      onChange={(e) => updateSkillCategory(idx, cat.category, e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((item, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-muted px-2.5 py-1"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 dark:border-border rounded-2xl space-y-3 bg-slate-50/70 dark:bg-card/40">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto border border-purple-200/60 dark:border-purple-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">No skills added yet</h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground max-w-xs mx-auto">
                Click &ldquo;AI Suggest Skills&rdquo; to automatically curate relevant skill categories tailored to your target role.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addSkillCategory}
                className="gap-1.5 font-semibold shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill Group</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  setAiAnchorRect(e.currentTarget.getBoundingClientRect());
                  setIsAiModalOpen(true);
                }}
                className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 bg-white dark:bg-card hover:bg-purple-50 dark:hover:bg-purple-950/40 font-semibold gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>AI Suggest for {targetRole || 'My Role'}</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addSkillCategory}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Skill Group</span>
        </button>
      )}

      {/* AI Suggestion Modal tailored for Skills */}
      <AiSuggestionModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        type="skills"
        roleContext={targetRole}
        anchorRect={aiAnchorRect}
        onInsert={handleInsertSingleSkill}
        onInsertSkillGroups={handleInsertSkillGroups}
      />
    </div>
  );
};

'use client';

/**
 * @file SkillsSection.tsx
 * @description Clean, streamlined skills editor rendering EITHER:
 * 1. Category Mode (Category title + Skills comma-separated) when grouping is enabled.
 * 2. Individual Skill Mode (Skill Name + 5-segment Level selector) when grouping is disabled.
 *
 * Toggling between modes is 100% non-destructive (zero data loss).
 * Category grouping default is decided by template style.
 */

import React, { useState, useMemo } from 'react';
import { SkillCategory, SkillsConfig, SkillLevel, TemplateId } from '@/types/resume';
import {
  Plus,
  Trash2,
  Sparkles,
  GripVertical,
  FolderTree,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { SkillGroupSuggestion } from '@/lib/ai/types';
import { SortableList } from '@/components/ui/sortable-list';
import {
  SKILL_LEVELS,
  getTemplateDefaultSkillsGrouping,
} from '@/lib/templates';
import { cn } from '@/lib/utils';

interface SkillsSectionProps {
  data: SkillCategory[];
  config?: SkillsConfig;
  templateId?: TemplateId | string;
  onChange: (updated: SkillCategory[], config?: SkillsConfig) => void;
  targetRole?: string;
  hideHeader?: boolean;
}

interface FlatSkillItem {
  id: string;
  catId: string;
  itemIndex: number;
  name: string;
  level: SkillLevel;
}

const LEVEL_SEGMENTS: { key: SkillLevel; label: string; score: number }[] = [
  { key: 'Beginner', label: 'Beginner', score: 1 },
  { key: 'Elementary', label: 'Elementary', score: 2 },
  { key: 'Intermediate', label: 'Intermediate', score: 3 },
  { key: 'Advanced', label: 'Advanced', score: 4 },
  { key: 'Expert', label: 'Expert', score: 5 },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  data = [],
  config,
  templateId,
  onChange,
  targetRole = '',
  hideHeader = false,
}) => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiAnchorRect, setAiAnchorRect] = useState<DOMRect | null>(null);
  const [categoryInputMap, setCategoryInputMap] = useState<Record<string, string>>({});

  // Grouping default is decided by template style if not explicitly set by user
  const isGroupingDefault = getTemplateDefaultSkillsGrouping(templateId);
  const enableGrouping =
    config?.enableGrouping !== undefined ? config.enableGrouping : isGroupingDefault;

  // Auto-adapt grouping to template style need whenever template changes
  const prevTemplateRef = React.useRef(templateId);
  React.useEffect(() => {
    if (prevTemplateRef.current && prevTemplateRef.current !== templateId) {
      prevTemplateRef.current = templateId;
      const templateNeedsGrouping = getTemplateDefaultSkillsGrouping(templateId);
      onChange(data, {
        ...config,
        enableGrouping: templateNeedsGrouping,
        showLevels: !templateNeedsGrouping,
      });
    } else {
      prevTemplateRef.current = templateId;
    }
  }, [templateId]);

  // Toggle between Category Mode and Level Mode (ZERO DATA LOSS)
  const handleToggleGrouping = () => {
    const nextConfig: SkillsConfig = {
      ...config,
      enableGrouping: !enableGrouping,
      showLevels: enableGrouping,
    };
    // Non-destructive: simply update the display setting without mutating data!
    onChange(data, nextConfig);
  };

  // Convert categories to flat skills list for Level Mode without losing category mapping
  const flatSkills: FlatSkillItem[] = useMemo(() => {
    const list: FlatSkillItem[] = [];
    data.forEach((cat, catIdx) => {
      const stableCatId = cat.id || `sk-cat-${catIdx}`;
      (cat.items || []).forEach((it, itIdx) => {
        const lvl = (cat.levels?.[it.trim()] as SkillLevel) || 'Intermediate';
        list.push({
          id: `${stableCatId}-item-${itIdx}`, // STABLE DETERMINISTIC ID: does not change on keystroke!
          catId: stableCatId,
          itemIndex: itIdx,
          name: it,
          level: lvl,
        });
      });
    });
    return list;
  }, [data]);

  // ==========================================
  // 1. CATEGORY MODE ACTIONS (enableGrouping = true)
  // ==========================================
  const addCategory = () => {
    const newCat: SkillCategory = {
      id: `sk-${Date.now()}`,
      category: '',
      items: [],
      enabled: true,
    };
    onChange([...data, newCat], config);
  };

  const updateCategoryTitle = (idx: number, category: string) => {
    const next = [...data];
    next[idx] = { ...next[idx], category };
    onChange(next, config);
  };

  const updateCategoryItems = (idx: number, rawInput: string) => {
    const cat = data[idx];
    const catId = cat.id || `sk-cat-${idx}`;
    setCategoryInputMap((prev) => ({ ...prev, [catId]: rawInput }));
    const items = rawInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const next = [...data];
    next[idx] = { ...next[idx], items };
    onChange(next, config);
  };

  const removeCategory = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx), config);
  };

  // ==========================================
  // 2. LEVEL MODE ACTIONS (enableGrouping = false)
  // ==========================================
  const addFlatSkill = () => {
    if (data.length === 0) {
      const newCat: SkillCategory = {
        id: `sk-${Date.now()}`,
        category: 'Technical Skills',
        items: [''],
        levels: { '': 'Intermediate' },
        enabled: true,
      };
      onChange([newCat], config);
      return;
    }

    const lastIdx = data.length - 1;
    const lastCat = data[lastIdx];
    const nextItems = [...(lastCat.items || []), ''];
    const next = [...data];
    next[lastIdx] = { ...lastCat, items: nextItems };
    onChange(next, config);
  };

  const updateFlatSkillName = (catId: string, itemIdx: number, newName: string) => {
    const catIdx = data.findIndex((c, idx) => (c.id || `sk-cat-${idx}`) === catId);
    if (catIdx === -1) return;

    const cat = data[catIdx];
    const oldName = cat.items[itemIdx];
    const nextItems = [...cat.items];
    nextItems[itemIdx] = newName;

    const nextLevels = { ...(cat.levels || {}) };
    if (oldName && nextLevels[oldName]) {
      const savedLvl = nextLevels[oldName];
      delete nextLevels[oldName];
      if (newName.trim()) {
        nextLevels[newName.trim()] = savedLvl;
      }
    }

    const next = [...data];
    next[catIdx] = { ...cat, items: nextItems, levels: nextLevels };
    onChange(next, config);
  };

  const updateFlatSkillLevel = (catId: string, skillName: string, level: SkillLevel) => {
    const catIdx = data.findIndex((c, idx) => (c.id || `sk-cat-${idx}`) === catId);
    if (catIdx === -1) return;

    const cat = data[catIdx];
    const nextLevels = { ...(cat.levels || {}) };
    if (skillName.trim()) {
      nextLevels[skillName.trim()] = level;
    }

    const next = [...data];
    next[catIdx] = { ...cat, levels: nextLevels };
    onChange(next, config);
  };

  const removeFlatSkill = (catId: string, itemIdx: number) => {
    const catIdx = data.findIndex((c, idx) => (c.id || `sk-cat-${idx}`) === catId);
    if (catIdx === -1) return;

    const cat = data[catIdx];
    const skillName = cat.items[itemIdx];
    const nextItems = cat.items.filter((_, i) => i !== itemIdx);
    const nextLevels = { ...(cat.levels || {}) };
    if (skillName) {
      delete nextLevels[skillName];
    }

    const next = [...data];
    next[catIdx] = { ...cat, items: nextItems, levels: nextLevels };
    onChange(next, config);
  };

  // Reorder flat skills across categories
  const reorderFlatSkills = (reordered: FlatSkillItem[]) => {
    // Collect all items and preserve their order
    const newItems = reordered.map((s) => s.name);
    const newLevels: Record<string, SkillLevel> = {};
    reordered.forEach((s) => {
      if (s.name.trim()) newLevels[s.name.trim()] = s.level;
    });

    if (data.length <= 1) {
      const cat = data[0] || {
        id: `sk-${Date.now()}`,
        category: 'Technical Skills',
        enabled: true,
      };
      onChange([{ ...cat, items: newItems, levels: newLevels }], config);
    } else {
      // Put reordered items into the first category, clear others
      const next = data.map((cat, idx) => {
        if (idx === 0) {
          return { ...cat, items: newItems, levels: newLevels };
        }
        return { ...cat, items: [] };
      });
      onChange(next, config);
    }
  };

  // AI Suggestion Handlers
  const handleInsertSingleSkill = (skillText: string) => {
    if (data.length === 0) {
      onChange(
        [
          {
            id: `sk-${Date.now()}`,
            category: 'Technical Skills',
            items: [skillText],
            enabled: true,
          },
        ],
        config
      );
      return;
    }
    const next = [...data];
    if (!next[0].items.includes(skillText)) {
      next[0] = { ...next[0], items: [...next[0].items, skillText] };
      onChange(next, config);
    }
  };

  const handleInsertSkillGroups = (groups: SkillGroupSuggestion[], mode: 'insert' | 'replace') => {
    const converted: SkillCategory[] = groups.map((g, idx) => ({
      id: `sk-ai-${Date.now()}-${idx}`,
      category: g.category,
      items: g.items,
      enabled: true,
    }));
    onChange(mode === 'replace' ? converted : [...data, ...converted], config);
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Mode Toggle */}
      <div className="space-y-3">
        {!hideHeader && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">
                Skills &amp; Competencies
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground mt-0.5">
                {enableGrouping
                  ? 'Showing category headings with comma-separated skills'
                  : 'Showing individual skills with 5-tier proficiency levels'}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                setAiAnchorRect(e.currentTarget.getBoundingClientRect());
                setIsAiModalOpen(true);
              }}
              className="border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 font-semibold gap-1.5 shadow-2xs self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>AI Suggest Skills</span>
            </Button>
          </div>
        )}

        {/* Global Grouping Toggle: Category Mode vs Level Mode */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-card border border-slate-200/90 dark:border-border">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shrink-0">
              <FolderTree className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Category Grouping
                </span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full font-semibold border',
                    enableGrouping
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  )}
                >
                  {enableGrouping ? 'Category + Comma Separated' : 'Skill Name & Level'}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-muted-foreground block truncate">
                {enableGrouping
                  ? 'Displays Category Title and comma-separated skills'
                  : 'Displays each Skill Name with its proficiency Level'}
              </span>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={enableGrouping}
            onClick={handleToggleGrouping}
            className={cn(
              'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600',
              enableGrouping ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
            )}
            title={enableGrouping ? 'Switch to Skill Name & Level' : 'Switch to Category + Comma separated'}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
                enableGrouping ? 'translate-x-4' : 'translate-x-0'
              )}
            />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EITHER CASE 1: CATEGORY MODE (enableGrouping === true)    */}
      {/* ========================================================= */}
      {enableGrouping ? (
        <div className="space-y-4">
          {data.length > 0 ? (
            <SortableList
              items={data}
              onReorder={(reordered) => onChange(reordered, config)}
              renderItem={(cat, idx, { dragHandleProps, isDragging, setNodeRef, style }) => {
                const catId = cat.id || `sk-cat-${idx}`;
                const inputValue =
                  categoryInputMap[catId] !== undefined
                    ? categoryInputMap[catId]
                    : (cat.items || []).filter(Boolean).join(', ');

                return (
                  <div
                    key={catId}
                    ref={setNodeRef}
                    style={style}
                    className={cn(
                      'rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card p-4 sm:p-5 space-y-3.5 shadow-xs transition-all',
                      isDragging ? 'shadow-lg ring-2 ring-purple-500/50 opacity-90' : ''
                    )}
                  >
                    {/* Category Header Bar */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <div
                          {...dragHandleProps}
                          className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded shrink-0"
                          title="Drag to reorder category"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <span className="w-6 h-6 rounded-md bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs border border-purple-200/60 dark:border-purple-800">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                          {cat.category || 'Skill Category'}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCategory(idx)}
                        className="h-7 w-7 text-slate-400 hover:text-rose-600"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {/* Top Wireframe Box: Category title */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Category title
                      </Label>
                      <Input
                        type="text"
                        value={cat.category}
                        placeholder="e.g. Technical Skills, Languages, Tools"
                        onChange={(e) => updateCategoryTitle(idx, e.target.value)}
                        className="font-bold text-sm"
                      />
                    </div>

                    {/* Second Wireframe Box: Skills comma separated */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Skills comma seperated
                      </Label>
                      <Input
                        type="text"
                        value={inputValue}
                        placeholder="React, TypeScript, Next.js, PostgreSQL, Docker..."
                        onChange={(e) => updateCategoryItems(idx, e.target.value)}
                        onBlur={() => {
                          setCategoryInputMap((prev) => {
                            const copy = { ...prev };
                            delete copy[catId];
                            return copy;
                          });
                        }}
                        className="text-sm"
                      />
                    </div>
                  </div>
                );
              }}
            />
          ) : (
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 dark:border-border rounded-2xl space-y-2 bg-slate-50/70 dark:bg-card/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No skill categories yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Click &ldquo;Add Another Skill Category&rdquo; to add a category with comma-separated skills.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={addCategory}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-purple-500/60 dark:hover:border-purple-500/60 hover:bg-purple-50/40 dark:hover:bg-purple-950/20 text-slate-700 dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Skill Category</span>
          </button>
        </div>
      ) : (
        /* ========================================================= */
        /* EITHER CASE 2: LEVEL MODE (enableGrouping === false)      */
        /* ========================================================= */
        <div className="space-y-4">
          {flatSkills.length > 0 ? (
            <SortableList
              items={flatSkills}
              onReorder={(reordered) => reorderFlatSkills(reordered)}
              renderItem={(skill, idx, { dragHandleProps, isDragging, setNodeRef, style }) => {
                const currentScore =
                  LEVEL_SEGMENTS.find((l) => l.key === skill.level)?.score || 3;

                return (
                  <div
                    key={skill.id}
                    ref={setNodeRef}
                    style={style}
                    className={cn(
                      'rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card p-4 sm:p-5 space-y-3.5 shadow-xs transition-all',
                      isDragging ? 'shadow-lg ring-2 ring-purple-500/50 opacity-90' : ''
                    )}
                  >
                    {/* Skill Item Header Bar */}
                    <div className="flex items-center justify-between pb-1">
                      <div className="flex items-center gap-2">
                        <div
                          {...dragHandleProps}
                          className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded shrink-0"
                          title="Drag to reorder skill"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                        <span className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs border border-blue-200/60 dark:border-blue-800">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                          {skill.name || 'New Skill'}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFlatSkill(skill.catId, skill.itemIndex)}
                        className="h-7 w-7 text-slate-400 hover:text-rose-600"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    {/* Bottom Wireframe Box 1: Skill Name */}
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Skill Name
                      </Label>
                      <Input
                        type="text"
                        value={skill.name}
                        placeholder="e.g. React, TypeScript, Docker"
                        onChange={(e) =>
                          updateFlatSkillName(skill.catId, skill.itemIndex, e.target.value)
                        }
                        className="font-bold text-sm"
                      />
                    </div>

                    {/* Bottom Wireframe Box 2: Level (5-segment selector) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Level
                        </Label>
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                          {skill.level} ({currentScore}/5)
                        </span>
                      </div>

                      {/* 5-Segmented Level Bar matching wireframe */}
                      <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-muted/60 border border-slate-200 dark:border-border">
                        {LEVEL_SEGMENTS.map((lvl) => {
                          const isSelected = skill.level === lvl.key;
                          const isFilled = currentScore >= lvl.score;

                          return (
                            <button
                              key={lvl.key}
                              type="button"
                              onClick={() =>
                                updateFlatSkillLevel(skill.catId, skill.name, lvl.key)
                              }
                              className={cn(
                                'py-2 px-1 text-center rounded-lg text-[11px] font-bold transition-all cursor-pointer',
                                isSelected
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : isFilled
                                  ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300'
                                  : 'bg-white dark:bg-card text-slate-500 hover:bg-slate-50 dark:hover:bg-muted'
                              )}
                              title={`${lvl.label} (${lvl.score}/5)`}
                            >
                              <span className="block truncate">{lvl.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          ) : (
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 dark:border-border rounded-2xl space-y-2 bg-slate-50/70 dark:bg-card/40">
              <h3 className="text-sm font-bold text-slate-900 dark:text-foreground">
                No individual skills yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Click &ldquo;Add Another Skill&rdquo; to create a skill and set its proficiency level.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={addFlatSkill}
            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-blue-500/60 dark:hover:border-blue-500/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Skill</span>
          </button>
        </div>
      )}

      {/* AI Suggestion Modal */}
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

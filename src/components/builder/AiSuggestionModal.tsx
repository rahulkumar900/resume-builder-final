'use client';

/**
 * @file AiSuggestionModal.tsx
 * @description Sleek popover & modal for AI suggestions supporting Experience, Skills, Projects, and Summaries.
 *
 * UX & UI Architecture:
 * - Large Screens (>= 1024px): Renders as a lightweight, non-blocking anchored popover card adjacent
 *   to the editor trigger with a speech-bubble callout pointer arrow.
 * - Small Screens / Mobile (< 1024px): Seamlessly falls back to a centered modal dialog.
 * - Instant Pre-Curated Static Library by default (0 tokens, 0 network latency, 0 lag).
 * - Segmented tactile tabs: [ Static ] and [ AI Suggestion ].
 * - Dark mode native styling matching the builder workspace.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): Focuses exclusively on presenting suggestion options,
 *   collecting section-specific user context, and dispatching insertions to caller callbacks.
 * - Dependency Inversion Principle (DIP): Depends on `IAiSuggestionProvider` (`aiSuggestionService`)
 *   for data fetching rather than coupling directly to Gemini or local heuristic functions.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  Search,
  Check,
  Copy,
  Plus,
  RefreshCw,
  X,
  Zap,
  Briefcase,
  ArrowRight,
  Edit2,
  FolderGit2,
  Wrench,
  FileText,
  GraduationCap,
  Loader2,
  SlidersHorizontal,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';
import {
  CATEGORIZED_SUMMARY_SUGGESTIONS,
  CATEGORIZED_BULLET_SUGGESTIONS,
  CATEGORIZED_PROJECT_SUGGESTIONS,
  CATEGORIZED_EDUCATION_SUGGESTIONS,
} from '@/lib/editor-constants';
import { aiSuggestionService } from '@/lib/ai/suggestion-service';
import { recordSuggestionUsage } from '@/lib/services/aiSuggestionDbService';
import {
  AiSectionType,
  AiTone,
  SeniorityLevel,
  SkillGroupSuggestion,
} from '@/lib/ai/types';
import { cn } from '@/lib/utils';

export interface AiSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string, mode: 'insert' | 'replace') => void;
  onInsertSkillGroups?: (groups: SkillGroupSuggestion[], mode: 'insert' | 'replace') => void;
  type: 'summary' | 'bullet' | 'project' | 'skills' | 'education';
  roleContext?: string;
  companyContext?: string;
  projectContext?: string;
  techContext?: string[];
  seniorityContext?: SeniorityLevel;
  onUpdateRole?: (newRole: string) => void;
  anchorRect?: DOMRect | null;
  existingText?: string;
}

interface PopoverPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  arrowTop: number;
  side: 'right' | 'left';
}

export const AiSuggestionModal: React.FC<AiSuggestionModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  onInsertSkillGroups,
  type,
  roleContext = '',
  companyContext = '',
  projectContext = '',
  techContext = [],
  seniorityContext = 'mid',
  onUpdateRole,
  anchorRect,
  existingText,
}) => {
  const [mounted, setMounted] = useState(false);
  // Default to static library for 0ms loading & 0 token cost, unless skills where AI is primary
  const [activeTab, setActiveTab] = useState<'library' | 'ai'>(() => {
    return type === 'skills' ? 'ai' : 'library';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [popoverPos, setPopoverPos] = useState<PopoverPosition | null>(null);

  // Section-specific Context State
  const initialRole = (type === 'project' ? projectContext || roleContext : roleContext) || '';
  const [currentRole, setCurrentRole] = useState(() => initialRole.trim());
  const [roleInput, setRoleInput] = useState(() => initialRole.trim());
  const [isEditingRole, setIsEditingRole] = useState(false);

  const [aiCompany, setAiCompany] = useState(() => (companyContext || '').trim());
  const [aiProject, setAiProject] = useState(() => (projectContext || '').trim());
  const [aiTechInput, setAiTechInput] = useState(() => (techContext || []).join(', '));
  const [aiTone, setAiTone] = useState<AiTone>('metrics');
  const [aiSeniority, setAiSeniority] = useState<SeniorityLevel>(seniorityContext);
  const [userFocusPrompt, setUserFocusPrompt] = useState('');

  // Generation & Provider State
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<string[]>([]);
  const [generatedSkillGroups, setGeneratedSkillGroups] = useState<SkillGroupSuggestion[]>([]);
  const [providerSource, setProviderSource] = useState<'gemini' | 'heuristic' | 'cache' | 'database' | null>(null);
  const [latencyMs, setLatencyMs] = useState<number>(0);
  const [dbItems, setDbItems] = useState<Array<{ id: string; content: string }>>([]);

  // Mount guard for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute Popover Position when anchorRect is provided on large screens
  useEffect(() => {
    if (!isOpen) return;

    const calculatePosition = () => {
      if (typeof window === 'undefined') return;
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen || !anchorRect) {
        setPopoverPos(null);
        return;
      }

      const cardWidth = 460;
      const padding = 16;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const maxCardHeight = Math.min(620, windowHeight - padding * 2);

      const spaceRight = windowWidth - anchorRect.right;
      const spaceLeft = anchorRect.left;

      let side: 'right' | 'left' = 'right';
      let left = 0;

      if (spaceRight >= cardWidth + 24) {
        side = 'right';
        left = anchorRect.right + 14;
      } else if (spaceLeft >= cardWidth + 24) {
        side = 'left';
        left = anchorRect.left - cardWidth - 14;
      } else {
        // Not enough horizontal margin for a clean side popover, fallback to center modal
        setPopoverPos(null);
        return;
      }

      const anchorCenterY = anchorRect.top + anchorRect.height / 2;
      const idealTop = anchorRect.top - 24;
      const top = Math.max(padding, Math.min(windowHeight - maxCardHeight - padding, idealTop));
      const arrowTop = Math.max(28, Math.min(maxCardHeight - 28, anchorCenterY - top));

      setPopoverPos({
        top,
        left,
        width: cardWidth,
        maxHeight: maxCardHeight,
        arrowTop,
        side,
      });
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition, true);
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition, true);
    };
  }, [isOpen, anchorRect]);

  // Sync context when props change
  useEffect(() => {
    const ctx = (type === 'project' ? projectContext || roleContext : roleContext) || '';
    const r = ctx.trim();
    const c = (companyContext || '').trim();
    const p = (projectContext || '').trim();
    setCurrentRole(r);
    setRoleInput(r);
    setAiCompany(c);
    setAiProject(p);
    setAiSeniority(seniorityContext);
  }, [roleContext, companyContext, projectContext, seniorityContext, type]);

  // Reset generation state on modal close to conserve tokens
  useEffect(() => {
    if (!isOpen) {
      setHasGenerated(false);
      setGeneratedItems([]);
      setGeneratedSkillGroups([]);
      setDbItems([]);
      setIsGenerating(false);
      setIsEditingRole(false);
      setSearchQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Execute generation on explicit user action via AiSuggestionService
  const handleGenerate = async (forceFresh = false) => {
    const targetRoleToUse = currentRole || roleInput.trim() || 'Software Engineer';
    setIsGenerating(true);

    const parsedTech = aiTechInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const sectionMapping: AiSectionType =
      type === 'bullet' || type === 'education' ? 'experience' : type;

    try {
      const res = await aiSuggestionService.generateSuggestions({
        section: sectionMapping,
        targetRole: targetRoleToUse,
        company: aiCompany || (type === 'bullet' ? 'Tech Company' : undefined),
        projectName: aiProject || (type === 'project' ? 'Flagship Project' : undefined),
        technologies: parsedTech.length > 0 ? parsedTech : techContext,
        seniorityLevel: aiSeniority,
        tone: aiTone,
        userFocusPrompt: userFocusPrompt.trim() || undefined,
        existingContent: existingText,
        forceFresh,
      });

      setGeneratedItems(res.suggestions || []);
      if (res.skillGroups) {
        setGeneratedSkillGroups(res.skillGroups);
      }
      if (res.items) {
        setDbItems(res.items);
      }
      setProviderSource(res.provider);
      setLatencyMs(res.latencyMs);
      setHasGenerated(true);
    } catch (err) {
      console.error('Failed to generate suggestions:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRole = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = roleInput.trim();
    if (!trimmed) return;
    setCurrentRole(trimmed);
    setIsEditingRole(false);
    onUpdateRole?.(trimmed);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);

    const sectionMapping: AiSectionType =
      type === 'bullet' || type === 'education' ? 'experience' : type;
    const matchingItem = dbItems.find((d) => d.content === text);
    recordSuggestionUsage({
      id: matchingItem?.id,
      role: currentRole || roleInput,
      section: sectionMapping,
      content: text,
    });
  };

  const handleInsertText = (text: string, mode: 'insert' | 'replace') => {
    onInsert(text, mode);
    const sectionMapping: AiSectionType =
      type === 'bullet' || type === 'education' ? 'experience' : type;
    const matchingItem = dbItems.find((d) => d.content === text);
    recordSuggestionUsage({
      id: matchingItem?.id,
      role: currentRole || roleInput,
      section: sectionMapping,
      content: text,
    });
    onClose();
  };

  const handleInsertSkill = (skill: string) => {
    onInsert(skill, 'insert');
    recordSuggestionUsage({
      role: currentRole || roleInput,
      section: 'skills',
      content: skill,
    });
  };

  const categories = useMemo(() => {
    if (type === 'summary') return CATEGORIZED_SUMMARY_SUGGESTIONS;
    if (type === 'project') return CATEGORIZED_PROJECT_SUGGESTIONS;
    if (type === 'education') return CATEGORIZED_EDUCATION_SUGGESTIONS;
    return CATEGORIZED_BULLET_SUGGESTIONS;
  }, [type]);

  const filteredLibrary = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    let list: { text: string; impactTag?: string; categoryLabel: string; keywords?: string[] }[] = [];

    categories.forEach((cat) => {
      if (selectedCategory === 'all' || selectedCategory === cat.id) {
        cat.items.forEach((item) => {
          list.push({ ...item, categoryLabel: cat.label });
        });
      }
    });

    if (query) {
      list = list.filter(
        (item) =>
          item.text.toLowerCase().includes(query) ||
          item.categoryLabel.toLowerCase().includes(query) ||
          item.keywords?.some((k) => k.toLowerCase().includes(query))
      );
    }

    return list;
  }, [categories, searchQuery, selectedCategory]);

  const getSectionTitle = () => {
    switch (type) {
      case 'skills':
        return 'Skills AI Assistant';
      case 'project':
        return 'Project Highlights AI';
      case 'summary':
        return 'Professional Summary AI';
      case 'education':
        return 'Education & Coursework AI';
      case 'bullet':
      default:
        return 'Experience Bullet AI';
    }
  };

  const getSectionIcon = () => {
    switch (type) {
      case 'skills':
        return <Wrench className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'summary':
        return <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'bullet':
      default:
        return <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
  };

  if (!isOpen || !mounted) return null;

  const hasRole = Boolean(currentRole && currentRole.trim().length > 0);

  // Common Inner Content for both Popover & Modal viewports
  const cardInnerContent = (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* Header Bar */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/70 dark:bg-[#1a1a18] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-2xs border border-purple-200/50 dark:border-purple-800/40">
            {getSectionIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                {getSectionTitle()}
              </h3>
              {providerSource === 'gemini' && (
                <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-purple-200 dark:border-purple-800/50">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini ({latencyMs}ms)
                </span>
              )}
              {providerSource === 'cache' && (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/50">
                  <Zap className="w-2.5 h-2.5" />
                  Instant Cache
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
              {currentRole ? `Targeting ${currentRole}` : 'Smart resume suggestions'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0 ml-2"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ROLE GATE PROMPT: if target role is empty */}
      {!hasRole ? (
        <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-4 my-auto">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100 dark:border-purple-800/50 shadow-2xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {type === 'skills'
                ? 'Specify Target Job Role'
                : type === 'project'
                ? 'Enter Project or Role Name'
                : 'Enter Target Job Title'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              To load tailored, recruiter-grade accomplishment bullets and ATS keywords, tell us what role you are targeting.
            </p>
          </div>

          <form onSubmit={handleSaveRole} className="w-full max-w-sm space-y-3 pt-1">
            <JobTitleAutocomplete
              autoFocus
              placeholder={
                type === 'skills'
                  ? 'e.g. Full Stack Developer, Data Analyst...'
                  : type === 'project'
                  ? 'e.g. AI Workflow Engine, Mobile App...'
                  : 'e.g. Senior Software Engineer, Product Manager...'
              }
              value={roleInput}
              onChange={setRoleInput}
              className="h-10 px-3.5 text-xs font-medium bg-slate-50 dark:bg-[#1a1a18] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!roleInput.trim()}
              className="w-full h-9 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      ) : (
        <>
          {/* Context Sub-Bar */}
          <div className="px-4 py-2 bg-purple-50/60 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-900/40 flex items-center justify-between gap-2 text-xs shrink-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-slate-500 dark:text-zinc-400 text-[11px]">Role:</span>
              {isEditingRole ? (
                <form onSubmit={handleSaveRole} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="bg-white dark:bg-[#1f1f1d] border border-purple-300 dark:border-purple-600 rounded px-2 py-0.5 text-xs font-bold text-purple-900 dark:text-purple-300 focus:outline-hidden max-w-[170px]"
                    autoFocus
                  />
                  <Button type="submit" size="xs" className="h-6 px-2 bg-purple-600 text-[10px]">
                    Save
                  </Button>
                </form>
              ) : (
                <span className="font-bold text-purple-900 dark:text-purple-300 truncate max-w-[220px]">
                  {currentRole}
                </span>
              )}
            </div>

            {!isEditingRole && (
              <button
                type="button"
                onClick={() => setIsEditingRole(true)}
                className="flex items-center gap-1 text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200 font-semibold text-[11px] cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Change</span>
              </button>
            )}
          </div>

          {/* Segmented Mode Tabs: [ Static ] | [ AI Suggestion ] */}
          <div className="px-4 pt-3 pb-2 bg-white dark:bg-[#161614] shrink-0">
            <div className="flex p-1 bg-slate-100 dark:bg-white/[0.06] rounded-xl gap-1">
              {type !== 'skills' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('library')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                    activeTab === 'library'
                      ? 'bg-white dark:bg-[#252523] text-slate-900 dark:text-white shadow-xs font-bold border border-slate-200/60 dark:border-white/[0.08]'
                      : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40'
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Static</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/80 dark:bg-white/[0.08] text-slate-600 dark:text-zinc-300 font-medium">
                    Curated
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer',
                  activeTab === 'ai'
                    ? 'bg-white dark:bg-[#252523] text-purple-600 dark:text-purple-400 shadow-xs font-bold border border-slate-200/60 dark:border-white/[0.08]'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40'
                )}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>AI Suggestion</span>
                {hasGenerated && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                )}
              </button>
            </div>
          </div>

          {/* TAB CONTENT: CURATED STATIC LIBRARY (0 Tokens, 0 Delay, Loads on Open) */}
          {activeTab === 'library' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400 dark:text-zinc-500" />
                <Input
                  type="text"
                  placeholder="Search curated bullets & keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pl-8 text-xs bg-slate-50 dark:bg-[#1a1a18] border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                />
              </div>

              {/* Category Filter Chips */}
              {categories.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      'px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer border',
                      selectedCategory === 'all'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-300 border-transparent hover:bg-slate-200 dark:hover:bg-white/[0.1]'
                    )}
                  >
                    All ({categories.reduce((acc, c) => acc + c.items.length, 0)})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        'px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer border',
                        selectedCategory === cat.id
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-zinc-300 border-transparent hover:bg-slate-200 dark:hover:bg-white/[0.1]'
                      )}
                    >
                      {cat.label} ({cat.items.length})
                    </button>
                  ))}
                </div>
              )}

              {/* Curated Library Item List */}
              <div className="space-y-2">
                {filteredLibrary.slice(0, 20).map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-white/[0.08] hover:border-purple-300 dark:hover:border-purple-600/50 rounded-2xl p-3 bg-white dark:bg-[#1a1a18] hover:bg-purple-50/20 dark:hover:bg-purple-950/20 transition-all shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900/40 px-2 py-0.5 rounded-full">
                        {item.categoryLabel}
                      </span>
                      {item.impactTag && (
                        <span className="text-slate-400 dark:text-zinc-500 font-medium">
                          {item.impactTag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-200 leading-relaxed">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                      <Button
                        type="button"
                        size="xs"
                        variant="ghost"
                        onClick={() => handleCopy(item.text, `lib-${idx}`)}
                        className="h-6 text-[10.5px] text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 gap-1 px-2 cursor-pointer"
                      >
                        {copiedId === `lib-${idx}` ? (
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === `lib-${idx}` ? 'Copied' : 'Copy'}</span>
                      </Button>
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          onInsert(item.text, 'replace');
                          onClose();
                        }}
                        className="h-6 text-[10.5px] border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] px-2.5 cursor-pointer"
                      >
                        Replace
                      </Button>
                      <Button
                        type="button"
                        size="xs"
                        variant="default"
                        onClick={() => {
                          onInsert(item.text, 'insert');
                          onClose();
                        }}
                        className="h-6 text-[10.5px] bg-purple-600 hover:bg-purple-700 text-white font-semibold gap-1 px-3 shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Insert</span>
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredLibrary.length === 0 && (
                  <div className="p-8 text-center text-slate-400 dark:text-zinc-500 text-xs">
                    No matching templates found in the static library.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB CONTENT: AI GENERATOR */}
          {activeTab === 'ai' && (
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5">
              {/* Compact Context & Generation Bar */}
              <div className="bg-slate-50 dark:bg-[#1a1a18] rounded-2xl p-3 border border-slate-200/80 dark:border-white/[0.08] space-y-3">
                {/* Section Specific Inputs */}
                {type === 'bullet' && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Company name (e.g. Stripe, Clinic, Startup)"
                      value={aiCompany}
                      onChange={(e) => setAiCompany(e.target.value)}
                      className="h-8 text-xs bg-white dark:bg-[#1f1f1d] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {type === 'project' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Input
                      type="text"
                      placeholder="Project name (e.g. SaaS Platform)"
                      value={aiProject}
                      onChange={(e) => setAiProject(e.target.value)}
                      className="h-8 text-xs bg-white dark:bg-[#1f1f1d] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                    <Input
                      type="text"
                      placeholder="Tech stack (e.g. Next.js, AWS, Postgres)"
                      value={aiTechInput}
                      onChange={(e) => setAiTechInput(e.target.value)}
                      className="h-8 text-xs bg-white dark:bg-[#1f1f1d] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {/* Tone Selector - Dedicated row to prevent text collision */}
                {type !== 'skills' && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold shrink-0 w-11">
                      Tone:
                    </span>
                    <div className="grid grid-cols-4 gap-1 flex-1">
                      {(['metrics', 'leadership', 'technical', 'concise'] as AiTone[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAiTone(t)}
                          className={cn(
                            'py-1 px-1 rounded-lg text-[10.5px] font-bold capitalize transition-all cursor-pointer text-center truncate',
                            aiTone === t
                              ? 'bg-purple-600 text-white shadow-2xs'
                              : 'bg-white dark:bg-[#1f1f1d] text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]'
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seniority Level Selector - Dedicated row to prevent text collision */}
                {(type === 'skills' || type === 'summary') && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-semibold shrink-0 w-11">
                      Level:
                    </span>
                    <div className="grid grid-cols-4 gap-1 flex-1">
                      {(['entry', 'mid', 'senior', 'lead'] as SeniorityLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setAiSeniority(lvl)}
                          className={cn(
                            'py-1 px-1 rounded-lg text-[10.5px] font-bold capitalize transition-all cursor-pointer text-center truncate',
                            aiSeniority === lvl
                              ? 'bg-purple-600 text-white shadow-2xs'
                              : 'bg-white dark:bg-[#1f1f1d] text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08]'
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Custom Focus Prompt Toggle */}
                <div className="space-y-1">
                  {showAdvanced ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="e.g. Focus on cloud migration, customer growth, or revenue..."
                        value={userFocusPrompt}
                        onChange={(e) => setUserFocusPrompt(e.target.value)}
                        className="h-8 text-xs bg-white dark:bg-[#1f1f1d] border-slate-200 dark:border-white/[0.1] text-slate-900 dark:text-white"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setUserFocusPrompt('');
                          setShowAdvanced(false);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(true)}
                      className="text-[11px] font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      <span>+ Add specific keyword or focus (optional)</span>
                    </button>
                  )}
                </div>

                {/* Single, Primary Action Button */}
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleGenerate(hasGenerated)}
                  disabled={isGenerating}
                  className={cn(
                    'w-full h-9 font-bold text-xs gap-1.5 shadow-sm transition-all cursor-pointer',
                    hasGenerated
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md'
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating with Gemini AI...</span>
                    </>
                  ) : hasGenerated ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Regenerate Suggestions</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                      <span>Generate AI Suggestions</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Pre-Generation State: Informative Callout (No duplicate button) */}
              {!isGenerating && !hasGenerated && (
                <div className="py-5 px-4 rounded-2xl border border-dashed border-purple-200 dark:border-purple-800/40 bg-purple-50/30 dark:bg-purple-950/20 text-center space-y-2.5 my-1">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 max-w-xs mx-auto">
                    <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                      Ready to generate tailored bullets
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
                      Click the button above to generate AI suggestions for <span className="font-semibold text-purple-700 dark:text-purple-300">{currentRole}</span>.
                    </p>
                  </div>

                  {type !== 'skills' && (
                    <div className="pt-1.5 border-t border-purple-100/80 dark:border-purple-900/30">
                      <button
                        type="button"
                        onClick={() => setActiveTab('library')}
                        className="text-[11px] font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Or view Static Library (0 AI Tokens)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="p-8 rounded-2xl border border-purple-100 dark:border-purple-900/50 bg-purple-50/20 dark:bg-purple-950/20 text-center space-y-2.5 my-2 animate-pulse">
                  <Loader2 className="w-7 h-7 text-purple-600 dark:text-purple-400 animate-spin mx-auto" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Synthesizing Tailored Suggestions...
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                      Calibrating action verbs, metrics, and ATS keywords for {currentRole}
                    </p>
                  </div>
                </div>
              )}

              {/* SUGGESTION RESULTS STATUS & BADGE */}
              {hasGenerated && (
                <div className="flex items-center justify-between px-1 text-xs">
                  {providerSource === 'database' ? (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 px-2.5 py-1 rounded-lg">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      <span>Instant Database Cache</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">• {latencyMs}ms</span>
                    </div>
                  ) : providerSource === 'gemini' ? (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50 px-2.5 py-1 rounded-lg">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Freshly Generated by Gemini</span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-normal">• {latencyMs}ms</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-zinc-300 bg-slate-50 dark:bg-[#1a1a18] border border-slate-200 dark:border-white/[0.08] px-2.5 py-1 rounded-lg">
                      <Zap className="w-3.5 h-3.5 text-slate-500" />
                      <span>Instant Session Cache</span>
                    </div>
                  )}

                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                    Click <strong className="text-slate-600 dark:text-zinc-300 font-semibold">Insert</strong> or <strong className="text-slate-600 dark:text-zinc-300 font-semibold">Replace</strong>
                  </span>
                </div>
              )}

              {/* 1. Specialized Skills Result View */}
              {type === 'skills' && generatedSkillGroups.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-medium px-1">
                    <span>Curated for {currentRole}</span>
                    {onInsertSkillGroups && (
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          onInsertSkillGroups(generatedSkillGroups, 'replace');
                          onClose();
                        }}
                        className="text-[10.5px] text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer"
                      >
                        Replace All Skills
                      </Button>
                    )}
                  </div>

                  {generatedSkillGroups.map((group, gIdx) => (
                    <div
                      key={gIdx}
                      className="border border-purple-100 dark:border-white/[0.08] bg-white dark:bg-[#1a1a18] rounded-2xl p-3.5 space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white">{group.category}</h5>
                        {onInsertSkillGroups && (
                          <Button
                            type="button"
                            size="xs"
                            variant="ghost"
                            onClick={() => onInsertSkillGroups([group], 'insert')}
                            className="text-[10px] text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 h-5 px-1.5 cursor-pointer"
                          >
                            + Add Group
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill, sIdx) => (
                          <Badge
                            key={sIdx}
                            variant="secondary"
                            className="text-xs bg-slate-100 dark:bg-white/[0.06] hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-800 dark:hover:text-purple-300 text-slate-700 dark:text-zinc-300 cursor-pointer transition-colors gap-1 pr-1.5 border border-transparent dark:border-white/[0.06]"
                            onClick={() => handleInsertSkill(skill)}
                          >
                            <span>{skill}</span>
                            <Plus className="w-3 h-3 text-slate-400 hover:text-purple-700 dark:hover:text-purple-300" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. Bullets, Project, & Summary Result View */}
              {type !== 'skills' && generatedItems.length > 0 && (
                <div className="space-y-2.5">
                  {generatedItems.map((text, idx) => (
                    <div
                      key={idx}
                      className="group relative border border-slate-200 dark:border-white/[0.08] hover:border-purple-300 dark:hover:border-purple-600/50 rounded-2xl p-3.5 bg-white dark:bg-[#1a1a18] hover:bg-purple-50/20 dark:hover:bg-purple-950/20 transition-all shadow-2xs space-y-2.5"
                    >
                      <p className="text-xs text-slate-700 dark:text-zinc-200 leading-relaxed font-normal">
                        {text}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 pt-1.5 border-t border-slate-100 dark:border-white/[0.06]">
                        <Button
                          type="button"
                          size="xs"
                          variant="ghost"
                          onClick={() => handleCopy(text, `gen-${idx}`)}
                          className="h-6 text-[10.5px] text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 gap-1 px-2 cursor-pointer"
                        >
                          {copiedId === `gen-${idx}` ? (
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedId === `gen-${idx}` ? 'Copied' : 'Copy'}</span>
                        </Button>
                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          onClick={() => handleInsertText(text, 'replace')}
                          className="h-6 text-[10.5px] border-slate-200 dark:border-white/[0.1] text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] px-2.5 cursor-pointer"
                        >
                          Replace
                        </Button>
                        <Button
                          type="button"
                          size="xs"
                          variant="default"
                          onClick={() => handleInsertText(text, 'insert')}
                          className="h-6 text-[10.5px] bg-purple-600 hover:bg-purple-700 text-white font-semibold gap-1 px-3 shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Insert</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  // Render Strategy:
  // 1. On Large Screens with anchorRect: Sleek Anchored Popover with speech-bubble callout pointer
  // 2. On Mobile / Fallback: Centered Modal Dialog
  const modalContent = popoverPos ? (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-150">
      {/* Subtle non-intrusive dismiss backdrop scrim */}
      <div
        className="absolute inset-0 bg-black/15 dark:bg-black/45 backdrop-blur-[0.5px] cursor-default"
        onClick={onClose}
      />

      {/* Anchored Popover Card Container */}
      <div
        className="fixed z-50 flex flex-col bg-white dark:bg-[#161614] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/[0.1] overflow-visible animate-in zoom-in-95 duration-150"
        style={{
          top: `${popoverPos.top}px`,
          left: `${popoverPos.left}px`,
          width: `${popoverPos.width}px`,
          maxHeight: `${popoverPos.maxHeight}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Callout Arrow Pointer */}
        {popoverPos.side === 'right' && (
          <div
            className="absolute -left-2 w-4 h-4 rotate-45 bg-white dark:bg-[#161614] border-l border-b border-slate-200/90 dark:border-white/[0.1] z-20 pointer-events-none"
            style={{ top: `${popoverPos.arrowTop - 8}px` }}
          />
        )}
        {popoverPos.side === 'left' && (
          <div
            className="absolute -right-2 w-4 h-4 rotate-45 bg-white dark:bg-[#161614] border-r border-t border-slate-200/90 dark:border-white/[0.1] z-20 pointer-events-none"
            style={{ top: `${popoverPos.arrowTop - 8}px` }}
          />
        )}

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col w-full h-full rounded-2xl overflow-hidden">
          {cardInnerContent}
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Main Centered Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-xl max-h-[88vh] flex flex-col bg-white dark:bg-[#161614] rounded-3xl shadow-2xl border border-slate-200/90 dark:border-white/[0.1] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {cardInnerContent}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

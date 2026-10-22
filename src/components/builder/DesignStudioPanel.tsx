'use client';

import React, { useState, useMemo } from 'react';
import {
  Palette,
  Type,
  LayoutTemplate,
  Sliders,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  FileText,
  Pipette,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  ResumeData,
  FontFamily,
  TemplateId,
  TypographySettings,
  LayoutSettings,
} from '@/types/resume';
import {
  TEMPLATES,
  COLOR_PALETTES,
  FONT_OPTIONS,
  getTemplateDefaults,
  migrateSectionOrder,
} from '@/lib/templates';
import { TemplateCardRealPreview } from '@/components/common/TemplateCardRealPreview';
import {
  HorizontalSnapRadioGroup,
  HorizontalSnapRadioItem,
} from './HorizontalSnapRadioGroup';

interface DesignStudioPanelProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onClose?: () => void;
  initialTab?: 'templates' | 'colors' | 'typography' | 'layout';
  isMinimal?: boolean;
}

type CategoryFilter = 'all' | 'single' | 'double' | 'creative';

const CURATED_PALETTES = [
  { name: 'Kindley Royal Blue', value: '#2563eb', category: 'Tech & Professional' },
  { name: 'Executive Navy', value: '#1e3a8a', category: 'Corporate & Finance' },
  { name: 'Slate Dark', value: '#1e293b', category: 'Corporate & ATS' },
  { name: 'Emerald Forest', value: '#059669', category: 'Modern & Clean' },
  { name: 'Charcoal Teal', value: '#0f766e', category: 'Modern Tech' },
  { name: 'Crimson Burgundy', value: '#991b1b', category: 'Executive & Legal' },
  { name: 'Royal Violet', value: '#7c3aed', category: 'Creative & Media' },
  { name: 'Warm Terracotta', value: '#c2410c', category: 'Aesthetic & Boho' },
  { name: 'Amber Gold', value: '#d97706', category: 'Creative & Warm' },
  { name: 'Canva Rose', value: '#fb7185', category: 'Creative Pastel' },
  { name: 'Electric Blue', value: '#1d4ed8', category: 'Editorial Vogue' },
  { name: 'Retro Pop Plum', value: '#2e1065', category: 'Retro Poster' },
];

const FONT_METAS: Array<{
  id: FontFamily;
  name: string;
  category: 'Modern Sans' | 'Classic Serif' | 'Tech & Clean';
  vibe: string;
  sample: string;
}> = [
  { id: 'inter', name: 'Inter', category: 'Modern Sans', vibe: 'Standard Tech Clean', sample: 'Aa Bb Cc 123' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'Modern Sans', vibe: 'Contemporary Tech', sample: 'Aa Bb Cc 123' },
  { id: 'poppins', name: 'Poppins', category: 'Modern Sans', vibe: 'Geometric & Bold', sample: 'Aa Bb Cc 123' },
  { id: 'outfit', name: 'Outfit', category: 'Modern Sans', vibe: 'High-Impact Modern', sample: 'Aa Bb Cc 123' },
  { id: 'roboto', name: 'Roboto', category: 'Tech & Clean', vibe: 'Novorésumé Clean', sample: 'Aa Bb Cc 123' },
  { id: 'sourcesans', name: 'Source Sans 3', category: 'Tech & Clean', vibe: 'Resume.io Editorial', sample: 'Aa Bb Cc 123' },
  { id: 'rubik', name: 'Rubik', category: 'Modern Sans', vibe: 'Friendly Modern', sample: 'Aa Bb Cc 123' },
  { id: 'lato', name: 'Lato', category: 'Modern Sans', vibe: 'Zety Cascade Pro', sample: 'Aa Bb Cc 123' },
  { id: 'playfair', name: 'Playfair Display', category: 'Classic Serif', vibe: 'Executive Editorial', sample: 'Aa Bb Cc 123' },
  { id: 'garamond', name: 'Garamond', category: 'Classic Serif', vibe: 'Harvard Ivy League', sample: 'Aa Bb Cc 123' },
  { id: 'merriweather', name: 'Merriweather', category: 'Classic Serif', vibe: 'Literary & Authoritative', sample: 'Aa Bb Cc 123' },
  { id: 'raleway', name: 'Raleway', category: 'Modern Sans', vibe: 'FAANG Minimalist', sample: 'Aa Bb Cc 123' },
  { id: 'opensans', name: 'Open Sans', category: 'Tech & Clean', vibe: 'Europass Universal', sample: 'Aa Bb Cc 123' },
];

export const DesignStudioPanel: React.FC<DesignStudioPanelProps> = ({
  resume,
  onChange,
  onClose,
  initialTab = 'templates',
  isMinimal = false,
}) => {
  const [activeSection, setActiveSection] = useState<'templates' | 'colors' | 'typography' | 'layout'>(initialTab);
  const [templateFilter, setTemplateFilter] = useState<CategoryFilter>('all');
  const [showAdvancedSpacing, setShowAdvancedSpacing] = useState(false);
  const [customHex, setCustomHex] = useState(resume.themeColor || '#2563eb');

  const typography = resume.typography || {};
  const layout = resume.layout || {};

  const currentTemplate = useMemo(() => {
    return TEMPLATES.find((t) => t.id === resume.templateId) || TEMPLATES[0];
  }, [resume.templateId]);

  const filteredTemplates = useMemo(() => {
    if (templateFilter === 'single') {
      return TEMPLATES.filter((t) => t.layout === 'single');
    }
    if (templateFilter === 'double') {
      return TEMPLATES.filter((t) => t.layout === 'double');
    }
    if (templateFilter === 'creative') {
      return TEMPLATES.filter(
        (t) =>
          t.id.startsWith('canva') ||
          t.id === 'santoso' ||
          t.id === 'sydney' ||
          t.id === 'enhancv'
      );
    }
    return TEMPLATES;
  }, [templateFilter]);

  const templateRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return filteredTemplates.map((t) => ({
      id: t.id,
      name: t.name,
      subtitle: t.layout === 'double' ? '2-Col' : '1-Col',
      badge: t.isPro ? 'PRO' : undefined,
    }));
  }, [filteredTemplates]);

  const colorRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return CURATED_PALETTES.map((c) => ({
      id: c.value.toLowerCase(),
      name: c.name,
      color: c.value,
    }));
  }, []);

  const fontRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return FONT_METAS.map((f) => ({
      id: f.id.toLowerCase(),
      name: f.name,
      subtitle: f.category,
    }));
  }, []);

  const spacingRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => [
    { id: 'compact', name: 'Compact', subtitle: '1 Page' },
    { id: 'normal', name: 'Balanced', subtitle: 'Standard' },
    { id: 'relaxed', name: 'Spacious', subtitle: 'Generous' },
  ], []);

  const handleSelectTemplate = (templateId: TemplateId) => {
    const defaults = getTemplateDefaults(templateId);
    const newOrder = migrateSectionOrder(resume.sectionOrder, templateId);
    onChange({
      templateId,
      sectionOrder: newOrder,
      ...defaults,
    });
  };

  const handleResetDefaults = () => {
    const defaults = getTemplateDefaults(resume.templateId);
    const defaultOrder = migrateSectionOrder(undefined, resume.templateId);
    onChange({
      ...defaults,
      sectionOrder: defaultOrder,
      spacing: 'normal',
      lineHeight: 'normal',
      typography: undefined,
      layout: undefined,
    });
  };

  const handleCustomHexChange = (hex: string) => {
    setCustomHex(hex);
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
      onChange({ themeColor: hex });
    }
  };

  const updateTypography = (changes: Partial<TypographySettings>) => {
    onChange({ typography: { ...typography, ...changes } });
  };

  const updateLayout = (changes: Partial<LayoutSettings>) => {
    onChange({ layout: { ...layout, ...changes } });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/70 dark:bg-background border-r border-slate-200 dark:border-border select-none">
      {/* 1. Header Bar */}
      <div className={`bg-white dark:bg-card border-b border-slate-200 dark:border-border shrink-0 ${isMinimal ? 'px-3 py-2' : 'p-4 sm:px-6 sm:pt-5 sm:pb-4'}`}>
        {isMinimal ? (
          /* Minimal 1-row header for Mobile Bottom Sheet: Section Pills + Reset & Done */
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 p-0.5 bg-slate-100/90 dark:bg-muted/60 rounded-xl overflow-x-auto no-scrollbar flex-1">
              <button
                type="button"
                onClick={() => setActiveSection('templates')}
                className={`flex-1 py-1 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'templates'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <LayoutTemplate className="w-3 h-3 shrink-0" />
                <span>Templates</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('colors')}
                className={`flex-1 py-1 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'colors'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Palette className="w-3 h-3 shrink-0" />
                <span>Colors</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('typography')}
                className={`flex-1 py-1 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'typography'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Type className="w-3 h-3 shrink-0" />
                <span>Fonts</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('layout')}
                className={`flex-1 py-1 px-1.5 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'layout'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3 h-3 shrink-0" />
                <span>Spacing</span>
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-muted hover:bg-slate-200 dark:hover:bg-accent rounded-lg transition-colors cursor-pointer"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-2.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <span>Done</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Desktop Header */
          <>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-base font-bold text-slate-900 dark:text-foreground leading-tight">
                    Design Studio
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium">
                    Live changes reflect instantly on canvas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Reset font, accent color, and spacing to this template's original defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Done</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Section Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-muted/60 rounded-xl overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveSection('templates')}
                className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'templates'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <LayoutTemplate className="w-3.5 h-3.5 shrink-0" />
                <span>Templates</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('colors')}
                className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'colors'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5 shrink-0" />
                <span>Colors</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('typography')}
                className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'typography'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Type className="w-3.5 h-3.5 shrink-0" />
                <span>Typography</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('layout')}
                className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  activeSection === 'layout'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 shrink-0" />
                <span>Spacing</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* 2. Scrollable Body Content */}
      <div className={`flex-1 overflow-y-auto ${isMinimal ? 'p-2.5 space-y-2' : 'p-4 sm:p-6 space-y-6'}`}>
        {/* ===================== SECTION 1: TEMPLATES ===================== */}
        {activeSection === 'templates' && (
          <div className={isMinimal ? 'space-y-2.5' : 'space-y-4'}>
            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {[
                { id: 'all', label: `All (${TEMPLATES.length})` },
                { id: 'single', label: 'Single Col' },
                { id: 'double', label: '2-Column' },
                { id: 'creative', label: 'Creative' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setTemplateFilter(f.id as CategoryFilter)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    templateFilter === f.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-border hover:bg-slate-100 dark:hover:bg-muted'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Template Display: Minimal Horizontal Snap Radio Group OR Full Preview Cards */}
            {isMinimal ? (
              <HorizontalSnapRadioGroup
                items={templateRadioItems}
                activeId={resume.templateId}
                onSelect={(item) => handleSelectTemplate(item.id as TemplateId)}
              />
            ) : (
              /* Full Template Cards Grid with Real Preview */
              <div className="grid grid-cols-2 gap-3">
                {filteredTemplates.map((t) => {
                  const isSelected = resume.templateId === t.id;

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTemplate(t.id)}
                      className={`group relative rounded-2xl border-2 p-3 transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-card hover:shadow-xs'
                      }`}
                    >
                      {/* Real Template Miniature Preview */}
                      <div className="w-full aspect-[794/1123] mb-2.5 rounded-lg overflow-hidden border border-slate-200/90 dark:border-border shadow-2xs relative group-hover:shadow-md transition-all bg-white dark:bg-card flex items-center justify-center">
                        <TemplateCardRealPreview
                          templateId={t.id}
                          themeColor={isSelected ? resume.themeColor : t.accentColor}
                          customName={resume.personalInfo?.fullName}
                          customRole={resume.personalInfo?.jobTitle}
                          className="w-full h-full"
                        />

                        {/* Selected Ribbon Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md ring-2 ring-white z-10 animate-in zoom-in-50 duration-150">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Template Meta */}
                      <div>
                        <div className="font-bold text-slate-900 dark:text-foreground text-xs sm:text-[13px] leading-tight line-clamp-1">
                          {t.name}
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-muted-foreground font-medium">
                          <span className="capitalize">{t.layout || 'single'} Col</span>
                          {t.isPro ? (
                            <span className="text-amber-700 bg-amber-100 font-bold px-1.5 py-0.2 rounded">
                              PRO
                            </span>
                          ) : (
                            <span className="text-slate-400">{t.subtitle || 'ATS Ready'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================== SECTION 2: COLORS ===================== */}
        {activeSection === 'colors' && (
          <div className={isMinimal ? 'space-y-2' : 'space-y-6'}>
            {isMinimal ? (
              <div className="flex items-center gap-1.5 w-full">
                {/* Native Custom Color Picker Trigger */}
                <label className="shrink-0 relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 dark:border-border bg-white dark:bg-card text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-muted select-none shadow-2xs ml-3">
                  <input
                    type="color"
                    value={resume.themeColor || '#2563eb'}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white dark:border-zinc-800 shadow-2xs flex items-center justify-center shrink-0"
                    style={{ backgroundColor: resume.themeColor }}
                  >
                    <Pipette className="w-2 h-2 text-white drop-shadow-sm" />
                  </div>
                  <span className="font-semibold text-xs whitespace-nowrap">Pick</span>
                </label>

                {/* Horizontal Snap-Centered Swatches */}
                <div className="flex-1 min-w-0">
                  <HorizontalSnapRadioGroup
                    items={colorRadioItems}
                    activeId={(resume.themeColor || '#2563eb').toLowerCase()}
                    onSelect={(item) => handleCustomHexChange(item.color || item.id)}
                  />
                </div>
              </div>
            ) : (
              /* Original Full Cards for Desktop */
              <>
                {/* Custom Color Input */}
                <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-2xs p-3.5 space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-2">
                    <span>Custom Accent Color</span>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-muted-foreground uppercase">
                      {resume.themeColor}
                    </span>
                  </label>

                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-slate-200 dark:border-border shrink-0 shadow-2xs cursor-pointer group">
                      <input
                        type="color"
                        value={resume.themeColor || '#2563eb'}
                        onChange={(e) => handleCustomHexChange(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        title="Pick custom color"
                      />
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: resume.themeColor }}
                      >
                        <Pipette className="w-3.5 h-3.5 text-white drop-shadow-sm opacity-90 group-hover:opacity-100" />
                      </div>
                    </div>

                    <div className="flex-1 relative flex items-center">
                      <span className="absolute left-2.5 text-slate-400 dark:text-muted-foreground font-mono text-xs">#</span>
                      <input
                        type="text"
                        value={customHex.replace('#', '')}
                        onChange={(e) => handleCustomHexChange(`#${e.target.value}`)}
                        placeholder="2563eb"
                        maxLength={6}
                        className="w-full pl-6 pr-2.5 py-1.5 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-lg font-mono text-xs font-semibold text-slate-800 dark:text-foreground uppercase focus:bg-white dark:focus:bg-card focus:border-emerald-600 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Curated Color Swatches */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                    Recruiter-Approved Palettes
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {CURATED_PALETTES.map((color) => {
                      const isSelected =
                        resume.themeColor?.toLowerCase() === color.value.toLowerCase();

                      return (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleCustomHexChange(color.value)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-emerald-700 bg-emerald-50/70 dark:bg-emerald-950/50 shadow-xs ring-1 ring-blue-500/30'
                              : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full shrink-0 shadow-2xs border border-white flex items-center justify-center"
                            style={{ backgroundColor: color.value }}
                          >
                            {isSelected && (
                              <Check className="w-3 h-3 text-white stroke-[3] drop-shadow-xs" />
                            )}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-foreground truncate">
                              {color.name}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-muted-foreground truncate">
                              {color.category}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===================== SECTION 3: TYPOGRAPHY ===================== */}
        {activeSection === 'typography' && (
          <div className={isMinimal ? 'space-y-2' : 'space-y-6'}>
            {isMinimal ? (
              /* Minimal: Horizontal Scrollable Radio Rows for Fonts, Scale & Line Height */
              <div className="space-y-2">
                {/* Horizontal Snap Radio Row: Font Families */}
                <HorizontalSnapRadioGroup
                  items={fontRadioItems}
                  activeId={(resume.fontFamily || 'inter').toLowerCase()}
                  onSelect={(item) => {
                    onChange({ fontFamily: item.id as FontFamily });
                    updateTypography({ primaryFont: item.id as FontFamily });
                  }}
                />

                {/* Horizontal Radio Row: Scale & Line Height */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 pt-1.5 border-t border-slate-100 dark:border-border/60">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase shrink-0">
                    Size:
                  </span>
                  {[
                    { id: 'compact', label: 'Compact', sizes: { primaryHeading: 20, secondaryHeading: 14, sectionTitle: 12, body: 9 } },
                    { id: 'normal', label: 'Normal', sizes: { primaryHeading: 24, secondaryHeading: 16, sectionTitle: 14, body: 10 } },
                    { id: 'large', label: 'Large', sizes: { primaryHeading: 28, secondaryHeading: 18, sectionTitle: 16, body: 11 } },
                  ].map((s) => {
                    const currentBody = typography.sizes?.body || 10;
                    const isMatch =
                      (s.id === 'compact' && currentBody <= 9) ||
                      (s.id === 'normal' && currentBody === 10) ||
                      (s.id === 'large' && currentBody >= 11);

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => updateTypography({ sizes: s.sizes })}
                        className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                          isMatch
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                            : 'border-slate-200 dark:border-border bg-white dark:bg-card text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                            isMatch
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-slate-300 dark:border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isMatch && <span className="w-1 h-1 rounded-full bg-white" />}
                        </span>
                        <span className="whitespace-nowrap">{s.label}</span>
                      </button>
                    );
                  })}

                  <span className="h-3 w-[1px] bg-slate-200 dark:bg-border mx-1 shrink-0" />

                  <span className="text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase shrink-0">
                    Line:
                  </span>
                  {[
                    { id: 'tight', label: 'Tight', value: 1.3 },
                    { id: 'normal', label: 'Standard', value: 1.5 },
                    { id: 'relaxed', label: 'Relaxed', value: 1.75 },
                  ].map((lh) => {
                    const currentLh = typography.lineHeight || 1.5;
                    const isMatch = Math.abs(currentLh - lh.value) < 0.15;

                    return (
                      <button
                        key={lh.id}
                        type="button"
                        onClick={() => {
                          onChange({ lineHeight: lh.id as any });
                          updateTypography({ lineHeight: lh.value });
                        }}
                        className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                          isMatch
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                            : 'border-slate-200 dark:border-border bg-white dark:bg-card text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                            isMatch
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-slate-300 dark:border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isMatch && <span className="w-1 h-1 rounded-full bg-white" />}
                        </span>
                        <span className="whitespace-nowrap">{lh.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Original Desktop Typography */
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Font Family
                    </h3>
                    <span className="text-[11px] font-semibold text-emerald-700 capitalize">
                      {resume.fontFamily || 'Inter'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FONT_METAS.map((font) => {
                      const isSelected =
                        (resume.fontFamily || 'inter').toLowerCase() === font.id.toLowerCase();

                      return (
                        <div
                          key={font.id}
                          onClick={() => {
                            onChange({ fontFamily: font.id });
                            updateTypography({ primaryFont: font.id });
                          }}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs ring-2 ring-blue-500/20'
                              : 'border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-card'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-slate-900 dark:text-foreground text-sm leading-tight">
                              {font.name}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-muted-foreground mt-1 font-medium">
                            {font.vibe}
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-border text-xs text-slate-700 dark:text-slate-300">
                            {font.sample}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Smart Density Font Sizing */}
                <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-2xs p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-foreground">Scale &amp; Size</h4>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        id: 'compact',
                        label: 'Compact',
                        desc: 'Fit 1 page',
                        sizes: { primaryHeading: 20, secondaryHeading: 14, sectionTitle: 12, body: 9 },
                      },
                      {
                        id: 'normal',
                        label: 'Normal',
                        desc: 'Balanced',
                        sizes: { primaryHeading: 24, secondaryHeading: 16, sectionTitle: 14, body: 10 },
                      },
                      {
                        id: 'large',
                        label: 'Spacious',
                        desc: 'High legibility',
                        sizes: { primaryHeading: 28, secondaryHeading: 18, sectionTitle: 16, body: 11 },
                      },
                    ].map((s) => {
                      const currentBody = typography.sizes?.body || 10;
                      const isMatch =
                        (s.id === 'compact' && currentBody <= 9) ||
                        (s.id === 'normal' && currentBody === 10) ||
                        (s.id === 'large' && currentBody >= 11);

                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            updateTypography({ sizes: s.sizes });
                          }}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isMatch
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                              : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted text-slate-700 dark:text-slate-300 font-medium'
                          }`}
                        >
                          <div className="text-xs font-bold">{s.label}</div>
                          <div className="text-[10px] text-slate-400 dark:text-muted-foreground mt-0.5">{s.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Line Spacing Presets */}
                <div className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-2xs p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-foreground">Line Height</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'tight', label: 'Tight', value: 1.3 },
                      { id: 'normal', label: 'Standard', value: 1.5 },
                      { id: 'relaxed', label: 'Relaxed', value: 1.75 },
                    ].map((lh) => {
                      const currentLh = typography.lineHeight || 1.5;
                      const isMatch = Math.abs(currentLh - lh.value) < 0.15;

                      return (
                        <button
                          key={lh.id}
                          type="button"
                          onClick={() => {
                            onChange({ lineHeight: lh.id as any });
                            updateTypography({ lineHeight: lh.value });
                          }}
                          className={`py-1.5 px-2 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                            isMatch
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                              : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:bg-slate-50 dark:hover:bg-muted text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {lh.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===================== SECTION 4: SPACING & LAYOUT ===================== */}
        {activeSection === 'layout' && (
          <div className={isMinimal ? 'space-y-2' : 'space-y-6'}>
            {isMinimal ? (
              /* Minimal: Horizontal Scrollable Radio Rows for Spacing & Layout */
              <div className="space-y-2">
                {/* Spacing Presets Horizontal Snap Radio Row */}
                <HorizontalSnapRadioGroup
                  items={spacingRadioItems}
                  activeId={resume.spacing || 'normal'}
                  onSelect={(item) => onChange({ spacing: item.id as any })}
                />

                {/* Page Format & Date Display Horizontal Radio Row */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 pt-1.5 border-t border-slate-100 dark:border-border/60">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase shrink-0">
                    Paper:
                  </span>
                  {[
                    { id: 'A4', label: 'A4' },
                    { id: 'Letter', label: 'US Letter' },
                  ].map((fmt) => {
                    const isSelected = (layout.format || 'A4') === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => updateLayout({ format: fmt.id as any })}
                        className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                            : 'border-slate-200 dark:border-border bg-white dark:bg-card text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-slate-300 dark:border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <span className="w-1 h-1 rounded-full bg-white" />}
                        </span>
                        <span className="whitespace-nowrap">{fmt.label}</span>
                      </button>
                    );
                  })}

                  <span className="h-3 w-[1px] bg-slate-200 dark:bg-border mx-1 shrink-0" />

                  <span className="text-[11px] font-bold text-slate-400 dark:text-muted-foreground uppercase shrink-0">
                    Dates:
                  </span>
                  {[
                    { id: 'Short Name (Jan YYYY)', label: 'Jan 2023' },
                    { id: 'Numeric (01/2023)', label: '01/2023' },
                    { id: 'Year Only (2023)', label: 'Year Only' },
                    { id: 'Hidden', label: 'Hidden' },
                  ].map((df) => {
                    const isSelected = (layout.dateFormat || 'Short Name (Jan YYYY)') === df.id;
                    return (
                      <button
                        key={df.id}
                        type="button"
                        onClick={() => updateLayout({ dateFormat: df.id as any })}
                        className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold shadow-2xs'
                            : 'border-slate-200 dark:border-border bg-white dark:bg-card text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-slate-300 dark:border-zinc-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <span className="w-1 h-1 rounded-full bg-white" />}
                        </span>
                        <span className="whitespace-nowrap">{df.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Original Desktop Spacing */
              <>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                    Document Spacing Preset
                  </h3>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      {
                        id: 'compact',
                        title: 'Compact',
                        desc: 'Pack more content on 1 page',
                        icon: Minimize2,
                      },
                      {
                        id: 'normal',
                        title: 'Balanced',
                        desc: 'Standard clean spacing',
                        icon: Layers,
                      },
                      {
                        id: 'relaxed',
                        title: 'Spacious',
                        desc: 'Generous white space',
                        icon: Maximize2,
                      },
                    ].map((item) => {
                      const isSelected = (resume.spacing || 'normal') === item.id;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onChange({ spacing: item.id as any })}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                            isSelected
                              ? 'border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs ring-2 ring-blue-500/20'
                              : 'border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-card'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon
                              className={`w-4 h-4 ${
                                isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-muted-foreground'
                              }`}
                            />
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 dark:text-foreground mt-2">{item.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-muted-foreground mt-0.5 leading-snug">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paper Format & Date Format */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Page Format</label>
                    <select
                      value={layout.format || 'A4'}
                      onChange={(e) => updateLayout({ format: e.target.value as any })}
                      className="w-full p-2 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-xl text-xs font-semibold text-slate-800 dark:text-foreground cursor-pointer focus:bg-white dark:focus:bg-card focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="A4">A4 (210 × 297 mm — Global Standard)</option>
                      <option value="Letter">US Letter (8.5 × 11 in — US/Canada)</option>
                    </select>
                  </div>

                  <div className="p-3.5 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Date Display</label>
                    <select
                      value={layout.dateFormat || 'Short Name (Jan YYYY)'}
                      onChange={(e) => updateLayout({ dateFormat: e.target.value as any })}
                      className="w-full p-2 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-xl text-xs font-semibold text-slate-800 dark:text-foreground cursor-pointer focus:bg-white dark:focus:bg-card focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Short Name (Jan YYYY)">Short Name (e.g. Jan 2023)</option>
                      <option value="Numeric (01/2023)">Numeric (e.g. 01/2023)</option>
                      <option value="Year Only (2023)">Year Only (e.g. 2023)</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Expandable Advanced Fine-Tuning */}
            <div className="pt-2 border-t border-slate-200 dark:border-border">
              <button
                type="button"
                onClick={() => setShowAdvancedSpacing(!showAdvancedSpacing)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 py-2 cursor-pointer"
              >
                <span>Advanced Margin &amp; Gap Fine-Tuning</span>
                {showAdvancedSpacing ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 dark:text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 dark:text-muted-foreground" />
                )}
              </button>

              {showAdvancedSpacing && (
                <div className="p-4 mt-2 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Page Margins (Top &amp; Bottom)</span>
                      <span className="font-mono text-slate-500 dark:text-muted-foreground">
                        {layout.margins?.topBottom ?? 0.5} in
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.2"
                      step="0.05"
                      value={layout.margins?.topBottom ?? 0.5}
                      onChange={(e) =>
                        updateLayout({
                          margins: {
                            ...(layout.margins || {}),
                            topBottom: parseFloat(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Section Gap</span>
                      <span className="font-mono text-slate-500 dark:text-muted-foreground">
                        {layout.spacing?.betweenSections ?? 20} pt
                      </span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="40"
                      step="1"
                      value={layout.spacing?.betweenSections ?? 20}
                      onChange={(e) =>
                        updateLayout({
                          spacing: {
                            ...(layout.spacing || {}),
                            betweenSections: parseFloat(e.target.value),
                          },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

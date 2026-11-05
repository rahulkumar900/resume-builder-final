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
  Info,
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
  getEffectiveTemplateConfig,
  applyTemplateConfig,
  getTemplateDefaultConfig,
  RESUME_RECOMMENDED_LIMITS,
  TemplateCustomConfig,
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
  { id: 'manrope', name: 'Manrope', category: 'Modern Sans', vibe: 'Executive Finance Geometric', sample: 'Aa Bb Cc 123' },
  { id: 'space_grotesk', name: 'Space Grotesk', category: 'Modern Sans', vibe: 'Creative Studio Modern', sample: 'Aa Bb Cc 123' },
  { id: 'raleway', name: 'Raleway', category: 'Modern Sans', vibe: 'FAANG Minimalist', sample: 'Aa Bb Cc 123' },
  { id: 'opensans', name: 'Open Sans', category: 'Tech & Clean', vibe: 'Europass Universal', sample: 'Aa Bb Cc 123' },
  { id: 'times', name: 'Times New Roman', category: 'Classic Serif', vibe: 'Traditional Harvard', sample: 'Aa Bb Cc 123' },
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
  const [customHex, setCustomHex] = useState(resume.themeColor || '#2563eb');

  const config = useMemo(() => getEffectiveTemplateConfig(resume), [resume]);
  const layout = resume.layout || {};

  const updateConfig = (updates: Partial<TemplateCustomConfig>) => {
    onChange(applyTemplateConfig(resume, updates));
  };

  const filteredTemplates = useMemo(() => {
    if (templateFilter === 'single') {
      return TEMPLATES.filter((t) => t.layout === 'single');
    }
    if (templateFilter === 'double') {
      return TEMPLATES.filter((t) => t.layout === 'double');
    }
    if (templateFilter === 'creative') {
      return TEMPLATES.filter((t) =>
        ['santoso', 'rahadian', 'canva', 'canvapastel', 'canvaeditorial', 'neon_creative', 'creative_portfolio', 'boxed_engineer'].includes(t.id)
      );
    }
    return TEMPLATES;
  }, [templateFilter]);

  const templateRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return TEMPLATES.map((t) => ({
      id: t.id,
      name: t.name,
      subtitle: t.layout === 'double' ? '2-Col' : '1-Col',
      badge: t.isPro ? 'PRO' : undefined,
    }));
  }, []);

  const colorRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return CURATED_PALETTES.map((c) => ({
      id: c.value,
      name: c.name.split(' ')[0],
      subtitle: c.category.split('&')[0].trim(),
      colorDot: c.value,
    }));
  }, []);

  const fontRadioItems = useMemo<HorizontalSnapRadioItem[]>(() => {
    return FONT_METAS.map((f) => ({
      id: f.id,
      name: f.name,
      subtitle: f.category.split(' ')[0],
    }));
  }, []);

  const handleSelectTemplate = (templateId: TemplateId) => {
    const defaults = getTemplateDefaultConfig(templateId);
    const newOrder = migrateSectionOrder(resume.sectionOrder, templateId);
    onChange({
      templateId,
      sectionOrder: newOrder,
      ...applyTemplateConfig(resume, defaults),
    });
  };

  const handleResetDefaults = () => {
    const defaults = getTemplateDefaultConfig(resume.templateId);
    const defaultOrder = migrateSectionOrder(undefined, resume.templateId);
    onChange({
      ...applyTemplateConfig(resume, defaults),
      sectionOrder: defaultOrder,
    });
  };

  const handleCustomHexChange = (hex: string) => {
    setCustomHex(hex);
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
      updateConfig({ accentColor: hex });
    }
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
                <span>Typography</span>
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
                <span>Layout</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-muted transition-colors cursor-pointer shrink-0"
              title="Reset template defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Desktop Header */
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-foreground tracking-tight">
                    Template Studio
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-muted-foreground font-medium">
                    Configure font family, sizing, padding &amp; spacing with resume-standard guidelines
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-border"
                  title="Reset all settings to this template's original recommended defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-muted transition-colors cursor-pointer"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100/90 dark:bg-muted/60 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveSection('templates')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeSection === 'templates'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <LayoutTemplate className="w-3.5 h-3.5" />
                <span>Templates</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('colors')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeSection === 'colors'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Colors</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('typography')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeSection === 'typography'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Typography</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSection('layout')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeSection === 'layout'
                    ? 'bg-white dark:bg-card text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Spacing</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* 2. Scrollable Body Content */}
      <div className={`flex-1 overflow-y-auto no-scrollbar ${isMinimal ? 'p-3' : 'p-4 sm:p-6 space-y-6'}`}>
        {/* ===================== SECTION 1: TEMPLATES ===================== */}
        {activeSection === 'templates' && (
          <div className="space-y-4">
            {isMinimal ? (
              <HorizontalSnapRadioGroup
                items={templateRadioItems}
                activeId={resume.templateId || 'prawira'}
                onSelect={(item) => handleSelectTemplate(item.id as TemplateId)}
              />
            ) : (
              <>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'all', label: `All (${TEMPLATES.length})` },
                    { id: 'single', label: '1-Column' },
                    { id: 'double', label: '2-Column' },
                    { id: 'creative', label: 'Creative' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTemplateFilter(f.id as CategoryFilter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                        templateFilter === f.id
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-white dark:bg-card border border-slate-200 dark:border-border text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {filteredTemplates.map((t) => {
                    const isSelected = (resume.templateId || 'prawira') === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleSelectTemplate(t.id)}
                        className={`group relative rounded-2xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col bg-white dark:bg-card ${
                          isSelected
                            ? 'border-emerald-700 ring-2 ring-emerald-500/20 shadow-md'
                            : 'border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
                        }`}
                      >
                        <div className="relative aspect-[210/297] w-full bg-slate-50 dark:bg-muted/40 border-b border-slate-100 dark:border-border overflow-hidden">
                          <TemplateCardRealPreview templateId={t.id} themeColor={t.accentColor} />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-slate-900 dark:text-foreground truncate">
                              {t.name}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              {t.layout}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-slate-400 dark:text-muted-foreground mt-0.5 line-clamp-1">
                            {t.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ===================== SECTION 2: ACCENT COLOR ===================== */}
        {activeSection === 'colors' && (
          <div className={isMinimal ? 'space-y-3' : 'space-y-6'}>
            {isMinimal ? (
              <HorizontalSnapRadioGroup
                items={colorRadioItems}
                activeId={resume.themeColor || '#2563eb'}
                onSelect={(item) => updateConfig({ accentColor: item.id })}
              />
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                      Curated Palettes
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full shadow-2xs border border-white"
                        style={{ backgroundColor: config.accentColor }}
                      />
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {config.accentColor.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {CURATED_PALETTES.map((palette) => {
                      const isSelected = config.accentColor.toLowerCase() === palette.value.toLowerCase();
                      return (
                        <div
                          key={palette.value}
                          onClick={() => updateConfig({ accentColor: palette.value })}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-2xs'
                              : 'border-slate-200 dark:border-border hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-card'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-5 h-5 rounded-full shrink-0 shadow-2xs border border-black/10"
                              style={{ backgroundColor: palette.value }}
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 dark:text-foreground truncate">
                                {palette.name}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-muted-foreground truncate">
                                {palette.category}
                              </p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 ml-1" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Hex Color Picker */}
                <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-foreground flex items-center gap-1.5">
                    <Pipette className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Custom Hex Color</span>
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => updateConfig({ accentColor: e.target.value })}
                      className="w-10 h-10 rounded-xl border border-slate-300 dark:border-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={customHex}
                      onChange={(e) => handleCustomHexChange(e.target.value)}
                      placeholder="#2563eb"
                      maxLength={7}
                      className="flex-1 p-2 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-xl text-xs font-mono font-bold uppercase focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ===================== SECTION 3: TYPOGRAPHY ===================== */}
        {activeSection === 'typography' && (
          <div className="space-y-5">
            {/* 1. Single Universal Font Family Selector */}
            {isMinimal ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Resume Font Family
                  </span>
                  <span className="text-xs font-bold text-emerald-700 capitalize">
                    {config.fontFamily}
                  </span>
                </div>
                <HorizontalSnapRadioGroup
                  items={fontRadioItems}
                  activeId={config.fontFamily}
                  onSelect={(item) => updateConfig({ fontFamily: item.id as FontFamily })}
                />
              </div>
            ) : (
              <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-foreground uppercase tracking-wider">
                      Resume Font Family
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-muted-foreground mt-0.5">
                      Unified typeface applied consistently across all headings &amp; body
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold capitalize">
                    {FONT_METAS.find((f) => f.id === config.fontFamily)?.name || config.fontFamily}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                  {FONT_METAS.map((font) => {
                    const isSelected = config.fontFamily.toLowerCase() === font.id.toLowerCase();
                    return (
                      <div
                        key={font.id}
                        onClick={() => updateConfig({ fontFamily: font.id })}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-2xs ring-1 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-border hover:border-slate-300 bg-white dark:bg-card'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-foreground">
                            {font.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-muted-foreground mt-0.5">
                          {font.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Sizing Presets */}
            <div className="p-3 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Quick Scale Preset
                </span>
                <span className="text-[10px] text-slate-400">All levels auto-scaled</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: 'compact',
                    label: 'Compact',
                    desc: '1-Page Target',
                    sizes: { header: 20, section: 12, sub: 11.5, body: 9.5, line: 1.35 },
                  },
                  {
                    id: 'normal',
                    label: 'Balanced',
                    desc: 'Standard',
                    sizes: { header: 24, section: 13, sub: 12.5, body: 10, line: 1.45 },
                  },
                  {
                    id: 'spacious',
                    label: 'Spacious',
                    desc: 'High Legibility',
                    sizes: { header: 28, section: 14, sub: 13.5, body: 11, line: 1.6 },
                  },
                ].map((s) => {
                  const isMatch = Math.abs(config.bodySize - s.sizes.body) < 0.3;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() =>
                        updateConfig({
                          headerSize: s.sizes.header,
                          sectionHeaderSize: s.sizes.section,
                          subHeaderSize: s.sizes.sub,
                          bodySize: s.sizes.body,
                          lineHeight: s.sizes.line,
                        })
                      }
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

            {/* Level 1: Candidate Name / Main Header */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    1. Header (Candidate Name) Size
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.header.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.headerSize} pt
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Size Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.header.min}pt – {RESUME_RECOMMENDED_LIMITS.header.max}pt</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.header.min}
                  max={RESUME_RECOMMENDED_LIMITS.header.max}
                  step={RESUME_RECOMMENDED_LIMITS.header.step}
                  value={config.headerSize}
                  onChange={(e) => updateConfig({ headerSize: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Level 2: Section Headers (EXPERIENCE, EDUCATION, SKILLS) */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    2. Section Headers Size
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.sectionHeader.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.sectionHeaderSize} pt
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Size Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.sectionHeader.min}pt – {RESUME_RECOMMENDED_LIMITS.sectionHeader.max}pt</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.sectionHeader.min}
                  max={RESUME_RECOMMENDED_LIMITS.sectionHeader.max}
                  step={RESUME_RECOMMENDED_LIMITS.sectionHeader.step}
                  value={config.sectionHeaderSize}
                  onChange={(e) => updateConfig({ sectionHeaderSize: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Level 3: Sub-Headers (Job Titles, Roles, Universities) */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    3. Sub-Headers (Roles &amp; Companies) Size
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.subHeader.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.subHeaderSize} pt
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Size Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.subHeader.min}pt – {RESUME_RECOMMENDED_LIMITS.subHeader.max}pt</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.subHeader.min}
                  max={RESUME_RECOMMENDED_LIMITS.subHeader.max}
                  step={RESUME_RECOMMENDED_LIMITS.subHeader.step}
                  value={config.subHeaderSize}
                  onChange={(e) => updateConfig({ subHeaderSize: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Level 4: Normal Body Text (Bullets, Summary, Descriptions) */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    4. Normal Body Text &amp; Bullets Size
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.body.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.bodySize} pt
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Size Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.body.min}pt – {RESUME_RECOMMENDED_LIMITS.body.max}pt</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.body.min}
                  max={RESUME_RECOMMENDED_LIMITS.body.max}
                  step={RESUME_RECOMMENDED_LIMITS.body.step}
                  value={config.bodySize}
                  onChange={(e) => updateConfig({ bodySize: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Line Height Control */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    Line Height (Line Spacing)
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.lineHeight.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.lineHeight}
                </span>
              </div>

              <input
                type="range"
                min={RESUME_RECOMMENDED_LIMITS.lineHeight.min}
                max={RESUME_RECOMMENDED_LIMITS.lineHeight.max}
                step={RESUME_RECOMMENDED_LIMITS.lineHeight.step}
                value={config.lineHeight}
                onChange={(e) => updateConfig({ lineHeight: parseFloat(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* ===================== SECTION 4: SPACING & LAYOUT ===================== */}
        {activeSection === 'layout' && (
          <div className="space-y-5">
            {/* Quick Spacing Preset */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
                Document Spacing Preset
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'compact',
                    title: 'Compact',
                    desc: 'Fit 1 page target',
                    icon: Minimize2,
                    padding: 24,
                    spacing: 14,
                  },
                  {
                    id: 'normal',
                    title: 'Balanced',
                    desc: 'Standard clean spacing',
                    icon: Layers,
                    padding: 32,
                    spacing: 18,
                  },
                  {
                    id: 'relaxed',
                    title: 'Spacious',
                    desc: 'Generous white space',
                    icon: Maximize2,
                    padding: 42,
                    spacing: 24,
                  },
                ].map((item) => {
                  const isSelected = Math.abs(config.pagePadding - item.padding) < 5;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        updateConfig({
                          pagePadding: item.padding,
                          sectionSpacing: item.spacing,
                        })
                      }
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-xs ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-border bg-white dark:bg-card hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`} />
                        {isSelected && (
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-bold text-slate-900 dark:text-foreground">{item.title}</div>
                        <div className="text-[10px] text-slate-400 dark:text-muted-foreground mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Page Padding Slider */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    Page Margins &amp; Padding
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.pagePadding.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.pagePadding} px
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Margin Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.pagePadding.min}px – {RESUME_RECOMMENDED_LIMITS.pagePadding.max}px</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.pagePadding.min}
                  max={RESUME_RECOMMENDED_LIMITS.pagePadding.max}
                  step={RESUME_RECOMMENDED_LIMITS.pagePadding.step}
                  value={config.pagePadding}
                  onChange={(e) => updateConfig({ pagePadding: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Custom Section Spacing Slider */}
            <div className="p-4 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-foreground">
                    Section Gap &amp; Spacing
                  </h4>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                    {RESUME_RECOMMENDED_LIMITS.sectionSpacing.guideline}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-muted text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {config.sectionSpacing} pt
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Spacing Slider</span>
                  <span className="font-mono">{RESUME_RECOMMENDED_LIMITS.sectionSpacing.min}pt – {RESUME_RECOMMENDED_LIMITS.sectionSpacing.max}pt</span>
                </div>
                <input
                  type="range"
                  min={RESUME_RECOMMENDED_LIMITS.sectionSpacing.min}
                  max={RESUME_RECOMMENDED_LIMITS.sectionSpacing.max}
                  step={RESUME_RECOMMENDED_LIMITS.sectionSpacing.step}
                  value={config.sectionSpacing}
                  onChange={(e) => updateConfig({ sectionSpacing: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Document Format & Date Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-2xs space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Paper Format</label>
                <select
                  value={layout.format || 'A4'}
                  onChange={(e) => updateLayout({ format: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-xl text-xs font-semibold text-slate-800 dark:text-foreground cursor-pointer focus:outline-none focus:border-emerald-600"
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
                  className="w-full p-2 bg-slate-50 dark:bg-background border border-slate-200 dark:border-border rounded-xl text-xs font-semibold text-slate-800 dark:text-foreground cursor-pointer focus:outline-none focus:border-emerald-600"
                >
                  <option value="Short Name (Jan YYYY)">Short Name (e.g. Jan 2023)</option>
                  <option value="Numeric (01/2023)">Numeric (e.g. 01/2023)</option>
                  <option value="Year Only (2023)">Year Only (e.g. 2023)</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

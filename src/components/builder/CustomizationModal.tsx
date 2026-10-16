import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Type, LayoutTemplate, BoxSelect, Palette, Sliders, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ResumeData, FontFamily, TypographySettings, LayoutSettings } from '@/types/resume';
import { TEMPLATES, COLOR_PALETTES, FONT_OPTIONS, getTemplateDefaults, migrateSectionOrder } from '@/lib/templates';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  initialTab?: 'template' | 'text' | 'layout';
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  resume,
  onChange,
  initialTab = 'template',
}) => {
  const [activeTab, setActiveTab] = useState<'template' | 'text' | 'layout'>(initialTab);
  const [isMobileCompact, setIsMobileCompact] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const typography = resume.typography || {};
  const layout = resume.layout || {};
  
  const updateTypography = (changes: Partial<TypographySettings>) => {
    onChange({ typography: { ...typography, ...changes } });
  };
  
  const updateTypographySizes = (changes: any) => {
    updateTypography({ sizes: { ...(typography.sizes || {}), ...changes } });
  };
  
  const updateTypographyWeights = (changes: any) => {
    updateTypography({ weights: { ...(typography.weights || {}), ...changes } });
  };

  const updateLayout = (changes: Partial<LayoutSettings>) => {
    onChange({ layout: { ...layout, ...changes } });
  };

  const updateLayoutMargins = (changes: any) => {
    updateLayout({ margins: { ...(layout.margins || {}), ...changes } });
  };

  const updateLayoutSpacing = (changes: any) => {
    updateLayout({ spacing: { ...(layout.spacing || {}), ...changes } });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Universal Backdrop (works on mobile & desktop) */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer panel: Bottom sheet on mobile (< sm), left drawer on tablet/desktop (>= sm) */}
      <div
        className={`fixed inset-x-0 bottom-0 sm:inset-y-0 sm:left-0 sm:right-auto z-50 w-full sm:w-[460px] bg-white rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col border-t sm:border-t-0 sm:border-r border-slate-200 transition-all duration-300 ${
          isMobileCompact ? 'h-[44vh]' : 'h-[80vh] max-h-[85vh]'
        } sm:h-full sm:max-h-none animate-in slide-in-from-bottom sm:slide-in-from-left duration-250`}
      >
        {/* Mobile Grab / Drag Handle Bar */}
        <button
          type="button"
          onClick={() => setIsMobileCompact(!isMobileCompact)}
          className="sm:hidden pt-3 pb-1 flex items-center justify-center w-full shrink-0 cursor-pointer group"
          title={isMobileCompact ? 'Expand Sheet' : 'Minimize Sheet to Peek'}
        >
          <div className="w-12 h-1.5 bg-slate-300 group-hover:bg-slate-400 rounded-full transition-colors" />
        </button>
        
        {/* Header Tabs */}
        <div className="flex flex-col border-b border-slate-200 pt-2 sm:pt-5 bg-slate-50 shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">Design Studio</h2>
                <p className="text-[10px] text-slate-500 sm:hidden">Instant live preview</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Mobile Peek Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileCompact(!isMobileCompact)}
                className="sm:hidden p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title={isMobileCompact ? 'Expand Sheet' : 'Minimize to Peek'}
                aria-label={isMobileCompact ? 'Expand Sheet' : 'Minimize to Peek'}
              >
                {isMobileCompact ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Close Design Studio (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('template')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[42px] ${
                activeTab === 'template'
                  ? 'border-emerald-700 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Templates &amp; Colors</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[42px] ${
                activeTab === 'text'
                  ? 'border-emerald-700 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Typography</span>
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 min-h-[42px] ${
                activeTab === 'layout'
                  ? 'border-emerald-700 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <BoxSelect className="w-4 h-4" />
              <span>Layout &amp; Spacing</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: Template & Colors */}
          {activeTab === 'template' && (
            <div className="space-y-6 sm:space-y-8">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Template Selection</h3>
                  <span className="text-[11px] font-semibold text-emerald-700">{TEMPLATES.length} ATS Layouts</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {TEMPLATES.map((t) => {
                    const isSelected = resume.templateId === t.id;
                    return (
                      <div 
                        key={t.id} 
                        onClick={() => {
                          const defaults = getTemplateDefaults(t.id);
                          const newOrder = migrateSectionOrder(resume.sectionOrder, t.id);
                          onChange({ templateId: t.id, sectionOrder: newOrder, ...defaults });
                        }}
                        className={`cursor-pointer rounded-xl border-2 p-3 transition-all relative flex flex-col justify-between min-h-[64px] ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50/70 shadow-xs ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">{t.name}</div>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 capitalize font-medium">{t.layout || 'Single'} Column</div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3 pt-3 border-t border-slate-200/80">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accent Color</h3>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {COLOR_PALETTES.map((color) => {
                    const isSelected = resume.themeColor === color.value;
                    return (
                      <button
                        key={color.value}
                        onClick={() => onChange({ themeColor: color.value })}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-2xs ${
                          isSelected
                            ? 'border-emerald-700 scale-110 ring-4 ring-blue-100 shadow-md'
                            : 'border-slate-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        aria-label={`Select ${color.name} color palette`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white stroke-[3] drop-shadow-xs" />}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: Text */}
          {activeTab === 'text' && (
            <div className="space-y-8">
              
              <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Primary Font</label>
                  <select 
                    value={typography.primaryFont || resume.fontFamily || 'inter'}
                    onChange={e => {
                      const newFont = e.target.value as FontFamily;
                      updateTypography({ primaryFont: newFont });
                      onChange({ fontFamily: newFont });
                    }}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm"
                  >
                    {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Secondary Font</label>
                  <select 
                    value={typography.secondaryFont || resume.fontFamily || 'inter'}
                    onChange={e => updateTypography({ secondaryFont: e.target.value as FontFamily })}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm"
                  >
                    {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Line Height</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <input type="range" min="1" max="2.5" step="0.05" value={typography.lineHeight || 1.5} onChange={e => updateTypography({ lineHeight: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{(typography.lineHeight || 1.5).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Font Size</h3>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Primary Heading</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="12" max="36" step="0.5" value={typography.sizes?.primaryHeading || 24} onChange={e => updateTypographySizes({ primaryHeading: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{typography.sizes?.primaryHeading || 24} pt</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Secondary Heading</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="10" max="24" step="0.5" value={typography.sizes?.secondaryHeading || 16} onChange={e => updateTypographySizes({ secondaryHeading: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{typography.sizes?.secondaryHeading || 16} pt</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Section Titles</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="10" max="24" step="0.5" value={typography.sizes?.sectionTitle || 14} onChange={e => updateTypographySizes({ sectionTitle: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{typography.sizes?.sectionTitle || 14} pt</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Body</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="7" max="14" step="0.5" value={typography.sizes?.body || 10} onChange={e => updateTypographySizes({ body: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{typography.sizes?.body || 10} pt</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Font Weight</h3>
                <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg flex items-start gap-2">
                  <span className="text-lg leading-none">ℹ</span>
                  Select any font weight you like. Note that strict PDF rendering may fall back to Bold and Normal if the specific weight is missing.
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Primary Heading</span>
                    <select value={typography.weights?.primaryHeading || 'bold'} onChange={e => updateTypographyWeights({ primaryHeading: e.target.value })} className="bg-slate-50 border-none outline-none text-sm p-1 rounded">
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Secondary Heading</span>
                    <select value={typography.weights?.secondaryHeading || 'bold'} onChange={e => updateTypographyWeights({ secondaryHeading: e.target.value })} className="bg-slate-50 border-none outline-none text-sm p-1 rounded">
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Section Titles</span>
                    <select value={typography.weights?.sectionTitle || 'bold'} onChange={e => updateTypographyWeights({ sectionTitle: e.target.value })} className="bg-slate-50 border-none outline-none text-sm p-1 rounded">
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
                    <span className="text-sm font-semibold text-slate-700">Body</span>
                    <select value={typography.weights?.body || 'normal'} onChange={e => updateTypographyWeights({ body: e.target.value })} className="bg-slate-50 border-none outline-none text-sm p-1 rounded">
                      <option value="normal">Normal</option>
                      <option value="medium">Medium</option>
                      <option value="semibold">Semibold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Layout */}
          {activeTab === 'layout' && (
            <div className="space-y-8">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Page Format</label>
                <select 
                  value={layout.format || 'A4'}
                  onChange={e => updateLayout({ format: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm"
                >
                  <option value="A4">A4 (8.27" × 11.69")</option>
                  <option value="Letter">US Letter (8.5" × 11")</option>
                </select>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Margins & Paddings</h3>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Top & Bottom</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="1.5" step="0.05" value={layout.margins?.topBottom ?? 0.5} onChange={e => updateLayoutMargins({ topBottom: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.margins?.topBottom ?? 0.5} in</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Left & Right</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="1.5" step="0.05" value={layout.margins?.leftRight ?? 0.5} onChange={e => updateLayoutMargins({ leftRight: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.margins?.leftRight ?? 0.5} in</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Between Sections</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="8" max="48" step="1" value={layout.spacing?.betweenSections ?? 24} onChange={e => updateLayoutSpacing({ betweenSections: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.spacing?.betweenSections ?? 24} pt</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Between Titles & Content</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="4" max="32" step="1" value={layout.spacing?.betweenTitlesContent ?? 12} onChange={e => updateLayoutSpacing({ betweenTitlesContent: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.spacing?.betweenTitlesContent ?? 12} pt</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Between Content Blocks</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="4" max="32" step="1" value={layout.spacing?.betweenBlocks ?? 12} onChange={e => updateLayoutSpacing({ betweenBlocks: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.spacing?.betweenBlocks ?? 12} pt</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">Inside the Content Block</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min="0" max="16" step="0.5" value={layout.spacing?.insideBlock ?? 4} onChange={e => updateLayoutSpacing({ insideBlock: parseFloat(e.target.value) })} className="flex-1" />
                    <span className="text-sm font-mono text-slate-500 w-12 text-right">{layout.spacing?.insideBlock ?? 4} pt</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-200">
                <label className="text-xs font-semibold text-slate-500">Date Format</label>
                <select 
                  value={layout.dateFormat || 'Short Name (Jan YYYY)'}
                  onChange={e => updateLayout({ dateFormat: e.target.value as any })}
                  className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-sm"
                >
                  <option value="Short Name (Jan YYYY)">Short Name (Jan YYYY)</option>
                  <option value="Numeric (01/2023)">Numeric (01/2023)</option>
                  <option value="Year Only (2023)">Year Only (2023)</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
};

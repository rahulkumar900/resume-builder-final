'use client';

import React, { useState } from 'react';
import { ProjectItem } from '@/types/resume';
import { SectionComponentProps } from '@/types/builder';
import { Plus, Trash2, FolderGit2, ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { AiSuggestionModal } from '@/components/builder/AiSuggestionModal';
import { MobileFullscreenItemModal } from '@/components/builder/MobileFullscreenItemModal';

interface ProjectsSectionProps extends SectionComponentProps<ProjectItem[]> {
  jobRole?: string;
  hideHeader?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data = [],
  onChange,
  jobRole,
  hideHeader = false,
}) => {
  const [expandedDesktopIds, setExpandedDesktopIds] = useState<Set<string>>(new Set());
  const [mobileEditingId, setMobileEditingId] = useState<string | null>(null);
  const [rawTechMap, setRawTechMap] = useState<Record<string, string>>({});
  const [aiModalState, setAiModalState] = useState<{
    isOpen: boolean;
    projIndex: number;
    anchorRect: DOMRect | null;
  }>({
    isOpen: false,
    projIndex: 0,
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

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      link: '',
      technologies: [],
      highlights: [],
    };
    onChange([...data, newProj]);
    setMobileEditingId(newProj.id);
  };

  const updateProject = (index: number, updated: Partial<ProjectItem>) => {
    const next = [...data];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Convert highlights into proper semantic HTML for RichTextEditor
  const getHtmlForProject = (proj: ProjectItem): string => {
    if (!proj.highlights || proj.highlights.length === 0) return '';
    const first = proj.highlights[0] || '';
    if (/<(ul|ol|p|div)[^>]*>/i.test(first)) {
      return first;
    }
    return `<ul>${proj.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`;
  };

  const extractHighlightsFromHtml = (html: string): string[] => {
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
      updateProject(index, { highlights: [] });
      return;
    }
    updateProject(index, { highlights: [html] });
  };

  const openAiModal = (index: number, rect?: DOMRect) => {
    setAiModalState({
      isOpen: true,
      projIndex: index,
      anchorRect: rect || null,
    });
  };

  const currentProjForAi = data[aiModalState.projIndex];
  const mobileEditingIndex = data.findIndex((item) => item.id === mobileEditingId);
  const mobileEditingItem = mobileEditingIndex !== -1 ? data[mobileEditingIndex] : null;

  const renderProjectForm = (proj: ProjectItem, idx: number) => (
    <div className="space-y-4 sm:space-y-4.5 pt-1">
      {/* Project Title - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Project Title</Label>
        <Input
          type="text"
          value={proj.title}
          placeholder="AI Workflow Engine"
          onChange={(e) => updateProject(idx, { title: e.target.value })}
          className="h-10 text-sm font-semibold"
        />
      </div>

      {/* Live URL / Repository - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Live URL / Repository</Label>
        <Input
          type="text"
          value={proj.link || ''}
          placeholder="https://github.com/..."
          onChange={(e) => updateProject(idx, { link: e.target.value })}
          className="h-10 text-sm"
        />
      </div>

      {/* Tech Stack - Full Width */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tech Stack (comma-separated)</Label>
        <Input
          type="text"
          value={rawTechMap[proj.id] ?? (proj.technologies || []).join(', ')}
          placeholder="TypeScript, Next.js, Tailwind, PyTorch..."
          className="h-10 text-sm"
          onChange={(e) => {
            const val = e.target.value;
            setRawTechMap((prev) => ({ ...prev, [proj.id]: val }));
            const items = val
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean);
            updateProject(idx, { technologies: items });
          }}
          onBlur={() => {
            setRawTechMap((prev) => ({
              ...prev,
              [proj.id]: (proj.technologies || []).join(', '),
            }));
          }}
        />
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-border/60">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Key Highlights</Label>
          <span className="text-[11px] text-slate-400">Rich text &amp; bullet lists supported</span>
        </div>
        <RichTextEditor
          value={getHtmlForProject(proj)}
          placeholder="• Architected full-stack cloud platform serving 10k+ daily users...&#10;• Implemented secure authentication and payment billing..."
          minHeight="110px"
          onOpenAiSuggestions={(rect) => openAiModal(idx, rect)}
          aiButtonLabel="AI Suggestions"
          sectionName="Projects"
          roleContext={proj.title}
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-foreground tracking-tight">Featured Projects</h2>
          <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
            Highlighted applications, open source repositories, and case studies
          </p>
        </div>
      )}

      {data.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-border bg-slate-50/70 dark:bg-card/40 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 flex items-center justify-center mx-auto border border-purple-200/60 dark:border-purple-800">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-foreground">
              No projects added yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground">
              Add your portfolio projects, apps, client work, or open source contributions.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={addProject}
              className="gap-1.5 font-semibold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {data.map((proj, idx) => {
          const isExpandedDesktop = expandedDesktopIds.has(proj.id);
          return (
            <div
              key={proj.id}
              className="rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-border transition-colors"
            >
              <div
                onClick={() => handleItemClick(proj.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 border border-purple-200/60 dark:border-purple-800">
                    #{idx + 1}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-sm text-slate-900 dark:text-foreground block truncate">
                      {proj.title || 'New Project'}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-muted-foreground block truncate">
                      {proj.technologies && proj.technologies.length > 0
                        ? proj.technologies.join(', ')
                        : proj.link || 'Highlights & tech stack'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Mobile-only prominent Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileEditingId(proj.id);
                    }}
                    className="lg:hidden px-2.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-purple-100 transition-colors mr-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(idx)}
                    className="h-8 w-8 hover:text-rose-600"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {/* Desktop-only accordion expand chevron */}
                  <button
                    type="button"
                    onClick={() => handleItemClick(proj.id)}
                    className="hidden lg:flex p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer"
                    title={isExpandedDesktop ? 'Collapse project' : 'Expand project'}
                  >
                    {isExpandedDesktop ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Desktop-only inline expanded form */}
              {isExpandedDesktop && (
                <div className="hidden lg:block p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-border/60 mt-1">
                  {renderProjectForm(proj, idx)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.length > 0 && (
        <button
          type="button"
          onClick={addProject}
          className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-border hover:border-emerald-600/60 dark:hover:border-emerald-500/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
          <span>Add Another Project</span>
        </button>
      )}

      {/* Mobile-only Full-screen Form Modal */}
      {mobileEditingItem && (
        <MobileFullscreenItemModal
          isOpen={Boolean(mobileEditingItem)}
          onClose={() => setMobileEditingId(null)}
          title={mobileEditingItem.title || 'Project Details'}
          subtitle={mobileEditingItem.technologies?.slice(0, 3).join(', ') || 'Projects'}
          onDelete={() => {
            if (confirm('Are you sure you want to delete this project?')) {
              removeProject(mobileEditingIndex);
              setMobileEditingId(null);
            }
          }}
          deleteLabel="Delete Project"
        >
          {renderProjectForm(mobileEditingItem, mobileEditingIndex)}
        </MobileFullscreenItemModal>
      )}

      {/* AI Suggestions Modal for Projects */}
      {aiModalState.isOpen && currentProjForAi && (
        <AiSuggestionModal
          isOpen={aiModalState.isOpen}
          onClose={() => setAiModalState((prev) => ({ ...prev, isOpen: false }))}
          anchorRect={aiModalState.anchorRect}
          type="project"
          projectContext={currentProjForAi.title}
          roleContext={jobRole}
          techContext={currentProjForAi.technologies}
          onUpdateRole={(newTitle) => {
            updateProject(aiModalState.projIndex, { title: newTitle });
          }}
          onInsert={(text, mode) => {
            const projIdx = aiModalState.projIndex;
            const currentHighlights = data[projIdx]?.highlights || [];
            if (mode === 'replace' || currentHighlights.length === 0) {
              updateProject(projIdx, { highlights: [`<ul><li>${text}</li></ul>`] });
            } else {
              const first = currentHighlights[0] || '';
              if (/<ul[^>]*>([\s\S]*)<\/ul>/i.test(first)) {
                const updated = first.replace(/<\/ul>/i, `<li>${text}</li></ul>`);
                updateProject(projIdx, { highlights: [updated] });
              } else if (/<ol[^>]*>([\s\S]*)<\/ol>/i.test(first)) {
                const updated = first.replace(/<\/ol>/i, `<li>${text}</li></ol>`);
                updateProject(projIdx, { highlights: [updated] });
              } else {
                updateProject(projIdx, { highlights: [...currentHighlights, text] });
              }
            }
          }}
        />
      )}
    </div>
  );
};

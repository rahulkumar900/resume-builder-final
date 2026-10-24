'use client';

import React from 'react';
import { SectionKey, NavItemConfig } from '@/types/builder';
import {
  ResumeData,
  ResumeSectionId,
  SectionOrderConfig,
  TemplateId,
} from '@/types/resume';
import {
  X,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Plus,
  Columns2,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages as LanguagesIcon,
  AlignLeft,
  Sparkles,
  Trophy,
  Medal,
  Heart,
  BookOpen,
  FlaskConical,
  Compass,
  Users,
  Building,
  Calendar,
  CheckSquare,
  Globe,
  Share2,
  Laptop,
  Crown,
  Smile,
  FileBadge,
  Code2,
  Mic,
  Shield,
  FileCheck,
  Layers,
  Layout,
  GripVertical,
  Mail,
  Phone,
  MapPin,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  TEMPLATES,
  getTemplateLayout,
  getTemplateSidebarPosition,
  getDefaultSectionOrder,
  getDefaultColumnForSection,
  getTemplateDefaults,
  migrateSectionOrder,
  getEffectiveSectionOrder,
  DEFAULT_SINGLE_COLUMN_SECTIONS,
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
} from '@/lib/templates';

interface SectionReorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepKeys: SectionKey[];
  navItems: NavItemConfig[];
  activeTab: SectionKey | 'all';
  onSelectSection: (key: SectionKey | 'all') => void;
  onReorderSections: (newKeys: SectionKey[]) => void;
  onUpdateSectionOrder?: (newOrder: SectionOrderConfig) => void;
  onChange?: (updated: Partial<ResumeData>) => void;
  resume: ResumeData;
}

interface SectionMeta {
  id: ResumeSectionId;
  label: string;
  builderKey: SectionKey;
  icon: React.ElementType;
  getCount: (r: ResumeData) => number | null;
}

const SECTION_METAS: Record<ResumeSectionId, SectionMeta> = {
  summary: {
    id: 'summary',
    label: 'Professional Summary',
    builderKey: 'personal',
    icon: AlignLeft,
    getCount: (r) => (r.personalInfo?.summary ? 1 : 0),
  },
  experience: {
    id: 'experience',
    label: 'Work Experience',
    builderKey: 'experience',
    icon: Briefcase,
    getCount: (r) => r.experience?.length || 0,
  },
  education: {
    id: 'education',
    label: 'Education',
    builderKey: 'education',
    icon: GraduationCap,
    getCount: (r) => r.education?.length || 0,
  },
  skills: {
    id: 'skills',
    label: 'Skills & Competencies',
    builderKey: 'skills',
    icon: Wrench,
    getCount: (r) => r.skills?.length || 0,
  },
  projects: {
    id: 'projects',
    label: 'Key Projects',
    builderKey: 'projects',
    icon: FolderGit2,
    getCount: (r) => r.projects?.length || 0,
  },
  certifications: {
    id: 'certifications',
    label: 'Certifications',
    builderKey: 'certifications',
    icon: Award,
    getCount: (r) => r.certifications?.length || 0,
  },
  languages: {
    id: 'languages',
    label: 'Languages',
    builderKey: 'languages',
    icon: LanguagesIcon,
    getCount: (r) => r.languages?.length || 0,
  },
  achievements: {
    id: 'achievements',
    label: 'Key Achievements',
    builderKey: 'achievements',
    icon: Trophy,
    getCount: (r) => r.achievements?.length || 0,
  },
  awards: {
    id: 'awards',
    label: 'Honors & Awards',
    builderKey: 'awards',
    icon: Medal,
    getCount: (r) => r.awards?.length || 0,
  },
  volunteer: {
    id: 'volunteer',
    label: 'Volunteer Experience',
    builderKey: 'volunteer',
    icon: Heart,
    getCount: (r) => r.volunteer?.length || 0,
  },
  publications: {
    id: 'publications',
    label: 'Publications',
    builderKey: 'publications',
    icon: BookOpen,
    getCount: (r) => r.publications?.length || 0,
  },
  research: {
    id: 'research',
    label: 'Research Experience',
    builderKey: 'research',
    icon: FlaskConical,
    getCount: (r) => r.research?.length || 0,
  },
  interests: {
    id: 'interests',
    label: 'Interests & Hobbies',
    builderKey: 'interests',
    icon: Compass,
    getCount: (r) => r.interests?.length || 0,
  },
  references: {
    id: 'references',
    label: 'References',
    builderKey: 'references',
    icon: Users,
    getCount: (r) => r.references?.length || 0,
  },
  courses: {
    id: 'courses',
    label: 'Courses & Training',
    builderKey: 'courses',
    icon: GraduationCap,
    getCount: (r) => r.courses?.length || 0,
  },
  internships: {
    id: 'internships',
    label: 'Internships',
    builderKey: 'internships',
    icon: Briefcase,
    getCount: (r) => r.internships?.length || 0,
  },
  organizations: {
    id: 'organizations',
    label: 'Organizations & Memberships',
    builderKey: 'organizations',
    icon: Building,
    getCount: (r) => r.organizations?.length || 0,
  },
  conferences: {
    id: 'conferences',
    label: 'Conferences & Seminars',
    builderKey: 'conferences',
    icon: Calendar,
    getCount: (r) => r.conferences?.length || 0,
  },
  testScores: {
    id: 'testScores',
    label: 'Test Scores',
    builderKey: 'testScores',
    icon: CheckSquare,
    getCount: (r) => r.testScores?.length || 0,
  },
  professionalLinks: {
    id: 'professionalLinks',
    label: 'Professional Links',
    builderKey: 'professionalLinks',
    icon: Globe,
    getCount: (r) => r.professionalLinks?.length || 0,
  },
  socialLinks: {
    id: 'socialLinks',
    label: 'Social Profiles',
    builderKey: 'socialLinks',
    icon: Share2,
    getCount: (r) => r.socialLinks?.length || 0,
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio Showcase',
    builderKey: 'portfolio',
    icon: FolderGit2,
    getCount: (r) => r.portfolio?.length || 0,
  },
  freelance: {
    id: 'freelance',
    label: 'Freelance Experience',
    builderKey: 'freelance',
    icon: Laptop,
    getCount: (r) => r.freelance?.length || 0,
  },
  leadership: {
    id: 'leadership',
    label: 'Leadership & Governance',
    builderKey: 'leadership',
    icon: Crown,
    getCount: (r) => r.leadership?.length || 0,
  },
  extracurricular: {
    id: 'extracurricular',
    label: 'Extracurricular Activities',
    builderKey: 'extracurricular',
    icon: Smile,
    getCount: (r) => r.extracurricular?.length || 0,
  },
  patents: {
    id: 'patents',
    label: 'Patents',
    builderKey: 'patents',
    icon: FileBadge,
    getCount: (r) => r.patents?.length || 0,
  },
  openSource: {
    id: 'openSource',
    label: 'Open Source Contributions',
    builderKey: 'openSource',
    icon: Code2,
    getCount: (r) => r.openSource?.length || 0,
  },
  speaking: {
    id: 'speaking',
    label: 'Speaking & Talks',
    builderKey: 'speaking',
    icon: Mic,
    getCount: (r) => r.speaking?.length || 0,
  },
  teaching: {
    id: 'teaching',
    label: 'Teaching & Mentorship',
    builderKey: 'teaching',
    icon: BookOpen,
    getCount: (r) => r.teaching?.length || 0,
  },
  militaryService: {
    id: 'militaryService',
    label: 'Military Service',
    builderKey: 'militaryService',
    icon: Shield,
    getCount: (r) => r.militaryService?.length || 0,
  },
  licenses: {
    id: 'licenses',
    label: 'Licenses',
    builderKey: 'licenses',
    icon: FileCheck,
    getCount: (r) => r.licenses?.length || 0,
  },
  customSections: {
    id: 'customSections',
    label: 'Additional Information',
    builderKey: 'customSections',
    icon: Layers,
    getCount: (r) => r.customSections?.length || 0,
  },
};

const SECTION_PLACEMENT_RECOMMENDATIONS: Partial<Record<ResumeSectionId, {
  recommendedColumn: 'main' | 'sidebar' | 'flexible';
  badgeLabel: string;
  badgeClass: string;
  hint: string;
}>> = {
  experience: {
    recommendedColumn: 'main',
    badgeLabel: 'Main Preferred',
    badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    hint: 'Work history & bullet points require wide line lengths for ATS readability',
  },
  projects: {
    recommendedColumn: 'main',
    badgeLabel: 'Main Preferred',
    badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    hint: 'Project details and tech stacks fit best in wide main column',
  },
  volunteer: {
    recommendedColumn: 'main',
    badgeLabel: 'Main Preferred',
    badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    hint: 'Volunteer experience reads best in wide main column',
  },
  leadership: {
    recommendedColumn: 'main',
    badgeLabel: 'Main Preferred',
    badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
    hint: 'Leadership accomplishments fit best in main column',
  },
  skills: {
    recommendedColumn: 'sidebar',
    badgeLabel: 'Sidebar Ideal',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    hint: 'Categorized tags and skill chips fit compact sidebar widths perfectly',
  },
  certifications: {
    recommendedColumn: 'sidebar',
    badgeLabel: 'Sidebar Ideal',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    hint: 'Credentials and licenses fit compact sidebar space',
  },
  languages: {
    recommendedColumn: 'sidebar',
    badgeLabel: 'Sidebar Ideal',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    hint: 'Languages and proficiency tiers fit sidebar',
  },
  awards: {
    recommendedColumn: 'sidebar',
    badgeLabel: 'Sidebar Ideal',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    hint: 'Discrete awards and honors fit sidebar',
  },
  interests: {
    recommendedColumn: 'sidebar',
    badgeLabel: 'Sidebar Ideal',
    badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    hint: 'Interests and hobbies fit sidebar',
  },
  education: {
    recommendedColumn: 'flexible',
    badgeLabel: 'Flexible',
    badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
    hint: 'Main column for students/freshers; Sidebar column for experienced professionals',
  },
  summary: {
    recommendedColumn: 'flexible',
    badgeLabel: 'Flexible',
    badgeClass: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
    hint: 'Main column for narrative summary; Sidebar column for brief executive profile',
  },
};

interface SortableSectionCardProps {
  id: ResumeSectionId;
  column: 'main' | 'sidebar' | 'single';
  sidebarPos: 'left' | 'right';
  layout: 'single' | 'double';
  onTransferToMain?: (id: ResumeSectionId) => void;
  onTransferToSidebar?: (id: ResumeSectionId) => void;
  onToggleSection: (id: ResumeSectionId) => void;
  onJumpToSection: (meta: SectionMeta) => void;
  activeTab: SectionKey | 'all';
  resume: ResumeData;
}

function SortableSectionCard({
  id,
  column,
  sidebarPos,
  layout,
  onTransferToMain,
  onTransferToSidebar,
  onToggleSection,
  onJumpToSection,
  activeTab,
  resume,
}: SortableSectionCardProps) {
  const meta = SECTION_METAS[id];
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  if (!meta) return null;
  const Icon = meta.icon;
  const count = meta.getCount(resume);
  const isActiveTab = activeTab === meta.builderKey;

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    zIndex: isDragging ? 50 : undefined,
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 sm:p-3.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 sm:gap-3 ${
        isDragging
          ? 'shadow-lg ring-2 ring-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/30'
          : isActiveTab
          ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-emerald-500/20 shadow-xs'
          : 'border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#1a1a18] hover:border-slate-300 dark:hover:border-white/[0.15] shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] rounded-md shrink-0 transition-colors touch-none"
          title="Drag to reorder or drag across columns"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Checkbox for active/inactive toggle */}
        <div className="shrink-0 flex items-center">
          <input
            type="checkbox"
            checked={true}
            onChange={() => onToggleSection(id)}
            className="w-4 h-4 text-emerald-700 dark:text-emerald-500 rounded border-slate-300 dark:border-white/20 accent-emerald-600 cursor-pointer"
            title="Uncheck to remove section from layout"
          />
        </div>

        <div
          onClick={() => onJumpToSection(meta)}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 select-none cursor-pointer"
          title="Click to jump to editing this section"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-100 dark:bg-white/[0.08] text-slate-700 dark:text-slate-200">
            <Icon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white leading-tight truncate">
                {meta.label}
              </span>
              {isActiveTab && (
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                  • Editing
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {layout === 'double' && (
                <>
                  {column === 'sidebar' && (id === 'experience' || id === 'projects') ? (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                      title="Work history & bullet points perform best in Main Column for optimal readability & ATS parsing"
                    >
                      ⚠️ Cramped in Sidebar
                    </span>
                  ) : (
                    SECTION_PLACEMENT_RECOMMENDATIONS[id] && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${SECTION_PLACEMENT_RECOMMENDATIONS[id]?.badgeClass}`}
                        title={SECTION_PLACEMENT_RECOMMENDATIONS[id]?.hint}
                      >
                        {SECTION_PLACEMENT_RECOMMENDATIONS[id]?.badgeLabel}
                      </span>
                    )
                  )}
                </>
              )}
              {count !== null && count > 0 && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cross-column transfer button (Two-column layout only) */}
      {layout === 'double' && (
        <div className="shrink-0 flex items-center">
          {column === 'main' ? (
            sidebarPos === 'left' ? (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onTransferToSidebar?.(id);
                }}
                className="h-7 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-lg gap-1 px-2.5 shrink-0 cursor-pointer"
                title="Move section to Left Sidebar"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">To Sidebar</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onTransferToSidebar?.(id);
                }}
                className="h-7 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-lg gap-1 px-2.5 shrink-0 cursor-pointer"
                title="Move section to Right Sidebar"
              >
                <span className="hidden sm:inline">To Sidebar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )
          ) : (
            sidebarPos === 'left' ? (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onTransferToMain?.(id);
                }}
                className="h-7 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-500/15 border border-amber-500/20 rounded-lg gap-1 px-2.5 shrink-0 cursor-pointer"
                title="Move section to Main Column"
              >
                <span className="hidden sm:inline">To Main</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onTransferToMain?.(id);
                }}
                className="h-7 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-500/15 border border-amber-500/20 rounded-lg gap-1 px-2.5 shrink-0 cursor-pointer"
                title="Move section to Main Column"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">To Main</span>
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function DroppableColumn({
  id,
  title,
  description,
  widthLabel,
  columnType,
  items,
  isOver,
  children,
  className,
}: {
  id: string;
  title: string;
  description: string;
  widthLabel?: string;
  columnType: 'main' | 'sidebar' | 'single';
  items: ResumeSectionId[];
  isOver?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-2xl border transition-all duration-200 ${
        isOver
          ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md'
          : columnType === 'sidebar'
          ? 'bg-slate-50/90 dark:bg-white/[0.025] border-slate-200/90 dark:border-white/[0.08]'
          : 'bg-white dark:bg-[#151513] border-slate-200/90 dark:border-white/[0.08]'
      } ${className || ''}`}
    >
      {/* Column Header */}
      <div className="p-3.5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              columnType === 'main'
                ? 'bg-emerald-600 dark:bg-emerald-500'
                : columnType === 'sidebar'
                ? 'bg-amber-500'
                : 'bg-blue-600'
            }`}
          />
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {title}
          </span>
          {widthLabel && (
            <Badge
              variant="outline"
              className="text-[9.5px] px-1.5 py-0 font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/[0.08]"
            >
              {widthLabel}
            </Badge>
          )}
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {items.length} {items.length === 1 ? 'section' : 'sections'}
        </span>
      </div>

      {/* Description */}
      <div className="px-3.5 py-2 bg-slate-100/50 dark:bg-white/[0.015] border-b border-slate-200/50 dark:border-white/[0.04]">
        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
          {description}
        </p>
      </div>

      {/* Column Body / Droppable Items List */}
      <div className="p-3.5 space-y-2.5 flex-1 min-h-[140px]">
        {children}
        {items.length === 0 && (
          <div className="h-28 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-white/[0.1] rounded-xl text-slate-400 dark:text-slate-500 text-xs gap-1.5 bg-slate-50/40 dark:bg-white/[0.01]">
            <Layers className="w-5 h-5 text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-[11.5px]">Empty Column</p>
            <p className="text-[10.5px] text-slate-400">
              Drag sections here or click &quot;To {title.replace(' Column', '')}&quot; to move
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const SectionReorderModal: React.FC<SectionReorderModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectSection,
  onReorderSections,
  onUpdateSectionOrder,
  onChange,
  resume,
}) => {
  const [activeDragId, setActiveDragId] = React.useState<ResumeSectionId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!isOpen) return null;

  const layout = getTemplateLayout(resume.templateId);
  const sidebarPos = getTemplateSidebarPosition(resume.templateId);
  const currentOrder: SectionOrderConfig = getEffectiveSectionOrder(
    resume.templateId,
    resume.sectionOrder,
    resume.experienceLevel
  );

  const singleList = currentOrder.singleColumn || [];
  const mainList = currentOrder.mainColumn || [];
  const sidebarList = currentOrder.sidebarColumn || [];

  // Helper to synchronize stepKeys in builder
  const syncBuilderStepKeys = (order: SectionOrderConfig) => {
    let keys: SectionKey[];
    if (layout === 'single') {
      keys = ['personal', ...(order.singleColumn || []).map((s) => SECTION_METAS[s]?.builderKey).filter(Boolean)];
    } else {
      const allSecs = [...(order.mainColumn || []), ...(order.sidebarColumn || [])];
      keys = ['personal', ...allSecs.map((s) => SECTION_METAS[s]?.builderKey).filter(Boolean)];
    }
    const deduped = Array.from(new Set(keys));
    onReorderSections(deduped);
  };

  const handleTemplateChange = (newTemplateId: TemplateId) => {
    const defaults = getTemplateDefaults(newTemplateId);
    const newOrder = migrateSectionOrder(resume.sectionOrder, newTemplateId);
    if (onChange) {
      onChange({ templateId: newTemplateId, sectionOrder: newOrder, ...defaults });
    }
    if (onUpdateSectionOrder) {
      onUpdateSectionOrder(newOrder);
    }
    syncBuilderStepKeys(newOrder);
  };

  const updateOrder = (newOrder: SectionOrderConfig) => {
    if (onUpdateSectionOrder) {
      onUpdateSectionOrder(newOrder);
    }
    syncBuilderStepKeys(newOrder);
  };

  const allSectionIds = Object.keys(SECTION_METAS) as ResumeSectionId[];
  const activeIds = layout === 'single' ? singleList : [...mainList, ...sidebarList];
  const inactiveSections = allSectionIds.filter((id) => !activeIds.includes(id));

  const handleToggleSection = (sectionId: ResumeSectionId) => {
    const isActive = activeIds.includes(sectionId);
    if (isActive) {
      // Remove
      const nextSingle = singleList.filter((s) => s !== sectionId);
      const nextMain = mainList.filter((s) => s !== sectionId);
      const nextSidebar = sidebarList.filter((s) => s !== sectionId);
      updateOrder({ ...currentOrder, singleColumn: nextSingle, mainColumn: nextMain, sidebarColumn: nextSidebar });
    } else {
      // Add
      if (layout === 'single') {
        updateOrder({ ...currentOrder, singleColumn: [...singleList, sectionId] });
      } else {
        const col = getDefaultColumnForSection(sectionId, resume.templateId);
        if (col === 'sidebar') {
          updateOrder({ ...currentOrder, sidebarColumn: [...sidebarList, sectionId] });
        } else {
          updateOrder({ ...currentOrder, mainColumn: [...mainList, sectionId] });
        }
      }
    }
  };

  const handleAddDirectly = (sectionId: ResumeSectionId, target: 'main' | 'sidebar') => {
    if (target === 'sidebar') {
      updateOrder({
        ...currentOrder,
        sidebarColumn: [...sidebarList, sectionId],
      });
    } else {
      updateOrder({
        ...currentOrder,
        mainColumn: [...mainList, sectionId],
      });
    }
  };

  // Move section from Main to Sidebar
  const transferToSidebar = (sectionId: ResumeSectionId) => {
    if (sidebarList.includes(sectionId)) return;
    const nextMain = mainList.filter((s) => s !== sectionId);
    const nextSidebar = [...sidebarList, sectionId];
    updateOrder({ ...currentOrder, mainColumn: nextMain, sidebarColumn: nextSidebar });
  };

  // Move section from Sidebar to Main
  const transferToMain = (sectionId: ResumeSectionId) => {
    if (mainList.includes(sectionId)) return;
    const nextSidebar = sidebarList.filter((s) => s !== sectionId);
    const nextMain = [...mainList, sectionId];
    updateOrder({ ...currentOrder, mainColumn: nextMain, sidebarColumn: nextSidebar });
  };

  const handleReset = () => {
    const defaults = getDefaultSectionOrder(resume.templateId, true, resume.experienceLevel);
    updateOrder(defaults);
  };

  const handleJumpToSection = (meta: SectionMeta) => {
    onSelectSection(meta.builderKey);
    onClose();
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as ResumeSectionId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (!over) return;

    const activeSecId = active.id as ResumeSectionId;
    const overId = String(over.id);

    if (layout === 'single') {
      if (activeSecId !== overId && singleList.includes(overId as ResumeSectionId)) {
        const oldIndex = singleList.indexOf(activeSecId);
        const newIndex = singleList.indexOf(overId as ResumeSectionId);
        if (oldIndex !== -1 && newIndex !== -1) {
          const nextSingle = arrayMove(singleList, oldIndex, newIndex);
          updateOrder({ ...currentOrder, singleColumn: nextSingle });
        }
      }
      return;
    }

    // Two-Column Mode
    const inMain = mainList.includes(activeSecId);
    const inSidebar = sidebarList.includes(activeSecId);

    const overIsMainContainer = overId === 'container-main';
    const overIsSidebarContainer = overId === 'container-sidebar';
    const overInMain = mainList.includes(overId as ResumeSectionId) || overIsMainContainer;
    const overInSidebar = sidebarList.includes(overId as ResumeSectionId) || overIsSidebarContainer;

    if (inMain && overInMain) {
      // Reorder inside Main Column
      if (!overIsMainContainer && activeSecId !== overId) {
        const oldIndex = mainList.indexOf(activeSecId);
        const newIndex = mainList.indexOf(overId as ResumeSectionId);
        if (oldIndex !== -1 && newIndex !== -1) {
          const nextMain = arrayMove(mainList, oldIndex, newIndex);
          updateOrder({ ...currentOrder, mainColumn: nextMain });
        }
      }
    } else if (inSidebar && overInSidebar) {
      // Reorder inside Sidebar Column
      if (!overIsSidebarContainer && activeSecId !== overId) {
        const oldIndex = sidebarList.indexOf(activeSecId);
        const newIndex = sidebarList.indexOf(overId as ResumeSectionId);
        if (oldIndex !== -1 && newIndex !== -1) {
          const nextSidebar = arrayMove(sidebarList, oldIndex, newIndex);
          updateOrder({ ...currentOrder, sidebarColumn: nextSidebar });
        }
      }
    } else if (inMain && overInSidebar) {
      // Cross-column transfer: Main -> Sidebar!
      const nextMain = mainList.filter((s) => s !== activeSecId);
      let nextSidebar = [...sidebarList];
      if (overIsSidebarContainer || !sidebarList.includes(overId as ResumeSectionId)) {
        nextSidebar.push(activeSecId);
      } else {
        const overIndex = sidebarList.indexOf(overId as ResumeSectionId);
        nextSidebar.splice(overIndex, 0, activeSecId);
      }
      updateOrder({ ...currentOrder, mainColumn: nextMain, sidebarColumn: nextSidebar });
    } else if (inSidebar && overInMain) {
      // Cross-column transfer: Sidebar -> Main!
      const nextSidebar = sidebarList.filter((s) => s !== activeSecId);
      let nextMain = [...mainList];
      if (overIsMainContainer || !mainList.includes(overId as ResumeSectionId)) {
        nextMain.push(activeSecId);
      } else {
        const overIndex = mainList.indexOf(overId as ResumeSectionId);
        nextMain.splice(overIndex, 0, activeSecId);
      }
      updateOrder({ ...currentOrder, mainColumn: nextMain, sidebarColumn: nextSidebar });
    }
  };

  const renderSingleColumn = () => (
    <DroppableColumn
      id="container-single"
      title="Single Column Document Flow"
      description="Top-to-bottom layout for maximum ATS compatibility. Drag cards to reorder sections."
      widthLabel="100% Full Width"
      columnType="single"
      items={singleList}
    >
      <SortableContext items={singleList} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {singleList.map((secId) => (
            <SortableSectionCard
              key={secId}
              id={secId}
              column="single"
              sidebarPos={sidebarPos}
              layout="single"
              onToggleSection={handleToggleSection}
              onJumpToSection={handleJumpToSection}
              activeTab={activeTab}
              resume={resume}
            />
          ))}
        </div>
      </SortableContext>
    </DroppableColumn>
  );

  const renderMainColumn = () => (
    <DroppableColumn
      id="container-main"
      title="Main Column"
      description="Narrative experience, projects, leadership & extensive content (60–70% width)."
      widthLabel={sidebarPos === 'left' ? 'Right ~65%' : 'Left ~65%'}
      columnType="main"
      items={mainList}
    >
      <SortableContext items={mainList} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {mainList.map((secId) => (
            <SortableSectionCard
              key={secId}
              id={secId}
              column="main"
              sidebarPos={sidebarPos}
              layout="double"
              onTransferToSidebar={transferToSidebar}
              onToggleSection={handleToggleSection}
              onJumpToSection={handleJumpToSection}
              activeTab={activeTab}
              resume={resume}
            />
          ))}
        </div>
      </SortableContext>
    </DroppableColumn>
  );

  const renderSidebarColumn = () => (
    <DroppableColumn
      id="container-sidebar"
      title="Sidebar Column"
      description="Concise skills, certifications, education, languages & credentials (30–40% width)."
      widthLabel={sidebarPos === 'left' ? 'Left ~35%' : 'Right ~35%'}
      columnType="sidebar"
      items={sidebarList}
    >
      <SortableContext items={sidebarList} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {sidebarList.map((secId) => (
            <SortableSectionCard
              key={secId}
              id={secId}
              column="sidebar"
              sidebarPos={sidebarPos}
              layout="double"
              onTransferToMain={transferToMain}
              onToggleSection={handleToggleSection}
              onJumpToSection={handleJumpToSection}
              activeTab={activeTab}
              resume={resume}
            />
          ))}
        </div>
      </SortableContext>
    </DroppableColumn>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-white dark:bg-[#141412] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/[0.08] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/80 dark:bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800 shadow-2xs shrink-0">
              {layout === 'double' ? (
                <Columns2 className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                  Sections &amp; Layout Order
                </h3>
                <Badge variant="outline" className="text-[10.5px] font-semibold uppercase tracking-wider bg-white dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/[0.1]">
                  {layout === 'double'
                    ? `Two-Column (${sidebarPos === 'left' ? 'Left Sidebar' : 'Right Sidebar'})`
                    : 'Single-Column Layout'}
                </Badge>
                {/* Active Template Switcher */}
                <div className="flex items-center gap-1.5 bg-white dark:bg-white/[0.05] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/[0.1] text-xs shadow-2xs">
                  <Layout className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Template:</span>
                  <select
                    value={resume.templateId}
                    onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
                    className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer text-xs"
                    title="Change template to dynamically preview layout"
                  >
                    {TEMPLATES.map((t) => (
                      <option key={t.id} value={t.id} className="dark:bg-[#1a1a18] dark:text-white">
                        {t.name} ({t.layout === 'double' ? 'Double' : 'Single'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {layout === 'double'
                  ? 'Drag sections between columns or use directional buttons to move between Sidebar and Main.'
                  : 'Reorder sections top-to-bottom on your single-column ATS resume.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Realistic Resume Sheet Header Preview */}
          <div className="bg-white dark:bg-[#181816] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-xs overflow-hidden">
            {/* Top Accent Bar mirroring selected theme color */}
            <div
              className="h-1.5 w-full transition-colors"
              style={{ backgroundColor: resume.themeColor || '#047857' }}
            />
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                    {resume.personalInfo.fullName || 'Candidate Full Name'}
                  </h4>
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: resume.themeColor || '#047857' }}
                  >
                    {resume.personalInfo.jobTitle || 'Professional Role'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                  {resume.personalInfo.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{resume.personalInfo.email}</span>
                    </span>
                  )}
                  {resume.personalInfo.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{resume.personalInfo.phone}</span>
                    </span>
                  )}
                  {resume.personalInfo.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{resume.personalInfo.location}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Layout Archetype Badge */}
              <div className="shrink-0 flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {layout === 'double'
                      ? `Two Columns (${sidebarPos === 'left' ? 'Sidebar Left' : 'Sidebar Right'})`
                      : 'Single Column (Linear Flow)'}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">
                    {layout === 'double'
                      ? `${mainList.length} Main • ${sidebarList.length} Sidebar`
                      : `${singleList.length} Sections Total`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DndContext Wrapping Columns with Cross-Column Drag and Drop */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {layout === 'double' ? (
              /* Two-Column Real Layout: Displays Sidebar on Left or Right based on template */
              <div className="flex flex-col md:flex-row gap-5 items-stretch">
                {sidebarPos === 'left' ? (
                  <>
                    <div className="w-full md:w-[38%] lg:w-[35%] shrink-0 flex flex-col">
                      {renderSidebarColumn()}
                    </div>
                    <div className="w-full md:w-[62%] lg:w-[65%] flex-1 flex flex-col">
                      {renderMainColumn()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full md:w-[62%] lg:w-[65%] flex-1 flex flex-col">
                      {renderMainColumn()}
                    </div>
                    <div className="w-full md:w-[38%] lg:w-[35%] shrink-0 flex flex-col">
                      {renderSidebarColumn()}
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Single-Column Real Layout */
              <div className="w-full max-w-2xl mx-auto">
                {renderSingleColumn()}
              </div>
            )}

            {/* Drag Overlay for smooth card preview while dragging across columns */}
            <DragOverlay>
              {activeDragId ? (
                <div className="p-3.5 rounded-xl border-2 border-emerald-500 bg-white dark:bg-[#1a1a18] shadow-2xl ring-4 ring-emerald-500/20 flex items-center justify-between gap-3 w-72">
                  <div className="flex items-center gap-2.5">
                    <GripVertical className="w-4 h-4 text-emerald-600" />
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                      {SECTION_METAS[activeDragId]?.icon &&
                        React.createElement(SECTION_METAS[activeDragId].icon, { className: 'w-4 h-4' })}
                    </div>
                    <span className="font-bold text-xs sm:text-[13px] text-slate-900 dark:text-white truncate">
                      {SECTION_METAS[activeDragId]?.label}
                    </span>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Available / Inactive Sections */}
          <div className="mt-8 border-t border-slate-200 dark:border-white/[0.08] pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Available Sections to Add</h4>
                <Badge variant="secondary" className="text-[10px] ml-1.5 font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
                  {inactiveSections.length}
                </Badge>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Check box or click button to add to your layout
              </span>
            </div>
            {inactiveSections.length === 0 ? (
              <div className="p-5 text-center text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-white/[0.08] rounded-xl bg-slate-50/60 dark:bg-white/[0.02]">
                You have added all available sections to your layout.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inactiveSections.map((secId) => {
                  const meta = SECTION_METAS[secId];
                  if (!meta) return null;
                  const Icon = meta.icon;
                  const count = meta.getCount(resume);

                  return (
                    <div
                      key={secId}
                      className="p-3 sm:p-3.5 rounded-xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/[0.12] transition-all flex items-center justify-between gap-3 opacity-80 hover:opacity-100"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <div className="shrink-0 flex items-center">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => handleToggleSection(secId)}
                            className="w-4 h-4 text-emerald-700 dark:text-emerald-500 rounded border-slate-300 dark:border-white/20 accent-emerald-600 cursor-pointer"
                            title="Check to add to layout"
                          />
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-slate-200/70 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-xs sm:text-[13px] text-slate-800 dark:text-slate-200 truncate block">
                            {meta.label}
                          </span>
                          {count !== null && count > 0 && (
                            <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                              {count} {count === 1 ? 'item' : 'items'} saved
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {layout === 'double' ? (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => handleAddDirectly(secId, 'main')}
                              className="h-6 text-[10.5px] px-2 text-emerald-700 dark:text-emerald-400 border-emerald-500/25 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg cursor-pointer"
                              title="Add section to Main Column"
                            >
                              + Main
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => handleAddDirectly(secId, 'sidebar')}
                              className="h-6 text-[10.5px] px-2 text-amber-700 dark:text-amber-400 border-amber-500/25 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg cursor-pointer"
                              title="Add section to Sidebar Column"
                            >
                              + Sidebar
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => handleToggleSection(secId)}
                            className="h-6 text-[10.5px] px-2 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.08] rounded-lg cursor-pointer"
                          >
                            <Plus className="w-3 h-3 mr-0.5" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Jump to Final Review & Share */}
          <div className="pt-2">
            <button
              type="button"
              id="jump-to-review-btn"
              onClick={() => {
                onSelectSection('review');
                onClose();
              }}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none ${
                activeTab === 'review'
                  ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 ring-2 ring-purple-500/20'
                  : 'border-purple-200/80 dark:border-purple-800/40 bg-purple-50/40 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-purple-950 dark:text-purple-200">
                    Final Review &amp; Export
                  </div>
                  <div className="text-[11px] text-purple-700 dark:text-purple-300/80">
                    Download PDF, high-DPI print, shareable public link &amp; design fine-tuning
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-0.5 shrink-0">
                Go to Review &rarr;
              </span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/80 dark:bg-white/[0.02] shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white gap-1.5 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Layout Defaults</span>
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

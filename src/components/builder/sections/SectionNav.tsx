'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SectionKey, NavItemConfig } from '@/types/builder';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages,
  Layers,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  Plus,
  Heart,
  Laptop,
  Crown,
  BookOpen,
  Shield,
  Smile,
  FlaskConical,
  Calendar,
  FileBadge,
  Trophy,
  Medal,
  FileCheck,
  Building,
  CheckSquare,
  Globe,
  Share2,
  Code2,
  Mic,
  Compass,
  Users,
  Check,
  ArrowRight,
} from 'lucide-react';
import { ResumeData, SectionOrderConfig } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { SectionReorderModal } from '@/components/builder/SectionReorderModal';
import { cn } from '@/lib/utils';

interface SectionNavProps {
  activeTab: SectionKey | 'all';
  onSelectTab: (tab: SectionKey | 'all') => void;
  resume: ResumeData;
  completeness: number;
  stepKeys: SectionKey[];
  onReorderSections: (newKeys: SectionKey[]) => void;
  onUpdateSectionOrder?: (newOrder: SectionOrderConfig) => void;
  onChange?: (updated: Partial<ResumeData>) => void;
  onAddSection?: (key: SectionKey) => void;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { key: 'personal', label: 'Basics', icon: User },
  {
    key: 'experience',
    label: 'Experience',
    icon: Briefcase,
    getCount: (r) => r.experience?.length || 0,
  },
  {
    key: 'education',
    label: 'Education',
    icon: GraduationCap,
    getCount: (r) => r.education?.length || 0,
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: Wrench,
    getCount: (r) => r.skills?.length || 0,
  },
  {
    key: 'projects',
    label: 'Projects',
    icon: FolderGit2,
    getCount: (r) => r.projects?.length || 0,
  },
  {
    key: 'certifications',
    label: 'Certs',
    icon: Award,
    getCount: (r) => r.certifications?.length || 0,
  },
  {
    key: 'languages',
    label: 'Languages',
    icon: Languages,
    getCount: (r) => r.languages?.length || 0,
  },
  {
    key: 'volunteer',
    label: 'Volunteer',
    icon: Heart,
    getCount: (r) => r.volunteer?.length || 0,
  },
  {
    key: 'internships',
    label: 'Internships',
    icon: Briefcase,
    getCount: (r) => r.internships?.length || 0,
  },
  {
    key: 'freelance',
    label: 'Freelance',
    icon: Laptop,
    getCount: (r) => r.freelance?.length || 0,
  },
  {
    key: 'leadership',
    label: 'Leadership',
    icon: Crown,
    getCount: (r) => r.leadership?.length || 0,
  },
  {
    key: 'teaching',
    label: 'Teaching',
    icon: BookOpen,
    getCount: (r) => r.teaching?.length || 0,
  },
  {
    key: 'militaryService',
    label: 'Military',
    icon: Shield,
    getCount: (r) => r.militaryService?.length || 0,
  },
  {
    key: 'extracurricular',
    label: 'Activities',
    icon: Smile,
    getCount: (r) => r.extracurricular?.length || 0,
  },
  {
    key: 'research',
    label: 'Research',
    icon: FlaskConical,
    getCount: (r) => r.research?.length || 0,
  },
  {
    key: 'publications',
    label: 'Publications',
    icon: BookOpen,
    getCount: (r) => r.publications?.length || 0,
  },
  {
    key: 'conferences',
    label: 'Conferences',
    icon: Calendar,
    getCount: (r) => r.conferences?.length || 0,
  },
  {
    key: 'patents',
    label: 'Patents',
    icon: FileBadge,
    getCount: (r) => r.patents?.length || 0,
  },
  {
    key: 'achievements',
    label: 'Achievements',
    icon: Trophy,
    getCount: (r) => r.achievements?.length || 0,
  },
  {
    key: 'awards',
    label: 'Awards',
    icon: Medal,
    getCount: (r) => r.awards?.length || 0,
  },
  {
    key: 'courses',
    label: 'Courses',
    icon: GraduationCap,
    getCount: (r) => r.courses?.length || 0,
  },
  {
    key: 'licenses',
    label: 'Licenses',
    icon: FileCheck,
    getCount: (r) => r.licenses?.length || 0,
  },
  {
    key: 'organizations',
    label: 'Organizations',
    icon: Building,
    getCount: (r) => r.organizations?.length || 0,
  },
  {
    key: 'testScores',
    label: 'Test Scores',
    icon: CheckSquare,
    getCount: (r) => r.testScores?.length || 0,
  },
  {
    key: 'professionalLinks',
    label: 'Pro Links',
    icon: Globe,
    getCount: (r) => r.professionalLinks?.length || 0,
  },
  {
    key: 'socialLinks',
    label: 'Social',
    icon: Share2,
    getCount: (r) => r.socialLinks?.length || 0,
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    icon: FolderGit2,
    getCount: (r) => r.portfolio?.length || 0,
  },
  {
    key: 'openSource',
    label: 'Open Source',
    icon: Code2,
    getCount: (r) => r.openSource?.length || 0,
  },
  {
    key: 'speaking',
    label: 'Speaking',
    icon: Mic,
    getCount: (r) => r.speaking?.length || 0,
  },
  {
    key: 'interests',
    label: 'Interests',
    icon: Compass,
    getCount: (r) => r.interests?.length || 0,
  },
  {
    key: 'references',
    label: 'References',
    icon: Users,
    getCount: (r) => r.references?.length || 0,
  },
  {
    key: 'customSections',
    label: 'Custom',
    icon: Layers,
    getCount: (r) => r.customSections?.length || 0,
  },
  {
    key: 'review',
    label: 'Review',
    icon: Sparkles,
  },
  { key: 'all', label: 'All Sections', icon: Layers },
];

export const SectionNav: React.FC<SectionNavProps> = ({
  activeTab,
  onSelectTab,
  resume,
  completeness,
  stepKeys,
  onReorderSections,
  onUpdateSectionOrder,
  onChange,
  onAddSection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  const isReview = activeTab === 'review';
  const currentIndex = activeTab === 'all' || isReview ? -1 : stepKeys.indexOf(activeTab);
  const currentItem = activeTab === 'all' ? null : NAV_ITEMS.find((item) => item.key === activeTab);
  const currentLabel = activeTab === 'all' ? 'All Sections' : currentItem?.label || 'Basics';
  const CurrentIcon = activeTab === 'all' ? Layers : currentItem?.icon || User;
  const itemCount = currentItem?.getCount ? currentItem.getCount(resume) : null;

  return (
    <div className="h-12 border-b border-slate-200 dark:border-border px-4 sm:px-6 bg-white dark:bg-card flex items-center justify-between gap-3 shrink-0">
      {/* Left: Step Breadcrumb Indicator */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-muted-foreground shrink-0">
        <span className={`w-2 h-2 rounded-full shrink-0 ${isReview ? 'bg-purple-600 animate-pulse' : 'bg-primary'}`} />
        <span className="hidden sm:inline">
          {activeTab === 'all'
            ? 'Overview Mode'
            : isReview
            ? 'Review'
            : `Step ${currentIndex + 1} of ${stepKeys.length}`}
        </span>
        <span className="sm:hidden text-[11px] text-slate-600 dark:text-slate-400 font-bold">
          {activeTab === 'all' ? 'All' : isReview ? 'Review' : `${currentIndex + 1}/${stepKeys.length}`}
        </span>
      </div>

      {/* Center: Interactive Section Progress Pill with Quick-Jump Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className={cn(
            'group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer',
            isDropdownOpen
              ? 'bg-primary/10 dark:bg-primary/20 border-primary/40 text-primary'
              : 'bg-slate-50 dark:bg-muted hover:bg-slate-100 dark:hover:bg-accent border-slate-200/90 dark:border-border text-slate-800 dark:text-foreground'
          )}
          title="Click to jump directly between sections"
        >
          <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
            <CurrentIcon className="w-3 h-3" />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className="truncate max-w-[80px] sm:max-w-none">{currentLabel}</span>
            {itemCount !== null && itemCount > 0 && (
              <span className="text-[10px] font-semibold text-slate-500 dark:text-muted-foreground bg-white dark:bg-card px-1.5 py-0.2 rounded-full border border-slate-200 dark:border-border shadow-2xs">
                {itemCount}
              </span>
            )}
          </div>

          {/* Completeness percentage */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-border text-[11px] font-bold text-primary">
            <div className="w-8 sm:w-10 h-1.5 bg-slate-200 dark:bg-muted-foreground/20 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <span>{completeness}%</span>
          </div>

          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-slate-400 dark:text-muted-foreground group-hover:text-slate-700 dark:group-hover:text-foreground transition-transform shrink-0',
              isDropdownOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Quick-Jump Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#161614] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-white/[0.08] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header: Progress Summary */}
            <div className="p-3 bg-slate-50/70 dark:bg-[#1a1a18] border-b border-slate-100 dark:border-white/[0.06]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-900 dark:text-white">Resume Sections</span>
                <span className="font-bold text-primary text-[11px]">{completeness}% Complete</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200/80 dark:bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${completeness}%` }}
                />
              </div>
            </div>

            {/* Section Quick Jump List */}
            <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
              {stepKeys.map((key) => {
                const item = NAV_ITEMS.find((n) => n.key === key);
                if (!item) return null;
                const Icon = item.icon;
                const count = item.getCount ? item.getCount(resume) : null;
                const isSelected = activeTab === key;
                const isFilled = count !== null ? count > 0 : Boolean(resume.personalInfo?.fullName);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onSelectTab(key);
                      setIsDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left',
                      isSelected
                        ? 'bg-primary/10 dark:bg-primary/20 text-primary font-bold'
                        : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-zinc-400'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {count !== null && count > 0 && (
                        <span className="text-[10.5px] font-semibold text-slate-400 dark:text-zinc-500">
                          {count} {count === 1 ? 'item' : 'items'}
                        </span>
                      )}
                      {isFilled && (
                        <span className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Review Step Option */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab('review');
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left',
                  activeTab === 'review'
                    ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold'
                    : 'text-slate-700 dark:text-zinc-200 hover:bg-purple-50/50 dark:hover:bg-purple-950/20'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs',
                      activeTab === 'review'
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400'
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">Review & ATS Check</span>
                </div>
              </button>

              {/* Overview Mode Option */}
              <button
                type="button"
                onClick={() => {
                  onSelectTab('all');
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left',
                  activeTab === 'all'
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary font-bold'
                    : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-zinc-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">View All Sections (Single Page)</span>
                </div>
              </button>
            </div>

            {/* Footer: Manage Sections Modal Trigger */}
            <div className="p-2 border-t border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-[#1a1a18]">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Manage & Reorder Sections</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Action Buttons */}
      <div className="shrink-0 flex items-center gap-1 sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground h-7 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-accent transition-colors cursor-pointer"
          title="Manage and reorder sections"
        >
          <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-muted-foreground" />
          <span className="hidden sm:inline">Manage Sections</span>
          <span className="sm:hidden">Manage</span>
        </Button>
      </div>

      {/* Section Reorder Modal */}
      <SectionReorderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stepKeys={stepKeys}
        navItems={NAV_ITEMS}
        activeTab={activeTab}
        onSelectSection={onSelectTab}
        onReorderSections={onReorderSections}
        onUpdateSectionOrder={onUpdateSectionOrder}
        onChange={onChange}
        resume={resume}
      />
    </div>
  );
};

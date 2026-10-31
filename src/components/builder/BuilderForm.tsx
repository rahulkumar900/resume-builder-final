'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ResumeData } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { SectionNav, NAV_ITEMS } from './sections/SectionNav';
import { FixedBottomNav } from './sections/FixedBottomNav';
import { PersonalSection } from './sections/PersonalSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { InternshipsSection } from './sections/InternshipsSection';
import { FinalReviewSection } from './sections/FinalReviewSection';
import { GenericSectionEditor } from './sections/GenericSectionEditor';
import { ShareResumeModal } from '@/components/builder/ShareResumeModal';
import { calculateOverallCompleteness } from '@/lib/section-progress';
import {
  getTemplateLayout,
  getDefaultColumnForSection,
  DEFAULT_SINGLE_COLUMN_SECTIONS,
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
} from '@/lib/templates';
import { ResumeSectionId } from '@/types/resume';

interface BuilderFormProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onDownloadPdf?: () => void;
  onPrint?: () => void;
  onScore?: () => void;
  onOpenDesignStudio?: () => void;
  onOpenJobTailor?: () => void;
  onOpenGrammar?: () => void;
  isDownloading?: boolean;
}

const DEFAULT_STEP_KEYS: SectionKey[] = [
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
];

const DEFAULT_FRESHER_STEP_KEYS: SectionKey[] = [
  'personal',
  'education',
  'projects',
  'skills',
  'internships',
  'certifications',
  'languages',
];

export const BuilderForm: React.FC<BuilderFormProps> = ({
  resume,
  onChange,
  onDownloadPdf,
  onPrint,
  onScore,
  onOpenDesignStudio,
  onOpenJobTailor,
  onOpenGrammar,
  isDownloading = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isFresher = resume.experienceLevel === 'entry';

  const [stepKeys, setStepKeys] = useState<SectionKey[]>(() => {
    const keys = new Set<SectionKey>(['personal']);
    if (resume.sectionOrder) {
      const layout = getTemplateLayout(resume.templateId);
      if (layout === 'single' && resume.sectionOrder.singleColumn) {
        resume.sectionOrder.singleColumn.forEach((s) => keys.add(s === 'summary' ? 'personal' : (s as SectionKey)));
      } else if (resume.sectionOrder.mainColumn || resume.sectionOrder.sidebarColumn) {
        [...(resume.sectionOrder.mainColumn || []), ...(resume.sectionOrder.sidebarColumn || [])].forEach((s) =>
          keys.add(s === 'summary' ? 'personal' : (s as SectionKey))
        );
      }
    } else {
      (isFresher ? DEFAULT_FRESHER_STEP_KEYS : DEFAULT_STEP_KEYS).forEach((k) => keys.add(k));
    }

    // Auto-include any section that has data populated in the resume
    const checkKeys: SectionKey[] = [
      'volunteer', 'internships', 'freelance', 'leadership', 'teaching', 'militaryService', 'extracurricular',
      'research', 'publications', 'conferences', 'patents', 'achievements', 'awards', 'courses', 'licenses',
      'organizations', 'testScores', 'professionalLinks', 'socialLinks', 'portfolio', 'openSource', 'speaking',
      'interests', 'references', 'customSections',
    ];
    checkKeys.forEach((k) => {
      const val = (resume as any)[k];
      if (Array.isArray(val) && val.length > 0) {
        keys.add(k);
      }
    });

    const stepParam = searchParams.get('step');
    if (stepParam && stepParam !== 'all' && stepParam !== 'review') {
      keys.add(stepParam as SectionKey);
    }

    return Array.from(keys);
  });

  const stepParam = searchParams.get('step');
  const initialTab: SectionKey | 'all' = 
    stepParam && (stepParam === 'all' || stepParam === 'review' || stepKeys.includes(stepParam as SectionKey))
      ? (stepParam as any)
      : 'personal';

  const [activeTab, setActiveTabState] = useState<SectionKey | 'all'>(initialTab);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Synchronize state when query param changes externally (e.g. browser back/forward or add section)
  useEffect(() => {
    if (stepParam) {
      if (stepParam !== 'all' && stepParam !== 'review' && !stepKeys.includes(stepParam as SectionKey)) {
        setStepKeys((prev) => Array.from(new Set([...prev, stepParam as SectionKey])));
      }
      setActiveTabState(stepParam as any);
    } else {
      setActiveTabState('personal');
    }
  }, [stepParam, stepKeys]);

  // Synchronize stepKeys when template or sectionOrder changes dynamically
  useEffect(() => {
    const keys = new Set<SectionKey>(['personal']);
    const layout = getTemplateLayout(resume.templateId);
    if (layout === 'single') {
      const single = resume.sectionOrder?.singleColumn || (isFresher
        ? (['summary', 'education', 'projects', 'skills', 'internships', 'certifications', 'languages'] as ResumeSectionId[])
        : DEFAULT_SINGLE_COLUMN_SECTIONS);
      single.forEach((s) => keys.add(s === 'summary' ? 'personal' : (s as SectionKey)));
    } else {
      const mains = resume.sectionOrder?.mainColumn || (isFresher
        ? (['summary', 'education', 'projects', 'internships'] as ResumeSectionId[])
        : DEFAULT_MAIN_COLUMN_SECTIONS);
      const sides = resume.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
      [...mains, ...sides].forEach((s) => keys.add(s === 'summary' ? 'personal' : (s as SectionKey)));
    }

    const checkKeys: SectionKey[] = [
      'volunteer', 'internships', 'freelance', 'leadership', 'teaching', 'militaryService', 'extracurricular',
      'research', 'publications', 'conferences', 'patents', 'achievements', 'awards', 'courses', 'licenses',
      'organizations', 'testScores', 'professionalLinks', 'socialLinks', 'portfolio', 'openSource', 'speaking',
      'interests', 'references', 'customSections',
    ];
    checkKeys.forEach((k) => {
      const val = (resume as any)[k];
      if (Array.isArray(val) && val.length > 0) {
        keys.add(k);
      }
    });

    if (stepParam && stepParam !== 'all' && stepParam !== 'review') {
      keys.add(stepParam as SectionKey);
    }

    setStepKeys(Array.from(keys));
  }, [resume.templateId, resume.sectionOrder]);

  const setActiveTab = (tab: SectionKey | 'all') => {
    if (tab === activeTab) return;
    setActiveTabState(tab);
    // Update URL query with router.push so browser history back/forward navigates steps
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('step', tab);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleAddNewSection = (key: SectionKey, navigateToSection?: boolean) => {
    if (key === 'review' || key === 'personal') return;
    if (!stepKeys.includes(key)) {
      const nextStepKeys = [...stepKeys, key];
      setStepKeys(nextStepKeys);

      // Update resume sectionOrder as well
      const secId = key as ResumeSectionId;
      const layout = getTemplateLayout(resume.templateId);
      const currentOrder = resume.sectionOrder || {};

      if (layout === 'single') {
        const currentSingle = currentOrder.singleColumn || [];
        if (!currentSingle.includes(secId)) {
          onChange({
            sectionOrder: {
              ...currentOrder,
              singleColumn: [...currentSingle, secId],
            },
          });
        }
      } else {
        const col = getDefaultColumnForSection(secId, resume.templateId);
        if (col === 'main') {
          const currentMain = currentOrder.mainColumn || [];
          if (!currentMain.includes(secId)) {
            onChange({
              sectionOrder: {
                ...currentOrder,
                mainColumn: [...currentMain, secId],
              },
            });
          }
        } else {
          const currentSidebar = currentOrder.sidebarColumn || [];
          if (!currentSidebar.includes(secId)) {
            onChange({
              sectionOrder: {
                ...currentOrder,
                sidebarColumn: [...currentSidebar, secId],
              },
            });
          }
        }
      }
    }

    const shouldNavigate = navigateToSection !== undefined ? navigateToSection : activeTab !== 'review';
    if (shouldNavigate) {
      setActiveTab(key);
    }
  };

  const completeness = calculateOverallCompleteness(resume);

  const currentStepIndex = stepKeys.indexOf(activeTab as SectionKey);

  const goToNextStep = () => {
    if (currentStepIndex >= 0 && currentStepIndex < stepKeys.length - 1) {
      setActiveTab(stepKeys[currentStepIndex + 1]);
    } else {
      setActiveTab('review');
    }
  };

  const goToPrevStep = () => {
    if (activeTab === 'review') {
      setActiveTab(stepKeys[stepKeys.length - 1]);
    } else if (currentStepIndex > 0) {
      setActiveTab(stepKeys[currentStepIndex - 1]);
    }
  };

  const renderSection = (key: SectionKey) => {
    switch (key) {
      case 'personal':
        return (
          <PersonalSection
            key="personal"
            data={resume.personalInfo}
            onChange={(personalInfo) => onChange({ personalInfo })}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            key="experience"
            data={resume.experience || []}
            onChange={(experience) => onChange({ experience })}
            targetRole={resume.personalInfo?.jobTitle}
          />
        );
      case 'internships':
        return (
          <InternshipsSection
            key="internships"
            data={resume.internships || []}
            onChange={(internships) => onChange({ internships })}
            targetRole={resume.personalInfo?.jobTitle}
          />
        );
      case 'education':
        return (
          <EducationSection
            key="education"
            data={resume.education || []}
            onChange={(education) => onChange({ education })}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            key="skills"
            data={resume.skills || []}
            config={resume.skillsConfig}
            templateId={resume.templateId}
            targetRole={resume.personalInfo?.jobTitle}
            onChange={(skills, skillsConfig) =>
              onChange({ skills, ...(skillsConfig !== undefined ? { skillsConfig } : {}) })
            }
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            key="projects"
            data={resume.projects || []}
            jobRole={resume.personalInfo?.jobTitle}
            onChange={(projects) => onChange({ projects })}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            key="certifications"
            data={resume.certifications || []}
            onChange={(certifications) => onChange({ certifications })}
          />
        );
      case 'languages':
        return (
          <LanguagesSection
            key="languages"
            data={resume.languages || []}
            onChange={(languages) => onChange({ languages })}
          />
        );
      case 'review':
        return (
          <FinalReviewSection
            key="review"
            resume={resume}
            onChange={onChange}
            onSelectSection={(sec) => setActiveTab(sec)}
            onDownloadPdf={onDownloadPdf}
            onPrint={onPrint}
            onScore={onScore}
            onOpenDesignStudio={onOpenDesignStudio}
            onOpenJobTailor={onOpenJobTailor}
            onOpenGrammar={onOpenGrammar}
            onShare={() => setIsShareModalOpen(true)}
            isDownloading={isDownloading}
            completeness={completeness}
            stepKeys={stepKeys}
            onReorderSections={setStepKeys}
            onAddSection={(secKey) => handleAddNewSection(secKey, false)}
          />
        );
      default:
        return (
          <GenericSectionEditor
            key={key}
            sectionKey={key}
            resume={resume}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden min-h-0 bg-slate-50/50 dark:bg-background">
      {/* 1. Top Section Navigation with Centered Progress Indicator & Reorder Modal */}
      <SectionNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        resume={resume}
        completeness={completeness}
        stepKeys={stepKeys}
        onReorderSections={setStepKeys}
        onUpdateSectionOrder={(sectionOrder) => onChange({ sectionOrder })}
        onChange={onChange}
        onAddSection={handleAddNewSection}
      />

      {/* 2. Scrollable Middle Form Area */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 sm:px-6 lg:px-7 py-5 sm:py-6 space-y-6 sm:space-y-8">
        {activeTab === 'all' ? (
          <>
            {stepKeys.map((key) => renderSection(key))}
            {renderSection('review')}
          </>
        ) : (
          renderSection(activeTab as SectionKey)
        )}
      </div>

      {/* 3. Fixed Bottom Section Navigation Bar */}
      <FixedBottomNav
        activeTab={activeTab}
        currentStepIndex={currentStepIndex}
        stepKeys={stepKeys}
        navItems={NAV_ITEMS}
        onPrev={goToPrevStep}
        onNext={goToNextStep}
        onGoToReview={() => setActiveTab('review')}
        onDownloadPdf={onDownloadPdf}
        onShare={() => setIsShareModalOpen(true)}
        isDownloading={isDownloading}
      />

      {/* Share Resume Modal */}
      <ShareResumeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resume={resume}
        onDownloadPdf={onDownloadPdf}
        onPrint={onPrint}
      />
    </div>
  );
};

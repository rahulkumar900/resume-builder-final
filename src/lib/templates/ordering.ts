/**
 * @fileoverview Template Section Ordering & Migration Utilities
 * @description Layout detection, section column placement, default section ordering,
 * and schema migration between single-column and double-column templates.
 */

import { ResumeSectionId, TemplateId, SectionOrderConfig, ResumeData } from '@/types/resume';
import { DEFAULT_SINGLE_COLUMN_SECTIONS, DEFAULT_MAIN_COLUMN_SECTIONS, DEFAULT_SIDEBAR_COLUMN_SECTIONS, DEFAULT_ACTIVE_SECTIONS } from './sections';
import { TEMPLATE_COLUMN_CONTRACTS } from './contracts';
import { TEMPLATES } from './definitions';
import { isSectionPopulated } from './content-check';
export const getTemplateLayout = (templateId: TemplateId): 'single' | 'double' => {
  const t = TEMPLATES.find((item) => item.id === templateId);
  return t ? t.layout : 'single';
};

export const getTemplateSidebarPosition = (templateId: TemplateId): 'left' | 'right' => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId];
  return contract?.sidebarPosition ?? 'left';
};

export const getTemplateColumnForSection = (
  templateId: TemplateId,
  secId: ResumeSectionId
): 'main' | 'sidebar' => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId];
  if (contract && contract.sidebarSections.includes(secId)) {
    return 'sidebar';
  }
  return 'main';
};

/**
 * Resolves whether a given section belongs in the main or sidebar column by default.
 */
export const getDefaultColumnForSection = (
  secId: ResumeSectionId,
  templateId?: TemplateId
): 'main' | 'sidebar' => {
  if (templateId) {
    return getTemplateColumnForSection(templateId, secId);
  }
  switch (secId) {
    case 'skills':
    case 'certifications':
    case 'awards':
    case 'achievements':
    case 'languages':
    case 'interests':
    case 'references':
    case 'courses':
    case 'organizations':
    case 'conferences':
    case 'testScores':
    case 'professionalLinks':
    case 'socialLinks':
    case 'licenses':
      return 'sidebar';
    case 'experience':
    case 'education':
    case 'projects':
    case 'volunteer':
    case 'publications':
    case 'research':
    case 'internships':
    case 'freelance':
    case 'leadership':
    case 'teaching':
    case 'militaryService':
    case 'patents':
    case 'openSource':
    case 'speaking':
    case 'portfolio':
    case 'extracurricular':
    case 'customSections':
    case 'summary':
    default:
      return 'main';
  }
};

export const getDefaultSectionOrder = (
  templateId: TemplateId,
  activeOnly: boolean = true,
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'experienced'
): SectionOrderConfig => {
  const isFresher = experienceLevel === 'entry' || templateId === 'fresher';
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
  const layout = getTemplateLayout(templateId);

  if (layout === 'single') {
    if (isFresher) {
      const fresherSingle: ResumeSectionId[] = [
        'summary',
        'education',
        'skills',
        'projects',
        'internships',
        'experience',
        'certifications',
        'languages',
      ];
      return {
        singleColumn: activeOnly
          ? fresherSingle.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s) || s === 'internships')
          : [...fresherSingle],
      };
    }
    return {
      singleColumn: activeOnly
        ? contract.mainSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s) || s === 'declaration')
        : [...contract.mainSections],
    };
  }

  if (isFresher) {
    const fresherMain: ResumeSectionId[] = ['summary', 'education', 'projects', 'internships', 'experience'];
    const fresherSidebar: ResumeSectionId[] = ['skills', 'certifications', 'languages', 'awards', 'interests'];
    return {
      mainColumn: activeOnly
        ? fresherMain.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s) || s === 'internships')
        : [...fresherMain],
      sidebarColumn: activeOnly
        ? fresherSidebar.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
        : [...fresherSidebar],
    };
  }

  return {
    mainColumn: activeOnly
      ? contract.mainSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
      : [...contract.mainSections],
    sidebarColumn: activeOnly
      ? contract.sidebarSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
      : [...contract.sidebarSections],
  };
};

/**
 * Extract all active section IDs from a SectionOrderConfig
 */
export const getActiveSectionsFromOrder = (order?: SectionOrderConfig): ResumeSectionId[] => {
  if (!order) return [];
  const set = new Set<ResumeSectionId>();
  if (Array.isArray(order.singleColumn)) {
    order.singleColumn.forEach((id) => set.add(id));
  }
  if (Array.isArray(order.mainColumn)) {
    order.mainColumn.forEach((id) => set.add(id));
  }
  if (Array.isArray(order.sidebarColumn)) {
    order.sidebarColumn.forEach((id) => set.add(id));
  }
  return Array.from(set);
};

/**
 * Migrates a sectionOrder configuration intelligently when switching templates.
 * Preserves all active sections and places them into main or sidebar columns
 * based on the target template's column contract and section classification.
 */
export const migrateSectionOrder = (
  currentOrder: SectionOrderConfig | undefined,
  targetTemplateId: TemplateId
): SectionOrderConfig => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[targetTemplateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
  const targetLayout = getTemplateLayout(targetTemplateId);

  const activeIds = getActiveSectionsFromOrder(currentOrder);

  // If no sections were previously active, return defaults
  if (activeIds.length === 0) {
    return getDefaultSectionOrder(targetTemplateId);
  }

  const hasSummary = activeIds.includes('summary');
  const otherActiveIds = activeIds.filter((id) => id !== 'summary');

  if (targetLayout === 'single') {
    // Single column: preserve active order with summary pinned at the front if present
    const singleList: ResumeSectionId[] = hasSummary ? ['summary', ...otherActiveIds] : [...otherActiveIds];
    if (contract.mainSections.includes('declaration') && !singleList.includes('declaration')) {
      singleList.push('declaration');
    }
    return {
      singleColumn: singleList,
    };
  }

  // Double column: distribute active sections to main and sidebar while preserving relative order
  const mainColumn: ResumeSectionId[] = [];
  const sidebarColumn: ResumeSectionId[] = [];

  otherActiveIds.forEach((id) => {
    if (contract.mainSections.includes(id)) {
      mainColumn.push(id);
    } else if (contract.sidebarSections.includes(id)) {
      sidebarColumn.push(id);
    } else {
      const col = getDefaultColumnForSection(id, targetTemplateId);
      if (col === 'sidebar') {
        sidebarColumn.push(id);
      } else {
        mainColumn.push(id);
      }
    }
  });

  // Always position summary at index 0 of its target column
  if (hasSummary) {
    if (contract.summaryPlacement === 'sidebar' || contract.sidebarSections.includes('summary')) {
      sidebarColumn.unshift('summary');
    } else {
      mainColumn.unshift('summary');
    }
  }

  return {
    mainColumn,
    sidebarColumn,
  };
};

/**
 * Returns a validated and non-empty section order for the current template.
 * If sectionOrder has missing or mismatched columns for the template's layout,
 * it adapts the active sections dynamically.
 */
export const getEffectiveSectionOrder = (
  templateId: TemplateId,
  sectionOrder?: SectionOrderConfig,
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'experienced'
): SectionOrderConfig => {
  const layout = getTemplateLayout(templateId);
  const defaults = getDefaultSectionOrder(templateId, true, experienceLevel);

  if (!sectionOrder) {
    return defaults;
  }

  if (layout === 'single') {
    if (Array.isArray(sectionOrder.singleColumn) && sectionOrder.singleColumn.length > 0) {
      const singleList = [...sectionOrder.singleColumn];
      const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
      if (contract.mainSections.includes('declaration') && !singleList.includes('declaration')) {
        singleList.push('declaration');
      }
      return { singleColumn: singleList };
    }
    // Migrate from main/sidebar to single
    return migrateSectionOrder(sectionOrder, templateId);
  } else {
    const hasMain = Array.isArray(sectionOrder.mainColumn) && sectionOrder.mainColumn.length > 0;
    const hasSidebar = Array.isArray(sectionOrder.sidebarColumn) && sectionOrder.sidebarColumn.length > 0;

    if (hasMain && hasSidebar) {
      return {
        mainColumn: [...(sectionOrder.mainColumn || [])],
        sidebarColumn: [...(sectionOrder.sidebarColumn || [])],
      };
    }

    // If either column is missing or it only had singleColumn, migrate
    return migrateSectionOrder(sectionOrder, templateId);
  }
};

/**
 * Resolves a complete, validated section order for rendering a template.
 * Strictly respects the user's active sections and their configured order.
 * If customSections has populated data but was newly created, it is gracefully appended.
 */
export const getResolvedTemplateSectionOrder = (
  templateId: TemplateId,
  data: ResumeData
): {
  singleColumn?: ResumeSectionId[];
  mainColumn?: ResumeSectionId[];
  sidebarColumn?: ResumeSectionId[];
} => {
  const layout = getTemplateLayout(templateId);
  const effective = getEffectiveSectionOrder(templateId, data.sectionOrder, data.experienceLevel);

  if (layout === 'single') {
    let list = [...(effective.singleColumn || [])];

    // Filter out hidden sections
    if (data.hiddenSections && data.hiddenSections.length > 0) {
      list = list.filter((secId) => !data.hiddenSections!.includes(secId));
    }

    // Only auto-append customSections if user created customSections data
    // but customSections is not yet in the configured order or hidden
    if (
      data.customSections &&
      data.customSections.length > 0 &&
      !list.includes('customSections') &&
      !data.hiddenSections?.includes('customSections')
    ) {
      list.push('customSections');
    }

    return { singleColumn: list };
  } else {
    let mainList = [...(effective.mainColumn || [])];
    let sidebarList = [...(effective.sidebarColumn || [])];

    // Filter out hidden sections
    if (data.hiddenSections && data.hiddenSections.length > 0) {
      mainList = mainList.filter((secId) => !data.hiddenSections!.includes(secId));
      sidebarList = sidebarList.filter((secId) => !data.hiddenSections!.includes(secId));
    }

    // Only auto-append customSections if user created customSections data
    // but customSections is not yet in the configured order or hidden
    if (
      data.customSections &&
      data.customSections.length > 0 &&
      !mainList.includes('customSections') &&
      !sidebarList.includes('customSections') &&
      !data.hiddenSections?.includes('customSections')
    ) {
      const col = getDefaultColumnForSection('customSections', templateId);
      if (col === 'sidebar') {
        sidebarList.push('customSections');
      } else {
        mainList.push('customSections');
      }
    }

    return { mainColumn: mainList, sidebarColumn: sidebarList };
  }
};

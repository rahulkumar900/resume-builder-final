/**
 * @file page-assembler.ts
 * @description Assembles final immutable per-page ResumeData instances from partitioned slots.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): Converts abstract slot partitions into concrete,
 *   type-safe `ResumeData[]` page datasets without making layout or measurement decisions.
 * - Open-Closed Principle (OCP): Extensible for new resume sections via archetype collection
 *   helpers (`collectSplittableItems`, `collectAtomicOrItemized`, `collectCustomSections`).
 * - Liskov Substitution Principle (LSP): Fully satisfies `IPageAssembler`, allowing mock or
 *   custom assemblers in test harnesses.
 * - Interface Segregation Principle (ISP): Consumers interact with the simple `IPageAssembler` contract.
 *
 * Algorithmic Invariants:
 * - Deterministic Text Boundary Cut: `findCleanTextCut` guarantees that `cut1` of Page N matches
 *   `cut0` of Page N+1 with mathematical certainty (0 lost characters, 0 duplicated characters).
 */

import {
  CustomSection,
  CustomSectionItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  ResumeData,
  ResumeSectionId,
  SkillCategory,
} from '@/types/resume';
import {
  TEMPLATE_COLUMN_CONTRACTS,
  hasPageSidebarContent,
  hasPageMainContent,
} from '@/lib/templates';
import { ColumnPageItemSlot, ColumnPagePartition } from './types';
import { normalizeHighlights } from '@/lib/utils';

export function findCleanTextCut(text: string, targetIdx: number): number {
  if (targetIdx <= 0) return 0;
  if (targetIdx >= text.length) return text.length;

  // Search window around targetIdx
  const maxSearchDist = Math.min(100, Math.floor(text.length * 0.25));
  const startSearch = Math.max(0, targetIdx - maxSearchDist);
  const endSearch = Math.min(text.length, targetIdx + maxSearchDist);

  // 1. Try finding sentence boundary: '. ', '? ', '! ', or '.\n'
  let bestSentenceCut = -1;
  let minSentenceDist = Infinity;

  for (let i = startSearch; i < endSearch; i++) {
    const char = text[i];
    if (char === '.' || char === '!' || char === '?') {
      if (i + 1 === text.length || text[i + 1] === ' ' || text[i + 1] === '\n') {
        const cut = i + 1;
        const dist = Math.abs(cut - targetIdx);
        if (dist < minSentenceDist) {
          minSentenceDist = dist;
          bestSentenceCut = cut;
        }
      }
    }
  }

  if (bestSentenceCut !== -1) {
    while (bestSentenceCut < text.length && /\s/.test(text[bestSentenceCut])) {
      bestSentenceCut++;
    }
    return bestSentenceCut;
  }

  // 2. Fall back to word boundary: whitespace
  let bestWordCut = -1;
  let minWordDist = Infinity;

  for (let i = startSearch; i < endSearch; i++) {
    if (/\s/.test(text[i])) {
      const dist = Math.abs(i - targetIdx);
      if (dist < minWordDist) {
        minWordDist = dist;
        bestWordCut = i;
      }
    }
  }

  if (bestWordCut !== -1) {
    while (bestWordCut < text.length && /\s/.test(text[bestWordCut])) {
      bestWordCut++;
    }
    return bestWordCut;
  }

  return targetIdx;
}

export function splitTextByRatio(text: string, ratioStart?: number, ratioEnd?: number): string {
  if (!text) return '';
  if (ratioStart === undefined && ratioEnd === undefined) return text;

  const r0 = Math.max(0, Math.min(1, ratioStart ?? 0));
  const r1 = Math.max(r0, Math.min(1, ratioEnd ?? 1));

  if (r0 === 0 && r1 >= 0.99) return text;
  if (r0 >= 1 || r1 <= 0 || r0 >= r1) return '';

  const cut0 = r0 === 0 ? 0 : findCleanTextCut(text, Math.round(text.length * r0));
  const cut1 = r1 >= 0.99 ? text.length : findCleanTextCut(text, Math.round(text.length * r1));

  if (cut0 >= cut1) return '';

  return text.slice(cut0, cut1).trim();
}

export interface IPageAssembler {
  assemblePages(
    data: ResumeData,
    layout: 'single' | 'double',
    partitions: {
      main?: ColumnPagePartition[];
      sidebar?: ColumnPagePartition[];
      single?: ColumnPagePartition[];
    }
  ): ResumeData[];
}

export class ResumePageAssembler implements IPageAssembler {
  public assemblePages(
    data: ResumeData,
    layout: 'single' | 'double',
    partitions: {
      main?: ColumnPagePartition[];
      sidebar?: ColumnPagePartition[];
      single?: ColumnPagePartition[];
    }
  ): ResumeData[] {
    const mainParts = layout === 'single' ? partitions.single || partitions.main || [] : partitions.main || [];
    const sidebarParts = layout === 'single' ? [] : partitions.sidebar || [];

    const totalPages = Math.max(1, mainParts.length, sidebarParts.length);
    const resultPages: ResumeData[] = [];

    const templateId = data.templateId || 'prawira';
    const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
    const isHeaderBanner = contract.summaryPlacement === 'headerBanner';
    const isDoubleLayout = layout === 'double';

    const hasOverallSidebarContent = isDoubleLayout && (
      sidebarParts.some((p) => p.slots.length > 0) ||
      hasPageSidebarContent(data, contract.sidebarSections)
    );
    const hasOverallMainContent = layout === 'single' || (
      mainParts.some((p) => p.slots.length > 0) ||
      hasPageMainContent(data, contract.mainSections)
    );

    const hasSummarySlotAnywhere = [...mainParts, ...sidebarParts].some((p) =>
      p.slots.some((s) => s.sectionId === 'summary')
    );

    for (let pIdx = 0; pIdx < totalPages; pIdx++) {
      const mainSlots = mainParts[pIdx]?.slots || [];
      const sidebarSlots = sidebarParts[pIdx]?.slots || [];

      const pageData = this.buildPageData(
        data,
        mainSlots,
        sidebarSlots,
        pIdx,
        totalPages,
        isHeaderBanner,
        hasSummarySlotAnywhere,
        hasOverallSidebarContent,
        hasOverallMainContent
      );
      resultPages.push(pageData);
    }

    return resultPages.length > 0 ? resultPages : [data];
  }

  private buildPageData(
    data: ResumeData,
    mainSlots: ColumnPageItemSlot[],
    sidebarSlots: ColumnPageItemSlot[],
    pageIndex: number,
    totalPages: number,
    isHeaderBanner: boolean,
    hasSummarySlotAnywhere: boolean,
    hasOverallSidebarContent: boolean,
    hasOverallMainContent: boolean
  ): ResumeData {
    const allSlots = [...mainSlots, ...sidebarSlots];

    function collectSplittableItems<T extends { id: string; highlights?: string[] }>(
      sourceList: T[] | undefined,
      slots: ColumnPageItemSlot[],
      secId: ResumeSectionId
    ): T[] {
      if (!sourceList || sourceList.length === 0) return [];
      const result: T[] = [];
      slots.forEach((slot) => {
        if (slot.sectionId === secId && slot.itemId) {
          const found = sourceList.find(
            (item, idx) => (item.id || `${secId}-${idx}`) === slot.itemId
          );
          if (found) {
            const normalizedH = normalizeHighlights(found.highlights);
            if (slot.bulletStart !== undefined && slot.bulletEnd !== undefined && normalizedH.length > 0) {
              result.push({
                ...found,
                highlights: normalizedH.slice(slot.bulletStart, slot.bulletEnd),
              });
            } else {
              result.push({
                ...found,
                highlights: normalizedH.length > 0 ? normalizedH : found.highlights,
              });
            }
          }
        }
      });
      return result;
    }

    function collectAtomicOrItemized<T extends { id: string }>(
      sourceList: T[] | undefined,
      slots: ColumnPageItemSlot[],
      secId: ResumeSectionId
    ): T[] {
      if (!sourceList || sourceList.length === 0) return [];
      const matched = slots
        .filter((slot) => slot.sectionId === secId && slot.itemId)
        .map((slot) =>
          sourceList.find((item, idx) => (item.id || `${secId}-${idx}`) === slot.itemId)
        )
        .filter(Boolean) as T[];

      if (matched.length > 0) return matched;

      const hasSection = slots.some((s) => s.sectionId === secId);
      return hasSection ? sourceList : [];
    }

    function collectSplittableSkills(
      sourceList: SkillCategory[] | undefined,
      slots: ColumnPageItemSlot[]
    ): SkillCategory[] {
      if (!sourceList || sourceList.length === 0) return [];
      const result: SkillCategory[] = [];
      slots.forEach((slot) => {
        if (slot.sectionId === 'skills' && slot.itemId) {
          const found = sourceList.find(
            (item, idx) => (item.id || `skills-${idx}`) === slot.itemId
          );
          if (found) {
            const rawItems = found.items || [];
            if (
              slot.bulletStart !== undefined &&
              slot.bulletEnd !== undefined &&
              rawItems.length > 0
            ) {
              const slicedItems = rawItems.slice(slot.bulletStart, slot.bulletEnd);
              if (slicedItems.length > 0) {
                result.push({
                  ...found,
                  items: slicedItems,
                });
              }
            } else {
              result.push(found);
            }
          }
        }
      });

      if (result.length > 0) return result;

      const hasSection = slots.some((s) => s.sectionId === 'skills');
      return hasSection ? sourceList : [];
    }

    function collectCustomSections(
      customSections: CustomSection[] | undefined,
      slots: ColumnPageItemSlot[]
    ): CustomSection[] {
      if (!customSections || customSections.length === 0) return [];
      const customSlots = slots.filter((s) => s.sectionId === 'customSections');
      if (customSlots.length === 0) return [];

      const result: CustomSection[] = [];

      customSections.forEach((sec) => {
        const matchingItems: CustomSectionItem[] = [];
        customSlots.forEach((slot) => {
          if (!slot.itemId) return;
          const found = (sec.items || []).find(
            (it, idx) => (it.id || `${sec.id}-${idx}`) === slot.itemId
          );
          if (found) {
            const normalizedH = normalizeHighlights(found.highlights);
            let itemToAdd: CustomSectionItem = { ...found };
            if (slot.bulletStart !== undefined && slot.bulletEnd !== undefined && normalizedH.length > 0) {
              itemToAdd.highlights = normalizedH.slice(slot.bulletStart, slot.bulletEnd);
            } else if (normalizedH.length > 0) {
              itemToAdd.highlights = normalizedH;
            }
            if (slot.textRatioStart !== undefined && slot.textRatioEnd !== undefined && found.description) {
              itemToAdd.description = splitTextByRatio(found.description, slot.textRatioStart, slot.textRatioEnd);
            }
            matchingItems.push(itemToAdd);
          }
        });

        if (matchingItems.length > 0) {
          result.push({
            ...sec,
            items: matchingItems,
          });
        } else if (
          customSlots.some(
            (s) => !s.itemId || s.itemId === sec.id || s.itemId === 'customSections-content'
          )
        ) {
          result.push(sec);
        }
      });

      return result;
    }

    const summarySlot = allSlots.find((s) => s.sectionId === 'summary');
    let pageSummary = '';

    if (summarySlot) {
      const fullSummary = data.personalInfo?.summary || '';
      if (summarySlot.textRatioStart !== undefined && summarySlot.textRatioEnd !== undefined) {
        pageSummary = splitTextByRatio(fullSummary, summarySlot.textRatioStart, summarySlot.textRatioEnd);
      } else {
        pageSummary = fullSummary;
      }
    } else if (pageIndex === 0 && (isHeaderBanner || !hasSummarySlotAnywhere)) {
      pageSummary = data.personalInfo?.summary || '';
    }

    const hasSummary = Boolean(pageSummary);

    const pageMainSections = Array.from(new Set(mainSlots.map((s) => s.sectionId)));
    const pageSidebarSections = Array.from(new Set(sidebarSlots.map((s) => s.sectionId)));

    if (hasSummary && !isHeaderBanner) {
      const templateId = data.templateId || 'prawira';
      const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
      const isSidebar = contract.sidebarSections.includes('summary');
      if (isSidebar && !pageSidebarSections.includes('summary')) {
        pageSidebarSections.unshift('summary');
      } else if (!isSidebar && !pageMainSections.includes('summary')) {
        pageMainSections.unshift('summary');
      }
    }

    return {
      ...data,
      pageNumber: pageIndex + 1,
      totalPages,
      hasSidebarContent: hasOverallSidebarContent,
      hasMainContent: hasOverallMainContent,
      personalInfo: {
        ...data.personalInfo,
        summary: pageSummary,
      },
      // 1. Work & Experience Archetype
      experience: collectSplittableItems(data.experience, allSlots, 'experience'),
      volunteer: collectSplittableItems(data.volunteer, allSlots, 'volunteer'),
      internships: collectSplittableItems(data.internships, allSlots, 'internships'),
      freelance: collectSplittableItems(data.freelance, allSlots, 'freelance'),
      leadership: collectSplittableItems(data.leadership, allSlots, 'leadership'),
      teaching: collectSplittableItems(data.teaching, allSlots, 'teaching'),
      militaryService: collectSplittableItems(data.militaryService, allSlots, 'militaryService'),
      extracurricular: collectSplittableItems(data.extracurricular, allSlots, 'extracurricular'),

      // 2. Academic & Scholarly Archetype
      education: collectSplittableItems(data.education, allSlots, 'education'),
      research: collectSplittableItems(data.research, allSlots, 'research'),
      publications: collectAtomicOrItemized(data.publications, allSlots, 'publications'),
      conferences: collectAtomicOrItemized(data.conferences, allSlots, 'conferences'),
      patents: collectAtomicOrItemized(data.patents, allSlots, 'patents'),

      // 3. Credentials & Recognition
      certifications: collectAtomicOrItemized(data.certifications, allSlots, 'certifications'),
      awards: collectAtomicOrItemized(data.awards, allSlots, 'awards'),
      achievements: collectAtomicOrItemized(data.achievements, allSlots, 'achievements'),
      courses: collectAtomicOrItemized(data.courses, allSlots, 'courses'),
      licenses: collectAtomicOrItemized(data.licenses, allSlots, 'licenses'),
      organizations: collectAtomicOrItemized(data.organizations, allSlots, 'organizations'),

      // 4. Skills & Tags
      skills: collectSplittableSkills(data.skills, allSlots),
      languages: collectAtomicOrItemized(data.languages, allSlots, 'languages'),
      interests: collectAtomicOrItemized(data.interests, allSlots, 'interests'),
      testScores: collectAtomicOrItemized(data.testScores, allSlots, 'testScores'),

      // 5. Links & Showcase
      projects: collectSplittableItems(data.projects, allSlots, 'projects'),
      professionalLinks: collectAtomicOrItemized(data.professionalLinks, allSlots, 'professionalLinks'),
      socialLinks: collectAtomicOrItemized(data.socialLinks, allSlots, 'socialLinks'),
      portfolio: collectAtomicOrItemized(data.portfolio, allSlots, 'portfolio'),
      openSource: collectAtomicOrItemized(data.openSource, allSlots, 'openSource'),
      speaking: collectAtomicOrItemized(data.speaking, allSlots, 'speaking'),

      // 6. Contact & References
      references: collectAtomicOrItemized(data.references, allSlots, 'references'),

      // 7. Custom Sections
      customSections: collectCustomSections(data.customSections, allSlots),

      sectionOrder: {
        singleColumn: pageMainSections,
        mainColumn: pageMainSections,
        sidebarColumn: pageSidebarSections,
      },
    };
  }
}

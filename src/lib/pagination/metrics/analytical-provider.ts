import {
  ResumeData,
  ResumeSectionId,
  SkillCategory,
  TemplateId,
} from '@/types/resume';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  DEFAULT_SINGLE_COLUMN_SECTIONS,
  getDefaultSectionOrder,
  getResolvedTemplateSectionOrder,
  getTemplateLayout,
} from '@/lib/templates';
import {
  NormalizedBulletMetric,
  NormalizedColumnMetric,
  NormalizedItemMetric,
  NormalizedResumeMetrics,
  NormalizedSectionMetric,
  SplitStrategy,
} from '../core/types';
import { PageCapacityPlanner } from '../core/capacity-planner';
import { IMetricsProvider } from './metrics-provider.interface';
import { normalizeHighlights } from '@/lib/utils';

function stripHtml(html: string = ''): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateTextHeight(text: string, charsPerLine: number, lineHeight: number = 20): number {
  if (!text) return 0;
  const clean = stripHtml(text);
  if (!clean) return 0;
  const lines = Math.max(1, Math.ceil(clean.length / charsPerLine));
  return lines * lineHeight;
}

export class AnalyticalMetricsProvider implements IMetricsProvider {
  public readonly name = 'analytical';
  private readonly capacityPlanner = new PageCapacityPlanner();

  public getMetrics(data: ResumeData): NormalizedResumeMetrics {
    const templateId = data.templateId || 'prawira';
    const spacing = data.spacing || 'normal';
    const hasAvatar = Boolean(data.personalInfo?.avatarUrl);
    const layout = getTemplateLayout(templateId);

    const capacityMetrics = this.capacityPlanner.getTemplateCapacityMetrics(
      templateId,
      spacing,
      hasAvatar
    );

    const resolvedOrder = getResolvedTemplateSectionOrder(templateId, data);

    if (layout === 'single') {
      let singleOrder = resolvedOrder.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;
      if (
        (templateId === 'sarkari' || templateId === 'traditional') &&
        !singleOrder.includes('declaration')
      ) {
        singleOrder = [...singleOrder, 'declaration'];
      }
      singleOrder = singleOrder.filter((s) => !data.hiddenSections?.includes(s));

      const singleCol = this.measureColumn(data, singleOrder, 'single', false, true, spacing);

      return {
        headerHeightPage1: capacityMetrics.headerHeightPage1,
        runningHeaderHeight: capacityMetrics.runningHeaderHeight,
        paddingVertical: capacityMetrics.pagePaddingVertical,
        columns: {
          single: singleCol,
        },
      };
    }

    // Double column
    let mainOrder = (resolvedOrder.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS).filter(
      (s) => !data.hiddenSections?.includes(s)
    );
    let sidebarOrder = (resolvedOrder.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS).filter(
      (s) => !data.hiddenSections?.includes(s)
    );

    const mainCol = this.measureColumn(data, mainOrder, 'main', false, false, spacing);
    const sidebarCol = this.measureColumn(data, sidebarOrder, 'sidebar', true, false, spacing);

    return {
      headerHeightPage1: capacityMetrics.headerHeightPage1,
      runningHeaderHeight: capacityMetrics.runningHeaderHeight,
      paddingVertical: capacityMetrics.pagePaddingVertical,
      columns: {
        main: mainCol,
        sidebar: sidebarCol,
      },
    };
  }

  private measureColumn(
    data: ResumeData,
    sectionIds: ResumeSectionId[],
    columnType: 'main' | 'sidebar' | 'single',
    isSidebar: boolean,
    isSingleColumn: boolean,
    spacing: 'compact' | 'normal' | 'relaxed'
  ): NormalizedColumnMetric {
    const sections: NormalizedSectionMetric[] = [];
    const { headingH, gapBetweenSections } = this.getSectionSpacingMetrics(spacing, isSingleColumn);
    let totalColHeight = 0;

    sectionIds.forEach((secId) => {
      const rawItems = this.getSectionRawItems(data, secId);
      if (!rawItems || rawItems.length === 0) return;

      const items: NormalizedItemMetric[] = [];
      let sumItemHeight = 0;

      rawItems.forEach((item, idx) => {
        const itemMetric = this.measureItem(item, secId, idx, isSidebar, isSingleColumn, spacing);
        items.push(itemMetric);
        sumItemHeight += itemMetric.height;
      });

      const effectiveHeadingH = secId === 'declaration' ? 0 : headingH;
      const sectionTotalHeight = effectiveHeadingH + sumItemHeight;
      totalColHeight += sectionTotalHeight + (sections.length > 0 ? gapBetweenSections : 0);

      sections.push({
        sectionId: secId,
        headerHeight: effectiveHeadingH,
        items,
        totalHeight: sectionTotalHeight,
      });
    });

    return {
      column: columnType,
      sections,
      totalHeight: totalColHeight,
    };
  }

  private measureItem(
    item: any,
    sectionId: ResumeSectionId,
    index: number,
    isSidebar: boolean,
    isSingleColumn: boolean,
    spacing: 'compact' | 'normal' | 'relaxed'
  ): NormalizedItemMetric {
    const mult = spacing === 'compact' ? 0.85 : spacing === 'relaxed' ? 1.18 : 1.0;
    const charsPerLine = isSidebar ? 28 : isSingleColumn ? 96 : 52;
    const defaultLineH = isSingleColumn ? 18 : 20;
    const itemId = item?.id || `${sectionId}-${index}`;

    switch (sectionId) {
      case 'summary': {
        const text = typeof item === 'string' ? item : item?.summary || '';
        const textH = estimateTextHeight(text, charsPerLine, defaultLineH);
        const h = Math.max(isSingleColumn ? 28 : 34, textH + (isSingleColumn ? 10 : 16)) * mult;
        return {
          id: itemId,
          sectionId,
          height: Math.ceil(h),
          bullets: [],
          splitStrategy: 'text',
        };
      }

      case 'experience':
      case 'projects':
      case 'education':
      case 'volunteer':
      case 'internships':
      case 'freelance':
      case 'leadership':
      case 'teaching':
      case 'militaryService':
      case 'extracurricular':
      case 'research': {
        const baseH = this.estimateItemBaseHeight(item, sectionId, isSidebar, isSingleColumn, spacing);
        const bullets: NormalizedBulletMetric[] = [];
        let bulletsSumH = 0;

        const normalizedBullets = normalizeHighlights(item.highlights);
        if (Array.isArray(normalizedBullets)) {
          normalizedBullets.forEach((bullet: string, bIdx: number) => {
            const bH = this.estimateBulletHeight(bullet, isSidebar, isSingleColumn, spacing);
            bullets.push({ idx: bIdx, height: Math.ceil(bH) });
            bulletsSumH += bH;
          });
        }

        const totalH = baseH + bulletsSumH;
        return {
          id: itemId,
          sectionId,
          height: Math.ceil(totalH),
          headerHeight: Math.ceil(baseH),
          bullets,
          splitStrategy: bullets.length > 1 ? 'bullets' : 'atomic',
        };
      }

      case 'skills': {
        const sk = item as SkillCategory;
        const items = sk.items || [];
        const count = items.length;
        if (isSingleColumn) {
          const text = `${sk.category}: ${items.join(', ')}`;
          const textH = estimateTextHeight(text, 96, 18);
          const h = Math.max(18, textH + 4) * mult;
          return { id: itemId, sectionId, height: Math.ceil(h), bullets: [], splitStrategy: 'atomic' };
        }
        const badgesPerLine = isSidebar ? 2.5 : 4.5;
        const bullets: NormalizedBulletMetric[] = [];
        const rowHeight = Math.ceil(26 * mult);
        const headerH = Math.ceil(24 * mult);

        items.forEach((_, idx) => {
          const isNewLine =
            idx === 0 ||
            Math.floor(idx / badgesPerLine) !== Math.floor((idx - 1) / badgesPerLine);
          bullets.push({
            idx,
            height: isNewLine ? rowHeight : 0,
          });
        });

        const badgeLines = Math.max(1, Math.ceil(count / badgesPerLine));
        const totalH = headerH + badgeLines * rowHeight;
        return {
          id: itemId,
          sectionId,
          height: totalH,
          headerHeight: headerH,
          bullets,
          splitStrategy: bullets.length > 1 ? 'bullets' : 'atomic',
        };
      }

      case 'languages': {
        const h = (isSingleColumn ? 14 : 26) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'interests': {
        const h = (isSingleColumn ? 16 : 24) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'certifications':
      case 'awards':
      case 'achievements':
      case 'courses':
      case 'licenses':
      case 'organizations':
      case 'testScores': {
        const h = (isSingleColumn ? 28 : 46) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'publications':
      case 'conferences':
      case 'patents':
      case 'speaking':
      case 'portfolio':
      case 'openSource': {
        const h = (isSingleColumn ? 36 : 52) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'professionalLinks':
      case 'socialLinks': {
        const h = (isSingleColumn ? 16 : 24) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'references': {
        const h = (isSingleColumn ? 42 : 56) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [] };
      }

      case 'customSections': {
        const customItem = item;
        const baseH = (isSingleColumn ? 32 : 44) * mult;
        const bullets: NormalizedBulletMetric[] = [];
        let bulletsSumH = 0;
        const normalizedCustomBullets = normalizeHighlights(customItem.highlights);
        if (Array.isArray(normalizedCustomBullets)) {
          normalizedCustomBullets.forEach((bullet: string, bIdx: number) => {
            const bH = this.estimateBulletHeight(bullet, isSidebar, isSingleColumn, spacing);
            bullets.push({ idx: bIdx, height: Math.ceil(bH) });
            bulletsSumH += bH;
          });
        }
        return {
          id: itemId,
          sectionId,
          height: Math.ceil(baseH + bulletsSumH),
          headerHeight: Math.ceil(baseH),
          bullets,
          splitStrategy: bullets.length > 1 ? 'bullets' : (customItem.description ? 'text' : 'atomic'),
        };
      }

      case 'declaration': {
        const h = (spacing === 'compact' ? 120 : spacing === 'relaxed' ? 170 : 145);
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [], splitStrategy: 'atomic' };
      }

      default: {
        const h = (isSingleColumn ? 32 : 44) * mult;
        return { id: itemId, sectionId, height: Math.ceil(h), bullets: [], splitStrategy: 'atomic' };
      }
    }
  }

  private estimateItemBaseHeight(
    item: any,
    sectionId: ResumeSectionId,
    isSidebar: boolean,
    isSingleColumn: boolean,
    spacing: 'compact' | 'normal' | 'relaxed'
  ): number {
    const mult = spacing === 'compact' ? 0.85 : spacing === 'relaxed' ? 1.18 : 1.0;
    switch (sectionId) {
      case 'declaration':
        return spacing === 'compact' ? 120 : spacing === 'relaxed' ? 170 : 145;
      case 'experience':
      case 'volunteer':
      case 'internships':
      case 'freelance':
      case 'leadership':
      case 'teaching':
      case 'militaryService':
      case 'extracurricular':
        return (isSingleColumn ? 36 : isSidebar ? 62 : 58) * mult;
      case 'projects':
        return (
          ((isSingleColumn ? 32 : isSidebar ? 50 : 46) +
            (item.technologies && item.technologies.length > 0 ? (isSingleColumn ? 18 : 26) : 0)) *
          mult
        );
      case 'education':
      case 'research':
        return (
          ((isSingleColumn ? 38 : isSidebar ? 62 : 54) + (item.gpa ? (isSingleColumn ? 14 : 18) : 0)) *
          mult
        );
      default:
        return (isSingleColumn ? 32 : 44) * mult;
    }
  }

  private estimateBulletHeight(
    bullet: string,
    isSidebar: boolean,
    isSingleColumn: boolean,
    spacing: 'compact' | 'normal' | 'relaxed'
  ): number {
    const mult = spacing === 'compact' ? 0.85 : spacing === 'relaxed' ? 1.18 : 1.0;
    const charsPerLine = isSidebar ? 28 : isSingleColumn ? 96 : 52;
    const lineHeight = isSingleColumn ? 18 : 20;
    const bulletH = estimateTextHeight(bullet, charsPerLine - 4, lineHeight);
    const pad = isSingleColumn ? 3 : 6;
    return (Math.max(lineHeight, bulletH) + pad) * mult;
  }

  private getSectionSpacingMetrics(
    spacing: 'compact' | 'normal' | 'relaxed',
    isSingleColumn: boolean
  ) {
    if (isSingleColumn) {
      return {
        headingH: spacing === 'compact' ? 26 : spacing === 'relaxed' ? 34 : 30,
        gapBetweenSections: spacing === 'compact' ? 14 : spacing === 'relaxed' ? 24 : 18,
      };
    }
    return {
      headingH: spacing === 'compact' ? 30 : spacing === 'relaxed' ? 42 : 36,
      gapBetweenSections: spacing === 'compact' ? 14 : spacing === 'relaxed' ? 26 : 20,
    };
  }

  private getSectionRawItems(data: ResumeData, secId: ResumeSectionId): any[] {
    switch (secId) {
      case 'summary':
        return data.personalInfo?.summary ? [data.personalInfo.summary] : [];
      case 'experience':
        return data.experience || [];
      case 'education':
        return data.education || [];
      case 'skills':
        return data.skills || [];
      case 'projects':
        return data.projects || [];
      case 'certifications':
        return data.certifications || [];
      case 'languages':
        return data.languages || [];
      case 'volunteer':
        return data.volunteer || [];
      case 'internships':
        return data.internships || [];
      case 'freelance':
        return data.freelance || [];
      case 'leadership':
        return data.leadership || [];
      case 'teaching':
        return data.teaching || [];
      case 'militaryService':
        return data.militaryService || [];
      case 'extracurricular':
        return data.extracurricular || [];
      case 'research':
        return data.research || [];
      case 'publications':
        return data.publications || [];
      case 'conferences':
        return data.conferences || [];
      case 'patents':
        return data.patents || [];
      case 'achievements':
        return data.achievements || [];
      case 'awards':
        return data.awards || [];
      case 'courses':
        return data.courses || [];
      case 'licenses':
        return data.licenses || [];
      case 'organizations':
        return data.organizations || [];
      case 'interests':
        return data.interests || [];
      case 'testScores':
        return data.testScores || [];
      case 'professionalLinks':
        return data.professionalLinks || [];
      case 'socialLinks':
        return data.socialLinks || [];
      case 'portfolio':
        return data.portfolio || [];
      case 'openSource':
        return data.openSource || [];
      case 'speaking':
        return data.speaking || [];
      case 'references':
        return data.references || [];
      case 'customSections':
        return data.customSections && data.customSections.length > 0
          ? data.customSections.flatMap((c) => c.items || [])
          : [];
      case 'declaration':
        return [{ id: 'declaration-0' }];
      default:
        return [];
    }
  }
}

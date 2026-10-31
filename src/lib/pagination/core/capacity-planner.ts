import { ResumeData, TemplateId } from '@/types/resume';
import { getPageFormatConfig } from '@/lib/page-format';
import {
  A4_PAGE_HEIGHT_PX,
  DEFAULT_SAFETY_MARGIN_PX,
  NormalizedResumeMetrics,
  PageCapacityMetrics,
  PageHeightBudget,
} from './types';

export interface ICapacityPlanner {
  computeBudget(data: ResumeData, measuredMetrics?: NormalizedResumeMetrics): PageHeightBudget;
  getTemplateCapacityMetrics(
    templateId?: TemplateId,
    spacing?: 'compact' | 'normal' | 'relaxed',
    hasAvatar?: boolean
  ): PageCapacityMetrics;
}

export class PageCapacityPlanner implements ICapacityPlanner {
  constructor(private readonly defaultSafetyMargin: number = DEFAULT_SAFETY_MARGIN_PX) {}

  public getTemplateCapacityMetrics(
    templateId: TemplateId = 'prawira',
    spacing: 'compact' | 'normal' | 'relaxed' = 'normal',
    hasAvatar: boolean = false
  ): PageCapacityMetrics {
    const basePadding = spacing === 'compact' ? 56 : spacing === 'relaxed' ? 88 : 72;
    const runningHeader = 46;

    switch (templateId) {
      case 'ats':
      case 'harvard':
      case 'harvard_tech':
      case 'harvard_experienced':
      case 'silicon':
      case 'flow':
        return {
          headerHeightPage1: spacing === 'compact' ? 110 : spacing === 'relaxed' ? 140 : 125,
          runningHeaderHeight: 38,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'vienna':
      case 'toronto':
      case 'naukri':
      case 'fresher':
        return {
          headerHeightPage1: spacing === 'compact' ? 120 : spacing === 'relaxed' ? 150 : 135,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'madrid':
      case 'novoresume':
      case 'enhancv':
        return {
          headerHeightPage1: spacing === 'compact' ? 120 : spacing === 'relaxed' ? 150 : 135,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'traditional':
      case 'sarkari':
      case 'oxford':
        return {
          headerHeightPage1: hasAvatar
            ? (spacing === 'compact' ? 140 : spacing === 'relaxed' ? 175 : 155)
            : (spacing === 'compact' ? 115 : spacing === 'relaxed' ? 145 : 130),
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'cascade':
      case 'canva':
      case 'europass':
      case 'canvapastel':
      case 'canvanotebook':
        return {
          headerHeightPage1: spacing === 'compact' ? 130 : spacing === 'relaxed' ? 165 : 145,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'canvaeditorial':
        return {
          headerHeightPage1: spacing === 'compact' ? 170 : spacing === 'relaxed' ? 220 : 195,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'canvaretro':
        return {
          headerHeightPage1: spacing === 'compact' ? 180 : spacing === 'relaxed' ? 230 : 205,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'canvaaesthetic':
        return {
          headerHeightPage1: spacing === 'compact' ? 160 : spacing === 'relaxed' ? 210 : 185,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'ribbon':
        return {
          headerHeightPage1: spacing === 'compact' ? 120 : spacing === 'relaxed' ? 150 : 135,
          runningHeaderHeight: 46,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'marigold':
        return {
          headerHeightPage1: spacing === 'compact' ? 130 : spacing === 'relaxed' ? 160 : 145,
          runningHeaderHeight: 38,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'stamp':
        return {
          headerHeightPage1: spacing === 'compact' ? 190 : spacing === 'relaxed' ? 240 : 215,
          runningHeaderHeight: 40,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'stockholm':
      case 'dublin':
      case 'sydney':
        return {
          headerHeightPage1: hasAvatar
            ? (spacing === 'compact' ? 110 : spacing === 'relaxed' ? 135 : 120)
            : (spacing === 'compact' ? 85 : spacing === 'relaxed' ? 110 : 95),
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'neon_creative':
        return {
          headerHeightPage1: spacing === 'compact' ? 160 : spacing === 'relaxed' ? 210 : 185,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'neobrutalist':
        return {
          headerHeightPage1: spacing === 'compact' ? 205 : spacing === 'relaxed' ? 265 : 235,
          runningHeaderHeight: 38,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'academic_teaching':
        return {
          headerHeightPage1: spacing === 'compact' ? 120 : spacing === 'relaxed' ? 165 : 140,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'boxed_engineer':
        return {
          headerHeightPage1: spacing === 'compact' ? 95 : spacing === 'relaxed' ? 135 : 115,
          runningHeaderHeight: 38,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'accentbar':
        return {
          headerHeightPage1: spacing === 'compact' ? 115 : spacing === 'relaxed' ? 150 : 130,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'numbered':
        return {
          headerHeightPage1: spacing === 'compact' ? 125 : spacing === 'relaxed' ? 160 : 140,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'chastain':
        return {
          headerHeightPage1: spacing === 'compact' ? 195 : spacing === 'relaxed' ? 245 : 220,
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
      case 'rahadian':
      case 'santoso':
      case 'prawira':
      default:
        return {
          headerHeightPage1: hasAvatar
            ? (spacing === 'compact' ? 180 : spacing === 'relaxed' ? 220 : 200)
            : (spacing === 'compact' ? 155 : spacing === 'relaxed' ? 195 : 175),
          runningHeaderHeight: runningHeader,
          pagePaddingVertical: basePadding,
          safetyMargin: this.defaultSafetyMargin,
        };
    }
  }

  public computeBudget(data: ResumeData, measuredMetrics?: NormalizedResumeMetrics): PageHeightBudget {
    const pageHeightPx = getPageFormatConfig(data.layout?.format).heightPx;

    if (measuredMetrics) {
      const pageNextCapacity = Math.max(
        500,
        pageHeightPx -
          measuredMetrics.paddingVertical -
          measuredMetrics.runningHeaderHeight -
          this.defaultSafetyMargin
      );

      const mainHeaderH = measuredMetrics.headerHeightMainPage1 ?? measuredMetrics.headerHeightPage1;
      const sidebarHeaderH = measuredMetrics.headerHeightSidebarPage1 ?? measuredMetrics.headerHeightPage1;

      const mainPage1Capacity = Math.max(
        400,
        pageHeightPx -
          measuredMetrics.paddingVertical -
          mainHeaderH -
          this.defaultSafetyMargin
      );

      const sidebarPage1Capacity = Math.max(
        400,
        pageHeightPx -
          measuredMetrics.paddingVertical -
          sidebarHeaderH -
          this.defaultSafetyMargin
      );

      const defaultPage1Capacity = Math.min(mainPage1Capacity, sidebarPage1Capacity);

      const mainBudget: PageHeightBudget = {
        page1Capacity: mainPage1Capacity,
        pageNextCapacity,
        capacities: [
          mainPage1Capacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
        ],
      };

      const sidebarBudget: PageHeightBudget = {
        page1Capacity: sidebarPage1Capacity,
        pageNextCapacity,
        capacities: [
          sidebarPage1Capacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
        ],
      };

      return {
        page1Capacity: defaultPage1Capacity,
        pageNextCapacity,
        capacities: [
          defaultPage1Capacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
          pageNextCapacity,
        ],
        mainBudget,
        sidebarBudget,
      };
    }

    const { templateId = 'prawira', spacing = 'normal', personalInfo } = data;
    const hasAvatar = Boolean(personalInfo?.avatarUrl);
    const metrics = this.getTemplateCapacityMetrics(templateId, spacing, hasAvatar);

    const pageNextCapacity =
      pageHeightPx - metrics.pagePaddingVertical - metrics.runningHeaderHeight - metrics.safetyMargin;

    // For templates with asymmetric column headers (Stockholm, Dublin, Sydney)
    let mainHeaderH = metrics.headerHeightPage1;
    let sidebarHeaderH = metrics.headerHeightPage1;

    if (templateId === 'stockholm' || templateId === 'dublin' || templateId === 'sydney') {
      mainHeaderH = spacing === 'compact' ? 65 : spacing === 'relaxed' ? 85 : 75;
      sidebarHeaderH = hasAvatar
        ? (spacing === 'compact' ? 210 : spacing === 'relaxed' ? 270 : 240)
        : (spacing === 'compact' ? 110 : spacing === 'relaxed' ? 150 : 130);
    }

    const mainPage1Capacity = Math.max(
      400,
      pageHeightPx - metrics.pagePaddingVertical - mainHeaderH - metrics.safetyMargin
    );
    const sidebarPage1Capacity = Math.max(
      400,
      pageHeightPx - metrics.pagePaddingVertical - sidebarHeaderH - metrics.safetyMargin
    );

    const defaultPage1Capacity = Math.min(mainPage1Capacity, sidebarPage1Capacity);

    const mainBudget: PageHeightBudget = {
      page1Capacity: mainPage1Capacity,
      pageNextCapacity,
      capacities: [
        mainPage1Capacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
      ],
    };

    const sidebarBudget: PageHeightBudget = {
      page1Capacity: sidebarPage1Capacity,
      pageNextCapacity,
      capacities: [
        sidebarPage1Capacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
      ],
    };

    return {
      page1Capacity: defaultPage1Capacity,
      pageNextCapacity,
      capacities: [
        defaultPage1Capacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
        pageNextCapacity,
      ],
      mainBudget,
      sidebarBudget,
    };
  }
}

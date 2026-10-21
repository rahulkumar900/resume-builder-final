import { ResumeData, ResumeSectionId, TemplateId } from '@/types/resume';
export { getPageFormatConfig, PAGE_FORMATS } from '@/lib/page-format';
export type { PageFormat, PageFormatConfig } from '@/lib/page-format';

/**
 * A4 dimensions at 96 DPI:
 * Width:  210mm / 25.4 * 96 = 793.70 px
 * Height: 297mm / 25.4 * 96 = 1122.52 px
 */
export const A4_PAGE_HEIGHT_PX = 1122.5;
export const A4_PAGE_WIDTH_PX = 793.7;
export const DEFAULT_SAFETY_MARGIN_PX = 32;

export interface PageCapacityMetrics {
  headerHeightPage1: number;
  runningHeaderHeight: number;
  pagePaddingVertical: number;
  safetyMargin: number;
}

export interface PageHeightBudget {
  page1Capacity: number;
  pageNextCapacity: number;
  capacities: number[];
  mainBudget?: PageHeightBudget;
  sidebarBudget?: PageHeightBudget;
}

export interface NormalizedBulletMetric {
  idx: number;
  height: number;
}

export type SplitStrategy = 'atomic' | 'bullets' | 'text';

export interface NormalizedItemMetric {
  id: string;
  sectionId: ResumeSectionId;
  height: number;
  headerHeight?: number;
  bullets: NormalizedBulletMetric[];
  splitStrategy?: SplitStrategy;
}

export interface NormalizedSectionMetric {
  sectionId: ResumeSectionId;
  headerHeight: number;
  items: NormalizedItemMetric[];
  totalHeight: number;
}

export interface NormalizedColumnMetric {
  column: 'main' | 'sidebar' | 'single';
  sections: NormalizedSectionMetric[];
  totalHeight: number;
}

export interface NormalizedResumeMetrics {
  headerHeightPage1: number;
  headerHeightMainPage1?: number;
  headerHeightSidebarPage1?: number;
  runningHeaderHeight: number;
  paddingVertical: number;
  columns: {
    main?: NormalizedColumnMetric;
    sidebar?: NormalizedColumnMetric;
    single?: NormalizedColumnMetric;
  };
}

export interface ColumnPageItemSlot {
  sectionId: ResumeSectionId;
  itemId?: string;
  isFirstItemOfSection?: boolean;
  bulletStart?: number;
  bulletEnd?: number; // exclusive
  textRatioStart?: number; // 0 to 1
  textRatioEnd?: number;   // exclusive (up to 1)
}

export interface ColumnPagePartition {
  pageIndex: number;
  slots: ColumnPageItemSlot[];
}

export interface PaginationOptions {
  mode?: 'analytical' | 'dom';
  metrics?: NormalizedResumeMetrics;
  maxPages?: number;
}

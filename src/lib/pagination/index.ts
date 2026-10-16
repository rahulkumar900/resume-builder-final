import { ResumeData } from '@/types/resume';
import {
  ICapacityPlanner,
  PageCapacityPlanner,
} from './core/capacity-planner';
import {
  ColumnPartitioner,
  IColumnPartitioner,
} from './core/column-partitioner';
import {
  IPaginationEngine,
  PaginationEngine,
  PaginationEngineDependencies,
} from './core/engine';
import {
  IPageAssembler,
  ResumePageAssembler,
} from './core/page-assembler';
import {
  A4_PAGE_HEIGHT_PX,
  A4_PAGE_WIDTH_PX,
  ColumnPageItemSlot,
  ColumnPagePartition,
  DEFAULT_SAFETY_MARGIN_PX,
  NormalizedBulletMetric,
  NormalizedColumnMetric,
  NormalizedItemMetric,
  NormalizedResumeMetrics,
  NormalizedSectionMetric,
  PageCapacityMetrics,
  PageHeightBudget,
  PaginationOptions,
} from './core/types';
import { AnalyticalMetricsProvider } from './metrics/analytical-provider';
import { measureGhostDOM } from './metrics/dom-measurer';
import { DOMMetricsProvider } from './metrics/dom-provider';
import { IMetricsProvider } from './metrics/metrics-provider.interface';
import { DoubleColumnStrategy } from './strategies/double-column-strategy';
import {
  IPartitionStrategy,
  StrategyPartitionResult,
} from './strategies/partition-strategy.interface';
import { SingleColumnStrategy } from './strategies/single-column-strategy';

// Re-export all types and constants
export {
  A4_PAGE_HEIGHT_PX,
  A4_PAGE_WIDTH_PX,
  DEFAULT_SAFETY_MARGIN_PX,
};

export type {
  PageCapacityMetrics,
  PageHeightBudget,
  NormalizedBulletMetric,
  NormalizedItemMetric,
  NormalizedSectionMetric,
  NormalizedColumnMetric,
  NormalizedResumeMetrics,
  ColumnPageItemSlot,
  ColumnPagePartition,
  PaginationOptions,
  PaginationEngineDependencies,
  StrategyPartitionResult,
};

// Re-export core abstractions and implementations
export {
  PageCapacityPlanner,
  ColumnPartitioner,
  ResumePageAssembler,
  PaginationEngine,
  AnalyticalMetricsProvider,
  DOMMetricsProvider,
  SingleColumnStrategy,
  DoubleColumnStrategy,
  measureGhostDOM,
};

export type {
  ICapacityPlanner,
  IColumnPartitioner,
  IPageAssembler,
  IPaginationEngine,
  IMetricsProvider,
  IPartitionStrategy,
};

// Factory for custom engine instances
export function createPaginationEngine(deps?: PaginationEngineDependencies): PaginationEngine {
  return new PaginationEngine(deps);
}

// Global default engine instance
export const defaultPaginationEngine = new PaginationEngine();

/**
 * Standard entrypoint for analytical SSR-safe pagination.
 */
export function paginateResume(data: ResumeData, options?: PaginationOptions): ResumeData[] {
  return defaultPaginationEngine.paginate(data, options);
}

/**
 * High-fidelity client entrypoint for subpixel DOM-measured pagination.
 */
export function paginateWithMeasuredDOM(
  data: ResumeData,
  metrics: NormalizedResumeMetrics
): ResumeData[] {
  return defaultPaginationEngine.paginate(data, { mode: 'dom', metrics });
}

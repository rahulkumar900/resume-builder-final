import {
  NormalizedBulletMetric,
  NormalizedColumnMetric,
  NormalizedItemMetric,
  NormalizedResumeMetrics,
  NormalizedSectionMetric,
  measureGhostDOM,
  paginateWithMeasuredDOM,
} from './pagination';

// Backwards-compatible type aliases
export type DOMBulletMetrics = NormalizedBulletMetric;
export type DOMItemMetrics = NormalizedItemMetric;
export type DOMSectionMetrics = NormalizedSectionMetric;
export type DOMColumnMetrics = NormalizedColumnMetric;
export type DOMResumeMetrics = NormalizedResumeMetrics;

// Re-export core measurement and pagination functions
export { measureGhostDOM, paginateWithMeasuredDOM };

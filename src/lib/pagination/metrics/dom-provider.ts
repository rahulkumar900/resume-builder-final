import { ResumeData } from '@/types/resume';
import { NormalizedResumeMetrics } from '../core/types';
import { measureGhostDOM } from './dom-measurer';
import { IMetricsProvider } from './metrics-provider.interface';

export class DOMMetricsProvider implements IMetricsProvider {
  public readonly name = 'dom';

  constructor(private readonly precomputedMetrics?: NormalizedResumeMetrics) {}

  public getMetrics(data: ResumeData, container?: HTMLElement | null): NormalizedResumeMetrics {
    if (this.precomputedMetrics) {
      return this.precomputedMetrics;
    }

    if (container) {
      return measureGhostDOM(container);
    }

    // Fallback baseline if called without container in non-browser context
    return {
      headerHeightPage1: 130,
      runningHeaderHeight: 46,
      paddingVertical: 72,
      columns: {},
    };
  }
}

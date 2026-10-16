import { ResumeData } from '@/types/resume';
import { NormalizedResumeMetrics } from '../core/types';

export interface IMetricsProvider {
  readonly name: string;
  getMetrics(data: ResumeData, container?: HTMLElement | null): NormalizedResumeMetrics;
}

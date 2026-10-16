import { ResumeData } from '@/types/resume';
import { IColumnPartitioner } from '../core/column-partitioner';
import {
  NormalizedResumeMetrics,
  NormalizedSectionMetric,
  PageHeightBudget,
} from '../core/types';
import {
  IPartitionStrategy,
  StrategyPartitionResult,
} from './partition-strategy.interface';

export class SingleColumnStrategy implements IPartitionStrategy {
  public readonly layoutType = 'single';

  public partition(
    data: ResumeData,
    metrics: NormalizedResumeMetrics,
    budget: PageHeightBudget,
    partitioner: IColumnPartitioner
  ): StrategyPartitionResult {
    const singleSections: NormalizedSectionMetric[] =
      metrics.columns.single?.sections || metrics.columns.main?.sections || [];

    const partitions = partitioner.partitionColumn(singleSections, budget);

    return {
      single: partitions,
      main: partitions,
    };
  }
}

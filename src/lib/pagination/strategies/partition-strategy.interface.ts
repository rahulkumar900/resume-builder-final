import { ResumeData } from '@/types/resume';
import { IColumnPartitioner } from '../core/column-partitioner';
import {
  ColumnPagePartition,
  NormalizedResumeMetrics,
  PageHeightBudget,
} from '../core/types';

export interface StrategyPartitionResult {
  main?: ColumnPagePartition[];
  sidebar?: ColumnPagePartition[];
  single?: ColumnPagePartition[];
}

export interface IPartitionStrategy {
  readonly layoutType: 'single' | 'double';
  partition(
    data: ResumeData,
    metrics: NormalizedResumeMetrics,
    budget: PageHeightBudget,
    partitioner: IColumnPartitioner
  ): StrategyPartitionResult;
}

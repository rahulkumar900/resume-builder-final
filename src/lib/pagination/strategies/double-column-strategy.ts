import { ResumeData } from '@/types/resume';
import { TEMPLATE_COLUMN_CONTRACTS } from '@/lib/templates';
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

export class DoubleColumnStrategy implements IPartitionStrategy {
  public readonly layoutType = 'double';

  public partition(
    data: ResumeData,
    metrics: NormalizedResumeMetrics,
    budget: PageHeightBudget,
    partitioner: IColumnPartitioner
  ): StrategyPartitionResult {
    const mainSections: NormalizedSectionMetric[] = metrics.columns.main?.sections || [];
    const sidebarSections: NormalizedSectionMetric[] = metrics.columns.sidebar?.sections || [];

    const mainBudget = budget.mainBudget || budget;
    const sidebarBudget = budget.sidebarBudget || budget;

    const mainPartitions = partitioner.partitionColumn(mainSections, mainBudget);

    const templateId = data.templateId || 'prawira';
    const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;

    // Sidebar capacity can accommodate summary placement if relevant
    const sidebarPartitions = partitioner.partitionColumn(sidebarSections, sidebarBudget);

    return {
      main: mainPartitions,
      sidebar: sidebarPartitions,
    };
  }
}

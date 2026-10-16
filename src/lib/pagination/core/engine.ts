import { ResumeData } from '@/types/resume';
import { getTemplateLayout } from '@/lib/templates';
import { AnalyticalMetricsProvider } from '../metrics/analytical-provider';
import { DOMMetricsProvider } from '../metrics/dom-provider';
import { IMetricsProvider } from '../metrics/metrics-provider.interface';
import { DoubleColumnStrategy } from '../strategies/double-column-strategy';
import { IPartitionStrategy } from '../strategies/partition-strategy.interface';
import { SingleColumnStrategy } from '../strategies/single-column-strategy';
import { ICapacityPlanner, PageCapacityPlanner } from './capacity-planner';
import { ColumnPartitioner, IColumnPartitioner } from './column-partitioner';
import { IPageAssembler, ResumePageAssembler } from './page-assembler';
import { PaginationOptions } from './types';

export interface PaginationEngineDependencies {
  capacityPlanner?: ICapacityPlanner;
  partitioner?: IColumnPartitioner;
  assembler?: IPageAssembler;
  singleStrategy?: IPartitionStrategy;
  doubleStrategy?: IPartitionStrategy;
}

export interface IPaginationEngine {
  paginate(data: ResumeData, options?: PaginationOptions): ResumeData[];
}

/**
 * PaginationEngine is the unified orchestrator adhering to SOLID principles:
 * - Single Responsibility: Coordinates capacity planning, metrics acquisition, strategy selection, partitioning, and page assembly.
 * - Open/Closed: Extensible via pluggable IPartitionStrategy and IMetricsProvider without editing the engine.
 * - Liskov Substitution: AnalyticalMetricsProvider and DOMMetricsProvider conform to IMetricsProvider and are interchangeable.
 * - Interface Segregation: Discrete, single-purpose interfaces across all subsystem components.
 * - Dependency Inversion: High-level orchestration depends only on abstractions injected at runtime.
 */
export class PaginationEngine implements IPaginationEngine {
  private readonly capacityPlanner: ICapacityPlanner;
  private readonly partitioner: IColumnPartitioner;
  private readonly assembler: IPageAssembler;
  private readonly singleStrategy: IPartitionStrategy;
  private readonly doubleStrategy: IPartitionStrategy;

  constructor(deps: PaginationEngineDependencies = {}) {
    this.capacityPlanner = deps.capacityPlanner || new PageCapacityPlanner();
    this.partitioner = deps.partitioner || new ColumnPartitioner();
    this.assembler = deps.assembler || new ResumePageAssembler();
    this.singleStrategy = deps.singleStrategy || new SingleColumnStrategy();
    this.doubleStrategy = deps.doubleStrategy || new DoubleColumnStrategy();
  }

  public paginate(data: ResumeData, options: PaginationOptions = {}): ResumeData[] {
    const templateId = data.templateId || 'prawira';
    const layout = getTemplateLayout(templateId);

    // 1. Resolve metrics provider based on options
    let metricsProvider: IMetricsProvider;
    if (options.mode === 'dom' && options.metrics) {
      metricsProvider = new DOMMetricsProvider(options.metrics);
    } else {
      metricsProvider = new AnalyticalMetricsProvider();
    }

    const metrics = metricsProvider.getMetrics(data);

    // 2. Compute capacity budget
    const budget = this.capacityPlanner.computeBudget(
      data,
      options.mode === 'dom' ? metrics : undefined
    );

    // 3. Select strategy (Open-Closed Principle)
    const strategy = layout === 'single' ? this.singleStrategy : this.doubleStrategy;

    // 4. Partition sections into page slots
    const partitionResult = strategy.partition(data, metrics, budget, this.partitioner);

    // 5. Assemble final immutable ResumeData[] pages
    return this.assembler.assemblePages(data, layout, partitionResult);
  }
}

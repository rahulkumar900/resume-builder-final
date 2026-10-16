/**
 * @fileoverview Ghost DOM Orchestrator.
 * Coordinates modular measurers (scale, element lookup, headers, padding, columns)
 * to assemble the final NormalizedResumeMetrics.
 */

import { NormalizedResumeMetrics } from '../../core/types';
import { detectScale } from './scale-detector';
import { GhostElementResolver } from './element-resolver';
import { measureHeaders } from './header-measurer';
import { measureVerticalPadding } from './padding-measurer';
import { measureColumn } from './column-measurer';

/**
 * Traverses an offscreen rendered resume container and extracts exact subpixel geometry.
 * Uses dedicated independent measurers following the Single Responsibility Principle.
 *
 * @param containerEl - Root offscreen container HTMLElement.
 * @returns NormalizedResumeMetrics object.
 */
export function executeGhostDOMMeasurement(
  containerEl: HTMLElement
): NormalizedResumeMetrics {
  if (typeof window === 'undefined' || !containerEl) {
    return {
      headerHeightPage1: 130,
      headerHeightMainPage1: 130,
      headerHeightSidebarPage1: 130,
      runningHeaderHeight: 46,
      paddingVertical: 72,
      columns: {},
    };
  }

  // 1. Scale detection
  const { unscale } = detectScale(containerEl);

  // 2. Element lookup encapsulation
  const resolver = new GhostElementResolver(containerEl);

  // 3. Header measurement
  const {
    headerHeightPage1,
    headerHeightMainPage1,
    headerHeightSidebarPage1,
    runningHeaderHeight,
  } = measureHeaders(resolver, unscale);

  // 4. Padding measurement
  const paddingVertical = measureVerticalPadding(resolver);

  // 5. Column measurement
  const mainColEl = resolver.getColumn('main');
  const sidebarColEl = resolver.getColumn('sidebar');
  const singleColEl = resolver.getColumn('single');

  const columns: NormalizedResumeMetrics['columns'] = {};

  if (mainColEl) {
    columns.main = measureColumn(mainColEl, 'main', resolver, unscale);
  }
  if (sidebarColEl) {
    columns.sidebar = measureColumn(sidebarColEl, 'sidebar', resolver, unscale);
  }
  if (singleColEl || (!mainColEl && !sidebarColEl)) {
    columns.single = measureColumn(singleColEl || containerEl, 'single', resolver, unscale);
  }

  // 6. Final metric construction
  return {
    headerHeightPage1,
    headerHeightMainPage1,
    headerHeightSidebarPage1,
    runningHeaderHeight,
    paddingVertical,
    columns,
  };
}

/**
 * @fileoverview Column Measurer for Ghost DOM.
 * Measures a column container, coordinates section measurement,
 * deduplicates sections, and calculates total column height.
 */

import { NormalizedColumnMetric, NormalizedSectionMetric } from '../../core/types';
import { GhostElementResolver } from './element-resolver';
import { measureSection } from './section-measurer';

/**
 * Measures an individual column (main, sidebar, or single).
 *
 * @param targetColEl - The column DOM element.
 * @param columnType - Column archetype identifier ('main' | 'sidebar' | 'single').
 * @param resolver - Ghost DOM element resolver.
 * @param unscale - Scaling normalizer function.
 * @returns NormalizedColumnMetric object.
 */
export function measureColumn(
  targetColEl: HTMLElement,
  columnType: 'main' | 'sidebar' | 'single',
  resolver: GhostElementResolver,
  unscale: (val: number) => number
): NormalizedColumnMetric {
  const sectionEls = resolver.getSections(targetColEl);
  const seenSections = new Set<string>();
  const sections: NormalizedSectionMetric[] = [];

  for (const secEl of sectionEls) {
    const secId = secEl.getAttribute('data-ghost-section');
    if (!secId || seenSections.has(secId)) continue;
    seenSections.add(secId);

    const measuredSec = measureSection(secEl, resolver, unscale);
    if (measuredSec) {
      sections.push(measuredSec);
    }
  }

  const colRect = targetColEl.getBoundingClientRect();
  return {
    column: columnType,
    sections,
    totalHeight: Math.ceil(unscale(colRect.height)),
  };
}

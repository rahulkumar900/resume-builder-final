/**
 * @fileoverview Section Measurer for Ghost DOM.
 * Measures section headers/titles, coordinates item measurements,
 * and handles atomic fallback items.
 */

import { ResumeSectionId } from '@/types/resume';
import { NormalizedItemMetric, NormalizedSectionMetric } from '../../core/types';
import { GhostElementResolver } from './element-resolver';
import { measureItem } from './item-measurer';
import { createFallbackSectionItem } from './fallback-item-creator';

/**
 * Measures a section element and all its children.
 *
 * @param secEl - The section HTMLElement.
 * @param resolver - Ghost DOM element resolver.
 * @param unscale - Scaling normalizer function.
 * @returns NormalizedSectionMetric (or null if invalid section ID).
 */
export function measureSection(
  secEl: HTMLElement,
  resolver: GhostElementResolver,
  unscale: (val: number) => number
): NormalizedSectionMetric | null {
  const secId = secEl.getAttribute('data-ghost-section') as ResumeSectionId;
  if (!secId) return null;

  // Measure Section title / header
  const secTitleEl = resolver.getSectionTitle(secEl);
  let titleHeight = 0;
  if (secTitleEl) {
    const tr = secTitleEl.getBoundingClientRect();
    const ts = window.getComputedStyle(secTitleEl);
    titleHeight = Math.ceil(
      unscale(tr.height) + (parseFloat(ts.marginBottom) || 0) + (parseFloat(ts.marginTop) || 0)
    );
  }

  // Measure items within section
  const itemEls = resolver.getItems(secEl);
  const items: NormalizedItemMetric[] = itemEls.map((itEl) =>
    measureItem(itEl, secId, resolver, unscale)
  );

  const secRect = secEl.getBoundingClientRect();
  const secStyle = window.getComputedStyle(secEl);
  const secMargin =
    (parseFloat(secStyle.marginBottom) || 0) + (parseFloat(secStyle.marginTop) || 0);
  const totalHeight = Math.ceil(unscale(secRect.height) + secMargin);

  // If no sub-items are found (e.g. atomic section like summary),
  // create a single item for the whole section so the partitioner can place it!
  if (items.length === 0 && totalHeight > 0) {
    items.push(createFallbackSectionItem(secId, totalHeight, titleHeight));
  }

  return {
    sectionId: secId,
    headerHeight: titleHeight,
    items,
    totalHeight,
  };
}

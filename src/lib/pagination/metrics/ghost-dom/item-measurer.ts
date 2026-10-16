/**
 * @fileoverview Item Measurer for Ghost DOM.
 * Measures single entry cards (experience, education, projects, skills)
 * including their sub-headers, paddings, margins, and highlight bullets.
 */

import { ResumeSectionId } from '@/types/resume';
import { NormalizedItemMetric, SplitStrategy } from '../../core/types';
import { GhostElementResolver } from './element-resolver';
import { measureBullets } from './bullet-measurer';

/**
 * Measures an individual item card within a section.
 *
 * @param itEl - The item DOM element.
 * @param sectionId - The parent section identifier.
 * @param resolver - Ghost DOM element resolver.
 * @param unscale - Scaling normalizer function.
 * @returns NormalizedItemMetric object.
 */
export function measureItem(
  itEl: HTMLElement,
  sectionId: ResumeSectionId,
  resolver: GhostElementResolver,
  unscale: (val: number) => number
): NormalizedItemMetric {
  const itemId = itEl.getAttribute('data-ghost-item') || '';
  const itRect = itEl.getBoundingClientRect();
  const itStyle = window.getComputedStyle(itEl);
  const itMargin =
    (parseFloat(itStyle.marginBottom) || 0) + (parseFloat(itStyle.marginTop) || 0);
  const totalItemHeight = Math.ceil(unscale(itRect.height) + itMargin);

  // Measure bullets
  const bullets = measureBullets(itEl, resolver, unscale);

  // Sub-header (e.g. role + company above highlights)
  let headerHeight = 0;
  const itPt = parseFloat(itStyle.paddingTop) || 0;
  const itPb = parseFloat(itStyle.paddingBottom) || 0;
  const subHeaderEl = resolver.getItemHeader(itEl);

  if (subHeaderEl) {
    const shr = subHeaderEl.getBoundingClientRect();
    const shs = window.getComputedStyle(subHeaderEl);
    headerHeight = Math.ceil(
      unscale(shr.height) + (parseFloat(shs.marginBottom) || 0) + itPt + itPb
    );
  } else if (bullets.length > 0) {
    const sumBullets = bullets.reduce((acc, b) => acc + b.height, 0);
    headerHeight = Math.max(24, totalItemHeight - sumBullets);
  }

  let splitStrategy: SplitStrategy = 'atomic';
  if (bullets.length > 1) {
    splitStrategy = 'bullets';
  } else if (sectionId === 'summary' || (sectionId === 'customSections' && bullets.length === 0)) {
    splitStrategy = 'text';
  }

  return {
    id: itemId,
    sectionId,
    height: totalItemHeight,
    headerHeight,
    bullets,
    splitStrategy,
  };
}

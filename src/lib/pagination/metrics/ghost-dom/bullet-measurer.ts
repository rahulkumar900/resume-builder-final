/**
 * @fileoverview Bullet Measurer for Ghost DOM.
 * Measures individual highlight bullet items within an experience/project entry.
 */

import { NormalizedBulletMetric } from '../../core/types';
import { GhostElementResolver } from './element-resolver';

/**
 * Extracts and measures all bullet elements within a resume item.
 *
 * @param itemEl - The parent item DOM element.
 * @param resolver - Ghost DOM element resolver.
 * @param unscale - Scaling normalizer function.
 * @returns Array of NormalizedBulletMetric objects.
 */
export function measureBullets(
  itemEl: HTMLElement,
  resolver: GhostElementResolver,
  unscale: (val: number) => number
): NormalizedBulletMetric[] {
  if (typeof window === 'undefined') return [];

  const bulletEls = resolver.getBullets(itemEl);
  let lastTop: number | null = null;

  return bulletEls.map((bEl, bIdx) => {
    const br = bEl.getBoundingClientRect();
    const bs = window.getComputedStyle(bEl);
    const bm = (parseFloat(bs.marginBottom) || 0) + (parseFloat(bs.marginTop) || 0);
    const idxAttr = bEl.getAttribute('data-ghost-bullet');
    const idx = idxAttr ? parseInt(idxAttr, 10) : bIdx;
    const bHeight = Math.ceil(unscale(br.height) + bm);

    // Detect flex-wrapped / inline elements sharing the same horizontal row:
    // If consecutive elements share the same top offset (within 6px), they share
    // the row already accounted for by the first badge in that row.
    const isSameRow = lastTop !== null && Math.abs(br.top - lastTop) < 6;

    if (!isSameRow) {
      lastTop = br.top;
      return {
        idx: Number.isNaN(idx) ? bIdx : idx,
        height: bHeight,
      };
    } else {
      return {
        idx: Number.isNaN(idx) ? bIdx : idx,
        height: 0,
      };
    }
  });
}

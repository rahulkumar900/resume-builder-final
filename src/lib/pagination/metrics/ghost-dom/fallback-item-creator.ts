/**
 * @fileoverview Fallback Item Creator.
 * Synthesizes a discrete item metric when a section has no sub-items (e.g. atomic summary),
 * ensuring the pagination partitioner can properly position and break the section.
 */

import { ResumeSectionId } from '@/types/resume';
import { NormalizedItemMetric } from '../../core/types';

/**
 * Creates a synthetic item metric encompassing the entire section content.
 *
 * @param sectionId - The ResumeSectionId of the atomic section.
 * @param totalHeight - The measured total height of the section.
 * @param headerHeight - The measured title/header height of the section.
 * @returns NormalizedItemMetric for the section content.
 */
export function createFallbackSectionItem(
  sectionId: ResumeSectionId,
  totalHeight: number,
  headerHeight: number
): NormalizedItemMetric {
  return {
    id: `${sectionId}-content`,
    sectionId,
    height: totalHeight,
    headerHeight,
    bullets: [],
  };
}

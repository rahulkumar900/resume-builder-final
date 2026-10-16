/**
 * @fileoverview Padding Measurer for Ghost DOM.
 * Computes composite vertical padding across root template, grid containers, and columns.
 */

import { GhostElementResolver } from './element-resolver';

/**
 * Computes total effective vertical padding for the resume container.
 *
 * @param resolver - Ghost DOM element resolver.
 * @returns Total vertical padding in pixels, clamped to a safe minimum of 48px.
 */
export function measureVerticalPadding(resolver: GhostElementResolver): number {
  if (typeof window === 'undefined') return 72;

  const rootTemplateEl = resolver.getRootTemplateElement();
  const mainColEl = resolver.getColumn('main');
  const singleColEl = resolver.getColumn('single');
  const sidebarColEl = resolver.getColumn('sidebar');

  const colEl = mainColEl || singleColEl || sidebarColEl;
  const gridContainer = colEl ? colEl.parentElement : null;

  const rootStyle = window.getComputedStyle(rootTemplateEl);
  let pt = parseFloat(rootStyle.paddingTop) || 0;
  let pb = parseFloat(rootStyle.paddingBottom) || 0;

  if (gridContainer && gridContainer !== rootTemplateEl) {
    const gridStyle = window.getComputedStyle(gridContainer);
    pt += parseFloat(gridStyle.paddingTop) || 0;
    pb += parseFloat(gridStyle.paddingBottom) || 0;
  }

  if (colEl) {
    const colStyle = window.getComputedStyle(colEl);
    pt += (parseFloat(colStyle.paddingTop) || 0) + (parseFloat(colStyle.marginTop) || 0);
    pb += (parseFloat(colStyle.paddingBottom) || 0) + (parseFloat(colStyle.marginBottom) || 0);
  }

  return Math.max(48, Math.ceil(pt + pb));
}

/**
 * @fileoverview Header Measurer for Ghost DOM.
 * Measures top-level personal info headers and column-internal headers (e.g. Stockholm, Dublin).
 */

import { GhostElementResolver } from './element-resolver';
import { measureElementOuterHeight } from './element-height-measurer';

export interface HeaderMeasurementResult {
  globalHeaderHeight: number;
  headerHeightMainPage1: number;
  headerHeightSidebarPage1: number;
  headerHeightPage1: number;
  runningHeaderHeight: number;
}

/**
 * Measures all header configurations across the resume.
 *
 * @param resolver - Ghost DOM element resolver.
 * @param unscale - Scaling normalizer function.
 * @returns HeaderMeasurementResult containing Page 1 main, sidebar, and combined header heights.
 */
export function measureHeaders(
  resolver: GhostElementResolver,
  unscale: (val: number) => number
): HeaderMeasurementResult {
  const mainColEl = resolver.getColumn('main');
  const sidebarColEl = resolver.getColumn('sidebar');

  const allHeaderEls = resolver.getAllHeaders();

  // Global header: header placed outside main and sidebar columns
  const globalHeaderEl =
    allHeaderEls.find((el) => !mainColEl?.contains(el) && !sidebarColEl?.contains(el)) || null;
  const globalHeaderHeight = measureElementOuterHeight(globalHeaderEl, unscale);

  // Column-internal headers (e.g. Stockholm, Dublin, Sydney)
  const mainInternalHeaderEl = resolver.getInternalHeader(mainColEl);
  const sidebarInternalHeaderEl = resolver.getInternalHeader(sidebarColEl);

  const mainInternalHeaderHeight = measureElementOuterHeight(mainInternalHeaderEl, unscale);
  const sidebarInternalHeaderHeight = measureElementOuterHeight(sidebarInternalHeaderEl, unscale);

  const headerHeightMainPage1 = globalHeaderHeight + mainInternalHeaderHeight;
  const headerHeightSidebarPage1 = globalHeaderHeight + sidebarInternalHeaderHeight;
  const headerHeightPage1 = Math.max(headerHeightMainPage1, headerHeightSidebarPage1);

  return {
    globalHeaderHeight,
    headerHeightMainPage1,
    headerHeightSidebarPage1,
    headerHeightPage1,
    runningHeaderHeight: 46, // Standard running header allowance for subsequent pages
  };
}

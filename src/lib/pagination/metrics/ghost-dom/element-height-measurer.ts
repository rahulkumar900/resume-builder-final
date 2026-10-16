/**
 * @fileoverview Reusable element outer height calculator.
 * Computes bounding rectangle height with scale normalization and vertical margins.
 */

/**
 * Measures the outer height of an element including margin-top and margin-bottom,
 * scaled back to standard 96 DPI coordinate space.
 *
 * @param el - The target HTMLElement (or null).
 * @param unscale - Scaling normalizer function.
 * @returns Ceiled outer height in pixels.
 */
export function measureElementOuterHeight(
  el: HTMLElement | null,
  unscale: (val: number) => number
): number {
  if (!el || typeof window === 'undefined') return 0;
  const rect = el.getBoundingClientRect();
  const style = window.getComputedStyle(el);
  const mb = parseFloat(style.marginBottom) || 0;
  const mt = parseFloat(style.marginTop) || 0;
  return Math.ceil(unscale(rect.height) + mb + mt);
}

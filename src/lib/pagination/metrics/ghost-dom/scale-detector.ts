/**
 * @fileoverview Scale Detector for Ghost DOM Rendering.
 * Resolves zoom / CSS transform scale factors so that preview containers
 * produce exact 96 DPI unscaled subpixel measurements.
 */

export interface ScaleDetectionResult {
  scaleFactor: number;
  unscale: (value: number) => number;
}

/**
 * Calculates the CSS transform scale applied to a container element
 * and returns an unscaling function.
 *
 * @param containerEl - The rendered container HTMLElement.
 * @returns ScaleDetectionResult containing the scaleFactor and unscale helper.
 */
export function detectScale(containerEl: HTMLElement): ScaleDetectionResult {
  const cRect = containerEl.getBoundingClientRect();
  const cWidth = containerEl.offsetWidth || 793.7;
  const scaleFactor = cRect.width > 0 && cWidth > 0 ? cRect.width / cWidth : 1;
  const isScaled = scaleFactor > 0 && Math.abs(scaleFactor - 1) > 0.001;

  const unscale = (h: number): number => (isScaled ? h / scaleFactor : h);

  return { scaleFactor, unscale };
}

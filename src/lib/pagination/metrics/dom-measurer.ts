/**
 * @fileoverview DOM Measurer for Ghost Rendering.
 * Traverses an offscreen rendered resume container and extracts exact subpixel geometry.
 * Delegates to focused single-responsibility measurers:
 * - Scale detection
 * - Element lookup
 * - Header measurement
 * - Padding measurement
 * - Column measurement
 * - Section measurement
 * - Item measurement
 * - Bullet measurement
 * - Fallback item creation
 * - Final metric construction
 */

import { NormalizedResumeMetrics } from '../core/types';
import { executeGhostDOMMeasurement } from './ghost-dom/ghost-dom-orchestrator';

/**
 * Traverses an offscreen rendered resume container and extracts exact subpixel geometry.
 * Scales are normalized so preview zoom / CSS transforms don't distort measurements.
 *
 * @param containerEl - Root offscreen container HTMLElement.
 * @returns NormalizedResumeMetrics object.
 */
export function measureGhostDOM(containerEl: HTMLElement): NormalizedResumeMetrics {
  return executeGhostDOMMeasurement(containerEl);
}

// Re-export sub-measurers for granular usage & testability
export * from './ghost-dom';

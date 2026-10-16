import type { Options } from 'canvas-confetti';

/**
 * Dynamically loads and fires canvas-confetti only when invoked,
 * keeping the initial bundle size small and avoiding render-blocking JS.
 */
export async function fireConfetti(options?: Options): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const confetti = (await import('canvas-confetti')).default;
    confetti(options);
  } catch (err) {
    console.warn('Unable to fire confetti celebration:', err);
  }
}

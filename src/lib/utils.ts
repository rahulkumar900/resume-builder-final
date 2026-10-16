import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes highlights/bullets into a clean array of individual bullet strings.
 * Handles:
 * - Arrays of individual bullet strings (leaves them clean and trimmed)
 * - Single or multiple items containing HTML <li>...</li> tags
 * - Multi-line strings with leading bullet symbols (•, -, *)
 * - Embedded <p>...</p> tags
 * Preserves inner inline HTML formatting like <b>, <strong>, <em>, <a>.
 */
export function normalizeHighlights(highlights?: string[] | null): string[] {
  if (!highlights || highlights.length === 0) return [];

  const result: string[] = [];

  for (const item of highlights) {
    if (!item || typeof item !== 'string') continue;

    // Check if item contains <li> tags
    const liMatches = item.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches && liMatches.length > 0) {
      for (const li of liMatches) {
        const text = li.replace(/^<li[^>]*>/i, '').replace(/<\/li>$/i, '').trim();
        if (text) result.push(text);
      }
      continue;
    }

    // Check if item contains multiple <p> tags
    const pMatches = item.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (pMatches && pMatches.length > 1) {
      for (const p of pMatches) {
        const text = p.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim();
        if (text) result.push(text);
      }
      continue;
    }

    // Check if item contains newline-separated bullets (e.g. • or - or *)
    const lines = item.split(/\r?\n+/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1 && lines.some((l) => /^[•\-\*]\s*/.test(l))) {
      for (const line of lines) {
        const cleaned = line.replace(/^[•\-\*]\s*/, '').trim();
        if (cleaned) result.push(cleaned);
      }
      continue;
    }

    // Single item - remove any redundant outer <p>...</p> tags
    const cleanItem = item.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim();
    if (cleanItem) {
      result.push(cleanItem);
    }
  }

  return result;
}


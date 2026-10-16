export * from './pagination/index';

/**
 * Atomic Text Splitting Helper:
 * Uses Range.getClientRects() to find the exact line boundary within availableHeight.
 */
export function splitTextAtLineBoundary(
  element: HTMLElement,
  availableHeight: number
): { fitText: string; overflowText: string } | null {
  if (typeof window === 'undefined' || !element) return null;
  const textNode = element.firstChild;
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return null;

  const fullText = textNode.textContent || '';
  const range = document.createRange();
  range.selectNodeContents(textNode);
  const rects = Array.from(range.getClientRects());
  if (rects.length === 0) return null;

  const elementTop = element.getBoundingClientRect().top;
  const fittingLines = rects.filter((r) => r.bottom - elementTop <= availableHeight);
  if (fittingLines.length === 0) return null;

  const lineRatio = fittingLines.length / rects.length;
  let charCutoff = Math.floor(fullText.length * lineRatio);

  const spaceIdx = fullText.lastIndexOf(' ', charCutoff);
  if (spaceIdx > 0) {
    charCutoff = spaceIdx;
  }

  return {
    fitText: fullText.slice(0, charCutoff).trim(),
    overflowText: fullText.slice(charCutoff).trim(),
  };
}

/**
 * DOM Measurement Helper:
 * Measures actual rendered blocks tagged with data-block inside a container.
 */
export interface MeasuredDOMBlock {
  id: string;
  sectionId: string;
  itemId?: string;
  bulletIndex?: number;
  height: number;
  column: 'main' | 'sidebar' | 'fullWidth';
  splittable: boolean;
}

export function measureTemplateDOM(containerEl: HTMLElement): MeasuredDOMBlock[] {
  if (typeof window === 'undefined' || !containerEl) return [];
  const blocks: MeasuredDOMBlock[] = [];
  const nodes = containerEl.querySelectorAll<HTMLElement>('[data-block]');

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    blocks.push({
      id:
        node.getAttribute('data-block-id') ||
        `${node.dataset.section || ''}-${node.dataset.itemId || ''}`,
      sectionId: node.dataset.section || '',
      itemId: node.dataset.itemId,
      bulletIndex: node.dataset.bulletIdx ? parseInt(node.dataset.bulletIdx, 10) : undefined,
      height: Math.ceil(rect.height),
      column: (node.dataset.column as MeasuredDOMBlock['column']) || 'main',
      splittable: node.dataset.splittable === 'true',
    });
  });

  return blocks;
}

/**
 * Self-Healing Verification Pass:
 * Verifies that rendered .a4-page-sheet elements do not exceed A4 height (1123px).
 * Returns true if an overflow was detected and corrected.
 */
export function verifyAndCorrectPageOverflow(
  sheets: HTMLElement[],
  onShiftItem: (fromPage: number, toPage: number, itemId: string) => void
): boolean {
  const MAX_A4_PX = 1123;
  let didCorrect = false;

  sheets.forEach((sheet, pageIdx) => {
    if (sheet.scrollHeight > MAX_A4_PX + 2) {
      const items = Array.from(sheet.querySelectorAll<HTMLElement>('[data-block="item"]'));
      if (items.length > 1) {
        const lastItem = items[items.length - 1];
        const itemId = lastItem.getAttribute('data-item-id');
        if (itemId) {
          didCorrect = true;
          onShiftItem(pageIdx, pageIdx + 1, itemId);
        }
      }
    }
  });

  return didCorrect;
}

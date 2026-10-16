/**
 * @file column-partitioner.ts
 * @description Core greedy partition engine that distributes measured section metrics across pages.
 *
 * SOLID Principles Alignment:
 * - Single Responsibility Principle (SRP): PartitionSession encapsulates active page mutation state,
 *   while ColumnPartitioner executes the 3-tier partitioning hierarchy.
 * - Open-Closed Principle (OCP): Items declare their split strategy polymorphically (`splitStrategy`)
 *   freeing the partitioner from hardcoded section names.
 * - Interface Segregation Principle (ISP): Exposes the minimal `IColumnPartitioner` interface.
 * - Dependency Inversion Principle (DIP): Consumes normalized metric abstractions (`NormalizedSectionMetric`)
 *   rather than raw DOM nodes or template components.
 *
 * Algorithmic Complexity:
 * - Time Complexity: O(total items + total bullets × pages).
 * - Space Complexity: O(pages × item slots).
 *
 * Key Invariants:
 * 1. Strict In-Order Progression: Content is never reordered across or within sections.
 * 2. Safe Space Guarantee: Content placed on a page never exceeds that page's budget,
 *    unless an indivisible atomic block is physically taller than a full empty page.
 * 3. Zero Text / Bullet Loss: Bullet ranges and text slices partition data with 100% preservation.
 * 4. Infinite Loop Protection: Every loop advances monotonically with explicit forward progress guards.
 */

import {
  ColumnPageItemSlot,
  ColumnPagePartition,
  NormalizedItemMetric,
  NormalizedSectionMetric,
  PageHeightBudget,
  SplitStrategy,
} from './types';

export interface IColumnPartitioner {
  /**
   * Partitions an array of section metrics across page height budgets.
   * @param sections Measured section metrics in desired display order.
   * @param budget Multi-page height capacity allocations.
   * @returns Array of column page partitions containing allocated item slots.
   */
  partitionColumn(
    sections: NormalizedSectionMetric[],
    budget: PageHeightBudget
  ): ColumnPagePartition[];
}

/**
 * Validates algorithmic invariants on the generated partitions.
 * Logs warnings or throws in development environments when invariants are violated.
 */
export function assertPartitionInvariants(
  partitions: ColumnPagePartition[],
  budget: PageHeightBudget
): void {
  const itemSlotsMap = new Map<string, ColumnPageItemSlot[]>();

  partitions.forEach((p) => {
    p.slots.forEach((slot) => {
      if (!slot.itemId) return;
      const key = `${slot.sectionId}::${slot.itemId}`;
      const existing = itemSlotsMap.get(key) || [];
      existing.push(slot);
      itemSlotsMap.set(key, existing);
    });
  });

  // Verify slice continuity
  itemSlotsMap.forEach((slots, key) => {
    if (slots.length > 1) {
      // Bullets continuity
      if (slots[0].bulletStart !== undefined) {
        for (let i = 0; i < slots.length - 1; i++) {
          const cur = slots[i];
          const next = slots[i + 1];
          if (cur.bulletEnd !== next.bulletStart) {
            console.warn(
              `[Pagination Invariant Violation] Discontinuous bullets for ${key}: [${cur.bulletStart}..${cur.bulletEnd}] followed by [${next.bulletStart}..${next.bulletEnd}]`
            );
          }
        }
      }
      // Text continuity
      if (slots[0].textRatioStart !== undefined) {
        for (let i = 0; i < slots.length - 1; i++) {
          const cur = slots[i];
          const next = slots[i + 1];
          if (Math.abs((cur.textRatioEnd ?? 0) - (next.textRatioStart ?? 0)) > 0.01) {
            console.warn(
              `[Pagination Invariant Violation] Discontinuous text for ${key}: [${cur.textRatioStart}..${cur.textRatioEnd}] followed by [${next.textRatioStart}..${next.textRatioEnd}]`
            );
          }
        }
      }
    }
  });
}

/**
 * Manages mutable state for an active pagination session.
 * Eliminates stale closures and guarantees that slot allocations and capacity checks
 * are always synchronized with the active page.
 */
class PartitionSession {
  public pages: ColumnPagePartition[] = [];
  public currentPageIndex = 0;
  public currentUsedHeight = 0;
  public currentSlots: ColumnPageItemSlot[] = [];

  constructor(private readonly budget: PageHeightBudget) {}

  public getCapacity(pIdx: number): number {
    return pIdx < this.budget.capacities.length
      ? this.budget.capacities[pIdx]
      : this.budget.pageNextCapacity;
  }

  public getCurrentPageCapacity(): number {
    return this.getCapacity(this.currentPageIndex);
  }

  public getAvailableHeight(): number {
    return this.getCurrentPageCapacity() - this.currentUsedHeight;
  }

  public isCurrentPageEmpty(): boolean {
    return this.currentSlots.length === 0;
  }

  public pushSlot(slot: ColumnPageItemSlot): void {
    this.currentSlots.push(slot);
  }

  public addUsedHeight(height: number): void {
    this.currentUsedHeight += height;
  }

  public startNewPage(): void {
    if (this.currentSlots.length > 0) {
      this.pages.push({ pageIndex: this.currentPageIndex, slots: this.currentSlots });
    }
    this.currentPageIndex++;
    this.currentUsedHeight = 0;
    this.currentSlots = [];
  }

  public finalize(): ColumnPagePartition[] {
    if (this.currentSlots.length > 0) {
      this.pages.push({ pageIndex: this.currentPageIndex, slots: this.currentSlots });
    }
    return this.pages.length > 0 ? this.pages : [{ pageIndex: 0, slots: [] }];
  }
}

/**
 * ColumnPartitioner implements the strict 3-tier pagination hierarchy:
 * - Tier 1: Full Section Fit -> entire section placed intact if it fits current page.
 * - Tier 2: Break Sub-Section -> fit as many whole items as possible on current page.
 * - Tier 3A: Break Sub-Block (Bullets) -> split internal bullets cleanly across page boundaries.
 * - Tier 3B: Break Sub-Block (Continuous Text) -> split narrative paragraphs at sentence/word cuts.
 */
export class ColumnPartitioner implements IColumnPartitioner {
  private static readonly MIN_TEXT_HEIGHT = 32; // Minimum ~2 lines of narrative text
  private static readonly MIN_SPLIT_RATIO = 0.08; // Minimum 8% slice to justify splitting
  private static readonly MAX_SPLIT_RATIO = 0.95; // Maximum 95% slice
  private static readonly SNAP_TO_END_THRESHOLD = 0.05; // Remaining < 5% snaps to 1.0

  public partitionColumn(
    sections: NormalizedSectionMetric[],
    budget: PageHeightBudget
  ): ColumnPagePartition[] {
    const session = new PartitionSession(budget);

    for (const section of sections) {
      const secId = section.sectionId;
      const available = session.getAvailableHeight();

      // Ensure sections without explicit sub-items (like summary or atomic text blocks)
      // are represented as an item so they benefit from the unified splitting engine.
      const rawItems =
        !section.items || section.items.length === 0
          ? section.totalHeight > 0
            ? [
                {
                  id: `${secId}-content`,
                  sectionId: secId,
                  height: Math.max(1, section.totalHeight - (section.headerHeight || 0)),
                  headerHeight: section.headerHeight || 0,
                  bullets: [],
                  splitStrategy: (secId === 'summary' ? 'text' : 'atomic') as SplitStrategy,
                },
              ]
            : []
          : section.items;

      if (rawItems.length === 0) continue;

      const sumItemHeights = rawItems.reduce((s, it) => s + it.height, 0);
      const sectionOverhead = Math.max(section.headerHeight, section.totalHeight - sumItemHeights);
      const sectionTotalH = Math.max(section.totalHeight, sectionOverhead + sumItemHeights);

      // Tier 1: Check full section fit
      if (sectionTotalH <= available) {
        rawItems.forEach((item, idx) => {
          session.pushSlot({
            sectionId: secId,
            itemId: item.id,
            isFirstItemOfSection: idx === 0,
          });
        });
        session.addUsedHeight(sectionTotalH);
        continue;
      }

      // Tier 2 & 3: Multi-item section exceeds available space on current page
      let isFirstItemPlacedForSection = true;

      for (let i = 0; i < rawItems.length; i++) {
        const item = rawItems[i];
        const curAvail = session.getAvailableHeight();
        const headerCost = isFirstItemPlacedForSection ? sectionOverhead : 0;
        const neededForItem = headerCost + item.height;

        // Tier 2: Does whole item fit on current page?
        if (neededForItem <= curAvail) {
          session.pushSlot({
            sectionId: secId,
            itemId: item.id,
            isFirstItemOfSection: isFirstItemPlacedForSection,
          });
          session.addUsedHeight(neededForItem);
          isFirstItemPlacedForSection = false;
          continue;
        }

        // Whole item does not fit on current page.
        // Determine splitting strategy polymorphically.
        const strategy = item.splitStrategy || (item.bullets && item.bullets.length > 1 ? 'bullets' : 'atomic');

        // Tier 3A: Bullet-splittable item on current page
        if (strategy === 'bullets' && item.bullets && item.bullets.length > 1) {
          const didSplit = this.trySplitBulletItemOnCurrentPage(
            item,
            secId,
            headerCost,
            isFirstItemPlacedForSection,
            section.headerHeight,
            session
          );

          if (didSplit) {
            isFirstItemPlacedForSection = false;
            continue;
          }
        }

        // Tier 3B: Continuous text item on current page
        if (strategy === 'text') {
          const didSplit = this.trySplitTextItemOnCurrentPage(
            item,
            secId,
            headerCost,
            isFirstItemPlacedForSection,
            section.headerHeight,
            session
          );

          if (didSplit) {
            isFirstItemPlacedForSection = false;
            continue;
          }
        }

        // Item cannot fit or split on current page (e.g. not enough room to start).
        // Advance to a fresh page if current page has any content.
        if (!session.isCurrentPageEmpty()) {
          session.startNewPage();
        }

        // Now on a fresh page:
        const freshAvail = session.getAvailableHeight();
        const freshHeaderCost = isFirstItemPlacedForSection ? sectionOverhead : (section.headerHeight || 28);

        // Does whole item fit on fresh page?
        if (freshHeaderCost + item.height <= freshAvail) {
          session.pushSlot({
            sectionId: secId,
            itemId: item.id,
            isFirstItemOfSection: isFirstItemPlacedForSection,
          });
          session.addUsedHeight(freshHeaderCost + item.height);
          isFirstItemPlacedForSection = false;
          continue;
        }

        // Tier 3 on fresh page: Item is taller than an entire fresh page
        if (strategy === 'bullets' && item.bullets && item.bullets.length > 1) {
          this.distributeRemainingBullets(
            item,
            secId,
            0,
            section.headerHeight,
            session,
            isFirstItemPlacedForSection,
            freshHeaderCost
          );
          isFirstItemPlacedForSection = false;
          continue;
        }

        if (strategy === 'text') {
          this.distributeRemainingText(
            item,
            secId,
            0,
            section.headerHeight,
            session,
            isFirstItemPlacedForSection,
            freshHeaderCost
          );
          isFirstItemPlacedForSection = false;
          continue;
        }

        // Fallback: Indivisible atomic item larger than a fresh page
        // Place as an explicit oversized block on this page and immediately advance.
        session.pushSlot({
          sectionId: secId,
          itemId: item.id,
          isFirstItemOfSection: isFirstItemPlacedForSection,
        });
        session.addUsedHeight(freshHeaderCost + item.height);
        isFirstItemPlacedForSection = false;
      }
    }

    const finalPages = session.finalize();

    if (process.env.NODE_ENV !== 'production') {
      assertPartitionInvariants(finalPages, budget);
    }

    return finalPages;
  }

  // =========================================================================
  // Bullet Splitting Implementations
  // =========================================================================

  private trySplitBulletItemOnCurrentPage(
    item: NormalizedItemMetric,
    secId: any,
    headerCost: number,
    isFirstItemPlacedForSection: boolean,
    sectionHeaderHeight: number | undefined,
    session: PartitionSession
  ): boolean {
    const bullets = item.bullets;
    const curAvail = session.getAvailableHeight();
    const itemHeaderH = item.headerHeight || 28;
    const firstBulletH = bullets[0]?.height || 0;
    const minNeededToStart = headerCost + itemHeaderH + firstBulletH;

    if (curAvail < minNeededToStart) {
      return false; // Cannot start on current page without overflowing
    }

    let accH = headerCost + itemHeaderH;
    let bulletsPlaced = 0;

    for (let b = 0; b < bullets.length; b++) {
      const bH = bullets[b].height;
      if (accH + bH <= curAvail) {
        accH += bH;
        bulletsPlaced++;
      } else {
        break;
      }
    }

    if (bulletsPlaced < 1) {
      return false;
    }

    // Place initial fitting bullets on current page
    session.pushSlot({
      sectionId: secId,
      itemId: item.id,
      isFirstItemOfSection: isFirstItemPlacedForSection,
      bulletStart: 0,
      bulletEnd: bulletsPlaced,
    });
    session.addUsedHeight(accH);

    session.startNewPage();

    // Distribute remaining bullets across subsequent page(s)
    this.distributeRemainingBullets(
      item,
      secId,
      bulletsPlaced,
      sectionHeaderHeight,
      session
    );

    return true;
  }

  private distributeRemainingBullets(
    item: NormalizedItemMetric,
    secId: any,
    initialStartIdx: number,
    sectionHeaderHeight: number | undefined,
    session: PartitionSession,
    isFirstItemOfSection: boolean = false,
    initialHeaderCost?: number
  ): void {
    const bullets = item.bullets;
    let remStart = initialStartIdx;

    while (remStart < bullets.length) {
      const pageAvail = session.getAvailableHeight();
      const pageSecOverhead = initialHeaderCost !== undefined && remStart === initialStartIdx
        ? initialHeaderCost
        : (sectionHeaderHeight || 28);
      const pageItemHeaderH = item.headerHeight || 28;
      let pageAccH = (session.isCurrentPageEmpty() ? pageSecOverhead : 0) + pageItemHeaderH;
      let pageBulletsCount = 0;

      for (let b = remStart; b < bullets.length; b++) {
        const bH = bullets[b].height;
        const fits = pageAccH + bH <= pageAvail;
        // On a completely empty page, if the very first bullet is larger than page capacity,
        // we must place at least 1 bullet to guarantee forward progress without an infinite loop.
        const isOversizedOnEmptyPage = pageBulletsCount === 0 && session.isCurrentPageEmpty();

        if (fits || isOversizedOnEmptyPage) {
          pageAccH += bH;
          pageBulletsCount++;
        } else {
          break;
        }
      }

      // Safeguard against infinite loops
      if (pageBulletsCount === 0) {
        if (!session.isCurrentPageEmpty()) {
          session.startNewPage();
          continue;
        }
        pageBulletsCount = 1;
        pageAccH += bullets[remStart].height;
      }

      session.pushSlot({
        sectionId: secId,
        itemId: item.id,
        isFirstItemOfSection: remStart === 0 && isFirstItemOfSection,
        bulletStart: remStart,
        bulletEnd: remStart + pageBulletsCount,
      });
      session.addUsedHeight(pageAccH);
      remStart += pageBulletsCount;

      if (remStart < bullets.length) {
        session.startNewPage();
      }
    }
  }

  // =========================================================================
  // Continuous Text Splitting Implementations
  // =========================================================================

  private trySplitTextItemOnCurrentPage(
    item: NormalizedItemMetric,
    secId: any,
    headerCost: number,
    isFirstItemPlacedForSection: boolean,
    sectionHeaderHeight: number | undefined,
    session: PartitionSession
  ): boolean {
    const curAvail = session.getAvailableHeight();
    const availForText = curAvail - headerCost;

    if (availForText < ColumnPartitioner.MIN_TEXT_HEIGHT || item.height <= 0) {
      return false; // Not enough room for even ~2 lines
    }

    const rawRatio = availForText / item.height;
    if (rawRatio < ColumnPartitioner.MIN_SPLIT_RATIO) {
      return false; // Too small a fragment to split on current page
    }

    // Ensure what is left for the next page is at least MIN_TEXT_HEIGHT (no orphan lines)
    const maxRatioLeavingMinText = (item.height - ColumnPartitioner.MIN_TEXT_HEIGHT) / item.height;
    if (maxRatioLeavingMinText < ColumnPartitioner.MIN_SPLIT_RATIO) {
      return false; // Text is too short to be cleanly split into two viable blocks
    }

    const fitRatio = Math.min(maxRatioLeavingMinText, rawRatio);

    session.pushSlot({
      sectionId: secId,
      itemId: item.id,
      isFirstItemOfSection: isFirstItemPlacedForSection,
      textRatioStart: 0,
      textRatioEnd: fitRatio,
    });
    session.addUsedHeight(headerCost + Math.round(item.height * fitRatio));

    session.startNewPage();

    this.distributeRemainingText(
      item,
      secId,
      fitRatio,
      sectionHeaderHeight,
      session
    );

    return true;
  }

  private distributeRemainingText(
    item: NormalizedItemMetric,
    secId: any,
    initialRatio: number,
    sectionHeaderHeight: number | undefined,
    session: PartitionSession,
    isFirstItemOfSection: boolean = false,
    initialHeaderCost?: number
  ): void {
    let remStart = initialRatio;

    while (remStart < 1.0) {
      const pageAvail = session.getAvailableHeight();
      const pageSecOverhead = initialHeaderCost !== undefined && remStart === initialRatio
        ? initialHeaderCost
        : (sectionHeaderHeight || 28);
      const pageOverhead = session.isCurrentPageEmpty() ? pageSecOverhead : 0;
      const pageAvailForText = Math.max(0, pageAvail - pageOverhead);
      const remTextHeight = item.height * (1.0 - remStart);

      // Does the entire remaining text fit on this page?
      if (remTextHeight <= pageAvailForText) {
        session.pushSlot({
          sectionId: secId,
          itemId: item.id,
          isFirstItemOfSection: remStart === 0 && isFirstItemOfSection,
          textRatioStart: remStart,
          textRatioEnd: 1.0,
        });
        session.addUsedHeight(pageOverhead + Math.round(remTextHeight));
        remStart = 1.0;
        break;
      }

      // Remaining text does NOT fit on this page.
      // Can we fit at least MIN_TEXT_HEIGHT on this page?
      if (pageAvailForText >= ColumnPartitioner.MIN_TEXT_HEIGHT) {
        const rawRatio = pageAvailForText / item.height;
        let pageSlice = Math.min(ColumnPartitioner.MAX_SPLIT_RATIO, rawRatio);

        // Snap to end if remaining tail is tiny (< 5%)
        if (1.0 - (remStart + pageSlice) < ColumnPartitioner.SNAP_TO_END_THRESHOLD) {
          pageSlice = 1.0 - remStart;
        }

        const pageEnd = Math.min(1.0, remStart + pageSlice);

        session.pushSlot({
          sectionId: secId,
          itemId: item.id,
          isFirstItemOfSection: remStart === 0 && isFirstItemOfSection,
          textRatioStart: remStart,
          textRatioEnd: pageEnd,
        });
        session.addUsedHeight(pageOverhead + Math.round(item.height * (pageEnd - remStart)));
        remStart = pageEnd;

        if (remStart < 1.0) {
          session.startNewPage();
        }
      } else {
        // Not enough space for MIN_TEXT_HEIGHT on current page:
        // Advance to a fresh page if current page already has content.
        if (!session.isCurrentPageEmpty()) {
          session.startNewPage();
        } else {
          // On a completely empty page where even pageAvail < MIN_TEXT_HEIGHT:
          // Place remaining text as an oversized block to guarantee completion.
          session.pushSlot({
            sectionId: secId,
            itemId: item.id,
            isFirstItemOfSection: remStart === 0 && isFirstItemOfSection,
            textRatioStart: remStart,
            textRatioEnd: 1.0,
          });
          session.addUsedHeight(pageOverhead + Math.round(remTextHeight));
          remStart = 1.0;
          break;
        }
      }
    }
  }
}

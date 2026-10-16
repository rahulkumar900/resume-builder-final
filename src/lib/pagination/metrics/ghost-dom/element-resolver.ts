/**
 * @fileoverview Element Resolver for Ghost DOM Measurement.
 * Encapsulates all querySelector lookups for columns, headers, sections, items, and bullets.
 */

export class GhostElementResolver {
  constructor(private readonly containerEl: HTMLElement) {}

  /**
   * Retrieves a column element by its role.
   */
  public getColumn(type: 'main' | 'sidebar' | 'single'): HTMLElement | null {
    return this.containerEl.querySelector<HTMLElement>(`[data-ghost-col="${type}"]`);
  }

  /**
   * Retrieves all elements marked as headers across the template.
   */
  public getAllHeaders(): HTMLElement[] {
    return Array.from(
      this.containerEl.querySelectorAll<HTMLElement>('[data-ghost-header="true"]')
    );
  }

  /**
   * Retrieves a column-internal header element.
   */
  public getInternalHeader(columnEl: HTMLElement | null): HTMLElement | null {
    if (!columnEl) return null;
    return columnEl.querySelector<HTMLElement>('[data-ghost-header="true"]');
  }

  /**
   * Finds the root template element inside the container.
   */
  public getRootTemplateElement(): HTMLElement {
    return (this.containerEl.firstElementChild as HTMLElement) || this.containerEl;
  }

  /**
   * Retrieves section elements inside a target column element.
   */
  public getSections(columnEl: HTMLElement): HTMLElement[] {
    return Array.from(
      columnEl.querySelectorAll<HTMLElement>(
        ':scope > [data-ghost-section], [data-ghost-section]'
      )
    );
  }

  /**
   * Retrieves the title element of a section.
   */
  public getSectionTitle(sectionEl: HTMLElement): HTMLElement | null {
    return sectionEl.querySelector<HTMLElement>('[data-ghost-section-title="true"]');
  }

  /**
   * Retrieves item elements contained within a section.
   */
  public getItems(sectionEl: HTMLElement): HTMLElement[] {
    return Array.from(sectionEl.querySelectorAll<HTMLElement>('[data-ghost-item]'));
  }

  /**
   * Retrieves the item sub-header element (e.g. role + company block).
   */
  public getItemHeader(itemEl: HTMLElement): HTMLElement | null {
    return itemEl.querySelector<HTMLElement>('[data-ghost-item-header="true"]');
  }

  /**
   * Retrieves bullet highlight elements within an item.
   */
  public getBullets(itemEl: HTMLElement): HTMLElement[] {
    return Array.from(itemEl.querySelectorAll<HTMLElement>('[data-ghost-bullet]'));
  }
}

import { describe, it, expect } from 'vitest';
import {
  moveSectionBetweenColumns,
  SECTION_METAS,
  SECTION_PLACEMENT_RECOMMENDATIONS,
} from '@/components/builder/SectionReorderModal';
import { SectionOrderConfig } from '@/types/resume';

describe('Section Layout & Cross-Column Transfer Logic (SOLID / TDD)', () => {
  const initialOrder: SectionOrderConfig = {
    singleColumn: ['summary', 'experience', 'education', 'skills'],
    mainColumn: ['summary', 'experience', 'projects', 'education'],
    sidebarColumn: ['skills', 'languages', 'certifications'],
  };

  it('moves section from main column to sidebar column cleanly', () => {
    const updated = moveSectionBetweenColumns(initialOrder, 'experience', 'sidebar');

    expect(updated.mainColumn).not.toContain('experience');
    expect(updated.mainColumn).toEqual(['summary', 'projects', 'education']);
    expect(updated.sidebarColumn).toContain('experience');
    expect(updated.sidebarColumn).toEqual(['skills', 'languages', 'certifications', 'experience']);
  });

  it('moves section from sidebar column to main column cleanly', () => {
    const updated = moveSectionBetweenColumns(initialOrder, 'skills', 'main');

    expect(updated.sidebarColumn).not.toContain('skills');
    expect(updated.sidebarColumn).toEqual(['languages', 'certifications']);
    expect(updated.mainColumn).toContain('skills');
    expect(updated.mainColumn).toEqual(['summary', 'experience', 'projects', 'education', 'skills']);
  });

  it('is idempotent when moving a section to a column it already belongs to', () => {
    const updatedMain = moveSectionBetweenColumns(initialOrder, 'experience', 'main');
    expect(updatedMain).toBe(initialOrder);

    const updatedSidebar = moveSectionBetweenColumns(initialOrder, 'skills', 'sidebar');
    expect(updatedSidebar).toBe(initialOrder);
  });

  it('maintains placement recommendations for ATS and visual balance', () => {
    expect(SECTION_PLACEMENT_RECOMMENDATIONS.experience?.recommendedColumn).toBe('main');
    expect(SECTION_PLACEMENT_RECOMMENDATIONS.projects?.recommendedColumn).toBe('main');
    expect(SECTION_PLACEMENT_RECOMMENDATIONS.skills?.recommendedColumn).toBe('sidebar');
    expect(SECTION_PLACEMENT_RECOMMENDATIONS.languages?.recommendedColumn).toBe('sidebar');
    expect(SECTION_PLACEMENT_RECOMMENDATIONS.education?.recommendedColumn).toBe('flexible');
  });

  it('has valid metadata and builderKey mappings for all core sections', () => {
    const coreSections = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'] as const;

    coreSections.forEach((secId) => {
      const meta = SECTION_METAS[secId];
      expect(meta).toBeDefined();
      expect(meta.id).toBe(secId);
      expect(meta.label.length).toBeGreaterThan(0);
      expect(meta.builderKey).toBeDefined();
    });
  });
});

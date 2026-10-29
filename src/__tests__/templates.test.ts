import { describe, it, expect } from 'vitest';
import {
  getTemplateLayout,
  getTemplateSidebarPosition,
  getDefaultSectionOrder,
  migrateSectionOrder,
  getDefaultColumnForSection,
  TEMPLATES,
} from '@/lib/templates';
import { SectionOrderConfig } from '@/types/resume';

describe('Templates & Section Order Migration (Open/Closed & Liskov Principles)', () => {
  describe('getTemplateLayout', () => {
    it('should correctly identify single-column templates', () => {
      expect(getTemplateLayout('ats')).toBe('single');
      expect(getTemplateLayout('vienna')).toBe('single');
      expect(getTemplateLayout('madrid')).toBe('single');
      expect(getTemplateLayout('harvard')).toBe('single');
      expect(getTemplateLayout('harvard_tech')).toBe('single');
      expect(getTemplateLayout('harvard_experienced')).toBe('single');
      expect(getTemplateLayout('ribbon')).toBe('single');
    });

    it('should correctly identify double-column templates', () => {
      expect(getTemplateLayout('prawira')).toBe('double');
      expect(getTemplateLayout('chastain')).toBe('double');
      expect(getTemplateLayout('sydney')).toBe('double');
      expect(getTemplateLayout('stockholm')).toBe('double');
      expect(getTemplateLayout('marigold')).toBe('double');
      expect(getTemplateLayout('stamp')).toBe('double');
    });

    it('should fallback safely to single column for invalid template ids', () => {
      expect(getTemplateLayout('non-existent-template' as any)).toBe('single');
    });
  });

  describe('getTemplateSidebarPosition', () => {
    it('should identify templates with right sidebar', () => {
      expect(getTemplateSidebarPosition('sydney')).toBe('right');
      expect(getTemplateSidebarPosition('dublin')).toBe('right');
      expect(getTemplateSidebarPosition('prawira')).toBe('right');
      expect(getTemplateSidebarPosition('marigold')).toBe('right');
      expect(getTemplateSidebarPosition('stamp')).toBe('right');
    });

    it('should identify templates with left sidebar', () => {
      expect(getTemplateSidebarPosition('stockholm')).toBe('left');
      expect(getTemplateSidebarPosition('chastain')).toBe('left');
      expect(getTemplateSidebarPosition('santoso')).toBe('left');
    });

    it('should default to left sidebar for templates without explicit position', () => {
      expect(getTemplateSidebarPosition('ats')).toBe('left');
    });
  });

  describe('getDefaultColumnForSection', () => {
    it('should place skills and certifications in sidebar by default for double-column layouts', () => {
      expect(getDefaultColumnForSection('skills', 'prawira')).toBe('sidebar');
      expect(getDefaultColumnForSection('certifications', 'prawira')).toBe('sidebar');
      expect(getDefaultColumnForSection('languages', 'prawira')).toBe('sidebar');
    });

    it('should place narrative experience and projects in main column', () => {
      expect(getDefaultColumnForSection('experience', 'prawira')).toBe('main');
      expect(getDefaultColumnForSection('projects', 'prawira')).toBe('main');
    });
  });

  describe('migrateSectionOrder', () => {
    it('should return valid defaults when previous order was empty or undefined', () => {
      const order = migrateSectionOrder(undefined, 'ats');
      expect(order.singleColumn).toBeDefined();
      expect(order.singleColumn!.length).toBeGreaterThan(0);
      expect(order.singleColumn).toContain('experience');
    });

    it('should preserve active sections when migrating from double to single column', () => {
      const doubleOrder: SectionOrderConfig = {
        mainColumn: ['summary', 'experience', 'projects'],
        sidebarColumn: ['skills', 'education', 'certifications'],
      };

      const singleMigrated = migrateSectionOrder(doubleOrder, 'ats');
      expect(singleMigrated.singleColumn).toBeDefined();
      expect(singleMigrated.singleColumn).toContain('summary');
      expect(singleMigrated.singleColumn).toContain('experience');
      expect(singleMigrated.singleColumn).toContain('projects');
      expect(singleMigrated.singleColumn).toContain('skills');
      expect(singleMigrated.singleColumn).toContain('education');
      expect(singleMigrated.singleColumn).toContain('certifications');
    });

    it('should distribute sections into main and sidebar when migrating from single to double column', () => {
      const singleOrder: SectionOrderConfig = {
        singleColumn: ['summary', 'experience', 'skills', 'education', 'certifications', 'projects'],
      };

      const doubleMigrated = migrateSectionOrder(singleOrder, 'prawira');
      expect(doubleMigrated.mainColumn).toBeDefined();
      expect(doubleMigrated.sidebarColumn).toBeDefined();

      // Experience should end up in mainColumn
      expect(doubleMigrated.mainColumn).toContain('experience');

      // Skills should end up in sidebarColumn
      expect(doubleMigrated.sidebarColumn).toContain('skills');
    });
  });

  describe('Template Registry Contract Consistency', () => {
    it('should register all templates with non-empty names and valid layouts', () => {
      expect(TEMPLATES.length).toBeGreaterThan(10);
      TEMPLATES.forEach((tpl) => {
        expect(tpl.id).toBeTruthy();
        expect(tpl.name).toBeTruthy();
        expect(['single', 'double']).toContain(tpl.layout);
      });
    });
  });
});

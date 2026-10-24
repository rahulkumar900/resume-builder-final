import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCompleteResume } from './fixtures/test-resumes';
import { ResumeData } from '@/types/resume';
import {
  getTemplateLayout,
  getTemplateSidebarPosition,
  migrateSectionOrder,
  getEffectiveSectionOrder,
} from '@/lib/templates';
import { moveSectionBetweenColumns } from '@/components/builder/SectionReorderModal';
import { analyzeResumeForAts } from '@/lib/ats/ats-analyzer';
import { inspectResumeDuplicatesAndQuality } from '@/lib/ats/duplicate-detector';
import { migrateGuestResumesToAccount } from '@/lib/storage/resume-sync-service';
import * as localStorageModule from '@/lib/storage/local-storage';
import * as cloudStorageModule from '@/lib/storage/cloud-storage';

describe('Resume Lifecycle & Multi-System Integration Tests', () => {
  let sampleResume: ResumeData;

  beforeEach(() => {
    vi.clearAllMocks();
    sampleResume = createCompleteResume({
      templateId: 'harvard',
      layout: { format: 'A4' },
    });
  });

  describe('1. Template Layout Switching & Section Migration Integration', () => {
    it('seamlessly migrates section ordering from Single-Column (harvard) to Two-Column (chastain)', () => {
      // 1. Initial template is 1-column
      expect(getTemplateLayout(sampleResume.templateId)).toBe('single');

      // 2. User switches to a 2-column template with left sidebar
      const targetTemplate = 'chastain';
      expect(getTemplateLayout(targetTemplate)).toBe('double');
      expect(getTemplateSidebarPosition(targetTemplate)).toBe('left');

      // 3. Migrate section order
      const migrated = migrateSectionOrder(sampleResume.sectionOrder, targetTemplate);
      expect(migrated.mainColumn).toBeDefined();
      expect(migrated.sidebarColumn).toBeDefined();
      expect(migrated.mainColumn!.length).toBeGreaterThan(0);
      expect(migrated.sidebarColumn!.length).toBeGreaterThan(0);

      // Main column should contain heavy content sections
      expect(migrated.mainColumn).toContain('experience');

      // Sidebar column should contain concise sections
      expect(migrated.sidebarColumn).toContain('skills');
    });

    it('supports cross-column section transfer while preserving column state', () => {
      const targetTemplate = 'prawira'; // 2-column with right sidebar
      expect(getTemplateSidebarPosition(targetTemplate)).toBe('right');

      const migrated = migrateSectionOrder(sampleResume.sectionOrder, targetTemplate);

      // Move 'education' from main to sidebar
      const afterMoveToSidebar = moveSectionBetweenColumns(migrated, 'education', 'sidebar');
      expect(afterMoveToSidebar.mainColumn).not.toContain('education');
      expect(afterMoveToSidebar.sidebarColumn).toContain('education');

      // Move 'skills' from sidebar to main
      const afterMoveToMain = moveSectionBetweenColumns(afterMoveToSidebar, 'skills', 'main');
      expect(afterMoveToMain.sidebarColumn).not.toContain('skills');
      expect(afterMoveToMain.mainColumn).toContain('skills');

      // Verify effective order resolves properly
      const effective = getEffectiveSectionOrder(targetTemplate, afterMoveToMain);
      expect(effective.mainColumn).toContain('skills');
      expect(effective.sidebarColumn).toContain('education');
    });

    it('preserves section order integrity when switching back from Two-Column to Single-Column', () => {
      // Switch from single -> double
      const doubleOrder = migrateSectionOrder(sampleResume.sectionOrder, 'chastain');

      // Switch from double -> single (e.g. 'ats')
      const singleOrder = migrateSectionOrder(doubleOrder, 'ats');
      expect(getTemplateLayout('ats')).toBe('single');
      expect(singleOrder.singleColumn).toBeDefined();
      expect(singleOrder.singleColumn!.length).toBeGreaterThanOrEqual(4);
      expect(singleOrder.singleColumn).toContain('experience');
      expect(singleOrder.singleColumn).toContain('skills');
      expect(singleOrder.singleColumn).toContain('education');
    });
  });

  describe('2. ATS Compliance & Quality Audit Integration', () => {
    it('evaluates comprehensive ATS score, action verbs, and section completeness', () => {
      const atsResult = analyzeResumeForAts(sampleResume);

      expect(atsResult).toBeDefined();
      expect(atsResult.overallScore).toBeGreaterThan(70);
      expect(atsResult.tier.grade).toBeDefined();

      // Check categories exist and have valid scores
      expect(atsResult.categories.contact.percentage).toBeGreaterThanOrEqual(80);
      expect(atsResult.categories.experience.percentage).toBeGreaterThanOrEqual(70);
      expect(atsResult.categories.skills.percentage).toBeGreaterThanOrEqual(70);
      expect(atsResult.categories.education.percentage).toBeGreaterThanOrEqual(70);
    });

    it('detects duplicate bullet points across experience roles', () => {
      const duplicateBullet = sampleResume.experience[0].highlights[0];
      const resumeWithDuplicate: ResumeData = {
        ...sampleResume,
        experience: [
          ...sampleResume.experience,
          {
            id: 'exp-duplicate',
            role: 'Software Architect',
            company: 'Another Company',
            location: 'Remote',
            startDate: '2020',
            endDate: '2021',
            current: false,
            highlights: [duplicateBullet], // exact duplicate
          },
        ],
      };

      const { report } = inspectResumeDuplicatesAndQuality(resumeWithDuplicate);
      expect(report.totalIssues).toBeGreaterThan(0);
      expect(report.duplicateBullets.length).toBeGreaterThan(0);
      expect(report.duplicateBullets[0].text).toContain(duplicateBullet.slice(0, 20));
    });
  });

  describe('3. Guest Resume Cloud Migration Pipeline Integration', () => {
    it('migrates guest local storage draft to authenticated user on sign in', async () => {
      const guestResume: ResumeData = {
        ...sampleResume,
        id: 'guest-draft-999',
        userId: undefined,
        syncedToCloud: false,
      };

      // Mock getStoredResumes from local-storage and saveResumeToDatabase from cloud-storage
      const getStoredResumesSpy = vi.spyOn(localStorageModule, 'getStoredResumes').mockReturnValue([guestResume]);
      const saveResumeSpy = vi.spyOn(cloudStorageModule, 'saveResumeToDatabase').mockResolvedValue(true);

      const mockUserId = 'usr_authenticated_12345';
      await migrateGuestResumesToAccount(mockUserId);

      expect(getStoredResumesSpy).toHaveBeenCalled();
      expect(saveResumeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'guest-draft-999',
          userId: mockUserId,
          syncedToCloud: true,
        }),
        mockUserId
      );
    });
  });
});

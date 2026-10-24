import { describe, it, expect } from 'vitest';
import { inspectResumeDuplicatesAndQuality } from '@/lib/ats/duplicate-detector';
import { createCompleteResume } from './fixtures/test-resumes';

describe('Duplicate & Content Quality Detector (DRY & Single Responsibility)', () => {
  it('should detect identical duplicate bullets across job roles', () => {
    const resume = createCompleteResume({
      experience: [
        {
          id: 'exp-1',
          role: 'Engineer 1',
          company: 'Company A',
          location: 'San Francisco, CA',
          startDate: '2020',
          endDate: '2021',
          current: false,
          highlights: ['Managed client communications and prepared quarterly presentations.'],
        },
        {
          id: 'exp-2',
          role: 'Engineer 2',
          company: 'Company B',
          location: 'San Francisco, CA',
          startDate: '2021',
          endDate: '2022',
          current: false,
          highlights: ['Managed client communications and prepared quarterly presentations.'], // Duplicate
        },
      ],
    });

    const { report } = inspectResumeDuplicatesAndQuality(resume);
    expect(report.duplicateBullets.length).toBeGreaterThan(0);
    expect(report.totalIssues).toBeGreaterThan(0);
  });

  it('should detect duplicate skills listed in multiple categories', () => {
    const resume = createCompleteResume({
      skills: [
        { id: 's1', category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind'] },
        { id: 's2', category: 'Tools', items: ['Docker', 'Git', 'React'] }, // Duplicate React
      ],
    });

    const { report } = inspectResumeDuplicatesAndQuality(resume);
    expect(report.duplicateSkills.length).toBeGreaterThan(0);
    expect(report.duplicateSkills.some((s) => s.text.toLowerCase() === 'react')).toBe(true);
  });

  it('should report zero issues for clean, non-repetitive resume content', () => {
    const resume = createCompleteResume({
      skills: [
        { id: 's1', category: 'Frontend', items: ['React', 'TypeScript'] },
        { id: 's2', category: 'Backend', items: ['Node.js', 'Go'] },
      ],
    });

    const { report } = inspectResumeDuplicatesAndQuality(resume);
    expect(report.duplicateSkills).toEqual([]);
    expect(report.duplicateBullets).toEqual([]);
  });
});

import { describe, it, expect } from 'vitest';
import { calculateSectionProgress } from '@/lib/section-progress';
import { createMinimalResume } from './fixtures/test-resumes';

const createEmptyResume = () => createMinimalResume();

describe('calculateSectionProgress', () => {
  it('returns 0% for education when no education is added yet', () => {
    const resume = createEmptyResume();
    expect(calculateSectionProgress('education', resume)).toBe(0);
  });

  it('returns 0% for education when an empty item with no mandatory fields is added', () => {
    const resume = createEmptyResume();
    resume.education = [
      {
        id: 'edu-1',
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
      },
    ];
    expect(calculateSectionProgress('education', resume)).toBe(0);
  });

  it('calculates progress correctly for education when mandatory fields are filled', () => {
    const resume = createEmptyResume();
    // Only degree: 40%
    resume.education = [
      {
        id: 'edu-1',
        degree: 'B.S. Computer Science',
        school: '',
        location: '',
        graduationDate: '',
      },
    ];
    expect(calculateSectionProgress('education', resume)).toBe(40);

    // Degree and School: 80%
    resume.education[0].school = 'Stanford University';
    expect(calculateSectionProgress('education', resume)).toBe(80);

    // Degree, School, and Graduation Date: 100%
    resume.education[0].graduationDate = '2024';
    expect(calculateSectionProgress('education', resume)).toBe(100);
  });

  it('returns 0% for experience when empty, and tracks mandatory fields', () => {
    const resume = createEmptyResume();
    expect(calculateSectionProgress('experience', resume)).toBe(0);

    resume.experience = [
      {
        id: 'exp-1',
        role: 'Frontend Engineer',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        highlights: [],
      },
    ];
    expect(calculateSectionProgress('experience', resume)).toBe(30);

    resume.experience[0].company = 'Google';
    expect(calculateSectionProgress('experience', resume)).toBe(60);

    resume.experience[0].startDate = '2022';
    expect(calculateSectionProgress('experience', resume)).toBe(80);

    resume.experience[0].highlights = ['Built scalable web applications'];
    expect(calculateSectionProgress('experience', resume)).toBe(100);
  });

  it('returns 0% for skills when empty, and scales with number of skills', () => {
    const resume = createEmptyResume();
    expect(calculateSectionProgress('skills', resume)).toBe(0);

    resume.skills = [
      {
        id: 'cat-1',
        category: 'Frontend',
        items: ['React'],
      },
    ];
    expect(calculateSectionProgress('skills', resume)).toBe(20);

    resume.skills[0].items = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'];
    expect(calculateSectionProgress('skills', resume)).toBe(100);
  });

  it('returns 0% for personal basics when blank, and calculates per mandatory field', () => {
    const resume = createEmptyResume();
    expect(calculateSectionProgress('personal', resume)).toBe(0);

    resume.personalInfo.fullName = 'Rahul Kumar';
    expect(calculateSectionProgress('personal', resume)).toBe(30);

    resume.personalInfo.jobTitle = 'Senior Software Engineer';
    expect(calculateSectionProgress('personal', resume)).toBe(50);

    resume.personalInfo.email = 'rahul@example.com';
    expect(calculateSectionProgress('personal', resume)).toBe(70);

    resume.personalInfo.phone = '+1 555-0199';
    expect(calculateSectionProgress('personal', resume)).toBe(85);

    resume.personalInfo.location = 'San Francisco, CA';
    expect(calculateSectionProgress('personal', resume)).toBe(100);
  });

  it('returns 0% for projects when empty, and computes correctly when populated', () => {
    const resume = createEmptyResume();
    expect(calculateSectionProgress('projects', resume)).toBe(0);

    resume.projects = [
      {
        id: 'pr-1',
        title: 'AI Resume Builder',
        technologies: ['Next.js', 'Tailwind'],
        highlights: ['Designed responsive real-time ATS optimization interface'],
      },
    ];
    expect(calculateSectionProgress('projects', resume)).toBe(100);
  });
});

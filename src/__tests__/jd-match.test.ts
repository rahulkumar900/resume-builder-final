import { describe, it, expect } from 'vitest';
import { matchJobDescriptionKeywords, extractKeywordsFromJobDescription } from '@/lib/ats/keyword-matcher';
import { createMinimalResume } from './fixtures/test-resumes';
import { ResumeData, SkillCategory } from '@/types/resume';

describe('JD Match Rate & Keyword Analyzer', () => {
  const sampleJd = `
    We are seeking a Senior Frontend Engineer proficient in React, Next.js, and TypeScript.
    Must have hands-on experience with Tailwind CSS, automated testing using Jest, and cloud deployments on AWS.
    Experience with state management (Redux or Zustand) and GraphQL APIs is highly desirable.
  `;

  it('correctly extracts keywords from a job description', () => {
    const keywords = extractKeywordsFromJobDescription(sampleJd);
    expect(keywords.length).toBeGreaterThan(0);
    const lowerKeywords = keywords.map((k) => k.toLowerCase());
    expect(lowerKeywords).toContain('react');
    expect(lowerKeywords).toContain('typescript');
  });

  it('computes 0% or low match rate when resume has no matching skills', () => {
    const emptyResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Test Candidate',
        email: 'test@example.com',
        phone: '1234567890',
        location: 'City, Country',
        jobTitle: 'Accountant',
        summary: 'Experienced certified accountant.',
      },
      skills: [
        {
          id: 'cat-acc',
          category: 'Accounting & Finance',
          items: ['Accounting', 'Taxation', 'Excel', 'Budgeting'],
        },
      ],
      experience: [],
    };

    const match = matchJobDescriptionKeywords(sampleJd, emptyResume);
    expect(match.matchRate).toBeLessThan(20);
    expect(match.missingKeywords.length).toBeGreaterThan(0);
  });

  it('computes high match rate when resume contains majority of JD keywords', () => {
    const matchedResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Alice Developer',
        email: 'alice@example.com',
        phone: '1234567890',
        location: 'Remote',
        jobTitle: 'Senior Frontend Engineer',
        summary: 'Expert frontend engineer specializing in React and Next.js applications.',
      },
      skills: [
        {
          id: 'cat-1',
          category: 'Frontend & Cloud',
          items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Jest', 'AWS', 'Redux', 'GraphQL', 'Zustand'],
        },
      ],
      experience: [
        {
          id: 'exp-1',
          company: 'Acme Corp',
          role: 'Frontend Engineer',
          location: 'San Francisco, CA',
          startDate: '2021-01',
          endDate: 'Present',
          current: true,
          highlights: ['Architected high-throughput React and Next.js applications deployed on AWS cloud with automated testing.'],
        },
      ],
    };

    const match = matchJobDescriptionKeywords(sampleJd, matchedResume);
    expect(match.matchRate).toBeGreaterThanOrEqual(75);
    expect(match.matchedKeywords.length).toBeGreaterThan(match.missingKeywords.length);
  });

  it('detects missing keywords and increases score upon dynamically adding skill', () => {
    const partialResume: ResumeData = {
      ...createMinimalResume(),
      skills: [
        {
          id: 'cat-1',
          category: 'Core',
          items: ['React', 'TypeScript'],
        },
      ],
      experience: [],
    };

    const initialMatch = matchJobDescriptionKeywords(sampleJd, partialResume);
    const initialMissingCount = initialMatch.missingKeywords.length;

    // Pick first missing skill and append to resume
    const missingToAdd = initialMatch.missingKeywords[0].keyword;
    const updatedResume: ResumeData = {
      ...partialResume,
      skills: [
        {
          ...partialResume.skills[0],
          items: [...partialResume.skills[0].items, missingToAdd],
        },
      ],
    };

    const afterMatch = matchJobDescriptionKeywords(sampleJd, updatedResume);
    expect(afterMatch.missingKeywords.length).toBeLessThan(initialMissingCount);
    expect(afterMatch.matchRate).toBeGreaterThanOrEqual(initialMatch.matchRate);
  });

  it('supports category-based skill structures', () => {
    const categoryResume: ResumeData = {
      ...createMinimalResume(),
      skills: [
        {
          id: 'cat-1',
          category: 'Frontend',
          items: ['React', 'Next.js', 'Tailwind CSS'],
        },
        {
          id: 'cat-2',
          category: 'Cloud & Testing',
          items: ['AWS', 'Jest'],
        },
      ],
    };

    const match = matchJobDescriptionKeywords(sampleJd, categoryResume);
    expect(match.matchedKeywords.length).toBeGreaterThan(0);
    const matchedNames = match.matchedKeywords.map((k) => k.keyword.toLowerCase());
    expect(matchedNames).toContain('react');
    expect(matchedNames).toContain('aws');
  });

  it('persists targetJob metadata in resume object', () => {
    const resumeWithTarget: ResumeData = {
      ...createMinimalResume(),
      targetJob: {
        title: 'Senior Frontend Engineer',
        company: 'Stripe',
        jobDescription: sampleJd,
      },
    };

    expect(resumeWithTarget.targetJob).toBeDefined();
    expect(resumeWithTarget.targetJob?.title).toBe('Senior Frontend Engineer');
    expect(resumeWithTarget.targetJob?.company).toBe('Stripe');
    expect(resumeWithTarget.targetJob?.jobDescription).toContain('Senior Frontend Engineer');
  });
});

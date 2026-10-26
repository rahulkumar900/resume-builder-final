import { describe, it, expect } from 'vitest';
import {
  analyzeJobDescriptionFit,
  evaluateMandatorySections,
  auditJdRequirements,
  extractJdRequiredYears,
  extractJdDegreeRequirement,
  calculateCandidateExperienceYears,
} from '@/lib/ats/jd-analyzer';
import { createMinimalResume } from './fixtures/test-resumes';
import { ResumeData } from '@/types/resume';

describe('Job Description & Mandatory Section Analyzer', () => {
  const sampleJd = `
    Senior Full-Stack Engineer
    Location: San Francisco, CA (Hybrid)
    Company: TechCorp

    About the Role:
    We are seeking a Senior Full-Stack Engineer with a minimum of 4+ years of professional experience.
    Candidates must hold a Bachelor's Degree in Computer Science or equivalent.
    AWS Certified Solutions Architect is a strong plus.
    Please provide your GitHub profile or live project portfolio.

    Required Skills & Technologies:
    - Strong proficiency in React, TypeScript, and Node.js
    - Experience with PostgreSQL and AWS cloud deployments
    - Track record of writing automated tests with Jest
    - Demonstrated data-driven metrics in production environments
  `;

  it('correctly extracts required experience years from JD', () => {
    const result = extractJdRequiredYears(sampleJd);
    expect(result.years).toBe(4);
    expect(result.label).toContain('4+ years');
  });

  it('correctly extracts educational degree requirement from JD', () => {
    const result = extractJdDegreeRequirement(sampleJd);
    expect(result.degree).toContain("Bachelor's");
  });

  it('flags missing mandatory sections when resume is incomplete', () => {
    const incompleteResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Test Candidate',
        email: '', // missing
        phone: '', // missing
        location: '', // missing
        jobTitle: '',
        summary: '', // empty summary
      },
      skills: [], // empty skills
      experience: [], // empty experience
      education: [], // empty education
    };

    const sections = evaluateMandatorySections(incompleteResume, sampleJd);
    const missingContact = sections.find((s) => s.id === 'contact');
    const missingSummary = sections.find((s) => s.id === 'summary');
    const missingExp = sections.find((s) => s.id === 'experience');
    const missingEdu = sections.find((s) => s.id === 'education');
    const missingSkills = sections.find((s) => s.id === 'skills');

    expect(missingContact?.status).toBe('missing');
    expect(missingContact?.missingItems.length).toBeGreaterThan(0);
    expect(missingSummary?.status).toBe('missing');
    expect(missingExp?.status).toBe('missing');
    expect(missingEdu?.status).toBe('missing');
    expect(missingSkills?.status).toBe('missing');
  });

  it('marks mandatory sections as passed when properly populated', () => {
    const completeResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+1 555-0199',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Full-Stack Engineer',
        summary: 'Accomplished Full-Stack Engineer with 5+ years of experience architecting high-throughput React and Node.js web applications on AWS cloud infrastructure.',
      },
      skills: [
        {
          id: 'sk-1',
          category: 'Technical Skills',
          items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Jest'],
        },
      ],
      experience: [
        {
          id: 'exp-1',
          company: 'Acme SaaS',
          role: 'Full-Stack Developer',
          location: 'San Francisco, CA',
          startDate: '2020-01-01',
          endDate: '2025-01-01',
          current: false,
          highlights: ['Engineered microservices reducing query latency by 45% and supporting 1M+ active monthly users.'],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'University of California, Berkeley',
          degree: 'Bachelor of Science in Computer Science',
          location: 'Berkeley, CA',
          graduationDate: '2020-05',
        },
      ],
    };

    const sections = evaluateMandatorySections(completeResume, sampleJd);
    const passedSections = sections.filter((s) => s.status === 'passed');
    expect(passedSections.length).toBeGreaterThanOrEqual(4);
  });

  it('audits specific JD requirements including experience, degree, title, certifications, and portfolio links', () => {
    const candidateResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Alex Developer',
        email: 'alex@example.com',
        phone: '+1 555-1234',
        location: 'Remote',
        jobTitle: 'Full-Stack Engineer',
        summary: 'Passionate developer building modern scalable cloud software.',
        github: 'https://github.com/alexdev',
      },
      targetJob: {
        title: 'Senior Full-Stack Engineer',
        company: 'TechCorp',
        jobDescription: sampleJd,
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Fintech Corp',
          role: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2019-01-01',
          endDate: '2024-06-01',
          current: false,
          highlights: ['Spearheaded API migration driving 99.99% uptime and boosted payment processing by 30% across 500k transactions.'],
        },
      ],
      education: [
        {
          id: 'edu-1',
          school: 'State University',
          degree: 'Bachelor of Science in Computer Engineering',
          location: 'New York, NY',
          graduationDate: '2019-05',
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect Associate',
          issuer: 'Amazon Web Services',
          date: '2022-03',
        },
      ],
      skills: [
        {
          id: 'sk-1',
          category: 'Core',
          items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        },
      ],
    };

    const requirements = auditJdRequirements(candidateResume, sampleJd);
    expect(requirements.length).toBeGreaterThan(0);

    const expReq = requirements.find((r) => r.category === 'experience');
    expect(expReq).toBeDefined();
    expect(expReq?.status).toBe('matched'); // 5.5 years >= 4 years required

    const degreeReq = requirements.find((r) => r.category === 'education');
    expect(degreeReq).toBeDefined();
    expect(degreeReq?.status).toBe('matched');

    const certReq = requirements.find((r) => r.category === 'certification');
    expect(certReq).toBeDefined();
    expect(certReq?.status).toBe('matched'); // AWS Certified found

    const portfolioReq = requirements.find((r) => r.category === 'portfolio');
    expect(portfolioReq).toBeDefined();
    expect(portfolioReq?.status).toBe('matched'); // GitHub link found
  });

  it('computes a balanced holistic score that factors in mandatory sections and requirements, not just keywords', () => {
    // Resume with matching keywords but missing summary, contact info, and education
    const keywordOnlyResume: ResumeData = {
      ...createMinimalResume(),
      personalInfo: {
        fullName: 'Anonymous',
        email: '',
        phone: '',
        location: '',
        jobTitle: '',
        summary: '',
      },
      skills: [
        {
          id: 'sk-1',
          category: 'Skills',
          items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Jest'],
        },
      ],
      experience: [],
      education: [],
    };

    const report = analyzeJobDescriptionFit(sampleJd, keywordOnlyResume);
    // Despite having keywords, the overall score should be heavily penalized (< 50%) due to missing mandatory sections
    expect(report.overallScore).toBeLessThan(50);
    expect(report.verdict).toBe('High Risk of Rejection');
    expect(report.actionItems.some((a) => a.category === 'Mandatory Section')).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import {
  sanitizeSkillsForRender,
  formatSkillItem,
  parseSkillWithLevel,
  getActiveSkills,
  getTemplateDefaultSkillsGrouping,
} from '@/lib/templates/skills-sanitizer';
import { getTemplateDefaults } from '@/lib/templates/styles';
import { ResumeData, SkillCategory } from '@/types/resume';

describe('Skills Customization: Groups & Levels', () => {
  const sampleCategories: SkillCategory[] = [
    {
      id: 'cat-1',
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS'],
      enabled: true,
      levels: {
        React: 'Expert',
        TypeScript: 'Advanced',
      },
    },
    {
      id: 'cat-2',
      category: 'Backend',
      items: ['Node.js', 'PostgreSQL'],
      enabled: false, // Disabled group
      levels: {
        'Node.js': 'Intermediate',
      },
    },
    {
      id: 'cat-3',
      category: 'DevOps & Tools',
      items: ['Docker', 'Git', 'AWS'],
      enabled: true,
      levels: {
        Docker: 'Beginner',
        Git: 'Expert',
      },
    },
  ];

  const baseResume: ResumeData = {
    id: 'test-resume-1',
    title: 'Software Engineer',
    status: 'draft',
    updatedAt: new Date().toISOString(),
    templateId: 'ats',
    themeColor: '#2563eb',
    fontFamily: 'inter',
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'alex@example.com',
      phone: '1234567890',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer',
    },
    experience: [],
    education: [],
    skills: sampleCategories,
    projects: [],
    certifications: [],
    languages: [],
  };

  it('determines category grouping default by template style', () => {
    // ATS, Harvard, Traditional, Fresher default to grouped (true)
    expect(getTemplateDefaultSkillsGrouping('ats')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('harvard')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('traditional')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('fresher')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('sarkari')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('silicon')).toBe(true);
    expect(getTemplateDefaultSkillsGrouping('oxford')).toBe(true);

    // Canva, Novoresume, Enhancv, Stockholm, Prawira default to ungrouped skill name & level (false)
    expect(getTemplateDefaultSkillsGrouping('canva')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('canvaaesthetic')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('novoresume')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('enhancv')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('prawira')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('stockholm')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('sydney')).toBe(false);
    expect(getTemplateDefaultSkillsGrouping('dublin')).toBe(false);
  });

  it('includes skillsConfig with correct grouping in getTemplateDefaults', () => {
    const atsDefaults = getTemplateDefaults('ats');
    expect(atsDefaults.skillsConfig).toEqual({
      enableGrouping: true,
      showLevels: false,
    });

    const canvaDefaults = getTemplateDefaults('canva');
    expect(canvaDefaults.skillsConfig).toEqual({
      enableGrouping: false,
      showLevels: true,
    });

    const stockholmDefaults = getTemplateDefaults('stockholm');
    expect(stockholmDefaults.skillsConfig).toEqual({
      enableGrouping: false,
      showLevels: true,
    });
  });

  it('filters out disabled skill categories', () => {
    const active = getActiveSkills(sampleCategories);
    expect(active.length).toBe(2);
    expect(active.map((c) => c.category)).toEqual(['Frontend', 'DevOps & Tools']);
  });

  it('parses skills with parenthetical levels correctly', () => {
    expect(parseSkillWithLevel('React (Expert)')).toEqual({
      name: 'React',
      level: 'Expert',
    });
    expect(parseSkillWithLevel('Node.js (Advanced)')).toEqual({
      name: 'Node.js',
      level: 'Advanced',
    });
    expect(parseSkillWithLevel('PostgreSQL (Intermediate)')).toEqual({
      name: 'PostgreSQL',
      level: 'Intermediate',
    });
    expect(parseSkillWithLevel('Docker (Beginner)')).toEqual({
      name: 'Docker',
      level: 'Beginner',
    });
    expect(parseSkillWithLevel('GraphQL')).toEqual({
      name: 'GraphQL',
    });
  });

  it('formats skills with levels correctly and prevents duplicate parenthetical tags', () => {
    expect(formatSkillItem('React', 'Expert', true)).toBe('React (Expert)');
    expect(formatSkillItem('React (Expert)', 'Expert', true)).toBe('React (Expert)');
    expect(formatSkillItem('React', 'Expert', false)).toBe('React');
    expect(formatSkillItem('TypeScript', undefined, true)).toBe('TypeScript');
  });

  it('renders with category and comma separated style by default on ATS template', () => {
    const sanitized = sanitizeSkillsForRender(baseResume);

    // Active categories preserved with titles
    expect(sanitized.skills.length).toBe(2);
    expect(sanitized.skills[0].category).toBe('Frontend');
    expect(sanitized.skills[0].items).toEqual(['React', 'TypeScript', 'Tailwind CSS']);
    expect(sanitized.skills[1].category).toBe('DevOps & Tools');
    expect(sanitized.skills[1].items).toEqual(['Docker', 'Git', 'AWS']);

    // Disabled Backend category omitted
    expect(sanitized.skills.find((c) => c.category === 'Backend')).toBeUndefined();
  });

  it('renders skill name and level when category grouping is disabled or on Canva template', () => {
    const canvaResume: ResumeData = {
      ...baseResume,
      templateId: 'canva',
    };

    const sanitized = sanitizeSkillsForRender(canvaResume);

    // Categories are merged into a flat list with skill name and level
    expect(sanitized.skills.length).toBe(1);
    expect(sanitized.skills[0].category).toBe('');
    expect(sanitized.skills[0].items).toEqual([
      'React (Expert)',
      'TypeScript (Advanced)',
      'Tailwind CSS',
      'Docker (Beginner)',
      'Git (Expert)',
      'AWS',
    ]);
  });

  it('allows explicit enableGrouping override regardless of template default', () => {
    // Explicitly disable grouping on ATS template
    const forcedFlatAts: ResumeData = {
      ...baseResume,
      templateId: 'ats',
      skillsConfig: {
        enableGrouping: false,
      },
    };

    const sanitized = sanitizeSkillsForRender(forcedFlatAts);
    expect(sanitized.skills.length).toBe(1);
    expect(sanitized.skills[0].category).toBe('');
    expect(sanitized.skills[0].items).toContain('React (Expert)');
  });
});

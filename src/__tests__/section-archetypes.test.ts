import { describe, it, expect } from 'vitest';
import {
  getSectionArchetype,
  SECTION_ARCHETYPE_CONFIG,
  ALL_AVAILABLE_SECTIONS,
  SectionArchetype,
  normalizeCustomSectionType,
} from '@/lib/templates/sections';
import { ResumeData, CustomSection } from '@/types/resume';

describe('Section Archetypes Taxonomy & Custom Types', () => {
  it('maps every available resume section to a valid archetype', () => {
    ALL_AVAILABLE_SECTIONS.forEach((secId) => {
      const archetype = getSectionArchetype(secId);
      expect(archetype).toBeDefined();
      expect(SECTION_ARCHETYPE_CONFIG[archetype]).toBeDefined();
      expect(SECTION_ARCHETYPE_CONFIG[archetype].badgeLabel).toBeTruthy();
    });
  });

  it('correctly classifies work history and roles as experience archetype', () => {
    expect(getSectionArchetype('experience')).toBe('experience');
    expect(getSectionArchetype('internships')).toBe('experience');
    expect(getSectionArchetype('volunteer')).toBe('experience');
    expect(getSectionArchetype('freelance')).toBe('experience');
    expect(getSectionArchetype('leadership')).toBe('experience');
    expect(getSectionArchetype('teaching')).toBe('experience');
    expect(getSectionArchetype('militaryService')).toBe('experience');
    expect(getSectionArchetype('research')).toBe('experience');
  });

  it('correctly classifies projects and showcases as project archetype', () => {
    expect(getSectionArchetype('projects')).toBe('project');
    expect(getSectionArchetype('portfolio')).toBe('project');
    expect(getSectionArchetype('openSource')).toBe('project');
    expect(getSectionArchetype('speaking')).toBe('project');
  });

  it('correctly classifies credentials, awards and licenses', () => {
    expect(getSectionArchetype('certifications')).toBe('credential');
    expect(getSectionArchetype('awards')).toBe('credential');
    expect(getSectionArchetype('achievements')).toBe('credential');
    expect(getSectionArchetype('licenses')).toBe('credential');
    expect(getSectionArchetype('courses')).toBe('credential');
    expect(getSectionArchetype('testScores')).toBe('credential');
    expect(getSectionArchetype('patents')).toBe('credential');
  });

  it('correctly classifies lists, skills and tags', () => {
    expect(getSectionArchetype('skills')).toBe('list');
    expect(getSectionArchetype('interests')).toBe('list');
    expect(getSectionArchetype('languages')).toBe('list');
  });

  it('correctly marks customSections as custom archetype', () => {
    expect(getSectionArchetype('customSections')).toBe('custom');
    expect(SECTION_ARCHETYPE_CONFIG.custom.badgeLabel).toBe('Selectable Type');
  });

  it('supports custom sections with diverse archetype types without naming conflict', () => {
    const customExperience: CustomSection = {
      id: 'custom-1',
      title: 'Advisory Engagements',
      type: 'custom_timeline',
      items: [
        {
          id: 'item-1',
          title: 'Strategic Advisor',
          subtitle: 'Acme AI',
          date: '2023 - Present',
          description: 'Provided guidance on agentic architecture',
          highlights: ['Helped scale product to 50k users'],
        },
      ],
    };

    const customProject: CustomSection = {
      id: 'custom-2',
      title: 'Open Source Tools',
      type: 'custom_showcase',
      items: [
        {
          id: 'item-2',
          title: 'CLI Scaffolder',
          subtitle: 'TypeScript, Node.js',
          link: 'https://github.com/example/scaffolder',
          date: '2024',
          description: 'Developer tooling for monorepos',
        },
      ],
    };

    const customList: CustomSection = {
      id: 'custom-3',
      title: 'DevOps Toolchain',
      type: 'custom_tags',
      items: [
        {
          id: 'item-3',
          title: 'Cloud Platforms',
          description: 'AWS, GCP, Kubernetes, Terraform, ArgoCD',
          items: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD'],
        },
      ],
    };

    const customText: CustomSection = {
      id: 'custom-4',
      title: 'Executive Philosophy',
      type: 'custom_statement',
      content: 'Dedicated to building high-velocity engineering organizations with a culture of autonomy and craft.',
      items: [],
    };

    const customReference: CustomSection = {
      id: 'custom-5',
      title: 'Executive References',
      type: 'custom_contacts',
      items: [
        {
          id: 'item-5',
          title: 'Dr. Jane Smith',
          subtitle: 'Chief Technology Officer',
          description: 'Venture Capital Partners',
          email: 'jane@example.com',
          phone: '+1 555-0192',
        },
      ],
    };

    expect(customExperience.type).toBe('custom_timeline');
    expect(customProject.type).toBe('custom_showcase');
    expect(customList.type).toBe('custom_tags');
    expect(customText.type).toBe('custom_statement');
    expect(customReference.type).toBe('custom_contacts');

    // Normalizer handles all 10 collision-free prefixed names and legacy aliases seamlessly
    expect(normalizeCustomSectionType('custom_timeline')).toBe('timeline');
    expect(normalizeCustomSectionType('experience')).toBe('timeline');
    expect(normalizeCustomSectionType('custom_showcase')).toBe('showcase');
    expect(normalizeCustomSectionType('project')).toBe('showcase');
    expect(normalizeCustomSectionType('custom_academic')).toBe('academic');
    expect(normalizeCustomSectionType('education')).toBe('academic');
    expect(normalizeCustomSectionType('custom_awards')).toBe('awards');
    expect(normalizeCustomSectionType('credential')).toBe('awards');
    expect(normalizeCustomSectionType('custom_publication')).toBe('publication');
    expect(normalizeCustomSectionType('publication')).toBe('publication');
    expect(normalizeCustomSectionType('custom_tags')).toBe('tags');
    expect(normalizeCustomSectionType('list')).toBe('tags');
    expect(normalizeCustomSectionType('custom_levels')).toBe('levels');
    expect(normalizeCustomSectionType('levels')).toBe('levels');
    expect(normalizeCustomSectionType('custom_metrics')).toBe('metrics');
    expect(normalizeCustomSectionType('metrics')).toBe('metrics');
    expect(normalizeCustomSectionType('custom_statement')).toBe('statement');
    expect(normalizeCustomSectionType('text')).toBe('statement');
    expect(normalizeCustomSectionType('custom_contacts')).toBe('contacts');
    expect(normalizeCustomSectionType('reference')).toBe('contacts');
  });
});

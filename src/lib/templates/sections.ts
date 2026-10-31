/**
 * @fileoverview Resume Template Sections & Taxonomy Constants
 * @description Standardized section identifiers, default column placements, and display titles.
 */

import { ResumeSectionId } from '@/types/resume';

/**
 * Standard section order for single-column resume templates.
 */
export const DEFAULT_SINGLE_COLUMN_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
];

/**
 * Default main column sections for two-column resume templates.
 */
export const DEFAULT_MAIN_COLUMN_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'projects',
];

/**
 * Default sidebar column sections for two-column resume templates.
 */
export const DEFAULT_SIDEBAR_COLUMN_SECTIONS: ResumeSectionId[] = [
  'skills',
  'education',
  'certifications',
  'languages',
];

/**
 * Canonical user-facing section headings.
 */
export const SECTION_TITLES: Record<ResumeSectionId, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills & Competencies',
  projects: 'Key Projects',
  certifications: 'Certifications',
  achievements: 'Key Achievements',
  awards: 'Honors & Awards',
  languages: 'Languages',
  volunteer: 'Volunteer Experience',
  publications: 'Publications',
  research: 'Research Experience',
  interests: 'Interests & Hobbies',
  references: 'References',
  courses: 'Courses & Training',
  internships: 'Internships',
  organizations: 'Organizations & Memberships',
  conferences: 'Conferences & Seminars',
  testScores: 'Test Scores',
  professionalLinks: 'Professional Links',
  socialLinks: 'Social Profiles',
  portfolio: 'Portfolio Showcase',
  freelance: 'Freelance Experience',
  leadership: 'Leadership & Governance',
  extracurricular: 'Extracurricular Activities',
  patents: 'Patents',
  openSource: 'Open Source Contributions',
  speaking: 'Speaking Engagements & Talks',
  teaching: 'Teaching & Mentorship',
  militaryService: 'Military Service',
  licenses: 'Licenses',
  customSections: 'Additional Information',
  declaration: 'Declaration',
};

/**
 * Section Archetype / Shape Classification
 * Unifies all 33 resume sections into intuitive structural types.
 */
export type SectionArchetype =
  | 'experience'
  | 'project'
  | 'academic'
  | 'credential'
  | 'list'
  | 'text'
  | 'reference'
  | 'custom';

export interface SectionArchetypeInfo {
  id: SectionArchetype;
  label: string;
  badgeLabel: string;
  badgeClass: string;
  description: string;
}

export const SECTION_ARCHETYPE_CONFIG: Record<SectionArchetype, SectionArchetypeInfo> = {
  experience: {
    id: 'experience',
    label: 'Experience & Roles',
    badgeLabel: 'Experience',
    badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Job titles, organizations, locations, employment dates & bullet points',
  },
  project: {
    id: 'project',
    label: 'Projects & Work',
    badgeLabel: 'Project',
    badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Project names, tech stack, external links, dates & accomplishments',
  },
  academic: {
    id: 'academic',
    label: 'Education & Degrees',
    badgeLabel: 'Education',
    badgeClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    description: 'Degrees, institutions, GPA, honors & graduation dates',
  },
  credential: {
    id: 'credential',
    label: 'Credentials & Honors',
    badgeLabel: 'Credential',
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: 'Certificates, awards, licenses, memberships & test scores',
  },
  list: {
    id: 'list',
    label: 'Lists & Tags',
    badgeLabel: 'List & Tags',
    badgeClass: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    description: 'Competency pills, comma-separated skill lists & interest tags',
  },
  text: {
    id: 'text',
    label: 'Text Statements',
    badgeLabel: 'Text Block',
    badgeClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    description: 'Narrative summaries, executive profiles & formal declarations',
  },
  reference: {
    id: 'reference',
    label: 'References & Contacts',
    badgeLabel: 'Reference',
    badgeClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    description: 'Professional referees, mentor contacts, companies & email/phone',
  },
  custom: {
    id: 'custom',
    label: 'Customizable Section',
    badgeLabel: 'Selectable Type',
    badgeClass: 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    description: 'User-created section with selectable form shape and layout',
  },
};

export const SECTION_ARCHETYPE_MAP: Record<ResumeSectionId, SectionArchetype> = {
  // Experience archetype
  experience: 'experience',
  internships: 'experience',
  volunteer: 'experience',
  freelance: 'experience',
  leadership: 'experience',
  teaching: 'experience',
  militaryService: 'experience',
  research: 'experience',
  extracurricular: 'experience',

  // Project archetype
  projects: 'project',
  portfolio: 'project',
  openSource: 'project',
  speaking: 'project',

  // Academic archetype
  education: 'academic',

  // Credential archetype
  certifications: 'credential',
  awards: 'credential',
  achievements: 'credential',
  licenses: 'credential',
  courses: 'credential',
  organizations: 'credential',
  testScores: 'credential',
  patents: 'credential',
  conferences: 'credential',
  publications: 'credential',

  // List & Tags archetype
  skills: 'list',
  interests: 'list',
  languages: 'list',
  professionalLinks: 'list',
  socialLinks: 'list',

  // Text Block archetype
  summary: 'text',
  declaration: 'text',

  // Reference archetype
  references: 'reference',

  // Custom
  customSections: 'custom',
};

export function getSectionArchetype(sectionId: ResumeSectionId): SectionArchetype {
  return SECTION_ARCHETYPE_MAP[sectionId] || 'custom';
}

/**
 * Normalizes any custom section type identifier (including legacy aliases)
 * to a collision-free standardized format.
 */
export function normalizeCustomSectionType(
  type?: string
):
  | 'timeline'
  | 'showcase'
  | 'academic'
  | 'awards'
  | 'publication'
  | 'tags'
  | 'levels'
  | 'metrics'
  | 'statement'
  | 'contacts' {
  switch (type) {
    case 'custom_showcase':
    case 'project':
      return 'showcase';
    case 'custom_academic':
    case 'education':
      return 'academic';
    case 'custom_awards':
    case 'credential':
      return 'awards';
    case 'custom_publication':
    case 'publication':
      return 'publication';
    case 'custom_tags':
    case 'list':
      return 'tags';
    case 'custom_levels':
    case 'levels':
      return 'levels';
    case 'custom_metrics':
    case 'metrics':
      return 'metrics';
    case 'custom_statement':
    case 'text':
      return 'statement';
    case 'custom_contacts':
    case 'reference':
      return 'contacts';
    case 'custom_timeline':
    case 'experience':
    default:
      return 'timeline';
  }
}

/**
 * Structural definition for template column allocation and layout fractions.
 */
export interface TemplateColumnContract {
  mainSections: ResumeSectionId[];
  sidebarSections: ResumeSectionId[];
  summaryPlacement: 'main' | 'sidebar' | 'headerBanner';
  mainFraction: number;
  sidebarFraction: number;
  sidebarPosition?: 'left' | 'right';
}

/**
 * Comprehensive catalog of all supported resume section identifiers.
 */
export const ALL_AVAILABLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'achievements',
  'awards',
  'languages',
  'volunteer',
  'publications',
  'research',
  'interests',
  'references',
  'courses',
  'internships',
  'organizations',
  'conferences',
  'testScores',
  'professionalLinks',
  'socialLinks',
  'portfolio',
  'freelance',
  'leadership',
  'extracurricular',
  'patents',
  'openSource',
  'speaking',
  'teaching',
  'militaryService',
  'licenses',
  'customSections',
  'declaration',
];

/**
 * Standard active sections pre-populated for new resumes.
 */
export const DEFAULT_ACTIVE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'leadership',
  'awards',
  'languages',
];

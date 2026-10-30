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

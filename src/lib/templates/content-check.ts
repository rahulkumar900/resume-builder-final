/**
 * @fileoverview Multi-Page Content Consistency & Column Detection
 * @description Detects whether columns contain renderable content, enforcing
 * consistent two-column grids across multi-page resume exports.
 */

import { ResumeData, ResumeSectionId } from '@/types/resume';
import { getTemplateLayout } from './ordering';

/**
 * Determines whether the given page dataset contains active, renderable content in the sidebar.
 * Adheres to Strict Multi-Page Layout Consistency: keeps the two-column grid intact across
 * all pages of a two-column resume rather than jarringly collapsing to full width on Page 2+.
 */
export const hasPageSidebarContent = (
  data: ResumeData,
  sidebarOrder?: ResumeSectionId[]
): boolean => {
  // If precomputed across the multi-page resume, enforce strict multi-page consistency
  if (data.hasSidebarContent !== undefined) {
    return data.hasSidebarContent;
  }

  // If this is a paginated page in a double-column template, maintain 2-column consistency
  if (data.pageNumber && data.pageNumber > 1 && data.templateId) {
    const layout = getTemplateLayout(data.templateId);
    if (layout === 'double') {
      return true;
    }
  }

  if (!sidebarOrder || sidebarOrder.length === 0) {
    return false;
  }

  return sidebarOrder.some((secId) => {
    switch (secId) {
      case 'summary':
        return !!data.personalInfo?.summary?.trim();
      case 'experience':
        return Array.isArray(data.experience) && data.experience.length > 0;
      case 'education':
        return Array.isArray(data.education) && data.education.length > 0;
      case 'skills':
        return Array.isArray(data.skills) && data.skills.length > 0;
      case 'projects':
        return Array.isArray(data.projects) && data.projects.length > 0;
      case 'certifications':
        return Array.isArray(data.certifications) && data.certifications.length > 0;
      case 'languages':
        return Array.isArray(data.languages) && data.languages.length > 0;
      case 'volunteer':
        return Array.isArray(data.volunteer) && data.volunteer.length > 0;
      case 'awards':
        return Array.isArray(data.awards) && data.awards.length > 0;
      case 'achievements':
        return Array.isArray(data.achievements) && data.achievements.length > 0;
      case 'publications':
        return Array.isArray(data.publications) && data.publications.length > 0;
      case 'research':
        return Array.isArray(data.research) && data.research.length > 0;
      case 'interests':
        return Array.isArray(data.interests) && data.interests.length > 0;
      case 'references':
        return Array.isArray(data.references) && data.references.length > 0;
      case 'courses':
        return Array.isArray(data.courses) && data.courses.length > 0;
      case 'organizations':
        return Array.isArray(data.organizations) && data.organizations.length > 0;
      case 'customSections':
        return Array.isArray(data.customSections) && data.customSections.length > 0;
      default: {
        const val = (data as any)[secId];
        return Array.isArray(val) ? val.length > 0 : !!val;
      }
    }
  });
};

/**
 * Determines whether the given page dataset contains active, renderable content in the main column.
 */
export const hasPageMainContent = (
  data: ResumeData,
  mainOrder?: ResumeSectionId[]
): boolean => {
  if (data.hasMainContent !== undefined) {
    return data.hasMainContent;
  }

  if (data.pageNumber && data.pageNumber > 1 && data.templateId) {
    return true;
  }

  if (!mainOrder || mainOrder.length === 0) {
    return false;
  }

  return mainOrder.some((secId) => {
    switch (secId) {
      case 'summary':
        return !!data.personalInfo?.summary?.trim();
      case 'experience':
        return Array.isArray(data.experience) && data.experience.length > 0;
      case 'education':
        return Array.isArray(data.education) && data.education.length > 0;
      case 'skills':
        return Array.isArray(data.skills) && data.skills.length > 0;
      case 'projects':
        return Array.isArray(data.projects) && data.projects.length > 0;
      case 'certifications':
        return Array.isArray(data.certifications) && data.certifications.length > 0;
      case 'languages':
        return Array.isArray(data.languages) && data.languages.length > 0;
      case 'volunteer':
        return Array.isArray(data.volunteer) && data.volunteer.length > 0;
      case 'awards':
        return Array.isArray(data.awards) && data.awards.length > 0;
      case 'achievements':
        return Array.isArray(data.achievements) && data.achievements.length > 0;
      case 'publications':
        return Array.isArray(data.publications) && data.publications.length > 0;
      case 'research':
        return Array.isArray(data.research) && data.research.length > 0;
      case 'interests':
        return Array.isArray(data.interests) && data.interests.length > 0;
      case 'references':
        return Array.isArray(data.references) && data.references.length > 0;
      case 'courses':
        return Array.isArray(data.courses) && data.courses.length > 0;
      case 'organizations':
        return Array.isArray(data.organizations) && data.organizations.length > 0;
      case 'customSections':
        return Array.isArray(data.customSections) && data.customSections.length > 0;
      default: {
        const val = (data as any)[secId];
        return Array.isArray(val) ? val.length > 0 : !!val;
      }
    }
  });
};


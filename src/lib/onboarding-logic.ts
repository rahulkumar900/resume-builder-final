import { TemplateId, ResumeSectionId } from '@/types/resume';

export const getRecommendedTemplates = (role: string): TemplateId[] => {
  const normalizedRole = role.toLowerCase();
  
  if (normalizedRole.includes('design') || normalizedRole.includes('ui') || normalizedRole.includes('ux') || normalizedRole.includes('creative') || normalizedRole.includes('art')) {
    return ['chastain', 'santoso', 'rahadian'];
  }
  
  if (normalizedRole.includes('frontend') || normalizedRole.includes('developer') || normalizedRole.includes('engineer') || normalizedRole.includes('software')) {
    return ['prawira', 'silicon', 'stockholm'];
  }
  
  if (normalizedRole.includes('data') || normalizedRole.includes('analyst') || normalizedRole.includes('finance') || normalizedRole.includes('manager') || normalizedRole.includes('executive')) {
    return ['ats', 'vienna', 'dublin', 'madrid'];
  }
  
  // Default recommendations for general roles
  return ['prawira', 'chastain', 'sydney'];
};

export const getDynamicSections = (
  role: string,
  experienceLevel: 'entry' | 'experienced' | 'mid' | 'senior',
  experienceYears?: string
) => {
  const normalizedRole = role.toLowerCase();
  
  let singleColumn: ResumeSectionId[] = [];
  let mainColumn: ResumeSectionId[] = [];
  let sidebarColumn: ResumeSectionId[] = [];

  const isCreative = normalizedRole.includes('design') || normalizedRole.includes('ui') || normalizedRole.includes('ux');
  const isTech = normalizedRole.includes('engineer') || normalizedRole.includes('developer') || normalizedRole.includes('data');

  if (experienceLevel === 'entry' || experienceYears === '0-1') {
    // Fresher / Entry Level: Education & Projects in top spots; Internships instead of Work Experience
    if (isTech) {
      singleColumn = ['summary', 'education', 'projects', 'skills', 'internships', 'certifications', 'languages'];
      mainColumn = ['summary', 'education', 'projects', 'internships'];
      sidebarColumn = ['skills', 'certifications', 'languages'];
    } else {
      singleColumn = ['summary', 'education', 'projects', 'skills', 'internships', 'certifications', 'languages'];
      mainColumn = ['summary', 'education', 'projects', 'internships'];
      sidebarColumn = ['skills', 'certifications', 'languages'];
    }
  } else {
    // Experienced Professional: Experience first, then Skills & Projects, Education at bottom
    if (isCreative) {
      singleColumn = ['summary', 'experience', 'projects', 'skills', 'education', 'awards', 'languages'];
      mainColumn = ['summary', 'experience', 'projects'];
      sidebarColumn = ['skills', 'education', 'awards', 'languages'];
    } else {
      singleColumn = ['summary', 'experience', 'skills', 'projects', 'education', 'certifications', 'languages'];
      mainColumn = ['summary', 'experience', 'projects'];
      sidebarColumn = ['skills', 'education', 'certifications', 'languages'];
    }
  }

  return { singleColumn, mainColumn, sidebarColumn };
};

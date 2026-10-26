import {
  ResumeData,
  TemplateId,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  SectionOrderConfig,
  ResumeSectionId,
} from '@/types/resume';
import { getDefaultSectionOrder, getTemplateSignatureFont } from '@/lib/templates';

export interface TransformOptions {
  id?: string;
  extracted: any;
  templateId?: TemplateId;
  targetRole?: string;
  themeColor?: string;
  selectedSections?: string[];
  candidateName?: string;
  targetJob?: {
    title?: string;
    company?: string;
    jobDescription?: string;
  };
}

/**
 * Transforms any raw AI extraction output into a 100% compliant ResumeData object
 * matching the builder editor's exact schema.
 */
export function transformExtractedToResumeData(options: TransformOptions): ResumeData {
  const {
    id = `resume-${Date.now()}`,
    extracted,
    templateId = 'ats',
    targetRole = 'Professional',
    themeColor = '#2563eb',
    selectedSections,
    candidateName,
  } = options;

  const rawData = extracted?.resumeData || extracted || {};
  const rawPersonal = rawData.personalInfo || rawData.personal || {};

  // 1. Normalize Personal Info
  const fullName =
    candidateName ||
    rawPersonal.fullName ||
    (rawPersonal.firstName || rawPersonal.lastName
      ? `${rawPersonal.firstName || ''} ${rawPersonal.lastName || ''}`.trim()
      : '') ||
    'Your Name';

  const jobTitle =
    rawPersonal.jobTitle ||
    rawPersonal.title ||
    rawPersonal.role ||
    targetRole ||
    'Professional';

  const personalInfo: PersonalInfo = {
    fullName,
    jobTitle,
    email: rawPersonal.email || '',
    phone: rawPersonal.phone || '',
    location: rawPersonal.location || '',
    website: rawPersonal.website || rawPersonal.portfolio || rawPersonal.link || '',
    linkedin: rawPersonal.linkedin || '',
    github: rawPersonal.github || '',
    avatarUrl: rawPersonal.avatarUrl || '',
    summary:
      rawPersonal.summary ||
      rawPersonal.professionalSummary ||
      rawPersonal.bio ||
      rawData.summary ||
      '',
  };

  // 2. Normalize Experience Items
  const rawExperience = Array.isArray(rawData.experience)
    ? rawData.experience
    : Array.isArray(rawData.work)
    ? rawData.work
    : Array.isArray(rawData.workExperience)
    ? rawData.workExperience
    : [];

  const experience: ExperienceItem[] = rawExperience.map((item: any, idx: number) => {
    const highlights: string[] = Array.isArray(item.highlights)
      ? item.highlights
      : Array.isArray(item.bullets)
      ? item.bullets
      : item.description
      ? [item.description]
      : [];

    const isCurrent =
      Boolean(item.current) ||
      /present|current|now/i.test(item.endDate || '') ||
      !item.endDate;

    return {
      id: item.id || `exp-${idx}-${Date.now()}`,
      role: item.role || item.title || item.jobTitle || 'Position',
      company: item.company || item.organization || item.employer || 'Company',
      location: item.location || '',
      startDate: item.startDate || item.start || '',
      endDate: item.endDate || (isCurrent ? 'Present' : ''),
      current: isCurrent,
      highlights,
    };
  });

  // 3. Normalize Education Items
  const rawEducation = Array.isArray(rawData.education)
    ? rawData.education
    : Array.isArray(rawData.academic)
    ? rawData.academic
    : [];

  const education: EducationItem[] = rawEducation.map((item: any, idx: number) => {
    return {
      id: item.id || `edu-${idx}-${Date.now()}`,
      degree:
        item.degree ||
        (item.fieldOfStudy ? `Degree in ${item.fieldOfStudy}` : 'Degree'),
      school:
        item.school ||
        item.institution ||
        item.university ||
        item.college ||
        'Institution',
      location: item.location || '',
      graduationDate:
        item.graduationDate ||
        item.endDate ||
        item.year ||
        item.date ||
        item.startDate ||
        '',
      gpa: item.gpa || item.score || item.grade || '',
      highlights: Array.isArray(item.highlights)
        ? item.highlights
        : item.fieldOfStudy
        ? [item.fieldOfStudy]
        : [],
    };
  });

  // 4. Normalize Skills
  const rawSkills = rawData.skills;
  let skills: SkillCategory[] = [];

  if (Array.isArray(rawSkills)) {
    skills = rawSkills.map((cat: any, idx: number) => {
      if (typeof cat === 'string') {
        return {
          id: `sk-${idx}-${Date.now()}`,
          category: 'Skills',
          items: [cat],
        };
      }
      return {
        id: cat.id || `sk-${idx}-${Date.now()}`,
        category: cat.category || cat.name || 'Core Skills',
        items: Array.isArray(cat.items)
          ? cat.items
          : Array.isArray(cat.skills)
          ? cat.skills
          : [],
      };
    });
  } else if (rawSkills && typeof rawSkills === 'object') {
    skills = Object.entries(rawSkills).map(([catName, items], idx) => ({
      id: `sk-${idx}-${Date.now()}`,
      category: catName.charAt(0).toUpperCase() + catName.slice(1),
      items: Array.isArray(items) ? (items as string[]) : [String(items)],
    }));
  }

  // 5. Normalize Projects
  const rawProjects = Array.isArray(rawData.projects) ? rawData.projects : [];
  const projects: ProjectItem[] = rawProjects.map((item: any, idx: number) => ({
    id: item.id || `proj-${idx}-${Date.now()}`,
    title: item.title || item.name || 'Project',
    link: item.link || item.url || '',
    technologies: Array.isArray(item.technologies)
      ? item.technologies
      : Array.isArray(item.tech)
      ? item.tech
      : [],
    highlights: Array.isArray(item.highlights)
      ? item.highlights
      : item.description
      ? [item.description]
      : [],
  }));

  // 6. Normalize Certifications
  const rawCerts = Array.isArray(rawData.certifications)
    ? rawData.certifications
    : Array.isArray(rawData.certificates)
    ? rawData.certificates
    : [];

  const certifications: CertificationItem[] = rawCerts.map((item: any, idx: number) => ({
    id: item.id || `cert-${idx}-${Date.now()}`,
    name: item.name || item.title || 'Certification',
    issuer: item.issuer || item.organization || item.authority || '',
    date: item.date || item.year || '',
    url: item.url || item.link || '',
  }));

  // 7. Normalize Languages
  const rawLanguages = Array.isArray(rawData.languages) ? rawData.languages : [];
  const languages: LanguageItem[] = rawLanguages.map((item: any, idx: number) => ({
    id: item.id || `lang-${idx}-${Date.now()}`,
    language: item.language || item.name || 'Language',
    proficiency: item.proficiency || item.level || 'Professional',
  }));

  // 8. Dynamic Section Ordering based on template layout and user selections
  const detectedExperienceLevel: 'entry' | 'mid' | 'senior' | 'experienced' =
    rawData.experienceLevel || (experience.length === 0 && education.length > 0 ? 'entry' : 'experienced');

  const baseOrder = getDefaultSectionOrder(templateId, true, detectedExperienceLevel);
  const activeSectionsSet = selectedSections
    ? new Set(selectedSections)
    : new Set<string>([
        'personal',
        'summary',
        'experience',
        'education',
        'skills',
        'projects',
        'certifications',
        'languages',
      ]);

  const filterColumn = (col?: ResumeSectionId[]): ResumeSectionId[] | undefined => {
    if (!col) return undefined;
    return col.filter((secId) => {
      if (secId === 'summary') return true;
      return activeSectionsSet.has(secId);
    });
  };

  const sectionOrder: SectionOrderConfig = {
    singleColumn: filterColumn(baseOrder.singleColumn),
    mainColumn: filterColumn(baseOrder.mainColumn),
    sidebarColumn: filterColumn(baseOrder.sidebarColumn),
  };

  if (sectionOrder.mainColumn && sectionOrder.mainColumn.length === 0) {
    sectionOrder.mainColumn = detectedExperienceLevel === 'entry' ? ['education', 'projects'] : ['experience', 'education'];
  }

  // 9. Assemble Complete ResumeData
  const resumeData: ResumeData = {
    id,
    title: `${jobTitle} Resume`,
    status: 'completed',
    updatedAt: 'Just now',
    templateId,
    themeColor,
    fontFamily: getTemplateSignatureFont(templateId),
    spacing: 'normal',
    experienceLevel: detectedExperienceLevel,
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    sectionOrder,
    volunteer: Array.isArray(rawData.volunteer) ? rawData.volunteer : [],
    publications: Array.isArray(rawData.publications) ? rawData.publications : [],
    awards: Array.isArray(rawData.awards) ? rawData.awards : [],
    courses: Array.isArray(rawData.courses) ? rawData.courses : [],
    interests: Array.isArray(rawData.interests) ? rawData.interests : [],
    references: Array.isArray(rawData.references) ? rawData.references : [],
    targetJob: options.targetJob,
  };

  return resumeData;
}

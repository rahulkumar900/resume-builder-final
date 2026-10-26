import { ResumeData } from '@/types/resume';
import { SectionKey } from '@/types/builder';

/**
 * Calculates completion percentage (0 - 100) for an individual resume section
 * based strictly on the number and validity of mandatory fields.
 * If no content is filled, it strictly returns 0.
 */
export function calculateSectionProgress(
  key: SectionKey | 'all' | 'review',
  resume: ResumeData
): number {
  if (key === 'all' || key === 'review') {
    return calculateOverallCompleteness(resume);
  }

  switch (key) {
    case 'personal': {
      const p = resume.personalInfo;
      if (!p) return 0;

      // Mandatory fields for Basics:
      // 1. Full Name (30%)
      // 2. Headline / Job Title (20%)
      // 3. Email (20%)
      // 4. Phone (15%)
      // 5. Location (15%)
      let score = 0;
      if (p.fullName && p.fullName.trim().length > 0) score += 30;
      if (p.jobTitle && p.jobTitle.trim().length > 0) score += 20;
      if (p.email && p.email.trim().length > 0) score += 20;
      if (p.phone && p.phone.trim().length > 0) score += 15;
      if (p.location && p.location.trim().length > 0) score += 15;

      return score;
    }

    case 'education': {
      const list = resume.education;
      if (!list || list.length === 0) return 0;

      // Mandatory fields per education entry:
      // 1. Degree (40%)
      // 2. School / University (40%)
      // 3. Graduation Date / Year (20%)
      const scores = list.map((item) => {
        let s = 0;
        if (item.degree && item.degree.trim().length > 0) s += 40;
        if (item.school && item.school.trim().length > 0) s += 40;
        if (item.graduationDate && item.graduationDate.trim().length > 0) s += 20;
        return s;
      });

      if (scores.length === 0) return 0;
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'experience': {
      const list = resume.experience;
      if (!list || list.length === 0) return 0;

      // Mandatory fields per experience entry:
      // 1. Role / Job Title (30%)
      // 2. Company / Employer (30%)
      // 3. Start Date or Dates (20%)
      // 4. Accomplishment Bullet / Description (20%)
      const scores = list.map((item) => {
        let s = 0;
        if (item.role && item.role.trim().length > 0) s += 30;
        if (item.company && item.company.trim().length > 0) s += 30;
        if ((item.startDate && item.startDate.trim().length > 0) || (item.endDate && item.endDate.trim().length > 0)) {
          s += 20;
        }
        const hasBullet =
          item.highlights &&
          item.highlights.some((h) => h.replace(/<[^>]*>/g, '').trim().length > 0);
        if (hasBullet) s += 20;
        return s;
      });

      if (scores.length === 0) return 0;
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'skills': {
      const list = resume.skills;
      if (!list || list.length === 0) return 0;

      // Mandatory: Skills must contain non-empty keywords
      const totalSkills = list.reduce(
        (sum, cat) => sum + (cat.items?.filter((it) => it && it.trim().length > 0)?.length || 0),
        0
      );

      if (totalSkills === 0) return 0;
      // 1 skill = 20%, 2 = 40%, 3 = 60%, 4 = 80%, 5+ = 100%
      return Math.min(100, totalSkills * 20);
    }

    case 'projects': {
      const list = resume.projects;
      if (!list || list.length === 0) return 0;

      // Mandatory fields per project:
      // 1. Title (40%)
      // 2. Description or Highlights (40%)
      // 3. Technologies or Link (20%)
      const scores = list.map((item) => {
        let s = 0;
        if (item.title && item.title.trim().length > 0) s += 40;
        const hasDesc =
          item.highlights &&
          item.highlights.some((h) => h.replace(/<[^>]*>/g, '').trim().length > 0);
        if (hasDesc) s += 40;
        if (
          (item.technologies && item.technologies.some((t) => t && t.trim().length > 0)) ||
          (item.link && item.link.trim().length > 0)
        ) {
          s += 20;
        }
        return s;
      });

      if (scores.length === 0) return 0;
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'certifications': {
      const list = resume.certifications;
      if (!list || list.length === 0) return 0;

      // Mandatory: Name (60%), Issuer (40%)
      const scores = list.map((item) => {
        let s = 0;
        if (item.name && item.name.trim().length > 0) s += 60;
        if (item.issuer && item.issuer.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'languages': {
      const list = resume.languages;
      if (!list || list.length === 0) return 0;

      // Mandatory: Language (60%), Proficiency (40%)
      const scores = list.map((item) => {
        let s = 0;
        if (item.language && item.language.trim().length > 0) s += 60;
        if (item.proficiency && item.proficiency.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'internships': {
      const list = resume.internships;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if ((item.role && item.role.trim().length > 0) || (item.title && item.title.trim().length > 0)) s += 40;
        if (item.company && item.company.trim().length > 0) s += 40;
        if (
          (item.startDate && item.startDate.trim().length > 0) ||
          (item.highlights && item.highlights.length > 0) ||
          (item.description && item.description.trim().length > 0)
        ) {
          s += 20;
        }
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'volunteer': {
      const list = resume.volunteer;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.role && item.role.trim().length > 0) s += 40;
        if (item.organization && item.organization.trim().length > 0) s += 40;
        if (
          (item.startDate && item.startDate.trim().length > 0) ||
          (item.highlights && item.highlights.length > 0)
        ) {
          s += 20;
        }
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'awards': {
      const list = resume.awards;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.title && item.title.trim().length > 0) s += 60;
        if (item.issuer && item.issuer.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'achievements': {
      const list = resume.achievements;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.title && item.title.trim().length > 0) s += 50;
        if (item.description && item.description.trim().length > 0) s += 50;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'publications': {
      const list = resume.publications;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.title && item.title.trim().length > 0) s += 60;
        if (item.publisher && item.publisher.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'courses': {
      const list = resume.courses;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.name && item.name.trim().length > 0) s += 60;
        if (item.institution && item.institution.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'licenses': {
      const list = resume.licenses;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.name && item.name.trim().length > 0) s += 60;
        if (item.issuingAuthority && item.issuingAuthority.trim().length > 0) s += 40;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'organizations': {
      const list = resume.organizations;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.name && item.name.trim().length > 0) s += 50;
        if (item.role && item.role.trim().length > 0) s += 50;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'testScores': {
      const list = resume.testScores;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.testName && item.testName.trim().length > 0) s += 50;
        if (item.score && item.score.trim().length > 0) s += 50;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'references': {
      const list = resume.references;
      if (!list || list.length === 0) return 0;

      const scores = list.map((item) => {
        let s = 0;
        if (item.name && item.name.trim().length > 0) s += 40;
        if (item.position && item.position.trim().length > 0) s += 30;
        if (item.company && item.company.trim().length > 0) s += 30;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    case 'customSections': {
      const list = resume.customSections;
      if (!list || list.length === 0) return 0;

      const scores = list.map((sec) => {
        let s = 0;
        if (sec.title && sec.title.trim().length > 0) s += 40;
        const validItems = (sec.items || []).filter(
          (it) => (it.title && it.title.trim().length > 0) || (it.highlights && it.highlights.length > 0)
        );
        if (validItems.length > 0) s += 60;
        return s;
      });

      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }

    default: {
      const raw = (resume as any)[key];
      if (!raw || !Array.isArray(raw) || raw.length === 0) return 0;

      const scores = raw.map((item: any) => {
        if (!item || typeof item !== 'object') return 0;
        const filledValues = Object.entries(item).filter(
          ([k, v]) => k !== 'id' && typeof v === 'string' && v.trim().length > 0
        );
        if (filledValues.length === 0) return 0;
        if (filledValues.length >= 2) return 100;
        return 50;
      });

      const avg = Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
      return Math.min(100, Math.max(0, avg));
    }
  }
}

/**
 * Calculates overall completeness of a resume based on standard ATS expectations.
 */
export function calculateOverallCompleteness(resume: ResumeData): number {
  let score = 0;
  const p = resume.personalInfo;
  const isFresher = resume.experienceLevel === 'entry';

  // 1. Personal Details (20-25% total)
  if (p?.fullName?.trim()) score += 7;
  if (p?.jobTitle?.trim()) score += 5;
  if (p?.email?.trim()) score += 4;
  if (p?.phone?.trim() || p?.location?.trim()) score += 4;
  const cleanSummary = (p?.summary || '').replace(/<[^>]*>/g, '').trim();
  if (cleanSummary.length > 20) score += 5;

  if (isFresher) {
    const validEdu = (resume.education || []).filter(
      (e) => e.school?.trim() || e.degree?.trim()
    );
    if (validEdu.length > 0) score += 25;

    const validProj = (resume.projects || []).filter((pr) => pr.title?.trim());
    if (validProj.length > 0) score += 25;

    const totalSkills = (resume.skills || []).reduce(
      (acc, cat) => acc + (cat.items?.length || 0),
      0
    );
    if (totalSkills >= 5) score += 20;
    else if (totalSkills >= 2) score += 12;
    else if (totalSkills > 0) score += 6;

    const validInt = (resume.internships || []).filter(
      (i) => i.role?.trim() || i.company?.trim()
    );
    if (validInt.length > 0) score += 5;
  } else {
    const validExp = (resume.experience || []).filter(
      (e) => e.role?.trim() || e.company?.trim()
    );
    if (validExp.length > 0) {
      score += 15;
      const hasHighlights = validExp.some(
        (e) => e.highlights && e.highlights.length > 0 && e.highlights.some((h) => h.trim().length > 0)
      );
      if (hasHighlights) score += 10;
    }

    const validEdu = (resume.education || []).filter(
      (e) => e.school?.trim() || e.degree?.trim()
    );
    if (validEdu.length > 0) score += 15;

    const totalSkills = (resume.skills || []).reduce(
      (acc, cat) => acc + (cat.items?.length || 0),
      0
    );
    if (totalSkills >= 5) score += 15;
    else if (totalSkills >= 2) score += 10;
    else if (totalSkills > 0) score += 5;

    const validProj = (resume.projects || []).filter((pr) => pr.title?.trim());
    if (validProj.length > 0) score += 10;
  }

  const hasCerts = (resume.certifications || []).length > 0;
  const hasLangs = (resume.languages || []).length > 0;
  if (hasCerts) score += 5;
  if (hasLangs) score += 5;

  return Math.min(100, score);
}

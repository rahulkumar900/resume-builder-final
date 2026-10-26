import { ResumeData, SkillCategory, ResumeSectionId } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { stripHtml } from './ats-constants';
import { matchJobDescriptionKeywords, KeywordMatchResult } from './keyword-matcher';
import { extractMetrics } from './ats-analyzer';

export interface MandatorySectionCheck {
  id: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications';
  name: string;
  sectionKey: SectionKey;
  status: 'passed' | 'warning' | 'missing';
  score: number; // 0 - 100%
  isRequiredByJd: boolean;
  missingItems: string[];
  recommendation: string;
}

export interface JdRequirementItem {
  id: string;
  label: string;
  category: 'experience' | 'education' | 'role_title' | 'certification' | 'portfolio' | 'metrics';
  expected: string; // e.g. "3+ years of experience"
  actual: string; // e.g. "4 years in resume"
  status: 'matched' | 'partial' | 'missing';
  importance: 'mandatory' | 'preferred';
  detail: string;
  recommendation?: string;
  sectionKey?: SectionKey;
}

export interface JdAnalysisReport {
  overallScore: number; // 0 - 100 weighted
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  verdict: string;
  verdictDescription: string;

  breakdown: {
    skillsMatch: { score: number; weight: number; matchedCount: number; missingCount: number };
    mandatorySections: { score: number; weight: number; passedCount: number; totalCount: number };
    experienceAlignment: { score: number; weight: number; requiredYears: number | null; actualYears: number };
    educationAlignment: { score: number; weight: number; requiredDegree: string | null; actualDegree: string | null };
    impactAndRequirements: { score: number; weight: number; metricsCount: number; linksFound: boolean };
  };

  mandatorySections: MandatorySectionCheck[];
  jdRequirements: JdRequirementItem[];
  keywordMatch: KeywordMatchResult;

  actionItems: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
    category: string;
    sectionKey?: SectionKey;
  }>;
}

// Known industry certifications to look for in JD
const KNOWN_CERTIFICATIONS = [
  { name: 'AWS Certified Solutions Architect', pattern: /aws\s+certified\s+(?:solutions\s+architect|developer|sysops|devops)/i },
  { name: 'AWS Certified', pattern: /aws\s+certif(?:ied|ication)/i },
  { name: 'Azure Certified', pattern: /azure\s+(?:solutions\s+architect|fundamentals|administrator|developer|certified)/i },
  { name: 'Google Cloud Certified (GCP)', pattern: /(?:gcp|google\s+cloud)\s+certif(?:ied|ication)/i },
  { name: 'Kubernetes (CKA / CKAD)', pattern: /\b(cka|ckad|cks|certified\s+kubernetes)\b/i },
  { name: 'PMP (Project Management)', pattern: /\bpmp\b|project\s+management\s+professional/i },
  { name: 'Scrum Master (CSM / PSM)', pattern: /\b(csm|psm|certified\s+scrum\s*master)\b/i },
  { name: 'CISSP / Security Certification', pattern: /\b(cissp|cisa|ceh|comptia\s+security\+?)\b/i },
  { name: 'CPA / CFA (Accounting & Finance)', pattern: /\b(cpa|cfa|acca)\b/i },
  { name: 'Salesforce Certified', pattern: /salesforce\s+certif(?:ied|ication)/i },
];

/**
 * Calculates candidate's approximate total years of professional experience.
 */
export function calculateCandidateExperienceYears(resume: ResumeData): number {
  const exps = resume.experience || [];
  if (exps.length === 0) return 0;

  let totalMonths = 0;
  exps.forEach((exp) => {
    if (exp.startDate) {
      const start = new Date(exp.startDate).getTime();
      const end = exp.current || !exp.endDate ? Date.now() : new Date(exp.endDate).getTime();
      if (!isNaN(start) && !isNaN(end) && end > start) {
        totalMonths += (end - start) / (1000 * 60 * 60 * 24 * 30.4375);
      } else {
        totalMonths += 12; // fallback 1 year per listed position
      }
    } else {
      totalMonths += 12;
    }
  });

  return Math.max(0, Math.round(totalMonths / 12));
}

/**
 * Extracts required years of experience from a Job Description.
 */
export function extractJdRequiredYears(jobDescription: string): { years: number | null; label: string | null } {
  if (!jobDescription) return { years: null, label: null };

  // Match expressions like "3+ years", "5-7 years", "minimum of 4 years", "at least 2 years"
  const patterns = [
    /(\d+)\+?\s*(?:to|-)\s*(\d+)?\s*years?(?:\s+of)?(?:\s+[a-z-]+){0,3}\s+experience/i,
    /(?:minimum|at least)\s+(?:of\s+)?(\d+)\+?\s*years?(?:\s+of)?(?:\s+[a-z-]+){0,3}\s+experience/i,
    /(\d+)\+?\s*years?(?:\s+of)?(?:\s+[a-z-]+){0,3}\s+experience/i,
    /experience:\s*(\d+)\+?\s*years?/i,
  ];

  for (const regex of patterns) {
    const match = jobDescription.match(regex);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > 0 && num <= 30) {
        return { years: num, label: `${num}+ years` };
      }
    }
  }

  // Check for entry level / fresher keywords
  if (/\b(?:fresher|campus\s+hire|entry[\s-]level|recent\s+graduate|no\s+experience\s+required)\b/i.test(jobDescription)) {
    return { years: 0, label: '0 years (Entry Level / Fresher)' };
  }

  return { years: null, label: null };
}

/**
 * Extracts educational degree requirement from JD.
 */
export function extractJdDegreeRequirement(jobDescription: string): { degree: string | null; importance: 'mandatory' | 'preferred' } {
  if (!jobDescription) return { degree: null, importance: 'preferred' };
  const jdLower = jobDescription.toLowerCase();

  const isMandatory = /(?:must have|required|minimum requirement|essential|mandatory).*(?:degree|bachelor|master|b\.tech|bs)/i.test(jobDescription);

  if (/\b(ph\.?d|doctorate)\b/i.test(jdLower)) {
    return { degree: "Ph.D. / Doctorate", importance: isMandatory ? 'mandatory' : 'preferred' };
  }
  if (/\b(master'?s?|m\.s\.|m\.tech|mba|post[\s-]graduate)\b/i.test(jdLower)) {
    return { degree: "Master's Degree (M.S. / M.Tech / MBA)", importance: isMandatory ? 'mandatory' : 'preferred' };
  }
  if (/\b(bachelor'?s?|b\.s\.|b\.tech|b\.e\.|undergraduate\s+degree|degree\s+in\s+computer\s+science)\b/i.test(jdLower)) {
    return { degree: "Bachelor's Degree (B.Tech / B.E. / B.S.)", importance: isMandatory ? 'mandatory' : 'preferred' };
  }
  if (/\b(associate'?s?|diploma)\b/i.test(jdLower)) {
    return { degree: "Associate Degree / Diploma", importance: isMandatory ? 'mandatory' : 'preferred' };
  }

  return { degree: null, importance: 'preferred' };
}

/**
 * Evaluates all mandatory sections of the resume.
 */
export function evaluateMandatorySections(
  resume: ResumeData,
  jobDescription?: string
): MandatorySectionCheck[] {
  const sections: MandatorySectionCheck[] = [];
  const p = resume.personalInfo;
  const jdText = jobDescription || '';
  const jdRequiresProjects = /\b(projects?|portfolio|github|showcase|code\s+samples)\b/i.test(jdText);
  const jdRequiresCertifications = KNOWN_CERTIFICATIONS.some((c) => c.pattern.test(jdText));

  // 1. Contact Information
  const contactMissing: string[] = [];
  let contactScore = 100;
  if (!p?.fullName || p.fullName.trim().length === 0) {
    contactMissing.push('Full Name');
    contactScore -= 30;
  }
  if (!p?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) {
    contactMissing.push('Valid Email Address');
    contactScore -= 25;
  }
  if (!p?.phone || p.phone.replace(/\D/g, '').length < 7) {
    contactMissing.push('Phone Number');
    contactScore -= 20;
  }
  if (!p?.location || p.location.trim().length === 0) {
    contactMissing.push('Location / City');
    contactScore -= 15;
  }
  if (!p?.jobTitle || p.jobTitle.trim().length === 0) {
    contactMissing.push('Professional Headline / Job Title');
    contactScore -= 10;
  }

  contactScore = Math.max(0, contactScore);
  sections.push({
    id: 'contact',
    name: 'Contact & Header Information',
    sectionKey: 'personal',
    status: contactMissing.length === 0 ? 'passed' : contactMissing.length <= 2 ? 'warning' : 'missing',
    score: contactScore,
    isRequiredByJd: true,
    missingItems: contactMissing,
    recommendation: contactMissing.length === 0
      ? 'All essential contact and header fields are complete.'
      : `Add missing contact info: ${contactMissing.join(', ')} so recruiters can reach you.`,
  });

  // 2. Professional Summary
  const summaryMissing: string[] = [];
  let summaryScore = 0;
  const summaryText = stripHtml(p?.summary || '');
  const summaryWords = summaryText.trim().split(/\s+/).filter(Boolean).length;

  if (summaryWords === 0) {
    summaryMissing.push('Professional Summary is completely empty');
    summaryScore = 0;
  } else if (summaryWords < 25) {
    summaryMissing.push(`Summary is too brief (${summaryWords} words, recommend 40-75 words)`);
    summaryScore = 50;
  } else {
    summaryScore = 100;
  }

  sections.push({
    id: 'summary',
    name: 'Professional Summary',
    sectionKey: 'personal',
    status: summaryScore === 100 ? 'passed' : summaryScore > 0 ? 'warning' : 'missing',
    score: summaryScore,
    isRequiredByJd: true,
    missingItems: summaryMissing,
    recommendation: summaryScore === 100
      ? 'Strong professional summary present.'
      : summaryScore > 0
      ? 'Expand your summary to highlight key skills and achievements relevant to this job.'
      : 'Add a 3-4 sentence summary tailoring your background to this target role.',
  });

  // 3. Work Experience
  const expMissing: string[] = [];
  let expScore = 0;
  const exps = resume.experience || [];

  if (exps.length === 0) {
    expMissing.push('No work experience entries listed');
    expScore = 0;
  } else {
    let validRoles = 0;
    let validBullets = 0;
    exps.forEach((exp, idx) => {
      const hasTitle = exp.role && exp.role.trim().length > 0;
      const hasCompany = exp.company && exp.company.trim().length > 0;
      const hasBullets = (exp.highlights && exp.highlights.some((h) => stripHtml(h).trim().length > 0)) ||
                         ((exp as any).description && stripHtml((exp as any).description).trim().length > 0);

      if (hasTitle && hasCompany) validRoles++;
      if (hasBullets) validBullets++;
      if (!hasBullets) {
        expMissing.push(`Role #${idx + 1} (${exp.role || 'Untitled'}) lacks bullet points`);
      }
    });

    const roleRatio = validRoles / exps.length;
    const bulletRatio = validBullets / exps.length;
    expScore = Math.round((roleRatio * 0.4 + bulletRatio * 0.6) * 100);
  }

  sections.push({
    id: 'experience',
    name: 'Work Experience & Highlights',
    sectionKey: 'experience',
    status: expScore >= 80 ? 'passed' : expScore > 0 ? 'warning' : 'missing',
    score: expScore,
    isRequiredByJd: true,
    missingItems: expMissing,
    recommendation: expScore >= 80
      ? 'Experience section is well-structured with descriptive roles.'
      : 'Add detailed bullet points with action verbs and quantifiable results for each role.',
  });

  // 4. Education
  const eduMissing: string[] = [];
  let eduScore = 0;
  const edus = resume.education || [];

  if (edus.length === 0) {
    eduMissing.push('No education credentials listed');
    eduScore = 0;
  } else {
    let validEdu = 0;
    edus.forEach((edu) => {
      if (edu.degree && edu.school) validEdu++;
    });
    eduScore = Math.round((validEdu / edus.length) * 100);
    if (eduScore < 100) {
      eduMissing.push('Some education items are missing degree or school name');
    }
  }

  sections.push({
    id: 'education',
    name: 'Education Credentials',
    sectionKey: 'education',
    status: eduScore === 100 ? 'passed' : eduScore > 0 ? 'warning' : 'missing',
    score: eduScore,
    isRequiredByJd: true,
    missingItems: eduMissing,
    recommendation: eduScore === 100
      ? 'Education credentials properly listed.'
      : 'Ensure every education entry specifies degree, university, and graduation year.',
  });

  // 5. Skills Section
  const skillsMissing: string[] = [];
  let skillsScore = 0;
  const skillsList = resume.skills || [];

  const totalSkillItems = skillsList.reduce((acc, cat) => {
    if (typeof cat === 'string') return acc + 1;
    return acc + (cat.items?.length || 0);
  }, 0);

  if (totalSkillItems === 0) {
    skillsMissing.push('Skills section is empty');
    skillsScore = 0;
  } else if (totalSkillItems < 5) {
    skillsMissing.push(`Only ${totalSkillItems} skills listed (recommend at least 6-10 skills)`);
    skillsScore = 50;
  } else {
    skillsScore = 100;
  }

  sections.push({
    id: 'skills',
    name: 'Technical & Domain Skills',
    sectionKey: 'skills',
    status: skillsScore === 100 ? 'passed' : skillsScore > 0 ? 'warning' : 'missing',
    score: skillsScore,
    isRequiredByJd: true,
    missingItems: skillsMissing,
    recommendation: skillsScore === 100
      ? 'Skills section contains adequate competencies.'
      : 'Add more key skills, programming languages, or domain tools requested in the JD.',
  });

  // 6. Projects (Mandatory if JD asks for projects/portfolio)
  if (jdRequiresProjects || (resume.projects && resume.projects.length > 0)) {
    const projMissing: string[] = [];
    let projScore = 0;
    const projs = resume.projects || [];
    if (projs.length === 0) {
      projMissing.push('JD explicitly emphasizes projects/portfolio, but none are listed');
      projScore = 0;
    } else {
      projScore = 100;
    }

    sections.push({
      id: 'projects',
      name: 'Key Projects & Portfolio',
      sectionKey: 'projects',
      status: projScore === 100 ? 'passed' : 'warning',
      score: projScore,
      isRequiredByJd: jdRequiresProjects,
      missingItems: projMissing,
      recommendation: projScore === 100
        ? 'Projects section is included.'
        : 'The Job Description requests projects or practical demonstrations. Add 1-2 notable projects.',
    });
  }

  // 7. Certifications (if mentioned in JD)
  if (jdRequiresCertifications || (resume.certifications && resume.certifications.length > 0)) {
    const certMissing: string[] = [];
    let certScore = 0;
    const certs = resume.certifications || [];
    if (certs.length === 0) {
      certMissing.push('JD mentions specialized professional certifications');
      certScore = 20;
    } else {
      certScore = 100;
    }

    sections.push({
      id: 'certifications',
      name: 'Certifications & Accreditations',
      sectionKey: 'certifications',
      status: certScore === 100 ? 'passed' : 'warning',
      score: certScore,
      isRequiredByJd: jdRequiresCertifications,
      missingItems: certMissing,
      recommendation: certScore === 100
        ? 'Certifications are listed.'
        : 'If you hold the certifications specified in the JD, add them to your Certifications section.',
    });
  }

  return sections;
}

/**
 * Extracts and audits specific requirements from the Job Description against the resume.
 */
export function auditJdRequirements(
  resume: ResumeData,
  jobDescription: string
): JdRequirementItem[] {
  if (!jobDescription || jobDescription.trim().length < 15) return [];

  const requirements: JdRequirementItem[] = [];
  const jdLower = jobDescription.toLowerCase();

  // 1. Years of Experience Requirement
  const { years: reqYears, label: reqYearsLabel } = extractJdRequiredYears(jobDescription);
  const actualYears = calculateCandidateExperienceYears(resume);

  if (reqYears !== null) {
    let status: 'matched' | 'partial' | 'missing' = 'matched';
    let detail = `Candidate has ~${actualYears} year${actualYears === 1 ? '' : 's'} of experience vs ${reqYearsLabel} required.`;

    if (actualYears >= reqYears) {
      status = 'matched';
      detail = `Meets or exceeds experience requirement (${actualYears} yrs vs ${reqYearsLabel}).`;
    } else if (actualYears >= reqYears - 1) {
      status = 'partial';
      detail = `Slightly below requirement (${actualYears} yrs vs ${reqYearsLabel}). Highlight high-impact projects or leadership to compensate.`;
    } else {
      status = 'missing';
      detail = `Candidate has ~${actualYears} yrs vs ${reqYearsLabel} specified in the JD. High risk of ATS filtering for experience.`;
    }

    requirements.push({
      id: 'req-exp-years',
      label: 'Years of Professional Experience',
      category: 'experience',
      expected: reqYearsLabel || `${reqYears}+ years`,
      actual: `${actualYears} year${actualYears === 1 ? '' : 's'}`,
      status,
      importance: 'mandatory',
      detail,
      sectionKey: 'experience',
      recommendation: status !== 'matched'
        ? 'Emphasize relevant project work, internships, or freelance experience to demonstrate depth.'
        : undefined,
    });
  }

  // 2. Degree / Educational Qualification Requirement
  const { degree: reqDegree, importance: eduImportance } = extractJdDegreeRequirement(jobDescription);
  const edus = resume.education || [];
  const candidateDegree = edus.length > 0 ? edus[0].degree || 'Listed' : 'None listed';

  if (reqDegree) {
    let status: 'matched' | 'partial' | 'missing' = 'missing';
    let detail = `JD expects ${reqDegree}.`;

    if (edus.length > 0) {
      const allDegrees = edus.map((e) => (e.degree || '').toLowerCase()).join(' ');
      if (reqDegree.includes("Ph.D.") && (allDegrees.includes('phd') || allDegrees.includes('ph.d') || allDegrees.includes('doctorate'))) {
        status = 'matched';
      } else if (reqDegree.includes("Master's") && (allDegrees.includes('master') || allDegrees.includes('ms') || allDegrees.includes('m.tech') || allDegrees.includes('mba'))) {
        status = 'matched';
      } else if (reqDegree.includes("Bachelor's") && (allDegrees.includes('bachelor') || allDegrees.includes('b.tech') || allDegrees.includes('b.e') || allDegrees.includes('bs') || allDegrees.includes('degree'))) {
        status = 'matched';
      } else {
        status = 'partial';
        detail = `Candidate lists "${candidateDegree}". Verify if it qualifies under equivalent experience.`;
      }
    } else {
      status = 'missing';
      detail = 'No education entry found in resume.';
    }

    requirements.push({
      id: 'req-degree',
      label: 'Degree / Educational Qualification',
      category: 'education',
      expected: reqDegree,
      actual: candidateDegree,
      status,
      importance: eduImportance,
      detail,
      sectionKey: 'education',
      recommendation: status !== 'matched'
        ? 'Ensure your highest relevant degree or graduation status is clearly visible in the Education section.'
        : undefined,
    });
  }

  // 3. Job Title & Professional Headline Alignment
  const targetTitle = resume.targetJob?.title || '';
  const currentTitle = resume.personalInfo?.jobTitle || '';

  if (targetTitle.trim().length > 0) {
    const targetWords = targetTitle.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const candidateTitleLower = currentTitle.toLowerCase();
    const hasOverlap = targetWords.some((w) => candidateTitleLower.includes(w));

    const status = !currentTitle ? 'missing' : hasOverlap ? 'matched' : 'partial';

    requirements.push({
      id: 'req-title-align',
      label: 'Target Job Title Alignment',
      category: 'role_title',
      expected: targetTitle,
      actual: currentTitle || 'No title set',
      status,
      importance: 'mandatory',
      detail: hasOverlap
        ? `Headline matches target role ("${currentTitle}").`
        : `Resume headline is "${currentTitle || 'empty'}" while target role is "${targetTitle}".`,
      sectionKey: 'personal',
      recommendation: status !== 'matched'
        ? `Update your resume headline in Personal Info to align with "${targetTitle}".`
        : undefined,
    });
  }

  // 4. Certifications Check if mentioned in JD
  KNOWN_CERTIFICATIONS.forEach((cert) => {
    if (cert.pattern.test(jobDescription)) {
      const candidateCerts = (resume.certifications || []).map((c) => c.name.toLowerCase()).join(' ');
      const candidateSkills = (resume.skills || []).flatMap((c) => (typeof c === 'string' ? [c] : c.items || [])).join(' ').toLowerCase();
      const hasCert = cert.pattern.test(candidateCerts) || cert.pattern.test(candidateSkills);

      requirements.push({
        id: `req-cert-${cert.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        label: `Certification: ${cert.name}`,
        category: 'certification',
        expected: `${cert.name} (Mentioned in JD)`,
        actual: hasCert ? 'Found in resume' : 'Not listed',
        status: hasCert ? 'matched' : 'missing',
        importance: 'preferred',
        detail: hasCert
          ? `Resume lists ${cert.name}.`
          : `JD mentions "${cert.name}". Having this certification strengthens your candidacy.`,
        sectionKey: 'certifications',
        recommendation: !hasCert
          ? `If you have completed ${cert.name}, add it to your Certifications section.`
          : undefined,
      });
    }
  });

  // 5. Portfolio / GitHub / LinkedIn Links Check
  const asksForPortfolio = /\b(?:portfolio|github|git\s+repository|dribbble|behance|live\s+link|demo)\b/i.test(jobDescription);
  if (asksForPortfolio) {
    const hasGithub = Boolean(resume.personalInfo?.github && resume.personalInfo.github.trim().length > 3);
    const hasWebsite = Boolean(resume.personalInfo?.website && resume.personalInfo.website.trim().length > 3);
    const hasProjectsWithLinks = (resume.projects || []).some((p) => p.link && p.link.trim().length > 3);
    const hasLinks = hasGithub || hasWebsite || hasProjectsWithLinks;

    requirements.push({
      id: 'req-portfolio-links',
      label: 'Portfolio / GitHub / Work Samples Link',
      category: 'portfolio',
      expected: 'Public code repository or online portfolio link',
      actual: hasLinks ? 'Links provided' : 'No portfolio links found',
      status: hasLinks ? 'matched' : 'missing',
      importance: 'preferred',
      detail: hasLinks
        ? 'Candidate provided online links for technical verification.'
        : 'The Job Description requests code samples or portfolio links, but none are linked.',
      sectionKey: 'personal',
      recommendation: !hasLinks
        ? 'Add your GitHub, LinkedIn, or portfolio website URL to your Personal Info or Projects section.'
        : undefined,
    });
  }

  // 6. Quantified Business Metrics in Accomplishments
  const allBullets = (resume.experience || []).flatMap((e) => e.highlights || []);
  const allText = allBullets.join(' ');
  const metrics = extractMetrics(allText);

  const metricsStatus = metrics.length >= 3 ? 'matched' : metrics.length > 0 ? 'partial' : 'missing';
  requirements.push({
    id: 'req-metrics-proof',
    label: 'Measurable Impact & Quantified Results',
    category: 'metrics',
    expected: 'At least 3-4 quantified achievements (%, $, numbers, latency, revenue)',
    actual: `${metrics.length} metric${metrics.length === 1 ? '' : 's'} detected in experience bullets`,
    status: metricsStatus,
    importance: 'mandatory',
    detail: metrics.length >= 3
      ? `Strong data-driven impact: found ${metrics.slice(0, 3).join(', ')}.`
      : 'Modern ATS recruiters look for measurable results. Bullet points should quantify impact.',
    sectionKey: 'experience',
    recommendation: metricsStatus !== 'matched'
      ? 'Add numbers, percentages (e.g. "improved speed by 35%"), or scale figures to your experience bullets.'
      : undefined,
  });

  return requirements;
}

/**
 * Master JD Analysis function:
 * Conducts a 360-degree audit including:
 * 1. Technical & domain keyword matching
 * 2. Mandatory resume sections check
 * 3. Specific JD requirements check (Experience, Education, Title, Certifications, Portfolio, Metrics)
 * 4. Generates an overall weighted Fit Score (0 - 100%)
 */
export function analyzeJobDescriptionFit(
  jobDescription: string,
  resume: ResumeData
): JdAnalysisReport {
  // If no JD is provided
  if (!jobDescription || jobDescription.trim().length < 15) {
    const mandatorySections = evaluateMandatorySections(resume);
    const passedCount = mandatorySections.filter((s) => s.status === 'passed').length;
    const baseSectionScore = Math.round(
      mandatorySections.reduce((acc, s) => acc + s.score, 0) / (mandatorySections.length || 1)
    );

    return {
      overallScore: 0,
      grade: 'D',
      verdict: 'No Job Description Provided',
      verdictDescription: 'Paste a Job Description or select a preset to analyze candidate fit against requirements.',
      breakdown: {
        skillsMatch: { score: 0, weight: 35, matchedCount: 0, missingCount: 0 },
        mandatorySections: { score: baseSectionScore, weight: 25, passedCount, totalCount: mandatorySections.length },
        experienceAlignment: { score: 0, weight: 20, requiredYears: null, actualYears: calculateCandidateExperienceYears(resume) },
        educationAlignment: { score: 0, weight: 10, requiredDegree: null, actualDegree: null },
        impactAndRequirements: { score: 0, weight: 10, metricsCount: 0, linksFound: false },
      },
      mandatorySections,
      jdRequirements: [],
      keywordMatch: {
        matchRate: 0,
        matchedKeywords: [],
        missingKeywords: [],
        totalJobKeywords: 0,
        totalMatched: 0,
      },
      actionItems: [
        {
          id: 'action-paste-jd',
          title: 'Paste Target Job Description',
          description: 'Paste the job requirements to calculate keyword match, section readiness, and qualification fit.',
          severity: 'critical',
          category: 'JD Input',
        },
      ],
    };
  }

  // 1. Keyword match
  const keywordMatch = matchJobDescriptionKeywords(jobDescription, resume);
  const skillsScore = keywordMatch.matchRate;

  // 2. Mandatory sections check
  const mandatorySections = evaluateMandatorySections(resume, jobDescription);
  const passedSections = mandatorySections.filter((s) => s.status === 'passed').length;
  const mandatoryScore = Math.round(
    mandatorySections.reduce((acc, s) => acc + s.score, 0) / mandatorySections.length
  );

  // 3. JD specific requirements audit
  const jdRequirements = auditJdRequirements(resume, jobDescription);

  // Calculate experience alignment score (0 - 100)
  const expReq = jdRequirements.find((r) => r.category === 'experience');
  const actualYears = calculateCandidateExperienceYears(resume);
  const { years: requiredYears } = extractJdRequiredYears(jobDescription);
  let experienceScore = 80; // default neutral if JD doesn't specify years
  if (expReq) {
    if (expReq.status === 'matched') experienceScore = 100;
    else if (expReq.status === 'partial') experienceScore = 65;
    else experienceScore = 30;
  }

  // Calculate education alignment score (0 - 100)
  const eduReq = jdRequirements.find((r) => r.category === 'education');
  const { degree: requiredDegree } = extractJdDegreeRequirement(jobDescription);
  const actualDegree = resume.education?.[0]?.degree || null;
  let educationScore = 85; // default neutral
  if (eduReq) {
    if (eduReq.status === 'matched') educationScore = 100;
    else if (eduReq.status === 'partial') educationScore = 70;
    else educationScore = 35;
  }

  // Calculate requirements & impact score (0 - 100)
  const otherReqs = jdRequirements.filter((r) => r.category !== 'experience' && r.category !== 'education');
  let impactScore = 70;
  if (otherReqs.length > 0) {
    const totalPoints = otherReqs.reduce((acc, r) => {
      if (r.status === 'matched') return acc + 100;
      if (r.status === 'partial') return acc + 60;
      return acc + 20;
    }, 0);
    impactScore = Math.round(totalPoints / otherReqs.length);
  }

  const allBullets = (resume.experience || []).flatMap((e) => e.highlights || []);
  const metricsCount = extractMetrics(allBullets.join(' ')).length;
  const linksFound = Boolean(
    resume.personalInfo?.github ||
    resume.personalInfo?.website ||
    (resume.projects || []).some((p) => p.link)
  );

  // Weighted Overall Fit Score:
  // Skills Match: 35%
  // Mandatory Sections: 25%
  // Experience: 20%
  // Education: 10%
  // Impact & Requirements: 10%
  const weightedScore = Math.round(
    skillsScore * 0.35 +
    mandatoryScore * 0.25 +
    experienceScore * 0.20 +
    educationScore * 0.10 +
    impactScore * 0.10
  );

  // Critical Mandatory Section Gating:
  // If core mandatory sections are missing entirely, apply realistic ATS screening penalty
  const coreMissingCount = mandatorySections.filter(
    (s) => s.status === 'missing' && (s.id === 'contact' || s.id === 'experience' || s.id === 'education' || s.id === 'summary')
  ).length;

  const penaltyMultiplier = coreMissingCount >= 3 ? 0.45 : coreMissingCount >= 2 ? 0.65 : coreMissingCount === 1 ? 0.85 : 1.0;
  const overallScore = Math.min(100, Math.max(0, Math.round(weightedScore * penaltyMultiplier)));

  // Determine Grade & Verdict
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  let verdict = 'Needs Optimization';
  let verdictDescription = 'Your resume is missing essential qualifications or critical keywords for this role.';

  if (overallScore >= 90) {
    grade = 'A+';
    verdict = 'Exceptional Fit';
    verdictDescription = 'Top candidate match! Qualifications, skills, and mandatory sections strictly align with the Job Description.';
  } else if (overallScore >= 80) {
    grade = 'A';
    verdict = 'Strong Fit';
    verdictDescription = 'High likelihood of passing ATS screening and recruiter review. Minor skill or metric additions can boost it higher.';
  } else if (overallScore >= 65) {
    grade = 'B';
    verdict = 'Good Match';
    verdictDescription = 'Meets primary core requirements but has gaps in skills, metrics, or section depth.';
  } else if (overallScore >= 50) {
    grade = 'C';
    verdict = 'Moderate Match';
    verdictDescription = 'Several mandatory sections or high-priority technical skills are missing for this specific job.';
  } else {
    grade = 'D';
    verdict = 'High Risk of Rejection';
    verdictDescription = 'Critical mismatch with Job Description. Essential sections, mandatory experience, or required skills are absent.';
  }

  // 4. Generate high-priority Action Items
  const actionItems: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
    category: string;
    sectionKey?: SectionKey;
  }> = [];

  // Check critical mandatory sections
  mandatorySections.forEach((sec) => {
    if (sec.status === 'missing') {
      actionItems.push({
        id: `act-sec-missing-${sec.id}`,
        title: `Complete Missing Section: ${sec.name}`,
        description: sec.recommendation,
        severity: 'critical',
        category: 'Mandatory Section',
        sectionKey: sec.sectionKey,
      });
    } else if (sec.status === 'warning') {
      actionItems.push({
        id: `act-sec-warn-${sec.id}`,
        title: `Improve Section: ${sec.name}`,
        description: sec.recommendation,
        severity: 'high',
        category: 'Mandatory Section',
        sectionKey: sec.sectionKey,
      });
    }
  });

  // Check requirements action items
  jdRequirements.forEach((req) => {
    if (req.status === 'missing' && req.importance === 'mandatory') {
      actionItems.push({
        id: `act-req-${req.id}`,
        title: `Address Requirement: ${req.label}`,
        description: req.detail,
        severity: 'critical',
        category: 'Job Requirement',
        sectionKey: req.sectionKey,
      });
    } else if (req.status === 'missing') {
      actionItems.push({
        id: `act-req-${req.id}`,
        title: `Consider Adding: ${req.label}`,
        description: req.detail,
        severity: 'medium',
        category: 'Preferred Requirement',
        sectionKey: req.sectionKey,
      });
    }
  });

  // Check top missing skills
  const topMissingSkills = keywordMatch.missingKeywords.slice(0, 3);
  if (topMissingSkills.length > 0) {
    actionItems.push({
      id: 'act-missing-skills',
      title: `Add High-Priority Skills: ${topMissingSkills.map((s) => s.keyword).join(', ')}`,
      description: `These terms appear prominently in the Job Description but are absent from your resume.`,
      severity: 'high',
      category: 'Keywords',
      sectionKey: 'skills',
    });
  }

  return {
    overallScore,
    grade,
    verdict,
    verdictDescription,
    breakdown: {
      skillsMatch: {
        score: skillsScore,
        weight: 35,
        matchedCount: keywordMatch.matchedKeywords.length,
        missingCount: keywordMatch.missingKeywords.length,
      },
      mandatorySections: {
        score: mandatoryScore,
        weight: 25,
        passedCount: passedSections,
        totalCount: mandatorySections.length,
      },
      experienceAlignment: {
        score: experienceScore,
        weight: 20,
        requiredYears,
        actualYears,
      },
      educationAlignment: {
        score: educationScore,
        weight: 10,
        requiredDegree,
        actualDegree,
      },
      impactAndRequirements: {
        score: impactScore,
        weight: 10,
        metricsCount,
        linksFound,
      },
    },
    mandatorySections,
    jdRequirements,
    keywordMatch,
    actionItems,
  };
}

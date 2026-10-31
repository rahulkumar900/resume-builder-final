import { ResumeData, ResumeSectionId } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import {
  ACTION_VERBS_BY_CATEGORY,
  ALL_ACTION_VERBS,
  WEAK_WORDS,
  FIRST_PERSON_PRONOUNS,
  stripHtml,
} from './ats-constants';
import {
  inspectResumeDuplicatesAndQuality,
  AtsDuplicateReport,
} from './duplicate-detector';

export {
  ACTION_VERBS_BY_CATEGORY,
  ALL_ACTION_VERBS,
  WEAK_WORDS,
  FIRST_PERSON_PRONOUNS,
  stripHtml,
};

export interface AtsCategoryScore {
  id: string;
  name: string;
  score: number; // e.g. 18
  maxScore: number; // e.g. 25
  percentage: number; // 0 - 100
  status: 'excellent' | 'good' | 'needs_work' | 'critical';
  summary: string;
}

export interface AtsSuggestion {
  id: string;
  category: 'contact' | 'summary' | 'experience' | 'skills' | 'education' | 'formatting';
  severity: 'critical' | 'recommended' | 'good';
  title: string;
  description: string;
  fixHint?: string;
  sectionKey?: SectionKey;
  duplicateMeta?: {
    type: string;
    locations: string[];
    snippet?: string;
  };
}

export interface AtsAuditResult {
  overallScore: number; // 0 - 100
  tier: {
    label: string;
    grade: 'A+' | 'A' | 'B' | 'C' | 'D';
    color: string; // Tailwind color class e.g. 'text-emerald-600'
    bgColor: string; // Tailwind bg e.g. 'bg-emerald-50'
    borderColor: string;
    description: string;
  };
  categories: {
    contact: AtsCategoryScore;
    summary: AtsCategoryScore;
    experience: AtsCategoryScore;
    skills: AtsCategoryScore;
    education: AtsCategoryScore;
    formatting: AtsCategoryScore;
  };
  metricsCount: number;
  actionVerbsCount: number;
  totalSkillsCount: number;
  pronounViolationsCount: number;
  duplicateReport: AtsDuplicateReport;
  contentQuality: {
    duplicateBulletsCount: number;
    duplicateSkillsCount: number;
    repetitiveVerbsCount: number;
    buzzwordsCount: number;
    passiveVoiceCount: number;
  };
  suggestions: AtsSuggestion[];
  atsPlainText: string;
}

/**
 * Detects numbers, monetary amounts, percentages, and scale indicators
 */
export const extractMetrics = (text: string): string[] => {
  const matches: string[] = [];
  const regex = /(\b\d+(?:\.\d+)?%|\$\s?\d+(?:,\d{3})*(?:\.\d+)?(?:k|m|b)?|\b\d+\+?\s?(?:k|m|b|billion|million|thousand)\b|\b\d+x\b|\b\d+\s?(?:users|clients|engineers|members|developers|customers|requests|transactions|projects|sprints|hours|days|weeks|months|years|pages|features)\b)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[0].trim());
  }
  return matches;
};

/**
 * Generates an ATS plain-text representation of the candidate's resume
 * as seen by Workday / Greenhouse / Taleo parser extraction pipelines.
 */
export const generateAtsPlainText = (data: ResumeData): string => {
  const parts: string[] = [];
  const p = data.personalInfo;

  // 1. Header & Contact Details
  const contactLines: string[] = [];
  if (p?.fullName) contactLines.push(p.fullName.toUpperCase());
  if (p?.jobTitle) contactLines.push(p.jobTitle);
  const contacts: string[] = [];
  if (p?.email) contacts.push(p.email);
  if (p?.phone) contacts.push(p.phone);
  if (p?.location) contacts.push(p.location);
  if (p?.linkedin) contacts.push(p.linkedin);
  if (p?.website) contacts.push(p.website);
  if (p?.github) contacts.push(p.github);
  if (contacts.length > 0) contactLines.push(contacts.join(' | '));
  if (contactLines.length > 0) parts.push(contactLines.join('\n'));

  // 2. Professional Summary
  if (p?.summary) {
    parts.push(`PROFESSIONAL SUMMARY\n${stripHtml(p.summary)}`);
  }

  // 3. Work Experience
  if (data.experience && data.experience.length > 0) {
    const expLines: string[] = ['WORK EXPERIENCE'];
    data.experience.forEach((exp) => {
      const dates = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`;
      expLines.push(`\n${exp.role || 'Role'} | ${exp.company || 'Company'} | ${exp.location || ''} | ${dates}`);
      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((h) => {
          const cleanH = stripHtml(h);
          if (cleanH) expLines.push(`• ${cleanH}`);
        });
      }
    });
    parts.push(expLines.join('\n'));
  }

  // 3b. Internships & Practical Experience
  if (data.internships && data.internships.length > 0) {
    const intLines: string[] = ['INTERNSHIPS & PRACTICAL EXPERIENCE'];
    data.internships.forEach((intItem) => {
      const dates = `${intItem.startDate || ''} - ${intItem.current ? 'Present' : intItem.endDate || ''}`;
      intLines.push(`\n${intItem.role || 'Intern'} | ${intItem.company || 'Organization'} | ${intItem.location || ''} | ${dates}`);
      if (intItem.highlights && intItem.highlights.length > 0) {
        intItem.highlights.forEach((h) => {
          const cleanH = stripHtml(h);
          if (cleanH) intLines.push(`• ${cleanH}`);
        });
      }
    });
    parts.push(intLines.join('\n'));
  }

  // 4. Education
  if (data.education && data.education.length > 0) {
    const eduLines: string[] = ['EDUCATION'];
    data.education.forEach((edu) => {
      eduLines.push(`\n${edu.degree || 'Degree'}`);
      eduLines.push(`${edu.school || 'School'} | ${edu.location || ''} | ${edu.graduationDate || ''}`);
      if (edu.highlights && edu.highlights.length > 0) {
        edu.highlights.forEach((h) => {
          const cleanH = stripHtml(h);
          if (cleanH) eduLines.push(`• ${cleanH}`);
        });
      }
    });
    parts.push(eduLines.join('\n'));
  }

  // 5. Skills & Competencies
  if (data.skills && data.skills.length > 0) {
    const skillLines: string[] = ['SKILLS & COMPETENCIES'];
    data.skills.forEach((cat) => {
      if (cat.enabled !== false && cat.items && cat.items.length > 0) {
        skillLines.push(`${cat.category || 'Skills'}: ${cat.items.join(', ')}`);
      }
    });
    parts.push(skillLines.join('\n'));
  }

  // 6. Projects
  if (data.projects && data.projects.length > 0) {
    const projLines: string[] = ['FEATURED PROJECTS'];
    data.projects.forEach((proj) => {
      const tech = proj.technologies && proj.technologies.length > 0 ? ` [${proj.technologies.join(', ')}]` : '';
      projLines.push(`\n${proj.title || 'Project'}${tech}`);
      if (proj.highlights && proj.highlights.length > 0) {
        proj.highlights.forEach((h) => {
          const cleanH = stripHtml(h);
          if (cleanH) projLines.push(`• ${cleanH}`);
        });
      }
    });
    parts.push(projLines.join('\n'));
  }

  // 7. Certifications
  if (data.certifications && data.certifications.length > 0) {
    const certLines: string[] = ['CERTIFICATIONS'];
    data.certifications.forEach((c) => {
      certLines.push(`• ${c.name}${c.issuer ? ` - ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}`);
    });
    parts.push(certLines.join('\n'));
  }

  // 8. Languages
  if (data.languages && data.languages.length > 0) {
    const langLines: string[] = ['LANGUAGES'];
    langLines.push(data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' | '));
    parts.push(langLines.join('\n'));
  }

  return parts.join('\n\n');
};

/**
 * Performs deep, multi-factor ATS audit and generates concrete, actionable suggestions.
 */
export const analyzeResumeAts = (data?: ResumeData | null): AtsAuditResult => {
  const suggestions: AtsSuggestion[] = [];
  const safeData = data || ({} as ResumeData);
  const p = safeData.personalInfo || {};

  // ==========================================
  // 1. Contact & Professional Identity (15 pts)
  // ==========================================
  let contactScore = 0;
  if (p.fullName && p.fullName.trim().length > 2) {
    contactScore += 3;
  } else {
    suggestions.push({
      id: 'contact-missing-name',
      category: 'contact',
      severity: 'critical',
      title: 'Missing Full Legal Name',
      description: 'ATS parsers use your name as the primary applicant key in the recruitment database.',
      fixHint: 'Provide your first and last name at the top of the personal details.',
      sectionKey: 'personal',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (p.email && emailRegex.test(p.email.trim())) {
    contactScore += 3;
    // Check for unprofessional handles
    if (/baby|sexy|lover|hottie|ninja|beast|gamer/i.test(p.email)) {
      suggestions.push({
        id: 'contact-unprofessional-email',
        category: 'contact',
        severity: 'recommended',
        title: 'Potentially Unprofessional Email Handle',
        description: 'Recruiter screeners favor clean "firstname.lastname@provider.com" formats.',
        fixHint: 'Use a clean variation of your real name on Gmail or Outlook.',
        sectionKey: 'personal',
      });
    }
  } else {
    suggestions.push({
      id: 'contact-missing-email',
      category: 'contact',
      severity: 'critical',
      title: 'Valid Email Address Required',
      description: 'Automated interview invites and notifications are sent via email.',
      fixHint: 'Enter a valid, frequently-checked email address.',
      sectionKey: 'personal',
    });
  }

  if (p.phone && p.phone.trim().length >= 7) {
    contactScore += 3;
  } else {
    suggestions.push({
      id: 'contact-missing-phone',
      category: 'contact',
      severity: 'critical',
      title: 'Missing Phone Number',
      description: 'Recruiters conduct initial screen calls by phone.',
      fixHint: 'Include your direct mobile number with country/area code.',
      sectionKey: 'personal',
    });
  }

  if (p.location && p.location.trim().length > 2) {
    contactScore += 3;
  } else {
    suggestions.push({
      id: 'contact-missing-location',
      category: 'contact',
      severity: 'recommended',
      title: 'Add City, State / Country Location',
      description: 'ATS search filters frequently filter by geographic radius (e.g. within 50 miles).',
      fixHint: 'Add "City, State" (e.g. "Austin, TX" or "London, UK") without street address.',
      sectionKey: 'personal',
    });
  }

  if (p.linkedin && p.linkedin.trim().length > 5) {
    contactScore += 3;
  } else {
    suggestions.push({
      id: 'contact-missing-linkedin',
      category: 'contact',
      severity: 'recommended',
      title: 'Add LinkedIn Profile URL',
      description: 'Profiles with validated LinkedIn links receive 40% higher response rates from hiring managers.',
      fixHint: 'Include your customized LinkedIn vanity URL (e.g. linkedin.com/in/yourname).',
      sectionKey: 'personal',
    });
  }

  // ==========================================
  // 2. Executive Summary & Impact (15 pts)
  // ==========================================
  let summaryScore = 0;
  const summaryRaw = stripHtml(p.summary || '');
  const summaryWords = summaryRaw.split(/\s+/).filter(Boolean);

  let pronounViolationsCount = 0;

  if (summaryRaw.length > 0) {
    summaryScore += 4; // Base presence

    // Word count check
    if (summaryWords.length >= 35 && summaryWords.length <= 110) {
      summaryScore += 5; // Ideal length
    } else if (summaryWords.length < 35) {
      summaryScore += 2;
      suggestions.push({
        id: 'summary-too-short',
        category: 'summary',
        severity: 'recommended',
        title: 'Executive Summary is Too Brief',
        description: `Your summary is only ${summaryWords.length} words. A compelling pitch is 40–90 words highlighting target role, core competencies, and career achievements.`,
        fixHint: 'Use the section AI suggestion tool to generate a tailored 3-sentence summary.',
        sectionKey: 'personal',
      });
    } else {
      summaryScore += 3;
      suggestions.push({
        id: 'summary-too-long',
        category: 'summary',
        severity: 'recommended',
        title: 'Executive Summary Exceeds Optimal Length',
        description: `Your summary is ${summaryWords.length} words. Dense paragraphs cause recruiter fatigue.`,
        fixHint: 'Trim to 3–4 high-impact sentences emphasizing your value proposition.',
        sectionKey: 'personal',
      });
    }

    // Role target match
    if (p.jobTitle && summaryRaw.toLowerCase().includes(p.jobTitle.toLowerCase().trim())) {
      summaryScore += 3;
    } else {
      summaryScore += 1;
      suggestions.push({
        id: 'summary-missing-job-title',
        category: 'summary',
        severity: 'recommended',
        title: 'Align Summary with Target Job Title',
        description: `Your target job title "${p.jobTitle || 'Role'}" is not prominently mentioned in your summary opening.`,
        fixHint: `Open with: "${p.jobTitle || 'Software Engineer'} with X+ years of experience delivering..."`,
        sectionKey: 'personal',
      });
    }

    // Check for 1st person pronouns in summary
    const lowerSummary = summaryRaw.toLowerCase();
    const pronounsFound = FIRST_PERSON_PRONOUNS.filter((pr) => {
      const regex = new RegExp(`\\b${pr}\\b`, 'i');
      return regex.test(lowerSummary);
    });
    if (pronounsFound.length > 0) {
      pronounViolationsCount += pronounsFound.length;
      suggestions.push({
        id: 'summary-first-person-pronouns',
        category: 'summary',
        severity: 'recommended',
        title: 'Remove First-Person Pronouns from Summary',
        description: `Found first-person pronouns (${pronounsFound.map(p => `"${p}"`).join(', ')}). Resumes should use implied first-person narrative for executive authority.`,
        fixHint: 'Replace "I led cross-functional teams" with "Led cross-functional teams".',
        sectionKey: 'personal',
      });
    } else {
      summaryScore += 3;
    }
  } else {
    suggestions.push({
      id: 'summary-missing',
      category: 'summary',
      severity: 'recommended',
      title: 'Add a Professional Summary',
      description: 'An executive summary provides immediate context and delivers keyword density right at the top of the scan.',
      fixHint: 'Craft a 3-sentence summary highlighting your years of experience, core tech stack, and primary achievements.',
      sectionKey: 'personal',
    });
  }

  // ==========================================
  // 3. Work Experience & Quantifiable Achievements (25 pts)
  // ==========================================
  let experienceScore = 0;
  const exp = safeData.experience || [];
  const internships = safeData.internships || [];
  const isFresher = safeData.experienceLevel === 'entry';
  let actionVerbsCount = 0;
  let metricsCount = 0;
  let totalBullets = 0;
  let weakBullets = 0;

  // Combine experience and internships for practical achievement evaluation
  const allPracticalEntries = [
    ...exp.map((e) => ({ role: e.role, company: e.company, highlights: e.highlights || [], isInternship: false })),
    ...internships.map((i) => ({ role: i.role, company: i.company, highlights: i.highlights || [], isInternship: true })),
  ];

  if (allPracticalEntries.length > 0) {
    experienceScore += 5; // Base presence
    if (allPracticalEntries.length >= 2) experienceScore += 2;

    const allBullets: string[] = [];
    allPracticalEntries.forEach((job) => {
      if (job.highlights) {
        job.highlights.forEach((h) => {
          const clean = stripHtml(h).trim();
          if (clean) allBullets.push(clean);
        });
      }
    });
    totalBullets = allBullets.length;

    // Scan bullets
    allBullets.forEach((bullet) => {
      const lower = bullet.toLowerCase();

      // Check action verbs
      const hasActionVerb = ALL_ACTION_VERBS.some((v) => lower.includes(v));
      if (hasActionVerb) actionVerbsCount++;

      // Check first-person pronouns in bullets
      const hasPronoun = FIRST_PERSON_PRONOUNS.some((pr) => new RegExp(`\\b${pr}\\b`, 'i').test(lower));
      if (hasPronoun) pronounViolationsCount++;

      // Check metrics
      const extracted = extractMetrics(bullet);
      if (extracted.length > 0) {
        metricsCount += extracted.length;
      }

      // Check weak phrases
      const hasWeak = WEAK_WORDS.some((w) => lower.includes(w));
      if (hasWeak) weakBullets++;

      // Bullet length check
      const words = lower.split(/\s+/);
      if (words.length < 5 || words.length > 45) {
        weakBullets++;
      }
    });

    // Score verbs (up to 7 pts)
    const verbRatio = totalBullets > 0 ? actionVerbsCount / totalBullets : 0;
    if (verbRatio >= 0.75) experienceScore += 7;
    else if (verbRatio >= 0.5) experienceScore += 5;
    else if (verbRatio >= 0.25) experienceScore += 3;
    else experienceScore += 1;

    if (verbRatio < 0.6) {
      suggestions.push({
        id: 'exp-weak-action-verbs',
        category: 'experience',
        severity: 'critical',
        title: 'Strengthen Action Verbs in Experience Bullets',
        description: 'ATS scoring heavily weights bullet points beginning with powerful past-tense action verbs.',
        fixHint: 'Start bullets with words like "Architected", "Spearheaded", "Engineered", "Optimized", or "Delivered".',
        sectionKey: isFresher && exp.length === 0 ? 'internships' : 'experience',
      });
    }

    // Score metrics (up to 8 pts)
    if (metricsCount >= 5) experienceScore += 8;
    else if (metricsCount >= 3) experienceScore += 6;
    else if (metricsCount >= 1) experienceScore += 3;

    if (metricsCount < 3) {
      suggestions.push({
        id: 'exp-missing-metrics',
        category: 'experience',
        severity: 'critical',
        title: 'Include Quantifiable Impact Metrics',
        description: 'Recruiters and ATS favor candidates who prove impact with numbers (% growth, $ revenue/savings, hours saved, team scale).',
        fixHint: 'Follow Google\'s X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]". E.g. "Reduced API response latency by 45% by implementing Redis caching".',
        sectionKey: isFresher && exp.length === 0 ? 'internships' : 'experience',
      });
    }

    // Score bullet volume & hygiene (up to 3 pts)
    if (totalBullets >= 4 && weakBullets === 0) experienceScore += 3;
    else if (totalBullets >= 3) experienceScore += 2;
    else experienceScore += 1;

    if (totalBullets < 3) {
      suggestions.push({
        id: 'exp-too-few-bullets',
        category: 'experience',
        severity: 'recommended',
        title: 'Add More Detail to Experience Positions',
        description: 'Each job entry should ideally have 3 to 5 detailed bullet points illustrating your key achievements.',
        fixHint: 'Add 2–3 additional achievement bullets for each of your recent roles.',
        sectionKey: isFresher && exp.length === 0 ? 'internships' : 'experience',
      });
    }
  } else {
    if (isFresher) {
      suggestions.push({
        id: 'exp-missing-fresher',
        category: 'experience',
        severity: 'recommended',
        title: 'Add Practical Internships or Capstones',
        description: 'Even for entry-level candidates, ATS filters score higher when practical internships or industry projects are present.',
        fixHint: 'Add your summer internships or major capstone projects in the Internships section.',
        sectionKey: 'internships',
      });
    } else {
      suggestions.push({
        id: 'exp-missing',
        category: 'experience',
        severity: 'critical',
        title: 'Work Experience Section is Empty',
        description: 'Work history is the #1 weighted section in applicant tracking systems.',
        fixHint: 'Add your current or past employment, internships, or freelance experience.',
        sectionKey: 'experience',
      });
    }
  }

  // ==========================================
  // 4. Skills & Keyword Relevance (20 pts)
  // ==========================================
  let skillsScore = 0;
  const skills = (safeData.skills || []).filter((cat) => cat.enabled !== false);
  const totalSkills = skills.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);

  if (totalSkills > 0) {
    skillsScore += 5; // Base presence

    // Quantity benchmark (sweet spot: 8 - 25 skills)
    if (totalSkills >= 8 && totalSkills <= 30) {
      skillsScore += 8;
    } else if (totalSkills > 30) {
      skillsScore += 5; // Keyword stuffing penalty
      suggestions.push({
        id: 'skills-keyword-stuffing',
        category: 'skills',
        severity: 'recommended',
        title: 'Potential Keyword Stuffing in Skills',
        description: `You have ${totalSkills} skills listed. Overly generic or cluttered skill dumps can trigger ATS spam filters and dilute your key strengths.`,
        fixHint: 'Focus on 10–20 high-value technical tools, domain methodologies, and frameworks directly relevant to your target role.',
        sectionKey: 'skills',
      });
    } else {
      skillsScore += 4;
      suggestions.push({
        id: 'skills-too-few',
        category: 'skills',
        severity: 'critical',
        title: 'List at Least 8 Core Skills',
        description: `You only have ${totalSkills} skills. ATS engines match resumes against job requisitions by scanning specific skill keywords.`,
        fixHint: 'Add technical competencies, frameworks, cloud platforms, and methodologies matching your job role.',
        sectionKey: 'skills',
      });
    }

    // Categorization check (grouped skills score much higher than flat comma strings)
    if (skills.length >= 2) {
      skillsScore += 4;
    } else {
      skillsScore += 2;
      suggestions.push({
        id: 'skills-uncategorized',
        category: 'skills',
        severity: 'recommended',
        title: 'Group Skills into Categories',
        description: 'Categorized skills (e.g., "Languages", "Frameworks & Libraries", "DevOps & Cloud") parse with higher clarity in modern ATS parsers.',
        fixHint: 'Organize your skills into 2–4 targeted categories using the "+ Add Category" button.',
        sectionKey: 'skills',
      });
    }

    // Project & Certifications keyword reinforcement bonus
    const hasProjects = safeData.projects && safeData.projects.length > 0;
    const hasCerts = safeData.certifications && safeData.certifications.length > 0;
    if (hasProjects || hasCerts) {
      skillsScore += 3;
    } else {
      skillsScore += 1;
      suggestions.push({
        id: 'skills-reinforce-projects',
        category: 'skills',
        severity: 'recommended',
        title: 'Reinforce Skills with Projects or Certifications',
        description: 'ATS keywords carry more weight when validated by real-world projects or recognized industry certifications.',
        fixHint: 'Add 1–2 featured projects or relevant certifications demonstrating your skills in action.',
        sectionKey: 'projects',
      });
    }
  } else {
    suggestions.push({
      id: 'skills-missing',
      category: 'skills',
      severity: 'critical',
      title: 'Skills Section is Completely Empty',
      description: 'Without skills, your resume will fail basic keyword-matching filters for virtually all automated job postings.',
      fixHint: 'Use the AI Suggestion button to instantly populate industry-standard skill groups for your target role.',
      sectionKey: 'skills',
    });
  }

  // ==========================================
  // 5. Education & Credentials (15 pts)
  // ==========================================
  let educationScore = 0;
  const edu = safeData.education || [];

  if (edu.length > 0) {
    educationScore += 5; // Base presence
    let hasDegree = false;
    let hasSchool = false;
    let hasGradDate = false;

    edu.forEach((e) => {
      if (e.degree && e.degree.trim().length > 1) hasDegree = true;
      if (e.school && e.school.trim().length > 1) hasSchool = true;
      if (e.graduationDate && e.graduationDate.trim().length > 1) hasGradDate = true;
    });

    if (hasDegree) educationScore += 4;
    else {
      suggestions.push({
        id: 'edu-missing-degree',
        category: 'education',
        severity: 'critical',
        title: 'Degree Level or Certification Name Missing',
        description: 'ATS filters often require specific degree criteria (e.g. B.S., M.S., B.Tech, or equivalent).',
        fixHint: 'Specify the degree (e.g. "Bachelor of Science in Computer Science").',
        sectionKey: 'education',
      });
    }

    if (hasSchool) educationScore += 3;
    else {
      suggestions.push({
        id: 'edu-missing-school',
        category: 'education',
        severity: 'recommended',
        title: 'Institution Name Missing',
        description: 'Add your university, college, or bootcamp provider.',
        sectionKey: 'education',
      });
    }

    if (hasGradDate) educationScore += 3;
    else {
      suggestions.push({
        id: 'edu-missing-date',
        category: 'education',
        severity: 'recommended',
        title: 'Graduation Year Missing',
        description: 'Provide graduation year or expected completion date for background verification.',
        sectionKey: 'education',
      });
    }
  } else {
    suggestions.push({
      id: 'edu-missing',
      category: 'education',
      severity: 'critical',
      title: 'Education Section Missing',
      description: 'Most corporate and tech requisitions mandate an education or equivalent credential check.',
      fixHint: 'Add your highest degree, diploma, or relevant bootcamp certificate.',
      sectionKey: 'education',
    });
  }

  // ==========================================
  // 6. Formatting & ATS Layout Hygiene (10 pts)
  // ==========================================
  let formattingScore = 6; // Base semantic HTML is pristine in this builder

  // Template compliance
  const isAtsNativeTemplate = ['ats', 'vienna', 'madrid'].includes(safeData.templateId || '');
  if (isAtsNativeTemplate) {
    formattingScore += 4; // Single column 100% linear ATS pass
  } else {
    formattingScore += 2; // Two column templates in our builder have clean DOM headings but single column is optimal for strict legacy parsers
    suggestions.push({
      id: 'format-two-column-notice',
      category: 'formatting',
      severity: 'recommended',
      title: 'Two-Column Layout in Use',
      description: 'While our templates use linear DOM order, conservative corporate ATS parsers (e.g. Taleo, old Workday instances) achieve the highest parsing accuracy on single-column formats like "ATS Classical" or "Vienna".',
      fixHint: 'For large enterprise portals, you can switch template to "ATS Classical" or "Vienna" with 1 click in Review.',
      sectionKey: 'review',
    });
  }

  // ==========================================
  // 7. Advanced Duplicate & Content Quality Inspection
  // ==========================================
  const qualityCheck = inspectResumeDuplicatesAndQuality(safeData);
  suggestions.push(...(qualityCheck.suggestions as AtsSuggestion[]));

  const contentQuality = {
    duplicateBulletsCount: qualityCheck.report.duplicateBullets.length,
    duplicateSkillsCount: qualityCheck.report.duplicateSkills.length,
    repetitiveVerbsCount: qualityCheck.report.repetitiveStartingVerbs.length,
    buzzwordsCount: qualityCheck.report.buzzwordsFound.length,
    passiveVoiceCount: qualityCheck.report.passivePhrasesFound.length,
  };

  // Penalize duplicate content and quality issues proportionally
  if (contentQuality.duplicateBulletsCount > 0) {
    experienceScore = Math.max(0, experienceScore - (contentQuality.duplicateBulletsCount * 3));
  }
  if (contentQuality.duplicateSkillsCount > 0) {
    skillsScore = Math.max(0, skillsScore - (contentQuality.duplicateSkillsCount * 2));
  }
  if (contentQuality.repetitiveVerbsCount > 0) {
    experienceScore = Math.max(0, experienceScore - Math.min(3, contentQuality.repetitiveVerbsCount * 1.5));
  }
  if (contentQuality.buzzwordsCount >= 2) {
    summaryScore = Math.max(0, summaryScore - Math.min(3, contentQuality.buzzwordsCount));
  }
  if (contentQuality.passiveVoiceCount > 0) {
    formattingScore = Math.max(0, formattingScore - Math.min(2, contentQuality.passiveVoiceCount));
  }

  // Calculate totals
  contactScore = Math.min(15, contactScore);
  summaryScore = Math.min(15, summaryScore);
  experienceScore = Math.min(25, experienceScore);
  skillsScore = Math.min(20, skillsScore);
  educationScore = Math.min(15, educationScore);
  formattingScore = Math.min(10, formattingScore);

  const totalRaw = contactScore + summaryScore + experienceScore + skillsScore + educationScore + formattingScore;
  const overallScore = Math.min(100, Math.max(20, Math.round(totalRaw)));

  // Determine Tier & Badge
  let tier: AtsAuditResult['tier'];
  if (overallScore >= 90) {
    tier = {
      label: 'Top 5% — Enterprise ATS Ready',
      grade: 'A+',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Exceptional profile. Fully optimized for parsing algorithms and executive recruiters.',
    };
  } else if (overallScore >= 78) {
    tier = {
      label: 'Competitive Profile — Interview Caliber',
      grade: 'A',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Strong candidate profile with high probability of clearing automated keyword filters.',
    };
  } else if (overallScore >= 65) {
    tier = {
      label: 'Moderate Readiness — Optimization Needed',
      grade: 'B',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'Meets minimum baseline, but adding quantifiable metrics and key skills will boost callbacks.',
    };
  } else if (overallScore >= 50) {
    tier = {
      label: 'Needs Attention — ATS Risk',
      grade: 'C',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Missing critical impact metrics, keywords, or structure. Likely to be filtered out.',
    };
  } else {
    tier = {
      label: 'Incomplete — Critical Revisions Required',
      grade: 'D',
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      description: 'Lacks foundational sections. Complete all core sections before submitting.',
    };
  }

  const getStatus = (score: number, max: number): AtsCategoryScore['status'] => {
    const ratio = score / max;
    if (ratio >= 0.85) return 'excellent';
    if (ratio >= 0.65) return 'good';
    if (ratio >= 0.45) return 'needs_work';
    return 'critical';
  };

  return {
    overallScore,
    tier,
    categories: {
      contact: {
        id: 'contact',
        name: 'Contact & Online Presence',
        score: contactScore,
        maxScore: 15,
        percentage: Math.round((contactScore / 15) * 100),
        status: getStatus(contactScore, 15),
        summary: `${contactScore}/15 pts — Full name, email, phone, location & LinkedIn link.`,
      },
      summary: {
        id: 'summary',
        name: 'Executive Summary',
        score: summaryScore,
        maxScore: 15,
        percentage: Math.round((summaryScore / 15) * 100),
        status: getStatus(summaryScore, 15),
        summary: `${summaryScore}/15 pts — Word count, target job title alignment & tone.`,
      },
      experience: {
        id: 'experience',
        name: 'Work Experience & Impact',
        score: experienceScore,
        maxScore: 25,
        percentage: Math.round((experienceScore / 25) * 100),
        status: getStatus(experienceScore, 25),
        summary: `${experienceScore}/25 pts — ${actionVerbsCount} action verbs & ${metricsCount} quantifiable metrics.`,
      },
      skills: {
        id: 'skills',
        name: 'Skills & Keywords',
        score: skillsScore,
        maxScore: 20,
        percentage: Math.round((skillsScore / 20) * 100),
        status: getStatus(skillsScore, 20),
        summary: `${skillsScore}/20 pts — ${totalSkills} skills across ${skills.length} categories.`,
      },
      education: {
        id: 'education',
        name: 'Education & Credentials',
        score: educationScore,
        maxScore: 15,
        percentage: Math.round((educationScore / 15) * 100),
        status: getStatus(educationScore, 15),
        summary: `${educationScore}/15 pts — Degree, institution & graduation year.`,
      },
      formatting: {
        id: 'formatting',
        name: 'ATS Readability & Layout',
        score: formattingScore,
        maxScore: 10,
        percentage: Math.round((formattingScore / 10) * 100),
        status: getStatus(formattingScore, 10),
        summary: `${formattingScore}/10 pts — Semantic hierarchy & parser structure.`,
      },
    },
    metricsCount,
    actionVerbsCount,
    totalSkillsCount: totalSkills,
    pronounViolationsCount,
    duplicateReport: qualityCheck.report,
    contentQuality,
    suggestions,
    atsPlainText: generateAtsPlainText(safeData),
  };
};

/**
 * Backward and semantic alias for analyzeResumeAts (Open/Closed Principle)
 */
export const analyzeResumeForAts = analyzeResumeAts;


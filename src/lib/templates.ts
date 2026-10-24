import { TemplateDefinition, TemplateId, ResumeSectionId, SectionOrderConfig, LineHeightOption, FontFamily, ResumeData } from '@/types/resume';

export const DEFAULT_SINGLE_COLUMN_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
];

export const DEFAULT_MAIN_COLUMN_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'projects',
];

export const DEFAULT_SIDEBAR_COLUMN_SECTIONS: ResumeSectionId[] = [
  'skills',
  'education',
  'certifications',
  'languages',
];

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
};

export const getDefaultColumnForSection = (
  secId: ResumeSectionId,
  templateId?: TemplateId
): 'main' | 'sidebar' => {
  if (templateId) {
    return getTemplateColumnForSection(templateId, secId);
  }
  switch (secId) {
    case 'skills':
    case 'certifications':
    case 'awards':
    case 'achievements':
    case 'languages':
    case 'interests':
    case 'references':
    case 'courses':
    case 'organizations':
    case 'conferences':
    case 'testScores':
    case 'professionalLinks':
    case 'socialLinks':
    case 'licenses':
      return 'sidebar';
    case 'experience':
    case 'education':
    case 'projects':
    case 'volunteer':
    case 'publications':
    case 'research':
    case 'internships':
    case 'freelance':
    case 'leadership':
    case 'teaching':
    case 'militaryService':
    case 'patents':
    case 'openSource':
    case 'speaking':
    case 'portfolio':
    case 'extracurricular':
    case 'customSections':
    case 'summary':
    default:
      return 'main';
  }
};

export interface TemplateColumnContract {
  mainSections: ResumeSectionId[];
  sidebarSections: ResumeSectionId[];
  summaryPlacement: 'main' | 'sidebar' | 'headerBanner';
  mainFraction: number;
  sidebarFraction: number;
  sidebarPosition?: 'left' | 'right';
}

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
];

export const DEFAULT_ACTIVE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
];

// Reusable master lists for single and double columns
const STANDARD_SINGLE_ALL_SECTIONS: ResumeSectionId[] = [
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
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

const STANDARD_TWO_COL_MAIN_SECTIONS: ResumeSectionId[] = [
  'summary',
  'experience',
  'projects',
  'volunteer',
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'customSections',
];

const STANDARD_TWO_COL_SIDEBAR_SECTIONS: ResumeSectionId[] = [
  'skills',
  'education',
  'certifications',
  'languages',
  'awards',
  'achievements',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
];

// For two-column templates where Education belongs in the Main Column (Zety Cascade, Novorésumé, Enhancv, Canva, Europass)
const TWO_COL_MAIN_WITH_EDUCATION: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'projects',
  'volunteer',
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'customSections',
];

const TWO_COL_SIDEBAR_SKILLS_FIRST: ResumeSectionId[] = [
  'skills',
  'certifications',
  'languages',
  'awards',
  'achievements',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
];

// For templates where Experience & Skills belong in Main, and Education belongs in Sidebar (Canva Retro, Canva Editorial)
const TWO_COL_MAIN_EXPERIENCE_SKILLS: ResumeSectionId[] = [
  'experience',
  'skills',
  'projects',
  'volunteer',
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'customSections',
];

const TWO_COL_SIDEBAR_EDUCATION_FIRST: ResumeSectionId[] = [
  'education',
  'languages',
  'certifications',
  'awards',
  'achievements',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
];

const TWO_COL_SIDEBAR_SUMMARY_EDUCATION: ResumeSectionId[] = [
  'summary',
  'education',
  'languages',
  'certifications',
  'awards',
  'achievements',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
];

const TWO_COL_SIDEBAR_SUMMARY_SKILLS_EDUCATION: ResumeSectionId[] = [
  'summary',
  'education',
  'skills',
  'languages',
  'certifications',
  'awards',
  'achievements',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
];

const TWO_COL_MAIN_EXPERIENCE_FIRST: ResumeSectionId[] = [
  'experience',
  'projects',
  'volunteer',
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'customSections',
];

// Specialized Single-Column Archetypes
// 1. FAANG Software Engineer / Google XYZ format (Tech Stack & Skills prominent up front)
const SILICON_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'skills',
  'experience',
  'projects',
  'education',
  'certifications',
  'awards',
  'achievements',
  'openSource',
  'patents',
  'publications',
  'languages',
  'volunteer',
  'internships',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'conferences',
  'speaking',
  'portfolio',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

// 2. Indian IT & MNC Corporate Pro (Naukri style: Skills & Competencies prominent)
const NAUKRI_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'skills',
  'experience',
  'projects',
  'education',
  'certifications',
  'awards',
  'achievements',
  'languages',
  'internships',
  'courses',
  'licenses',
  'organizations',
  'volunteer',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

// 3. Oxford Executive & CXO (Experience + Education leading with Leadership & Speaking)
const OXFORD_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'skills',
  'experience',
  'education',
  'projects',
  'leadership',
  'certifications',
  'awards',
  'achievements',
  'speaking',
  'publications',
  'languages',
  'volunteer',
  'internships',
  'freelance',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'conferences',
  'patents',
  'openSource',
  'portfolio',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

// 4. Harvard Ivy Classic / Wall St / Legal (Academic pedigree & Education first, then Experience)
const HARVARD_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'education',
  'experience',
  'projects',
  'skills',
  'awards',
  'certifications',
  'leadership',
  'languages',
  'publications',
  'volunteer',
  'internships',
  'freelance',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'courses',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

// 5. Indian Traditional & Sarkari PSU Formal (Qualifications table upfront, followed by Experience)
const TRADITIONAL_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'awards',
  'achievements',
  'languages',
  'courses',
  'internships',
  'volunteer',
  'freelance',
  'leadership',
  'teaching',
  'militaryService',
  'extracurricular',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

// 6. Fresher / Campus Placement (Education matrix first, then Projects & Internships)
const FRESHER_SINGLE_SECTIONS: ResumeSectionId[] = [
  'summary',
  'education',
  'skills',
  'projects',
  'internships',
  'experience',
  'certifications',
  'achievements',
  'awards',
  'languages',
  'extracurricular',
  'leadership',
  'courses',
  'volunteer',
  'freelance',
  'teaching',
  'militaryService',
  'research',
  'publications',
  'conferences',
  'patents',
  'openSource',
  'speaking',
  'portfolio',
  'licenses',
  'organizations',
  'testScores',
  'interests',
  'references',
  'professionalLinks',
  'socialLinks',
  'customSections',
];

export const TEMPLATE_COLUMN_CONTRACTS: Record<TemplateId, TemplateColumnContract> = {
  ats: {
    mainSections: [...STANDARD_SINGLE_ALL_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  vienna: {
    mainSections: [...STANDARD_SINGLE_ALL_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  madrid: {
    mainSections: [...STANDARD_SINGLE_ALL_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  prawira: {
    mainSections: [...STANDARD_TWO_COL_MAIN_SECTIONS],
    sidebarSections: [...STANDARD_TWO_COL_SIDEBAR_SECTIONS],
    summaryPlacement: 'main',
    mainFraction: 0.58,
    sidebarFraction: 0.42,
    sidebarPosition: 'right',
  },
  santoso: {
    // Santoso: summary is in sidebar with profile arc
    mainSections: [
      'experience',
      'projects',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'summary',
      'skills',
      'education',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'sidebar',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'left',
  },
  rahadian: {
    mainSections: [...STANDARD_TWO_COL_MAIN_SECTIONS],
    sidebarSections: [
      'skills',
      'education',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'main',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'right',
  },
  amelia: {
    mainSections: [
      'experience',
      'projects',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'summary',
      'skills',
      'education',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'sidebar',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'left',
  },
  chastain: {
    // Chastain: education in main, summary in sidebar
    mainSections: [
      'experience',
      'education',
      'projects',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'summary',
      'skills',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'sidebar',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'left',
  },
  stockholm: {
    // Stockholm: summary and education in main
    mainSections: [
      'summary',
      'experience',
      'education',
      'projects',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'skills',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'main',
    mainFraction: 0.68,
    sidebarFraction: 0.32,
    sidebarPosition: 'left',
  },
  dublin: {
    // Dublin: education in main, projects in sidebar
    mainSections: [
      'summary',
      'experience',
      'education',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'skills',
      'projects',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'headerBanner',
    mainFraction: 0.60,
    sidebarFraction: 0.40,
    sidebarPosition: 'right',
  },
  sydney: {
    // Sydney: projects in main, education in sidebar
    mainSections: [
      'summary',
      'experience',
      'projects',
      'volunteer',
      'internships',
      'freelance',
      'leadership',
      'teaching',
      'militaryService',
      'extracurricular',
      'research',
      'publications',
      'conferences',
      'patents',
      'openSource',
      'speaking',
      'portfolio',
      'customSections',
    ],
    sidebarSections: [
      'skills',
      'education',
      'certifications',
      'languages',
      'awards',
      'achievements',
      'courses',
      'licenses',
      'organizations',
      'testScores',
      'interests',
      'references',
      'professionalLinks',
      'socialLinks',
    ],
    summaryPlacement: 'headerBanner',
    mainFraction: 0.65,
    sidebarFraction: 0.35,
    sidebarPosition: 'right',
  },
  traditional: {
    mainSections: [...TRADITIONAL_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0.0,
  },
  naukri: {
    mainSections: [...NAUKRI_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0.0,
  },
  fresher: {
    mainSections: [...FRESHER_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0.0,
  },
  sarkari: {
    mainSections: [...TRADITIONAL_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0.0,
  },
  harvard: {
    mainSections: [...HARVARD_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  cascade: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'left',
  },
  novoresume: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.65,
    sidebarFraction: 0.35,
    sidebarPosition: 'right',
  },
  toronto: {
    mainSections: [...STANDARD_SINGLE_ALL_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  enhancv: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.65,
    sidebarFraction: 0.35,
    sidebarPosition: 'right',
  },
  flow: {
    mainSections: [...STANDARD_SINGLE_ALL_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  silicon: {
    mainSections: [...SILICON_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  oxford: {
    mainSections: [...OXFORD_SINGLE_SECTIONS],
    sidebarSections: [],
    summaryPlacement: 'main',
    mainFraction: 1.0,
    sidebarFraction: 0,
  },
  canva: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.67,
    sidebarFraction: 0.33,
    sidebarPosition: 'right',
  },
  europass: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.65,
    sidebarFraction: 0.35,
    sidebarPosition: 'right',
  },
  canvapastel: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.50,
    sidebarFraction: 0.50,
    sidebarPosition: 'left',
  },
  canvanotebook: {
    mainSections: [...TWO_COL_MAIN_WITH_EDUCATION],
    sidebarSections: [...TWO_COL_SIDEBAR_SKILLS_FIRST],
    summaryPlacement: 'main',
    mainFraction: 0.58,
    sidebarFraction: 0.42,
    sidebarPosition: 'left',
  },
  canvaeditorial: {
    mainSections: [...TWO_COL_MAIN_EXPERIENCE_SKILLS],
    sidebarSections: [...TWO_COL_SIDEBAR_SUMMARY_EDUCATION],
    summaryPlacement: 'sidebar',
    mainFraction: 0.55,
    sidebarFraction: 0.45,
    sidebarPosition: 'left',
  },
  canvaretro: {
    mainSections: ['summary', ...TWO_COL_MAIN_EXPERIENCE_SKILLS],
    sidebarSections: [...TWO_COL_SIDEBAR_EDUCATION_FIRST],
    summaryPlacement: 'headerBanner',
    mainFraction: 0.60,
    sidebarFraction: 0.40,
    sidebarPosition: 'left',
  },
  canvaaesthetic: {
    mainSections: [...TWO_COL_MAIN_EXPERIENCE_FIRST],
    sidebarSections: [...TWO_COL_SIDEBAR_SUMMARY_SKILLS_EDUCATION],
    summaryPlacement: 'sidebar',
    mainFraction: 0.65,
    sidebarFraction: 0.35,
    sidebarPosition: 'left',
  },
};

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'prawira',
    name: 'Prawira Modern',
    subtitle: 'Clean Minimalist',
    isPro: false,
    userCount: '14,250 users',
    accentColor: '#2563eb',
    fontFamily: 'inter',
    layout: 'double',
    description: 'Modern two-tone layout with professional header accent, prominent photo, and crisp executive sections.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.prawira.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.prawira.sidebarSections,
  },
  {
    id: 'amelia',
    name: 'Amelia Minimal',
    subtitle: 'Executive Two-Tone',
    isPro: true,
    userCount: '9,840 users',
    accentColor: '#1e293b',
    fontFamily: 'playfair',
    layout: 'double',
    description: 'Clean typographic layout with classic serif styling, ideal for corporate, finance, and legal roles.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.amelia.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.amelia.sidebarSections,
  },
  {
    id: 'chastain',
    name: 'Chastain Executive',
    subtitle: 'Corporate Standard',
    isPro: false,
    userCount: '11,300 users',
    accentColor: '#475569',
    fontFamily: 'jakarta',
    layout: 'double',
    description: 'Sophisticated header band with circular avatar and dual-column balance for skills and experiences.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.chastain.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.chastain.sidebarSections,
  },
  {
    id: 'rahadian',
    name: 'Rahadian Creative',
    subtitle: 'Tech & Engineering',
    isPro: true,
    userCount: '8,900 users',
    accentColor: '#eab308',
    fontFamily: 'jakarta',
    layout: 'double',
    description: 'High-contrast modern layout featuring bold geometric accents, sharp dividers, and tech-forward presentation.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.rahadian.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.rahadian.sidebarSections,
  },
  {
    id: 'santoso',
    name: 'Modern Geometric Arc',
    subtitle: 'Rudian Santoso',
    isPro: false,
    userCount: '3,120 users',
    accentColor: '#f59e0b',
    fontFamily: 'outfit',
    layout: 'double',
    description: 'Eye-catching circular graphic composition made for creative directors, designers, and innovators.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.santoso.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.santoso.sidebarSections,
  },
  {
    id: 'ats',
    name: 'ATS Clean Standard',
    subtitle: 'Corporate Standard',
    isPro: false,
    userCount: '4,100 users',
    accentColor: '#0284c7',
    fontFamily: 'inter',
    layout: 'single',
    description: 'Single-column structure optimized for 99%+ ATS parsing rate and high content density.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.ats.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.ats.sidebarSections,
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    subtitle: 'Resume.io Top Pick',
    isPro: false,
    userCount: '12,840 users',
    accentColor: '#1e293b',
    fontFamily: 'sourcesans',
    layout: 'double',
    description: 'The iconic Resume.io two-column design with a subtle sidebar for personal info, avatar, and skills alongside an expansive main narrative.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.stockholm.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.stockholm.sidebarSections,
  },
  {
    id: 'dublin',
    name: 'Dublin',
    subtitle: 'Resume.io Modern Accent',
    isPro: false,
    userCount: '9,410 users',
    accentColor: '#0f766e',
    fontFamily: 'sourcesans',
    layout: 'double',
    description: 'Crisp, contemporary template with a distinctive colored accent band, modern icons, and structured two-column layout.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.dublin.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.dublin.sidebarSections,
  },
  {
    id: 'sydney',
    name: 'Sydney',
    subtitle: 'Resume.io Creative Split',
    isPro: true,
    userCount: '8,120 users',
    accentColor: '#4f46e5',
    fontFamily: 'outfit',
    layout: 'double',
    description: 'Stylish creative design with rounded avatar presentation, colored section badges, and prominent project showcase.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.sydney.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.sydney.sidebarSections,
  },
  {
    id: 'vienna',
    name: 'Vienna',
    subtitle: 'Resume.io Executive Classic',
    isPro: false,
    userCount: '7,650 users',
    accentColor: '#334155',
    fontFamily: 'playfair',
    layout: 'single',
    description: 'Timeless editorial elegance featuring refined divider rules, centered typography, and executive corporate polish.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.vienna.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.vienna.sidebarSections,
  },
  {
    id: 'madrid',
    name: 'Madrid',
    subtitle: 'Resume.io High-Density',
    isPro: true,
    userCount: '6,890 users',
    accentColor: '#b91c1c',
    fontFamily: 'sourcesans',
    layout: 'single',
    description: 'Compact, clean structure engineered to pack high-density technical experience with modern left-border accents.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.madrid.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.madrid.sidebarSections,
  },
  {
    id: 'traditional',
    name: 'Indian Traditional',
    subtitle: 'Bharat Academic & Corporate',
    isPro: false,
    userCount: '15,420 users',
    accentColor: '#1e3a8a',
    fontFamily: 'garamond',
    layout: 'single',
    description: 'Classic single-column Indian resume format featuring structured academic qualifications table, technical competencies matrix, and formal declaration.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.traditional.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.traditional.sidebarSections,
  },
  {
    id: 'naukri',
    name: 'Naukri Corporate Pro',
    subtitle: 'Indian IT & MNC Standard',
    isPro: false,
    userCount: '18,650 users',
    accentColor: '#0077b5',
    fontFamily: 'jakarta',
    layout: 'single',
    description: 'High-density corporate format tailored for Indian tech hubs (Bengaluru, Hyderabad, Pune, Gurgaon). Features structured technical competencies matrices, project deliverables, and quick recruiter details.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.naukri.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.naukri.sidebarSections,
  },
  {
    id: 'fresher',
    name: 'Campus Placement & Fresher',
    subtitle: 'IIT & NIT Engineering Format',
    isPro: false,
    userCount: '21,300 users',
    accentColor: '#0f766e',
    fontFamily: 'outfit',
    layout: 'single',
    description: 'Optimized for campus recruitment drives across Indian engineering & degree colleges. Highlights 10th/12th/Graduation academic matrix, capstone projects, coding contest ranks, and placement positions.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.fresher.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.fresher.sidebarSections,
  },
  {
    id: 'sarkari',
    name: 'Bharat Sarkari & PSU Formal',
    subtitle: 'PSU, Banking & Govt Exam Standard',
    isPro: false,
    userCount: '16,920 users',
    accentColor: '#1e293b',
    fontFamily: 'merriweather',
    layout: 'single',
    description: 'Formal, authoritative format tailored for Public Sector Undertakings (PSUs), Nationalized Banks (SBI/IBPS), State & Central Govt applications. Includes official qualification matrix, passport photo frame, and verification declaration.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.sarkari.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.sarkari.sidebarSections,
  },
  {
    id: 'harvard',
    name: 'Harvard Ivy Classic',
    subtitle: 'Wall St & Ivy League Standard',
    isPro: false,
    userCount: '24,800 users',
    accentColor: '#1e293b',
    fontFamily: 'garamond',
    layout: 'single',
    description: 'The gold-standard Ivy League format favored by Harvard, Wharton, top management consulting firms, and Wall Street. 100% ATS parse rate.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.harvard.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.harvard.sidebarSections,
  },
  {
    id: 'cascade',
    name: 'Zety Cascade Pro',
    subtitle: 'Zety Top Rated Two-Tone',
    isPro: false,
    userCount: '31,400 users',
    accentColor: '#1e3a8a',
    fontFamily: 'lato',
    layout: 'double',
    description: "Inspired by Zety's #1 most popular layout. Features a crisp modern sidebar, visual timeline experience, and competency pill tags.",
    mainSections: TEMPLATE_COLUMN_CONTRACTS.cascade.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.cascade.sidebarSections,
  },
  {
    id: 'novoresume',
    name: 'Novoresume Modern',
    subtitle: 'Tech & Engineering Balanced Grid',
    isPro: false,
    userCount: '28,100 users',
    accentColor: '#0f766e',
    fontFamily: 'roboto',
    layout: 'double',
    description: 'A crisp modern two-column tech template inspired by Novoresume, featuring category icons, compact skills tags, and clean project blocks.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.novoresume.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.novoresume.sidebarSections,
  },
  {
    id: 'toronto',
    name: 'Resume.io Toronto',
    subtitle: 'Scandinavian Minimalist',
    isPro: false,
    userCount: '19,650 users',
    accentColor: '#2563eb',
    fontFamily: 'rubik',
    layout: 'single',
    description: 'Inspired by Resume.io’s flagship template. Elegant Scandinavian minimalism with soft tint header box, clean typography, and balanced white space.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.toronto.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.toronto.sidebarSections,
  },
  {
    id: 'enhancv',
    name: 'Enhancv Timeline',
    subtitle: 'Visual Career Storytelling',
    isPro: false,
    userCount: '22,900 users',
    accentColor: '#4f46e5',
    fontFamily: 'rubik',
    layout: 'double',
    description: 'Dynamic visual format inspired by Enhancv, with connected career timeline nodes, callout achievement cards, and high-impact skill badges.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.enhancv.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.enhancv.sidebarSections,
  },
  {
    id: 'flow',
    name: 'FlowCV Clean',
    subtitle: 'Refined Modernist Layout',
    isPro: false,
    userCount: '25,300 users',
    accentColor: '#0284c7',
    fontFamily: 'outfit',
    layout: 'single',
    description: 'Ultra-clean, modern aesthetic inspired by FlowCV. Features subtle date pill badges, accent left-bars, and crisp, distraction-free typography.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.flow.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.flow.sidebarSections,
  },
  {
    id: 'silicon',
    name: 'Silicon Valley FAANG',
    subtitle: 'Google & Meta Recruiter Format',
    isPro: false,
    userCount: '34,200 users',
    accentColor: '#2563eb',
    fontFamily: 'raleway',
    layout: 'single',
    description: 'Tailored for software engineering and Big Tech roles. High-density ATS format engineered around Google XYZ bullet formulas and tech stack tags.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.silicon.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.silicon.sidebarSections,
  },
  {
    id: 'oxford',
    name: 'Oxford Executive',
    subtitle: 'Director, VP & CXO Standard',
    isPro: false,
    userCount: '15,750 users',
    accentColor: '#1e3a8a',
    fontFamily: 'garamond',
    layout: 'single',
    description: 'Prestigious executive format designed for senior management, Directors, and C-Suite leaders. Includes executive value proposition and 3-column competencies matrix.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.oxford.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.oxford.sidebarSections,
  },
  {
    id: 'canva',
    name: 'Canva Creative Portfolio',
    subtitle: 'Designer & Marketing Showcase',
    isPro: false,
    userCount: '20,400 users',
    accentColor: '#db2777',
    fontFamily: 'poppins',
    layout: 'double',
    description: 'Vibrant, stylish layout for UI/UX designers, creative leads, and marketing professionals, featuring bold hero typography and portfolio links.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canva.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canva.sidebarSections,
  },
  {
    id: 'europass',
    name: 'Europass Geneva',
    subtitle: 'Modern European International',
    isPro: false,
    userCount: '17,800 users',
    accentColor: '#0369a1',
    fontFamily: 'opensans',
    layout: 'double',
    description: 'Modernized European standard layout optimized for cross-border and multinational applications across the EU, UK, and Switzerland.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.europass.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.europass.sidebarSections,
  },
  {
    id: 'canvapastel',
    name: 'Canva Pastel Doodles',
    subtitle: 'Playful Creative Doodles',
    isPro: false,
    userCount: '19,100 users',
    accentColor: '#fb7185',
    fontFamily: 'poppins',
    layout: 'double',
    description: 'Playful pastel grid notebook design with decorative confetti, dashed border cards, and charming colorful pill badges. Perfect for educators, creatives, and counselors.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canvapastel.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canvapastel.sidebarSections,
  },
  {
    id: 'canvanotebook',
    name: 'Canva Notebook Binder',
    subtitle: 'Spiral Binder & Sticky Notes',
    isPro: false,
    userCount: '21,500 users',
    accentColor: '#f43f5e',
    fontFamily: 'rubik',
    layout: 'double',
    description: 'Realistic spiral binder ring motif with graph paper background, ribbon tabs, and colorful sticky notes featuring 3D dog-ear corner folds.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canvanotebook.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canvanotebook.sidebarSections,
  },
  {
    id: 'canvaeditorial',
    name: 'Canva Editorial Vogue',
    subtitle: 'High-Fashion Creative Grid',
    isPro: false,
    userCount: '18,800 users',
    accentColor: '#1d4ed8',
    fontFamily: 'outfit',
    layout: 'double',
    description: 'High-impact editorial magazine layout with electric royal blue typography, geometric starburst flower accents, and warm gallery beige canvas.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canvaeditorial.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canvaeditorial.sidebarSections,
  },
  {
    id: 'canvaretro',
    name: 'Canva Retro Pop',
    subtitle: 'Y2K Funky Poster Aesthetic',
    isPro: false,
    userCount: '23,400 users',
    accentColor: '#2e1065',
    fontFamily: 'playfair',
    layout: 'double',
    description: 'Vibrant retro creative poster layout framed by a bold rounded purple border, retro serif typography, starbursts, and colorful tag badges.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canvaretro.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canvaretro.sidebarSections,
  },
  {
    id: 'canvaaesthetic',
    name: 'Canva Soft Boho',
    subtitle: 'Arched Minimalist Earthy',
    isPro: false,
    userCount: '22,600 users',
    accentColor: '#c2410c',
    fontFamily: 'jakarta',
    layout: 'double',
    description: 'Refined aesthetic resume featuring an architectural arch photo frame, earthy terracotta and sage tones, and delicate editorial typography.',
    mainSections: TEMPLATE_COLUMN_CONTRACTS.canvaaesthetic.mainSections,
    sidebarSections: TEMPLATE_COLUMN_CONTRACTS.canvaaesthetic.sidebarSections,
  },
];

export const getTemplateLayout = (templateId: TemplateId): 'single' | 'double' => {
  const t = TEMPLATES.find((item) => item.id === templateId);
  return t ? t.layout : 'single';
};

export const getTemplateSidebarPosition = (templateId: TemplateId): 'left' | 'right' => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId];
  return contract?.sidebarPosition ?? 'left';
};

export const getTemplateColumnForSection = (
  templateId: TemplateId,
  secId: ResumeSectionId
): 'main' | 'sidebar' => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId];
  if (contract && contract.sidebarSections.includes(secId)) {
    return 'sidebar';
  }
  return 'main';
};

export const getDefaultSectionOrder = (
  templateId: TemplateId,
  activeOnly: boolean = true,
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'experienced'
): SectionOrderConfig => {
  const isFresher = experienceLevel === 'entry' || templateId === 'fresher';
  const contract = TEMPLATE_COLUMN_CONTRACTS[templateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
  const layout = getTemplateLayout(templateId);

  if (layout === 'single') {
    if (isFresher) {
      const fresherSingle: ResumeSectionId[] = [
        'summary',
        'education',
        'skills',
        'projects',
        'internships',
        'experience',
        'certifications',
        'languages',
      ];
      return {
        singleColumn: activeOnly
          ? fresherSingle.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s) || s === 'internships')
          : [...fresherSingle],
      };
    }
    return {
      singleColumn: activeOnly
        ? contract.mainSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
        : [...contract.mainSections],
    };
  }

  if (isFresher) {
    const fresherMain: ResumeSectionId[] = ['summary', 'education', 'projects', 'internships', 'experience'];
    const fresherSidebar: ResumeSectionId[] = ['skills', 'certifications', 'languages', 'awards', 'interests'];
    return {
      mainColumn: activeOnly
        ? fresherMain.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s) || s === 'internships')
        : [...fresherMain],
      sidebarColumn: activeOnly
        ? fresherSidebar.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
        : [...fresherSidebar],
    };
  }

  return {
    mainColumn: activeOnly
      ? contract.mainSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
      : [...contract.mainSections],
    sidebarColumn: activeOnly
      ? contract.sidebarSections.filter((s) => DEFAULT_ACTIVE_SECTIONS.includes(s))
      : [...contract.sidebarSections],
  };
};

/**
 * Extract all active section IDs from a SectionOrderConfig
 */
export const getActiveSectionsFromOrder = (order?: SectionOrderConfig): ResumeSectionId[] => {
  if (!order) return [];
  const set = new Set<ResumeSectionId>();
  if (Array.isArray(order.singleColumn)) {
    order.singleColumn.forEach((id) => set.add(id));
  }
  if (Array.isArray(order.mainColumn)) {
    order.mainColumn.forEach((id) => set.add(id));
  }
  if (Array.isArray(order.sidebarColumn)) {
    order.sidebarColumn.forEach((id) => set.add(id));
  }
  return Array.from(set);
};

/**
 * Migrates a sectionOrder configuration intelligently when switching templates.
 * Preserves all active sections and places them into main or sidebar columns
 * based on the target template's column contract and section classification.
 */
export const migrateSectionOrder = (
  currentOrder: SectionOrderConfig | undefined,
  targetTemplateId: TemplateId
): SectionOrderConfig => {
  const contract = TEMPLATE_COLUMN_CONTRACTS[targetTemplateId] || TEMPLATE_COLUMN_CONTRACTS.prawira;
  const targetLayout = getTemplateLayout(targetTemplateId);

  const activeIds = getActiveSectionsFromOrder(currentOrder);

  // If no sections were previously active, return defaults
  if (activeIds.length === 0) {
    return getDefaultSectionOrder(targetTemplateId);
  }

  const hasSummary = activeIds.includes('summary');
  const otherActiveIds = activeIds.filter((id) => id !== 'summary');

  if (targetLayout === 'single') {
    // Single column: preserve active order with summary pinned at the front if present
    return {
      singleColumn: hasSummary ? ['summary', ...otherActiveIds] : [...otherActiveIds],
    };
  }

  // Double column: distribute active sections to main and sidebar while preserving relative order
  const mainColumn: ResumeSectionId[] = [];
  const sidebarColumn: ResumeSectionId[] = [];

  otherActiveIds.forEach((id) => {
    if (contract.mainSections.includes(id)) {
      mainColumn.push(id);
    } else if (contract.sidebarSections.includes(id)) {
      sidebarColumn.push(id);
    } else {
      const col = getDefaultColumnForSection(id, targetTemplateId);
      if (col === 'sidebar') {
        sidebarColumn.push(id);
      } else {
        mainColumn.push(id);
      }
    }
  });

  // Always position summary at index 0 of its target column
  if (hasSummary) {
    if (contract.summaryPlacement === 'sidebar' || contract.sidebarSections.includes('summary')) {
      sidebarColumn.unshift('summary');
    } else {
      mainColumn.unshift('summary');
    }
  }

  return {
    mainColumn,
    sidebarColumn,
  };
};

/**
 * Returns a validated and non-empty section order for the current template.
 * If sectionOrder has missing or mismatched columns for the template's layout,
 * it adapts the active sections dynamically.
 */
export const getEffectiveSectionOrder = (
  templateId: TemplateId,
  sectionOrder?: SectionOrderConfig,
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'experienced'
): SectionOrderConfig => {
  const layout = getTemplateLayout(templateId);
  const defaults = getDefaultSectionOrder(templateId, true, experienceLevel);

  if (!sectionOrder) {
    return defaults;
  }

  if (layout === 'single') {
    if (Array.isArray(sectionOrder.singleColumn) && sectionOrder.singleColumn.length > 0) {
      return { singleColumn: [...sectionOrder.singleColumn] };
    }
    // Migrate from main/sidebar to single
    return migrateSectionOrder(sectionOrder, templateId);
  } else {
    const hasMain = Array.isArray(sectionOrder.mainColumn) && sectionOrder.mainColumn.length > 0;
    const hasSidebar = Array.isArray(sectionOrder.sidebarColumn) && sectionOrder.sidebarColumn.length > 0;

    if (hasMain && hasSidebar) {
      return {
        mainColumn: [...(sectionOrder.mainColumn || [])],
        sidebarColumn: [...(sectionOrder.sidebarColumn || [])],
      };
    }

    // If either column is missing or it only had singleColumn, migrate
    return migrateSectionOrder(sectionOrder, templateId);
  }
};

export const COLOR_PALETTES = [
  { name: 'Kindley Royal Blue', value: '#2563eb' },
  { name: 'Slate Dark', value: '#1e293b' },
  { name: 'Emerald Forest', value: '#059669' },
  { name: 'Crimson Burgundy', value: '#991b1b' },
  { name: 'Indigo Night', value: '#4f46e5' },
  { name: 'Amber Gold', value: '#d97706' },
  { name: 'Charcoal Teal', value: '#0d9488' },
  { name: 'Violet Regal', value: '#7c3aed' },
];

export const FONT_OPTIONS: { id: FontFamily; name: string; className: string }[] = [
  { id: 'inter', name: 'Inter (Standard Modern Sans)', className: 'font-inter' },
  { id: 'roboto', name: 'Roboto (Novorésumé Clean)', className: 'font-roboto' },
  { id: 'sourcesans', name: 'Source Sans 3 (Resume.io Classic)', className: 'font-sourcesans' },
  { id: 'poppins', name: 'Poppins (Canva Creative)', className: 'font-poppins' },
  { id: 'montserrat', name: 'Montserrat (Executive Modern)', className: 'font-montserrat' },
  { id: 'lato', name: 'Lato (Zety Cascade Pro)', className: 'font-lato' },
  { id: 'raleway', name: 'Raleway (Kickresume Sleek)', className: 'font-raleway' },
  { id: 'rubik', name: 'Rubik (Enhancv Friendly Sans)', className: 'font-rubik' },
  { id: 'opensans', name: 'Open Sans (Europass Standard)', className: 'font-opensans' },
  { id: 'garamond', name: 'EB Garamond (Harvard & Oxford Serif)', className: 'font-garamond' },
  { id: 'playfair', name: 'Playfair Display (Luxury Serif)', className: 'font-playfair' },
  { id: 'merriweather', name: 'Merriweather (Sarkari Editorial)', className: 'font-merriweather' },
  { id: 'outfit', name: 'Outfit (Modern Geometric)', className: 'font-outfit' },
  { id: 'jakarta', name: 'Plus Jakarta Sans (Tech Executive)', className: 'font-jakarta' },
];

export const getTemplateSignatureFont = (templateId: TemplateId): FontFamily => {
  const template = TEMPLATES.find((t) => t.id === templateId);
  return template?.fontFamily || 'inter';
};

export const LINE_HEIGHT_OPTIONS: {
  id: LineHeightOption;
  name: string;
  sub: string;
  multiplier: number;
  className: string;
}[] = [
  { id: 'tight', name: 'Tight', sub: '1.25', multiplier: 1.25, className: 'leading-snug' },
  { id: 'normal', name: 'Normal', sub: '1.5', multiplier: 1.5, className: 'leading-normal' },
  { id: 'relaxed', name: 'Relaxed', sub: '1.75', multiplier: 1.75, className: 'leading-relaxed' },
];

export const getEffectiveLineHeight = (data?: {
  lineHeight?: LineHeightOption;
  spacing?: 'compact' | 'normal' | 'relaxed';
}): LineHeightOption => {
  if (data?.lineHeight) return data.lineHeight;
  if (data?.spacing === 'compact') return 'tight';
  if (data?.spacing === 'relaxed') return 'relaxed';
  return 'normal';
};

export const getTemplateDefaults = (templateId: TemplateId) => {
  const template = TEMPLATES.find(t => t.id === templateId);
  const themeColor = template?.accentColor || '#2563eb';
  const fontFamily: FontFamily = template?.fontFamily || getTemplateSignatureFont(templateId);

  return {
    themeColor,
    fontFamily,
    typography: {
      primaryFont: fontFamily,
      secondaryFont: fontFamily,
      lineHeight: 1.5,
      sizes: {
        primaryHeading: 24,
        secondaryHeading: 16,
        sectionTitle: 14,
        body: 10,
      },
      weights: {
        primaryHeading: 'bold',
        secondaryHeading: 'semibold',
        sectionTitle: 'bold',
        body: 'normal',
      }
    },
    layout: {
      format: 'A4',
      margins: {
        topBottom: 0.5,
        leftRight: 0.5,
      },
      spacing: {
        betweenSections: ['ats', 'fresher', 'sarkari', 'harvard', 'silicon', 'flow'].includes(templateId) ? 16 : 24,
        betweenTitlesContent: ['ats', 'harvard', 'silicon'].includes(templateId) ? 8 : 12,
        betweenBlocks: ['ats', 'harvard', 'silicon'].includes(templateId) ? 8 : 12,
        insideBlock: 4,
      },
      dateFormat: 'Short Name (Jan YYYY)',
    }
  } as any;
};

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

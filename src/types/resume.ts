export type TemplateId =
  | 'prawira'
  | 'amelia'
  | 'chastain'
  | 'rahadian'
  | 'santoso'
  | 'ats'
  | 'stockholm'
  | 'dublin'
  | 'sydney'
  | 'vienna'
  | 'madrid'
  | 'traditional'
  | 'naukri'
  | 'fresher'
  | 'sarkari'
  | 'harvard'
  | 'harvard_tech'
  | 'harvard_experienced'
  | 'cascade'
  | 'novoresume'
  | 'toronto'
  | 'enhancv'
  | 'flow'
  | 'silicon'
  | 'oxford'
  | 'canva'
  | 'europass'
  | 'canvapastel'
  | 'canvanotebook'
  | 'canvaeditorial'
  | 'canvaretro'
  | 'canvaaesthetic';

export type FontFamily =
  | 'inter'
  | 'roboto'
  | 'sourcesans'
  | 'poppins'
  | 'montserrat'
  | 'lato'
  | 'raleway'
  | 'rubik'
  | 'opensans'
  | 'garamond'
  | 'playfair'
  | 'merriweather'
  | 'outfit'
  | 'jakarta'
  | 'times';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatarUrl?: string;
  summary: string;
}

// ============================================================================
// Composable Foundation Interfaces (SOLID / Interface Segregation Principle)
// ============================================================================

/**
 * Universal entity contract with a unique identifier.
 */
export interface Identifiable {
  id: string;
}

/**
 * Standard date range contract for time-bound professional activities.
 */
export interface DateRange {
  startDate: string;
  endDate: string;
  current?: boolean;
}

/**
 * Contract for entities supporting multi-bullet point accomplishment highlights.
 */
export interface WithHighlights {
  highlights: string[];
}

/**
 * Optional geographic or remote location descriptor.
 */
export interface WithLocation {
  location?: string;
}

/**
 * Optional hyperlink reference.
 */
export interface WithUrl {
  url?: string;
}

// 1. Experience & Work Archetype
export interface ExperienceItem extends Identifiable, DateRange, WithHighlights {
  role: string;
  company: string;
  location: string;
  current: boolean;
}

export interface VolunteerItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  organization: string;
}

export interface InternshipItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  company: string;
  title?: string;
  description?: string;
}

export interface FreelanceItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  client: string;
}

export interface LeadershipItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  organization: string;
}

export interface TeachingItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  institution: string;
}

export interface MilitaryItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  branch: string;
  rank?: string;
}

export interface ExtracurricularItem extends Identifiable, DateRange, WithHighlights, WithLocation {
  role: string;
  organization: string;
}

// 2. Academic & Scholarly Archetype
export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  highlights?: string[];
}

export interface ResearchItem {
  id: string;
  title: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  highlights: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  authors?: string;
  summary?: string;
}

export interface ConferenceItem {
  id: string;
  name: string;
  topic?: string;
  location?: string;
  date: string;
  url?: string;
}

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  issuer: string;
  date: string;
  url?: string;
  summary?: string;
}

// 3. Credentials & Recognition Archetype
export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  summary?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  date?: string;
  description: string;
}

export interface CourseItem {
  id: string;
  name: string;
  institution: string;
  completionDate: string;
  url?: string;
}

export interface LicenseItem {
  id: string;
  name: string;
  issuingAuthority: string;
  licenseNumber?: string;
  date: string;
  expiryDate?: string;
}

export interface OrganizationItem {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
}

// 4. Skills, Tags & Assessment Archetype
export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: string;
}

export interface InterestItem {
  id: string;
  name: string;
  keywords?: string[];
}

export interface TestScoreItem {
  id: string;
  testName: string;
  score: string;
  date?: string;
  maxScore?: string;
}

// 5. Links & Showcase Archetype
export interface ProjectItem {
  id: string;
  title: string;
  link?: string;
  technologies: string[];
  highlights: string[];
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  technologies?: string[];
}

export interface OpenSourceItem {
  id: string;
  projectName: string;
  repoUrl: string;
  role?: string;
  description?: string;
  stars?: string;
}

export interface SpeakingItem {
  id: string;
  topic: string;
  eventName: string;
  date: string;
  location?: string;
  url?: string;
}

// 6. Contact & References Archetype
export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relation?: string;
}

// 7. Custom Section Archetype
export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  location?: string;
  description?: string;
  highlights?: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

// Union of all 33 section IDs
export type ResumeSectionId =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'awards'
  | 'languages'
  | 'volunteer'
  | 'publications'
  | 'research'
  | 'interests'
  | 'references'
  | 'courses'
  | 'internships'
  | 'organizations'
  | 'conferences'
  | 'testScores'
  | 'professionalLinks'
  | 'socialLinks'
  | 'portfolio'
  | 'freelance'
  | 'leadership'
  | 'extracurricular'
  | 'patents'
  | 'openSource'
  | 'speaking'
  | 'teaching'
  | 'militaryService'
  | 'licenses'
  | 'customSections';

export interface SectionOrderConfig {
  singleColumn?: ResumeSectionId[];
  mainColumn?: ResumeSectionId[];
  sidebarColumn?: ResumeSectionId[];
}

export type LineHeightOption = 'tight' | 'normal' | 'relaxed';

export interface ResumeData {
  id: string;
  title: string;
  status: 'draft' | 'completed';
  updatedAt: string;
  templateId: TemplateId;
  themeColor: string;
  fontFamily: FontFamily;
  lineHeight?: LineHeightOption;
  spacing?: 'compact' | 'normal' | 'relaxed';
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];

  // Extended 33 sections
  achievements?: AchievementItem[];
  awards?: AwardItem[];
  volunteer?: VolunteerItem[];
  publications?: PublicationItem[];
  research?: ResearchItem[];
  interests?: InterestItem[];
  references?: ReferenceItem[];
  courses?: CourseItem[];
  internships?: InternshipItem[];
  organizations?: OrganizationItem[];
  conferences?: ConferenceItem[];
  testScores?: TestScoreItem[];
  professionalLinks?: LinkItem[];
  socialLinks?: LinkItem[];
  portfolio?: PortfolioItem[];
  freelance?: FreelanceItem[];
  leadership?: LeadershipItem[];
  extracurricular?: ExtracurricularItem[];
  patents?: PatentItem[];
  openSource?: OpenSourceItem[];
  speaking?: SpeakingItem[];
  teaching?: TeachingItem[];
  militaryService?: MilitaryItem[];
  licenses?: LicenseItem[];
  customSections?: CustomSection[];

  pageNumber?: number;
  totalPages?: number;
  hasSidebarContent?: boolean;
  hasMainContent?: boolean;
  sectionOrder?: SectionOrderConfig;
  hiddenSections?: ResumeSectionId[];
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'experienced';
  targetJob?: {
    title?: string;
    company?: string;
    jobDescription?: string;
  };

  typography?: TypographySettings;
  layout?: LayoutSettings;

  userId?: string;
  syncedToCloud?: boolean;
}

export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographySettings {
  primaryFont?: FontFamily;
  secondaryFont?: FontFamily;
  lineHeight?: number;

  sizes?: {
    primaryHeading?: number;
    secondaryHeading?: number;
    sectionTitle?: number;
    body?: number;
  };

  weights?: {
    primaryHeading?: FontWeight;
    secondaryHeading?: FontWeight;
    sectionTitle?: FontWeight;
    body?: FontWeight;
  };
}

export interface LayoutSettings {
  format?: 'A4' | 'Letter';
  dateFormat?: 'Short Name (Jan YYYY)' | 'Numeric (01/2023)' | 'Year Only (2023)' | 'Hidden';

  margins?: {
    topBottom?: number; // in inches
    leftRight?: number; // in inches
    headerFooter?: number; // in inches
  };

  spacing?: {
    betweenSections?: number; // pt
    betweenTitlesContent?: number; // pt
    betweenBlocks?: number; // pt
    insideBlock?: number; // pt
  };
}

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  subtitle: string;
  isPro: boolean;
  userCount: string;
  previewImage?: string;
  accentColor: string;
  description: string;
  layout: 'single' | 'double';
  fontFamily?: FontFamily;
  mainSections?: ResumeSectionId[];
  sidebarSections?: ResumeSectionId[];
}

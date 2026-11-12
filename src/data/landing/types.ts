export interface HeroSectionData {
  badge: {
    text: string;
    icon?: string;
  };
  title: string;
  highlightedPhrase: string;
  subtitle: string;
  ctaPrimary: {
    text: string;
    href: string;
  };
  ctaSecondary: {
    text: string;
    href: string;
  };
  trustBadges: string[];
}

export interface QuickStat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface FullTextResumeData {
  personalInfo: {
    name: string;
    targetTitle: string;
    contactLine: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    role: string;
    institution: string;
    period: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    scoreOrSpecialization?: string;
  }>;
  certifications: string[];
  skills: {
    pedagogy: string[];
    techAndTools: string[];
    softSkills: string[];
  };
  coCurricular?: string[];
}

export interface TeacherResumeExample {
  id: string;
  title: string;
  roleType: 'Experienced' | 'Fresher' | 'Primary' | 'Secondary';
  badge: string;
  experienceLabel: string;
  targetRole: string;
  whyThisWorks: {
    measurableImpact: string;
    credentialsClarity: string;
    pedagogicalTech: string;
  };
  resumeData: FullTextResumeData;
}

export interface GuideStep {
  stepNumber: number;
  sectionName: string;
  title: string;
  summary: string;
  whyPrincipalsCare: string;
  keyTakeaway?: string;
  bulletTips: string[];
  avoidThis?: string;
  exampleSnippet?: {
    label: string;
    content: string;
  };
}

export interface HowToWriteGuideData {
  badge?: string;
  title: string;
  subtitle: string;
  steps: GuideStep[];
}

export interface ExperiencedExtraDetailItem {
  title: string;
  badge: string;
  whyItMatters: string;
  whatToAdd: string[];
  exampleBullet: string;
}

export interface ExperiencedExtraDetailsData {
  badge: string;
  title: string;
  subtitle: string;
  comparisonNote: {
    fresherFocus: string;
    experiencedFocus: string;
  };
  extraPillars: ExperiencedExtraDetailItem[];
}

export interface DoItem {
  title: string;
  description: string;
  concreteExample?: string;
}

export interface DontItem {
  title: string;
  description: string;
  mistakeExample?: string;
  correctApproach?: string;
}

export interface DosAndDontsData {
  badge?: string;
  title: string;
  subtitle: string;
  dos: DoItem[];
  donts: DontItem[];
}

export interface CareerApproach {
  id: string;
  roleTitle: string;
  gradeOrTarget: string;
  badge: string;
  coreStrategy: string;
  keyFocusAreas: string[];
  mandatoryCredentials: string[];
  sampleSummary: string;
  sampleBullets: string[];
  topSkills: string[];
}

export interface DifferentApproachesData {
  badge?: string;
  title: string;
  subtitle: string;
  approaches: CareerApproach[];
}

export interface FresherSectionData {
  badge: string;
  title: string;
  subtitle: string;
  strategies: Array<{
    title: string;
    description: string;
    actionableTip: string;
  }>;
  careerObjectives: string[];
}

export interface SkillCategory {
  categoryName: string;
  description?: string;
  skills: string[];
}

export interface SkillsMatrixData {
  badge?: string;
  title: string;
  subtitle: string;
  categories: SkillCategory[];
}

export interface BulletComparison {
  roleContext: string;
  weakText: string;
  strongText: string;
  analysis: string;
}

export interface BulletFormulasData {
  badge?: string;
  title: string;
  subtitle: string;
  comparisons: BulletComparison[];
}

export interface FormatDownloadCard {
  format: 'Word' | 'PDF';
  title: string;
  extension: string;
  badge: string;
  description: string;
  features: string[];
  primaryActionText: string;
}

export interface TopicalClusterRole {
  roleName: string;
  badge: string;
  description: string;
  keyRequirement: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionData {
  badge?: string;
  title: string;
  subtitle: string;
  faqs: FaqItem[];
}

export interface TemplateRecommendation {
  id: string;
  name: string;
  badge: string;
  description: string;
  layout: 'single' | 'double';
  recommendedFor: string;
}

export interface RoleLandingPageContent {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    ogImage?: string;
  };
  jsonLd: {
    webApp: Record<string, unknown>;
    breadcrumb: Record<string, unknown>;
    faq: Record<string, unknown>;
  };
  hero: HeroSectionData;
  quickStats?: QuickStat[];
  resumeExamples: TeacherResumeExample[];
  formatDownloads: FormatDownloadCard[];
  fresherMasterclass: FresherSectionData;
  howToWriteGuide: HowToWriteGuideData;
  experiencedExtraDetails: ExperiencedExtraDetailsData;
  dosAndDonts: DosAndDontsData;
  differentApproaches: DifferentApproachesData;
  skillsMatrix: SkillsMatrixData;
  bulletPointFormulas: BulletFormulasData;
  topicalCluster: TopicalClusterRole[];
  recommendedTemplates: TemplateRecommendation[];
  faqSection: FaqSectionData;
  bottomCta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
  };
}

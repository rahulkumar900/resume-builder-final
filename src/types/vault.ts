export type DataSource = 'linkedin' | 'pdf_upload' | 'manual' | 'ai_generated';

export interface VaultMetric {
  original: string; // e.g., "Improved API performance by 40%"
  verified: boolean;
  value: string; // e.g., "40%"
  label?: string; // e.g., "Performance Improvement"
}

export interface VaultAchievement {
  id: string;
  description: string;
  metrics: VaultMetric[];
  technologies: string[];
  source: DataSource;
  verified: boolean;
  createdAt: string;
}

export interface VaultExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: VaultAchievement[];
  source: DataSource;
  verified: boolean;
}

export interface VaultProject {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  achievements: VaultAchievement[];
  source: DataSource;
  verified: boolean;
}

export interface VaultSkill {
  id: string;
  name: string;
  category: 'Languages' | 'Frameworks' | 'Tools' | 'Cloud' | 'Soft Skills' | 'Other';
  verified: boolean;
}

export interface VaultEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  score?: string; // Important for Indian freshers (e.g. "95% in 12th Board")
  verified: boolean;
}

export interface VaultCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  url?: string;
  verified: boolean;
}

export interface VaultLanguage {
  id: string;
  name: string;
  proficiency?: string;
  verified: boolean;
}

export interface VaultAward {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  description?: string;
  verified: boolean;
}

export interface VaultInvolvement {
  id: string;
  organization: string;
  role: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description?: string;
  verified: boolean;
}

export interface VaultPublication {
  id: string;
  title: string;
  publisher: string;
  date?: string;
  url?: string;
  description?: string;
  verified: boolean;
}

export interface VaultCustomSection {
  id: string;
  title: string;
  items: any[];
}

export interface VaultProfile {
  id: string;
  userId: string;
  experiences: VaultExperience[];
  projects: VaultProject[];
  skills: VaultSkill[];
  education: VaultEducation[];
  certifications: VaultCertification[];
  languages: VaultLanguage[];
  awards: VaultAward[];
  involvements: VaultInvolvement[];
  publications: VaultPublication[];
  customSections: VaultCustomSection[];
  targetMarket: 'global' | 'india' | 'us';
  updatedAt: string;
}

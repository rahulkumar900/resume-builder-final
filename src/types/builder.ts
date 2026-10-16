import { LucideIcon } from 'lucide-react';
import {
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from '@/types/resume';

import { ResumeData } from '@/types/resume';

export type SectionKey =
  | 'personal'
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
  | 'customSections'
  | 'review';

export interface SectionComponentProps<T> {
  data: T;
  onChange: (updated: T) => void;
  hideHeader?: boolean;
}

export interface NavItemConfig {
  key: SectionKey | 'all';
  label: string;
  icon: LucideIcon;
  category?: 'core' | 'academic' | 'credentials' | 'showcase' | 'community' | 'other';
  getCount?: (resume: ResumeData) => number | null;
}

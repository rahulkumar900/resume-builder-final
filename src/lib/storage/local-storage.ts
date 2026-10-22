/**
 * @fileoverview Client-side Storage Provider.
 * Manages browser persistence across localStorage and IndexedDB with quota eviction,
 * tombstoning for deleted records, and custom resume initialization.
 */

import { ResumeData, TemplateId, SectionOrderConfig } from '@/types/resume';
import { idbGet, idbSet, idbDelete } from '@/lib/idb';
import { getDynamicSections } from '@/lib/onboarding-logic';
import { getTemplateSignatureFont } from '@/lib/templates';
import { isDummyResume } from './resume-fixtures';
import {
  saveResumeToDatabase,
  getResumeFromDatabase,
  deleteResumeFromDatabase,
} from './cloud-storage';

export const STORAGE_KEY = 'kindley_resumes_v1';
export const DELETED_RESUMES_KEY = 'resume_builder_deleted_ids';

/**
 * Safely sets an item in localStorage with automatic quota management.
 * If quota is exceeded, cleans up redundant direct keys and falls back gracefully.
 *
 * @param key - The localStorage key.
 * @param value - The stringified payload.
 * @returns boolean indicating success or failure.
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: any) {
    const isQuotaError =
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err?.code === 22 ||
      err?.code === 1014;

    if (isQuotaError) {
      try {
        // Prune direct redundant resume-* keys from localStorage
        // Since full resume data is preserved in STORAGE_KEY and IndexedDB
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k !== STORAGE_KEY && k.startsWith('resume-')) {
            keysToRemove.push(k);
          }
        }
        for (const k of keysToRemove) {
          localStorage.removeItem(k);
        }

        // Retry saving
        localStorage.setItem(key, value);
        return true;
      } catch {
        // Silently fallback without crashing; IndexedDB handles persistence
        return false;
      }
    }
    return false;
  }
}

/**
 * Retrieves all stored user resumes from local storage.
 * Automatically filters out demo/seed records so user dashboard remains clean.
 */
export function getStoredResumes(): ResumeData[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any dummy seed resumes so user dashboard is clean
      const userResumes = parsed.filter((r: ResumeData) => {
        if (!r || !r.id) return false;
        if (isDummyResume(r)) return false;
        return true;
      });

      // If dummy resumes were cleaned up, update storage
      if (userResumes.length !== parsed.length) {
        saveStoredResumes(userResumes);
      }
      return userResumes;
    }
    return [];
  } catch (err) {
    console.warn('Failed to read from localStorage:', err);
    return [];
  }
}

/**
 * Persists an array of resumes into both localStorage and IndexedDB.
 */
export function saveStoredResumes(resumes: ResumeData[]): void {
  if (typeof window === 'undefined') return;
  safeLocalStorageSet(STORAGE_KEY, JSON.stringify(resumes));
  idbSet(STORAGE_KEY, resumes).catch(() => {});
}

/**
 * Clears the local storage cache and active keys.
 */
export function clearLocalResumesCache(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DELETED_RESUMES_KEY);
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k === STORAGE_KEY || k === DELETED_RESUMES_KEY || k.startsWith('resume-') || k.startsWith('kindley_'))) {
        toRemove.push(k);
      }
    }
    for (const k of toRemove) {
      localStorage.removeItem(k);
    }
    idbSet(STORAGE_KEY, []).catch(() => {});
  } catch (err) {
    console.warn('Failed to clear local resumes cache:', err);
  }
}

/**
 * Retrieves a resume synchronously from the local storage cache or direct key.
 */
export function getResumeById(id: string): ResumeData | null {
  const resumes = getStoredResumes();
  const found = resumes.find((r) => r.id === id);
  if (found) {
    removeDeletedResumeId(id);
    return found;
  }

  // Fallback: Check direct localStorage key safely
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(id);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && parsed.id) {
          removeDeletedResumeId(parsed.id);
          saveResume(parsed as ResumeData);
          return parsed as ResumeData;
        }
      }
    } catch {
      // Ignore parse or read errors
    }
  }

  return null;
}

/**
 * Async version of getResumeById that checks memory, localStorage, IndexedDB, and Supabase DB.
 */
export async function getResumeByIdAsync(id: string): Promise<ResumeData | null> {
  const local = getResumeById(id);
  if (local) return local;

  // 1. Check IndexedDB
  try {
    const fromIdb = await idbGet<ResumeData>(id);
    if (fromIdb && fromIdb.id) {
      removeDeletedResumeId(fromIdb.id);
      saveResume(fromIdb);
      return fromIdb;
    }
  } catch {
    // Ignore idb errors
  }

  // 2. Check Supabase Database
  try {
    const fromDb = await getResumeFromDatabase(id);
    if (fromDb && fromDb.id) {
      removeDeletedResumeId(fromDb.id);
      saveResume(fromDb);
      return fromDb;
    }
  } catch {
    // Ignore db errors
  }

  return null;
}

/**
 * Saves a single resume to local storage, IndexedDB, and asynchronously triggers
 * cloud sync if authenticated.
 */
export function saveResume(resume: ResumeData): void {
  removeDeletedResumeId(resume.id);
  const resumes = getStoredResumes();
  const index = resumes.findIndex((r) => r.id === resume.id);
  const updatedResume: ResumeData = {
    ...resume,
    updatedAt: 'Just now',
  };

  if (index >= 0) {
    resumes[index] = updatedResume;
  } else {
    resumes.unshift(updatedResume);
  }

  saveStoredResumes(resumes);

  // Limit direct localStorage keys to small payloads to prevent QuotaExceededError
  if (typeof window !== 'undefined' && resume.id) {
    idbSet(resume.id, updatedResume).catch(() => {});
    const serialized = JSON.stringify(updatedResume);
    // Only attempt direct key if under 250KB to preserve localStorage quota
    if (serialized.length < 250000) {
      safeLocalStorageSet(resume.id, serialized);
    }
  }

  // Auto-sync to Supabase if authenticated
  if (typeof window !== 'undefined') {
    saveResumeToDatabase(updatedResume).catch(() => {});
  }
}

/**
 * Returns the set of tombstone resume IDs that have been explicitly deleted.
 */
export function getDeletedResumeIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_RESUMES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

/**
 * Adds a resume ID to the deleted tombstone set to prevent unwanted resurrections.
 */
export function addDeletedResumeId(id: string): void {
  if (typeof window === 'undefined' || !id) return;
  try {
    const set = getDeletedResumeIds();
    set.add(id);
    localStorage.setItem(DELETED_RESUMES_KEY, JSON.stringify(Array.from(set)));
  } catch {}
}

/**
 * Removes a resume ID from the tombstone set if needed.
 */
export function removeDeletedResumeId(id: string): void {
  if (typeof window === 'undefined' || !id) return;
  try {
    const set = getDeletedResumeIds();
    if (set.delete(id)) {
      localStorage.setItem(DELETED_RESUMES_KEY, JSON.stringify(Array.from(set)));
    }
  } catch {}
}

/**
 * Purges a resume immediately from all local storage mechanisms (key, main list, IndexedDB).
 */
export function purgeLocalResumeDirectly(id: string): void {
  if (typeof window === 'undefined' || !id) return;
  try {
    localStorage.removeItem(id);
  } catch {}
  idbDelete(id).catch(() => {});
  const current = getStoredResumes();
  const filtered = current.filter((r) => r.id !== id);
  if (filtered.length !== current.length) {
    saveStoredResumes(filtered);
  }
}

/**
 * Deletes a resume locally and remotely.
 */
export function deleteResume(id: string): ResumeData[] {
  addDeletedResumeId(id);
  const resumes = getStoredResumes().filter((r) => r.id !== id);
  saveStoredResumes(resumes);

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(id);
    } catch {}
    idbDelete(id).catch(() => {});
    deleteResumeFromDatabase(id).catch(() => {});
  }

  return resumes;
}

/**
 * Clones an existing resume with a fresh ID and timestamp.
 */
export function duplicateResume(id: string): ResumeData | null {
  const existing = getResumeById(id);
  if (!existing) return null;
  const newResume: ResumeData = {
    ...JSON.parse(JSON.stringify(existing)),
    id: `resume-${Date.now()}`,
    title: `${existing.title} (Copy)`,
    updatedAt: 'Just now',
    status: 'draft',
    syncedToCloud: false,
  };
  const resumes = getStoredResumes();
  resumes.unshift(newResume);
  saveStoredResumes(resumes);

  if (typeof window !== 'undefined') {
    idbSet(newResume.id, newResume).catch(() => {});
    saveResumeToDatabase(newResume).catch(() => {});
  }

  return newResume;
}

export interface CreateCustomResumeOptions {
  title?: string;
  targetRole?: string;
  fullName?: string;
  templateId?: TemplateId;
  themeColor?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior';
  starterType?: 'tailored' | 'sample' | 'blank';
  sectionOrder?: SectionOrderConfig;
}

/**
 * Factory function to construct and persist a customized initial resume model.
 */
export function createCustomResume(options: CreateCustomResumeOptions = {}): ResumeData {
  const {
    targetRole = '',
    fullName = '',
    templateId = 'prawira',
    themeColor = '#2563eb',
    experienceLevel = 'entry',
    starterType = 'blank',
    sectionOrder,
  } = options;

  const title = options.title || (targetRole ? `${targetRole} Resume` : 'Untitled Resume');
  const now = Date.now();
  const isSample = starterType === 'sample';
  const isFresher = experienceLevel === 'entry';

  const defaultExp: ResumeData['experience'] = isSample && !isFresher
    ? [
        {
          id: `exp-${now}-1`,
          role: targetRole || 'Software Engineer',
          company: 'Company Name',
          location: 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded development of key systems, boosting efficiency and user engagement by 30%.',
            'Collaborated with cross-functional teams to deliver scalable features ahead of target schedule.',
          ],
        },
      ]
    : [];

  const defaultInternships: ResumeData['internships'] = isSample && isFresher
    ? [
        {
          id: `int-${now}-1`,
          role: targetRole ? `${targetRole} Intern` : 'Software Engineering Intern',
          company: 'Tech Solutions (Summer Internship)',
          location: 'Remote / Hybrid',
          startDate: 'Jun 2023',
          endDate: 'Aug 2023',
          current: false,
          highlights: [
            `Assisted engineering team in developing responsive interfaces and testing APIs for ${targetRole || 'engineering'} workflows.`,
            'Collaborated with cross-functional peers during weekly agile sprints and code review sessions.',
          ],
        },
      ]
    : [];

  const defaultEdu: ResumeData['education'] = isSample
    ? [
        {
          id: `edu-${now}-1`,
          degree: isFresher ? 'B.S. in Computer Science (or Relevant Degree)' : 'B.S. in Computer Science or Related Field',
          school: 'University Name',
          location: 'City, State',
          graduationDate: isFresher ? '2024' : '2021',
          gpa: isFresher ? '3.8 / 4.0' : '',
          highlights: isFresher
            ? ['Relevant Coursework: Data Structures, Database Management, System Design', 'Academic Honors / Dean’s List']
            : ['Relevant Coursework & Projects'],
        },
      ]
    : [];

  const defaultSkills: ResumeData['skills'] = isSample
    ? [
        {
          id: `sk-${now}-1`,
          category: 'Core Competencies',
          items: isFresher
            ? ['Problem Solving', 'Data Structures', 'Web Development', 'Git / Version Control', 'Team Collaboration']
            : ['Problem Solving', 'Team Leadership', 'Project Execution', 'Strategic Planning'],
        },
      ]
    : [];

  const defaultProjects: ResumeData['projects'] = isSample
    ? [
        {
          id: `proj-${now}-1`,
          title: targetRole ? `${targetRole} Capstone Project` : 'Featured Capstone Project',
          technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
          highlights: [
            'Engineered full-stack responsive web application with authenticated dashboards and real-time data sync.',
            'Optimized bundle performance and database queries, achieving sub-200ms API response times.',
          ],
        },
      ]
    : [];

  const resolvedSectionOrder =
    sectionOrder ||
    getDynamicSections(targetRole || 'General', experienceLevel);

  const newResume: ResumeData = {
    id: `resume-${now}`,
    title,
    status: 'draft',
    updatedAt: 'Just now',
    templateId,
    themeColor,
    experienceLevel,
    sectionOrder: resolvedSectionOrder,
    fontFamily: getTemplateSignatureFont(templateId),
    spacing: 'normal',
    personalInfo: {
      fullName: fullName || '',
      jobTitle: targetRole || '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      avatarUrl: '',
      summary: isSample
        ? isFresher
          ? `Ambitious and detail-oriented ${targetRole || 'graduate'} with hands-on project experience in modern frameworks, algorithmic problem solving, and agile development.`
          : `Results-driven ${targetRole || 'professional'} with proven expertise in delivering impactful products, leading technical execution, and collaborating with cross-functional teams.`
        : '',
    },
    experience: defaultExp,
    internships: defaultInternships,
    education: defaultEdu,
    skills: defaultSkills,
    projects: defaultProjects,
    certifications: [],
    languages: isSample ? [{ id: `lang-${now}-1`, language: 'English', proficiency: 'Native' }] : [],
    volunteer: [],
    publications: [],
    awards: [],
    courses: [],
    interests: [],
    references: [],
  };

  const resumes = getStoredResumes();
  resumes.unshift(newResume);
  saveStoredResumes(resumes);
  return newResume;
}

/**
 * Creates a clean, empty resume for a given template.
 */
export function createBlankResume(templateId: TemplateId = 'prawira'): ResumeData {
  return createCustomResume({ templateId, starterType: 'blank', targetRole: '', fullName: '' });
}

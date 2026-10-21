/**
 * @fileoverview Resume Cloud Sync Service.
 * Harmonizes client guest drafts with Supabase database upon user login.
 * Ensures the cloud remains the authoritative source of truth and prevents resurrecting
 * deleted resumes.
 */

import { ResumeData } from '@/types/resume';
import { isDummyResume } from './resume-fixtures';
import {
  getStoredResumes,
  saveStoredResumes,
  getDeletedResumeIds,
  addDeletedResumeId,
  purgeLocalResumeDirectly,
} from './local-storage';
import {
  getAllResumesFromDatabase,
  saveResumeToDatabase,
} from './cloud-storage';

/**
 * Merges local resumes and cloud resumes.
 * The Cloud database is the authoritative source of truth for authenticated users.
 * If a resume was previously synced or belonged to this user, but is missing from
 * the cloud, it was deleted in the database and is purged locally (never re-uploaded).
 *
 * @param userId - Authenticated Supabase user UID.
 */
export async function syncLocalResumesToDatabase(userId: string): Promise<void> {
  if (!userId) return;
  try {
    const cloudResumes = await getAllResumesFromDatabase(userId);
    const cloudMap = new Map<string, ResumeData>(cloudResumes.map((r) => [r.id, r]));
    const deletedIds = getDeletedResumeIds();

    const localResumes = getStoredResumes();
    const mergedMap = new Map<string, ResumeData>();

    // 1. Add all cloud resumes that have not been explicitly deleted by the user
    for (const cloud of cloudResumes) {
      if (!deletedIds.has(cloud.id)) {
        mergedMap.set(cloud.id, cloud);
      }
    }

    // 2. Add and preserve all local resumes (NEVER purge unless explicitly in deletedIds)
    for (const local of localResumes) {
      if (deletedIds.has(local.id)) {
        purgeLocalResumeDirectly(local.id);
        continue;
      }

      const existingInCloud = cloudMap.get(local.id);
      if (!existingInCloud) {
        // Local resume not yet in cloud: safely upload to cloud
        if (!isDummyResume(local)) {
          const syncedResume: ResumeData = {
            ...local,
            syncedToCloud: true,
            userId,
          };
          mergedMap.set(local.id, syncedResume);
          saveResumeToDatabase(syncedResume, userId).catch((err) =>
            console.error('[Sync] Failed to upload local resume to cloud:', err)
          );
        }
      } else {
        // Merge preferring the latest content
        mergedMap.set(local.id, existingInCloud);
      }
    }

    // 3. Keep local cache synchronized with the complete merged set
    const finalList = Array.from(mergedMap.values());
    if (finalList.length > 0) {
      saveStoredResumes(finalList);
    }
  } catch (err) {
    console.warn('[Sync] Local and cloud sync error:', err);
  }
}

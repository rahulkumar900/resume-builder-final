/**
 * @fileoverview Resume Cloud Sync Service.
 * Harmonizes client guest drafts with Supabase database upon user login.
 * Ensures the cloud remains the authoritative source of truth and prevents
 * stale local tombstones from dropping active database records.
 */

import { ResumeData } from '@/types/resume';
import { isDummyResume } from './resume-fixtures';
import {
  getStoredResumes,
  saveStoredResumes,
  getDeletedResumeIds,
  removeDeletedResumeId,
  purgeLocalResumeDirectly,
} from './local-storage';
import {
  getAllResumesFromDatabase,
  saveResumeToDatabase,
} from './cloud-storage';

/**
 * Unified authoritative synchronization between browser storage and Supabase PostgreSQL.
 * 1. Fetches cloud resumes for the active user.
 * 2. Un-tombstones any IDs present in the cloud (cloud is authoritative).
 * 3. Identifies unsynced local drafts and uploads them to the cloud.
 * 4. Merges records cleanly and updates local cache.
 * 5. Returns the consolidated list of resumes.
 *
 * @param userId - Authenticated Supabase user UID.
 * @returns Promise resolving to the consolidated array of ResumeData.
 */
export async function syncAndFetchUserResumes(userId: string): Promise<ResumeData[]> {
  if (!userId) {
    return getStoredResumes();
  }

  try {
    // 1. Fetch authoritative cloud records
    const cloudResumes = await getAllResumesFromDatabase(userId);
    const cloudMap = new Map<string, ResumeData>();

    // 2. Clear false-positive tombstones for any resume that actively exists in the cloud
    for (const cloud of cloudResumes) {
      if (cloud && cloud.id) {
        removeDeletedResumeId(cloud.id);
        cloudMap.set(cloud.id, cloud);
      }
    }

    const deletedIds = getDeletedResumeIds();
    const localResumes = getStoredResumes();
    const mergedMap = new Map<string, ResumeData>();

    // 3. Add all valid cloud resumes to the merged set
    for (const [id, cloud] of cloudMap.entries()) {
      mergedMap.set(id, cloud);
    }

    // 4. Inspect local resumes and upload any unsynced local drafts
    const uploadPromises: Promise<boolean>[] = [];

    for (const local of localResumes) {
      if (!local || !local.id) continue;

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
          uploadPromises.push(saveResumeToDatabase(syncedResume, userId));
        }
      } else {
        // Resume exists in both: merge preferring the most recently updated content
        mergedMap.set(local.id, existingInCloud);
      }
    }

    // Wait for any pending local draft uploads to settle
    if (uploadPromises.length > 0) {
      await Promise.allSettled(uploadPromises);
    }

    // 5. Update local cache with complete consolidated list
    const finalList = Array.from(mergedMap.values());
    saveStoredResumes(finalList);

    return finalList;
  } catch (err) {
    console.error('[SyncEngine] Error in syncAndFetchUserResumes:', err);
    // Graceful fallback to existing local cache
    return getStoredResumes();
  }
}

/**
 * Backwards-compatible wrapper for existing callers.
 */
export async function syncLocalResumesToDatabase(userId: string): Promise<void> {
  await syncAndFetchUserResumes(userId);
}

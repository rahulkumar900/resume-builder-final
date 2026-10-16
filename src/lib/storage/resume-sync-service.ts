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
    const cloudIds = new Set(cloudResumes.map((r) => r.id));
    const deletedIds = getDeletedResumeIds();

    const localResumes = getStoredResumes();

    // 1. Prune local resumes that were deleted from the database
    for (const local of localResumes) {
      if (deletedIds.has(local.id)) {
        purgeLocalResumeDirectly(local.id);
        continue;
      }
      // If it belonged to this user or was synced, and is not in cloud -> DELETED!
      if ((local.userId === userId || local.syncedToCloud) && !cloudIds.has(local.id)) {
        addDeletedResumeId(local.id);
        purgeLocalResumeDirectly(local.id);
      }
    }

    // 2. Only upload truly un-synced guest draft resumes created before sign-in
    const updatedLocal = getStoredResumes();
    for (const local of updatedLocal) {
      if (
        !isDummyResume(local) &&
        !cloudIds.has(local.id) &&
        !local.syncedToCloud &&
        !local.userId &&
        !deletedIds.has(local.id)
      ) {
        const syncedResume: ResumeData = {
          ...local,
          syncedToCloud: true,
          userId,
        };
        const ok = await saveResumeToDatabase(syncedResume, userId);
        if (ok) {
          cloudIds.add(local.id);
        }
      }
    }

    // 3. Keep local cache synchronized with authoritative cloud data
    const finalCloud = await getAllResumesFromDatabase(userId);
    if (finalCloud.length > 0) {
      saveStoredResumes(finalCloud);
    } else {
      // Cloud has 0 resumes: prune all resumes associated with this user
      const guestDrafts = getStoredResumes().filter(
        (r) => !r.userId && !r.syncedToCloud && !deletedIds.has(r.id)
      );
      saveStoredResumes(guestDrafts);
    }
  } catch (err) {
    console.warn('[Sync] Local and cloud sync skipped:', err);
  }
}

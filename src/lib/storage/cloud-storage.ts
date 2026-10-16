/**
 * @fileoverview Supabase Cloud Storage Persistence Provider.
 * Implements remote data access for authenticated users with error handling
 * and deletion safeguards.
 */

import { ResumeData } from '@/types/resume';
import { supabase } from '@/lib/supabaseClient';
import {
  getDeletedResumeIds,
  addDeletedResumeId,
  purgeLocalResumeDirectly,
  getStoredResumes,
  safeLocalStorageSet,
  STORAGE_KEY,
} from './local-storage';

/**
 * Saves or updates a resume in the Supabase PostgreSQL database.
 * Safeguarded against resurrecting records flagged as deleted.
 *
 * @param resume - The complete ResumeData model to persist.
 * @param userId - Optional explicit user ID (falls back to active session).
 * @returns Promise resolving to true on successful upsert, false on error.
 */
export async function saveResumeToDatabase(
  resume: ResumeData,
  userId?: string
): Promise<boolean> {
  try {
    // If this resume was deliberately deleted, NEVER resurrect it!
    const deletedIds = getDeletedResumeIds();
    if (deletedIds.has(resume.id)) {
      return false;
    }

    let uid = userId;
    if (!uid) {
      const { data } = await supabase.auth.getSession();
      uid = data?.session?.user?.id;
    }
    if (!uid) return false;

    const payloadData: ResumeData = {
      ...resume,
      userId: uid,
      syncedToCloud: true,
    };

    const { error } = await supabase.from('resumes').upsert(
      {
        id: resume.id,
        user_id: uid,
        title: resume.title || 'Untitled Resume',
        data: payloadData,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      return false;
    }

    // Successfully saved to cloud: reflect sync metadata in local cache
    if (typeof window !== 'undefined') {
      const local = getStoredResumes();
      const idx = local.findIndex((r) => r.id === resume.id);
      if (idx >= 0 && (!local[idx].syncedToCloud || local[idx].userId !== uid)) {
        local[idx] = { ...local[idx], syncedToCloud: true, userId: uid };
        safeLocalStorageSet(STORAGE_KEY, JSON.stringify(local));
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Fetches a single resume from the database by primary ID.
 *
 * @param id - The unique resume identifier string.
 * @returns Promise resolving to ResumeData if found, or null otherwise.
 */
export async function getResumeFromDatabase(id: string): Promise<ResumeData | null> {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('data')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data.data as ResumeData;
  } catch {
    return null;
  }
}

/**
 * Retrieves all resumes associated with a user, sorted newest first.
 *
 * @param userId - Optional target user ID (defaults to active session).
 * @returns Array of ResumeData records.
 */
export async function getAllResumesFromDatabase(userId?: string): Promise<ResumeData[]> {
  try {
    let uid = userId;
    if (!uid) {
      const { data } = await supabase.auth.getSession();
      uid = data?.session?.user?.id;
    }
    if (!uid) return [];

    const { data, error } = await supabase
      .from('resumes')
      .select('data')
      .eq('user_id', uid)
      .order('updated_at', { ascending: false });

    if (error || !data) return [];
    return data.map((row: any) => row.data as ResumeData);
  } catch {
    return [];
  }
}

/**
 * Deletes a resume record from Supabase, purges local copies, and marks the ID
 * in deleted tombstones to prevent resurrection.
 *
 * @param id - The unique resume identifier string.
 * @returns Promise resolving to true if deleted or false on failure.
 */
export async function deleteResumeFromDatabase(id: string): Promise<boolean> {
  addDeletedResumeId(id);
  purgeLocalResumeDirectly(id);
  try {
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) return false;
    return true;
  } catch {
    return false;
  }
}

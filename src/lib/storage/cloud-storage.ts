/**
 * @fileoverview Supabase Cloud Storage Persistence Provider.
 * Implements remote data access for authenticated users with error handling,
 * data normalization, and deletion safeguards.
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
 * Normalizes a raw PostgreSQL row from the resumes table into a fully-typed ResumeData model.
 * Handles row-level properties (id, user_id, title, updated_at) and parses stringified JSON if present.
 */
export function normalizeResumeRow(row: any, fallbackUserId?: string): ResumeData {
  if (!row) return {} as ResumeData;
  let dataObj: any = {};
  if (typeof row.data === 'string') {
    try {
      dataObj = JSON.parse(row.data);
    } catch {
      dataObj = {};
    }
  } else if (row.data && typeof row.data === 'object') {
    dataObj = row.data;
  }

  const resumeId = String(row.id || dataObj.id || `resume-${Date.now()}`);
  const title = String(row.title || dataObj.title || 'Untitled Resume');
  const userId = String(row.user_id || dataObj.userId || fallbackUserId || '');
  const updatedAt = dataObj.updatedAt || row.updated_at || new Date().toISOString();

  return {
    ...dataObj,
    id: resumeId,
    title,
    userId,
    updatedAt,
    syncedToCloud: true,
  };
}

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
    if (!resume || !resume.id) return false;

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
      console.error('[Supabase] Error saving resume to database:', error);
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
  } catch (err) {
    console.error('[Supabase] Exception in saveResumeToDatabase:', err);
    return false;
  }
}

/**
 * Fetches a single resume from the database by primary ID.
 * Uses maybeSingle() and ensures active auth session for RLS.
 *
 * @param id - The unique resume identifier string.
 * @returns Promise resolving to ResumeData if found, or null otherwise.
 */
export async function getResumeFromDatabase(id: string): Promise<ResumeData | null> {
  if (!id) return null;
  try {
    // Ensure active auth session is restored so RLS allows access
    await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('resumes')
      .select('id, user_id, title, data, updated_at, created_at')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase] getResumeFromDatabase error:', error);
      return null;
    }
    if (!data) return null;
    return normalizeResumeRow(data);
  } catch (err) {
    console.error('[Supabase] Exception in getResumeFromDatabase:', err);
    return null;
  }
}

/**
 * Retrieves all resumes associated with a user, sorted newest first.
 *
 * @param userId - Optional target user ID (defaults to active session).
 * @returns Array of normalized ResumeData records.
 */
export async function getAllResumesFromDatabase(userId?: string): Promise<ResumeData[]> {
  try {
    let uid = userId;
    const { data: sessionData } = await supabase.auth.getSession();
    if (!uid) {
      uid = sessionData?.session?.user?.id;
    }
    if (!uid) {
      console.warn('[Supabase] No authenticated user session found when fetching resumes.');
      return [];
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('id, user_id, title, data, updated_at, created_at')
      .eq('user_id', uid)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[Supabase] Error fetching user resumes:', error);
      return [];
    }
    if (!data || !Array.isArray(data)) return [];

    return data
      .map((row: any) => normalizeResumeRow(row, uid))
      .filter((r) => Boolean(r && r.id));
  } catch (err) {
    console.error('[Supabase] Exception in getAllResumesFromDatabase:', err);
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
  if (!id) return false;
  addDeletedResumeId(id);
  purgeLocalResumeDirectly(id);
  try {
    const { error } = await supabase.from('resumes').delete().eq('id', id);
    if (error) {
      console.error('[Supabase] Error deleting resume from database:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase] Exception in deleteResumeFromDatabase:', err);
    return false;
  }
}

/**
 * @fileoverview Custom React Hook for Auto-Saving Resume Data with Undo/Redo History.
 * Decouples state synchronization, debounced storage persistence,
 * template migration, undo/redo stack, and unload flushing from presentation components.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { ResumeData } from '@/types/resume';
import { saveResume, saveResumeToDatabase } from '@/lib/storage';
import { getTemplateDefaults, migrateSectionOrder } from '@/lib/templates';

export type CloudSaveStatus = 'saved' | 'saving' | 'offline';

export interface UseAutoSaveResumeReturn {
  resume: ResumeData | null;
  setResume: React.Dispatch<React.SetStateAction<ResumeData | null>>;
  handleChange: (updated: Partial<ResumeData>) => void;
  cloudStatus: CloudSaveStatus;
  flushSave: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const MAX_HISTORY = 30;

/**
 * Manages local resume editing state with dual-tier debounced persistence:
 * - Fast local storage persistence (default: 400ms) to protect against unexpected reloads
 * - Delayed cloud persistence to Supabase (default: 2500ms, i.e. a few seconds) to prevent excessive network requests while typing
 * - In-memory undo/redo history stack and guaranteed flush on unmount/unload
 *
 * @param initialData - The initially loaded ResumeData (or null while loading).
 * @param cloudDebounceMs - Debounce window in milliseconds for Supabase cloud writes (default: 2500ms).
 * @param userId - Optional authenticated user ID.
 * @param localDebounceMs - Debounce window in milliseconds for local browser persistence (default: 400ms).
 */
export function useAutoSaveResume(
  initialData: ResumeData | null = null,
  cloudDebounceMs: number = 2500,
  userId?: string,
  localDebounceMs: number = 400
): UseAutoSaveResumeReturn {
  const [resume, setResume] = useState<ResumeData | null>(initialData);
  const [cloudStatus, setCloudStatus] = useState<CloudSaveStatus>('saved');
  const [, setHistoryVersion] = useState<number>(0);

  const localSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cloudSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestResumeRef = useRef<ResumeData | null>(initialData);
  const pastRef = useRef<ResumeData[]>([]);
  const futureRef = useRef<ResumeData[]>([]);
  const lastSnapshotTimeRef = useRef<number>(0);

  // Sync ref when state changes
  useEffect(() => {
    latestResumeRef.current = resume;
  }, [resume]);

  // Flush any pending debounced saves immediately (both local and Supabase cloud)
  const flushSave = useCallback(async () => {
    if (localSaveTimeoutRef.current) {
      clearTimeout(localSaveTimeoutRef.current);
      localSaveTimeoutRef.current = null;
    }
    if (cloudSaveTimeoutRef.current) {
      clearTimeout(cloudSaveTimeoutRef.current);
      cloudSaveTimeoutRef.current = null;
    }
    if (latestResumeRef.current) {
      // 1. Immediate local save
      saveResume(latestResumeRef.current, { skipCloudSync: true });

      // 2. Immediate cloud save
      if (userId) {
        setCloudStatus('saving');
        const success = await saveResumeToDatabase(latestResumeRef.current, userId);
        setCloudStatus(success ? 'saved' : 'offline');
      } else {
        const success = await saveResumeToDatabase(latestResumeRef.current).catch(() => false);
        setCloudStatus(success ? 'saved' : 'saved');
      }
    }
  }, [userId]);

  // Flush save on component unmount and window beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      flushSave();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      flushSave();
    };
  }, [flushSave]);

  // Handle fine-grained updates with template defaults migration and history capture
  const handleChange = useCallback((updated: Partial<ResumeData>) => {
    if (!latestResumeRef.current) return;
    const current = latestResumeRef.current;
    let nextResume: ResumeData = { ...current, ...updated };

    // Migrate layout and styles if switching templates
    if (updated.templateId && updated.templateId !== current.templateId) {
      const templateDefaults = getTemplateDefaults(updated.templateId);
      const migratedOrder = migrateSectionOrder(
        updated.sectionOrder || current.sectionOrder,
        updated.templateId
      );
      nextResume = {
        ...nextResume,
        ...templateDefaults,
        ...updated,
        sectionOrder: migratedOrder,
      };
    }

    // Capture undo snapshot if structural change or debounce window elapsed
    const now = Date.now();
    const isStructural =
      Boolean(updated.templateId) ||
      Boolean(updated.sectionOrder) ||
      Boolean(updated.fontFamily) ||
      Boolean(updated.themeColor) ||
      (updated.experience && updated.experience.length !== current.experience?.length) ||
      (updated.education && updated.education.length !== current.education?.length) ||
      (updated.skills && updated.skills.length !== current.skills?.length) ||
      (updated.projects && updated.projects.length !== current.projects?.length);

    if (now - lastSnapshotTimeRef.current > 750 || isStructural) {
      pastRef.current.push(JSON.parse(JSON.stringify(current)));
      if (pastRef.current.length > MAX_HISTORY) {
        pastRef.current.shift();
      }
      futureRef.current = [];
      lastSnapshotTimeRef.current = now;
      setHistoryVersion((v) => v + 1);
    }

    // Instant local state update for 60fps typing responsiveness
    setResume(nextResume);
    latestResumeRef.current = nextResume;
    setCloudStatus('saving');

    // 1. Fast local persistence (400ms) to ensure crash safety
    if (localSaveTimeoutRef.current) {
      clearTimeout(localSaveTimeoutRef.current);
    }
    localSaveTimeoutRef.current = setTimeout(() => {
      if (latestResumeRef.current) {
        saveResume(latestResumeRef.current, { skipCloudSync: true });
      }
    }, localDebounceMs);

    // 2. Delayed cloud persistence to Supabase (default: 2500ms delay) to avoid network thrashing
    if (cloudSaveTimeoutRef.current) {
      clearTimeout(cloudSaveTimeoutRef.current);
    }
    cloudSaveTimeoutRef.current = setTimeout(async () => {
      if (latestResumeRef.current) {
        if (userId) {
          const success = await saveResumeToDatabase(latestResumeRef.current, userId);
          setCloudStatus(success ? 'saved' : 'offline');
        } else {
          const success = await saveResumeToDatabase(latestResumeRef.current).catch(() => false);
          setCloudStatus(success ? 'saved' : 'saved');
        }
      }
    }, cloudDebounceMs);
  }, [cloudDebounceMs, localDebounceMs, userId]);

  // Undo implementation
  const undo = useCallback(() => {
    if (pastRef.current.length === 0 || !latestResumeRef.current) return;
    const previous = pastRef.current.pop()!;
    futureRef.current.push(JSON.parse(JSON.stringify(latestResumeRef.current)));

    setResume(previous);
    latestResumeRef.current = previous;
    saveResume(previous, { skipCloudSync: true });
    setCloudStatus('saving');

    // Debounce cloud save on undo
    if (cloudSaveTimeoutRef.current) {
      clearTimeout(cloudSaveTimeoutRef.current);
    }
    cloudSaveTimeoutRef.current = setTimeout(async () => {
      if (latestResumeRef.current) {
        if (userId) {
          const success = await saveResumeToDatabase(latestResumeRef.current, userId);
          setCloudStatus(success ? 'saved' : 'offline');
        } else {
          const success = await saveResumeToDatabase(latestResumeRef.current).catch(() => false);
          setCloudStatus(success ? 'saved' : 'saved');
        }
      }
    }, 1500);

    setHistoryVersion((v) => v + 1);
  }, [userId]);

  // Redo implementation
  const redo = useCallback(() => {
    if (futureRef.current.length === 0 || !latestResumeRef.current) return;
    const next = futureRef.current.pop()!;
    pastRef.current.push(JSON.parse(JSON.stringify(latestResumeRef.current)));

    setResume(next);
    latestResumeRef.current = next;
    saveResume(next, { skipCloudSync: true });
    setCloudStatus('saving');

    // Debounce cloud save on redo
    if (cloudSaveTimeoutRef.current) {
      clearTimeout(cloudSaveTimeoutRef.current);
    }
    cloudSaveTimeoutRef.current = setTimeout(async () => {
      if (latestResumeRef.current) {
        if (userId) {
          const success = await saveResumeToDatabase(latestResumeRef.current, userId);
          setCloudStatus(success ? 'saved' : 'offline');
        } else {
          const success = await saveResumeToDatabase(latestResumeRef.current).catch(() => false);
          setCloudStatus(success ? 'saved' : 'saved');
        }
      }
    }, 1500);

    setHistoryVersion((v) => v + 1);
  }, [userId]);

  // Keyboard shortcut listener for Ctrl+Z / Cmd+Z and Ctrl+Y / Cmd+Shift+Z
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow browser native undo inside inputs and textareas
      const target = e.target as HTMLElement | null;
      const isInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return {
    resume,
    setResume,
    handleChange,
    cloudStatus,
    flushSave,
    undo,
    redo,
    canUndo: pastRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
  };
}

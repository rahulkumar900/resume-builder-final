/**
 * @fileoverview Custom React Hook for Auto-Saving Resume Data with Undo/Redo History.
 * Decouples state synchronization, debounced storage persistence,
 * template migration, undo/redo stack, and unload flushing from presentation components.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { ResumeData } from '@/types/resume';
import { saveResume } from '@/lib/storage';
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
 * Manages local resume editing state with debounced persistence and in-memory undo/redo stack.
 *
 * @param initialData - The initially loaded ResumeData (or null while loading).
 * @param debounceMs - Debounce window in milliseconds (default: 400ms).
 */
export function useAutoSaveResume(
  initialData: ResumeData | null = null,
  debounceMs: number = 400
): UseAutoSaveResumeReturn {
  const [resume, setResume] = useState<ResumeData | null>(initialData);
  const [cloudStatus, setCloudStatus] = useState<CloudSaveStatus>('saved');
  const [, setHistoryVersion] = useState<number>(0);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestResumeRef = useRef<ResumeData | null>(initialData);
  const pastRef = useRef<ResumeData[]>([]);
  const futureRef = useRef<ResumeData[]>([]);
  const lastSnapshotTimeRef = useRef<number>(0);

  // Sync ref when state changes
  useEffect(() => {
    latestResumeRef.current = resume;
  }, [resume]);

  // Flush any pending debounced save immediately
  const flushSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
      if (latestResumeRef.current) {
        saveResume(latestResumeRef.current);
        setCloudStatus('saved');
      }
    }
  }, []);

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

    // Debounce heavy serialization, localStorage, IndexedDB, and Supabase writes
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (latestResumeRef.current) {
        saveResume(latestResumeRef.current);
        setCloudStatus('saved');
      }
    }, debounceMs);
  }, [debounceMs]);

  // Undo implementation
  const undo = useCallback(() => {
    if (pastRef.current.length === 0 || !latestResumeRef.current) return;
    const previous = pastRef.current.pop()!;
    futureRef.current.push(JSON.parse(JSON.stringify(latestResumeRef.current)));

    setResume(previous);
    latestResumeRef.current = previous;
    saveResume(previous);
    setCloudStatus('saved');
    setHistoryVersion((v) => v + 1);
  }, []);

  // Redo implementation
  const redo = useCallback(() => {
    if (futureRef.current.length === 0 || !latestResumeRef.current) return;
    const next = futureRef.current.pop()!;
    pastRef.current.push(JSON.parse(JSON.stringify(latestResumeRef.current)));

    setResume(next);
    latestResumeRef.current = next;
    saveResume(next);
    setCloudStatus('saved');
    setHistoryVersion((v) => v + 1);
  }, []);

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

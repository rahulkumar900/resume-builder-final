import { ResumeData } from '@/types/resume';

interface StoreEntry {
  data: ResumeData;
  expiresAt: number;
}

// Global in-memory store for passing render data to the print page
const globalStore = globalThis as unknown as {
  __resumeRenderStore?: Map<string, StoreEntry>;
};

if (!globalStore.__resumeRenderStore) {
  globalStore.__resumeRenderStore = new Map<string, StoreEntry>();
}

const renderStore = globalStore.__resumeRenderStore;

export function setRenderResume(id: string, data: ResumeData): void {
  // Retain for 5 minutes
  renderStore.set(id, {
    data,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
}

export function getRenderResume(id: string): ResumeData | null {
  const entry = renderStore.get(id);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    renderStore.delete(id);
    return null;
  }
  return entry.data;
}

export function deleteRenderResume(id: string): void {
  renderStore.delete(id);
}

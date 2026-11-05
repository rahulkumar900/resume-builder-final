import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as cloudStorage from '@/lib/storage/cloud-storage';
import * as localStorageModule from '@/lib/storage/local-storage';
import { ResumeData } from '@/types/resume';

vi.mock('@/lib/idb', () => ({
  idbSet: vi.fn().mockResolvedValue(undefined),
  idbGet: vi.fn().mockResolvedValue(null),
  idbDelete: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      upsert: vi.fn().mockResolvedValue({ error: null }),
    })),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    },
  },
}));

const mockResume: ResumeData = {
  id: 'resume-test-123',
  title: 'Test Resume',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'prawira',
  themeColor: '#2563eb',
  fontFamily: 'inter',
  personalInfo: {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    jobTitle: 'Developer',
    phone: '1234567890',
    location: 'City, Country',
    summary: 'Summary text',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

describe('Auto-Save Supabase Debounce & Delay System', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    (global as any).window = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    (global as any).localStorage = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    delete (global as any).window;
    delete (global as any).localStorage;
  });

  it('delays Supabase cloud saving by 2.5 seconds (2500ms) to prevent network thrashing', async () => {
    const saveToDbSpy = vi
      .spyOn(cloudStorage, 'saveResumeToDatabase')
      .mockResolvedValue(true);

    // Call debounced cloud save
    localStorageModule.debouncedSaveResumeToDatabase(mockResume, 2500);

    // Should NOT have called Supabase immediately
    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Advance 1000ms: still not called
    vi.advanceTimersByTime(1000);
    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Advance 1400ms (2400ms total): still not called
    vi.advanceTimersByTime(1400);
    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Advance remaining 100ms (2500ms total): Supabase save executes
    vi.advanceTimersByTime(100);
    expect(saveToDbSpy).toHaveBeenCalledTimes(1);
    expect(saveToDbSpy).toHaveBeenCalledWith(mockResume);
  });

  it('coalesces rapid keystrokes into a single Supabase request after editing pauses', async () => {
    const saveToDbSpy = vi
      .spyOn(cloudStorage, 'saveResumeToDatabase')
      .mockResolvedValue(true);

    // Simulate 5 rapid updates within 200ms intervals
    for (let i = 1; i <= 5; i++) {
      localStorageModule.debouncedSaveResumeToDatabase(
        { ...mockResume, title: `Typing character ${i}` },
        2500
      );
      vi.advanceTimersByTime(200);
    }

    // 1000ms total elapsed, debounce reset on each keystroke -> not called yet
    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Wait full 2500ms after the last character
    vi.advanceTimersByTime(2500);

    // Only one single call to Supabase with the final state
    expect(saveToDbSpy).toHaveBeenCalledTimes(1);
    expect(saveToDbSpy).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Typing character 5' })
    );
  });

  it('immediately flushes pending Supabase saves when flushCloudSync is called', async () => {
    const saveToDbSpy = vi
      .spyOn(cloudStorage, 'saveResumeToDatabase')
      .mockResolvedValue(true);

    localStorageModule.debouncedSaveResumeToDatabase(
      { ...mockResume, title: 'Flushed Immediately' },
      2500
    );

    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Unload or navigation triggers flushCloudSync
    localStorageModule.flushCloudSync();

    expect(saveToDbSpy).toHaveBeenCalledTimes(1);
    expect(saveToDbSpy).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Flushed Immediately' })
    );

    // After timer expires, should not call again
    vi.advanceTimersByTime(3000);
    expect(saveToDbSpy).toHaveBeenCalledTimes(1);
  });

  it('saveResume uses debounced cloud sync by default and respects skipCloudSync', async () => {
    const saveToDbSpy = vi
      .spyOn(cloudStorage, 'saveResumeToDatabase')
      .mockResolvedValue(true);
    vi.spyOn(localStorageModule, 'getStoredResumes').mockReturnValue([]);
    vi.spyOn(localStorageModule, 'saveStoredResumes').mockImplementation(() => {});

    // Case A: skipCloudSync = true (e.g. used by local persistence layer)
    localStorageModule.saveResume(mockResume, { skipCloudSync: true });
    vi.advanceTimersByTime(3000);
    expect(saveToDbSpy).not.toHaveBeenCalled();

    // Case B: standard saveResume with default 2500ms debounce
    localStorageModule.saveResume(mockResume);
    expect(saveToDbSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2400);
    expect(saveToDbSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(saveToDbSpy).toHaveBeenCalledTimes(1);
  });
});

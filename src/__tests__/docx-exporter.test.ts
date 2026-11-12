import { describe, it, expect } from 'vitest';
import { buildResumeDocxBlob } from '@/lib/export/docxExporter';
import { FRESHER_TEACHER_RESUME } from '@/data/teacher-cluster/samples';
import type { ResumeData } from '@/types/resume';

describe('Native DOCX Resume Exporter', () => {
  it('generates a valid .docx zip blob for the official harvard template', async () => {
    const harvardResume: ResumeData = {
      ...FRESHER_TEACHER_RESUME,
      templateId: 'harvard',
      themeColor: '#000000',
    };

    const blob = await buildResumeDocxBlob(harvardResume);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(2000);

    const bytes = new Uint8Array(await blob.arrayBuffer());
    // DOCX is an OpenXML ZIP archive starting with 'PK' (0x50, 0x4B)
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
  });

  it('generates a valid .docx zip blob for a two-column template with HTML summary', async () => {
    const twoColResume: ResumeData = {
      ...FRESHER_TEACHER_RESUME,
      templateId: 'chastain',
      themeColor: '#1e3a8a',
      personalInfo: {
        ...FRESHER_TEACHER_RESUME.personalInfo,
        summary: '<p><strong>Dedicated Educator</strong> with B.Ed. &amp; CTET.</p>',
      },
    };

    const blob = await buildResumeDocxBlob(twoColResume);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(2000);

    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
  });
});

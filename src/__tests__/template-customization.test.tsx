import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResumeData } from '@/types/resume';
import {
  getTemplateDefaultConfig,
  getEffectiveTemplateConfig,
  applyTemplateConfig,
  RESUME_RECOMMENDED_LIMITS,
} from '@/lib/templates/template-config';
import { CustomThemeStyles } from '@/components/common/CustomThemeStyles';

const mockResume: ResumeData = {
  id: 'test-resume-1',
  title: 'Test Resume',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'prawira',
  themeColor: '#2563eb',
  fontFamily: 'inter',
  spacing: 'normal',
  personalInfo: {
    fullName: 'Rahul Kumar',
    jobTitle: 'Frontend Developer',
    email: 'rahul@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    summary: 'Senior Frontend Engineer with 7 years of experience building high-scale apps.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Staff Frontend Engineer',
      company: 'TechCorp',
      location: 'Bangalore',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      highlights: ['Architected design system reducing bundle size by 30%.'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech Computer Science',
      school: 'IIT Delhi',
      location: 'New Delhi',
      graduationDate: '2018',
    },
  ],
  skills: [
    {
      id: 'cat-1',
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
  ],
  projects: [],
  certifications: [],
  languages: [],
};

describe('Template Configuration & Customization System', () => {
  it('should return authoritative defaults with single unified font for templates', () => {
    const prawiraDefaults = getTemplateDefaultConfig('prawira');
    expect(prawiraDefaults.fontFamily).toBe('inter');
    expect(prawiraDefaults.headerSize).toBe(24);
    expect(prawiraDefaults.sectionHeaderSize).toBe(13);
    expect(prawiraDefaults.subHeaderSize).toBe(12.5);
    expect(prawiraDefaults.bodySize).toBe(10);
    expect(prawiraDefaults.lineHeight).toBe(1.45);
    expect(prawiraDefaults.pagePadding).toBe(32);
    expect(prawiraDefaults.sectionSpacing).toBe(18);

    const execDefaults = getTemplateDefaultConfig('executive_finance');
    expect(execDefaults.fontFamily).toBe('manrope');

    const sarkariDefaults = getTemplateDefaultConfig('sarkari');
    expect(sarkariDefaults.fontFamily).toBe('merriweather');

    const traditionalDefaults = getTemplateDefaultConfig('traditional');
    expect(traditionalDefaults.fontFamily).toBe('garamond');

    const govDefaults = getTemplateDefaultConfig('gov_traditional');
    expect(govDefaults.fontFamily).toBe('times');
  });

  it('should clamp font sizes within resume recommended limits', () => {
    const resumeWithExtremeSizes: ResumeData = {
      ...mockResume,
      typography: {
        sizes: {
          primaryHeading: 50, // Exceeds max 32
          secondaryHeading: 6, // Below min 11
          sectionTitle: 28, // Exceeds max 16
          body: 4, // Below min 9
        },
        lineHeight: 2.5, // Exceeds max 1.8
      },
      layout: {
        pagePadding: 100, // Exceeds max 48
        spacing: {
          betweenSections: 60, // Exceeds max 32
        },
      },
    };

    const effective = getEffectiveTemplateConfig(resumeWithExtremeSizes);
    expect(effective.fontFamily).toBe('inter');
    expect(effective.headerSize).toBe(RESUME_RECOMMENDED_LIMITS.header.max);
    expect(effective.subHeaderSize).toBe(RESUME_RECOMMENDED_LIMITS.subHeader.min);
    expect(effective.sectionHeaderSize).toBe(RESUME_RECOMMENDED_LIMITS.sectionHeader.max);
    expect(effective.bodySize).toBe(RESUME_RECOMMENDED_LIMITS.body.min);
    expect(effective.lineHeight).toBe(RESUME_RECOMMENDED_LIMITS.lineHeight.max);
    expect(effective.pagePadding).toBe(RESUME_RECOMMENDED_LIMITS.pagePadding.max);
    expect(effective.sectionSpacing).toBe(RESUME_RECOMMENDED_LIMITS.sectionSpacing.max);
  });

  it('should apply partial template config updates cleanly to ResumeData with one font', () => {
    const updates = applyTemplateConfig(mockResume, {
      fontFamily: 'outfit',
      headerSize: 28,
      sectionHeaderSize: 14,
      subHeaderSize: 13,
      bodySize: 10.5,
      lineHeight: 1.55,
      pagePadding: 36,
      sectionSpacing: 22,
      accentColor: '#059669',
    });

    expect(updates.themeColor).toBe('#059669');
    expect(updates.fontFamily).toBe('outfit');
    expect(updates.typography?.primaryFont).toBe('outfit');
    expect(updates.typography?.sizes?.primaryHeading).toBe(28);
    expect(updates.typography?.sizes?.sectionTitle).toBe(14);
    expect(updates.typography?.sizes?.secondaryHeading).toBe(13);
    expect(updates.typography?.sizes?.body).toBe(10.5);
    expect(updates.typography?.lineHeight).toBe(1.55);
    expect(updates.layout?.pagePadding).toBe(36);
    expect(updates.layout?.spacing?.betweenSections).toBe(22);
    expect(updates.spacing).toBe('normal');
  });

  it('should render CustomThemeStyles with unified font family and customized level sizes', () => {
    const customizedResume: ResumeData = {
      ...mockResume,
      themeColor: '#7c3aed',
      fontFamily: 'jakarta',
      typography: {
        primaryFont: 'jakarta',
        lineHeight: 1.5,
        sizes: {
          primaryHeading: 27,
          sectionTitle: 13.5,
          secondaryHeading: 12.5,
          body: 10,
        },
      },
      layout: {
        pagePadding: 34,
        spacing: {
          betweenSections: 20,
        },
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={customizedResume} containerId="a4-resume-document" />
    );

    // Verify CSS variables
    expect(html).toContain('--size-header: 27pt');
    expect(html).toContain('--size-section-header: 13.5pt');
    expect(html).toContain('--size-sub-header: 12.5pt');
    expect(html).toContain('--size-body: 10pt');
    expect(html).toContain('--resume-line-height: 1.5');
    expect(html).toContain('--space-section: 20pt');
    expect(html).toContain('--page-padding: 34px');
    expect(html).toContain('--resume-accent: #7c3aed');

    // Verify unified font family
    expect(html).toContain('var(--font-jakarta)');
    expect(html).toContain('font-family: var(--resume-font);');

    // Verify Ghost DOM & document rule selectors
    expect(html).toContain('#a4-resume-document [data-ghost-header="true"]');
    expect(html).toContain('#a4-resume-document [data-ghost-section-title="true"]');
    expect(html).toContain('#a4-resume-document [data-ghost-item-header="true"]');
    expect(html).toContain('#a4-resume-document [data-ghost-section]');
  });
});

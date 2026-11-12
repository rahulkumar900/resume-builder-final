import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CustomThemeStyles } from '@/components/common/CustomThemeStyles';
import { ResumeData } from '@/types/resume';

const baseResume: ResumeData = {
  id: 'test-typography',
  title: 'Test Resume',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'prawira',
  themeColor: '#000000',
  fontFamily: 'inter',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  personalInfo: {
    fullName: 'Rahul Kumar',
    jobTitle: 'Frontend Developer',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    summary: 'Experienced software engineer.',
  },
};

describe('CustomThemeStyles Typography Scoping & Responsiveness', () => {
  it('correctly scopes heading styles to #a4-resume-document h1 without naked container selectors', () => {
    const resumeWithHeading: ResumeData = {
      ...baseResume,
      typography: {
        headingFont: 'playfair',
        sizes: {
          primaryHeading: 44,
        },
        weights: {
          primaryHeading: 'bold',
        },
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={resumeWithHeading} containerId="a4-resume-document" />
    );

    // Must target #a4-resume-document h1
    expect(html).toContain('#a4-resume-document h1');
    expect(html).toContain('[data-ghost-measurer="true"] h1');
    expect(html).toContain('font-size: 44px !important;');
    expect(html).toContain('font-weight: 700 !important;');
    expect(html).toContain("Playfair Display");

    // Must NOT contain naked "#a4-resume-document, [data-ghost-measurer" where comma isolates the container
    expect(html).not.toMatch(/#a4-resume-document,\s*\[data-ghost-measurer="true"\]\s*\[data-ghost-header/);
  });

  it('correctly applies target role styles to [data-ghost-role="true"] elements', () => {
    const resumeWithRole: ResumeData = {
      ...baseResume,
      typography: {
        roleFont: 'outfit',
        sizes: {
          secondaryHeading: 15,
        },
        weights: {
          secondaryHeading: 'semibold',
        },
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={resumeWithRole} containerId="a4-resume-document" />
    );

    expect(html).toContain('#a4-resume-document [data-ghost-role="true"]');
    expect(html).toContain('font-size: 15px !important;');
    expect(html).toContain('font-weight: 600 !important;');
    expect(html).toContain("Outfit");
  });

  it('correctly applies section title styles to [data-ghost-section-title="true"] elements', () => {
    const resumeWithSection: ResumeData = {
      ...baseResume,
      typography: {
        sectionFont: 'space_grotesk',
        sizes: {
          sectionTitle: 16,
        },
        weights: {
          sectionTitle: 'bold',
        },
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={resumeWithSection} containerId="a4-resume-document" />
    );

    expect(html).toContain('#a4-resume-document [data-ghost-section-title="true"]');
    expect(html).toContain('font-size: 16px !important;');
    expect(html).toContain('font-weight: 700 !important;');
    expect(html).toContain("Space Grotesk");
  });

  it('correctly applies body / bullets styles to item paragraphs, bullets, and lists', () => {
    const resumeWithBody: ResumeData = {
      ...baseResume,
      typography: {
        bodyFont: 'jakarta',
        sizes: {
          body: 11.5,
        },
        weights: {
          body: 'normal',
        },
        lineHeight: 1.6,
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={resumeWithBody} containerId="a4-resume-document" />
    );

    expect(html).toContain('#a4-resume-document [data-ghost-bullet]');
    expect(html).toContain('#a4-resume-document [data-ghost-item] li');
    expect(html).toContain('font-size: 11.5px !important;');
    expect(html).toContain('font-weight: 400 !important;');
    expect(html).toContain('line-height: 1.6 !important;');
    expect(html).toContain("Plus Jakarta Sans");
  });

  it('ignores legacy dummy sizes (24/16/14/10) to protect templates from being spoiled', () => {
    const resumeWithLegacyDummy: ResumeData = {
      ...baseResume,
      templateId: 'neon_creative',
      typography: {
        primaryFont: 'inter',
        sizes: {
          primaryHeading: 24,
          secondaryHeading: 16,
          sectionTitle: 14,
          body: 10,
        },
        weights: {
          primaryHeading: 'bold',
          secondaryHeading: 'semibold',
          sectionTitle: 'bold',
          body: 'normal',
        },
      },
    };

    const html = renderToStaticMarkup(
      <CustomThemeStyles resume={resumeWithLegacyDummy} containerId="a4-resume-document" />
    );

    // Must NOT force 24px onto heading or 10px onto body
    expect(html).not.toContain('font-size: 24px !important;');
    expect(html).not.toContain('font-size: 10px !important;');
    expect(html).not.toContain('font-size: 16px !important;');
    expect(html).not.toContain('font-size: 14px !important;');
  });
});

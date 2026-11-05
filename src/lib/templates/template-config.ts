/**
 * @fileoverview Central Template Configuration & Customization System
 * @description Provides authoritative defaults, validation ranges per industry resume
 * standards, and bi-directional adapters for template customization:
 * - Single universal font family for the resume
 * - Main header size (18 - 32 pt)
 * - Sub-header size (11 - 16 pt)
 * - Section header size (11 - 16 pt)
 * - Normal body text size (9 - 12 pt)
 * - Page padding (16 - 48 px)
 * - Section spacing (8 - 32 pt)
 * - Accent color (Hex)
 * - Line height (1.20 - 1.80)
 */

import { FontFamily, ResumeData, TemplateId } from '@/types/resume';
import { TEMPLATES } from './definitions';
import { getTemplateSignatureFont } from './styles';

export interface TemplateCustomConfig {
  accentColor: string;
  fontFamily: FontFamily; // Single universal font for the whole resume
  pagePadding: number; // in px (16 to 48)
  sectionSpacing: number; // in pt (8 to 32)
  lineHeight: number; // 1.2 to 1.8

  headerSize: number; // in pt (18 to 32)
  subHeaderSize: number; // in pt (11 to 16)
  sectionHeaderSize: number; // in pt (11 to 16)
  bodySize: number; // in pt (9 to 12)
}

/**
 * Industry Recommended Resume Typography & Spacing Guidelines
 */
export const RESUME_RECOMMENDED_LIMITS = {
  header: {
    min: 18,
    max: 32,
    default: 24,
    step: 1,
    unit: 'pt',
    title: 'Candidate Name (Header)',
    guideline: 'Recommended: 20 – 28 pt for primary visual hierarchy',
  },
  sectionHeader: {
    min: 11,
    max: 16,
    default: 13,
    step: 0.5,
    unit: 'pt',
    title: 'Section Headers',
    guideline: 'Recommended: 12 – 15 pt for clear section boundaries',
  },
  subHeader: {
    min: 11,
    max: 16,
    default: 12.5,
    step: 0.5,
    unit: 'pt',
    title: 'Sub-Headers (Roles & Institutions)',
    guideline: 'Recommended: 11 – 14 pt for job titles and universities',
  },
  body: {
    min: 9,
    max: 12,
    default: 10,
    step: 0.5,
    unit: 'pt',
    title: 'Body Text & Bullet Points',
    guideline: 'Recommended: 9.5 – 11 pt for optimal readability & ATS parsing',
  },
  lineHeight: {
    min: 1.2,
    max: 1.8,
    default: 1.45,
    step: 0.05,
    unit: '',
    title: 'Line Height',
    guideline: 'Recommended: 1.35 – 1.60 for comfortable reading rhythm',
  },
  sectionSpacing: {
    min: 8,
    max: 32,
    default: 18,
    step: 1,
    unit: 'pt',
    title: 'Section Spacing',
    guideline: 'Recommended: 14 – 24 pt between resume sections',
  },
  pagePadding: {
    min: 16,
    max: 48,
    default: 32,
    step: 2,
    unit: 'px',
    title: 'Page Margins & Padding',
    guideline: 'Recommended: 24 – 40 px (0.35 – 0.6 in) page margin',
  },
} as const;

/**
 * Clamp a number safely within a range
 */
export function clamp(val: number, min: number, max: number): number {
  if (Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}

/**
 * Returns tailored, high-converting defaults for any given template ID
 */
export function getTemplateDefaultConfig(templateId: TemplateId = 'prawira'): TemplateCustomConfig {
  const meta = TEMPLATES.find((t) => t.id === templateId);
  const sigFont = meta?.fontFamily || getTemplateSignatureFont(templateId) || 'inter';
  const accent = meta?.accentColor || '#2563eb';

  switch (templateId) {
    case 'ats':
    case 'fresher':
    case 'naukri':
      return {
        accentColor: accent,
        fontFamily: sigFont,
        pagePadding: 28,
        sectionSpacing: 16,
        lineHeight: 1.4,
        headerSize: 24,
        subHeaderSize: 12,
        sectionHeaderSize: 13,
        bodySize: 9.5,
      };

    case 'executive_finance':
      return {
        accentColor: accent,
        fontFamily: 'manrope',
        pagePadding: 36,
        sectionSpacing: 18,
        lineHeight: 1.5,
        headerSize: 26,
        subHeaderSize: 12.5,
        sectionHeaderSize: 12,
        bodySize: 10,
      };

    case 'infrastructure_engineer':
      return {
        accentColor: accent,
        fontFamily: 'space_grotesk',
        pagePadding: 30,
        sectionSpacing: 18,
        lineHeight: 1.45,
        headerSize: 26,
        subHeaderSize: 12.5,
        sectionHeaderSize: 12,
        bodySize: 10,
      };

    case 'creative_portfolio':
      return {
        accentColor: accent,
        fontFamily: 'space_grotesk',
        pagePadding: 32,
        sectionSpacing: 18,
        lineHeight: 1.45,
        headerSize: 28,
        subHeaderSize: 13,
        sectionHeaderSize: 13,
        bodySize: 10,
      };

    case 'neon_creative':
      return {
        accentColor: accent,
        fontFamily: 'jakarta',
        pagePadding: 26,
        sectionSpacing: 16,
        lineHeight: 1.4,
        headerSize: 28,
        subHeaderSize: 12,
        sectionHeaderSize: 12,
        bodySize: 9.5,
      };

    case 'traditional':
    case 'harvard':
    case 'harvard_tech':
    case 'harvard_experienced':
      return {
        accentColor: accent,
        fontFamily: sigFont,
        pagePadding: 36,
        sectionSpacing: 16,
        lineHeight: 1.45,
        headerSize: 24,
        subHeaderSize: 12.5,
        sectionHeaderSize: 13,
        bodySize: 10,
      };

    case 'sarkari':
    case 'gov_traditional':
    case 'marigold':
    case 'ribbon':
      return {
        accentColor: accent,
        fontFamily: sigFont,
        pagePadding: 34,
        sectionSpacing: 18,
        lineHeight: 1.5,
        headerSize: 26,
        subHeaderSize: 12.5,
        sectionHeaderSize: 13,
        bodySize: 10,
      };

    case 'oxford':
    case 'academic_teaching':
      return {
        accentColor: accent,
        fontFamily: sigFont,
        pagePadding: 36,
        sectionSpacing: 18,
        lineHeight: 1.5,
        headerSize: 26,
        subHeaderSize: 13,
        sectionHeaderSize: 13.5,
        bodySize: 10.5,
      };

    default:
      return {
        accentColor: accent,
        fontFamily: sigFont,
        pagePadding: 32,
        sectionSpacing: 18,
        lineHeight: 1.45,
        headerSize: 24,
        subHeaderSize: 12.5,
        sectionHeaderSize: 13,
        bodySize: 10,
      };
  }
}

/**
 * Resolves the currently active configuration from resume data, falling back to template defaults
 */
export function getEffectiveTemplateConfig(resume: ResumeData): TemplateCustomConfig {
  const defaults = getTemplateDefaultConfig(resume.templateId);
  const typo = resume.typography;
  const layout = resume.layout;

  const accentColor = resume.themeColor || defaults.accentColor;

  // Single universal font for the resume
  const fontFamily: FontFamily =
    resume.fontFamily ||
    typo?.primaryFont ||
    defaults.fontFamily;

  // Resolve sizes with resume guideline bounds
  const headerSize = clamp(
    typo?.sizes?.primaryHeading ?? defaults.headerSize,
    RESUME_RECOMMENDED_LIMITS.header.min,
    RESUME_RECOMMENDED_LIMITS.header.max
  );

  const subHeaderSize = clamp(
    typo?.sizes?.secondaryHeading ?? defaults.subHeaderSize,
    RESUME_RECOMMENDED_LIMITS.subHeader.min,
    RESUME_RECOMMENDED_LIMITS.subHeader.max
  );

  const sectionHeaderSize = clamp(
    typo?.sizes?.sectionTitle ?? defaults.sectionHeaderSize,
    RESUME_RECOMMENDED_LIMITS.sectionHeader.min,
    RESUME_RECOMMENDED_LIMITS.sectionHeader.max
  );

  const bodySize = clamp(
    typo?.sizes?.body ?? defaults.bodySize,
    RESUME_RECOMMENDED_LIMITS.body.min,
    RESUME_RECOMMENDED_LIMITS.body.max
  );

  // Line height
  let rawLh = typo?.lineHeight;
  if (!rawLh && resume.lineHeight) {
    rawLh = resume.lineHeight === 'tight' ? 1.3 : resume.lineHeight === 'relaxed' ? 1.75 : 1.45;
  }
  const lineHeight = clamp(
    rawLh ?? defaults.lineHeight,
    RESUME_RECOMMENDED_LIMITS.lineHeight.min,
    RESUME_RECOMMENDED_LIMITS.lineHeight.max
  );

  // Section Spacing
  const sectionSpacing = clamp(
    layout?.spacing?.betweenSections ?? defaults.sectionSpacing,
    RESUME_RECOMMENDED_LIMITS.sectionSpacing.min,
    RESUME_RECOMMENDED_LIMITS.sectionSpacing.max
  );

  // Page Padding
  let rawPad = layout?.pagePadding;
  if (rawPad === undefined) {
    if (layout?.margins?.topBottom) {
      rawPad = Math.round(layout.margins.topBottom * 72);
    } else if (resume.spacing === 'compact') {
      rawPad = 24;
    } else if (resume.spacing === 'relaxed') {
      rawPad = 42;
    }
  }
  const pagePadding = clamp(
    rawPad ?? defaults.pagePadding,
    RESUME_RECOMMENDED_LIMITS.pagePadding.min,
    RESUME_RECOMMENDED_LIMITS.pagePadding.max
  );

  return {
    accentColor,
    fontFamily,
    pagePadding,
    sectionSpacing,
    lineHeight,
    headerSize,
    subHeaderSize,
    sectionHeaderSize,
    bodySize,
  };
}

/**
 * Translates partial TemplateCustomConfig updates back into ResumeData properties
 * maintaining 100% backward compatibility with storage, PDF, and components.
 */
export function applyTemplateConfig(
  resume: ResumeData,
  updates: Partial<TemplateCustomConfig>
): Partial<ResumeData> {
  const current = getEffectiveTemplateConfig(resume);
  const next: TemplateCustomConfig = { ...current, ...updates };

  const spacingEnum =
    next.pagePadding <= 26 ? 'compact' : next.pagePadding >= 38 ? 'relaxed' : 'normal';
  const lineHeightEnum =
    next.lineHeight <= 1.35 ? 'tight' : next.lineHeight >= 1.65 ? 'relaxed' : 'normal';

  return {
    themeColor: next.accentColor,
    fontFamily: next.fontFamily,
    spacing: spacingEnum,
    lineHeight: lineHeightEnum,
    typography: {
      ...resume.typography,
      primaryFont: next.fontFamily,
      secondaryFont: next.fontFamily,
      headerFont: next.fontFamily,
      subHeaderFont: next.fontFamily,
      sectionHeaderFont: next.fontFamily,
      bodyFont: next.fontFamily,
      lineHeight: next.lineHeight,
      sizes: {
        primaryHeading: next.headerSize,
        secondaryHeading: next.subHeaderSize,
        sectionTitle: next.sectionHeaderSize,
        body: next.bodySize,
      },
    },
    layout: {
      ...resume.layout,
      pagePadding: next.pagePadding,
      margins: {
        ...resume.layout?.margins,
        topBottom: Number((next.pagePadding / 72).toFixed(2)),
        leftRight: Number((next.pagePadding / 72).toFixed(2)),
      },
      spacing: {
        ...resume.layout?.spacing,
        betweenSections: next.sectionSpacing,
      },
    },
  };
}

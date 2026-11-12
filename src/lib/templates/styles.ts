/**
 * @fileoverview Template Typography, Palettes & Style Defaults
 * @description Color palettes, curated font selections, signature fonts,
 * line height options, and baseline geometry configurations.
 */

import { FontFamily, FontWeight, LineHeightOption, TemplateId } from '@/types/resume';
import { TEMPLATES } from './definitions';
import { getTemplateDefaultSkillsGrouping } from './skills-sanitizer';
export const COLOR_PALETTES = [
  { name: 'Kindley Royal Blue', value: '#2563eb' },
  { name: 'Slate Dark', value: '#1e293b' },
  { name: 'Emerald Forest', value: '#059669' },
  { name: 'Crimson Burgundy', value: '#991b1b' },
  { name: 'Indigo Night', value: '#4f46e5' },
  { name: 'Amber Gold', value: '#d97706' },
  { name: 'Charcoal Teal', value: '#0d9488' },
  { name: 'Violet Regal', value: '#7c3aed' },
];

export const FONT_OPTIONS: { id: FontFamily; name: string; className: string }[] = [
  { id: 'inter', name: 'Inter (Standard Modern Sans)', className: 'font-inter' },
  { id: 'roboto', name: 'Roboto (Novorésumé Clean)', className: 'font-roboto' },
  { id: 'sourcesans', name: 'Source Sans 3 (Resume.io Classic)', className: 'font-sourcesans' },
  { id: 'poppins', name: 'Poppins (Canva Creative)', className: 'font-poppins' },
  { id: 'montserrat', name: 'Montserrat (Executive Modern)', className: 'font-montserrat' },
  { id: 'lato', name: 'Lato (Zety Cascade Pro)', className: 'font-lato' },
  { id: 'raleway', name: 'Raleway (Kickresume Sleek)', className: 'font-raleway' },
  { id: 'rubik', name: 'Rubik (Enhancv Friendly Sans)', className: 'font-rubik' },
  { id: 'opensans', name: 'Open Sans (Europass Standard)', className: 'font-opensans' },
  { id: 'garamond', name: 'EB Garamond (Oxford Serif)', className: 'font-garamond' },
  { id: 'times', name: 'Times New Roman (Harvard FAS Classic)', className: 'font-times' },
  { id: 'playfair', name: 'Playfair Display (Luxury Serif)', className: 'font-playfair' },
  { id: 'merriweather', name: 'Merriweather (Sarkari Editorial)', className: 'font-merriweather' },
  { id: 'outfit', name: 'Outfit (Modern Geometric)', className: 'font-outfit' },
  { id: 'jakarta', name: 'Plus Jakarta Sans (Tech Executive)', className: 'font-jakarta' },
  { id: 'manrope', name: 'Manrope (Executive Geometric)', className: 'font-manrope' },
  { id: 'space_grotesk', name: 'Space Grotesk (Creative Display)', className: 'font-spacegrotesk' },
  { id: 'fraunces', name: 'Fraunces (Editorial Display Serif)', className: 'font-fraunces' },
  { id: 'dm_serif', name: 'DM Serif Display (Signature Serif)', className: 'font-dmserif' },
];

export const getTemplateSignatureFont = (templateId: TemplateId): FontFamily => {
  const template = TEMPLATES.find((t) => t.id === templateId);
  return template?.fontFamily || 'inter';
};

export const LINE_HEIGHT_OPTIONS: {
  id: LineHeightOption;
  name: string;
  sub: string;
  multiplier: number;
  className: string;
}[] = [
  { id: 'tight', name: 'Tight', sub: '1.25', multiplier: 1.25, className: 'leading-snug' },
  { id: 'normal', name: 'Normal', sub: '1.5', multiplier: 1.5, className: 'leading-normal' },
  { id: 'relaxed', name: 'Relaxed', sub: '1.75', multiplier: 1.75, className: 'leading-relaxed' },
];

export const getEffectiveLineHeight = (data?: {
  lineHeight?: LineHeightOption;
  spacing?: 'compact' | 'normal' | 'relaxed';
}): LineHeightOption => {
  if (data?.lineHeight) return data.lineHeight;
  if (data?.spacing === 'compact') return 'tight';
  if (data?.spacing === 'relaxed') return 'relaxed';
  return 'normal';
};

export const getEffectiveTypographyDefaults = (templateId: TemplateId) => {
  const signatureFont = getTemplateSignatureFont(templateId);

  switch (templateId) {
    case 'accentbar': // Meridian
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 40, // 30 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 11, // 8.3 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 11, // 8.3 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'numbered': // Ledger
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 38, // 28.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 12, // 9 pt
        roleWeight: 'normal' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 11, // 8.3 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'neon_creative': // Aurora
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 58, // 43.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 11, // 8.3 pt
        roleWeight: 'normal' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'neobrutalist': // Brutal
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 76, // 57 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 13, // 9.8 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'academic_teaching': // Scholar
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 33, // 24.8 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'garamond' as FontFamily,
        roleSize: 12.5, // 9.4 pt
        roleWeight: 'normal' as FontWeight,
        sectionFont: 'garamond' as FontFamily,
        sectionSize: 16, // 12 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'garamond' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'boxed_engineer': // Blueprint
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 32, // 24 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 13.5, // 10.1 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 13.5, // 10.1 pt
        lineHeight: 1.7,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'clinical_healthcare': // Care
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 32, // 24 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 14.5, // 10.9 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 14.5, // 10.9 pt
        lineHeight: 1.75,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'gov_traditional': // Formal
      return {
        headingFont: 'times' as FontFamily,
        headingSize: 25, // 18.8 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'times' as FontFamily,
        roleSize: 11.5, // 8.6 pt
        roleWeight: 'normal' as FontWeight,
        sectionFont: 'times' as FontFamily,
        sectionSize: 12.5, // 9.4 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'times' as FontFamily,
        bodySize: 11.5, // 8.6 pt
        lineHeight: 1.4,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'editorial_hr': // Cascade
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 42, // 31.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 12.5, // 9.4 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 11, // 8.3 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'creative_portfolio': // Confetti
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 50, // 37.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 12, // 9 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 13.5, // 10.1 pt
        lineHeight: 1.7,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'executive_finance': // Quiet
      return {
        headingFont: 'manrope' as FontFamily,
        headingSize: 58, // 43.5 pt
        headingWeight: 'light' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 12, // 9 pt
        roleWeight: 'normal' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 10, // 7.5 pt
        sectionWeight: 'normal' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'infrastructure_engineer': // Vertical
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 44, // 33 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 12, // 9 pt
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'space_grotesk' as FontFamily,
        bodySize: 14.5, // 10.9 pt
        lineHeight: 1.75,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'marginalia': // S1 Marginalia
      return {
        headingFont: 'dm_serif' as FontFamily,
        headingSize: 44, // 33 pt
        headingWeight: 'normal' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 11, // 8.3 pt
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 11, // 8.3 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'dossier': // S2 Dossier
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 40, // 30 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 11, // 8.3 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 11, // 8.3 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'career_gantt': // S3 Career Gantt
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 38, // 28.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 12.5, // 9.4 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 11.5, // 8.6 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'monogram': // S4 Monogram
      return {
        headingFont: 'dm_serif' as FontFamily,
        headingSize: 52, // 39 pt
        headingWeight: 'normal' as FontWeight,
        roleFont: 'space_grotesk' as FontFamily,
        roleSize: 12, // 9 pt
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'space_grotesk' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'binder_tabs': // S5 Binder Tabs
      return {
        headingFont: 'fraunces' as FontFamily,
        headingSize: 38, // 28.5 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 13, // 9.8 pt
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 12, // 9 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'competency_radar': // S6 Competency Radar
      return {
        headingFont: 'space_grotesk' as FontFamily,
        headingSize: 36, // 27 pt
        headingWeight: 'bold' as FontWeight,
        roleFont: 'manrope' as FontFamily,
        roleSize: 12.5, // 9.4 pt
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'manrope' as FontFamily,
        sectionSize: 11.5, // 8.6 pt
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'manrope' as FontFamily,
        bodySize: 12.5, // 9.4 pt
        lineHeight: 1.6,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'ribbon':
      return {
        headingFont: 'playfair' as FontFamily,
        headingSize: 38,
        headingWeight: 'normal' as FontWeight,
        roleFont: 'merriweather' as FontFamily,
        roleSize: 12.5,
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'merriweather' as FontFamily,
        sectionSize: 12,
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'merriweather' as FontFamily,
        bodySize: 11.5,
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'marigold':
      return {
        headingFont: 'playfair' as FontFamily,
        headingSize: 32,
        headingWeight: 'normal' as FontWeight,
        roleFont: 'merriweather' as FontFamily,
        roleSize: 13,
        roleWeight: 'medium' as FontWeight,
        sectionFont: 'merriweather' as FontFamily,
        sectionSize: 12,
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'merriweather' as FontFamily,
        bodySize: 11.5,
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'stamp':
      return {
        headingFont: 'rubik' as FontFamily,
        headingSize: 36,
        headingWeight: 'bold' as FontWeight,
        roleFont: 'rubik' as FontFamily,
        roleSize: 13,
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'rubik' as FontFamily,
        sectionSize: 12,
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'rubik' as FontFamily,
        bodySize: 11.5,
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'ats':
      return {
        headingFont: 'inter' as FontFamily,
        headingSize: 25, // 18.75 pt (recommended 16-20 pt)
        headingWeight: 'bold' as FontWeight,
        roleFont: 'inter' as FontFamily,
        roleSize: 14.7, // 11 pt (recommended 10-12 pt)
        roleWeight: 'bold' as FontWeight,
        sectionFont: 'inter' as FontFamily,
        sectionSize: 18.7, // 14 pt (recommended 12-16 pt)
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'inter' as FontFamily,
        bodySize: 14.7, // 11 pt (ideal balance)
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
    case 'harvard':
    case 'harvard_tech':
    case 'harvard_experienced':
      return {
        headingFont: 'times' as FontFamily,
        headingSize: 25, // 18.75 pt (recommended 16-20 pt)
        headingWeight: 'bold' as FontWeight,
        roleFont: 'times' as FontFamily,
        roleSize: 14.7, // 11 pt (recommended 10-12 pt)
        roleWeight: 'semibold' as FontWeight,
        sectionFont: 'times' as FontFamily,
        sectionSize: 18.7, // 14 pt (recommended 12-16 pt)
        sectionWeight: 'bold' as FontWeight,
        bodyFont: 'times' as FontFamily,
        bodySize: 14.7, // 11 pt (ideal balance)
        lineHeight: 1.4,
        bodyWeight: 'normal' as FontWeight,
      };
    default:
      return {
        headingFont: signatureFont || ('inter' as FontFamily),
        headingSize: 25, // 18.75 pt (recommended 16-20 pt)
        headingWeight: 'bold' as FontWeight,
        roleFont: signatureFont || ('inter' as FontFamily),
        roleSize: 14.7, // 11 pt (recommended 10-12 pt)
        roleWeight: 'semibold' as FontWeight,
        sectionFont: signatureFont || ('inter' as FontFamily),
        sectionSize: 18.7, // 14 pt (recommended 12-16 pt)
        sectionWeight: 'bold' as FontWeight,
        bodyFont: signatureFont || ('inter' as FontFamily),
        bodySize: 14.7, // 11 pt (ideal balance)
        lineHeight: 1.5,
        bodyWeight: 'normal' as FontWeight,
      };
  }
};

export const isLegacyDummySizes = (sizes?: {
  primaryHeading?: number;
  secondaryHeading?: number;
  sectionTitle?: number;
  body?: number;
}) => {
  return (
    sizes &&
    sizes.primaryHeading === 24 &&
    sizes.secondaryHeading === 16 &&
    sizes.sectionTitle === 14 &&
    sizes.body === 10
  );
};

export const getTemplateDefaults = (templateId: TemplateId) => {
  const template = TEMPLATES.find(t => t.id === templateId);
  const themeColor = template?.accentColor || '#2563eb';
  const fontFamily: FontFamily = template?.fontFamily || getTemplateSignatureFont(templateId);
  const enableGrouping = getTemplateDefaultSkillsGrouping(templateId);
  const eff = getEffectiveTypographyDefaults(templateId);

  return {
    themeColor,
    fontFamily: eff.headingFont || fontFamily,
    skillsConfig: {
      enableGrouping,
      showLevels: !enableGrouping,
    },
    typography: {
      primaryFont: eff.headingFont || fontFamily,
      headingFont: eff.headingFont,
      roleFont: eff.roleFont,
      sectionFont: eff.sectionFont,
      bodyFont: eff.bodyFont,
      lineHeight: eff.lineHeight,
      sizes: {
        primaryHeading: eff.headingSize,
        secondaryHeading: eff.roleSize,
        sectionTitle: eff.sectionSize,
        body: eff.bodySize,
      },
      weights: {
        primaryHeading: eff.headingWeight,
        secondaryHeading: eff.roleWeight,
        sectionTitle: eff.sectionWeight,
        body: eff.bodyWeight,
      }
    },
    layout: {
      format: 'A4',
      margins: {
        topBottom: 0.5,
        leftRight: 0.5,
      },
      spacing: {
        betweenSections: ['ats', 'fresher', 'sarkari', 'harvard', 'harvard_tech', 'harvard_experienced', 'silicon', 'flow'].includes(templateId) ? 16 : 24,
        betweenTitlesContent: ['ats', 'harvard', 'harvard_tech', 'harvard_experienced', 'silicon'].includes(templateId) ? 8 : 12,
        betweenBlocks: ['ats', 'harvard', 'harvard_tech', 'harvard_experienced', 'silicon'].includes(templateId) ? 8 : 12,
        insideBlock: 4,
      },
      dateFormat: 'Short Name (Jan YYYY)',
    }
  } as any;
};


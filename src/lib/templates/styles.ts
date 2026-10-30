/**
 * @fileoverview Template Typography, Palettes & Style Defaults
 * @description Color palettes, curated font selections, signature fonts,
 * line height options, and baseline geometry configurations.
 */

import { FontFamily, LineHeightOption, TemplateId } from '@/types/resume';
import { TEMPLATES } from './definitions';
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

export const getTemplateDefaults = (templateId: TemplateId) => {
  const template = TEMPLATES.find(t => t.id === templateId);
  const themeColor = template?.accentColor || '#2563eb';
  const fontFamily: FontFamily = template?.fontFamily || getTemplateSignatureFont(templateId);

  return {
    themeColor,
    fontFamily,
    typography: {
      primaryFont: fontFamily,
      secondaryFont: fontFamily,
      lineHeight: 1.5,
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


import React from 'react';
import { FontFamily, FontWeight, ResumeData } from '@/types/resume';
import { getTemplateSignatureFont, isLegacyDummySizes } from '@/lib/templates';

interface CustomThemeStylesProps {
  resume: ResumeData;
  containerId?: string;
}

export const CustomThemeStyles: React.FC<CustomThemeStylesProps> = ({ resume, containerId }) => {
  const { typography, layout, fontFamily, templateId } = resume;
  if (!typography && !layout && !fontFamily && !templateId) return null;

  const roots = containerId
    ? [`#${containerId}`, '[data-ghost-measurer="true"]']
    : ['.resume-canvas-content', '[data-ghost-measurer="true"]', '#a4-resume-document'];

  const scope = (...targetSelectors: string[]) => {
    return roots
      .flatMap((root) => targetSelectors.map((target) => `${root} ${target}`))
      .join(',\n  ');
  };

  const rootRule = roots.join(',\n  ');

  const isLegacy = isLegacyDummySizes(typography?.sizes);
  const tSizes = isLegacy ? {} : (typography?.sizes || {});
  const tWeights = isLegacy ? {} : (typography?.weights || {});
  const lMargins = layout?.margins || {};
  const lSpacing = layout?.spacing || {};
  const signatureFont = templateId ? getTemplateSignatureFont(templateId) : undefined;
  const activeFont =
    typography?.primaryFont ||
    (fontFamily && fontFamily !== 'inter'
      ? fontFamily
      : signatureFont || fontFamily || 'inter');

  const mapWeight = (w: FontWeight | string | undefined, defaultW: string) => {
    if (!w) return defaultW;
    if (w === 'light') return '300';
    if (w === 'normal') return '400';
    if (w === 'medium') return '500';
    if (w === 'semibold') return '600';
    if (w === 'bold') return '700';
    return w;
  };

  const getFontFamilyCss = (font?: FontFamily, fallback?: string): string => {
    if (!font) return fallback || 'inherit';
    switch (font) {
      case 'space_grotesk':
        return "var(--font-space-grotesk), 'Space Grotesk', sans-serif";
      case 'fraunces':
        return "var(--font-fraunces), 'Fraunces', Georgia, serif";
      case 'dm_serif':
        return "var(--font-dm-serif), 'DM Serif Display', Georgia, serif";
      case 'times':
        return "'Times New Roman', Times, 'EB Garamond', Georgia, serif";
      case 'garamond':
        return "var(--font-garamond), 'EB Garamond', 'Times New Roman', serif";
      case 'playfair':
        return "var(--font-playfair), 'Playfair Display', Georgia, Cambria, serif";
      case 'merriweather':
        return "var(--font-merriweather), 'Merriweather', Georgia, Cambria, serif";
      case 'outfit':
        return "var(--font-outfit), 'Outfit', sans-serif";
      case 'jakarta':
        return "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";
      case 'manrope':
        return "var(--font-manrope), 'Manrope', sans-serif";
      case 'roboto':
        return "var(--font-roboto), Roboto, sans-serif";
      case 'sourcesans':
        return "var(--font-sourcesans), 'Source Sans 3', sans-serif";
      case 'poppins':
        return "var(--font-poppins), Poppins, sans-serif";
      case 'montserrat':
        return "var(--font-montserrat), Montserrat, sans-serif";
      case 'lato':
        return "var(--font-lato), Lato, sans-serif";
      case 'raleway':
        return "var(--font-raleway), Raleway, sans-serif";
      case 'rubik':
        return "var(--font-rubik), Rubik, sans-serif";
      case 'opensans':
        return "var(--font-opensans), 'Open Sans', sans-serif";
      case 'inter':
      default:
        return "var(--font-inter), Inter, sans-serif";
    }
  };

  const primaryFontCss = getFontFamilyCss(activeFont);
  const headingFontCss = getFontFamilyCss(typography?.headingFont, primaryFontCss);
  const roleFontCss = getFontFamilyCss(typography?.roleFont, primaryFontCss);
  const sectionFontCss = getFontFamilyCss(typography?.sectionFont, primaryFontCss);
  const bodyFontCss = getFontFamilyCss(typography?.bodyFont, primaryFontCss);

  const formatSize = (size: number | undefined, defaultPx: string) => {
    if (size === undefined) return defaultPx;
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return String(size);
  };

  const isCustomPrimaryFont = Boolean(
    typography?.primaryFont &&
    typography.primaryFont !== 'inter' &&
    typography.primaryFont !== signatureFont
  );

  const isCustomBodyFont = Boolean(
    typography?.bodyFont &&
    typography.bodyFont !== signatureFont
  );

  let cssText = `${rootRule} {
    --resume-font: ${primaryFontCss};
    --font-heading: ${headingFontCss};
    --font-role: ${roleFontCss};
    --font-section: ${sectionFontCss};
    --font-body: ${bodyFontCss};

    ${isCustomBodyFont || isCustomPrimaryFont ? `font-family: ${bodyFontCss};` : ''}

    ${tSizes.primaryHeading ? `--text-primary: ${formatSize(tSizes.primaryHeading, '25px')};` : ''}
    ${tSizes.secondaryHeading ? `--text-secondary: ${formatSize(tSizes.secondaryHeading, '14.7px')};` : ''}
    ${tSizes.sectionTitle ? `--text-title: ${formatSize(tSizes.sectionTitle, '18.7px')};` : ''}
    ${tSizes.body ? `--text-body: ${formatSize(tSizes.body, '14.7px')};` : ''}
    
    ${tWeights.primaryHeading ? `--weight-primary: ${mapWeight(tWeights.primaryHeading, '700')};` : ''}
    ${tWeights.secondaryHeading ? `--weight-secondary: ${mapWeight(tWeights.secondaryHeading, '600')};` : ''}
    ${tWeights.sectionTitle ? `--weight-title: ${mapWeight(tWeights.sectionTitle, '700')};` : ''}
    ${tWeights.body ? `--weight-body: ${mapWeight(tWeights.body, '400')};` : ''}
    
    --line-height: ${typography?.lineHeight ?? 1.5};
    
    --margin-y: ${lMargins.topBottom ?? 0.5}in;
    --margin-x: ${lMargins.leftRight ?? 0.5}in;
    
    --space-section: ${lSpacing.betweenSections ?? 24}pt;
    --space-title-content: ${lSpacing.betweenTitlesContent ?? 12}pt;
    --space-block: ${lSpacing.betweenBlocks ?? 12}pt;
    --space-inside: ${lSpacing.insideBlock ?? 4}pt;
  }

  ${tSizes.primaryHeading || typography?.headingFont || tWeights.primaryHeading ? `
  ${scope(
    'h1',
    '[data-ghost-header] h1',
    '[data-ghost-header="true"] h1',
    'header h1',
    'aside h1',
    '.resume-name',
    '[data-ghost-header="true"] .text-3xl'
  )} {
    ${tSizes.primaryHeading ? `font-size: ${formatSize(tSizes.primaryHeading, '25px')} !important;` : ''}
    ${typography?.headingFont ? `font-family: ${headingFontCss} !important;` : ''}
    ${tWeights.primaryHeading ? `font-weight: ${mapWeight(tWeights.primaryHeading, '700')} !important;` : ''}
  }` : ''}

  ${tSizes.secondaryHeading || typography?.roleFont || tWeights.secondaryHeading ? `
  ${scope(
    '[data-ghost-role="true"]',
    '[data-ghost-header="true"] [data-ghost-role="true"]',
    'header [data-ghost-role="true"]',
    'aside [data-ghost-role="true"]'
  )} {
    ${tSizes.secondaryHeading ? `font-size: ${formatSize(tSizes.secondaryHeading, '14.7px')} !important;` : ''}
    ${typography?.roleFont ? `font-family: ${roleFontCss} !important;` : ''}
    ${tWeights.secondaryHeading ? `font-weight: ${mapWeight(tWeights.secondaryHeading, '600')} !important;` : ''}
  }` : ''}

  ${tSizes.sectionTitle || typography?.sectionFont || tWeights.sectionTitle ? `
  ${scope(
    '[data-ghost-section-title="true"]',
    '[data-ghost-section-title="true"] > div',
    '[data-ghost-section-title="true"] > h2',
    '[data-ghost-section-title="true"] > h3',
    '[data-ghost-section-title="true"] > span:not([class*="rounded"]):not([class*="w-"])',
    '[data-ghost-section] h2',
    '[data-ghost-section] h3'
  )} {
    ${tSizes.sectionTitle ? `font-size: ${formatSize(tSizes.sectionTitle, '18.7px')} !important;` : ''}
    ${typography?.sectionFont ? `font-family: ${sectionFontCss} !important;` : ''}
    ${tWeights.sectionTitle ? `font-weight: ${mapWeight(tWeights.sectionTitle, '700')} !important;` : ''}
  }` : ''}

  ${tSizes.body || typography?.bodyFont || tWeights.body || (typography?.lineHeight && typography.lineHeight !== 1.5) ? `
  ${scope(
    '[data-ghost-bullet]',
    'ul[data-ghost-bullets] > li',
    '[data-ghost-item] li',
    '.rich-text-block li',
    '[data-ghost-section="summary"] .rich-text-content',
    '[data-ghost-section="summary"] p',
    '[data-ghost-section="summary"] > div:not([data-ghost-section-title="true"])',
    '[data-ghost-item] .rich-text-content',
    '[data-ghost-item] .rich-text-content p',
    '[data-ghost-item] .rich-text-content li',
    '[data-ghost-item] > p',
    '.resume-highlights li',
    '[data-ghost-section="certifications"] li',
    '[data-ghost-section="languages"] li',
    '[data-ghost-section="skills"] li'
  )} {
    ${tSizes.body ? `font-size: ${formatSize(tSizes.body, '14.7px')} !important;` : ''}
    ${typography?.bodyFont ? `font-family: ${bodyFontCss} !important;` : ''}
    ${tWeights.body ? `font-weight: ${mapWeight(tWeights.body, '400')} !important;` : ''}
    ${typography?.lineHeight && typography.lineHeight !== 1.5 ? `line-height: ${typography.lineHeight} !important;` : ''}
  }

  ${scope(
    '[data-ghost-item] b',
    '[data-ghost-item] strong',
    '[data-ghost-item] .font-bold',
    '.rich-text-content b',
    '.rich-text-content strong'
  )} {
    font-weight: 700 !important;
  }` : ''}
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssText }} />;
};

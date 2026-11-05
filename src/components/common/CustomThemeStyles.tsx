import React from 'react';
import { ResumeData, FontFamily } from '@/types/resume';
import { getEffectiveTemplateConfig } from '@/lib/templates/template-config';

interface CustomThemeStylesProps {
  resume: ResumeData;
  containerId?: string;
}

const getFontFamilyStack = (font: FontFamily): string => {
  switch (font) {
    case 'roboto':
      return "var(--font-roboto), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case 'sourcesans':
      return "var(--font-sourcesans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case 'poppins':
      return "var(--font-poppins), sans-serif";
    case 'montserrat':
      return "var(--font-montserrat), sans-serif";
    case 'lato':
      return "var(--font-lato), sans-serif";
    case 'raleway':
      return "var(--font-raleway), sans-serif";
    case 'rubik':
      return "var(--font-rubik), sans-serif";
    case 'opensans':
      return "var(--font-opensans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case 'times':
      return "'Times New Roman', Times, 'EB Garamond', Georgia, serif";
    case 'garamond':
      return "var(--font-garamond), 'EB Garamond', 'Times New Roman', serif";
    case 'playfair':
      return "var(--font-playfair), Georgia, Cambria, serif";
    case 'merriweather':
      return "var(--font-merriweather), Georgia, Cambria, serif";
    case 'outfit':
      return "var(--font-outfit), sans-serif";
    case 'jakarta':
      return "var(--font-jakarta), sans-serif";
    case 'manrope':
      return "'Manrope', var(--font-manrope), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    case 'space_grotesk':
      return "'Space Grotesk', var(--font-space-grotesk), sans-serif";
    case 'inter':
    default:
      return "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  }
};

export const CustomThemeStyles: React.FC<CustomThemeStylesProps> = ({ resume, containerId }) => {
  const config = getEffectiveTemplateConfig(resume);

  // Single unified font stack across the entire resume
  const fontStack = getFontFamilyStack(config.fontFamily);

  const scope = containerId ? `#${containerId}` : '.resume-canvas-content';

  const cssText = `
    ${scope}, [data-ghost-measurer="true"] {
      --resume-accent: ${config.accentColor};
      --resume-font: ${fontStack};
      --font-header: ${fontStack};
      --font-sub-header: ${fontStack};
      --font-section-header: ${fontStack};
      --font-body: ${fontStack};

      --size-header: ${config.headerSize}pt;
      --size-sub-header: ${config.subHeaderSize}pt;
      --size-section-header: ${config.sectionHeaderSize}pt;
      --size-body: ${config.bodySize}pt;

      --resume-line-height: ${config.lineHeight};
      --space-section: ${config.sectionSpacing}pt;
      --page-padding: ${config.pagePadding}px;

      /* Backwards-compatibility token mappings */
      --text-primary: ${config.headerSize}pt;
      --text-secondary: ${config.subHeaderSize}pt;
      --text-title: ${config.sectionHeaderSize}pt;
      --text-body: ${config.bodySize}pt;
      --line-height: ${config.lineHeight};
    }

    /* Universal font family application */
    ${scope},
    [data-ghost-measurer="true"],
    ${scope} * {
      font-family: var(--resume-font);
    }

    /* 1. Header (Candidate Name) Size */
    ${scope} [data-ghost-header="true"] h1,
    [data-ghost-measurer="true"] [data-ghost-header="true"] h1,
    ${scope} [data-ghost-header="true"] .text-3xl,
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-3xl,
    ${scope} [data-ghost-header="true"] .text-2xl,
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-2xl,
    ${scope} [data-ghost-header="true"] .text-4xl,
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-4xl,
    ${scope} [data-ghost-header="true"] .text-\\[32px\\],
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-\\[32px\\],
    ${scope} [data-ghost-header="true"] .text-\\[35px\\],
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-\\[35px\\],
    ${scope} [data-ghost-header="true"] .text-\\[38px\\],
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-\\[38px\\],
    ${scope} [data-ghost-header="true"] .text-\\[28px\\],
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-\\[28px\\],
    ${scope} [data-ghost-header="true"] .text-\\[26px\\],
    [data-ghost-measurer="true"] [data-ghost-header="true"] .text-\\[26px\\],
    ${scope} [data-ghost-header="true"] [data-candidate-name="true"],
    [data-ghost-measurer="true"] [data-ghost-header="true"] [data-candidate-name="true"] {
      font-size: var(--size-header) !important;
      line-height: 1.15 !important;
    }

    /* 2. Sub-Header (Roles, Institutions, Degrees inside item headers) Size */
    ${scope} [data-ghost-item-header="true"] h3,
    [data-ghost-measurer="true"] [data-ghost-item-header="true"] h3,
    ${scope} [data-ghost-item-header="true"] .font-bold:not(.text-xs):not(.text-\\[11px\\]):not(.text-\\[10\\.5px\\]):not(.text-\\[10px\\]),
    [data-ghost-measurer="true"] [data-ghost-item-header="true"] .font-bold:not(.text-xs):not(.text-\\[11px\\]):not(.text-\\[10\\.5px\\]):not(.text-\\[10px\\]),
    ${scope} [data-ghost-item-header="true"] .font-semibold:not(.text-xs):not(.text-\\[11px\\]):not(.text-\\[10\\.5px\\]):not(.text-\\[10px\\]),
    [data-ghost-measurer="true"] [data-ghost-item-header="true"] .font-semibold:not(.text-xs):not(.text-\\[11px\\]):not(.text-\\[10\\.5px\\]):not(.text-\\[10px\\]) {
      font-size: var(--size-sub-header) !important;
    }

    /* 3. Section Header (Headings like "EXPERIENCE", "EDUCATION", "SKILLS") Size */
    ${scope} [data-ghost-section-title="true"],
    [data-ghost-measurer="true"] [data-ghost-section-title="true"],
    ${scope} [data-ghost-section-title="true"] h2,
    [data-ghost-measurer="true"] [data-ghost-section-title="true"] h2,
    ${scope} [data-ghost-section-title="true"] div,
    [data-ghost-measurer="true"] [data-ghost-section-title="true"] div,
    ${scope} [data-ghost-section-title="true"] span,
    [data-ghost-measurer="true"] [data-ghost-section-title="true"] span {
      font-size: var(--size-section-header) !important;
    }

    /* 4. Normal Body Text (Paragraphs, Bullet points, Summaries, Descriptions) Size & Line Height */
    ${scope} [data-ghost-section] p,
    [data-ghost-measurer="true"] [data-ghost-section] p,
    ${scope} [data-ghost-section] li,
    [data-ghost-measurer="true"] [data-ghost-section] li,
    ${scope} [data-ghost-section] .rich-text,
    [data-ghost-measurer="true"] [data-ghost-section] .rich-text,
    ${scope} [data-ghost-item] p,
    [data-ghost-measurer="true"] [data-ghost-item] p,
    ${scope} [data-ghost-item] li,
    [data-ghost-measurer="true"] [data-ghost-item] li,
    ${scope} [data-ghost-bullet],
    [data-ghost-measurer="true"] [data-ghost-bullet],
    ${scope} .resume-highlights,
    [data-ghost-measurer="true"] .resume-highlights {
      font-size: var(--size-body) !important;
      line-height: var(--resume-line-height) !important;
    }

    /* 5. Section Spacing */
    ${scope} [data-ghost-section],
    [data-ghost-measurer="true"] [data-ghost-section] {
      margin-bottom: var(--space-section) !important;
    }

    /* 6. Page Padding */
    ${scope} .a4-page-sheet > div[class*="p-"],
    [data-ghost-measurer="true"] > div[class*="p-"],
    ${scope} [data-template-padding="true"],
    [data-ghost-measurer="true"] [data-template-padding="true"] {
      padding-top: var(--page-padding) !important;
      padding-bottom: var(--page-padding) !important;
      padding-left: var(--page-padding) !important;
      padding-right: var(--page-padding) !important;
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: cssText }} />;
};

import React from 'react';
import { ResumeData } from '@/types/resume';
import { getTemplateSignatureFont } from '@/lib/templates';

interface CustomThemeStylesProps {
  resume: ResumeData;
  containerId?: string;
}

export const CustomThemeStyles: React.FC<CustomThemeStylesProps> = ({ resume, containerId }) => {
  const { typography, layout, fontFamily, templateId } = resume;
  if (!typography && !layout && !fontFamily && !templateId) return null;

  const selector = containerId
    ? `#${containerId}, [data-ghost-measurer="true"]`
    : '.resume-canvas-content, [data-ghost-measurer="true"]';

  const tSizes = typography?.sizes || {};
  const tWeights = typography?.weights || {};
  const lMargins = layout?.margins || {};
  const lSpacing = layout?.spacing || {};
  const activeFont = fontFamily || typography?.primaryFont || (templateId ? getTemplateSignatureFont(templateId) : 'inter');

  const mapWeight = (w: string | undefined, defaultW: string) => {
    if (!w) return defaultW;
    if (w === 'normal') return '400';
    if (w === 'medium') return '500';
    if (w === 'semibold') return '600';
    if (w === 'bold') return '700';
    return w;
  };

  let cssText = `${selector} {
    --resume-font: var(--font-${activeFont});
    --text-primary: ${tSizes.primaryHeading ?? 24}pt;
    --text-secondary: ${tSizes.secondaryHeading ?? 16}pt;
    --text-title: ${tSizes.sectionTitle ?? 14}pt;
    --text-body: ${tSizes.body ?? 10}pt;
    
    --weight-primary: ${mapWeight(tWeights.primaryHeading, '700')};
    --weight-secondary: ${mapWeight(tWeights.secondaryHeading, '700')};
    --weight-title: ${mapWeight(tWeights.sectionTitle, '700')};
    --weight-body: ${mapWeight(tWeights.body, '400')};
    
    --line-height: ${typography?.lineHeight ?? 1.5};
    
    --margin-y: ${lMargins.topBottom ?? 0.5}in;
    --margin-x: ${lMargins.leftRight ?? 0.5}in;
    
    --space-section: ${lSpacing.betweenSections ?? 24}pt;
    --space-title-content: ${lSpacing.betweenTitlesContent ?? 12}pt;
    --space-block: ${lSpacing.betweenBlocks ?? 12}pt;
    --space-inside: ${lSpacing.insideBlock ?? 4}pt;
  }`;

  return <style dangerouslySetInnerHTML={{ __html: cssText }} />;
};

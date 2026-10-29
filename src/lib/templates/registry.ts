/**
 * @fileoverview Open-Closed Template Registry.
 * Decouples template rendering from consuming components (ResumeRenderer, GhostDOMMeasurer).
 * Allows registering and querying resume template components dynamically without modifying
 * renderer switch statements.
 */

import React from 'react';
import { ResumeData, TemplateId } from '@/types/resume';

import { PrawiraTemplate } from '@/components/resume-templates/PrawiraTemplate';
import { ChastainTemplate } from '@/components/resume-templates/ChastainTemplate';
import { LukitoTemplate } from '@/components/resume-templates/LukitoTemplate';
import { SantosoTemplate } from '@/components/resume-templates/SantosoTemplate';
import { ATSTemplate } from '@/components/resume-templates/ATSTemplate';
import { StockholmTemplate } from '@/components/resume-templates/StockholmTemplate';
import { DublinTemplate } from '@/components/resume-templates/DublinTemplate';
import { SydneyTemplate } from '@/components/resume-templates/SydneyTemplate';
import { ViennaTemplate } from '@/components/resume-templates/ViennaTemplate';
import { MadridTemplate } from '@/components/resume-templates/MadridTemplate';
import { TraditionalTemplate } from '@/components/resume-templates/TraditionalTemplate';
import { NaukriTemplate } from '@/components/resume-templates/NaukriTemplate';
import { FresherTemplate } from '@/components/resume-templates/FresherTemplate';
import { SarkariTemplate } from '@/components/resume-templates/SarkariTemplate';
import { HarvardTemplate } from '@/components/resume-templates/HarvardTemplate';
import { HarvardTechTemplate } from '@/components/resume-templates/HarvardTechTemplate';
import { HarvardExperiencedTemplate } from '@/components/resume-templates/HarvardExperiencedTemplate';
import { CascadeTemplate } from '@/components/resume-templates/CascadeTemplate';
import { NovoresumeTemplate } from '@/components/resume-templates/NovoresumeTemplate';
import { TorontoTemplate } from '@/components/resume-templates/TorontoTemplate';
import { EnhancvTemplate } from '@/components/resume-templates/EnhancvTemplate';
import { FlowTemplate } from '@/components/resume-templates/FlowTemplate';
import { SiliconTemplate } from '@/components/resume-templates/SiliconTemplate';
import { OxfordTemplate } from '@/components/resume-templates/OxfordTemplate';
import { CanvaTemplate } from '@/components/resume-templates/CanvaTemplate';
import { EuropassTemplate } from '@/components/resume-templates/EuropassTemplate';
import { CanvaPastelTemplate } from '@/components/resume-templates/CanvaPastelTemplate';
import { CanvaNotebookTemplate } from '@/components/resume-templates/CanvaNotebookTemplate';
import { CanvaEditorialTemplate } from '@/components/resume-templates/CanvaEditorialTemplate';
import { CanvaRetroTemplate } from '@/components/resume-templates/CanvaRetroTemplate';
import { CanvaAestheticTemplate } from '@/components/resume-templates/CanvaAestheticTemplate';
import { RibbonTemplate } from '@/components/resume-templates/RibbonTemplate';
import { MarigoldTemplate } from '@/components/resume-templates/MarigoldTemplate';
import { StampTemplate } from '@/components/resume-templates/StampTemplate';

/**
 * Common prop contract adhered to by all resume template components.
 */
export interface TemplateProps {
  data: ResumeData;
}

export type TemplateComponent = React.ComponentType<TemplateProps>;

/**
 * Exhaustive mapping of all supported template identifiers to their React components.
 */
export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateComponent> = {
  prawira: PrawiraTemplate,
  chastain: ChastainTemplate,
  rahadian: LukitoTemplate,
  santoso: SantosoTemplate,
  ats: ATSTemplate,
  stockholm: StockholmTemplate,
  dublin: DublinTemplate,
  sydney: SydneyTemplate,
  vienna: ViennaTemplate,
  madrid: MadridTemplate,
  traditional: TraditionalTemplate,
  naukri: NaukriTemplate,
  fresher: FresherTemplate,
  sarkari: SarkariTemplate,
  harvard: HarvardTemplate,
  harvard_tech: HarvardTechTemplate,
  harvard_experienced: HarvardExperiencedTemplate,
  cascade: CascadeTemplate,
  novoresume: NovoresumeTemplate,
  toronto: TorontoTemplate,
  enhancv: EnhancvTemplate,
  flow: FlowTemplate,
  silicon: SiliconTemplate,
  oxford: OxfordTemplate,
  canva: CanvaTemplate,
  europass: EuropassTemplate,
  canvapastel: CanvaPastelTemplate,
  canvanotebook: CanvaNotebookTemplate,
  canvaeditorial: CanvaEditorialTemplate,
  canvaretro: CanvaRetroTemplate,
  canvaaesthetic: CanvaAestheticTemplate,
  ribbon: RibbonTemplate,
  marigold: MarigoldTemplate,
  stamp: StampTemplate,
};

/**
 * Retrieves the React component associated with a templateId.
 * Falls back to PrawiraTemplate if the templateId is unknown or undefined.
 *
 * @param templateId - The string identifier of the requested template.
 * @returns The matching React ComponentType.
 */
export function getTemplateComponent(templateId?: TemplateId | string): TemplateComponent {
  if (templateId && templateId in TEMPLATE_REGISTRY) {
    return TEMPLATE_REGISTRY[templateId as TemplateId];
  }
  return PrawiraTemplate;
}

/**
 * Dynamically registers or overrides a template component in the registry.
 * Enables plugin-style template extensibility (Open for extension, Closed for modification).
 *
 * @param id - The unique template identifier.
 * @param component - The React component implementing TemplateProps.
 */
export function registerTemplate(id: TemplateId, component: TemplateComponent): void {
  TEMPLATE_REGISTRY[id] = component;
}

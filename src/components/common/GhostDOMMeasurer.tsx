'use client';

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ResumeData } from '@/types/resume';
import { measureGhostDOM, DOMResumeMetrics } from '@/lib/ghost-dom-measurer';
import { TEMPLATE_COLUMN_CONTRACTS, getDefaultSectionOrder, getEffectiveSectionOrder, getTemplateSignatureFont } from '@/lib/templates';
import { getTemplateComponent } from '@/lib/templates/registry';
import { CustomThemeStyles } from '@/components/common/CustomThemeStyles';
import { getPageFormatConfig } from '@/lib/page-format';
import { cn } from '@/lib/utils';

// SSR-safe layout effect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface GhostDOMMeasurerProps {
  data: ResumeData;
  onMeasured: (metrics: DOMResumeMetrics) => void;

}

export const GhostDOMMeasurer: React.FC<GhostDOMMeasurerProps> = ({ data, onMeasured }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const templateId = data.templateId || 'prawira';
  const effectiveOrder = getEffectiveSectionOrder(templateId, data.sectionOrder, data.experienceLevel);

  // Unpaginated full dataset
  const unpaginatedData: ResumeData = {
    ...data,
    pageNumber: 1,
    totalPages: 1,
    sectionOrder: {
      singleColumn: effectiveOrder.singleColumn?.filter(s => !data.hiddenSections?.includes(s)),
      mainColumn: effectiveOrder.mainColumn?.filter(s => !data.hiddenSections?.includes(s)),
      sidebarColumn: effectiveOrder.sidebarColumn?.filter(s => !data.hiddenSections?.includes(s)),
    },
  };

  useIsomorphicLayoutEffect(() => {
    if (!mounted || !containerRef.current) return;

    let rafId: number | null = null;
    let timerId: NodeJS.Timeout | null = null;

    const executeMeasurement = () => {
      if (containerRef.current) {
        const metrics = measureGhostDOM(containerRef.current);
        onMeasured(metrics);
      }
    };

    // Debounce DOM measurement by 200ms to avoid layout thrashing during fast typing,
    // while keeping preview responsive
    timerId = setTimeout(() => {
      // If document.fonts API is available, ensure fonts are loaded
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          rafId = requestAnimationFrame(executeMeasurement);
        });
      } else {
        rafId = requestAnimationFrame(executeMeasurement);
      }
    }, 200);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    mounted,
    data,
  ]);

  const renderTemplate = () => {
    const TemplateComponent = getTemplateComponent(templateId);
    return <TemplateComponent data={unpaginatedData} />;
  };

  const getFontFamilyClass = () => {
    const activeFont = data.fontFamily || getTemplateSignatureFont(templateId);
    switch (activeFont) {
      case 'roboto':
        return 'font-roboto font-sans';
      case 'sourcesans':
        return 'font-sourcesans font-sans';
      case 'poppins':
        return 'font-poppins font-sans';
      case 'montserrat':
        return 'font-montserrat font-sans';
      case 'lato':
        return 'font-lato font-sans';
      case 'raleway':
        return 'font-raleway font-sans';
      case 'rubik':
        return 'font-rubik font-sans';
      case 'opensans':
        return 'font-opensans font-sans';
      case 'times':
        return 'font-times font-serif';
      case 'garamond':
        return 'font-garamond font-serif';
      case 'playfair':
        return 'font-playfair font-serif';
      case 'merriweather':
        return 'font-merriweather font-serif';
      case 'outfit':
        return 'font-outfit font-sans';
      case 'jakarta':
        return 'font-jakarta font-sans';
      case 'inter':
      default:
        return 'font-inter font-sans';
    }
  };

  if (!mounted || typeof document === 'undefined') return null;

  const formatConfig = getPageFormatConfig(data.layout?.format);

  return createPortal(
    <div
      ref={containerRef}
      aria-hidden="true"
      data-ghost-measurer="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: `${formatConfig.widthMm}mm`,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -9999,
      }}
      className={cn('bg-white select-none', getFontFamilyClass())}
    >
      <CustomThemeStyles resume={data} />
      {renderTemplate()}
    </div>,
    document.body
  );
};

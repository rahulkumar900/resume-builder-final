'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { paginateResume } from '@/lib/pagination';
import { GhostDOMMeasurer } from '@/components/common/GhostDOMMeasurer';
import { paginateWithMeasuredDOM, DOMResumeMetrics } from '@/lib/ghost-dom-measurer';
import { CustomThemeStyles } from '@/components/common/CustomThemeStyles';
import { getTemplateComponent } from '@/lib/templates/registry';
import { getTemplateSignatureFont } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface ResumeRendererProps {
  data: ResumeData;
  scale?: number;
  className?: string;
  isPrint?: boolean;
  activePage?: number;
  disableGhostDOM?: boolean;
  onPageCountChange?: (count: number) => void;
}

export const ResumeRenderer = React.forwardRef<HTMLDivElement, ResumeRendererProps>(
  ({ data, scale = 1, className, isPrint = false, activePage, disableGhostDOM = false, onPageCountChange }, ref) => {
    // Initial analytical pass (SSR safe & zero flash, memoized)
    const analyticalPages = React.useMemo(() => paginateResume(data), [data]);

    // Measured DOM pagination state
    const [domPages, setDomPages] = useState<ResumeData[] | null>(null);

    const handleMeasured = useCallback((metrics: DOMResumeMetrics) => {
      try {
        const measured = paginateWithMeasuredDOM(data, metrics);
        if (measured && measured.length > 0) {
          setDomPages(measured);
        }
      } catch (err) {
        console.warn('Ghost DOM pagination fallback to analytical:', err);
      }
    }, [data]);

    // Use DOM-measured pages if available, otherwise fallback to analytical
    const pages = domPages || analyticalPages;

    useEffect(() => {
      onPageCountChange?.(pages.length);
    }, [pages.length, onPageCountChange]);

    // If activePage is set (and not printing), display only that single page for paginated viewer
    const displayPages =
      !isPrint && activePage && activePage >= 1 && activePage <= pages.length
        ? pages.filter((_, idx) => idx + 1 === activePage)
        : pages;

    const renderPageContent = (pageData: ResumeData) => {
      const TemplateComponent = getTemplateComponent(pageData.templateId);
      return <TemplateComponent data={pageData} />;
    };

    const getFontFamilyClass = () => {
      const activeFont = data.fontFamily || getTemplateSignatureFont(data.templateId);
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

    return (
      <div
        ref={ref}
        id="a4-resume-document"
        data-pagination-ready="true"
        data-measured-ready={domPages !== null ? 'true' : 'false'}
        data-total-pages={pages.length}
        className={cn(
          'flex flex-col items-center select-text',
          !isPrint && pages.length > 1 && 'gap-8',
          getFontFamilyClass(),
          className
        )}
      >
        <CustomThemeStyles resume={data} containerId="a4-resume-document" />
        
        {/* Global Page Break Avoidance & Strict A4 Print Rules */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @page {
                size: A4 portrait;
                margin: 0;
              }
              .break-inside-avoid {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
              }
              .break-after-avoid {
                break-after: avoid !important;
                page-break-after: avoid !important;
              }
              @media print {
                html, body {
                  margin: 0 !important;
                  padding: 0 !important;
                  background: white !important;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
                #a4-resume-document {
                  display: block !important;
                  width: 210mm !important;
                  margin: 0 auto !important;
                  padding: 0 !important;
                }
                .break-inside-avoid {
                  break-inside: avoid !important;
                  page-break-inside: avoid !important;
                }
                .a4-page-sheet {
                  display: block !important;
                  width: 210mm !important;
                  height: 297mm !important;
                  max-height: 297mm !important;
                  overflow: hidden !important;
                  box-sizing: border-box !important;
                  break-after: page !important;
                  page-break-after: always !important;
                  margin: 0 !important;
                  box-shadow: none !important;
                  border: none !important;
                }
                .a4-page-sheet:last-child {
                  break-after: auto !important;
                  page-break-after: auto !important;
                }
                [data-ghost-measurer] {
                  display: none !important;
                }
              }
            `,
          }}
        />

        {displayPages.map((pageData, idx) => {
          const currentPageNum = pageData.pageNumber || idx + 1;
          const totalPageNum = pageData.totalPages || pages.length;

          return (
            <div
              key={pageData.pageNumber || idx}
              data-sheet-page={currentPageNum}
              className={cn(
                'a4-page-sheet relative bg-white transition-all duration-200 overflow-hidden box-border',
                !isPrint &&
                  'shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12),0_4px_14px_-2px_rgba(15,23,42,0.05)] rounded-[2px] ring-1 ring-slate-200/80 print:shadow-none print:ring-0'
              )}
              style={{
                width: '210mm',
                height: '297mm',
                maxHeight: '297mm',
                boxSizing: 'border-box',
              }}
            >
              {renderPageContent(pageData)}
            </div>
          );
        })}

        {/* Ghost DOM Measurer (Invisible, measures true rendered heights, disabled for preview cards) */}
        {!disableGhostDOM && <GhostDOMMeasurer data={data} onMeasured={handleMeasured} />}
      </div>
    );
  }
);

ResumeRenderer.displayName = 'ResumeRenderer';

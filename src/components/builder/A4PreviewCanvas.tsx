'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { ResumeRenderer } from '@/components/resume-templates/ResumeRenderer';
import { getPageFormatConfig, PageFormat } from '@/lib/page-format';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface A4PreviewCanvasProps {
  resume: ResumeData;
  scale: number;
  setScale?: (scale: number) => void;
  onFitToScreen?: () => void;
  onFormatChange?: (format: PageFormat) => void;
  isMobileCustomizing?: boolean;
}

export const A4PreviewCanvas: React.FC<A4PreviewCanvasProps> = ({
  resume,
  scale,
  setScale,
  onFitToScreen,
  onFormatChange,
  isMobileCustomizing = false,
}) => {
  const docRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const formatConfig = getPageFormatConfig(resume.layout?.format);
  const currentFormat = formatConfig.id;

  useEffect(() => {
    const el = docRef.current;
    if (!el) return;

    const updateDimensions = () => {
      const totalAttr = el.getAttribute('data-total-pages');
      let count = 1;
      if (totalAttr) {
        count = parseInt(totalAttr, 10);
      } else {
        const sheets = el.querySelectorAll('.a4-page-sheet');
        count = Math.max(1, sheets.length);
      }
      setPageCount(count);
      setCurrentPage((prev) => (prev > count ? count : Math.max(1, prev)));
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(el);

    return () => observer.disconnect();
  }, [resume]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(pageCount, prev + 1));
  };

  // Keyboard navigation for pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid intercepting if user is typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (pageCount > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrevPage();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNextPage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageCount]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start p-2 sm:p-6 overflow-y-auto select-none">
      {/* Dynamic Scaled Canvas Container */}
      <div
        className="transition-all duration-150 flex justify-center shrink-0 my-2 sm:my-auto mb-16"
        style={{
          width: `${formatConfig.widthMm * scale}mm`,
          height: `${formatConfig.heightMm * scale}mm`,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${formatConfig.widthMm}mm`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <ResumeRenderer
            ref={docRef}
            data={resume}
            isPrint={false}
            activePage={currentPage}
            onPageCountChange={(count) => {
              setPageCount(count);
              setCurrentPage((prev) => (prev > count ? count : Math.max(1, prev)));
            }}
          />
        </div>
      </div>

      {/* Floating Bottom Center Minimal Control Dock (Zoom, Page switcher & Format) */}
      <div
        className={cn(
          'sticky bottom-4 sm:bottom-6 z-30 flex items-center bg-white/95 dark:bg-[#161614]/95 hover:bg-slate-50 dark:hover:bg-[#1f1f1d] text-slate-700 dark:text-zinc-200 rounded-full px-3 py-1 shadow-lg border border-slate-200/90 dark:border-white/[0.1] gap-2 text-xs select-none transition-all backdrop-blur-md',
          isMobileCustomizing && 'hidden sm:flex'
        )}
      >
        {/* Zoom Out Button (-) */}
        <button
          type="button"
          onClick={() => setScale && setScale(Math.max(0.35, parseFloat((scale - 0.1).toFixed(2))))}
          className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-accent flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <span className="text-base font-bold leading-none">&minus;</span>
        </button>

        {/* Fit Button */}
        {onFitToScreen && (
          <button
            type="button"
            onClick={onFitToScreen}
            className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent transition-colors cursor-pointer"
            title="Fit to Screen"
          >
            Fit
          </button>
        )}

        {/* Zoom In Button (+) */}
        <button
          type="button"
          onClick={() => setScale && setScale(Math.min(1.4, parseFloat((scale + 0.1).toFixed(2))))}
          className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-accent flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
          title="Zoom In"
        >
          <span className="text-base font-bold leading-none">&#43;</span>
        </button>

        <span className="h-3 w-[1px] bg-slate-200 dark:bg-border mx-0.5" />

        {/* Page Count Indicator / Switcher */}
        {pageCount > 1 ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1 hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 px-0.5">
              {currentPage} / {pageCount} pages
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= pageCount}
              className="p-1 hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-medium text-slate-500 dark:text-muted-foreground px-1">
            1 page
          </span>
        )}
        {/* Quick Format Switcher */}
        {onFormatChange && (
          <>
            <span className="h-3 w-[1px] bg-slate-200 dark:bg-border mx-0.5" />
            <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-full p-0.5 text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => onFormatChange('A4')}
                className={cn(
                  'px-2 py-0.5 rounded-full transition-all cursor-pointer',
                  currentFormat === 'A4'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-400 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
                title="A4 Format (210 × 297 mm)"
              >
                A4
              </button>
              <button
                type="button"
                onClick={() => onFormatChange('Letter')}
                className={cn(
                  'px-2 py-0.5 rounded-full transition-all cursor-pointer',
                  currentFormat === 'Letter'
                    ? 'bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-400 font-bold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                )}
                title="US Letter Format (8.5 × 11 in)"
              >
                Letter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

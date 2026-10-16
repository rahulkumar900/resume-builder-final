'use client';

import React from 'react';
import { SectionKey, NavItemConfig } from '@/types/builder';
import { ChevronLeft, ChevronRight, Sparkles, Download, Share2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FixedBottomNavProps {
  activeTab: SectionKey | 'all';
  currentStepIndex: number;
  stepKeys: SectionKey[];
  navItems: NavItemConfig[];
  onPrev: () => void;
  onNext: () => void;
  onGoToReview: () => void;
  onDownloadPdf?: () => void;
  onShare?: () => void;
  isDownloading?: boolean;
}

export const FixedBottomNav: React.FC<FixedBottomNavProps> = ({
  activeTab,
  currentStepIndex,
  stepKeys,
  navItems,
  onPrev,
  onNext,
  onGoToReview,
  onDownloadPdf,
  onShare,
  isDownloading = false,
}) => {
  const isReview = activeTab === 'review';
  const isAll = activeTab === 'all';

  const currentStep = navItems.find((item) => item.key === (isReview ? 'review' : stepKeys[currentStepIndex]));
  const prevStep = isReview
    ? navItems.find((item) => item.key === stepKeys[stepKeys.length - 1])
    : currentStepIndex > 0
    ? navItems.find((item) => item.key === stepKeys[currentStepIndex - 1])
    : null;

  const nextStep =
    !isReview && currentStepIndex >= 0 && currentStepIndex < stepKeys.length - 1
      ? navItems.find((item) => item.key === stepKeys[currentStepIndex + 1])
      : null;

  const isLastContentStep = !isReview && currentStepIndex === stepKeys.length - 1;

  return (
    <div className="border-t border-slate-200 dark:border-border bg-white/95 dark:bg-card/95 backdrop-blur-xs px-3 sm:px-8 lg:px-12 py-3 flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-xs z-20">
      {prevStep ? (
        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={onPrev}
          className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white gap-1 sm:gap-2 font-medium shadow-2xs px-2.5 sm:px-4 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="truncate max-w-[80px] sm:max-w-none">{prevStep.label}</span>
        </Button>
      ) : (
        <div />
      )}

      {isReview ? (
        <div className="flex items-center gap-2 shrink-0">
          {onShare && (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onShare}
              className="gap-1.5 font-semibold text-slate-700 dark:text-slate-200 border-slate-300 dark:border-border shadow-xs px-3 sm:px-4"
            >
              <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Share</span>
            </Button>
          )}

          {onDownloadPdf && (
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5 font-bold shadow-xs px-3 sm:px-4 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </Button>
          )}
        </div>
      ) : nextStep ? (
        <Button
          type="button"
          variant="default"
          size="default"
          onClick={onNext}
          className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1 sm:gap-2 font-semibold shadow-xs px-3 sm:px-4 shrink-0 cursor-pointer"
        >
          <span className="hidden sm:inline">Continue to </span>
          <span className="truncate max-w-[100px] sm:max-w-none">{nextStep.label}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="default"
          size="default"
          onClick={onGoToReview}
          className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5 sm:gap-2 font-bold shadow-md shadow-emerald-700/20 px-3 sm:px-4 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Review</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

'use client';

import React, { useEffect } from 'react';
import { AtsSuggestion } from '@/lib/ats/ats-analyzer';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Download,
  X,
  Lightbulb,
  Loader2,
  FileCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface CriticalIssuesWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  criticalIssues: AtsSuggestion[];
  onReviewAndFix?: () => void;
  onDownloadAnyway: () => void;
  isDownloading?: boolean;
  resumeTitle?: string;
}

export const CriticalIssuesWarningModal: React.FC<CriticalIssuesWarningModalProps> = ({
  isOpen,
  onClose,
  criticalIssues,
  onReviewAndFix,
  onDownloadAnyway,
  isDownloading = false,
  resumeTitle,
}) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDownloading, onClose]);

  if (!isOpen) return null;

  const count = criticalIssues.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="critical-warning-title"
      aria-describedby="critical-warning-desc"
    >
      <div className="w-full max-w-lg bg-white dark:bg-card rounded-2xl shadow-2xl border border-slate-200 dark:border-border overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-rose-100 dark:border-rose-950/60 bg-rose-50/60 dark:bg-rose-950/20 flex items-start justify-between shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="critical-warning-title"
                  className="text-base font-bold text-slate-900 dark:text-foreground"
                >
                  Critical ATS Issues Detected
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
                  {count} {count === 1 ? 'Issue' : 'Issues'}
                </span>
              </div>
              <p
                id="critical-warning-desc"
                className="text-xs text-slate-600 dark:text-muted-foreground mt-1 leading-relaxed"
              >
                Applicant tracking systems (Workday, Greenhouse, Taleo) may filter out this resume before a recruiter ever sees it.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDownloading}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-muted transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Issue List */}
        <div className="p-5 overflow-y-auto max-h-[320px] space-y-3 divide-y divide-slate-100 dark:divide-border/60">
          {criticalIssues.map((issue, idx) => (
            <div key={issue.id || idx} className={idx > 0 ? 'pt-3' : ''}>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-900 dark:text-foreground">
                      {issue.title}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground">
                      {issue.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-muted-foreground mt-1 leading-relaxed">
                    {issue.description}
                  </p>
                  {issue.fixHint && (
                    <div className="mt-2 flex items-start gap-1.5 p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200/90">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{issue.fixHint}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50/90 dark:bg-muted/40 border-t border-slate-200/80 dark:border-border flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={onDownloadAnyway}
            disabled={isDownloading}
            className="h-10 text-xs sm:text-sm text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground cursor-pointer flex items-center justify-center gap-1.5 font-medium"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Download Anyway
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 justify-end">
            {onReviewAndFix ? (
              <Button
                type="button"
                onClick={onReviewAndFix}
                disabled={isDownloading}
                className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 text-xs sm:text-sm font-semibold cursor-pointer shadow-xs flex items-center gap-1.5 w-full sm:w-auto justify-center"
              >
                <FileCheck className="w-3.5 h-3.5" />
                Review & Fix Issues
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onClose}
                disabled={isDownloading}
                className="h-10 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Close & Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

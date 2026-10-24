'use client';

import React, { useEffect } from 'react';
import { ArrowLeft, Check, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MobileFullscreenItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onDelete?: () => void;
  deleteLabel?: string;
  saveLabel?: string;
  children: React.ReactNode;
}

/**
 * Mobile-only full-screen form modal for section items (Experience, Education, Projects, etc.).
 * Automatically hidden on desktop (lg:hidden) so desktop preserves its side-by-side canvas workflow.
 */
export const MobileFullscreenItemModal: React.FC<MobileFullscreenItemModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  onDelete,
  deleteLabel = 'Delete Item',
  saveLabel = 'Done',
  children,
}) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Sticky Mobile Top Header */}
      <div className="px-4 py-3 bg-white dark:bg-card border-b border-slate-200 dark:border-border flex items-center justify-between shrink-0 shadow-xs gap-3">
        <button
          type="button"
          onClick={onClose}
          className="min-h-[38px] px-2.5 py-1.5 -ml-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-muted rounded-xl flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors"
          title="Back to list"
          aria-label="Back to list"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex-1 min-w-0 text-center px-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-foreground truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-muted-foreground truncate">
              {subtitle}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={onClose}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9 px-3.5 rounded-xl cursor-pointer shadow-xs shrink-0"
        >
          <Check className="w-3.5 h-3.5 mr-1" />
          <span>{saveLabel}</span>
        </Button>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 min-h-0 pb-28">
        {children}
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="p-3.5 bg-white/95 dark:bg-card/95 backdrop-blur-xs border-t border-slate-200/90 dark:border-border flex items-center gap-2.5 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
        {onDelete && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 text-xs font-medium cursor-pointer h-10 px-3.5 rounded-xl shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            <span>{deleteLabel}</span>
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          onClick={onClose}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-10 rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Save &amp; Return to List</span>
        </Button>
      </div>
    </div>
  );
};

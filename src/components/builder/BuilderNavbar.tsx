'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  Printer,
  Sparkles,
  Loader2,
  Cloud,
  CloudOff,
  ChevronDown,
  CheckCircle2,
  Wand2,
  FileText,
  Palette,
  Sun,
  Moon,
  PenLine,
  CheckSquare,
  Share2,
  Undo2,
  Redo2,
  Trash2,
  Target,
} from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { analyzeResumeAts } from '@/lib/ats/ats-analyzer';
import { analyzeJobDescriptionFit } from '@/lib/ats/jd-analyzer';
import { checkGrammar } from '@/lib/grammar/grammarEngine';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface BuilderNavbarProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onScore: () => void;
  onOpenGrammar?: () => void;
  onTailorForJob?: () => void;
  isDownloading: boolean;
  scale?: number;
  setScale?: (scale: number) => void;
  onFitToScreen?: () => void;
  cloudStatus?: 'saved' | 'saving' | 'offline';
  onOpenCustomization?: (tab?: 'template' | 'text' | 'layout') => void;
  editorMode?: 'content' | 'design' | 'check' | 'match';
  onSwitchMode?: (mode: 'content' | 'design' | 'check' | 'match') => void;
  onShare?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onDeleteResume?: () => void;
  isInputFocused?: boolean;
}

export const BuilderNavbar: React.FC<BuilderNavbarProps> = ({
  resume,
  onChange,
  onDownloadPdf,
  onPrint,
  onScore,
  onOpenGrammar,
  onTailorForJob,
  isDownloading,
  cloudStatus = 'saved',
  editorMode = 'content',
  onSwitchMode,
  onShare,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onDeleteResume,
  isInputFocused = false,
}) => {
  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const { resolvedMode, setMode } = useTheme();
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    if (editorMode && editorMode !== 'content' && onSwitchMode) {
      onSwitchMode('content');
      return;
    }
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/dashboard');
    }
  };

  const atsResult = useMemo(() => {
    return analyzeResumeAts(resume);
  }, [resume]);

  const jdFitReport = useMemo(() => {
    const jd = resume.targetJob?.jobDescription;
    if (!jd || jd.trim().length < 20) return null;
    return analyzeJobDescriptionFit(jd, resume);
  }, [resume]);

  const jdMatchRate = jdFitReport ? jdFitReport.overallScore : null;

  const grammarIssuesCount = useMemo(() => {
    let count = 0;
    if (resume.personalInfo?.summary) {
      count += checkGrammar(resume.personalInfo.summary).issues.length;
    }
    (resume.experience || []).forEach((e) => {
      (e.highlights || []).forEach((h) => {
        count += checkGrammar(h).issues.length;
      });
    });
    (resume.projects || []).forEach((p) => {
      (p.highlights || []).forEach((h) => {
        count += checkGrammar(h).issues.length;
      });
    });
    return count;
  }, [resume]);

  // Click outside listener for Export menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExportMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className={cn(
      "h-14 bg-white dark:bg-card border-b border-slate-200/90 dark:border-border px-3 sm:px-5 flex items-center justify-between sticky top-0 z-40 shrink-0 transition-all duration-200",
      isInputFocused && "h-12"
    )}>
      {/* 1. Left: Back Button, Editable Title & Save Status */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 sm:flex-initial">
        <button
          type="button"
          onClick={handleBack}
          className="p-1.5 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg transition-colors shrink-0 cursor-pointer active:scale-95"
          title={editorMode && editorMode !== 'content' ? 'Back to Editor' : 'Back'}
          aria-label={editorMode && editorMode !== 'content' ? 'Back to Editor' : 'Back'}
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
        </button>

        <div className="flex flex-col min-w-0 max-w-[185px] min-[390px]:max-w-[210px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[240px] xl:max-w-[340px]">
          <div className="flex items-center gap-1 min-w-0">
            <input
              type="text"
              value={resume.title || 'Untitled resume'}
              onChange={(e) => onChange({ title: e.target.value })}
              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground bg-transparent hover:bg-slate-100/70 dark:hover:bg-accent focus:bg-white dark:focus:bg-card px-1 py-0.5 rounded border border-transparent hover:border-slate-200 dark:border-border focus:border-primary focus:outline-none transition-all w-full truncate"
              title="Click to rename resume"
            />
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </div>

          {/* Clean Status Indicator directly underneath */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-muted-foreground font-medium px-1 whitespace-nowrap truncate">
            {cloudStatus === 'saving' ? (
              <>
                <Loader2 className="w-2.5 h-2.5 animate-spin text-primary shrink-0" />
                <span>Saving...</span>
              </>
            ) : user ? (
              <>
                <Cloud className="w-2.5 h-2.5 text-primary shrink-0" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <CloudOff className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="hover:text-primary transition-colors cursor-pointer truncate"
                >
                  Saved locally
                </button>
              </>
            )}
          </div>
        </div>

        {/* Undo / Redo Buttons */}
        {onUndo && onRedo && (
          <div className="hidden md:flex items-center gap-0.5 ml-1 border-l border-slate-200 dark:border-border pl-1.5 shrink-0">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shrink-0"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
              aria-label="Redo"
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shrink-0"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Center: Mode Switcher (Write vs Design vs Check) - Desktop Only */}
      {onSwitchMode && (
        <div className="hidden lg:flex items-center p-0.5 sm:p-1 bg-slate-100/90 dark:bg-muted rounded-xl border border-slate-200/80 dark:border-border shadow-2xs gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => onSwitchMode('content')}
            className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              editorMode === 'content'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <PenLine className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Write</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('design')}
            className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              editorMode === 'design'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Palette className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Design</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('check')}
            className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              editorMode === 'check'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Check</span>
            {atsResult.suggestions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0">
                {atsResult.suggestions.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('match')}
            className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1 xl:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              editorMode === 'match'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap"><span className="hidden xl:inline">JD </span>Match</span>
            {jdMatchRate !== null ? (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-bold shrink-0',
                  jdMatchRate >= 75
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : jdMatchRate >= 50
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                )}
              >
                {jdMatchRate}%
              </span>
            ) : null}
          </button>
        </div>
      )}

      {/* 3. Right: Theme Toggle, Split View, Share, Download PDF & User Menu */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Dark/Light Theme Toggle */}
        <button
          type="button"
          onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
          className="p-1.5 sm:p-2 text-slate-500 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-accent rounded-lg transition-colors cursor-pointer shrink-0"
          title={`Switch to ${resolvedMode === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {resolvedMode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 shrink-0" />
          )}
        </button>

        {/* Share Button (desktop only to prevent tablet/laptop header crowding) */}
        {onShare && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onShare}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold h-8 px-2.5 border-slate-200 dark:border-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-accent cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-muted-foreground shrink-0" />
            <span className="whitespace-nowrap">Share</span>
          </Button>
        )}

        {/* Unified Download & Print Split Button with Dropdown */}
        <div className="inline-flex relative items-center shrink-0" ref={exportMenuRef}>
          <div className="inline-flex items-center rounded-lg shadow-xs bg-emerald-700 hover:bg-emerald-800 transition-colors overflow-hidden shrink-0">
            {/* Primary Action: Download PDF */}
            <button
              type="button"
              onClick={() => {
                setExportMenuOpen(false);
                onDownloadPdf();
              }}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 text-white font-medium text-xs h-8 px-2.5 sm:px-3 transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
              title="Download PDF"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xl:inline whitespace-nowrap">Download PDF</span>
                  <span className="hidden sm:inline xl:hidden whitespace-nowrap">Download</span>
                </>
              )}
            </button>

            {/* Split Divider & Caret Button */}
            <button
              type="button"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              disabled={isDownloading}
              className="inline-flex items-center justify-center text-white h-8 px-2 border-l border-emerald-600 hover:bg-emerald-800 active:bg-emerald-900 transition-colors cursor-pointer shrink-0"
              title="More export options"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 shrink-0 ${exportMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Clean, Simple Dropdown Menu */}
          {exportMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-card rounded-lg shadow-lg border border-slate-200 dark:border-border py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => {
                  setExportMenuOpen(false);
                  onDownloadPdf();
                }}
                disabled={isDownloading}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-accent hover:text-primary text-left transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-400 dark:text-muted-foreground" />
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setExportMenuOpen(false);
                  onPrint();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-accent hover:text-primary text-left transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400 dark:text-muted-foreground" />
                <span>Print Resume</span>
              </button>
              {onDeleteResume && (
                <>
                  <div className="border-t border-slate-100 dark:border-border my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(false);
                      onDeleteResume();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Resume</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* User Account Menu */}
        <div className="border-l border-slate-200 dark:border-border pl-1.5 sm:pl-2 ml-0.5">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

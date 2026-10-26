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
import { matchJobDescriptionKeywords } from '@/lib/ats/keyword-matcher';
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

  const jdMatchRate = useMemo(() => {
    const jd = resume.targetJob?.jobDescription;
    if (!jd || jd.trim().length < 20) return null;
    return matchJobDescriptionKeywords(jd, resume).matchRate;
  }, [resume]);

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
    <header className="h-14 bg-white dark:bg-card border-b border-slate-200/90 dark:border-border px-3 sm:px-5 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* 1. Left: Back Button, Editable Title & Save Status */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={handleBack}
          className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg transition-colors shrink-0 cursor-pointer active:scale-95"
          title={editorMode && editorMode !== 'content' ? 'Back to Editor' : 'Back'}
          aria-label={editorMode && editorMode !== 'content' ? 'Back to Editor' : 'Back'}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={resume.title || 'Untitled resume'}
              onChange={(e) => onChange({ title: e.target.value })}
              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-foreground bg-transparent hover:bg-slate-100/70 dark:hover:bg-accent focus:bg-white dark:focus:bg-card px-1 py-0.5 rounded border border-transparent hover:border-slate-200 dark:border-border focus:border-primary focus:outline-none transition-all max-w-[110px] min-[400px]:max-w-[150px] sm:max-w-[240px] md:max-w-[320px] truncate"
              title="Click to rename resume"
            />
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </div>

          {/* Clean Status Indicator directly underneath */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-muted-foreground font-medium px-1">
            {cloudStatus === 'saving' ? (
              <>
                <Loader2 className="w-2.5 h-2.5 animate-spin text-primary" />
                <span>Saving...</span>
              </>
            ) : user ? (
              <>
                <Cloud className="w-2.5 h-2.5 text-primary" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <CloudOff className="w-2.5 h-2.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Saved locally
                </button>
              </>
            )}
          </div>
        </div>

        {/* Undo / Redo Buttons */}
        {onUndo && onRedo && (
          <div className="hidden sm:flex items-center gap-0.5 ml-1 border-l border-slate-200 dark:border-border pl-2">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
              aria-label="Redo"
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-accent rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 2. Center: Mode Switcher (Write vs Design vs Check) matching screenshot */}
      {onSwitchMode && (
        <div className="hidden md:flex items-center p-1 bg-slate-100/90 dark:bg-muted rounded-xl border border-slate-200/80 dark:border-border shadow-2xs gap-0.5">
          <button
            type="button"
            onClick={() => onSwitchMode('content')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              editorMode === 'content'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              editorMode === 'design'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('check')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              editorMode === 'check'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Check</span>
            {atsResult.suggestions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                {atsResult.suggestions.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('match')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              editorMode === 'match'
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-600 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>JD Match</span>
            {jdMatchRate !== null ? (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-bold',
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

      {/* 3. Right: Theme Toggle, ATS Quick Pill, Share Button, Download PDF & User Menu */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Dark/Light Theme Toggle */}
        <button
          type="button"
          onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}
          className="p-2 text-slate-500 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground hover:bg-slate-100 dark:hover:bg-accent rounded-lg transition-colors cursor-pointer"
          title={`Switch to ${resolvedMode === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {resolvedMode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Share Button (matches screenshot) */}
        {onShare && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onShare}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold h-8 px-3 border-slate-200 dark:border-border text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-accent cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-muted-foreground" />
            <span>Share</span>
          </Button>
        )}

        {/* Unified Download & Print Split Button with Dropdown (Desktop & Mobile) */}
        <div className="inline-flex relative items-center" ref={exportMenuRef}>
          <div className="inline-flex items-center rounded-lg shadow-xs bg-emerald-700 hover:bg-emerald-800 transition-colors overflow-hidden">
            {/* Primary Action: Download PDF */}
            <button
              type="button"
              onClick={() => {
                setExportMenuOpen(false);
                onDownloadPdf();
              }}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 text-white font-medium text-xs h-8 px-2.5 sm:px-3 transition-colors cursor-pointer disabled:opacity-50"
              title="Download PDF"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden min-[380px]:inline">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden min-[380px]:inline">Download PDF</span>
                </>
              )}
            </button>

            {/* Split Divider & Caret Button */}
            <button
              type="button"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              disabled={isDownloading}
              className="inline-flex items-center justify-center text-white h-8 px-2 border-l border-emerald-600 hover:bg-emerald-800 active:bg-emerald-900 transition-colors cursor-pointer"
              title="More export options"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${exportMenuOpen ? 'rotate-180' : ''}`} />
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

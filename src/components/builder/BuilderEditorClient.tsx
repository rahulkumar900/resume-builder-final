'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BuilderNavbar } from '@/components/builder/BuilderNavbar';
import { BuilderForm } from '@/components/builder/BuilderForm';
import { A4PreviewCanvas } from '@/components/builder/A4PreviewCanvas';
import { ScoreResumeModal } from '@/components/dashboard/ScoreResumeModal';
import { JobTailorModal } from '@/components/builder/JobTailorModal';
import { BuilderSkeleton } from '@/components/builder/BuilderSkeleton';
import {
  getResumeById,
  getResumeByIdAsync,
  getResumeFromDatabase,
  saveResume,
  getStoredResumes,
  deleteResume,
  deleteResumeFromDatabase,
} from '@/lib/storage';
import { TEMPLATES } from '@/lib/templates';
import { ResumeData } from '@/types/resume';
import { useAuth } from '@/context/AuthContext';
import { useAutoSaveResume } from '@/hooks/useAutoSaveResume';
import { useResumePdfExport } from '@/hooks/useResumePdfExport';
import { Edit3, Eye, Palette, CheckSquare, FileText, Trash2, Loader2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DesignStudioPanel } from '@/components/builder/DesignStudioPanel';
import { CheckAuditPanel } from '@/components/builder/CheckAuditPanel';
import { JdMatchPanel } from '@/components/builder/JdMatchPanel';
import { GrammarAssistantModal } from '@/components/builder/GrammarAssistantModal';
import { ShareResumeModal } from '@/components/builder/ShareResumeModal';
import { CriticalIssuesWarningModal } from '@/components/builder/CriticalIssuesWarningModal';
import { AtsSuggestion } from '@/lib/ats/ats-analyzer';
import { cn } from '@/lib/utils';

interface BuilderEditorClientProps {
  id: string;
}

export const BuilderEditorClient: React.FC<BuilderEditorClientProps> = ({ id }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, openAuthModal, isLoading: authLoading } = useAuth();

  const [isResolvingResume, setIsResolvingResume] = useState<boolean>(true);
  const [notFoundError, setNotFoundError] = useState<boolean>(false);

  const [criticalWarningModalState, setCriticalWarningModalState] = useState<{
    isOpen: boolean;
    criticalIssues: AtsSuggestion[];
    proceedDownload?: () => Promise<void>;
  }>({
    isOpen: false,
    criticalIssues: [],
  });

  const {
    resume,
    setResume,
    handleChange,
    cloudStatus,
    flushSave,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useAutoSaveResume(null, 400, user?.id);

  const handleCriticalIssuesDetected = (
    criticalIssues: AtsSuggestion[],
    proceedDownload: () => Promise<void>
  ) => {
    setCriticalWarningModalState({
      isOpen: true,
      criticalIssues,
      proceedDownload,
    });
  };

  const { isDownloading, handleDownloadPdf, handlePrint } = useResumePdfExport({
    resume,
    user,
    openAuthModal,
    flushSave,
    onCriticalIssuesDetected: handleCriticalIssuesDetected,
  });

  const [allResumes, setAllResumes] = useState<ResumeData[]>([]);
  const [scale, setScale] = useState<number>(0.75);
  const tabParam = searchParams.get('tab') || searchParams.get('view');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>(
    tabParam === 'preview' ? 'preview' : 'edit'
  );
  const [editorMode, setEditorMode] = useState<'content' | 'design' | 'check' | 'match'>('content');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isGrammarModalOpen, setIsGrammarModalOpen] = useState(false);
  const [isJobTailorModalOpen, setIsJobTailorModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileDesignSheetOpen, setIsMobileDesignSheetOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteResume = async () => {
    if (!resume) return;
    setIsDeleting(true);
    try {
      if (user?.id) {
        await deleteResumeFromDatabase(resume.id);
      } else {
        deleteResume(resume.id);
      }
      setIsDeleteModalOpen(false);
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to delete resume:', err);
      setIsDeleting(false);
    }
  };

  const handleSwitchMode = (mode: 'content' | 'design' | 'check' | 'match') => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && mode === 'design') {
      setActiveTab('preview');
      setIsMobileDesignSheetOpen(true);
      return;
    }
    setIsMobileDesignSheetOpen(false);
    setEditorMode(mode);
    setActiveTab('edit');
  };

  const handleMobileDesignClick = () => {
    setActiveTab('preview');
    setIsMobileDesignSheetOpen((prev) => !prev);
  };

  useEffect(() => {
    if (authLoading) return;

    const decodedId = decodeURIComponent(id);

    if (user?.id) {
      // Authenticated: Fetch directly from Supabase PostgreSQL database
      setIsResolvingResume(true);
      getResumeFromDatabase(decodedId)
        .then((dbResume) => {
          if (dbResume) {
            setResume(dbResume);
            setIsResolvingResume(false);
            setNotFoundError(false);
          } else {
            // Check fallback for newly cloned local drafts or alternate id format
            const local = getResumeById(decodedId) || getResumeById(id);
            if (local) {
              setResume(local);
              setIsResolvingResume(false);
              setNotFoundError(false);
            } else {
              setIsResolvingResume(false);
              setNotFoundError(true);
            }
          }
        })
        .catch(() => {
          setIsResolvingResume(false);
          setNotFoundError(true);
        });
    } else {
      // Guest: Fetch from browser local storage
      const local = getResumeById(decodedId) || getResumeById(id);
      if (local) {
        setResume(local);
        setIsResolvingResume(false);
        setNotFoundError(false);
      } else {
        setIsResolvingResume(false);
        setNotFoundError(true);
      }
    }
  }, [id, user?.id, authLoading, router, setResume]);

  // If user navigated with a pending JD from landing page demo, auto-open JobTailorModal
  useEffect(() => {
    if (resume && typeof window !== 'undefined') {
      const pendingJd = sessionStorage.getItem('kindley_pending_jd');
      if (pendingJd && pendingJd.trim().length > 0) {
        setIsJobTailorModalOpen(true);
      }
    }
  }, [resume?.id]);

  // Calculate scale to fit cleanly within preview viewport without awkward overflow
  const calculateFitScale = () => {
    if (typeof window === 'undefined') return 0.75;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      // On mobile viewports, fit to screen width with clean margins so resume text is readable
      const availableWidth = window.innerWidth - 16;
      const fitMobileScale = availableWidth / 794; // 210mm is 794px at 96 DPI
      return Math.max(0.40, Math.min(1.0, parseFloat(fitMobileScale.toFixed(2))));
    }

    // Available height: viewport height (100vh) - navbar (64px) - indicator badge & padding (~110px)
    const availableHeight = window.innerHeight - 64 - 110;
    const fitScaleHeight = availableHeight / 1123; // Single A4 page height at 96 DPI is 1123px (297mm)

    // Check available width in split layout (approx 62% width for right column on desktop)
    const availableWidth = (window.innerWidth * 0.62) - 48;
    const fitScaleWidth = availableWidth / 794;

    const computed = Math.min(fitScaleHeight, fitScaleWidth);
    return Math.max(0.35, Math.min(1.2, parseFloat(computed.toFixed(2))));
  };

  // Handle responsive scale on mount and resize
  useEffect(() => {
    const updateScale = () => {
      setScale(calculateFitScale());
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (!resume) {
    return <BuilderSkeleton />;
  }

  const handleTabSwitch = (tab: 'edit' | 'preview') => {
    setActiveTab(tab);
    if (tab === 'preview' && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setScale(calculateFitScale());
    }
  };

  const handleApplyTailoredResume = (tailoredResume: ResumeData, isNewClone: boolean) => {
    if (isNewClone) {
      saveResume(tailoredResume);
      setAllResumes(getStoredResumes());
      router.push(`/builder/${tailoredResume.id}`);
    } else {
      handleChange(tailoredResume);
    }
  };

  if (notFoundError && !resume) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white dark:bg-card p-8 rounded-3xl border border-slate-200 dark:border-border shadow-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-foreground">Resume Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-muted-foreground leading-relaxed">
            The resume you are trying to open could not be loaded from your local storage or cloud database.
            Please ensure you are signed in to the account that owns this resume.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard')}>
              Go to Dashboard
            </Button>
            {!user && (
              <Button size="sm" onClick={() => openAuthModal('signin')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isResolvingResume && !resume) {
    return <BuilderSkeleton />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 dark:bg-slate-950 flex flex-col font-sans">
      {/* Top Builder Navigation */}
      <BuilderNavbar
        resume={resume}
        onChange={handleChange}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onScore={() => setEditorMode((prev) => (prev === 'check' ? 'content' : 'check'))}
        onOpenGrammar={() => setIsGrammarModalOpen(true)}
        onTailorForJob={() => setIsJobTailorModalOpen(true)}
        isDownloading={isDownloading}
        cloudStatus={cloudStatus}
        editorMode={isMobileDesignSheetOpen ? 'design' : editorMode}
        onSwitchMode={handleSwitchMode}
        onShare={() => setIsShareModalOpen(true)}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        onDeleteResume={() => setIsDeleteModalOpen(true)}
      />

      {/* Mobile & Tablet Segmented Tab Switcher (Write / Design / Check / Preview) */}
      <div className="lg:hidden flex items-center justify-between px-2.5 py-1.5 bg-white dark:bg-card border-b border-slate-200 dark:border-border shrink-0 z-30">
        <div className="flex bg-slate-100 dark:bg-muted p-0.5 rounded-xl text-xs font-semibold w-full gap-0.5">
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              setEditorMode('content');
              setActiveTab('edit');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer min-h-[34px] active:scale-[0.98] ${
              activeTab === 'edit' && editorMode === 'content' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
            title="Edit Content"
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Write</span>
          </button>
          <button
            type="button"
            onClick={handleMobileDesignClick}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer min-h-[34px] active:scale-[0.98] ${
              isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
            title="Design & Style"
          >
            <Palette className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Design</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              setEditorMode('check');
              setActiveTab('edit');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer min-h-[34px] active:scale-[0.98] ${
              activeTab === 'edit' && editorMode === 'check' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
            title="ATS & Grammar Check"
          >
            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Check</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              setEditorMode('match');
              setActiveTab('edit');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer min-h-[34px] active:scale-[0.98] ${
              activeTab === 'edit' && editorMode === 'match' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
            title="Target JD Match Rate"
          >
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">JD Match</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              handleTabSwitch('preview');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer min-h-[34px] active:scale-[0.98] ${
              activeTab === 'preview' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
            title="A4 Preview"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Preview</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Left Column: Editor Form OR Docked Design Studio OR Docked Check Audit OR Docked JD Match */}
        <div
          className={`w-full lg:w-[480px] xl:w-[520px] 2xl:w-[560px] lg:shrink-0 h-full flex-1 lg:flex-initial flex flex-col lg:border-r border-slate-200 dark:border-border bg-background overflow-hidden min-h-0 ${
            activeTab === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {editorMode === 'content' ? (
            <BuilderForm
              resume={resume}
              onChange={handleChange}
              onDownloadPdf={handleDownloadPdf}
              onPrint={handlePrint}
              onScore={() => setEditorMode('check')}
              onOpenDesignStudio={() => handleSwitchMode('design')}
              onOpenJobTailor={() => setIsJobTailorModalOpen(true)}
              onOpenGrammar={() => setIsGrammarModalOpen(true)}
              isDownloading={isDownloading}
            />
          ) : editorMode === 'design' ? (
            <DesignStudioPanel
              resume={resume}
              onChange={handleChange}
              onClose={() => setEditorMode('content')}
            />
          ) : editorMode === 'check' ? (
            <CheckAuditPanel
              resume={resume}
              onChange={handleChange}
              onClose={() => setEditorMode('content')}
              onNavigateSection={(sec) => {
                setEditorMode('content');
                router.push(`/builder/${id}?step=${sec}`);
              }}
            />
          ) : (
            <JdMatchPanel
              resume={resume}
              onChange={handleChange}
              onOpenTailorStudio={() => setIsJobTailorModalOpen(true)}
              onNavigateSection={(sec) => {
                setEditorMode('content');
                router.push(`/builder/${id}?step=${sec}`);
              }}
              onClose={() => setEditorMode('content')}
            />
          )}
        </div>

        {/* Right Column: Live A4 Preview Canvas & Controls */}
        <div
          className={`flex-1 bg-slate-100/90 dark:bg-muted/30 flex flex-col h-full overflow-hidden ${
            activeTab === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Scrollable Canvas Viewport */}
          <div
            className={`flex-1 w-full h-full overflow-hidden flex items-stretch transition-all duration-200 ${
              isMobileDesignSheetOpen ? 'pb-[220px]' : ''
            }`}
          >
            {resume && (
              <A4PreviewCanvas
                resume={resume}
                scale={scale}
                setScale={setScale}
                onFitToScreen={() => setScale(calculateFitScale())}
                onFormatChange={(fmt) => {
                  handleChange({
                    layout: {
                      ...(resume.layout || {}),
                      format: fmt,
                    },
                  });
                }}
                isMobileCustomizing={isMobileDesignSheetOpen}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Customization Bottom Sheet (Keeps live A4 preview visible on top while tweaking) */}
      {isMobileDesignSheetOpen && resume && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[215px] max-h-[38vh] flex flex-col bg-white dark:bg-[#161614] rounded-t-2xl sm:rounded-t-3xl shadow-[0_-12px_35px_rgba(0,0,0,0.28)] border-t border-slate-200/90 dark:border-white/[0.1] overflow-hidden animate-in slide-in-from-bottom duration-200 pb-[env(safe-area-inset-bottom,0px)]">
          {/* Top Sheet Drag/Indicator Handle */}
          <div
            className="w-full flex items-center justify-center pt-2 pb-1 bg-white dark:bg-[#161614] shrink-0 cursor-pointer"
            onClick={() => setIsMobileDesignSheetOpen(false)}
            title="Click to collapse"
          >
            <div className="w-10 h-1 bg-slate-300 dark:bg-white/20 rounded-full" />
          </div>

          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <DesignStudioPanel
              resume={resume}
              onChange={handleChange}
              onClose={() => setIsMobileDesignSheetOpen(false)}
              isMinimal={true}
            />
          </div>
        </div>
      )}

      {/* Score Modal */}
      <ScoreResumeModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        resumes={resume ? [resume, ...allResumes.filter((r) => r.id !== resume.id)] : allResumes}
        onNavigateSection={(sec) => {
          setActiveTab('edit');
          router.push(`/builder/${id}?step=${sec}`);
        }}
        onAddSkill={(skillName) => {
          if (!resume) return;
          const currentSkills = resume.skills || [];
          let updatedSkills;
          if (currentSkills.length === 0) {
            updatedSkills = [{ id: `sk-${Date.now()}`, category: 'Key Competencies', items: [skillName] }];
          } else {
            updatedSkills = currentSkills.map((cat, idx) => {
              if (idx === 0) {
                const items = cat.items || [];
                if (!items.some((i) => i.toLowerCase() === skillName.toLowerCase())) {
                  return { ...cat, items: [...items, skillName] };
                }
              }
              return cat;
            });
          }
          handleChange({ skills: updatedSkills });
        }}
      />



      {/* Flagship Job-Specific Resume Tailor Modal */}
      {resume && (
        <JobTailorModal
          isOpen={isJobTailorModalOpen}
          onClose={() => setIsJobTailorModalOpen(false)}
          resume={resume}
          onApplyTailoredResume={handleApplyTailoredResume}
        />
      )}

      {/* Global Grammar & Spellcheck Assistant Modal */}
      {resume && (
        <GrammarAssistantModal
          isOpen={isGrammarModalOpen}
          onClose={() => setIsGrammarModalOpen(false)}
          resume={resume}
          onChange={handleChange}
        />
      )}

      {/* Share Resume Modal */}
      {resume && (
        <ShareResumeModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          resume={resume}
          onDownloadPdf={handleDownloadPdf}
          onPrint={handlePrint}
        />
      )}

      {/* Critical Issues Warning Modal */}
      {resume && (
        <CriticalIssuesWarningModal
          isOpen={criticalWarningModalState.isOpen}
          onClose={() => setCriticalWarningModalState((prev) => ({ ...prev, isOpen: false }))}
          criticalIssues={criticalWarningModalState.criticalIssues}
          onReviewAndFix={() => {
            setCriticalWarningModalState((prev) => ({ ...prev, isOpen: false }));
            handleSwitchMode('check');
          }}
          onDownloadAnyway={async () => {
            const proceed = criticalWarningModalState.proceedDownload;
            setCriticalWarningModalState((prev) => ({ ...prev, isOpen: false }));
            if (proceed) {
              await proceed();
            }
          }}
          isDownloading={isDownloading}
          resumeTitle={resume.personalInfo?.fullName || resume.title}
        />
      )}

      {/* Delete Resume Confirmation Modal */}
      {isDeleteModalOpen && resume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#161614] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/[0.08] p-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-xs">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Delete Resume?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-slate-700 dark:text-slate-200 font-semibold">&ldquo;{resume.title || 'Untitled Resume'}&rdquo;</strong>? You will be redirected to your dashboard.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteResume}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-60"
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{isDeleting ? 'Deleting...' : 'Delete Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

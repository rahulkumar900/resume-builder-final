'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BuilderNavbar } from '@/components/builder/BuilderNavbar';
import { BuilderForm } from '@/components/builder/BuilderForm';
import { A4PreviewCanvas } from '@/components/builder/A4PreviewCanvas';
import { ScoreResumeModal } from '@/components/dashboard/ScoreResumeModal';
import { JobTailorModal } from '@/components/builder/JobTailorModal';
import { BuilderSkeleton } from '@/components/builder/BuilderSkeleton';
import { getResumeById, getResumeByIdAsync, saveResume, getStoredResumes } from '@/lib/storage';
import { TEMPLATES } from '@/lib/templates';
import { ResumeData } from '@/types/resume';
import { useAuth } from '@/context/AuthContext';
import { useAutoSaveResume } from '@/hooks/useAutoSaveResume';
import { useResumePdfExport } from '@/hooks/useResumePdfExport';
import { Edit3, Eye, Palette, CheckSquare } from 'lucide-react';
import { DesignStudioPanel } from '@/components/builder/DesignStudioPanel';
import { CheckAuditPanel } from '@/components/builder/CheckAuditPanel';
import { GrammarAssistantModal } from '@/components/builder/GrammarAssistantModal';
import { ShareResumeModal } from '@/components/builder/ShareResumeModal';
import { cn } from '@/lib/utils';

interface BuilderEditorClientProps {
  id: string;
}

export const BuilderEditorClient: React.FC<BuilderEditorClientProps> = ({ id }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, openAuthModal } = useAuth();

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
  } = useAutoSaveResume(null);
  const { isDownloading, handleDownloadPdf, handlePrint } = useResumePdfExport({
    resume,
    user,
    openAuthModal,
    flushSave,
  });

  const [allResumes, setAllResumes] = useState<ResumeData[]>([]);
  const [scale, setScale] = useState<number>(0.75);
  const tabParam = searchParams.get('tab') || searchParams.get('view');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>(
    tabParam === 'preview' ? 'preview' : 'edit'
  );
  const [editorMode, setEditorMode] = useState<'content' | 'design' | 'check'>('content');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isGrammarModalOpen, setIsGrammarModalOpen] = useState(false);
  const [isJobTailorModalOpen, setIsJobTailorModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isMobileDesignSheetOpen, setIsMobileDesignSheetOpen] = useState(false);

  const handleSwitchMode = (mode: 'content' | 'design' | 'check') => {
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
    const decodedId = decodeURIComponent(id);
    const data = getResumeById(decodedId) || getResumeById(id);
    if (data) {
      setResume(data);
    } else {
      // Check asynchronously from IndexedDB or Supabase Cloud
      getResumeByIdAsync(decodedId).then((asyncData) => {
        if (asyncData) {
          setResume(asyncData);
        } else {
          // Fallback: check all stored resumes in case of minor ID format differences
          const all = getStoredResumes();
          const fallback = all.find((r) => r.id === decodedId || r.id === id);
          if (fallback) {
            setResume(fallback);
          } else {
            // If still not found, return to dashboard
            router.push('/dashboard');
          }
        }
      });
    }
    setAllResumes(getStoredResumes());
  }, [id, router, setResume]);

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
      />

      {/* Mobile Segmented Tab Switcher (Write / Design / Check / Preview) */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 bg-white dark:bg-card border-b border-slate-200 dark:border-border">
        <div className="flex bg-slate-100 dark:bg-muted p-1 rounded-xl text-xs font-semibold w-full gap-1">
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              setEditorMode('content');
              setActiveTab('edit');
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'edit' && editorMode === 'content' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={handleMobileDesignClick}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              setEditorMode('check');
              setActiveTab('edit');
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'edit' && editorMode === 'check' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Check</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsMobileDesignSheetOpen(false);
              handleTabSwitch('preview');
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'preview' && !isMobileDesignSheetOpen
                ? 'bg-white dark:bg-card text-foreground shadow-xs font-bold'
                : 'text-slate-500 dark:text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Editor Form OR Docked Design Studio OR Docked Check Audit */}
        <div
          className={`w-full lg:w-[480px] xl:w-[520px] 2xl:w-[560px] lg:shrink-0 overflow-y-auto lg:border-r border-slate-200 dark:border-border bg-background ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
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
          ) : (
            <CheckAuditPanel
              resume={resume}
              onChange={handleChange}
              onClose={() => setEditorMode('content')}
              onNavigateSection={(sec) => {
                setEditorMode('content');
                router.push(`/builder/${id}?step=${sec}`);
              }}
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
              isMobileDesignSheetOpen ? 'pb-[200px]' : ''
            }`}
          >
            {resume && (
              <A4PreviewCanvas
                resume={resume}
                scale={scale}
                setScale={setScale}
                onFitToScreen={() => setScale(calculateFitScale())}
                isMobileCustomizing={isMobileDesignSheetOpen}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Customization Bottom Sheet (Keeps live A4 preview visible on top while tweaking) */}
      {isMobileDesignSheetOpen && resume && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-[195px] max-h-[210px] flex flex-col bg-white dark:bg-[#161614] rounded-t-3xl shadow-[0_-12px_35px_rgba(0,0,0,0.28)] border-t border-slate-200/90 dark:border-white/[0.1] overflow-hidden animate-in slide-in-from-bottom duration-200">
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
    </div>
  );
};

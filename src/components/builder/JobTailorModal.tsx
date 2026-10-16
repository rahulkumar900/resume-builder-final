'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ResumeData, SkillCategory, ExperienceItem } from '@/types/resume';
import {
  SAMPLE_PRESET_JDS,
  JobAnalysisResult,
  analyzeJobForTailoring,
  calculateDynamicMatchScore,
} from '@/lib/ai/job-tailor';
import {
  X,
  Sparkles,
  Target,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Check,
  Plus,
  RefreshCw,
  Copy,
  Layers,
  ChevronRight,
  AlertCircle,
  Edit3,
  Clipboard,
  FileText,
  CheckCircle,
  Briefcase,
  Sliders,
  CheckSquare,
  Square,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';

interface JobTailorModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
  onApplyTailoredResume: (updatedResume: ResumeData, isNewClone: boolean) => void;
}

type TailorStep = 'input' | 'processing' | 'studio';
type StudioTab = 'summary' | 'skills' | 'bullets' | 'match';

export const JobTailorModal: React.FC<JobTailorModalProps> = ({
  isOpen,
  onClose,
  resume,
  onApplyTailoredResume,
}) => {
  const [step, setStep] = useState<TailorStep>('input');
  const [processingStage, setProcessingStage] = useState<number>(1);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);

  // Active review studio tab
  const [activeTab, setActiveTab] = useState<StudioTab>('summary');

  // User modifications & in-place editing states
  const [targetRole, setTargetRole] = useState<string>('');
  const [approveSummary, setApproveSummary] = useState<boolean>(true);
  const [editedSummary, setEditedSummary] = useState<string>('');
  const [isEditingSummary, setIsEditingSummary] = useState<boolean>(false);

  const [approvedSkills, setApprovedSkills] = useState<Record<string, boolean>>({});
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  const [approvedBullets, setApprovedBullets] = useState<Record<string, boolean>>({});
  const [editedBullets, setEditedBullets] = useState<Record<string, string>>({});
  const [editingBulletId, setEditingBulletId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for pending JD stored from other pages (e.g. landing page demo)
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const pendingJd = sessionStorage.getItem('kindley_pending_jd');
      if (pendingJd && pendingJd.trim().length > 0) {
        setJobDescription(pendingJd);
        setSelectedPresetId('custom');
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('kindley_pending_jd');
    }
    onClose();
  };

  // Quick preset loader
  const handleSelectPreset = (preset: typeof SAMPLE_PRESET_JDS[0]) => {
    setSelectedPresetId(preset.id);
    setJobDescription(preset.text);
  };

  // Clipboard paste handler
  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim().length > 0) {
          setJobDescription(text);
          setSelectedPresetId('');
        }
      }
    } catch {
      // Fallback: focus textarea for user manual paste
      textareaRef.current?.focus();
    }
  };

  // Single-action: Analyze & Tailor Resume in one smooth animated flow
  const handleStartTailoring = async () => {
    const jdTrimmed = jobDescription.trim();
    if (!jdTrimmed) return;

    setStep('processing');
    setProcessingStage(1);

    // Initial heuristic baseline
    const baseline = analyzeJobForTailoring(jdTrimmed, resume);

    // Progressive stage animation
    const timer1 = setTimeout(() => setProcessingStage(2), 500);
    const timer2 = setTimeout(() => setProcessingStage(3), 1100);

    let finalResult = baseline;

    try {
      // Call AI endpoint to enrich with Google Gemini if configured
      const response = await fetch('/api/ai/job-tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: jdTrimmed,
          resume,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          finalResult = data.result;
        }
      }
    } catch (err) {
      console.warn('Fallback to baseline heuristic tailoring:', err);
    }

    // Ensure stage animation finishes smoothly before transitioning to studio
    setTimeout(() => {
      clearTimeout(timer1);
      clearTimeout(timer2);

      setAnalysisResult(finalResult);
      setTargetRole(finalResult.targetRole);

      // Initialize summary
      setApproveSummary(true);
      setEditedSummary(finalResult.suggestedSummary.suggested);
      setIsEditingSummary(false);

      // Initialize skills
      const skillsMap: Record<string, boolean> = {};
      finalResult.missingSkillsToAdd.forEach((s) => {
        skillsMap[s.name] = true;
      });
      setApprovedSkills(skillsMap);
      setCustomSkills([]);

      // Initialize bullets
      const bulletsMap: Record<string, boolean> = {};
      const bulletsTextMap: Record<string, string> = {};
      finalResult.bulletProposals.forEach((b) => {
        bulletsMap[b.id] = true;
        bulletsTextMap[b.id] = b.suggestedBullet;
      });
      setApprovedBullets(bulletsMap);
      setEditedBullets(bulletsTextMap);
      setEditingBulletId(null);

      setStep('studio');
      setActiveTab('summary');
    }, 1400);
  };

  // Add custom skill item
  const handleAddCustomSkill = () => {
    const trimmed = newSkillInput.trim();
    if (!trimmed) return;
    if (!customSkills.includes(trimmed)) {
      setCustomSkills((prev) => [...prev, trimmed]);
      setApprovedSkills((prev) => ({ ...prev, [trimmed]: true }));
    }
    setNewSkillInput('');
  };

  // Dynamic Reactive ATS Match Score
  const totalMissing = (analysisResult?.missingSkillsToAdd.length || 0) + customSkills.length;
  const approvedSkillsCount = Object.entries(approvedSkills).filter(([_, v]) => v).length;
  const totalBullets = analysisResult?.bulletProposals.length || 0;
  const approvedBulletsCount = Object.entries(approvedBullets).filter(([_, v]) => v).length;

  const liveTailoredScore = useMemo(() => {
    if (!analysisResult) return 0;
    return calculateDynamicMatchScore(
      analysisResult.currentMatchScore,
      totalMissing,
      approvedSkillsCount,
      approveSummary,
      totalBullets,
      approvedBulletsCount
    );
  }, [
    analysisResult,
    totalMissing,
    approvedSkillsCount,
    approveSummary,
    totalBullets,
    approvedBulletsCount,
  ]);

  // Final approval & application
  const handleApproveAndGenerate = (isNewClone: boolean) => {
    if (!analysisResult) return;

    // Deep clone current resume
    const tailored: ResumeData = JSON.parse(JSON.stringify(resume));

    if (isNewClone) {
      tailored.id = `resume-${Date.now()}`;
      tailored.title = `${resume.title || 'My Resume'} - ${targetRole || analysisResult.targetRole} (Tailored)`;
    }

    // 1. Update target role & summary if approved
    if (approveSummary) {
      tailored.personalInfo = {
        ...tailored.personalInfo,
        jobTitle: targetRole || analysisResult.targetRole,
        summary: editedSummary.trim() || analysisResult.suggestedSummary.suggested,
      };
    }

    // 2. Add approved skills (including custom additions)
    const skillsToAdd: string[] = [];
    analysisResult.missingSkillsToAdd.forEach((s) => {
      if (approvedSkills[s.name]) {
        skillsToAdd.push(s.name);
      }
    });
    customSkills.forEach((cs) => {
      if (approvedSkills[cs]) {
        skillsToAdd.push(cs);
      }
    });

    if (skillsToAdd.length > 0) {
      const currentSkills = tailored.skills || [];
      if (currentSkills.length > 0) {
        const updatedSkills = [...currentSkills];
        skillsToAdd.forEach((skill) => {
          if (!updatedSkills[0].items.some((item) => item.toLowerCase() === skill.toLowerCase())) {
            updatedSkills[0].items.push(skill);
          }
        });
        tailored.skills = updatedSkills;
      } else {
        tailored.skills = [
          {
            id: `sk-tailored-${Date.now()}`,
            category: 'Core Competencies',
            items: skillsToAdd,
          },
        ];
      }
    }

    // 3. Update approved experience / internship / project bullets
    const approvedProposals = analysisResult.bulletProposals.filter((b) => approvedBullets[b.id]);
    if (approvedProposals.length > 0) {
      const primarySection = approvedProposals[0].sourceSection || 'experience';

      if (primarySection === 'experience' && tailored.experience && tailored.experience.length > 0) {
        const firstExp = tailored.experience[0];
        const newHighlights = [...(firstExp.highlights || [])];
        approvedProposals.forEach((prop, idx) => {
          const bulletContent = (editedBullets[prop.id] || prop.suggestedBullet).trim();
          if (idx < newHighlights.length) {
            newHighlights[idx] = bulletContent;
          } else {
            newHighlights.push(bulletContent);
          }
        });
        firstExp.highlights = newHighlights;
      } else if (primarySection === 'internships' && tailored.internships && tailored.internships.length > 0) {
        const firstIntern = tailored.internships[0];
        const newHighlights = [...(firstIntern.highlights || [])];
        approvedProposals.forEach((prop, idx) => {
          const bulletContent = (editedBullets[prop.id] || prop.suggestedBullet).trim();
          if (idx < newHighlights.length) {
            newHighlights[idx] = bulletContent;
          } else {
            newHighlights.push(bulletContent);
          }
        });
        firstIntern.highlights = newHighlights;
      } else if (primarySection === 'projects' && tailored.projects && tailored.projects.length > 0) {
        const firstProj = tailored.projects[0];
        const newHighlights = [...(firstProj.highlights || [])];
        approvedProposals.forEach((prop, idx) => {
          const bulletContent = (editedBullets[prop.id] || prop.suggestedBullet).trim();
          if (idx < newHighlights.length) {
            newHighlights[idx] = bulletContent;
          } else {
            newHighlights.push(bulletContent);
          }
        });
        firstProj.highlights = newHighlights;
      }
    }

    // Confetti celebration
    fireConfetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.6 },
    });

    onApplyTailoredResume(tailored, isNewClone);
    handleClose();
  };

  const charCount = jobDescription.length;
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-card rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-border overflow-hidden flex flex-col max-h-[92vh] text-slate-800 dark:text-foreground font-sans">
        
        {/* Modern Unified Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-border flex items-center justify-between bg-gradient-to-r from-blue-50/80 dark:from-muted/40 via-indigo-50/50 dark:via-card to-white dark:to-card shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-foreground leading-tight">
                  Job-Specific Resume Generator
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  ATS Match AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">
                Targeted keyword alignment, skill bridging, and Google X-Y-Z accomplishments
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-muted rounded-xl transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 1: SMART INPUT */}
        {/* ========================================================================= */}
        {step === 'input' && (
          <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {/* Quick Preset Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Try Sample Job Descriptions</span>
                </label>
                {selectedPresetId && (
                  <button
                    onClick={() => {
                      setSelectedPresetId('');
                      setJobDescription('');
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  >
                    Clear text
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PRESET_JDS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      selectedPresetId === preset.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Job Description Input Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Job Description
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Paste Clipboard</span>
                  </button>
                  <span
                    className={`text-[11px] font-mono font-medium ${
                      charCount > 300 ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {charCount > 0 ? `${wordCount} words • ${charCount} chars` : 'Paste JD requirements'}
                  </span>
                </div>
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setSelectedPresetId('');
                  }}
                  rows={8}
                  placeholder="Paste the target job description (responsibilities, required qualifications, and tech stack) from LinkedIn, Indeed, or career portal..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-border bg-slate-50/50 dark:bg-card/60 text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus:bg-white dark:focus:bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono leading-relaxed resize-none shadow-2xs"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-muted-foreground pt-1">
                <span>
                  Tip: Include the &quot;Requirements&quot; &amp; &quot;Responsibilities&quot; sections for deepest keyword matching.
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-border">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-muted rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartTailoring}
                disabled={!jobDescription.trim()}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Analyze &amp; Tailor Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: ANIMATED PROGRESS TRANSITION */}
        {/* ========================================================================= */}
        {step === 'processing' && (
          <div className="p-12 sm:p-16 flex flex-col items-center justify-center space-y-6 text-center flex-1">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center animate-pulse">
                <Sparkles className="w-9 h-9 text-emerald-700 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-black text-slate-900">
                Tailoring Your Resume for Target Role
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our ATS optimization engine is cross-referencing required competencies and crafting Google X-Y-Z accomplishment statements.
              </p>
            </div>

            {/* 3-Stage Progress Checklist */}
            <div className="w-full max-w-sm bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-3 text-xs">
                {processingStage >= 1 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 animate-spin shrink-0" />
                )}
                <span className={processingStage >= 1 ? 'font-bold text-slate-800' : 'text-slate-500'}>
                  1. Extracting role, seniority &amp; recruiter keywords...
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                {processingStage >= 2 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 animate-spin shrink-0" />
                )}
                <span className={processingStage >= 2 ? 'font-bold text-slate-800' : 'text-slate-500'}>
                  2. Identifying ATS compatibility &amp; missing skills...
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                {processingStage >= 3 ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 animate-spin shrink-0" />
                )}
                <span className={processingStage >= 3 ? 'font-bold text-slate-800' : 'text-slate-500'}>
                  3. Synthesizing Google X-Y-Z formula bullet proposals...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: INTERACTIVE TAILORING & APPROVAL STUDIO */}
        {/* ========================================================================= */}
        {step === 'studio' && analysisResult && (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            {/* Dynamic Hero ATS Match Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shrink-0 border-b border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-blue-900/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                      Target Role
                    </span>
                    <span className="text-xs text-slate-300">
                      Seniority: <strong className="text-white">{analysisResult.seniorityLevel}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="text-lg font-black text-white bg-white/10 hover:bg-white/20 focus:bg-white/20 px-2.5 py-0.5 rounded-lg border border-transparent focus:border-blue-400 focus:outline-none transition-all max-w-sm truncate"
                      title="Click to edit target role"
                    />
                    <Edit3 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </div>
                </div>

                {/* Live Reactive Match Meter */}
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Current</div>
                    <div className="text-xl font-black text-slate-300">
                      {analysisResult.currentMatchScore}%
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-emerald-400">Tailored</div>
                    <div className="text-2xl font-black text-emerald-400">
                      {liveTailoredScore}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 bg-slate-50 border-b border-slate-200 shrink-0 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('summary')}
                className={`pb-2.5 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'summary'
                    ? 'border-emerald-700 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Summary Tailoring</span>
                {approveSummary && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`pb-2.5 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'skills'
                    ? 'border-emerald-700 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>2. Skills &amp; Gaps ({approvedSkillsCount}/{totalMissing})</span>
              </button>

              <button
                onClick={() => setActiveTab('bullets')}
                className={`pb-2.5 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'bullets'
                    ? 'border-emerald-700 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>3. Accomplishments ({approvedBulletsCount}/{totalBullets})</span>
              </button>

              <button
                onClick={() => setActiveTab('match')}
                className={`pb-2.5 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'match'
                    ? 'border-emerald-700 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>4. ATS Breakdown</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/40">
              
              {/* TAB 1: SUMMARY TAILORING */}
              {activeTab === 'summary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="approve-summary-check"
                        checked={approveSummary}
                        onChange={(e) => setApproveSummary(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="approve-summary-check" className="text-xs font-bold text-slate-900 cursor-pointer">
                        Apply Targeted Executive Summary
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingSummary(!isEditingSummary)}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isEditingSummary ? 'Done Editing' : 'Edit Summary'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Original Summary */}
                    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Original Summary:
                      </span>
                      <p className="text-slate-600 font-mono text-[11px] leading-relaxed">
                        {analysisResult.suggestedSummary.original || '(No summary set currently)'}
                      </p>
                    </div>

                    {/* Tailored Summary Proposal */}
                    <div
                      className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        approveSummary
                          ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400/30 shadow-2xs'
                          : 'bg-white border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Tailored Summary (With ATS Keywords):
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                          Keywords Injected
                        </span>
                      </div>

                      {isEditingSummary ? (
                        <textarea
                          value={editedSummary}
                          onChange={(e) => setEditedSummary(e.target.value)}
                          rows={5}
                          className="w-full text-[11px] font-mono leading-relaxed p-2.5 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <p className="text-slate-900 font-mono text-[11px] leading-relaxed">
                          {editedSummary}
                        </p>
                      )}

                      <p className="text-[11px] text-slate-500 italic pt-1 border-t border-emerald-200/50">
                        &quot;{analysisResult.suggestedSummary.reason}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS & GAPS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {/* Missing Skills to Bridge */}
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-900">
                          Missing Skills Required by Job Description
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Select the skills you possess to bridge keyword gaps in ATS scans.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const all: Record<string, boolean> = {};
                            analysisResult.missingSkillsToAdd.forEach((s) => (all[s.name] = true));
                            customSkills.forEach((s) => (all[s] = true));
                            setApprovedSkills(all);
                          }}
                          className="text-[11px] text-emerald-700 hover:underline font-semibold cursor-pointer"
                        >
                          Select All
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => setApprovedSkills({})}
                          className="text-[11px] text-slate-500 hover:underline cursor-pointer"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {analysisResult.missingSkillsToAdd.map((skill) => {
                        const isChecked = !!approvedSkills[skill.name];
                        return (
                          <label
                            key={skill.name}
                            className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl border font-semibold cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                setApprovedSkills((prev) => ({
                                  ...prev,
                                  [skill.name]: e.target.checked,
                                }))
                              }
                              className="w-3.5 h-3.5 rounded text-emerald-700 focus:ring-emerald-500"
                            />
                            <span>{skill.name}</span>
                          </label>
                        );
                      })}

                      {customSkills.map((skill) => {
                        const isChecked = !!approvedSkills[skill];
                        return (
                          <label
                            key={skill}
                            className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl border font-semibold cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) =>
                                setApprovedSkills((prev) => ({
                                  ...prev,
                                  [skill]: e.target.checked,
                                }))
                              }
                              className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{skill} (Custom)</span>
                          </label>
                        );
                      })}
                    </div>

                    {/* Add Custom Skill Input */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomSkill();
                          }
                        }}
                        placeholder="Add another verified skill (e.g. Redux, GraphQL, Cypress)..."
                        className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSkill}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Already Matched Skills Checklist */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Already Matched in Your Resume ({analysisResult.requiredSkills.filter(s => s.matched).length})</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.requiredSkills
                        .filter((s) => s.matched)
                        .map((skill) => (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold"
                          >
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{skill.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ACCOMPLISHMENTS (GOOGLE X-Y-Z BULLETS) */}
              {activeTab === 'bullets' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Strengthened Accomplishment Bullets (Google X-Y-Z Formula)
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Accomplished [X] as measured by [Y], by doing [Z]. Begins with action verbs and quantifiable impact.
                      </p>
                    </div>

                    <div className="text-xs text-slate-500">
                      Target:{' '}
                      <strong className="text-slate-800">
                        {analysisResult.bulletProposals[0]?.role || targetRole}
                      </strong>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {analysisResult.bulletProposals.map((bullet, idx) => {
                      const isChecked = !!approvedBullets[bullet.id];
                      const isEditing = editingBulletId === bullet.id;
                      const currentText = editedBullets[bullet.id] || bullet.suggestedBullet;

                      return (
                        <div
                          key={bullet.id}
                          className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                            isChecked
                              ? 'bg-white border-emerald-300 shadow-2xs'
                              : 'bg-slate-50/70 border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`bullet-check-${bullet.id}`}
                                checked={isChecked}
                                onChange={(e) =>
                                  setApprovedBullets((prev) => ({
                                    ...prev,
                                    [bullet.id]: e.target.checked,
                                  }))
                                }
                                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`bullet-check-${bullet.id}`}
                                className="text-xs font-bold text-slate-900 cursor-pointer"
                              >
                                Proposal #{idx + 1}
                              </label>
                            </div>

                            <div className="flex items-center gap-2">
                              {bullet.keywordsInjected.map((kw) => (
                                <span
                                  key={kw}
                                  className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded"
                                >
                                  {kw}
                                </span>
                              ))}

                              <button
                                type="button"
                                onClick={() =>
                                  setEditingBulletId(isEditing ? null : bullet.id)
                                }
                                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer ml-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                <span>{isEditing ? 'Done' : 'Edit'}</span>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="p-2.5 bg-slate-50 rounded-xl text-slate-500 font-mono text-[11px]">
                              <span className="text-[10px] font-sans font-bold uppercase text-slate-400 block mb-0.5">
                                Original:
                              </span>
                              {bullet.originalBullet}
                            </div>

                            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-slate-900 font-mono text-[11px] leading-relaxed">
                              <span className="text-[10px] font-sans font-bold uppercase text-emerald-700 block mb-0.5">
                                Tailored Proposal:
                              </span>
                              {isEditing ? (
                                <textarea
                                  value={currentText}
                                  onChange={(e) =>
                                    setEditedBullets((prev) => ({
                                      ...prev,
                                      [bullet.id]: e.target.value,
                                    }))
                                  }
                                  rows={3}
                                  className="w-full p-2 bg-white rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-1"
                                />
                              ) : (
                                currentText
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ATS BREAKDOWN */}
              {activeTab === 'match' && (
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Potential Improvements Detected ({analysisResult.potentialImprovements.length})</span>
                    </label>
                    <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                      {analysisResult.potentialImprovements.map((imp) => (
                        <div key={imp.id} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black shrink-0 text-[11px]">
                            {imp.id}
                          </span>
                          <span className="leading-relaxed font-medium pt-0.5">{imp.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Final Action Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setStep('input')}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-muted-foreground hover:bg-slate-100 dark:hover:bg-muted rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
              >
                ← Edit Job Description
              </button>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleApproveAndGenerate(false)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-muted hover:bg-slate-200 dark:hover:bg-accent text-slate-800 dark:text-foreground font-bold text-xs rounded-xl transition-all cursor-pointer"
                  title="Overwrites currently active resume with approved enhancements"
                >
                  Update Current Resume
                </button>

                <button
                  type="button"
                  onClick={() => handleApproveAndGenerate(true)}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
                  title="Creates a new dedicated copy of your resume tailored for this job"
                >
                  <FileCheck className="w-4 h-4 text-emerald-200" />
                  <span>Save as New Tailored Resume</span>
                  <span className="hidden sm:inline bg-emerald-500/40 text-[10px] px-1.5 py-0.5 rounded text-blue-100 font-semibold uppercase">
                    Recommended
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

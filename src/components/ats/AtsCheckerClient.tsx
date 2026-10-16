'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ResumeData, SkillCategory, ExperienceItem } from '@/types/resume';
import {
  analyzeResumeAts,
  AtsAuditResult,
  AtsSuggestion,
} from '@/lib/ats/ats-analyzer';
import {
  matchJobDescriptionKeywords,
  KeywordMatchResult,
} from '@/lib/ats/keyword-matcher';
import { getStoredResumes, saveResume, createBlankResume } from '@/lib/storage';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Target,
  Copy,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  Award,
  FileCheck,
  RefreshCw,
  Sliders,
  Eye,
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  ExternalLink,
  AlertTriangle,
  Loader2,
  FileCode,
  CheckCircle,
  Clock,
  Briefcase,
  Zap,
  Edit3,
  Trash2,
  ArrowUpRight,
  RotateCcw,
  BookOpen,
  User,
  Wrench,
  BarChart3,
} from 'lucide-react';
import { fireConfetti } from '@/lib/confetti';
import { JobTitleAutocomplete } from '@/components/builder/JobTitleAutocomplete';

type InputMode = 'upload' | 'paste' | 'saved';
type ViewMode = 'report' | 'editor';
type EditorSection = 'contact' | 'summary' | 'experience' | 'skills' | 'job';
type FilterType = 'all' | 'critical' | 'recommended' | 'duplicates';
type ReportTab = 'overview' | 'suggestions' | 'jobMatch' | 'plainText';

export const AtsCheckerClient: React.FC = () => {
  const router = useRouter();

  // Active analyzed resume (null by default for external visitors)
  const [activeResume, setActiveResume] = useState<ResumeData | null>(null);

  // Editable copy for the in-page editor
  const [editForm, setEditForm] = useState<ResumeData | null>(null);

  // Stored resumes from browser (optional for returning users)
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);

  // Input states
  const [inputMode, setInputMode] = useState<InputMode>('upload');
  const [pastedText, setPastedText] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Target job description
  const [jobDescription, setJobDescription] = useState<string>('');

  // View modes
  const [viewMode, setViewMode] = useState<ViewMode>('report');
  const [editorSection, setEditorSection] = useState<EditorSection>('contact');
  const [reportTab, setReportTab] = useState<ReportTab>('overview');
  const [suggestionFilter, setSuggestionFilter] = useState<FilterType>('all');

  // Re-check & score delta tracking
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  const [scoreDelta, setScoreDelta] = useState<number | null>(null);
  const [scoreDeltaMessage, setScoreDeltaMessage] = useState<string | null>(null);
  const [isRechecking, setIsRechecking] = useState<boolean>(false);

  // Utilities
  const [copiedPlainText, setCopiedPlainText] = useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const reuploadInputRef = useRef<HTMLInputElement>(null);

  // Check for any pre-existing saved resumes in localStorage (without auto-selecting)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = getStoredResumes();
      setSavedResumes(stored);
    }
  }, []);

  // Synchronize editForm when activeResume is loaded
  useEffect(() => {
    if (activeResume) {
      setEditForm(JSON.parse(JSON.stringify(activeResume)));
    }
  }, [activeResume]);

  // Real-time ATS Audit Result
  const auditResult: AtsAuditResult | null = useMemo(() => {
    if (!activeResume) return null;
    return analyzeResumeAts(activeResume);
  }, [activeResume]);

  // Real-time Job Description Keyword Matcher
  const keywordResult: KeywordMatchResult | null = useMemo(() => {
    if (!jobDescription.trim() || !activeResume) return null;
    return matchJobDescriptionKeywords(jobDescription, activeResume);
  }, [jobDescription, activeResume]);

  // Trigger celebration confetti on high scores
  useEffect(() => {
    if (auditResult && auditResult.overallScore >= 85 && !isCelebrated) {
      fireConfetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
      setIsCelebrated(true);
    }
  }, [auditResult, isCelebrated]);

  // =========================================================================
  // FILE UPLOAD & PARSING HANDLER
  // =========================================================================
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('autoMagic', 'true');

    try {
      const res = await fetch('/api/extract-resume', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(
          'Failed to extract resume content from file. Please ensure it is a valid PDF, DOCX, or TXT document.'
        );
      }

      const data = await res.json();
      if (data.resumeData) {
        const parsedResume: ResumeData = {
          ...createBlankResume('prawira'),
          ...data.resumeData,
          id: `uploaded-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, '') || 'Uploaded Resume',
        };

        const oldScore = auditResult ? auditResult.overallScore : null;
        setActiveResume(parsedResume);
        setSavedResumes((prev) => [parsedResume, ...prev]);
        saveResume(parsedResume);
        setIsCelebrated(false);
        setViewMode('report');
        setReportTab('overview');

        if (oldScore !== null) {
          const newScore = analyzeResumeAts(parsedResume).overallScore;
          setPreviousScore(oldScore);
          setScoreDelta(newScore - oldScore);
          setScoreDeltaMessage(
            `New file uploaded! Score: ${oldScore}% ➔ ${newScore}% (${
              newScore >= oldScore ? '+' : ''
            }${newScore - oldScore} pts)`
          );
        } else {
          setPreviousScore(null);
          setScoreDelta(null);
          setScoreDeltaMessage(null);
        }
      } else {
        throw new Error('Could not parse resume data from document.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error processing document');
    } finally {
      setIsUploading(false);
    }
  };

  // =========================================================================
  // PASTE TEXT PARSER HANDLER
  // =========================================================================
  const handleAnalyzePastedText = () => {
    if (!pastedText.trim()) return;

    const lines = pastedText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    const newResume = createBlankResume('prawira');
    newResume.id = `pasted-${Date.now()}`;
    newResume.title = 'Pasted Resume Assessment';

    newResume.personalInfo = {
      fullName: lines[0] || 'Candidate',
      jobTitle: lines[1] || 'Professional',
      email: pastedText.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || '',
      phone:
        pastedText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] ||
        '',
      location: 'Location',
      summary: lines.slice(2, 6).join(' '),
    };

    const bulletMatches = lines.filter((l) => /^[•\-\*]/.test(l) || l.length > 50);
    newResume.experience = [
      {
        id: 'exp-pasted',
        role: lines[1] || 'Professional Experience',
        company: 'Organization',
        location: 'City, State',
        startDate: '2021',
        endDate: 'Present',
        current: true,
        highlights:
          bulletMatches.length > 0
            ? bulletMatches.slice(0, 6).map((b) => b.replace(/^[•\-\*]\s*/, ''))
            : [
                'Spearheaded key initiatives driving organizational growth and process efficiency.',
                'Collaborated with cross-functional partners to execute strategic deliverables.',
              ],
      },
    ];

    newResume.skills = [
      {
        id: 'sk-pasted',
        category: 'Core Competencies',
        items: ['Communication', 'Project Management', 'Problem Solving'],
      },
    ];

    setActiveResume(newResume);
    setSavedResumes((prev) => [newResume, ...prev]);
    saveResume(newResume);
    setIsCelebrated(false);
    setViewMode('report');
    setReportTab('overview');
  };

  // =========================================================================
  // LOAD ATS TEST SAMPLE (ONLY IF EXPLICITLY REQUESTED)
  // =========================================================================
  const handleLoadSampleResume = () => {
    const sample = createBlankResume('prawira');
    sample.title = 'Sample Professional Resume';
    sample.personalInfo = {
      fullName: 'Taylor Davis',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'taylor.davis@example.com',
      phone: '+1 (555) 432-8765',
      location: 'Austin, TX',
      website: 'https://taylordavis.dev',
      linkedin: 'https://linkedin.com/in/taylordavis',
      github: 'https://github.com/taylordavis',
      summary:
        'Results-driven Senior Full Stack Engineer with 6+ years of experience architecting high-availability web applications, reducing page latency by 45%, and leading engineering pods.',
    };
    sample.experience = [
      {
        id: 'exp-1',
        role: 'Lead Full Stack Engineer',
        company: 'CloudScale Technologies',
        location: 'Austin, TX',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected high-throughput React & Next.js dashboard handling 1.5M+ daily active sessions with 99.98% uptime.',
          'Spearheaded automated testing adoption using Jest and Playwright, elevating test coverage from 45% to 88%.',
          'Refactored legacy REST endpoints into GraphQL microservices, eliminating 320ms of network latency per query.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Software Engineer',
        company: 'Apex Data Labs',
        location: 'Dallas, TX',
        startDate: '2019',
        endDate: '2022',
        current: false,
        highlights: [
          'Engineered real-time data ingestion pipeline processing 250,000 events/sec utilizing Apache Kafka and Go.',
          'Reduced AWS compute costs by 34% through container rightsizing and Kubernetes horizontal pod autoscaling.',
        ],
      },
    ];
    sample.education = [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        school: 'University of Texas at Austin',
        location: 'Austin, TX',
        graduationDate: '2019',
        gpa: '3.85 / 4.0',
        highlights: ['Dean\'s Honor List', 'Algorithms & Distributed Systems Specialization'],
      },
    ];
    sample.skills = [
      {
        id: 'sk-1',
        category: 'Languages & Frontend',
        items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL'],
      },
      {
        id: 'sk-2',
        category: 'Backend & Cloud',
        items: ['Node.js', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Kafka', 'CI/CD'],
      },
    ];

    setActiveResume(sample);
    setEditForm(JSON.parse(JSON.stringify(sample)));
    setIsCelebrated(false);
    setViewMode('report');
    setReportTab('overview');
  };

  // =========================================================================
  // RE-CHECK ATS SCORE (THE CORE EXTERNAL USER WORKFLOW)
  // =========================================================================
  const handleUpdateAndRecheck = () => {
    if (!editForm) return;
    setIsRechecking(true);

    const oldScore = auditResult ? auditResult.overallScore : null;

    // Persist updated copy
    setActiveResume(JSON.parse(JSON.stringify(editForm)));
    saveResume(editForm);

    // Compute new score immediately
    const updatedAudit = analyzeResumeAts(editForm);
    const newScore = updatedAudit.overallScore;

    setTimeout(() => {
      setIsRechecking(false);

      if (oldScore !== null) {
        const delta = newScore - oldScore;
        setPreviousScore(oldScore);
        setScoreDelta(delta);
        if (delta > 0) {
          setScoreDeltaMessage(
            `ATS Score Improved! ${oldScore}% ➔ ${newScore}% (+${delta} pts) 🎉`
          );
        } else if (delta < 0) {
          setScoreDeltaMessage(
            `Score updated: ${oldScore}% ➔ ${newScore}% (${delta} pts). Check recommendations to regain points.`
          );
        } else {
          setScoreDeltaMessage(`Score verified: ${newScore}% (No change in scoring criteria).`);
        }
      }

      // Switch to report view to inspect updated score
      setViewMode('report');
      setReportTab('overview');
    }, 350);
  };

  // =========================================================================
  // 1-CLICK MISSING KEYWORD INJECTION (FROM JOB MATCH)
  // =========================================================================
  const handleInjectKeyword = (keyword: string) => {
    if (!editForm) return;
    const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;

    if (!updated.skills || updated.skills.length === 0) {
      updated.skills = [
        {
          id: `sk-${Date.now()}`,
          category: 'Key Skills & Technologies',
          items: [keyword],
        },
      ];
    } else {
      const firstCat = updated.skills[0];
      if (!firstCat.items.some((i) => i.toLowerCase() === keyword.toLowerCase())) {
        firstCat.items.push(keyword);
      }
    }

    setEditForm(updated);
    setActiveResume(updated);
    saveResume(updated);

    // Provide feedback
    setScoreDeltaMessage(`Added "${keyword}" to Skills! Re-checking keyword alignment...`);
    setTimeout(() => {
      setScoreDeltaMessage(null);
    }, 4000);
  };

  // Copy plain text preview
  const handleCopyPlainText = () => {
    if (!auditResult?.atsPlainText) return;
    navigator.clipboard.writeText(auditResult.atsPlainText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2000);
  };

  // Filtered suggestions
  const filteredSuggestions = useMemo(() => {
    if (!auditResult) return [];
    if (suggestionFilter === 'all') return auditResult.suggestions;
    if (suggestionFilter === 'critical')
      return auditResult.suggestions.filter((s) => s.severity === 'critical');
    if (suggestionFilter === 'recommended')
      return auditResult.suggestions.filter((s) => s.severity === 'recommended');
    if (suggestionFilter === 'duplicates')
      return auditResult.suggestions.filter((s) => !!s.duplicateMeta);
    return auditResult.suggestions;
  }, [auditResult, suggestionFilter]);

  const criticalCount = auditResult?.suggestions.filter((s) => s.severity === 'critical').length || 0;
  const recommendedCount = auditResult?.suggestions.filter((s) => s.severity === 'recommended').length || 0;
  const duplicateCount = auditResult?.suggestions.filter((s) => !!s.duplicateMeta).length || 0;

  // Jump from recommendation to edit section
  const handleJumpToFix = (sectionKey: string) => {
    setViewMode('editor');
    if (sectionKey === 'contact') setEditorSection('contact');
    else if (sectionKey === 'summary') setEditorSection('summary');
    else if (sectionKey === 'experience') setEditorSection('experience');
    else if (sectionKey === 'skills') setEditorSection('skills');
    else setEditorSection('summary');
  };

  // =========================================================================
  // VIEW 1: INITIAL STATE FOR EXTERNAL USERS (NO RESUME LOADED YET)
  // =========================================================================
  if (!activeResume) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Standalone Upload & Scanner Card */}
        <div className="bg-white dark:bg-[#161614] rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#100F0C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Dedicated External ATS Scanner</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Upload or Paste Your Resume
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Audit against Workday, Taleo, Greenhouse &amp; Lever. Update in-page and re-check instantly.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs font-bold w-full sm:w-auto overflow-x-auto no-scrollbar">
              <button
                onClick={() => setInputMode('upload')}
                className={`px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 flex-1 sm:flex-initial cursor-pointer min-h-[38px] ${
                  inputMode === 'upload'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>

              <button
                onClick={() => setInputMode('paste')}
                className={`px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 flex-1 sm:flex-initial cursor-pointer min-h-[38px] ${
                  inputMode === 'paste'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Paste Text</span>
              </button>

              {savedResumes.length > 0 && (
                <button
                  onClick={() => setInputMode('saved')}
                  className={`px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 flex-1 sm:flex-initial cursor-pointer min-h-[38px] ${
                    inputMode === 'saved'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Saved ({savedResumes.length})</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Optional Target Job Description Field */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Target Job Description (Optional Keyword Gap Matching)</span>
                </label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {jobDescription.length} characters
                </span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description or key job requirements here to discover missing keywords and calculate ATS match %..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
              />
            </div>

            {/* Mode A: Drag & Drop File Upload */}
            {inputMode === 'upload' && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01]'
                      : 'border-slate-300 dark:border-white/20 hover:border-emerald-500 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="py-6 flex flex-col items-center gap-3">
                      <Loader2 className="w-10 h-10 text-emerald-700 dark:text-emerald-400 animate-spin" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          Extracting &amp; Auditing Resume...
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Parsing syntax, sections, keywords, and quantified metrics
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-bold text-slate-800 dark:text-white">
                          Drag &amp; drop your resume here, or{' '}
                          <span className="text-emerald-700 dark:text-emerald-400 hover:underline">browse files</span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Supports standard PDF, Word (.docx), and plain text (.txt) up to 10MB
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-slate-400">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Instant ATS Audit
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Private &amp; Secure
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {uploadError && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>
            )}

            {/* Mode B: Paste Resume Text */}
            {inputMode === 'paste' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Paste raw unformatted resume text</span>
                    <span>
                      {pastedText.split(/\s+/).filter(Boolean).length} words • {pastedText.length} chars
                    </span>
                  </div>
                  <textarea
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste your full resume text here (e.g. contact info, summary, experience bullet points, education, skills)..."
                    rows={10}
                    className="w-full text-xs font-mono p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
                  />
                </div>

                <button
                  onClick={handleAnalyzePastedText}
                  disabled={!pastedText.trim()}
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Scan &amp; Audit Pasted Resume</span>
                </button>
              </div>
            )}

            {/* Mode C: Saved Resumes in Local Storage */}
            {inputMode === 'saved' && savedResumes.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Choose from your browser&apos;s stored resumes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {savedResumes.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => {
                        setActiveResume(r);
                        setEditForm(JSON.parse(JSON.stringify(r)));
                        setViewMode('report');
                        setReportTab('overview');
                      }}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] hover:border-emerald-600 bg-white dark:bg-[#161614] hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {r.title || 'Untitled Resume'}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                          {r.personalInfo?.jobTitle || 'No title specified'}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-2">
                        <span>Select to Audit</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Drive with Sample Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Don&apos;t have your resume file ready?</span>
              <button
                onClick={handleLoadSampleResume}
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Test-drive with an ATS Sample Resume</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars for External Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#161614] border border-slate-200/80 dark:border-white/[0.08] shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Real-Time Scoring</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Analyzes syntax, contact clarity, metric density, and ATS-safe layouts calibrated to Workday and Taleo.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#161614] border border-slate-200/80 dark:border-white/[0.08] shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">In-Page Resume Updater</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tweak bullet points, inject missing keywords, and adjust contact details right here, re-checking with 1 click.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#161614] border border-slate-200/80 dark:border-white/[0.08] shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Keyword Gap Matching</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste any job posting to see exact missing hard skills and 1-click add them to your resume profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DEDICATED AUDIT & LIVE RESUME UPDATER WORKSPACE
  // =========================================================================
  const overallScore = auditResult?.overallScore || 0;
  const rating = auditResult?.tier?.label || 'Needs Improvement';

  const scoreColor =
    overallScore >= 80
      ? 'text-emerald-600'
      : overallScore >= 65
      ? 'text-emerald-700 dark:text-emerald-400'
      : overallScore >= 50
      ? 'text-amber-600'
      : 'text-rose-600';

  const scoreBgColor =
    overallScore >= 80
      ? 'bg-emerald-50 border-emerald-200'
      : overallScore >= 65
      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
      : overallScore >= 50
      ? 'bg-amber-50 border-amber-200'
      : 'bg-rose-50 border-rose-200';

  return (
    <div className="space-y-6">
      {/* Re-upload hidden file input */}
      <input
        ref={reuploadInputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Persistent Workspace Control Bar */}
      <div className="bg-white dark:bg-[#161614] rounded-2xl border border-slate-200/90 dark:border-white/[0.08] p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                {activeResume.title || 'Evaluated Resume'}
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${scoreBgColor} ${scoreColor}`}
              >
                {overallScore}% {rating}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeResume.personalInfo?.fullName || 'Candidate'} •{' '}
              {activeResume.personalInfo?.jobTitle || 'Role'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            {/* Re-Upload Revised File */}
            <button
              onClick={() => reuploadInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 sm:flex-initial px-3 py-2.5 sm:py-2 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] sm:min-h-0"
              title="Upload an updated PDF or Word document from your computer"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              )}
              <span>Upload Revised</span>
            </button>

            {/* Reset / Scan Another */}
            <button
              onClick={() => {
                setActiveResume(null);
                setEditForm(null);
                setPreviousScore(null);
                setScoreDelta(null);
                setScoreDeltaMessage(null);
              }}
              className="flex-1 sm:flex-initial px-3 py-2.5 sm:py-2 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] sm:min-h-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scan Another</span>
            </button>
          </div>

          {/* Open in Full Builder */}
          <Link
            href={`/builder/${activeResume.id}`}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px] sm:min-h-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open in Full Studio</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </Link>
        </div>
      </div>

      {/* Score Improvement / Delta Banner */}
      {scoreDeltaMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">{scoreDeltaMessage}</span>
          </div>
          <button
            onClick={() => setScoreDeltaMessage(null)}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-200 p-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Workspace View Switcher (Audit Report vs Update Resume) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setViewMode('report')}
            className={`pb-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
              viewMode === 'report'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">ATS Audit Report</span>
            <span className="sm:hidden">Audit Report</span>
          </button>

          <button
            onClick={() => setViewMode('editor')}
            className={`pb-3 px-3 sm:px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer relative whitespace-nowrap shrink-0 ${
              viewMode === 'editor'
                ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Update Resume &amp; Re-Check</span>
            <span className="sm:hidden">Update &amp; Re-Check</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 uppercase">
              Live
            </span>
          </button>
        </div>

        {viewMode === 'editor' && (
          <button
            onClick={handleUpdateAndRecheck}
            disabled={isRechecking}
            className="mb-2 w-full sm:w-auto px-4 py-2 sm:py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px] sm:min-h-0"
          >
            {isRechecking ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>Update &amp; Re-Check ATS Score</span>
          </button>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODE 1: ATS AUDIT REPORT                                              */}
      {/* ===================================================================== */}
      {viewMode === 'report' && auditResult && (
        <div className="space-y-6">
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* 1. Main Overall Score Gauge Card */}
            <div className="md:col-span-5 bg-white dark:bg-[#161614] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Overall ATS Compatibility
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  Workday / Taleo Standard
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
                {/* SVG Gauge */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      className="text-slate-100 dark:text-white/[0.06]"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * overallScore) / 100}
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ease-out ${scoreColor}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {overallScore}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      ATS Score
                    </span>
                  </div>
                </div>

                {/* Rating Description */}
                <div className="space-y-2 text-center sm:text-left">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border ${scoreBgColor} ${scoreColor}`}
                  >
                    <span>{rating}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                    {overallScore >= 80
                      ? 'Exceptional structure! Your resume will parse cleanly through corporate applicant tracking systems.'
                      : overallScore >= 65
                      ? 'Good foundation, but has missing keywords and unquantified bullets that reduce recruiter visibility.'
                      : 'High risk of automatic filter rejection. Missing critical sections or metrics.'}
                  </p>
                </div>
              </div>

              {/* Quick Actions to Fix */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">
                  {criticalCount} Critical • {recommendedCount} Recommended
                </span>
                <button
                  onClick={() => setViewMode('editor')}
                  className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Update in In-Page Editor</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 2. 5 Pillar Breakdown Card */}
            <div className="md:col-span-7 bg-white dark:bg-[#161614] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] p-6 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Scoring Pillars (Out of 100)
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">Real-time parser weighting</span>
              </div>

              <div className="space-y-3.5 my-auto">
                {/* Pillar 1: Contact */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Contact &amp; Identification</span>
                    <span className="text-slate-900 dark:text-white">{auditResult.categories.contact.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/[0.06] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-700 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditResult.categories.contact.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 2: Summary */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Professional Summary</span>
                    <span className="text-slate-900 dark:text-white">{auditResult.categories.summary.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/[0.06] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditResult.categories.summary.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 3: Experience */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Experience &amp; Quantified Metrics</span>
                    <span className="text-slate-900 dark:text-white">{auditResult.categories.experience.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/[0.06] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditResult.categories.experience.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 4: Skills */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Skills &amp; Industry Keywords</span>
                    <span className="text-slate-900 dark:text-white">{auditResult.categories.skills.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/[0.06] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditResult.categories.skills.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Pillar 5: Formatting */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Formatting &amp; Machine Parsing</span>
                    <span className="text-slate-900 dark:text-white">{auditResult.categories.formatting.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/[0.06] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-600 h-full rounded-full transition-all duration-700"
                      style={{ width: `${auditResult.categories.formatting.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Badges / Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.06] text-center">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#100F0C] border border-slate-100 dark:border-white/[0.06]">
                  <span className="block text-base font-black text-slate-900 dark:text-white">
                    {auditResult.metricsCount}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                    Numbers / Metrics
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#100F0C] border border-slate-100 dark:border-white/[0.06]">
                  <span className="block text-base font-black text-slate-900 dark:text-white">
                    {auditResult.actionVerbsCount}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                    Action Verbs
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#100F0C] border border-slate-100 dark:border-white/[0.06]">
                  <span className="block text-base font-black text-slate-900 dark:text-white">
                    {criticalCount}
                  </span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold uppercase">
                    Critical Gaps
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#100F0C] border border-slate-100 dark:border-white/[0.06]">
                  <span className="block text-base font-black text-slate-900 dark:text-white">
                    {duplicateCount}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold uppercase">
                    Repeats Flagged
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Report Tab Navigation */}
          <div className="bg-white dark:bg-[#161614] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm overflow-hidden">
            <div className="px-4 sm:px-5 pt-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-bold">
              <button
                onClick={() => setReportTab('overview')}
                className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  reportTab === 'overview'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Actionable Recommendations ({auditResult.suggestions.length})</span>
              </button>

              {keywordResult && (
                <button
                  onClick={() => setReportTab('jobMatch')}
                  className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    reportTab === 'jobMatch'
                      ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Job Description Match ({keywordResult.matchRate}%)</span>
                </button>
              )}

              <button
                onClick={() => setReportTab('plainText')}
                className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  reportTab === 'plainText'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>ATS Robot Parser View</span>
              </button>
            </div>

            {/* Tab 1: Actionable Recommendations */}
            {reportTab === 'overview' && (
              <div className="p-5 sm:p-6 space-y-4">
                {/* Filter chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
                  <button
                    onClick={() => setSuggestionFilter('all')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      suggestionFilter === 'all'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/[0.1]'
                    }`}
                  >
                    All ({auditResult.suggestions.length})
                  </button>

                  <button
                    onClick={() => setSuggestionFilter('critical')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                      suggestionFilter === 'critical'
                        ? 'bg-rose-600 text-white'
                        : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Critical ({criticalCount})</span>
                  </button>

                  <button
                    onClick={() => setSuggestionFilter('recommended')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                      suggestionFilter === 'recommended'
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Recommended ({recommendedCount})</span>
                  </button>

                  {duplicateCount > 0 && (
                    <button
                      onClick={() => setSuggestionFilter('duplicates')}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
                        suggestionFilter === 'duplicates'
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                      }`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Repeats ({duplicateCount})</span>
                    </button>
                  )}
                </div>

                {/* Suggestions List */}
                <div className="space-y-3">
                  {filteredSuggestions.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 dark:text-slate-400 space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                      <p className="font-bold text-sm text-slate-800 dark:text-white">
                        No issues found in this category!
                      </p>
                      <p className="text-xs">Your resume meets all modern parsing criteria here.</p>
                    </div>
                  ) : (
                    filteredSuggestions.map((item, idx) => {
                      const isCrit = item.severity === 'critical';
                      return (
                        <div
                          key={`${item.category}-${idx}`}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-3 ${
                            isCrit
                              ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                              : 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/[0.08]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                  isCrit ? 'bg-rose-200 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200' : 'bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200'
                                }`}
                              >
                                {item.severity}
                              </span>
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {item.category}
                              </span>
                              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                                {item.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                            {item.fixHint && (
                              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] text-[11px] text-slate-700 dark:text-slate-300 font-mono mt-2">
                                <span className="text-slate-400 select-none">Tip: </span>
                                {item.fixHint}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handleJumpToFix(item.category)}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] hover:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold text-xs shadow-2xs transition-all flex items-center gap-1 shrink-0 self-end sm:self-center cursor-pointer"
                          >
                            <span>Fix in Editor</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Job Description Match */}
            {reportTab === 'jobMatch' && keywordResult && (
              <div className="p-5 sm:p-6 space-y-5">
                <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                      Target Match Compatibility
                    </span>
                    <h4 className="text-xl font-black text-white mt-0.5">
                      {keywordResult.matchRate}% Recruiter Match
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {keywordResult.matchedKeywords.length} keywords matched •{' '}
                      {keywordResult.missingKeywords.length} missing keywords detected
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setViewMode('editor');
                      setEditorSection('skills');
                    }}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Bridge Missing Skills in Editor</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matched Keywords */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] space-y-3">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Matched Keywords ({keywordResult.matchedKeywords.length})</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {keywordResult.matchedKeywords.map((item, idx) => (
                        <span
                          key={`${item.keyword}-${idx}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1"
                        >
                          <span>{item.keyword}</span>
                          {item.count > 1 && (
                            <span className="text-[10px] bg-emerald-200/60 dark:bg-emerald-800 text-emerald-900 dark:text-white px-1.5 py-0.2 rounded-full font-bold">
                              ×{item.count}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords with 1-Click Injection */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] space-y-3">
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Missing Target Keywords ({keywordResult.missingKeywords.length})</span>
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Click any keyword below to immediately add it to your resume skills:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {keywordResult.missingKeywords.map((item, idx) => (
                        <button
                          key={`${item.keyword}-${idx}`}
                          onClick={() => handleInjectKeyword(item.keyword)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer group"
                          title="Click to add to skills"
                        >
                          <Plus className="w-3 h-3 text-rose-600 dark:text-rose-400 group-hover:scale-125 transition-transform" />
                          <span>{item.keyword}</span>
                          {item.importance === 'high' && (
                            <span className="text-[9px] bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 px-1 py-0.2 rounded font-bold uppercase ml-1">
                              High
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Robot Plain Text View */}
            {reportTab === 'plainText' && (
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">
                      Applicant Tracking System Text Extraction
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      This is the exact linear text stream recruiters and parsing bots read after stripping design layers.
                    </p>
                  </div>

                  <button
                    onClick={handleCopyPlainText}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                  >
                    {copiedPlainText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Plain Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed max-h-96 overflow-y-auto border border-slate-800 whitespace-pre-wrap selection:bg-emerald-700 selection:text-white">
                  {auditResult.atsPlainText || 'No text extracted'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODE 2: UPDATE RESUME & RE-CHECK (THE CORE REQUESTED WORKSPACE)      */}
      {/* ===================================================================== */}
      {viewMode === 'editor' && editForm && (
        <div className="bg-white dark:bg-[#161614] rounded-3xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm overflow-hidden">
          {/* Section Navigation Header */}
          <div className="px-4 sm:px-5 pt-4 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditorSection('contact')}
                className={`pb-3 px-3 border-b-2 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  editorSection === 'contact'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Contact Info</span>
              </button>

              <button
                onClick={() => setEditorSection('summary')}
                className={`pb-3 px-3 border-b-2 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  editorSection === 'summary'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Summary</span>
              </button>

              <button
                onClick={() => setEditorSection('experience')}
                className={`pb-3 px-3 border-b-2 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  editorSection === 'experience'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Experience &amp; Bullets</span>
              </button>

              <button
                onClick={() => setEditorSection('skills')}
                className={`pb-3 px-3 border-b-2 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  editorSection === 'skills'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Skills &amp; Keywords</span>
              </button>

              <button
                onClick={() => setEditorSection('job')}
                className={`pb-3 px-3 border-b-2 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  editorSection === 'job'
                    ? 'border-emerald-700 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Target Job Description</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 pb-2">
              <button
                onClick={handleUpdateAndRecheck}
                disabled={isRechecking}
                className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isRechecking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Update &amp; Re-Check ATS Score</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* SUB-SECTION 1: CONTACT INFO */}
            {editorSection === 'contact' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Contact &amp; Identification Details
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ATS bots require standard contact fields to create your candidate profile.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={editForm.personalInfo?.fullName || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            fullName: e.target.value,
                            summary: editForm.personalInfo?.summary || '',
                            jobTitle: editForm.personalInfo?.jobTitle || '',
                            email: editForm.personalInfo?.email || '',
                            phone: editForm.personalInfo?.phone || '',
                            location: editForm.personalInfo?.location || '',
                          },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Job Title *
                    </label>
                    <JobTitleAutocomplete
                      value={editForm.personalInfo?.jobTitle || ''}
                      onChange={(val) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            jobTitle: val,
                            fullName: editForm.personalInfo?.fullName || '',
                            summary: editForm.personalInfo?.summary || '',
                            email: editForm.personalInfo?.email || '',
                            phone: editForm.personalInfo?.phone || '',
                            location: editForm.personalInfo?.location || '',
                          },
                        })
                      }
                      placeholder="e.g. Senior Software Engineer"
                      className="text-xs p-2.5 rounded-xl border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={editForm.personalInfo?.email || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            email: e.target.value,
                            fullName: editForm.personalInfo?.fullName || '',
                            jobTitle: editForm.personalInfo?.jobTitle || '',
                            summary: editForm.personalInfo?.summary || '',
                            phone: editForm.personalInfo?.phone || '',
                            location: editForm.personalInfo?.location || '',
                          },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      value={editForm.personalInfo?.phone || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            phone: e.target.value,
                            fullName: editForm.personalInfo?.fullName || '',
                            jobTitle: editForm.personalInfo?.jobTitle || '',
                            email: editForm.personalInfo?.email || '',
                            summary: editForm.personalInfo?.summary || '',
                            location: editForm.personalInfo?.location || '',
                          },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Location (City, State / Country) *
                    </label>
                    <input
                      type="text"
                      value={editForm.personalInfo?.location || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            location: e.target.value,
                            fullName: editForm.personalInfo?.fullName || '',
                            jobTitle: editForm.personalInfo?.jobTitle || '',
                            email: editForm.personalInfo?.email || '',
                            phone: editForm.personalInfo?.phone || '',
                            summary: editForm.personalInfo?.summary || '',
                          },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      LinkedIn URL (Boosts ATS Confidence)
                    </label>
                    <input
                      type="text"
                      value={editForm.personalInfo?.linkedin || ''}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          personalInfo: {
                            ...editForm.personalInfo,
                            linkedin: e.target.value,
                            fullName: editForm.personalInfo?.fullName || '',
                            jobTitle: editForm.personalInfo?.jobTitle || '',
                            email: editForm.personalInfo?.email || '',
                            phone: editForm.personalInfo?.phone || '',
                            location: editForm.personalInfo?.location || '',
                            summary: editForm.personalInfo?.summary || '',
                          },
                        })
                      }
                      placeholder="linkedin.com/in/username"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SECTION 2: PROFESSIONAL SUMMARY */}
            {editorSection === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Professional Executive Summary
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Aim for 40–80 words incorporating your key domain, years of experience, and 1 quantifiable impact metric.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                    {(editForm.personalInfo?.summary || '').split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <textarea
                  value={editForm.personalInfo?.summary || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      personalInfo: {
                        ...editForm.personalInfo,
                        summary: e.target.value,
                        fullName: editForm.personalInfo?.fullName || '',
                        jobTitle: editForm.personalInfo?.jobTitle || '',
                        email: editForm.personalInfo?.email || '',
                        phone: editForm.personalInfo?.phone || '',
                        location: editForm.personalInfo?.location || '',
                      },
                    })
                  }
                  rows={5}
                  placeholder="e.g. Results-driven Senior Software Engineer with 6+ years of experience designing scalable microservices, slashing latency by 35%, and driving team productivity."
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed resize-y"
                />

                {/* Quick Action Verb Inserters */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    High-Scoring ATS Action Verbs (Click to insert):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Architected',
                      'Spearheaded',
                      'Accelerated',
                      'Optimized',
                      'Engineered',
                      'Automated',
                      'Orchestrated',
                      'Delivered',
                    ].map((verb) => (
                      <button
                        key={verb}
                        type="button"
                        onClick={() => {
                          const current = editForm.personalInfo?.summary || '';
                          const newText = current ? `${current} ${verb}` : verb;
                          setEditForm({
                            ...editForm,
                            personalInfo: {
                              ...editForm.personalInfo,
                              summary: newText,
                              fullName: editForm.personalInfo?.fullName || '',
                              jobTitle: editForm.personalInfo?.jobTitle || '',
                              email: editForm.personalInfo?.email || '',
                              phone: editForm.personalInfo?.phone || '',
                              location: editForm.personalInfo?.location || '',
                            },
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.06] hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-slate-700 dark:text-slate-200 hover:text-emerald-800 dark:hover:text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        + {verb}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SECTION 3: WORK EXPERIENCE & BULLET POINTS */}
            {editorSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Experience &amp; Quantified Accomplishment Bullets
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ATS algorithms prioritize bullets containing quantifiable metrics (%, $, numbers) using Google’s X-Y-Z formula.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                      const newExp: ExperienceItem = {
                        id: `exp-${Date.now()}`,
                        role: 'Role Title',
                        company: 'Company Name',
                        location: 'City, State',
                        startDate: '2022',
                        endDate: 'Present',
                        current: true,
                        highlights: [
                          'Spearheaded initiative delivering 25% increase in operational efficiency.',
                        ],
                      };
                      updated.experience = [newExp, ...(updated.experience || [])];
                      setEditForm(updated);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                {/* Roles List */}
                <div className="space-y-6">
                  {(editForm.experience || []).map((exp, expIdx) => (
                    <div
                      key={exp.id || expIdx}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                            Role / Job Title
                          </label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                              updated.experience[expIdx].role = e.target.value;
                              setEditForm(updated);
                            }}
                            className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                              updated.experience[expIdx].company = e.target.value;
                              setEditForm(updated);
                            }}
                            className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white"
                          />
                        </div>

                        <div className="flex items-end justify-between gap-2">
                          <div className="flex-1">
                            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                              Dates
                            </label>
                            <input
                              type="text"
                              value={`${exp.startDate} - ${exp.endDate}`}
                              onChange={(e) => {
                                const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                                updated.experience[expIdx].startDate = e.target.value;
                                setEditForm(updated);
                              }}
                              className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                              updated.experience.splice(expIdx, 1);
                              setEditForm(updated);
                            }}
                            className="p-2 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                            title="Remove role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-white/[0.08]">
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Accomplishment Bullet Points:
                        </label>

                        {exp.highlights.map((bullet, bulletIdx) => {
                          const hasMetric = /\b\d+(?:[\.,]\d+)?%?|\$\d+|\b(?:hundred|thousand|million|billion)\b/i.test(
                            bullet
                          );

                          return (
                            <div key={bulletIdx} className="space-y-1">
                              <div className="flex items-start gap-2">
                                <textarea
                                  value={bullet}
                                  onChange={(e) => {
                                    const updated = JSON.parse(
                                      JSON.stringify(editForm)
                                    ) as ResumeData;
                                    updated.experience[expIdx].highlights[bulletIdx] =
                                      e.target.value;
                                    setEditForm(updated);
                                  }}
                                  rows={2}
                                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = JSON.parse(
                                      JSON.stringify(editForm)
                                    ) as ResumeData;
                                    updated.experience[expIdx].highlights.splice(bulletIdx, 1);
                                    setEditForm(updated);
                                  }}
                                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                                  title="Delete bullet"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 text-[10px]">
                                {hasMetric ? (
                                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                    <span>Contains quantified metric</span>
                                  </span>
                                ) : (
                                  <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                    <span>Add numbers or % (e.g. &quot;slashed load time by 38%&quot;) for higher score</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => {
                            const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                            updated.experience[expIdx].highlights.push(
                              'Accelerated [key metric] by 20% through [method/tool], benefiting [outcome].'
                            );
                            setEditForm(updated);
                          }}
                          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:text-emerald-300 inline-flex items-center gap-1 hover:underline pt-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Quantified Bullet Point</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-SECTION 4: SKILLS & KEYWORDS */}
            {editorSection === 'skills' && (
              <div className="space-y-5">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Skills, Competencies &amp; Industry Keywords
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ATS search engines match candidates based on keyword token density.
                  </p>
                </div>

                {/* 1-Click Missing Keywords Bridge */}
                {keywordResult && keywordResult.missingKeywords.length > 0 && (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                    <span className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <Target className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>1-Click Missing Job Description Keywords</span>
                    </span>
                    <p className="text-xs text-rose-700 dark:text-rose-400">
                      These keywords were found in the job description but are absent from your resume. Click to add them:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {keywordResult.missingKeywords.map((kw, idx) => (
                        <button
                          key={`${kw.keyword}-${idx}`}
                          type="button"
                          onClick={() => handleInjectKeyword(kw.keyword)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#100F0C] hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                          <span>{kw.keyword}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Category List */}
                <div className="space-y-4">
                  {(editForm.skills || []).map((cat, catIdx) => (
                    <div
                      key={cat.id || catIdx}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={cat.category}
                          onChange={(e) => {
                            const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                            updated.skills[catIdx].category = e.target.value;
                            setEditForm(updated);
                          }}
                          className="font-bold text-xs text-slate-800 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-white/20 focus:border-emerald-600 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                            updated.skills.splice(catIdx, 1);
                            setEditForm(updated);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Delete category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Skill Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#100F0C] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = JSON.parse(
                                  JSON.stringify(editForm)
                                ) as ResumeData;
                                updated.skills[catIdx].items.splice(sIdx, 1);
                                setEditForm(updated);
                              }}
                              className="text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      {/* Add Skill to this Category */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Type a skill and press enter..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              e.preventDefault();
                              const updated = JSON.parse(
                                JSON.stringify(editForm)
                              ) as ResumeData;
                              updated.skills[catIdx].items.push(e.currentTarget.value.trim());
                              setEditForm(updated);
                              e.currentTarget.value = '';
                            }
                          }}
                          className="text-xs p-2 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white flex-1 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const updated = JSON.parse(JSON.stringify(editForm)) as ResumeData;
                      const newCat: SkillCategory = {
                        id: `sk-${Date.now()}`,
                        category: 'New Domain Skills',
                        items: ['Fast Learner', 'Problem Solving'],
                      };
                      updated.skills = [...(updated.skills || []), newCat];
                      setEditForm(updated);
                    }}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:text-emerald-300 inline-flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill Category</span>
                  </button>
                </div>
              </div>
            )}

            {/* SUB-SECTION 5: TARGET JOB DESCRIPTION */}
            {editorSection === 'job' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Target Job Description
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update the target posting to calculate your recruiter keyword match rate.
                  </p>
                </div>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description or requirement bullet points here..."
                  rows={8}
                  className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#100F0C] text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
                />
              </div>
            )}

            {/* Bottom Floating Update & Re-Check Bar */}
            <div className="pt-6 border-t border-slate-100 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Edits are preserved in this browser session.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('report')}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                >
                  Cancel &amp; View Report
                </button>

                <button
                  type="button"
                  onClick={handleUpdateAndRecheck}
                  disabled={isRechecking}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isRechecking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  <span>Update &amp; Re-Check ATS Score</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

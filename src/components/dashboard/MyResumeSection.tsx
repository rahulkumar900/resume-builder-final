'use client';

import React, { useState, useMemo } from 'react';
import { ResumeData } from '@/types/resume';
import {
  MoreVertical,
  Copy,
  Trash2,
  FileDown,
  Edit3,
  Plus,
  FileText,
  Sparkles,
  Search,
  Award,
  Calendar,
  ExternalLink,
  Loader2,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DynamicResumeCardPreview } from './DynamicResumeCardPreview';
import { analyzeResumeAts } from '@/lib/ats/ats-analyzer';
import { TEMPLATES } from '@/lib/templates';
import { cn } from '@/lib/utils';

interface MyResumeSectionProps {
  resumes: ResumeData[];
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onDownloadPdf: (resume: ResumeData) => void;
  onScoreResume?: (resume: ResumeData) => void;
  onTailorResume?: (resume: ResumeData) => void;
  loadingPdfId?: string | null;
  isSyncingCloud?: boolean;
  onRefreshCloud?: () => void;
}

export const MyResumeSection: React.FC<MyResumeSectionProps> = ({
  resumes,
  onDuplicate,
  onDelete,
  onDownloadPdf,
  onScoreResume,
  onTailorResume,
  loadingPdfId,
  isSyncingCloud = false,
  onRefreshCloud,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const draftCount = useMemo(() => resumes.filter((r) => r.status === 'draft').length, [resumes]);
  const completedCount = useMemo(() => resumes.filter((r) => r.status === 'completed').length, [resumes]);

  // Compute ATS scores memoized per resume id
  const atsScores = useMemo(() => {
    const map = new Map<string, number>();
    resumes.forEach((r) => {
      const res = analyzeResumeAts(r);
      map.set(r.id, res.overallScore);
    });
    return map;
  }, [resumes]);

  const filteredResumes = useMemo(() => {
    return resumes.filter((r) => {
      // Tab filter
      if (activeTab === 'draft' && r.status !== 'draft') return false;
      if (activeTab === 'completed' && r.status !== 'completed') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = r.title?.toLowerCase().includes(q);
        const nameMatch = r.personalInfo?.fullName?.toLowerCase().includes(q);
        const roleMatch = r.personalInfo?.jobTitle?.toLowerCase().includes(q);
        return titleMatch || nameMatch || roleMatch;
      }
      return true;
    });
  }, [resumes, activeTab, searchQuery]);

  const getTemplateName = (templateId: string) => {
    const found = TEMPLATES.find((t) => t.id === templateId);
    return found ? found.name : 'Standard Layout';
  };

  const getAtsBadge = (score: number) => {
    if (score >= 80) return { label: `${score}% ATS`, color: 'bg-emerald-500 text-white border-emerald-600' };
    if (score >= 65) return { label: `${score}% ATS`, color: 'bg-amber-500 text-white border-amber-600' };
    return { label: `${score}% ATS`, color: 'bg-rose-500 text-white border-rose-600' };
  };

  return (
    <section className="mb-12">
      {/* Sub Header, Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200/80 pb-4">
        {/* Left: Section Title & Tabs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              My Resumes
            </h2>
            {onRefreshCloud && (
              <button
                type="button"
                onClick={onRefreshCloud}
                disabled={isSyncingCloud}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/60 dark:border-white/[0.08] transition-all cursor-pointer disabled:opacity-60"
                title="Sync and refresh resumes from database"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isSyncingCloud && "animate-spin text-emerald-600")} />
                <span className="hidden sm:inline">{isSyncingCloud ? 'Syncing...' : 'Sync Cloud'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl border border-black/[0.05] dark:border-white/[0.05]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({resumes.length})
            </button>
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                activeTab === 'draft'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Drafts ({draftCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Right: Real Search Bar */}
        {resumes.length > 0 && (
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search resumes by title or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#161614] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-2xs"
            />
          </div>
        )}
      </div>

      {/* Grid of Resumes */}
      {filteredResumes.length === 0 ? (
        isSyncingCloud && resumes.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-[#161614] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-2xs h-[340px] flex flex-col overflow-hidden animate-pulse"
              >
                <div className="h-[250px] w-full bg-slate-100 dark:bg-white/[0.04]" />
                <div className="p-3 pt-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-slate-200 dark:bg-white/[0.08] rounded w-3/4" />
                    <div className="h-2.5 bg-slate-100 dark:bg-white/[0.04] rounded w-1/2" />
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-white/[0.04] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/90 dark:bg-[#161614] rounded-2xl border border-border shadow-2xs flex flex-col items-center justify-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4 shadow-xs">
              <FileText className="w-7 h-7 stroke-[1.75]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1.5">
              No resumes created yet
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              Start building your first job-winning resume with real-time ATS scoring, section AI assistants, and pixel-exact A4 exports.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => router.push('/create')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs rounded-full shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Resume</span>
              </button>
              <button
                onClick={() => router.push('/templates')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-[#161614] hover:bg-white dark:hover:bg-[#1e1d1a] text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-full border border-black/[0.08] dark:border-white/[0.08] shadow-2xs transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Browse Templates</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#161614] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-2xs">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              No resumes matching your filter. Try adjusting your search query.
            </p>
          </div>
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredResumes.map((resume) => {
            const atsScore = atsScores.get(resume.id) ?? 0;
            const badge = getAtsBadge(atsScore);
            const isDownloading = loadingPdfId === resume.id;

            return (
              <div
                key={resume.id}
                className="group bg-white dark:bg-[#161614] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] shadow-2xs hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500/50 transition-all flex flex-col overflow-hidden relative cursor-pointer h-[340px]"
                onClick={() => router.push(`/builder/${encodeURIComponent(resume.id)}`)}
              >
                {/* Top Real Dynamic Preview Box */}
                <div className="h-[250px] w-full bg-[#f8fafc] dark:bg-[#100F0C] p-2.5 pb-0 border-b border-slate-100 dark:border-white/[0.06] flex items-start justify-center relative overflow-hidden group-hover:bg-slate-100/50 dark:group-hover:bg-[#1c1b18] transition-colors">
                  {/* Miniature template layout with REAL user data */}
                  <div className="w-full h-full rounded-t shadow-xs border border-slate-200/70 dark:border-white/[0.08] overflow-hidden bg-white pointer-events-none">
                    <DynamicResumeCardPreview resume={resume} />
                  </div>

                  {/* Sleek Hover Action Overlay */}
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10 p-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/builder/${encodeURIComponent(resume.id)}`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/builder/${encodeURIComponent(resume.id)}?tab=preview`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Preview</span>
                    </button>
                  </div>

                    {/* Quick 3-Dots Dropdown Trigger */}
                  <div
                    className="absolute top-2.5 right-2.5 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === resume.id ? null : resume.id);
                    }}
                  >
                    <button
                      type="button"
                      className="p-1.5 rounded-full bg-white/95 dark:bg-[#161614] hover:bg-white dark:hover:bg-[#1e1d1a] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white shadow-xs border border-slate-200/70 dark:border-white/[0.08] transition-all cursor-pointer"
                      title="Options"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuId === resume.id && (
                      <div
                        className="absolute right-0 mt-1 w-44 bg-white dark:bg-[#1c1b18] rounded-xl shadow-xl border border-slate-100 dark:border-white/[0.08] py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            router.push(`/builder/${encodeURIComponent(resume.id)}`);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                          <span>Edit Resume</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            router.push(`/builder/${encodeURIComponent(resume.id)}?tab=preview`);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                          <span>View Preview</span>
                        </button>
                        {onScoreResume && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onScoreResume(resume);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-700 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                          >
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Run ATS Audit</span>
                          </button>
                        )}
                        {onTailorResume && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveMenuId(null);
                              onTailorResume(resume);
                            }}
                            className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-800 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Tailor for Job</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onDuplicate(resume.id);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Duplicate</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onDownloadPdf(resume);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-200 font-medium cursor-pointer"
                        >
                          <FileDown className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Download PDF</span>
                        </button>
                        <div className="border-t border-slate-100 dark:border-white/[0.08] my-1"></div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onDelete(resume.id);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-medium cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title, Template & Updated Info Footer */}
                <div className="p-3 pt-2.5 flex-1 flex flex-col justify-between bg-white dark:bg-[#161614]">
                  <div>
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 flex-1">
                        {resume.title || 'Untitled Resume'}
                      </h3>
                      {/* Real ATS Score Pill Badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onScoreResume) onScoreResume(resume);
                        }}
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-black tracking-wide shrink-0 border ${badge.color} hover:brightness-105 transition-all cursor-pointer`}
                        title="Click to view ATS Audit breakdown"
                      >
                        <Award className="w-2.5 h-2.5" />
                        <span>{badge.label}</span>
                      </button>
                    </div>
                    <p className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                      {getTemplateName(resume.templateId)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100/60 dark:border-white/[0.06] text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                    <span className="truncate">
                      {resume.status === 'completed' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">Draft</span>
                      )}
                    </span>
                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadPdf(resume);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                      title="Quick Download PDF"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};


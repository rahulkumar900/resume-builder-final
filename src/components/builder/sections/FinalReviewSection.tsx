'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ResumeData } from '@/types/resume';
import { SectionKey } from '@/types/builder';
import { analyzeResumeAts } from '@/lib/ats/ats-analyzer';
import { ShareResumeModal } from '@/components/builder/ShareResumeModal';
import { SectionReorderModal } from '@/components/builder/SectionReorderModal';
import { NAV_ITEMS } from './SectionNav';
import { PersonalSection } from './PersonalSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { CertificationsSection } from './CertificationsSection';
import { LanguagesSection } from './LanguagesSection';
import { InternshipsSection } from './InternshipsSection';
import { GenericSectionEditor } from './GenericSectionEditor';
import {
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Layers,
  Plus,
  Copy,
  FileDown,
  Terminal,
} from 'lucide-react';



interface FinalReviewSectionProps {
  resume: ResumeData;
  onChange: (updated: Partial<ResumeData>) => void;
  onSelectSection: (key: SectionKey | 'all') => void;
  onDownloadPdf?: () => void;
  onPrint?: () => void;
  onScore?: () => void;
  onShare?: () => void;
  onOpenDesignStudio?: () => void;
  onOpenJobTailor?: () => void;
  onOpenGrammar?: () => void;
  isDownloading?: boolean;
  completeness: number;
  stepKeys: SectionKey[];
  onReorderSections: (newKeys: SectionKey[]) => void;
  onAddSection?: (key: SectionKey) => void;
}

export const FinalReviewSection: React.FC<FinalReviewSectionProps> = ({
  resume,
  onChange,
  onSelectSection,
  onDownloadPdf,
  onPrint,
  onScore,
  onShare,
  onOpenDesignStudio,
  onOpenJobTailor,
  onOpenGrammar,
  isDownloading = false,
  completeness,
  stepKeys,
  onReorderSections,
  onAddSection,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [copiedPlainText, setCopiedPlainText] = useState(false);
  const [showAtsPlainText, setShowAtsPlainText] = useState(false);

  // Section status check
  const p = resume.personalInfo;
  const hasContact = Boolean(p?.fullName && p?.email);
  const expCount = resume.experience?.length || 0;
  const eduCount = resume.education?.length || 0;
  const skillsCount = (resume.skills || []).reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
  const projCount = resume.projects?.length || 0;
  const certCount = resume.certifications?.length || 0;
  const langCount = resume.languages?.length || 0;

  // ATS Diagnostic Analysis for plain text extraction and score badge
  const atsResult = useMemo(() => {
    return analyzeResumeAts(resume);
  }, [resume]);


  // Copy plain text ATS format to clipboard
  const handleCopyPlainText = useCallback(() => {
    if (!atsResult.atsPlainText) return;
    navigator.clipboard.writeText(atsResult.atsPlainText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2200);
  }, [atsResult.atsPlainText]);

  // Download plain text (.txt) file
  const handleDownloadTxt = useCallback(() => {
    if (!atsResult.atsPlainText) return;
    const blob = new Blob([atsResult.atsPlainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const namePart = (resume.personalInfo?.fullName || 'resume').toLowerCase().replace(/\s+/g, '_');
    link.download = `${namePart}_ats_plain_text.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [atsResult.atsPlainText, resume.personalInfo?.fullName]);

  // Set of expanded section keys for inline editing (defaults to all expanded or first)
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(() => new Set(stepKeys));

  const toggleSection = (key: SectionKey) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const renderSectionEditor = (key: SectionKey) => {
    switch (key) {
      case 'personal':
        return (
          <PersonalSection
            key="personal"
            data={resume.personalInfo}
            onChange={(personalInfo) => onChange({ personalInfo })}
            hideHeader={true}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            key="experience"
            data={resume.experience || []}
            onChange={(experience) => onChange({ experience })}
            targetRole={resume.personalInfo?.jobTitle}
            hideHeader={true}
          />
        );
      case 'internships':
        return (
          <InternshipsSection
            key="internships"
            data={resume.internships || []}
            onChange={(internships) => onChange({ internships })}
            targetRole={resume.personalInfo?.jobTitle}
            hideHeader={true}
          />
        );
      case 'education':
        return (
          <EducationSection
            key="education"
            data={resume.education || []}
            onChange={(education) => onChange({ education })}
            hideHeader={true}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            key="skills"
            data={resume.skills || []}
            targetRole={resume.personalInfo?.jobTitle}
            onChange={(skills) => onChange({ skills })}
            hideHeader={true}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            key="projects"
            data={resume.projects || []}
            jobRole={resume.personalInfo?.jobTitle}
            onChange={(projects) => onChange({ projects })}
            hideHeader={true}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            key="certifications"
            data={resume.certifications || []}
            onChange={(certifications) => onChange({ certifications })}
            hideHeader={true}
          />
        );
      case 'languages':
        return (
          <LanguagesSection
            key="languages"
            data={resume.languages || []}
            onChange={(languages) => onChange({ languages })}
            hideHeader={true}
          />
        );
      default:
        return (
          <GenericSectionEditor
            key={key}
            sectionKey={key}
            resume={resume}
            onChange={onChange}
            hideHeader={true}
          />
        );
    }
  };

  const allExpanded = stepKeys.length > 0 && stepKeys.every((k) => expandedSections.has(k));

  const toggleAllSections = () => {
    if (allExpanded) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(stepKeys));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* 1. Seamless Border-Separated Section Editors (Border separation, no disjointed card gaps) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-muted-foreground">
            {stepKeys.length} Active {stepKeys.length === 1 ? 'Section' : 'Sections'}
          </span>
          <button
            type="button"
            onClick={toggleAllSections}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer select-none"
          >
            {allExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{allExpanded ? 'Collapse All' : 'Expand All'}</span>
          </button>
        </div>

        {/* Full-Width Section Form Editors - Unified container separated by border, no gap/space */}
        <div className="w-full rounded-2xl border border-slate-200 dark:border-border bg-white dark:bg-card divide-y divide-slate-200 dark:divide-border overflow-hidden shadow-xs">
          {stepKeys.map((key) => {
            const navItem = NAV_ITEMS.find((n) => n.key === key);
            const Icon = navItem?.icon || Layers;
            const label = navItem?.label || key;
            const isExpanded = expandedSections.has(key);
            const itemCount = navItem?.getCount ? navItem.getCount(resume) : null;

            return (
              <div key={key} className="w-full">
                {/* Clean Header Bar */}
                <div
                  onClick={() => toggleSection(key)}
                  className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 dark:hover:bg-muted/40 transition-colors select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-semibold text-slate-900 dark:text-foreground truncate">{label}</span>
                      {itemCount !== null && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground">
                          {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold text-primary hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Edit'}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-muted flex items-center justify-center text-slate-500 dark:text-muted-foreground">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Embedded Full-Width Form Content */}
                {isExpanded && (
                  <div className="w-full border-t border-slate-200 dark:border-border p-4 sm:p-5 bg-slate-50/40 dark:bg-background/40 animate-in fade-in duration-150">
                    {renderSectionEditor(key)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add More Sections Hub */}
        <div className="w-full p-4 sm:p-5 rounded-xl border border-dashed border-slate-300 dark:border-border bg-slate-50/60 dark:bg-muted/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-foreground uppercase tracking-wider">
                Add More Sections to Resume
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsReorderModalOpen(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Manage &amp; Reorder All</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {NAV_ITEMS.filter(
              (item) =>
                item.key !== 'review' &&
                item.key !== 'all' &&
                item.key !== 'personal' &&
                !stepKeys.includes(item.key)
            ).map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    const secKey = item.key as SectionKey;
                    if (onAddSection) {
                      onAddSection(secKey);
                    }
                    setExpandedSections((prev) => new Set([...prev, secKey]));
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card hover:border-primary hover:text-primary text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer group"
                >
                  <Plus className="w-3 h-3 text-slate-400 group-hover:text-primary transition-colors" />
                  <ItemIcon className="w-3 h-3 text-slate-500 group-hover:text-primary transition-colors" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. ATS Plain-Text Parser Simulation & Export Drawer */}
      <div className="bg-white dark:bg-card rounded-2xl border border-slate-200/90 dark:border-border shadow-2xs overflow-hidden">
        <div
          onClick={() => setShowAtsPlainText(!showAtsPlainText)}
          className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 dark:hover:bg-muted/40 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-primary text-white flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-foreground">ATS Plain-Text Parser Simulation</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-muted text-slate-600 dark:text-muted-foreground uppercase">
                  Workday &bull; Taleo &bull; Greenhouse
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-muted-foreground">
                Inspect raw unformatted text stream as read by corporate applicant tracking parsers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyPlainText();
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedPlainText ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadTxt();
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
              title="Download .txt format"
            >
              <FileDown className="w-3 h-3 text-slate-500" />
              <span>.TXT</span>
            </button>

            {showAtsPlainText ? (
              <ChevronUp className="w-4 h-4 text-slate-400 ml-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            )}
          </div>
        </div>

        {showAtsPlainText && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>This simulates the text extracted when you upload your resume to corporate hiring portals.</span>
              <span className="font-mono text-[11px] text-slate-400">
                {atsResult.atsPlainText?.length || 0} characters
              </span>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap border border-slate-800 selection:bg-emerald-600 selection:text-white">
              {atsResult.atsPlainText || 'No content found in resume.'}
            </pre>
          </div>
        )}
      </div>

      {/* Share Resume Modal */}
      <ShareResumeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resume={resume}
        onDownloadPdf={onDownloadPdf}
        onPrint={onPrint}
      />

      {/* Section Reorder Modal */}
      <SectionReorderModal
        isOpen={isReorderModalOpen}
        onClose={() => setIsReorderModalOpen(false)}
        stepKeys={stepKeys}
        navItems={NAV_ITEMS}
        activeTab={'review'}
        onSelectSection={onSelectSection}
        onReorderSections={onReorderSections}
        onUpdateSectionOrder={(sectionOrder) => onChange({ sectionOrder })}
        resume={resume}
      />
    </div>
  );
};

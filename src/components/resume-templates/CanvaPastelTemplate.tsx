'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  hasPageSidebarContent,
  getEffectiveSectionOrder,
} from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const CanvaPastelTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    volunteer = [],
    achievements = [],
    themeColor = '#fb7185', // playful coral pink default
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3' : spacing === 'relaxed' ? 'mb-5' : 'mb-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';
  const paddingClass =
    spacing === 'compact' ? 'p-5' : spacing === 'relaxed' ? 'p-8' : 'p-6';

  const effectiveOrder = getEffectiveSectionOrder(
    'canvapastel',
    data.sectionOrder,
    data.experienceLevel
  );
  const mainOrder =
    data.sectionOrder?.mainColumn && data.sectionOrder.mainColumn.length > 0
      ? data.sectionOrder.mainColumn
      : effectiveOrder.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder =
    data.sectionOrder?.sidebarColumn && data.sectionOrder.sidebarColumn.length > 0
      ? data.sectionOrder.sidebarColumn
      : effectiveOrder.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebar = hasPageSidebarContent(data, sidebarOrder);

  // Split name for playful two-tone styling (e.g. "Laura Bennet")
  const nameParts = (personalInfo?.fullName || 'Your Name').split(' ');
  const firstName = nameParts[0] || 'Your';
  const lastName = nameParts.slice(1).join(' ') || 'Name';

  const renderSectionCard = (
    title: string,
    pillBg: string,
    pillText: string,
    cardBorder: string,
    cardBg: string,
    children: React.ReactNode,
    icon?: React.ReactNode
  ) => (
    <div
      className={`rounded-2xl border-2 border-dashed ${cardBorder} ${cardBg} p-3.5 relative overflow-hidden transition-all shadow-2xs`}
    >
      <div
        data-ghost-section-title="true"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-2.5 shadow-2xs"
        style={{ backgroundColor: pillBg, color: pillText }}
      >
        {icon}
        <span>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );

  const renderSection = (secId: ResumeSectionId, column: 'main' | 'sidebar') => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionCard(
              'About Me',
              '#e0e7ff',
              '#3730a3',
              'border-indigo-300',
              'bg-indigo-50/30',
              <div data-ghost-item="summary-0" className="text-[11.5px] leading-relaxed text-slate-700">
                <RichText content={personalInfo.summary} />
              </div>
            )}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionCard(
              'Education',
              '#0f172a',
              '#ffffff',
              'border-emerald-300',
              'bg-emerald-50/50',
              <div className={itemSpaceClass}>
                {education.map((edu) => (
                  <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="font-bold text-[12px] text-slate-900 leading-snug">
                        {edu.degree}
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-800">
                        {edu.school} {edu.graduationDate && <span className="text-slate-500 font-normal">| {edu.graduationDate}</span>}
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[11px] pl-2 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionCard(
              'Work Experience',
              themeColor,
              '#ffffff',
              'border-rose-300',
              'bg-rose-50/30',
              <div className={itemSpaceClass}>
                {experience.map((exp) => (
                  <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="flex flex-row items-baseline justify-between gap-1">
                        <span className="font-bold text-[12px] text-slate-900">{exp.role}</span>
                        <span className="text-[10px] font-bold text-rose-600 shrink-0">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 mb-1">
                        {exp.company}
                        {exp.location && <span className="text-slate-400"> • {exp.location}</span>}
                      </div>
                    </div>
                    <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[11px] pl-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionCard(
              'Skills & Talents',
              '#facc15',
              '#854d0e',
              'border-amber-300',
              'bg-amber-50/40',
              <div className="space-y-2">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} data-ghost-item={`skill-${idx}`}>
                    {skillGroup.category && (
                      <div className="text-[11px] font-bold text-amber-900 mb-1">
                        {skillGroup.category}:
                      </div>
                    )}
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                      {skillGroup.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionCard(
              'Projects & Creations',
              '#38bdf8',
              '#0369a1',
              'border-sky-300',
              'bg-sky-50/30',
              <div className={itemSpaceClass}>
                {projects.map((proj) => (
                  <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[12px] text-slate-900">{proj.title}</span>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-sky-600 hover:text-sky-700">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="text-[10.5px] text-slate-500 font-medium mb-1">{proj.technologies.join(', ')}</div>
                      )}
                    </div>
                    <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[11px] pl-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" data-ghost-section="achievements" className={sectionMarginClass}>
            {renderSectionCard(
              'Achievements',
              '#f43f5e',
              '#ffffff',
              'border-purple-300',
              'bg-purple-50/30',
              <div className="space-y-1.5 text-[11px] text-slate-700">
                {achievements.map((ach) => (
                  <div key={ach.id} data-ghost-item={ach.id} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">•</span>
                    <div>
                      <span className="font-semibold text-slate-900">{ach.title}</span>
                      {ach.description && <span className="text-slate-600"> — {ach.description}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'volunteer':
        if (!volunteer || volunteer.length === 0) return null;
        return (
          <div key="volunteer" data-ghost-section="volunteer" className={sectionMarginClass}>
            {renderSectionCard(
              'Volunteer Experience',
              '#14b8a6',
              '#ffffff',
              'border-teal-300',
              'bg-teal-50/40',
              <div className={itemSpaceClass}>
                {volunteer.map((vol) => (
                  <div key={vol.id} data-ghost-item={vol.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="font-bold text-[12px] text-slate-900">{vol.role}</div>
                      <div className="text-[10.5px] font-semibold text-teal-700 mb-1">{vol.organization}</div>
                    </div>
                    <ResumeHighlights highlights={vol.highlights} className="text-slate-700 text-[11px] pl-2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionCard(
              'Languages',
              '#a855f7',
              '#ffffff',
              'border-purple-300',
              'bg-purple-50/30',
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {languages.map((lang, idx) => (
                  <div key={idx} data-ghost-item={`lang-${idx}`} className="flex justify-between items-center bg-white/70 px-2 py-1 rounded-lg border border-purple-100">
                    <span className="font-bold text-slate-800">{lang.language}</span>
                    <span className="text-[10px] text-purple-700 font-semibold">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(t: string) =>
                renderSectionCard(t, '#64748b', '#ffffff', 'border-slate-300', 'bg-slate-50', null)
              }
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] box-border bg-[#fffdfa] text-slate-800 relative font-sans ${paddingClass} overflow-hidden flex flex-col justify-between`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #f1f5f9 1px, transparent 1px),
          linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Decorative Pastel Background Doodles */}
      <div className="absolute top-0 left-0 w-28 h-28 rounded-br-full bg-amber-200/50 pointer-events-none -z-0" />
      <div className="absolute top-12 right-10 w-24 h-24 rounded-full bg-teal-100/60 blur-xl pointer-events-none -z-0" />
      <div className="absolute bottom-4 right-4 w-32 h-16 bg-rose-200/40 rounded-tl-3xl pointer-events-none -z-0" />

      <div>
        {/* Running Header for Pages 2+ */}
        {data.pageNumber && data.pageNumber > 1 && (
          <div className="relative z-10 flex items-center justify-between pb-3 mb-5 border-b border-rose-200 text-xs font-bold text-slate-600">
            <span className="text-rose-500 font-extrabold">{personalInfo?.fullName || 'Laura Bennet'}</span>
            <span>
              Page {data.pageNumber} of {data.totalPages || 2}
            </span>
          </div>
        )}

        {/* Header Container (Page 1) */}
        {isPage1 && (
          <header data-ghost-header="true" className="relative z-10 mb-5">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
              I AM
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-4xl font-black text-rose-500 tracking-tight">
                {firstName}
              </span>
              <span className="text-4xl font-serif italic font-bold text-slate-900 bg-indigo-100/80 px-3 py-0.5 rounded-2xl shadow-2xs">
                {lastName}
              </span>
            </div>
            {personalInfo?.jobTitle && (
              <div className="text-xs font-bold text-slate-700 tracking-wide mt-1">
                {personalInfo.jobTitle}
              </div>
            )}
          </div>

          {/* Avatar or "Hi!" speech bubble */}
          <div className="flex items-center gap-3 self-auto">
            <div className="relative">
              <span className="absolute -top-3 -left-3 bg-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs -rotate-12">
                Hi!
              </span>
              {personalInfo?.avatarUrl ? (
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md"
                  style={{ backgroundColor: themeColor }}
                >
                  {firstName[0]}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Yellow Contact Capsule */}
        <div className="mt-4 bg-amber-100/90 border border-amber-300 rounded-2xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-slate-800 shadow-2xs">
          {personalInfo?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5 text-amber-800" />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
            </div>
          )}
        </div>
      </header>
        )}

        {/* Main Grid: Two-Column Layout with Charming Cards */}
        <div className={`relative z-10 grid ${hasSidebar ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
          {/* Left Column (Sidebar) */}
          {hasSidebar && (
            <div data-ghost-col="sidebar" className="space-y-4">
              {sidebarOrder.map((secId) => renderSection(secId, 'sidebar'))}
            </div>
          )}

          {/* Right Column (Main) */}
          <div data-ghost-col="main" className="space-y-4">
            {mainOrder.map((secId) => renderSection(secId, 'main'))}
          </div>
        </div>
      </div>
    </div>
  );
};

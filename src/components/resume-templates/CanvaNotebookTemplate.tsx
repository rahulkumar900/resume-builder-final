'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
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

export const CanvaNotebookTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#f43f5e', // pink bubble accent
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
    'canvanotebook',
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

  // Spiral Binder Rings Mockup
  const renderSpiralRings = () => (
    <div className="flex items-center justify-between px-6 py-2 -mx-6 bg-slate-100/60 border-y border-slate-200/90 relative z-20 overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-3.5 h-6 bg-linear-to-b from-slate-300 via-white to-slate-400 rounded-full border border-slate-400 shadow-xs" />
          <div className="w-2 h-2 rounded-full bg-slate-800 -mt-1 shadow-inner" />
        </div>
      ))}
    </div>
  );

  const renderStickyCard = (
    title: string,
    tabBg: string,
    tabColor: string,
    cardBg: string,
    cardBorder: string,
    foldColor: string | null,
    children: React.ReactNode
  ) => (
    <div
      className={`rounded-xl border ${cardBorder} ${cardBg} p-4 relative shadow-xs ${
        foldColor ? 'pr-6 pb-6' : ''
      }`}
    >
      {/* Ribbon / Tab Header */}
      <div className="flex items-center mb-3">
        <div
          data-ghost-section-title="true"
          className="inline-flex items-center px-3.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider shadow-2xs"
          style={{ backgroundColor: tabBg, color: tabColor }}
        >
          {title}
        </div>
      </div>

      <div>{children}</div>

      {/* Realistic Dog-Ear Corner Fold if specified */}
      {foldColor && (
        <div
          className="absolute bottom-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-transparent border-l-transparent pointer-events-none drop-shadow-xs"
          style={{
            borderBottom: `20px solid #ffffff`,
            borderRight: `20px solid ${foldColor}`,
          }}
        />
      )}
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderStickyCard(
              'about me',
              '#38bdf8',
              '#ffffff',
              'bg-[#fdf2f8]', // soft pink lined memo
              'border-pink-200',
              null,
              <div
                data-ghost-item="summary-0"
                className="text-[11.5px] leading-relaxed text-slate-700 font-sans"
              >
                <RichText content={personalInfo.summary} />
              </div>
            )}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderStickyCard(
              'education',
              '#f43f5e',
              '#ffffff',
              'bg-[#fed7aa]', // orange sticky note
              'border-amber-300',
              '#d97706', // 3D folded corner
              <div className={itemSpaceClass}>
                {education.map((edu) => (
                  <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="font-bold text-[12px] text-slate-900 leading-tight">
                        {edu.degree}
                      </div>
                      <div className="text-[11px] font-semibold text-amber-900">
                        {edu.school} {edu.graduationDate && <span className="font-normal text-slate-600">/ {edu.graduationDate}</span>}
                      </div>
                    </div>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ResumeHighlights highlights={edu.highlights} className="text-slate-800 text-[11px] pl-2 mt-1" />
                    )}
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
            {renderStickyCard(
              'skills',
              '#0369a1',
              '#ffffff',
              'bg-[#e0f2fe]', // baby blue memo
              'border-sky-200',
              null,
              <div className="space-y-2">
                {skills.map((skillGroup, idx) => (
                  <div key={idx} data-ghost-item={`skill-${idx}`}>
                    {skillGroup.category && (
                      <div className="text-[11px] font-bold text-sky-950 mb-1">
                        {skillGroup.category}:
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="bg-white/80 text-sky-900 px-2 py-0.5 rounded text-[11px] font-medium border border-sky-200 shadow-2xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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
            {renderStickyCard(
              'experience',
              '#86efac',
              '#14532d',
              'bg-[#ecfdf5]', // soft green legal pad
              'border-emerald-200',
              '#10b981', // bottom-right fold
              <div className={itemSpaceClass}>
                {experience.map((exp) => (
                  <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="flex flex-row items-baseline justify-between gap-1">
                        <span className="font-bold text-[12.5px] text-slate-900">{exp.role}</span>
                        <span className="text-[10px] font-bold text-emerald-800 shrink-0">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 mb-1">
                        {exp.company}
                        {exp.location && <span className="text-slate-400 font-normal"> • {exp.location}</span>}
                      </div>
                    </div>
                    <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[11px] pl-2" />
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
            {renderStickyCard(
              'projects',
              '#c084fc',
              '#ffffff',
              'bg-[#faf5ff]',
              'border-purple-200',
              '#9333ea',
              <div className={itemSpaceClass}>
                {projects.map((proj) => (
                  <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                    <div data-ghost-item-header="true">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[12px] text-slate-900">{proj.title}</span>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-purple-600">
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

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(t: string) =>
                renderStickyCard(t.toLowerCase(), '#64748b', '#ffffff', 'bg-white', 'border-slate-300', null, null)
              }
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] box-border bg-[#f8fafc] text-slate-800 relative font-sans ${paddingClass} overflow-hidden flex flex-col justify-between`}
      style={{
        backgroundImage: `
          linear-gradient(to right, #e2e8f0 1px, transparent 1px),
          linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
        `,
        backgroundSize: '18px 18px',
      }}
    >
      <div>
        {/* Running Header for Pages 2+ */}
        {data.pageNumber && data.pageNumber > 1 && (
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-200 text-xs font-black text-rose-500">
            <span>{personalInfo?.fullName || 'Olivia Wilson'}</span>
            <span className="text-slate-500 font-semibold">
              Page {data.pageNumber} of {data.totalPages || 2}
            </span>
          </div>
        )}

        {/* Sky Blue Header with Floral & Sticky Accents (Page 1) */}
        {isPage1 && (
          <>
            <header data-ghost-header="true" className="bg-sky-100/90 -mt-6 -mx-6 p-6 border-b border-sky-200 relative overflow-hidden">
              {/* Sticky Note Badge for Job Title in Top-Right */}
              {personalInfo?.jobTitle && (
                <div className="absolute top-4 right-4 bg-amber-200 border border-amber-300 px-3 py-1 text-slate-900 font-bold text-xs uppercase tracking-wider rounded shadow-xs rotate-2">
                  {personalInfo.jobTitle}
                </div>
              )}

              <div className="flex flex-row items-start gap-4">
                {/* Avatar with Scalloped / Stamp Frame */}
                <div className="relative shrink-0">
                  {personalInfo?.avatarUrl ? (
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.fullName}
                      className="w-24 h-24 rounded-2xl object-cover border-4 border-sky-300 shadow-md p-1 bg-white"
                    />
                  ) : (
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md border-4 border-sky-300 p-1 bg-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {personalInfo?.fullName?.[0] || 'O'}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-left flex-1 min-w-0">
                  {/* Bubble Outline Name with Drop Shadow */}
                  <h1
                    className="text-4xl font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_#f43f5e]"
                    style={{
                      WebkitTextStroke: '2px #f43f5e',
                      color: '#ffffff',
                    }}
                  >
                    {personalInfo?.fullName || 'Olivia Wilson'}
                  </h1>

                  {/* Floating White Contact Capsule */}
                  <div className="inline-flex flex-wrap items-center gap-3 bg-white/95 px-3.5 py-1.5 rounded-full border border-sky-200 shadow-xs text-[11px] font-semibold text-slate-700">
                    {personalInfo?.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-rose-500" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo?.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-rose-500" />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo?.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo?.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-rose-500" />
                        <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Realistic Spiral Binder Wire Holes Divider */}
            {renderSpiralRings()}
          </>
        )}

      {/* Lower Notebook Page: 42% Sidebar / 58% Main Sticky Cards */}
      <div className={`grid ${hasSidebar ? 'grid-cols-12 gap-4' : 'grid-cols-1'} mt-4`}>
        {/* Left Column (42%) */}
        {hasSidebar && (
          <div data-ghost-col="sidebar" className="col-span-5 space-y-4">
            {sidebarOrder.map((secId) => renderSection(secId))}
          </div>
        )}

        {/* Right Column (58%) */}
        <div data-ghost-col="main" className={`${hasSidebar ? 'col-span-7' : 'col-span-12'} space-y-4`}>
          {mainOrder.map((secId) => renderSection(secId))}
        </div>
      </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Asterisk } from 'lucide-react';
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

export const CanvaEditorialTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    volunteer = [],
    themeColor = '#1035ac', // signature electric royal blue
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3.5' : spacing === 'relaxed' ? 'mb-5.5' : 'mb-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';
  const paddingClass =
    spacing === 'compact' ? 'p-6' : spacing === 'relaxed' ? 'p-9' : 'p-7';

  const effectiveOrder = getEffectiveSectionOrder(
    'canvaeditorial',
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

  // Split name for stacked editorial title (e.g., ESTELLE / DARCY)
  const nameParts = (personalInfo?.fullName || 'ESTELLE DARCY').toUpperCase().split(' ');
  const firstWord = nameParts[0] || 'ESTELLE';
  const restWords = nameParts.slice(1).join(' ') || 'DARCY';

  const renderEditorialSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="flex items-center gap-2 mb-2 pb-1">
      <div        className="text-[13px] font-black uppercase tracking-wider"
        style={{ color: themeColor }}
      >
        {title}
      </div>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            <div
              data-ghost-item="summary-0"
              className="text-[11.5px] leading-relaxed text-slate-700 font-sans border-b border-slate-300 pb-3"
            >
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderEditorialSectionHeader('EDUCATION')}
            <div className={`${itemSpaceClass} border-b border-slate-300 pb-3`}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12px] text-slate-900 leading-snug">
                      {edu.degree}
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {edu.school} {edu.graduationDate && <span>| {edu.graduationDate}</span>}
                    </div>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="text-slate-700 text-[11px] pl-2 mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderEditorialSectionHeader('EXPERIENCE')}
            <div className={`${itemSpaceClass} border-b border-slate-300 pb-3`}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid space-y-1">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12.5px] text-slate-900">{exp.role}</div>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <ResumeHighlights
                    highlights={exp.highlights}
                    className="text-slate-700 text-[11px] pl-2"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderEditorialSectionHeader('CORE SKILLS')}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-slate-300 pb-3">
              {skills
                .flatMap((group) => group.items)
                .map((item, idx) => (
                  <div
                    key={idx}
                    data-ghost-item={`skill-${idx}`}
                    className="text-[11px] text-slate-700 flex items-center gap-1.5"
                  >
                    <span className="text-[#e1523d] font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderEditorialSectionHeader('LANGUAGES')}
            <div className="grid grid-cols-2 gap-2 border-b border-slate-300 pb-3 text-[11px] text-slate-700">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  data-ghost-item={lang.id}
                  className="flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900">{lang.language}</span>
                  <span className="text-slate-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderEditorialSectionHeader('CERTIFICATIONS')}
            <div className={`${itemSpaceClass} border-b border-slate-300 pb-3`}>
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-[12px] text-slate-900">
                    {cert.name}
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    {cert.issuer} {cert.date && <span>| {cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderEditorialSectionHeader('PROJECTS')}
            <div className={`${itemSpaceClass} border-b border-slate-300 pb-3`}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-1">
                  <div data-ghost-item-header="true" className="flex items-center justify-between gap-1">
                    <div className="font-bold text-[12px] text-slate-900">{proj.title}</div>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[10.5px] text-slate-500 font-medium">
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="text-slate-700 text-[11px] pl-2"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'volunteer':
        if (!volunteer || volunteer.length === 0) return null;
        return (
          <div key="volunteer" data-ghost-section="volunteer" className={sectionMarginClass}>
            {renderEditorialSectionHeader('VOLUNTEER')}
            <div className={`${itemSpaceClass} border-b border-slate-300 pb-3`}>
              {volunteer.map((vol) => (
                <div key={vol.id} data-ghost-item={vol.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-[12px] text-slate-900">
                    {vol.role} — <span className="font-normal text-slate-600">{vol.organization}</span>
                  </div>
                  <ResumeHighlights
                    highlights={vol.highlights}
                    className="text-slate-700 text-[11px] pl-2"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(t: string) => renderEditorialSectionHeader(t.toUpperCase())}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] box-border bg-[#faf7f2] text-slate-900 relative font-sans ${paddingClass} flex flex-col justify-between`}
    >
      <div>
        {/* Running Header for Pages 2+ */}
        {data.pageNumber && data.pageNumber > 1 && (
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-300 text-xs font-black uppercase tracking-wider text-slate-500">
            <span style={{ color: themeColor }}>{personalInfo?.fullName || 'ESTELLE DARCY'}</span>
            <span>
              Page {data.pageNumber} of {data.totalPages || 2}
            </span>
          </div>
        )}

        {/* Page 1 Hero Header: High-Fashion Headline & Orange Asterisk */}
        {isPage1 && (
          <header data-ghost-header="true" className="mb-6 border-b border-slate-300 pb-5">
            <div className="flex items-start justify-between gap-6">
              {/* Massive Editorial Name */}
              <div className="space-y-0">
                <div                  className="text-5xl font-black uppercase tracking-tight leading-[0.9]"
                  style={{ color: themeColor }}
                >
                  {firstWord}
                </div>
                <div                  className="text-5xl font-black uppercase tracking-tight leading-[0.9]"
                  style={{ color: themeColor }}
                >
                  {restWords}
                </div>
              </div>

              {/* Top Right: Orange Asterisk Flower Icon + Bold Job Title */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-2xs"
                  style={{ backgroundColor: '#e1523d' }}
                >
                  <Asterisk className="w-6 h-6 stroke-[3]" />
                </div>

                {personalInfo?.jobTitle && (
                  <div
                    className="text-sm font-black uppercase tracking-wider text-right max-w-[170px] leading-tight"
                    style={{ color: themeColor }}
                  >
                    {personalInfo.jobTitle}
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Two-Column Editorial Grid: Left Sidebar 45% / Right Main 55% */}
        <div
          className={`grid ${
            hasSidebar ? 'grid-cols-12 gap-7' : 'grid-cols-1'
          }`}
        >
          {/* Left Column (Sidebar, 45% - Contacts, Summary, Education) */}
          {hasSidebar && (
            <div data-ghost-col="sidebar" className="col-span-5 space-y-4">
              {/* Contact Details with Round Coral Badges (Page 1) */}
              {isPage1 && (
                <div className="space-y-2 border-b border-slate-300 pb-3.5 text-[11px] font-medium text-slate-700">
                  {personalInfo?.phone && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e1523d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Phone className="w-2.5 h-2.5" />
                      </div>
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo?.email && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e1523d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Mail className="w-2.5 h-2.5" />
                      </div>
                      <span className="break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo?.website && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e1523d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Globe className="w-2.5 h-2.5" />
                      </div>
                      <span className="break-all">
                        {personalInfo.website.replace(/^https?:\/\//, '')}
                      </span>
                    </div>
                  )}
                  {personalInfo?.location && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#e1523d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <MapPin className="w-2.5 h-2.5" />
                      </div>
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Sidebar Sections */}
              {sidebarOrder.map((secId) => renderSection(secId))}
            </div>
          )}

          {/* Right Column (Main, 55% - Portrait, Experience, Core Skills, Projects) */}
          <div
            data-ghost-col="main"
            className={`${hasSidebar ? 'col-span-7' : 'col-span-12'} space-y-4`}
          >
            {/* Portrait Photograph on Page 1 (Column-Internal Header) */}
            {isPage1 && (
              <div
                data-ghost-header="true"
                className="overflow-hidden rounded-md border border-slate-300 shadow-sm mb-4"
              >
                {personalInfo?.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-64 flex flex-col items-center justify-center font-black text-4xl text-white shadow-inner"
                    style={{ backgroundColor: themeColor }}
                  >
                    <span>{firstWord[0]}</span>
                  </div>
                )}
              </div>
            )}

            {/* Main Sections */}
            {mainOrder.map((secId) => renderSection(secId))}
          </div>
        </div>
      </div>
    </div>
  );
};

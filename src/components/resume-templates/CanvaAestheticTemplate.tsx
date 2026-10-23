'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Sparkles, Compass } from 'lucide-react';
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

export const CanvaAestheticTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    volunteer = [],
    themeColor = '#c2410c', // terracotta boho
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3.5' : spacing === 'relaxed' ? 'mb-5.5' : 'mb-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2.5' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const paddingClass =
    spacing === 'compact' ? 'p-6' : spacing === 'relaxed' ? 'p-9' : 'p-7';

  const effectiveOrder = getEffectiveSectionOrder(
    'canvaaesthetic',
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

  const renderAestheticHeader = (title: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2 pb-1 border-b border-orange-200"
    >
      <div        className="text-[12px] font-serif uppercase tracking-[0.2em] font-bold"
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
            {renderAestheticHeader('PROFILE')}
            <div
              data-ghost-item="summary-0"
              className="text-[11.5px] leading-relaxed text-slate-700 font-sans italic"
            >
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderAestheticHeader('EDUCATION')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12px] text-slate-900 leading-snug">
                      {edu.degree}
                    </div>
                    <div className="text-[11px] font-medium text-orange-950">
                      {edu.school}{' '}
                      {edu.graduationDate && (
                        <span className="text-slate-500 font-normal">| {edu.graduationDate}</span>
                      )}
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
            {renderAestheticHeader('EXPERIENCE')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid space-y-1">
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-bold text-[12.5px] text-slate-900">{exp.role}</div>
                      {(exp.startDate || exp.endDate) && (
                        <div className="text-[10.5px] font-serif italic text-orange-800">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </div>
                      )}
                    </div>
                    <div className="text-[11.5px] font-medium text-orange-950">{exp.company}</div>
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
            {renderAestheticHeader('SKILLS')}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills
                .flatMap((group) => group.items)
                .map((item, idx) => (
                  <span
                    key={idx}
                    data-ghost-item={`skill-${idx}`}
                    className="text-[10px] font-medium tracking-wide bg-orange-100/70 border border-orange-200/80 text-orange-950 px-2.5 py-0.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderAestheticHeader('LANGUAGES')}
            <div className="space-y-1.5 text-[11px]">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  data-ghost-item={lang.id}
                  className="flex items-center justify-between text-slate-700"
                >
                  <span className="font-medium text-slate-900">{lang.language}</span>
                  <span className="italic text-slate-500 font-serif">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderAestheticHeader('CERTIFICATIONS')}
            <div className={itemSpaceClass}>
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
            {renderAestheticHeader('KEY PROJECTS')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-1">
                  <div data-ghost-item-header="true" className="flex items-center justify-between gap-1">
                    <div className="font-bold text-[12px] text-slate-900">{proj.title}</div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[10px] text-orange-800/80 font-serif italic">
                      {proj.technologies.join(' · ')}
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
            {renderAestheticHeader('VOLUNTEER')}
            <div className={itemSpaceClass}>
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
              renderHeader={(t: string) => renderAestheticHeader(t.toUpperCase())}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] box-border bg-[#faf8f5] text-slate-800 font-sans ${paddingClass} relative overflow-hidden flex flex-col justify-between`}
    >
      <div>
        {/* Running Header for Pages 2+ */}
        {data.pageNumber && data.pageNumber > 1 && (
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-orange-200 text-xs font-serif uppercase tracking-widest text-orange-900/70">
            <span className="font-semibold">{personalInfo?.fullName || 'Clara Sterling'}</span>
            <span>
              Page {data.pageNumber} of {data.totalPages || 2}
            </span>
          </div>
        )}

        {/* Page 1 Header with Architectural Arch Photo & Serif Branding */}
        {isPage1 && (
          <header data-ghost-header="true" className="mb-6 pb-5 border-b border-orange-200/80">
            <div className="flex flex-row items-start justify-between gap-6">
              {/* Left Text Identity */}
              <div className="space-y-2 text-left flex-1">
                <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-orange-800 font-bold">
                  CURRICULUM VITAE
                </div>
                <div className="text-4xl font-serif tracking-tight text-slate-900 leading-tight">
                  {personalInfo?.fullName || 'Clara Sterling'}
                </div>
                {personalInfo?.jobTitle && (
                  <div
                    className="text-sm font-sans uppercase tracking-[0.15em] font-semibold"
                    style={{ color: themeColor }}
                  >
                    {personalInfo.jobTitle}
                  </div>
                )}

                {/* Clean Contact Details List */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-slate-600 pt-2 font-medium">
                  {personalInfo?.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-orange-700" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo?.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-orange-700" />
                      <span className="break-all">{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo?.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-orange-700" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                  {personalInfo?.website && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-orange-700" />
                      <span className="break-all">
                        {personalInfo.website.replace(/^https?:\/\//, '')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Architectural Arch Photo Window */}
              <div className="shrink-0">
                <div className="w-28 h-36 rounded-t-[55px] rounded-b-lg overflow-hidden border-2 border-orange-300 p-0.5 bg-white shadow-md">
                  {personalInfo?.avatarUrl ? (
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.fullName}
                      className="w-full h-full object-cover rounded-t-[50px] rounded-b-md"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded-t-[50px] rounded-b-md flex items-center justify-center font-serif text-3xl text-white shadow-inner"
                      style={{ backgroundColor: themeColor }}
                    >
                      {personalInfo?.fullName?.[0] || 'C'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Two-Column Layout (Sidebar 35% / Main 65%) */}
        <div
          className={`grid ${
            hasSidebar ? 'grid-cols-12 gap-6' : 'grid-cols-1'
          }`}
        >
          {/* Left Sidebar (35%) */}
          {hasSidebar && (
            <div data-ghost-col="sidebar" className="col-span-4 space-y-4">
              {sidebarOrder.map((secId) => renderSection(secId))}
            </div>
          )}

          {/* Right Main (65%) */}
          <div
            data-ghost-col="main"
            className={`${hasSidebar ? 'col-span-8' : 'col-span-12'} space-y-4`}
          >
            {mainOrder.map((secId) => renderSection(secId))}
          </div>
        </div>
      </div>
    </div>
  );
};

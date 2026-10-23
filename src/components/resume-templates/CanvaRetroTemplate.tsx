'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Sparkles, Star } from 'lucide-react';
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

export const CanvaRetroTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    volunteer = [],
    themeColor = '#2e1065', // deep retro purple
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3' : spacing === 'relaxed' ? 'mb-5' : 'mb-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';
  const paddingClass =
    spacing === 'compact' ? 'p-5' : spacing === 'relaxed' ? 'p-7' : 'p-6';

  const effectiveOrder = getEffectiveSectionOrder(
    'canvaretro',
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

  // Retro Section Header with playful flower / starburst icon
  const renderRetroHeader = (title: string, color = '#2e1065') => (
    <div data-ghost-section-title="true" className="flex items-center gap-1.5 mb-2.5">
      <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-amber-900 shadow-2xs">
        <Star className="w-2.5 h-2.5 fill-amber-900 text-amber-900" />
      </div>
      <div        className="text-[13px] font-black uppercase tracking-wider font-serif"
        style={{ color }}
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
              className="text-[11.5px] leading-relaxed text-slate-700 font-sans"
            >
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderRetroHeader('EDUCATION', '#2e1065')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  data-ghost-item={edu.id}
                  className="break-inside-avoid relative pl-3 border-l-2 border-orange-400"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-orange-500" />
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12px] text-slate-900 leading-snug">
                      {edu.degree}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-1">
                      {edu.school}
                    </div>
                    {edu.graduationDate && (
                      <span className="inline-block bg-orange-500 text-white font-bold text-[9.5px] px-2 py-0.5 rounded-full shadow-2xs">
                        {edu.graduationDate}
                      </span>
                    )}
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
            {renderRetroHeader('EXPERIENCE', '#2e1065')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  data-ghost-item={exp.id}
                  className="break-inside-avoid relative pl-3 border-l-2 border-purple-400 space-y-1"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#2e1065]" />
                  <div data-ghost-item-header="true">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-[12.5px] text-[#2e1065]">{exp.role}</div>
                      {(exp.startDate || exp.endDate) && (
                        <span className="shrink-0 bg-pink-500 text-white font-bold text-[9.5px] px-2.5 py-0.5 rounded-full shadow-2xs">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600">{exp.company}</div>
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
            <div className="rounded-2xl border border-purple-200 bg-white p-3.5 shadow-2xs relative mt-3">
              {/* Retro Header Pill atop card */}
              <div
                data-ghost-section-title="true"
                className="absolute -top-3 left-4 bg-[#2e1065] text-white font-serif font-black text-[11px] uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs"
              >
                SKILLS
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {skills
                  .flatMap((group) => group.items)
                  .map((item, idx) => {
                    const badgeStyles = [
                      'bg-amber-400 text-amber-950',
                      'border-2 border-slate-700 text-slate-800 bg-white',
                      'bg-orange-500 text-white',
                      'bg-pink-500 text-white',
                      'bg-[#2e1065] text-white',
                    ];
                    const chosenStyle = badgeStyles[idx % badgeStyles.length];

                    return (
                      <span
                        key={idx}
                        data-ghost-item={`skill-${idx}`}
                        className={`text-[10px] font-bold px-3 py-1 rounded-full shadow-2xs transition-transform ${chosenStyle}`}
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderRetroHeader('LANGUAGE', '#2e1065')}
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} data-ghost-item={lang.id} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-800">
                    <span>{lang.language}</span>
                    <span className="text-slate-500">{lang.proficiency}</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-pink-500 h-1.5 rounded-full"
                      style={{
                        width:
                          lang.proficiency?.toLowerCase() === 'native' ||
                          lang.proficiency?.toLowerCase() === 'fluent'
                            ? '95%'
                            : lang.proficiency?.toLowerCase() === 'advanced'
                            ? '80%'
                            : '60%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderRetroHeader('CERTIFICATIONS', '#2e1065')}
            <div className={itemSpaceClass}>
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-[12px] text-slate-900">
                    {cert.name}
                  </div>
                  <div className="text-[11px] text-slate-600">
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
            {renderRetroHeader('PROJECTS', '#2e1065')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-1">
                  <div data-ghost-item-header="true" className="flex items-center justify-between gap-1">
                    <div className="font-bold text-[12px] text-[#2e1065]">{proj.title}</div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-900 text-[9.5px] font-bold px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
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
            {renderRetroHeader('VOLUNTEER', '#2e1065')}
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
              renderHeader={(t: string) => renderRetroHeader(t.toUpperCase())}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] box-border bg-[#2e1065] p-3.5 text-slate-800 font-sans flex flex-col justify-between">
      {/* Outer Thick Bordered Rounded Poster Canvas */}
      <div
        className={`w-full flex-1 box-border bg-[#fffdf5] rounded-[28px] ${paddingClass} relative overflow-hidden flex flex-col justify-between shadow-2xl`}
      >
        <div>
          {/* Running Header for Pages 2+ */}
          {data.pageNumber && data.pageNumber > 1 && (
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-200/80 text-xs font-serif font-black text-[#2e1065]">
              <span className="tracking-wide">{personalInfo?.fullName || 'Rachelle Beaudry'}</span>
              <span>
                Page {data.pageNumber} of {data.totalPages || 2}
              </span>
            </div>
          )}

          {/* Header: Circular Portrait + Retro Typography Name + Summary (Page 1) */}
          {isPage1 && (
            <header data-ghost-header="true" className="mb-5 pb-4 border-b border-purple-200/70">
              <div className="flex flex-row items-start gap-5">
                {/* Circular Avatar with Dashed Accent Ring & Playful Accents */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 rounded-full border-4 border-dashed border-[#2e1065] p-1 shadow-md bg-white">
                    {personalInfo?.avatarUrl ? (
                      <img
                        src={personalInfo.avatarUrl}
                        alt={personalInfo.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center font-black text-3xl text-white font-serif"
                        style={{ backgroundColor: themeColor }}
                      >
                        {personalInfo?.fullName?.[0] || 'R'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Retro Display Name & Professional Summary */}
                <div className="space-y-2 text-left flex-1 min-w-0">
                  <div className="relative inline-block">
                    <div className="text-4xl font-black font-serif text-[#2e1065] tracking-tight leading-none">
                      {personalInfo?.fullName || 'Rachelle Beaudry'}
                    </div>
                    <div className="absolute -top-3 -right-6 text-amber-500">
                      <Sparkles className="w-5 h-5 fill-amber-400" />
                    </div>
                  </div>

                  {personalInfo?.summary && (
                    <div className="text-[11.5px] leading-relaxed text-slate-700 max-w-xl font-sans">
                      <RichText content={personalInfo.summary} />
                    </div>
                  )}
                </div>
              </div>
            </header>
          )}

          {/* Two-Column Layout: Left Sidebar (40%) / Right Main (60%) */}
          <div
            className={`grid ${
              hasSidebar ? 'grid-cols-12 gap-5' : 'grid-cols-1'
            }`}
          >
            {/* Left Column (40% - Sidebar: Job Badge, Contacts Card, Education, Language) */}
            {hasSidebar && (
              <div data-ghost-col="sidebar" className="col-span-5 space-y-4">
                {/* Job Title Badge (Page 1) */}
                {isPage1 && personalInfo?.jobTitle && (
                  <div className="inline-block bg-[#2e1065] text-white font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
                    {personalInfo.jobTitle}
                  </div>
                )}

                {/* Contact Details Card (Page 1) */}
                {isPage1 && (
                  <div className="rounded-2xl border border-purple-200/80 bg-white p-3.5 space-y-2.5 shadow-2xs text-[11px] font-medium text-slate-700 relative overflow-hidden">
                    {/* Decorative punch holes on the left */}
                    <div className="absolute left-1.5 top-3 bottom-3 flex flex-col justify-between">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#2e1065]/20" />
                      ))}
                    </div>
                    <div className="pl-3.5 space-y-2">
                      {personalInfo?.phone && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#2e1065] text-white flex items-center justify-center shrink-0">
                            <Phone className="w-2.5 h-2.5" />
                          </div>
                          <div>
                            <div className="text-[9.5px] text-slate-400 font-bold uppercase">
                              Phone Number
                            </div>
                            <div>{personalInfo.phone}</div>
                          </div>
                        </div>
                      )}
                      {personalInfo?.website && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                            <Globe className="w-2.5 h-2.5" />
                          </div>
                          <div>
                            <div className="text-[9.5px] text-slate-400 font-bold uppercase">
                              Website
                            </div>
                            <div className="break-all">
                              {personalInfo.website.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                        </div>
                      )}
                      {personalInfo?.email && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0">
                            <Mail className="w-2.5 h-2.5" />
                          </div>
                          <div>
                            <div className="text-[9.5px] text-slate-400 font-bold uppercase">
                              Email Address
                            </div>
                            <div className="break-all">{personalInfo.email}</div>
                          </div>
                        </div>
                      )}
                      {personalInfo?.location && (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                            <MapPin className="w-2.5 h-2.5" />
                          </div>
                          <div>
                            <div className="text-[9.5px] text-slate-400 font-bold uppercase">
                              Location
                            </div>
                            <div>{personalInfo.location}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Left Sections (Education, Languages, etc.) */}
                {sidebarOrder
                  .filter((sec) => sec !== 'summary')
                  .map((secId) => renderSection(secId))}
              </div>
            )}

            {/* Right Column (60% - Main: Experience, Skills, Projects) */}
            <div
              data-ghost-col="main"
              className={`${hasSidebar ? 'col-span-7' : 'col-span-12'} space-y-4`}
            >
              {mainOrder
                .filter((sec) => sec !== 'summary')
                .map((secId) => renderSection(secId))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

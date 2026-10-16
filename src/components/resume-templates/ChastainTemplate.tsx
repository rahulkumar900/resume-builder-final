'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Award, BookOpen, Wrench, FolderGit2, Languages as LanguagesIcon } from 'lucide-react';
import { LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  hasPageSidebarContent,
} from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const ChastainTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor, spacing = 'normal' } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'py-5 px-6' : spacing === 'relaxed' ? 'py-7 px-8' : 'py-6 px-7';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary">
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 break-after-avoid">
              Profile
            </h2>
            <div data-ghost-item="summary-0">
              <RichText content={personalInfo.summary} className="text-[13px] text-slate-700 leading-relaxed" />
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education">
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 flex items-center gap-1.5 break-after-avoid">
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Education</span>
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-slate-900 text-[14px]">{edu.degree}</div>
                    <div className="text-slate-700 font-medium">{edu.school}</div>
                    <div className="text-[12px] text-slate-500">{edu.graduationDate}</div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills">
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 flex items-center gap-1.5 break-after-avoid">
              <Wrench className="w-4 h-4 text-slate-500" />
              <span>Key Skills</span>
            </h2>
            <div className={itemSpaceClass}>
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="text-[12px] font-bold text-slate-700 uppercase mb-1">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((it, i) => (
                      <span key={i} data-ghost-bullet={i} className="text-[12px] bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded font-medium border border-slate-200/60">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications">
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 flex items-center gap-1.5 break-after-avoid">
              <Award className="w-4 h-4 text-slate-500" />
              <span>Certificates</span>
            </h2>
            <div className="space-y-2.5">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="text-[12.5px] break-inside-avoid">
                  <span className="font-bold text-slate-800">{c.name}</span>
                  <div className="text-slate-500 text-[11.5px]">{c.issuer} {c.date ? `(${c.date})` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages">
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-1.5 mb-2.5 border-b border-slate-200 flex items-center gap-1.5 break-after-avoid">
              <LanguagesIcon className="w-4 h-4 text-slate-500" />
              <span>Languages</span>
            </h2>
            <div className="space-y-1.5 text-[12.5px]">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between text-slate-700 break-inside-avoid">
                  <span className="font-semibold">{l.language}</span>
                  <span className="text-slate-500 text-[11.5px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Work Experience
            </h2>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-slate-900 text-[14.5px]">{exp.role}</span>
                      <span className="text-[12px] font-bold text-slate-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[13.5px] font-semibold text-slate-700 mb-2">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Key Projects &amp; Initiatives
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-slate-900 text-[14px] mb-1">{p.title}</div>
                  <ResumeHighlights highlights={p.highlights} className="text-slate-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <UniversalSectionRenderer
            key={secId}
            secId={secId}
            data={data}
            renderHeader={(title) => (
              <h2
                data-ghost-section-title="true"
                className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {title}
              </h2>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-800 flex flex-col font-sans text-[13.5px] leading-relaxed box-border">
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className={`w-full ${paddingClass} pb-0 break-inside-avoid`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-slate-500 text-[12px] font-bold tracking-wider uppercase">
            <span style={{ color: themeColor || '#475569' }}>
              {personalInfo.fullName || 'Jane Chastain'} &mdash; {personalInfo.jobTitle || 'Resume'}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              Page {data.pageNumber} of {data.totalPages || 2}
            </span>
          </div>
        </div>
      )}

      {/* Top Gray / Accent Band (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`bg-slate-100 border-b border-slate-200 ${headerPadding} flex flex-col items-center text-center relative break-inside-avoid`}>
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-22 h-22 rounded-full object-cover border-4 border-white shadow-md mb-3"
            />
          ) : (
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md mb-3"
              style={{ backgroundColor: themeColor }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'J'}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase mb-1">
            {personalInfo.fullName || 'Jane Chastain'}
          </h1>
          <p className="text-sm font-bold tracking-widest text-slate-600 uppercase mb-3.5">
            {personalInfo.jobTitle || 'Head of People & Operations'}
          </p>

          {/* Contact info row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-[12.5px] text-slate-600 font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className={`flex-1 grid grid-cols-12 gap-8 ${paddingClass}`}>
        {/* Left Column (Sidebar) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-4 ${sectionSpaceClass} border-r border-slate-100 pr-6`}>
            {sidebarOrder.map((secId) => renderSection(secId))}
          </div>
        )}

        {/* Right Column (Main) */}
        <div
          data-ghost-col="main"
          className={`${hasSidebarContent ? 'col-span-8' : 'col-span-12'} ${sectionSpaceClass}`}
        >
          {mainOrder.map((secId) => renderSection(secId))}
        </div>
      </div>
    </div>
  );
};

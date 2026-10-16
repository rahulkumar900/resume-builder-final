'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  hasPageSidebarContent,
} from '@/lib/templates';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/common/BrandIcons';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const StockholmTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#1e293b',
    spacing = 'normal',
  } = data;

  const sidebarPadding =
    spacing === 'compact' ? 'p-5' : spacing === 'relaxed' ? 'p-8' : 'p-6';
  const mainPadding =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-10' : 'p-8';
  const contentSpacingClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6' : 'space-y-4.5';
  const itemSpacingClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);
  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const showSidebar = isPage1 || hasSidebarContent;

  const renderSidebarSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="space-y-3 break-inside-avoid">
            <h3
              data-ghost-section-title="true"
              className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Skills
            </h3>
            <div className="space-y-3">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="space-y-1.5">
                  <div className="text-[11.5px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-2 break-inside-avoid">
            <h3
              data-ghost-section-title="true"
              className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
            <div className="space-y-1.5 text-[12px]">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between">
                  <span className="font-semibold text-slate-800">{l.language}</span>
                  <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className="space-y-2 break-inside-avoid">
            <h3
              data-ghost-section-title="true"
              className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Certifications
            </h3>
            <div className="space-y-2 text-[11.5px]">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id}>
                  <div className="font-semibold text-slate-800">{c.name}</div>
                  <div className="text-slate-500 text-[10.5px]">
                    {c.issuer} {c.date ? `• ${c.date}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className="space-y-2.5 break-inside-avoid">
            <h3
              data-ghost-section-title="true"
              className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Education
            </h3>
            <div className="space-y-2 text-[11.5px]">
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5">
                  <div className="font-bold text-slate-800">{edu.degree}</div>
                  <div className="text-slate-600">{edu.school}</div>
                  <div className="text-slate-400 text-[10.5px]">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className="space-y-2">
            <h3
              data-ghost-section-title="true"
              className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Profile
            </h3>
            <div data-ghost-item="summary-0">
              <RichText content={personalInfo.summary} className="text-[11.5px] text-slate-600 leading-relaxed" />
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
              <h3
                data-ghost-section-title="true"
                className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
                style={{ color: themeColor }}
              >
                {title}
              </h3>
            )}
            itemSpacingClass="space-y-2"
            isSidebar={true}
          />
        );
    }
  };

  const renderMainSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className="space-y-1.5">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Profile
            </h2>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[12.5px] text-slate-600 leading-relaxed font-normal"
              />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className="space-y-3.5">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              <span>Employment History</span>
            </h2>

            <div className={itemSpacingClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-[13.5px] text-slate-900">
                        {exp.role} <span className="font-medium text-slate-600">at {exp.company}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-400 shrink-0">
                        {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>

                    {exp.location && (
                      <div className="text-[11.5px] text-slate-500 font-medium">{exp.location}</div>
                    )}
                  </div>

                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 pt-0.5 leading-relaxed text-[12px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className="space-y-3.5">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              <span>Education</span>
            </h2>

            <div className={itemSpacingClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-[13px] text-slate-900">{edu.degree}</div>
                      <div className="text-[11px] font-semibold text-slate-400 shrink-0">
                        {edu.graduationDate}
                      </div>
                    </div>
                    <div className="text-[12px] text-slate-600 font-medium">
                      {edu.school} {edu.location ? `• ${edu.location}` : ''}
                    </div>
                    {edu.gpa && <div className="text-[11.5px] text-slate-500 font-medium">GPA: {edu.gpa}</div>}
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className="space-y-3.5">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              <span>Key Projects</span>
            </h2>

            <div className={itemSpacingClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-[13px] text-slate-900">{proj.title}</div>
                      {proj.link && (
                        <span className="text-[11px] text-blue-600 font-medium truncate max-w-[200px]">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-[11px] text-slate-500 font-medium">
                        Technologies: {proj.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[12px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="space-y-3">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="space-y-1">
                  <div className="text-[12px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {item}
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
          <div key="certifications" data-ghost-section="certifications" className="space-y-2.5">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Certifications
            </h2>
            <div className="space-y-1 text-[12px] text-slate-700">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <span className="font-semibold text-slate-900">{c.name}</span> &mdash; {c.issuer} ({c.date})
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-2">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
              style={{ color: themeColor }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-slate-700">
              {languages.map((l) => (
                <span key={l.id} data-ghost-item={l.id} className="break-inside-avoid">
                  <span className="font-bold">{l.language}:</span> {l.proficiency}
                </span>
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
                className="text-sm font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: themeColor }}
              >
                {title}
              </h2>
            )}
            itemSpacingClass={itemSpacingClass}
            isSidebar={false}
          />
        );
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-800 font-sans text-[12.5px] leading-normal flex flex-col justify-between box-border">
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="px-10 py-3 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-slate-500 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-12 flex-1">
        {/* Left Column - Sidebar (35% width, hidden if no content on Page 2+) */}
        {showSidebar && (
          <div data-ghost-col="sidebar" className={`col-span-4 bg-slate-50/80 border-r border-slate-200/90 ${sidebarPadding} ${contentSpacingClass}`}>
            {/* Avatar and Contact Details (Page 1 only) */}
            {(!data.pageNumber || data.pageNumber === 1) && (
              <div data-ghost-header="true">
                {personalInfo.avatarUrl && (
                  <div className="flex justify-center pb-2">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.fullName || 'Candidate Avatar'}
                      className="w-28 h-28 object-cover rounded-2xl border-2 border-white shadow-xs"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <h3
                    className="text-xs font-bold uppercase tracking-wider pb-1.5 border-b border-slate-200"
                    style={{ color: themeColor }}
                  >
                    Details
                  </h3>
                  <div className="space-y-2 text-[11.5px] text-slate-600">
                    {personalInfo.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.email && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.linkedin && (
                      <div className="flex items-center gap-2 truncate">
                        <LinkedinIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                    {personalInfo.github && (
                      <div className="flex items-center gap-2 truncate">
                        <GithubIcon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                        <span className="truncate">{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                    {personalInfo.website && (
                      <div className="flex items-center gap-2 truncate">
                        <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar Dynamic Sections */}
            {sidebarOrder.map((secId) => renderSidebarSection(secId))}
          </div>
        )}

        {/* Right Column - Main Narrative (65% width or 100% when collapsed) */}
        <div
          data-ghost-col="main"
          className={`${showSidebar ? 'col-span-8' : 'col-span-12'} ${mainPadding} ${contentSpacingClass}`}
        >
          {/* Header (Page 1 only) */}
          {(!data.pageNumber || data.pageNumber === 1) && (
            <div data-ghost-header="true" className="border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {personalInfo.fullName || 'Olivia Winata'}
              </h1>
              <div
                className="text-base font-bold mt-1 tracking-wide"
                style={{ color: themeColor }}
              >
                {personalInfo.jobTitle || 'Senior Product Designer'}
              </div>
            </div>
          )}

          {/* Main Dynamic Sections */}
          {mainOrder.map((secId) => renderMainSection(secId))}
        </div>
      </div>
    </div>
  );
};

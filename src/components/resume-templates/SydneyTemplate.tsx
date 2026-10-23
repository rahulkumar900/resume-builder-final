'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
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

export const SydneyTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#4f46e5',
    spacing = 'normal',
  } = data;

  const bodyPadding =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const mainOrder = (data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS).filter(
    (s) => s !== 'summary' // Summary is in Sydney's top header
  );
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false) => {
    switch (secId) {
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className="space-y-2">
            <h2
              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Work Experience</span>
            </h2>

            <div className={`${itemSpaceClass} border-l-2 border-slate-200 pl-4 ml-1`}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="relative space-y-1 break-inside-avoid">
                  <span
                    className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-white border-2"
                    style={{ borderColor: themeColor }}
                  />
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-[13px] text-slate-900">{exp.role}</div>
                      <div className="text-[11px] font-semibold text-slate-400">
                        {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-[12px] font-semibold text-slate-600">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 pt-0.5 text-[12px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className="space-y-4">
            <h2
              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Featured Projects</span>
            </h2>

            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[13px] text-slate-900">{p.title}</div>
                    {p.technologies && (
                      <div className="text-[11px] font-medium text-slate-500">
                        Tech: {p.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                  <ResumeHighlights highlights={p.highlights} className="text-slate-700 text-[12px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className="space-y-2">
            <h2
              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Education</span>
            </h2>
            <div className={`${itemSpaceClass} border-l-2 border-slate-200 pl-3.5 ml-1`}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12.5px] text-slate-900">{edu.degree}</div>
                    <div className="text-[11px] text-slate-600">{edu.school}</div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      {edu.graduationDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                    </div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[11.5px] mt-1" />}
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
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Skills</span>
            </h2>
            <div className="space-y-2.5">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="space-y-1">
                  <div className="text-[11.5px] font-bold text-slate-700">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((it, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full"
                      >
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
          <div key="certifications" data-ghost-section="certifications" className="space-y-3">
            <h2
              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Certifications</span>
            </h2>
            <div className="space-y-2 text-[11px]">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-slate-500 text-[10px]">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-3">
            <h2
              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
              style={{ color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Languages</span>
            </h2>
            <div className="space-y-1.5 text-[11px]">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between">
                  <span className="font-semibold text-slate-800">{l.language}</span>
                  <span className="text-slate-500 text-[10.5px]">{l.proficiency}</span>
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
                className="text-xs font-black uppercase tracking-wider flex items-center gap-2"
                style={{ color: themeColor }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                <span>{title}</span>
              </h2>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-800 flex flex-col font-sans ${bodyPadding} box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-slate-200 pb-3 mb-6 flex items-center justify-between text-xs font-semibold text-slate-500 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Olivia Winata'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Header Area */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="flex items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-1.5 flex-1">
            <div className="text-4xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'Olivia Winata'}
            </div>
            <div className="text-base font-bold tracking-wide" style={{ color: themeColor }}>
              {personalInfo.jobTitle || 'Senior Product Designer'}
            </div>
            {personalInfo.summary && (
              <RichText
                content={personalInfo.summary}
                className="text-[12.5px] text-slate-600 leading-relaxed max-w-2xl pt-1 font-normal"
              />
            )}

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slate-500 pt-2 font-medium">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <LinkedinIcon className="w-3 h-3 text-slate-400" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </span>
              )}
            </div>
          </div>

          {personalInfo.avatarUrl && (
            <div className="shrink-0">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName || 'Profile'}
                className="w-28 h-28 object-cover rounded-full border-4 shadow-sm"
                style={{ borderColor: `${themeColor}33` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8 pt-4 flex-1">
        {/* Left (8 cols or 12 cols if sidebar collapsed): Main Column */}
        <div
          data-ghost-col="main"
          className={`${hasSidebarContent ? 'col-span-8' : 'col-span-12'} ${sectionSpaceClass}`}
        >
          {mainOrder.map((secId) => renderSection(secId, false))}
        </div>

        {/* Right (4 cols): Sidebar Column */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-4 ${sectionSpaceClass}`}>
            {sidebarOrder.map((secId) => renderSection(secId, true))}
          </div>
        )}
      </div>
    </div>
  );
};

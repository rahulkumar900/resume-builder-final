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
import { LinkedinIcon } from '@/components/common/BrandIcons';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const DublinTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#0f766e',
    spacing = 'normal',
  } = data;

  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const bodyPadding =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const headerPadding =
    spacing === 'compact' ? 'px-7 py-5' : spacing === 'relaxed' ? 'px-9 py-8' : 'px-8 py-6.5';

  const mainOrder = (data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS).filter(
    (s) => s !== 'summary' // summary is in Dublin's header banner
  );
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        // Dublin renders summary in the Page 1 header block
        return null;
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className="space-y-3.5">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Employment History
            </div>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex items-baseline justify-between">
                      <div className="font-bold text-[13px] text-slate-900">{exp.role}</div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-[12px] font-semibold text-slate-600">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 pt-1 leading-relaxed text-[12px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className="space-y-3.5">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Key Projects
            </div>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[13px] text-slate-900">{p.title}</div>
                    {p.technologies && (
                      <div className="text-[11px] font-semibold text-slate-500">
                        {p.technologies.join(' • ')}
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
          <div key="education" data-ghost-section="education" className="space-y-3.5">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Education
            </div>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[12.5px] text-slate-900">{edu.degree}</div>
                    <div className="text-[11.5px] text-slate-600">
                      {edu.school} {edu.location ? `• ${edu.location}` : ''}
                    </div>
                    <div className="text-[10.5px] text-slate-400 font-medium">
                      {edu.graduationDate} {edu.gpa ? `• GPA: ${edu.gpa}` : ''}
                    </div>
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
          <div key="skills" data-ghost-section="skills" className="space-y-3">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Skills
            </div>
            <div className="space-y-2.5">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="space-y-1">
                  <div data-ghost-item-header="true" className="text-[11.5px] font-bold text-slate-700">{cat.category}</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        data-ghost-bullet={i}
                        className="text-[10.5px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
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
          <div key="certifications" data-ghost-section="certifications" className="space-y-3">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Certifications
            </div>
            <div className="space-y-2 text-[11.5px]">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <div className="font-semibold text-slate-800">{c.name}</div>
                  <div className="text-slate-500 text-[10.5px]">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-3">
            <div              data-ghost-section-title="true"
              className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Languages
            </div>
            <div className="space-y-1 text-[11.5px]">
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
              <div                data-ghost-section-title="true"
                className="text-xs font-black uppercase tracking-wider pb-1.5 border-b-2"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                {title}
              </div>
            )}
            itemSpacingClass="space-y-2.5"
          />
        );
    }
  };

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-800 font-sans text-[12px] leading-normal flex flex-col justify-between box-border">
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="px-9 py-3 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono uppercase text-slate-500 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Dublin Top Accent Header (Page 1) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" style={{ backgroundColor: themeColor }} className={`text-white ${headerPadding}`}>
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="text-4xl font-black tracking-tight uppercase leading-none">
                {personalInfo.fullName || 'Olivia Winata'}
              </div>
              <div className="text-base font-bold text-white/90 tracking-wider uppercase mt-2">
                {personalInfo.jobTitle || 'Senior Product Designer'}
              </div>
              {personalInfo.summary && (
                <RichText
                  content={personalInfo.summary}
                  className="mt-3 text-[12.5px] text-white/80 leading-relaxed font-normal max-w-2xl"
                />
              )}
            </div>

            {personalInfo.avatarUrl && (
              <div className="shrink-0">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName || 'Avatar'}
                  className="w-26 h-26 object-cover rounded-xl border-2 border-white/80 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Contact Bar directly below name in Header */}
          <div className="mt-5 pt-3 border-t border-white/20 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-white/90 font-medium">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-white/70" />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-white/70" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-white/70" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3 h-3 text-white/70" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-white/70" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className={`flex-1 grid grid-cols-12 gap-8 ${bodyPadding}`}>
        {/* Left: Main Column (7 cols, or 12 cols if sidebar collapsed) */}
        <div
          data-ghost-col="main"
          className={`${hasSidebarContent ? 'col-span-7' : 'col-span-12'} ${sectionSpaceClass}`}
        >
          {mainOrder.map((secId) => renderSection(secId))}
        </div>

        {/* Right: Sidebar Column (5 cols) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-5 ${sectionSpaceClass}`}>
            {sidebarOrder.map((secId) => renderSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

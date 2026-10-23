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

export const AmeliaTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor = '#1e293b', spacing = 'normal' } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-4' : spacing === 'relaxed' ? 'pb-7' : 'pb-5';
  const gridPadding =
    spacing === 'compact' ? 'pt-3.5' : spacing === 'relaxed' ? 'pt-6' : 'pt-4.5';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-2.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              About Me
            </div>
            <div data-ghost-item="summary-0">
              <RichText content={personalInfo.summary} className="text-[13px] text-stone-700 font-sans leading-relaxed" />
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-2.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              Education
            </div>
            <div className={`${itemSpaceClass} font-sans`}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-stone-900 text-[14px]">{edu.degree}</div>
                    <div className="text-stone-700 italic font-serif">{edu.school}</div>
                    <div className="text-[12px] text-stone-500 mt-0.5">{edu.graduationDate} | {edu.location}</div>
                    {edu.gpa && <div className="text-[12px] text-stone-600 mt-0.5 font-medium">GPA: {edu.gpa}</div>}
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-stone-700 font-sans text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-2.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              Expertise
            </div>
            <div className={`${itemSpaceClass} font-sans`}>
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="text-[12px] font-bold text-stone-800 uppercase tracking-wider mb-1.5">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, i) => (
                      <span key={i} data-ghost-bullet={i} className="text-[12px] bg-stone-100 px-2.5 py-1 rounded text-stone-800 font-medium">
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
          <div key="certifications" data-ghost-section="certifications">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-2.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              Certifications
            </div>
            <div className="space-y-2 font-sans text-[13px]">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <div className="font-bold text-stone-900">{c.name}</div>
                  <div className="text-stone-500 text-[12px]">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-2.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              Languages
            </div>
            <div className="space-y-1.5 font-sans text-[13px]">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between text-stone-800 break-inside-avoid">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-stone-500 text-[12px]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-4 break-after-avoid"
              style={{ color: themeColor }}
            >
              Professional Experience
            </div>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-stone-900 text-[15px] tracking-wide">{exp.role}</span>
                      <span className="text-[12px] font-sans font-semibold text-stone-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[13.5px] font-sans font-semibold text-stone-700 mb-2">
                      {exp.company} &mdash; <span className="text-stone-500 font-normal">{exp.location}</span>
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-stone-700 font-sans text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects">
            <div              data-ghost-section-title="true"
              className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-3.5 break-after-avoid"
              style={{ color: themeColor }}
            >
              Key Transactions &amp; Projects
            </div>
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-stone-900 text-[14px]">{proj.title}</div>
                  <ResumeHighlights highlights={proj.highlights} className="text-stone-700 font-sans text-[13px] mt-1" />
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
                className="text-[13px] font-sans font-bold tracking-[0.2em] uppercase pb-1.5 border-b border-stone-300 mb-3.5 break-after-avoid"
                style={{ color: themeColor }}
              >
                {title}
              </div>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-[#faf8f5] text-stone-900 flex flex-col font-serif ${paddingClass} text-[13.5px] leading-relaxed box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-stone-300 pb-3 mb-6 flex items-center justify-between text-[11px] font-sans text-stone-500 tracking-wider uppercase break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Elegant Classical Header (Page 1) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`text-center ${headerPadding} border-b border-stone-300 break-inside-avoid`}>
          <div className="text-4xl font-normal tracking-wide text-stone-900 uppercase mb-2">
            {personalInfo.fullName || 'Amelia Stanford'}
          </div>
          <p className="text-sm font-sans font-medium tracking-[0.25em] text-stone-600 uppercase mb-4">
            {personalInfo.jobTitle || 'Senior Managing Director & Corporate Counsel'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-sans text-[12px] text-stone-600">
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3.5 h-3.5 text-stone-400" />
                {personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className={`flex-1 grid grid-cols-12 gap-8 ${gridPadding}`}>
        {/* Left Column (Sidebar) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-4 ${sectionSpaceClass}`}>
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

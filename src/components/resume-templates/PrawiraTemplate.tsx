'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
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

export const PrawiraTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor = '#2563eb', spacing = 'normal' } = data;

  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const headerPadding =
    spacing === 'compact' ? 'pb-4 mb-4' : spacing === 'relaxed' ? 'pb-7 mb-7' : 'pb-5 mb-5';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-2.5 border-b-2 flex items-center gap-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Professional Summary</span>
            </h2>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-slate-600 text-sm leading-relaxed"
              />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 flex items-center gap-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
              <span>Work Experience</span>
            </h2>
            <div className={itemSpaceClass}>
              {experience.map((exp, idx) => (
                <div key={exp.id || `exp-${idx}`} data-ghost-item={exp.id || `exp-${idx}`} className="relative pl-4 border-l-2 border-slate-200 break-inside-avoid">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400" />
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-base">{exp.role}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold text-slate-700 mb-2">
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
              Featured Projects
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((proj, idx) => (
                <div key={proj.id || `proj-${idx}`} data-ghost-item={proj.id || `proj-${idx}`} className="bg-slate-50/80 p-3 rounded-md border border-slate-200/70 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-slate-900 text-[13.5px]">{proj.title}</span>
                      {proj.link && (
                        <span className="text-[11.5px] text-blue-600 underline">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="bg-white text-slate-700 text-[11px] px-2 py-0.5 rounded border border-slate-200 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Education
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu, idx) => (
                <div key={edu.id || `edu-${idx}`} data-ghost-item={edu.id || `edu-${idx}`} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-slate-900 text-[14px] leading-snug">{edu.degree}</div>
                    <div className="text-slate-700 font-medium">{edu.school}</div>
                    <div className="text-slate-500 text-[12px] flex justify-between mt-0.5">
                      <span>{edu.location}</span>
                      <span>{edu.graduationDate}</span>
                    </div>
                    {edu.gpa && <div className="text-[12px] text-slate-600 mt-0.5 font-medium">GPA: {edu.gpa}</div>}
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-600 text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="break-inside-avoid">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Core Competencies
            </h2>
            <div className={itemSpaceClass}>
              {skills.map((cat, idx) => (
                <div key={cat.id || `sk-${idx}`} data-ghost-item={cat.id || `sk-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((it, i) => (
                      <span key={i} data-ghost-bullet={i} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded font-medium">
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
          <div key="certifications" data-ghost-section="certifications" className="break-inside-avoid">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((c, idx) => (
                <div key={c.id || `cert-${idx}`} data-ghost-item={c.id || `cert-${idx}`} className="text-xs break-inside-avoid">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-slate-500">{c.issuer} {c.date ? `• ${c.date}` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="break-inside-avoid">
            <h2
              data-ghost-section-title="true"
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3.5 border-b-2 break-after-avoid"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Languages
            </h2>
            <div className="space-y-1.5 text-xs">
              {languages.map((l, idx) => (
                <div key={l.id || `lang-${idx}`} data-ghost-item={l.id || `lang-${idx}`} className="flex justify-between text-slate-700">
                  <span className="font-semibold">{l.language}</span>
                  <span className="text-slate-500">{l.proficiency}</span>
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
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-800 flex flex-col font-sans ${paddingClass} text-sm leading-normal box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-slate-200 pb-3 mb-5 flex items-center justify-between text-xs font-semibold text-slate-500 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Muhammad Prawira'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Header Section (Page 1) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`flex flex-row items-center justify-between border-b-2 border-slate-200 ${headerPadding} gap-4 break-inside-avoid`}>
          <div className="flex items-center gap-5">
            {personalInfo?.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName || 'Avatar'}
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 shadow-xs"
              />
            )}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                {personalInfo.fullName || 'Muhammad Prawira'}
              </h1>
              <div className="text-lg font-bold mt-1" style={{ color: themeColor }}>
                {personalInfo.jobTitle || 'Private Equity & M&A Associate'}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end text-xs text-slate-600 space-y-1">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Two Column Layout Grid */}
      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Left Column (Main - 7 cols, or 12 cols if sidebar collapsed) */}
        <div
          data-ghost-col="main"
          className={`${hasSidebarContent ? 'col-span-7' : 'col-span-12'} flex flex-col ${sectionSpaceClass}`}
        >
          {mainOrder.map((secId) => renderSection(secId))}
        </div>

        {/* Right Column (Sidebar - 5 cols) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-5 flex flex-col ${sectionSpaceClass}`}>
            {sidebarOrder.map((secId) => renderSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const ATSTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor, spacing = 'normal' } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3' : spacing === 'relaxed' ? 'mt-5' : 'mt-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-3.5' : spacing === 'relaxed' ? 'pb-6' : 'pb-5';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2 break-after-avoid">
              Professional Summary
            </h2>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[13px] text-neutral-800 text-justify leading-relaxed"
              />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2.5 break-after-avoid">
              Work Experience
            </h2>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between font-bold text-[14.5px]">
                      <span>{exp.role}</span>
                      <span className="text-[12.5px] font-semibold">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="flex justify-between italic text-[13px] text-neutral-800 mb-1.5 font-medium">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-neutral-800 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2.5 break-after-avoid">
              Education
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between font-bold text-[14px]">
                      <span>{edu.degree}</span>
                      <span className="text-[12.5px] font-semibold">{edu.graduationDate}</span>
                    </div>
                    <div className="flex justify-between italic text-[13px] text-neutral-800">
                      <span>{edu.school}</span>
                      <span>{edu.location}</span>
                    </div>
                    {edu.gpa && <div className="text-[12px] text-neutral-700 font-medium">GPA: {edu.gpa}</div>}
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-neutral-800 text-[12.5px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2.5 break-after-avoid">
              Skills &amp; Competencies
            </h2>
            <div className="space-y-1.5 text-[13px]">
              {skills.map((s) => (
                <div key={s.id} data-ghost-item={s.id} className="break-inside-avoid">
                  <span className="font-bold">{s.category}: </span>
                  <span className="text-neutral-800">{s.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2.5 break-after-avoid">
              Key Projects
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="font-bold text-[14px]">{p.title}</div>
                  <ResumeHighlights highlights={p.highlights} className="text-neutral-800 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2 break-after-avoid">
              Certifications
            </h2>
            <div className="text-[13px] space-y-1">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <span className="font-bold">{c.name}</span> &mdash; {c.issuer} ({c.date})
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2 break-after-avoid">
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
              {languages.map((l) => (
                <span key={l.id} data-ghost-item={l.id}>
                  <strong>{l.language}</strong> ({l.proficiency})
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
                className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1 mb-2 break-after-avoid"
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
    <div className={`w-full h-full min-h-[297mm] bg-white text-black flex flex-col font-sans ${paddingClass} text-[13.5px] leading-normal box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-3 border-b border-black mb-5 break-inside-avoid flex items-center justify-between text-[12px] font-mono tracking-wider uppercase text-neutral-600">
          <span style={{ color: themeColor || '#0284c7' }} className="font-bold">
            {personalInfo.fullName || 'Candidate'} &mdash; {personalInfo.jobTitle || 'Resume'}
          </span>
          <span className="text-[11px] text-neutral-500 font-normal">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Header (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`text-center ${headerPadding} border-b border-black break-inside-avoid`}>
          <div className="text-3xl font-bold uppercase tracking-tight mb-1 text-black">
            {personalInfo.fullName || 'Target Candidate'}
          </div>
          <div className="text-base font-bold mb-2" style={{ color: themeColor || '#0284c7' }}>
            {personalInfo.jobTitle}
          </div>
          <div className="text-[13px] text-neutral-800 flex flex-wrap justify-center gap-x-3.5 gap-y-1 font-medium">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.email && <span>• {personalInfo.email}</span>}
            {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          </div>
        </div>
      )}

      {/* Dynamic Ordered Sections */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

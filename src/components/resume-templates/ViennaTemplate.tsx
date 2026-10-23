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

export const ViennaTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor, spacing = 'normal' } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionSpacing =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpacing =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-3.5 mb-3' : spacing === 'relaxed' ? 'pb-6 mb-5' : 'pb-5 mb-4';
  const containerTopPadding =
    spacing === 'compact' ? 'pt-2' : spacing === 'relaxed' ? 'pt-4' : 'pt-3';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className="pt-1.5">
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[13px] text-slate-700 leading-relaxed text-justify italic font-serif"
              />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className="space-y-3">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Professional Experience
            </h2>
            <div className={itemSpacing}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[13.5px] text-slate-900">{exp.role}</span>
                      <span className="font-sans text-[11.5px] text-slate-500 font-medium">
                        {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="font-sans text-[12px] font-semibold text-slate-700">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="font-sans text-[12px] text-slate-700 pt-0.5 leading-relaxed" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className="space-y-3">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Education
            </h2>
            <div className={itemSpacing}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-[13px] text-slate-900">{edu.degree}</div>
                    <div className="font-sans text-[12px] text-slate-600">
                      {edu.school} {edu.location ? `• ${edu.location}` : ''}
                    </div>
                  </div>
                  <div className="font-sans text-[11.5px] text-slate-500">{edu.graduationDate}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="space-y-2.5">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Skills &amp; Competencies
            </h2>
            <div className="space-y-1.5 font-sans text-[12px]">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="flex gap-2">
                  <span className="font-bold text-slate-800 shrink-0">{cat.category}:</span>
                  <span className="text-slate-600">{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className="space-y-3">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Key Projects
            </h2>
            <div className={itemSpacing}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[13px] text-slate-900">{p.title}</span>
                      {p.link && (
                        <span className="font-sans text-[11px] text-slate-500">
                          {p.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                  </div>
                  <ResumeHighlights highlights={p.highlights} className="font-sans text-[12px] text-slate-700" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className="space-y-2.5">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Certifications
            </h2>
            <div className="text-[12px] font-sans space-y-1 text-slate-700">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <span className="font-bold">{c.name}</span> &mdash; {c.issuer} {c.date ? `(${c.date})` : ''}
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-2">
            <h2 data-ghost-section-title="true" className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300">
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-[12px] text-slate-700">
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
                className="text-xs font-sans font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300"
              >
                {title}
              </h2>
            )}
            itemSpacingClass={itemSpacing}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-serif ${paddingClass} text-[13px] leading-normal box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-3 border-b border-slate-300 mb-5 break-inside-avoid flex items-center justify-between text-[11.5px] font-sans text-slate-500">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Classic Centered Header */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`text-center ${headerPadding} border-b-2 border-slate-900 break-inside-avoid`}>
          <div className="text-4xl font-normal tracking-wide text-slate-900 mb-1.5 uppercase">
            {personalInfo.fullName || 'Target Candidate'}
          </div>
          <div
            className="text-sm font-sans font-bold tracking-widest uppercase mb-3"
            style={{ color: themeColor || '#334155' }}
          >
            {personalInfo.jobTitle}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 font-sans text-[11.5px] text-slate-600">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.email && <span>• {personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.linkedin && (
              <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.website && (
              <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>
            )}
          </div>
        </div>
      )}

      {/* Sections Container */}
      <div data-ghost-col="single" className={`${containerTopPadding} ${sectionSpacing}`}>
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

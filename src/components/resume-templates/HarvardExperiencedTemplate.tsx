'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

// Harvard Experienced & MBA / Master's: Summary & Experience upfront, followed by Education & Leadership
const HARVARD_EXPERIENCED_DEFAULT_ORDER: ResumeSectionId[] = [
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'leadership',
  'languages',
];

export const HarvardExperiencedTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#991b1b', // Harvard Crimson default
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mt-2.5' : spacing === 'relaxed' ? 'mt-4.5' : 'mt-3.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-1.5' : spacing === 'relaxed' ? 'space-y-3' : 'space-y-2';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';

  const order = data.sectionOrder?.singleColumn || HARVARD_EXPERIENCED_DEFAULT_ORDER;

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="border-b-2 border-slate-900 pb-0.5 mb-2 break-after-avoid">
      <div
        className="text-[12.5px] font-bold uppercase tracking-[0.16em]"
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
            {renderSectionHeader('Executive Summary')}
            <div data-ghost-item="summary-0" className="text-[11.5px] leading-relaxed text-slate-800 text-justify">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Leadership & Professional Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline font-bold text-[12.5px] text-slate-900">
                      <span>{exp.company}</span>
                      {exp.location && (
                        <span className="text-[11px] font-normal text-slate-700 italic">{exp.location}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-[11.5px] text-slate-800 mb-1">
                      <span className="italic font-semibold">{exp.role}</span>
                      <span className="text-[11px] text-slate-700 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-800 text-[11.5px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education & Credentials')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline font-bold text-[12.5px] text-slate-900">
                      <span>{edu.school}</span>
                      {edu.location && (
                        <span className="text-[11px] font-normal text-slate-700 italic">{edu.location}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-[11.5px] text-slate-800">
                      <span className="italic font-medium">{edu.degree}</span>
                      {edu.graduationDate && (
                        <span className="text-[11px] text-slate-700 font-medium">{edu.graduationDate}</span>
                      )}
                    </div>
                    {edu.gpa && (
                      <div className="text-[11px] text-slate-700 mt-0.5">
                        <span className="font-semibold">Academic Honors / GPA:</span> {edu.gpa}
                      </div>
                    )}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="text-[11.5px] text-slate-800 mt-1 pl-4">
                      <ResumeHighlights highlights={edu.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Core Competencies & Strategic Capabilities')}
            <div className="space-y-1 text-[11.5px] text-slate-800">
              {skills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  data-ghost-item={cat.id || `skill-${idx}`}
                  className="flex flex-row items-baseline gap-2 break-inside-avoid"
                >
                  <span className="font-bold text-slate-900 shrink-0 min-w-[160px]">
                    {cat.category}:
                  </span>
                  <span className="text-slate-800">{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Key Initiatives & Strategic Engagements')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-[12px] text-slate-900">
                      {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal italic text-slate-700 text-[11px]">
                          {' '}– {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[10.5px] text-slate-600 underline truncate max-w-[220px]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-800 text-[11.5px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Certifications & Board Affiliations')}
            <div className="space-y-1 text-[11.5px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="text-slate-900 font-medium">
                    <strong>{cert.name}</strong>
                    {cert.issuer && <span className="text-slate-700">, {cert.issuer}</span>}
                  </span>
                  {cert.date && <span className="text-[11px] text-slate-700">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Languages')}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-800">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold text-slate-900">{l.language}</span>
                  {l.proficiency && <span className="text-slate-600"> ({l.proficiency})</span>}
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
              renderHeader={renderSectionHeader}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  const contactItems: string[] = [];
  if (personalInfo?.location) contactItems.push(personalInfo.location);
  if (personalInfo?.phone) contactItems.push(personalInfo.phone);
  if (personalInfo?.email) contactItems.push(personalInfo.email);
  if (personalInfo?.linkedin) contactItems.push(`linkedin.com/in/${personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\/?/, '')}`);
  if (personalInfo?.website) contactItems.push(personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''));

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-serif ${paddingClass} text-[13px] leading-normal box-border`}>
      {/* Running Header (Page > 1) */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-2.5 border-b border-slate-300 mb-4 break-inside-avoid flex items-center justify-between text-[11px] font-sans uppercase tracking-wider text-slate-500">
          <span style={{ color: themeColor }} className="font-bold">
            {personalInfo?.fullName || 'Candidate'} &mdash; {personalInfo?.jobTitle || 'Resume'}
          </span>
          <span className="text-[10px] text-slate-400 font-normal">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Main Header (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="text-center pb-2.5 mb-3.5 border-b-2 border-slate-900 break-inside-avoid">
          <div
            className="text-[26px] font-bold tracking-tight uppercase mb-1"
            style={{ color: themeColor }}
          >
            {personalInfo?.fullName || 'Candidate Name'}
          </div>
          {personalInfo?.jobTitle && (
            <p className="text-[13px] font-semibold text-slate-800 uppercase tracking-widest mb-1.5 font-sans">
              {personalInfo.jobTitle}
            </p>
          )}
          {contactItems.length > 0 && (
            <div className="text-[11px] text-slate-700 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-0.5 font-sans">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-400 font-normal">•</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Single Column */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {order.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

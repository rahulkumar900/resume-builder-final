'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

// Harvard Technical & Systems Engineering: Skills & Projects at top, followed by Experience & Education
const HARVARD_TECH_DEFAULT_ORDER: ResumeSectionId[] = [
  'skills',
  'projects',
  'experience',
  'education',
  'leadership',
  'certifications',
  'awards',
  'languages',
];

export const HarvardTechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    leadership = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#0f172a',
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mt-2.5' : spacing === 'relaxed' ? 'mt-4' : 'mt-3';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-1.5' : spacing === 'relaxed' ? 'space-y-2.5' : 'space-y-2';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-10' : 'p-8';

  const order = data.sectionOrder?.singleColumn || HARVARD_TECH_DEFAULT_ORDER;

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="border-b border-black pb-0.5 mb-1.5 break-after-avoid">
      <div
        className="text-[13px] font-bold uppercase tracking-[0.06em]"
        style={{ color: themeColor }}
      >
        {title}
      </div>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Technical & Computing Skills')}
            <div className="space-y-0.5 text-[12px] text-slate-900 leading-[1.45]">
              {skills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  data-ghost-item={cat.id || `skill-${idx}`}
                  className="flex flex-row items-baseline gap-1.5 break-inside-avoid"
                >
                  {cat.category ? (
                    <span className="font-bold shrink-0">
                      {cat.category}:
                    </span>
                  ) : null}
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
            {renderSectionHeader('Technical & Systems Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[13px] text-slate-900">
                      <span className="font-bold">{proj.title}</span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal italic text-slate-700 text-[12px]">
                          {' '}– {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[11.5px] text-slate-700 font-mono underline truncate max-w-[240px]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="text-slate-900 text-[12px] leading-[1.4] pl-4 space-y-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Engineering & Professional Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline text-[13px] text-slate-900">
                      <span className="font-bold">{exp.company}</span>
                      {exp.location && (
                        <span className="text-[12.5px] font-normal text-slate-800">{exp.location}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-[12.5px] text-slate-800 mb-0.5">
                      <span className="italic">{exp.role}</span>
                      <span className="text-[12.5px] text-slate-800">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  <ResumeHighlights
                    highlights={exp.highlights}
                    className="text-slate-900 text-[12px] leading-[1.4] pl-4 space-y-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline text-[13px] text-slate-900">
                      <span className="font-bold">{edu.school}</span>
                      {edu.location && (
                        <span className="text-[12.5px] font-normal text-slate-800">{edu.location}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-[12.5px] text-slate-800">
                      <span>
                        <span className="italic">{edu.degree}</span>
                        {edu.gpa && <span className="not-italic">. GPA: {edu.gpa}</span>}
                      </span>
                      {edu.graduationDate && (
                        <span className="text-[12.5px] text-slate-800">{edu.graduationDate}</span>
                      )}
                    </div>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-0.5">
                      <ResumeHighlights
                        highlights={edu.highlights}
                        className="text-slate-900 text-[12px] leading-[1.4] pl-4 space-y-0.5"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'leadership':
        if (!leadership || leadership.length === 0) return null;
        return (
          <div key="leadership" data-ghost-section="leadership" className={sectionMarginClass}>
            {renderSectionHeader('Technical Leadership & Community')}
            <div className={itemSpaceClass}>
              {leadership.map((act) => (
                <div key={act.id} data-ghost-item={act.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline text-[13px] text-slate-900">
                      <span className="font-bold">{act.organization}</span>
                      {act.location && (
                        <span className="text-[12.5px] font-normal text-slate-800">{act.location}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-baseline text-[12.5px] text-slate-800 mb-0.5">
                      <span className="italic">{act.role}</span>
                      <span className="text-[12.5px] text-slate-800">
                        {act.startDate} – {act.current ? 'Present' : act.endDate}
                      </span>
                    </div>
                  </div>
                  {act.highlights && act.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={act.highlights}
                      className="text-slate-900 text-[12px] leading-[1.4] pl-4 space-y-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Technical Summary')}
            <div data-ghost-item="summary-0" className="text-[12px] leading-[1.45] text-slate-900 text-justify">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Certifications & Credentials')}
            <div className="space-y-0.5 text-[12px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="text-slate-900">
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-800">, {cert.issuer}</span>}
                  </span>
                  {cert.date && <span className="text-[12px] text-slate-800">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Spoken Languages')}
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[12px] text-slate-900">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold">{l.language}</span>
                  {l.proficiency && <span className="text-slate-700"> ({l.proficiency})</span>}
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
  if (personalInfo?.github) contactItems.push(`github.com/${personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\/?/, '')}`);
  if (personalInfo?.linkedin) contactItems.push(`linkedin.com/in/${personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\/?/, '')}`);
  if (personalInfo?.website) contactItems.push(personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''));

  return (
    <div
      data-template="harvard_tech"
      style={{ fontFamily: "'Times New Roman', Times, var(--font-garamond), 'EB Garamond', Georgia, serif" }}
      className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col ${paddingClass} text-[12.5px] leading-normal box-border`}
    >
      {/* Running Header (Page > 1) */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-1.5 border-b border-black mb-3 break-inside-avoid flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-700">
          <span style={{ color: themeColor }} className="font-bold">
            {personalInfo?.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo?.email && (
            <span className="text-[11px] text-slate-600 font-normal">
              {personalInfo.email}
            </span>
          )}
        </div>
      )}

      {/* Main Header (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="text-center pb-1 mb-2 break-inside-avoid">
          <div
            className="text-[23px] font-bold tracking-[0.03em] uppercase mb-1 text-slate-900"
            style={{ color: themeColor }}
          >
            {personalInfo?.fullName || 'Candidate Name'}
          </div>
          {contactItems.length > 0 && (
            <div className="text-[12px] text-slate-800 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-500 font-normal">•</span>}
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

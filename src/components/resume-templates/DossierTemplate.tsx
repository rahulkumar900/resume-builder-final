'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { getResolvedTemplateSectionOrder } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const DossierTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#E11D48', // Crimson accent
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-9 sm:p-11' : 'p-7 sm:p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-5.5' : 'mt-4.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('dossier', data);
  const sectionOrder: ResumeSectionId[] = (
    data.sectionOrder?.singleColumn ||
    resolvedOrder.singleColumn ||
    []
  ).filter((s) => !data.hiddenSections?.includes(s));

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div
            key="summary"
            data-ghost-section="summary"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] break-inside-avoid`}
          >
            {/* Top dossier tab badge */}
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Profile
              </span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#1E293B] leading-[20px]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience.length) return null;
        return (
          <div
            key="experience"
            data-ghost-section="experience"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Experience
              </span>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  data-ghost-item={exp.id || `exp-${idx}`}
                  className={`break-inside-avoid ${idx > 0 ? 'pt-3.5 border-t border-[#F1F5F9]' : ''}`}
                >
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {exp.role}
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-manrope text-[12px] font-normal text-[#64748B] mt-0.5">
                      {exp.company}
                      {exp.company && exp.location && ', '}
                      {exp.location}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-1.5 font-manrope text-[12.5px] text-[#1E293B] leading-[20px]">
                      <ResumeHighlights highlights={exp.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects.length) return null;
        return (
          <div
            key="projects"
            data-ghost-section="projects"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Projects
              </span>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  data-ghost-item={proj.id || `proj-${idx}`}
                  className={`break-inside-avoid ${idx > 0 ? 'pt-3 border-t border-[#F1F5F9]' : ''}`}
                >
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-manrope text-[11.5px] text-[#64748B] mt-0.5">
                      {proj.technologies.join(' · ')}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="mt-1 font-manrope text-[12.5px] text-[#1E293B] leading-[20px]">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education.length) return null;
        return (
          <div
            key="education"
            data-ghost-section="education"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Education
              </span>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  data-ghost-item={edu.id || `edu-${idx}`}
                  className={`break-inside-avoid ${idx > 0 ? 'pt-2.5 border-t border-[#F1F5F9]' : ''}`}
                >
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {edu.degree}
                    </span>
                    {edu.graduationDate && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {edu.graduationDate}
                      </span>
                    )}
                  </div>
                  <div className="font-manrope text-[12px] text-[#64748B] mt-0.5">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-1 font-manrope text-[12px] text-[#1E293B]">
                      <ResumeHighlights highlights={edu.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills.length) return null;
        return (
          <div
            key="skills"
            data-ghost-section="skills"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] break-inside-avoid`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Skills
              </span>
            </div>
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-1.5">
              {skills.flatMap((cat) => cat.items).map((skillName, idx) => (
                <span
                  key={idx}
                  className="font-manrope text-[12px] font-medium px-2.5 py-1 bg-[#F1F5F9] text-[#0F172A] rounded border border-[#E2E8F0]"
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications.length) return null;
        return (
          <div
            key="certifications"
            data-ghost-section="certifications"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Certifications
              </span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  data-ghost-item={cert.id || `cert-${idx}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-2 text-[12.5px] font-manrope break-inside-avoid"
                >
                  <span className="font-medium text-[#0F172A]">{cert.name}</span>
                  <span className="text-[11.5px] text-[#64748B]">
                    {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        if (!awards.length) return null;
        return (
          <div
            key="awards"
            data-ghost-section="awards"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Recognition
              </span>
            </div>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div
                  key={award.id || idx}
                  data-ghost-item={award.id || `award-${idx}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-2 text-[12.5px] font-manrope break-inside-avoid"
                >
                  <span className="font-medium text-[#0F172A]">{award.title}</span>
                  <span className="text-[11.5px] text-[#64748B]">
                    {award.issuer} {award.date ? `(${award.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages.length) return null;
        return (
          <div
            key="languages"
            data-ghost-section="languages"
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] break-inside-avoid`}
          >
            <div
              data-ghost-section-title="true"
              className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
            >
              <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                Languages
              </span>
            </div>
            <div data-ghost-item="languages-0" className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] font-manrope text-[#1E293B]">
              {languages.map((lang, idx) => (
                <span key={idx}>
                  <strong className="font-semibold text-[#0F172A]">{lang.language}</strong>
                  {lang.proficiency ? ` (${lang.proficiency})` : ''}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div
            key={secId}
            data-ghost-section={secId}
            className={`${sectionMarginClass} relative border border-[#CBD5E1] rounded-sm p-4 pt-5 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]`}
          >
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title) => (
                <div
                  data-ghost-section-title="true"
                  className="absolute -top-3 left-4 bg-white px-2.5 py-0.5 border border-[#CBD5E1] rounded-t-sm break-after-avoid"
                >
                  <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.16em] text-[#0F172A]">
                    {title}
                  </span>
                </div>
              )}
            />
          </div>
        );
    }
  };

  return (
    <div className={`w-full bg-[#FAFAFA] min-h-full font-manrope ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border border-[#CBD5E1] bg-white px-4 py-2 mb-3.5 flex items-center justify-between text-[11px] font-bold text-[#0F172A] rounded-sm break-inside-avoid shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
            <span>{personalInfo.fullName || 'Candidate'}</span>
            {personalInfo.jobTitle && (
              <span className="font-normal text-[#64748B]"> &mdash; {personalInfo.jobTitle}</span>
            )}
          </div>
          <span className="text-[#64748B] font-medium">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Dossier Header Frame (Page 1 Only) */}
      {isPage1 && (
        <div data-ghost-header="true" className="relative mb-2 break-inside-avoid">
          {/* Top Folder Tab for Role */}
          {personalInfo.jobTitle && (
            <div
              data-ghost-role="true"
              className="inline-flex items-center px-4 py-1.5 rounded-t-md bg-white border-t-2 border-x border-[#CBD5E1] border-t-[#E11D48] shadow-[0_-1px_2px_rgba(15,23,42,0.03)]"
            >
              <span
                className="font-manrope text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: themeColor || '#E11D48' }}
              >
                {personalInfo.jobTitle}
              </span>
            </div>
          )}

          {/* Case File Header Box */}
          <div className="border border-[#CBD5E1] rounded-b-md rounded-tr-md p-6 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-spacegrotesk text-[40px] font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.05]">
                {personalInfo.fullName || 'Your Name'}
              </h1>
            </div>

            {contactItems.length > 0 && (
              <div className="flex flex-wrap md:flex-col md:items-end gap-x-3 gap-y-1 font-manrope text-[11.5px] font-medium text-[#64748B]">
                {contactItems.map((item, idx) => (
                  <span key={idx} className="whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Single Column Sections with Ghost Column Marker */}
      <div data-ghost-col="single" className="space-y-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

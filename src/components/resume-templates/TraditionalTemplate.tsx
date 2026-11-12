'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/common/BrandIcons';

interface TemplateProps {
  data: ResumeData;
}

export const TraditionalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#1e3a8a', // Traditional Deep Royal Navy default
    spacing = 'normal',
  } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-3 mb-3' : spacing === 'relaxed' ? 'pb-5 mb-5' : 'pb-4 mb-4';

  const isPaginated = typeof data.pageNumber === 'number';
  const rawSectionOrder = (data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS) as ResumeSectionId[];
  const sectionOrder: ResumeSectionId[] = rawSectionOrder;

  const renderSectionHeader = (title: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2 pb-1 border-b-[1.5px] break-after-avoid"
      style={{ borderColor: themeColor }}
    >
      <div
        className="text-[16px] font-bold uppercase tracking-wider text-slate-900"
        style={{ color: themeColor }}
      >
        {title}
      </div>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Career Objective / Summary')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[13.5px] text-slate-800 text-justify leading-[21px]"
              />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Academic Qualifications')}
            {/* Traditional Indian Academic Table Format */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[13px] border-collapse border border-slate-300 text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-300 text-[12px] uppercase tracking-wider">
                    <th className="p-2 border border-slate-300">Course / Degree</th>
                    <th className="p-2 border border-slate-300">College / Institution</th>
                    <th className="p-2 border border-slate-300">Board / University</th>
                    <th className="p-2 border border-slate-300 text-center w-20">Year</th>
                    <th className="p-2 border border-slate-300 text-right w-24">Score / CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu) => (
                    <tr
                      key={edu.id}
                      data-ghost-item={edu.id}
                      className="border-b border-slate-200 hover:bg-slate-50/50 break-inside-avoid"
                    >
                      <td className="p-2 border border-slate-300 font-bold text-slate-900">
                        <div data-ghost-item-header="true">
                          <div>{edu.degree}</div>
                          {edu.highlights && edu.highlights.length > 0 && (
                            <div className="mt-1 font-normal text-[12.5px] text-slate-700 leading-[19px]">
                              <ResumeHighlights highlights={edu.highlights} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-800">{edu.school}</td>
                      <td className="p-2 border border-slate-300 text-slate-700">{edu.location || '—'}</td>
                      <td className="p-2 border border-slate-300 text-center text-slate-800 whitespace-nowrap font-medium">
                        {edu.graduationDate || '—'}
                      </td>
                      <td className="p-2 border border-slate-300 text-right font-bold text-slate-900 whitespace-nowrap">
                        {edu.gpa || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Professional Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline font-bold text-[14px] text-slate-900">
                      <span>{exp.role}</span>
                      <span className="text-[12.5px] font-semibold text-slate-700">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-[13.5px] text-slate-800 font-semibold mb-1">
                      <span>{exp.company}</span>
                      {exp.location && <span className="text-slate-600 font-normal">{exp.location}</span>}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-800 text-[13.5px] leading-[20px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Technical Skills & Competencies')}
            <div className="space-y-1.5 text-[13.5px] text-slate-800">
              {skills.map((skillGroup, sIdx) => (
                <div
                  key={skillGroup.id || sIdx}
                  data-ghost-item={skillGroup.id || `skill-${sIdx}`}
                  className="flex flex-row items-start gap-2 break-inside-avoid"
                >
                  {skillGroup.category ? (
                    <span className="font-bold text-slate-900 min-w-[150px] shrink-0">
                      {skillGroup.category}:
                    </span>
                  ) : null}
                  <span className="text-slate-800 font-medium">
                    {skillGroup.items.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Key Academic & Professional Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[14px] text-slate-900">{proj.title}</span>
                      {proj.link && (
                        <span className="text-[12px] text-blue-600 truncate max-w-[200px]">{proj.link}</span>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-[13px] font-semibold text-slate-700 mb-1">
                        <span className="font-bold text-slate-900">Technologies:</span> {proj.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-800 text-[13.5px] leading-[20px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Certifications & Trainings')}
            <div className="space-y-1.5 text-[13.5px]">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  data-ghost-item={cert.id}
                  className="flex justify-between items-baseline break-inside-avoid"
                >
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-700"> — {cert.issuer}</span>}
                  </div>
                  {cert.date && <span className="text-[12.5px] text-slate-700 font-medium">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Languages Known')}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13.5px]">
              {languages.map((lang, lIdx) => (
                <div key={lang.id || lIdx} data-ghost-item={lang.id || `lang-${lIdx}`}>
                  <span className="font-bold text-slate-900">{lang.language}</span>
                  {lang.proficiency && (
                    <span className="text-slate-700 text-[12.5px]"> ({lang.proficiency})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'declaration': {
        const decl = data.declaration;
        const declText = decl?.text || (data as any).declarationText;
        if (!declText && !decl?.place && !decl?.date && !decl?.signatureName) return null;

        return (
          <div
            key="declaration"
            data-ghost-section="declaration"
            className="mt-8 pt-4 border-t border-slate-300 text-[12.5px] text-slate-800 break-inside-avoid space-y-4"
          >
            <div data-ghost-item="declaration-0" className="space-y-4 break-inside-avoid">
              {declText && (
                <div>
                  <span className="font-bold text-slate-900 uppercase">Declaration: </span>
                  <span>{declText}</span>
                </div>
              )}
              <div className="flex justify-between items-end pt-3">
                <div className="space-y-1 text-slate-700 font-medium">
                  <div>Date: {decl?.date || '____________________'}</div>
                  <div>Place: {decl?.place || personalInfo.location || '____________________'}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 uppercase tracking-wide">
                    ({decl?.signatureName || personalInfo.fullName || 'Candidate Name'})
                  </div>
                  <div className="text-[11.5px] text-slate-600 font-medium">Signature</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return (
          <UniversalSectionRenderer
            key={secId}
            secId={secId}
            data={data}
            renderHeader={(title) => renderSectionHeader(title)}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  const isFirstPage = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.pageNumber || data.pageNumber === (data.totalPages || 1);

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-sans ${paddingClass} text-[13.5px] leading-normal box-border`}
    >
      {/* Running Header on Subsequent Pages */}
      {!isFirstPage && (
        <div className="pb-2 border-b-2 border-slate-300 mb-4 break-inside-avoid flex items-center justify-between text-[12px] text-slate-700 font-medium">
          <span className="font-bold text-slate-900 uppercase tracking-wide">
            {personalInfo.fullName || 'Curriculum Vitae'}
          </span>
          <span>
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Traditional Indian Formal Header on Page 1 */}
      {isFirstPage && (
        <div data-ghost-header="true" className={`${headerPadding} border-b-2 border-slate-900 break-inside-avoid`}>
          <div className="flex items-start justify-between gap-4">
            {/* Name, Designation & Formal Contact Details */}
            <div className="flex-1 space-y-1">
              <h1 className="text-[26px] font-black uppercase tracking-wider text-slate-900">
                {personalInfo.fullName || 'Candidate Name'}
              </h1>
              {personalInfo.jobTitle && (
                <div
                  data-ghost-role="true"
                  className="text-[13.5px] font-bold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  {personalInfo.jobTitle}
                </div>
              )}

              {/* Contact Information Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-slate-700 font-medium">
                {personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span className="flex items-center gap-1">
                    <LinkedinIcon className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.website && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Optional Formal Passport Photograph */}
            {personalInfo.avatarUrl && (
              <div className="shrink-0">
                <div className="w-24 h-28 border-2 border-slate-400 p-0.5 rounded-xs bg-white shadow-xs">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName || 'Candidate Photo'}
                    className="w-full h-full object-cover rounded-2xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sections Container */}
      <div data-ghost-col="single" className="flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

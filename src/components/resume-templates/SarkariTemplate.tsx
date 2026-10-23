'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon } from '@/components/common/BrandIcons';

interface TemplateProps {
  data: ResumeData;
}

export const SarkariTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#1e293b', // Formal Sarkari Slate/Charcoal Navy
    spacing = 'normal',
  } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-3.5 mb-3.5' : spacing === 'relaxed' ? 'pb-5 mb-5' : 'pb-4 mb-4';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string) => (
    <div
      data-ghost-section-title="true"
      className="pb-1 mb-2 border-b-2 border-slate-800 break-after-avoid flex items-center justify-between"
      style={{ borderColor: themeColor }}
    >
      <div        className="text-[13px] font-black uppercase tracking-wider text-slate-900"
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
            {renderSectionHeader('Career Objective / Brief Profile')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[12px] text-slate-800 leading-relaxed text-justify"
              />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Educational & Professional Qualifications')}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[11.5px] border-collapse border border-slate-400 text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400 text-[10.5px] uppercase tracking-wider">
                    <th className="p-1.5 border border-slate-400">Examination Passed</th>
                    <th className="p-1.5 border border-slate-400">School / College</th>
                    <th className="p-1.5 border border-slate-400">Board / University</th>
                    <th className="p-1.5 border border-slate-400 text-center w-16">Year</th>
                    <th className="p-1.5 border border-slate-400 text-right w-20">Division / %</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, idx) => (
                    <tr
                      key={edu.id}
                      data-ghost-item={edu.id}
                      className={`border-b border-slate-300 break-inside-avoid ${
                        idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
                      }`}
                    >
                      <td className="p-1.5 border border-slate-400 font-bold text-slate-900">
                        {edu.degree}
                      </td>
                      <td className="p-1.5 border border-slate-400 text-slate-800">
                        {edu.school}
                      </td>
                      <td className="p-1.5 border border-slate-400 text-slate-700">
                        {edu.location || 'Recognized Board / Univ'}
                      </td>
                      <td className="p-1.5 border border-slate-400 text-center font-medium text-slate-800">
                        {edu.graduationDate || '—'}
                      </td>
                      <td className="p-1.5 border border-slate-400 text-right font-bold text-slate-900">
                        {edu.gpa || '1st Div'}
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
            {renderSectionHeader('Work Experience & Industrial Training')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-baseline justify-between gap-1 mb-1"
                  >
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-900 uppercase">
                        {exp.role}
                      </span>
                      <span className="text-[12px] font-semibold text-slate-700">
                        {' '}— {exp.company}
                      </span>
                      {exp.location && (
                        <span className="text-slate-500 text-[11px]"> ({exp.location})</span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 shrink-0">
                      {exp.startDate} to {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="text-[11.5px] text-slate-700 pl-1">
                      <ResumeHighlights highlights={exp.highlights} />
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
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Technical Skills & Knowledge Areas')}
            <div className="space-y-1 text-[11.5px]">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="flex flex-row items-baseline gap-1 break-inside-avoid">
                  <span className="font-bold min-w-[170px] uppercase text-[10.5px] text-slate-800">
                    {cat.category || 'Competencies'}:
                  </span>
                  <span className="text-slate-800 font-medium">
                    {cat.items.join(', ')}
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
            {renderSectionHeader('Major Projects & Work Assignments')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div
                    data-ghost-item-header="true"
                    className="flex justify-between items-baseline gap-2 mb-0.5"
                  >
                    <span className="text-[12px] font-bold text-slate-900">
                      • {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-slate-600 text-[11px]">
                          {' '}({proj.technologies.join(', ')})
                        </span>
                      )}
                    </span>
                  </div>

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="text-[11.5px] text-slate-700 pl-3">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certificates & Qualifying Examinations')}
            <div className="space-y-1 text-[11.5px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline gap-2 break-inside-avoid">
                  <span className="text-slate-800">
                    <strong className="font-semibold text-slate-900">• {cert.name}</strong>
                    {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  </span>
                  {cert.date && (
                    <span className="text-[10.5px] text-slate-500 shrink-0">{cert.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Languages Proficiency')}
            <div className="flex flex-wrap gap-2 text-[11.5px] text-slate-800">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold text-slate-900">• {l.language}</span>
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

  const isFirstPage = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.pageNumber || data.pageNumber === (data.totalPages || 1);

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-sans ${paddingClass} text-[12px] leading-normal box-border`}
    >
      {/* Running Header on Page 2+ */}
      {!isFirstPage && (
        <div className="pb-1.5 border-b border-slate-300 mb-3 break-inside-avoid flex items-center justify-between text-[10.5px] text-slate-600 font-medium">
          <span className="font-bold uppercase tracking-wider text-slate-800">
            {personalInfo.fullName || 'Curriculum Vitae'} • Bharat PSU / Govt Format
          </span>
          <span>
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Formal Indian PSU / Sarkari Header */}
      {isFirstPage && (
        <div data-ghost-header="true" className={`${headerPadding} border-b-2 border-slate-900 break-inside-avoid`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Curriculum Vitae / Bio-Data
              </div>
              <div className="text-3xl font-black uppercase tracking-wider text-slate-900">
                {personalInfo.fullName || 'Candidate Name'}
              </div>
              {personalInfo.jobTitle && (
                <div
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  {personalInfo.jobTitle}
                </div>
              )}

              {/* Formal Contact Information */}
              <div className="pt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-700 font-medium">
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Contact: {personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Email: {personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Address / Location: {personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>LinkedIn: {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>Website / Portfolio: {personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Passport Photo Box Slot */}
            <div className="shrink-0">
              <div className="w-24 h-28 border-2 border-slate-400 p-0.5 rounded-xs bg-white shadow-2xs flex flex-col items-center justify-center text-center">
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName || 'Photograph'}
                    className="w-full h-full object-cover rounded-2xs"
                  />
                ) : (
                  <div className="p-2 text-[9.5px] text-slate-400 font-medium leading-tight">
                    Affix Passport Size Photograph
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections Container */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>

      {/* Formal Sarkari Declaration on the Last Page */}
      {isLastPage && (
        <div className="mt-8 pt-4 border-t-2 border-slate-400 text-[11px] text-slate-800 break-inside-avoid space-y-4">
          <div>
            <span className="font-bold text-slate-900 uppercase">Declaration: </span>
            <span>
              I hereby solemnly affirm and declare that the statements made in this curriculum vitae
              are true, complete and correct to the best of my knowledge and belief, and nothing has been
              concealed or distorted. In the event of any information being found false or incorrect,
              my candidature/appointment may be cancelled.
            </span>
          </div>
          <div className="flex justify-between items-end pt-3 text-[11px]">
            <div className="space-y-1 text-slate-700">
              <div>Date: ____________________</div>
              <div>Place: ____________________</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900 uppercase tracking-wide">
                ({personalInfo.fullName || 'Candidate Signature'})
              </div>
              <div className="text-[10px] text-slate-500">Signature of the Applicant</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

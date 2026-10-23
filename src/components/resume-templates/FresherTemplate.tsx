'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';
import { Mail, Phone, MapPin, Globe, ExternalLink, GraduationCap, Code, Trophy, Users } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/common/BrandIcons';

interface TemplateProps {
  data: ResumeData;
}

export const FresherTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#0f766e', // Campus Placement Emerald Teal
    spacing = 'normal',
  } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3' : spacing === 'relaxed' ? 'mt-5.5' : 'mt-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const headerPadding =
    spacing === 'compact' ? 'pb-3 mb-3' : spacing === 'relaxed' ? 'pb-5 mb-5' : 'pb-4 mb-4';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 pb-1 mb-2 border-b-2 break-after-avoid"
      style={{ borderColor: themeColor }}
    >
      <h2
        className="text-[13px] font-black uppercase tracking-wider text-slate-900"
        style={{ color: themeColor }}
      >
        {title}
      </h2>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Career Objective')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[12px] text-slate-700 leading-relaxed text-justify"
              />
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Academic Background')}
            {/* Indian Campus Academic Matrix Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[11.5px] border-collapse border border-slate-300 text-left">
                <thead>
                  <tr
                    className="text-white font-bold text-[10.5px] uppercase tracking-wider"
                    style={{ backgroundColor: themeColor }}
                  >
                    <th className="p-2 border border-slate-300">Degree / Examination</th>
                    <th className="p-2 border border-slate-300">Institute / College</th>
                    <th className="p-2 border border-slate-300">Board / University</th>
                    <th className="p-2 border border-slate-300 text-center w-20">Year</th>
                    <th className="p-2 border border-slate-300 text-right w-24">CGPA / %</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, idx) => (
                    <tr
                      key={edu.id}
                      data-ghost-item={edu.id}
                      className={`border-b border-slate-200 hover:bg-slate-50/50 break-inside-avoid ${
                        idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                      }`}
                    >
                      <td className="p-2 border border-slate-300 font-bold text-slate-900">
                        {edu.degree}
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-700 font-medium">
                        {edu.school}
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-600">
                        {edu.location || 'University / Board'}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-medium text-slate-700">
                        {edu.graduationDate || '—'}
                      </td>
                      <td
                        className="p-2 border border-slate-300 text-right font-black"
                        style={{ color: themeColor }}
                      >
                        {edu.gpa || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Technical Skills & Areas of Interest')}
            <div className="space-y-1.5 text-[11.5px]">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="flex flex-row items-baseline gap-2 break-inside-avoid">
                  <span
                    className="font-bold shrink-0 min-w-[150px] uppercase text-[10.5px] tracking-wider"
                    style={{ color: themeColor }}
                  >
                    • {cat.category || 'Domain Skills'}:
                  </span>
                  <span className="text-slate-800 font-medium leading-relaxed">
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
            {renderSectionHeader('Projects & Capstone Highlights')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-baseline justify-between gap-1 mb-1"
                  >
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[12.5px] font-bold text-slate-900">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[11px] font-semibold text-slate-500">
                          [{proj.technologies.join(', ')}]
                        </span>
                      )}
                      {proj.link && (
                        <a
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-teal-600 inline-flex items-center"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="text-[11.5px] text-slate-700 pl-1">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'internships': {
        const internships = data.internships;
        if (!internships || internships.length === 0) return null;
        return (
          <div key="internships" data-ghost-section="internships" className={sectionMarginClass}>
            {renderSectionHeader('Internships & Practical Training')}
            <div className={itemSpaceClass}>
              {internships.map((intItem) => (
                <div key={intItem.id} data-ghost-item={intItem.id} className="break-inside-avoid">
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-baseline justify-between gap-1 mb-1"
                  >
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-900">{intItem.role || intItem.title}</span>
                      <span className="text-[12px] font-semibold text-slate-700"> • {intItem.company}</span>
                      {intItem.location && (
                        <span className="text-slate-500 text-[11px] font-normal"> ({intItem.location})</span>
                      )}
                    </div>
                    {(intItem.startDate || intItem.endDate) && (
                      <span
                        className="text-[11px] font-bold shrink-0"
                        style={{ color: themeColor }}
                      >
                        {intItem.startDate} {intItem.startDate && (intItem.endDate || intItem.current) ? '–' : ''} {intItem.current ? 'Present' : intItem.endDate}
                      </span>
                    )}
                  </div>

                  {((intItem.highlights && intItem.highlights.length > 0) || intItem.description) && (
                    <div className="text-[11.5px] text-slate-700 pl-1">
                      <ResumeHighlights highlights={(intItem.highlights && intItem.highlights.length > 0) ? intItem.highlights : [intItem.description!]} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Work Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-baseline justify-between gap-1 mb-1"
                  >
                    <div>
                      <span className="text-[12.5px] font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[12px] font-semibold text-slate-700"> • {exp.company}</span>
                      {exp.location && (
                        <span className="text-slate-500 text-[11px] font-normal"> ({exp.location})</span>
                      )}
                    </div>
                    <span
                      className="text-[11px] font-bold shrink-0"
                      style={{ color: themeColor }}
                    >
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
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

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certifications & Online Courses')}
            <div className="space-y-1 text-[11.5px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline gap-2 break-inside-avoid">
                  <span className="text-slate-800">
                    <strong className="font-semibold text-slate-900">• {cert.name}</strong>
                    {cert.issuer && <span className="text-slate-500"> — {cert.issuer}</span>}
                  </span>
                  {cert.date && (
                    <span className="text-[10.5px] text-slate-400 font-medium shrink-0">
                      {cert.date}
                    </span>
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
            {renderSectionHeader('Languages')}
            <div className="flex flex-wrap gap-2 text-[11.5px] text-slate-800">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold text-slate-900">{l.language}</span>
                  {l.proficiency && <span className="text-slate-500"> ({l.proficiency})</span>}
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

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-sans ${paddingClass} text-[12px] leading-normal box-border`}
    >
      {/* Running Header on Page 2+ */}
      {!isFirstPage && (
        <div className="pb-1.5 border-b border-slate-300 mb-3 break-inside-avoid flex items-center justify-between text-[10.5px] text-slate-600 font-medium">
          <span className="font-bold uppercase tracking-wider text-slate-800">
            {personalInfo.fullName || 'Student Resume'} • Indian Campus Placement
          </span>
          <span>
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Indian Placement Cell Header */}
      {isFirstPage && (
        <div
          data-ghost-header="true"
          className={`${headerPadding} border-b-2 break-inside-avoid text-center space-y-1.5`}
          style={{ borderColor: themeColor }}
        >
          <div className="text-3xl font-black uppercase tracking-wider text-slate-900">
            {personalInfo.fullName || 'Candidate Name'}
          </div>

          {personalInfo.jobTitle && (
            <div
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: themeColor }}
            >
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact Line */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600 font-medium pt-1">
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sections Container */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

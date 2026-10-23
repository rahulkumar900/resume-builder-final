'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';
import { Mail, Phone, MapPin, Globe, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/common/BrandIcons';

interface TemplateProps {
  data: ResumeData;
}

export const NaukriTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#0077b5', // Naukri & Corporate Blue
    spacing = 'normal',
  } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2.5' : spacing === 'relaxed' ? 'space-y-4.5' : 'space-y-3.5';
  const headerPadding =
    spacing === 'compact' ? 'pb-3.5 mb-3.5' : spacing === 'relaxed' ? 'pb-6 mb-6' : 'pb-4.5 mb-4.5';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string, badgeText?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center justify-between pb-1.5 mb-2.5 border-b-2 break-after-avoid"
      style={{ borderColor: themeColor }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-4 rounded-xs" style={{ backgroundColor: themeColor }} />
        <div          className="text-[13px] font-black uppercase tracking-wider text-slate-900"
          style={{ color: themeColor }}
        >
          {title}
        </div>
      </div>
      {badgeText && (
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          {badgeText}
        </span>
      )}
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Executive Summary & Career Profile')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[12.5px] text-slate-700 leading-relaxed text-justify"
              />
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Technical Competencies & Core Expertise')}
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              {skills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  data-ghost-item={cat.id || `skill-${idx}`}
                  className="p-2.5 rounded-lg border border-slate-200/90 bg-slate-50/60 flex flex-col gap-1 break-inside-avoid"
                >
                  <span
                    className="font-bold text-[11.5px] uppercase tracking-wide"
                    style={{ color: themeColor }}
                  >
                    {cat.category || 'Core Competencies'}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {cat.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-white text-slate-800 border border-slate-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
                <div
                  key={exp.id}
                  data-ghost-item={exp.id}
                  className="break-inside-avoid pb-3 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-baseline justify-between gap-1 mb-1.5"
                  >
                    <div>
                      <div className="text-[13.5px] font-bold text-slate-900 leading-tight">
                        {exp.role}
                      </div>
                      <div className="text-[12px] font-semibold text-slate-700">
                        {exp.company}
                        {exp.location && (
                          <span className="text-slate-500 font-normal"> • {exp.location}</span>
                        )}
                      </div>
                    </div>
                    <div
                      className="text-[11.5px] font-bold shrink-0 px-2 py-0.5 rounded-full bg-slate-100"
                      style={{ color: themeColor }}
                    >
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="text-[12px] text-slate-700 mt-1 pl-1">
                      <ResumeHighlights highlights={exp.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Key Projects & Delivery Engagements')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  data-ghost-item={proj.id}
                  className="break-inside-avoid p-3 rounded-xl border border-slate-200/80 bg-white shadow-2xs"
                >
                  <div
                    data-ghost-item-header="true"
                    className="flex flex-row items-center justify-between gap-1 mb-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-[13px] font-bold text-slate-900">
                        {proj.title}
                      </div>
                      {proj.link && (
                        <a
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 inline-flex items-center"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {proj.technologies.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="text-[11.5px] text-slate-700">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Educational Credentials')}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[11.5px] border-collapse border border-slate-200 text-left">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-800 font-bold border-b border-slate-200 text-[10.5px] uppercase tracking-wider">
                    <th className="p-2 border border-slate-200">Degree / Qualification</th>
                    <th className="p-2 border border-slate-200">Institution & University</th>
                    <th className="p-2 border border-slate-200 text-center w-20">Year</th>
                    <th className="p-2 border border-slate-200 text-right w-24">Score / CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu) => (
                    <tr
                      key={edu.id}
                      data-ghost-item={edu.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 break-inside-avoid"
                    >
                      <td className="p-2 border border-slate-200 font-bold text-slate-900">
                        {edu.degree}
                      </td>
                      <td className="p-2 border border-slate-200 text-slate-700">
                        <span className="font-semibold">{edu.school}</span>
                        {edu.location && <span className="text-slate-500"> ({edu.location})</span>}
                      </td>
                      <td className="p-2 border border-slate-200 text-center font-medium text-slate-600">
                        {edu.graduationDate || '—'}
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-bold" style={{ color: themeColor }}>
                        {edu.gpa || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certifications & Professional Badges')}
            <div className="grid grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  data-ghost-item={cert.id}
                  className="p-2.5 rounded-lg border border-slate-200/80 bg-white flex items-center justify-between gap-2 break-inside-avoid shadow-2xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-[12px] text-slate-900 truncate">
                      {cert.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{cert.issuer}</div>
                  </div>
                  {cert.date && (
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">
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
            {renderSectionHeader('Languages Known')}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, lidx) => (
                <div
                  key={lang.id || lidx}
                  data-ghost-item={lang.id || `lang-${lidx}`}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-200/80 break-inside-avoid"
                >
                  {lang.language}
                  {lang.proficiency && <span className="font-normal text-slate-500"> ({lang.proficiency})</span>}
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
      {/* Running Header on Subsequent Pages */}
      {!isFirstPage && (
        <div className="pb-2 border-b-2 border-slate-200 mb-4 break-inside-avoid flex items-center justify-between text-[11px] text-slate-600 font-medium">
          <span className="font-bold text-slate-900 uppercase tracking-wide">
            {personalInfo.fullName || 'Resume'} • {personalInfo.jobTitle || 'Professional Profile'}
          </span>
          <span>
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Modern Indian Corporate Header */}
      {isFirstPage && (
        <div data-ghost-header="true" className={`${headerPadding} border-b-2 break-inside-avoid`} style={{ borderColor: themeColor }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="text-3xl font-black uppercase tracking-tight text-slate-900">
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

              {/* Naukri Contact Strip with Icons */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-slate-600 font-medium">
                {personalInfo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.email}</span>
                  </span>
                )}
                {personalInfo.linkedin && (
                  <span className="flex items-center gap-1">
                    <LinkedinIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.github && (
                  <span className="flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
                {personalInfo.website && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Optional Avatar Photo */}
            {personalInfo.avatarUrl && (
              <div className="shrink-0">
                <div className="w-24 h-28 rounded-xl overflow-hidden border-2 p-0.5 bg-white shadow-xs" style={{ borderColor: themeColor }}>
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName || 'Candidate Photo'}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
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

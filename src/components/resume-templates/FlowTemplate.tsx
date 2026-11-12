'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const FlowTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#0284c7',
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3' : spacing === 'relaxed' ? 'mb-5.5' : 'mb-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-10' : 'p-9';

  const order = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="flex items-center gap-2 mb-2">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
      <div className="text-[16px] font-bold tracking-wider uppercase text-slate-900">
        {title}
      </div>
      <div className="flex-1 h-px bg-slate-300 ml-2" />
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('About')}
            <div data-ghost-item="summary-0" className="text-[13.5px] leading-[21px] text-slate-800 pl-4">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid pl-4">
                  <div data-ghost-item-header="true" className="mb-1">
                    <div className="flex flex-row items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[14px] text-slate-900">{exp.role}</span>
                        <span className="text-slate-400 text-xs">@</span>
                        <span className="font-semibold text-[13.5px]" style={{ color: themeColor }}>
                          {exp.company}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[12.5px] font-semibold bg-slate-100 text-slate-700 self-auto">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.location && (
                      <div className="text-[12.5px] text-slate-600 mt-0.5">{exp.location}</div>
                    )}
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-800 text-[13.5px] leading-[20px] pl-3" />
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
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid pl-4">
                  <div data-ghost-item-header="true">
                    <div className="flex flex-row items-center justify-between gap-1">
                      <div className="font-bold text-[14px] text-slate-900">
                        {edu.degree} <span className="font-medium text-slate-700">at {edu.school}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[12.5px] font-semibold bg-slate-100 text-slate-700 self-auto">
                        {edu.graduationDate}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="text-[12.5px] text-slate-700 mt-0.5 font-medium">GPA: {edu.gpa}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Skills')}
            <div className="pl-4 space-y-1.5 text-[13px]">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="flex flex-row items-center gap-2 break-inside-avoid">
                  {cat.category ? <span className="font-bold text-slate-900 shrink-0 min-w-[130px]">{cat.category}:</span> : null}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, sidx) => (
                      <span
                        key={sidx}
                        className="px-2 py-0.5 rounded-md text-[12px] font-semibold bg-slate-100 text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid pl-4">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-[14px] text-slate-900">
                      {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-slate-700 text-[12.5px]">
                          {' '}• {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[12px] text-sky-700 truncate max-w-[180px] font-medium">{proj.link}</span>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-800 text-[13.5px] leading-[20px] pl-3" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certifications')}
            <div className="pl-4 space-y-1.5 text-[13px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="text-slate-800 font-semibold">{cert.name} — {cert.issuer}</span>
                  {cert.date && <span className="text-[12px] text-slate-600 font-medium">{cert.date}</span>}
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
            <div className="pl-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-800">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold text-slate-900">{l.language}</span>
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

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans leading-normal flex flex-col ${paddingClass} text-[13.5px] box-border`}>
      {/* Running Header (Page > 1) */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-2.5 border-b border-slate-300 mb-4 break-inside-avoid flex items-center justify-between text-[12px] font-sans uppercase tracking-wider text-slate-700 font-medium">
          <span style={{ color: themeColor }} className="font-bold">
            {personalInfo?.fullName || 'Candidate'} &mdash; {personalInfo?.jobTitle || 'Resume'}
          </span>
          <span className="text-[11px] text-slate-600 font-normal">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Main Header (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="pb-3 mb-4 break-inside-avoid">
          <div className="text-[26px] font-black tracking-tight" style={{ color: themeColor }}>
            {personalInfo?.fullName || 'Candidate Name'}
          </div>
          {personalInfo?.jobTitle && (
            <p className="text-[13.5px] font-bold text-slate-800 mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[12.5px] text-slate-700 font-medium">
            {personalInfo?.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center gap-1">
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo?.github && (
              <div className="flex items-center gap-1">
                <GithubIcon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Single Column */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {order.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

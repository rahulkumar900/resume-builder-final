'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const OxfordTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#1e3a8a',
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3.5' : spacing === 'relaxed' ? 'mb-6' : 'mb-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2.5' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-10' : 'p-9';

  const order = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="border-b-2 pb-1 mb-2.5 flex items-center justify-between" style={{ borderColor: themeColor }}>
      <h2 className="text-[13px] font-black uppercase tracking-widest" style={{ color: themeColor }}>
        {title}
      </h2>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Executive Profile & Value Proposition')}
            <div data-ghost-item="summary-0" className="text-[12px] leading-relaxed text-slate-700 font-serif text-justify italic">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Core Executive Competencies')}
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {skills.flatMap((cat) => cat.items).map((item, idx) => (
                <div key={idx} data-ghost-item={`skill-${idx}`} className="flex items-center gap-1.5 p-1.5 rounded bg-slate-50 border border-slate-200/80 break-inside-avoid">
                  <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: themeColor }} />
                  <span className="font-semibold text-slate-800 truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Executive Career History')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="mb-1">
                    <div className="flex flex-row items-baseline justify-between gap-1">
                      <span className="font-black text-[13px] text-slate-900 uppercase tracking-wide">
                        {exp.role}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11.5px] font-semibold text-slate-700">
                      <span style={{ color: themeColor }}>{exp.company}</span>
                      {exp.location && <span className="text-slate-500 font-normal">{exp.location}</span>}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[11.5px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Strategic Initiatives & Key Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-[12px] text-slate-900">
                      {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-slate-500 text-[11px]">
                          {' '}— {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[10.5px] text-blue-600 truncate max-w-[180px]">{proj.link}</span>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[11.5px] pl-4" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Academic Credentials')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-row items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-[12px] text-slate-900">{edu.degree}</span>
                      <span className="text-slate-600 text-[11.5px]"> — {edu.school}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {edu.graduationDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Board Certifications & Credentials')}
            <div className="space-y-1 text-[11.5px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="font-semibold text-slate-800">{cert.name} — {cert.issuer}</span>
                  {cert.date && <span className="text-[10.5px] text-slate-500">{cert.date}</span>}
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
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-700">
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

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans leading-normal flex flex-col ${paddingClass} box-border`}>
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
        <div data-ghost-header="true" className="pb-3 mb-4 border-b-4 break-inside-avoid" style={{ borderColor: themeColor }}>
          <h1 className="text-[28px] font-black tracking-tight uppercase" style={{ color: themeColor }}>
            {personalInfo?.fullName || 'Candidate Name'}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-[13.5px] font-bold uppercase tracking-widest text-slate-700 mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-600 font-medium">
            {personalInfo?.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400 shrink-0" />
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

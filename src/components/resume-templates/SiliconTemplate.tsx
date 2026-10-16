'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const SiliconTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#2563eb',
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-2.5' : spacing === 'relaxed' ? 'mb-4.5' : 'mb-3.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-1.5' : spacing === 'relaxed' ? 'space-y-3' : 'space-y-2';
  const paddingClass =
    spacing === 'compact' ? 'p-6' : spacing === 'relaxed' ? 'p-9' : 'p-8';

  const order = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="border-b-2 border-slate-900 pb-0.5 mb-1.5 flex justify-between items-baseline">
      <h2 className="text-[12px] font-black uppercase tracking-wider text-slate-900">
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
            {renderSectionHeader('Summary')}
            <div data-ghost-item="summary-0" className="text-[11px] leading-relaxed text-slate-700">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Technical Skills')}
            <div className="space-y-1 text-[11px] text-slate-800">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="flex flex-row items-baseline gap-1.5 break-inside-avoid">
                  <span className="font-bold text-slate-900 shrink-0 min-w-[140px]">{cat.category}:</span>
                  <span className="text-slate-700">{cat.items.join(', ')}</span>
                </div>
              ))}
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
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex flex-row items-baseline justify-between gap-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-[12px] text-slate-900">{exp.role}</span>
                        <span className="text-slate-400">|</span>
                        <span className="font-semibold text-[11.5px]" style={{ color: themeColor }}>
                          {exp.company}
                        </span>
                      </div>
                      <div className="text-[10.5px] font-semibold text-slate-500 whitespace-nowrap">
                        {exp.location && <span>{exp.location} • </span>}
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[11px] mt-0.5 pl-3.5" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Technical Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-row items-baseline justify-between gap-1 mb-0.5">
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="font-bold text-[12px] text-slate-900">{proj.title}</span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                          {proj.technologies.join(', ')}
                        </span>
                      )}
                    </div>
                    {proj.link && (
                      <a
                        href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10.5px] text-blue-600 hover:underline inline-flex items-center gap-0.5 truncate max-w-[180px]"
                      >
                        <span>{proj.link.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[11px] pl-3.5" />
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
                  <div data-ghost-item-header="true" className="flex flex-row items-baseline justify-between gap-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-[12px] text-slate-900">{edu.school}</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-[11px] text-slate-700">{edu.degree}</span>
                    </div>
                    <div className="text-[10.5px] font-semibold text-slate-500 whitespace-nowrap">
                      {edu.location && <span>{edu.location} • </span>}
                      {edu.graduationDate}
                      {edu.gpa && <span> (GPA: {edu.gpa})</span>}
                    </div>
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
            {renderSectionHeader('Certifications')}
            <div className="space-y-1 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="text-slate-800">
                    <strong className="text-slate-900">{cert.name}</strong>
                    {cert.issuer && <span> — {cert.issuer}</span>}
                  </span>
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
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-700">
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

  const contactList: React.ReactNode[] = [];
  if (personalInfo?.phone) contactList.push(<span key="phone">{personalInfo.phone}</span>);
  if (personalInfo?.email) contactList.push(<span key="email">{personalInfo.email}</span>);
  if (personalInfo?.linkedin) {
    contactList.push(
      <a
        key="linkedin"
        href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
      </a>
    );
  }
  if (personalInfo?.github) {
    contactList.push(
      <a
        key="github"
        href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
      </a>
    );
  }
  if (personalInfo?.website) {
    contactList.push(
      <a
        key="web"
        href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
      </a>
    );
  }
  if (personalInfo?.location) contactList.push(<span key="loc">{personalInfo.location}</span>);

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
        <div data-ghost-header="true" className="text-center pb-2 mb-3 break-inside-avoid">
          <h1 className="text-[26px] font-black tracking-tight uppercase" style={{ color: themeColor }}>
            {personalInfo?.fullName || 'Candidate Name'}
          </h1>
          {personalInfo?.jobTitle && (
            <p className="text-[12.5px] font-bold text-slate-700 tracking-wide mt-0.5">
              {personalInfo.jobTitle}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[10.5px] text-slate-600 mt-1.5 font-medium">
            {contactList.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-400">|</span>}
                {item}
              </React.Fragment>
            ))}
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

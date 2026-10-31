'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Compass } from 'lucide-react';
import { LinkedinIcon } from '@/components/common/BrandIcons';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  hasPageSidebarContent,
} from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const EuropassTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#0369a1',
    spacing = 'normal',
  } = data;

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3' : spacing === 'relaxed' ? 'mb-5' : 'mb-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';
  const paddingClass =
    spacing === 'compact' ? 'p-6' : spacing === 'relaxed' ? 'p-9' : 'p-7';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebar = hasPageSidebarContent(data, sidebarOrder);

  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="flex items-center gap-2 mb-2 pb-1 border-b-2" style={{ borderColor: themeColor }}>
      <div className="text-[12.5px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
        {title}
      </div>
    </div>
  );

  const renderMainSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Professional Profile')}
            <div data-ghost-item="summary-0" className="text-[11.5px] leading-relaxed text-slate-700">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Work Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex flex-row items-baseline justify-between gap-1">
                      <span className="font-bold text-[12.5px] text-slate-900">{exp.role}</span>
                      <span className="text-[10.5px] font-semibold text-slate-500 shrink-0">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11.5px] font-medium text-slate-700 mb-1">
                      <span className="font-semibold text-slate-800">{exp.company}</span>
                      {exp.location && <span className="text-slate-500 font-normal"> | {exp.location}</span>}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[11.5px] pl-3" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Projects & Initiatives')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-[12px] text-slate-900">
                      {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-slate-500 text-[10.5px]">
                          {' '}• {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[10.5px] text-sky-700 truncate max-w-[180px]">{proj.link}</span>
                    )}
                  </div>
                  <ResumeHighlights highlights={proj.highlights} className="text-slate-700 text-[11.5px] pl-3" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education & Training')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="relative pl-3.5 border-l-2 border-sky-700/30 break-inside-avoid">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-sky-700" />
                  <div data-ghost-item-header="true">
                    <div className="flex flex-row items-baseline justify-between gap-1">
                      <span className="font-bold text-[12.5px] text-slate-900">{edu.degree}</span>
                      <span className="text-[10.5px] font-semibold text-slate-500 shrink-0">{edu.graduationDate}</span>
                    </div>
                    <div className="text-[11.5px] font-medium text-slate-700">
                      {edu.school}
                      {edu.location && <span className="text-slate-400 font-normal"> | {edu.location}</span>}
                      {edu.gpa && <span className="text-slate-500 font-normal"> | GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[11.5px] mt-1 pl-3" />}
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

  const renderSidebarSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education & Training')}
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid text-[11px]">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700">{edu.school}</div>
                    <div className="text-[10px] text-slate-500">
                      {edu.graduationDate}
                      {edu.location && <span> | {edu.location}</span>}
                    </div>
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
            {renderSectionHeader('Digital & Technical Skills')}
            <div className="space-y-2 text-[11px]">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="space-y-1 break-inside-avoid">
                  {cat.category ? <div className="font-semibold text-slate-800 text-[10.5px]">{cat.category}</div> : null}
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((item, sidx) => (
                      <span
                        key={sidx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
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

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Mother Tongue & Languages')}
            <div className="space-y-1.5 text-[11px]">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="p-1.5 rounded bg-slate-50 border border-slate-200 flex justify-between items-center break-inside-avoid">
                  <span className="font-bold text-slate-900">{l.language}</span>
                  <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">
                    {l.proficiency}
                  </span>
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
            <div className="space-y-1.5 text-[11px]">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <div className="font-semibold text-slate-900">{cert.name}</div>
                  {cert.issuer && <div className="text-[10px] text-slate-500">{cert.issuer}</div>}
                  {cert.date && <div className="text-[9.5px] text-slate-400">{cert.date}</div>}
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
              itemSpacingClass="space-y-2"
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

      {/* Europass Header (Page 1 only) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="pb-3.5 mb-4 border-b-2 border-slate-200 flex flex-row items-center justify-between gap-3 break-inside-avoid">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
              Curriculum Vitae Europass
            </div>
            <div className="text-[26px] font-black tracking-tight" style={{ color: themeColor }}>
              {personalInfo?.fullName || 'Candidate Name'}
            </div>
            {personalInfo?.jobTitle && (
              <p className="text-[13px] font-bold text-slate-700 mt-0.5">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          <div className="space-y-1 text-[10.5px] text-slate-600 shrink-0">
            {personalInfo?.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo?.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={`grid ${hasSidebar ? 'grid-cols-12 gap-6' : 'grid-cols-1'} flex-1`}>
        <div data-ghost-col="main" className={`${hasSidebar ? 'col-span-8' : 'col-span-12'} flex flex-col`}>
          {mainOrder.map((secId) => renderMainSection(secId))}
        </div>
        {hasSidebar && (
          <div data-ghost-col="sidebar" className="col-span-4 space-y-4">
            {sidebarOrder.map((secId) => renderSidebarSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

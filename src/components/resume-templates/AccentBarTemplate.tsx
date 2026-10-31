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

export const AccentBarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    themeColor = '#1d4ed8', // Refined Royal Blue accent
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2.5' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const resolvedOrder = getResolvedTemplateSectionOrder('accentbar', data);
  const sectionOrder = resolvedOrder.singleColumn || [];

  // Render vertical accent bar followed by wide-tracked uppercase section header
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2 break-after-avoid"
    >
      <div
        className="w-[4px] h-[15px] rounded-[1px] shrink-0"
        style={{ backgroundColor: themeColor }}
      />
      <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-900">
        {title}
      </h2>
    </div>
  );

  // Filter non-empty contact items separated by middle dots
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Summary', 'summary')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[11.5px] text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Experience', 'experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[12.5px] text-slate-900 tracking-tight">
                        {exp.role}
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="text-[11.5px] font-medium text-slate-700">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ''}
                      </div>
                    )}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-slate-700 text-[11px] leading-normal pt-0.5 space-y-0.5"
                    />
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
            {renderSectionHeader('Projects', 'projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[12.5px] text-slate-900 tracking-tight">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[11px] text-slate-500 font-normal">
                          ({proj.technologies.join(', ')})
                        </span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="text-[11px] text-blue-600 truncate max-w-[200px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-slate-700 text-[11px] leading-normal pt-0.5"
                    />
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
            {renderSectionHeader('Education', 'education')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-bold text-[12.5px] text-slate-900 tracking-tight">
                      {edu.degree}
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-slate-700">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA: ${edu.gpa}` : ''}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="text-slate-600 text-[11px] leading-normal pt-0.5"
                    />
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
            {renderSectionHeader('Certifications', 'certifications')}
            <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-medium text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> — {cert.issuer}</span>}
                  {cert.date && <span className="text-slate-500"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" data-ghost-section="achievements" className={sectionMarginClass}>
            {renderSectionHeader('Achievements', 'achievements')}
            <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-800">
              {achievements.map((ach) => (
                <li key={ach.id} data-ghost-item={ach.id} className="break-inside-avoid">
                  <span className="font-medium text-slate-900">{ach.title}</span>
                  {ach.date && <span className="text-slate-500"> ({ach.date})</span>}
                  {ach.description && <span className="text-slate-700"> — {ach.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        // Flatten skills or render with category prefix
        const hasCategories = activeSkills.some((cat) => Boolean(cat.category && cat.category.trim()));

        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Skills', 'skills')}
            <div className="space-y-1.5 text-[11.5px] text-slate-800 leading-relaxed">
              {hasCategories ? (
                activeSkills.map((cat, idx) => (
                  <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`}>
                    {cat.category && (
                      <span className="font-bold text-slate-900 mr-1.5">{cat.category}:</span>
                    )}
                    <span>{cat.items.join(' · ')}</span>
                  </div>
                ))
              ) : (
                <div data-ghost-item="skill-flat">
                  {activeSkills.flatMap((cat) => cat.items).join(' · ')}
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Languages', 'languages')}
            <div className="text-[11.5px] text-slate-800">
              {languages.map((l, idx) => (
                <span key={l.id || idx} data-ghost-item={l.id || `lang-${idx}`}>
                  {idx > 0 && ' · '}
                  <span className="font-medium">{l.language}</span>
                  {l.proficiency && <span className="text-slate-500"> ({l.proficiency})</span>}
                </span>
              ))}
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
            renderHeader={(title, id) => renderSectionHeader(title, id)}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans flex flex-col box-border ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-slate-300 pb-2 mb-4 flex items-center justify-between text-xs font-semibold text-slate-600 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Refined Header matching PDF Page 1 (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="border-b border-slate-900 pb-2.5 mb-2 break-inside-avoid"
        >
          <h1 className="font-serif text-[32px] sm:text-[35px] font-black tracking-tight text-slate-900 leading-tight">
            {personalInfo.fullName}
          </h1>

          {personalInfo.jobTitle && (
            <div
              className="text-[11px] font-bold tracking-[0.2em] uppercase mt-1"
              style={{ color: themeColor }}
            >
              {personalInfo.jobTitle}
            </div>
          )}

          {contactItems.length > 0 && (
            <div className="text-[11.5px] text-slate-600 mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-400 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Dynamic Sections Loop */}
      <div data-ghost-col="single" className="space-y-1 flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

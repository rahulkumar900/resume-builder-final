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
    themeColor = '#1F3DD6', // Meridian Blue accent
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

  // Render vertical accent bar followed by wide-tracked uppercase section header (Manrope 11px / 16.5px, 700 bold, #222222)
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2 break-after-avoid"
    >
      <div
        className="w-[4px] h-[15px] rounded-[1px] shrink-0"
        style={{ backgroundColor: themeColor || '#1F3DD6' }}
      />
      <h2 className="font-manrope text-[11px] font-bold uppercase tracking-[0.2em] text-[#222222] leading-[16.5px]">
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
                className="font-manrope text-[12.5px] text-[#222222] leading-[18.8px] font-normal"
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
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-manrope font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                        {exp.role}
                      </span>
                      <span className="font-manrope font-medium text-[12.5px] text-[#222222] leading-[18.8px]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="font-manrope font-normal text-[12.5px] text-[#222222] leading-[18.8px]">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ''}
                      </div>
                    )}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5 space-y-0.5"
                      itemClassName="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
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
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-manrope font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-manrope text-[12.5px] text-[#222222]/80 font-normal">
                          ({proj.technologies.join(', ')})
                        </span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="font-manrope text-[12.5px] text-[#1F3DD6] truncate max-w-[200px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5"
                      itemClassName="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
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
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-manrope font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                      {edu.degree}
                    </span>
                    <span className="font-manrope font-medium text-[12.5px] text-[#222222] leading-[18.8px]">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="font-manrope font-normal text-[12.5px] text-[#222222] leading-[18.8px]">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA: ${edu.gpa}` : ''}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5"
                      itemClassName="font-manrope text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
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
            <ul className="list-disc list-outside pl-4 space-y-1 font-manrope text-[12.5px] text-[#222222] leading-[18.8px]">
              {certifications.map((cert, idx) => (
                <li key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="break-inside-avoid">
                  <span className="font-bold text-[#222222]">{cert.name}</span>
                  {cert.issuer && <span className="text-[#222222]"> — {cert.issuer}</span>}
                  {cert.date && <span className="text-[#222222]/80"> ({cert.date})</span>}
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
            <ul className="list-disc list-outside pl-4 space-y-1 font-manrope text-[12.5px] text-[#222222] leading-[18.8px]">
              {achievements.map((ach, idx) => (
                <li key={ach.id || idx} data-ghost-item={ach.id || `ach-${idx}`} className="break-inside-avoid">
                  <span className="font-bold text-[#222222]">{ach.title}</span>
                  {ach.date && <span className="text-[#222222]/80"> ({ach.date})</span>}
                  {ach.description && <span className="text-[#222222]"> — {ach.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        const hasCategories = activeSkills.some((cat) => Boolean(cat.category && cat.category.trim()));

        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Skills', 'skills')}
            <div className="space-y-1.5 font-manrope text-[12.5px] text-[#222222] leading-[18.8px] font-normal">
              {hasCategories ? (
                activeSkills.map((cat, idx) => (
                  <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`}>
                    {cat.category && (
                      <span className="font-bold text-[#222222] mr-1.5">{cat.category}:</span>
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
            <div className="font-manrope text-[12.5px] text-[#222222] leading-[18.8px]">
              {languages.map((l, idx) => (
                <span key={l.id || idx} data-ghost-item={l.id || `lang-${idx}`}>
                  {idx > 0 && ' · '}
                  <span className="font-medium">{l.language}</span>
                  {l.proficiency && <span className="text-[#222222]/80"> ({l.proficiency})</span>}
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
    <div className={`w-full h-full min-h-[297mm] bg-white text-[#222222] font-manrope flex flex-col box-border ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-[#222222]/20 pb-2 mb-4 flex items-center justify-between text-xs font-semibold text-[#222222] break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor || '#1F3DD6' }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Refined Meridian Header (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="border-b border-[#222222]/30 pb-2.5 mb-2 break-inside-avoid"
        >
          <h1 className="font-fraunces text-[40px] font-bold text-[#222222] leading-[40px] tracking-tight">
            {personalInfo.fullName}
          </h1>

          {personalInfo.jobTitle && (
            <div
              data-ghost-role="true"
              className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase mt-1 leading-[16.5px]"
              style={{ color: themeColor || '#1F3DD6' }}
            >
              {personalInfo.jobTitle}
            </div>
          )}

          {contactItems.length > 0 && (
            <div className="font-manrope text-[11.5px] text-[#222222]/80 mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 leading-[16.5px]">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#222222]/40 font-bold">·</span>}
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

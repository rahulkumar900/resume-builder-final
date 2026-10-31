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

export const NumberedTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    themeColor = '#f59e0b', // Iconic warm Amber/Gold accent
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const contentPadding =
    spacing === 'compact' ? 'p-5 sm:p-6' : spacing === 'relaxed' ? 'p-8 sm:p-10' : 'p-6 sm:p-8';
  const blockSpacing =
    spacing === 'compact' ? 'pb-4 mb-4' : spacing === 'relaxed' ? 'pb-6 mb-6' : 'pb-5 mb-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('numbered', data);
  const sectionOrder = resolvedOrder.singleColumn || [];

  // Filter non-empty contact items separated by middle dots
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Render an indexed section container with left column (number + title) and right column (content)
  const renderNumberedBlock = (
    indexNum: number,
    title: string,
    secId: string,
    children: React.ReactNode
  ) => {
    const formattedNum = indexNum < 10 ? `0${indexNum}` : `${indexNum}`;

    return (
      <div
        key={secId}
        data-ghost-section={secId}
        className={`flex flex-col sm:flex-row gap-3 sm:gap-6 border-b border-dashed border-slate-200/90 last:border-b-0 ${blockSpacing} break-inside-avoid`}
      >
        {/* Left column: 2-digit index and uppercase title */}
        <div className="w-full sm:w-28 shrink-0 flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0.5">
          <span
            data-ghost-section-title="true"
            className="text-[22px] sm:text-[25px] font-black tracking-tight text-slate-900 leading-none"
          >
            {formattedNum}
          </span>
          <span
            className="text-[10.5px] font-black uppercase tracking-[0.18em]"
            style={{ color: themeColor }}
          >
            {title}
          </span>
        </div>

        {/* Right column: Main section content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  };

  // Determine active sections to number consecutively
  const renderActiveSection = (secId: ResumeSectionId, activeIdx: number) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return renderNumberedBlock(
          activeIdx,
          'Profile',
          'summary',
          <div data-ghost-item="summary-0">
            <RichText
              content={personalInfo.summary}
              className="text-[11.5px] text-slate-700 leading-relaxed"
            />
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Experience',
          'experience',
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
                    <div className="text-[11.5px] font-medium text-slate-600">
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
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Education',
          'education',
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
                <div className="text-[11.5px] text-slate-600">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ''}
                  {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
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
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Projects',
          'projects',
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
        );

      case 'achievements':
      case 'certifications': {
        const hasAchs = achievements && achievements.length > 0;
        const hasCerts = certifications && certifications.length > 0;
        if (!hasAchs && !hasCerts) return null;

        return renderNumberedBlock(
          activeIdx,
          secId === 'certifications' ? 'Certifications' : 'Awards',
          secId,
          <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700">
            {secId === 'certifications'
              ? certifications.map((c) => (
                  <li key={c.id} data-ghost-item={c.id}>
                    <span className="font-medium text-slate-900">{c.name}</span>
                    {c.issuer && <span className="text-slate-500"> ({c.issuer})</span>}
                    {c.date && <span className="text-slate-500"> — {c.date}</span>}
                  </li>
                ))
              : achievements.map((a) => (
                  <li key={a.id} data-ghost-item={a.id}>
                    <span className="font-medium text-slate-900">{a.title}</span>
                    {a.date && <span className="text-slate-500"> ({a.date})</span>}
                    {a.description && <span className="text-slate-600"> — {a.description}</span>}
                  </li>
                ))}
          </ul>
        );
      }

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        const allSkillItems = activeSkills.flatMap((cat) => cat.items);

        return renderNumberedBlock(
          activeIdx,
          'Skills',
          'skills',
          <div className="space-y-1 text-[11.5px] text-slate-700 leading-relaxed">
            <div>{allSkillItems.join(' / ')}</div>
            {languages && languages.length > 0 && (
              <div className="text-slate-500 pt-0.5">
                {languages.map((l) => `${l.language} (${l.proficiency || 'fluent'})`).join(' / ')}
              </div>
            )}
          </div>
        );
      }

      default:
        return renderNumberedBlock(
          activeIdx,
          secId.charAt(0).toUpperCase() + secId.slice(1),
          secId,
          <UniversalSectionRenderer
            secId={secId}
            data={data}
            renderHeader={() => null}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  // Assign sequential 1-based index numbers only to sections that have content
  let currentNum = 1;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans flex flex-col box-border">
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-slate-300 px-7 sm:px-9 py-2.5 mb-2 flex items-center justify-between text-xs font-semibold text-slate-700 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Dark Slate Header Banner matching PDF Page 2 (Page 1 only) */}
      {isPage1 && (
        <>
          <header
            data-ghost-header="true"
            className="bg-[#111827] text-white px-7 py-6 sm:px-9 sm:py-7 break-inside-avoid"
          >
            <h1 className="text-[30px] sm:text-[34px] font-black text-white tracking-tight leading-tight">
              {personalInfo.fullName}
            </h1>

            <div className="text-[11.5px] text-slate-300 font-medium mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              {personalInfo.jobTitle && (
                <>
                  <span className="font-semibold text-white">{personalInfo.jobTitle}</span>
                  {contactItems.length > 0 && <span className="text-slate-400 font-bold">—</span>}
                </>
              )}

              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-500 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </header>

          {/* Gold / Amber Accent Stripe */}
          <div className="h-[4px] w-full" style={{ backgroundColor: themeColor }} />
        </>
      )}

      {/* Main Indexed Sections Content */}
      <div data-ghost-col="single" className={`${contentPadding} flex-1`}>
        {sectionOrder.map((secId) => {
          const rendered = renderActiveSection(secId, currentNum);
          if (rendered) {
            currentNum += 1;
          }
          return rendered;
        })}
      </div>
    </div>
  );
};

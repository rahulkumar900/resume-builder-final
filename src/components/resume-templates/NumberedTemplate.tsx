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
    awards = [],
    themeColor = '#A36B00', // Signature Ledger Ochre/Gold accent
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const contentPadding =
    spacing === 'compact' ? 'p-5 sm:p-6' : spacing === 'relaxed' ? 'p-8 sm:p-10' : 'p-6 sm:p-8';
  const blockSpacing =
    spacing === 'compact' ? 'pb-4 mb-4' : spacing === 'relaxed' ? 'pb-6 mb-6' : 'pb-5 mb-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const isSectionVisible = (secId: ResumeSectionId | string): boolean => {
    switch (secId) {
      case 'summary':
        return Boolean(personalInfo.summary?.trim());
      case 'experience':
        return Boolean(experience && experience.length > 0);
      case 'volunteer':
        return Boolean(data.volunteer && data.volunteer.length > 0);
      case 'internships':
        return Boolean(data.internships && data.internships.length > 0);
      case 'freelance':
        return Boolean(data.freelance && data.freelance.length > 0);
      case 'leadership':
        return Boolean(data.leadership && data.leadership.length > 0);
      case 'teaching':
        return Boolean(data.teaching && data.teaching.length > 0);
      case 'militaryService':
        return Boolean(data.militaryService && data.militaryService.length > 0);
      case 'extracurricular':
        return Boolean(data.extracurricular && data.extracurricular.length > 0);
      case 'education':
        return Boolean(education && education.length > 0);
      case 'research':
        return Boolean(data.research && data.research.length > 0);
      case 'publications':
        return Boolean(data.publications && data.publications.length > 0);
      case 'conferences':
        return Boolean(data.conferences && data.conferences.length > 0);
      case 'patents':
        return Boolean(data.patents && data.patents.length > 0);
      case 'certifications':
        return Boolean(certifications && certifications.length > 0);
      case 'awards':
        return Boolean(awards && awards.length > 0);
      case 'achievements':
        return Boolean(achievements && achievements.length > 0);
      case 'courses':
        return Boolean(data.courses && data.courses.length > 0);
      case 'licenses':
        return Boolean(data.licenses && data.licenses.length > 0);
      case 'organizations':
        return Boolean(data.organizations && data.organizations.length > 0);
      case 'skills':
        return (skills || []).some((cat) => cat.enabled !== false && cat.items && cat.items.length > 0);
      case 'languages':
        return Boolean(languages && languages.length > 0);
      case 'interests':
        return Boolean(data.interests && data.interests.length > 0);
      case 'testScores':
        return Boolean(data.testScores && data.testScores.length > 0);
      case 'projects':
        return Boolean(projects && projects.length > 0);
      case 'professionalLinks':
        return Boolean(data.professionalLinks && data.professionalLinks.length > 0);
      case 'socialLinks':
        return Boolean(data.socialLinks && data.socialLinks.length > 0);
      case 'portfolio':
        return Boolean(data.portfolio && data.portfolio.length > 0);
      case 'openSource':
        return Boolean(data.openSource && data.openSource.length > 0);
      case 'speaking':
        return Boolean(data.speaking && data.speaking.length > 0);
      case 'references':
        return Boolean(data.references && data.references.length > 0);
      default:
        if (data.customSections && data.customSections.length > 0) {
          const cs = data.customSections.find((c) => c.id === secId);
          return Boolean(cs && cs.items && cs.items.length > 0);
        }
        return false;
    }
  };

  const resolvedOrder = getResolvedTemplateSectionOrder('numbered', data);
  const sectionOrder: ResumeSectionId[] = (
    data.sectionOrder?.singleColumn ||
    resolvedOrder.singleColumn ||
    []
  ).filter((s) => !data.hiddenSections?.includes(s) && isSectionVisible(s));

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
        className={`flex flex-col sm:flex-row gap-3 sm:gap-6 border-b border-dashed border-neutral-200/90 last:border-b-0 ${blockSpacing} break-inside-avoid`}
      >
        {/* Left column: 2-digit index (26px, #111111) and uppercase title (Space Grotesk 11px / 16.5px, 700 bold, #A36B00) */}
        <div className="w-full sm:w-28 shrink-0 flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0.5">
          <span
            className="font-spacegrotesk text-[26px] font-bold tracking-tight text-[#111111] leading-none"
          >
            {formattedNum}
          </span>
          <span
            data-ghost-section-title="true"
            className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.18em] leading-[16.5px]"
            style={{ color: themeColor || '#A36B00' }}
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
              className="font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px] font-normal"
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
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="space-y-1 break-inside-avoid">
                <div data-ghost-item-header="true">
                  <div className="flex justify-between items-baseline">
                    <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                      {exp.role}
                    </span>
                    <span className="font-spacegrotesk font-medium text-[12.5px] text-[#222222] leading-[18.8px]">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px]">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </div>
                  )}
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={exp.highlights}
                    className="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5 space-y-0.5"
                    itemClassName="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
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
            {education.map((edu, idx) => (
              <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="space-y-0.5 break-inside-avoid">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                    {edu.degree}
                  </span>
                  <span className="font-spacegrotesk font-medium text-[12.5px] text-[#222222] leading-[18.8px]">
                    {edu.graduationDate}
                  </span>
                </div>
                <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px]">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ''}
                  {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={edu.highlights}
                    className="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5"
                    itemClassName="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
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
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="space-y-0.5 break-inside-avoid">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                      {proj.title}
                    </span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="font-spacegrotesk text-[12.5px] text-[#222222]/80 font-normal">
                        ({proj.technologies.join(', ')})
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <span className="font-spacegrotesk text-[12.5px] text-[#A36B00] truncate max-w-[200px]">
                      {proj.link}
                    </span>
                  )}
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5"
                    itemClassName="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 'leadership':
        if (!data.leadership || data.leadership.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Leadership',
          'leadership',
          <div className={itemSpaceClass}>
            {data.leadership.map((lead, idx) => (
              <div key={lead.id || idx} data-ghost-item={lead.id || `lead-${idx}`} className="space-y-1 break-inside-avoid">
                <div data-ghost-item-header="true">
                  <div className="flex justify-between items-baseline">
                    <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px]">
                      {lead.role}
                    </span>
                    <span className="font-spacegrotesk font-medium text-[12.5px] text-[#222222] leading-[18.8px]">
                      {lead.startDate} – {lead.current ? 'Present' : lead.endDate}
                    </span>
                  </div>
                  {lead.organization && (
                    <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px]">
                      {lead.organization}
                    </div>
                  )}
                </div>
                {lead.highlights && lead.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={lead.highlights}
                    className="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal pt-0.5 space-y-0.5"
                    itemClassName="font-spacegrotesk text-[#222222] text-[12.5px] leading-[18.8px] font-normal"
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Awards',
          'awards',
          <ul className="list-disc list-outside pl-4 space-y-1 font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px]">
            {awards.map((a, idx) => (
              <li key={a.id || idx} data-ghost-item={a.id || `award-${idx}`}>
                <span className="font-bold text-[#222222]">{a.title}</span>
                {a.date && <span className="text-[#222222]/80"> ({a.date})</span>}
                {a.issuer && <span className="text-[#222222]"> — {a.issuer}</span>}
              </li>
            ))}
          </ul>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Certifications',
          'certifications',
          <ul className="list-disc list-outside pl-4 space-y-1 font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px]">
            {certifications.map((c, idx) => (
              <li key={c.id || idx} data-ghost-item={c.id || `cert-${idx}`}>
                <span className="font-bold text-[#222222]">{c.name}</span>
                {c.issuer && <span className="text-[#222222]"> ({c.issuer})</span>}
                {c.date && <span className="text-[#222222]/80"> — {c.date}</span>}
              </li>
            ))}
          </ul>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Achievements',
          'achievements',
          <ul className="list-disc list-outside pl-4 space-y-1 font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px]">
            {achievements.map((a, idx) => (
              <li key={a.id || idx} data-ghost-item={a.id || `ach-${idx}`}>
                <span className="font-bold text-[#222222]">{a.title}</span>
                {a.date && <span className="text-[#222222]/80"> ({a.date})</span>}
                {a.description && <span className="text-[#222222]"> — {a.description}</span>}
              </li>
            ))}
          </ul>
        );

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        const allSkillItems = activeSkills.flatMap((cat) => cat.items);

        return renderNumberedBlock(
          activeIdx,
          'Skills',
          'skills',
          <div className="space-y-1 font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px] font-normal">
            <div>{allSkillItems.join(' / ')}</div>
          </div>
        );
      }

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return renderNumberedBlock(
          activeIdx,
          'Languages',
          'languages',
          <div className="space-y-1 font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px] font-normal">
            {languages.map((l, idx) => (
              <div key={idx} data-ghost-item={`lang-${idx}`} className="flex justify-between items-baseline">
                <span className="font-medium text-[#222222]">{l.language}</span>
                <span className="text-[#222222]/80">{l.proficiency || 'Fluent'}</span>
              </div>
            ))}
          </div>
        );

      default:
        if (!isSectionVisible(secId)) return null;
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
    <div className="w-full h-full min-h-[297mm] bg-white text-[#222222] font-spacegrotesk flex flex-col box-border">
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-neutral-300 px-7 sm:px-9 py-2.5 mb-2 flex items-center justify-between text-xs font-semibold text-[#222222] break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor || '#A36B00' }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Dark Slate / Black Header Banner matching Ledger (Page 1 only) */}
      {isPage1 && (
        <>
          <header
            data-ghost-header="true"
            className="bg-[#111111] text-[#F4F1EA] px-7 py-6 sm:px-9 sm:py-7 break-inside-avoid"
          >
            <h1 className="font-spacegrotesk text-[38px] font-bold text-[#F4F1EA] leading-[57px] tracking-tight">
              {personalInfo.fullName}
            </h1>

            <div className="font-spacegrotesk text-[12px] text-[#F4F1EA] font-normal mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 leading-[18px]">
              {personalInfo.jobTitle && (
                <>
                  <span data-ghost-role="true" className="font-normal text-[#F4F1EA]">{personalInfo.jobTitle}</span>
                  {contactItems.length > 0 && <span className="text-[#F4F1EA]/60">—</span>}
                </>
              )}

              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#F4F1EA]/60 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </header>

          {/* Gold / Ochre Accent Stripe */}
          <div className="h-[4px] w-full" style={{ backgroundColor: themeColor || '#A36B00' }} />
        </>
      )}

      {/* Main Indexed Sections Content */}
      <div data-ghost-col="single" className={`${contentPadding} flex-1`}>
        {sectionOrder.map((secId) => {
          const sectionNum = data.sectionNumberMap?.[secId] ?? currentNum;
          const rendered = renderActiveSection(secId, sectionNum);
          if (rendered) {
            currentNum += 1;
          }
          return rendered;
        })}
      </div>
    </div>
  );
};

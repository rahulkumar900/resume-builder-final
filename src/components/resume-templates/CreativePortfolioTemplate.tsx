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

export const CreativePortfolioTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    awards = [],
    achievements = [],
    themeColor = '#ff6b6b', // Coral badge accent matching PDF Page 10
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mb-4' : spacing === 'relaxed' ? 'mb-6' : 'mb-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  // Strictly follow resolved section order (respecting active sections and custom ordering)
  const resolvedOrder = getResolvedTemplateSectionOrder('creative_portfolio', data);
  const mainSectionIds = resolvedOrder.mainColumn || [];
  const sidebarSectionIds = resolvedOrder.sidebarColumn || [];
  const hasSidebar = sidebarSectionIds.length > 0;

  // Filter non-empty contact items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Vibrant pastel vertical colorblock accents for sidebar sections matching PDF Page 10
  const sidebarAccentColors = ['#ffe66d', '#ff9ec7', '#9be7ff', '#c7f464', '#ff6b6b', '#4ecdc4'];

  const renderSectionHeader = (title: string, secId: ResumeSectionId, isSidebar: boolean = false) => (
    <h2
      data-ghost-section-title="true"
      className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-900 break-after-avoid mb-2.5"
    >
      {title}
    </h2>
  );

  // Section rendering logic adhering strictly to PDF Page 10 and user section order
  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false, sidebarIdx: number = 0) => {
    const accentColor = sidebarAccentColors[sidebarIdx % sidebarAccentColors.length];

    switch (secId) {
      case 'summary': {
        const rawSummary = personalInfo?.summary || (data as any)?.summary || '';
        if (!rawSummary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Hello!', 'summary', isSidebar)}
            <div data-ghost-item="summary-0" className="text-[12px] text-neutral-800 leading-relaxed font-normal">
              <RichText content={rawSummary} />
            </div>
          </div>
        );
      }

      case 'experience': {
        const validExperience = (experience || []).filter(
          (exp) =>
            exp.role?.trim() ||
            exp.company?.trim() ||
            (exp as any).description?.trim() ||
            (exp.highlights && exp.highlights.length > 0)
        );
        if (validExperience.length === 0) return null;

        const content = (
          <div className={itemSpaceClass}>
            {validExperience.map((exp) => (
              <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid space-y-1">
                <div data-ghost-item-header="true">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[13px] text-neutral-900">
                      {exp.role}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-600 whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="text-[11.5px] font-medium text-neutral-700 mt-0.5">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </div>
                  )}
                </div>

                {(exp as any).description && (
                  <div className="text-[11px] text-neutral-800 leading-normal pt-0.5">
                    {(exp as any).description}
                  </div>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-0.5">
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-neutral-800 text-[11px] leading-relaxed space-y-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

        return (
          <div
            key="experience"
            data-ghost-section="experience"
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader('Experience', 'experience', isSidebar)}
            {content}
          </div>
        );
      }

      case 'projects': {
        const validProjects = (projects || []).filter(
          (proj) =>
            proj.title?.trim() ||
            (proj as any).description?.trim() ||
            (proj.highlights && proj.highlights.length > 0)
        );
        if (validProjects.length === 0) return null;

        const content = (
          <div className={itemSpaceClass}>
            {validProjects.map((proj) => (
              <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                  <span className="font-bold text-[12px] text-neutral-900">
                    {proj.title}
                  </span>
                  {(proj as any).year || (proj as any).date ? (
                    <span className="text-[11px] font-medium text-neutral-600 whitespace-nowrap">
                      {(proj as any).year || (proj as any).date}
                    </span>
                  ) : null}
                </div>
                {(proj as any).description && (
                  <div className="text-[11px] text-neutral-700 leading-normal">
                    {(proj as any).description}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="pt-0.5">
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-neutral-800 text-[11px] leading-relaxed space-y-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

        return (
          <div
            key="projects"
            data-ghost-section="projects"
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader('Selected Work', 'projects', isSidebar)}
            {content}
          </div>
        );
      }

      case 'skills': {
        if (!skills || skills.length === 0) return null;
        const inlineSkillsList: string[] = [];
        skills.forEach((cat) => {
          if (cat.items && cat.items.length > 0) {
            inlineSkillsList.push(...cat.items);
          }
        });
        if (inlineSkillsList.length === 0) return null;

        return (
          <div
            key="skills"
            data-ghost-section="skills"
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader('Skills', 'skills', isSidebar)}
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-1.5">
              {inlineSkillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-white border border-neutral-300 px-2 py-0.5 text-[11px] font-medium text-neutral-800 rounded shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;
        const content = (
          <div className={itemSpaceClass}>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                  <span className="font-bold text-[12px] text-neutral-900">
                    {edu.degree}
                  </span>
                  {edu.graduationDate && (
                    <span className="text-[11px] font-medium text-neutral-600 whitespace-nowrap">
                      {edu.graduationDate}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-700">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ''}
                  {edu.gpa ? ` · ${edu.gpa}` : ''}
                </div>
              </div>
            ))}
          </div>
        );

        return (
          <div
            key="education"
            data-ghost-section="education"
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader('Education', 'education', isSidebar)}
            {content}
          </div>
        );
      }

      case 'certifications':
      case 'awards':
      case 'achievements': {
        const list = secId === 'awards' ? awards : secId === 'certifications' ? certifications : achievements;
        if (!list || list.length === 0) return null;
        const title = secId === 'awards' ? 'Recognition' : secId === 'certifications' ? 'Certifications' : 'Achievements';

        return (
          <div
            key={secId}
            data-ghost-section={secId}
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader(title, secId, isSidebar)}
            <div className="space-y-1.5 text-[11px] text-neutral-800">
              {list.map((item) => (
                <div key={item.id} data-ghost-item={item.id} className="break-inside-avoid">
                  <span className="font-semibold text-neutral-900">
                    {(item as any).title || (item as any).name}
                  </span>
                  {(item as any).date && (
                    <span className="text-neutral-600 ml-1">({(item as any).date})</span>
                  )}
                  {(item as any).description && (
                    <div className="text-[10.5px] text-neutral-700 mt-0.5 leading-snug">
                      {(item as any).description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;
        return (
          <div
            key="languages"
            data-ghost-section="languages"
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            {renderSectionHeader('Languages', 'languages', isSidebar)}
            <div data-ghost-item="languages-0" className="flex flex-wrap gap-1.5">
              {languages.map((l, idx) => (
                <span
                  key={l.id || idx}
                  className="inline-block bg-white border border-neutral-300 px-2 py-0.5 text-[11px] font-medium text-neutral-800 rounded"
                >
                  {l.language}
                  {l.proficiency ? ` (${l.proficiency})` : ''}
                </span>
              ))}
            </div>
          </div>
        );
      }

      case 'declaration': {
        const isLast = !data.pageNumber || data.pageNumber === (data.totalPages || 1);
        if (!isLast) return null;
        const decl = data.declaration;
        const declText = decl?.text || (data as any).declarationText;
        if (!declText && !decl?.place && !decl?.date && !decl?.signatureName) return null;

        return (
          <div
            key="declaration"
            data-ghost-section="declaration"
            className={`${sectionMarginClass} break-inside-avoid pt-2`}
          >
            <div data-ghost-item="declaration-content" className="space-y-3">
              {declText && (
                <p className="text-[11px] text-neutral-800 italic">
                  {declText}
                </p>
              )}
              <div className="flex justify-between items-end pt-3 text-[11px] text-neutral-800">
                <div className="space-y-1">
                  {decl?.place && <div>Place: {decl.place}</div>}
                  {decl?.date && <div>Date: {decl.date}</div>}
                  {!decl?.place && !decl?.date && personalInfo.location && (
                    <div>Place: {personalInfo.location}</div>
                  )}
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold">Signature</div>
                  <div>({decl?.signatureName || personalInfo.fullName || 'Candidate Signature'})</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'customSections': {
        const customSecs = data.customSections || [];
        if (customSecs.length === 0) return null;
        return (
          <React.Fragment key="customSections">
            {customSecs.map((sec) => (
              <div
                key={sec.id}
                className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
                style={isSidebar ? { borderColor: accentColor } : undefined}
              >
                {renderSectionHeader(sec.title, 'customSections', isSidebar)}
                <div className={itemSpaceClass}>
                  {(sec.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      data-ghost-item={item.id || `${sec.id}-${idx}`}
                      className="break-inside-avoid space-y-0.5"
                    >
                      <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                        <span className="font-bold text-[12px] text-neutral-900">{item.title}</span>
                        {item.date && (
                          <span className="text-[11px] font-medium text-neutral-600 whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] font-medium text-neutral-700">{item.subtitle}</div>
                      )}
                      {item.description && (
                        <div className="text-[11px] text-neutral-800 leading-normal">
                          <RichText content={item.description} />
                        </div>
                      )}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-0.5">
                          <ResumeHighlights
                            highlights={item.highlights}
                            className="text-neutral-800 text-[11px] leading-relaxed space-y-1"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </React.Fragment>
        );
      }

      default:
        return (
          <div
            key={secId}
            data-ghost-section={secId}
            className={`${sectionMarginClass} ${isSidebar ? 'border-l-4 pl-3.5' : ''}`}
            style={isSidebar ? { borderColor: accentColor } : undefined}
          >
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title, id) => renderSectionHeader(title, id, isSidebar)}
              itemSpacingClass={itemSpaceClass}
              isSidebar={isSidebar}
            />
          </div>
        );
    }
  };

  const activeFont = data.fontFamily || 'space_grotesk';
  const fontClass =
    activeFont === 'space_grotesk'
      ? 'font-spacegrotesk'
      : activeFont === 'manrope'
      ? 'font-manrope'
      : `font-${activeFont}`;

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-[#fffdf7] text-neutral-900 flex flex-col box-border ${paddingClass} ${fontClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-neutral-300 pb-2 mb-5 flex items-center justify-between text-[11px] text-neutral-700 break-inside-avoid">
          <span className="font-bold uppercase tracking-wider">
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo.jobTitle && (
            <span className="font-bold text-neutral-800">{personalInfo.jobTitle}</span>
          )}
        </div>
      )}

      {/* Creative Portfolio Header matching PDF Page 10 (Page 1 only) */}
      {isPage1 && (
        <header data-ghost-header="true" className="mb-6 break-inside-avoid">
          {/* Candidate Name in 44-50px Bold Space Grotesk */}
          <h1 className="text-[38px] sm:text-[46px] font-bold uppercase tracking-tight text-neutral-900 leading-none">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>

          {/* Subtitle Badge matching PDF Page 10 */}
          {personalInfo.jobTitle && (
            <div className="mt-2.5">
              <span
                className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white rounded-md shadow-xs"
                style={{ backgroundColor: themeColor }}
              >
                {personalInfo.jobTitle}
              </span>
            </div>
          )}

          {/* Contact Line */}
          {contactItems.length > 0 && (
            <div className="text-[11.5px] text-neutral-700 flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2.5 font-medium">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-neutral-400 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 2-Column Creative Portfolio Grid strictly following resolved user section order */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 flex-1">
        {/* Main Column (~58% width) */}
        <div data-ghost-col="main" className={hasSidebar ? 'md:col-span-7' : 'md:col-span-12'}>
          {mainSectionIds.map((secId) => renderSection(secId, false))}
        </div>

        {/* Sidebar Column (~42% width) with Colorblock Vertical Accent Stripes */}
        {hasSidebar && (
          <div data-ghost-col="sidebar" className="md:col-span-5">
            {sidebarSectionIds.map((secId, sIdx) => renderSection(secId, true, sIdx))}
          </div>
        )}
      </div>
    </div>
  );
};

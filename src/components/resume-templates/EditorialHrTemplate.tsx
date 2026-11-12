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

export const EditorialHrTemplate: React.FC<TemplateProps> = ({ data }) => {
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
    themeColor = '#e4572e', // Terracotta accent matching PDF Page 9
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.pageNumber || data.pageNumber === (data.totalPages || 1);

  const paddingClass =
    spacing === 'compact' ? 'px-8 py-5 sm:px-9 sm:py-6' : spacing === 'relaxed' ? 'px-11 py-9' : 'px-9 py-6 sm:px-10 sm:py-7';
  const sectionSpacingClass =
    spacing === 'compact' ? 'pb-2 mb-2' : spacing === 'relaxed' ? 'pb-3.5 mb-3.5' : 'pb-2.5 mb-2.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-1.5' : spacing === 'relaxed' ? 'space-y-3' : 'space-y-2';

  // Strictly follow resolved section order (respecting active sections and custom ordering)
  const resolvedOrder = getResolvedTemplateSectionOrder('editorial_hr', data);
  const rawSections = resolvedOrder.singleColumn || [];

  // Declaration belongs strictly and only on the last page when active in the section list
  const sectionIds: ResumeSectionId[] = isLastPage
    ? rawSections
    : rawSections.filter((s) => s !== 'declaration');

  // Filter non-empty contact items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ].filter(Boolean);

  // Left-Rail Row Container matching PDF Page 9: Left rail has uppercase label (115px), Right has content
  const renderLeftRailRow = (
    secId: ResumeSectionId,
    title: string,
    children: React.ReactNode
  ) => (
    <div
      key={secId}
      data-ghost-section={secId}
      className={`flex flex-col sm:flex-row gap-3 sm:gap-5 border-b border-neutral-200 last:border-b-0 ${sectionSpacingClass} break-inside-avoid`}
    >
      {/* Left Rail: Uppercase wide-tracked section title */}
      <div className="w-full sm:w-[115px] shrink-0">
        <h2
          data-ghost-section-title="true"
          className="text-[11px] font-bold uppercase tracking-[0.2em] font-manrope leading-[16.5px]"
          style={{ color: themeColor }}
        >
          {title}
        </h2>
      </div>

      {/* Right Column: Main section content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );

  // Section rendering logic adhering strictly to PDF Page 9 and user section order
  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary': {
        const rawSummary = personalInfo?.summary || (data as any)?.summary || '';
        if (!rawSummary?.trim()) return null;
        return renderLeftRailRow(
          'summary',
          'Profile',
          <div data-ghost-item="summary-0" className="text-[12.5px] text-[#222222] leading-[18.8px] font-manrope">
            <RichText content={rawSummary} />
          </div>
        );
      }

      case 'achievements': {
        if (!achievements || achievements.length === 0) return null;
        // Check if achievements have numeric/stat values for Impact grid cards matching PDF Page 9
        const isImpactGrid = achievements.some((item) =>
          item.title && (/^[\d+%]/.test(item.title) || /\d/.test(item.title))
        );

        return renderLeftRailRow(
          'achievements',
          'Impact',
          isImpactGrid ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {achievements.map((item, idx) => (
                <div
                  key={item.id || idx}
                  data-ghost-item={item.id || `impact-${idx}`}
                  className="border border-neutral-300 p-3 bg-white flex flex-col justify-center min-h-[64px] break-inside-avoid"
                >
                  <div
                    className="text-[22px] font-bold leading-none"
                    style={{ color: themeColor, fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" }}
                  >
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-[11px] text-[#222222] font-manrope mt-1 leading-snug">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={itemSpaceClass}>
              {achievements.map((item) => (
                <div key={item.id} data-ghost-item={item.id} className="break-inside-avoid space-y-0.5">
                  <div className="text-[12px] font-bold text-neutral-900 font-sans">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-[11.5px] text-[#222222] font-manrope">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
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

        return renderLeftRailRow(
          'experience',
          'Career',
          <div className={itemSpaceClass}>
            {validExperience.map((exp) => (
              <div
                key={exp.id}
                data-ghost-item={exp.id}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 break-inside-avoid"
              >
                {/* Left sub-rail: Date range with generous width and padding to never collide with timeline bullet */}
                <div className="w-full sm:w-[130px] shrink-0 text-left sm:text-right pr-3.5">
                  <div
                    className="text-[12px] font-bold font-manrope leading-[18.8px]"
                    style={{ color: themeColor || '#E4572E' }}
                  >
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>

                {/* Timeline node */}
                <div className="hidden sm:flex flex-col items-center shrink-0">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: themeColor || '#E4572E' }}
                  />
                  <div
                    className="w-[1.5px] flex-1 my-0.5 min-h-[24px]"
                    style={{ backgroundColor: `${themeColor || '#E4572E'}40` }}
                  />
                </div>

                {/* Right sub-content: Role, Company & Highlights */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div data-ghost-item-header="true">
                    <div className="text-[13px] font-bold text-[#222222] font-manrope leading-[18.8px]">
                      {exp.role}
                    </div>
                    {exp.company && (
                      <div
                        className="text-[12px] tracking-wider uppercase font-semibold font-manrope mt-0.5"
                        style={{ color: themeColor }}
                      >
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </div>
                    )}
                  </div>

                  {(exp as any).description && (
                    <div className="text-[12.5px] text-[#222222] font-manrope leading-[18.8px] pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-0.5">
                      <ResumeHighlights
                        highlights={exp.highlights}
                        className="text-[#222222] text-[12.5px] leading-[18.8px] font-manrope space-y-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
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

        return renderLeftRailRow(
          'projects',
          'Initiatives',
          <div className={itemSpaceClass}>
            {validProjects.map((proj) => (
              <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                  <span className="text-[12px] font-bold text-neutral-900 font-sans">
                    {proj.title}
                  </span>
                  {(proj as any).year || (proj as any).date ? (
                    <span className="text-[11px] text-neutral-800 font-medium font-sans whitespace-nowrap">
                      {(proj as any).year || (proj as any).date}
                    </span>
                  ) : null}
                </div>
                {(proj as any).description && (
                  <div className="text-[11px] text-[#222222] font-sans leading-normal">
                    {(proj as any).description}
                  </div>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <div className="pt-0.5">
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-neutral-800 text-[11px] leading-relaxed font-sans space-y-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;
        return renderLeftRailRow(
          'education',
          'Education',
          <div className={itemSpaceClass}>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                  <span className="text-[12px] font-bold text-neutral-900 font-sans">
                    {edu.degree}
                  </span>
                  {edu.graduationDate && (
                    <span className="text-[11px] text-neutral-800 font-medium font-sans whitespace-nowrap">
                      {edu.graduationDate}
                    </span>
                  )}
                </div>
                <div className="text-[11.5px] text-[#222222] font-sans">
                  {edu.school}
                  {edu.location ? `, ${edu.location}` : ''}
                  {edu.gpa ? ` · ${edu.gpa}` : ''}
                </div>
              </div>
            ))}
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

        return renderLeftRailRow(
          'skills',
          'Skills',
          <div data-ghost-item="skills-0" className="flex flex-wrap gap-2">
            {inlineSkillsList.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block border border-neutral-300 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-800 rounded-full font-sans shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        );
      }

      case 'certifications': {
        if (!certifications || certifications.length === 0) return null;
        return renderLeftRailRow(
          'certifications',
          'Credentials',
          <div className="space-y-1.5 text-[11.5px] font-sans">
            {certifications.map((cert) => (
              <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                <span className="font-semibold text-neutral-900">{cert.name}</span>
                {cert.date && <span className="text-neutral-800 font-medium">({cert.date})</span>}
              </div>
            ))}
          </div>
        );
      }

      case 'awards': {
        if (!awards || awards.length === 0) return null;
        return renderLeftRailRow(
          'awards',
          'Awards',
          <div className="space-y-1.5 text-[11.5px] font-sans">
            {awards.map((award) => (
              <div key={award.id} data-ghost-item={award.id} className="break-inside-avoid">
                <span className="font-semibold text-neutral-900">{award.title}</span>
                {(award as any).date && (
                  <span className="text-neutral-800 font-medium ml-1">({(award as any).date})</span>
                )}
                {(award as any).description && (
                  <div className="text-[11px] text-[#222222] mt-0.5 font-manrope">
                    {(award as any).description}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;
        return renderLeftRailRow(
          'languages',
          'Languages',
          <div data-ghost-item="languages-0" className="flex flex-wrap gap-2">
            {languages.map((l, idx) => (
              <span
                key={l.id || idx}
                className="inline-block border border-neutral-300 bg-neutral-50 px-2.5 py-0.5 text-[11px] font-medium text-neutral-800 rounded font-sans"
              >
                {l.language}
                {l.proficiency ? ` (${l.proficiency})` : ''}
              </span>
            ))}
          </div>
        );
      }

      case 'declaration': {
        if (!isLastPage) return null;
        const decl = data.declaration;
        const declText = decl?.text || (data as any).declarationText;
        if (!declText && !decl?.place && !decl?.date && !decl?.signatureName) return null;

        return renderLeftRailRow(
          'declaration',
          'Declaration',
          <div data-ghost-item="declaration-content" className="space-y-3 font-sans">
            {declText && (
              <p className="text-[11.5px] text-neutral-800 italic">
                {declText}
              </p>
            )}
            <div className="flex justify-between items-end pt-3 text-[11.5px] text-neutral-800">
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
        );
      }

      case 'customSections': {
        const customSecs = data.customSections || [];
        if (customSecs.length === 0) return null;
        return (
          <React.Fragment key="customSections">
            {customSecs.map((sec) =>
              renderLeftRailRow(
                'customSections',
                sec.title,
                <div className={itemSpaceClass}>
                  {(sec.items || []).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      data-ghost-item={item.id || `${sec.id}-${idx}`}
                      className="break-inside-avoid space-y-0.5"
                    >
                      <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                        <span className="font-bold text-[12px] text-neutral-900 font-sans">
                          {item.title}
                        </span>
                        {item.date && (
                          <span className="text-[11px] text-neutral-800 font-medium font-sans whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] italic text-[#222222] font-manrope">
                          {item.subtitle}
                        </div>
                      )}
                      {item.description && (
                        <div className="text-[11px] text-neutral-800 font-sans leading-normal">
                          <RichText content={item.description} />
                        </div>
                      )}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-0.5">
                          <ResumeHighlights
                            highlights={item.highlights}
                            className="text-neutral-800 text-[11px] leading-relaxed font-sans space-y-1"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}
          </React.Fragment>
        );
      }

      default:
        return renderLeftRailRow(
          secId,
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

  const activeFont = data.fontFamily || 'manrope';
  const fontClass =
    activeFont === 'manrope'
      ? 'font-manrope'
      : activeFont === 'space_grotesk'
      ? 'font-spacegrotesk'
      : `font-${activeFont}`;

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-neutral-900 flex flex-col box-border ${paddingClass} ${fontClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-neutral-300 pb-2 mb-4 flex items-center justify-between text-[11px] text-neutral-800 break-inside-avoid">
          <span className="font-bold uppercase tracking-wider">
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo.jobTitle && (
            <span className="italic" style={{ color: themeColor, fontFamily: "'Fraunces', Georgia, serif" }}>
              {personalInfo.jobTitle}
            </span>
          )}
        </div>
      )}

      {/* Editorial Header matching PDF Page 9 (Page 1 only) */}
      {isPage1 && (
        <header data-ghost-header="true" className="mb-4 break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            {/* Candidate Name & Job Title */}
            <div>
              <h1
                className="font-fraunces text-[42px] font-bold tracking-tight text-[#222222] leading-[42px]"
              >
                {personalInfo.fullName || 'Candidate Name'}
              </h1>
              {personalInfo.jobTitle && (
                <div
                  className="font-manrope text-[12.5px] font-bold uppercase tracking-wider mt-2 leading-[18.8px]"
                  style={{ color: themeColor }}
                >
                  {personalInfo.jobTitle}
                </div>
              )}
            </div>

            {/* Right-aligned Contact Information */}
            {contactItems.length > 0 && (
              <div className="text-[11.5px] text-[#222222] font-medium flex flex-col sm:items-end gap-1">
                {contactItems.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            )}
          </div>

          {/* Thick 3px Black Dividing Bar matching PDF Page 9 */}
          <div className="border-b-[3px] border-black mt-3.5" />
        </header>
      )}

      {/* Single Column Content strictly following resolved user section order */}
      <div data-ghost-col="single" className="flex-1">
        {sectionIds.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

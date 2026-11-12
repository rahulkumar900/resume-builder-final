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

export const GovTraditionalTemplate: React.FC<TemplateProps> = ({ data }) => {
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
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3.5' : spacing === 'relaxed' ? 'mb-5' : 'mb-4';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  // Strictly follow resolved section order (respecting active sections and custom ordering)
  const resolvedOrder = getResolvedTemplateSectionOrder('gov_traditional', data);
  const rawSections = resolvedOrder.singleColumn || [];
  const isLastPage = !data.pageNumber || data.pageNumber === (data.totalPages || 1);

  // Declaration belongs strictly and only on the last page if active in rawSections
  const sectionIds: ResumeSectionId[] = isLastPage
    ? rawSections
    : rawSections.filter((s) => s !== 'declaration');

  // Contact items filter
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Sarkari Official Grey Section Header Bar matching PDF Page 8:
  // bg-[#e9e9e9] with 1px border #999999, bold uppercase serif text
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="bg-[#e9e9e9] border border-[#999999] px-3 py-1 font-serif font-bold text-[12.5px] uppercase tracking-wider text-[#111111] leading-[17px] break-after-avoid mb-2.5"
    >
      {title}
    </div>
  );

  // Section rendering logic adhering strictly to PDF Page 8 and user section order
  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary': {
        const rawSummary = personalInfo?.summary || (data as any)?.summary || '';
        if (!rawSummary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Career Objective', 'summary')}
            <div data-ghost-item="summary-0" className="text-[11.5px] text-[#111111] leading-[16px] text-justify px-0.5">
              <RichText content={rawSummary} />
            </div>
          </div>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Educational Qualifications', 'education')}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-[11px] border-collapse border border-neutral-400 text-left font-serif">
                <thead>
                  <tr className="bg-[#e9e9e9] text-black font-bold border-b border-neutral-400 text-[11px]">
                    <th className="p-1.5 border border-neutral-400 w-[30%]">Qualification</th>
                    <th className="p-1.5 border border-neutral-400 w-[52%]">Board / University</th>
                    <th className="p-1.5 border border-neutral-400 text-center w-[18%]">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu, idx) => {
                    const boardUnivText = [
                      edu.school,
                      edu.location,
                      edu.gpa ? `${edu.gpa}` : null,
                    ]
                      .filter(Boolean)
                      .join(', ');

                    return (
                      <tr
                        key={edu.id || idx}
                        data-ghost-item={edu.id || `edu-${idx}`}
                        className="border-b border-neutral-400 break-inside-avoid bg-white"
                      >
                        <td className="p-1.5 border border-neutral-400 font-bold text-black align-top">
                          {edu.degree}
                        </td>
                        <td className="p-1.5 border border-neutral-400 text-black align-top">
                          {boardUnivText || 'Recognized Board / University'}
                        </td>
                        <td className="p-1.5 border border-neutral-400 text-center text-black align-top font-medium whitespace-nowrap">
                          {(edu as any).startDate && edu.graduationDate
                            ? `${(edu as any).startDate} – ${edu.graduationDate}`
                            : edu.graduationDate || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Work Experience', 'experience')}
            <div className={itemSpaceClass}>
              {validExperience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid space-y-0.5">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[12px] text-[#111111]">
                      {exp.role}
                    </span>
                    <span className="text-[11.5px] text-[#111111] font-normal whitespace-nowrap">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="text-[11.5px] italic text-[#111111]/80">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </div>
                  )}
                  {(exp as any).description && (
                    <div className="text-[11.5px] text-[#111111] leading-[16px] pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pl-3.5 pt-0.5">
                      <ResumeHighlights
                        highlights={exp.highlights}
                        className="text-[#111111] text-[11.5px] leading-[16px] space-y-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Training & Assignments', 'projects')}
            <div className={itemSpaceClass}>
              {validProjects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid space-y-0.5">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[12px] text-black">
                      {proj.title}
                    </span>
                    {(proj as any).year || (proj as any).date ? (
                      <span className="text-[11.5px] text-black whitespace-nowrap">
                        {(proj as any).year || (proj as any).date}
                      </span>
                    ) : null}
                  </div>
                  {(proj as any).description && (
                    <div className="text-[11px] text-neutral-900 leading-normal">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="pl-3.5 pt-0.5">
                      <ResumeHighlights
                        highlights={proj.highlights}
                        className="text-neutral-900 text-[11px] leading-relaxed space-y-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
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
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Skills', 'skills')}
            <div data-ghost-item="skills-0" className="text-[11.5px] text-black leading-relaxed">
              {inlineSkillsList.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="mx-1.5 text-neutral-500 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      }

      case 'certifications': {
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certifications', 'certifications')}
            <div className="space-y-1 text-[11.5px] text-black">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="font-bold text-black">{cert.name}</span>
                  {cert.date && <span className="text-neutral-700 ml-1">({cert.date})</span>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'awards': {
        if (!awards || awards.length === 0) return null;
        return (
          <div key="awards" data-ghost-section="awards" className={sectionMarginClass}>
            {renderSectionHeader('Awards', 'awards')}
            <div className="space-y-1 text-[11.5px] text-black">
              {awards.map((item) => (
                <div key={item.id} data-ghost-item={item.id} className="break-inside-avoid">
                  <span className="font-bold text-black">{item.title}</span>
                  {(item as any).date && (
                    <span className="text-neutral-700 ml-1">({(item as any).date})</span>
                  )}
                  {(item as any).description && (
                    <div className="text-[11px] text-neutral-800 leading-normal pl-2">
                      {(item as any).description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'achievements': {
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" data-ghost-section="achievements" className={sectionMarginClass}>
            {renderSectionHeader('Achievements', 'achievements')}
            <div className="space-y-1 text-[11.5px] text-black">
              {achievements.map((item) => (
                <div key={item.id} data-ghost-item={item.id} className="break-inside-avoid">
                  <span className="font-bold text-black">{item.title}</span>
                  {(item as any).date && (
                    <span className="text-neutral-700 ml-1">({(item as any).date})</span>
                  )}
                  {(item as any).description && (
                    <div className="text-[11px] text-neutral-800 leading-normal pl-2">
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
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Languages', 'languages')}
            <div data-ghost-item="languages-0" className="text-[11.5px] text-black leading-relaxed">
              {languages.map((l, idx) => (
                <React.Fragment key={l.id || idx}>
                  {idx > 0 && <span className="mx-1.5 text-neutral-500 font-bold">·</span>}
                  <span>
                    {l.language}
                    {l.proficiency ? ` (${l.proficiency})` : ''}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      }

      case 'declaration': {
        if (!isLastPage) return null;
        return (
          <div
            key="declaration"
            data-ghost-section="declaration"
            className={`${sectionMarginClass} break-inside-avoid pt-2`}
          >
            <div data-ghost-item="declaration-content" className="space-y-3">
              <p className="text-[11.5px] text-black italic font-serif">
                {data.declaration?.text ||
                  (data as any).declarationText ||
                  'I hereby declare that the above information is true to the best of my knowledge.'}
              </p>
              <div className="flex justify-between items-end pt-4 text-[11.5px] font-serif text-black">
                <div className="space-y-1.5">
                  <div>
                    Place: {data.declaration?.place || personalInfo.location || '____________________'}
                  </div>
                  <div>Date: {data.declaration?.date || '____________________'}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-bold">Signature</div>
                  <div>({data.declaration?.signatureName || personalInfo.fullName || 'Candidate Signature'})</div>
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
          <div key="customSections" data-ghost-section="customSections">
            {customSecs.map((sec) => {
              const isTableStyle =
                sec.title?.toLowerCase().includes('personal') ||
                sec.title?.toLowerCase().includes('detail') ||
                sec.title?.toLowerCase().includes('bio') ||
                sec.type === 'custom_contacts';

              if (isTableStyle && sec.items && sec.items.length > 0) {
                return (
                  <div key={sec.id} className={sectionMarginClass}>
                    {renderSectionHeader(sec.title, sec.id)}
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-[11px] border-collapse border border-neutral-400 font-serif">
                        <tbody>
                          {sec.items.map((item, idx) => (
                            <tr
                              key={item.id || idx}
                              data-ghost-item={item.id || `${sec.id}-${idx}`}
                              className="border-b border-neutral-400 break-inside-avoid"
                            >
                              <td className="w-[32%] bg-[#f6f6f6] border border-neutral-400 font-bold p-1.5 text-black align-top">
                                {item.title}
                              </td>
                              <td className="w-[68%] border border-neutral-400 p-1.5 text-black align-top bg-white">
                                {item.subtitle || item.description || ''}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              }

              return (
                <div key={sec.id} className={sectionMarginClass}>
                  {renderSectionHeader(sec.title, sec.id)}
                  <div className={itemSpaceClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        data-ghost-item={item.id || `${sec.id}-${idx}`}
                        className="break-inside-avoid space-y-0.5"
                      >
                        <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                          <span className="font-bold text-[12px] text-black">{item.title}</span>
                          {item.date && (
                            <span className="text-[11.5px] text-black whitespace-nowrap">{item.date}</span>
                          )}
                        </div>
                        {item.subtitle && (
                          <div className="text-[11.5px] italic text-neutral-800">{item.subtitle}</div>
                        )}
                        {item.description && (
                          <div className="text-[11px] text-neutral-900 leading-normal">
                            <RichText content={item.description} />
                          </div>
                        )}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="pl-3.5 pt-0.5">
                            <ResumeHighlights
                              highlights={item.highlights}
                              className="text-neutral-900 text-[11px] leading-relaxed space-y-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title, id) => renderSectionHeader(title, id)}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-black font-serif flex flex-col box-border ${paddingClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-black pb-1.5 mb-4 flex items-center justify-between text-[11px] font-serif text-black break-inside-avoid">
          <span className="font-bold uppercase tracking-wider">
            {personalInfo.fullName || 'Curriculum Vitae'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo.jobTitle && (
            <span className="italic text-neutral-800">{personalInfo.jobTitle}</span>
          )}
        </div>
      )}

      {/* Official Desk Header matching PDF Page 8 (Page 1 only) */}
      {isPage1 && (
        <header data-ghost-header="true" className="mb-4 text-center break-inside-avoid">
          {/* Centered CURRICULUM VITAE */}
          <div className="font-bold text-[12px] uppercase tracking-[0.25em] text-black">
            CURRICULUM VITAE
          </div>

          {/* Centered Full Name */}
          <h1 className="font-serif text-[25px] font-bold uppercase tracking-normal text-[#111111] mt-1 leading-[30px]">
            {personalInfo.fullName || 'Candidate Name'}
          </h1>

          {/* Centered Designation */}
          {personalInfo.jobTitle && (
            <div data-ghost-role="true" className="font-serif text-[11.5px] italic text-[#111111] mt-0.5 leading-[16px]">
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact Line */}
          {contactItems.length > 0 && (
            <div className="text-[11px] text-neutral-800 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mt-1 font-serif">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-black font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Dark Divider Rule matching PDF Page 8 */}
          <div className="border-b-2 border-black mt-2.5" />
        </header>
      )}

      {/* Single Column Content strictly following resolved user section order */}
      <div data-ghost-col="single" className="flex-1">
        {sectionIds.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

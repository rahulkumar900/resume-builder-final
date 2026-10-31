'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { getResolvedTemplateSectionOrder, normalizeCustomSectionType } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const AcademicTeachingTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    themeColor = '#7a1f2b', // Deep Academic Burgundy / Wine Red matching PDF Page 5
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-9';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-5.5' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('academic_teaching', data);
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

  // Section Header with small-caps tracking and fine burgundy underline matching PDF Page 5
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="mb-2.5 break-after-avoid"
    >
      <div className="flex items-baseline">
        <h2
          className="font-serif font-bold uppercase tracking-[0.2em] text-[12px] sm:text-[12.5px]"
          style={{ color: themeColor }}
        >
          {title}
        </h2>
      </div>
      <div
        className="w-full h-[0.75px] mt-0.5"
        style={{ backgroundColor: themeColor }}
      />
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Profile', 'summary')}
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-serif text-[11.5px] text-[#222222] leading-relaxed text-justify"
              />
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
                    <span className="font-serif font-bold text-[12.5px] text-[#111111]">
                      {edu.degree}
                    </span>
                    <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="font-serif italic text-[11.5px] text-[#444444]">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · ${edu.gpa}` : ''}
                  </div>
                  {(edu as any).description && (
                    <div className="font-serif text-[11px] text-[#333333] pt-0.5">
                      {(edu as any).description}
                    </div>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="font-serif text-[#222222] text-[11px] pt-0.5 leading-normal"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'teaching':
        if (!data.teaching || data.teaching.length === 0) return null;
        return (
          <div key="teaching" data-ghost-section="teaching" className={sectionMarginClass}>
            {renderSectionHeader('Teaching Appointments', 'teaching')}
            <div className={itemSpaceClass}>
              {data.teaching.map((teach) => (
                <div key={teach.id} data-ghost-item={teach.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-[12.5px] text-[#111111]">
                      {teach.role}
                    </span>
                    <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                      {teach.startDate} – {teach.current ? 'Present' : teach.endDate}
                    </span>
                  </div>
                  <div className="font-serif italic text-[11.5px] text-[#444444]">
                    {teach.institution}
                    {teach.location ? `, ${teach.location}` : ''}
                  </div>
                  {teach.highlights && teach.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={teach.highlights}
                      className="font-serif text-[#222222] text-[11px] leading-normal pt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Teaching Experience', 'experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-[12.5px] text-[#111111]">
                      {exp.role}
                    </span>
                    <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-serif italic text-[11.5px] text-[#444444]">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </div>
                  )}
                  {(exp as any).description && (
                    <div className="font-serif text-[11px] text-[#222222] leading-normal pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="font-serif text-[#222222] text-[11px] leading-normal pt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'publications': {
        const pubs = data.publications || [];
        if (pubs.length === 0) return null;
        return (
          <div key="publications" data-ghost-section="publications" className={sectionMarginClass}>
            {renderSectionHeader('Publications & Initiatives', 'publications')}
            <div className={itemSpaceClass}>
              {pubs.map((pub) => (
                <div key={pub.id} data-ghost-item={pub.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-[12px] text-[#111111]">
                      {pub.title}
                    </span>
                    {pub.date && (
                      <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                        {pub.date}
                      </span>
                    )}
                  </div>
                  {(pub.summary || pub.publisher) && (
                    <div className="font-serif text-[11.5px] text-[#333333]">
                      {pub.summary || pub.publisher}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'research': {
        const research = data.research || [];
        if (research.length === 0) return null;
        return (
          <div key="research" data-ghost-section="research" className={sectionMarginClass}>
            {renderSectionHeader('Research & Scholarly Work', 'research')}
            <div className={itemSpaceClass}>
              {research.map((res) => (
                <div key={res.id} data-ghost-item={res.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-[12px] text-[#111111]">{res.title}</span>
                    <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                      {res.startDate} – {res.current ? 'Present' : res.endDate}
                    </span>
                  </div>
                  <div className="font-serif italic text-[11.5px] text-[#444444]">
                    {res.institution} {res.location ? `· ${res.location}` : ''}
                  </div>
                  {res.highlights && res.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={res.highlights}
                      className="font-serif text-[#222222] text-[11px] leading-normal pt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            {renderSectionHeader('Certifications and Honours', 'certifications')}
            <ul className="space-y-1 font-serif text-[11.5px] text-[#222222] list-disc list-outside pl-4">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id}>
                  <span className="font-bold text-[#111111]">{cert.name}</span>
                  {cert.issuer && <span>, {cert.issuer}</span>}
                  {cert.date && <span className="text-[#555555]"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        const allItems: string[] = [];
        activeSkills.forEach((cat) => {
          (cat.items || []).forEach((item) => allItems.push(item));
        });

        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Skills', 'skills')}
            <div data-ghost-item="skills-0" className="font-serif text-[11.5px] text-[#222222] leading-relaxed">
              {allItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#888888] font-bold mx-1.5">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      }

      case 'awards':
      case 'achievements': {
        const list = secId === 'awards' ? data.awards : achievements;
        if (!list || list.length === 0) return null;
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionHeader(
              secId === 'awards' ? 'Awards & Distinctions' : 'Honours & Achievements',
              secId
            )}
            <ul className="space-y-1 font-serif text-[11.5px] text-[#222222] list-disc list-outside pl-4">
              {list.map((item: any) => (
                <li key={item.id} data-ghost-item={item.id}>
                  <span className="font-bold text-[#111111]">{item.title}</span>
                  {item.date && <span className="text-[#555555]"> ({item.date})</span>}
                  {item.issuer && <span> — {item.issuer}</span>}
                  {item.description && (
                    <div className="font-serif text-[11px] text-[#444444] pt-0.5">
                      {item.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Projects & Initiatives', 'projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-serif font-bold text-[12px] text-[#111111]">
                      {proj.title}
                    </span>
                    {(proj as any).date && (
                      <span className="font-serif text-[11.5px] text-[#333333] shrink-0">
                        {(proj as any).date}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="font-serif text-[11px] text-[#333333]">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="font-serif text-[#222222] text-[11px] leading-normal pt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Languages', 'languages')}
            <div className="font-serif text-[11.5px] text-[#222222]">
              {languages.map((l, lIdx) => (
                <React.Fragment key={l.id || lIdx}>
                  {lIdx > 0 && <span className="text-[#888888] font-bold mx-1.5">·</span>}
                  <span data-ghost-item={l.id || `lang-${lIdx}`}>
                    <span className="font-bold text-[#111111]">{l.language}</span>
                    {l.proficiency && <span className="text-[#555555]"> ({l.proficiency})</span>}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'customSections': {
        const customSections = data.customSections || [];
        if (customSections.length === 0) return null;
        return (
          <div key="customSections" className="space-y-4">
            {customSections.map((sec) => {
              const normType = normalizeCustomSectionType(sec.type);
              return (
                <div key={sec.id} data-ghost-section="customSections" className={sectionMarginClass}>
                  {renderSectionHeader(sec.title || 'Additional Information', secId)}

                  {/* 1. Statement Type */}
                  {normType === 'statement' && (
                    <div
                      data-ghost-item={`${sec.id}-content`}
                      className="font-serif text-[11.5px] leading-relaxed text-[#222222] whitespace-pre-line text-justify"
                    >
                      {sec.content || sec.items?.[0]?.description || ''}
                    </div>
                  )}

                  {/* 2. Tags Type */}
                  {normType === 'tags' && (
                    <div className="space-y-2">
                      {(sec.items || []).map((item, idx) => {
                        const tags =
                          item.items && item.items.length > 0
                            ? item.items
                            : item.description
                            ? item.description.split(',').map((s) => s.trim()).filter(Boolean)
                            : [];

                        return (
                          <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1">
                            {item.title && (
                              <div className="font-serif font-bold text-[11.5px] text-[#111111]">
                                {item.title}
                              </div>
                            )}
                            <div className="font-serif text-[11.5px] text-[#222222]">
                              {tags.map((tag, tIdx) => (
                                <React.Fragment key={tIdx}>
                                  {tIdx > 0 && <span className="text-[#888888] font-bold mx-1.5">·</span>}
                                  <span>{tag}</span>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Other types fall back to UniversalSectionRenderer */}
                  {normType !== 'statement' && normType !== 'tags' && (
                    <UniversalSectionRenderer
                      secId={secId}
                      data={data}
                      renderHeader={() => null}
                      itemSpacingClass={itemSpaceClass}
                    />
                  )}
                </div>
              );
            })}
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
    <div className={`w-full h-full min-h-[297mm] bg-white text-[#222222] font-serif flex flex-col box-border ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-[#7a1f2b]/40 pb-2 mb-4 flex items-center justify-between font-serif text-xs italic text-[#555555] break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span className="font-semibold text-[#7a1f2b]">{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Editorial Header matching PDF Page 5 (Meera Iyer) (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="mb-4 break-inside-avoid text-center"
        >
          {/* Top double rule */}
          <div className="flex flex-col gap-[2px] mb-3.5">
            <div className="h-[1.5px] w-full" style={{ backgroundColor: themeColor }} />
            <div className="h-[0.75px] w-full" style={{ backgroundColor: themeColor }} />
          </div>

          <h1
            className="font-serif text-[32px] sm:text-[36px] font-bold tracking-normal leading-tight"
            style={{ color: themeColor }}
          >
            {personalInfo.fullName}
          </h1>

          {personalInfo.jobTitle && (
            <div className="font-serif italic text-[12.5px] sm:text-[13px] text-[#222222] mt-1 font-medium">
              {personalInfo.jobTitle}
            </div>
          )}

          {contactItems.length > 0 && (
            <div className="font-serif text-[11.5px] text-[#333333] mt-2 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#888888] font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Bottom double rule */}
          <div className="flex flex-col gap-[2px] mt-3.5">
            <div className="h-[0.75px] w-full" style={{ backgroundColor: themeColor }} />
            <div className="h-[1.5px] w-full" style={{ backgroundColor: themeColor }} />
          </div>
        </header>
      )}

      {/* Dynamic Sections Loop */}
      <div data-ghost-col="single" className="space-y-1 flex-1">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  getResolvedTemplateSectionOrder,
  normalizeCustomSectionType,
  hasPageSidebarContent,
} from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const ClinicalHealthcareTemplate: React.FC<TemplateProps> = ({ data }) => {
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
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-9 sm:p-12' : 'p-7 sm:p-9';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('clinical_healthcare', data);
  const mainSectionIds = resolvedOrder.mainColumn || [];
  const sidebarSectionIds = resolvedOrder.sidebarColumn || [];
  const hasSidebarContent = hasPageSidebarContent(data, sidebarSectionIds);

  const rawSummary = personalInfo?.summary || (data as any)?.summary || (personalInfo as any)?.bio || '';
  const hasSummary = Boolean(rawSummary?.trim()) && !data.hiddenSections?.includes('summary');

  // Filter non-empty contact items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Royal Iris Section Header matching Care: Manrope 12px / 21px, 700 bold, #6D4CCF
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="border-b-[1.5px] border-[#6D4CCF]/20 pb-1 mb-3 break-after-avoid"
    >
      <h2 className="font-manrope text-[12px] font-bold uppercase tracking-[0.16em] text-[#6D4CCF] leading-[18px]">
        {title}
      </h2>
    </div>
  );

  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false) => {
    switch (secId) {
      case 'summary': {
        if (!hasSummary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className="mb-6 break-inside-avoid">
            {renderSectionHeader('Profile', 'summary')}
            <div data-ghost-item="summary-0" className="font-manrope text-[14.5px] text-[#222222] leading-[25px] font-normal">
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

        return (
          <div key="experience" data-ghost-section="experience" className="mb-6">
            {renderSectionHeader('Experience', 'experience')}
            <div className="space-y-4">
              {validExperience.map((exp) => (
                <div
                  key={exp.id}
                  data-ghost-item={exp.id}
                  className="relative pl-4 border-l-2 border-[#6d4ccf]/40 space-y-1 break-inside-avoid"
                >
                  {/* Clinical Timeline Indicator Node */}
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#6d4ccf] ring-4 ring-[#faf8ff]" />

                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-[14.5px] text-[#222222] tracking-tight leading-[25px]">
                        {exp.role}
                      </span>
                      <span className="text-[12px] font-semibold text-[#6d4ccf] tracking-wider uppercase shrink-0">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="text-[13.5px] font-medium text-[#222222] italic">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ''}
                      </div>
                    )}
                  </div>
                  {(exp as any).description && (
                    <div className="text-[14.5px] text-[#222222] leading-[25px] pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[#222222] text-[14.5px] leading-[25px] pt-0.5 space-y-1"
                    />
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
          <div key="projects" data-ghost-section="projects" className="mb-6">
            {renderSectionHeader('Community & Training', 'projects')}
            <div className="space-y-3.5">
              {validProjects.map((proj) => (
                <div
                  key={proj.id}
                  data-ghost-item={proj.id}
                  className="space-y-1 break-inside-avoid"
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-[14.5px] text-[#222222]">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[12px] font-medium text-[#6d4ccf]">
                          ({proj.technologies.join(', ')})
                        </span>
                      )}
                    </div>
                    {(proj.link || (proj as any).date) && (
                      <span className="text-[12px] font-semibold text-[#6d4ccf] shrink-0">
                        {(proj as any).date || proj.link}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="text-[14.5px] text-[#222222] leading-[25px]">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-[#222222] text-[14.5px] leading-[25px]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        return (
          <div key="skills" data-ghost-section="skills" className="mb-6">
            {renderSectionHeader('Skills', 'skills')}
            <div className="space-y-3">
              {activeSkills.map((cat, cIdx) => (
                <div
                  key={cat.id || cIdx}
                  data-ghost-item={cat.id || `skills-${cIdx}`}
                  className="space-y-1.5 break-inside-avoid"
                >
                  {cat.category && (
                    <div className="font-bold text-[12px] uppercase tracking-wider text-[#6d4ccf]">
                      {cat.category}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {(cat.items || []).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-block bg-[#ece6ff] text-[#4b2fa5] border border-[#cdbdf5]/60 px-2.5 py-0.5 text-[12.5px] font-semibold rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;

        return (
          <div key="education" data-ghost-section="education" className="mb-6">
            {renderSectionHeader('Education', 'education')}
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  data-ghost-item={edu.id}
                  className="space-y-0.5 break-inside-avoid"
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[14px] text-[#222222]">
                      {edu.degree}
                    </span>
                    <span className="text-[12px] font-semibold text-[#6d4ccf] shrink-0">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-[13px] text-[#222222] italic">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                  {(edu as any).description && (
                    <div className="text-[14.5px] text-[#222222] leading-[25px] pt-0.5">
                      {(edu as any).description}
                    </div>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="text-[#222222] text-[14.5px] leading-[25px] pt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'certifications': {
        if (!certifications || certifications.length === 0) return null;

        return (
          <div key="certifications" data-ghost-section="certifications" className="mb-6">
            {renderSectionHeader('Registration & Licenses', 'certifications')}
            <ul className="space-y-1.5 text-[13px] text-[#222222]">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="flex items-start gap-1.5 break-inside-avoid">
                  <span className="text-[#6d4ccf] font-bold text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-semibold text-[#222222]">{cert.name}</span>
                    {cert.issuer && <span className="text-[#222222]"> &mdash; {cert.issuer}</span>}
                    {cert.date && <span className="text-[#6d4ccf] font-medium"> ({cert.date})</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;

        return (
          <div key="languages" data-ghost-section="languages" className="mb-6">
            {renderSectionHeader('Languages', 'languages')}
            <div className="space-y-1 text-[13px] text-[#222222]">
              {languages.map((l, idx) => (
                <div key={l.id || idx} data-ghost-item={l.id || `lang-${idx}`} className="flex justify-between items-center break-inside-avoid">
                  <span className="font-semibold text-[#222222]">{l.language}</span>
                  {l.proficiency && <span className="text-[#6d4ccf] text-[12px] italic">({l.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'awards':
      case 'achievements': {
        const items = secId === 'awards' ? awards : achievements;
        if (!items || items.length === 0) return null;

        return (
          <div key={secId} data-ghost-section={secId} className="mb-6">
            {renderSectionHeader(secId === 'awards' ? 'Awards' : 'Achievements', secId)}
            <ul className="space-y-1.5 text-[13px] text-[#222222]">
              {items.map((item) => (
                <li key={item.id} data-ghost-item={item.id} className="flex items-start gap-1.5 break-inside-avoid">
                  <span className="text-[#6d4ccf] font-bold text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-semibold text-[#222222]">{item.title}</span>
                    {item.date && <span className="text-[#6d4ccf] font-medium"> ({item.date})</span>}
                    {(item as any).description && (
                      <div className="text-[13px] text-[#222222] leading-normal mt-0.5">
                        {(item as any).description}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'customSections': {
        const customSections = data.customSections || [];
        if (customSections.length === 0) return null;

        return (
          <div key="customSections" className="space-y-4 mb-6">
            {customSections.map((sec) => {
              const normType = normalizeCustomSectionType(sec.type);
              return (
                <div
                  key={sec.id}
                  data-ghost-section="customSections"
                  className="break-inside-avoid"
                >
                  {renderSectionHeader(sec.title || 'Additional Information', secId)}

                  {normType === 'statement' && (
                    <div
                      data-ghost-item={`${sec.id}-content`}
                      className="text-[11.5px] text-slate-800 leading-relaxed"
                    >
                      {sec.content || sec.items?.[0]?.description || ''}
                    </div>
                  )}

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
                              <div className="font-bold text-[10.5px] text-slate-600 uppercase tracking-wider">
                                {item.title}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              {tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-block bg-[#ece6ff] text-[#4b2fa5] border border-[#cdbdf5]/60 px-2.5 py-0.5 text-[10.5px] font-semibold rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {normType !== 'statement' && normType !== 'tags' && (
                    <UniversalSectionRenderer
                      secId={secId}
                      data={data}
                      renderHeader={() => null}
                      itemSpacingClass={itemSpaceClass}
                      isSidebar={isSidebar}
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
            isSidebar={isSidebar}
          />
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-[#faf8ff] text-[#222222] font-manrope flex flex-col box-border ${paddingClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b-[1.5px] border-[#6D4CCF] pb-2 mb-5 flex items-center justify-between text-[11px] font-bold text-[#6D4CCF] break-inside-avoid">
          <div className="flex items-center gap-2">
            <span className="font-fraunces uppercase tracking-wider">
              {personalInfo.fullName || 'Candidate'}
            </span>
            {personalInfo.jobTitle && (
              <span className="text-[#222222] font-normal"> &mdash; {personalInfo.jobTitle}</span>
            )}
          </div>
          <span className="font-medium text-[#222222]">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Royal Iris Curved Header Banner (Page 1 only) matching Care */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="bg-[#6D4CCF] text-white p-6 sm:p-7 rounded-br-[36px] shadow-sm mb-6 break-inside-avoid"
        >
          {/* Candidate Name & Title (Fraunces 32px / 38.4px, 700 bold, #FFFFFF) */}
          <h1 className="font-fraunces text-[32px] font-bold tracking-tight text-white leading-[38px]">
            {personalInfo.fullName}
          </h1>

          {personalInfo.jobTitle && (
            <div data-ghost-role="true" className="font-manrope font-bold text-[14.5px] text-[#E5DCFF] tracking-wide mt-1.5 leading-[25px]">
              {personalInfo.jobTitle}
            </div>
          )}

          {/* Contact Strip */}
          {contactItems.length > 0 && (
            <div className="font-manrope text-[11px] text-white/90 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#cdbdf5] font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 2-Column Clinical Healthcare Grid strictly following active sections & user ordering */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 flex-1">
        {/* Sidebar Column (Left ~40%) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className="md:col-span-5">
            {sidebarSectionIds.map((secId: ResumeSectionId) => renderSection(secId, true))}
          </div>
        )}

        {/* Main Column (Right ~60%) */}
        <div
          data-ghost-col="main"
          className={hasSidebarContent ? 'md:col-span-7' : 'md:col-span-12'}
        >
          {mainSectionIds.map((secId: ResumeSectionId) => renderSection(secId, false))}
        </div>
      </div>
    </div>
  );
};

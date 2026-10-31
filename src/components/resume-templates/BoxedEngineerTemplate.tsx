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

export const BoxedEngineerTemplate: React.FC<TemplateProps> = ({ data }) => {
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

  const resolvedOrder = getResolvedTemplateSectionOrder('boxed_engineer', data);
  const mainSectionIds = resolvedOrder.mainColumn || [];
  const sidebarSectionIds = resolvedOrder.sidebarColumn || [];
  const hasSidebarContent = hasPageSidebarContent(data, sidebarSectionIds);

  const rawSummary = personalInfo?.summary || (data as any)?.summary || (personalInfo as any)?.bio || '';
  const hasSummary = Boolean(rawSummary?.trim()) && !data.hiddenSections?.includes('summary');

  // Filter non-empty contact items
  const contactDetails = [
    personalInfo.email && { label: 'Email', value: personalInfo.email },
    personalInfo.phone && { label: 'Phone', value: personalInfo.phone },
    personalInfo.location && { label: 'Location', value: personalInfo.location },
    personalInfo.website && { label: 'Web', value: personalInfo.website },
    personalInfo.linkedin && { label: 'LinkedIn', value: personalInfo.linkedin },
    personalInfo.github && { label: 'GitHub', value: personalInfo.github },
  ].filter(Boolean) as { label: string; value: string }[];

  // Blueprint Boxed Section Header: ▣ in Safety Orange (#e8590c) + Uppercase Navy Heading (#0f3b73)
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 border-b-[1.5px] border-[#0f3b73]/25 pb-1.5 mb-3 break-after-avoid"
    >
      <span className="text-[#e8590c] font-black text-sm leading-none">▣</span>
      <h2 className="font-bold uppercase tracking-[0.16em] text-[12px] text-[#0f3b73]">
        {title}
      </h2>
    </div>
  );

  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false) => {
    switch (secId) {
      case 'summary': {
        if (!hasSummary) return null;
        return (
          <div
            key="summary"
            data-ghost-section="summary"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4 break-inside-avoid"
          >
            {renderSectionHeader('Professional Profile', 'summary')}
            <div data-ghost-item="summary-0" className="text-[12px] text-slate-800 leading-relaxed">
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
          <div
            key="experience"
            data-ghost-section="experience"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Work Experience', 'experience')}
            <div className="space-y-4">
              {validExperience.map((exp, idx) => (
                <div
                  key={exp.id}
                  data-ghost-item={exp.id}
                  className={`space-y-1.5 break-inside-avoid ${
                    idx > 0 ? 'pt-3.5 border-t border-[#0f3b73]/15' : ''
                  }`}
                >
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-[13px] text-[#0f3b73]">
                        {exp.role}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 tracking-wider uppercase shrink-0">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="text-[11.5px] font-medium text-slate-700 italic">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ''}
                      </div>
                    )}
                  </div>
                  {(exp as any).description && (
                    <div className="text-[11.5px] text-slate-700 leading-relaxed pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-slate-800 text-[11px] leading-relaxed pt-0.5 space-y-1"
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
          <div
            key="projects"
            data-ghost-section="projects"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Major Projects', 'projects')}
            <div className="space-y-3.5">
              {validProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  data-ghost-item={proj.id}
                  className={`space-y-1 break-inside-avoid ${
                    idx > 0 ? 'pt-3 border-t border-[#0f3b73]/15' : ''
                  }`}
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-[12.5px] text-[#0f3b73]">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[10.5px] font-medium text-[#e8590c]">
                          [{proj.technologies.join(', ')}]
                        </span>
                      )}
                    </div>
                    {(proj.link || (proj as any).date) && (
                      <span className="text-[10.5px] font-medium text-slate-500 shrink-0">
                        {(proj as any).date || proj.link}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="text-[11px] text-slate-700 leading-relaxed pt-0.5">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-slate-800 text-[11px] leading-relaxed pt-0.5 space-y-0.5"
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
          <div
            key="skills"
            data-ghost-section="skills"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Technical Skills', 'skills')}
            <div className="space-y-3">
              {activeSkills.map((cat, cIdx) => (
                <div
                  key={cat.id || cIdx}
                  data-ghost-item={cat.id || `skills-${cIdx}`}
                  className="space-y-1.5 break-inside-avoid"
                >
                  {cat.category && (
                    <div className="font-bold text-[11px] uppercase tracking-wider text-[#0f3b73]">
                      {cat.category}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {(cat.items || []).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-block bg-[#f4f8ff] border border-[#0f3b73]/40 text-[#0f3b73] px-2.5 py-0.5 text-[11px] font-medium rounded-[2px]"
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
          <div
            key="education"
            data-ghost-section="education"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Education', 'education')}
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div
                  key={edu.id}
                  data-ghost-item={edu.id}
                  className={`space-y-0.5 break-inside-avoid ${
                    idx > 0 ? 'pt-2.5 border-t border-[#0f3b73]/15' : ''
                  }`}
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[12px] text-[#0f3b73]">
                      {edu.degree}
                    </span>
                    <span className="text-[10.5px] font-semibold text-slate-600 shrink-0">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 italic">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                  {(edu as any).description && (
                    <div className="text-[10.5px] text-slate-600 pt-0.5">
                      {(edu as any).description}
                    </div>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="text-slate-700 text-[10.5px] pt-0.5"
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
          <div
            key="certifications"
            data-ghost-section="certifications"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Licenses & Certifications', 'certifications')}
            <ul className="space-y-1.5 text-[11px] text-slate-800">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="flex items-start gap-2 break-inside-avoid">
                  <span className="text-[#e8590c] font-bold text-xs mt-0.5">▪</span>
                  <div>
                    <span className="font-bold text-[#0f3b73]">{cert.name}</span>
                    {cert.issuer && <span className="text-slate-600"> &mdash; {cert.issuer}</span>}
                    {cert.date && <span className="text-slate-500 font-medium"> ({cert.date})</span>}
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
          <div
            key="languages"
            data-ghost-section="languages"
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader('Languages', 'languages')}
            <div className="space-y-1 text-[11px] text-slate-800">
              {languages.map((l, idx) => (
                <div key={l.id || idx} data-ghost-item={l.id || `lang-${idx}`} className="flex justify-between items-center break-inside-avoid">
                  <span className="font-semibold text-slate-900">{l.language}</span>
                  {l.proficiency && <span className="text-slate-600 text-[10.5px] italic">{l.proficiency}</span>}
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
          <div
            key={secId}
            data-ghost-section={secId}
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            {renderSectionHeader(secId === 'awards' ? 'Honors & Awards' : 'Key Achievements', secId)}
            <ul className="space-y-1.5 text-[11px] text-slate-800">
              {items.map((item) => (
                <li key={item.id} data-ghost-item={item.id} className="flex items-start gap-2 break-inside-avoid">
                  <span className="text-[#e8590c] font-bold text-xs mt-0.5">▪</span>
                  <div>
                    <span className="font-bold text-[#0f3b73]">{item.title}</span>
                    {item.date && <span className="text-slate-500 font-medium"> ({item.date})</span>}
                    {(item as any).description && (
                      <div className="text-[10.5px] text-slate-600 leading-normal mt-0.5">
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
          <div key="customSections" className="space-y-4 mb-4">
            {customSections.map((sec) => {
              const normType = normalizeCustomSectionType(sec.type);
              return (
                <div
                  key={sec.id}
                  data-ghost-section="customSections"
                  className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] break-inside-avoid"
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
                              <div className="font-bold text-[11px] text-[#0f3b73] uppercase tracking-wider">
                                {item.title}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              {tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-block bg-[#f4f8ff] border border-[#0f3b73]/40 text-[#0f3b73] px-2 py-0.5 text-[10.5px] font-medium rounded-[2px]"
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
          <div
            key={secId}
            data-ghost-section={secId}
            className="border-[1.5px] border-[#0f3b73] bg-white p-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.08)] mb-4"
          >
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title, id) => renderSectionHeader(title, id)}
              itemSpacingClass={itemSpaceClass}
              isSidebar={isSidebar}
            />
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-[#f4f8ff] text-slate-900 font-sans flex flex-col box-border ${paddingClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-[1.5px] border-[#0f3b73] bg-white px-4 py-2 mb-4 flex items-center justify-between text-[11px] font-bold text-[#0f3b73] break-inside-avoid shadow-[1px_1px_0px_0px_rgba(15,59,115,0.08)]">
          <div className="flex items-center gap-2">
            <span className="text-[#e8590c] font-black text-xs">▣</span>
            <span className="uppercase tracking-wider">
              {personalInfo.fullName || 'Candidate'}
            </span>
            {personalInfo.jobTitle && (
              <span className="text-slate-500 font-normal"> &mdash; {personalInfo.jobTitle}</span>
            )}
          </div>
          <span className="font-semibold text-slate-600">
            Page {data.pageNumber} of {data.totalPages || 2}
          </span>
        </div>
      )}

      {/* Blueprint Top Header Card (Page 1 only) matching PDF Page 6 */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="border-[1.5px] border-[#0f3b73] bg-white p-5 mb-4 shadow-[2px_2px_0px_0px_rgba(15,59,115,0.12)] break-inside-avoid"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            {/* Candidate Name & Title */}
            <div>
              <h1 className="text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#0f3b73] leading-none">
                {personalInfo.fullName}
              </h1>
              {personalInfo.jobTitle && (
                <div className="text-[#e8590c] font-bold text-[13px] tracking-wide mt-1.5 flex items-center gap-1.5">
                  <span className="text-[11px]">▣</span>
                  <span>{personalInfo.jobTitle}</span>
                </div>
              )}
            </div>

            {/* Right-aligned Blueprint Contact Block */}
            {contactDetails.length > 0 && (
              <div className="flex flex-col sm:items-end gap-1 text-[11px] text-slate-700 shrink-0">
                {contactDetails.map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0f3b73] text-[10px] uppercase tracking-wider">
                      {contact.label}:
                    </span>
                    <span className="font-medium text-slate-800">{contact.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>
      )}

      {/* 2-Column Technical Blueprint Grid strictly following active sections & user ordering */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
        {/* Main Column (~62-63%) */}
        <div
          data-ghost-col="main"
          className={hasSidebarContent ? 'md:col-span-8' : 'md:col-span-12'}
        >
          {mainSectionIds.map((secId: ResumeSectionId) => renderSection(secId, false))}
        </div>

        {/* Sidebar Column (~37-38%) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className="md:col-span-4">
            {sidebarSectionIds.map((secId: ResumeSectionId) => renderSection(secId, true))}
          </div>
        )}
      </div>
    </div>
  );
};

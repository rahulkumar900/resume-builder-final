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

export const NeoBrutalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-9 sm:p-12' : 'p-7 sm:p-9';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2.5' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('neobrutalist', data);
  const mainSectionIds = resolvedOrder.mainColumn || [];
  const sidebarSectionIds = resolvedOrder.sidebarColumn || [];
  const hasSidebarContent = hasPageSidebarContent(data, sidebarSectionIds);

  // Robust summary extraction
  const rawSummary = personalInfo?.summary || (data as any)?.summary || (personalInfo as any)?.bio || '';
  const hasSummary = Boolean(rawSummary?.trim()) && !data.hiddenSections?.includes('summary');

  // Split name for outlined stencil effect
  const nameParts = (personalInfo.fullName || '').trim().split(' ');
  const firstWord = nameParts[0] || '';
  const remainingWords = nameParts.slice(1).join(' ');

  // Filter non-empty contact items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Section header badge matching PDF Page 4: Black trapezoid badge, italic yellow text, -skew-x-6
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="inline-block bg-black text-[#fed843] px-3.5 py-1 font-black italic text-[11px] uppercase tracking-[0.2em] -skew-x-6 mb-3.5 break-after-avoid"
    >
      <span className="inline-block skew-x-6">{title}</span>
    </div>
  );

  // Experience cards background cycle matching PDF Page 4: White, Ice Blue, Mint Green
  const expCardColors = ['bg-white', 'bg-[#e0f2fe]', 'bg-[#dcfce7]'];

  // Universal Section Renderer adhering to active sections, ordering and multi-page pagination
  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false) => {
    switch (secId) {
      case 'summary':
        // Rendered in header banner on Page 1 matching PDF Page 4 layout
        return null;

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
            <div className="space-y-3.5">
              {validExperience.map((exp, expIdx) => {
                const bgClass = expCardColors[expIdx % expCardColors.length];
                return (
                  <div
                    key={exp.id}
                    data-ghost-item={exp.id}
                    className={`border-2 border-black p-3.5 sm:p-4 ${bgClass} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1.5 break-inside-avoid`}
                  >
                    <div data-ghost-item-header="true">
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-[13px] text-black tracking-tight">
                          {exp.role}
                        </span>
                        <span className="text-[11px] text-slate-700 font-medium">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {(exp.company || exp.location) && (
                        <div className="text-[11.5px] font-medium text-slate-700 mt-0.5">
                          {exp.company}
                          {exp.location ? `, ${exp.location}` : ''}
                        </div>
                      )}
                    </div>
                    {(exp as any).description && (
                      <div className="text-[11px] text-slate-800 leading-normal pt-0.5">
                        {(exp as any).description}
                      </div>
                    )}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ResumeHighlights
                        highlights={exp.highlights}
                        className="text-slate-800 text-[11px] leading-normal pt-0.5 space-y-1"
                      />
                    )}
                  </div>
                );
              })}
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
            {renderSectionHeader('Projects', 'projects')}
            <div className="space-y-3.5">
              {validProjects.map((proj) => (
                <div
                  key={proj.id}
                  data-ghost-item={proj.id}
                  className="border-2 border-black p-3.5 sm:p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1 break-inside-avoid"
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[13px] text-black tracking-tight">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="text-[10.5px] text-slate-600 font-medium">
                          ({proj.technologies.join(', ')})
                        </span>
                      )}
                    </div>
                    {(proj.link || (proj as any).date) && (
                      <span className="text-[11px] text-slate-700 font-medium">
                        {(proj as any).date || proj.link}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="text-[11px] text-slate-800 leading-normal pt-0.5">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-slate-800 text-[11px] leading-normal pt-0.5"
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

        const pastelTagColors = ['bg-[#fed843]', 'bg-[#fbcfe8]', 'bg-[#bae6fd]'];

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
                    <div className="font-bold text-[11px] text-black uppercase tracking-wider">
                      {cat.category}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {(cat.items || []).map((skill, sIdx) => {
                      const colorClass = pastelTagColors[(cIdx * 3 + sIdx) % pastelTagColors.length];
                      return (
                        <span
                          key={sIdx}
                          className={`inline-block border-2 border-black px-3 py-1 text-[11px] font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${colorClass}`}
                        >
                          {skill}
                        </span>
                      );
                    })}
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
            <div className="border-2 border-black bg-[#fed843] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3 break-inside-avoid">
              {education.map((edu, eduIdx) => (
                <div
                  key={edu.id}
                  data-ghost-item={edu.id}
                  className={`space-y-0.5 break-inside-avoid ${eduIdx > 0 ? 'pt-2.5 border-t border-black/20' : ''}`}
                >
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-bold text-[12.5px] text-black tracking-tight">
                      {edu.degree}
                    </span>
                    <span className="text-[11px] text-black font-medium">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-black/80 font-medium">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                  {(edu as any).description && (
                    <div className="text-[10.5px] text-black/90 pt-0.5">
                      {(edu as any).description}
                    </div>
                  )}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="text-black text-[10.5px] pt-0.5 leading-normal"
                    />
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
          <div key="languages" data-ghost-section="languages" className="mb-6">
            {renderSectionHeader('Languages', 'languages')}
            <div className="space-y-1 text-[11.5px] font-medium text-slate-900">
              {languages.map((l, lIdx) => (
                <div key={l.id || lIdx} data-ghost-item={l.id || `lang-${lIdx}`} className="break-inside-avoid">
                  <span>{l.language}</span>
                  {l.proficiency && <span className="text-slate-600 font-normal"> ({l.proficiency})</span>}
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
            {renderSectionHeader('Certifications', 'certifications')}
            <ul className="space-y-1 text-[11px] text-slate-900 list-disc list-outside pl-4">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-medium text-black">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> &mdash; {cert.issuer}</span>}
                  {cert.date && <span className="text-slate-600"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'achievements': {
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" data-ghost-section="achievements" className="mb-6">
            {renderSectionHeader('Achievements', 'achievements')}
            <ul className="space-y-1 text-[11px] text-slate-900 list-disc list-outside pl-4">
              {achievements.map((ach) => (
                <li key={ach.id} data-ghost-item={ach.id} className="break-inside-avoid">
                  <span className="font-medium text-black">{ach.title}</span>
                  {ach.date && <span className="text-slate-600"> ({ach.date})</span>}
                  {ach.description && (
                    <div className="text-[10.5px] text-slate-700 leading-normal">
                      {ach.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }

      case 'customSections': {
        const customSections = data.customSections || [];
        if (customSections.length === 0) return null;
        const pastelTagColors = ['bg-[#fed843]', 'bg-[#fbcfe8]', 'bg-[#bae6fd]'];

        return (
          <div key="customSections" className="mb-6 space-y-6">
            {customSections.map((sec) => {
              const normType = normalizeCustomSectionType(sec.type);
              return (
                <div key={sec.id} data-ghost-section="customSections" className="break-inside-avoid">
                  {renderSectionHeader(sec.title || 'Additional Information', secId)}

                  {normType === 'statement' && (
                    <div
                      data-ghost-item={`${sec.id}-content`}
                      className="border-2 border-black p-3.5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[12px] text-slate-800 leading-relaxed break-inside-avoid"
                    >
                      {sec.content || sec.items?.[0]?.description || ''}
                    </div>
                  )}

                  {normType === 'tags' && (
                    <div className="space-y-3">
                      {(sec.items || []).map((item, idx) => {
                        const tags =
                          item.items && item.items.length > 0
                            ? item.items
                            : item.description
                            ? item.description.split(',').map((s) => s.trim()).filter(Boolean)
                            : [];

                        return (
                          <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1.5 break-inside-avoid">
                            {item.title && (
                              <div className="font-bold text-[11.5px] text-black">
                                {item.title}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {tags.map((tag, tIdx) => {
                                const colorClass = pastelTagColors[tIdx % pastelTagColors.length];
                                return (
                                  <span
                                    key={tIdx}
                                    className={`inline-block border-2 border-black px-2.5 py-0.5 text-[11px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${colorClass}`}
                                  >
                                    {tag}
                                  </span>
                                );
                              })}
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
      className={`w-full h-full min-h-[297mm] bg-[#fefdf9] text-black font-sans flex flex-col box-border ${paddingClass}`}
    >
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b-2 border-black pb-2 mb-5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo.jobTitle && (
            <span className="bg-[#fb7185] px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
              {personalInfo.jobTitle}
            </span>
          )}
        </div>
      )}

      {/* Neo-Brutalist Stencil Header matching PDF Page 4 (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="mb-6 break-inside-avoid"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            {/* Stencil & Solid Yellow Name Block */}
            <div className="flex flex-col">
              <div
                className="text-[48px] sm:text-[56px] font-black uppercase tracking-tight leading-[0.9] text-transparent"
                style={{
                  WebkitTextStroke: '2.5px black',
                  letterSpacing: '-0.02em',
                }}
              >
                {firstWord}
              </div>

              {remainingWords && (
                <div className="inline-block bg-[#fed843] px-3.5 py-1 -mt-2 self-start z-10">
                  <span className="text-[32px] sm:text-[38px] font-black uppercase tracking-tight text-black leading-none">
                    {remainingWords}
                  </span>
                </div>
              )}
            </div>

            {/* Tilted Pink Title Badge matching PDF Page 4 */}
            {personalInfo.jobTitle && (
              <div
                className="inline-block bg-[#fb7185] text-black font-black text-[12px] px-3.5 py-1.5 uppercase tracking-wide border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] self-start sm:self-auto sm:mt-2 -rotate-2"
              >
                {personalInfo.jobTitle}
              </div>
            )}
          </div>

          {/* Solid Black Contact Bar */}
          {contactItems.length > 0 && (
            <div className="bg-black text-white px-4 py-2 font-mono text-[11px] font-medium flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-4">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-white/80 font-bold">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Left Pink Vertical Bar Summary matching PDF Page 4 */}
          {hasSummary && (
            <div className="flex items-stretch gap-3 mt-4" data-ghost-item="summary-0">
              <div className="w-[4px] bg-[#fb7185] shrink-0 rounded-[1px]" />
              <div className="text-[12px] text-slate-800 leading-relaxed font-normal">
                <RichText content={rawSummary} />
              </div>
            </div>
          )}
        </header>
      )}

      {/* 2-Column Neo-Brutalist Layout strictly following active sections, user order, and multi-page pagination */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 flex-1">
        {/* Main Column (Left ~60-62%) */}
        <div
          data-ghost-col="main"
          className={hasSidebarContent ? 'md:col-span-7' : 'md:col-span-12'}
        >
          {mainSectionIds.map((secId: ResumeSectionId) => renderSection(secId, false))}
        </div>

        {/* Sidebar Column (Right ~38-40%) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className="md:col-span-5">
            {sidebarSectionIds.map((secId: ResumeSectionId) => renderSection(secId, true))}
          </div>
        )}
      </div>
    </div>
  );
};

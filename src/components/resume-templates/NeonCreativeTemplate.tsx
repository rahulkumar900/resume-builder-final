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

export const NeonCreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    achievements = [],
    themeColor = '#7c3aed', // Vibrant Purple
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.totalPages || data.pageNumber === data.totalPages;

  const contentPadding =
    spacing === 'compact' ? 'p-5 sm:p-6' : spacing === 'relaxed' ? 'p-8 sm:p-10' : 'p-6 sm:p-8';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('neon_creative', data);
  const rawMainSectionIds = resolvedOrder.mainColumn || [];
  const rawSidebarSectionIds = resolvedOrder.sidebarColumn || [];
  const mainSectionIds = rawMainSectionIds.filter(
    (secId) => secId !== 'declaration' || isLastPage
  );
  const sidebarSectionIds = rawSidebarSectionIds.filter(
    (secId) => secId !== 'declaration' || isLastPage
  );
  const hasSidebarContent = hasPageSidebarContent(data, sidebarSectionIds);

  // Filter non-empty contact items
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  // Render uppercase section header with accent pill (Space Grotesk 12px / 18px, 700 bold, gradient #7C3AED to #06B6D4)
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2.5 break-after-avoid"
    >
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shrink-0 shadow-xs" />
      <h2 className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.18em] leading-[18px] bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
        {title}
      </h2>
    </div>
  );

  // Helper to map 5-tier or text proficiency to percentage for skill progress bars
  const getSkillPercentage = (level?: string): number => {
    if (!level) return 85;
    const l = level.toLowerCase();
    switch (l) {
      case 'expert':
      case 'master':
      case 'advanced':
        return 95;
      case 'proficient':
      case 'senior':
        return 80;
      case 'intermediate':
      case 'competent':
        return 65;
      case 'beginner':
      case 'basic':
      case 'entry':
        return 45;
      default:
        return 80;
    }
  };

  // Universal Section Renderer strictly adhering to active sections, ordering and multi-page pagination
  const renderSection = (secId: ResumeSectionId, isSidebar: boolean = false) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Profile', 'summary')}
            <div data-ghost-item="summary-0" className="break-inside-avoid">
              <RichText
                content={personalInfo.summary}
                className="font-spacegrotesk text-[12.5px] text-[#222222] leading-[18.8px] font-normal"
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
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="space-y-1 break-inside-avoid bg-[#F8F6FF] rounded-xl p-3.5 border border-[#ede9fe]/60">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px] tracking-tight">
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
                  {(exp as any).description && (
                    <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px] pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
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
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Projects', 'projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="space-y-0.5 break-inside-avoid bg-[#F8F6FF] rounded-xl p-3.5 border border-[#ede9fe]/60">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <div className="flex items-center gap-1.5">
                      <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px] tracking-tight">
                        {proj.title}
                      </span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-spacegrotesk text-[12.5px] text-[#222222]/80 font-normal">
                          ({proj.technologies.join(', ')})
                        </span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="font-spacegrotesk text-[12.5px] text-[#06B6D4] truncate max-w-[180px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px] pt-0.5">
                      {(proj as any).description}
                    </div>
                  )}
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
          </div>
        );

      case 'skills': {
        const activeSkills = (skills || []).filter((cat) => cat.enabled !== false);
        if (activeSkills.length === 0) return null;

        const hasCategories = activeSkills.some(
          (g) => g.category && g.category.trim() !== '' && g.category.trim() !== 'General'
        );

        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Core Skills', 'skills')}
            <div className="space-y-2">
              {activeSkills.map((cat, cIdx) => {
                const items = (cat.items || []).filter((it) => it && it.trim());
                if (items.length === 0) return null;
                return (
                  <div
                    key={cat.id || cIdx}
                    data-ghost-item={cat.id || `skill-${cIdx}`}
                    className="space-y-1.5"
                  >
                    {hasCategories && activeSkills.length > 1 && cat.category && (
                      <div
                        data-ghost-item-header="true"
                        className="text-[10px] font-bold text-purple-900 uppercase tracking-wider mb-0.5"
                      >
                        {cat.category}
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {items.map((it, iIdx) => {
                        const lvl = cat.levels?.[it.trim()];
                        const percent = getSkillPercentage(lvl);
                        return (
                          <div key={iIdx} data-ghost-bullet={iIdx} className="space-y-0.5 min-w-0 break-inside-avoid">
                            <div className="flex justify-between items-baseline text-[10px] font-semibold text-slate-800 leading-tight">
                              <span className="truncate pr-1">{it}</span>
                              {lvl && (
                                <span className="text-[8.5px] text-slate-400 font-normal shrink-0">
                                  {lvl}
                                </span>
                              )}
                            </div>
                            {/* Glowing Cyan-to-Blue Horizontal Gradient Bar */}
                            <div className="h-1 w-full bg-slate-100 dark:bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education', 'education')}
            <div className={itemSpaceClass}>
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-spacegrotesk font-bold text-[12.5px] text-[#222222] leading-[18.8px] tracking-tight">
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
                  {(edu as any).description && (
                    <div className="font-spacegrotesk font-normal text-[12.5px] text-[#222222] leading-[18.8px] pt-0.5">
                      {(edu as any).description}
                    </div>
                  )}
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
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            {renderSectionHeader('Languages', 'languages')}
            <div className="space-y-1 text-[11.5px] text-slate-800">
              {languages.map((l, lIdx) => (
                <div key={l.id || lIdx} data-ghost-item={l.id || `lang-${lIdx}`} className="break-inside-avoid">
                  <span className="font-medium text-slate-900">{l.language}</span>
                  {l.proficiency && (
                    <span className="text-slate-700 font-medium"> ({l.proficiency})</span>
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
            <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-700">
              {certifications.map((cert, idx) => (
                <li key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="break-inside-avoid">
                  <span className="font-medium text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-700"> &mdash; {cert.issuer}</span>}
                  {cert.date && <span className="text-slate-700 font-medium"> ({cert.date})</span>}
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
            <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-700">
              {achievements.map((ach, idx) => (
                <li key={ach.id || idx} data-ghost-item={ach.id || `ach-${idx}`} className="space-y-0.5 break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-slate-900">{ach.title}</span>
                    {ach.date && <span className="text-slate-700 font-medium"> ({ach.date})</span>}
                  </div>
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

      case 'declaration': {
        const isLastPage = !data.totalPages || data.pageNumber === data.totalPages;
        if (!isLastPage) return null;
        const text =
          data.declaration?.text ||
          (data as any).declarationText;
        const place = data.declaration?.place;
        const date = data.declaration?.date;
        const signature = data.declaration?.signatureName;

        if (!text?.trim() && !place?.trim() && !date?.trim() && !signature?.trim()) {
          return null;
        }

        return (
          <div key="declaration" data-ghost-section="declaration" className={sectionMarginClass}>
            {renderSectionHeader('Declaration', 'declaration')}
            <div data-ghost-item="declaration-0" className="pt-1 text-[11px] text-slate-700 space-y-3 break-inside-avoid">
              {text && <p className="leading-relaxed italic">{text}</p>}
              <div className="flex justify-between items-end pt-2">
                <div className="space-y-0.5 text-[10.5px] text-slate-700 font-medium">
                  {date && <p>Date: {date}</p>}
                  {place && <p>Place: {place}</p>}
                  {!place && !date && personalInfo.location && <p>Place: {personalInfo.location}</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-xs">{signature || personalInfo.fullName || 'Candidate Signature'}</p>
                  <p className="text-[10px] text-slate-400">Signature</p>
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'customSections': {
        const customSections = data.customSections || [];
        if (customSections.length === 0) return null;

        return (
          <div key="customSections" className="space-y-4">
            {customSections.map((sec) => {
              const normType = normalizeCustomSectionType(sec.type);
              return (
                <div key={sec.id} data-ghost-section="customSections" className={`${sectionMarginClass} break-inside-avoid`}>
                  {renderSectionHeader(sec.title || 'Additional Information', secId)}

                  {normType === 'statement' && (
                    <div
                      data-ghost-item={`${sec.id}-content`}
                      className="text-[11.5px] text-slate-700 leading-relaxed whitespace-pre-line break-inside-avoid"
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
                          <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1 break-inside-avoid">
                            {item.title && (
                              <div className="font-semibold text-xs text-slate-800">
                                {item.title}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              {tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded font-medium"
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
    <div className="w-full h-full min-h-[297mm] bg-white text-[#222222] font-spacegrotesk flex flex-col box-border">
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div
          data-ghost-header="true"
          className="border-b border-purple-200/80 px-7 sm:px-9 py-2.5 mb-4 flex items-center justify-between text-xs font-semibold text-purple-900 break-inside-avoid"
        >
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span className="text-purple-600 font-medium">{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Curved Deep Violet Header Banner matching Aurora (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="bg-gradient-to-r from-[#29084d] via-[#3d126b] to-[#1c0836] text-white p-5 sm:p-6 rounded-b-[20px] shadow-sm break-inside-avoid"
        >
          {personalInfo.jobTitle && (
            <div data-ghost-role="true" className="inline-block px-3 py-0.5 rounded-full border border-purple-400/40 bg-purple-950/40 font-spacegrotesk text-[11px] font-normal tracking-[0.2em] uppercase text-white leading-[16.5px]">
              {personalInfo.jobTitle}
            </div>
          )}

          <h1 className="font-spacegrotesk text-[58px] font-bold tracking-tight text-white mt-1 leading-[62px]">
            {personalInfo.fullName}
          </h1>

          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {contactItems.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 font-spacegrotesk text-[11px] text-purple-100 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 2-Column Body Layout strictly adhering to active sections, ordering and multi-page pagination */}
      <div className={`${contentPadding} grid grid-cols-12 gap-7 sm:gap-9 flex-1`}>
        {/* Main Column (Left, ~60-65%) */}
        <div
          data-ghost-col="main"
          className={hasSidebarContent ? 'col-span-7 space-y-1' : 'col-span-12 space-y-1'}
        >
          {mainSectionIds.map((secId: ResumeSectionId) => renderSection(secId, false))}
        </div>

        {/* Sidebar Column (Right, ~35-40%) with Left Divider */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className="col-span-5 border-l border-slate-200/80 pl-7 space-y-1">
            {sidebarSectionIds.map((secId: ResumeSectionId) => renderSection(secId, true))}
          </div>
        )}
      </div>
    </div>
  );
};

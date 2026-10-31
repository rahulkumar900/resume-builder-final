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

  const contentPadding =
    spacing === 'compact' ? 'p-5 sm:p-6' : spacing === 'relaxed' ? 'p-8 sm:p-10' : 'p-6 sm:p-8';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('neon_creative', data);
  const mainSectionIds = resolvedOrder.mainColumn || [];
  const sidebarSectionIds = resolvedOrder.sidebarColumn || [];
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

  // Render uppercase section header with accent pill
  const renderSectionHeader = (title: string, secId?: string) => (
    <div
      data-ghost-section-title="true"
      className="flex items-center gap-2 mb-2.5 break-after-avoid"
    >
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shrink-0 shadow-xs" />
      <h2 className="text-[12px] font-black uppercase tracking-[0.18em] text-slate-900">
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
                className="text-[11.5px] text-slate-700 leading-relaxed"
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
                  {(exp as any).description && (
                    <div className="text-[11px] text-slate-700 leading-normal pt-0.5">
                      {(exp as any).description}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-slate-700 text-[11px] leading-normal pt-0.5 space-y-0.5"
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
                      <span className="text-[11px] text-blue-600 truncate max-w-[180px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {(proj as any).description && (
                    <div className="text-[11px] text-slate-700 leading-normal pt-0.5">
                      {(proj as any).description}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-slate-700 text-[11px] leading-normal pt-0.5"
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

        // Collect all individual skills with their parsed or mapped levels
        const skillItems: { name: string; level?: string }[] = [];
        activeSkills.forEach((cat) => {
          (cat.items || []).forEach((it) => {
            const lvl = cat.levels?.[it.trim()];
            skillItems.push({ name: it, level: lvl });
          });
        });

        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            {renderSectionHeader('Core Skills', 'skills')}
            <div className="space-y-2.5">
              {skillItems.map((skill, sIdx) => {
                const percent = getSkillPercentage(skill.level);
                return (
                  <div key={sIdx} data-ghost-item={`skill-${sIdx}`} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between items-center text-[11.5px] font-semibold text-slate-800">
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          {skill.level}
                        </span>
                      )}
                    </div>
                    {/* Glowing Cyan-to-Blue Horizontal Gradient Bar */}
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-muted rounded-full overflow-hidden">
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
      }

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education', 'education')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-bold text-[12px] text-slate-900 tracking-tight">
                      {edu.degree}
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-normal">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600">
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
                      className="text-slate-600 text-[10.5px] pt-0.5 leading-normal"
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
                    <span className="text-slate-500"> ({l.proficiency})</span>
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
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-medium text-slate-900">{cert.name}</span>
                  {cert.issuer && <span className="text-slate-600"> &mdash; {cert.issuer}</span>}
                  {cert.date && <span className="text-slate-500"> ({cert.date})</span>}
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
              {achievements.map((ach) => (
                <li key={ach.id} data-ghost-item={ach.id} className="space-y-0.5 break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-slate-900">{ach.title}</span>
                    {ach.date && <span className="text-slate-500"> ({ach.date})</span>}
                  </div>
                  {ach.description && (
                    <div className="text-[10.5px] text-slate-600 leading-normal">
                      {ach.description}
                    </div>
                  )}
                </li>
              ))}
            </ul>
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
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans flex flex-col box-border">
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="border-b border-purple-200/80 px-7 sm:px-9 py-2.5 mb-4 flex items-center justify-between text-xs font-semibold text-purple-900 break-inside-avoid">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span className="text-purple-600 font-medium">{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Curved Deep Violet Header Banner matching PDF Page 3 (Page 1 only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className="bg-gradient-to-r from-[#29084d] via-[#3d126b] to-[#1c0836] text-white p-7 sm:p-9 rounded-b-[28px] shadow-sm break-inside-avoid"
        >
          {personalInfo.jobTitle && (
            <div className="inline-block px-3.5 py-1 rounded-full border border-purple-400/40 bg-purple-950/40 text-[10.5px] font-bold tracking-[0.2em] uppercase text-purple-200">
              {personalInfo.jobTitle}
            </div>
          )}

          <h1 className="text-[36px] sm:text-[42px] font-black tracking-tight text-white mt-2 leading-tight">
            {personalInfo.fullName}
          </h1>

          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {contactItems.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-[11px] text-purple-100 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </header>
      )}

      {/* 2-Column Body Layout strictly adhering to active sections, ordering and multi-page pagination */}
      <div className={`${contentPadding} grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-9 flex-1`}>
        {/* Main Column (Left, ~60-65%) */}
        <div
          data-ghost-col="main"
          className={hasSidebarContent ? 'md:col-span-7 space-y-1' : 'md:col-span-12 space-y-1'}
        >
          {mainSectionIds.map((secId: ResumeSectionId) => renderSection(secId, false))}
        </div>

        {/* Sidebar Column (Right, ~35-40%) with Left Divider */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className="md:col-span-5 md:border-l md:border-slate-200/80 md:pl-7 space-y-1">
            {sidebarSectionIds.map((secId: ResumeSectionId) => renderSection(secId, true))}
          </div>
        )}
      </div>
    </div>
  );
};

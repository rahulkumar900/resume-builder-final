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

const TAB_CONFIG: Record<string, { label: string; color: string; height: number }> = {
  summary: { label: 'PROFILE', color: '#0EA5E9', height: 96 },
  experience: { label: 'EXPERIENCE', color: '#F59E0B', height: 140 },
  projects: { label: 'PROJECTS', color: '#10B981', height: 130 },
  education: { label: 'EDUCATION', color: '#8B5CF6', height: 130 },
  skills: { label: 'SKILLS', color: '#3B82F6', height: 120 },
  certifications: { label: 'CERTS', color: '#06B6D4', height: 110 },
  awards: { label: 'AWARDS', color: '#F97316', height: 110 },
  languages: { label: 'LANGUAGES', color: '#64748B', height: 120 },
};

export const BinderTabsTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact'
      ? 'py-8 pl-8 sm:pl-10 pr-[54px]'
      : spacing === 'relaxed'
      ? 'py-12 pl-12 sm:pl-14 pr-[68px]'
      : 'py-10 pl-10 sm:pl-12 pr-[60px]';

  const tabOffsetClass =
    spacing === 'compact' ? 'right-[-54px]' : spacing === 'relaxed' ? 'right-[-68px]' : 'right-[-60px]';

  const tabWidthClass =
    spacing === 'compact' ? 'w-[32px]' : spacing === 'relaxed' ? 'w-[36px]' : 'w-[34px]';

  const resolvedOrder = getResolvedTemplateSectionOrder('binder_tabs', data);
  const sectionOrder: ResumeSectionId[] = (
    data.sectionOrder?.singleColumn ||
    resolvedOrder.singleColumn ||
    []
  ).filter((s) => !data.hiddenSections?.includes(s));

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  const isSectionVisible = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        return Boolean(personalInfo.summary?.trim());
      case 'experience':
        return experience.length > 0;
      case 'projects':
        return projects.length > 0;
      case 'education':
        return education.length > 0;
      case 'skills':
        return skills.length > 0;
      case 'certifications':
        return certifications.length > 0;
      case 'awards':
        return awards.length > 0;
      case 'languages':
        return languages.length > 0;
      default:
        return true;
    }
  };

  const activeSections = sectionOrder.filter(isSectionVisible);

  const getSectionClass = (isFirstSec: boolean, avoidBreak = false) => {
    const margin = isFirstSec
      ? 'mt-0 pt-0'
      : `${spacing === 'compact' ? 'mt-4 pt-3.5' : spacing === 'relaxed' ? 'mt-6 pt-5' : 'mt-5 pt-4'} border-t border-[#E2E8F0]`;
    return `relative ${margin} ${avoidBreak ? 'break-inside-avoid' : ''}`;
  };

  const renderTab = (tabInfo: { label: string; color: string; height?: number }, isFirstSec: boolean = false) => {
    const h = tabInfo.height || Math.max(96, tabInfo.label.length * 11 + 36);
    return (
      <div
        className={`absolute ${tabOffsetClass} ${isFirstSec ? 'top-[-10px]' : 'top-0'} ${tabWidthClass} rounded-l-[8px] flex items-center justify-center font-spacegrotesk text-[9.5px] font-bold text-white tracking-[0.16em] uppercase shadow-[-2px_0_6px_rgba(15,23,42,0.06)] z-10 select-none pointer-events-none py-3 box-border`}
        style={{
          backgroundColor: tabInfo.color,
          height: `${h}px`,
          writingMode: 'vertical-rl',
        }}
      >
        {tabInfo.label}
      </div>
    );
  };

  const renderSection = (secId: ResumeSectionId, isFirst: boolean) => {
    const tabInfo = TAB_CONFIG[secId] || {
      label: secId.toUpperCase(),
      color: '#475569',
      height: Math.max(96, secId.length * 11 + 36),
    };

    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={getSectionClass(isFirst, true)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Profile
              </span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#334155] leading-[20px]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience.length) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-3 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Experience
              </span>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {exp.role}
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-manrope text-[12px] font-normal text-[#64748B] mt-0.5">
                      {exp.company}
                      {exp.company && exp.location && ', '}
                      {exp.location}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-1.5 font-manrope text-[12.5px] text-[#334155] leading-[20px]">
                      <ResumeHighlights highlights={exp.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (!projects.length) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-3 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Projects
              </span>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-manrope text-[11.5px] text-[#64748B] mt-0.5">
                      {proj.technologies.join(' · ')}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="mt-1 font-manrope text-[12.5px] text-[#334155] leading-[20px]">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education.length) return null;
        return (
          <div key="education" data-ghost-section="education" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Education
              </span>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0F172A]">
                      {edu.degree}
                    </span>
                    {edu.graduationDate && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#64748B]">
                        {edu.graduationDate}
                      </span>
                    )}
                  </div>
                  <div className="font-manrope text-[12px] text-[#64748B] mt-0.5">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills.length) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2.5 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Skills
              </span>
            </div>
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-2">
              {skills.flatMap((cat) => cat.items).map((skillName, idx) => (
                <span
                  key={idx}
                  className="font-manrope text-[11.5px] font-medium px-3 py-1 rounded-full border border-[#0F172A] text-[#0F172A] bg-white"
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications.length) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Certifications
              </span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="text-[12.5px] font-manrope flex justify-between break-inside-avoid">
                  <span className="font-medium text-[#0F172A]">{cert.name}</span>
                  <span className="text-[11.5px] text-[#64748B]">
                    {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        if (!awards.length) return null;
        return (
          <div key="awards" data-ghost-section="awards" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Recognition
              </span>
            </div>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className="text-[12.5px] font-manrope flex justify-between break-inside-avoid">
                  <span className="font-medium text-[#0F172A]">{award.title}</span>
                  <span className="text-[11.5px] text-[#64748B]">
                    {award.issuer} {award.date ? `(${award.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages.length) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                Languages
              </span>
            </div>
            <div data-ghost-item="languages-0" className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] font-manrope text-[#334155]">
              {languages.map((lang, idx) => (
                <span key={idx}>
                  <strong className="font-semibold text-[#0F172A]">{lang.language}</strong>
                  {lang.proficiency ? ` (${lang.proficiency})` : ''}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={getSectionClass(isFirst, false)}>
            {renderTab(tabInfo, isFirst)}
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title) => (
                <div data-ghost-section-title="true" className="mb-2.5 break-after-avoid">
                  <span className="font-manrope text-[12px] font-bold uppercase tracking-[0.14em] text-[#0F172A]">
                    {title}
                  </span>
                </div>
              )}
            />
          </div>
        );
    }
  };

  return (
    <div className={`w-full bg-white min-h-full font-manrope ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] pb-2 mb-4 border-b border-[#0F172A]/20 break-inside-avoid">
          <span>
            <strong className="font-bold text-[#0F172A]">{personalInfo.fullName || 'Candidate'}</strong>
            {personalInfo.jobTitle && <span> &mdash; {personalInfo.jobTitle}</span>}
          </span>
          <span>Page {data.pageNumber} of {data.totalPages || 2}</span>
        </div>
      )}

      {/* Main Header (Page 1 Only) */}
      {isPage1 && (
        <div data-ghost-header="true" className="break-inside-avoid">
          <h1 className="font-fraunces text-[38px] font-bold text-[#0F172A] leading-[1.05]">
            {personalInfo.fullName || 'Your Name'}
          </h1>

          {personalInfo.jobTitle && (
            <div data-ghost-role="true" className="mt-1">
              <span className="font-manrope text-[14px] font-medium text-[#475569]">
                {personalInfo.jobTitle}
              </span>
            </div>
          )}

          {contactItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2.5 font-manrope text-[11.5px] font-medium text-[#64748B]">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#94A3B8]">&bull;</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Bold dark slate divider bar */}
          <div className="h-[2.5px] bg-[#0F172A] mt-3.5 mb-5" />
        </div>
      )}

      {/* Sections with Vertical Edge Tabs */}
      <div data-ghost-col="single" className="space-y-0">
        {activeSections.map((secId, idx) => renderSection(secId, idx === 0 && isPage1))}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { getResolvedTemplateSectionOrder } from '@/lib/templates';
import { hasPageSidebarContent } from '@/lib/templates/content-check';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

/**
 * Extracts 2-letter monogram initials from the person's full name.
 */
function getInitials(name?: string): string {
  if (!name || !name.trim()) return 'AM';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const MonogramTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#581C87', // Plum
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-8' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-10';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-4' : spacing === 'relaxed' ? 'mt-6' : 'mt-5';

  const resolvedOrder = getResolvedTemplateSectionOrder('monogram', data);
  const mainSectionIds = (
    data.sectionOrder?.mainColumn ||
    resolvedOrder.mainColumn ||
    []
  ).filter((s) => !data.hiddenSections?.includes(s));
  const sidebarSectionIds = (
    data.sectionOrder?.sidebarColumn ||
    resolvedOrder.sidebarColumn ||
    []
  ).filter((s) => !data.hiddenSections?.includes(s));

  const hasSidebarContent = hasPageSidebarContent(data, sidebarSectionIds);
  const showSidebar = isPage1 || hasSidebarContent;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  const initials = getInitials(personalInfo.fullName);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={`${sectionMarginClass} break-inside-avoid`}>
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Profile
              </span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#1F2937] leading-[20px]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience.length) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-3 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Experience
              </span>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#3B0764]">
                      {exp.role}
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#6B7280]">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-manrope text-[12px] font-normal text-[#6B7280] mt-0.5">
                      {exp.company}
                      {exp.company && exp.location && ', '}
                      {exp.location}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-1.5 font-manrope text-[12.5px] text-[#1F2937] leading-[20px]">
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
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-3 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Projects
              </span>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#3B0764]">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#6B7280]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-manrope text-[11.5px] text-[#6B7280] mt-0.5">
                      {proj.technologies.join(' · ')}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="mt-1 font-manrope text-[12.5px] text-[#1F2937] leading-[20px]">
                      <ResumeHighlights highlights={proj.highlights} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills.length) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-2.5 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Skills
              </span>
            </div>
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-1.5">
              {skills.flatMap((cat) => cat.items).map((skillName, idx) => (
                <span
                  key={idx}
                  className="font-manrope text-[11.5px] font-medium px-3 py-0.5 rounded-full border border-[#581C87] text-[#3B0764] bg-white shadow-2xs"
                >
                  {skillName}
                </span>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education.length) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Education
              </span>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-col">
                    <span className="font-manrope text-[12.5px] font-bold text-[#3B0764]">
                      {edu.degree}
                    </span>
                    {edu.graduationDate && (
                      <span className="font-manrope text-[11px] font-medium text-[#6B7280]">
                        {edu.graduationDate}
                      </span>
                    )}
                  </div>
                  <div className="font-manrope text-[11.5px] text-[#6B7280] mt-0.5">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications.length) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Certifications
              </span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="text-[12px] font-manrope break-inside-avoid">
                  <div className="font-medium text-[#3B0764]">{cert.name}</div>
                  <div className="text-[11px] text-[#6B7280]">
                    {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        if (!awards.length) return null;
        return (
          <div key="awards" data-ghost-section="awards" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Recognition
              </span>
            </div>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className="text-[12px] font-manrope break-inside-avoid">
                  <div className="font-medium text-[#3B0764]">{award.title}</div>
                  <div className="text-[11px] text-[#6B7280]">
                    {award.issuer} {award.date ? `(${award.date})` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages.length) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
              <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Languages
              </span>
            </div>
            <div data-ghost-item="languages-0" className="space-y-1 text-[12px] font-manrope text-[#1F2937]">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-semibold text-[#3B0764]">{lang.language}</span>
                  <span className="text-[#6B7280] text-[11px]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={`${sectionMarginClass} break-inside-avoid`}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={(title) => (
                <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
                  <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
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
    <div className={`w-full bg-white min-h-full font-manrope relative overflow-hidden ${paddingClass}`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="flex items-baseline justify-between border-b border-[#E9D5FF] pb-2 mb-4 text-[#6B7280] text-[11px] font-manrope break-inside-avoid">
          <div className="font-semibold text-[#3B0764] tracking-wider uppercase">
            {personalInfo.fullName || 'Candidate'}
            {personalInfo.jobTitle && <span className="font-normal text-[#6B7280] ml-2">| {personalInfo.jobTitle}</span>}
          </div>
          <div className="text-[10px] text-[#9CA3AF]">
            Page {data.pageNumber}{data.totalPages ? ` of ${data.totalPages}` : ''}
          </div>
        </div>
      )}

      {/* Main Header & Signature Watermark (Page 1 Only) */}
      {isPage1 && (
        <>
          {/* Signature Outlined Watermark Monogram behind header */}
          <div
            className="absolute top-4 sm:top-6 right-[-8px] sm:right-[-12px] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <span
              className="font-dmserif block select-none pointer-events-none"
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '320px',
                lineHeight: '0.82',
                color: 'transparent',
                WebkitTextStroke: '1.75px #E9D5FF',
                letterSpacing: '-0.04em',
                opacity: 0.95,
              }}
            >
              {initials}
            </span>
          </div>

          {/* Header */}
          <div data-ghost-header="true" className="relative z-10 pb-2 break-inside-avoid">
            <h1 className="font-dmserif text-[52px] font-normal text-[#3B0764] leading-[1.0] tracking-[-0.01em]">
              {personalInfo.fullName || 'Your Name'}
            </h1>

            {personalInfo.jobTitle && (
              <div data-ghost-role="true" className="mt-1.5">
                <span className="font-spacegrotesk text-[12px] font-bold uppercase tracking-[0.2em] text-[#CA8A04]">
                  {personalInfo.jobTitle}
                </span>
              </div>
            )}

            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2.5 font-manrope text-[11.5px] font-medium text-[#6B7280]">
                {contactItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-[#D1D5DB]">•</span>}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Two Column Layout */}
      <div className={`relative z-10 grid grid-cols-12 gap-6 sm:gap-8 mt-2`}>
        {/* Main Column */}
        <div data-ghost-col="main" className={`${showSidebar ? 'col-span-8' : 'col-span-12'} space-y-1`}>
          {mainSectionIds.map((secId) => renderSection(secId))}
        </div>

        {/* Sidebar Column */}
        {showSidebar && (
          <div data-ghost-col="sidebar" className="col-span-4 space-y-1">
            {sidebarSectionIds.map((secId) => renderSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

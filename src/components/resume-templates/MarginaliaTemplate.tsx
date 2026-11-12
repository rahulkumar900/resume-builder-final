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

/**
 * Extracts a punchy headline metric and caption from experience highlights for the margin column.
 */
function extractHeadlineMetric(highlights?: string[], fallbackIndex: number = 0): { metric: string; caption: string } | null {
  if (!highlights || highlights.length === 0) {
    const fallbacks = [
      { metric: '63%', caption: 'ACTIVATION RATE' },
      { metric: '60+', caption: 'USABILITY TESTS' },
      { metric: '−25%', caption: 'HANDOFF TIME' },
      { metric: '3.5K', caption: 'ACTIVE DOWNLOADS' },
    ];
    return fallbacks[fallbackIndex % fallbacks.length];
  }

  // Look for regex pattern in highlights: e.g. "63%", "+40%", "60+", "-25%", "$10M"
  const metricRegex = /([+\-−]?\d+(?:\.\d+)?%|\b\d+\+|\$\d+(?:\.\d+)?[MBK]?|\b\d+x\b)/i;
  for (const h of highlights) {
    const match = h.match(metricRegex);
    if (match) {
      const metric = match[0].replace('-', '−');
      // Extract following or preceding 2-3 words as caption
      const words = h.replace(metricRegex, '').trim().split(/\s+/).slice(0, 3).join(' ');
      const caption = words ? words.toUpperCase() : 'KEY RESULT';
      return { metric, caption: caption.length > 22 ? caption.slice(0, 22) : caption };
    }
  }

  // Fallback defaults if no number regex match found
  const fallbacks = [
    { metric: '63%', caption: 'CORE IMPACT' },
    { metric: '60+', caption: 'DELIVERABLES' },
    { metric: '−25%', caption: 'EFFICIENCY' },
  ];
  return fallbacks[fallbackIndex % fallbacks.length];
}

export const MarginaliaTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#B45309', // Warm Amber / Ochre
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-7 sm:p-8' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-10';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-3.5' : spacing === 'relaxed' ? 'mt-6' : 'mt-4.5';

  const resolvedOrder = getResolvedTemplateSectionOrder('marginalia', data);
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

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={`${sectionMarginClass} flex flex-row items-start gap-6 break-inside-avoid`}>
            {/* Margin Column */}
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Profile
              </span>
            </div>
            {/* Content Column */}
            <div data-ghost-item="summary-0" className="flex-1">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#292524] leading-[20px]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {/* Section Header */}
            <div className="flex flex-row items-start gap-6 mb-3 break-after-avoid">
              <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0">
                <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                  Experience
                </span>
              </div>
              <div className="flex-1" />
            </div>

            {/* Experience Entries with Signature Left Margin Metrics */}
            <div className="space-y-4">
              {experience.map((exp, idx) => {
                const metricInfo = extractHeadlineMetric(exp.highlights, idx);
                return (
                  <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="flex flex-row items-start gap-6 break-inside-avoid">
                    {/* Left Margin: Headline Metric */}
                    <div className="w-36 sm:w-40 shrink-0 pr-2 pt-0.5">
                      {metricInfo && (
                        <div>
                          <div className="font-fraunces text-[30px] font-bold leading-none" style={{ color: themeColor }}>
                            {metricInfo.metric}
                          </div>
                          <div className="font-spacegrotesk text-[10.5px] font-medium text-[#78716C] uppercase leading-[14px] mt-1 tracking-wider">
                            {metricInfo.caption}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 min-w-0">
                      <div data-ghost-item-header="true">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="font-manrope text-[13px] font-bold text-[#1C1917]">
                            {exp.role}
                          </span>
                          <span className="font-manrope text-[11.5px] font-medium text-[#78716C] whitespace-nowrap">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="font-manrope text-[12px] text-[#78716C] mb-1">
                          {exp.company}{exp.location ? `, ${exp.location}` : ''}
                        </div>
                      </div>
                      <ResumeHighlights
                        highlights={exp.highlights}
                        className="font-manrope text-[12.5px] text-[#292524] leading-[20px] pl-4"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={`${sectionMarginClass} flex flex-row items-start gap-6`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5 break-after-avoid">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Projects
              </span>
            </div>
            <div className="flex-1 space-y-3">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-manrope text-[13px] font-bold text-[#1C1917]">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <span className="font-manrope text-[11.5px] text-[#78716C] truncate max-w-[200px]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-spacegrotesk text-[11px] text-[#78716C] font-medium mb-1">
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="font-manrope text-[12.5px] text-[#292524] leading-[20px] pl-4"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={`${sectionMarginClass} flex flex-row items-start gap-6`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5 break-after-avoid">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Education
              </span>
            </div>
            <div className="flex-1 space-y-2.5">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline gap-2">
                    <span className="font-manrope text-[13px] font-bold text-[#1C1917]">
                      {edu.degree}
                    </span>
                    <span className="font-manrope text-[11.5px] font-medium text-[#78716C] whitespace-nowrap">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <div className="font-manrope text-[12px] text-[#78716C]">
                    {edu.school}{edu.location ? `, ${edu.location}` : ''}{edu.gpa ? ` • CGPA / Score: ${edu.gpa}` : ''}
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={edu.highlights}
                      className="font-manrope text-[12px] text-[#292524] leading-[18px] pl-4 mt-0.5"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} flex flex-row items-start gap-6 break-inside-avoid`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-1">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Skills
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {skills.flatMap((cat) => cat.items).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    data-ghost-item={`skill-${sIdx}`}
                    className="inline-block px-3 py-1 text-[12px] font-medium text-[#1C1917] bg-white border border-[#1C1917] rounded-full shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} flex flex-row items-start gap-6`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5 break-after-avoid">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Certifications
              </span>
            </div>
            <div className="flex-1 space-y-1.5">
              {certifications.map((cert, cIdx) => (
                <div key={cert.id || cIdx} data-ghost-item={cert.id || `cert-${cIdx}`} className="flex justify-between items-baseline gap-2 text-[12px] font-manrope break-inside-avoid">
                  <span className="font-semibold text-[#1C1917]">{cert.name}</span>
                  <span className="text-[#78716C] text-[11.5px] whitespace-nowrap">
                    {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <div key="awards" data-ghost-section="awards" className={`${sectionMarginClass} flex flex-row items-start gap-6`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5 break-after-avoid">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Recognition
              </span>
            </div>
            <div className="flex-1 space-y-1.5">
              {awards.map((award, aIdx) => (
                <div key={award.id || aIdx} data-ghost-item={award.id || `award-${aIdx}`} className="flex justify-between items-baseline gap-2 text-[12px] font-manrope break-inside-avoid">
                  <span className="font-semibold text-[#1C1917]">{award.title}</span>
                  <span className="text-[#78716C] text-[11.5px] whitespace-nowrap">
                    {award.issuer} {award.date ? `(${award.date})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} flex flex-row items-start gap-6 break-inside-avoid`}>
            <div data-ghost-section-title="true" className="w-36 sm:w-40 shrink-0 pt-0.5">
              <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                Languages
              </span>
            </div>
            <div className="flex-1 flex flex-wrap gap-x-5 gap-y-1 text-[12px] font-manrope">
              {languages.map((l, lIdx) => (
                <span key={l.id || lIdx} data-ghost-item={l.id || `lang-${lIdx}`}>
                  <strong className="font-semibold text-[#1C1917]">{l.language}</strong>
                  {l.proficiency && <span className="text-[#78716C]"> ({l.proficiency})</span>}
                </span>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={`${sectionMarginClass} flex flex-row items-start gap-6`}>
            <div className="w-36 sm:w-40 shrink-0" />
            <div className="flex-1">
              <UniversalSectionRenderer
                secId={secId}
                data={data}
                renderHeader={(title) => (
                  <div data-ghost-section-title="true" className="mb-2 break-after-avoid">
                    <span className="font-spacegrotesk text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: themeColor }}>
                      {title}
                    </span>
                  </div>
                )}
                itemSpacingClass="space-y-2.5"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-[#FDFCF7] text-[#1C1917] flex flex-col font-manrope ${paddingClass} box-border`}>
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="flex items-center justify-between text-[11px] font-medium text-[#78716C] pb-2 mb-3 border-b border-[#1C1917]/20 break-inside-avoid">
          <span>
            <strong className="font-bold text-[#1C1917]">{personalInfo.fullName || 'Candidate'}</strong>
            {personalInfo.jobTitle && <span> &mdash; {personalInfo.jobTitle}</span>}
          </span>
          <span>Page {data.pageNumber} of {data.totalPages || 2}</span>
        </div>
      )}

      {/* Main Header Block (Page 1 Only) */}
      {isPage1 && (
        <header data-ghost-header="true" className="pb-4 mb-3 border-b-[1.5px] border-[#1C1917] flex justify-between items-start gap-4 break-inside-avoid">
          <div>
            <h1 className="font-dmserif text-[44px] font-normal text-[#1C1917] tracking-[-0.01em] leading-[46.2px]">
              {personalInfo.fullName || 'Candidate Name'}
            </h1>
            {personalInfo.jobTitle && (
              <div
                data-ghost-role="true"
                className="font-spacegrotesk text-[11px] font-medium uppercase tracking-[0.22em] leading-[15.4px] mt-1"
                style={{ color: themeColor }}
              >
                {personalInfo.jobTitle}
              </div>
            )}
          </div>

          {contactItems.length > 0 && (
            <div className="text-right font-manrope text-[11.5px] font-medium text-[#78716C] leading-[16px] space-y-0.5">
              {contactItems.map((item, idx) => (
                <div key={idx} className="truncate max-w-[260px]">
                  {item}
                </div>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Single Column Sections with Ghost Column Marker */}
      <div data-ghost-col="single" className="flex-1 space-y-2">
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

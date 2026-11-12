'use client';

import React from 'react';
import { ResumeData, ResumeSectionId, ExperienceItem } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { getResolvedTemplateSectionOrder } from '@/lib/templates';
import { hasPageSidebarContent } from '@/lib/templates/content-check';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

interface TimelineSegment {
  company: string;
  role: string;
  startYear: number;
  endYear: number;
  dateStr: string;
  widthPercent: number;
  color: string;
}

interface AxisTick {
  year: number;
  percent: number;
}

/**
 * Parses years from date strings (e.g., "2018", "May 2021", "Present")
 * and computes proportional segments and exact axis ticks for the Career Gantt bar.
 */
function buildGanttSegments(experience: ExperienceItem[]): {
  segments: TimelineSegment[];
  axisTicks: AxisTick[];
} {
  const currentYear = new Date().getFullYear();
  // Deep teal tones from signature palette
  const tealColors = ['#0F766E', '#115E59', '#134E4A', '#0D9488', '#14B8A6'];

  if (!experience || experience.length === 0) {
    const mockSegments: TimelineSegment[] = [
      { company: 'Studio Nirman', role: 'UI/UX Designer', startYear: 2016, endYear: 2018, dateStr: '2016 – 2018', widthPercent: 25, color: '#0F766E' },
      { company: 'LearnKul', role: 'Product Designer', startYear: 2018, endYear: 2021, dateStr: '2018 – 2021', widthPercent: 37.5, color: '#115E59' },
      { company: 'Finova Labs', role: 'Senior Product Designer', startYear: 2021, endYear: currentYear, dateStr: `2021 – Present`, widthPercent: 37.5, color: '#134E4A' },
    ];
    return {
      segments: mockSegments,
      axisTicks: [
        { year: 2016, percent: 0 },
        { year: 2018, percent: 25 },
        { year: 2020, percent: 50 },
        { year: 2022, percent: 75 },
        { year: currentYear, percent: 100 },
      ],
    };
  }

  // Parse years for each experience entry
  const parsed = experience.map((exp, idx) => {
    const startMatch = exp.startDate?.match(/\b(19\d\d|20\d\d)\b/);
    const endMatch = exp.endDate?.match(/\b(19\d\d|20\d\d)\b/);
    const isCurrent = exp.current || exp.endDate?.toLowerCase().includes('present');

    const startYear = startMatch ? parseInt(startMatch[0], 10) : currentYear - 3;
    const endYear = isCurrent ? currentYear : (endMatch ? parseInt(endMatch[0], 10) : startYear + 2);
    const dateStr = `${startYear} – ${isCurrent ? 'Present' : endYear}`;

    return {
      company: exp.company || `Company ${idx + 1}`,
      role: exp.role || 'Role',
      startYear,
      endYear: Math.max(endYear, startYear + 1),
      dateStr,
      color: tealColors[idx % tealColors.length],
    };
  });

  // Sort chronological for Gantt timeline
  parsed.sort((a, b) => a.startYear - b.startYear);

  const minYear = Math.min(...parsed.map((p) => p.startYear));
  const maxYear = Math.max(...parsed.map((p) => p.endYear), minYear + 1);
  const totalDuration = Math.max(1, maxYear - minYear);

  const segments: TimelineSegment[] = parsed.map((p) => {
    const duration = Math.max(1, p.endYear - p.startYear);
    const widthPercent = (duration / totalDuration) * 100;
    return {
      ...p,
      widthPercent,
    };
  });

  // Build 4 to 6 proportional axis tick years
  const axisTicks: AxisTick[] = [];
  const step = totalDuration <= 8 ? 2 : Math.max(2, Math.round(totalDuration / 4));
  for (let yr = minYear; yr <= maxYear; yr += step) {
    const percent = Math.min(100, Math.max(0, ((yr - minYear) / totalDuration) * 100));
    axisTicks.push({ year: yr, percent });
  }
  if (!axisTicks.some((t) => t.year === maxYear)) {
    axisTicks.push({ year: maxYear, percent: 100 });
  }

  return { segments, axisTicks };
}

export const CareerGanttTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#0F766E', // Deep Teal
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-8' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-10';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-4' : spacing === 'relaxed' ? 'mt-6' : 'mt-5';

  const resolvedOrder = getResolvedTemplateSectionOrder('career_gantt', data);
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

  const { segments, axisTicks } = buildGanttSegments(experience);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={`${sectionMarginClass} break-inside-avoid`}>
            <div data-ghost-section-title="true" className="pb-1 mb-2.5 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Profile
              </span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#1C1917] leading-[1.6]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience.length) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Experience
              </span>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13.5px] font-bold text-[#134E4A]">
                      {exp.role}
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className="font-manrope text-[12px] font-medium text-[#57534E] whitespace-nowrap">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {(exp.company || exp.location) && (
                    <div className="font-manrope text-[12px] font-normal text-[#57534E] mt-0.5">
                      {exp.company}
                      {exp.company && exp.location && ', '}
                      {exp.location}
                    </div>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-1.5 font-manrope text-[12.5px] text-[#1C1917] leading-[1.6]">
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Projects
              </span>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13.5px] font-bold text-[#134E4A]">
                      {proj.title}
                    </span>
                    {proj.link && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#57534E]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="font-manrope text-[11.5px] text-[#57534E] mt-0.5">
                      {proj.technologies.join(' · ')}
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="mt-1 font-manrope text-[12.5px] text-[#1C1917] leading-[1.6]">
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
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Skills
              </span>
            </div>
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-2">
              {skills.flatMap((cat) => cat.items).map((skillName, idx) => (
                <span
                  key={idx}
                  className="font-manrope text-[12px] font-medium px-3 py-1 text-[#0F766E] border border-[#0F766E] rounded-full leading-none whitespace-nowrap"
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Education
              </span>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#134E4A] leading-snug">
                      {edu.degree}
                    </span>
                    {edu.graduationDate && (
                      <span className="font-manrope text-[11.5px] font-medium text-[#57534E] whitespace-nowrap">
                        {edu.graduationDate}
                      </span>
                    )}
                  </div>
                  <div className="font-manrope text-[12px] text-[#57534E] mt-0.5">
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Certifications
              </span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="flex items-start text-[12px] font-manrope text-[#1C1917] leading-[1.5] break-inside-avoid">
                  <span className="text-[#0F766E] mr-2 select-none">•</span>
                  <div>
                    <span className="font-semibold text-[#134E4A]">{cert.name}</span>
                    {(cert.issuer || cert.date) && (
                      <span className="text-[#57534E] ml-1">
                        {cert.issuer ? `(${cert.issuer}${cert.date ? `, ${cert.date}` : ''})` : `(${cert.date})`}
                      </span>
                    )}
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Recognition
              </span>
            </div>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className="flex items-start text-[12px] font-manrope text-[#1C1917] leading-[1.5] break-inside-avoid">
                  <span className="text-[#0F766E] mr-2 select-none">•</span>
                  <div>
                    <span className="font-semibold text-[#134E4A]">{award.title}</span>
                    {(award.issuer || award.date) && (
                      <span className="text-[#57534E] ml-1">
                        {award.issuer ? `(${award.issuer}${award.date ? `, ${award.date}` : ''})` : `(${award.date})`}
                      </span>
                    )}
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Languages
              </span>
            </div>
            <div data-ghost-item="languages-0" className="space-y-1 text-[12px] font-manrope text-[#1C1917]">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-semibold text-[#134E4A]">{lang.language}</span>
                  <span className="text-[#57534E] text-[11px]">{lang.proficiency}</span>
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
                <div data-ghost-section-title="true" className="pb-1 mb-3 border-b-2 border-[#99F6E4] break-after-avoid">
                  <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
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
        <div className="flex items-baseline justify-between border-b border-[#E7E5E4] pb-2 mb-4 text-[#57534E] text-[11px] font-manrope break-inside-avoid">
          <div className="font-semibold text-[#134E4A] tracking-wider uppercase">
            {personalInfo.fullName || 'Candidate'}
            {personalInfo.jobTitle && <span className="font-normal text-[#57534E] ml-2">| {personalInfo.jobTitle}</span>}
          </div>
          <div className="text-[10px] text-[#78716C]">
            Page {data.pageNumber}{data.totalPages ? ` of ${data.totalPages}` : ''}
          </div>
        </div>
      )}

      {/* Main Header Block (Page 1 Only) */}
      {isPage1 && (
        <div data-ghost-header="true" className="break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-1">
            <div>
              <h1 className="font-fraunces text-[36px] sm:text-[38px] font-bold text-[#134E4A] leading-[1.05]">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <div data-ghost-role="true" className="mt-1">
                  <span
                    className="font-manrope text-[12.5px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: themeColor || '#0F766E' }}
                  >
                    {personalInfo.jobTitle}
                  </span>
                </div>
              )}
            </div>

            {contactItems.length > 0 && (
              <div className="flex flex-wrap sm:flex-col sm:items-end gap-x-3 gap-y-0.5 font-manrope text-[11.5px] font-medium text-[#57534E]">
                {contactItems.map((item, idx) => (
                  <span key={idx} className="whitespace-nowrap">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Signature Feature: Career At A Glance Timeline (Gantt Chart) */}
          <div className="mt-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor || '#0F766E' }}>
                Career At A Glance
              </span>
            </div>

            {/* Proportional Timeline Bar */}
            <div className="w-full h-11 flex rounded-[6px] overflow-hidden shadow-xs border border-[#134E4A]/25">
              {segments.map((seg, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${seg.widthPercent}%`,
                    backgroundColor: seg.color,
                  }}
                  className="h-full flex flex-col justify-center px-3 overflow-hidden border-r last:border-r-0 border-white/20"
                >
                  <div className="font-manrope text-[11px] font-bold text-white truncate leading-tight">
                    {seg.company}
                  </div>
                  <div className="font-manrope text-[9.5px] font-medium text-white/90 truncate leading-tight mt-0.5 tracking-wide">
                    {seg.dateStr}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Axis Ticks & Years */}
            <div className="relative w-full h-7 mt-1.5 select-none">
              {axisTicks.map(({ year, percent }, idx) => {
                let transform = 'translateX(-50%)';
                if (percent === 0) transform = 'translateX(0)';
                else if (percent >= 99) transform = 'translateX(-100%)';

                return (
                  <div
                    key={idx}
                    className="absolute top-0 flex flex-col items-center"
                    style={{ left: `${percent}%`, transform }}
                  >
                    <div className="w-[1.5px] h-1.5 bg-[#A8A29E]" />
                    <span className="font-manrope text-[10px] font-medium text-[#78716C] mt-0.5 whitespace-nowrap">
                      {year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Double Column Layout: 8 cols (66.7%) main, 4 cols (33.3%) sidebar */}
      <div className={`grid grid-cols-12 gap-6 sm:gap-8 ${isPage1 ? 'mt-4' : 'mt-1'}`}>
        {/* Main Column */}
        <div data-ghost-col="main" className={`${showSidebar ? 'col-span-8' : 'col-span-12'} space-y-4`}>
          {mainSectionIds.map((secId) => renderSection(secId))}
        </div>

        {/* Sidebar Column */}
        {showSidebar && (
          <div data-ghost-col="sidebar" className="col-span-4 space-y-4">
            {sidebarSectionIds.map((secId) => renderSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

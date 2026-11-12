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

interface CompetencyAxis {
  label: string;
  score: number; // 0 to 1
}

const DEFAULT_AXES: CompetencyAxis[] = [
  { label: 'Strategy', score: 0.85 },
  { label: 'Research', score: 0.8 },
  { label: 'Visual', score: 0.9 },
  { label: 'Prototyping', score: 0.85 },
  { label: 'Systems', score: 0.95 },
  { label: 'Leadership', score: 0.75 },
];

/**
 * Renders an SVG 6-axis hexagonal radar chart with concentric polygon web and magenta accent.
 */
function RadarChart({ axes = DEFAULT_AXES }: { axes?: CompetencyAxis[] }) {
  const size = 200;
  const center = size / 2;
  const radius = 62;
  const totalAxes = 6;
  const levels = [0.33, 0.66, 1.0];

  // Calculate coordinates for an angle and radius
  const getCoordinates = (index: number, r: number) => {
    // Start from top (-90 degrees)
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Build grid rings (concentric hexagons)
  const gridRings = levels.map((lvl) => {
    const points = Array.from({ length: totalAxes }).map((_, i) => {
      const { x, y } = getCoordinates(i, radius * lvl);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Build data polygon
  const dataPoints = axes.slice(0, 6).map((axis, i) => {
    const { x, y } = getCoordinates(i, radius * Math.max(0.2, Math.min(1.0, axis.score)));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-48 h-48 select-none overflow-visible"
        aria-hidden="true"
      >
        {/* Concentric grid rings */}
        {gridRings.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        ))}

        {/* 6 radial axis lines */}
        {Array.from({ length: totalAxes }).map((_, i) => {
          const { x, y } = getCoordinates(i, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={dataPoints}
          fill="#FBCFE8"
          fillOpacity="0.55"
          stroke="#D6246E"
          strokeWidth="2"
        />

        {/* Data vertex dots */}
        {axes.slice(0, 6).map((axis, i) => {
          const { x, y } = getCoordinates(i, radius * Math.max(0.2, Math.min(1.0, axis.score)));
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#D6246E"
            />
          );
        })}

        {/* Axis labels */}
        {axes.slice(0, 6).map((axis, i) => {
          const labelDist = radius + 18;
          const { x, y } = getCoordinates(i, labelDist);
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              textAnchor="middle"
              className="font-spacegrotesk font-medium text-[9.5px] fill-[#0B1B3A]"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export const CompetencyRadarTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#D6246E', // Magenta
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-8' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-10';
  const sectionMarginClass =
    spacing === 'compact' ? 'mt-4' : spacing === 'relaxed' ? 'mt-6' : 'mt-5';

  const resolvedOrder = getResolvedTemplateSectionOrder('competency_radar', data);
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

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={`${sectionMarginClass} break-inside-avoid`}>
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Profile
              </span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="font-manrope text-[12.5px] text-[#1E293B] leading-[20px]"
              />
            </div>
          </div>
        );

      case 'experience':
        if (!experience.length) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Experience
              </span>
            </div>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0B1B3A]">
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
                    <div className="mt-1.5 font-manrope text-[12.5px] text-[#1E293B] leading-[20px]">
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
            <div data-ghost-section-title="true" className="pb-1 mb-3 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Projects
              </span>
            </div>
            <div className="space-y-3.5">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0B1B3A]">
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
                    <div className="mt-1 font-manrope text-[12.5px] text-[#1E293B] leading-[20px]">
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
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Education
              </span>
            </div>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-manrope text-[13px] font-bold text-[#0B1B3A]">
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
          <div key="skills" data-ghost-section="skills" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Tools & Skills
              </span>
            </div>
            <div data-ghost-item="skills-0" className="flex flex-wrap gap-1.5">
              {skills.flatMap((cat) => cat.items).map((skillName, idx) => (
                <span
                  key={idx}
                  className="font-manrope text-[11.5px] font-medium px-2 py-0.5 bg-[#F1F5F9] text-[#0B1B3A] rounded border border-[#E2E8F0]"
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
          <div key="certifications" data-ghost-section="certifications" className={sectionMarginClass}>
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Certifications
              </span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="text-[12px] font-manrope break-inside-avoid">
                  <div className="font-medium text-[#0B1B3A]">{cert.name}</div>
                  <div className="text-[11px] text-[#64748B]">
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
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Recognition
              </span>
            </div>
            <div className="space-y-2">
              {awards.map((award, idx) => (
                <div key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className="text-[12px] font-manrope break-inside-avoid">
                  <div className="font-medium text-[#0B1B3A]">{award.title}</div>
                  <div className="text-[11px] text-[#64748B]">
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
            <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
              <span className="font-manrope text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor }}>
                Languages
              </span>
            </div>
            <div data-ghost-item="languages-0" className="space-y-1 text-[12px] font-manrope text-[#1E293B]">
              {languages.map((lang, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="font-semibold text-[#0B1B3A]">{lang.language}</span>
                  <span className="text-[#64748B] text-[11px]">{lang.proficiency}</span>
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
                <div data-ghost-section-title="true" className="pb-1 mb-2 border-b border-[#F1F5F9] break-after-avoid">
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
        <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B] pb-2 mb-4 border-b border-[#0B1B3A]/20 break-inside-avoid">
          <span>
            <strong className="font-bold text-[#0B1B3A]">{personalInfo.fullName || 'Candidate'}</strong>
            {personalInfo.jobTitle && <span className="text-[#64748B]"> &mdash; {personalInfo.jobTitle}</span>}
          </span>
          <span>Page {data.pageNumber} of {data.totalPages || 2}</span>
        </div>
      )}

      <div className={`grid grid-cols-12 gap-6 sm:gap-8`}>
        {/* Left Sidebar (~35%) with Radar Chart & Contact */}
        {showSidebar && (
          <div data-ghost-col="sidebar" className="col-span-4 border-r border-[#F1F5F9] pr-4 sm:pr-6 space-y-4">
            {/* Hexagonal Competency Radar Chart & Contact (Page 1 Only) */}
            {isPage1 && (
              <div data-ghost-header="true" className="space-y-4 break-inside-avoid">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-md p-3">
                  <div className="pb-1 mb-1 border-b border-[#E2E8F0] text-center">
                    <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: themeColor || '#D6246E' }}>
                      Competencies
                    </span>
                  </div>
                  <RadarChart />
                </div>

                {contactItems.length > 0 && (
                  <div className="border-t border-[#F1F5F9] pt-3">
                    <div className="font-manrope text-[11px] font-bold uppercase tracking-[0.14em] text-[#D6246E] mb-2">
                      Contact
                    </div>
                    <div className="space-y-1 font-manrope text-[11.5px] font-medium text-[#64748B]">
                      {contactItems.map((item, idx) => (
                        <div key={idx} className="truncate">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sidebar Sections (Skills, Languages) */}
            {sidebarSectionIds.map((secId) => renderSection(secId))}
          </div>
        )}

        {/* Right / Main Column (~65%) with Header & Narrative */}
        <div data-ghost-col="main" className={`${showSidebar ? 'col-span-8' : 'col-span-12'} space-y-1`}>
          {/* Header (Page 1 Only) */}
          {isPage1 && (
            <div data-ghost-header="true" className="pb-4 border-b border-[#0B1B3A] break-inside-avoid">
              <h1 className="font-spacegrotesk text-[36px] font-bold text-[#0B1B3A] leading-[1.05] tracking-[-0.02em]">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <div data-ghost-role="true" className="mt-1">
                  <span
                    className="font-manrope text-[12.5px] font-bold"
                    style={{ color: themeColor || '#D6246E' }}
                  >
                    {personalInfo.jobTitle}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Main Column Sections */}
          {mainSectionIds.map((secId) => renderSection(secId))}
        </div>
      </div>
    </div>
  );
};

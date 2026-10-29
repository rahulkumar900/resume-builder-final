'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import {
  DEFAULT_MAIN_COLUMN_SECTIONS,
  DEFAULT_SIDEBAR_COLUMN_SECTIONS,
  hasPageSidebarContent,
} from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

const getInitials = (name?: string): string => {
  if (!name) return 'MD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const StampTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#45214A',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const initials = getInitials(personalInfo.fullName);

  const gradYear =
    education?.[0]?.graduationDate?.match(/\d{4}/)?.[0] ||
    personalInfo.jobTitle?.match(/\d{4}/)?.[0] ||
    '2025';
  const stampSubtitle = `Class of ${gradYear}`;

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);
  const showSidebar = isPage1 || hasSidebarContent;

  const renderSectionHeader = (title: string) => (
    <h2
      data-ghost-section-title="true"
      style={{ color: themeColor, fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
      className="font-bold text-[14px] border-b-2 border-[#CDEBDD] pb-[2px] mb-[6px] tracking-tight"
    >
      {title}
    </h2>
  );

  const renderMainSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
      case 'education':
        // Rendered in top feature strips on Page 1
        return null;

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" data-ghost-section="projects" className="mb-6">
            {renderSectionHeader('Projects')}
            <div className="space-y-3.5">
              {projects.map((proj) => (
                <article key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11.5px] text-[#231526]">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6E5A73] text-[9.5px] hover:underline"
                        >
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[#6E5A73] text-[10px] mb-1">
                        {proj.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-[10.5px] text-[#231526] leading-relaxed mt-1"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" data-ghost-section="experience" className="mb-6">
            {renderSectionHeader('Work Experience & Internships')}
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <article key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-[11.5px] text-[#231526]">{exp.role}</h3>
                      <span className="text-[#6E5A73] text-[9.5px]">
                        {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#6E5A73] text-[10px] mb-1">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </p>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[10.5px] text-[#231526] leading-relaxed mt-1"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      default:
        return (
          <div key={secId} className="mb-6">
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              itemSpacingClass="space-y-3"
              renderHeader={renderSectionHeader}
            />
          </div>
        );
    }
  };

  const renderSidebarSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
      case 'education':
        // Rendered in top feature strips on Page 1
        return null;

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <section key="skills" data-ghost-section="skills" className="mb-6">
            {renderSectionHeader('Technical skills')}
            <div className="space-y-1.5 text-[10.5px] leading-[1.5]">
              {skills.map((cat) => (
                <p key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  <span className="font-bold text-[#231526]">{cat.category}:</span>{' '}
                  <span className="text-[#231526]">{cat.items.join(', ')}</span>
                </p>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key="certifications" data-ghost-section="certifications" className="mb-6">
            {renderSectionHeader('Certifications')}
            <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-[#231526]">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-bold text-[#231526]">{cert.name}</span>
                  {cert.issuer && <span className="text-[#6E5A73]">, {cert.issuer}</span>}
                  {cert.date && <span className="text-[#6E5A73]">, {cert.date}</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" data-ghost-section="languages" className="mb-6">
            {renderSectionHeader('Languages')}
            <p className="text-[10.5px] text-[#231526]">
              {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
            </p>
          </section>
        );

      default:
        return (
          <div key={secId} className="mb-6">
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              isSidebar
              itemSpacingClass="space-y-3"
              renderHeader={renderSectionHeader}
            />
          </div>
        );
    }
  };

  return (
    <div
      style={{ fontFamily: '"Atkinson Hyperlegible", system-ui, sans-serif' }}
      className="bg-[#FFFEFA] text-[#231526] min-h-full flex flex-col font-sans"
    >
      {/* Page 1 Header, Objective & Education Strip */}
      {isPage1 ? (
        <div data-ghost-header="true">
          {/* Header */}
          <header className="px-[14mm] pt-[12mm] pb-[6mm] flex justify-between items-start gap-6">
            <div>
              <h1
                style={{
                  color: themeColor,
                  fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
                }}
                className="font-bold text-[36px] leading-none tracking-tight"
              >
                {personalInfo.fullName || 'Meera Das'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="mt-2 text-[13px] font-bold text-[#231526]">
                  {personalInfo.jobTitle}
                </p>
              )}
              <div className="mt-2 text-[10px] text-[#6E5A73] leading-[1.65]">
                <div className="flex flex-wrap gap-x-3.5">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap gap-x-3.5 mt-0.5">
                  {personalInfo.github && (
                    <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                  )}
                  {personalInfo.linkedin && (
                    <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                  )}
                  {personalInfo.website && (
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Signature Perforated Stamp Badge */}
            <div
              data-block="stamp"
              className="kindley-stamp-badge shrink-0 w-[27mm] h-[27mm] bg-[#CDEBDD] flex flex-col items-center justify-center text-center select-none"
              style={{ color: themeColor }}
            >
              <span
                style={{ fontFamily: '"Bricolage Grotesque", system-ui, sans-serif' }}
                className="font-bold text-[26px] leading-none"
              >
                {initials}
              </span>
              <span
                style={{ borderColor: `${themeColor}66` }}
                className="text-[8.5px] font-bold mt-1 border-t pt-0.5"
              >
                {stampSubtitle}
              </span>
            </div>
          </header>

          {/* Perforated Divider */}
          <div className="border-t-[1.5px] border-dashed border-[#45214A]/20 mx-[14mm]" />

          {/* Objective / Summary Strip */}
          {personalInfo.summary && (
            <>
              <section
                data-section="objective"
                data-atomic="true"
                className="px-[14mm] pt-[5mm] pb-[5mm] text-[11px] leading-[1.6] text-[#231526]"
              >
                <RichText content={personalInfo.summary} />
              </section>
              <div className="border-t-[1.5px] border-dashed border-[#45214A]/20 mx-[14mm]" />
            </>
          )}

          {/* Horizontal Education Strip */}
          {education && education.length > 0 && (
            <>
              <section
                data-section="education"
                data-atomic="true"
                className="px-[14mm] pt-[5mm] pb-[5mm]"
              >
                <h2
                  style={{
                    color: themeColor,
                    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
                  }}
                  className="font-bold text-[14px] border-b-2 border-[#CDEBDD] pb-[2px] mb-[6px] tracking-tight"
                >
                  Education
                </h2>
                <div
                  className={`grid ${
                    education.length >= 3
                      ? 'grid-cols-3'
                      : education.length === 2
                      ? 'grid-cols-2'
                      : 'grid-cols-1'
                  } text-[10.5px] leading-[1.5]`}
                >
                  {education.map((edu, idx) => (
                    <article
                      key={edu.id}
                      className={`break-inside-avoid ${
                        idx === 0
                          ? 'pr-4'
                          : idx === 1 && education.length >= 3
                          ? 'px-4 border-l border-dashed border-[#45214A]/30'
                          : 'pl-4 border-l border-dashed border-[#45214A]/30'
                      }`}
                    >
                      <h3 className="font-bold text-[11.5px] text-[#231526]">
                        {edu.degree}
                      </h3>
                      <p className="text-[#6E5A73]">
                        {edu.school}
                        {edu.location ? `, ${edu.location}` : ''}
                      </p>
                      <p className="text-[#231526]">{edu.graduationDate}</p>
                      {edu.gpa && (
                        <p className="font-bold text-[#231526]">
                          {edu.gpa.startsWith('CGPA') || edu.gpa.includes('%')
                            ? edu.gpa
                            : `GPA: ${edu.gpa}`}
                        </p>
                      )}
                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="mt-1 space-y-0.5 text-[9.5px] text-[#231526]">
                          {edu.highlights.map((h, i) => (
                            <RichText key={i} content={h} className="text-[9.5px] text-[#231526] leading-snug" />
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
              <div className="border-t-[1.5px] border-dashed border-[#45214A]/20 mx-[14mm]" />
            </>
          )}
        </div>
      ) : (
        <div
          data-block="running-header"
          className="px-[14mm] py-[3.5mm] flex justify-between items-baseline border-b border-dashed border-[#45214A]/25 mb-4"
        >
          <span
            style={{
              color: themeColor,
              fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
            }}
            className="font-bold text-[13px]"
          >
            {personalInfo.fullName || 'Resume'}
          </span>
          <span className="text-[9.5px] text-[#6E5A73]">
            Page {data.pageNumber || 2}
          </span>
        </div>
      )}

      {/* Two-Column Lower Body */}
      <div className="flex flex-1 min-h-0 px-[14mm] pt-[5mm] gap-[8mm] text-[11px] leading-[1.55]">
        {/* Main Column (60%) */}
        <main data-ghost-col="main" className="w-[60%]">
          {mainOrder
            .filter((secId) => secId !== 'summary' && secId !== 'education')
            .map((secId) => renderMainSection(secId))}
        </main>

        {/* Sidebar Column (40%) */}
        {showSidebar && (
          <aside data-ghost-col="sidebar" className="w-[40%]">
            {sidebarOrder
              .filter((secId) => secId !== 'summary' && secId !== 'education')
              .map((secId) => renderSidebarSection(secId))}
          </aside>
        )}
      </div>
    </div>
  );
};

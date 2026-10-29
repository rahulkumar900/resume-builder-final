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


export const MarigoldTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#17332E',
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;

  const mainPadding =
    spacing === 'compact' ? 'px-6 pt-4 pb-6' : spacing === 'relaxed' ? 'px-9 pt-7 pb-9' : 'px-7 pt-5 pb-8';
  const sidebarPadding =
    spacing === 'compact' ? 'px-4 pt-4 pb-6' : spacing === 'relaxed' ? 'px-7 pt-7 pb-9' : 'px-5 pt-5 pb-8';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);
  const showSidebar = isPage1 || hasSidebarContent;

  const renderMainSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <section key="summary" data-ghost-section="summary" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[15px] font-normal mb-1.5"
            >
              Professional summary
            </h2>
            <div data-ghost-item="summary-0" className="text-[10.5px] leading-[1.55] text-[#1E2724]">
              <RichText content={personalInfo.summary} />
            </div>
          </section>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section key="experience" data-ghost-section="experience" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[15px] font-normal mb-2.5"
            >
              Work experience
            </h2>
            {/* Timeline thread */}
            <div className="border-l-[1.5px] border-[#17332E]/30 pl-4 space-y-3.5 relative">
              {experience.map((exp) => (
                <article key={exp.id} data-ghost-item={exp.id} className="relative break-inside-avoid">
                  {/* Marigold Spark Timeline Marker */}
                  <span className="kindley-marigold-spark absolute -left-[20px] top-1 block w-2.5 h-2.5 bg-[#F2B632]" />
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11.5px] text-[#1E2724]">{exp.role}</h3>
                      <span className="text-[#5B6E66] text-[10px]">
                        {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#5B6E66] text-[10.5px] mb-1">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </p>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[10.2px] text-[#1E2724] leading-[1.5] mt-1"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section key="projects" data-ghost-section="projects" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[15px] font-normal mb-2"
            >
              Selected projects
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <article key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11.5px] text-[#1E2724]">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#5B6E66] text-[9.5px] hover:underline"
                        >
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[9.5px] text-[#5B6E66] mt-0.5">
                      {proj.technologies.join(', ')}
                    </p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-[10px] text-[#1E2724] leading-normal mt-1"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" data-ghost-section="education" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[15px] font-normal mb-2"
            >
              Education
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <article key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11px] text-[#1E2724]">{edu.degree}</h3>
                      <span className="text-[#5B6E66] text-[9.5px]">{edu.graduationDate}</span>
                    </div>
                    <p className="text-[#5B6E66] text-[10px]">
                      {edu.school}
                      {edu.location ? ` · ${edu.location}` : ''}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-1 space-y-0.5 text-[10px] text-[#1E2724]">
                      {edu.highlights.map((h, i) => (
                        <RichText key={i} content={h} className="text-[10px] text-[#1E2724] leading-normal" />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      default:
        return (
          <div key={secId} className="mb-5">
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              itemSpacingClass={itemSpaceClass}
              renderHeader={(title) => (
                <h2
                  data-ghost-section-title="true"
                  style={{ color: themeColor }}
                  className="font-serif text-[15px] font-normal mb-2"
                >
                  {title}
                </h2>
              )}
            />
          </div>
        );
    }
  };

  const renderSidebarSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <section key="skills" data-ghost-section="skills" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[14px] font-normal mb-2"
            >
              Core skills
            </h2>
            <div className="space-y-2">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  {skills.length > 1 && (
                    <div className="text-[10px] font-semibold text-[#1E2724] mb-1">
                      {cat.category}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-[#FAFAF6] border border-[#17332E]/15 rounded-full px-2.5 py-0.5 text-[9.5px] text-[#1E2724] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <section key="education" data-ghost-section="education" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[14px] font-normal mb-2"
            >
              Education
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <article key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <p className="font-semibold text-[10.5px] text-[#1E2724]">{edu.degree}</p>
                    <p className="text-[#5B6E66] text-[10px]">{edu.school}</p>
                    <p className="text-[#5B6E66] text-[9.5px]">
                      {edu.graduationDate}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-1 space-y-0.5 text-[9.5px] text-[#1E2724]">
                      {edu.highlights.map((h, i) => (
                        <RichText key={i} content={h} className="text-[9.5px] text-[#1E2724] leading-normal" />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key="certifications" data-ghost-section="certifications" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[14px] font-normal mb-1.5"
            >
              Certifications
            </h2>
            <ul className="space-y-1.5 text-[10px]">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-semibold text-[#1E2724]">{cert.name}</span>
                  {cert.issuer && <div className="text-[#5B6E66] text-[9.5px]">{cert.issuer}{cert.date ? `, ${cert.date}` : ''}</div>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section key="languages" data-ghost-section="languages" className="mb-5">
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[14px] font-normal mb-1.5"
            >
              Languages
            </h2>
            <ul className="space-y-1 text-[10px]">
              {languages.map((l) => (
                <li key={l.id} data-ghost-item={l.id} className="flex justify-between break-inside-avoid">
                  <span className="text-[#1E2724] font-medium">{l.language}</span>
                  <span className="text-[#5B6E66] text-[9.5px]">{l.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        );

      default:
        return (
          <div key={secId} className="mb-5">
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              isSidebar
              itemSpacingClass={itemSpaceClass}
              renderHeader={(title) => (
                <h2
                  data-ghost-section-title="true"
                  style={{ color: themeColor }}
                  className="font-serif text-[14px] font-normal mb-1.5"
                >
                  {title}
                </h2>
              )}
            />
          </div>
        );
    }
  };

  return (
    <div className="bg-[#FAFAF6] text-[#1E2724] min-h-full flex flex-col font-sans">
      {/* Page 1 Header Banner */}
      {isPage1 ? (
        <header
          data-ghost-header="true"
          style={{ backgroundColor: themeColor }}
          className="text-[#FAFAF6] px-[12mm] sm:px-[14mm] pt-[10mm] pb-[7mm]"
        >
          <h1 className="font-serif text-[32px] sm:text-[35px] leading-none tracking-tight">
            {personalInfo.fullName || 'Aarav Menon'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="mt-2 text-[13px] text-[#F2B632] font-medium">
              {personalInfo.jobTitle}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] text-[#FAFAF6]/85">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
            {personalInfo.github && <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
          </div>
        </header>
      ) : (
        <div
          data-block="running-header"
          style={{ backgroundColor: themeColor }}
          className="text-[#FAFAF6] px-[12mm] sm:px-[14mm] py-[3.5mm] flex justify-between items-baseline"
        >
          <span className="font-serif text-[13px]">{personalInfo.fullName || 'Resume'}</span>
          <span className="text-[9.5px] text-[#FAFAF6]/70">
            Page {data.pageNumber || 2}
          </span>
        </div>
      )}

      {/* Main & Sidebar Split Container */}
      <div className="flex flex-1 min-h-0">
        {/* Main Column (65%) */}
        <main data-ghost-col="main" className={`w-[65%] ${mainPadding}`}>
          {mainOrder.map((secId) => renderMainSection(secId))}
        </main>

        {/* Sidebar Column (35%, on right with Sage tint) */}
        {showSidebar && (
          <aside
            data-ghost-col="sidebar"
            className={`w-[35%] bg-[#E4ECE5] border-l border-[#17332E]/10 ${sidebarPadding}`}
          >
            {sidebarOrder.map((secId) => renderSidebarSection(secId))}
          </aside>
        )}
      </div>
    </div>
  );
};

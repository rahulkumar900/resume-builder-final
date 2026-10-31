'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

const getInitials = (name?: string): string => {
  if (!name) return 'AM';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const RibbonTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    themeColor = '#26235A',
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const initials = getInitials(personalInfo.fullName);

  const paddingClass =
    spacing === 'compact' ? 'px-6 sm:px-7' : spacing === 'relaxed' ? 'px-8 sm:px-11' : 'px-7 sm:px-9';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <section
            key="summary"
            data-ghost-section="summary"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Summary
            </h2>
            <div data-ghost-item="summary-0" className="text-[10.5px] leading-[1.55] text-stone-700">
              <RichText content={personalInfo.summary} />
            </div>
          </section>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <section
            key="experience"
            data-ghost-section="experience"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Experience
            </h2>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <article key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11.5px] text-stone-900">{exp.role}</h3>
                      <span className="text-[#6B6A8F] text-[9.5px]">
                        {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#6B6A8F] text-[10.5px] mb-1">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ''}
                    </p>
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[10.2px] text-stone-700 leading-[1.5] mt-1"
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
          <section
            key="education"
            data-ghost-section="education"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Education
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <article key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11px] text-stone-900">{edu.degree}</h3>
                      <span className="text-[#6B6A8F] text-[9.5px]">{edu.graduationDate}</span>
                    </div>
                    <p className="text-[#6B6A8F] text-[10px]">
                      {edu.school}
                      {edu.location ? ` · ${edu.location}` : ''}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-1 space-y-0.5 text-[10px] text-stone-700">
                      {edu.highlights.map((h, i) => (
                        <RichText key={i} content={h} className="text-[10px] text-stone-700 leading-normal" />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <section
            key="skills"
            data-ghost-section="skills"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Skills
            </h2>
            <div className="space-y-1.5 text-[10.2px] leading-[1.5] text-stone-800">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  {cat.category ? <span className="font-semibold text-stone-900">{cat.category}: </span> : null}
                  <span className="text-stone-700">{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <section
            key="projects"
            data-ghost-section="projects"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Projects
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <article key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-[11px] text-stone-900">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6B6A8F] text-[9.5px] hover:underline"
                        >
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[9.5px] text-[#6B6A8F] mt-0.5">
                      {proj.technologies.join(', ')}
                    </p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-[10px] text-stone-700 leading-normal mt-1"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <section
            key="certifications"
            data-ghost-section="certifications"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Certifications
            </h2>
            <ul className="list-disc pl-4 space-y-1 text-[10.2px] text-stone-700">
              {certifications.map((cert) => (
                <li key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid">
                  <span className="font-semibold text-stone-900">{cert.name}</span>
                  {cert.issuer && ` · ${cert.issuer}`}
                  {cert.date && ` (${cert.date})`}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <section
            key="languages"
            data-ghost-section="languages"
            className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <h2
              data-ghost-section-title="true"
              style={{ color: themeColor }}
              className="font-serif text-[18px] leading-[1.1] font-normal"
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10.2px] text-stone-700">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="break-inside-avoid">
                  <span className="font-semibold text-stone-900">{l.language}</span>{' '}
                  <span className="text-[#6B6A8F]">({l.proficiency})</span>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return (
          <div key={secId} className={paddingClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              itemSpacingClass={itemSpaceClass}
              renderHeader={(title) => (
                <h2
                  data-ghost-section-title="true"
                  style={{ color: themeColor }}
                  className="font-serif text-[18px] leading-[1.1] font-normal border-t border-[#ECEBF8] pt-3.5 mb-2"
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
    <div className="relative bg-white text-[#1B1A2E] text-[10.5px] leading-[1.5] min-h-full overflow-hidden">
      {/* Signature Hanging Bookmark Ribbon */}
      {isPage1 ? (
        <div
          data-block="ribbon"
          style={{ backgroundColor: themeColor }}
          className="absolute left-[14mm] top-0 w-[15mm] h-[30mm] flex justify-center pt-[6mm] text-white z-10 kindley-ribbon-badge shadow-sm"
        >
          <span className="font-serif text-[20px] leading-none tracking-wider">{initials}</span>
        </div>
      ) : (
        <div
          data-block="running-header"
          style={{ backgroundColor: themeColor }}
          className="absolute left-[14mm] top-0 w-[13mm] h-[16mm] flex justify-center pt-[3mm] text-white z-10 kindley-ribbon-badge shadow-sm"
        >
          <span className="font-serif text-[14px] leading-none tracking-wider">{initials}</span>
        </div>
      )}

      {/* Header (Page 1) */}
      {isPage1 ? (
        <header
          data-ghost-header="true"
          className={`grid grid-cols-[105px_1fr] sm:grid-cols-[125px_1fr] pt-[11mm] pb-[5mm] ${paddingClass}`}
        >
          {/* Spacer below ribbon */}
          <div aria-hidden="true" />
          <div>
            <h1
              style={{ color: themeColor }}
              className="font-serif text-[38px] sm:text-[42px] leading-[0.95] tracking-tight font-normal"
            >
              {personalInfo.fullName || 'Aarav Menon'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="mt-2 text-[12.5px] font-medium text-stone-900">
                {personalInfo.jobTitle}
              </p>
            )}
            <div className="mt-2 text-[10px] text-[#6B6A8F] leading-[1.6] flex flex-wrap gap-x-4 gap-y-0.5">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.website && <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
              {personalInfo.github && <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>}
            </div>
          </div>
        </header>
      ) : (
        <div className="pt-[16mm]" />
      )}

      {/* Main Content Sections */}
      <main data-ghost-col="single">
        {sectionOrder.map((secId) => renderSection(secId))}
      </main>
    </div>
  );
};

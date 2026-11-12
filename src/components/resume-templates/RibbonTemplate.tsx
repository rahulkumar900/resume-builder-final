'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS, getResolvedTemplateSectionOrder } from '@/lib/templates';
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
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    languages = [],
    themeColor = '#26235A',
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const initials = getInitials(personalInfo.fullName);

  const paddingClass =
    spacing === 'compact' ? 'px-6 sm:px-7' : spacing === 'relaxed' ? 'px-8 sm:px-11' : 'px-7 sm:px-9';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const resolvedOrder = getResolvedTemplateSectionOrder('ribbon', data);
  const sectionOrder: ResumeSectionId[] = (
    data.sectionOrder?.singleColumn ||
    resolvedOrder.singleColumn ||
    DEFAULT_SINGLE_COLUMN_SECTIONS
  ).filter((s) => !data.hiddenSections?.includes(s));

  const ribbonClipPath = 'polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%)';

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary?.trim()) return null;
        return (
          <section
            key="summary"
            data-ghost-section="summary"
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Summary
              </h2>
            </div>
            <div data-ghost-item="summary-0" className="text-[13px] leading-[20px] text-stone-800">
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Experience
              </h2>
            </div>
            <div className={itemSpaceClass}>
              {experience.map((exp, idx) => (
                <article key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline gap-x-2">
                      <h3 className="font-semibold text-[14px] text-stone-900">{exp.role}</h3>
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-stone-500 font-medium text-[12px] shrink-0">
                          {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                        </span>
                      )}
                    </div>
                    {(exp.company || exp.location) && (
                      <p className="text-stone-600 text-[12.5px] font-medium mb-1">
                        {exp.company}
                        {exp.company && exp.location && ', '}
                        {exp.location}
                      </p>
                    )}
                  </div>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[13px] text-stone-800 leading-[19px] mt-1"
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Education
              </h2>
            </div>
            <div className={itemSpaceClass}>
              {education.map((edu, idx) => (
                <article key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline gap-x-2">
                      <h3 className="font-semibold text-[14px] text-stone-900">{edu.degree}</h3>
                      {edu.graduationDate && (
                        <span className="text-stone-500 font-medium text-[12px] shrink-0">{edu.graduationDate}</span>
                      )}
                    </div>
                    <p className="text-stone-600 text-[12.5px] font-medium">
                      {edu.school}
                      {edu.location ? ` · ${edu.location}` : ''}
                      {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-1 space-y-0.5 text-[13px] text-stone-800 leading-[19px]">
                      {edu.highlights.map((h, i) => (
                        <RichText key={i} content={h} className="text-[13px] text-stone-800 leading-[19px]" />
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Skills
              </h2>
            </div>
            <div className="space-y-1.5 text-[13px] leading-[1.5] text-stone-800">
              {skills.map((cat, idx) => (
                <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="break-inside-avoid">
                  {cat.category ? <span className="font-bold text-stone-900">{cat.category}: </span> : null}
                  <span className="text-stone-700 font-medium">{cat.items.join(', ')}</span>
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Projects
              </h2>
            </div>
            <div className={itemSpaceClass}>
              {projects.map((proj, idx) => (
                <article key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline gap-x-2">
                      <h3 className="font-semibold text-[14px] text-stone-900">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 text-[12px] hover:underline font-medium shrink-0"
                        >
                          {proj.link.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[12px] text-stone-600 font-medium mt-0.5">
                      {proj.technologies.join(', ')}
                    </p>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <ResumeHighlights
                      highlights={proj.highlights}
                      className="text-[13px] text-stone-800 leading-[19px] mt-1"
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Certifications
              </h2>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[13px] text-stone-800">
              {certifications.map((cert, idx) => (
                <li key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className="break-inside-avoid">
                  <span className="font-semibold text-stone-900">{cert.name}</span>
                  {cert.issuer && ` · ${cert.issuer}`}
                  {cert.date && <span className="text-stone-500 font-medium">{` (${cert.date})`}</span>}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'awards':
        if (!awards || awards.length === 0) return null;
        return (
          <section
            key="awards"
            data-ghost-section="awards"
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Awards
              </h2>
            </div>
            <ul className="space-y-1 text-[13px] text-stone-800">
              {awards.map((award, idx) => (
                <li key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className="break-inside-avoid flex justify-between">
                  <span className="font-semibold text-stone-900">{award.title}</span>
                  <span className="text-stone-500 text-[12px] font-medium">
                    {award.issuer}{award.date ? ` (${award.date})` : ''}
                  </span>
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
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase"
              >
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-stone-800">
              {languages.map((l, idx) => (
                <div key={l.id || idx} data-ghost-item={l.id || `lang-${idx}`} className="break-inside-avoid">
                  <span className="font-semibold text-stone-900">{l.language}</span>{' '}
                  <span className="text-stone-600">({l.proficiency})</span>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return (
          <section
            key={secId}
            data-ghost-section={secId}
            className={`grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] border-t border-[#ECEBF8] pt-3.5 pb-2.5 ${paddingClass}`}
          >
            <div>
              <h2
                data-ghost-section-title="true"
                style={{ color: themeColor }}
                className="font-serif text-[15px] sm:text-[16px] leading-[1.2] font-bold tracking-[0.04em] uppercase capitalize"
              >
                {secId.replace(/_/g, ' ')}
              </h2>
            </div>
            <div>
              <UniversalSectionRenderer
                secId={secId}
                data={data}
                itemSpacingClass={itemSpaceClass}
                renderHeader={() => null}
              />
            </div>
          </section>
        );
    }
  };

  return (
    <div className="relative bg-white text-[#1B1A2E] text-[13.5px] leading-[1.5] min-h-full font-sans">
      {/* Running Header on Page 2+ */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div
          className={`relative grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] pt-4 pb-2.5 mb-2 border-b border-[#ECEBF8] text-[11px] text-stone-500 break-inside-avoid ${paddingClass}`}
        >
          {/* Mini Bookmark Ribbon on Page 2+ */}
          <div className="relative flex justify-center">
            <div
              data-block="running-header"
              style={{
                backgroundColor: themeColor,
                clipPath: ribbonClipPath,
              }}
              className="absolute -top-4 w-[42px] h-[54px] flex justify-center pt-2 text-white z-10 kindley-ribbon-badge shadow-sm"
            >
              <span className="font-serif text-[13px] font-bold leading-none tracking-wider">{initials}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>
              <strong className="font-semibold text-stone-900">{personalInfo.fullName || 'Candidate'}</strong>
              {personalInfo.jobTitle && <span> &mdash; {personalInfo.jobTitle}</span>}
            </span>
            <span>Page {data.pageNumber} of {data.totalPages || 2}</span>
          </div>
        </div>
      )}

      {/* Main Header (Page 1 Only) */}
      {isPage1 && (
        <header
          data-ghost-header="true"
          className={`relative grid grid-cols-[130px_1fr] sm:grid-cols-[145px_1fr] pt-8 sm:pt-9 pb-5 ${paddingClass} break-inside-avoid`}
        >
          {/* Signature Hanging Bookmark Ribbon */}
          <div className="relative flex justify-center">
            <div
              data-block="ribbon"
              style={{
                backgroundColor: themeColor,
                clipPath: ribbonClipPath,
              }}
              className="absolute -top-8 sm:-top-9 w-[52px] h-[105px] flex justify-center pt-5 text-white z-10 kindley-ribbon-badge shadow-sm"
            >
              <span className="font-serif text-[20px] font-bold leading-none tracking-wider">{initials}</span>
            </div>
          </div>
          <div>
            <h1
              style={{ color: themeColor }}
              className="font-serif text-[36px] sm:text-[40px] leading-[1.05] tracking-tight font-normal"
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p data-ghost-role="true" className="mt-1.5 text-[14px] font-semibold text-stone-900">
                {personalInfo.jobTitle}
              </p>
            )}
            <div className="mt-2 text-[12px] text-stone-600 leading-[1.6] flex flex-wrap gap-x-3.5 gap-y-1 font-medium">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && (
                <>
                  <span className="text-stone-300">&bull;</span>
                  <span>{personalInfo.phone}</span>
                </>
              )}
              {personalInfo.location && (
                <>
                  <span className="text-stone-300">&bull;</span>
                  <span>{personalInfo.location}</span>
                </>
              )}
              {personalInfo.website && (
                <>
                  <span className="text-stone-300">&bull;</span>
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </>
              )}
              {personalInfo.linkedin && (
                <>
                  <span className="text-stone-300">&bull;</span>
                  <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
                </>
              )}
              {personalInfo.github && (
                <>
                  <span className="text-stone-300">&bull;</span>
                  <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                </>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Main Content Sections */}
      <main data-ghost-col="single">
        {sectionOrder.map((secId) => renderSection(secId))}
      </main>
    </div>
  );
};

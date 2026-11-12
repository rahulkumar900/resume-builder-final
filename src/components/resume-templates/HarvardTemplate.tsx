'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

// Harvard FAS Default Order: Education -> Experience -> Leadership & Activities -> Skills & Interests
const DEFAULT_ORDER: ResumeSectionId[] = [
  'education',
  'experience',
  'leadership',
  'skills',
  'projects',
  'certifications',
  'awards',
  'languages',
  'summary',
];

export const HarvardTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    leadership = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    interests = [],
    themeColor: rawThemeColor,
    spacing = 'normal',
  } = data;

  const themeColor = !rawThemeColor || rawThemeColor === '#0f172a' ? '#000000' : rawThemeColor;

  const sectionMarginClass =
    spacing === 'compact' ? 'mt-2.5' : spacing === 'relaxed' ? 'mt-4' : 'mt-3';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-1.5' : spacing === 'relaxed' ? 'space-y-2.5' : 'space-y-2';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-10' : 'p-8';

  const order = data.sectionOrder?.singleColumn || DEFAULT_ORDER;

  // Official Harvard OCS section heading: Centered, Bold, Title Case, no bottom rule
  const renderSectionHeader = (title: string) => (
    <div data-ghost-section-title="true" className="text-center mb-1 break-after-avoid">
      <div
        className="text-[14.5px] font-bold"
        style={{ color: themeColor }}
      >
        {title}
      </div>
    </div>
  );

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={sectionMarginClass}>
            {renderSectionHeader('Education')}
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    {/* Line 1: School Name (Left, Bold) | Location (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[14px] text-slate-900">
                      <span className="font-bold">{edu.school}</span>
                      {edu.location && (
                        <span className="text-[13px] font-normal text-slate-700">{edu.location}</span>
                      )}
                    </div>
                    {/* Line 2: Degree, Concentration & GPA (Left, Normal) | Graduation Date (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[13.5px] text-slate-900">
                      <span>
                        <span>{edu.degree}</span>
                        {edu.gpa && (
                          <span>. GPA {edu.gpa}.</span>
                        )}
                      </span>
                      {edu.graduationDate && (
                        <span className="text-[13.5px] text-slate-900 whitespace-nowrap">{edu.graduationDate}</span>
                      )}
                    </div>
                  </div>
                  {/* Line 3: Coursework, Honors, or Capstone Thesis (clean unbulleted lines per official Harvard OCS) */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="mt-0.5 space-y-0.5 text-[13.5px] leading-[1.35] text-slate-900">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx}>
                          <RichText content={h} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className={sectionMarginClass}>
            {renderSectionHeader('Experience')}
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    {/* Line 1: Organization (Left, Bold) | Location (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[14px] text-slate-900">
                      <span className="font-bold">{exp.company}</span>
                      {exp.location && (
                        <span className="text-[13px] font-normal text-slate-700">{exp.location}</span>
                      )}
                    </div>
                    {/* Line 2: Position Title (Left, Bold) | Date Range (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[13.5px] text-slate-900 mb-0.5">
                      <span className="font-bold">{exp.role}</span>
                      <span className="text-[13.5px] text-slate-900 whitespace-nowrap">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                  </div>
                  {/* Official Harvard OCS paragraph prose (no bullets) */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="text-slate-900 text-[13.5px] leading-[1.38]">
                      <RichText content={exp.highlights.join(' ')} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'leadership':
        if (!leadership || leadership.length === 0) return null;
        return (
          <div key="leadership" data-ghost-section="leadership" className={sectionMarginClass}>
            {renderSectionHeader('Leadership')}
            <div className={itemSpaceClass}>
              {leadership.map((act) => (
                <div key={act.id} data-ghost-item={act.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    {/* Line 1: Organization (Left, Bold) | Location (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[14px] text-slate-900">
                      <span className="font-bold">{act.organization}</span>
                      {act.location && (
                        <span className="text-[13.5px] font-normal text-slate-900">{act.location}</span>
                      )}
                    </div>
                    {/* Line 2: Role (Left, Bold) | Date Range (Right, Normal) */}
                    <div className="flex justify-between items-baseline text-[13.5px] text-slate-900 mb-0.5">
                      <span className="font-bold">{act.role}</span>
                      <span className="text-[13.5px] text-slate-900 whitespace-nowrap">
                        {act.startDate} - {act.current ? 'Present' : act.endDate}
                      </span>
                    </div>
                  </div>
                  {act.highlights && act.highlights.length > 0 && (
                    <div className="text-slate-900 text-[13.5px] leading-[1.38]">
                      <RichText content={act.highlights.join(' ')} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills': {
        if (!skills || skills.length === 0) return null;
        const hasSeparateLanguages = order.includes('languages') && languages.length > 0;
        const hasSeparateInterests = order.includes('interests') && interests.length > 0;
        const inlineLanguages =
          !hasSeparateLanguages &&
          languages.length > 0 &&
          !skills.some((s) => s.category.toLowerCase().includes('lang'));
        const inlineInterests =
          !hasSeparateInterests &&
          interests.length > 0 &&
          !skills.some((s) => s.category.toLowerCase().includes('interest'));
        const skillsHeading =
          inlineInterests || skills.some((s) => s.category.toLowerCase().includes('interest'))
            ? 'Skills & Interests'
            : 'Skills';

        return (
          <div key="skills" data-ghost-section="skills" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader(skillsHeading)}
            <div className="space-y-0.5 text-[13.5px] text-black leading-[1.38]">
              {skills.map((cat, idx) => (
                <div
                  key={cat.id || idx}
                  data-ghost-item={cat.id || `skill-${idx}`}
                  className="flex flex-row items-baseline gap-1.5 break-inside-avoid"
                >
                  {cat.category ? (
                    <span className="font-bold shrink-0">
                      {cat.category}:
                    </span>
                  ) : null}
                  <span className="text-black">{cat.items.join(', ')}</span>
                </div>
              ))}
              {inlineLanguages && (
                <div className="flex flex-row items-baseline gap-1.5 break-inside-avoid">
                  <span className="font-bold shrink-0">
                    Language:
                  </span>
                  <span className="text-black">
                    {languages.map(l => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join(', ')}
                  </span>
                </div>
              )}
              {inlineInterests && (
                <div className="flex flex-row items-baseline gap-1.5 break-inside-avoid">
                  <span className="font-bold shrink-0">
                    Interests:
                  </span>
                  <span className="text-black">
                    {interests.map(i => (typeof i === 'string' ? i : i.name)).filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className={sectionMarginClass}>
            {renderSectionHeader('Academic & Technical Projects')}
            <div className={itemSpaceClass}>
              {projects.map((proj) => (
                <div key={proj.id} data-ghost-item={proj.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[14px] text-slate-900">
                      <span className="font-bold">{proj.title}</span>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal italic text-slate-700 text-[13px]">
                          {' '}– {proj.technologies.join(', ')}
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[12px] text-slate-700 underline truncate max-w-[240px]">
                        {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                      </span>
                    )}
                  </div>
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="text-slate-900 text-[13.5px] leading-[20px] pl-4 space-y-0.5"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Certifications')}
            <div className="space-y-0.5 text-[13.5px] text-black">
              {certifications.map((cert) => (
                <div key={cert.id} data-ghost-item={cert.id} className="flex justify-between items-baseline break-inside-avoid">
                  <span className="text-black">
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && <span>, {cert.issuer}</span>}
                  </span>
                  {cert.date && <span className="text-[13.5px] text-black">{cert.date}</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`${sectionMarginClass} break-inside-avoid`}>
            {renderSectionHeader('Languages')}
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[13.5px] text-black">
              {languages.map((l, lidx) => (
                <div key={l.id || lidx} data-ghost-item={l.id || `lang-${lidx}`} className="break-inside-avoid">
                  <span className="font-bold">{l.language}</span>
                  {l.proficiency && <span> ({l.proficiency})</span>}
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        if (!achievements || achievements.length === 0) return null;
        return (
          <div key="achievements" data-ghost-section="achievements" className={sectionMarginClass}>
            {renderSectionHeader('Key Achievements')}
            <div className={itemSpaceClass}>
              {achievements.map((a) => (
                <div key={a.id} data-ghost-item={a.id} className="break-inside-avoid text-[13.5px] leading-[1.38] text-black">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-bold text-black">{a.title}</span>
                    {a.date && <span className="text-[13.5px] text-black whitespace-nowrap shrink-0">{a.date}</span>}
                  </div>
                  {a.description && (
                    <div className="text-[13.5px] text-black mt-0.5">
                      <RichText content={a.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'summary':
        if (!personalInfo?.summary?.trim()) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={sectionMarginClass}>
            {renderSectionHeader('Profile')}
            <div data-ghost-item="summary-0" className="text-[13.5px] leading-[1.38] text-black text-justify">
              <RichText content={personalInfo.summary} />
            </div>
          </div>
        );

      default:
        return (
          <div key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              renderHeader={renderSectionHeader}
              itemSpacingClass={itemSpaceClass}
            />
          </div>
        );
    }
  };

  // Authentic Harvard FAS Header Contact Bar
  const contactItems: string[] = [];
  if (personalInfo?.location) contactItems.push(personalInfo.location);
  if (personalInfo?.phone) contactItems.push(personalInfo.phone);
  if (personalInfo?.email) contactItems.push(personalInfo.email);
  if (personalInfo?.linkedin) contactItems.push(personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''));
  if (personalInfo?.github) contactItems.push(personalInfo.github.replace(/^https?:\/\/(www\.)?/, ''));
  if (personalInfo?.website) contactItems.push(personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''));

  return (
    <div
      data-template="harvard"
      style={{ fontFamily: "'Times New Roman', Times, var(--font-garamond), 'EB Garamond', Georgia, serif" }}
      className={`w-full h-full min-h-[297mm] bg-white text-black flex flex-col ${paddingClass} text-[13.5px] leading-[1.38] box-border`}
    >
      {/* Running Header (Page > 1) */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-1.5 border-b border-black mb-3 break-inside-avoid flex items-center justify-between text-[11px] uppercase tracking-wider text-black">
          <span style={{ color: themeColor }} className="font-bold">
            {personalInfo?.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          {personalInfo?.email && (
            <span className="text-[11px] text-black font-normal">
              {personalInfo.email}
            </span>
          )}
        </div>
      )}

      {/* Main Header (Page 1 only) - Official Harvard OCS Resume Sample */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className="text-center mb-2.5 break-inside-avoid">
          {/* Firstname Lastname with full-width horizontal rule underneath */}
          <div
            className="text-[18px] font-bold pb-1.5 border-b border-black text-slate-900"
            style={{ color: themeColor }}
          >
            {personalInfo?.fullName || 'Firstname Lastname'}
          </div>

          {/* 17 Main Street • Los Angeles, CA 92720 • youremail@college.harvard.edu • (714) 558-9857 */}
          {contactItems.length > 0 && (
            <div className="pt-1.5 text-[13.5px] text-slate-900 flex flex-wrap justify-center items-center gap-x-1.5 gap-y-0.5 font-normal">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>•</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Single Column */}
      <div data-ghost-col="single" className="flex flex-col flex-1">
        {order.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import {
  ResumeData,
  ResumeSectionId,
  VolunteerItem,
  InternshipItem,
  CourseItem,
  LicenseItem,
  PublicationItem,
  ReferenceItem,
  CustomSection,
} from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { getResolvedTemplateSectionOrder, isSectionPopulated } from '@/lib/templates';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface InfrastructureEngineerTemplateProps {
  data: ResumeData;
}

export const InfrastructureEngineerTemplate: React.FC<InfrastructureEngineerTemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    awards = [],
    achievements = [],
    languages = [],
    themeColor = '#f59e0b',
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.pageNumber || data.pageNumber === (data.totalPages || 1);

  const paddingClass =
    spacing === 'compact'
      ? 'px-6 py-5 sm:px-7 sm:py-6'
      : spacing === 'relaxed'
      ? 'px-9 py-8 sm:px-11 sm:py-9'
      : 'px-7 py-6 sm:px-9 sm:py-7';

  const sectionMarginClass =
    spacing === 'compact' ? 'mb-3.5' : spacing === 'relaxed' ? 'mb-5.5' : 'mb-4.5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  // Resolved single-column section order
  const resolvedOrder = getResolvedTemplateSectionOrder('infrastructure_engineer', data);
  const rawSections = resolvedOrder.singleColumn || [];

  const allKnownSections: ResumeSectionId[] = [
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'certifications',
    'awards',
    'achievements',
    'languages',
    'volunteer',
    'internships',
    'courses',
    'licenses',
    'publications',
    'references',
    'customSections',
    'declaration',
  ];

  const populatedUnlisted = allKnownSections.filter(
    (secId) =>
      !rawSections.includes(secId) &&
      !data.hiddenSections?.includes(secId) &&
      isSectionPopulated(data, secId)
  );

  const combinedSections = [...rawSections, ...populatedUnlisted];
  const sectionIds = combinedSections.filter((secId) => {
    if (secId === 'declaration' && !isLastPage) return false;
    return true;
  });

  // Filter contact items
  const contactItems = [
    personalInfo?.email,
    personalInfo?.phone,
    personalInfo?.location,
    personalInfo?.linkedin,
    personalInfo?.website,
    personalInfo?.github,
  ].filter(Boolean);

  const renderSectionTitle = (title: string) => (
    <h2
      data-ghost-section-title="true"
      className="text-[11px] sm:text-[11.5px] font-black tracking-[0.2em] text-neutral-900 uppercase mb-2.5 select-none break-after-avoid"
    >
      {title}
    </h2>
  );

  // Unified typography matching the summary text across all paragraphs, descriptions, and bullet points
  const bodyTextClass = 'text-[12px] sm:text-[12.5px] leading-relaxed text-neutral-800 font-normal';

  const renderSkillsContent = () => {
    // If multi-category skills exist with distinct titles
    const hasCategories = skills.some(
      (g) => g.category && g.category.trim() !== '' && g.category.trim() !== 'General'
    );

    if (hasCategories && skills.length > 1) {
      return (
        <div className="space-y-2">
          {skills.map((skillGroup, cIdx) => {
            const items = (skillGroup.items || []).filter((it) => it && it.trim());
            if (items.length === 0) return null;
            return (
              <div
                key={skillGroup.id || cIdx}
                data-ghost-item={skillGroup.id || `skill-${cIdx}`}
                className="space-y-0.5"
              >
                <span className="font-bold text-[12px] text-neutral-900 uppercase tracking-wide block">
                  {skillGroup.category}
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {items.map((item, iIdx) => (
                    <React.Fragment key={`${cIdx}-${iIdx}`}>
                      {iIdx > 0 && <span className="text-neutral-400 select-none">·</span>}
                      <span className={bodyTextClass}>
                        {item}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {skills.map((skillGroup, cIdx) => {
          const items = (skillGroup.items || []).filter((it) => it && it.trim());
          if (items.length === 0) return null;
          return (
            <div
              key={skillGroup.id || cIdx}
              data-ghost-item={skillGroup.id || `skill-${cIdx}`}
              className="flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-neutral-400 select-none">·</span>}
                  <span className={bodyTextClass}>
                    {item}
                  </span>
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderEducationContent = () => (
    <div className={itemSpaceClass}>
      {education.map((edu, idx) => (
        <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="space-y-0.5">
          <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
            <h3 className="text-[12.5px] font-bold text-neutral-900 leading-snug">{edu.degree}</h3>
            {edu.graduationDate && (
              <span className="text-[11.5px] text-neutral-600 shrink-0 font-normal tracking-wide whitespace-nowrap">
                {edu.graduationDate}
              </span>
            )}
          </div>
          {(edu.school || edu.location) && (
            <p className="text-[11.5px] text-neutral-500 font-normal">
              {edu.school}
              {edu.school && edu.location ? ', ' : ''}
              {edu.location}
            </p>
          )}
          {edu.gpa && (
            <p className="text-[11px] text-neutral-500 font-normal">GPA: {edu.gpa}</p>
          )}
        </div>
      ))}
    </div>
  );

  // Section rendering logic adhering strictly to PDF Page 12
  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary': {
        const rawSummary = personalInfo?.summary || (data as any)?.summary || '';
        if (!rawSummary?.trim()) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('PROFILE')}
            <div data-ghost-item="summary-0" className={bodyTextClass}>
              <RichText content={rawSummary} />
            </div>
          </section>
        );
      }

      case 'experience': {
        if (!experience || experience.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('EXPERIENCE')}
            <div className={itemSpaceClass}>
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="space-y-0.5">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-neutral-900">{exp.role}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-[11.5px] text-neutral-600 shrink-0 font-normal tracking-wide whitespace-nowrap">
                        {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                        {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                  </div>
                  {(exp.company || exp.location) && (
                    <p className="text-[11.5px] text-neutral-500 font-normal">
                      {exp.company}
                      {exp.company && exp.location ? ', ' : ''}
                      {exp.location}
                    </p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="pt-0.5">
                      <ResumeHighlights
                        highlights={exp.highlights}
                        className={`${bodyTextClass} space-y-1`}
                        itemClassName={bodyTextClass}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'projects': {
        if (!projects || projects.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('MAJOR PROJECTS')}
            <div className={itemSpaceClass}>
              {projects.map((proj, idx) => {
                const period = (proj as any).period || (proj as any).date;
                const desc = (proj as any).description;
                return (
                  <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="space-y-0.5">
                    <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                      <h3 className="text-[13px] font-bold text-neutral-900">{proj.title}</h3>
                      {period && (
                        <span className="text-[11.5px] text-neutral-600 shrink-0 font-normal tracking-wide whitespace-nowrap">
                          {period}
                        </span>
                      )}
                    </div>
                    {desc && (
                      <div className={bodyTextClass}>
                        <RichText content={desc} />
                      </div>
                    )}
                    {proj.highlights && proj.highlights.length > 0 && (
                      <div className="pt-0.5">
                        <ResumeHighlights
                          highlights={proj.highlights}
                          className={`${bodyTextClass} space-y-1`}
                          itemClassName={bodyTextClass}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('EDUCATION')}
            {renderEducationContent()}
          </section>
        );
      }

      case 'skills': {
        if (!skills || skills.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('SKILLS')}
            {renderSkillsContent()}
          </section>
        );
      }

      case 'certifications': {
        if (!certifications || certifications.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('CERTIFICATIONS')}
            <ul className={`space-y-1 list-disc list-outside ml-4 ${bodyTextClass}`}>
              {certifications.map((cert, idx) => (
                <li key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`} className={bodyTextClass}>
                  <span className="font-bold text-neutral-900">{cert.name}</span>
                  {cert.issuer && <span className="text-neutral-600">, {cert.issuer}</span>}
                  {cert.date && <span className="text-neutral-500"> ({cert.date})</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'awards': {
        if (!awards || awards.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('HONORS & AWARDS')}
            <ul className={`space-y-1 list-disc list-outside ml-4 ${bodyTextClass}`}>
              {awards.map((award, idx) => (
                <li key={award.id || idx} data-ghost-item={award.id || `award-${idx}`} className={bodyTextClass}>
                  <span className="font-bold text-neutral-900">{award.title}</span>
                  {award.issuer && <span className="text-neutral-600">, {award.issuer}</span>}
                  {award.date && <span className="text-neutral-500"> ({award.date})</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'achievements': {
        if (!achievements || achievements.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('KEY ACHIEVEMENTS')}
            <ul className={`space-y-1 list-disc list-outside ml-4 ${bodyTextClass}`}>
              {achievements.map((ach, idx) => (
                <li key={ach.id || idx} data-ghost-item={ach.id || `ach-${idx}`} className={bodyTextClass}>
                  <span className="font-bold text-neutral-900">{ach.title}</span>
                  {ach.description && <span className="text-neutral-700">: {ach.description}</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('LANGUAGES')}
            <div data-ghost-item="languages-0" className={bodyTextClass}>
              {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  ')}
            </div>
          </section>
        );
      }

      case 'volunteer': {
        const items = data.volunteer || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('VOLUNTEER & COMMUNITY')}
            <div className={itemSpaceClass}>
              {items.map((v: VolunteerItem, idx: number) => (
                <div key={v.id || idx} data-ghost-item={v.id || `vol-${idx}`} className="space-y-0.5">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-neutral-900">{v.role}</h3>
                    {(v.startDate || v.endDate) && (
                      <span className="text-[11.5px] text-neutral-600 font-medium">
                        {v.startDate} {v.startDate && (v.endDate || v.current) ? '–' : ''} {v.current ? 'Present' : v.endDate}
                      </span>
                    )}
                  </div>
                  {v.organization && (
                    <p className="text-[11.5px] text-neutral-500 font-normal">{v.organization}</p>
                  )}
                  {v.highlights && v.highlights.length > 0 && (
                    <div className="pt-0.5">
                      <ResumeHighlights
                        highlights={v.highlights}
                        className={`${bodyTextClass} space-y-1`}
                        itemClassName={bodyTextClass}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'internships': {
        const items = data.internships || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('INTERNSHIPS')}
            <div className={itemSpaceClass}>
              {items.map((item: InternshipItem, idx: number) => (
                <div key={item.id || idx} data-ghost-item={item.id || `intern-${idx}`} className="space-y-0.5">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-neutral-900">{item.role || item.title}</h3>
                    {(item.startDate || item.endDate) && (
                      <span className="text-[11.5px] text-neutral-600 font-medium">
                        {item.startDate} {item.startDate && (item.endDate || item.current) ? '–' : ''} {item.current ? 'Present' : item.endDate}
                      </span>
                    )}
                  </div>
                  {item.company && (
                    <p className="text-[11.5px] text-neutral-500 font-normal">{item.company}</p>
                  )}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="pt-0.5">
                      <ResumeHighlights
                        highlights={item.highlights}
                        className={`${bodyTextClass} space-y-1`}
                        itemClassName={bodyTextClass}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'courses': {
        const items = data.courses || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('COURSES & TRAINING')}
            <ul className={`space-y-1 list-disc list-outside ml-4 ${bodyTextClass}`}>
              {items.map((c: CourseItem, idx: number) => (
                <li key={c.id || idx} data-ghost-item={c.id || `course-${idx}`} className={bodyTextClass}>
                  <span className="font-bold text-neutral-900">{c.name}</span>
                  {c.institution && <span className="text-neutral-600">, {c.institution}</span>}
                  {c.completionDate && <span className="text-neutral-500"> ({c.completionDate})</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'licenses': {
        const items = data.licenses || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('LICENSES & CREDENTIALS')}
            <ul className={`space-y-1 list-disc list-outside ml-4 ${bodyTextClass}`}>
              {items.map((lic: LicenseItem, idx: number) => (
                <li key={lic.id || idx} data-ghost-item={lic.id || `lic-${idx}`} className={bodyTextClass}>
                  <span className="font-bold text-neutral-900">{lic.name}</span>
                  {lic.issuingAuthority && <span className="text-neutral-600">, {lic.issuingAuthority}</span>}
                  {lic.date && <span className="text-neutral-500"> ({lic.date})</span>}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'publications': {
        const items = data.publications || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('PUBLICATIONS')}
            <div className={itemSpaceClass}>
              {items.map((pub: PublicationItem, idx: number) => (
                <div key={pub.id || idx} data-ghost-item={pub.id || `pub-${idx}`} className="space-y-0.5">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-bold text-neutral-900">{pub.title}</h3>
                    {pub.date && <span className="text-[11.5px] text-neutral-500">{pub.date}</span>}
                  </div>
                  {pub.publisher && <p className="text-[11.5px] text-neutral-500 font-normal">{pub.publisher}</p>}
                  {pub.summary && <p className={bodyTextClass}>{pub.summary}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'references': {
        const items = data.references || [];
        if (items.length === 0) return null;
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('REFERENCES')}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((ref: ReferenceItem, idx: number) => (
                <div key={ref.id || idx} data-ghost-item={ref.id || `ref-${idx}`} className="space-y-0.5">
                  <p className="font-bold text-neutral-900">{ref.name}</p>
                  <p className={bodyTextClass}>{ref.position}{ref.company ? `, ${ref.company}` : ''}</p>
                  {ref.email && <p className="text-[11.5px] text-neutral-500">{ref.email}</p>}
                  {ref.phone && <p className="text-[11.5px] text-neutral-500">{ref.phone}</p>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'customSections': {
        const customSecs = data.customSections || [];
        if (customSecs.length === 0) return null;
        return (
          <React.Fragment key="customSections">
            {customSecs.map((sec: CustomSection) => (
              <section key={sec.id || sec.title} data-ghost-section="customSections" className={sectionMarginClass}>
                {renderSectionTitle(sec.title ? sec.title.toUpperCase() : 'ADDITIONAL')}
                <div className={itemSpaceClass}>
                  {(sec.items || []).map((item, idx) => (
                    <div key={item.id || idx} data-ghost-item={item.id || `cs-${idx}`} className="space-y-0.5">
                      <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                        <h3 className="text-[13px] font-bold text-neutral-900">{item.title}</h3>
                        {item.date && (
                          <span className="text-[11.5px] text-neutral-500 shrink-0 font-medium whitespace-nowrap">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[11.5px] text-neutral-500 font-normal">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <div className={bodyTextClass}>
                          <RichText content={item.description} />
                        </div>
                      )}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-0.5">
                          <ResumeHighlights
                            highlights={item.highlights}
                            className={`${bodyTextClass} space-y-1`}
                            itemClassName={bodyTextClass}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </React.Fragment>
        );
      }

      case 'declaration': {
        if (!isLastPage) return null;
        const text =
          data.declaration?.text ||
          (data as any).declarationText;
        const place = data.declaration?.place;
        const date = data.declaration?.date;
        const signature = data.declaration?.signatureName;

        if (!text?.trim() && !place?.trim() && !date?.trim() && !signature?.trim()) {
          return null;
        }

        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle('DECLARATION')}
            <div data-ghost-item="declaration-0" className="pt-1 space-y-3">
              {text && <p className={`${bodyTextClass} italic`}>{text}</p>}
              <div className="flex justify-between items-end pt-3">
                <div className="space-y-0.5 text-[11.5px] text-neutral-600">
                  {date && <p>Date: {date}</p>}
                  {place && <p>Place: {place}</p>}
                  {!place && !date && personalInfo?.location && <p>Place: {personalInfo.location}</p>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{signature || personalInfo?.fullName || 'Candidate Signature'}</p>
                  <p className="text-[11px] text-neutral-400">Signature</p>
                </div>
              </div>
            </div>
          </section>
        );
      }

      default:
        return (
          <section key={secId} data-ghost-section={secId} className={sectionMarginClass}>
            {renderSectionTitle(secId.toUpperCase())}
            <UniversalSectionRenderer
              secId={secId}
              data={data}
              itemSpacingClass={itemSpaceClass}
              renderHeader={() => null}
            />
          </section>
        );
    }
  };

  const signatureFont = 'space_grotesk';
  const activeFont =
    data.typography?.primaryFont ||
    (data.fontFamily && data.fontFamily !== 'inter' ? data.fontFamily : signatureFont);

  const fontClass =
    activeFont === 'space_grotesk'
      ? 'font-spacegrotesk'
      : activeFont === 'outfit'
      ? 'font-outfit'
      : activeFont === 'manrope'
      ? 'font-manrope'
      : `font-${activeFont}`;

  return (
    <div
      className={`min-h-[297mm] h-full w-full bg-white text-neutral-900 flex ${fontClass}`}
      style={{
        fontFamily:
          activeFont === 'space_grotesk'
            ? "'Space Grotesk', var(--font-space-grotesk), sans-serif"
            : undefined,
      }}
    >
      {/* Left Monolith Sidebar (Dark Charcoal `#16181d` with Rotated Bottom-to-Top Typography) */}
      <aside
        className="w-[95px] sm:w-[110px] shrink-0 bg-[#16181d] text-white flex flex-col justify-center items-center py-10 select-none relative overflow-hidden"
      >
        {isPage1 ? (
          <div
            className="flex items-center gap-6 whitespace-nowrap select-none"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            <h1 className="text-[32px] sm:text-[38px] font-bold text-white tracking-tight leading-none">
              {personalInfo?.fullName || 'Candidate Name'}
            </h1>
            {personalInfo?.jobTitle && (
              <div
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase"
                style={{ color: themeColor || '#ffd23f' }}
              >
                {personalInfo.jobTitle}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center h-full py-8 text-neutral-400 select-none">
            <span
              className="text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {personalInfo?.fullName}
            </span>
            <span className="text-xs font-medium text-neutral-400">
              {data.pageNumber || 2}
            </span>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 ${paddingClass}`}>
        {/* Running Header on Page 2+ */}
        {!isPage1 && (
          <div data-ghost-header="true" className="border-b-2 border-neutral-200 pb-2 mb-4 flex justify-between items-baseline text-xs text-neutral-600 break-inside-avoid">
            <span className="font-bold text-neutral-900 uppercase tracking-wider">{personalInfo?.fullName}</span>
            <span>Page {data.pageNumber} of {data.totalPages || 2}</span>
          </div>
        )}

        {/* Page 1 Header: Contact Row + Thick Architectural Amber Bar */}
        {isPage1 && (
          <header data-ghost-header="true" className="mb-5 break-inside-avoid">
            {contactItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-600 font-normal">
                {contactItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-neutral-400 font-bold">·</span>}
                    <span>{item}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div
              className="h-[3.5px] w-full mt-2.5 rounded-[0.5px]"
              style={{ backgroundColor: themeColor || '#ffd23f' }}
            />
          </header>
        )}

        {/* Single Column Content strictly following resolved user section order */}
        <main data-ghost-col="single" className="flex-1">
          {sectionIds.map((secId) => renderSection(secId))}
        </main>
      </div>
    </div>
  );
};

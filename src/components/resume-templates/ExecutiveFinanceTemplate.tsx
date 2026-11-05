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
import { getResolvedTemplateSectionOrder, SECTION_TITLES } from '@/lib/templates';
import { isSectionPopulated } from '@/lib/templates/content-check';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveFinanceTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    awards = [],
    achievements = [],
    themeColor = '#e63946', // Signature crimson/carmine accent matching PDF Page 11
    spacing = 'normal',
  } = data;

  const isPage1 = !data.pageNumber || data.pageNumber === 1;
  const isLastPage = !data.totalPages || data.pageNumber === data.totalPages;

  const paddingClass =
    spacing === 'compact' ? 'p-6 sm:p-7' : spacing === 'relaxed' ? 'p-10 sm:p-12' : 'p-8 sm:p-10';
  const sectionMarginClass =
    spacing === 'compact' ? 'mb-4' : spacing === 'relaxed' ? 'mb-6' : 'mb-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-3.5' : 'space-y-2.5';

  // Strictly follow resolved section order while ensuring all populated sections render
  const resolvedOrder = getResolvedTemplateSectionOrder('executive_finance', data);
  const rawSections = resolvedOrder.singleColumn || [];

  // Guarantee that any populated section in user's data is never dropped
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
    'freelance',
    'leadership',
    'teaching',
    'militaryService',
    'extracurricular',
    'research',
    'publications',
    'conferences',
    'patents',
    'openSource',
    'speaking',
    'portfolio',
    'courses',
    'licenses',
    'organizations',
    'testScores',
    'interests',
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

  // Contact items for the top contact rail
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
    personalInfo.github,
  ].filter(Boolean);

  // Section wrapper rendering the split top hairline and left-rail title with full Ghost DOM contract
  const renderSplitSection = (title: string, secId: ResumeSectionId, content: React.ReactNode) => (
    <section key={secId} data-ghost-section={secId} data-section-id={secId} className={sectionMarginClass}>
      {/* Top Split Hairline: Left segment (w-28 sm:w-32) + Right segment (flex-1) */}
      <div className="flex items-center gap-6 sm:gap-8 mb-2">
        <div className="w-28 sm:w-32 shrink-0 border-t border-neutral-300" />
        <div className="flex-1 border-t border-neutral-300" />
      </div>

      {/* Row: Left Rail Label + Right Content */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="w-28 sm:w-32 shrink-0">
          <h2
            data-ghost-section-title="true"
            className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.25em] text-neutral-800 uppercase select-none pt-1"
          >
            {title}
          </h2>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          {content}
        </div>
      </div>
    </section>
  );

  // Section rendering logic adhering strictly to PDF Page 11 and user section order
  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary': {
        const rawSummary = personalInfo?.summary || (data as any)?.summary || '';
        if (!rawSummary?.trim()) return null;
        return renderSplitSection(
          'PROFILE',
          secId,
          <div data-ghost-item="summary-0" className="text-[11.5px] sm:text-[12px] leading-[1.65] text-neutral-900 font-normal">
            <RichText content={rawSummary} />
          </div>
        );
      }

      case 'experience': {
        if (!experience || experience.length === 0) return null;
        return renderSplitSection(
          'EXPERIENCE',
          secId,
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} data-ghost-item={exp.id || `exp-${idx}`} className="space-y-0.5">
                <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{exp.role}</h3>
                  {(exp.startDate || exp.endDate) && (
                    <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''}{' '}
                      {exp.current ? 'Present' : exp.endDate}
                    </span>
                  )}
                </div>
                {(exp.company || exp.location) && (
                  <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">
                    {exp.company}
                    {exp.company && exp.location ? ', ' : ''}
                    {exp.location}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-1">
                    <ResumeHighlights
                      highlights={exp.highlights}
                      className="text-[11.5px] leading-relaxed text-neutral-900 font-normal space-y-1"
                      itemClassName="text-[11.5px] leading-relaxed text-neutral-900 font-normal"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'projects': {
        if (!projects || projects.length === 0) return null;
        return renderSplitSection(
          'INITIATIVES',
          secId,
          <div className="space-y-3.5">
            {projects.map((proj, idx) => {
              const period = (proj as any).period || (proj as any).date;
              const desc = (proj as any).description;
              return (
                <div key={proj.id || idx} data-ghost-item={proj.id || `proj-${idx}`} className="space-y-0.5">
                  <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{proj.title}</h3>
                    {period && (
                      <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                        {period}
                      </span>
                    )}
                  </div>
                  {desc && (
                    <div className="text-[11.5px] leading-relaxed text-neutral-900 font-normal">
                      <RichText content={desc} />
                    </div>
                  )}
                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="pt-0.5">
                      <ResumeHighlights
                        highlights={proj.highlights}
                        className="text-[11.5px] leading-relaxed text-neutral-900 font-normal space-y-1"
                        itemClassName="text-[11.5px] leading-relaxed text-neutral-900 font-normal"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      case 'education': {
        if (!education || education.length === 0) return null;
        return renderSplitSection(
          'EDUCATION',
          secId,
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} data-ghost-item={edu.id || `edu-${idx}`} className="space-y-0.5">
                <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{edu.degree}</h3>
                  {edu.graduationDate && (
                    <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                      {edu.graduationDate}
                    </span>
                  )}
                </div>
                {(edu.school || edu.location) && (
                  <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">
                    {edu.school}
                    {edu.school && edu.location ? ', ' : ''}
                    {edu.location}
                  </p>
                )}
                {edu.gpa && (
                  <p className="text-[11px] text-neutral-700 font-normal">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'skills': {
        if (!skills || skills.length === 0) return null;
        return renderSplitSection(
          'SKILLS',
          secId,
          <div className="space-y-1.5 text-[11.5px] sm:text-[12px] leading-relaxed text-neutral-900 font-normal">
            {skills.map((skillGroup, idx) => {
              const itemsList = Array.isArray(skillGroup.items)
                ? skillGroup.items.join(' / ')
                : '';
              if (!itemsList) return null;

              if (skills.length > 1 && skillGroup.category && skillGroup.category !== 'General') {
                return (
                  <div key={skillGroup.id || idx} data-ghost-item={skillGroup.id || `skill-${idx}`}>
                    <span className="font-bold text-neutral-900">{skillGroup.category}: </span>
                    <span className="text-neutral-900">{itemsList}</span>
                  </div>
                );
              }

              return <div key={skillGroup.id || idx} data-ghost-item={skillGroup.id || `skill-${idx}`}>{itemsList}</div>;
            })}
          </div>
        );
      }

      case 'certifications': {
        if (!certifications || certifications.length === 0) return null;
        return renderSplitSection(
          'CERTIFICATIONS',
          secId,
          <ul className="space-y-1 list-disc list-outside ml-4 text-[11.5px] sm:text-[12px] text-neutral-900 font-normal">
            {certifications.map((cert, idx) => (
              <li key={cert.id || idx} data-ghost-item={cert.id || `cert-${idx}`}>
                <span className="font-bold text-neutral-900">{cert.name}</span>
                {cert.issuer && <span className="text-neutral-700">, {cert.issuer}</span>}
                {cert.date && <span className="text-neutral-600 font-medium"> ({cert.date})</span>}
              </li>
            ))}
          </ul>
        );
      }

      case 'awards': {
        if (!awards || awards.length === 0) return null;
        return renderSplitSection(
          'RECOGNITION',
          secId,
          <ul className="space-y-1 list-disc list-outside ml-4 text-[11.5px] sm:text-[12px] text-neutral-900 font-normal">
            {awards.map((award, idx) => (
              <li key={award.id || idx} data-ghost-item={award.id || `award-${idx}`}>
                <span className="font-bold text-neutral-900">{award.title}</span>
                {award.issuer && <span className="text-neutral-700">, {award.issuer}</span>}
                {award.date && <span className="text-neutral-600 font-medium"> ({award.date})</span>}
              </li>
            ))}
          </ul>
        );
      }

      case 'achievements': {
        if (!achievements || achievements.length === 0) return null;
        return renderSplitSection(
          'ACHIEVEMENTS',
          secId,
          <ul className="space-y-1 list-disc list-outside ml-4 text-[11.5px] sm:text-[12px] text-neutral-900 font-normal">
            {achievements.map((ach, idx) => (
              <li key={ach.id || idx} data-ghost-item={ach.id || `ach-${idx}`}>
                <span className="font-bold text-neutral-900">{ach.title}</span>
                {ach.description && <span className="text-neutral-800">: {ach.description}</span>}
              </li>
            ))}
          </ul>
        );
      }

      case 'languages': {
        if (!languages || languages.length === 0) return null;
        return renderSplitSection(
          'LANGUAGES',
          secId,
          <div data-ghost-item="languages-0" className="text-[11.5px] sm:text-[12px] text-neutral-900 font-normal">
            {languages.map((l) => `${l.language}${l.proficiency ? ` (${l.proficiency})` : ''}`).join('  ·  ')}
          </div>
        );
      }

      case 'volunteer': {
        const items = data.volunteer || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'VOLUNTEER',
          secId,
          <div className="space-y-3.5">
            {items.map((v: VolunteerItem, idx: number) => (
              <div key={v.id || idx} data-ghost-item={v.id || `vol-${idx}`} className="space-y-0.5">
                <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{v.role}</h3>
                  {(v.startDate || v.endDate) && (
                    <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                      {v.startDate} {v.startDate && (v.endDate || v.current) ? '–' : ''} {v.current ? 'Present' : v.endDate}
                    </span>
                  )}
                </div>
                {v.organization && (
                  <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">{v.organization}</p>
                )}
                {v.highlights && v.highlights.length > 0 && (
                  <div className="pt-0.5">
                    <ResumeHighlights
                      highlights={v.highlights}
                      className="text-[11.5px] leading-relaxed text-neutral-900 font-normal space-y-1"
                      itemClassName="text-[11.5px] leading-relaxed text-neutral-900 font-normal"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'internships': {
        const items = data.internships || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'INTERNSHIPS',
          secId,
          <div className="space-y-3.5">
            {items.map((item: InternshipItem, idx: number) => (
              <div key={item.id || idx} data-ghost-item={item.id || `intern-${idx}`} className="space-y-0.5">
                <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{item.role || item.title}</h3>
                  {(item.startDate || item.endDate) && (
                    <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                      {item.startDate} {item.startDate && (item.endDate || item.current) ? '–' : ''} {item.current ? 'Present' : item.endDate}
                    </span>
                  )}
                </div>
                {item.company && (
                  <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">{item.company}</p>
                )}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-0.5">
                    <ResumeHighlights
                      highlights={item.highlights}
                      className="text-[11.5px] leading-relaxed text-neutral-900 font-normal space-y-1"
                      itemClassName="text-[11.5px] leading-relaxed text-neutral-900 font-normal"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'courses': {
        const items = data.courses || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'COURSES',
          secId,
          <ul className="space-y-1 list-disc list-outside ml-4 text-[11.5px] text-neutral-900 font-normal">
            {items.map((c: CourseItem, idx: number) => (
              <li key={c.id || idx} data-ghost-item={c.id || `course-${idx}`}>
                <span className="font-bold text-neutral-900">{c.name}</span>
                {c.institution && <span className="text-neutral-700">, {c.institution}</span>}
                {c.completionDate && <span className="text-neutral-600 font-medium"> ({c.completionDate})</span>}
              </li>
            ))}
          </ul>
        );
      }

      case 'licenses': {
        const items = data.licenses || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'LICENSES',
          secId,
          <ul className="space-y-1 list-disc list-outside ml-4 text-[11.5px] text-neutral-900 font-normal">
            {items.map((lic: LicenseItem, idx: number) => (
              <li key={lic.id || idx} data-ghost-item={lic.id || `lic-${idx}`}>
                <span className="font-bold text-neutral-900">{lic.name}</span>
                {lic.issuingAuthority && <span className="text-neutral-700">, {lic.issuingAuthority}</span>}
                {lic.date && <span className="text-neutral-600 font-medium"> ({lic.date})</span>}
              </li>
            ))}
          </ul>
        );
      }

      case 'publications': {
        const items = data.publications || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'PUBLICATIONS',
          secId,
          <div className="space-y-3">
            {items.map((pub: PublicationItem, idx: number) => (
              <div key={pub.id || idx} data-ghost-item={pub.id || `pub-${idx}`} className="space-y-0.5">
                <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{pub.title}</h3>
                  {pub.date && <span className="text-[11px] sm:text-[11.5px] text-neutral-700 font-medium">{pub.date}</span>}
                </div>
                {pub.publisher && <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">{pub.publisher}</p>}
                {pub.summary && <p className="text-[11.5px] text-neutral-900 font-normal leading-relaxed">{pub.summary}</p>}
              </div>
            ))}
          </div>
        );
      }

      case 'references': {
        const items = data.references || [];
        if (items.length === 0) return null;
        return renderSplitSection(
          'REFERENCES',
          secId,
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px]">
            {items.map((ref: ReferenceItem, idx: number) => (
              <div key={ref.id || idx} data-ghost-item={ref.id || `ref-${idx}`} className="space-y-0.5">
                <p className="font-bold text-neutral-900">{ref.name}</p>
                <p className="text-neutral-700">{ref.position}{ref.company ? `, ${ref.company}` : ''}</p>
                {ref.email && <p className="text-neutral-600">{ref.email}</p>}
                {ref.phone && <p className="text-neutral-600">{ref.phone}</p>}
              </div>
            ))}
          </div>
        );
      }

      case 'customSections': {
        const customSecs = data.customSections || [];
        if (customSecs.length === 0) return null;
        return (
          <React.Fragment key="customSections">
            {customSecs.map((sec: CustomSection) =>
              renderSplitSection(
                sec.title ? sec.title.toUpperCase() : 'ADDITIONAL',
                'customSections',
                <div className="space-y-3.5">
                  {(sec.items || []).map((item, idx) => (
                    <div key={item.id || idx} data-ghost-item={item.id || `cs-${idx}`} className="space-y-0.5">
                      <div data-ghost-item-header="true" className="flex items-baseline justify-between gap-2">
                        <h3 className="text-[12.5px] sm:text-[13px] font-bold text-neutral-900">{item.title}</h3>
                        {item.date && (
                          <span className="text-[11px] sm:text-[11.5px] text-neutral-700 shrink-0 font-medium">
                            {item.date}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] sm:text-[11.5px] text-neutral-700 font-normal">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <div className="text-[11.5px] leading-relaxed text-neutral-900 font-normal">
                          <RichText content={item.description} />
                        </div>
                      )}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-0.5">
                          <ResumeHighlights
                            highlights={item.highlights}
                            className="text-[11.5px] leading-relaxed text-neutral-900 font-normal space-y-1"
                            itemClassName="text-[11.5px] leading-relaxed text-neutral-900 font-normal"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}
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

        return renderSplitSection(
          'DECLARATION',
          secId,
          <div data-ghost-item="declaration-0" className="pt-1 text-[11.5px] text-neutral-900 space-y-4 font-normal">
            {text && <p className="leading-relaxed">{text}</p>}
            <div className="flex justify-between items-end pt-3">
              <div className="space-y-0.5 text-neutral-700">
                {date && <p>Date: {date}</p>}
                {place && <p>Place: {place}</p>}
                {!place && !date && personalInfo.location && <p>Place: {personalInfo.location}</p>}
              </div>
              <div className="text-right">
                <p className="font-bold text-neutral-900">{signature || personalInfo.fullName || 'Candidate Signature'}</p>
                <p className="text-[11px] text-neutral-500">Signature</p>
              </div>
            </div>
          </div>
        );
      }

      default: {
        const title = (SECTION_TITLES[secId] || secId).toUpperCase();
        return renderSplitSection(
          title,
          secId,
          <UniversalSectionRenderer
            secId={secId}
            data={data}
            itemSpacingClass={itemSpaceClass}
            renderHeader={() => null}
          />
        );
      }
    }
  };

  const signatureFont = 'manrope';
  const activeFont =
    data.typography?.primaryFont ||
    (data.fontFamily && data.fontFamily !== 'inter' ? data.fontFamily : signatureFont);

  const fontClass =
    activeFont === 'manrope'
      ? 'font-manrope'
      : activeFont === 'space_grotesk'
      ? 'font-spacegrotesk'
      : `font-${activeFont}`;

  return (
    <div
      className={`w-full h-full min-h-[297mm] bg-white text-neutral-900 flex flex-col box-border ${paddingClass} ${fontClass}`}
      style={{
        backgroundColor: '#ffffff',
        fontFamily:
          activeFont === 'manrope'
            ? "'Manrope', var(--font-manrope), sans-serif"
            : undefined,
      }}
    >
      {/* Running Header on Page 2+ */}
      {!isPage1 && (
        <div data-ghost-header="true" className="pb-3 mb-5 border-b border-neutral-300 flex justify-between items-baseline text-xs">
          <span className="font-semibold uppercase tracking-wider text-neutral-900">
            {personalInfo.fullName}
            {personalInfo.jobTitle ? ` · ${personalInfo.jobTitle}` : ''}
          </span>
          <span className="text-neutral-700 font-medium">Page {data.pageNumber}</span>
        </div>
      )}

      {/* Page 1 Header matching PDF Page 11: ExtraLight/Light Name + Signature Bold Crimson Dot */}
      {isPage1 && (
        <header data-ghost-header="true" className="mb-6">
          <h1 className="text-4xl sm:text-[46px] font-light tracking-tight text-neutral-900 leading-none">
            {personalInfo.fullName}
            <span
              className="font-bold inline-block ml-0.5"
              style={{ color: themeColor && themeColor !== '#2563eb' ? themeColor : '#c1272d' }}
            >
              .
            </span>
          </h1>

          {personalInfo.jobTitle && (
            <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.25em] uppercase text-neutral-700 mt-2">
              {personalInfo.jobTitle}
            </p>
          )}
        </header>
      )}

      {/* Page 1 Contact Row right after header, matching PDF Page 11 structure */}
      {isPage1 && contactItems.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-6 sm:gap-8 mb-2">
            <div className="w-28 sm:w-32 shrink-0 border-t border-neutral-300" />
            <div className="flex-1 border-t border-neutral-300" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="w-28 sm:w-32 shrink-0">
              <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.25em] text-neutral-800 uppercase select-none pt-1 block">
                CONTACT
              </span>
            </div>
            <div className="flex-1 min-w-0 text-[11.5px] sm:text-[12px] text-neutral-900 leading-relaxed font-normal pt-0.5">
              {contactItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="mx-2 text-neutral-400">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sections rendered strictly following resolved dynamic order */}
      <main data-ghost-col="single" className="space-y-1">
        {sectionIds.map((secId) => renderSection(secId))}
      </main>
    </div>
  );
};

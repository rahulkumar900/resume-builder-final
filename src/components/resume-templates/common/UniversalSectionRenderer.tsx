'use client';

import React from 'react';
import {
  ResumeData,
  ResumeSectionId,
  VolunteerItem,
  InternshipItem,
  FreelanceItem,
  LeadershipItem,
  TeachingItem,
  MilitaryItem,
  ExtracurricularItem,
  ResearchItem,
  PublicationItem,
  ConferenceItem,
  PatentItem,
  AwardItem,
  AchievementItem,
  CourseItem,
  LicenseItem,
  OrganizationItem,
  InterestItem,
  TestScoreItem,
  LinkItem,
  PortfolioItem,
  OpenSourceItem,
  SpeakingItem,
  ReferenceItem,
  CustomSection,
} from '@/types/resume';
import { SECTION_TITLES, normalizeCustomSectionType } from '@/lib/templates';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { RichText } from '@/components/common/RichText';

export interface UniversalSectionRendererProps {
  secId: ResumeSectionId;
  data: ResumeData;
  renderHeader: (title: string, secId: ResumeSectionId) => React.ReactNode;
  itemSpacingClass?: string;
  isSidebar?: boolean;
}

export const UniversalSectionRenderer: React.FC<UniversalSectionRendererProps> = ({
  secId,
  data,
  renderHeader,
  itemSpacingClass = 'space-y-3',
  isSidebar = false,
}) => {
  const sectionTitle = SECTION_TITLES[secId] || secId;

  // Helper for experience-like items
  const renderExperienceLikeList = (
    items: Array<{
      id: string;
      role: string;
      companyOrOrg: string;
      location?: string;
      startDate: string;
      endDate?: string;
      current?: boolean;
      highlights?: string[];
    }>,
    ghostSection: string
  ) => {
    if (!items || items.length === 0) return null;
    return (
      <div key={ghostSection} data-ghost-section={ghostSection} className="space-y-2">
        {renderHeader(sectionTitle, secId)}
        <div className={itemSpacingClass}>
          {items.map((item) => (
            <div key={item.id} data-ghost-item={item.id} className="space-y-1 break-inside-avoid">
              <div data-ghost-item-header="true">
                <div className={`flex ${isSidebar ? 'flex-col gap-0.5' : 'justify-between items-baseline'}`}>
                  <span className="font-bold text-[13px] text-slate-900">{item.role}</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.startDate} &mdash; {item.current ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="text-[12px] font-medium text-slate-700">
                  {item.companyOrOrg} {item.location ? `• ${item.location}` : ''}
                </div>
              </div>
              {item.highlights && item.highlights.length > 0 && (
                <ResumeHighlights
                  highlights={item.highlights}
                  className="text-slate-700 pt-0.5 leading-relaxed text-[12px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  switch (secId) {
    // 1. Volunteer Experience
    case 'volunteer':
      return renderExperienceLikeList(
        (data.volunteer || []).map((v) => ({
          id: v.id,
          role: v.role,
          companyOrOrg: v.organization,
          location: v.location,
          startDate: v.startDate,
          endDate: v.endDate,
          current: v.current,
          highlights: v.highlights,
        })),
        'volunteer'
      );

    // 2. Internships
    case 'internships':
      return renderExperienceLikeList(
        (data.internships || []).map((i) => ({
          id: i.id,
          role: i.role || (i as any).title || '',
          companyOrOrg: i.company || (i as any).organization || '',
          location: i.location,
          startDate: i.startDate,
          endDate: i.endDate,
          current: i.current,
          highlights:
            i.highlights && i.highlights.length > 0
              ? i.highlights
              : (i as any).description
              ? [(i as any).description]
              : [],
        })),
        'internships'
      );

    // 3. Freelance Experience
    case 'freelance':
      return renderExperienceLikeList(
        (data.freelance || []).map((f) => ({
          id: f.id,
          role: f.role,
          companyOrOrg: f.client,
          location: f.location,
          startDate: f.startDate,
          endDate: f.endDate,
          current: f.current,
          highlights: f.highlights,
        })),
        'freelance'
      );

    // 4. Leadership
    case 'leadership':
      return renderExperienceLikeList(
        (data.leadership || []).map((l) => ({
          id: l.id,
          role: l.role,
          companyOrOrg: l.organization,
          location: l.location,
          startDate: l.startDate,
          endDate: l.endDate,
          current: l.current,
          highlights: l.highlights,
        })),
        'leadership'
      );

    // 5. Teaching
    case 'teaching':
      return renderExperienceLikeList(
        (data.teaching || []).map((t) => ({
          id: t.id,
          role: t.role,
          companyOrOrg: t.institution,
          location: t.location,
          startDate: t.startDate,
          endDate: t.endDate,
          current: t.current,
          highlights: t.highlights,
        })),
        'teaching'
      );

    // 6. Military Service
    case 'militaryService':
      return renderExperienceLikeList(
        (data.militaryService || []).map((m) => ({
          id: m.id,
          role: m.rank ? `${m.rank} - ${m.role}` : m.role,
          companyOrOrg: m.branch,
          location: m.location,
          startDate: m.startDate,
          endDate: m.endDate,
          current: m.current,
          highlights: m.highlights,
        })),
        'militaryService'
      );

    // 7. Extracurricular Activities
    case 'extracurricular':
      return renderExperienceLikeList(
        (data.extracurricular || []).map((e) => ({
          id: e.id,
          role: e.role,
          companyOrOrg: e.organization,
          location: e.location,
          startDate: e.startDate,
          endDate: e.endDate,
          current: e.current,
          highlights: e.highlights,
        })),
        'extracurricular'
      );

    // 8. Research Experience
    case 'research':
      return renderExperienceLikeList(
        (data.research || []).map((r) => ({
          id: r.id,
          role: r.title,
          companyOrOrg: r.institution,
          location: r.location,
          startDate: r.startDate,
          endDate: r.endDate,
          current: r.current,
          highlights: r.highlights,
        })),
        'research'
      );

    // 9. Publications
    case 'publications': {
      const pubs = data.publications || [];
      if (pubs.length === 0) return null;
      return (
        <div key="publications" data-ghost-section="publications" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {pubs.map((p) => (
              <div key={p.id} data-ghost-item={p.id} className="space-y-0.5 break-inside-avoid">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[13px] text-slate-900">{p.title}</span>
                  <span className="text-[11px] font-semibold text-slate-500">{p.date}</span>
                </div>
                <div className="text-[12px] text-slate-600">
                  {p.publisher} {p.authors ? `• ${p.authors}` : ''}
                </div>
                {p.summary && <div className="text-[11.5px] text-slate-600 pt-0.5">{p.summary}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 10. Conferences
    case 'conferences': {
      const confs = data.conferences || [];
      if (confs.length === 0) return null;
      return (
        <div key="conferences" data-ghost-section="conferences" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {confs.map((c) => (
              <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid text-[12px]">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <span className="text-[11px] text-slate-500">{c.date}</span>
                </div>
                {c.topic && <div className="text-slate-600">{c.topic} {c.location ? `• ${c.location}` : ''}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 11. Patents
    case 'patents': {
      const patents = data.patents || [];
      if (patents.length === 0) return null;
      return (
        <div key="patents" data-ghost-section="patents" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {patents.map((p) => (
              <div key={p.id} data-ghost-item={p.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[13px] text-slate-900">{p.title}</span>
                  <span className="text-[11px] text-slate-500">{p.date}</span>
                </div>
                <div className="text-[12px] text-slate-600">
                  {p.issuer} &bull; Patent #{p.patentNumber}
                </div>
                {p.summary && <div className="text-[11.5px] text-slate-600">{p.summary}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 12. Achievements
    case 'achievements': {
      const achs = data.achievements || [];
      if (achs.length === 0) return null;
      return (
        <div key="achievements" data-ghost-section="achievements" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {achs.map((a) => (
              <div key={a.id} data-ghost-item={a.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[12.5px] text-slate-900">{a.title}</span>
                  {a.date && <span className="text-[11px] text-slate-500">{a.date}</span>}
                </div>
                <div className="text-[12px] text-slate-600">{a.description}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 13. Awards
    case 'awards': {
      const awards = data.awards || [];
      if (awards.length === 0) return null;
      return (
        <div key="awards" data-ghost-section="awards" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {awards.map((a) => (
              <div key={a.id} data-ghost-item={a.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[12.5px] text-slate-900">{a.title}</span>
                  <span className="text-[11px] text-slate-500">{a.date}</span>
                </div>
                <div className="text-[12px] text-slate-600">{a.issuer}</div>
                {a.summary && <div className="text-[11.5px] text-slate-600">{a.summary}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 14. Courses / Training
    case 'courses': {
      const courses = data.courses || [];
      if (courses.length === 0) return null;
      return (
        <div key="courses" data-ghost-section="courses" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {courses.map((c) => (
              <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid text-[12px]">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{c.name}</span>
                  <span className="text-[11px] text-slate-500">{c.completionDate}</span>
                </div>
                <div className="text-slate-600">{c.institution}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 15. Licenses
    case 'licenses': {
      const lics = data.licenses || [];
      if (lics.length === 0) return null;
      return (
        <div key="licenses" data-ghost-section="licenses" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {lics.map((l) => (
              <div key={l.id} data-ghost-item={l.id} className="break-inside-avoid text-[12px]">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{l.name}</span>
                  <span className="text-[11px] text-slate-500">{l.date}</span>
                </div>
                <div className="text-slate-600">
                  {l.issuingAuthority} {l.licenseNumber ? `• License #${l.licenseNumber}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 16. Organizations / Memberships
    case 'organizations': {
      const orgs = data.organizations || [];
      if (orgs.length === 0) return null;
      return (
        <div key="organizations" data-ghost-section="organizations" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {orgs.map((o) => (
              <div key={o.id} data-ghost-item={o.id} className="break-inside-avoid text-[12px]">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{o.name}</span>
                  <span className="text-[11px] text-slate-500">
                    {o.startDate} &mdash; {o.current ? 'Present' : o.endDate}
                  </span>
                </div>
                <div className="text-slate-600">{o.role}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 17. Interests / Hobbies
    case 'interests': {
      const interests = data.interests || [];
      if (interests.length === 0) return null;
      return (
        <div key="interests" data-ghost-section="interests" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className="flex flex-wrap gap-1.5 text-[12px] text-slate-700">
            {interests.map((i) => (
              <div key={i.id} data-ghost-item={i.id} className="bg-slate-100 px-2 py-0.5 rounded text-[11.5px] font-medium">
                {i.name}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 18. Test Scores
    case 'testScores': {
      const tests = data.testScores || [];
      if (tests.length === 0) return null;
      return (
        <div key="testScores" data-ghost-section="testScores" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
            {tests.map((t) => (
              <div key={t.id} data-ghost-item={t.id} className="flex justify-between border-b border-slate-200 pb-1">
                <span className="font-semibold text-slate-800">{t.testName}</span>
                <span className="font-bold text-slate-900">{t.score}{t.maxScore ? ` / ${t.maxScore}` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 19. Professional Links & Social Links
    case 'professionalLinks':
    case 'socialLinks': {
      const links = (secId === 'professionalLinks' ? data.professionalLinks : data.socialLinks) || [];
      if (links.length === 0) return null;
      return (
        <div key={secId} data-ghost-section={secId} className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className="flex flex-wrap gap-3 text-[12px]">
            {links.map((l) => (
              <div key={l.id} data-ghost-item={l.id} className="flex items-center gap-1 text-slate-700">
                <span className="font-semibold">{l.label}:</span>
                <span className="text-blue-600 underline text-[11.5px]">{l.url.replace(/^https?:\/\//, '')}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 20. Portfolio
    case 'portfolio': {
      const port = data.portfolio || [];
      if (port.length === 0) return null;
      return (
        <div key="portfolio" data-ghost-section="portfolio" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {port.map((p) => (
              <div key={p.id} data-ghost-item={p.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[13px] text-slate-900">{p.title}</span>
                  <span className="text-[11px] text-blue-600 underline">{p.url.replace(/^https?:\/\//, '')}</span>
                </div>
                {p.description && <div className="text-[12px] text-slate-600">{p.description}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 21. Open Source Contributions
    case 'openSource': {
      const os = data.openSource || [];
      if (os.length === 0) return null;
      return (
        <div key="openSource" data-ghost-section="openSource" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {os.map((o) => (
              <div key={o.id} data-ghost-item={o.id} className="break-inside-avoid space-y-0.5">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-[13px] text-slate-900">{o.projectName}</span>
                  <span className="text-[11px] text-slate-500">{o.role || 'Contributor'}</span>
                </div>
                {o.description && <div className="text-[12px] text-slate-600">{o.description}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 22. Speaking / Talks
    case 'speaking': {
      const talks = data.speaking || [];
      if (talks.length === 0) return null;
      return (
        <div key="speaking" data-ghost-section="speaking" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {talks.map((s) => (
              <div key={s.id} data-ghost-item={s.id} className="break-inside-avoid space-y-0.5 text-[12px]">
                <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{s.topic}</span>
                  <span className="text-[11px] text-slate-500">{s.date}</span>
                </div>
                <div className="text-slate-600">
                  {s.eventName} {s.location ? `• ${s.location}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 23. References
    case 'references': {
      const refs = data.references || [];
      if (refs.length === 0) return null;
      return (
        <div key="references" data-ghost-section="references" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {refs.map((r) => (
              <div key={r.id} data-ghost-item={r.id} className="break-inside-avoid text-[12px] space-y-0.5 border-l-2 border-slate-300 pl-2">
                <div data-ghost-item-header="true" className="font-bold text-slate-900">{r.name}</div>
                <div className="text-slate-600 font-medium">{r.position}, {r.company}</div>
                {(r.email || r.phone) && (
                  <div className="text-[11px] text-slate-500">
                    {r.email} {r.email && r.phone ? '• ' : ''}{r.phone}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 24. Custom Sections
    case 'customSections': {
      const customSections = data.customSections || [];
      if (customSections.length === 0) return null;
      return (
        <div key="customSections" className="space-y-4">
          {customSections.map((sec) => {
            const normType = normalizeCustomSectionType(sec.type);

            return (
              <div key={sec.id} data-ghost-section="customSections" className="space-y-2">
                {renderHeader(sec.title || 'Additional Information', secId)}

                {/* 1. Statement / Text Block Type */}
                {normType === 'statement' && (
                  <div
                    data-ghost-item={`${sec.id}-content`}
                    className="text-[12px] leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line"
                  >
                    {sec.content || sec.items?.[0]?.description || ''}
                  </div>
                )}

                {/* 2. Tags / List Type */}
                {normType === 'tags' && (
                  <div className="space-y-2">
                    {(sec.items || []).map((item, idx) => {
                      const tags =
                        item.items && item.items.length > 0
                          ? item.items
                          : item.description
                          ? item.description.split(',').map((s) => s.trim()).filter(Boolean)
                          : [];

                      return (
                        <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1">
                          {item.title && (
                            <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                              {item.title}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-xs bg-slate-100 dark:bg-muted text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded font-medium border border-slate-200/60 dark:border-border"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. Contacts / Reference Type */}
                {normType === 'contacts' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(sec.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        data-ghost-item={item.id || `${sec.id}-${idx}`}
                        className="p-2.5 rounded-lg border border-slate-200/70 dark:border-border bg-slate-50/50 dark:bg-card/40 space-y-0.5 text-xs"
                      >
                        <div className="font-bold text-slate-900 dark:text-foreground">{item.title}</div>
                        {item.subtitle && <div className="text-slate-600 dark:text-muted-foreground">{item.subtitle}</div>}
                        {item.description && <div className="text-slate-500 text-[11px]">{item.description}</div>}
                        <div className="text-[11px] text-slate-600 dark:text-muted-foreground pt-1 space-y-0.5">
                          {item.email && <div>✉️ {item.email}</div>}
                          {item.phone && <div>📞 {item.phone}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Awards / Credential Type */}
                {normType === 'awards' && (
                  <div className={itemSpacingClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-0.5 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-[13px] text-slate-900 dark:text-foreground">{item.title}</span>
                          {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
                        </div>
                        {(item.subtitle || item.issuer || item.score) && (
                          <div className="text-[12px] text-slate-600 dark:text-muted-foreground">
                            {item.subtitle || item.issuer} {item.score ? `• ${item.score}` : ''}
                          </div>
                        )}
                        {item.description && <div className="text-[12px] text-slate-600 dark:text-muted-foreground">{item.description}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Showcase / Project Type */}
                {normType === 'showcase' && (
                  <div className={itemSpacingClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[13px] text-slate-900 dark:text-foreground">{item.title}</span>
                            {item.link && (
                              <a
                                href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                ↗
                              </a>
                            )}
                          </div>
                          {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
                        </div>
                        {item.subtitle && <div className="text-[11.5px] font-medium text-slate-600 dark:text-muted-foreground">{item.subtitle}</div>}
                        {item.description && <div className="text-[12px] text-slate-600 dark:text-muted-foreground">{item.description}</div>}
                        {item.highlights && item.highlights.length > 0 && (
                          <ResumeHighlights highlights={item.highlights} className="text-slate-700 text-[12px] pt-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. Academic / Extended Education Type */}
                {normType === 'academic' && (
                  <div className={itemSpacingClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-0.5 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-[13px] text-slate-900 dark:text-foreground">{item.title}</span>
                          {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
                        </div>
                        <div className="flex justify-between items-baseline text-[12px] text-slate-700 dark:text-slate-300">
                          <span>{item.subtitle || ''}</span>
                          {item.location && <span className="text-[11px] text-slate-500">{item.location}</span>}
                        </div>
                        {item.score && (
                          <div className="text-[11px] font-medium text-purple-700 dark:text-purple-400">
                            GPA / Honors: {item.score}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-[12px] text-slate-600 dark:text-muted-foreground pt-0.5 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. Publication / Research Type */}
                {normType === 'publication' && (
                  <div className={itemSpacingClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-0.5 break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[13px] text-slate-900 dark:text-foreground">{item.title}</span>
                            {item.link && (
                              <a
                                href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                ↗
                              </a>
                            )}
                          </div>
                          {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
                        </div>
                        {item.subtitle && (
                          <div className="text-[12px] italic text-slate-600 dark:text-muted-foreground">
                            {item.subtitle}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-[12px] text-slate-600 dark:text-muted-foreground pt-0.5 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 8. Levels / Ranked Skills Type */}
                {normType === 'levels' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(sec.items || []).map((item, idx) => {
                      const lvl = item.level || item.subtitle || 'Intermediate';
                      const score = lvl === 'Expert' ? 5 : lvl === 'Advanced' ? 4 : lvl === 'Intermediate' ? 3 : lvl === 'Elementary' ? 2 : 1;
                      return (
                        <div
                          key={item.id || idx}
                          data-ghost-item={item.id || `${sec.id}-${idx}`}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-muted/40 border border-slate-200/60 dark:border-border"
                        >
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-slate-500">{lvl}</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <div
                                  key={s}
                                  className={`w-1.5 h-1.5 rounded-full ${s <= score ? 'bg-purple-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 9. Metrics / Key Impact Stats Type */}
                {normType === 'metrics' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {(sec.items || []).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        data-ghost-item={item.id || `${sec.id}-${idx}`}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-muted/40 border border-slate-200/70 dark:border-border space-y-1 text-center sm:text-left"
                      >
                        <div className="text-lg font-black text-purple-700 dark:text-purple-400 tracking-tight">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs font-bold text-slate-900 dark:text-foreground">
                            {item.subtitle}
                          </div>
                        )}
                        {item.description && (
                          <div className="text-[11px] text-slate-500 dark:text-muted-foreground leading-snug">
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 10. Timeline / Experience Type (Default) */}
                {normType === 'timeline' && (
                  <div className={itemSpacingClass}>
                    {(sec.items || []).map((item, idx) => (
                      <div key={item.id || idx} data-ghost-item={item.id || `${sec.id}-${idx}`} className="space-y-1 break-inside-avoid">
                        <div data-ghost-item-header="true">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-[13px] text-slate-900 dark:text-foreground">{item.title}</span>
                            {item.date && <span className="text-[11px] text-slate-500">{item.date}</span>}
                          </div>
                          {item.subtitle && (
                            <div className="text-[12px] text-slate-600 dark:text-muted-foreground">
                              {item.subtitle} {item.location ? `• ${item.location}` : ''}
                            </div>
                          )}
                        </div>
                        {item.description && <div className="text-[12px] text-slate-600 dark:text-muted-foreground">{item.description}</div>}
                        {item.highlights && item.highlights.length > 0 && (
                          <ResumeHighlights highlights={item.highlights} className="text-slate-700 text-[12px] pt-0.5" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // 25. Summary / Profile
    case 'summary': {
      const summaryText = data.personalInfo?.summary;
      if (!summaryText?.trim()) return null;
      return (
        <div key="summary" data-ghost-section="summary" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div data-ghost-item="summary-0" className="text-[12px] leading-relaxed text-slate-700">
            <RichText content={summaryText} />
          </div>
        </div>
      );
    }

    // 26. Experience
    case 'experience': {
      const expList = data.experience || [];
      if (expList.length === 0) return null;
      return (
        <div key="experience" data-ghost-section="experience" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {expList.map((exp) => (
              <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                <div data-ghost-item-header="true">
                  <div className={`flex ${isSidebar ? 'flex-col gap-0.5' : 'justify-between items-baseline'}`}>
                    <span className="font-bold text-[13px] text-slate-900">{exp.role}</span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={exp.highlights}
                    className="text-slate-700 pt-0.5 leading-relaxed text-[12px]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 27. Education
    case 'education': {
      const eduList = data.education || [];
      if (eduList.length === 0) return null;
      return (
        <div key="education" data-ghost-section="education" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {eduList.map((edu) => (
              <div key={edu.id} data-ghost-item={edu.id} className="space-y-1 break-inside-avoid">
                <div data-ghost-item-header="true">
                  <div className={`flex ${isSidebar ? 'flex-col gap-0.5' : 'justify-between items-baseline'}`}>
                    <span className="font-bold text-[13px] text-slate-900">{edu.degree}</span>
                    <span className="text-[11px] font-semibold text-slate-500">{edu.graduationDate}</span>
                  </div>
                  <div className="text-[12px] font-medium text-slate-700">
                    {edu.school} {edu.location ? `• ${edu.location}` : ''}
                  </div>
                  {edu.gpa && <div className="text-[11px] text-slate-500">GPA: {edu.gpa}</div>}
                </div>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={edu.highlights}
                    className="text-slate-700 pt-0.5 leading-relaxed text-[12px]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 28. Skills
    case 'skills': {
      const skillsList = (data.skills || []).filter((cat) => cat.enabled !== false);
      if (skillsList.length === 0) return null;
      return (
        <div key="skills" data-ghost-section="skills" className="space-y-2 break-inside-avoid">
          {renderHeader(sectionTitle, secId)}
          <div className="space-y-2.5">
            {skillsList.map((cat, idx) => (
              <div key={cat.id || idx} data-ghost-item={cat.id || `skill-${idx}`} className="space-y-1 break-inside-avoid">
                {cat.category && (
                  <div data-ghost-item-header="true" className="font-semibold text-slate-800 text-[11px]">
                    {cat.category}
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((item, sidx) => (
                    <span
                      key={sidx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 29. Projects
    case 'projects': {
      const projList = data.projects || [];
      if (projList.length === 0) return null;
      return (
        <div key="projects" data-ghost-section="projects" className="space-y-2">
          {renderHeader(sectionTitle, secId)}
          <div className={itemSpacingClass}>
            {projList.map((proj) => (
              <div key={proj.id} data-ghost-item={proj.id} className="space-y-1 break-inside-avoid">
                <div data-ghost-item-header="true">
                  <div className={`flex ${isSidebar ? 'flex-col gap-0.5' : 'justify-between items-baseline'}`}>
                    <span className="font-bold text-[13px] text-slate-900">
                      {proj.title}
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="font-normal text-slate-500 text-[11px]">
                          {' '}({proj.technologies.join(', ')})
                        </span>
                      )}
                    </span>
                    {proj.link && (
                      <span className="text-[11px] text-blue-600 truncate max-w-[200px]">
                        {proj.link}
                      </span>
                    )}
                  </div>
                </div>
                {proj.highlights && proj.highlights.length > 0 && (
                  <ResumeHighlights
                    highlights={proj.highlights}
                    className="text-slate-700 pt-0.5 leading-relaxed text-[12px]"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 30. Certifications
    case 'certifications': {
      const certList = data.certifications || [];
      if (certList.length === 0) return null;
      return (
        <div key="certifications" data-ghost-section="certifications" className="space-y-2 break-inside-avoid">
          {renderHeader(sectionTitle, secId)}
          <div className="space-y-2">
            {certList.map((cert) => (
              <div key={cert.id} data-ghost-item={cert.id} className="break-inside-avoid text-[12px]">
                <div data-ghost-item-header="true" className={`flex ${isSidebar ? 'flex-col gap-0.5' : 'justify-between items-baseline'}`}>
                  <span className="font-bold text-slate-900">{cert.name}</span>
                  {cert.date && <span className="text-[11px] text-slate-500">{cert.date}</span>}
                </div>
                {cert.issuer && <div className="text-[11px] text-slate-600">{cert.issuer}</div>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 31. Languages
    case 'languages': {
      const langList = data.languages || [];
      if (langList.length === 0) return null;
      return (
        <div key="languages" data-ghost-section="languages" className="space-y-2 break-inside-avoid">
          {renderHeader(sectionTitle, secId)}
          <div className="space-y-1.5 text-[12px]">
            {langList.map((lang, lidx) => (
              <div key={lang.id || lidx} data-ghost-item={lang.id || `lang-${lidx}`} className="flex justify-between items-baseline break-inside-avoid">
                <span className="font-semibold text-slate-800">{lang.language}</span>
                {lang.proficiency && <span className="text-[11px] text-slate-500">{lang.proficiency}</span>}
              </div>
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};

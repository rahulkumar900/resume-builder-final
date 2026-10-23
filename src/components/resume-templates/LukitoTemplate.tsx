'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/common/BrandIcons';
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

export const LukitoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#eab308',
    spacing = 'normal',
  } = data;

  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const headerPadding =
    spacing === 'compact' ? 'pb-3.5 mb-4' : spacing === 'relaxed' ? 'pb-6 mb-7' : 'pb-5 mb-5.5';
  const cardPadding =
    spacing === 'compact' ? 'p-3' : spacing === 'relaxed' ? 'p-5' : 'p-3.5';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div
            key="summary"
            data-ghost-section="summary"
            className={`bg-neutral-50 border-l-4 ${cardPadding} text-[13px] text-neutral-700 rounded-r break-inside-avoid`}
            style={{ borderColor: themeColor || '#eab308' }}
          >
            <div data-ghost-item="summary-0">
              <RichText content={personalInfo.summary} className="leading-relaxed" />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Work Experience
              </div>
            </div>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="relative pl-3.5 border-l-2 border-neutral-300 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-neutral-900 text-[15px]">{exp.role}</span>
                      <span className="text-[12px] font-mono text-neutral-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[13px] font-bold text-neutral-700 mb-2">
                      {exp.company} {exp.location ? `// ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-neutral-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Featured Projects
              </div>
            </div>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className={`border border-neutral-200 rounded-md ${cardPadding} break-inside-avoid`}>
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-neutral-900 text-[14px]">{p.title}</span>
                      {p.link && (
                        <span className="text-[11.5px] font-mono text-neutral-500">
                          {p.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {p.technologies && p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {p.technologies.map((t, i) => (
                          <span key={i} className="text-[10.5px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ResumeHighlights highlights={p.highlights} className="text-neutral-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Education
              </div>
            </div>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-neutral-900 text-[14px]">{edu.degree}</div>
                    <div className="text-neutral-700 font-medium">{edu.school}</div>
                    <div className="text-[12px] font-mono text-neutral-500 mt-0.5">
                      {edu.graduationDate} // {edu.location}
                    </div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-neutral-700 text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="break-inside-avoid">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Technical Stack
              </div>
            </div>
            <div className={itemSpaceClass}>
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((it, i) => (
                      <span
                        key={i}
                        className="bg-neutral-100 text-neutral-800 text-[12px] font-mono px-2 py-0.5 rounded border border-neutral-200"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className="break-inside-avoid">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Certifications
              </div>
            </div>
            <div className="space-y-2.5">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="text-[12.5px] bg-neutral-50 p-2.5 rounded border border-neutral-200 break-inside-avoid">
                  <div className="font-bold text-neutral-900">{c.name}</div>
                  <div className="text-[11px] font-mono text-neutral-500">{c.issuer} // {c.date}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="break-inside-avoid">
            <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
              <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
              <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                Languages
              </div>
            </div>
            <div className="space-y-1.5 text-[12.5px] font-mono">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between">
                  <span className="font-bold">{l.language}</span>
                  <span className="text-neutral-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <UniversalSectionRenderer
            key={secId}
            secId={secId}
            data={data}
            renderHeader={(title) => (
              <div data-ghost-section-title="true" className="flex items-center gap-2 mb-3.5 break-after-avoid">
                <span className="w-3 h-3 rounded-xs" style={{ backgroundColor: themeColor || '#eab308' }} />
                <div className="text-sm font-black uppercase tracking-wider text-neutral-900">
                  {title}
                </div>
              </div>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-neutral-900 font-sans ${paddingClass} text-[13px] leading-normal flex flex-col box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-3 border-b-2 border-neutral-900 mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-neutral-500 break-inside-avoid">
          <span>// {personalInfo.fullName || 'Candidate'}</span>
          <span>PAGE {data.pageNumber} OF {data.totalPages || 2}</span>
        </div>
      )}

      {/* Header Block (Page 1) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
        <div data-ghost-header="true" className={`flex justify-between items-start border-b-2 border-neutral-900 ${headerPadding} break-inside-avoid`}>
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-neutral-900 text-white font-mono text-[11px] font-bold tracking-widest uppercase mb-2">
              RESUME // PORTFOLIO
            </div>
            <div className="text-4xl font-black uppercase tracking-tight text-neutral-900 leading-tight">
              {personalInfo.fullName || 'Lukito Rahadian'}
            </div>
            <div className="text-base font-bold text-neutral-600 mt-1 font-mono">
              &gt; {personalInfo.jobTitle || 'Tech Lead & Senior Architect'}
            </div>
          </div>

          <div className="text-right text-[12px] font-mono text-neutral-600 space-y-1">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.email}</span>
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.phone}</span>
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.location}</span>
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center justify-end gap-1.5">
                <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Left Column (Main - 8 cols, or 12 cols if sidebar collapsed) */}
        <div
          data-ghost-col="main"
          className={`${hasSidebarContent ? 'col-span-8' : 'col-span-12'} ${sectionSpaceClass}`}
        >
          {mainOrder.map((secId) => renderSection(secId))}
        </div>

        {/* Right Column (Sidebar - 4 cols) */}
        {hasSidebarContent && (
          <div data-ghost-col="sidebar" className={`col-span-4 ${sectionSpaceClass}`}>
            {sidebarOrder.map((secId) => renderSection(secId))}
          </div>
        )}
      </div>
    </div>
  );
};

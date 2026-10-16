'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
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

export const SantosoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    themeColor = '#f59e0b',
    spacing = 'normal',
  } = data;

  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';
  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const headerPadding =
    spacing === 'compact' ? 'pb-4 mb-5' : spacing === 'relaxed' ? 'pb-7 mb-8' : 'pb-6 mb-7';
  const cardPadding =
    spacing === 'compact' ? 'p-3 rounded-lg' : spacing === 'relaxed' ? 'p-4.5 rounded-xl' : 'p-4 rounded-xl';
  const headingBottomMargin =
    spacing === 'compact' ? 'pb-1 mb-2.5' : spacing === 'relaxed' ? 'pb-2 mb-4.5' : 'pb-1.5 mb-3.5';

  const mainOrder = data.sectionOrder?.mainColumn || DEFAULT_MAIN_COLUMN_SECTIONS;
  const sidebarOrder = data.sectionOrder?.sidebarColumn || DEFAULT_SIDEBAR_COLUMN_SECTIONS;
  const hasSidebarContent = hasPageSidebarContent(data, sidebarOrder);

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className={`bg-white/95 backdrop-blur-xs ${cardPadding} shadow-xs border border-slate-100`}>
            <h2 data-ghost-section-title="true" className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2 break-after-avoid">
              Profile
            </h2>
            <div data-ghost-item="summary-0">
              <RichText content={personalInfo.summary} className="text-[13px] text-slate-700 leading-relaxed" />
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className={`bg-white/95 backdrop-blur-xs ${cardPadding} shadow-xs border border-slate-100 break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2.5 break-after-avoid">
              Education
            </h2>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="text-[13px] break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="font-bold text-slate-900 text-[14px]">{edu.degree}</div>
                    <div className="text-slate-700">{edu.school}</div>
                    <div className="text-[11.5px] text-slate-500 mt-0.5">{edu.graduationDate}</div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-700 text-[12px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className={`bg-white/95 backdrop-blur-xs ${cardPadding} shadow-xs border border-slate-100 break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2.5 break-after-avoid">
              Skills &amp; Tools
            </h2>
            <div className={itemSpaceClass}>
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="break-inside-avoid">
                  <div className="text-[11.5px] font-bold uppercase text-slate-500 mb-1">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((it, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-800 text-[12px] px-2.5 py-0.5 rounded font-medium"
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
          <div key="certifications" data-ghost-section="certifications" className={`bg-white/95 backdrop-blur-xs ${cardPadding} shadow-xs border border-slate-100 break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2.5 break-after-avoid">
              Certifications
            </h2>
            <div className="space-y-1.5 text-[12px]">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-slate-500 text-[11px]">{c.issuer} ({c.date})</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className={`bg-white/95 backdrop-blur-xs ${cardPadding} shadow-xs border border-slate-100 break-inside-avoid`}>
            <h2 data-ghost-section-title="true" className="text-sm font-black uppercase tracking-wider text-slate-900 mb-2 break-after-avoid">
              Languages
            </h2>
            <div className="space-y-1 text-[12px]">
              {languages.map((l) => (
                <div key={l.id} data-ghost-item={l.id} className="flex justify-between break-inside-avoid">
                  <span className="font-bold text-slate-800">{l.language}</span>
                  <span className="text-slate-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience">
            <h2 data-ghost-section-title="true" className={`text-sm font-black uppercase tracking-wider text-slate-900 ${headingBottomMargin} border-b-2 border-slate-900 break-after-avoid`}>
              Experience
            </h2>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-slate-900 text-[15px]">{exp.role}</span>
                      <span className="text-[12px] font-medium text-slate-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[13.5px] font-bold text-amber-800 mb-2">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-700 text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects">
            <h2 data-ghost-section-title="true" className={`text-sm font-black uppercase tracking-wider text-slate-900 ${headingBottomMargin} border-b-2 border-slate-900 break-after-avoid`}>
              Creative Projects
            </h2>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className={`${cardPadding} bg-slate-50 border border-slate-200 break-inside-avoid`}>
                  <div data-ghost-item-header="true" className="font-bold text-slate-900 text-[14px] mb-1">{p.title}</div>
                  <ResumeHighlights highlights={p.highlights} className="text-slate-700 text-[13px]" />
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
              <h2
                data-ghost-section-title="true"
                className={`text-sm font-black uppercase tracking-wider text-slate-900 ${headingBottomMargin} border-b-2 border-slate-900 break-after-avoid`}
              >
                {title}
              </h2>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-800 font-sans ${paddingClass} text-[13px] leading-normal relative overflow-hidden flex flex-col box-border`}>
      {/* Decorative Geometric Arc / Circle */}
      <div
        style={{
          background: `radial-gradient(circle, ${themeColor}15 0%, ${themeColor}00 70%)`,
        }}
        className="absolute top-28 -left-20 w-88 h-88 rounded-full opacity-90 pointer-events-none -z-0"
      />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Running Header */}
        {data.pageNumber && data.pageNumber > 1 && (
          <div className="border-b-2 border-slate-900 pb-3 mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 break-inside-avoid">
            <span>
              {personalInfo.fullName || 'Rudian Santoso'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
            </span>
            <span style={{ color: themeColor }}>{personalInfo.jobTitle}</span>
          </div>
        )}

        {/* Header (Page 1) */}
        {(!data.pageNumber || data.pageNumber === 1) && (
          <div data-ghost-header="true" className={`border-b-2 border-slate-900 ${headerPadding} break-inside-avoid`}>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
              {personalInfo.fullName || 'Rudian Santoso'}
            </h1>
            <div className="text-base font-bold text-amber-700 uppercase tracking-wider mt-1">
              {personalInfo.jobTitle || 'Product Designer & Art Director'}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-slate-600 mt-3 font-medium">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2-Column Split */}
        <div className="grid grid-cols-12 gap-10 flex-1">
          {/* Left Column (Sidebar) */}
          {hasSidebarContent && (
            <div data-ghost-col="sidebar" className={`col-span-4 ${sectionSpaceClass}`}>
              {sidebarOrder.map((secId) => renderSection(secId))}
            </div>
          )}

          {/* Right Column (Main) */}
          <div
            data-ghost-col="main"
            className={`${hasSidebarContent ? 'col-span-8' : 'col-span-12'} ${sectionSpaceClass}`}
          >
            {mainOrder.map((secId) => renderSection(secId))}
          </div>
        </div>
      </div>
    </div>
  );
};

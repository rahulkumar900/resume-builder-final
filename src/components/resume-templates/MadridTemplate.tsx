'use client';

import React from 'react';
import { ResumeData, ResumeSectionId } from '@/types/resume';
import { RichText } from '@/components/common/RichText';
import { ResumeHighlights } from '@/components/common/ResumeHighlights';
import { DEFAULT_SINGLE_COLUMN_SECTIONS } from '@/lib/templates';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedinIcon } from '@/components/common/BrandIcons';
import { UniversalSectionRenderer } from './common/UniversalSectionRenderer';

interface TemplateProps {
  data: ResumeData;
}

export const MadridTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages, themeColor = '#b91c1c', spacing = 'normal' } = data;

  const paddingClass =
    spacing === 'compact' ? 'p-7' : spacing === 'relaxed' ? 'p-11' : 'p-9';
  const sectionSpaceClass =
    spacing === 'compact' ? 'space-y-3.5' : spacing === 'relaxed' ? 'space-y-6.5' : 'space-y-5';
  const itemSpaceClass =
    spacing === 'compact' ? 'space-y-2' : spacing === 'relaxed' ? 'space-y-4' : 'space-y-3';

  const sectionOrder = data.sectionOrder?.singleColumn || DEFAULT_SINGLE_COLUMN_SECTIONS;

  const renderSection = (secId: ResumeSectionId) => {
    switch (secId) {
      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <div key="summary" data-ghost-section="summary" className="space-y-1.5">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Profile</span>
            </div>
            <div data-ghost-item="summary-0">
              <RichText
                content={personalInfo.summary}
                className="text-[13px] text-slate-800 leading-[20px] font-normal"
              />
            </div>
          </div>
        );
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" data-ghost-section="experience" className="space-y-2">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Employment History</span>
            </div>
            <div className={itemSpaceClass}>
              {experience.map((exp) => (
                <div key={exp.id} data-ghost-item={exp.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[14px] text-slate-900">
                        {exp.role} <span className="font-medium text-slate-700">at {exp.company}</span>
                      </span>
                      <span className="text-[12.5px] font-semibold text-slate-700 whitespace-nowrap">
                        {exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.location && <div className="text-[12.5px] text-slate-600">{exp.location}</div>}
                  </div>
                  <ResumeHighlights highlights={exp.highlights} className="text-slate-800 pt-0.5 leading-[20px] text-[13px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" data-ghost-section="education" className="space-y-2">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Education</span>
            </div>
            <div className={itemSpaceClass}>
              {education.map((edu) => (
                <div key={edu.id} data-ghost-item={edu.id} className="space-y-0.5 break-inside-avoid">
                  <div data-ghost-item-header="true">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[14px] text-slate-900">{edu.degree}</span>
                      <span className="text-[12.5px] font-semibold text-slate-700 whitespace-nowrap">{edu.graduationDate}</span>
                    </div>
                    <div className="text-[13px] text-slate-700">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                  </div>
                  {edu.highlights && <ResumeHighlights highlights={edu.highlights} className="text-slate-800 text-[13px] mt-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" data-ghost-section="skills" className="space-y-2">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Skills &amp; Competencies</span>
            </div>
            <div className="space-y-2">
              {skills.map((cat) => (
                <div key={cat.id} data-ghost-item={cat.id} className="space-y-1">
                  <div className="text-[12.5px] font-bold text-slate-800">{cat.category}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((it, i) => (
                      <span
                        key={i}
                        className="text-[12px] bg-slate-100 text-slate-800 font-medium px-2.5 py-0.5 rounded border border-slate-200/60"
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
      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" data-ghost-section="projects" className="space-y-2">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Projects</span>
            </div>
            <div className={itemSpaceClass}>
              {projects.map((p) => (
                <div key={p.id} data-ghost-item={p.id} className="space-y-1 break-inside-avoid">
                  <div data-ghost-item-header="true" className="flex justify-between items-baseline">
                    <span className="font-bold text-[14px] text-slate-900">{p.title}</span>
                    {p.link && (
                      <span className="text-[12px] text-blue-600">
                        {p.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  <ResumeHighlights highlights={p.highlights} className="text-slate-800 text-[13px] leading-[20px]" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        if (!certifications || certifications.length === 0) return null;
        return (
          <div key="certifications" data-ghost-section="certifications" className="space-y-2.5">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Certifications</span>
            </div>
            <div className="space-y-1 text-[13px] text-slate-800">
              {certifications.map((c) => (
                <div key={c.id} data-ghost-item={c.id} className="break-inside-avoid">
                  <span className="font-semibold text-slate-900">{c.name}</span> &mdash; {c.issuer} {c.date ? `(${c.date})` : ''}
                </div>
              ))}
            </div>
          </div>
        );
      case 'languages':
        if (!languages || languages.length === 0) return null;
        return (
          <div key="languages" data-ghost-section="languages" className="space-y-2">
            <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
              <span>Languages</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-800">
              {languages.map((l) => (
                <span key={l.id} data-ghost-item={l.id} className="break-inside-avoid">
                  <span className="font-semibold text-slate-900">{l.language}:</span> {l.proficiency}
                </span>
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
              <div data-ghost-section-title="true" className="text-[16px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-4.5 rounded-xs" style={{ backgroundColor: themeColor }} />
                <span>{title}</span>
              </div>
            )}
            itemSpacingClass={itemSpaceClass}
          />
        );
    }
  };

  return (
    <div className={`w-full h-full min-h-[297mm] bg-white text-slate-900 flex flex-col font-sans ${paddingClass} text-[13px] leading-normal box-border`}>
      {/* Running Header */}
      {data.pageNumber && data.pageNumber > 1 && (
        <div className="pb-3 border-b border-slate-200 mb-4 break-inside-avoid flex items-center justify-between text-[11.5px] text-slate-700 font-medium">
          <span>
            {personalInfo.fullName || 'Candidate'} &mdash; Page {data.pageNumber} of {data.totalPages || 2}
          </span>
          <span style={{ color: themeColor }}>{personalInfo.jobTitle}</span>
        </div>
      )}

      {/* Header Container (Page 1) */}
      {(!data.pageNumber || data.pageNumber === 1) && (
      <div data-ghost-header="true" className="border-b-2 border-slate-200 pb-4 break-inside-avoid">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[26px] font-black tracking-tight text-slate-900 uppercase">
              {personalInfo.fullName || 'Full Name'}
            </h1>
            {personalInfo.jobTitle && (
              <div data-ghost-role="true" className="text-[13.5px] font-bold mt-1" style={{ color: themeColor }}>
                {personalInfo.jobTitle}
              </div>
            )}
          </div>

          {personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName || 'Avatar'}
              className="w-22 h-22 object-cover rounded-xl border border-slate-200 shadow-2xs"
            />
          )}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-slate-700 pt-3 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-600" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <LinkedinIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
            </span>
          )}
        </div>
      </div>
      )}

      {/* Main Content Sections */}
      <div data-ghost-col="single" className={`pt-3.5 ${sectionSpaceClass} flex-1`}>
        {sectionOrder.map((secId) => renderSection(secId))}
      </div>
    </div>
  );
};

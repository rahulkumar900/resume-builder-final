import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTemplateComponent } from '@/lib/templates/registry';
import { RibbonTemplate } from '@/components/resume-templates/RibbonTemplate';
import { MarigoldTemplate } from '@/components/resume-templates/MarigoldTemplate';
import { StampTemplate } from '@/components/resume-templates/StampTemplate';
import { ResumeData } from '@/types/resume';
import { paginateResume } from '@/lib/pagination';

const mockResumeData: ResumeData = {
  id: 'test-resume',
  title: 'Test Resume',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'ribbon',
  themeColor: '#26235A',
  fontFamily: 'merriweather',
  spacing: 'normal',
  personalInfo: {
    fullName: 'Aarav Menon',
    jobTitle: 'Lead Product Designer',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    location: 'Kolkata, India',
    summary: 'Lead product designer who ships calm, usable software with 9 years of experience.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Lead Product Designer',
      company: 'Lumen Books',
      location: 'Bengaluru',
      startDate: 'Mar 2023',
      endDate: 'Present',
      current: true,
      highlights: ['Lead 6 designers across invoicing and payments.'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.Des, Interaction Design',
      school: 'Eastern Institute of Design',
      location: 'India',
      graduationDate: '2017',
    },
  ],
  skills: [
    {
      id: 'skills-1',
      category: 'Craft',
      items: ['User research', 'Interaction design', 'Prototyping'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Open keyboard guide',
      technologies: ['HTML', 'SVG'],
      highlights: ['Used by 12,000 students.'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Usability Analyst',
      issuer: 'HFI',
      date: '2021',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      proficiency: 'Fluent',
    },
  ],
};

describe('Kindley New Templates Registry & Rendering', () => {
  it('should correctly resolve registry components for ribbon, marigold, and stamp', () => {
    expect(getTemplateComponent('ribbon')).toBe(RibbonTemplate);
    expect(getTemplateComponent('marigold')).toBe(MarigoldTemplate);
    expect(getTemplateComponent('stamp')).toBe(StampTemplate);
  });

  it('should render RibbonTemplate with signature bookmark ribbon', () => {
    const html = renderToStaticMarkup(<RibbonTemplate data={mockResumeData} />);
    expect(html).toContain('Aarav Menon');
    expect(html).toContain('Lead Product Designer');
    expect(html).toContain('AM'); // Initials in ribbon
    expect(html).toContain('data-block="ribbon"');
    expect(html).toContain('data-ghost-header="true"');
    expect(html).toContain('data-ghost-col="single"');
  });

  it('should render MarigoldTemplate with signature pine header, ghost columns, and spark bullets', () => {
    const data: ResumeData = { ...mockResumeData, templateId: 'marigold', themeColor: '#17332E' };
    const html = renderToStaticMarkup(<MarigoldTemplate data={data} />);
    expect(html).toContain('Aarav Menon');
    expect(html).toContain('Work experience');
    expect(html).toContain('Core skills');
    expect(html).toContain('data-ghost-header="true"');
    expect(html).toContain('data-ghost-col="main"');
    expect(html).toContain('data-ghost-col="sidebar"');
  });

  it('should render StampTemplate with perforated stamp badge, ghost columns, and sections', () => {
    const data: ResumeData = {
      ...mockResumeData,
      templateId: 'stamp',
      themeColor: '#45214A',
      personalInfo: {
        ...mockResumeData.personalInfo,
        fullName: 'Meera Das',
      },
    };
    const html = renderToStaticMarkup(<StampTemplate data={data} />);
    expect(html).toContain('Meera Das');
    expect(html).toContain('MD'); // Initials in stamp badge
    expect(html).toContain('data-block="stamp"');
    expect(html).toContain('data-ghost-header="true"');
    expect(html).toContain('data-ghost-col="main"');
    expect(html).toContain('data-ghost-col="sidebar"');
    expect(html).toContain('Projects');
    expect(html).toContain('Technical skills');
    expect(html).toContain('Education');
  });

  it('should paginate MarigoldTemplate retaining experience, skills, and projects without dropping content', () => {
    const data: ResumeData = { ...mockResumeData, templateId: 'marigold' };
    const pages = paginateResume(data);
    expect(pages.length).toBeGreaterThanOrEqual(1);
    const p1 = pages[0];
    expect(p1.experience?.length).toBeGreaterThan(0);
    expect(p1.skills?.length).toBeGreaterThan(0);
    expect(p1.projects?.length).toBeGreaterThan(0);
    expect(p1.education?.length).toBeGreaterThan(0);
    expect(p1.certifications?.length).toBeGreaterThan(0);
  });

  it('should paginate StampTemplate retaining projects, experience, skills, and education', () => {
    const data: ResumeData = { ...mockResumeData, templateId: 'stamp' };
    const pages = paginateResume(data);
    expect(pages.length).toBeGreaterThanOrEqual(1);
    const p1 = pages[0];
    expect(p1.personalInfo.summary).toBeTruthy();
    expect(p1.projects?.length).toBeGreaterThan(0);
    expect(p1.skills?.length).toBeGreaterThan(0);
    expect(p1.experience?.length).toBeGreaterThan(0);
    expect(p1.education?.length).toBeGreaterThan(0);

    // Verify education renders in the HTML of the paginated page without raw HTML escaping
    const html = renderToStaticMarkup(<StampTemplate data={{
      ...p1,
      education: [
        {
          id: 'edu-test',
          degree: 'B.S. in Computer Science',
          school: 'Magadh University',
          location: 'Bodh Gaya, India',
          graduationDate: '2021',
          gpa: '9.8',
          highlights: ['<ul class="list-disc pl-5"><li><p>Relevant Coursework &amp; Projects</p></li></ul>'],
        },
      ],
    }} />);
    expect(html).toContain('Education');
    expect(html).toContain('B.S. in Computer Science');
    expect(html).toContain('Magadh University');
    expect(html).toContain('Relevant Coursework &amp; Projects');
    expect(html).not.toContain('&lt;ul');
    expect(html).not.toContain('&lt;li');
  });
});

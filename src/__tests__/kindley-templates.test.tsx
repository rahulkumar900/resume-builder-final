import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTemplateComponent } from '@/lib/templates/registry';
import { RibbonTemplate } from '@/components/resume-templates/RibbonTemplate';
import { MarigoldTemplate } from '@/components/resume-templates/MarigoldTemplate';
import { StampTemplate } from '@/components/resume-templates/StampTemplate';
import { CreativePortfolioTemplate } from '@/components/resume-templates/CreativePortfolioTemplate';
import { ExecutiveFinanceTemplate } from '@/components/resume-templates/ExecutiveFinanceTemplate';
import { InfrastructureEngineerTemplate } from '@/components/resume-templates/InfrastructureEngineerTemplate';
import { NeonCreativeTemplate } from '@/components/resume-templates/NeonCreativeTemplate';
import { ResumeData } from '@/types/resume';
import { paginateResume } from '@/lib/pagination';
import { sanitizeSkillsForRender } from '@/lib/templates/skills-sanitizer';

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

  it('should render GovTraditionalTemplate with CURRICULUM VITAE, table qualifications, and declaration', () => {
    const Component = getTemplateComponent('gov_traditional');
    const data: ResumeData = {
      ...mockResumeData,
      templateId: 'gov_traditional',
      personalInfo: {
        ...mockResumeData.personalInfo,
        fullName: 'Suresh Kumar Yadav',
        jobTitle: 'Senior Assistant (Accounts)',
      },
    };
    const html = renderToStaticMarkup(<Component data={data} />);
    expect(html).toContain('CURRICULUM VITAE');
    expect(html).toContain('Suresh Kumar Yadav');
    expect(html).toContain('Senior Assistant (Accounts)');
    expect(html).toContain('Educational Qualifications');
    expect(html).toContain('Qualification');
    expect(html).toContain('Board / University');
    // Declaration is not added by default unless populated
    expect(html).not.toContain('I hereby declare that the above information is true');

    // Verify custom sectionOrder is strictly respected without hardcoding
    const customOrderData: ResumeData = {
      ...data,
      sectionOrder: {
        singleColumn: ['education', 'skills', 'experience', 'summary'],
      },
    };
    const customHtml = renderToStaticMarkup(<Component data={customOrderData} />);
    const eduIdx = customHtml.indexOf('Educational Qualifications');
    const skillsIdx = customHtml.indexOf('Skills');
    const expIdx = customHtml.indexOf('Work Experience');
    const summaryIdx = customHtml.indexOf('Career Objective');
    expect(eduIdx).toBeLessThan(skillsIdx);
    expect(skillsIdx).toBeLessThan(expIdx);
    expect(expIdx).toBeLessThan(summaryIdx);

    // Verify declaration only renders on the last page and NOT on page 1 of multi-page resumes when populated
    const baseWithDeclaration: ResumeData = {
      ...data,
      sectionOrder: {
        singleColumn: ['education', 'skills', 'experience', 'summary', 'declaration'],
      },
      declaration: {
        text: 'I hereby declare that the above information is true to the best of my knowledge.',
        place: 'Kolkata, India',
        date: '2026-11-03',
        signatureName: 'Suresh Kumar Yadav',
      },
    };

    const page1Data: ResumeData = {
      ...baseWithDeclaration,
      pageNumber: 1,
      totalPages: 2,
    };
    const page1Html = renderToStaticMarkup(<Component data={page1Data} />);
    expect(page1Html).not.toContain('I hereby declare that the above information is true');

    const page2Data: ResumeData = {
      ...baseWithDeclaration,
      pageNumber: 2,
      totalPages: 2,
    };
    const page2Html = renderToStaticMarkup(<Component data={page2Data} />);
    expect(page2Html).toContain('I hereby declare that the above information is true');
    expect(page2Html).toContain('Signature');
  });

  it('should render EditorialHrTemplate with left-rail sections, impact cards, and dynamic order', () => {
    const Component = getTemplateComponent('editorial_hr');
    const data: ResumeData = {
      ...mockResumeData,
      templateId: 'editorial_hr',
      personalInfo: {
        ...mockResumeData.personalInfo,
        fullName: 'Pooja Menon',
        jobTitle: 'HR Business Partner',
      },
      achievements: [
        { id: 'imp-1', title: '31%', description: 'lower 90-day attrition' },
        { id: 'imp-2', title: '29 days', description: 'avg. time to hire' },
        { id: 'imp-3', title: '400+', description: 'hires made' },
      ],
    };
    const html = renderToStaticMarkup(<Component data={data} />);
    expect(html).toContain('Pooja Menon');
    expect(html).toContain('HR Business Partner');
    expect(html).toContain('Profile');
    expect(html).toContain('Impact');
    expect(html).toContain('31%');
    expect(html).toContain('lower 90-day attrition');
    expect(html).toContain('29 days');
    expect(html).toContain('400+');
    expect(html).toContain('Career');
    expect(html).toContain('Education');
    expect(html).toContain('Skills');

    // Verify dynamic ordering
    const customOrderData: ResumeData = {
      ...data,
      sectionOrder: {
        singleColumn: ['education', 'skills', 'experience', 'summary'],
      },
    };
    const customHtml = renderToStaticMarkup(<Component data={customOrderData} />);
    const eduIdx = customHtml.indexOf('Education');
    const skillsIdx = customHtml.indexOf('Skills');
    const expIdx = customHtml.indexOf('Career');
    const profileIdx = customHtml.indexOf('Profile');
    expect(eduIdx).toBeLessThan(skillsIdx);
    expect(skillsIdx).toBeLessThan(expIdx);
    expect(expIdx).toBeLessThan(profileIdx);

    const poojaData: ResumeData = {
      ...data,
      personalInfo: {
        fullName: 'Pooja Menon',
        jobTitle: 'HR Business Partner',
        email: 'pooja.menon@example.com',
        phone: '+91 98480 33422',
        location: 'Hyderabad, India',
        linkedin: 'linkedin.com/in/poojamenon',
        summary: 'People leader with 10 years across talent acquisition, employee relations and performance management. I build cultures where people stay, grow and do their best work.',
      },
      achievements: [
        { id: 'imp-1', title: '31%', description: 'lower 90-day attrition' },
        { id: 'imp-2', title: '29 days', description: 'avg. time to hire' },
        { id: 'imp-3', title: '400+', description: 'hires made' },
      ],
      experience: [
        {
          id: 'exp-1',
          role: 'HR Business Partner',
          company: 'Techwave Solutions',
          location: '',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          highlights: [
            'Partner with 6 business heads across 1,200 employees.',
            'Redesigned onboarding, cutting 90-day attrition by 31%.',
            'Rolled out a performance framework adopted company-wide.',
          ],
        },
        {
          id: 'exp-2',
          role: 'Talent Acquisition Lead',
          company: 'Hirely India',
          location: '',
          startDate: '2016',
          endDate: '2020',
          current: false,
          highlights: [
            'Closed 400+ hires across tech and sales roles.',
            'Reduced time-to-hire from 45 to 29 days.',
          ],
        },
        {
          id: 'exp-3',
          role: 'HR Executive',
          company: 'Bharat Retail',
          location: '',
          startDate: '2014',
          endDate: '2016',
          current: false,
          highlights: ['Managed payroll and compliance for 600 employees.'],
        },
      ],
      projects: [
        { id: 'p-1', title: 'Culture Pulse', technologies: [], highlights: ['Quarterly engagement survey with 88% participation.'] },
        { id: 'p-2', title: 'Campus Connect', technologies: [], highlights: ['Hired 120 graduates from 15 colleges.'] },
        { id: 'p-3', title: 'Women in Tech', technologies: [], highlights: ['Mentoring programme for 80 women leaders.'] },
      ],
      education: [
        { id: 'edu-1', degree: 'MBA, Human Resources', school: 'XLRI Jamshedpur', location: '', graduationDate: '2012 – 2014' },
        { id: 'edu-2', degree: 'B.A., Psychology', school: 'Osmania University', location: '', graduationDate: '2009 – 2012' },
      ],
      skillsConfig: { enableGrouping: true },
      skills: [
        { id: 's-1', category: 'Core', items: ['Talent acquisition', 'Employee relations', 'Performance management', 'HRIS (Workday)', 'Labour law', 'Compensation design', 'Coaching', 'L&D'] },
      ],
      certifications: [
        { id: 'c-1', name: 'SHRM-CP', issuer: 'SHRM', date: '2019' },
        { id: 'c-2', name: 'Certified POSH Trainer', issuer: 'Internal', date: '2021' },
      ],
      awards: [
        { id: 'a-1', title: 'HR Leader of the Year, Hyderabad', issuer: 'HR Association', date: '2023' },
        { id: 'a-2', title: 'Employer Brand Award, SHRM India', issuer: 'SHRM India', date: '2022' },
      ],
    };

    const pages = paginateResume(poojaData);
    expect(pages.length).toBe(1);
    expect(pages[0].experience?.length).toBe(3);
    expect(pages[0].projects?.length).toBe(3);
    expect(pages[0].education?.length).toBe(2);
    expect(pages[0].achievements?.length).toBe(3);
  });

  it('should resolve and render CreativePortfolioTemplate with coral badge, space grotesk font, and colorblock sidebar', () => {
    expect(getTemplateComponent('creative_portfolio')).toBe(CreativePortfolioTemplate);

    const taraData: ResumeData = {
      ...mockResumeData,
      templateId: 'creative_portfolio',
      personalInfo: {
        fullName: 'Tara Banerjee',
        jobTitle: 'Photographer & Visual Storyteller',
        email: 'tara@banerjee.studio',
        phone: '+91 98301 23456',
        location: 'Kolkata, India',
        summary: 'Visual storyteller documenting unseen subcultures across South Asia. Works exhibited at Serendipity Arts Festival and published in National Geographic Traveller.',
      },
      skillsConfig: { enableGrouping: true },
      skills: [
        { id: 's-1', category: 'Creative', items: ['Editorial photography', 'Darkroom printing', 'Visual research', 'Curation'] },
      ],
      projects: [
        { id: 'p-1', title: 'The Clay Makers of Kumartuli', technologies: [], highlights: ['Photo essay on idol makers.'] },
      ],
      education: [
        { id: 'edu-1', degree: 'B.A. in Visual Arts', school: 'Government College of Art & Craft', location: 'Kolkata', graduationDate: '2016 – 2020' },
      ],
      awards: [
        { id: 'a-1', title: 'National Geographic Grant', issuer: 'National Geographic', date: '2022' },
      ],
    };

    const html = renderToStaticMarkup(<CreativePortfolioTemplate data={taraData} />);
    expect(html).toContain('Tara Banerjee');
    expect(html).toContain('Photographer &amp; Visual Storyteller');
    expect(html).toContain('Visual storyteller documenting unseen subcultures');
    expect(html).toContain('The Clay Makers of Kumartuli');
    expect(html).toContain('Government College of Art &amp; Craft');
    expect(html).toContain('data-ghost-header="true"');
    expect(html).toContain('data-ghost-col="main"');
    expect(html).toContain('data-ghost-col="sidebar"');
  });

  it('should resolve and render ExecutiveFinanceTemplate with Manrope font, signature crimson dot, and split-rail sections', () => {
    expect(getTemplateComponent('executive_finance')).toBe(ExecutiveFinanceTemplate);

    const vikramData: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      fontFamily: 'manrope',
      themeColor: '#e63946',
      personalInfo: {
        fullName: 'Vikram Nair',
        jobTitle: 'SENIOR FINANCE MANAGER · CA',
        email: 'vikram.nair@example.com',
        phone: '+91 98100 44556',
        location: 'New Delhi, India',
        linkedin: 'linkedin.com/in/vikramnair',
        summary: 'Chartered Accountant with 12 years across audit, FP&A and corporate finance. Skilled at turning numbers into decisions, improving controls and leading finance transformation with zero audit qualifications.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Senior Finance Manager',
          company: 'Arthaveda Capital',
          location: 'Delhi',
          startDate: '2020',
          endDate: 'Present',
          current: true,
          highlights: [
            'Lead budgeting and forecasting for a ₹120Cr business unit.',
            'Cut operating costs by 18% by renegotiating vendor contracts.',
            'Led IndAS migration with no audit qualifications.',
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'ERP finance transformation',
          technologies: [],
          highlights: ['Reduced month-end close from 12 days to 6.'],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Chartered Accountancy',
          school: 'ICAI',
          location: '',
          graduationDate: '2010 – 2013',
        },
      ],
      skillsConfig: { enableGrouping: true },
      skills: [
        {
          id: 'sk-1',
          category: 'Core',
          items: ['Financial modelling', 'FP&A', 'IndAS and IFRS', 'M&A diligence', 'Treasury', 'Excel and VBA', 'SAP and Tally', 'Board reporting'],
        },
      ],
      awards: [
        {
          id: 'aw-1',
          title: 'Chartered Accountant, ICAI',
          issuer: 'ICAI',
          date: '2013',
        },
      ],
      volunteer: [
        {
          id: 'vol-1',
          role: 'Pro Bono Financial Advisor',
          organization: 'Youth Uplift Trust',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          highlights: ['Advise on financial compliance.'],
        },
      ],
      customSections: [
        {
          id: 'cs-1',
          title: 'Special Initiatives',
          items: [
            {
              id: 'cs-item-1',
              title: 'Advisory Board Member',
              subtitle: 'Delhi Finance Forum',
              date: '2023',
              description: 'Quarterly keynote speaker.',
            },
          ],
        },
      ],
    };

    const html = renderToStaticMarkup(<ExecutiveFinanceTemplate data={vikramData} />);
    expect(html).toContain('Vikram Nair');
    expect(html).toContain('SENIOR FINANCE MANAGER · CA');
    expect(html).toContain('Chartered Accountant with 12 years across audit');
    expect(html).toContain('Arthaveda Capital, Delhi');
    expect(html).toContain('ERP finance transformation');
    expect(html).toContain('Chartered Accountancy');
    expect(html).toContain('Pro Bono Financial Advisor');
    expect(html).toContain('SPECIAL INITIATIVES');
    expect(html).toContain('font-manrope');
    expect(html).toContain('data-ghost-header="true"');
    expect(html).toContain('data-ghost-col="single"');
    expect(html).toContain('data-ghost-section-title="true"');

    const pages = paginateResume(vikramData);
    expect(pages.length).toBe(1);

    // Verify Declaration is NOT rendered by default
    expect(html).not.toContain('DECLARATION');
  });

  it('renders Declaration section ONLY when explicitly configured and populated', () => {
    const dataWithDeclaration: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'declaration'],
      },
      declaration: {
        text: 'I hereby solemnly affirm that the statements made above are true and complete.',
        place: 'Mumbai',
        date: '2026-11-03',
        signatureName: 'Vikram Nair',
      },
    };

    const html = renderToStaticMarkup(<ExecutiveFinanceTemplate data={dataWithDeclaration} />);
    expect(html).toContain('DECLARATION');
    expect(html).toContain('I hereby solemnly affirm');
    expect(html).toContain('Place: Mumbai');
    expect(html).toContain('Date: 2026-11-03');
    expect(html).toContain('Vikram Nair');
  });

  it('does NOT render Declaration section when declaration object has empty text and fields', () => {
    const dataWithEmptyDeclaration: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      sectionOrder: {
        singleColumn: ['summary', 'experience', 'declaration'],
      },
      declaration: {
        text: '',
        place: '',
        date: '',
        signatureName: '',
      },
    };

    const html = renderToStaticMarkup(<ExecutiveFinanceTemplate data={dataWithEmptyDeclaration} />);
    expect(html).not.toContain('DECLARATION');
  });

  it('correctly applies customized font families to ExecutiveFinanceTemplate', () => {
    const robotoData: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      fontFamily: 'roboto',
    };
    const robotoHtml = renderToStaticMarkup(<ExecutiveFinanceTemplate data={robotoData} />);
    expect(robotoHtml).toContain('font-roboto');
    expect(robotoHtml).not.toContain('font-manrope');

    const garamondData: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      fontFamily: 'garamond',
    };
    const garamondHtml = renderToStaticMarkup(<ExecutiveFinanceTemplate data={garamondData} />);
    expect(garamondHtml).toContain('font-garamond');
    expect(garamondHtml).not.toContain('font-manrope');

    const spaceData: ResumeData = {
      ...mockResumeData,
      templateId: 'executive_finance',
      fontFamily: 'space_grotesk',
    };
    const spaceHtml = renderToStaticMarkup(<ExecutiveFinanceTemplate data={spaceData} />);
    expect(spaceHtml).toContain('font-spacegrotesk');
    expect(spaceHtml).not.toContain('font-manrope');
  });

  it('should resolve and render InfrastructureEngineerTemplate with dark monolith sidebar, amber bar, and engineering sections', () => {
    expect(getTemplateComponent('infrastructure_engineer')).toBe(InfrastructureEngineerTemplate);

    const adityaData: ResumeData = {
      ...mockResumeData,
      templateId: 'infrastructure_engineer',
      themeColor: '#f59e0b',
      personalInfo: {
        fullName: 'Aditya Menon',
        jobTitle: 'SENIOR CIVIL ENGINEER · M.TECH, CENG',
        email: 'aditya.menon@example.com',
        phone: '+91 98470 11200',
        location: 'Kochi, India',
        linkedin: 'linkedin.com/in/adityamenon',
        summary:
          'Structural and civil engineer with 12 years delivering metro, bridge and high-rise projects on time and within budget. Strong in BIM-led planning, quality assurance and site safety.',
      },
      experience: [
        {
          id: 'exp-1',
          role: 'Senior Civil Engineer',
          company: 'L&T Construction, Kochi',
          location: '',
          startDate: '2019',
          endDate: 'Present',
          current: true,
          highlights: [
            'Supervised an ₹85Cr metro viaduct package, delivered 2 months early.',
            'Cut material waste by 12% through BIM-based planning.',
            'Managed 60 site staff with zero lost-time incidents in 3 years.',
          ],
        },
        {
          id: 'exp-2',
          role: 'Site Engineer',
          company: 'Shapoorji Pallonji',
          location: '',
          startDate: '2015',
          endDate: '2019',
          current: false,
          highlights: [
            'Executed structural works for 4 residential towers.',
            'Introduced quality checks that cut rework by 20%.',
          ],
        },
        {
          id: 'exp-3',
          role: 'Graduate Trainee',
          company: 'PWD Kerala',
          location: '',
          startDate: '2013',
          endDate: '2015',
          current: false,
          highlights: ['Prepared estimates and drawings for 10 rural road projects.'],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Kochi Metro Viaduct',
          subtitle: '',
          technologies: [],
          description: '2.4 km elevated section with 112 piers.',
          period: '2022',
        } as any,
        {
          id: 'proj-2',
          title: 'Smart Bridge Retrofit',
          subtitle: '',
          technologies: [],
          description: 'Strengthened a 40-year-old bridge without closing traffic.',
          period: '2020',
        } as any,
        {
          id: 'proj-3',
          title: 'Green Tower, Edappally',
          subtitle: '',
          technologies: [],
          description: 'IGBC Gold rated 22-storey residential tower.',
          period: '2018',
        } as any,
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'M.Tech, Structural Engineering',
          school: 'NIT Calicut',
          location: '',
          graduationDate: '2011 – 2013',
        },
        {
          id: 'edu-2',
          degree: 'B.Tech, Civil Engineering',
          school: 'CET Trivandrum',
          location: '',
          graduationDate: '2007 – 2011',
        },
      ],
      skillsConfig: { enableGrouping: true },
      skills: [
        {
          id: 'sk-1',
          category: 'Core Engineering',
          items: ['Structural design', 'STAAD.Pro', 'AutoCAD', 'Revit and BIM', 'Project planning'],
        },
      ],
    };

    const html = renderToStaticMarkup(<InfrastructureEngineerTemplate data={adityaData} />);
    expect(html).toContain('Aditya Menon');
    expect(html).toContain('SENIOR CIVIL ENGINEER · M.TECH, CENG');
    expect(html).toContain('writing-mode:vertical-rl');
    expect(html).toContain('Structural and civil engineer with 12 years delivering metro');
    expect(html).toContain('Senior Civil Engineer');
    expect(html).toContain('L&amp;T Construction, Kochi');
    expect(html).toContain('Supervised an ₹85Cr metro viaduct package');
    expect(html).toContain('Kochi Metro Viaduct');
    expect(html).toContain('2.4 km elevated section with 112 piers');
    expect(html).toContain('M.Tech, Structural Engineering');
    expect(html).toContain('NIT Calicut');
    expect(html).toContain('Structural design');
    expect(html).toContain('STAAD.Pro');
    expect(html).toContain('data-ghost-col="single"');
    expect(html).toContain('data-ghost-section="experience"');
    expect(html).toContain('data-ghost-section="projects"');
    expect(html).toContain('data-ghost-section="education"');

    // Verify Declaration is NOT rendered by default
    expect(html).not.toContain('DECLARATION');

    // Verify pagination fits 1 page comfortably for this content
    const pages = paginateResume(adityaData);
    expect(pages.length).toBe(1);
  });

  it('should render NeonCreativeTemplate with categorized skills, progress bars, and Ghost DOM category attributes', () => {
    expect(getTemplateComponent('neon_creative')).toBe(NeonCreativeTemplate);

    const neonData: ResumeData = {
      ...mockResumeData,
      templateId: 'neon_creative',
      skillsConfig: { enableGrouping: true },
      skills: [
        {
          id: 'cat-core',
          category: 'Core Competencies',
          items: ['TypeScript', 'React', 'Next.js'],
          levels: { TypeScript: 'expert', React: 'proficient' },
        },
        {
          id: 'cat-tools',
          category: 'Tools & Platforms',
          items: ['Docker', 'Kubernetes'],
          levels: { Docker: 'intermediate' },
        },
      ],
    };

    const html = renderToStaticMarkup(<NeonCreativeTemplate data={neonData} />);
    expect(html).toContain('Core Skills');
    expect(html).toContain('Core Competencies');
    expect(html).toContain('Tools &amp; Platforms');
    expect(html).toContain('TypeScript');
    expect(html).toContain('Docker');
    expect(html).toContain('data-ghost-item="cat-core"');
    expect(html).toContain('data-ghost-item="cat-tools"');
    expect(html).toContain('data-ghost-bullet="0"');
    // Ensure declaration is not shown by default
    expect(html).not.toContain('Declaration');
  });

  it('should paginate NeonCreativeTemplate cleanly and not duplicate skills across pages', () => {
    const fullNeonData: ResumeData = {
      ...mockResumeData,
      templateId: 'neon_creative',
      experience: [
        {
          id: 'exp-1',
          role: 'Full Stack Engineer',
          company: 'Company Name',
          location: 'San Francisco, CA',
          startDate: 'Jan 2022',
          endDate: 'Present',
          current: true,
          highlights: [
            'Architected scalable web applications using React and TypeScript, reducing client-side bundle size by 32% and enhancing Core Web Vital.',
            'Engineered and integrated RESTful APIs with automated test suites in Just and Playwright, boosting code coverage to 90% and cutting regression bugs by 40%.',
            'Spearheaded cross-functional delivery on AWS cloud infrastructure, driving 99.9% uptime and accelerating feature release cycles by 25%.',
          ],
        },
        {
          id: 'exp-2',
          role: 'Frontend Developer',
          company: 'Stripe',
          location: 'San Francisco, CA',
          startDate: 'Jan 2023',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded frontend migration to Next.js App Router and TypeScript, reducing initial load latency by 62% and improving Lighthouse Core Web Vitals to 98.',
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'Full Stack Engineer Portfolio Project',
          technologies: ['React', 'TypeScript'],
          highlights: [
            'Engineered high-performance end-to-end solution with modern architecture.',
            'Engineered Full Stack Engineer Portfolio Project utilizing Core Stack, tools, scaling system throughput to support thousands of active users with sub-100ms response times.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelore of Engineering',
          school: 'Anna Universiry , Chennai',
          location: 'Chennai',
          graduationDate: 'may 2017',
          gpa: '6.2',
        },
        {
          id: 'edu-2',
          degree: 'Intermediate',
          school: 'Magadh University, Chandi',
          location: 'Bihar',
          graduationDate: '2013',
          gpa: '90%',
        },
      ],
      skillsConfig: { enableGrouping: true },
      skills: [
        {
          id: 'cat-1',
          category: 'CORE COMPETENCIES & LANGUAGES',
          items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'REST & GraphQL APIs', 'Data Structures'],
        },
        {
          id: 'cat-2',
          category: 'FRAMEWORKS, TOOLS & PLATFORMS',
          items: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git / CI/CD'],
        },
        {
          id: 'cat-3',
          category: 'METHODOLOGIES & PROFESSIONAL SKILLS',
          items: ['Agile / Scrum', 'System Design'],
        },
      ],
    };

    const sanitized = sanitizeSkillsForRender(fullNeonData);
    const pages = paginateResume(sanitized);
    // Page 1 should contain skills, and if Page 2 exists, skills must not duplicate
    expect(pages[0].skills?.length).toBeGreaterThan(0);
    if (pages.length > 1) {
      expect(pages[1].skills?.length ?? 0).toBe(0);
    }
  });
});

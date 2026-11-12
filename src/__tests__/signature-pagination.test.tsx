import { describe, it, expect } from 'vitest';
import { paginateResume } from '@/lib/pagination';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTemplateComponent } from '@/lib/templates/registry';
import { ResumeData } from '@/types/resume';

const bigResume: ResumeData = {
  id: 'test',
  title: 'Test',
  status: 'completed',
  updatedAt: 'Just now',
  templateId: 'marginalia',
  themeColor: '#0F766E',
  fontFamily: 'manrope',
  personalInfo: {
    fullName: 'Aarav Mehta',
    jobTitle: 'Senior Product Designer',
    email: 'aarav@example.com',
    phone: '123',
    location: 'India',
    summary: 'Product designer with 8+ years shipping consumer fintech products. I turn messy problems into simple, accessible flows.',
  },
  experience: [
    { id: '1', role: 'Role 1', company: 'Co 1', location: 'L1', startDate: '2021', endDate: 'Present', current: true, highlights: ['H1: did something big with 63% boost', 'H2: did another thing'] },
    { id: '2', role: 'Role 2', company: 'Co 2', location: 'L2', startDate: '2018', endDate: '2021', current: false, highlights: ['H3: did something else', 'H4: 60+ usability testing'] },
    { id: '3', role: 'Role 3', company: 'Co 3', location: 'L3', startDate: '2016', endDate: '2018', current: false, highlights: ['H5: older job'] },
    { id: '4', role: 'Role 4', company: 'Co 4', location: 'L4', startDate: '2014', endDate: '2016', current: false, highlights: ['H6: even older job'] },
  ],
  education: [
    { id: 'edu1', degree: 'B.Des', school: 'IIT Guwahati', location: 'India', graduationDate: '2016' },
    { id: 'edu2', degree: 'HS', school: 'School', location: 'India', graduationDate: '2012' },
  ],
  skills: [{ id: 's1', category: 'Design', items: ['Figma', 'Research', 'Systems', 'Prototyping', 'Testing'] }],
  projects: [
    { id: 'p1', title: 'Rupee Pay', technologies: ['Figma'], highlights: ['Rebuilt flow'] },
    { id: 'p2', title: 'Bhasha', technologies: ['React'], highlights: ['Concept'] },
    { id: 'p3', title: 'Open Kit', technologies: ['Kit'], highlights: ['Kit 400'] },
  ],
  certifications: [{ id: 'c1', name: 'Cert 1', issuer: 'Issuer 1', date: '2022' }],
  awards: [{ id: 'a1', title: 'Award 1', issuer: 'Issuer 1', date: '2023' }],
  languages: [
    { id: 'l1', language: 'English', proficiency: 'Fluent' },
    { id: 'l2', language: 'Hindi', proficiency: 'Native' },
  ],
};

describe('Signature templates pagination', () => {
  const templates = ['marginalia', 'dossier', 'career_gantt', 'monogram', 'binder_tabs', 'competency_radar'] as const;

  for (const t of templates) {
    it(`renders all pages for template ${t} without repeating header on page 2`, () => {
      const pages = paginateResume({ ...bigResume, templateId: t });
      expect(pages.length).toBeGreaterThanOrEqual(2);

      const Component = getTemplateComponent(t);

      // Page 1
      const p1Html = renderToStaticMarkup(<Component data={pages[0]} />);
      expect(p1Html).toContain('data-ghost-header="true"');

      // Page 2+
      for (let i = 1; i < pages.length; i++) {
        const p2Html = renderToStaticMarkup(<Component data={pages[i]} />);
        // Must NOT repeat full header
        expect(p2Html).not.toContain('data-ghost-header="true"');
        // Must contain running header or candidate name
        expect(p2Html).toContain('Aarav Mehta');
        // Must have ghost col
        const hasGhostCol = p2Html.includes('data-ghost-col="single"') || p2Html.includes('data-ghost-col="main"');
        expect(hasGhostCol).toBe(true);
      }
    });
  }

  it('renders consecutive section numbers across pages in numbered (Ledger) template without resetting to 01', () => {
    const pages = paginateResume({ ...bigResume, templateId: 'numbered' });
    expect(pages.length).toBeGreaterThanOrEqual(2);

    const Component = getTemplateComponent('numbered');
    const p1Html = renderToStaticMarkup(<Component data={pages[0]} />);
    const p2Html = renderToStaticMarkup(<Component data={pages[1]} />);

    // Page 1 should start with 01
    expect(p1Html).toContain('>01<');

    // Page 2 must NOT start with 01
    expect(p2Html).not.toContain('>01<');

    // Check that sectionNumberMap exists and has continuous numbers
    expect(pages[0].sectionNumberMap).toBeDefined();
    expect(pages[1].sectionNumberMap).toBeDefined();
    expect(pages[1].sectionNumberMap).toEqual(pages[0].sectionNumberMap);

    // Page 2 first section should have its number >= 04
    const p2FirstSectionId = pages[1].sectionOrder?.singleColumn?.[0];
    expect(p2FirstSectionId).toBeDefined();
    const p2FirstNum = pages[1].sectionNumberMap?.[p2FirstSectionId!];
    expect(p2FirstNum).toBeGreaterThanOrEqual(3);
    const formatted = String(p2FirstNum).padStart(2, '0');
    expect(p2Html).toContain(`>${formatted}<`);
  });

  it('correctly skips empty sections and maintains continuous numbering for Rahul Kumar resume in Ledger template', () => {
    const rahulResume: ResumeData = {
      ...bigResume,
      id: 'rahul',
      title: 'Rahul Kumar Resume',
      templateId: 'numbered',
      personalInfo: {
        fullName: 'Rahul Kumar',
        jobTitle: 'Frontend Developer',
        email: 'rahul.kumar@nalandaengicon.com',
        phone: '63254255',
        location: 'Patna',
        linkedin: 'linkdin/rahul',
        github: 'github/rahul',
        summary: 'Frontend Developer with a proven track record delivering high-availability applications using React, TypeScript, Testing. Hashing workflow latencies and driving engineering velocity through clean architecture, automated testing, and cloud-native solutions, scaling reliable system performance for 20,000+ active users.',
      },
      experience: [
        {
          id: 'exp1',
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
          id: 'exp2',
          role: 'Frontend Developer',
          company: 'Stripe',
          location: 'Sansfranciko',
          startDate: 'Jan 2023',
          endDate: 'Present',
          current: true,
          highlights: [
            'Spearheaded frontend migration to Next.js App Router and TypeScript, reducing initial load latency by 62% and improving Lighthouse Core Web Vitals to 98.',
            'Spearheaded frontend migration to Next.js App Router and TypeScript, reducing initial load latency by 62% and improving Lighthouse Core Web Vitals to 98.',
          ],
        },
      ],
      leadership: [], // empty
      projects: [
        {
          id: 'proj1',
          title: 'Full Stack Engineer Portfolio Project',
          technologies: ['Core Stack', 'Tools'],
          highlights: [
            'Engineered high-performance end-to-end solution with modern architecture.',
            'Engineered Full Stack Engineer Portfolio Project utilizing Core Stack, Tools, scaling system throughput to support thousands of active users with sub-100ms response times.',
          ],
        },
        {
          id: 'proj2',
          title: 'Ai workflow Engine',
          technologies: [],
          highlights: [
            'Engineered responsive client architecture with server-side rendering and static optimization, cutting initial page',
            'Architected and deployed production full-stack application using Next.js, TypeSc',
          ],
        },
      ],
      education: [
        {
          id: 'edu1',
          degree: 'Bachelore of Engineering',
          school: 'Anna Universiry , Chennai',
          location: 'Chennai',
          gpa: '6.2',
          graduationDate: 'may 2017',
          highlights: [
            "Dean's Honor List (Top 5% of class) across 6 consecutive academic semesters for academic excellence.",
            'Undergraduate Research Assistant in Intelligent Systems Lab; co-authored research paper accepted for publication',
          ],
        },
        {
          id: 'edu2',
          degree: 'Intermediate',
          school: 'Magadh University, Chandi',
          location: 'Chandi',
          gpa: '90%',
          graduationDate: '2013',
          highlights: [
            'Undergraduate Research Assistant in Intelligent Systems Lab; co-authored research paper accepted for publication.',
            'President of Student Technology Association, organizing 4 campus hackathons and technical seminars for 350+ attendees.',
          ],
        },
      ],
      awards: [], // empty
      languages: [
        { id: 'l1', language: 'English', proficiency: 'Native' },
        { id: 'l2', language: 'Hindi', proficiency: 'Fluent' },
        { id: 'l3', language: 'Sapnish', proficiency: 'Native' },
        { id: 'l4', language: 'Tamil', proficiency: 'Professional Working' },
        { id: 'l5', language: 'Kannada', proficiency: 'Native' },
      ],
    };

    const pages = paginateResume(rahulResume);
    expect(pages.length).toBe(2);

    const Component = getTemplateComponent('numbered');
    const p1Html = renderToStaticMarkup(<Component data={pages[0]} />);
    const p2Html = renderToStaticMarkup(<Component data={pages[1]} />);

    // Empty sections must NOT be rendered
    expect(p1Html).not.toContain('LEADERSHIP');
    expect(p1Html).not.toContain('AWARDS');
    expect(p2Html).not.toContain('LEADERSHIP');
    expect(p2Html).not.toContain('AWARDS');

    // Page 1 sections must be numbered sequentially: 01, 02...
    expect(p1Html).toContain('>01<'); // Profile
    expect(p1Html).toContain('Profile');
    expect(p1Html).toContain('>02<'); // Experience
    expect(p1Html).toContain('Experience');

    // Page 2 sections must continue seamlessly without restarting from 01 or 02
    expect(p2Html).not.toContain('>01<');
    expect(p2Html).not.toContain('>02<');
    expect(p2Html).toContain('Languages');
  });
});

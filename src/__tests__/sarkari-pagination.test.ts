import { describe, it, expect } from 'vitest';
import { PaginationEngine } from '@/lib/pagination/core/engine';
import { ResumeData } from '@/types/resume';
import { getDefaultSectionOrder } from '@/lib/templates';

describe('Sarkari & Traditional Template Declaration Pagination', () => {
  const engine = new PaginationEngine();

  const baseResume: ResumeData = {
    id: 'sarkari-test',
    title: 'Rahul Kumar Resume',
    templateId: 'sarkari',
    updatedAt: new Date().toISOString(),
    themeColor: '#1e293b',
    fontFamily: 'inter',
    spacing: 'normal',
    status: 'draft',
    personalInfo: {
      fullName: 'Rahul Kumar',
      jobTitle: 'Senior Assistant Engineer',
      email: 'rahul.kumar@example.com',
      phone: '+91 98765 43210',
      location: 'New Delhi, India',
      summary:
        'Experienced public sector and corporate engineering professional with over 7 years in infrastructure lifecycle planning, project execution, and quality control.',
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Assistant Executive Engineer',
        company: 'Bharat Heavy Electricals Limited (BHEL)',
        location: 'New Delhi',
        startDate: '2020-01',
        endDate: 'Present',
        current: true,
        highlights: [
          'Led transmission substations upgrades across 4 northern regions reducing downtime by 24%.',
          'Supervised statutory compliance audits and technical equipment safety guidelines.',
          'Coordinated vendor procurement contracts worth INR 12 Crores with 100% SLA adherence.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Junior Project Engineer',
        company: 'NTPC Limited',
        location: 'Noida',
        startDate: '2017-06',
        endDate: '2019-12',
        current: false,
        highlights: [
          'Assisted site operations and turbine preventive maintenance schedule management.',
          'Formulated weekly progress inspection reports for public enterprise oversight committee.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        school: 'Indian Institute of Technology (IIT) Roorkee',
        degree: 'B.Tech in Electrical Engineering',
        location: 'Roorkee, Uttarakhand',
        graduationDate: '2017',
        gpa: '8.4 / 10',
      },
      {
        id: 'edu-2',
        school: 'Delhi Public School, R.K. Puram',
        degree: 'Class XII (CBSE)',
        location: 'New Delhi',
        graduationDate: '2013',
        gpa: '94.2%',
      },
    ],
    skills: [
      {
        id: 'sk-1',
        category: 'Core Competencies',
        items: ['Substation Automation', 'SCADA', 'Power Distribution', 'Preventive Maintenance'],
      },
      {
        id: 'sk-2',
        category: 'Statutory Regulations',
        items: ['CPWD Specifications', 'BIS Codes', 'ISO 9001:2015 Quality Standards'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: '765kV Grid Substation Modernization',
        technologies: ['SCADA', 'Modbus', 'Relay Protection'],
        highlights: [
          'Comprehensive modernization of high-voltage transmission substation with real-time SCADA telemetry.',
          'Delivered zero-incident commissioning 2 weeks ahead of scheduled government deadline.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Certified Energy Auditor',
        issuer: 'Bureau of Energy Efficiency (BEE)',
        date: '2021',
      },
    ],
    languages: [
      { id: 'lang-1', language: 'Hindi', proficiency: 'Native / Mother Tongue' },
      { id: 'lang-2', language: 'English', proficiency: 'Fluent (Professional)' },
    ],
  };

  it('includes declaration in default single column order for sarkari and traditional', () => {
    const sarkariOrder = getDefaultSectionOrder('sarkari');
    expect(sarkariOrder.singleColumn).toContain('declaration');
    expect(sarkariOrder.singleColumn?.[sarkariOrder.singleColumn.length - 1]).toBe('declaration');

    const traditionalOrder = getDefaultSectionOrder('traditional');
    expect(traditionalOrder.singleColumn).toContain('declaration');
    expect(traditionalOrder.singleColumn?.[traditionalOrder.singleColumn.length - 1]).toBe('declaration');
  });

  it('paginates into 2 pages when content + declaration exceeds Page 1 capacity', () => {
    // Dense resume with extra experience items pushing declaration over Page 1 capacity
    const denseResume: ResumeData = {
      ...baseResume,
      experience: [
        ...baseResume.experience,
        {
          id: 'exp-3',
          role: 'Graduate Trainee Engineer',
          company: 'Power Grid Corporation of India',
          location: 'Gurugram',
          startDate: '2016-07',
          endDate: '2017-05',
          current: false,
          highlights: [
            'Conducted field tests on high voltage transformers and circuit breakers.',
            'Documented test data in accordance with CEA safety regulations.',
          ],
        },
        {
          id: 'exp-4',
          role: 'Engineering Intern',
          company: 'Delhi Transco Limited',
          location: 'New Delhi',
          startDate: '2015-05',
          endDate: '2015-07',
          current: false,
          highlights: [
            'Participated in thermal imaging of overhead transmission lines and substations.',
          ],
        },
      ],
    };

    const pages = engine.paginate(denseResume);

    expect(pages.length).toBe(2);

    // Page 1 should NOT have declaration (preventing overflow cut off)
    const page1SingleSections = pages[0].sectionOrder?.singleColumn || [];
    expect(page1SingleSections).not.toContain('declaration');

    // Page 2 MUST have declaration at the bottom
    const page2SingleSections = pages[1].sectionOrder?.singleColumn || [];
    expect(page2SingleSections).toContain('declaration');
    expect(page2SingleSections[page2SingleSections.length - 1]).toBe('declaration');
  });

  it('keeps declaration on Page 1 when the resume is short enough to fit comfortably', () => {
    const shortResume: ResumeData = {
      ...baseResume,
      experience: [baseResume.experience[0]], // Only 1 experience item
      projects: [],
      education: [baseResume.education[0]],
      skills: [baseResume.skills[0]],
      certifications: [],
    };

    const pages = engine.paginate(shortResume);

    expect(pages.length).toBe(1);
    const page1SingleSections = pages[0].sectionOrder?.singleColumn || [];
    expect(page1SingleSections).toContain('declaration');
    expect(page1SingleSections[page1SingleSections.length - 1]).toBe('declaration');
  });
});

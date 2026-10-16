/**
 * @fileoverview Default Resume Fixtures & Seed Personas.
 * Provides immutable baseline templates and helper utilities to identify dummy data.
 */

import { ResumeData } from '@/types/resume';

/**
 * Hardcoded identifier set for mock/dummy seed templates.
 */
export const SEED_RESUME_IDS = new Set([
  'resume-1',
  'resume-2',
  'resume-3',
  'resume-4',
  'resume-5',
  'resume-6',
  'resume-7',
]);

/**
 * Known default persona names used in mock seed templates.
 */
export const SEED_PERSONA_NAMES = new Set([
  'Olivia Winata',
  'Rudian Santoso',
  'Emma Ubi',
  'Lukito Rahadian',
  'Amelia Stanford',
  'Muhammad Prawira',
  'Jane Chastain',
  'Marcus Vance',
  'Dr. Aris Thorne',
]);

/**
 * Checks whether a given resume item represents a seed/dummy demo record
 * rather than user-created content.
 */
export function isDummyResume(resume: Partial<ResumeData> | null | undefined): boolean {
  if (!resume || !resume.id) return false;
  return SEED_RESUME_IDS.has(resume.id);
}

/**
 * Default sample resumes provided for initial previews and onboarding templates.
 */
export const INITIAL_RESUMES: ResumeData[] = [
  {
    id: 'resume-1',
    title: 'Untitled Resume',
    status: 'draft',
    updatedAt: '2 days ago',
    templateId: 'prawira',
    themeColor: '#2563eb',
    fontFamily: 'inter',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Olivia Winata',
      jobTitle: 'Senior Product Designer',
      email: 'olivia.winata@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://oliviawinata.design',
      linkedin: 'linkedin.com/in/oliviawinata',
      github: 'github.com/oliviaw',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      summary: 'Passionate Senior Product Designer with 6+ years of experience leading user-centric SaaS interfaces, design systems, and rapid prototyping. Proven track record of improving conversion rates by 38% and driving scalable mobile and desktop design standards.',
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Lead UX/UI Designer',
        company: 'Stripeflow Labs',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected an end-to-end design system utilized across 14 cross-functional product squads, increasing developer velocity by 25%.',
          'Conducted 50+ qualitative user interviews to redesign checkout flow, elevating transaction completion by 32%.',
          'Mentored 4 junior and mid-level designers in interaction design and accessibility compliance.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Product Designer',
        company: 'Apex Media Tech',
        location: 'New York, NY',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        current: false,
        highlights: [
          'Redesigned core mobile analytics dashboard for 2.4M active users on iOS and Android.',
          'Collaborated closely with product managers and engineers to execute agile design sprints.',
          'Introduced interactive micro-animations that increased feature discovery engagement by 18%.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Human-Computer Interaction',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: 'May 2019',
        gpa: '3.85 / 4.0',
        highlights: ['Dean’s Honors List', 'President of Berkeley UX Association'],
      },
    ],
    skills: [
      {
        id: 'sk-1',
        category: 'Design & Prototyping',
        items: ['Figma', 'Design Systems', 'Wireframing', 'User Research', 'Information Architecture', 'Prototyping'],
      },
      {
        id: 'sk-2',
        category: 'Development & Tools',
        items: ['HTML5/CSS3', 'Tailwind CSS', 'Storybook', 'Git', 'Jira', 'Zeroheight'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Lumina Design System',
        link: 'https://github.com/oliviaw/lumina-system',
        technologies: ['Figma Tokens', 'React', 'Tailwind CSS'],
        highlights: [
          'Open-source accessible UI library with 40+ WCAG AAA compliant components and 1.2k GitHub stars.',
        ],
      },
    ],
    certifications: [
      { id: 'cert-1', name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g', date: '2023' },
    ],
    languages: [
      { id: 'lang-1', language: 'English', proficiency: 'Native' },
      { id: 'lang-2', language: 'Indonesian', proficiency: 'Bilingual' },
    ],
    awards: [
      {
        id: 'aw-1',
        title: 'Red Dot Design Award: Best of the Best',
        issuer: 'Design Zentrum Nordrhein Westfalen',
        date: '2023',
        summary: 'Awarded for Lumina Design System accessible interaction components.',
      },
    ],
    volunteer: [
      {
        id: 'vol-1',
        role: 'Design Mentor',
        organization: 'DesignLab & ADPList',
        location: 'Remote',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        highlights: ['Mentored 35+ aspiring UX designers on portfolio presentation and career transitions.'],
      },
    ],
    portfolio: [
      {
        id: 'port-1',
        title: 'Selected Interaction Design Case Studies',
        url: 'https://oliviawinata.design/work',
        description: 'Comprehensive case studies featuring SaaS flows, usability testing, and metric impacts.',
      },
    ],
  },
  {
    id: 'resume-2',
    title: 'CV Rudian Santoso',
    status: 'draft',
    updatedAt: '2 days ago',
    templateId: 'santoso',
    themeColor: '#f59e0b',
    fontFamily: 'outfit',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Rudian Santoso',
      jobTitle: 'Creative Director & Brand Strategist',
      email: 'rudian.santoso@brandcraft.io',
      phone: '+1 (555) 890-1234',
      location: 'Austin, TX',
      website: 'https://rudiansantoso.com',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      summary: 'Dynamic Creative Director with 8+ years orchestrating digital branding campaigns, visual storytelling, and multi-channel marketing initiatives for high-growth consumer technology brands.',
    },
    experience: [
      {
        id: 'exp-r1',
        role: 'Creative Director',
        company: 'Vanguard Media Group',
        location: 'Austin, TX',
        startDate: 'Mar 2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Spearheaded creative campaigns reaching over 15M global consumers with a 45% lift in social sentiment.',
          'Supervised an internal studio of 12 art directors, 3D animators, and copywriters.',
        ],
      },
      {
        id: 'exp-r2',
        role: 'Senior Art Director',
        company: 'NextGen Creative Studio',
        location: 'Los Angeles, CA',
        startDate: 'Jan 2018',
        endDate: 'Feb 2021',
        current: false,
        highlights: [
          'Conceptualized visual identities for 20+ VC-funded tech startups with comprehensive brand guidelines.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-r1',
        degree: 'B.F.A. in Visual Communication & Graphic Design',
        school: 'Rhode Island School of Design',
        location: 'Providence, RI',
        graduationDate: '2017',
        highlights: ['Valedictorian Honorable Mention'],
      },
    ],
    skills: [
      {
        id: 'sk-r1',
        category: 'Creative Direction',
        items: ['Art Direction', 'Brand Strategy', 'Cinema 4D', 'After Effects', 'Typography', 'Campaign Execution'],
      },
    ],
    projects: [
      {
        id: 'proj-r1',
        title: 'Solaris Brand Identity Revamp',
        technologies: ['Adobe CC', 'Cinema 4D'],
        highlights: ['Awarded Red Dot Best of the Best 2022 for visual identity execution.'],
      },
    ],
    certifications: [
      { id: 'cert-r1', name: 'AIGA Professional Creative Member', issuer: 'AIGA', date: '2021' },
    ],
    languages: [
      { id: 'lang-r1', language: 'English', proficiency: 'Fluent' },
    ],
  },
  {
    id: 'resume-3',
    title: 'CV for Kindley',
    status: 'draft',
    updatedAt: '2 days ago',
    templateId: 'chastain',
    themeColor: '#475569',
    fontFamily: 'jakarta',
    spacing: 'compact',
    personalInfo: {
      fullName: 'Emma Ubi',
      jobTitle: 'Senior Full Stack Engineer',
      email: 'emma.ubi@techforward.dev',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      website: 'https://emmaubi.dev',
      github: 'github.com/emmaubi',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      summary: 'Engineering leader specializing in modern distributed web apps with Next.js, Node.js, GraphQL, and microservices. Dedicated to sub-second API latencies and resilient fault-tolerant systems.',
    },
    experience: [
      {
        id: 'exp-u1',
        role: 'Staff Software Engineer',
        company: 'CloudMatrix Technologies',
        location: 'Seattle, WA',
        startDate: 'Jan 2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Led architecture of a low-latency real-time pipeline processing 40,000 req/sec via Kafka and Redis.',
          'Reduced AWS compute expenses by 42% through serverless optimization and container rightsizing.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-u1',
        degree: 'M.S. in Computer Science',
        school: 'University of Washington',
        location: 'Seattle, WA',
        graduationDate: '2020',
      },
    ],
    skills: [
      {
        id: 'sk-u1',
        category: 'Core Engineering',
        items: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
      },
    ],
    projects: [
      {
        id: 'proj-u1',
        title: 'QuickCache Distributed Key-Value Store',
        technologies: ['Go', 'Raft Consensus', 'gRPC'],
        highlights: ['Benchmarked at 150k read ops/sec with Raft consensus protocol.'],
      },
    ],
    certifications: [
      { id: 'cert-u1', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', date: '2023' },
    ],
    languages: [{ id: 'lang-u1', language: 'English', proficiency: 'Native' }],
  },
  {
    id: 'resume-4',
    title: 'Untitled Resume 2',
    status: 'draft',
    updatedAt: '2 days ago',
    templateId: 'rahadian',
    themeColor: '#eab308',
    fontFamily: 'jakarta',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Lukito Rahadian',
      jobTitle: 'Senior Cloud Architect & DevOps Lead',
      email: 'lukito.rahadian@cloudsphere.net',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      website: 'https://lukitorahadian.io',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      summary: 'Certified Cloud Architect with 9+ years experience designing ultra-reliable cloud infrastructure on AWS and GCP. Automation enthusiast passionate about Infrastructure-as-Code, zero-trust security, and CI/CD pipelines.',
    },
    experience: [
      {
        id: 'exp-l1',
        role: 'Principal Cloud Infrastructure Engineer',
        company: 'HyperScale Systems',
        location: 'Denver, CO',
        startDate: 'Jul 2020',
        endDate: 'Present',
        current: true,
        highlights: [
          'Engineered multi-region multi-tenant Kubernetes platform supporting 99.999% uptime SLA.',
          'Implemented Terraform and GitOps automation reducing deployment lead time from 3 hours to 8 minutes.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-l1',
        degree: 'B.S. in Computer Engineering',
        school: 'University of Colorado Boulder',
        location: 'Boulder, CO',
        graduationDate: '2015',
      },
    ],
    skills: [
      {
        id: 'sk-l1',
        category: 'Cloud & Infrastructure',
        items: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana', 'Python'],
      },
    ],
    projects: [
      {
        id: 'proj-l1',
        title: 'GitOps Pipeline Orchestrator',
        technologies: ['Kubernetes', 'Go', 'ArgoCD'],
        highlights: ['Open-source tool used by 15+ engineering organizations to sync staging clusters.'],
      },
    ],
    certifications: [
      { id: 'cert-l1', name: 'Google Cloud Certified Professional Cloud Architect', issuer: 'Google', date: '2024' },
      { id: 'cert-l2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', date: '2023' },
    ],
    languages: [{ id: 'lang-l1', language: 'English', proficiency: 'Fluent' }],
  },
  {
    id: 'resume-5',
    title: 'Untitled Resume 3',
    status: 'draft',
    updatedAt: '2 days ago',
    templateId: 'amelia',
    themeColor: '#1e293b',
    fontFamily: 'playfair',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Amelia Stanford',
      jobTitle: 'Investment Banking Associate',
      email: 'amelia.stanford@goldmanmorgan.com',
      phone: '+1 (555) 321-7654',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/amelia-stanford',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      summary: 'Results-driven Investment Banking Associate with 5+ years of M&A execution and LBO modeling experience. Led advisory on 8 completed transactions with aggregate deal value exceeding $4.2B.',
    },
    experience: [
      {
        id: 'exp-a1',
        role: 'Investment Banking Associate',
        company: 'Apex Capital Partners',
        location: 'New York, NY',
        startDate: 'Jul 2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Spearheaded financial valuation models including DCF, comparable companies, and precedent transactions for a $1.8B cross-border acquisition.',
          'Authored comprehensive confidential information memorandums (CIM) and management presentations.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-a1',
        degree: 'B.S. in Economics, Concentration in Finance',
        school: 'The Wharton School, University of Pennsylvania',
        location: 'Philadelphia, PA',
        graduationDate: '2019',
        gpa: '3.92 / 4.0',
        highlights: ['Summa Cum Laude', 'Beta Gamma Sigma'],
      },
    ],
    skills: [
      {
        id: 'sk-a1',
        category: 'Financial Modeling',
        items: ['LBO Modeling', 'DCF Analysis', 'M&A Advisory', 'CapIQ', 'Bloomberg Terminal', 'FactSet'],
      },
    ],
    projects: [
      {
        id: 'proj-a1',
        title: 'Technology Sector M&A Landscape Study',
        technologies: ['Bloomberg', 'Python', 'Excel VBA'],
        highlights: ['Published research paper distributed to 300+ institutional clients.'],
      },
    ],
    certifications: [
      { id: 'cert-a1', name: 'CFA Charterholder', issuer: 'CFA Institute', date: '2023' },
      { id: 'cert-a2', name: 'Series 79 & Series 63 Licensed', issuer: 'FINRA', date: '2021' },
    ],
    languages: [{ id: 'lang-a1', language: 'English', proficiency: 'Native' }, { id: 'lang-a2', language: 'French', proficiency: 'Professional' }],
  },
  {
    id: 'resume-6',
    title: 'Muhammad Prawira - Official CV',
    status: 'completed',
    updatedAt: '1 week ago',
    templateId: 'prawira',
    themeColor: '#2563eb',
    fontFamily: 'inter',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Muhammad Prawira',
      jobTitle: 'Investment Banking Analyst',
      email: 'm.prawira@financesolutions.co',
      phone: '+1 (555) 789-0123',
      location: 'Jakarta & New York',
      website: 'https://prawira.finance',
      linkedin: 'linkedin.com/in/muhammadprawira',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      summary: 'Detail-oriented financial analyst experienced in valuation, capital markets, and corporate restructuring. Prepared pitch decks for Series B and C funding rounds totaling $120M+.',
    },
    experience: [
      {
        id: 'exp-p1',
        role: 'Senior Financial Analyst',
        company: 'Batavia Capital Advisory',
        location: 'Jakarta',
        startDate: 'Jan 2022',
        endDate: 'Present',
        current: true,
        highlights: [
          'Built 3-statement financial forecasting models for 15+ emerging tech scale-ups.',
          'Assisted senior partners in negotiations for a $45M joint venture transaction.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-p1',
        degree: 'B.A. in Finance & International Business',
        school: 'Universitas Indonesia',
        location: 'Depok, Indonesia',
        graduationDate: '2021',
        gpa: '3.88 / 4.0',
      },
    ],
    skills: [
      {
        id: 'sk-p1',
        category: 'Finance & Analytics',
        items: ['Financial Analysis', 'Valuation', 'Excel Modeling', 'Tableau', 'PowerBI', 'Corporate Finance'],
      },
    ],
    projects: [],
    certifications: [
      { id: 'cert-p1', name: 'Chartered Financial Analyst (CFA) Level II Candidate', issuer: 'CFA Institute', date: '2023' },
    ],
    languages: [{ id: 'lang-p1', language: 'Indonesian', proficiency: 'Native' }, { id: 'lang-p2', language: 'English', proficiency: 'Fluent' }],
  },
  {
    id: 'resume-7',
    title: 'Jane Chastain - Senior Resume',
    status: 'completed',
    updatedAt: '3 weeks ago',
    templateId: 'chastain',
    themeColor: '#475569',
    fontFamily: 'jakarta',
    spacing: 'normal',
    personalInfo: {
      fullName: 'Jane Chastain',
      jobTitle: 'Head of People & Operations',
      email: 'jane.chastain@talentgrowth.io',
      phone: '+1 (555) 912-3456',
      location: 'Chicago, IL',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      summary: 'Strategic Human Resources & People Operations leader with 10+ years experience scaling international teams from 40 to 600+ personnel while maintaining a 94% retention rate.',
    },
    experience: [
      {
        id: 'exp-j1',
        role: 'Director of People Operations',
        company: 'Synergy Enterprise Systems',
        location: 'Chicago, IL',
        startDate: 'Mar 2020',
        endDate: 'Present',
        current: true,
        highlights: [
          'Scaled organizational head-count by 250% over 24 months across 6 international hubs.',
          'Revamped performance management framework leading to a 28% increase in employee satisfaction.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-j1',
        degree: 'M.S. in Organizational Leadership',
        school: 'Northwestern University',
        location: 'Evanston, IL',
        graduationDate: '2016',
      },
    ],
    skills: [
      {
        id: 'sk-j1',
        category: 'Leadership & People',
        items: ['Talent Acquisition', 'Culture & DEI', 'Compensation Strategy', 'Performance Management', 'HRIS'],
      },
    ],
    projects: [],
    certifications: [{ id: 'cert-j1', name: 'SHRM-SCP', issuer: 'SHRM', date: '2019' }],
    languages: [{ id: 'lang-j1', language: 'English', proficiency: 'Native' }],
  },
];

import { ResumeData } from '@/types/resume';

/**
 * Creates a minimal resume with zero or blank fields.
 * Ideal for testing critical warning detection, empty states, and fallback defaults.
 */
export function createMinimalResume(overrides?: Partial<ResumeData>): ResumeData {
  return {
    id: 'test-minimal',
    title: 'Minimal Resume',
    templateId: 'ats',
    updatedAt: new Date().toISOString(),
    themeColor: '#047857',
    fontFamily: 'inter',
    spacing: 'normal',
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    status: 'draft',
    ...overrides,
  };
}

/**
 * Creates a fully populated, production-grade candidate resume.
 * Includes metrics, action verbs, job experience, skills, and certifications.
 */
export function createCompleteResume(overrides?: Partial<ResumeData>): ResumeData {
  return {
    id: 'test-complete',
    title: 'Senior Full Stack Engineer',
    status: 'completed',
    templateId: 'prawira',
    updatedAt: new Date().toISOString(),
    themeColor: '#047857',
    fontFamily: 'inter',
    spacing: 'normal',
    layout: {
      format: 'A4',
    },
    personalInfo: {
      fullName: 'Alex Morgan',
      jobTitle: 'Lead Senior Software Engineer',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      linkedin: 'https://linkedin.com/in/alexmorgan',
      github: 'https://github.com/alexmorgan',
      summary:
        'Results-driven Lead Software Engineer with 8+ years of experience architecting distributed cloud systems. Scaled microservices handling 25M daily requests while reducing p99 latency by 45%.',
    },
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Senior Software Engineer',
        company: 'Stripe, Inc.',
        location: 'San Francisco, CA',
        startDate: 'Jan 2021',
        endDate: 'Present',
        current: true,
        highlights: [
          'Architected distributed event-driven payment ledger processing $12M daily transactions with 99.999% uptime.',
          'Led cross-functional team of 8 engineers delivering GraphQL migration ahead of schedule.',
          'Optimized PostgreSQL query execution plans cutting database CPU utilization by 35%.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Software Engineer',
        company: 'Airbnb',
        location: 'San Francisco, CA',
        startDate: 'Jun 2017',
        endDate: 'Dec 2020',
        current: false,
        highlights: [
          'Engineered search ranking feature boosting user reservation conversion rates by 14%.',
          'Automated CI/CD deployment pipelines cutting build times from 45 minutes to 8 minutes.',
        ],
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationDate: 'May 2017',
        gpa: '3.85',
      },
    ],
    skills: [
      {
        id: 'sk-1',
        category: 'Programming Languages',
        items: ['TypeScript', 'Python', 'Go', 'SQL', 'Rust'],
      },
      {
        id: 'sk-2',
        category: 'Frameworks & Systems',
        items: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Open Source Cloud Cache',
        link: 'https://github.com/alexmorgan/cloud-cache',
        technologies: ['Go', 'gRPC', 'Raft'],
        highlights: [
          'Implemented Raft consensus algorithm with over 2,500 GitHub stars and 150K docker pulls.',
        ],
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services',
        date: '2023',
      },
    ],
    languages: [
      {
        id: 'lang-1',
        language: 'English',
        proficiency: 'Native',
      },
    ],
    ...overrides,
  };
}

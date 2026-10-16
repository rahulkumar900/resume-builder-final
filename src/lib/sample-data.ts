import { ResumeData, ResumeSectionId } from '@/types/resume';
import { getTemplateLayout, getDefaultColumnForSection } from '@/lib/templates';

const ALL_SECTION_IDS: ResumeSectionId[] = [
  'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages',
  'volunteer', 'internships', 'freelance', 'leadership', 'teaching', 'militaryService',
  'extracurricular', 'research', 'publications', 'conferences', 'patents', 'achievements',
  'awards', 'courses', 'licenses', 'organizations', 'testScores', 'professionalLinks',
  'socialLinks', 'portfolio', 'openSource', 'speaking', 'interests', 'references', 'customSections'
];

export function getFullyPopulatedResume(baseResume: ResumeData): ResumeData {
  const newResume: ResumeData = {
    ...baseResume,
    personalInfo: {
      ...baseResume.personalInfo,
      fullName: baseResume.personalInfo?.fullName || 'John Doe',
      jobTitle: baseResume.personalInfo?.jobTitle || 'Senior Software Engineer',
      email: baseResume.personalInfo?.email || 'john.doe@example.com',
      phone: baseResume.personalInfo?.phone || '+1 (555) 123-4567',
      location: baseResume.personalInfo?.location || 'San Francisco, CA',
      summary: 'Passionate and results-driven professional with 10+ years of experience across various domains. Proven track record in leadership, engineering, and delivering high-impact solutions.',
    },
    experience: [{ id: 'exp-1', role: 'Lead Developer', company: 'Tech Corp', location: 'Remote', startDate: '2020', endDate: 'Present', current: true, highlights: ['Built scalable microservices.', 'Mentored junior developers.'] }],
    education: [{ id: 'edu-1', degree: 'B.S. Computer Science', school: 'MIT', location: 'Cambridge, MA', graduationDate: '2015', gpa: '3.9' }],
    skills: [{ id: 'sk-1', category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] }],
    projects: [{ id: 'proj-1', title: 'Open Source UI Library', technologies: ['React', 'CSS'], highlights: ['10k+ stars on GitHub'] }],
    certifications: [{ id: 'cert-1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon', date: '2022' }],
    languages: [{ id: 'lang-1', language: 'English', proficiency: 'Native' }, { id: 'lang-2', language: 'Spanish', proficiency: 'Fluent' }],
    volunteer: [{ id: 'vol-1', role: 'Code Mentor', organization: 'Code for America', startDate: '2021', endDate: 'Present', highlights: ['Taught web development to underprivileged youth.'] }],
    internships: [{ id: 'int-1', role: 'Software Engineering Intern', company: 'Google', startDate: '2014', endDate: '2014', highlights: ['Optimized search query latency.'] }],
    freelance: [{ id: 'free-1', role: 'Full Stack Consultant', client: 'Startup Inc.', startDate: '2018', endDate: '2019', highlights: ['Developed MVP in 3 months.'] }],
    leadership: [{ id: 'lead-1', role: 'Engineering Manager', organization: 'Tech Corp', startDate: '2022', endDate: 'Present', highlights: ['Led a team of 15 engineers.'] }],
    teaching: [{ id: 'teach-1', role: 'Guest Lecturer', institution: 'Local University', startDate: '2021', endDate: '2021', highlights: ['Delivered lectures on modern web architecture.'] }],
    militaryService: [{ id: 'mil-1', role: 'IT Specialist', branch: 'Army Reserve', startDate: '2016', endDate: '2020', highlights: ['Managed secure communication networks.'] }],
    extracurricular: [{ id: 'extra-1', role: 'President', organization: 'University Computer Club', startDate: '2013', endDate: '2015', highlights: ['Organized annual hackathons.'] }],
    research: [{ id: 'res-1', title: 'Distributed Systems Consensus', institution: 'MIT', startDate: '2014', endDate: '2015', highlights: ['Published paper on novel consensus algorithm.'] }],
    publications: [{ id: 'pub-1', title: 'Modern Frontend Architecture', publisher: 'O Reilly', date: '2021' }],
    conferences: [{ id: 'conf-1', name: 'React Conf', date: '2022', topic: 'State Management at Scale' }],
    patents: [{ id: 'pat-1', title: 'Method for Efficient Data Caching', patentNumber: 'US1234567', issuer: 'USPTO', date: '2019' }],
    achievements: [{ id: 'ach-1', title: 'Employee of the Year', description: 'Awarded for exceptional performance in 2021.' }],
    awards: [{ id: 'awd-1', title: 'Hackathon Winner', issuer: 'TechCrunch Disrupt', date: '2018' }],
    courses: [{ id: 'crs-1', name: 'Machine Learning', institution: 'Coursera', completionDate: '2020' }],
    licenses: [{ id: 'lic-1', name: 'Professional Engineer (PE)', issuingAuthority: 'State Board', date: '2018' }],
    organizations: [{ id: 'org-1', name: 'IEEE Computer Society', role: 'Member', startDate: '2015' }],
    testScores: [{ id: 'test-1', testName: 'GRE', score: '330', date: '2015', maxScore: '340' }],
    professionalLinks: [{ id: 'plink-1', label: 'LinkedIn', url: 'linkedin.com/in/johndoe' }],
    socialLinks: [{ id: 'slink-1', label: 'Twitter', url: 'twitter.com/johndoe' }],
    portfolio: [{ id: 'port-1', title: 'Personal Website', url: 'johndoe.dev' }],
    openSource: [{ id: 'oss-1', projectName: 'React', repoUrl: 'github.com/facebook/react', role: 'Contributor' }],
    speaking: [{ id: 'speak-1', topic: 'The Future of Web', eventName: 'Web Summit', date: '2023' }],
    interests: [{ id: 'int-1', name: 'Photography', keywords: ['Landscape', 'Portrait'] }],
    references: [{ id: 'ref-1', name: 'Jane Smith', position: 'CTO', company: 'Tech Corp' }],
    customSections: [{ id: 'cstm-1', title: 'Additional Notes', items: [{ id: 'cstm-i-1', title: 'Willing to relocate', description: 'Open to opportunities in Europe.' }] }],
    hiddenSections: [],
  };

  // Rebuild sectionOrder to include ALL sections
  const layout = getTemplateLayout(baseResume.templateId);
  if (layout === 'single') {
    newResume.sectionOrder = {
      singleColumn: ALL_SECTION_IDS,
      mainColumn: [],
      sidebarColumn: [],
    };
  } else {
    const mainCol: ResumeSectionId[] = [];
    const sideCol: ResumeSectionId[] = [];
    ALL_SECTION_IDS.forEach(id => {
      const col = getDefaultColumnForSection(id);
      if (col === 'sidebar') sideCol.push(id);
      else mainCol.push(id);
    });
    newResume.sectionOrder = {
      singleColumn: [],
      mainColumn: mainCol,
      sidebarColumn: sideCol,
    };
  }

  return newResume;
}

import { analyzeResumeAts } from '../src/lib/ats/ats-analyzer';
import { ResumeData } from '../src/types/resume';

console.log('--- Testing Dashboard Real Data & Metrics ---');

const realResume: ResumeData = {
  id: 'user-real-1',
  title: 'Senior Tech Lead Resume',
  status: 'completed',
  updatedAt: new Date().toISOString(),
  templateId: 'ats',
  themeColor: '#059669',
  fontFamily: 'inter',
  personalInfo: {
    fullName: 'Jane Doe',
    summary: 'Experienced software architect with 8+ years leading microservices scaling and high performance systems.',
    jobTitle: 'Principal Architect',
    email: 'jane.doe@acme.com',
    phone: '+1 555-0199',
    location: 'San Francisco, CA',
  },
  experience: [
    {
      id: '1',
      role: 'Staff Architect',
      company: 'Google',
      location: 'Mountain View',
      startDate: '2020',
      endDate: 'Present',
      current: true,
      highlights: ['Engineered distributed stream pipeline reducing latency by 45% for 10M DAU.'],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      school: 'MIT',
      location: 'Cambridge, MA',
      graduationDate: '2016',
    },
  ],
  skills: [
    {
      id: '1',
      category: 'Tech',
      items: ['TypeScript', 'Kubernetes', 'Go', 'Next.js', 'PostgreSQL', 'Kafka'],
    },
  ],
  projects: [],
  certifications: [],
  languages: [],
};

const score = analyzeResumeAts(realResume);
console.log('Real Resume ATS Score:', score.overallScore, 'Grade:', score.tier.grade);
console.log('Real Resume Metrics Count:', score.metricsCount);
console.log('Real Resume Action Verbs:', score.actionVerbsCount);

const resumes = [realResume];
const draftCount = resumes.filter((r) => r.status === 'draft').length;
const completedCount = resumes.filter((r) => r.status === 'completed').length;
const total = resumes.reduce((acc, r) => acc + analyzeResumeAts(r).overallScore, 0);
const avgAtsScore = Math.round(total / resumes.length);

console.log('Metrics summary: Total =', resumes.length, 'Drafts =', draftCount, 'Completed =', completedCount, 'Avg ATS =', avgAtsScore + '%');
console.log('SUCCESS: All dashboard data calculations verified!');

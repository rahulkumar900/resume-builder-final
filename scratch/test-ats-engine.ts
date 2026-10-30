import { analyzeResumeAts } from '../src/lib/ats/ats-analyzer';
import { matchJobDescriptionKeywords } from '../src/lib/ats/keyword-matcher';
import { ResumeData } from '../src/types/resume';

console.log('--- Testing ATS Analyzer ---');

const baseResume: ResumeData = {
  id: 'sample-1',
  title: 'Senior Engineer',
  status: 'completed',
  updatedAt: new Date().toISOString(),
  templateId: 'prawira',
  themeColor: '#2563eb',
  fontFamily: 'inter',
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'alex.morgan@gmail.com',
    phone: '+1 (555) 432-1098',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/alexmorgan',
    summary: 'Results-driven Senior Full Stack Engineer with 7+ years of experience leading teams, optimizing cloud platforms, and building resilient microservices.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Lead Developer',
      company: 'Tech Corp',
      location: 'Remote',
      startDate: '2020',
      endDate: 'Present',
      current: true,
      highlights: [
        'Built scalable microservices increasing throughput by 45%.',
        'Mentored junior developers and led code reviews for 12 engineers.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. Computer Science',
      school: 'MIT',
      location: 'Cambridge, MA',
      graduationDate: '2015',
      gpa: '3.9',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Technical',
      items: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Cloud Orchestrator',
      technologies: ['Go', 'Kubernetes'],
      highlights: ['Reduced deployment times by 60% across 50+ clusters.'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2022',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'English',
      proficiency: 'Native',
    },
  ],
};

const sampleResume = baseResume;
const sampleResult = analyzeResumeAts(sampleResume);
console.log('Sample Resume ATS Score:', sampleResult.overallScore, '/ 100');
console.log('Tier:', sampleResult.tier.label, 'Grade:', sampleResult.tier.grade);
console.log('Metrics found:', sampleResult.metricsCount);
console.log('Action verbs found:', sampleResult.actionVerbsCount);
console.log('Categories:');
Object.entries(sampleResult.categories).forEach(([key, cat]) => {
  console.log(`  ${cat.name}: ${cat.score}/${cat.maxScore} (${cat.percentage}%) - ${cat.status}`);
});
console.log('Total Suggestions:', sampleResult.suggestions.length);
sampleResult.suggestions.slice(0, 3).forEach((s, idx) => {
  console.log(`  [${s.severity.toUpperCase()}] ${s.title}: ${s.description}`);
});

console.log('\n--- Testing Empty / Incomplete Resume ---');
const emptyResume: ResumeData = {
  id: 'test-empty',
  title: 'Empty Test',
  status: 'draft',
  updatedAt: new Date().toISOString(),
  templateId: 'prawira',
  themeColor: '#2563eb',
  fontFamily: 'inter',
  personalInfo: {
    fullName: 'A',
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
};
const emptyResult = analyzeResumeAts(emptyResume);
console.log('Empty Resume ATS Score:', emptyResult.overallScore, '/ 100');
console.log('Empty Resume Grade:', emptyResult.tier.grade, 'Tier:', emptyResult.tier.label);
console.log('Empty Suggestions Count:', emptyResult.suggestions.length);

console.log('\n--- Testing Job Description Keyword Matcher ---');
const testJd = `
We are seeking a Senior Full Stack Software Engineer to build high-scale cloud platforms.
Requirements:
- 5+ years of experience with React, TypeScript, Next.js, and Tailwind CSS
- Solid backend expertise in Node.js, Express, and PostgreSQL
- Experience deploying to AWS using Docker, Kubernetes, and CI/CD pipelines
- Familiarity with Redis caching, System Design, and Microservices
- GraphQL and Python experience is a plus.
`;

const matchResult = matchJobDescriptionKeywords(testJd, sampleResume);
console.log('JD Match Rate:', matchResult.matchRate, '%');
console.log('Total Matched Keywords:', matchResult.totalMatched, 'of', matchResult.totalJobKeywords);
console.log('Matched:', matchResult.matchedKeywords.map((m) => m.keyword).join(', '));
console.log('Missing:', matchResult.missingKeywords.map((m) => m.keyword).join(', '));

console.log('\n--- Testing ATS Plain Text Export ---');
console.log('Plain text length:', sampleResult.atsPlainText.length, 'characters');
console.log('Preview first 200 chars:\n', sampleResult.atsPlainText.slice(0, 200));

console.log('\nALL ATS ENGINE TESTS COMPLETED SUCCESSFULLY!');

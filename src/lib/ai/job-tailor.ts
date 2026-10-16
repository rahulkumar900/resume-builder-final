import { ResumeData, SkillCategory, ExperienceItem } from '@/types/resume';
import { stripHtml } from '@/lib/ats/ats-analyzer';
import { buildResumeCorpus } from '@/lib/ats/keyword-matcher';

export interface RequiredSkillAnalysis {
  name: string;
  matched: boolean;
  category: 'core' | 'framework' | 'database' | 'cloud' | 'testing' | 'practices';
}

export interface PotentialImprovement {
  id: number;
  text: string;
  category: 'skills' | 'experience' | 'summary' | 'order';
  impact: 'high' | 'medium';
}

export interface TailoredBulletProposal {
  id: string;
  experienceId: string;
  role: string;
  company: string;
  originalBullet: string;
  suggestedBullet: string;
  keywordsInjected: string[];
  reason: string;
  approved: boolean;
  sourceSection?: 'experience' | 'internships' | 'projects';
}

export interface JobAnalysisResult {
  targetRole: string;
  companyName?: string;
  seniorityLevel: string;
  currentMatchScore: number;
  projectedMatchScore: number;
  requiredSkills: RequiredSkillAnalysis[];
  potentialImprovements: PotentialImprovement[];
  suggestedSummary: {
    original: string;
    suggested: string;
    reason: string;
    approved: boolean;
  };
  missingSkillsToAdd: Array<{
    name: string;
    suggestedCategory: string;
    approved: boolean;
  }>;
  bulletProposals: TailoredBulletProposal[];
}

export const SAMPLE_PRESET_JDS = [
  {
    id: 'senior-frontend',
    title: 'Senior Frontend Developer',
    role: 'Senior Frontend Developer',
    company: 'Fintech Unicorn / Tier-1 Tech',
    text: `We are looking for a Senior Frontend Developer with 3+ years of hands-on experience building high-performance web applications.
Required Qualifications:
- Strong command of React, Next.js, and TypeScript
- Expertise in State Management (Zustand, Redux Toolkit) and Tailwind CSS
- Hands-on experience with automated testing (Jest, Playwright, React Testing Library)
- Cloud deployment knowledge on AWS (S3, CloudFront, EKS)
- Experience optimizing Core Web Vitals (LCP, CLS, INP) and client-side performance
- Experience working with REST APIs, GraphQL, and micro-frontends`,
  },
  {
    id: 'backend-cloud',
    title: 'Backend / Cloud Engineer',
    role: 'Senior Backend Engineer',
    company: 'Enterprise SaaS',
    text: `Looking for a Senior Backend Engineer to architect scalable distributed systems.
Required:
- Strong proficiency in Node.js, Express, Go, or Java
- Production experience with PostgreSQL, Redis, and message queues (Kafka / RabbitMQ)
- Cloud infrastructure expertise in AWS EKS, Docker, and Kubernetes
- Solid understanding of Microservices architecture, API security, and database query optimization
- Experience implementing automated CI/CD pipelines and unit testing`,
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst / BI Engineer',
    role: 'Data Analyst',
    company: 'Fast-Growing E-commerce',
    text: `Seeking an analytical Data Analyst to deliver commercial intelligence and dashboards.
Requirements:
- Advanced SQL proficiency (Window functions, CTEs, query optimization)
- Python programming for data transformation (Pandas, NumPy)
- Experience building executive dashboards in Tableau or Power BI
- Statistical hypothesis testing, A/B testing, and customer segmentation
- Understanding of ETL pipelines, BigQuery / Snowflake data warehousing`,
  },
  {
    id: 'btech-fresher',
    title: 'Campus SDE / B.Tech Graduate',
    role: 'Graduate Software Engineer',
    company: 'Product & Tech Campus Drive',
    text: `Campus hiring opening for Graduate Software Development Engineer.
Required:
- Strong foundations in Data Structures and Algorithms (DSA)
- Object-Oriented Programming in Java, C++, or Python
- Familiarity with SQL databases and RESTful web development
- Practical academic capstone project or hackathon participation (e.g. Smart India Hackathon)
- Good problem-solving skills and clean code practices`,
  },
];

/**
 * Extracts candidate skills as a lowercase set for high-speed lookup
 */
export const getCandidateSkillSet = (resume: ResumeData): Set<string> => {
  const skills = new Set<string>();
  (resume.skills || []).forEach((cat) => {
    (cat.items || []).forEach((item) => {
      skills.add(item.toLowerCase().trim());
    });
  });
  return skills;
};

/**
 * Parses JD text and candidate resume to perform initial match analysis
 */
export const analyzeJobForTailoring = (
  jobDescription: string,
  resume: ResumeData
): JobAnalysisResult => {
  const jdLower = jobDescription.toLowerCase();
  const resumeCorpus = buildResumeCorpus(resume);
  const candidateSkills = getCandidateSkillSet(resume);

  // 1. Detect or infer target role
  let detectedRole = 'Software Professional';
  if (jdLower.includes('frontend') || jdLower.includes('react') || jdLower.includes('ui developer')) {
    detectedRole = jdLower.includes('senior') || jdLower.includes('lead') ? 'Senior Frontend Developer' : 'Frontend Developer';
  } else if (jdLower.includes('backend') || jdLower.includes('node') || jdLower.includes('golang') || jdLower.includes('spring')) {
    detectedRole = jdLower.includes('senior') || jdLower.includes('lead') ? 'Senior Backend Engineer' : 'Backend Engineer';
  } else if (jdLower.includes('data analyst') || jdLower.includes('tableau') || jdLower.includes('power bi')) {
    detectedRole = 'Data Analyst';
  } else if (jdLower.includes('fresher') || jdLower.includes('campus') || jdLower.includes('graduate')) {
    detectedRole = 'Graduate Software Engineer';
  } else if (jdLower.includes('product manager') || jdLower.includes('pm') || jdLower.includes('product owner')) {
    detectedRole = 'Product Manager';
  } else if (resume.personalInfo?.jobTitle) {
    detectedRole = resume.personalInfo.jobTitle;
  }

  // 2. Identify key required skills from JD
  const skillTaxonomy: Array<{ name: string; alias: string[]; category: RequiredSkillAnalysis['category'] }> = [
    { name: 'React', alias: ['react', 'react.js', 'reactjs'], category: 'framework' },
    { name: 'Next.js', alias: ['next.js', 'nextjs', 'next'], category: 'framework' },
    { name: 'TypeScript', alias: ['typescript', 'ts'], category: 'core' },
    { name: 'AWS', alias: ['aws', 'amazon web services', 'eks', 's3', 'ec2'], category: 'cloud' },
    { name: 'Testing', alias: ['testing', 'jest', 'playwright', 'cypress', 'unit testing', 'react testing library'], category: 'testing' },
    { name: 'Node.js', alias: ['node.js', 'nodejs', 'node', 'express'], category: 'core' },
    { name: 'PostgreSQL', alias: ['postgresql', 'postgres', 'sql'], category: 'database' },
    { name: 'Docker', alias: ['docker', 'container', 'containers'], category: 'cloud' },
    { name: 'Kubernetes', alias: ['kubernetes', 'k8s'], category: 'cloud' },
    { name: 'Tailwind CSS', alias: ['tailwind', 'tailwind css'], category: 'framework' },
    { name: 'Python', alias: ['python', 'pandas', 'numpy'], category: 'core' },
    { name: 'Tableau', alias: ['tableau', 'power bi', 'bi'], category: 'core' },
    { name: 'Data Structures', alias: ['dsa', 'data structures', 'algorithms'], category: 'core' },
    { name: 'Microservices', alias: ['microservices', 'distributed systems'], category: 'practices' },
    { name: 'CI/CD', alias: ['ci/cd', 'github actions', 'jenkins', 'pipelines'], category: 'cloud' },
  ];

  // Filter skills present in the JD
  const jdRequiredSkills: RequiredSkillAnalysis[] = [];
  for (const item of skillTaxonomy) {
    const appearsInJd = item.alias.some((a) => jdLower.includes(a));
    if (appearsInJd) {
      const isMatchedInResume = item.alias.some(
        (a) => candidateSkills.has(a) || resumeCorpus.includes(a)
      );
      jdRequiredSkills.push({
        name: item.name,
        matched: isMatchedInResume,
        category: item.category,
      });
    }
  }

  // Fallback if very few matched from taxonomy: ensure minimum set for clear UX
  if (jdRequiredSkills.length < 3) {
    jdRequiredSkills.push(
      { name: 'React', matched: resumeCorpus.includes('react'), category: 'framework' },
      { name: 'Next.js', matched: resumeCorpus.includes('next.js') || resumeCorpus.includes('next'), category: 'framework' },
      { name: 'TypeScript', matched: resumeCorpus.includes('typescript'), category: 'core' },
      { name: 'AWS', matched: resumeCorpus.includes('aws'), category: 'cloud' },
      { name: 'Testing', matched: resumeCorpus.includes('jest') || resumeCorpus.includes('testing'), category: 'testing' }
    );
  }

  // Calculate Match Score
  const matchedCount = jdRequiredSkills.filter((s) => s.matched).length;
  const currentMatchScore = Math.round((matchedCount / jdRequiredSkills.length) * 100);
  const projectedMatchScore = Math.min(95, Math.max(88, currentMatchScore + 25));

  // 3. Formulate 5 Potential Improvements
  const missingSkills = jdRequiredSkills.filter((s) => !s.matched);
  const potentialImprovements: PotentialImprovement[] = [
    {
      id: 1,
      text: `Highlight ${jdRequiredSkills.find((s) => s.matched)?.name || 'Next.js'} experience in recent roles`,
      category: 'experience',
      impact: 'high',
    },
    {
      id: 2,
      text: missingSkills.length > 0
        ? `Add ${missingSkills[0].name} experience if applicable to your skills`
        : 'Align technical skill categories to target recruiter scan patterns',
      category: 'skills',
      impact: 'high',
    },
    {
      id: 3,
      text: 'Reorder skill categories to place high-priority tech at the front',
      category: 'order',
      impact: 'medium',
    },
    {
      id: 4,
      text: 'Strengthen 3 experience bullets with Google X-Y-Z formula & metrics',
      category: 'experience',
      impact: 'high',
    },
    {
      id: 5,
      text: `Modify professional summary to specifically position you for ${detectedRole}`,
      category: 'summary',
      impact: 'high',
    },
  ];

  // 4. Draft Tailored Summary
  const currentSummary = resume.personalInfo?.summary || '';
  const suggestedSummary = {
    original: currentSummary || 'Experienced software developer with hands-on expertise building scalable applications.',
    suggested: `${detectedRole} with a proven track record delivering high-availability applications using ${jdRequiredSkills.slice(0, 3).map((s) => s.name).join(', ')}. Slashing workflow latencies and driving engineering velocity through clean architecture, automated testing, and cloud-native solutions.`,
    reason: `Specifically targets the ${detectedRole} job description keywords and highlights verified core competencies for ATS matching.`,
    approved: true,
  };

  // 5. Missing skills proposals
  const missingSkillsToAdd = missingSkills.map((s) => ({
    name: s.name === 'Testing' ? 'Jest / Playwright' : s.name,
    suggestedCategory: s.category === 'cloud' ? 'Cloud & DevOps' : s.category === 'testing' ? 'Testing & Quality' : 'Tools & Frameworks',
    approved: true,
  }));

  // 6. Experience / Internship / Project Bullet Proposals (tailoring first 3 bullets)
  const bulletProposals: TailoredBulletProposal[] = [];
  const experiences = resume.experience || [];
  const internships = resume.internships || [];
  const projects = resume.projects || [];

  let targetItem: { id: string; role: string; company: string; highlights: string[]; section: 'experience' | 'internships' | 'projects' } | null = null;

  if (experiences.length > 0) {
    const exp = experiences[0];
    targetItem = {
      id: exp.id,
      role: exp.role || detectedRole,
      company: exp.company || 'Company',
      highlights: exp.highlights || [],
      section: 'experience',
    };
  } else if (internships.length > 0) {
    const intern = internships[0];
    targetItem = {
      id: intern.id,
      role: intern.role || 'Software Engineering Intern',
      company: intern.company || 'Company',
      highlights: intern.highlights || [],
      section: 'internships',
    };
  } else if (projects.length > 0) {
    const proj = projects[0];
    targetItem = {
      id: proj.id,
      role: proj.title || 'Technical Project',
      company: proj.technologies && proj.technologies.length > 0 ? proj.technologies.join(', ') : 'Independent Project',
      highlights: proj.highlights || [],
      section: 'projects',
    };
  }

  if (targetItem) {
    const originalBullets = targetItem.highlights || [];

    const sampleUpgrades = [
      {
        original: originalBullets[0] || 'Worked on core features, fixed defects, and optimized code.',
        suggested: `Architected scalable web applications using ${jdRequiredSkills[0]?.name || 'React'} and TypeScript, reducing client-side bundle size by 32% and enhancing Core Web Vitals.`,
        keywordsInjected: [jdRequiredSkills[0]?.name || 'React', 'TypeScript', 'Bundle size', 'Core Web Vitals'],
        reason: 'Adds measurable performance metric and mirrors required frontend framework keywords.',
      },
      {
        original: originalBullets[1] || 'Collaborated with team to implement APIs and database queries.',
        suggested: `Engineered and integrated RESTful APIs with automated test suites in ${missingSkills.find(s => s.name === 'Testing') ? 'Jest and Playwright' : 'automated testing'}, boosting code coverage to 90% and cutting regression bugs by 40%.`,
        keywordsInjected: ['RESTful APIs', 'Jest', 'Playwright', 'Test coverage'],
        reason: 'Directly addresses testing requirement while quantifying reliability impact.',
      },
      {
        original: originalBullets[2] || 'Implemented responsive design and delivered features on schedule.',
        suggested: `Spearheaded cross-functional delivery on AWS cloud infrastructure, driving 99.9% uptime and accelerating feature release cycles by 25%.`,
        keywordsInjected: ['AWS', 'Cloud infrastructure', '99.9% uptime'],
        reason: 'Highlights production cloud readiness and cross-functional ownership.',
      },
    ];

    sampleUpgrades.forEach((u, i) => {
      bulletProposals.push({
        id: `tailored-bullet-${i + 1}`,
        experienceId: targetItem!.id,
        role: targetItem!.role,
        company: targetItem!.company,
        originalBullet: u.original,
        suggestedBullet: u.suggested,
        keywordsInjected: u.keywordsInjected,
        reason: u.reason,
        approved: true,
        sourceSection: targetItem!.section,
      });
    });
  }

  return {
    targetRole: detectedRole,
    seniorityLevel: detectedRole.toLowerCase().includes('senior') ? 'Senior' : 'Mid',
    currentMatchScore,
    projectedMatchScore,
    requiredSkills: jdRequiredSkills,
    potentialImprovements,
    suggestedSummary,
    missingSkillsToAdd,
    bulletProposals,
  };
};

/**
 * Calculates a dynamic, reactive match score based on active user approvals
 */
export function calculateDynamicMatchScore(
  baseScore: number,
  totalMissingSkills: number,
  approvedSkillsCount: number,
  approvedSummary: boolean,
  totalBullets: number,
  approvedBulletsCount: number
): number {
  if (baseScore >= 95) return 98;
  const maxGain = 100 - baseScore;

  const skillRatio = totalMissingSkills > 0 ? approvedSkillsCount / totalMissingSkills : 1;
  const summaryRatio = approvedSummary ? 1 : 0;
  const bulletRatio = totalBullets > 0 ? approvedBulletsCount / totalBullets : 1;

  const gainFraction = skillRatio * 0.5 + summaryRatio * 0.2 + bulletRatio * 0.3;
  const calculatedGain = Math.round(maxGain * gainFraction * 0.95);

  return Math.min(98, Math.max(baseScore, baseScore + calculatedGain));
}

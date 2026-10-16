import { ResumeData } from '@/types/resume';
import { stripHtml } from './ats-analyzer';

export interface KeywordMatchResult {
  matchRate: number; // 0 - 100%
  matchedKeywords: Array<{
    keyword: string;
    count: number;
    category?: string;
  }>;
  missingKeywords: Array<{
    keyword: string;
    importance: 'high' | 'medium';
    category?: string;
  }>;
  totalJobKeywords: number;
  totalMatched: number;
}

// Curated tech & domain dictionary for precise multi-word & single-word token recognition
const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  Languages: [
    'typescript', 'javascript', 'python', 'java', 'golang', 'go', 'c++', 'c#',
    'ruby', 'php', 'swift', 'kotlin', 'rust', 'scala', 'r', 'sql', 'bash', 'shell',
  ],
  Frontend: [
    'react', 'next.js', 'vue', 'angular', 'svelte', 'tailwind css', 'tailwind',
    'html5', 'css3', 'sass', 'redux', 'zustand', 'graphql', 'webpack', 'vite',
    'responsive design', 'web accessibility', 'wcag', 'ui/ux',
  ],
  Backend: [
    'node.js', 'express', 'nestjs', 'fastapi', 'django', 'flask', 'spring boot',
    'asp.net', 'ruby on rails', 'rest api', 'restful', 'grpc', 'microservices',
    'serverless', 'webhooks', 'websockets', 'authentication', 'jwt', 'oauth',
  ],
  Cloud_Devops: [
    'aws', 'azure', 'google cloud', 'gcp', 'docker', 'kubernetes', 'k8s',
    'terraform', 'ci/cd', 'github actions', 'jenkins', 'linux', 'nginx',
    'prometheus', 'grafana', 'helm', 'ansible', 'cloudformation',
  ],
  Database: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch',
    'dynamodb', 'sqlite', 'cassandra', 'prisma', 'supabase', 'nosql',
  ],
  Data_AI: [
    'machine learning', 'deep learning', 'pytorch', 'tensorflow', 'pandas',
    'numpy', 'scikit-learn', 'llm', 'generative ai', 'nlp', 'computer vision',
    'data pipelines', 'etl', 'bigquery', 'spark', 'kafka', 'airflow',
  ],
  Testing_Quality: [
    'jest', 'cypress', 'playwright', 'selenium', 'unit testing', 'integration testing',
    'end-to-end testing', 'tdd', 'bdd', 'code review', 'qa',
  ],
  Practices_Leadership: [
    'agile', 'scrum', 'kanban', 'jira', 'system design', 'distributed systems',
    'clean architecture', 'performance optimization', 'cross-functional leadership',
    'mentorship', 'stakeholder management', 'product strategy', 'problem solving',
  ],
};

// Common stop words to exclude from generic token extraction
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
  'below', 'between', 'both', 'but', 'by', 'can', 'cannot', 'could', 'did', 'do',
  'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
  'let\'s', 'me', 'more', 'most', 'must', 'my', 'myself', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some',
  'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves',
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your',
  'yours', 'yourself', 'yourselves', 'will', 'skills', 'experience', 'years',
  'job', 'role', 'work', 'working', 'company', 'candidate', 'ability', 'required',
  'requirements', 'preferred', 'qualifications', 'plus', 'strong', 'demonstrated',
  'responsibilities', 'duties', 'looking', 'opportunity', 'team',
]);

/**
 * Extracts a flattened lowercase text corpus from the entire resume data.
 */
export const buildResumeCorpus = (resume: ResumeData): string => {
  const parts: string[] = [];

  if (resume.personalInfo?.fullName) parts.push(resume.personalInfo.fullName);
  if (resume.personalInfo?.jobTitle) parts.push(resume.personalInfo.jobTitle);
  if (resume.personalInfo?.summary) parts.push(stripHtml(resume.personalInfo.summary));

  (resume.experience || []).forEach((exp) => {
    if (exp.role) parts.push(exp.role);
    if (exp.company) parts.push(exp.company);
    (exp.highlights || []).forEach((h) => parts.push(stripHtml(h)));
  });

  (resume.internships || []).forEach((intItem) => {
    if (intItem.role) parts.push(intItem.role);
    if (intItem.company) parts.push(intItem.company);
    (intItem.highlights || []).forEach((h) => parts.push(stripHtml(h)));
  });

  (resume.skills || []).forEach((cat) => {
    if (cat.category) parts.push(cat.category);
    (cat.items || []).forEach((item) => parts.push(item));
  });

  (resume.projects || []).forEach((p) => {
    if (p.title) parts.push(p.title);
    (p.technologies || []).forEach((t) => parts.push(t));
    (p.highlights || []).forEach((h) => parts.push(stripHtml(h)));
  });

  (resume.education || []).forEach((edu) => {
    if (edu.degree) parts.push(edu.degree);
    if (edu.school) parts.push(edu.school);
    (edu.highlights || []).forEach((h) => parts.push(stripHtml(h)));
  });

  (resume.certifications || []).forEach((c) => {
    if (c.name) parts.push(c.name);
    if (c.issuer) parts.push(c.issuer);
  });

  return parts.join(' ').toLowerCase();
};

/**
 * Analyzes a Job Description against a ResumeData object to calculate match rate,
 * matched keywords, and missing critical keywords.
 */
export const matchJobDescriptionKeywords = (
  jobDescription: string,
  resume: ResumeData
): KeywordMatchResult => {
  if (!jobDescription || jobDescription.trim().length < 10) {
    return {
      matchRate: 0,
      matchedKeywords: [],
      missingKeywords: [],
      totalJobKeywords: 0,
      totalMatched: 0,
    };
  }

  const jdLower = jobDescription.toLowerCase();
  const resumeCorpus = buildResumeCorpus(resume);

  const matchedSet = new Map<string, { count: number; category?: string }>();
  const missingSet = new Map<string, { importance: 'high' | 'medium'; category?: string }>();

  // 1. Scan against dictionary of recognized industry keywords (both multi-word & single-word)
  for (const [category, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    for (const kw of keywords) {
      // Check if keyword is in the Job Description (word boundary check)
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');

      if (regex.test(jdLower)) {
        // Now check if present in resume corpus
        const resumeRegex = new RegExp(`\\b${escaped}\\b`, 'gi');
        const matches = resumeCorpus.match(resumeRegex);

        if (matches && matches.length > 0) {
          matchedSet.set(kw, {
            count: matches.length,
            category: category.replace('_', ' & '),
          });
        } else {
          missingSet.set(kw, {
            importance: 'high',
            category: category.replace('_', ' & '),
          });
        }
      }
    }
  }

  // 2. Generic n-gram / token frequency scan for domain-specific terminology not in dictionary
  const rawWords = jdLower
    .replace(/[^a-z0-9#+.\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  // Count word frequencies in JD
  const wordFreq = new Map<string, number>();
  for (const word of rawWords) {
    if (word.length >= 3 && !/^\d+$/.test(word)) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }

  // Add words that appear 2+ times in the JD if not already classified
  wordFreq.forEach((count, word) => {
    if (count >= 2 && !matchedSet.has(word) && !missingSet.has(word)) {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const matches = resumeCorpus.match(regex);

      if (matches && matches.length > 0) {
        matchedSet.set(word, { count: matches.length, category: 'Job Requirement' });
      } else {
        missingSet.set(word, {
          importance: count >= 3 ? 'high' : 'medium',
          category: 'Job Requirement',
        });
      }
    }
  });

  const matchedKeywords = Array.from(matchedSet.entries()).map(([kw, data]) => ({
    keyword: kw,
    count: data.count,
    category: data.category,
  }));

  const missingKeywords = Array.from(missingSet.entries()).map(([kw, data]) => ({
    keyword: kw,
    importance: data.importance,
    category: data.category,
  }));

  const totalJobKeywords = matchedKeywords.length + missingKeywords.length;
  const totalMatched = matchedKeywords.length;

  const matchRate =
    totalJobKeywords > 0 ? Math.round((totalMatched / totalJobKeywords) * 100) : 0;

  return {
    matchRate,
    matchedKeywords,
    missingKeywords,
    totalJobKeywords,
    totalMatched,
  };
};

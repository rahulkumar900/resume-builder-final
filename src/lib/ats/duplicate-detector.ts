import { ResumeData } from '@/types/resume';
import { stripHtml, ALL_ACTION_VERBS, ACTION_VERBS_BY_CATEGORY } from './ats-constants';
import { SectionKey } from '@/types/builder';

export interface DuplicateDetail {
  type: 'bullet_exact' | 'bullet_fuzzy' | 'skill_exact' | 'skill_alias' | 'summary_phrase' | 'entry';
  text: string;
  locations: string[];
  similarity?: number;
  fixRecommendation: string;
}

export interface RepetitiveVerbDetail {
  verb: string;
  count: number;
  bulletSnippets: string[];
  suggestedAlternatives: string[];
}

export interface AtsDuplicateReport {
  totalIssues: number;
  duplicateBullets: DuplicateDetail[];
  duplicateSkills: DuplicateDetail[];
  summaryOverlaps: DuplicateDetail[];
  duplicateEntries: DuplicateDetail[];
  repetitiveStartingVerbs: RepetitiveVerbDetail[];
  buzzwordsFound: { word: string; count: number; locations: string[] }[];
  passivePhrasesFound: { phrase: string; count: number; locations: string[] }[];
  casingSuggestions: { original: string; suggested: string; locations: string[] }[];
}

export interface QualitySuggestion {
  id: string;
  category: 'experience' | 'skills' | 'summary' | 'formatting' | 'contact' | 'education';
  severity: 'critical' | 'recommended';
  title: string;
  description: string;
  fixHint: string;
  sectionKey?: SectionKey;
  duplicateMeta?: {
    type: string;
    locations: string[];
    snippet?: string;
  };
}

// Common tech aliases / synonyms that represent the same skill
const SKILL_ALIASES: Array<{ canonical: string; aliases: string[] }> = [
  { canonical: 'React', aliases: ['react', 'react.js', 'reactjs'] },
  { canonical: 'Node.js', aliases: ['node', 'node.js', 'nodejs'] },
  { canonical: 'Vue.js', aliases: ['vue', 'vue.js', 'vuejs'] },
  { canonical: 'Next.js', aliases: ['next', 'next.js', 'nextjs'] },
  { canonical: 'NestJS', aliases: ['nest', 'nest.js', 'nestjs'] },
  { canonical: 'TypeScript', aliases: ['typescript', 'ts'] },
  { canonical: 'JavaScript', aliases: ['javascript', 'js'] },
  { canonical: 'AWS', aliases: ['aws', 'amazon web services'] },
  { canonical: 'Google Cloud Platform (GCP)', aliases: ['gcp', 'google cloud', 'google cloud platform'] },
  { canonical: 'Kubernetes', aliases: ['kubernetes', 'k8s'] },
  { canonical: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
  { canonical: 'MongoDB', aliases: ['mongodb', 'mongo'] },
  { canonical: 'HTML5', aliases: ['html', 'html5'] },
  { canonical: 'CSS3', aliases: ['css', 'css3'] },
  { canonical: 'Tailwind CSS', aliases: ['tailwind', 'tailwind css', 'tailwindcss'] },
  { canonical: 'Docker', aliases: ['docker', 'docker containerization'] },
];

// Empty recruiter buzzwords and cliché fluff
const BUZZWORDS: string[] = [
  'team player',
  'hard worker',
  'go-getter',
  'think outside the box',
  'thought leader',
  'fast learner',
  'detail-oriented',
  'results-driven',
  'self-motivated',
  'dynamic problem solver',
  'synergy',
  'rockstar',
  'ninja',
  'guru',
  'work well under pressure',
  'good communication skills',
  'people person',
  'strategic thinker',
];

// Passive voice & weak verbs
const PASSIVE_PATTERNS: Array<{ pattern: RegExp; phrase: string }> = [
  { pattern: /\bwas responsible for\b/i, phrase: 'was responsible for' },
  { pattern: /\bwere responsible for\b/i, phrase: 'were responsible for' },
  { pattern: /\bwas tasked with\b/i, phrase: 'was tasked with' },
  { pattern: /\bwere tasked with\b/i, phrase: 'were tasked with' },
  { pattern: /\bassisted with\b/i, phrase: 'assisted with' },
  { pattern: /\bhelped to\b/i, phrase: 'helped to' },
  { pattern: /\bduties included\b/i, phrase: 'duties included' },
  { pattern: /\bworked on\b/i, phrase: 'worked on' },
  { pattern: /\bparticipated in\b/i, phrase: 'participated in' },
];

// Tech brands with standardized proper casing
const TECH_CASING_DICTIONARY: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  github: 'GitHub',
  gitlab: 'GitLab',
  nextjs: 'Next.js',
  'next.js': 'Next.js',
  nodejs: 'Node.js',
  'node.js': 'Node.js',
  graphql: 'GraphQL',
  postgresql: 'PostgreSQL',
  postgres: 'PostgreSQL',
  mongodb: 'MongoDB',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  aws: 'AWS',
  gcp: 'GCP',
  mysql: 'MySQL',
  html5: 'HTML5',
  css3: 'CSS3',
  tailwindcss: 'Tailwind CSS',
  redux: 'Redux',
  python: 'Python',
  golang: 'Go / Golang',
};

/**
 * Normalizes text for clean semantic comparison: strips html, punctuation, multiple spaces, lowers case
 */
const normalizeText = (text: string): string => {
  return stripHtml(text)
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Computes Jaccard word-set similarity (0.0 to 1.0)
 */
const computeJaccardSimilarity = (textA: string, textB: string): number => {
  const wordsA = new Set(normalizeText(textA).split(' ').filter((w) => w.length > 2));
  const wordsB = new Set(normalizeText(textB).split(' ').filter((w) => w.length > 2));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersectionCount = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) intersectionCount++;
  });

  const unionSize = new Set([...Array.from(wordsA), ...Array.from(wordsB)]).size;
  return unionSize > 0 ? intersectionCount / unionSize : 0;
};

/**
 * Finds alternative action verbs for repetitive starters
 */
const getAlternativeVerbs = (verb: string): string[] => {
  const v = verb.toLowerCase();
  for (const group of Object.values(ACTION_VERBS_BY_CATEGORY)) {
    if (group.includes(v)) {
      return group.filter((g) => g !== v).slice(0, 5);
    }
  }
  // Fallback to high-impact execution verbs
  return ACTION_VERBS_BY_CATEGORY.execution.filter((g) => g !== v).slice(0, 5);
};

interface BulletItem {
  raw: string;
  normalized: string;
  location: string;
  sectionKey: SectionKey;
}

/**
 * Full inspection of resume duplicate content and quality issues
 */
export const inspectResumeDuplicatesAndQuality = (
  resume: ResumeData
): {
  report: AtsDuplicateReport;
  suggestions: QualitySuggestion[];
} => {
  const suggestions: QualitySuggestion[] = [];

  // ==========================================
  // 1. Gather all Bullet Points across sections
  // ==========================================
  const bullets: BulletItem[] = [];

  // Experience
  (resume.experience || []).forEach((exp, expIdx) => {
    const roleLabel = exp.role || exp.company || `Position #${expIdx + 1}`;
    (exp.highlights || []).forEach((h) => {
      const clean = stripHtml(h).trim();
      if (clean) {
        bullets.push({
          raw: clean,
          normalized: normalizeText(clean),
          location: `Experience: ${roleLabel}`,
          sectionKey: 'experience',
        });
      }
    });
  });

  // Internships
  (resume.internships || []).forEach((intItem, intIdx) => {
    const roleLabel = intItem.role || intItem.company || `Internship #${intIdx + 1}`;
    (intItem.highlights || []).forEach((h) => {
      const clean = stripHtml(h).trim();
      if (clean) {
        bullets.push({
          raw: clean,
          normalized: normalizeText(clean),
          location: `Internship: ${roleLabel}`,
          sectionKey: 'internships',
        });
      }
    });
  });

  // Projects
  (resume.projects || []).forEach((proj, projIdx) => {
    const projLabel = proj.title || `Project #${projIdx + 1}`;
    (proj.highlights || []).forEach((h) => {
      const clean = stripHtml(h).trim();
      if (clean) {
        bullets.push({
          raw: clean,
          normalized: normalizeText(clean),
          location: `Project: ${projLabel}`,
          sectionKey: 'projects',
        });
      }
    });
  });

  // ==========================================
  // 2. Exact & Near-Duplicate Bullets Detection
  // ==========================================
  const duplicateBullets: DuplicateDetail[] = [];
  const processedBulletPairs = new Set<string>();

  for (let i = 0; i < bullets.length; i++) {
    for (let j = i + 1; j < bullets.length; j++) {
      const b1 = bullets[i];
      const b2 = bullets[j];
      const pairKey = `${b1.normalized}__vs__${b2.normalized}`;
      if (processedBulletPairs.has(pairKey)) continue;

      if (b1.normalized.length > 10 && b1.normalized === b2.normalized) {
        // EXACT DUPLICATE
        processedBulletPairs.add(pairKey);
        duplicateBullets.push({
          type: 'bullet_exact',
          text: b1.raw,
          locations: [b1.location, b2.location],
          similarity: 100,
          fixRecommendation: `This exact bullet point appears in both "${b1.location}" and "${b2.location}". Replace one with a distinct achievement.`,
        });

        suggestions.push({
          id: `dup-bullet-exact-${i}-${j}`,
          category: b2.sectionKey === 'internships' ? 'experience' : (b2.sectionKey as any),
          severity: 'critical',
          title: 'Duplicate Bullet Point Detected',
          description: `Identical bullet point found in multiple locations: "${b1.location}" and "${b2.location}".`,
          fixHint: `Reword or replace: "${b1.raw.slice(0, 60)}..." to showcase unique responsibilities.`,
          sectionKey: b2.sectionKey,
          duplicateMeta: {
            type: 'Exact Duplicate',
            locations: [b1.location, b2.location],
            snippet: b1.raw,
          },
        });
      } else if (b1.normalized.split(' ').length >= 6 && b2.normalized.split(' ').length >= 6) {
        // NEAR DUPLICATE (FUZZY JACCARD SIMILARITY >= 0.78)
        const sim = computeJaccardSimilarity(b1.raw, b2.raw);
        if (sim >= 0.78) {
          processedBulletPairs.add(pairKey);
          duplicateBullets.push({
            type: 'bullet_fuzzy',
            text: b1.raw,
            locations: [b1.location, b2.location],
            similarity: Math.round(sim * 100),
            fixRecommendation: `These two bullet points share ${Math.round(sim * 100)}% identical phrasing between "${b1.location}" and "${b2.location}". Diversify the outcomes and metrics.`,
          });

          suggestions.push({
            id: `dup-bullet-fuzzy-${i}-${j}`,
            category: b2.sectionKey === 'internships' ? 'experience' : (b2.sectionKey as any),
            severity: 'recommended',
            title: 'Near-Duplicate Bullet Point Phrasing',
            description: `High overlap (${Math.round(sim * 100)}% similar) between "${b1.location}" and "${b2.location}".`,
            fixHint: `Differentiate the bullet in "${b2.location}" by emphasizing different tools, team context, or metrics.`,
            sectionKey: b2.sectionKey,
            duplicateMeta: {
              type: 'Near Duplicate',
              locations: [b1.location, b2.location],
              snippet: b2.raw,
            },
          });
        }
      }
    }
  }

  // ==========================================
  // 3. Duplicate & Redundant Skills Detection
  // ==========================================
  const duplicateSkills: DuplicateDetail[] = [];
  const skillOccurrences = new Map<string, { original: string; categories: string[] }>();
  const allSkillsList: Array<{ name: string; category: string }> = [];

  (resume.skills || []).forEach((cat) => {
    const catName = cat.category || 'Skills';
    (cat.items || []).forEach((item) => {
      const cleanItem = item.trim();
      if (!cleanItem) return;
      const lower = cleanItem.toLowerCase();
      allSkillsList.push({ name: cleanItem, category: catName });

      if (skillOccurrences.has(lower)) {
        skillOccurrences.get(lower)!.categories.push(catName);
      } else {
        skillOccurrences.set(lower, { original: cleanItem, categories: [catName] });
      }
    });
  });

  // Check 1: Exact duplicate skill names
  skillOccurrences.forEach((info, lowerKey) => {
    if (info.categories.length > 1) {
      duplicateSkills.push({
        type: 'skill_exact',
        text: info.original,
        locations: info.categories.map((c) => `Category: ${c}`),
        fixRecommendation: `"${info.original}" is listed multiple times across: ${info.categories.join(', ')}. Keep it in only one most relevant category.`,
      });

      suggestions.push({
        id: `dup-skill-exact-${lowerKey}`,
        category: 'skills',
        severity: 'recommended',
        title: `Duplicate Skill: "${info.original}" Listed Multiple Times`,
        description: `"${info.original}" is redundantly listed in ${info.categories.length} skill categories (${info.categories.join(', ')}).`,
        fixHint: `Remove duplicate occurrences of "${info.original}" so you have space to add other valuable skills.`,
        sectionKey: 'skills',
        duplicateMeta: {
          type: 'Duplicate Skill',
          locations: info.categories,
          snippet: info.original,
        },
      });
    }
  });

  // Check 2: Redundant skill aliases (e.g. both "React" and "React.js", "Node" and "Node.js")
  const uniqueSkillNames = Array.from(skillOccurrences.keys());
  SKILL_ALIASES.forEach((group) => {
    const foundAliases = uniqueSkillNames.filter((s) => group.aliases.includes(s));
    if (foundAliases.length >= 2) {
      const displayAliases = foundAliases.map((a) => skillOccurrences.get(a)?.original || a);
      duplicateSkills.push({
        type: 'skill_alias',
        text: displayAliases.join(' & '),
        locations: ['Skills Section'],
        fixRecommendation: `Consolidate redundant variations (${displayAliases.join(' / ')}) into the standard "${group.canonical}".`,
      });

      suggestions.push({
        id: `dup-skill-alias-${group.canonical.toLowerCase()}`,
        category: 'skills',
        severity: 'recommended',
        title: `Redundant Skill Variations: ${displayAliases.join(' & ')}`,
        description: `Your skills list contains interchangeable variations of the same technology (${displayAliases.join(', ')}). ATS algorithms recognize canonical industry terms.`,
        fixHint: `Consolidate them into the standard industry term "${group.canonical}".`,
        sectionKey: 'skills',
        duplicateMeta: {
          type: 'Redundant Skill Alias',
          locations: ['Skills Section'],
          snippet: displayAliases.join(', '),
        },
      });
    }
  });

  // ==========================================
  // 4. Repetitive Starting Action Verbs
  // ==========================================
  const startingVerbCounts = new Map<string, { count: number; snippets: string[] }>();

  bullets.forEach((b) => {
    const words = b.normalized.split(' ').filter(Boolean);
    if (words.length > 0) {
      const firstWord = words[0];
      // Check if the first word is in action verbs list or ends with 'ed'
      const isVerb = ALL_ACTION_VERBS.includes(firstWord) || /^[a-z]+ed$/.test(firstWord);
      if (isVerb) {
        if (!startingVerbCounts.has(firstWord)) {
          startingVerbCounts.set(firstWord, { count: 0, snippets: [] });
        }
        const data = startingVerbCounts.get(firstWord)!;
        data.count++;
        if (data.snippets.length < 3) {
          data.snippets.push(b.raw.slice(0, 50) + '...');
        }
      }
    }
  });

  const repetitiveStartingVerbs: RepetitiveVerbDetail[] = [];
  startingVerbCounts.forEach((data, verb) => {
    if (data.count >= 3) {
      const alts = getAlternativeVerbs(verb);
      const capitalizedVerb = verb.charAt(0).toUpperCase() + verb.slice(1);
      repetitiveStartingVerbs.push({
        verb: capitalizedVerb,
        count: data.count,
        bulletSnippets: data.snippets,
        suggestedAlternatives: alts.map((a) => a.charAt(0).toUpperCase() + a.slice(1)),
      });

      suggestions.push({
        id: `rep-verb-${verb}`,
        category: 'experience',
        severity: 'recommended',
        title: `Repetitive Action Verb: "${capitalizedVerb}" Starts ${data.count} Bullets`,
        description: `Overusing "${capitalizedVerb}" makes your resume sound robotic to recruiters. ATS scanners and recruiters value a diverse action vocabulary.`,
        fixHint: `Replace repeat instances with high-impact alternatives: ${alts.slice(0, 4).map(a => `"${a.charAt(0).toUpperCase() + a.slice(1)}"`).join(', ')}.`,
        sectionKey: 'experience',
        duplicateMeta: {
          type: 'Repetitive Verb',
          locations: [`Used ${data.count} times as bullet starter`],
          snippet: `Examples: ${data.snippets.join(' | ')}`,
        },
      });
    }
  });

  // ==========================================
  // 5. Summary vs Bullet Point Overlap
  // ==========================================
  const summaryOverlaps: DuplicateDetail[] = [];
  const rawSummary = stripHtml(resume.personalInfo?.summary || '');
  if (rawSummary.length > 20) {
    const summarySentences = rawSummary
      .split(/[.!?]\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 25);

    summarySentences.forEach((sentence, sIdx) => {
      const normSentence = normalizeText(sentence);
      bullets.forEach((b) => {
        if (b.normalized.includes(normSentence) || normSentence.includes(b.normalized)) {
          summaryOverlaps.push({
            type: 'summary_phrase',
            text: sentence,
            locations: ['Summary', b.location],
            fixRecommendation: `Summary sentence is repeated almost word-for-word in "${b.location}". Keep summary for positioning and bullet points for specific achievements.`,
          });

          suggestions.push({
            id: `dup-summary-overlap-${sIdx}`,
            category: 'summary',
            severity: 'recommended',
            title: 'Redundant Phrasing in Summary and Bullet Points',
            description: `A full sentence from your Executive Summary appears verbatim in "${b.location}".`,
            fixHint: 'Summarize career trajectory in the summary; reserve specific project bullets for experience entries.',
            sectionKey: 'personal',
            duplicateMeta: {
              type: 'Summary Overlap',
              locations: ['Summary', b.location],
              snippet: sentence,
            },
          });
        }
      });
    });
  }

  // ==========================================
  // 6. Duplicate Role / Education Entries
  // ==========================================
  const duplicateEntries: DuplicateDetail[] = [];

  // Check duplicate jobs
  const expEntries = resume.experience || [];
  for (let i = 0; i < expEntries.length; i++) {
    for (let j = i + 1; j < expEntries.length; j++) {
      const e1 = expEntries[i];
      const e2 = expEntries[j];
      if (
        e1.company &&
        e2.company &&
        normalizeText(e1.company) === normalizeText(e2.company) &&
        e1.role &&
        e2.role &&
        normalizeText(e1.role) === normalizeText(e2.role)
      ) {
        duplicateEntries.push({
          type: 'entry',
          text: `${e1.role} at ${e1.company}`,
          locations: [`Experience #${i + 1}`, `Experience #${j + 1}`],
          fixRecommendation: `You have two entries for "${e1.role}" at "${e1.company}". Merge them into a single position.`,
        });

        suggestions.push({
          id: `dup-entry-exp-${i}-${j}`,
          category: 'experience',
          severity: 'critical',
          title: `Duplicate Experience Entry: ${e1.role}`,
          description: `You have two separate entries for "${e1.role} at ${e1.company}".`,
          fixHint: 'Merge identical positions into one entry to avoid confusing recruiters.',
          sectionKey: 'experience',
          duplicateMeta: {
            type: 'Duplicate Entry',
            locations: [`Experience #${i + 1}`, `Experience #${j + 1}`],
          },
        });
      }
    }
  }

  // Check duplicate education
  const eduEntries = resume.education || [];
  for (let i = 0; i < eduEntries.length; i++) {
    for (let j = i + 1; j < eduEntries.length; j++) {
      const ed1 = eduEntries[i];
      const ed2 = eduEntries[j];
      if (
        ed1.school &&
        ed2.school &&
        normalizeText(ed1.school) === normalizeText(ed2.school) &&
        ed1.degree &&
        ed2.degree &&
        normalizeText(ed1.degree) === normalizeText(ed2.degree)
      ) {
        duplicateEntries.push({
          type: 'entry',
          text: `${ed1.degree} at ${ed1.school}`,
          locations: [`Education #${i + 1}`, `Education #${j + 1}`],
          fixRecommendation: `Identical education entry found for "${ed1.degree}". Remove duplicate entry.`,
        });

        suggestions.push({
          id: `dup-entry-edu-${i}-${j}`,
          category: 'education',
          severity: 'critical',
          title: `Duplicate Education Entry: ${ed1.degree}`,
          description: `Two identical education entries found for "${ed1.school}".`,
          fixHint: 'Remove the duplicate education entry in the Education section.',
          sectionKey: 'education',
        });
      }
    }
  }

  // ==========================================
  // 7. Cliché & Buzzword Detector
  // ==========================================
  const buzzwordsFound: { word: string; count: number; locations: string[] }[] = [];
  const fullTextToScan = [
    rawSummary,
    ...bullets.map((b) => b.raw),
    ...allSkillsList.map((s) => s.name),
  ].join(' ');

  const lowerCorpus = fullTextToScan.toLowerCase();

  BUZZWORDS.forEach((buzz) => {
    const regex = new RegExp(`\\b${buzz}\\b`, 'gi');
    const matches = lowerCorpus.match(regex);
    if (matches && matches.length > 0) {
      const locs: string[] = [];
      if (rawSummary.toLowerCase().includes(buzz)) locs.push('Summary');
      bullets.forEach((b) => {
        if (b.raw.toLowerCase().includes(buzz)) locs.push(b.location);
      });
      buzzwordsFound.push({
        word: buzz,
        count: matches.length,
        locations: Array.from(new Set(locs)),
      });

      suggestions.push({
        id: `buzzword-${buzz.replace(/\s+/g, '-')}`,
        category: 'summary',
        severity: 'recommended',
        title: `Overused Buzzword / Cliché: "${buzz}"`,
        description: `Recruiters and ATS rate "${buzz}" as generic filler. Modern hiring prefers demonstrated achievements over subjective self-praise.`,
        fixHint: `Replace "${buzz}" with concrete evidence or numbers (e.g. instead of "team player", show collaboration across X engineers or teams).`,
        sectionKey: 'personal',
        duplicateMeta: {
          type: 'Buzzword / Cliché',
          locations: Array.from(new Set(locs)),
          snippet: `Found "${buzz}" (${matches.length}x)`,
        },
      });
    }
  });

  // ==========================================
  // 8. Passive Voice & Weak Starters
  // ==========================================
  const passivePhrasesFound: { phrase: string; count: number; locations: string[] }[] = [];

  PASSIVE_PATTERNS.forEach(({ pattern, phrase }) => {
    const locs: string[] = [];
    bullets.forEach((b) => {
      if (pattern.test(b.raw)) {
        locs.push(b.location);
      }
    });

    if (locs.length > 0) {
      passivePhrasesFound.push({
        phrase,
        count: locs.length,
        locations: Array.from(new Set(locs)),
      });

      suggestions.push({
        id: `passive-${phrase.replace(/\s+/g, '-')}`,
        category: 'experience',
        severity: 'recommended',
        title: `Passive Phrasing: "${phrase}"`,
        description: `Passive phrases like "${phrase}" weaken your impact. ATS scoring favors active past-tense verbs.`,
        fixHint: `Lead directly with the action: e.g. instead of "${phrase} building the frontend", write "Engineered and deployed responsive frontend...".`,
        sectionKey: 'experience',
        duplicateMeta: {
          type: 'Passive Voice',
          locations: Array.from(new Set(locs)),
        },
      });
    }
  });

  // ==========================================
  // 9. Tech Brand Casing & Spelling Standardizer
  // ==========================================
  const casingSuggestions: { original: string; suggested: string; locations: string[] }[] = [];

  allSkillsList.forEach((skill) => {
    const lower = skill.name.toLowerCase();
    const target = TECH_CASING_DICTIONARY[lower];
    if (target && skill.name !== target && !skill.name.includes(target)) {
      casingSuggestions.push({
        original: skill.name,
        suggested: target,
        locations: [`Skills (${skill.category})`],
      });

      suggestions.push({
        id: `casing-${lower}`,
        category: 'skills',
        severity: 'recommended',
        title: `Standardize Tech Casing: "${skill.name}" → "${target}"`,
        description: `Official industry brand casing is "${target}". Clean capitalization demonstrates technical professionalism to hiring managers.`,
        fixHint: `Change "${skill.name}" to "${target}" in your ${skill.category} skills.`,
        sectionKey: 'skills',
        duplicateMeta: {
          type: 'Brand Casing',
          locations: [`Skills: ${skill.category}`],
          snippet: `${skill.name} → ${target}`,
        },
      });
    }
  });

  const totalIssues =
    duplicateBullets.length +
    duplicateSkills.length +
    summaryOverlaps.length +
    duplicateEntries.length +
    repetitiveStartingVerbs.length;

  return {
    report: {
      totalIssues,
      duplicateBullets,
      duplicateSkills,
      summaryOverlaps,
      duplicateEntries,
      repetitiveStartingVerbs,
      buzzwordsFound,
      passivePhrasesFound,
      casingSuggestions,
    },
    suggestions,
  };
};

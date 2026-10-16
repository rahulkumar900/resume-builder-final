/**
 * @file grammarEngine.ts
 * @description Zero-latency client-side grammar, spelling, action-verb, and syntax rule engine.
 * Safely analyzes plain text and rich HTML content without corrupting HTML markup.
 */

import { GrammarIssue, GrammarCheckResult, GrammarCategory, GrammarSeverity } from './types';
import { ENGLISH_RESUME_WORDS, ENGLISH_RESUME_LEXICON } from './dictionary';

// ==========================================
// 1. DICTIONARIES & RULE DEFINITIONS
// ==========================================

/**
 * 400+ Common Resume Typos & Misspellings Dictionary
 * Map from lowercase misspelling to proper spelling.
 */
export const COMMON_TYPOS: Record<string, string> = {
  // A
  'accross': 'across',
  'achive': 'achieve',
  'achived': 'achieved',
  'achiving': 'achieving',
  'achivement': 'achievement',
  'achivements': 'achievements',
  'accquire': 'acquire',
  'accquired': 'acquired',
  'adress': 'address',
  'adressed': 'addressed',
  'agressive': 'aggressive',
  'agressively': 'aggressively',
  'alot': 'a lot',
  'allign': 'align',
  'alligned': 'aligned',
  'alredy': 'already',
  'analyzis': 'analysis',
  'anlaysis': 'analysis',
  'anlyze': 'analyze',
  'anlyzed': 'analyzed',
  'appropiate': 'appropriate',
  'archetecture': 'architecture',
  'archetect': 'architect',
  'availabe': 'available',
  'avaiable': 'available',
  'avaliable': 'available',

  // B
  'basicly': 'basically',
  'begining': 'beginning',
  'beleive': 'believe',
  'benifit': 'benefit',
  'benifits': 'benefits',
  'buisness': 'business',
  'buisnesses': 'businesses',

  // C
  'calender': 'calendar',
  'capabilty': 'capability',
  'capabilties': 'capabilities',
  'catagory': 'category',
  'catagories': 'categories',
  'certifcate': 'certificate',
  'certifaction': 'certification',
  'certifactions': 'certifications',
  'collaberate': 'collaborate',
  'collaberated': 'collaborated',
  'collaberating': 'collaborating',
  'collaberation': 'collaboration',
  'colleague': 'colleague',
  'colleagues': 'colleagues',
  'commited': 'committed',
  'commiting': 'committing',
  'comunication': 'communication',
  'comitted': 'committed',
  'compatable': 'compatible',
  'compleatly': 'completely',
  'compenent': 'component',
  'compenents': 'components',
  'confortable': 'comfortable',
  'congradulations': 'congratulations',
  'concience': 'conscience',
  'consistant': 'consistent',
  'consistantly': 'consistently',
  'continously': 'continuously',
  'cooperate': 'cooperate',
  'cordinated': 'coordinated',
  'cordinating': 'coordinating',
  'cordinator': 'coordinator',

  // D
  'databse': 'database',
  'databses': 'databases',
  'decison': 'decision',
  'decisons': 'decisions',
  'definately': 'definitely',
  'definate': 'definite',
  'deliever': 'deliver',
  'delievered': 'delivered',
  'delievery': 'delivery',
  'dependant': 'dependent',
  'deply': 'deploy',
  'deplyed': 'deployed',
  'deplyment': 'deployment',
  'desicion': 'decision',
  'desribe': 'describe',
  'desribed': 'described',
  'devlop': 'develop',
  'devloped': 'developed',
  'devloping': 'developing',
  'devlopment': 'development',
  'devloper': 'developer',
  'devlopers': 'developers',
  'diffrent': 'different',
  'dissapear': 'disappear',
  'documetation': 'documentation',

  // E
  'efficent': 'efficient',
  'efficently': 'efficiently',
  'eligable': 'eligible',
  'embarass': 'embarrass',
  'enhancment': 'enhancement',
  'enhancments': 'enhancements',
  'enviroment': 'environment',
  'enviroments': 'environments',
  'equiptment': 'equipment',
  'esential': 'essential',
  'evalute': 'evaluate',
  'evaluted': 'evaluated',
  'excede': 'exceed',
  'exceded': 'exceeded',
  'excelent': 'excellent',
  'executve': 'executive',
  'existance': 'existence',
  'experiance': 'experience',
  'experianced': 'experienced',
  'experiances': 'experiences',
  'extention': 'extension',

  // F
  'familar': 'familiar',
  'finaly': 'finally',
  'flawles': 'flawless',
  'foriegn': 'foreign',
  'fourty': 'forty',
  'framwork': 'framework',
  'framworks': 'frameworks',
  'fullfill': 'fulfill',
  'fullfilled': 'fulfilled',
  'fundemental': 'fundamental',

  // G
  'guarentee': 'guarantee',
  'guarenteed': 'guaranteed',
  'guidlines': 'guidelines',

  // H
  'happend': 'happened',
  'hierachy': 'hierarchy',
  'hierachical': 'hierarchical',

  // I
  'impliment': 'implement',
  'implimented': 'implemented',
  'implimenting': 'implementing',
  'implimentation': 'implementation',
  'implimentations': 'implementations',
  'improvment': 'improvement',
  'improvments': 'improvements',
  'incedent': 'incident',
  'incedents': 'incidents',
  'independant': 'independent',
  'independantly': 'independently',
  'indispensible': 'indispensable',
  'infrastucture': 'infrastructure',
  'infrastrucure': 'infrastructure',
  'initative': 'initiative',
  'initatives': 'initiatives',
  'innnovation': 'innovation',
  'insted': 'instead',
  'intagration': 'integration',
  'intagrated': 'integrated',
  'intepret': 'interpret',
  'inteligence': 'intelligence',
  'intrest': 'interest',
  'intrested': 'interested',
  'intresting': 'interesting',
  'intermidiate': 'intermediate',
  'interupt': 'interrupt',

  // K
  'knowlege': 'knowledge',
  'knowlegeable': 'knowledgeable',

  // L
  'launced': 'launched',
  'launcing': 'launching',
  'leadship': 'leadership',
  'liason': 'liaison',
  'libary': 'library',
  'lisence': 'license',
  'lisenced': 'licensed',

  // M
  'maintainance': 'maintenance',
  'maintanance': 'maintenance',
  'mantenance': 'maintenance',
  'managament': 'management',
  'managment': 'management',
  'manger': 'manager', // Context dependent, but frequently a typo for manager in resumes
  'managable': 'manageable',
  'manufacuring': 'manufacturing',
  'metrix': 'metrics',
  'milstone': 'milestone',
  'milstones': 'milestones',
  'minimun': 'minimum',
  'miscelaneous': 'miscellaneous',

  // N
  'neccessary': 'necessary',
  'necesary': 'necessary',
  'negotation': 'negotiation',
  'noticable': 'noticeable',

  // O
  'occured': 'occurred',
  'occuring': 'occurring',
  'occurence': 'occurrence',
  'omision': 'omission',
  'oppurtunity': 'opportunity',
  'oppertunity': 'opportunity',
  'optmize': 'optimize',
  'optmized': 'optimized',
  'optmization': 'optimization',
  'orginization': 'organization',
  'orginizations': 'organizations',
  'outstandig': 'outstanding',

  // P
  'parrallel': 'parallel',
  'paralell': 'parallel',
  'particulary': 'particularly',
  'peformance': 'performance',
  'perfomance': 'performance',
  'perfer': 'prefer',
  'posession': 'possession',
  'practise': 'practice',
  'practicle': 'practical',
  'preceed': 'precede',
  'preceeded': 'preceded',
  'predicatable': 'predictable',
  'prefered': 'preferred',
  'preperation': 'preparation',
  'prevelant': 'prevalent',
  'priviledge': 'privilege',
  'proccess': 'process',
  'proccessed': 'processed',
  'proccessing': 'processing',
  'profesional': 'professional',
  'proffesional': 'professional',
  'profesionals': 'professionals',
  'programer': 'programmer',
  'programers': 'programmers',
  'progamming': 'programming',
  'promtion': 'promotion',
  'publc': 'public',

  // Q
  'qualifty': 'qualify',
  'quantative': 'quantitative',

  // R
  'reacheable': 'reachable',
  'reasearch': 'research',
  'reasearcher': 'researcher',
  'recieved': 'received',
  'recieving': 'receiving',
  'recogize': 'recognize',
  'recommed': 'recommend',
  'recomended': 'recommended',
  'referance': 'reference',
  'referances': 'references',
  'refactorred': 'refactored',
  'relevent': 'relevant',
  'relieble': 'reliable',
  'remeber': 'remember',
  'reponsibility': 'responsibility',
  'reponsibilities': 'responsibilities',
  'reposnsible': 'responsible',
  'responsability': 'responsibility',
  'responsable': 'responsible',
  'resourses': 'resources',
  'restfull': 'RESTful',
  'retreive': 'retrieve',
  'retreived': 'retrieved',

  // S
  'scedule': 'schedule',
  'sceduled': 'scheduled',
  'secutiry': 'security',
  'securty': 'security',
  'seperate': 'separate',
  'seperated': 'separated',
  'similiar': 'similar',
  'simplfy': 'simplify',
  'softare': 'software',
  'softwear': 'software',
  'specalist': 'specialist',
  'specfic': 'specific',
  'statitics': 'statistics',
  'succesful': 'successful',
  'succesfully': 'successfully',
  'supercede': 'supersede',
  'suport': 'support',
  'suported': 'supported',
  'surpise': 'surprise',

  // T
  'teh': 'the',
  'technolgy': 'technology',
  'technoligies': 'technologies',
  'templete': 'template',
  'templetes': 'templates',
  'tendancy': 'tendency',
  'threshhold': 'threshold',
  'tommorrow': 'tomorrow',
  'transfter': 'transfer',
  'truely': 'truly',

  // U
  'unforseen': 'unforeseen',
  'untill': 'until',
  'utilze': 'utilize',
  'utilzed': 'utilized',

  // V
  'valuble': 'valuable',
  'varient': 'variant',
  'vehical': 'vehicle',
  'visability': 'visibility',

  // W
  'wheather': 'whether',
  'wierd': 'weird',
  'writen': 'written',
  'yeild': 'yield',
};

/**
 * Standard Tech Acronym & Framework Proper Casing Map
 */
export const TECH_CAPITALIZATION_MAP: Record<string, string> = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
  'reactjs': 'React.js',
  'react': 'React',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'vuejs': 'Vue.js',
  'vue': 'Vue',
  'angularjs': 'AngularJS',
  'angular': 'Angular',
  'python': 'Python',
  'golang': 'Go',
  'postgresql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'mongodb': 'MongoDB',
  'mysql': 'MySQL',
  'sqlite': 'SQLite',
  'graphql': 'GraphQL',
  'rest': 'REST',
  'restful': 'RESTful',
  'api': 'API',
  'apis': 'APIs',
  'aws': 'AWS',
  'gcp': 'GCP',
  'azure': 'Azure',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'K8s',
  'html': 'HTML',
  'html5': 'HTML5',
  'css': 'CSS',
  'css3': 'CSS3',
  'sass': 'Sass',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'redux': 'Redux',
  'webpack': 'Webpack',
  'github': 'GitHub',
  'gitlab': 'GitLab',
  'bitbucket': 'Bitbucket',
  'jira': 'Jira',
  'confluence': 'Confluence',
  'linux': 'Linux',
  'ubuntu': 'Ubuntu',
  'ci/cd': 'CI/CD',
  'cicd': 'CI/CD',
  'json': 'JSON',
  'xml': 'XML',
  'yaml': 'YAML',
  'jwt': 'JWT',
  'oauth': 'OAuth',
  'nosql': 'NoSQL',
  'saas': 'SaaS',
  'paas': 'PaaS',
  'iaas': 'IaaS',
  'ui/ux': 'UI/UX',
  'ui': 'UI',
  'ux': 'UX',
  'seo': 'SEO',
  'qa': 'QA',
};

/**
 * Weak Verb Phrasing to High-Impact Resume Action Verbs
 */
export const WEAK_VERB_SUGGESTIONS: Array<{
  pattern: RegExp;
  matchText: string;
  replacement: string;
  explanation: string;
}> = [
  {
    pattern: /\b(?:was\s+)?responsible\s+for\b/gi,
    matchText: 'responsible for',
    replacement: 'spearheaded',
    explanation: 'Replace passive "responsible for" with a strong leadership verb like "spearheaded", "directed", or "oversaw".',
  },
  {
    pattern: /\bworked\s+on\b/gi,
    matchText: 'worked on',
    replacement: 'engineered',
    explanation: 'Replace generic "worked on" with an actionable verb like "engineered", "developed", or "architected".',
  },
  {
    pattern: /\bhelped\s+with\b/gi,
    matchText: 'helped with',
    replacement: 'collaborated on',
    explanation: 'Replace "helped with" with high-impact phrasing like "collaborated on" or "facilitated".',
  },
  {
    pattern: /\bhandled\b/gi,
    matchText: 'handled',
    replacement: 'managed',
    explanation: 'Replace casual "handled" with professional action verbs such as "managed", "orchestrated", or "administered".',
  },
  {
    pattern: /\bassisted\s+(?:in|with)\b/gi,
    matchText: 'assisted in',
    replacement: 'supported',
    explanation: 'Replace "assisted in" with concise verbs like "supported", "contributed to", or "championed".',
  },
  {
    pattern: /\bduties\s+included\b/gi,
    matchText: 'duties included',
    replacement: 'led',
    explanation: 'Avoid job-description style "duties included"; begin directly with an action verb like "led" or "delivered".',
  },
  {
    pattern: /\btasked\s+with\b/gi,
    matchText: 'tasked with',
    replacement: 'commissioned to',
    explanation: 'Transform passive assignment "tasked with" into active verbs like "commissioned to" or "spearheaded".',
  },
];

// ==========================================
// 2. HELPER UTILITIES
// ==========================================

/**
 * Extract plain text from an HTML string while preserving sentence breaks.
 */
export function stripHtmlToText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split HTML into alternating [HTML_TAG, TEXT_NODE] tokens so text replacements
 * will never alter HTML tag attributes or tag names.
 */
interface Token {
  isTag: boolean;
  content: string;
}

function tokenizeHtml(html: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  const tagRegex = /<[^>]+>/g;
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ isTag: false, content: html.slice(lastIndex, match.index) });
    }
    tokens.push({ isTag: true, content: match[0] });
    lastIndex = tagRegex.lastIndex;
  }

  if (lastIndex < html.length) {
    tokens.push({ isTag: false, content: html.slice(lastIndex) });
  }

  return tokens;
}

// ==========================================
// 2.5 DAMERAU-LEVENSHTEIN EDIT DISTANCE ALGORITHM
// ==========================================

/**
 * Computes the Damerau-Levenshtein distance between two strings.
 * Accounts for insertion, deletion, substitution, and transposition of adjacent characters.
 * 100% free, deterministic, local, and runs in sub-millisecond time.
 */
export function damerauLevenshteinDistance(source: string, target: string): number {
  const sourceLen = source.length;
  const targetLen = target.length;

  if (source === target) return 0;
  if (sourceLen === 0) return targetLen;
  if (targetLen === 0) return sourceLen;

  // 2D distance matrix
  const matrix: number[][] = [];
  for (let i = 0; i <= sourceLen; i++) {
    matrix[i] = new Array(targetLen + 1).fill(0);
    matrix[i][0] = i;
  }
  for (let j = 0; j <= targetLen; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= sourceLen; i++) {
    const sChar = source.charCodeAt(i - 1);
    for (let j = 1; j <= targetLen; j++) {
      const tChar = target.charCodeAt(j - 1);
      const cost = sChar === tChar ? 0 : 1;

      let min = Math.min(
        matrix[i - 1][j] + 1,        // deletion
        matrix[i][j - 1] + 1,        // insertion
        matrix[i - 1][j - 1] + cost   // substitution
      );

      // Transposition check (e.g. "teh" -> "the", "recieved" -> "received")
      if (
        i > 1 &&
        j > 1 &&
        source.charCodeAt(i - 1) === target.charCodeAt(j - 2) &&
        source.charCodeAt(i - 2) === target.charCodeAt(j - 1)
      ) {
        min = Math.min(min, matrix[i - 2][j - 2] + 1);
      }

      matrix[i][j] = min;
    }
  }

  return matrix[sourceLen][targetLen];
}

/**
 * Finds candidate dictionary words within a maximum edit distance.
 * Returns up to maxResults ranked suggestions sorted by distance and prefix similarity.
 */
export function findClosestSuggestions(
  word: string,
  maxDistance: number = 2,
  maxResults: number = 3
): string[] {
  const wordLen = word.length;
  const candidates: Array<{ word: string; distance: number }> = [];

  for (const dictWord of ENGLISH_RESUME_WORDS) {
    const dictLen = dictWord.length;
    // Fast length delta prune: words differing by more than maxDistance are impossible
    if (Math.abs(dictLen - wordLen) > maxDistance) continue;

    const dist = damerauLevenshteinDistance(word, dictWord);
    if (dist <= maxDistance) {
      candidates.push({ word: dictWord, distance: dist });
      // If we find sufficient distance-1 candidates, fast break
      if (dist === 1 && candidates.length >= 8) {
        break;
      }
    }
  }

  if (candidates.length === 0) return [];

  // Sort candidates: lowest distance first, then matching initial character, then length similarity
  candidates.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    const aFirstMatch = a.word[0] === word[0] ? 0 : 1;
    const bFirstMatch = b.word[0] === word[0] ? 0 : 1;
    if (aFirstMatch !== bFirstMatch) return aFirstMatch - bFirstMatch;
    return Math.abs(a.word.length - wordLen) - Math.abs(b.word.length - wordLen);
  });

  return candidates.slice(0, maxResults).map((c) => c.word);
}

// ==========================================
// 3. CORE CHECK ENGINE
// ==========================================

/**
 * Check plain text or HTML for grammar errors, typos, weak verbs, and style issues.
 */
export function checkGrammar(textOrHtml: string): GrammarCheckResult {
  const issues: GrammarIssue[] = [];
  if (!textOrHtml || !textOrHtml.trim()) {
    return {
      issues: [],
      errorCount: 0,
      warningCount: 0,
      suggestionCount: 0,
      healthScore: 100,
      cleanText: '',
    };
  }

  const plainText = stripHtmlToText(textOrHtml);
  let issueCounter = 1;

  // 1. Check Typos & Misspellings
  // Split plain text into words while keeping punctuation stripped for matching
  const words = plainText.split(/\s+/);
  const seenTypoWords = new Set<string>();

  words.forEach((rawWord) => {
    // Strip trailing or leading punctuation
    const cleanWord = rawWord.replace(/^[^\w]+|[^\w]+$/g, '');
    const lower = cleanWord.toLowerCase();

    if (cleanWord.length > 2 && COMMON_TYPOS[lower] && !seenTypoWords.has(lower)) {
      seenTypoWords.add(lower);
      const correction = COMMON_TYPOS[lower];
      // Match original capitalization
      const isCapitalized = cleanWord[0] === cleanWord[0].toUpperCase() && cleanWord.slice(1) === cleanWord.slice(1).toLowerCase();
      const finalSuggested = isCapitalized
        ? correction.charAt(0).toUpperCase() + correction.slice(1)
        : correction;

      issues.push({
        id: `typo-${issueCounter++}`,
        originalText: cleanWord,
        suggestedText: finalSuggested,
        category: 'spelling',
        severity: 'error',
        explanation: `Spelling error: "${cleanWord}" should be spelled "${finalSuggested}".`,
        contextSnippet: extractContext(plainText, cleanWord),
      });
    }

    // 2. Check Tech Acronym Capitalization
    if (TECH_CAPITALIZATION_MAP[lower] && cleanWord !== TECH_CAPITALIZATION_MAP[lower] && !seenTypoWords.has(`tech-${lower}`)) {
      seenTypoWords.add(`tech-${lower}`);
      const properCase = TECH_CAPITALIZATION_MAP[lower];
      issues.push({
        id: `tech-${issueCounter++}`,
        originalText: cleanWord,
        suggestedText: properCase,
        category: 'capitalization',
        severity: 'suggestion',
        explanation: `Proper tech branding: standard capitalization for this technology is "${properCase}".`,
        contextSnippet: extractContext(plainText, cleanWord),
      });
    }

    // 2.5 Algorithmic Typo & Spellcheck via Damerau-Levenshtein
    if (
      cleanWord.length >= 4 &&
      /^[a-zA-Z]+$/.test(cleanWord) &&
      cleanWord !== cleanWord.toUpperCase() && // Ignore all-caps acronyms (e.g. AWS, GCP, REST, CEO, GPA)
      !seenTypoWords.has(lower) &&
      !COMMON_TYPOS[lower] &&
      !TECH_CAPITALIZATION_MAP[lower] &&
      !ENGLISH_RESUME_LEXICON.has(lower)
    ) {
      const maxDist = lower.length <= 4 ? 1 : 2;
      const suggestions = findClosestSuggestions(lower, maxDist, 3);
      if (suggestions.length > 0) {
        seenTypoWords.add(lower);
        const isCapitalized =
          cleanWord[0] === cleanWord[0].toUpperCase() &&
          cleanWord.slice(1) === cleanWord.slice(1).toLowerCase();
        const topSuggested = isCapitalized
          ? suggestions[0].charAt(0).toUpperCase() + suggestions[0].slice(1)
          : suggestions[0];
        const alts = suggestions.map((s) =>
          isCapitalized ? s.charAt(0).toUpperCase() + s.slice(1) : s
        );

        issues.push({
          id: `spell-${issueCounter++}`,
          originalText: cleanWord,
          suggestedText: topSuggested,
          alternativeSuggestions: alts,
          category: 'spelling',
          severity: 'error',
          explanation: `Spelling error: "${cleanWord}" is not recognized. Did you mean "${topSuggested}"?`,
          contextSnippet: extractContext(plainText, cleanWord),
        });
      }
    }
  });

  // 3. Check Weak Action Verbs
  WEAK_VERB_SUGGESTIONS.forEach((rule) => {
    let match: RegExpExecArray | null;
    const regex = new RegExp(rule.pattern.source, 'gi');
    while ((match = regex.exec(plainText)) !== null) {
      const matchedText = match[0];
      issues.push({
        id: `verb-${issueCounter++}`,
        originalText: matchedText,
        suggestedText: rule.replacement,
        category: 'verb',
        severity: 'suggestion',
        explanation: rule.explanation,
        contextSnippet: extractContext(plainText, matchedText),
      });
    }
  });

  // 4. Check Repeated Words ("the the", "in in", "and and")
  const repeatedRegex = /\b([a-zA-Z]{2,})\s+\1\b/gi;
  let repMatch: RegExpExecArray | null;
  while ((repMatch = repeatedRegex.exec(plainText)) !== null) {
    issues.push({
      id: `rep-${issueCounter++}`,
      originalText: repMatch[0],
      suggestedText: repMatch[1],
      category: 'grammar',
      severity: 'error',
      explanation: `Repeated word: "${repMatch[1]}" is repeated consecutively.`,
      contextSnippet: extractContext(plainText, repMatch[0]),
    });
  }

  // 5. Check Punctuation Spacing (Missing space after comma/period, e.g. "React,Node" or "delivered.Led")
  // Exclude URLs, file extensions, or version numbers (e.g. 2.0 or test.com or node.js)
  const missingSpaceRegex = /\b([a-zA-Z]{2,})([,])([a-zA-Z]{2,})\b/g;
  let puncMatch: RegExpExecArray | null;
  while ((puncMatch = missingSpaceRegex.exec(plainText)) !== null) {
    const original = puncMatch[0];
    const replacement = `${puncMatch[1]}, ${puncMatch[3]}`;
    issues.push({
      id: `punc-${issueCounter++}`,
      originalText: original,
      suggestedText: replacement,
      category: 'punctuation',
      severity: 'warning',
      explanation: `Missing space after comma in "${original}".`,
      contextSnippet: extractContext(plainText, original),
    });
  }

  // 6. Check First-Person Pronouns in Bullets ("I developed", "My responsibilities")
  const firstPersonRegex = /\b(I|I've|my|we|our)\s+([a-zA-Z]+)\b/g;
  let fpMatch: RegExpExecArray | null;
  while ((fpMatch = firstPersonRegex.exec(plainText)) !== null) {
    // Only flag if it looks like a resume bullet beginning or active sentence
    const word = fpMatch[1];
    issues.push({
      id: `style-${issueCounter++}`,
      originalText: fpMatch[0],
      suggestedText: fpMatch[2],
      category: 'style',
      severity: 'suggestion',
      explanation: `Resume best practice: avoid first-person pronouns ("${word}"). Begin bullet points directly with an action verb.`,
      contextSnippet: extractContext(plainText, fpMatch[0]),
    });
  }

  // Count severities
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const suggestionCount = issues.filter((i) => i.severity === 'suggestion').length;

  // Deduct points for errors and warnings
  const deduction = errorCount * 15 + warningCount * 8 + suggestionCount * 3;
  const healthScore = Math.max(0, 100 - deduction);

  return {
    issues,
    errorCount,
    warningCount,
    suggestionCount,
    healthScore,
    cleanText: plainText,
  };
}

/**
 * Extract a ~60 character context snippet around the matched keyword
 */
function extractContext(text: string, match: string): string {
  const index = text.indexOf(match);
  if (index === -1) return match;
  const start = Math.max(0, index - 25);
  const end = Math.min(text.length, index + match.length + 25);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < text.length ? '...' : '';
  return `${prefix}${text.slice(start, end)}${suffix}`;
}

// ==========================================
// 4. AUTO-CORRECT REPLACEMENT FUNCTIONS
// ==========================================

/**
 * Replace a single issue in text or HTML safely
 */
export function applySingleFix(
  textOrHtml: string,
  issue: GrammarIssue
): string {
  if (!textOrHtml || !issue || !issue.originalText || !issue.suggestedText) {
    return textOrHtml;
  }

  const isHtml = /<[a-z][\s\S]*>/i.test(textOrHtml);

  if (!isHtml) {
    // Plain text replacement with word boundary where applicable
    const escaped = escapeRegex(issue.originalText);
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    return textOrHtml.replace(regex, issue.suggestedText);
  }

  // Safe HTML Tokenized Replacement:
  // Only replace inside text tokens, NEVER touch HTML tag tokens!
  const tokens = tokenizeHtml(textOrHtml);
  const escaped = escapeRegex(issue.originalText);
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');

  let replaced = false;
  const updatedTokens = tokens.map((token) => {
    if (token.isTag || replaced) return token.content;
    if (regex.test(token.content)) {
      replaced = true;
      return token.content.replace(regex, issue.suggestedText);
    }
    return token.content;
  });

  return updatedTokens.join('');
}

/**
 * Automatically correct all detected issues in text or HTML in one pass.
 */
export function autoCorrectText(
  textOrHtml: string,
  explicitIssues?: GrammarIssue[]
): { updatedHtml: string; fixedCount: number } {
  if (!textOrHtml || !textOrHtml.trim()) {
    return { updatedHtml: textOrHtml, fixedCount: 0 };
  }

  const issuesToFix = explicitIssues || checkGrammar(textOrHtml).issues;
  if (issuesToFix.length === 0) {
    return { updatedHtml: textOrHtml, fixedCount: 0 };
  }

  let current = textOrHtml;
  let fixedCount = 0;

  // Fix errors and warnings first, then suggestions
  const sortedIssues = [...issuesToFix].sort((a, b) => {
    const weight = { error: 3, warning: 2, suggestion: 1 };
    return weight[b.severity] - weight[a.severity];
  });

  sortedIssues.forEach((issue) => {
    // Only auto-correct unambiguous spelling, capitalization, repeated words, and punctuation
    if (
      issue.category === 'spelling' ||
      issue.category === 'capitalization' ||
      issue.category === 'grammar' ||
      issue.category === 'punctuation' ||
      (issue.category === 'verb' && issue.originalText.toLowerCase().includes('responsible for'))
    ) {
      const before = current;
      current = applySingleFix(current, issue);
      if (current !== before) {
        fixedCount++;
      }
    }
  });

  return { updatedHtml: current, fixedCount };
}

function escapeRegex(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

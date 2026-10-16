// 120+ High-Impact Action Verbs categorized by domain
export const ACTION_VERBS_BY_CATEGORY = {
  leadership: [
    'spearheaded', 'orchestrated', 'championed', 'directed', 'mentored', 'empowered',
    'mobilized', 'steered', 'guided', 'commanded', 'delegated', 'cultivated',
    'fostered', 'recruited', 'restructured', 'supervised', 'governed', 'oversaw',
  ],
  engineering: [
    'architected', 'engineered', 'programmed', 'deployed', 'automated', 'integrated',
    'refactored', 'configured', 'modeled', 'synthesized', 'constructed', 'migrated',
    'implemented', 'standardized', 'maintained', 'benchmarked', 'debugged', 'tested',
  ],
  optimization: [
    'optimized', 'accelerated', 'reduced', 'maximized', 'minimized', 'streamlined',
    'boosted', 'consolidated', 'amplified', 'surpassed', 'revitalized', 'enhanced',
    'cut', 'outperformed', 'mitigated', 'rationalized', 'upgraded', 'simplified',
  ],
  execution: [
    'delivered', 'executed', 'launched', 'initiated', 'achieved', 'generated',
    'established', 'built', 'created', 'designed', 'published', 'negotiated',
    'secured', 'formalized', 'pioneered', 'formulated', 'drove', 'authored',
  ],
  research: [
    'analyzed', 'evaluated', 'identified', 'discovered', 'forecasted', 'modeled',
    'quantified', 'audited', 'investigated', 'screened', 'surveyed', 'diagnosed',
    'extracted', 'validated', 'scrutinized', 'mapped', 'assessed', 'pinpointed',
  ],
};

export const ALL_ACTION_VERBS = Array.from(
  new Set(Object.values(ACTION_VERBS_BY_CATEGORY).flat())
);

// Weak, subjective, or filler words ATS flags
export const WEAK_WORDS = [
  'responsible for', 'worked on', 'helped with', 'assisted in', 'handled',
  'duties included', 'participated in', 'tasked with', 'attempted',
];

// First-person pronouns (penalized in modern professional resume parsing)
export const FIRST_PERSON_PRONOUNS = [
  'i', 'me', 'my', 'myself', 'we', 'us', 'our', 'ours', 'ourselves',
];

/**
 * Strips HTML tags and decodes common HTML entities for plain text parsing
 */
export const stripHtml = (html?: string): string => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
};

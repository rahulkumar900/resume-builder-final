/**
 * @file types.ts
 * @description Types and interfaces for the Grammar Error Highlighter and Auto-Correct Engine.
 */

export type GrammarCategory =
  | 'spelling'
  | 'grammar'
  | 'verb'
  | 'capitalization'
  | 'style'
  | 'punctuation';

export type GrammarSeverity = 'error' | 'warning' | 'suggestion';

export interface GrammarIssue {
  id: string;
  originalText: string;
  suggestedText: string;
  category: GrammarCategory;
  severity: GrammarSeverity;
  explanation: string;
  /** Alternative suggestions found by Damerau-Levenshtein distance algorithm */
  alternativeSuggestions?: string[];
  /** Optional index range in the plain text if available */
  startIndex?: number;
  endIndex?: number;
  contextSnippet?: string;
}

export interface GrammarCheckResult {
  issues: GrammarIssue[];
  errorCount: number;
  warningCount: number;
  suggestionCount: number;
  healthScore: number; // 0 to 100
  cleanText: string;
}

export interface SectionGrammarAudit {
  sectionKey: string;
  sectionTitle: string;
  itemCount: number;
  issues: GrammarIssue[];
}

export interface FullResumeGrammarReport {
  totalIssues: number;
  overallHealthScore: number;
  sections: SectionGrammarAudit[];
}

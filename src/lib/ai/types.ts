/**
 * @file types.ts
 * @description Core interfaces and data models for the AI Suggestion subsystem.
 *
 * SOLID Principles Alignment:
 * - Interface Segregation Principle (ISP): Discrete, targeted interfaces for requests, responses,
 *   and providers without unnecessary client coupling.
 * - Dependency Inversion Principle (DIP): High-level UI consumers depend upon the `IAiSuggestionProvider`
 *   abstraction rather than concrete network or heuristic implementations.
 */

export type AiSectionType = 'experience' | 'skills' | 'project' | 'summary';

export type AiTone = 'metrics' | 'leadership' | 'technical' | 'concise';

export type SeniorityLevel = 'entry' | 'mid' | 'senior' | 'lead';

/**
 * Section-specific request payload tailored to the unique requirements of each resume section.
 */
export interface AiSuggestionRequest {
  /** Target section receiving suggestions */
  section: AiSectionType;

  /** Target job title or role being pursued (required across all sections) */
  targetRole: string;

  /** Employer or organization name (critical context for experience bullets) */
  company?: string;

  /** Project title or feature name (required context for projects) */
  projectName?: string;

  /** List of technologies or frameworks used (for projects and tech skills) */
  technologies?: string[];

  /** Target seniority level (e.g. entry-level vs senior staff) */
  seniorityLevel?: SeniorityLevel;

  /** Output tone and perspective */
  tone?: AiTone;

  /** Optional user-specified focus (e.g. "Focus on AWS cloud migration & cost savings") */
  userFocusPrompt?: string;

  /** Existing draft text if the user wants to polish or rewrite */
  existingContent?: string;

  /** If true, bypasses the database cache and invokes fresh Gemini generation */
  forceFresh?: boolean;
}

/**
 * Structured skill category representation for 1-click addition or replacement in the resume.
 */
export interface SkillGroupSuggestion {
  category: string;
  items: string[];
}

/**
 * Result payload delivered by any suggestion provider.
 */
export interface AiSuggestionResponse {
  /** Generated bullet points or narrative summaries */
  suggestions: string[];

  /** Structured skill groups (populated when section === 'skills') */
  skillGroups?: SkillGroupSuggestion[];

  /** Source provider delivering this result */
  provider: 'gemini' | 'heuristic' | 'cache' | 'database';

  /** Processing latency in milliseconds */
  latencyMs: number;

  /** Optional database IDs for usage tracking */
  items?: Array<{ id: string; content: string; usage_count?: number }>;
}

/**
 * Contract implemented by all AI suggestion backends (Remote LLM, Offline Heuristics, Cached Decorators).
 */
export interface IAiSuggestionProvider {
  /**
   * Generates tailored suggestions based on section-specific requirements.
   * @param request The contextual suggestion request.
   * @returns Promise resolving to the suggestion response.
   */
  generateSuggestions(request: AiSuggestionRequest): Promise<AiSuggestionResponse>;
}

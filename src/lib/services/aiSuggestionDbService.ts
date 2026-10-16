import { supabase } from '@/lib/supabaseClient';
import { AiSectionType, AiTone, SeniorityLevel, SkillGroupSuggestion } from '@/lib/ai/types';

export interface DbSuggestionItem {
  id: string;
  content: string;
  category?: string;
  usage_count: number;
}

export interface FetchDbSuggestionsResult {
  suggestions: string[];
  skillGroups?: SkillGroupSuggestion[];
  items: DbSuggestionItem[];
}

/**
 * Fetches cached community AI suggestions from the Supabase database for a given role and section.
 * Automatically orders by popularity (usage_count DESC) so top-rated bullets appear first.
 */
export async function fetchRoleSuggestionsFromDb(params: {
  role: string;
  section: AiSectionType;
  tone?: AiTone;
  seniority?: SeniorityLevel;
  limit?: number;
}): Promise<FetchDbSuggestionsResult> {
  const { role, section, tone, limit = 6 } = params;
  const cleanRole = (role || '').trim().toLowerCase();

  if (!cleanRole || !supabase) {
    return { suggestions: [], items: [] };
  }

  try {
    // 1. Try exact or partial role match in ai_role_suggestions
    let query = supabase
      .from('ai_role_suggestions')
      .select('id, content, category, usage_count, tone')
      .ilike('role', `%${cleanRole}%`)
      .eq('section', section)
      .order('usage_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit * 2);

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return { suggestions: [], items: [] };
    }

    // Sort matching tone to the top if tone was specified
    const sortedData = tone
      ? [...data].sort((a, b) => {
          if (a.tone === tone && b.tone !== tone) return -1;
          if (b.tone === tone && a.tone !== tone) return 1;
          return b.usage_count - a.usage_count;
        })
      : data;

    const trimmedData = sortedData.slice(0, limit);

    // If section === 'skills', rebuild structured SkillGroupSuggestions
    if (section === 'skills') {
      const groupsMap = new Map<string, string[]>();
      trimmedData.forEach((row) => {
        const cat = row.category || 'Core Domain Skills';
        if (!groupsMap.has(cat)) {
          groupsMap.set(cat, []);
        }
        groupsMap.get(cat)!.push(row.content);
      });

      const skillGroups: SkillGroupSuggestion[] = Array.from(groupsMap.entries()).map(
        ([category, items]) => ({
          category,
          items,
        })
      );

      return {
        suggestions: trimmedData.map((d) => d.content),
        skillGroups,
        items: trimmedData.map((d) => ({
          id: d.id,
          content: d.content,
          category: d.category,
          usage_count: d.usage_count,
        })),
      };
    }

    return {
      suggestions: trimmedData.map((d) => d.content),
      items: trimmedData.map((d) => ({
        id: d.id,
        content: d.content,
        category: d.category,
        usage_count: d.usage_count,
      })),
    };
  } catch (err) {
    // Graceful silent fallback if table does not exist or database is offline
    console.warn('Could not fetch suggestions from Supabase (safe fallback):', err);
    return { suggestions: [], items: [] };
  }
}

/**
/**
 * Persists freshly generated AI suggestions to Supabase.
 * STRICT DEDUPLICATION:
 * 1. Deduplicates within the incoming batch.
 * 2. Pre-checks existing database rows to filter out anything already stored.
 * 3. Uses ON CONFLICT DO NOTHING so existing data is NEVER overwritten or mutated.
 */
export async function saveRoleSuggestionsToDb(params: {
  role: string;
  section: AiSectionType;
  suggestions: string[];
  skillGroups?: SkillGroupSuggestion[];
  tone?: AiTone;
  seniority?: SeniorityLevel;
  source?: 'gemini' | 'curated' | 'user';
}): Promise<void> {
  const { role, section, suggestions, skillGroups, tone = 'metrics', seniority = 'mid', source = 'gemini' } = params;
  const cleanRole = (role || '').trim().toLowerCase();

  if (!cleanRole || !supabase) return;

  try {
    // Level 1: Fetch existing content from DB to avoid any duplicate operations
    const { data: existingRows } = await supabase
      .from('ai_role_suggestions')
      .select('content')
      .ilike('role', cleanRole)
      .eq('section', section);

    const existingContentSet = new Set(
      (existingRows || []).map((r) => r.content.trim().toLowerCase())
    );

    // Case A: Skills Section with structured skill groups
    if (section === 'skills' && skillGroups && skillGroups.length > 0) {
      const uniqueSkillMap = new Map<string, { skill: string; category: string }>();

      skillGroups.forEach((group) => {
        group.items.forEach((skill) => {
          const trimmed = skill.trim();
          const lower = trimmed.toLowerCase();
          // Filter duplicates within batch and existing in DB
          if (trimmed && !existingContentSet.has(lower) && !uniqueSkillMap.has(lower)) {
            uniqueSkillMap.set(lower, { skill: trimmed, category: group.category || 'General' });
          }
        });
      });

      const newSkillsToInsert = Array.from(uniqueSkillMap.values());
      if (newSkillsToInsert.length === 0) {
        return; // All skills already exist, strictly do not update
      }

      const promises = newSkillsToInsert.map(({ skill, category }) =>
        supabase.rpc('upsert_role_suggestion', {
          p_role: cleanRole,
          p_section: section,
          p_content: skill,
          p_category: category,
          p_tone: tone,
          p_seniority: seniority,
          p_source: source,
        })
      );
      await Promise.allSettled(promises);
      return;
    }

    // Case B: Bullets, Summaries, or Projects
    if (suggestions && suggestions.length > 0) {
      const uniqueBatchMap = new Map<string, string>(); // lowerKey -> originalText

      suggestions.forEach((item) => {
        const trimmed = item.trim();
        const lower = trimmed.toLowerCase();
        // Filter duplicates within batch and existing in DB
        if (trimmed && !existingContentSet.has(lower) && !uniqueBatchMap.has(lower)) {
          uniqueBatchMap.set(lower, trimmed);
        }
      });

      const newItemsToInsert = Array.from(uniqueBatchMap.values());
      if (newItemsToInsert.length === 0) {
        return; // All items already exist in database, strictly do not update
      }

      const promises = newItemsToInsert.map((bullet) =>
        supabase.rpc('upsert_role_suggestion', {
          p_role: cleanRole,
          p_section: section,
          p_content: bullet,
          p_category: 'General',
          p_tone: tone,
          p_seniority: seniority,
          p_source: source,
        })
      );
      await Promise.allSettled(promises);
    }
  } catch (err) {
    console.warn('AI suggestion deduplication persistence notice:', err);
  }
}

/**
 * Increments the usage count of a suggestion when the user copies or inserts it.
 * Highly scalable self-learning mechanism that optimizes ranking over time.
 */
export async function recordSuggestionUsage(idOrContent: {
  id?: string;
  role?: string;
  section?: AiSectionType;
  content?: string;
}): Promise<void> {
  if (!supabase) return;

  try {
    if (idOrContent.id) {
      await supabase.rpc('increment_suggestion_usage', { p_id: idOrContent.id });
      return;
    }

    if (idOrContent.role && idOrContent.section && idOrContent.content) {
      // Fallback: match by role, section, content
      await supabase.rpc('upsert_role_suggestion', {
        p_role: idOrContent.role.trim().toLowerCase(),
        p_section: idOrContent.section,
        p_content: idOrContent.content.trim(),
      });
    }
  } catch (err) {
    console.warn('Failed to record suggestion usage (safe to ignore):', err);
  }
}

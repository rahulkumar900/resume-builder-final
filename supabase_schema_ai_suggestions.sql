-- ==============================================================================
-- Supabase Schema: AI Role Suggestions & Community Knowledge Base
-- ==============================================================================
-- Description:
-- Stores high-converting AI-generated and curated resume accomplishment bullets,
-- professional summaries, skill sets, and project highlights linked to job roles.
-- Implements automatic deduplication, trigram fuzzy search, and self-learning usage ranking.
-- ==============================================================================

-- 1. Ensure extensions exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Create ai_role_suggestions table
CREATE TABLE IF NOT EXISTS public.ai_role_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,                             -- Normalized job title (e.g. "software engineer")
  section TEXT NOT NULL,                          -- 'experience' | 'skills' | 'summary' | 'project'
  content TEXT NOT NULL,                          -- The bullet text, summary paragraph, or skill item
  category TEXT DEFAULT 'General',                -- Category grouping (especially for skills or projects)
  tone TEXT DEFAULT 'metrics',                    -- 'metrics' | 'leadership' | 'technical' | 'concise'
  seniority TEXT DEFAULT 'mid',                   -- 'entry' | 'mid' | 'senior' | 'lead'
  usage_count INT DEFAULT 1,                      -- Number of times users copied/inserted this suggestion
  source TEXT DEFAULT 'gemini',                   -- 'gemini' | 'curated' | 'user'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. High-performance composite lookup index
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_lookup 
  ON public.ai_role_suggestions (LOWER(role), section, tone);

-- 4. Trigram index for typo-tolerant fuzzy role matching
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_role_trgm 
  ON public.ai_role_suggestions USING gin (role gin_trgm_ops);

-- 5. Section and popularity index
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_popularity 
  ON public.ai_role_suggestions (section, usage_count DESC, created_at DESC);

-- 6. Content deduplication unique index
-- Ensures the exact same bullet/text is never duplicated under the same role and section.
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_suggestions_unique_content 
  ON public.ai_role_suggestions (LOWER(role), section, md5(content));

-- 7. Stored Procedure: Increment suggestion usage count
-- Triggered when a user clicks "Insert", "Replace", or "Copy"
CREATE OR REPLACE FUNCTION public.increment_suggestion_usage(p_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.ai_role_suggestions
  SET 
    usage_count = usage_count + 1,
    updated_at = NOW()
  WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Stored Procedure: Upsert suggestion with strict deduplication
-- Inserts a new suggestion only if it does not already exist; does NOT update or mutate existing duplicate data.
CREATE OR REPLACE FUNCTION public.upsert_role_suggestion(
  p_role TEXT,
  p_section TEXT,
  p_content TEXT,
  p_category TEXT DEFAULT 'General',
  p_tone TEXT DEFAULT 'metrics',
  p_seniority TEXT DEFAULT 'mid',
  p_source TEXT DEFAULT 'gemini'
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO public.ai_role_suggestions (
    role, section, content, category, tone, seniority, usage_count, source
  )
  VALUES (
    LOWER(TRIM(p_role)), p_section, TRIM(p_content), p_category, p_tone, p_seniority, 1, p_source
  )
  ON CONFLICT (LOWER(role), section, md5(content))
  DO NOTHING
  RETURNING id INTO v_id;

  -- If conflict occurred (duplicate already exists), return existing ID without mutating or updating the row
  IF v_id IS NULL THEN
    SELECT id INTO v_id
    FROM public.ai_role_suggestions
    WHERE LOWER(role) = LOWER(TRIM(p_role))
      AND section = p_section
      AND md5(content) = md5(TRIM(p_content))
    LIMIT 1;
  END IF;

  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Row Level Security (RLS) Policies
ALTER TABLE public.ai_role_suggestions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to suggestions
DROP POLICY IF EXISTS "Public can view ai suggestions" ON public.ai_role_suggestions;
CREATE POLICY "Public can view ai suggestions"
  ON public.ai_role_suggestions
  FOR SELECT
  USING (true);

-- Allow public/authenticated insert of suggestions
DROP POLICY IF EXISTS "Public can insert ai suggestions" ON public.ai_role_suggestions;
CREATE POLICY "Public can insert ai suggestions"
  ON public.ai_role_suggestions
  FOR INSERT
  WITH CHECK (true);

-- Allow public update of usage count
DROP POLICY IF EXISTS "Public can update ai suggestions usage" ON public.ai_role_suggestions;
CREATE POLICY "Public can update ai suggestions usage"
  ON public.ai_role_suggestions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

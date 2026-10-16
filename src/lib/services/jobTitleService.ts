import { supabase } from '@/lib/supabaseClient';

// Built-in fallback cache (works offline or when Supabase table is not yet seeded)
export const FALLBACK_JOB_TITLES: string[] = [
  'Software Engineer',
  'Senior Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Mobile Application Developer',
  'QA Automation Engineer',
  'Cybersecurity Analyst',
  'Data Scientist',
  'Data Analyst',
  'Data Engineer',
  'Machine Learning Engineer',
  'AI Research Scientist',
  'Business Intelligence Analyst',
  'Product Manager',
  'Senior Product Manager',
  'Product Designer',
  'UI/UX Designer',
  'Scrum Master',
  'Financial Analyst',
  'Senior Financial Analyst',
  'Investment Banking Analyst',
  'Accountant',
  'Finance Manager',
  'Marketing Specialist',
  'Growth Marketing Manager',
  'Content Strategist',
  'SEO Specialist',
  'Account Executive',
  'Business Development Representative',
  'Operations Manager',
  'Project Manager',
  'Program Manager',
  'Human Resources Generalist',
  'Technical Recruiter',
  'Management Consultant',
  'Business Analyst',
  'Mechanical Engineer',
  'Civil Engineer',
  'Electrical Engineer',
];

/**
 * Searches job titles from the Supabase database.
 * Falls back seamlessly to local cache if network/database is unavailable.
 */
export async function searchJobTitlesFromDb(query: string, limit = 6): Promise<string[]> {
  const clean = query.trim();

  try {
    // If Supabase client has configuration, attempt remote DB query
    if (supabase) {
      let queryBuilder = supabase
        .from('job_titles')
        .select('title, usage_count')
        .order('usage_count', { ascending: false })
        .limit(limit);

      if (clean) {
        queryBuilder = queryBuilder.ilike('title', `%${clean}%`);
      }

      const { data, error } = await queryBuilder;

      if (!error && data && data.length > 0) {
        return data.map((row: { title: string }) => row.title);
      }
    }
  } catch (err) {
    // Silently continue to fallback cache
    console.debug('Supabase job titles query error (using fallback cache):', err);
  }

  // Fallback to local in-memory filtering
  if (!clean) {
    return FALLBACK_JOB_TITLES.slice(0, limit);
  }

  const cleanLower = clean.toLowerCase();
  return FALLBACK_JOB_TITLES
    .filter((title) => title.toLowerCase().includes(cleanLower))
    .slice(0, limit);
}

/**
 * Records a job title usage or adds it to Supabase so popular titles rank higher.
 */
export async function recordJobTitleUsage(title: string, category = 'General'): Promise<void> {
  const clean = title.trim();
  if (!clean || clean.length < 2) return;

  try {
    if (supabase) {
      // Call RPC function if available, or fall back to insert/upsert
      const { error } = await supabase.rpc('increment_job_title_usage', {
        p_title: clean,
        p_category: category,
      });

      if (error) {
        // Fallback: simple upsert if RPC is not created yet
        await supabase
          .from('job_titles')
          .upsert({ title: clean, category }, { onConflict: 'title' });
      }
    }
  } catch (err) {
    console.debug('Failed to record job title usage (non-blocking):', err);
  }
}

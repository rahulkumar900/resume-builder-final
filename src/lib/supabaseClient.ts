import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// A simple check to prevent crashing if env vars are missing during development
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

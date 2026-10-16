-- ==============================================================================
-- Job Titles Autocomplete & Taxonomy Schema (Supabase / PostgreSQL)
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable pg_trgm extension for ultra-fast fuzzy substring matching
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Create Job Titles Table
CREATE TABLE IF NOT EXISTS job_titles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'General',
  usage_count INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Trigram Index for instant autocomplete ILIKE queries
CREATE INDEX IF NOT EXISTS job_titles_title_trgm_idx ON job_titles USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS job_titles_usage_idx ON job_titles (usage_count DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE job_titles ENABLE ROW LEVEL SECURITY;

-- Allow public (anon & authenticated) to read job titles
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'job_titles' AND policyname = 'Allow public read access to job_titles'
  ) THEN
    CREATE POLICY "Allow public read access to job_titles"
      ON job_titles FOR SELECT
      USING (true);
  END IF;
END $$;

-- Allow public to insert new job titles or increment usage
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'job_titles' AND policyname = 'Allow insert/upsert for job_titles'
  ) THEN
    CREATE POLICY "Allow insert/upsert for job_titles"
      ON job_titles FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

-- 5. Stored Procedure for Self-Learning Usage Increment
CREATE OR REPLACE FUNCTION increment_job_title_usage(p_title TEXT, p_category TEXT DEFAULT 'General')
RETURNS void AS $$
BEGIN
  INSERT INTO job_titles (title, category, usage_count)
  VALUES (TRIM(p_title), p_category, 1)
  ON CONFLICT (title)
  DO UPDATE SET usage_count = job_titles.usage_count + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Comprehensive Seed Data (~160 In-Demand Roles Across Major Industries)
INSERT INTO job_titles (title, category, usage_count) VALUES
  -- Software Engineering & Architecture
  ('Software Engineer', 'Engineering', 100),
  ('Senior Software Engineer', 'Engineering', 95),
  ('Lead Software Engineer', 'Engineering', 85),
  ('Staff Software Engineer', 'Engineering', 75),
  ('Principal Software Engineer', 'Engineering', 70),
  ('Frontend Developer', 'Engineering', 90),
  ('Senior Frontend Developer', 'Engineering', 80),
  ('Backend Developer', 'Engineering', 90),
  ('Senior Backend Developer', 'Engineering', 80),
  ('Full Stack Developer', 'Engineering', 95),
  ('Senior Full Stack Engineer', 'Engineering', 85),
  ('DevOps Engineer', 'Engineering', 85),
  ('Site Reliability Engineer (SRE)', 'Engineering', 80),
  ('Cloud Architect', 'Engineering', 75),
  ('Cloud Engineer (AWS/GCP/Azure)', 'Engineering', 75),
  ('Systems Engineer', 'Engineering', 65),
  ('Embedded Software Engineer', 'Engineering', 60),
  ('Mobile Application Developer (iOS/Android)', 'Engineering', 80),
  ('iOS Developer', 'Engineering', 75),
  ('Android Developer', 'Engineering', 75),
  ('Flutter Developer', 'Engineering', 70),
  ('React Native Developer', 'Engineering', 70),
  ('QA Automation Engineer', 'Engineering', 75),
  ('Security Engineer', 'Engineering', 70),
  ('Cybersecurity Analyst', 'Engineering', 75),

  -- Data & Artificial Intelligence
  ('Data Scientist', 'Data & AI', 90),
  ('Senior Data Scientist', 'Data & AI', 80),
  ('Data Analyst', 'Data & AI', 90),
  ('Senior Data Analyst', 'Data & AI', 75),
  ('Data Engineer', 'Data & AI', 85),
  ('Senior Data Engineer', 'Data & AI', 75),
  ('Machine Learning Engineer', 'Data & AI', 85),
  ('AI Research Scientist', 'Data & AI', 70),
  ('Prompt Engineer & AI Specialist', 'Data & AI', 65),
  ('Business Intelligence (BI) Analyst', 'Data & AI', 75),
  ('BI Developer', 'Data & AI', 70),
  ('Database Administrator (DBA)', 'Data & AI', 65),
  ('Big Data Engineer', 'Data & AI', 65),

  -- Product & Design
  ('Product Manager', 'Product & Design', 90),
  ('Senior Product Manager', 'Product & Design', 85),
  ('Technical Product Manager', 'Product & Design', 80),
  ('Associate Product Manager (APM)', 'Product & Design', 70),
  ('Product Owner', 'Product & Design', 75),
  ('UI/UX Designer', 'Product & Design', 85),
  ('Senior UI/UX Designer', 'Product & Design', 80),
  ('Product Designer', 'Product & Design', 85),
  ('Senior Product Designer', 'Product & Design', 80),
  ('Design Systems Lead', 'Product & Design', 65),
  ('Graphic Designer', 'Product & Design', 75),
  ('Motion Designer', 'Product & Design', 60),
  ('UX Researcher', 'Product & Design', 70),
  ('Scrum Master', 'Product & Design', 70),
  ('Agile Coach', 'Product & Design', 60),

  -- Marketing & Communications
  ('Digital Marketing Specialist', 'Marketing', 80),
  ('Marketing Manager', 'Marketing', 80),
  ('Growth Marketing Manager', 'Marketing', 75),
  ('Performance Marketer', 'Marketing', 70),
  ('Content Strategist', 'Marketing', 70),
  ('Content Writer & Copywriter', 'Marketing', 70),
  ('SEO Specialist', 'Marketing', 75),
  ('Social Media Manager', 'Marketing', 75),
  ('Brand Strategist', 'Marketing', 65),
  ('Public Relations (PR) Specialist', 'Marketing', 60),
  ('Email Marketing Specialist', 'Marketing', 65),
  ('Community Manager', 'Marketing', 60),

  -- Sales & Business Development
  ('Account Executive', 'Sales', 80),
  ('Senior Account Executive', 'Sales', 75),
  ('Business Development Representative (BDR)', 'Sales', 75),
  ('Sales Development Representative (SDR)', 'Sales', 75),
  ('Sales Manager', 'Sales', 75),
  ('Director of Sales', 'Sales', 65),
  ('Customer Success Manager (CSM)', 'Sales', 80),
  ('Customer Support Specialist', 'Sales', 70),
  ('Client Relations Specialist', 'Sales', 65),
  ('Partnership Manager', 'Sales', 65),

  -- Finance & Accounting
  ('Financial Analyst', 'Finance', 85),
  ('Senior Financial Analyst', 'Finance', 80),
  ('Investment Banking Analyst', 'Finance', 75),
  ('Equity Research Analyst', 'Finance', 70),
  ('Accountant', 'Finance', 80),
  ('Senior Accountant', 'Finance', 75),
  ('Chartered Accountant (CA)', 'Finance', 75),
  ('Tax Consultant', 'Finance', 70),
  ('Auditor / Internal Auditor', 'Finance', 70),
  ('Finance Manager', 'Finance', 75),
  ('Controller / Financial Controller', 'Finance', 65),
  ('Risk Analyst', 'Finance', 70),
  ('Credit Analyst', 'Finance', 65),
  ('Actuary', 'Finance', 60),

  -- Human Resources & Operations
  ('Human Resources (HR) Generalist', 'Operations', 80),
  ('HR Manager', 'Operations', 75),
  ('Talent Acquisition Specialist / Recruiter', 'Operations', 80),
  ('Technical Recruiter', 'Operations', 75),
  ('People Operations Lead', 'Operations', 70),
  ('Operations Manager', 'Operations', 80),
  ('Operations Coordinator', 'Operations', 70),
  ('Chief of Staff', 'Operations', 65),
  ('Project Manager', 'Operations', 85),
  ('Senior Project Manager', 'Operations', 80),
  ('Program Manager', 'Operations', 80),
  ('Supply Chain Analyst', 'Operations', 70),
  ('Logistics Coordinator', 'Operations', 65),
  ('Procurement Specialist', 'Operations', 65),

  -- Healthcare & Life Sciences
  ('Clinical Research Associate', 'Healthcare', 65),
  ('Medical Officer / Physician', 'Healthcare', 60),
  ('Registered Nurse (RN)', 'Healthcare', 75),
  ('Healthcare Administrator', 'Healthcare', 65),
  ('Biomedical Engineer', 'Healthcare', 60),
  ('Pharmacist', 'Healthcare', 65),
  ('Public Health Specialist', 'Healthcare', 60),

  -- Core Engineering & Manufacturing
  ('Mechanical Engineer', 'Core Engineering', 75),
  ('Senior Mechanical Engineer', 'Core Engineering', 65),
  ('Civil Engineer', 'Core Engineering', 75),
  ('Structural Engineer', 'Core Engineering', 65),
  ('Electrical Engineer', 'Core Engineering', 75),
  ('Hardware Engineer', 'Core Engineering', 65),
  ('Robotics Engineer', 'Core Engineering', 60),
  ('Industrial Engineer', 'Core Engineering', 65),
  ('Chemical Engineer', 'Core Engineering', 60),
  ('Quality Assurance (QA) Inspector', 'Core Engineering', 65),

  -- Legal & Consulting
  ('Management Consultant', 'Consulting', 75),
  ('Strategy Consultant', 'Consulting', 70),
  ('Business Analyst', 'Consulting', 85),
  ('Senior Business Analyst', 'Consulting', 80),
  ('Legal Associate / Counsel', 'Legal', 65),
  ('Corporate Lawyer', 'Legal', 60),
  ('Compliance Officer', 'Legal', 65)

ON CONFLICT (title) 
DO UPDATE SET usage_count = GREATEST(job_titles.usage_count, EXCLUDED.usage_count);

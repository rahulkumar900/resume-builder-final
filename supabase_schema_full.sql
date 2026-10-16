-- Run this in your Supabase SQL Editor

-- 1. Create Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  target_market TEXT DEFAULT 'global',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Experiences Table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'manual',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  link TEXT,
  source TEXT DEFAULT 'manual',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Achievements Table (The atomic metrics for Experiences & Projects)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb, 
  technologies JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'manual',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create Skills Table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create Education Table
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date TEXT,
  end_date TEXT,
  score TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create Certifications Table
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create Languages Table
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  proficiency TEXT, -- e.g., Native, Fluent, Intermediate
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Create Awards & Honors Table
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Create Volunteer / Involvements Table
CREATE TABLE involvements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Create Publications Table
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  date TEXT,
  url TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Create Custom Sections Table
CREATE TABLE custom_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb, -- Store arbitrary items here
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE involvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_sections ENABLE ROW LEVEL SECURITY;

-- Allow public access for testing (Remove in production!)
CREATE POLICY "Allow public access for testing" ON profiles FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON experiences FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON projects FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON achievements FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON skills FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON education FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON certifications FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON languages FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON awards FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON involvements FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON publications FOR ALL USING (true);
CREATE POLICY "Allow public access for testing" ON custom_sections FOR ALL USING (true);

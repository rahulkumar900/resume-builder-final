-- Run this in your Supabase SQL Editor

-- 1. Create Profiles Table (The Vault container)
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

-- 3. Create Achievements Table (The atomic metrics)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  project_id UUID, -- We will create projects table below
  description TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb, -- Stores array of { original, verified, value, label }
  technologies JSONB DEFAULT '[]'::jsonb, -- Stores array of strings
  source TEXT DEFAULT 'manual',
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Projects Table
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

-- Add foreign key from achievements to projects now that projects exists
ALTER TABLE achievements 
ADD CONSTRAINT fk_project 
FOREIGN KEY (project_id) 
REFERENCES projects(id) ON DELETE CASCADE;

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

-- 7. Set up RLS (Row Level Security) - Optional but recommended
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Allow public access for testing (Remove in production!)
CREATE POLICY "Allow public read/write for testing profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "Allow public read/write for testing experiences" ON experiences FOR ALL USING (true);
CREATE POLICY "Allow public read/write for testing achievements" ON achievements FOR ALL USING (true);
CREATE POLICY "Allow public read/write for testing projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow public read/write for testing skills" ON skills FOR ALL USING (true);
CREATE POLICY "Allow public read/write for testing education" ON education FOR ALL USING (true);

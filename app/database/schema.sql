-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Countries Table
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Universities Table
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country_id UUID REFERENCES countries(id),
  city_ar TEXT NOT NULL,
  logo_url TEXT,
  cover_image_url TEXT,
  description TEXT,
  ranking INTEGER,
  acceptance_rate TEXT,
  tuition_range TEXT,
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Programs Table
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id),
  name_ar TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  degree_level TEXT NOT NULL, -- Bachelor, Master, PhD
  duration TEXT NOT NULL,
  language TEXT DEFAULT 'English',
  tuition_fee DECIMAL,
  start_date DATE,
  deadline DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Profiles Table (Extends Supabase Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  nationality TEXT,
  target_degree TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Applications Table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  program_id UUID REFERENCES programs(id),
  status TEXT DEFAULT 'pending', -- pending, reviewing, accepted, rejected
  documents JSONB,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Public Read Access
CREATE POLICY "Public countries are viewable by everyone" ON countries FOR SELECT USING (true);
CREATE POLICY "Public universities are viewable by everyone" ON universities FOR SELECT USING (true);
CREATE POLICY "Public programs are viewable by everyone" ON programs FOR SELECT USING (true);

-- User Profile Access
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

-- Application Access
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);

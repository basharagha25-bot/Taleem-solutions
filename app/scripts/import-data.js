const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Or SERVICE_ROLE_KEY for admin rights

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importUniversities() {
  const dataPath = path.join(__dirname, '../data/universities_sample.json');
  
  if (!fs.existsSync(dataPath)) {
    console.error('Error: Data file not found at', dataPath);
    return;
  }

  const rawData = fs.readFileSync(dataPath, 'utf8');
  const universities = JSON.parse(rawData);

  console.log(`Found ${universities.length} universities to import...`);

  for (const uni of universities) {
    const { data, error } = await supabase
      .from('universities')
      .upsert(uni, { onConflict: 'slug' }) // Assuming 'slug' is unique
      .select();

    if (error) {
      console.error(`Failed to import ${uni.name_en}:`, error.message);
    } else {
      console.log(`Imported: ${uni.name_en}`);
    }
  }
  
  console.log('Import complete!');
}

importUniversities();

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.warn(
      '⚠️  SUPABASE_URL (or VITE_SUPABASE_URL) is not set. Skipping CMS fetch and keeping existing src/data/content.json.',
    );
    console.warn(
      '    To enable live CMS content in CI, configure SUPABASE_URL/VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as environment variables or secrets.',
    );
    return;
  }

  if (!serviceRoleKey) {
    console.warn(
      '⚠️  SUPABASE_SERVICE_ROLE_KEY is not set. Skipping CMS fetch and keeping existing src/data/content.json.',
    );
    console.warn(
      '    To enable live CMS content in CI, configure SUPABASE_SERVICE_ROLE_KEY as a secure environment variable or secret.',
    );
    return;
  }

  console.log('🔐 Using Supabase URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  async function fetchTable(table, select = '*') {
    console.log(`🔍 Fetching table "${table}"...`);
    const { data, error } = await supabase.from(table).select(select);
    if (error) {
      console.error(`❌ Failed to fetch "${table}":`, error.message);
      throw error;
    }
    console.log(`✅ Fetched ${data?.length ?? 0} rows from "${table}"`);
    return data ?? [];
  }

  try {
    const [
      heroRows,
      sectionRows,
      programRows,
      mentorTalkRows,
      eventRows,
      eventGalleryRows,
      galleryItemRows,
      teamMemberRows,
      founderRows,
      testimonialRows,
      aboutUsRows,
      contactInfoRows,
    ] = await Promise.all([
      // Adjust table names/select clauses here to match your actual Supabase schema
      fetchTable('hero_content'),
      fetchTable('section_content'),
      fetchTable('programs'),
      fetchTable('mentor_talks'),
      fetchTable('events'),
      fetchTable('event_galleries'),
      fetchTable('gallery_items'),
      fetchTable('team_members'),
      fetchTable('founders'),
      fetchTable('testimonials'),
      fetchTable('about_us'),
      fetchTable('contact_info'),
    ]);

    // Basic sanity checks for critical content
    if (!heroRows || heroRows.length === 0) {
      console.error('❌ No hero content found in "hero_content" table.');
      process.exit(1);
    }

    if (!eventRows || eventRows.length === 0) {
      console.error('❌ No events found in "events" table.');
      process.exit(1);
    }

    if (!aboutUsRows || aboutUsRows.length === 0) {
      console.error('❌ No About Us content found in "about_us" table.');
      process.exit(1);
    }

    const content = {
      hero: heroRows[0] ?? null,
      sections: sectionRows ?? [],
      programs: programRows ?? [],
      mentorTalks: mentorTalkRows ?? [],
      events: eventRows ?? [],
      eventGalleries: eventGalleryRows ?? [],
      galleryItems: galleryItemRows ?? [],
      teamMembers: teamMemberRows ?? [],
      founders: founderRows ?? [],
      testimonials: testimonialRows ?? [],
      aboutUs: aboutUsRows[0] ?? null,
      contactInfo: contactInfoRows[0] ?? null,
      lastUpdated: new Date().toISOString(),
    };

    const outDir = path.resolve(__dirname, '..', 'src', 'data');
    const outPath = path.join(outDir, 'content.json');

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(content, null, 2), 'utf8');

    console.log('✅ CMS content written to', outPath);
  } catch (error) {
    console.error('❌ Failed to fetch CMS content:', error);
    process.exit(1);
  }
}

main();


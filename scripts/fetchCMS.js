import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const cmsBase =
    process.env.VITE_CMS_BASE_URL ||
    process.env.CMS_BASE_URL ||
    process.env.API_BASE_URL;

  if (!cmsBase) {
    console.warn(
      '⚠️  VITE_CMS_BASE_URL / CMS_BASE_URL is not set. Skipping CMS fetch and keeping existing src/data/content.json.',
    );
    return;
  }

  console.log('🔗 Using CMS base URL:', cmsBase);

  async function fetchJson(endpoint) {
    const url = `${cmsBase}${endpoint}`;
    console.log(`🔍 Fetching ${url} ...`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    }
    return res.json();
  }

  try {
    const [
      hero,
      programs,
      mentorTalks,
      events,
      eventGalleries,
      galleryItems,
      teamMembers,
      founders,
      testimonials,
      aboutUs,
      contactInfo,
    ] = await Promise.all([
      // Public content endpoints mirrored from cmsClient
      fetchJson('/api/hero').catch((err) => {
        console.warn('⚠️  Failed to fetch hero content:', err.message);
        return null;
      }),
      fetchJson('/api/programs/public').catch((err) => {
        console.warn('⚠️  Failed to fetch programs:', err.message);
        return [];
      }),
      fetchJson('/api/mentor-talks/public').catch((err) => {
        console.warn('⚠️  Failed to fetch mentor talks:', err.message);
        return [];
      }),
      fetchJson('/api/events/public').catch((err) => {
        console.warn('⚠️  Failed to fetch events:', err.message);
        return [];
      }),
      fetchJson('/api/event-galleries/public').catch((err) => {
        console.warn('⚠️  Failed to fetch event galleries:', err.message);
        return [];
      }),
      fetchJson('/api/gallery-items/public').catch((err) => {
        console.warn('⚠️  Failed to fetch gallery items:', err.message);
        return [];
      }),
      fetchJson('/api/team/public').catch((err) => {
        console.warn('⚠️  Failed to fetch team members:', err.message);
        return [];
      }),
      fetchJson('/api/founders/public').catch((err) => {
        console.warn('⚠️  Failed to fetch founders:', err.message);
        return [];
      }),
      fetchJson('/api/testimonials/public').catch((err) => {
        console.warn('⚠️  Failed to fetch testimonials:', err.message);
        return [];
      }),
      fetchJson('/api/about/public').catch((err) => {
        console.warn('⚠️  Failed to fetch about us content:', err.message);
        return null;
      }),
      fetchJson('/api/contact/public').catch((err) => {
        console.warn('⚠️  Failed to fetch contact info:', err.message);
        return null;
      }),
    ]);

    // Basic sanity checks for critical content
    if (!hero) {
      console.error('❌ No hero content returned from /api/hero.');
      // Still write what we have, but warn; frontend has fallbacks.
    }

    if (!events || events.length === 0) {
      console.error('❌ No events returned from /api/events/public.');
      // Still continue; events sections will render empty state.
    }

    if (!aboutUs) {
      console.error('❌ No About Us content returned from /api/about/public.');
      // Frontend About section will fall back to its own copy.
    }

    const content = {
      hero: hero ?? null,
      sections: [], // Not exposed via HTTP API currently
      programs: programs ?? [],
      mentorTalks: mentorTalks ?? [],
      events: events ?? [],
      eventGalleries: eventGalleries ?? [],
      galleryItems: galleryItems ?? [],
      teamMembers: teamMembers ?? [],
      founders: founders ?? [],
      testimonials: testimonials ?? [],
      aboutUs: aboutUs ?? null,
      contactInfo: contactInfo ?? null,
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


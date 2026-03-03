import content from '@/data/content';

/**
 * Simple helper to access static CMS content generated at build time.
 * This is synchronous and performs no runtime network calls.
 */
export function useContent() {
  return content;
}


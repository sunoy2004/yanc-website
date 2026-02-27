/**
 * CMS Utilities
 * Helper functions for caching, validation, and other CMS-related utilities
 */

// Simple in-memory cache for CMS data
class CmsCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  set(key: string, data: any, ttl: number = 300000) { // Default TTL: 5 minutes
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  remove(key: string) {
    this.cache.delete(key);
  }
}

export const cmsCache = new CmsCache();

/**
 * Validates if CMS data conforms to expected structure
 */
export function validateCmsData<T>(data: any, expectedShape: Record<string, boolean>): data is T {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const expectedKeys = Object.keys(expectedShape);
  return expectedKeys.every(key => key in data);
}

/**
 * Sanitizes CMS content to prevent XSS
 */
export function sanitizeCmsContent(content: string): string {
  if (!content) return '';

  // Basic sanitization - in a real app, use a proper sanitizer like DOMPurify
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

/**
 * Extracts media URLs from CMS content and validates them
 */
export function validateMediaUrls(urls: string[]): string[] {
  return urls.filter(url => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  });
}

/**
 * Format date from CMS to locale string
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export type OptimizedImageRole = 'hero' | 'card' | 'thumb';

/**
 * Given a CMS image URL, return an optimized Supabase render/image URL when possible.
 * Falls back to the original URL if it cannot safely transform it.
 */
export function optimizeImageUrl(src: string, role: OptimizedImageRole = 'hero'): string {
  if (!src) return src;

  try {
    const url = new URL(src);

    // Only touch Supabase URLs that ALREADY use the render/image endpoint.
    // This avoids 400s if the image transformer isn't configured for this project.
    const renderPrefix = '/storage/v1/render/image/public/';
    const isSupabaseRender = url.pathname.includes(renderPrefix);

    if (!isSupabaseRender) {
      // For raw object URLs or other CDNs, leave as-is to avoid breaking images.
      return src;
    }

    // Choose a reasonable target width per role
    const width =
      role === 'hero' ? 1600 :
      role === 'card' ? 900 :
      400;

    url.searchParams.set('width', String(width));
    url.searchParams.set('quality', '75');
    // Prefer webp when supported by the backend; if unsupported, the server should ignore this.
    url.searchParams.set('format', 'webp');

    return url.toString();
  } catch {
    // For relative URLs or invalid URLs, just return the original
    return src;
  }
}
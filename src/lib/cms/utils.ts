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
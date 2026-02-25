/**
 * CMS API Endpoint Definitions
 * Centralizes all CMS API endpoint paths for consistency
 */

export const CMS_ENDPOINTS = {
  // Public content endpoints
  HERO: '/hero',
  SECTION: (name: string) => `/sections/${name}` as const,
  PROGRAMS: '/programs',
  MENTOR_TALKS: '/mentor-talks',
  EVENTS: '/events',
  EVENT_GALLERIES: '/event-galleries',
  GALLERY_ITEMS: '/gallery-items',
  TEAM: '/team',
  FOUNDERS: '/founders',
  TESTIMONIALS: '/testimonials',
  ABOUT_US: '/about-us',
  CONTACT: '/contact',
  
  // Health check endpoint
  HEALTH: '/health',
} as const;

export type CmsEndpoints = typeof CMS_ENDPOINTS;
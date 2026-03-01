// Website Events Service - Strict Section Isolation
// Each function fetches data from completely separate endpoints

export interface WebsiteEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  image: string;
  type: 'upcoming' | 'past';
  isActive: boolean;
  category?: 'upcoming' | 'past';
  /** Registration / CTA URL from CMS - when set, show "Register now" CTA */
  registrationUrl?: string;
  highlights?: string[];
  gallery?: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    alt: string;
    altText?: string;
  }>;
  mediaItems?: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    alt: string;
    altText?: string;
  }>;
}

export interface WebsiteGalleryItem {
  id: string;
  title?: string;
  description?: string;
  media: {
    id: string;
    url: string;
    type: 'image' | 'video';
    alt: string;
  };
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Upcoming Events Service
import { getCmsBaseUrl } from '@/lib/getCmsBaseUrl';

// Simple in-module cache to avoid refetching upcoming events on every navigation
let upcomingCache: { data: WebsiteEvent[]; timestamp: number } | null = null;
const UPCOMING_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getUpcomingEvents(): Promise<WebsiteEvent[]> {
  try {
    // Return cached data when still fresh
    if (upcomingCache && Date.now() - upcomingCache.timestamp < UPCOMING_TTL_MS) {
      return upcomingCache.data;
    }

    const API_BASE_URL = getCmsBaseUrl();
    const url = `${API_BASE_URL}/api/events/upcoming`;
    console.log('🔍 Calling', url);
    const response = await fetch(url);
    console.log('📊 Upcoming events response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ UPCOMING DATA:", data);
    
    // Transform backend data to frontend format
    const transformedData: WebsiteEvent[] = data.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.event_date || event.date || '',
      location: event.location,
      image: event.imageUrl || event.image_url || '/placeholder.jpg', // Fallback image
      type: 'upcoming' as const,
      isActive: event.is_active !== undefined ? event.is_active : (event.isActive !== undefined ? event.isActive : true),
      mediaItems: event.mediaItems || [],
      registrationUrl: event.registration_url || event.registrationUrl || event.register_link || event.registration_link || event.event_link || event.link || event.cta_url || event.ctaUrl || undefined,
    }));
    
    console.log("🔄 TRANSFORMED UPCOMING DATA:", transformedData);
    upcomingCache = { data: transformedData, timestamp: Date.now() };
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching upcoming events:', error);
    throw error;
  }
}

// Past Events Service (with simple cache)
let pastCache: { data: WebsiteEvent[]; timestamp: number } | null = null;
const PAST_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getPastEvents(): Promise<WebsiteEvent[]> {
  try {
    if (pastCache && Date.now() - pastCache.timestamp < PAST_TTL_MS) {
      return pastCache.data;
    }

    const API_BASE_URL = getCmsBaseUrl();
    const url = `${API_BASE_URL}/api/events/past`;
    console.log('🔍 Calling', url);
    const response = await fetch(url);
    console.log('📊 Past events response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ PAST DATA:", data);
    
    // Transform backend data to frontend format
    const transformedData: WebsiteEvent[] = data.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.event_date || event.date || '',
      location: event.location,
      image: event.imageUrl || event.image_url || '/placeholder.jpg', // Fallback image
      type: 'past' as const,
      isActive: event.is_active !== undefined ? event.is_active : (event.isActive !== undefined ? event.isActive : true),
      mediaItems: event.mediaItems || []
    }));
    
    console.log("🔄 TRANSFORMED PAST DATA:", transformedData);
    pastCache = { data: transformedData, timestamp: Date.now() };
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching past events:', error);
    throw error;
  }
}

// Event Gallery Service (Completely Independent, with simple cache)
let galleryCache: { data: WebsiteGalleryItem[]; timestamp: number } | null = null;
const GALLERY_TTL_MS = 5 * 60 * 1000;

export async function getEventGallery(): Promise<WebsiteGalleryItem[]> {
  try {
    if (galleryCache && Date.now() - galleryCache.timestamp < GALLERY_TTL_MS) {
      return galleryCache.data;
    }

    const API_BASE_URL = getCmsBaseUrl();
    const url = `${API_BASE_URL}/api/event-gallery-items/public`;
    console.log('🔍 Calling', url);
    const response = await fetch(url);
    console.log('📊 Gallery response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ GALLERY DATA:", data);
    galleryCache = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error('❌ Error fetching event gallery:', error);
    throw error;
  }
}

// Utility function to verify data isolation
export function verifyDataIsolation(
  upcomingData: WebsiteEvent[],
  pastData: WebsiteEvent[],
  galleryData: WebsiteGalleryItem[]
): boolean {
  console.log('=== DATA ISOLATION VERIFICATION ===');
  console.log('Upcoming events count:', upcomingData.length);
  console.log('Past events count:', pastData.length);
  console.log('Gallery items count:', galleryData.length);
  
  // Check for any overlapping IDs between sections
  const upcomingIds = new Set(upcomingData.map(e => e.id));
  const pastIds = new Set(pastData.map(e => e.id));
  const galleryIds = new Set(galleryData.map(g => g.id));
  
  const hasOverlap = 
    [...upcomingIds].some(id => pastIds.has(id)) ||
    [...upcomingIds].some(id => galleryIds.has(id)) ||
    [...pastIds].some(id => galleryIds.has(id));
  
  console.log('Data isolation check:', hasOverlap ? '❌ FAILED' : '✅ PASSED');
  return !hasOverlap;
}
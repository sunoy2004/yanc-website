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
  /** Speaker(s) for the event - from CMS */
  speakers?: Array<{ name: string; role?: string; image?: string; bio?: string }>;
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
  // One event can have many media items (images/videos)
  media: {
    id: string;
    url: string;
    type: 'image' | 'video';
    alt: string;
  }[];
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Upcoming Events Service
import { useMemo } from 'react';
import { useContent } from '@/hooks/useContent';
import { cmsService } from '@/lib/cms/service';

/** Normalize speaker data from backend (array of objects, array of strings, or single speaker string). */
function normalizeEventSpeakers(event: Record<string, unknown>): Array<{ name: string; role?: string; image?: string; bio?: string }> | undefined {
  const raw = event.speakers ?? event.speaker ?? event.speaker_name ?? event.speaker_names;
  if (raw == null || (Array.isArray(raw) && raw.length === 0)) return undefined;
  if (typeof raw === 'string' && raw.trim()) {
    return [{ name: raw.trim() }];
  }
  if (Array.isArray(raw)) {
    return raw
      .map((s: unknown) => {
        if (typeof s === 'string') return s.trim() ? { name: s.trim() } : null;
        const o = s as Record<string, unknown>;
        const name = o?.name ?? o?.speaker_name ?? o?.title ?? '';
        if (!name) return null;
        return {
          name: String(name),
          role: (o?.role ?? o?.speaker_role) as string | undefined,
          image: (o?.image ?? o?.image_url ?? o?.avatar) as string | undefined,
          bio: (o?.bio ?? o?.bio_text) as string | undefined,
        };
      })
      .filter(Boolean) as Array<{ name: string; role?: string; image?: string; bio?: string }>;
  }
  if (typeof raw === 'object' && raw !== null) {
    const o = raw as Record<string, unknown>;
    const name = o.name ?? o.speaker_name ?? '';
    return name ? [{ name: String(name), role: o.role as string | undefined, image: o.image as string | undefined, bio: o.bio as string | undefined }] : undefined;
  }
  return undefined;
}

/** Map a raw event (from content.json or CMS) to WebsiteEvent. */
function eventToWebsiteEvent(event: Record<string, unknown>, kind: 'upcoming' | 'past'): WebsiteEvent {
  const img =
    (event.image ?? event.imageUrl ?? event.image_url) ||
    (event.mediaItems && Array.isArray(event.mediaItems) && event.mediaItems.length > 0
      ? (event.mediaItems[0] as any).url
      : '/placeholder.jpg');
  return {
    id: (event.id as string) ?? '',
    title: (event.title as string) ?? '',
    description: (event.description as string) ?? undefined,
    date: (event.date ?? event.event_date ?? '') as string,
    location: (event.location as string) ?? '',
    image: typeof img === 'string' ? img : '/placeholder.jpg',
    type: kind,
    isActive:
      event.isActive !== undefined
        ? (event.isActive as boolean)
        : event.is_active !== undefined
          ? (event.is_active as boolean)
          : true,
    mediaItems: (event.mediaItems as any[]) ?? [],
    registrationUrl:
      (event as any).registration_url ??
      (event as any).registrationUrl ??
      (event as any).register_link ??
      (event as any).registration_link ??
      (event as any).event_link ??
      (event as any).link ??
      (event as any).cta_url ??
      (event as any).ctaUrl ??
      undefined,
    speakers: normalizeEventSpeakers(event),
  };
}

/** Sync hook: upcoming events from content.json (no API). */
export function useUpcomingEvents(): WebsiteEvent[] {
  const content = useContent();
  return useMemo(() => {
    const raw = (content.events ?? []) as Record<string, unknown>[];
    const upcoming = raw.filter(
      (e) =>
        (e.category === 'upcoming' || e.isUpcoming === true || (e as any).is_upcoming === true) &&
        (e.is_active !== false && e.isActive !== false),
    );
    return upcoming
      .map((e) => eventToWebsiteEvent(e, 'upcoming'))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [content.events]);
}

// Simple in-module cache to avoid refetching upcoming events on every navigation
let upcomingCache: { data: WebsiteEvent[]; timestamp: number } | null = null;
const UPCOMING_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getUpcomingEvents(): Promise<WebsiteEvent[]> {
  // Return cached data when still fresh
  if (upcomingCache && Date.now() - upcomingCache.timestamp < UPCOMING_TTL_MS) {
    return upcomingCache.data;
  }

  // Use cmsService, which now reads from static JSON via cmsClient
  const events = await cmsService.getUpcomingEvents();

  const transformedData: WebsiteEvent[] = events.map((event: Record<string, unknown>) =>
    eventToWebsiteEvent(event, 'upcoming'),
  );

  upcomingCache = { data: transformedData, timestamp: Date.now() };
  return transformedData;
}

// Past Events Service (with simple cache)
let pastCache: { data: WebsiteEvent[]; timestamp: number } | null = null;
const PAST_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getPastEvents(): Promise<WebsiteEvent[]> {
  if (pastCache && Date.now() - pastCache.timestamp < PAST_TTL_MS) {
    return pastCache.data;
  }

  const events = await cmsService.getPastEvents();

  const transformedData: WebsiteEvent[] = events.map((event: Record<string, unknown>) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date || event.event_date || '',
    location: event.location,
    image:
      event.image ||
      event.imageUrl ||
      event.image_url ||
      (event.mediaItems && Array.isArray(event.mediaItems) && event.mediaItems.length > 0
        ? (event.mediaItems[0] as any).url
        : '/placeholder.jpg'),
    type: 'past' as const,
    isActive:
      event.isActive !== undefined
        ? (event.isActive as boolean)
        : event.is_active !== undefined
          ? (event.is_active as boolean)
          : true,
    mediaItems: (event.mediaItems as any[]) || [],
  }));

  pastCache = { data: transformedData, timestamp: Date.now() };
  return transformedData;
}

// Event Gallery Service (Completely Independent, with simple cache)
let galleryCache: { data: WebsiteGalleryItem[]; timestamp: number } | null = null;
const GALLERY_TTL_MS = 5 * 60 * 1000;

export async function getEventGallery(): Promise<WebsiteGalleryItem[]> {
  if (galleryCache && Date.now() - galleryCache.timestamp < GALLERY_TTL_MS) {
    return galleryCache.data;
  }

  const galleryItems = await cmsService.getEventGalleryItems();

  const transformed: WebsiteGalleryItem[] = (galleryItems as any[]).map((item) => {
    const rawMedia = Array.isArray(item.media)
      ? item.media
      : item.media
        ? [item.media]
        : [];

    const media = rawMedia.map((m: any, index: number) => ({
      id: m.id ?? `${item.id}-${index}`,
      url: m.url ?? m.imageUrl ?? m.image_url ?? '',
      type: (m.type ?? 'image').toLowerCase() === 'video' ? 'video' : 'image',
      alt:
        m.altText ??
        m.alt ??
        item.title ??
        'Event image',
    }));

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      media,
      isActive:
        item.isActive !== undefined
          ? item.isActive
          : item.is_active !== undefined
            ? item.is_active
            : true,
      displayOrder: item.displayOrder ?? item.order ?? 0,
      createdAt: item.createdAt ?? '',
      updatedAt: item.updatedAt ?? '',
    };
  });

  galleryCache = { data: transformed, timestamp: Date.now() };
  return transformed;
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
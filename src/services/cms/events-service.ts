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
export async function getUpcomingEvents(): Promise<WebsiteEvent[]> {
  try {
    console.log('🔍 Calling /api/events/upcoming');
    const response = await fetch('/api/events/upcoming');
    console.log('📊 Upcoming events response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ UPCOMING DATA:", data);
    
    // Transform backend data to frontend format
    const transformedData = data.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.event_date || event.date || '',
      location: event.location,
      image: event.imageUrl || event.image_url || '/placeholder.jpg', // Fallback image
      type: 'upcoming' as const,
      isActive: event.is_active !== undefined ? event.is_active : (event.isActive !== undefined ? event.isActive : true),
      mediaItems: event.mediaItems || []
    }));
    
    console.log("🔄 TRANSFORMED UPCOMING DATA:", transformedData);
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching upcoming events:', error);
    throw error;
  }
}

// Past Events Service
export async function getPastEvents(): Promise<WebsiteEvent[]> {
  try {
    console.log('🔍 Calling /api/events/past');
    const response = await fetch('/api/events/past');
    console.log('📊 Past events response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ PAST DATA:", data);
    
    // Transform backend data to frontend format
    const transformedData = data.map((event: any) => ({
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
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching past events:', error);
    throw error;
  }
}

// Event Gallery Service (Completely Independent)
export async function getEventGallery(): Promise<WebsiteGalleryItem[]> {
  try {
    console.log('🔍 Calling /api/event-gallery-items/public');
    const response = await fetch('/api/event-gallery-items/public');
    console.log('📊 Gallery response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("✅ GALLERY DATA:", data);
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
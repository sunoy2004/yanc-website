import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { events as mockEvents } from '../../data/mockData';

// Define the interface for event data
export interface EventData {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description?: string;
  type?: 'general' | 'upcoming' | 'past' | 'highlight' | 'gallery';
  category?: 'upcoming' | 'past'; // Add category field
  isUpcoming?: boolean;
  isPast?: boolean;
  isActive?: boolean;
  highlights?: string[]; // Add highlights array
  gallery?: Array<{ // Add gallery array
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

export const useEventsData = () => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS
        const cmsEvents = await cmsService.getEvents();
        
        if (cmsEvents && cmsEvents.length > 0) {
          // CMS has published content, use it
          console.log('ℹ️ Using CMS events data');
          setEventsData(cmsEvents);
        } else {
          // CMS has no published content, fall back to mock data
          console.log('ℹ️ No published CMS events found, falling back to mock data');
          setEventsData(mockEvents);
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching events from CMS, using mock data:', err);
        setEventsData(mockEvents);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  return { eventsData, loading, error };
};
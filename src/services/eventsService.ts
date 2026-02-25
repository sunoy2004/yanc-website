import { cmsService } from '../lib/cms/service';

// Reuse the existing EventData interface from the existing service
export type EventData = Awaited<ReturnType<typeof cmsService.getEvents>>[number];

/**
 * Fetch upcoming events
 */
export const getUpcomingEvents = async (): Promise<EventData[]> => {
  try {
    const cmsEvents = await cmsService.getUpcomingEvents();
    if (cmsEvents && cmsEvents.length > 0) {
      return cmsEvents;
    }
    // Fallback to mock data if no CMS events
    return getMockUpcomingEvents();
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return getMockUpcomingEvents();
  }
};

/**
 * Fetch past events
 */
export const getPastEvents = async (): Promise<EventData[]> => {
  try {
    const cmsEvents = await cmsService.getPastEvents();
    if (cmsEvents && cmsEvents.length > 0) {
      return cmsEvents;
    }
    // Fallback to mock data if no CMS events
    return getMockPastEvents();
  } catch (error) {
    console.error('Error fetching past events:', error);
    return getMockPastEvents();
  }
};

/**
 * COMMENTED OUT: Fetch event highlights - temporarily disabled
 */
// export const getEventHighlights = async (): Promise<EventData[]> => {
//   try {
//     const cmsEvents = await cmsService.getEventHighlights();
//     if (cmsEvents && cmsEvents.length > 0) {
//       return cmsEvents;
//     }
//     // Fallback to mock data if no CMS events
//     return getMockEventHighlights();
//   } catch (error) {
//     console.error('Error fetching event highlights:', error);
//     return getMockEventHighlights();
//   }
// };

/**
 * Fetch event gallery
 */
export const getEventGallery = async (): Promise<EventData[]> => {
  try {
    const cmsEvents = await cmsService.getEventGalleryItems();
    if (cmsEvents && cmsEvents.length > 0) {
      return cmsEvents;
    }
    // Fallback to mock data if no CMS events
    return getMockEventGallery();
  } catch (error) {
    console.error('Error fetching event gallery:', error);
    return getMockEventGallery();
  }
};

// Mock data functions
const getMockUpcomingEvents = (): EventData[] => {
  return [
    {
      id: '1',
      title: 'Annual Tech Conference',
      date: '2024-09-15',
      location: 'San Francisco, CA',
      image: '/placeholder.jpg',
      type: 'upcoming',
      description: 'Join us for our annual tech conference featuring industry leaders.',
      isActive: true,
      mediaItems: [],
    },
    {
      id: '2',
      title: 'Innovation Summit',
      date: '2024-10-22',
      location: 'New York, NY',
      image: '/placeholder.jpg',
      type: 'upcoming',
      description: 'A summit focused on innovation in the digital age.',
      isActive: true,
      mediaItems: [],
    }
  ];
};

const getMockPastEvents = (): EventData[] => {
  return [
    {
      id: '3',
      title: 'Summer Workshop Series',
      date: '2024-07-10',
      location: 'Austin, TX',
      image: '/placeholder.jpg',
      type: 'past',
      description: 'A series of workshops on modern development practices.',
      isActive: true,
      mediaItems: [],
    },
    {
      id: '4',
      title: 'Leadership Retreat',
      date: '2024-06-05',
      location: 'Denver, CO',
      image: '/placeholder.jpg',
      type: 'past',
      description: 'An immersive retreat for emerging leaders.',
      isActive: true,
      mediaItems: [],
    }
  ];
};

/**
 * COMMENTED OUT: Mock event highlights data - temporarily disabled
 */
// const getMockEventHighlights = (): EventData[] => {
//   return [
//     {
//       id: '5',
//       title: 'Industry Awards Ceremony',
//       date: '2024-08-20',
//       location: 'Chicago, IL',
//       image: '/placeholder.jpg',
//       type: 'highlight',
//       description: 'Celebrating excellence in the tech industry.',
//       isActive: true,
//       mediaItems: [],
//     }
//   ];
// };

const getMockEventGallery = (): EventData[] => {
  return [
    {
      id: '6',
      title: 'Creative Workshop',
      date: '2024-05-15',
      location: 'Portland, OR',
      image: '/placeholder.jpg',
      type: 'gallery',
      description: 'A workshop focused on creative problem solving.',
      isActive: true,
      mediaItems: [],
    }
  ];
};
import { cmsClient } from './client';
import { 
  serializeHeroContent, 
  serializePrograms, 
  serializeEvents, 
  serializeTeamMembers, 
  serializeMediaItems,
  serializeEventGalleries,
  serializeMentorTalks,
  serializeMockHeroContent,
  serializeMockPrograms,
  serializeMockEvents,
  serializeMockTeamMembers,
  serializeMockGalleryItems,
  serializeMockEventGalleries,
  serializeMockMentorTalks,
  serializeMockFounders
} from './serializers';
import { cmsCache } from './utils';
import { 
  HeroContentUI, 
  ProgramUI, 
  EventUI, 
  TeamMemberUI, 
  MediaItemUI,
  EventGalleryItemUI,
  MentorTalkUI
} from './types';
import { 
  heroMedia,
  programs as mockPrograms,
  events as mockEvents,
  teamMembers as mockTeamMembers,
  founders as mockFounders,
  eventGalleryItems as mockEventGalleryItems,
  mentorTalks as mockMentorTalks
} from '@/data/mockData';

/**
 * Main CMS Service
 * Orchestrates all CMS data fetching, caching, and transformation
 */
class CmsService {
  /**
   * Fetch and cache hero content
   */
  async getHeroContent(): Promise<HeroContentUI | null> {
    const cacheKey = 'hero-content';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsHero = await cmsClient.getHeroContent();
      const serializedHero = serializeHeroContent(cmsHero);
      
      // Use mock data if CMS returns null or empty media items
      if (!serializedHero || !serializedHero.mediaItems || serializedHero.mediaItems.length === 0) {
        console.log('Using mock hero content');
        const mockHero = serializeMockHeroContent(heroMedia);
        cmsCache.set(cacheKey, mockHero);
        return mockHero;
      }
      
      cmsCache.set(cacheKey, serializedHero);
      return serializedHero;
    } catch (error) {
      console.error('Error in getHeroContent, using mock data:', error);
      const mockHero = serializeMockHeroContent(heroMedia);
      cmsCache.set(cacheKey, mockHero);
      return mockHero;
    }
  }

  /**
   * Fetch and cache programs
   */
  async getPrograms(): Promise<ProgramUI[]> {
    const cacheKey = 'programs';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsPrograms = await cmsClient.getPrograms();
      const serializedPrograms = serializePrograms(cmsPrograms);
      
      // Use mock data if CMS returns empty array
      if (!serializedPrograms || serializedPrograms.length === 0) {
        console.log('Using mock programs');
        const mockProgramsData = serializeMockPrograms(mockPrograms);
        cmsCache.set(cacheKey, mockProgramsData);
        return mockProgramsData;
      }
      
      cmsCache.set(cacheKey, serializedPrograms);
      return serializedPrograms;
    } catch (error) {
      console.error('Error in getPrograms, using mock data:', error);
      const mockProgramsData = serializeMockPrograms(mockPrograms);
      cmsCache.set(cacheKey, mockProgramsData);
      return mockProgramsData;
    }
  }

  /**
   * Fetch and cache events
   */
  async getEvents(): Promise<EventUI[]> {
    const cacheKey = 'events';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsEvents = await cmsClient.getEvents();
      const serializedEvents = serializeEvents(cmsEvents);
      
      // Use mock data if CMS returns empty array
      if (!serializedEvents || serializedEvents.length === 0) {
        console.log('Using mock events');
        const mockEventsData = serializeMockEvents(mockEvents);
        cmsCache.set(cacheKey, mockEventsData);
        return mockEventsData;
      }
      
      cmsCache.set(cacheKey, serializedEvents);
      return serializedEvents;
    } catch (error) {
      console.error('Error in getEvents, using mock data:', error);
      const mockEventsData = serializeMockEvents(mockEvents);
      cmsCache.set(cacheKey, mockEventsData);
      return mockEventsData;
    }
  }

  /**
   * Fetch and cache team members
   */
  async getTeamMembers(): Promise<TeamMemberUI[]> {
    const cacheKey = 'team-members';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsTeamMembers = await cmsClient.getTeamMembers();
      const serializedTeamMembers = serializeTeamMembers(cmsTeamMembers);
      
      // Use mock data if CMS returns empty array
      if (!serializedTeamMembers || serializedTeamMembers.length === 0) {
        console.log('Using mock team members');
        const mockTeamMembersData = serializeMockTeamMembers(mockTeamMembers);
        cmsCache.set(cacheKey, mockTeamMembersData);
        return mockTeamMembersData;
      }
      
      cmsCache.set(cacheKey, serializedTeamMembers);
      return serializedTeamMembers;
    } catch (error) {
      console.error('Error in getTeamMembers, using mock data:', error);
      const mockTeamMembersData = serializeMockTeamMembers(mockTeamMembers);
      cmsCache.set(cacheKey, mockTeamMembersData);
      return mockTeamMembersData;
    }
  }

  /**
   * Fetch and cache gallery items
   */
  async getGalleryItems(): Promise<MediaItemUI[]> {
    const cacheKey = 'gallery-items';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsMediaItems = await cmsClient.getGalleryItems();
      const serializedMediaItems = serializeMediaItems(cmsMediaItems);
      
      // Use mock data if CMS returns empty array
      if (!serializedMediaItems || serializedMediaItems.length === 0) {
        console.log('Using mock gallery items');
        // Extract media items from event galleries for gallery view
        const allMediaItems: MediaItemUI[] = [];
        mockEventGalleryItems.forEach(gallery => {
          gallery.media.forEach(media => {
            allMediaItems.push({
              id: media.id,
              type: media.type,
              src: media.src,
              alt: media.alt,
              caption: media.alt
            });
          });
        });
        cmsCache.set(cacheKey, allMediaItems);
        return allMediaItems;
      }
      
      cmsCache.set(cacheKey, serializedMediaItems);
      return serializedMediaItems;
    } catch (error) {
      console.error('Error in getGalleryItems, using mock data:', error);
      // Extract media items from event galleries for gallery view
      const allMediaItems: MediaItemUI[] = [];
      mockEventGalleryItems.forEach(gallery => {
        gallery.media.forEach(media => {
          allMediaItems.push({
            id: media.id,
            type: media.type,
            src: media.src,
            alt: media.alt,
            caption: media.alt
          });
        });
      });
      cmsCache.set(cacheKey, allMediaItems);
      return allMediaItems;
    }
  }

  /**
   * Fetch and cache event galleries
   */
  async getEventGalleries(): Promise<EventGalleryItemUI[]> {
    const cacheKey = 'event-galleries';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsEventGalleries = await cmsClient.getEventGalleries();
      const serializedEventGalleries = serializeEventGalleries(cmsEventGalleries);
      
      // Use mock data if CMS returns empty array
      if (!serializedEventGalleries || serializedEventGalleries.length === 0) {
        console.log('Using mock event galleries');
        const mockEventGalleriesData = serializeMockEventGalleries(mockEventGalleryItems);
        cmsCache.set(cacheKey, mockEventGalleriesData);
        return mockEventGalleriesData;
      }
      
      cmsCache.set(cacheKey, serializedEventGalleries);
      return serializedEventGalleries;
    } catch (error) {
      console.error('Error in getEventGalleries, using mock data:', error);
      const mockEventGalleriesData = serializeMockEventGalleries(mockEventGalleryItems);
      cmsCache.set(cacheKey, mockEventGalleriesData);
      return mockEventGalleriesData;
    }
  }

  /**
   * Fetch and cache mentor talks
   */
  async getMentorTalks(): Promise<MentorTalkUI[]> {
    const cacheKey = 'mentor-talks';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsMentorTalks = await cmsClient.getMentorTalks();
      const serializedMentorTalks = serializeMentorTalks(cmsMentorTalks);
      
      // Use mock data if CMS returns empty array
      if (!serializedMentorTalks || serializedMentorTalks.length === 0) {
        console.log('Using mock mentor talks');
        const mockMentorTalksData = serializeMockMentorTalks(mockMentorTalks);
        cmsCache.set(cacheKey, mockMentorTalksData);
        return mockMentorTalksData;
      }
      
      cmsCache.set(cacheKey, serializedMentorTalks);
      return serializedMentorTalks;
    } catch (error) {
      console.error('Error in getMentorTalks, using mock data:', error);
      const mockMentorTalksData = serializeMockMentorTalks(mockMentorTalks);
      cmsCache.set(cacheKey, mockMentorTalksData);
      return mockMentorTalksData;
    }
  }

  /**
   * Clear all caches
   */
  /**
   * Fetch and cache founders
   */
  async getFounders(): Promise<TeamMemberUI[]> {
    const cacheKey = 'founders';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsTeamMembers = await cmsClient.getTeamMembers();
      // Filter for founders
      const filteredCmsTeamMembers = cmsTeamMembers.filter(member => 
        member.role.toLowerCase().includes('founder') || 
        (member.title && member.title.toLowerCase().includes('founder'))
      );
      
      // Use mock data if CMS returns empty array
      if (!filteredCmsTeamMembers || filteredCmsTeamMembers.length === 0) {
        console.log('Using mock founders');
        const mockFoundersData = serializeMockFounders(mockFounders);
        cmsCache.set(cacheKey, mockFoundersData);
        return mockFoundersData;
      }
      
      cmsCache.set(cacheKey, filteredCmsTeamMembers);
      return filteredCmsTeamMembers;
    } catch (error) {
      console.error('Error in getFounders, using mock data:', error);
      const mockFoundersData = serializeMockFounders(mockFounders);
      cmsCache.set(cacheKey, mockFoundersData);
      return mockFoundersData;
    }
  }

  clearCache(): void {
    cmsCache.clear();
  }

  /**
   * Fetch specific section content by name
   */
  async getSectionContent(sectionName: string) {
    try {
      return await cmsClient.getSectionContent(sectionName);
    } catch (error) {
      console.error(`Error fetching section content for ${sectionName}:`, error);
      return null;
    }
  }
}

export const cmsService = new CmsService();
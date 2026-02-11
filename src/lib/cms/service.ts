import { cmsClient } from './client';
import { 
  serializeHeroContent, 
  serializePrograms, 
  serializeEvents, 
  serializeTeamMembers, 
  serializeMediaItems,
  serializeEventGalleries,
  serializeMentorTalks,
  serializeTestimonials,
  serializeAboutUs,
  serializeMockHeroContent,
  serializeMockPrograms,
  serializeMockEvents,
  serializeMockTeamMembers,
  serializeMockGalleryItems,
  serializeMockEventGalleries,
  serializeMockMentorTalks,
  serializeMockTestimonials,
  serializeMockAboutUs,
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
  testimonials as mockTestimonials,
  eventGalleryItems as mockEventGalleryItems,
  mentorTalks as mockMentorTalks,
  aboutUsContent,
  mentors as mockMentors,
  advisors as mockAdvisors
} from '@/data/mockData';

/**
 * Main CMS Service
 * Orchestrates all CMS data fetching, caching, and transformation
 */
class CmsService {
  /**
   * Fetch and cache hero content with CMS-first, mock-fallback logic
   * 
   * RULES:
   * 1. CMS Priority: If CMS has published hero content → use CMS exclusively
   * 2. Publish Logic: Only hero items with isActive = true are valid
   * 3. Fallback: If CMS is empty, null, 404, or has no published content → use mock
   * 4. Fail-Safe: If CMS API is unreachable → gracefully render mock content
   */
  async getHeroContent(): Promise<HeroContentUI | null> {
    const cacheKey = 'hero-content';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      console.log('Fetching hero content from CMS...');
      const cmsHero = await cmsClient.getHeroContent();
      
      // Check if CMS returned valid published content
      // CMS returns null when no active content exists
      // Handle both camelCase and snake_case property names for isActive
      const isPublished = cmsHero && cmsHero.id && (cmsHero.isActive === true || (cmsHero as any).is_active === true);
      
      if (isPublished) {
        const serializedHero = serializeHeroContent(cmsHero);
        
        // Additional validation: ensure we have media items
        if (serializedHero && serializedHero.mediaItems && serializedHero.mediaItems.length > 0) {
          console.log(`✅ Using CMS hero content: ${cmsHero.title} (${serializedHero.mediaItems.length} media items)`);
          cmsCache.set(cacheKey, serializedHero);
          return serializedHero;
        } else {
          console.warn('⚠️ CMS hero content found but has no media items, falling back to mock');
        }
      } else {
        console.log('ℹ️ No published CMS hero content found, falling back to mock data');
      }
      
      // Fallback to mock data
      const mockHero = serializeMockHeroContent(heroMedia);
      cmsCache.set(cacheKey, mockHero);
      return mockHero;
      
    } catch (error) {
      console.warn('⚠️ CMS API error or unreachable, falling back to mock hero content:', error);
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
   * Fetch and cache team members by type
   */
  async getTeamMembersByType(type: string): Promise<TeamMemberUI[]> {
    const cacheKey = `team-members-${type}`;
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsTeamMembers = await cmsClient.getTeamMembers();
      // Filter by type - map frontend types to CMS types
      const typeMap: Record<string, string> = {
        'executive': 'REGULAR',
        'cohort_founder': 'FOUNDER',
        'advisory': 'ADVISOR',
        'global_mentor': 'MENTOR'
      };
      
      const cmsType = typeMap[type] || type.toUpperCase();
      const filteredCmsTeamMembers = cmsTeamMembers.filter(member => 
        member.type.toLowerCase() === cmsType.toLowerCase()
      );
      
      const serializedTeamMembers = serializeTeamMembers(filteredCmsTeamMembers);
      
      // Use mock data if CMS returns empty array for this type
      if (!serializedTeamMembers || serializedTeamMembers.length === 0) {
        console.log(`Using mock ${type} team members`);
        const mockTeamMembersData = serializeMockTeamMembers(mockTeamMembers);
        cmsCache.set(cacheKey, mockTeamMembersData);
        return mockTeamMembersData;
      }
      
      cmsCache.set(cacheKey, serializedTeamMembers);
      return serializedTeamMembers;
    } catch (error) {
      console.error(`Error in getTeamMembersByType(${type}), using mock data:`, error);
      const mockTeamMembersData = serializeMockTeamMembers(mockTeamMembers);
      cmsCache.set(cacheKey, mockTeamMembersData);
      return mockTeamMembersData;
    }
  }

  /**
   * Fetch and cache team members by section
   */
  async getTeamMembersBySection(section: string): Promise<TeamMemberUI[]> {
    const cacheKey = `team-members-section-${section}`;
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsTeamMembers = await cmsClient.getTeamMembersBySection(section);
      const serializedTeamMembers = serializeTeamMembers(cmsTeamMembers);
      
      // Use mock data if CMS returns empty array for this section
      if (!serializedTeamMembers || serializedTeamMembers.length === 0) {
        console.log(`Using mock ${section} team members`);
        // Return appropriate mock data based on section
        let mockData: TeamMemberUI[] = [];
        switch (section) {
          case 'executive_management':
            mockData = serializeMockFounders(mockFounders);
            break;
          case 'cohort_founders':
            mockData = serializeMockTeamMembers(mockTeamMembers);
            break;
          case 'advisory_board':
            mockData = serializeMockFounders(mockAdvisors);
            break;
          case 'global_mentors':
            mockData = serializeMockFounders(mockMentors);
            break;
          default:
            mockData = serializeMockTeamMembers(mockTeamMembers);
        }
        cmsCache.set(cacheKey, mockData);
        return mockData;
      }
      
      cmsCache.set(cacheKey, serializedTeamMembers);
      return serializedTeamMembers;
    } catch (error) {
      console.error(`Error in getTeamMembersBySection(${section}), using mock data:`, error);
      // Return appropriate mock data based on section
      let mockData: TeamMemberUI[] = [];
      switch (section) {
        case 'executive_management':
          mockData = serializeMockFounders(mockFounders);
          break;
        case 'cohort_founders':
          mockData = serializeMockTeamMembers(mockTeamMembers);
          break;
        case 'advisory_board':
          mockData = serializeMockFounders(mockAdvisors);
          break;
        case 'global_mentors':
          mockData = serializeMockFounders(mockMentors);
          break;
        default:
          mockData = serializeMockTeamMembers(mockTeamMembers);
      }
      cmsCache.set(cacheKey, mockData);
      return mockData;
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
   * Fetch and cache testimonials
   */
  async getTestimonials(): Promise<any[]> {
    const cacheKey = 'testimonials';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsTestimonials = await cmsClient.getTestimonials();
      const serializedTestimonials = serializeTestimonials(cmsTestimonials);
      
      // Use mock data if CMS returns empty array
      if (!serializedTestimonials || serializedTestimonials.length === 0) {
        console.log('Using mock testimonials');
        const mockTestimonialsData = serializeMockTestimonials(mockTestimonials);
        cmsCache.set(cacheKey, mockTestimonialsData);
        return mockTestimonialsData;
      }
      
      cmsCache.set(cacheKey, serializedTestimonials);
      return serializedTestimonials;
    } catch (error) {
      console.error('Error in getTestimonials, using mock data:', error);
      const mockTestimonialsData = serializeMockTestimonials(mockTestimonials);
      cmsCache.set(cacheKey, mockTestimonialsData);
      return mockTestimonialsData;
    }
  }

  /**
   * Fetch and cache about us content
   */
  async getAboutUs(): Promise<any | null> {
    const cacheKey = 'about-us';
    const cached = cmsCache.get(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    try {
      const cmsAboutUs = await cmsClient.getAboutUs();
      const serializedAboutUs = serializeAboutUs(cmsAboutUs);
      
      if (!serializedAboutUs) {
        console.log('Using mock about us content');
        const mockAboutUsData = serializeMockAboutUs(aboutUsContent);
        cmsCache.set(cacheKey, mockAboutUsData);
        return mockAboutUsData;
      }
      
      cmsCache.set(cacheKey, serializedAboutUs);
      return serializedAboutUs;
    } catch (error) {
      console.error('Error in getAboutUs, using mock data:', error);
      const mockAboutUsData = serializeMockAboutUs(aboutUsContent);
      cmsCache.set(cacheKey, mockAboutUsData);
      return mockAboutUsData;
    }
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
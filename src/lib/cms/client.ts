import { 
  HeroContent, 
  SectionContent, 
  Program, 
  MentorTalk, 
  Event, 
  TeamMember, 
  Founder, 
  Testimonial, 
  AboutUs, 
  ContactInfo,
  EventGallery,
  MediaItem
} from './types';

// Environment variables
const CMS_BASE_URL = import.meta.env.VITE_CMS_BASE_URL || 'http://localhost:3001';
const CMS_TIMEOUT = parseInt(import.meta.env.VITE_CMS_TIMEOUT || '10000');

class CmsClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = CMS_BASE_URL;
    this.timeout = CMS_TIMEOUT;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}/api/content${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers for CMS authentication if needed
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to reach CMS');
      }
      
      if ((error as Error).name === 'AbortError') {
        throw new Error('Request timeout: CMS took too long to respond');
      }
      
      throw error;
    }
  }
  
  // Special request method for endpoints that don't follow /api/content pattern
  private async requestDirect<T>(endpoint: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers for CMS authentication if needed
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to reach CMS');
      }
      
      if ((error as Error).name === 'AbortError') {
        throw new Error('Request timeout: CMS took too long to respond');
      }
      
      throw error;
    }
  }

  // Public content endpoints
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      return await this.requestDirect<HeroContent>('/api/hero');
    } catch (error) {
      console.error('Error fetching hero content:', error);
      return null;
    }
  }

  async getSectionContent(sectionName: string): Promise<SectionContent | null> {
    try {
      return await this.request<SectionContent>(`/sections/${sectionName}`);
    } catch (error) {
      console.error(`Error fetching section content for ${sectionName}:`, error);
      return null;
    }
  }

  async getPrograms(): Promise<Program[]> {
    try {
      return await this.requestDirect<Program[]>('/api/programs/public') || [];
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  async getMentorTalks(): Promise<MentorTalk[]> {
    try {
      return await this.requestDirect<MentorTalk[]>('/api/mentor-talks/public') || [];
    } catch (error) {
      console.error('Error fetching mentor talks:', error);
      return [];
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      return await this.requestDirect<Event[]>('/api/events/public') || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async getEventGalleries(): Promise<EventGallery[]> {
    try {
      return await this.requestDirect<EventGallery[]>('/api/event-galleries/public') || [];
    } catch (error) {
      console.error('Error fetching event galleries:', error);
      return [];
    }
  }

  async getGalleryItems(): Promise<MediaItem[]> {
    try {
      return await this.requestDirect<MediaItem[]>('/api/gallery-items/public') || [];
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      return await this.requestDirect<TeamMember[]>('/api/team/public') || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  async getTeamMembersByType(type: string): Promise<TeamMember[]> {
    try {
      return await this.requestDirect<TeamMember[]>(`/api/team/public/${type}`) || [];
    } catch (error) {
      console.error(`Error fetching team members by type ${type}:`, error);
      return [];
    }
  }

  async getTeamMembersBySection(section: string): Promise<TeamMember[]> {
    try {
      return await this.requestDirect<TeamMember[]>(`/api/team/public?section=${section}`) || [];
    } catch (error) {
      console.error(`Error fetching team members by section ${section}:`, error);
      return [];
    }
  }

  async getFounders(): Promise<Founder[]> {
    try {
      return await this.requestDirect<Founder[]>('/api/founders/public') || [];
    } catch (error) {
      console.error('Error fetching founders:', error);
      return [];
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await this.requestDirect<Testimonial[]>('/api/testimonials/public') || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  async getAboutUs(): Promise<AboutUs | null> {
    try {
      return await this.requestDirect<AboutUs>('/api/about/public');
    } catch (error) {
      console.error('Error fetching about us content:', error);
      return null;
    }
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      return await this.requestDirect<ContactInfo>('/api/contact/public');
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }
  }
}

export const cmsClient = new CmsClient();
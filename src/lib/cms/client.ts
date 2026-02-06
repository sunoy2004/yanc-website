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

  // Public content endpoints
  async getHeroContent(): Promise<HeroContent | null> {
    try {
      return await this.request<HeroContent>('/hero');
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
      return await this.request<Program[]>('/programs') || [];
    } catch (error) {
      console.error('Error fetching programs:', error);
      return [];
    }
  }

  async getMentorTalks(): Promise<MentorTalk[]> {
    try {
      return await this.request<MentorTalk[]>('/mentor-talks') || [];
    } catch (error) {
      console.error('Error fetching mentor talks:', error);
      return [];
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      return await this.request<Event[]>('/events') || [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  async getEventGalleries(): Promise<EventGallery[]> {
    try {
      return await this.request<EventGallery[]>('/event-galleries') || [];
    } catch (error) {
      console.error('Error fetching event galleries:', error);
      return [];
    }
  }

  async getGalleryItems(): Promise<MediaItem[]> {
    try {
      return await this.request<MediaItem[]>('/gallery-items') || [];
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      return await this.request<TeamMember[]>('/team') || [];
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  async getFounders(): Promise<Founder[]> {
    try {
      return await this.request<Founder[]>('/founders') || [];
    } catch (error) {
      console.error('Error fetching founders:', error);
      return [];
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await this.request<Testimonial[]>('/testimonials') || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  async getAboutUs(): Promise<AboutUs | null> {
    try {
      return await this.request<AboutUs>('/about-us');
    } catch (error) {
      console.error('Error fetching about us content:', error);
      return null;
    }
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      return await this.request<ContactInfo>('/contact');
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }
  }
}

export const cmsClient = new CmsClient();
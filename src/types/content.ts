import type {
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
  MediaItem,
} from '@/lib/cms/types';

// Shape of the JSON generated at build time by scripts/fetchCMS.js
export interface ContentSchema {
  hero: HeroContent | null;
  sections: SectionContent[];
  programs: Program[];
  mentorTalks: MentorTalk[];
  events: Event[];
  eventGalleries: EventGallery[];
  galleryItems: MediaItem[];
  // Flat event gallery items from /api/event-gallery-items/public
  // (structure is close to WebsiteGalleryItem but kept loose here)
  eventGalleryItems?: any[];
  teamMembers: TeamMember[];
  founders: Founder[];
  testimonials: Testimonial[];
  aboutUs: AboutUs | null;
  contactInfo: ContactInfo | null;
  lastUpdated: string;
}


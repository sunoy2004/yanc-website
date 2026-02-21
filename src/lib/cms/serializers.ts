import { 
  HeroContent, 
  Program, 
  Event, 
  TeamMember, 
  MediaItem,
  EventGallery,
  MentorTalk,
  Testimonial,
  AboutUs,
  HeroContentUI,
  ProgramUI,
  EventUI,
  TeamMemberUI,
  MediaItemUI,
  EventGalleryItemUI,
  MentorTalkUI
} from './types';

// Mock data types from mockData.ts
import { 
  HeroMediaItem as MockHeroMediaItem,
  Program as MockProgram,
  Event as MockEvent,
  TeamMember as MockTeamMember,
  MediaItem as MockMediaItem,
  EventGalleryItem as MockEventGalleryItem,
  MentorTalk as MockMentorTalk,
  Testimonial as MockTestimonial,
  AboutUsContent as MockAboutUs
} from '@/data/mockData';

// Serializer functions to convert CMS data to UI-friendly format
export const serializeHeroContent = (cmsHero: HeroContent | null): HeroContentUI | null => {
  if (!cmsHero) return null;
  
  return {
    title: cmsHero.title,
    subtitle: cmsHero.subtitle,
    description: cmsHero.description || '',
    ctaText: (cmsHero as any).cta_text || cmsHero.ctaText || 'Get Started',
    ctaUrl: (cmsHero as any).cta_url || cmsHero.ctaUrl || '#',
    mediaItems: (cmsHero.mediaItems || []).map(item => ({
      src: item.url,
      type: item.type?.toLowerCase() as 'image' | 'video' || 'image',
      alt: (item as any).alt || item.altText || ''
    }))
  };
};

export const serializePrograms = (cmsPrograms: Program[]): ProgramUI[] => {
  return cmsPrograms
    .filter(program => program.isActive || (program as any).is_active) // Handle both camelCase and snake_case
    .sort((a, b) => (a.order || 0) - (b.order || 0)) // Handle missing order field
    .map(program => ({
      id: program.id,
      title: program.title,
      description: program.description,
      icon: program.icon
    }));
};

export const serializeEvents = (cmsEvents: Event[]): EventUI[] => {
  return cmsEvents
    .filter(event => event.isActive || (event as any).is_active) // Handle both camelCase and snake_case
    .map(event => ({
      id: event.id,
      title: event.title,
      date: event.date || (event as any).event_date || '',
      location: event.location,
      image: event.imageUrl || 
             (event as any).image_url || 
             (event.mediaItems && event.mediaItems.length > 0 ? event.mediaItems[0].url : '') || 
             '',
      type: event.type || (event as any).category || 'general',
      description: event.description,
      isActive: event.isActive || (event as any).is_active,
      isUpcoming: (event as any).isUpcoming || event.type === 'upcoming' || (event as any).category === 'upcoming',
      isPast: (event as any).isPast || event.type === 'past' || (event as any).category === 'past',
      mediaItems: event.mediaItems?.map(item => ({
        id: item.id,
        type: item.type.toLowerCase() as 'image' | 'video',
        url: item.url,
        alt: item.altText || (item as any).alt_text || (item as any).alt || '',
        altText: item.altText || (item as any).alt_text || (item as any).alt || ''
      })) || []
    }));
};

export const serializeTeamMembers = (cmsTeamMembers: TeamMember[]): TeamMemberUI[] => {
  return cmsTeamMembers
    .filter(member => member.isActive || (member as any).is_active) // Handle both camelCase and snake_case
    .sort((a, b) => (a.order || 0) - (b.order || 0)) // Handle missing order field
    .map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      title: member.title,
      bio: member.bio,
      image: member.imageUrl || (member as any).image_url || '', // Handle both camelCase and snake_case
      socialLinks: member.socialLinks && Array.isArray(member.socialLinks) ? 
        member.socialLinks.reduce((acc, link) => {
          if (link.platform && link.url) {
            acc[link.platform] = link.url;
          }
          return acc;
        }, {} as { [key: string]: string }) : undefined
    }));
};

export const serializeMediaItems = (cmsMediaItems: MediaItem[]): MediaItemUI[] => {
  return cmsMediaItems
    .filter(item => item.isActive || (item as any).is_active) // Handle both camelCase and snake_case
    .sort((a, b) => (a.order || 0) - (b.order || 0)) // Handle missing order field
    .map(item => ({
      id: item.id,
      type: item.type.toLowerCase() as 'image' | 'video',
      src: item.url,
      alt: item.altText || (item as any).alt_text || 'Media item', // Handle both camelCase and snake_case
      caption: item.caption
    }));
};

export const serializeEventGalleries = (cmsEventGalleries: EventGallery[]): EventGalleryItemUI[] => {
  return cmsEventGalleries
    .filter(gallery => gallery.isActive || (gallery as any).is_active) // Handle both camelCase and snake_case
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
    .map(gallery => ({
      id: gallery.id,
      title: gallery.title,
      date: gallery.date,
      description: undefined, // Description not in CMS schema for EventGallery
      media: serializeMediaItems(gallery.images.map(img => ({
        id: img.id,
        type: 'IMAGE' as const,
        url: img.imageUrl || (img as any).image_url || '', // Handle both camelCase and snake_case
        altText: img.caption || 'Event image',
        caption: img.caption,
        order: img.order,
        isActive: img.isActive || (img as any).is_active, // Handle both camelCase and snake_case
        createdAt: img.createdAt,
        updatedAt: img.updatedAt
      })))
    }));
};

export const serializeMentorTalks = (cmsMentorTalks: MentorTalk[]): MentorTalkUI[] => {
  return cmsMentorTalks
    .filter(talk => talk.isActive || (talk as any).is_active) // Handle both camelCase and snake_case
    .map(talk => ({
      id: talk.id,
      title: talk.title,
      speaker: talk.speaker,
      date: talk.date,
      description: talk.description,
      videoUrl: talk.videoUrl || (talk as any).video_url || '', // Handle both camelCase and snake_case
      thumbnail: talk.thumbnail || (talk as any).thumbnail_url || '', // Handle both camelCase and snake_case
      media: serializeMediaItems(talk.gallery.map(galleryItem => ({
        id: galleryItem.id,
        type: 'IMAGE' as const,
        url: galleryItem.imageUrl || (galleryItem as any).image_url || '', // Handle both camelCase and snake_case
        altText: galleryItem.caption || 'Mentor talk media',
        caption: galleryItem.caption,
        order: galleryItem.order,
        isActive: galleryItem.isActive || (galleryItem as any).is_active, // Handle both camelCase and snake_case
        createdAt: galleryItem.createdAt,
        updatedAt: galleryItem.updatedAt
      })))
    }));
};

// Serializer for testimonials
export const serializeTestimonials = (cmsTestimonials: Testimonial[]): any[] => {
  return cmsTestimonials
    .filter(testimonial => testimonial.isActive || (testimonial as any).is_active) // Handle both camelCase and snake_case
    .sort((a, b) => (a.order || 0) - (b.order || 0)) // Handle missing order field
    .map(testimonial => ({
      id: testimonial.id,
      quote: testimonial.quote,
      author: testimonial.author,
      company: testimonial.company,
      image: testimonial.imageUrl || (testimonial as any).image_url || '' // Handle both camelCase and snake_case
    }));
};

// Serializer for about us
export const serializeAboutUs = (cmsAboutUs: AboutUs | null): any | null => {
  if (!cmsAboutUs) return null;
  
  console.log('🔍 serializeAboutUs received:', cmsAboutUs);
  
  // Handle both snake_case and camelCase properties
  const aboutUsData = cmsAboutUs as any;
  
  const result = {
    headline: cmsAboutUs.headline,
    description: cmsAboutUs.description,
    vision: {
      title: aboutUsData['vision_title'] || aboutUsData['visionTitle'],
      description: aboutUsData['vision_desc'] || aboutUsData['visionDesc'],
      icon: 'eye'
    },
    mission: {
      title: aboutUsData['mission_title'] || aboutUsData['missionTitle'],
      description: aboutUsData['mission_desc'] || aboutUsData['missionDesc'],
      icon: 'target'
    }
  };
  
  console.log('🔍 serializeAboutUs result:', result);
  return result;
};

// Mock data serializers
export const serializeMockHeroContent = (mockHeroMedia: MockHeroMediaItem[]): HeroContentUI => {
  return {
    title: 'YANC',
    subtitle: 'Yet Another Networking Club',
    ctaText: 'Join the Community',
    ctaUrl: '/apply/membership',
    mediaItems: mockHeroMedia.map(item => ({
      src: item.src,
      type: item.type,
      alt: item.alt
    }))
  };
};

export const serializeMockPrograms = (mockPrograms: MockProgram[]): ProgramUI[] => {
  return mockPrograms.map(program => ({
    id: program.id,
    title: program.title,
    description: program.description,
    icon: program.icon
  }));
};

export const serializeMockEvents = (mockEvents: MockEvent[]): EventUI[] => {
  return mockEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    location: event.location,
    image: event.image
  }));
};

export const serializeMockTeamMembers = (mockTeamMembers: MockTeamMember[]): TeamMemberUI[] => {
  return mockTeamMembers.map(member => ({
    id: member.id,
    name: member.name,
    role: member.role,
    title: member.role,
    bio: member.description,
    image: member.image,
    socialLinks: member.socialLinks ? {
      twitter: member.socialLinks.twitter,
      linkedin: member.socialLinks.linkedin,
      github: member.socialLinks.github
    } : undefined
  }));
};

export const serializeMockGalleryItems = (mockMediaItems: MockMediaItem[]): MediaItemUI[] => {
  return mockMediaItems.map(item => ({
    id: item.id,
    type: item.type,
    src: item.src,
    alt: item.alt,
    caption: item.alt
  }));
};

export const serializeMockEventGalleries = (mockEventGalleries: MockEventGalleryItem[]): EventGalleryItemUI[] => {
  return mockEventGalleries.map(gallery => ({
    id: gallery.id,
    title: gallery.title,
    date: gallery.date,
    description: gallery.description,
    media: gallery.media.map(media => ({
      id: media.id,
      type: media.type,
      src: media.src,
      alt: media.alt,
      caption: media.alt
    }))
  }));
};

export const serializeMockMentorTalks = (mockMentorTalks: MockMentorTalk[]): MentorTalkUI[] => {
  return mockMentorTalks.map(talk => ({
    id: talk.id,
    title: talk.title,
    speaker: talk.speaker,
    date: talk.date,
    description: talk.description,
    media: talk.media.map(media => ({
      id: media.id,
      type: media.type,
      src: media.src,
      alt: media.alt,
      caption: media.alt
    }))
  }));
};

// Serializer for mock testimonials
export const serializeMockTestimonials = (mockTestimonials: MockTestimonial[]): any[] => {
  return mockTestimonials.map(t => ({
    id: t.id,
    quote: t.quote,
    author: t.author,
    company: t.company,
    image: t.image
  }));
};

// Serializer for mock about us
export const serializeMockAboutUs = (mockAboutUs: MockAboutUs): any => {
  return {
    headline: mockAboutUs.headline,
    description: mockAboutUs.description,
    vision: {
      title: mockAboutUs.vision.title,
      description: mockAboutUs.vision.description,
      icon: mockAboutUs.vision.icon
    },
    mission: {
      title: mockAboutUs.mission.title,
      description: mockAboutUs.mission.description,
      icon: mockAboutUs.mission.icon
    }
  };
};

// Serialize mock founders from the mock data
export const serializeMockFounders = (mockFounders: any[]): TeamMemberUI[] => {
  return mockFounders.map(founder => ({
    id: founder.id,
    name: founder.name,
    role: founder.role, // Use role instead of title for TeamMember
    title: founder.role, // Map role to title for consistency
    bio: founder.description || founder.bio, // Handle both description and bio fields
    image: founder.image,
    socialLinks: founder.socialLinks ? {
      twitter: founder.socialLinks.twitter,
      linkedin: founder.socialLinks.linkedin,
      github: founder.socialLinks.github
    } : undefined
  }));
};
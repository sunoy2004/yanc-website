import { 
  HeroContent, 
  Program, 
  Event, 
  TeamMember, 
  MediaItem,
  EventGallery,
  MentorTalk,
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
  MentorTalk as MockMentorTalk
} from '@/data/mockData';

// Serializer functions to convert CMS data to UI-friendly format
export const serializeHeroContent = (cmsHero: HeroContent | null): HeroContentUI | null => {
  if (!cmsHero) return null;
  
  return {
    title: cmsHero.title,
    subtitle: cmsHero.subtitle,
    ctaText: cmsHero.ctaText,
    ctaUrl: cmsHero.ctaUrl,
    mediaItems: cmsHero.mediaItems.map(item => ({
      src: item.url,
      type: item.type.toLowerCase() as 'image' | 'video',
      alt: item.altText
    }))
  };
};

export const serializePrograms = (cmsPrograms: Program[]): ProgramUI[] => {
  return cmsPrograms
    .filter(program => program.isActive)
    .sort((a, b) => a.order - b.order)
    .map(program => ({
      id: program.id,
      title: program.title,
      description: program.description,
      icon: program.icon
    }));
};

export const serializeEvents = (cmsEvents: Event[]): EventUI[] => {
  return cmsEvents
    .filter(event => event.isActive)
    .map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      location: event.location,
      image: event.imageUrl
    }));
};

export const serializeTeamMembers = (cmsTeamMembers: TeamMember[]): TeamMemberUI[] => {
  return cmsTeamMembers
    .filter(member => member.isActive)
    .sort((a, b) => a.order - b.order)
    .map(member => ({
      id: member.id,
      name: member.name,
      role: member.role,
      title: member.title,
      bio: member.bio,
      image: member.imageUrl,
      socialLinks: member.socialLinks ? {
        twitter: member.socialLinks.twitter,
        linkedin: member.socialLinks.linkedin,
        github: member.socialLinks.github
      } : undefined
    }));
};

export const serializeMediaItems = (cmsMediaItems: MediaItem[]): MediaItemUI[] => {
  return cmsMediaItems
    .filter(item => item.isActive)
    .sort((a, b) => a.order - b.order)
    .map(item => ({
      id: item.id,
      type: item.type.toLowerCase() as 'image' | 'video',
      src: item.url,
      alt: item.altText || 'Media item',
      caption: item.caption
    }));
};

export const serializeEventGalleries = (cmsEventGalleries: EventGallery[]): EventGalleryItemUI[] => {
  return cmsEventGalleries
    .filter(gallery => gallery.isActive)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
    .map(gallery => ({
      id: gallery.id,
      title: gallery.title,
      date: gallery.date,
      description: undefined, // Description not in CMS schema for EventGallery
      media: serializeMediaItems(gallery.images.map(img => ({
        id: img.id,
        type: 'IMAGE' as const,
        url: img.imageUrl,
        altText: img.caption || 'Event image',
        caption: img.caption,
        order: img.order,
        isActive: img.isActive,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt
      })))
    }));
};

export const serializeMentorTalks = (cmsMentorTalks: MentorTalk[]): MentorTalkUI[] => {
  return cmsMentorTalks
    .filter(talk => talk.isActive)
    .map(talk => ({
      id: talk.id,
      title: talk.title,
      speaker: talk.speaker,
      date: talk.date,
      description: talk.description,
      videoUrl: talk.videoUrl,
      thumbnail: talk.thumbnail,
      media: serializeMediaItems(talk.gallery.map(galleryItem => ({
        id: galleryItem.id,
        type: 'IMAGE' as const,
        url: galleryItem.imageUrl,
        altText: galleryItem.caption || 'Mentor talk media',
        caption: galleryItem.caption,
        order: galleryItem.order,
        isActive: galleryItem.isActive,
        createdAt: galleryItem.createdAt,
        updatedAt: galleryItem.updatedAt
      })))
    }));
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

// Serialize mock founders from the mock data
export const serializeMockFounders = (mockFounders: any[]): TeamMemberUI[] => {
  return mockFounders.map(founder => ({
    id: founder.id,
    name: founder.name,
    role: founder.title || founder.role,
    title: founder.title,
    bio: founder.bio,
    image: founder.image,
    socialLinks: founder.socialLinks ? {
      twitter: founder.socialLinks.twitter,
      linkedin: founder.socialLinks.linkedin,
      github: founder.socialLinks.github
    } : undefined
  }));
};
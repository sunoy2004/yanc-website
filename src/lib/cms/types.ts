// CMS Data Types - Mirrored from cms-design/prisma-schema.prisma

export interface MediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string; // Supabase Storage URL
  altText?: string;
  caption?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HeroMediaItem {
  id: string;
  type: 'IMAGE' | 'VIDEO';
  url: string; // Google Drive shareable link
  altText: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  mediaItems: HeroMediaItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SectionContent {
  id: string;
  sectionName: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any; // Flexible JSON field for section-specific content
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MentorTalk {
  id: string;
  programId: string;
  title: string;
  speaker: string;
  date: string; // ISO date string
  description: string;
  videoUrl?: string; // Google Drive shareable link
  thumbnail?: string; // Google Drive shareable link
  gallery: MentorTalkGallery[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MentorTalkGallery {
  id: string;
  mentorTalkId: string;
  imageUrl: string; // Google Drive shareable link
  caption?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date string
  location: string;
  imageUrl: string; // Google Drive shareable link
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventGallery {
  id: string;
  eventId: string;
  title: string;
  date: string; // ISO date string
  images: EventImage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventImage {
  id: string;
  eventGalleryId: string;
  imageUrl: string; // Supabase Storage URL
  caption?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title?: string;
  bio?: string;
  imageUrl: string; // Google Drive shareable link
  order: number;
  socialLinks?: SocialLink;
  type: MemberType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  teamMemberId?: string;
  founderId?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Founder {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string; // Google Drive shareable link
  order: number;
  socialLinks?: SocialLink;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  imageUrl: string; // Google Drive shareable link
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUs {
  id: string;
  headline: string;
  description: string;
  visionTitle: string;
  visionDesc: string;
  missionTitle: string;
  missionDesc: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum MemberType {
  REGULAR = 'REGULAR',
  FOUNDER = 'FOUNDER',
  ADVISOR = 'ADVISOR',
  MENTOR = 'MENTOR'
}

// Serialized UI types for frontend components
export interface HeroContentUI {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  mediaItems: { src: string; type: 'image' | 'video'; alt: string }[];
}

export interface ProgramUI {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EventUI {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface TeamMemberUI {
  id: string;
  name: string;
  role: string;
  title?: string;
  bio?: string;
  image: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface MediaItemUI {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
}

export interface EventGalleryItemUI {
  id: string;
  title: string;
  date: string;
  description?: string;
  media: MediaItemUI[];
}

export interface MentorTalkUI {
  id: string;
  title: string;
  speaker: string;
  date: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
  media: MediaItemUI[];
}
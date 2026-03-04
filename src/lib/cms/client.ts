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
  MediaItem,
} from './types';
import content from '@/data/content';
import type { ContentSchema } from '@/types/content';

const cmsContent = content as ContentSchema;

class CmsClient {
  // All methods below now read from the static JSON generated at build time.
  // No runtime network calls are made for CMS content.

  // Public content endpoints
  async getHeroContent(): Promise<HeroContent | null> {
    return (cmsContent.hero as HeroContent | null) ?? null;
  }

  async getSectionContent(sectionName: string): Promise<SectionContent | null> {
    return (
      (cmsContent.sections as SectionContent[]).find(
        (section) => section.sectionName === sectionName,
      ) ?? null
    );
  }

  async getPrograms(): Promise<Program[]> {
    return (cmsContent.programs as Program[]) ?? [];
  }

  async getMentorTalks(): Promise<MentorTalk[]> {
    return (cmsContent.mentorTalks as MentorTalk[]) ?? [];
  }

  async getEvents(): Promise<Event[]> {
    return (cmsContent.events as Event[]) ?? [];
  }

  async getEventsByType(type: string): Promise<Event[]> {
    return ((cmsContent.events as Event[]) ?? []).filter(
      (event) =>
        (event as any).type === type ||
        (event as any).category === type ||
        (type === 'upcoming' && ((event as any).isUpcoming || (event as any).is_upcoming)) ||
        (type === 'past' && ((event as any).isPast || (event as any).is_past)),
    );
  }

  async getEventsByYear(year: number): Promise<Event[]> {
    return ((cmsContent.events as Event[]) ?? []).filter((event) => {
      const dateStr = (event as any).date || (event as any).event_date;
      if (!dateStr) return false;
      const d = new Date(dateStr);
      return d.getFullYear() === year;
    });
  }

  async getEventGalleries(): Promise<EventGallery[]> {
    return (cmsContent.eventGalleries as EventGallery[]) ?? [];
  }

  async getGalleryItems(): Promise<MediaItem[]> {
    return (cmsContent.galleryItems as MediaItem[]) ?? [];
  }

  // New function to get event gallery items specifically
  async getEventGalleryItems(): Promise<any[]> {
    return (cmsContent as any).eventGalleryItems ?? [];
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return (cmsContent.teamMembers as TeamMember[]) ?? [];
  }

  async getTeamMembersByType(type: string): Promise<TeamMember[]> {
    return ((cmsContent.teamMembers as TeamMember[]) ?? []).filter(
      (member) =>
        (member as any).type === type ||
        (member as any).member_type === type,
    );
  }

  async getTeamMembersBySection(section: string): Promise<TeamMember[]> {
    const members = (cmsContent.teamMembers as TeamMember[]) ?? [];
    // API may return section/team_section; if not, map section to type (content.json from /api/team/public has type only)
    const bySection =
      (m: Record<string, unknown>) =>
        (m.section === section || m.team_section === section);
    const byType =
      (m: Record<string, unknown>) => {
        const t = (m.type as string)?.toUpperCase();
        switch (section) {
          case 'cohort_founders': return t === 'FOUNDER';
          case 'executive_management': return t === 'REGULAR';
          case 'advisory_board': return t === 'ADVISOR';
          case 'global_mentors': return t === 'MENTOR';
          default: return false;
        }
      };
    return members.filter(
      (m) => bySection(m as Record<string, unknown>) || byType(m as Record<string, unknown>),
    ) as TeamMember[];
  }

  async getFounders(): Promise<Founder[]> {
    return (cmsContent.founders as Founder[]) ?? [];
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return (cmsContent.testimonials as Testimonial[]) ?? [];
  }

  async getAboutUs(): Promise<AboutUs | null> {
    return (cmsContent.aboutUs as AboutUs | null) ?? null;
  }

  async getContactInfo(): Promise<ContactInfo | null> {
    return (cmsContent.contactInfo as ContactInfo | null) ?? null;
  }
}

export const cmsClient = new CmsClient();
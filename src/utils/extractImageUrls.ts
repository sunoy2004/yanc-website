import type { ContentSchema } from "@/types/content";

type AnyContent = Partial<ContentSchema> & Record<string, any>;

function pushUrl(urls: string[], url?: unknown) {
  if (typeof url === "string" && url.trim().length > 0) {
    urls.push(url.trim());
  }
}

export function extractImageUrls(content: AnyContent): string[] {
  const urls: string[] = [];

  if (!content) {
    return [];
  }

  // Hero media (carousel / curved slider)
  if (content.hero) {
    const hero: any = content.hero;
    pushUrl(urls, hero.imageUrl || hero.image_url);
    if (Array.isArray(hero.mediaItems)) {
      hero.mediaItems.forEach((item: any) => {
        pushUrl(urls, item.url || item.imageUrl || item.image_url);
      });
    }
  }

  // Mentor talks (thumbnail + gallery)
  if (Array.isArray(content.mentorTalks)) {
    content.mentorTalks.forEach((talk: any) => {
      pushUrl(urls, talk.thumbnail || talk.thumbnail_url);
      if (Array.isArray(talk.gallery)) {
        talk.gallery.forEach((item: any) => {
          pushUrl(urls, item.url || item.imageUrl || item.image_url);
        });
      }
    });
  }

  // Our mentors (image.url)
  const ourMentors: any[] = (content as any).ourMentors ?? [];
  if (Array.isArray(ourMentors)) {
    ourMentors.forEach((m: any) => {
      pushUrl(urls, m.image?.url);
      pushUrl(urls, m.imageUrl || m.image_url);
    });
  }

  // Events (hero image + media items)
  if (Array.isArray(content.events)) {
    content.events.forEach((event: any) => {
      pushUrl(urls, event.imageUrl || event.image_url);
      if (Array.isArray(event.mediaItems)) {
        event.mediaItems.forEach((item: any) => {
          pushUrl(urls, item.url || item.imageUrl || item.image_url);
        });
      }
    });
  }

  // Event gallery items (flat items from event_gallery_items table)
  const eventGalleryItems: any[] = (content as any).eventGalleryItems ?? [];
  if (Array.isArray(eventGalleryItems)) {
    eventGalleryItems.forEach((item: any) => {
      if (Array.isArray(item.media)) {
        item.media.forEach((m: any) => pushUrl(urls, m.url || m.imageUrl || m.image_url));
      }
    });
  }

  // Generic gallery / galleryItems collections if present
  if (Array.isArray(content.galleryItems)) {
    content.galleryItems.forEach((item: any) => {
      pushUrl(urls, item.url || item.imageUrl || item.image_url);
    });
  }

  if (Array.isArray((content as any).gallery)) {
    (content as any).gallery.forEach((item: any) => {
      pushUrl(urls, item.url || item.imageUrl || item.image_url);
    });
  }

  // Team members + founders media
  if (Array.isArray(content.teamMembers)) {
    content.teamMembers.forEach((member: any) => {
      pushUrl(urls, member.imageUrl || member.image_url || member.image);
      if (Array.isArray(member.mediaItems)) {
        member.mediaItems.forEach((item: any) => pushUrl(urls, item.url || item.imageUrl || item.image_url));
      }
    });
  }

  if (Array.isArray(content.founders)) {
    content.founders.forEach((founder: any) => {
      pushUrl(urls, founder.imageUrl || founder.image_url || founder.image);
      if (Array.isArray(founder.mediaItems)) {
        founder.mediaItems.forEach((item: any) => pushUrl(urls, item.url || item.imageUrl || item.image_url));
      }
    });
  }

  // Testimonials avatars
  if (Array.isArray(content.testimonials)) {
    content.testimonials.forEach((t: any) => {
      pushUrl(urls, t.imageUrl || t.image_url);
    });
  }

  // Deduplicate
  return Array.from(new Set(urls));
}


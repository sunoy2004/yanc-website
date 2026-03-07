import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";
import { useContent } from "@/hooks/useContent";
import { serializeMentorTalks } from "@/lib/cms/serializers";
import type { MentorTalkUI } from "@/lib/cms/types";

interface MentorTalk {
  id: string;
  title: string;
  speaker: string;
  speakerBio?: string;
  date: string;
  description: string;
  content?: string;
  videoUrl?: string;
  thumbnail?: string;
  media: MediaItem[];
  isPublished?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

// CMS gallery item shape (partial)
type CmsGalleryItem = {
  id?: string;
  type?: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
  altText?: string;
  caption?: string;
};

const MentorTalks = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const cms = useContent();
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const mentorTalks: MentorTalk[] = useMemo(() => {
    const raw = cms.mentorTalks || [];
    const cmsTalks: MentorTalkUI[] = serializeMentorTalks(raw as any);

    if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_CONTENT_LOGS === 'true') {
      console.log('[content.json] MentorTalks page resolved mentor talks from static content.json', {
        rawCount: raw.length,
        activeCount: cmsTalks.length,
      });
    }

    return cmsTalks.map((talk) => ({
      id: talk.id,
      title: talk.title,
      speaker: talk.speaker,
      speakerBio: "",
      date: talk.date,
      description: talk.description,
      content: "",
      videoUrl: talk.videoUrl,
      thumbnail: talk.thumbnail,
      media: talk.media.map((item) => ({
        id: item.id,
        type: item.type,
        src: item.src,
        alt: item.alt,
      })),
      isPublished: true,
      order: 0,
      createdAt: undefined,
      updatedAt: undefined,
    }));
  }, [cms.mentorTalks]);

  const [expandedTalks, setExpandedTalks] = useState<{[key: string]: boolean}>({});

  const toggleTalkExpansion = (talkId: string) => {
    setExpandedTalks(prev => ({
      ...prev,
      [talkId]: !prev[talkId]
    }));
  };

  const viewMoreTalk = (talkId: string) => {
    setExpandedTalks(prev => ({
      ...prev,
      [talkId]: true
    }));
  };

  const viewLessTalk = (talkId: string) => {
    setExpandedTalks(prev => ({
      ...prev,
      [talkId]: false
    }));
  };

  const handleMediaClick = (media: MediaItem[], initialIndex: number) => {
    setLightboxMedia(media);
    setLightboxInitialIndex(initialIndex);
    setLightboxOpen(true);
  };

  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <div className="w-full px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mentor Talks
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from industry experts and experienced mentors who share their insights and experiences.
            </p>
          </div>
          
          <div className="space-y-12">
            {mentorTalks.map((talk) => {
              const isExpanded = expandedTalks[talk.id] || false;
              
              return (
              <div key={talk.id} className="bg-card border border-border rounded-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{talk.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Speaker: <span className="font-medium text-foreground">{talk.speaker}</span></span>
                    <span>Date: <span className="font-medium text-foreground">{new Date(talk.date).toLocaleDateString()}</span></span>
                  </div>
                  <p className="text-muted-foreground">{talk.description}</p>
                </div>
                
                <div className="mt-6">
                  <ImageVideoGallery 
                    media={talk.media}
                    onMediaClick={(mediaItem, mediaIndex) => handleMediaClick(talk.media, mediaIndex)}
                    columns={4}
                    maxVisible={isExpanded ? undefined : 8}
                    showViewMore={talk.media.length > 8}
                    onViewMoreClick={() => viewMoreTalk(talk.id)}
                    onViewLessClick={() => viewLessTalk(talk.id)}
                  />
                </div>
              </div>
            )})}
          </div>
          
          <Lightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            media={lightboxMedia}
            initialIndex={lightboxInitialIndex}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MentorTalks;
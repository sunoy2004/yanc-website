import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";
import { cmsClient } from "@/lib/cms/client";
import type { MentorTalk as CMSTypeMentorTalk, MediaItemUI } from "@/lib/cms/types";

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

const MentorTalks = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference for initial state
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [mentorTalks, setMentorTalks] = useState<MentorTalk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved theme preference first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    }
    
    // Fetch mentor talks from CMS
    loadMentorTalks();
  }, []);

  const loadMentorTalks = async () => {
    try {
      setLoading(true);
      const cmsTalks = await cmsClient.getMentorTalks();
      
      // Convert CMS types to frontend types
      const convertedTalks: MentorTalk[] = cmsTalks.map(talk => ({
        id: talk.id,
        title: talk.title,
        speaker: talk.speaker,
        speakerBio: '', // Not in CMS schema
        date: talk.date,
        description: talk.description,
        content: '', // Not in CMS schema
        videoUrl: talk.videoUrl,
        thumbnail: talk.thumbnail,
        media: talk.gallery.map((item: any) => ({
          id: item.id,
          type: item.type?.toLowerCase() || 'image',
          src: item.url || item.imageUrl,
          alt: item.alt || item.altText || item.caption || ''
        })),
        isPublished: talk.isActive,
        order: 0, // Not in CMS schema
        createdAt: talk.createdAt,
        updatedAt: talk.updatedAt
      }));
      
      setMentorTalks(convertedTalks);
    } catch (error) {
      console.error('Error loading mentor talks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  };

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
                    columns={3}
                    maxVisible={isExpanded ? undefined : 6}
                    showViewMore={talk.media.length > 4}
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
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { mentorTalks } from "@/data/mockData";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";

const MentorTalks = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
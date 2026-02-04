import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { eventGalleryItems } from "@/data/mockData";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";

const EventGallery = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleMediaClick = (media: MediaItem[], initialIndex: number) => {
    setLightboxMedia(media);
    setLightboxInitialIndex(initialIndex);
    setLightboxOpen(true);
  };

  const [expandedEvents, setExpandedEvents] = useState<{[key: string]: boolean}>({});

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const viewMoreEvent = (eventId: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: true
    }));
  };

  const viewLessEvent = (eventId: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [eventId]: false
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Event Gallery
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            <div className="space-y-8">
              {eventGalleryItems
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by newest first
                .map((event, index) => {
                  const isExpanded = expandedEvents[event.id] || false;
                  
                  return (
                    <div key={event.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <div className="md:w-3/4">
                          <ImageVideoGallery 
                            media={event.media}
                            onMediaClick={(mediaItem, mediaIndex) => handleMediaClick(event.media, mediaIndex)}
                            columns={4}
                            maxVisible={isExpanded ? undefined : 4}
                            showViewMore={event.media.length > 4}
                            onViewMoreClick={() => viewMoreEvent(event.id)}
                            onViewLessClick={() => viewLessEvent(event.id)}
                          />
                        </div>
                      </div>
                    </div>
                  )})
              }
            </div>
            
            <Lightbox
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              media={lightboxMedia}
              initialIndex={lightboxInitialIndex}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventGallery;
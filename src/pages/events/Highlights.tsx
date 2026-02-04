import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { eventGalleryItems } from "@/data/mockData";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";

const EventHighlights = () => {
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
              Event Highlights
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            <div className="space-y-12">
              {eventGalleryItems.map((event) => {
                const isExpanded = expandedEvents[event.id] || false;
                
                return (
                <div key={event.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                    <p className="text-sm text-muted-foreground mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  
                  {/* Featured media section - highlight the best items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.media.slice(0, 2).map((mediaItem, mediaIndex) => (
                      <div 
                        key={mediaItem.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => handleMediaClick(event.media, event.media.indexOf(mediaItem))}
                      >
                        {mediaItem.type === "image" ? (
                          <img
                            src={mediaItem.src}
                            alt={mediaItem.alt}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="relative bg-gray-900 rounded-lg overflow-hidden h-64">
                            <video
                              src={mediaItem.src}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              muted
                              preload="metadata"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white">{mediaItem.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Additional media section */}
                  {event.media.length > 2 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">More Highlights</h3>
                      <ImageVideoGallery 
                        media={event.media.slice(2)}
                        onMediaClick={(mediaItem, mediaIndex) => handleMediaClick(event.media, mediaIndex + 2)}
                        columns={3}
                        maxVisible={isExpanded ? undefined : 6}
                        showViewMore={event.media.length > 4}
                        onViewMoreClick={() => viewMoreEvent(event.id)}
                        onViewLessClick={() => viewLessEvent(event.id)}
                      />
                    </div>
                  )}
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
      </main>

      <Footer />
    </div>
  );
};

export default EventHighlights;
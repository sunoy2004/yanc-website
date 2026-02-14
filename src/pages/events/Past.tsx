import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { eventGalleryItems } from "@/data/mockData";
import ImageVideoGallery from "@/components/gallery/ImageVideoGallery";
import Lightbox from "@/components/gallery/Lightbox";
import { MediaItem } from "@/data/mockData";
import { getPastEvents, WebsiteEvent } from "@/services/cms/events-service";

const PastEvents = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPastEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPastEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load past events');
      console.error('Error loading past events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load past events on component mount
  useEffect(() => {
    loadPastEvents();
  }, []);

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

  // Filter past events
  // Filter past events by strict category (only events with category='past')
  const pastEvents = events.filter(event => 
    event.isActive !== false
  );

  // Group events by year
  const eventsByYear = pastEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<string, typeof pastEvents>);

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Past Events
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading past events...</p>
              </div>
            ) : pastEvents.length > 0 ? (
              <div className="space-y-12">
                {sortedYears.map(year => (
                  <div key={year}>
                    <h2 className="text-2xl font-bold mb-6 text-center border-b border-border pb-2">
                      {year}
                    </h2>
                    <div className="space-y-8">
                      {eventsByYear[year].map((event) => {
                        const isExpanded = expandedEvents[event.id] || false;
                        const visibleMedia = isExpanded ? (event.mediaItems || []) : (event.mediaItems || []).slice(0, 6);
                        
                        return (
                          <div key={event.id} className="bg-card border border-border rounded-lg p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="md:w-1/4">
                                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Date: {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Location: {event.location}
                                </p>
                                <p className="text-muted-foreground text-sm line-clamp-3">
                                  {event.description || 'Event details...'}
                                </p>
                                {event.type && (
                                  <div className="mt-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="md:w-3/4">
                                {event.mediaItems && event.mediaItems.length > 0 ? (
                                  <ImageVideoGallery 
                                    media={event.mediaItems.map(item => ({
                                      id: item.id,
                                      src: item.url,
                                      alt: item.altText || item.alt || event.title,
                                      type: item.type
                                    }))}
                                    onMediaClick={(mediaItem, mediaIndex) => 
                                      handleMediaClick(
                                        event.mediaItems!.map(item => ({
                                          id: item.id,
                                          src: item.url,
                                          alt: item.altText || item.alt || event.title,
                                          type: item.type
                                        })), 
                                        mediaIndex
                                      )
                                    }
                                    columns={4}
                                    maxVisible={isExpanded ? undefined : 6}
                                    showViewMore={event.mediaItems.length > 4}
                                    onViewMoreClick={() => viewMoreEvent(event.id)}
                                    onViewLessClick={() => viewLessEvent(event.id)}
                                  />
                                ) : (
                                  <div className="bg-muted rounded-lg p-8 text-center">
                                    <p className="text-muted-foreground">No media available for this event</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No Past Events Found</h3>
                <p className="text-muted-foreground">
                  There are no past events recorded yet.
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                <p className="text-destructive">Error loading events: {error}</p>
              </div>
            )}
            
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

export default PastEvents;
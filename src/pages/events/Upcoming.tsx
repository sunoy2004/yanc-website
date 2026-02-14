import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const UpcomingEvents = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [events, setEvents] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load upcoming events on component mount
  useEffect(() => {
    loadUpcomingEvents();
  }, []);

  const loadUpcomingEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUpcomingEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load upcoming events');
      console.error('Error loading upcoming events:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Filter upcoming events - show active upcoming events
  const upcomingEvents = events.filter(event => 
    event.isActive !== false &&
    (event.category === 'upcoming' || event.type === 'upcoming')
  );

  // Check for live events (events happening today or in the next 24 hours)
  const liveEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return eventDate >= now && eventDate <= tomorrow;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Upcoming Events
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            
            {/* Live Events Banner */}
            {liveEvents.length > 0 && (
              <div className="mb-8">
                <section 
                  className="live-event-strip bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.location.href = `/events/${liveEvents[0].id}`}
                  aria-label="Live Event"
                  role="banner"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                        <span className="text-white font-bold text-sm uppercase tracking-wider">LIVE NOW</span>
                      </div>
                      <span className="text-white font-medium">{liveEvents[0].title}</span>
                    </div>
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </section>
              </div>
            )}
            
            {/* Upcoming Events Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading upcoming events...</p>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-muted relative overflow-hidden">
                      {event.mediaItems && event.mediaItems.length > 0 ? (
                        <img 
                          src={event.mediaItems[0].url} 
                          alt={event.mediaItems[0].altText || event.mediaItems[0].alt || event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {event.type || 'Event'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {event.description || 'Event details coming soon...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </span>
                        <button 
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                          onClick={() => window.location.href = `/events/${event.id}`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground">
                  Check back later for exciting events and activities!
                </p>
              </div>
            )}
            
            {error && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                <p className="text-destructive">Error loading events: {error}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpcomingEvents;
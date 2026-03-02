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

  // Filter and sort upcoming events - show active upcoming events, sorted by date (closest first)
  const upcomingEvents = events
    .filter(event => {
      if (event.isActive === false) return false;
      if (!(event.category === 'upcoming' || event.type === 'upcoming')) return false;
      // Exclude events that are strictly before today's date (local)
      try {
        const eventDay = new Date(event.date);
        const today = new Date();
        // Normalize both to local date-only (set time to 00:00)
        eventDay.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (eventDay.getTime() < today.getTime()) return false;
      } catch {
        // If date parsing fails, keep the event so it can be inspected
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB; // Ascending order (closest dates first)
    });

  // Helper function to check if event date matches today
  const isEventToday = (eventDate: string) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    
    return (
      eventDay.getDate() === today.getDate() &&
      eventDay.getMonth() === today.getMonth() &&
      eventDay.getFullYear() === today.getFullYear()
    );
  };



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
                          loading="lazy"
                          decoding="async"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {isEventToday(event.date) && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                            LIVE NOW
                          </span>
                        )}
                        {!isEventToday(event.date) && (
                          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                            {event.type || 'Event'}
                          </span>
                        )}
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
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </span>
                        </div>
                        {event.speakers && event.speakers.length > 0 && (
                          <div className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-foreground/90">Speaker{event.speakers.length > 1 ? 's' : ''}:</span>
                            <span>{event.speakers.map((s) => s.role ? `${s.name} (${s.role})` : s.name).join(', ')}</span>
                          </div>
                        )}
                        {event.registrationUrl ? (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Register now
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg bg-primary/70 text-primary-foreground cursor-not-allowed"
                            title="Registration link will be added from CMS"
                          >
                            Register now
                          </span>
                        )}
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
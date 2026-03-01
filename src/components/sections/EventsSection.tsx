import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const EventsSection = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState<WebsiteEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("🚀 Loading upcoming events for EventsSection...");
        const data = await getUpcomingEvents();
        console.log("✅ EventsSection got data:", data);
        console.log("📊 Data length:", data.length);
        console.log("📅 Event dates:", data.map(e => ({title: e.title, date: e.date, category: e.type})));
        
        // Sort events by date (soonest first)
        const sortedEvents = [...data].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        
        setEventsData(sortedEvents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('💥 EventsSection error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section id="events" className="section section-alt">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="section-title">Events</h2>
          <p className="section-subtitle">
            Loading events...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading events:', error);
  }



  console.log("🚀 EVENTS SECTION COMPONENT RENDERING");
  console.log("📊 STATE: eventsData.length =", eventsData.length, "| loading =", loading, "| error =", error);
  
  // Filter upcoming events - show active upcoming events that are not in the past
  const upcomingEvents = eventsData.filter(event => 
    event.isActive !== false &&
    (event.type === 'upcoming' || !event.type) &&
    new Date(event.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) // Only include events that are today or in the future (by date only, ignoring time)
  );
  
  // Get the closest (soonest) event for display
  const closestEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

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
    <section id="events" className="section section-alt">
      <div className="container">
        {/* Section Title */}
        <ScrollAnimateWrapper>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
            <div className="w-16 h-1 bg-primary rounded-full mb-6" />
            <p className="text-muted-foreground mb-6">
              Join us for exciting events and activities
            </p>
          </div>
        </ScrollAnimateWrapper>

        {/* Closest Event - Horizontal Layout (Only ONE event) */}
        {closestEvent && (
          <div className="mt-12 mb-16">
            <ScrollAnimateWrapper>
              <div 
                className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/events/upcoming')}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image - Right side on desktop, top on mobile */}
                  <div className="md:w-2/5">
                    <div className="h-64 md:h-full relative">
                      {closestEvent.mediaItems && closestEvent.mediaItems.length > 0 ? (
                        <img 
                          src={closestEvent.mediaItems[0].url} 
                          alt={closestEvent.mediaItems[0].altText || closestEvent.mediaItems[0].alt || closestEvent.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-muted-foreground text-lg">No image available</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        {isEventToday(closestEvent.date) ? (
                          <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse">
                            LIVE NOW
                          </span>
                        ) : (
                          <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                            Next Event
                          </span>
                        )}
                      </div>
                      {!isEventToday(closestEvent.date) && (
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                            {new Date(closestEvent.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content - Left side on desktop, bottom on mobile */}
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                      {closestEvent.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(closestEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{closestEvent.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {closestEvent.description || 'Event details coming soon...'}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center">
                        {closestEvent.type && !isEventToday(closestEvent.date) && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                            {closestEvent.type.charAt(0).toUpperCase() + closestEvent.type.slice(1)}
                          </span>
                        )}
                        <div className="ml-3 text-sm text-muted-foreground">
                          {Math.ceil((new Date(closestEvent.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days away
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        {closestEvent.registrationUrl ? (
                          <a
                            href={closestEvent.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Register now
                          </a>
                        ) : (
                          <span
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg bg-primary/70 text-primary-foreground cursor-not-allowed"
                            title="Registration link will be added from CMS"
                          >
                            Register now
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        )}

        {/* View All Events Button */}
        <div className="text-center mt-8 mb-12">
          <RouterLink 
            to="/events/upcoming"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Upcoming Events
          </RouterLink>
        </div>

        {/* No Events Message */}
        {upcomingEvents.length === 0 && !loading && (
          <div className="bg-card border border-border rounded-lg p-12 text-center mt-8">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground">
              Check back later for exciting events and activities!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;

import { useState, useEffect } from 'react';
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import { getUpcomingEvents, WebsiteEvent } from "@/services/cms/events-service";

const EventsSection = () => {
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
        setEventsData(data);
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

  // Filter for live events (for demo purposes, we'll consider recent events as live)
  // Also include events happening today or in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  
  const liveEvents = eventsData.filter(event => 
    event.title.toLowerCase().includes('live') || 
    event.title.toLowerCase().includes('discover') ||
    (event.date && new Date(event.date) >= today)
  );

  console.log("🚀 EVENTS SECTION COMPONENT RENDERING");
  console.log("📊 STATE: eventsData.length =", eventsData.length, "| loading =", loading, "| error =", error);
  
  // DEBUG: Add a very visible indicator that this component is rendering
  console.log("🔥 COMPONENT VISIBILITY CHECK - This should appear in console!");

  // Show all upcoming events (excluding live ones to avoid duplication)
  const upcomingEvents = eventsData.filter(event => 
    !liveEvents.some(liveEvent => liveEvent.id === event.id)
  );
  
  console.log("🎯 Upcoming events (non-live):", upcomingEvents.map(e => ({
    title: e.title,
    date: e.date,
    id: e.id
  })));

  return (
    <section id="events" className="section section-alt bg-yellow-100 border-4 border-red-500 p-4">
      <div className="container">
        {/* DEBUG: Very obvious rendering confirmation */}
        <div className="bg-blue-500 text-white p-4 rounded mb-4">
          <h2 className="text-2xl font-bold">🔥 EVENTS SECTION IS RENDERING 🔥</h2>
          <p className="text-lg">Events Count: {eventsData.length}</p>
          <p className="text-sm">Loading: {loading ? 'YES' : 'NO'} | Error: {error || 'NONE'}</p>
        </div>

        {/* DEBUG: Show raw event data */}
        <div className="bg-white p-4 rounded mb-4 border-2 border-green-500">
          <h3 className="font-bold">Raw Event Data:</h3>
          <pre className="text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(eventsData, null, 2)}
          </pre>
        </div>
        {/* Live Event Strip - Only renders if there are live events */}
        {
          liveEvents.length > 0 && (
            <div className="mb-8">
              <section 
                className="live-event-strip bg-gray-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.location.href = `/events/upcoming`}
                aria-label="Live Event"
                role="banner"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-red-500 font-bold text-sm uppercase tracking-wider">LIVE NOW</span>
                    </div>
                    <span className="text-white font-medium">{liveEvents[0].title}</span>
                  </div>
                  <div className="text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </section>
            </div>
          )
        }
        
        {/* Only show section title if there are no live events */}
        {liveEvents.length === 0 && (
          <ScrollAnimateWrapper>
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">
              Check back soon for upcoming events.
            </p>
          </ScrollAnimateWrapper>
        )}

        {/* Display upcoming events list */}
        {upcomingEvents.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(event.date).toLocaleDateString()} • {event.location}
                  </p>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {event.description || 'Event details coming soon...'}
                  </p>
                  {event.type && (
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;

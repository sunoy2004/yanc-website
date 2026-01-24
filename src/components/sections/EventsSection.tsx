import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const EventsSection = () => {
  // Define live events separately from the upcoming events
  const liveEventsData = [
    {
      id: 1,
      title: "YANC Discover Meet",
      status: "live",
      link: "/events/upcoming"
    },
    {
      id: 2,
      title: "Networking Workshop",
      status: "upcoming",
      link: "/events/upcoming"
    }
  ];
  
  // Filter to get only live events
  const liveEvents = liveEventsData.filter(event => event.status === "live");
  
  return (
    <section id="events" className="section section-alt">
      <div className="container">
        {/* Live Event Strip - Only renders if there are live events */}
        {
          liveEvents.length > 0 && (
            <div className="mb-8">
              <section 
                className="live-event-strip bg-gray-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.location.href = liveEvents[0].link}
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
      </div>
    </section>
  );
};

export default EventsSection;

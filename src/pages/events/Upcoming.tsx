import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UpcomingEvents = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Placeholder for live events data - would come from API or state
  // For demo purposes, we'll simulate live events
  const allEvents = [
    {
      id: 1,
      title: "YANC Townhall Meeting",
      status: "live",
      link: "/events"
    },
    {
      id: 2,
      title: "Networking Workshop",
      status: "upcoming",
      link: "/events"
    }
  ];
  
  // Filter to get only live events
  const liveEvents = allEvents.filter(event => event.status === "live");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {
              // Only render if there are live events
              liveEvents.filter(event => event.status === "live").length > 0 && (
                <div className="mb-8">
                  <section 
                    className="live-event-strip bg-gray-900 rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.location.href = liveEvents.length > 0 ? liveEvents[0].link : '/events'}
                    aria-label="Live Event"
                    role="banner"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-red-500 font-bold text-sm uppercase tracking-wider">LIVE NOW</span>
                        </div>
                        <span className="text-white font-medium">{liveEvents.length > 0 ? liveEvents[0].title : 'Live Event'}</span>
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
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Upcoming Events
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                Upcoming events will be listed here.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpcomingEvents;
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Events = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Events
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a 
                href="/events/upcoming" 
                className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
                <p className="text-muted-foreground">Check our future events</p>
              </a>
              
              <a 
                href="/events/past" 
                className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">Past Events</h2>
                <p className="text-muted-foreground">View our event history</p>
              </a>
              
              <a 
                href="/events/gallery" 
                className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">Event Gallery</h2>
                <p className="text-muted-foreground">Photos and memories</p>
              </a>
              
              <a 
                href="/events/highlights" 
                className="bg-card border border-border rounded-lg p-6 text-center hover:bg-accent transition-colors"
              >
                <h2 className="text-xl font-semibold mb-2">Event Highlights</h2>
                <p className="text-muted-foreground">Key moments and achievements</p>
              </a>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                Stay tuned for exciting events and activities!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Zap } from "lucide-react";

const WhyUs = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Data for Your Takeaway section
  const takeawayCards = [
    {
      id: 1,
      title: "Meaningful Connections",
      description: "Building relationships and social skills.",
      footerText: "Networking made easy",
      image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769272882/6_xlueja.jpg"
    },
    {
      id: 2,
      title: "Life Skills & Experience",
      description: "Crucial tools for success.",
      footerText: "Empowering your journey",
      image: "https://res.cloudinary.com/dzjot5f7d/image/upload/v1769272876/7_xdv4gd.jpg"
    }
  ];

  // Data for Why Us section
  const whyUsCards = [
    {
      id: 1,
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "The YANC Advantage",
      description: "All-in-one platform for personal and professional growth",
      footerLabel: "EMPOWERING YOUR FUTURE"
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Comprehensive Ecosystem",
      description: "Blending human touch with technological innovation",
      footerLabel: "INNOVATIVE CONNECTIONS"
    },
    {
      id: 3,
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Cutting-Edge Approach",
      description: "Leveraging the latest tools and techniques for optimal results",
      footerLabel: "LEADING THE FUTURE"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Your Takeaway Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Takeaway
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {takeawayCards.map((card) => (
                <div 
                  key={card.id}
                  className="bg-card rounded-md p-3 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="mb-3">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-32 object-cover rounded-md aspect-square object-center"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {card.description}
                    </p>
                  </div>
                  <div className="px-2 pb-2">
                    <p className="text-xs text-muted-foreground italic">
                      {card.footerText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Us Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Us
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUsCards.map((card) => (
                <div 
                  key={card.id}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex justify-center mb-4">
                    {card.icon}
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
                      {card.title}
                    </span>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {card.footerLabel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhyUs;
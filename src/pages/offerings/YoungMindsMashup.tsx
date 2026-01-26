import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, TrendingUp, Handshake, Lightbulb } from "lucide-react";

const YoungMindsMashup = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Data for feature cards
  const featureCards = [
    {
      id: 1,
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: "Get Mentorship",
      description: "Mentorship from industry experts to guide you every step of the way."
    },
    {
      id: 2,
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Access Funding",
      description: "Funding opportunities to give wings to your startup ideas."
    },
    {
      id: 3,
      icon: <Handshake className="w-8 h-8 text-primary" />,
      title: "Scale & Sustain",
      description: "Learn how to scale and sustain your startup in the long run."
    },
    {
      id: 4,
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Collaborate & Network",
      description: "Collaborate and network with like-minded peers to accelerate your growth."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Section Heading */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Young Minds Mashup
              </h1>
            </div>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Where Innovation Meets Opportunity
            </p>
          </div>

          {/* Introductory Content */}
          <div className="text-center mb-8 mx-auto bg-card/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-border/50">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
              <h2 className="text-lg md:text-xl font-bold text-primary">
                Transforming Ideas into Impactful Startups
              </h2>
            </div>
            <div className="mb-4">
              <p className="text-sm md:text-base text-foreground leading-relaxed font-medium max-w-2xl mx-auto">
                Are you brimming with innovative ideas?<br/>Do you dream of transforming your concepts into a successful startup?<br/>At YANC, we are here to make that happen!
              </p>
            </div>
            <div className="pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Young Minds Mashup is an exclusive incubation program designed to provide young entrepreneurs, aged 15 to 28, with the tools, mentorship, and funding you need to scale your ideas.
              </p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
            style={{
              animation: 'fadeIn 0.8s ease-out forwards',
              opacity: 0
            }}
          >
            {featureCards.map((card, index) => (
              <div 
                key={card.id}
                className="feature-card group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                {/* Animated background glow */}
                <div className="feature-card-glow"></div>
                
                {/* Floating particles effect */}
                <div className="feature-card-particle" style={{ top: '1rem', right: '1rem', animationDelay: '0.2s' }}></div>
                <div className="feature-card-particle" style={{ bottom: '1rem', left: '1rem', width: '0.375rem', height: '0.375rem', animationDelay: '0.5s' }}></div>
                
                <div className="flex justify-center mb-6 relative">
                  <div className="feature-card-icon">
                    <div className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-3">
                      {card.icon}
                    </div>
                  </div>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-45"></div>
                </div>
                
                <h3 className="feature-card-title">
                  {card.title}
                </h3>
                
                <p className="feature-card-description">
                  {card.description}
                </p>
                
                {/* Enhanced hover indicator */}
                <div className="mt-4 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-0.5 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    <div className="w-3 h-0.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
                
                {/* Subtle border animation */}
                <div className="feature-card-border"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to Transform Your Vision?
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto text-xs">
                Join our community of innovators and turn your ideas into reality
              </p>
              <a 
                href="/startup-pitch"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 hover:shadow-md transition-all duration-300"
              >
                Submit Your Idea
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YoungMindsMashup;
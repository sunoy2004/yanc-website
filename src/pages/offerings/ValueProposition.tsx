import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, MessageCircle, Wrench, Briefcase, Wallet, Heart } from "lucide-react";

const ValueProposition = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  // Content data - structured for CMS integration
  const valueCards = [
    {
      id: 1,
      icon: <MessageCircle className="w-8 h-8 text-primary" />,
      title: "Monthly Meetups & Networking",
      description: "Connect with peers and professionals in engaging meetings to expand your network."
    },
    {
      id: 2,
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Mentorship Programs",
      description: "Gain insights from experienced mentors across different industries to help guide your career."
    },
    {
      id: 3,
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Practical Skill-Building Workshops",
      description: "Enhance your skills through hands-on workshops designed for real-world application."
    },
    {
      id: 4,
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Real-World Project Experience",
      description: "Work on industry-relevant projects that provide you with the hands-on experience you need."
    },
    {
      id: 5,
      icon: <Wallet className="w-8 h-8 text-primary" />,
      title: "Financial Literacy",
      description: "Learn essential financial strategies and practices to manage your personal and business finances."
    },
    {
      id: 6,
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Building Relationships",
      description: "Foster strong interpersonal connections to help you build a professional network and career."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Value Proposition
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
          </div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueCards.map((card, idx) => (
              <div
                key={card.id}
                className="feature-card group"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="feature-card-glow" />
                <div className="feature-card-particle" style={{ top: '0.75rem', right: '0.75rem', animationDelay: '0.12s' }} />
                <div className="feature-card-particle" style={{ bottom: '0.75rem', left: '0.75rem', width: '0.375rem', height: '0.375rem', animationDelay: '0.35s' }} />

                <div className="flex justify-center mb-4 relative z-10">
                  <div className="feature-card-icon p-3 rounded-full bg-primary/10">
                    <div className="transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-3">
                      {card.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-45 pointer-events-none" />
                </div>

                <h3 className="feature-card-title">
                  {card.title}
                </h3>
                <p className="feature-card-description">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ValueProposition;
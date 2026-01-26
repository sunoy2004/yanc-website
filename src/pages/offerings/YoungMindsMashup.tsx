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
          <div className="text-center mb-10">
            <div className="inline-block relative mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground relative z-10">
                Young Minds Mashup
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {featureCards.map((card) => (
              <div 
                key={card.id}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 text-center group-hover:text-primary transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-6 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-1 bg-primary rounded-full mx-auto"></div>
                </div>
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
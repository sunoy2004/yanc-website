import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, MessageCircle, Wrench, Briefcase, Wallet, Heart } from "lucide-react";

const ValueProposition = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

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
            {valueCards.map((card) => (
              <div 
                key={card.id}
                className="bg-card rounded-xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
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
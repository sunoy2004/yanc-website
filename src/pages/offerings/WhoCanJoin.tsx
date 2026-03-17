import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import youthImg from "./youth.jpeg";
import mentorImg from "./mentor.jpg";
import partnerImg from "./partner.jpg";

const WhoCanJoin = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  // Data for Who Can Join section
  const whoCanJoinCards = [
    {
      id: 1,
      title: "Youth (15–28)",
      description: "Access a world of opportunities to grow, learn, and connect.",
      image: youthImg,
      link: "https://web.yanc.in/contact-us",
      external: true
    },
    {
      id: 2,
      title: "Mentors",
      description: "Share your expertise and make a difference in young lives.",
      image: mentorImg,
      link: "https://web.yanc.in/mentor-registration",
      external: true
    },
    {
      id: 3,
      title: "Partners",
      description: "Academia, Corporate and Entrepreneurs can empower the next generation.",
      image: partnerImg,
      link: "https://web.yanc.in/contact-us",
      external: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Who Can Join Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who Can Join
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whoCanJoinCards.map((card) => (
                <a 
                  key={card.id}
                  href={card.link}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group block"
                >
                  <div className="aspect-video overflow-hidden image-placeholder">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 border-b border-primary/20 pb-2 inline-block">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhoCanJoin;
import { useState, useEffect, useRef } from "react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

// Core values data
const coreValues = [
  {
    id: 1,
    title: "Respect",
    description: "Treat everyone with dignity and value diverse perspectives.",
    icon: "🤝"
  },
  {
    id: 2,
    title: "Gratitude",
    description: "Fostering a culture of appreciation and support.",
    icon: "🙏"
  },
  {
    id: 3,
    title: "Resilience",
    description: "Resilience is bouncing back stronger every time.",
    icon: "💪"
  },
  {
    id: 4,
    title: "Doing the Right Thing",
    description: "Act with integrity and make ethical decisions.",
    icon: "⚖️"
  },
  {
    id: 5,
    title: "Think Big, Start Small",
    description: "Dream ambitiously while taking actionable steps.",
    icon: "🎯"
  },
  {
    id: 6,
    title: "Purposeful Learning",
    description: "Every lesson learned with purpose leads to meaningful change.",
    icon: "📚"
  },
  {
    id: 7,
    title: "Fostering Connections",
    description: "Connections spark growth and fuel possibilities.",
    icon: "🔗"
  }
];

const CoreValuesSection = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section id="core-values" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Text Content (50%) */}
          <ScrollAnimateWrapper delay={0}>
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Core Values
              </h2>
              
              {/* Divider line */}
              <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
              
              <p className="text-muted-foreground leading-relaxed">
                Our foundational principles guide everything we do. These seven core values 
                shape our community, drive our decisions, and define who we are as 
                individuals and as a collective force for positive change.
              </p>
            </div>
          </ScrollAnimateWrapper>

          {/* Right Column - 3D Carousel (50%) */}
          <ScrollAnimateWrapper delay={150}>
            <div className="lg:col-span-1 flex items-center justify-center relative myGalleryParent">
              <div 
                ref={carouselRef}
                className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96"
                style={{ perspective: '1000px' }}
              >
                <div 
                  className="myGallery"
                  style={{
                    width: '170px',
                    height: '200px',
                    transformStyle: 'preserve-3d',
                    animation: isReducedMotion ? 'none' : 'animate 20s linear infinite',
                    transform: 'perspective(1000px) rotateY(0deg)',
                  }}
                >
                  {coreValues.map((value, index) => {
                    const angle = (index * 360) / coreValues.length;
                    const radius = 200; // Based on the formula from the provided code
                    
                    return (
                      <div
                        key={value.id}
                        className="elementor-widget-image"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          transformOrigin: 'center',
                          transformStyle: 'preserve-3d',
                          margin: 0,
                          transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-card border border-border rounded-xl shadow-sm core-value-card">
                          <div className="text-3xl md:text-4xl mb-3">
                            {value.icon}
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                            {value.title}
                          </h3>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollAnimateWrapper>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
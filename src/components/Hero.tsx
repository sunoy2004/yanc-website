import CurvedSlider from "./CurvedSlider";
import { heroMedia } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Top content - moved above carousel */}
      <div className="hero-top-content">
        <h1 className="hero-title-top">
          <span className="text-accent">YANC</span>
        </h1>
        <p className="hero-subtitle-top">Yet Another Networking Club</p>
      </div>

      {/* Three.js curved slider background */}
      <div className="hero-carousel-container">
        <CurvedSlider items={heroMedia} speed={15} gap={65} curve={6} />
      </div>

      {/* Bottom content - moved below carousel */}
      <div className="hero-bottom-content">
        <div className="hero-content">
          <p className="hero-description">
            Placeholder tagline goes here. Connect, collaborate, create.
          </p>
          <div className="hero-cta">
            <a 
              href="https://web.yanc.in/membership-application" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Community
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - REMOVED */}
      {/* <div className="hero-scroll-indicator">
        <div className="scroll-arrow" />
      </div> */}
    </section>
  );
};

export default Hero;

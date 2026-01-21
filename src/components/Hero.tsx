import CurvedSlider from "./CurvedSlider";
import { heroMedia } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Three.js curved slider background */}
      <div className="hero-carousel-container">
        <CurvedSlider items={heroMedia} speed={15} gap={65} curve={6} />
      </div>

      {/* Overlay content */}
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="text-accent">YANC</span>
          </h1>
          <p className="hero-subtitle">Yet Another Networking Club</p>
          <p className="hero-description">
            Placeholder tagline goes here. Connect, collaborate, create.
          </p>
          <div className="hero-cta">
            <Button variant="primary" size="lg">
              Join the Community
            </Button>
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

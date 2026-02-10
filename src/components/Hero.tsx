import { useState, useEffect } from "react";
import CurvedSlider from "./CurvedSlider";
import { Button } from "@/components/ui/button";
import { cmsService } from "@/lib/cms/service";
import { HeroContentUI } from "@/lib/cms/types";
import { HeroMediaItem } from "@/data/mockData";

const Hero = () => {
  const [heroContent, setHeroContent] = useState<HeroContentUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        setIsLoading(true);
        const content = await cmsService.getHeroContent();
        setHeroContent(content);
      } catch (error) {
        console.error("Error loading hero content:", error);
        // The service already handles fallbacks, so we just need to ensure state is set
        setHeroContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroContent();
  }, []);

  // Show loading state or fallback content while loading
  if (isLoading) {
    return (
      <section className="hero-section">
        <div className="hero-top-content">
          <h1 className="hero-title-top">
            <span className="text-accent">YANC</span>
          </h1>
          <p className="hero-subtitle-top">Yet Another Networking Club</p>
        </div>
        <div className="hero-carousel-container">
          {/* Loading placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
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
      </section>
    );
  }

  // Use CMS content if available, otherwise fallback to default structure
  const title = heroContent?.title || "YANC";
  const subtitle = heroContent?.subtitle || "Yet Another Networking Club";
  const description = heroContent?.ctaText || "Placeholder tagline goes here. Connect, collaborate, create.";
  const ctaText = heroContent?.ctaText || "Join the Community";
  const ctaUrl = heroContent?.ctaUrl || "/apply/membership";
  const mediaItems = heroContent?.mediaItems || [];

  // Convert CMS media items to HeroMediaItem format expected by CurvedSlider
  const sliderItems: HeroMediaItem[] = mediaItems.map((item, index) => ({
    id: `cms-${index}`,
    type: item.type,
    src: item.src,
    alt: item.alt
  }));

  return (
    <section className="hero-section">
      {/* Top content - moved above carousel */}
      <div className="hero-top-content">
        <h1 className="hero-title-top">
          <span className="text-accent">{title}</span>
        </h1>
        <p className="hero-subtitle-top">{subtitle}</p>
      </div>

      {/* Three.js curved slider background */}
      <div className="hero-carousel-container">
        {sliderItems.length > 0 ? (
          <CurvedSlider items={sliderItems} speed={15} gap={65} curve={6} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-muted-foreground text-center">
              <p>No media content available</p>
            </div>
          </div>
        )}
      </div>

      {/* Overlay content */}
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-description">
            {description}
          </p>
          <div className="hero-cta">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => window.location.href = ctaUrl}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

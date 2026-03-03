import { useMemo } from "react";
import CurvedSlider from "./CurvedSlider";
import { Button } from "@/components/ui/button";
import { HeroContentUI } from "@/lib/cms/types";
import { HeroMediaItem } from "@/data/mockData";
import { optimizeImageUrl } from "@/lib/cms/utils";
import { useContent } from "@/hooks/useContent";

const Hero = () => {
  const cms = useContent();

  const heroContent: HeroContentUI | null = useMemo(() => {
    const raw = cms.hero as unknown as {
      title?: string;
      subtitle?: string;
      description?: string;
      ctaText?: string;
      cta_text?: string;
      ctaUrl?: string;
      cta_url?: string;
      mediaItems?: Array<{
        url?: string;
        type?: string;
        alt?: string;
        altText?: string;
      }>;
    } | null;
    if (!raw) return null;
    return {
      title: raw.title,
      subtitle: raw.subtitle,
      description: raw.description || "",
      ctaText: raw.ctaText || raw.cta_text || "Join the Community",
      ctaUrl: raw.ctaUrl || raw.cta_url || "https://web.yanc.in/membership-application",
      mediaItems: (raw.mediaItems || []).map((item) => ({
        src: item.url || "",
        type: (item.type || "image").toLowerCase() as "image" | "video",
        alt: item.alt || item.altText || "",
      })),
    };
  }, [cms.hero]);

  // Use CMS content if available, otherwise fallback to default structure
  const title = heroContent?.title || "YANC";
  const subtitle = heroContent?.subtitle || "Yet Another Networking Club";
  const description = heroContent?.description || "Young Minds | Networking | Life Skills";
  const ctaText = heroContent?.ctaText || "Join the Community";
  const ctaUrl = heroContent?.ctaUrl || "https://web.yanc.in/membership-application";
  const mediaItems = heroContent?.mediaItems || [];

  // Convert CMS media items to HeroMediaItem format expected by CurvedSlider
  const sliderItems: HeroMediaItem[] = mediaItems.map((item, index) => ({
    id: `cms-${index}`,
    type: item.type,
    src: optimizeImageUrl(item.src, 'hero'),
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
              onClick={() => {
                // Open CTA URL directly with https prefix
                const fullUrl = ctaUrl.startsWith('http') ? ctaUrl : `https://${ctaUrl}`;
                window.open(fullUrl, '_blank', 'noopener,noreferrer');
              }}
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

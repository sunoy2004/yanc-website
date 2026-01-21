import { useEffect, useState } from "react";
import { HeroMediaItem } from "@/data/mockData";

interface CarouselItemState {
  [key: string]: boolean;
}

interface HeroCarouselProps {
  items: HeroMediaItem[];
}

const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [erroredImages, setErroredImages] = useState<CarouselItemState>({});

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items];

  return (
    <div className="hero-carousel-wrapper">
      <div className="hero-carousel-perspective">
        <div
          className={`hero-carousel-track ${
            isPaused || prefersReducedMotion ? "paused" : ""
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="hero-carousel-item">
              <div className="relative w-full h-full">
                {item.type === "image" ? (
                  <>
                    {!erroredImages[`${item.id}-${index}`] && (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="eager"
                        className="w-full h-full object-cover"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                          willChange: "transform",
                        }}
                        decoding="async"
                        onError={() => {
                          setErroredImages(prev => ({
                            ...prev,
                            [`${item.id}-${index}`]: true
                          }));
                        }}
                      />
                    )}
                    {(erroredImages[`${item.id}-${index}`] || !item.src) && (
                      <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">Image failed to load</span>
                      </div>
                    )}
                  </>
                ) : (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    autoPlay={!prefersReducedMotion}
                    className="w-full h-full object-cover"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                      willChange: "transform",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;

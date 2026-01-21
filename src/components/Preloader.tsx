import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [currentStep, setCurrentStep] = useState<"typing" | "morphing" | "fading">("typing");
  const [visibleLetters, setVisibleLetters] = useState<number>(0);
  const [showYanc, setShowYanc] = useState<boolean>(false);

  const fullText = "Yet     Another     Networking     Club";
  const yancText = "YANC";

  // Handle prefers-reduced-motion
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animation entirely
      const timer = setTimeout(() => {
        onComplete();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Typing animation - letter by letter
    const typingTimer = setTimeout(() => {
      if (visibleLetters < fullText.length) {
        setVisibleLetters(prev => prev + 1);
      } else {
        // Move to morphing step
        setCurrentStep("morphing");
        setTimeout(() => {
          setShowYanc(true);
          // Move to fading step
          setTimeout(() => {
            setCurrentStep("fading");
            // Complete preloader
            setTimeout(() => {
              onComplete();
            }, 400);
          }, 800);
        }, 300);
      }
    }, 50); // Faster letter timing

    return () => clearTimeout(typingTimer);
  }, [visibleLetters, fullText.length, onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={`preloader ${currentStep === "fading" ? "preloader-fade-out" : ""}`}>
      <div className="preloader-content">
        {!showYanc ? (
          <div className={`preloader-text ${currentStep === "morphing" ? "preloader-text-hidden" : ""}`}>
            {fullText.split("").map((letter, index) => (
              <span
                key={index}
                className={`preloader-letter ${
                  index < visibleLetters ? "preloader-letter-visible" : ""
                } ${
                  ["Y", "A", "N", "C"].includes(letter) ? "preloader-letter-capital" : ""
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        ) : (
          <div className={`preloader-yanc ${currentStep === "fading" ? "" : "preloader-yanc-visible"}`}>
            {yancText.split("").map((letter, index) => (
              <span key={index} className="preloader-yanc-letter">
                {letter}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preloader;
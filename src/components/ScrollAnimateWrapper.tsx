import { ReactNode } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

interface ScrollAnimateWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollAnimateWrapper = ({
  children,
  className = "",
  delay = 0,
}: ScrollAnimateWrapperProps) => {
  const { ref, isVisible, prefersReducedMotion } = useScrollAnimation();

  const animationStyle = prefersReducedMotion
    ? {}
    : {
        transitionDelay: `${delay}ms`,
      };

  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? "scroll-animate-visible" : ""} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default ScrollAnimateWrapper;

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { heroMedia } from "../data/mockData";

describe("HeroMedia", () => {
  it("should have alternating image and video types", () => {
    // Check that the media alternates between image and video types
    for (let i = 0; i < heroMedia.length; i++) {
      if (i % 2 === 0) {
        // Even indices should be images
        expect(heroMedia[i].type).toBe("image");
      } else {
        // Odd indices should be videos
        expect(heroMedia[i].type).toBe("video");
      }
    }
  });

  it("should have valid src URLs", () => {
    heroMedia.forEach(item => {
      expect(item.src).toBeDefined();
      expect(typeof item.src).toBe("string");
      expect(item.src).toMatch(/^https?:\/\//); // Should be a valid URL
    });
  });

  it("should have valid alt texts", () => {
    heroMedia.forEach(item => {
      expect(item.alt).toBeDefined();
      expect(typeof item.alt).toBe("string");
      expect(item.alt.length).toBeGreaterThan(0);
    });
  });
});
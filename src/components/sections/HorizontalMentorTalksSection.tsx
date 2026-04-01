import { useEffect, useMemo, useState } from "react";
import { useContent } from "@/hooks/useContent";
import type { OurMentor } from "@/types/content";

/**
 * NOTE: This is intentionally a copy of `HorizontalTeamSection`.
 * You said you'll repurpose this for "Our Mentors" later (images + names, same horizontal scroll).
 * For now it renders the same data/behavior so you can iterate safely without breaking Cohort Founders.
 */
const HorizontalMentorTalksSection = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [topBeltHovered, setTopBeltHovered] = useState(false);
  const cms = useContent();

  const mentors = useMemo(() => {
    const raw = ((cms as any).ourMentors ?? []) as OurMentor[];
    return raw
      .filter((m) => m && m.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((m) => ({
        id: m.id,
        name: (m.name ?? "").trim(),
        image: (m.image?.url ?? "").trim() || "/placeholder.jpg",
      }))
      .filter((m) => m.name.length > 0);
  }, [cms]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (mentors.length === 0) {
    return (
      <section id="mentor-talks-horizontal" className="section horizontal-team-section bg-background pt-0 pb-12 sm:pb-16 md:pb-20">
        <div className="container text-center">
          <h2 className="section-title text-3xl md:text-4xl font-bold">Our Mentors</h2>
          <p className="section-subtitle">Loading...</p>
        </div>
      </section>
    );
  }

  // Triple items for seamless looping
  const tripledMentors = [...mentors, ...mentors, ...mentors];

  return (
    <section id="mentor-talks-horizontal" className="section horizontal-team-section bg-background pt-0 pb-12 sm:pb-16 md:pb-20">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="w-full sm:w-auto">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-left">Our Mentors</h2>
            <div className="w-16 h-1 bg-primary rounded-full mt-2 sm:mt-0" />
          </div>

          {/* View-all button intentionally hidden for now (Our Mentors section will be repurposed). */}
          {/* <div className="self-start sm:self-center">
            <button
              className="view-all-button group px-6 py-2.5 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-all duration-300 flex items-center gap-1.5 border border-primary/20"
              onClick={() => navigate("/team/cohort-founders")}
            >
              <span className="text-sm">View all</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div> */}
        </div>

        <div className="team-belt-container overflow-hidden">
          <div
            className={`team-belt top-belt ${prefersReducedMotion ? "static" : "animate-move-left"} ${
              topBeltHovered ? "paused" : ""
            }`}
          >
            {tripledMentors.map((mentor, index) => (
              <div
                key={`top-${mentor.id}-${index}`}
                className="relative group flex-shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 aspect-square w-[clamp(170px,22vw,230px)] border border-border hover:border-primary/30"
                onMouseEnter={() => setTopBeltHovered(true)}
                onMouseLeave={() => setTopBeltHovered(false)}
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex justify-center">
                  <p className="text-white text-sm font-medium text-center line-clamp-2 max-w-full px-1">
                    {mentor.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom belt kept for parity (currently unused in original) */}
          {/*
          <div
            className={`team-belt bottom-belt ${prefersReducedMotion ? "static" : "animate-move-right"} ${
              bottomBeltHovered ? "paused" : ""
            }`}
          >
            {tripledMembers.map((member, index) => (
              <div
                key={`bottom-${member.id}-${index}`}
                className="team-card group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setBottomBeltHovered(true)}
                onMouseLeave={() => setBottomBeltHovered(false)}
                onClick={() => handleCardClick(member)}
              >
                <div className="team-image-container">
                  <img src={member.image} alt={member.name} className="team-image" loading="lazy" />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          */}
        </div>
      </div>

    </section>
  );
};

export default HorizontalMentorTalksSection;


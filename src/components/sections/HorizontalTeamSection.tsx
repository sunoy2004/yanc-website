import { useState, useEffect } from "react";
import { teamMembers } from "@/data/mockData";
import TeamMemberModal from "@/components/TeamMemberModal";

const HorizontalTeamSection = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [topBeltHovered, setTopBeltHovered] = useState(false);
  const [bottomBeltHovered, setBottomBeltHovered] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleCardClick = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // Triple team members for truly seamless looping
  const tripledMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section id="team-horizontal" className="horizontal-team-section py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title text-3xl md:text-4xl font-bold">Our Team</h2>
          <button className="view-all-button group px-6 py-2.5 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-all duration-300 flex items-center gap-1.5 border border-primary/20">
            <span className="text-sm">View all members</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="team-belt-container overflow-hidden">
          {/* Top belt - moves left to right */}
          <div className={`team-belt top-belt ${prefersReducedMotion ? 'static' : 'animate-move-left'} ${topBeltHovered ? 'paused' : ''}`}>
            {tripledMembers.map((member, index) => (
              <div 
                key={`top-${member.id}-${index}`} 
                className="team-card group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setTopBeltHovered(true)}
                onMouseLeave={() => setTopBeltHovered(false)}
                onClick={() => handleCardClick(member)}
              >
                <div className="team-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team-image"
                    loading="lazy"
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom belt - moves right to left - COMMENTED OUT */}
          {/*
          <div className={`team-belt bottom-belt ${prefersReducedMotion ? 'static' : 'animate-move-right'} ${bottomBeltHovered ? 'paused' : ''}`}>
            {tripledMembers.map((member, index) => (
              <div 
                key={`bottom-${member.id}-${index}`} 
                className="team-card group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setBottomBeltHovered(true)}
                onMouseLeave={() => setBottomBeltHovered(false)}
                onClick={() => handleCardClick(member)}
              >
                <div className="team-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team-image"
                    loading="lazy"
                  />
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
      {isModalOpen && selectedMember && (
        <TeamMemberModal 
          member={selectedMember} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
};

export default HorizontalTeamSection;
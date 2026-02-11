import { useState, useEffect } from "react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import TeamMemberModal from "@/components/TeamMemberModal";
import { useFoundersData } from "@/services/cms/useFoundersData";
import { TeamMemberUI } from "@/lib/cms/types";

const FoundersSection = () => {
  const { foundersData, loading, error } = useFoundersData();
  const [selectedFounder, setSelectedFounder] = useState<TeamMemberUI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <section id="founders" className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-4">Meet the Founders</h2>
          <p className="section-subtitle text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Loading founders...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading founders:', error);
  }

  const handleFounderClick = (founder: TeamMemberUI) => {
    setSelectedFounder(founder);
    setIsModalOpen(true);
  };

  return (
    <section id="founders" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimateWrapper>
          <h2 className="section-title text-3xl md:text-4xl font-bold text-center mb-4">Meet the Founders</h2>
          <p className="section-subtitle text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Visionaries who shaped our journey and continue to drive innovation
          </p>
        </ScrollAnimateWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {foundersData.map((founder) => (
            <ScrollAnimateWrapper key={founder.id}>
              <div 
                className="founder-card bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                onClick={() => handleFounderClick(founder)}
              >
                <div className="founder-image-container mb-4 flex justify-center">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                </div>
                <h3 className="founder-name text-lg font-semibold text-foreground text-center mb-1">
                  {founder.name}
                </h3>
                <p className="founder-title text-sm text-muted-foreground text-center">
                  {founder.role || founder.title}
                </p>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>

        {/* Founder Detail Modal */}
        {isModalOpen && selectedFounder && (
          <TeamMemberModal 
            member={selectedFounder} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </div>
    </section>
  );
};

export default FoundersSection;
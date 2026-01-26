import React, { useState } from "react";
import { TeamMember, Founder } from "@/data/mockData";
import TeamMemberModal from "@/components/TeamMemberModal";

interface UnifiedTeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface TeamGridProps {
  members: (TeamMember | Founder)[];
  sectionTitle: string;
  sectionSubtitle?: string;
}

interface UnifiedTeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  bio?: string;
}

const TeamGrid: React.FC<TeamGridProps> = ({ 
  members, 
  sectionTitle, 
  sectionSubtitle 
}) => {
  const [selectedMember, setSelectedMember] = useState<UnifiedTeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert Founder to UnifiedTeamMember
  const unifiedMembers: UnifiedTeamMember[] = members.map(member => {
    if ('title' in member) {
      // It's a Founder
      return {
        id: member.id,
        name: member.name,
        role: member.title,
        image: member.image,
        description: member.bio,
        socialLinks: member.socialLinks,
        bio: member.bio
      };
    } else {
      // It's a TeamMember
      return {
        ...member,
        role: member.role,
        bio: member.description
      };
    }
  });

  const handleCardClick = (member: UnifiedTeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {sectionTitle}
        </h1>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6"></div>
        {sectionSubtitle && (
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionSubtitle}
          </p>
        )}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {unifiedMembers.map((member) => (
          <div 
            key={member.id}
            onClick={() => handleCardClick(member)}
            className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
          >
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/30 transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Member Info - Only Name and Role */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMember && (
        <TeamMemberModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default TeamGrid;
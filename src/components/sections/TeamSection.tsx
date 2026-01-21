import { teamMembers } from "@/data/mockData";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const TeamSection = () => {
  return (
    <section id="team" className="section">
      <div className="container">
        <ScrollAnimateWrapper>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </ScrollAnimateWrapper>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <ScrollAnimateWrapper key={member.id}>
              <div className="team-card">
                <div className="team-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            </ScrollAnimateWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

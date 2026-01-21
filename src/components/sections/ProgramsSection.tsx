import { programs } from "@/data/mockData";
import { Rocket, Users, Lightbulb, Target } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  users: Users,
  lightbulb: Lightbulb,
  target: Target,
};

const ProgramsSection = () => {
  return (
    <section id="programs" className="section">
      <div className="container">
        <ScrollAnimateWrapper>
          <h2 className="section-title">Programs</h2>
          <p className="section-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </ScrollAnimateWrapper>

        <div className="programs-grid">
          {programs.map((program) => {
            const Icon = iconMap[program.icon] || Rocket;
            return (
              <ScrollAnimateWrapper key={program.id}>
                <div className="program-card">
                  <div className="program-icon">
                    <Icon size={32} />
                  </div>
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-description">{program.description}</p>
                </div>
              </ScrollAnimateWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;

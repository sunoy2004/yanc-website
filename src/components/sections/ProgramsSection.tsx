import { useState, useEffect } from 'react';
import { Rocket, Users, Lightbulb, Target } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import { useProgramsData } from "@/services/cms/useProgramsData";

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  users: Users,
  lightbulb: Lightbulb,
  target: Target,
};

const ProgramsSection = () => {
  const { programsData, loading, error } = useProgramsData();

  if (loading) {
    return (
      <section id="programs" className="section">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="section-title">Our Programs</h2>
          <p className="section-subtitle">
            Loading programs...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading programs:', error);
  }

  return (
    <section id="programs" className="section">
      <ScrollAnimateWrapper>
        <h2 className="section-title">Our Programs</h2>
        <p className="section-subtitle">
          Comprehensive learning experiences designed to empower young minds with essential life skills.
        </p>
      </ScrollAnimateWrapper>

      <div className="programs-grid">
        {programsData.map((program) => {
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
    </section>
  );
};

export default ProgramsSection;

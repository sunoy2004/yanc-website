import React, { useState, useEffect } from 'react';
import { Eye, Target } from "lucide-react";
import ScrollAnimateWrapper from "@/components/ScrollAnimateWrapper";
import { useAboutUsData } from "@/services/cms/useAboutUsData";

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  target: Target,
};

const AboutUsSection = () => {
  const { aboutUsData, loading, error, refreshData } = useAboutUsData();

  // Add keyboard shortcut for development
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+R to refresh CMS data
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        console.log('🔄 Manual CMS cache refresh triggered');
        refreshData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [refreshData]);

  if (loading) {
    return (
      <section id="about-us" className="section">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded w-1/3 mx-auto"></div>
            <div className="h-1 bg-primary rounded w-16 mx-auto"></div>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-4/6 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-48 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading about us content:', error);
  }

  // Show error message if there was an error loading data and no fallback content
  const showError = error && !aboutUsData;

  const { headline, description, vision, mission } = aboutUsData || {
    headline: "About Us",
    description: "Empowering Young Minds through Life Skills\n\nNetworking and life skills are crucial in today's fast-paced world.",
    vision: {
      title: "Vision",
      description: "Empowering young minds together.",
      icon: "eye"
    },
    mission: {
      title: "Mission",
      description: "Building better people for better Tomorrow.",
      icon: "target"
    }
  };

  return (
    <section id="about-us" className="section">
      <div className="container">
        {/* Development banner removed for production UI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - About Us Text */}
          <ScrollAnimateWrapper delay={0}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {headline}
              </h2>
              
              {/* Divider line */}
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              
              {/* Description paragraph */}
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {description.split(/(Empowering Young Minds through Life Skills)/g).map((part, index) => 
                    part === 'Empowering Young Minds through Life Skills' ? 
                      <strong key={index}>{part}</strong> : 
                      <span key={index}>{part}</span>
                  )}
                </p>
              </div>
            </div>
          </ScrollAnimateWrapper>

          {/* Right Column - Vision and Mission Cards */}
          <div className="space-y-4">
            {/* Vision Card */}
            <ScrollAnimateWrapper delay={150}>
              <div className="about-us-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="about-us-icon-container">
                    {(() => {
                      const IconComponent = iconMap[vision.icon] || Eye;
                      return <IconComponent size={24} />;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground capitalize">
                    {vision.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {vision.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>

            {/* Mission Card */}
            <ScrollAnimateWrapper delay={300}>
              <div className="about-us-card">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="about-us-icon-container">
                    {(() => {
                      const IconComponent = iconMap[mission.icon] || Target;
                      return <IconComponent size={24} />;
                    })()}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground capitalize">
                    {mission.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {mission.description}
                  </p>
                </div>
              </div>
            </ScrollAnimateWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
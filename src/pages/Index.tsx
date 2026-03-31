import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import EventsSection from "@/components/sections/EventsSection";
import HorizontalTeamSection from "@/components/sections/HorizontalTeamSection";
import HorizontalMentorTalksSection from "@/components/sections/HorizontalMentorTalksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection"; // Enabled 
import Preloader from "@/components/Preloader";
import Layout from "@/components/Layout";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isDarkMode = true; // Dark theme only
  const toggleTheme = () => {}; // No-op: light theme disabled

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const fromNavigation = sessionStorage.getItem('fromNavigation');
    if (fromNavigation === 'true') {
      setIsLoading(false);
      sessionStorage.removeItem('fromNavigation');
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      const fromNavigation = sessionStorage.getItem('fromNavigation');
      if (fromNavigation === 'true') {
        setIsLoading(false);
        sessionStorage.removeItem('fromNavigation');
      }
    }
  }, [location.pathname]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={`min-h-screen bg-background text-foreground ${
          isLoading ? "main-content-hidden" : "main-content-visible"
        }`}
      >
        <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
          <Hero />
          <HorizontalMentorTalksSection />
          <AboutUsSection />
          <CoreValuesSection />
          {/* <ProgramsSection /> */}
          <EventsSection />
          <HorizontalTeamSection />
          {/* <TestimonialsSection /> */} {/* Disabled per request */}
          
          {/* CTA Section */}
          <div className="section text-center pt-14">
            <div className="max-w-2xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to embark on your journey of growth and empowerment?
              </h2>
              <p className="text-muted-foreground mb-6">
                Contact us today!
              </p>
              <a 
                href="mailto:connect@yanc.in" 
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reach out to us at connect@yanc.in
              </a>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Index;
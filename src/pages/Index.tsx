import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
// import ProgramsSection from "@/components/sections/ProgramsSection";
import EventsSection from "@/components/sections/EventsSection";
import FoundersSection from "@/components/sections/FoundersSection";
import HorizontalTeamSection from "@/components/sections/HorizontalTeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Default to dark mode
    document.documentElement.classList.add("dark");
    
    // Check if we're navigating from another page (not a fresh load)
    const fromNavigation = sessionStorage.getItem('fromNavigation');
    if (fromNavigation === 'true') {
      // Skip preloader when coming from navigation
      setIsLoading(false);
      // Clear the flag
      sessionStorage.removeItem('fromNavigation');
    }
  }, []);

  // Handle navigation to home page - skip preloader when coming from other pages
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        className={`min-h-screen bg-background text-foreground ${
          isLoading ? "main-content-hidden" : "main-content-visible"
        }`}
      >
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <AboutUsSection />
          <CoreValuesSection />
          {/* <ProgramsSection /> */}
          <EventsSection />
          <FoundersSection />
          <HorizontalTeamSection />
          <TestimonialsSection />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default Index;
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import EventsSection from "@/components/sections/EventsSection";
import HorizontalTeamSection from "@/components/sections/HorizontalTeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection"; // Enabled 
import Preloader from "@/components/Preloader";
import Layout from "@/components/Layout";
import { cmsService } from "@/lib/cms/service";
import { getUpcomingEvents, getPastEvents, getEventGallery } from "@/services/cms/events-service";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference for initial state
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check for saved theme preference first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      // If no saved preference, use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    }
    
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
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem('theme', 'light');
    }
  };

  // After main content is ready, prefetch CMS-backed data for other pages in the background
  useEffect(() => {
    if (isLoading) return;

    const prefetch = async () => {
      try {
        console.log('🔄 Prefetching CMS data for secondary pages (events, team, mentor talks)...');
        // Fire-and-forget: warm up caches for other sections/pages
        const results = await Promise.allSettled([
          // Events
          getUpcomingEvents(),
          getPastEvents(),
          getEventGallery(),
          // Team (all + all 4 sections)
          cmsService.getTeamMembers(),
          cmsService.getTeamMembersBySection("cohort_founders"),
          cmsService.getTeamMembersBySection("executive_management"),
          cmsService.getTeamMembersBySection("advisory_board"),
          cmsService.getTeamMembersBySection("global_mentors"),
          // Mentor talks
          cmsService.getMentorTalks(),
        ]);
        console.log('✅ Prefetch completed for secondary pages:', results.map(r => r.status));
      } catch {
        // Swallow errors: prefetch should never break the main page
        console.warn('⚠️ Prefetch for secondary pages failed (non-blocking).');
      }
    };

    prefetch();
  }, [isLoading]);

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
          <AboutUsSection />
          <CoreValuesSection />
          {/* <ProgramsSection /> */}
          <EventsSection />
          <HorizontalTeamSection />
          {/* <TestimonialsSection /> */} {/* Disabled per request */}
          
          {/* CTA Section */}
          <div className="section text-center">
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
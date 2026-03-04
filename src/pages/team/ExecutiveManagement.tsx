import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import { useTeamData } from "@/services/cms/useTeamData";

const ExecutiveManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference for initial state
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { teamData, loading, error } = useTeamData(undefined, 'executive_management');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Executive Management</h1>
          <p className="text-muted-foreground">Loading team members...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Error loading executive management:', error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <TeamGrid 
          members={teamData}
          sectionTitle="Executive Management"
          sectionSubtitle="Leaders driving our mission and vision"
        />
      </main>

      <Footer />
    </div>
  );
};

export default ExecutiveManagement;
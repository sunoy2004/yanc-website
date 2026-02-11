import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import { useTeamData } from "@/services/cms/useTeamData";

const AdvisoryBoard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { teamData, loading, error } = useTeamData(undefined, 'advisory_board');

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advisory Board</h1>
          <p className="text-muted-foreground">Loading team members...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Error loading advisory board:', error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <TeamGrid 
          members={teamData}
          sectionTitle="Advisory Board"
          sectionSubtitle="Strategic minds guiding our path forward"
        />
      </main>

      <Footer />
    </div>
  );
};

export default AdvisoryBoard;
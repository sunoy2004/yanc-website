import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import { useTeamData } from "@/services/cms/useTeamData";

const CohortFounders = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  console.log('🚀 CohortFounders component mounting');
  const { teamData, loading, error } = useTeamData(undefined, 'cohort_founders');
  console.log('📋 CohortFounders received:', teamData.length, 'members');

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cohort Founders</h1>
          <p className="text-muted-foreground">Loading team members...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Error loading cohort founders:', error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <TeamGrid 
          members={teamData}
          sectionTitle="Cohort Founders"
          sectionSubtitle="Dynamic young leaders driving change"
        />
      </main>

      <Footer />
    </div>
  );
};

export default CohortFounders;
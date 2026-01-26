import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import { teamMembers } from "@/data/mockData";

const CohortFounders = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <TeamGrid 
          members={teamMembers}
          sectionTitle="Cohort Founders"
          sectionSubtitle="Dynamic young leaders driving change"
        />
      </main>

      <Footer />
    </div>
  );
};

export default CohortFounders;
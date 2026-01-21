import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";

const ValueProposition = () => {
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
    <PageTemplate 
      title="Value Proposition" 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
    />
  );
};

export default ValueProposition;
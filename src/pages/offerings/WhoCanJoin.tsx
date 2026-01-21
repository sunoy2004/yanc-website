import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";

const WhoCanJoin = () => {
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
      title="Who Can Join Us" 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
    />
  );
};

export default WhoCanJoin;
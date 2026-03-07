import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";

const Internships = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <PageTemplate 
      title="Internships" 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
    />
  );
};

export default Internships;
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate";

const Jobs = () => {
  const isDarkMode = true;
  const toggleTheme = () => {};
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  return (
    <PageTemplate 
      title="Job Openings" 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme} 
    />
  );
};

export default Jobs;
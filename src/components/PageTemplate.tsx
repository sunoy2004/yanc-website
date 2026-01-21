import React from "react";
import Layout from "@/components/Layout";

interface PageTemplateProps {
  title: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ 
  title, 
  isDarkMode, 
  toggleTheme 
}) => {
  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This page is a structural placeholder. Content will be added here in the future.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PageTemplate;
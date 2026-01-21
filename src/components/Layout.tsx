import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleTheme }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
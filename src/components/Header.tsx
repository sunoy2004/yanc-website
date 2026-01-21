import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/Dropdown";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isOfferingsDropdownOpen, setIsOfferingsDropdownOpen] = useState(false);
  const [isCareersDropdownOpen, setIsCareersDropdownOpen] = useState(false);
  const teamDropdownRef = useRef<HTMLDivElement>(null);
  const offeringsDropdownRef = useRef<HTMLDivElement>(null);
  const careersDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Home", href: "/" }, // Home link to landing page
    { label: "Events", href: "#events" },
    { label: "Our Offerings", href: "/offerings/value-proposition", hasDropdown: true }, // Mark Our Offerings item as having dropdown
    { label: "Team", href: "/team/executive-management", hasDropdown: true }, // Mark Team item as having dropdown
    { label: "Careers", href: "/careers/jobs", hasDropdown: true }, // Mark Careers item as having dropdown
    { label: "Contact", href: "#contact" },
  ];

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node)) {
        setIsTeamDropdownOpen(false);
      }
      if (offeringsDropdownRef.current && !offeringsDropdownRef.current.contains(event.target as Node)) {
        setIsOfferingsDropdownOpen(false);
      }
      if (careersDropdownRef.current && !careersDropdownRef.current.contains(event.target as Node)) {
        setIsCareersDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTeamDropdownOpen(false);
        setIsOfferingsDropdownOpen(false);
        setIsCareersDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Team dropdown items
  const teamDropdownItems = [
    { label: "Executive Management", href: "/team/executive-management" },
    { label: "Cohort Founders", href: "/team/cohort-founders" },
    { label: "Advisory Board", href: "/team/advisory-board" },
    { label: "Our Global Mentors", href: "/team/global-mentors" },
  ];

  // Our Offerings dropdown items
  const offeringsDropdownItems = [
    { label: "Value Proposition", href: "/offerings/value-proposition" },
    { label: "Who Can Join Us", href: "/offerings/who-can-join" },
    { label: "Young Minds Mashup", href: "/offerings/young-minds-mashup" },
    { label: "Mentor Talks", href: "/offerings/mentor-talks" },
    { label: "Why Us", href: "/offerings/why-us" },
  ];

  // Careers dropdown items
  const careersDropdownItems = [
    { label: "Job Openings", href: "/careers/jobs" },
    { label: "Internships", href: "/careers/internships" },
  ];

  // Handle mouse enter for dropdown
  const handleTeamDropdownMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    // Close other dropdowns and open this one
    setIsTeamDropdownOpen(true);
    setIsOfferingsDropdownOpen(false);
    setIsCareersDropdownOpen(false);
  };

  const handleOfferingsDropdownMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    // Close other dropdowns and open this one
    setIsOfferingsDropdownOpen(true);
    setIsTeamDropdownOpen(false);
    setIsCareersDropdownOpen(false);
  };

  const handleCareersDropdownMouseEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    // Close other dropdowns and open this one
    setIsCareersDropdownOpen(true);
    setIsTeamDropdownOpen(false);
    setIsOfferingsDropdownOpen(false);
  };

  // Handle mouse leave for dropdown with delay
  const handleTeamDropdownMouseLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    // Set timeout to close the dropdown
    dropdownTimeout.current = setTimeout(() => {
      setIsTeamDropdownOpen(false);
    }, 200);
  };

  const handleOfferingsDropdownMouseLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    // Set timeout to close the dropdown
    dropdownTimeout.current = setTimeout(() => {
      setIsOfferingsDropdownOpen(false);
    }, 200);
  };

  const handleCareersDropdownMouseLeave = () => {
    // Clear any existing timeout
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    // Set timeout to close the dropdown
    dropdownTimeout.current = setTimeout(() => {
      setIsCareersDropdownOpen(false);
    }, 200);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a 
          href="/" 
          className={`header-logo ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          YANC
        </a>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navItems.map((item) => {
            if (item.label === "Our Offerings" && item.hasDropdown) {
              return (
                <div 
                  key={item.label}
                  className="relative"
                  ref={offeringsDropdownRef}
                  onMouseEnter={handleOfferingsDropdownMouseEnter}
                  onMouseLeave={handleOfferingsDropdownMouseLeave}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsOfferingsDropdownOpen(!isOfferingsDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOfferingsDropdownOpen}
                    aria-label="Our Offerings menu"
                  >
                    {item.label}
                  </button>
                  
                  {isOfferingsDropdownOpen && (
                    <div 
                      className={`dropdown-menu ${!isOfferingsDropdownOpen ? 'collapsed' : ''}`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="our-offerings-menu-button"
                      onMouseEnter={handleOfferingsDropdownMouseEnter}
                      onMouseLeave={handleOfferingsDropdownMouseLeave}
                    >
                      {offeringsDropdownItems.map((dropdownItem, index) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="dropdown-item"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = dropdownItem.href;
                            }
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Team" && item.hasDropdown) {
              return (
                <div 
                  key={item.label}
                  className="relative"
                  ref={teamDropdownRef}
                  onMouseEnter={handleTeamDropdownMouseEnter}
                  onMouseLeave={handleTeamDropdownMouseLeave}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isTeamDropdownOpen}
                    aria-label="Team menu"
                  >
                    {item.label}
                  </button>
                  
                  {isTeamDropdownOpen && (
                    <div 
                      className={`team-dropdown ${!isTeamDropdownOpen ? 'collapsed' : ''}`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="team-menu-button"
                      onMouseEnter={handleTeamDropdownMouseEnter}
                      onMouseLeave={handleTeamDropdownMouseLeave}
                    >
                      {teamDropdownItems.map((dropdownItem, index) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="team-dropdown-item"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = dropdownItem.href;
                            }
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Careers" && item.hasDropdown) {
              return (
                <div 
                  key={item.label}
                  className="relative"
                  ref={careersDropdownRef}
                  onMouseEnter={handleCareersDropdownMouseEnter}
                  onMouseLeave={handleCareersDropdownMouseLeave}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsCareersDropdownOpen(!isCareersDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isCareersDropdownOpen}
                    aria-label="Careers menu"
                  >
                    {item.label}
                  </button>
                  
                  {isCareersDropdownOpen && (
                    <div 
                      className={`dropdown-menu ${!isCareersDropdownOpen ? 'collapsed' : ''}`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="careers-menu-button"
                      onMouseEnter={handleCareersDropdownMouseEnter}
                      onMouseLeave={handleCareersDropdownMouseLeave}
                    >
                      {careersDropdownItems.map((dropdownItem, index) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="dropdown-item"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              window.location.href = dropdownItem.href;
                            }
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              // Special handling for Home link to skip preloader
              if (item.label === "Home") {
                return (
                  <a 
                    key={item.label} 
                    href={item.href} 
                    className="header-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem('fromNavigation', 'true');
                      window.location.href = item.href;
                    }}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <a key={item.label} href={item.href} className="header-nav-link">
                    {item.label}
                  </a>
                );
              }
            }
          })}
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="/signup" className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors">
            Join
          </a>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => {
            if (item.label === "Our Offerings" && item.hasDropdown) {
              return (
                <div key={item.label}>
                  <button
                    className="mobile-nav-link flex justify-between items-center w-full"
                    onClick={() => setIsOfferingsDropdownOpen(!isOfferingsDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOfferingsDropdownOpen}
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOfferingsDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOfferingsDropdownOpen && (
                    <div className="pl-4 py-2">
                      {offeringsDropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Team" && item.hasDropdown) {
              return (
                <div key={item.label}>
                  <button
                    className="mobile-nav-link flex justify-between items-center w-full"
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isTeamDropdownOpen}
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isTeamDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTeamDropdownOpen && (
                    <div className="pl-4 py-2">
                      {teamDropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Careers" && item.hasDropdown) {
              return (
                <div key={item.label}>
                  <button
                    className="mobile-nav-link flex justify-between items-center w-full"
                    onClick={() => setIsCareersDropdownOpen(!isCareersDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isCareersDropdownOpen}
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCareersDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCareersDropdownOpen && (
                    <div className="pl-4 py-2">
                      {careersDropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              // Special handling for Home link to skip preloader on mobile
              if (item.label === "Home") {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem('fromNavigation', 'true');
                      setIsMenuOpen(false);
                      window.location.href = item.href;
                    }}
                  >
                    {item.label}
                  </a>
                );
              } else {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }
            }
          })}
          <a href="/signup" className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-center text-sm font-medium hover:bg-primary/90 transition-colors">
            Join
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
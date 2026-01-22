import { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  
  // Timeout refs for dropdown delays
  const dropdownTimeoutRefs = useRef<{
    team: NodeJS.Timeout | null;
    offerings: NodeJS.Timeout | null;
    careers: NodeJS.Timeout | null;
  }>({
    team: null,
    offerings: null,
    careers: null
  });

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "#events" },
    { label: "Our Offerings", href: "/offerings/value-proposition", hasDropdown: true },
    { label: "Team", href: "/team/executive-management", hasDropdown: true },
    { label: "Careers", href: "/careers/jobs", hasDropdown: true },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "/faq" },
  ];

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

  // Clear all timeouts
  const clearAllTimeouts = () => {
    Object.values(dropdownTimeoutRefs.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
  };

  // Handle dropdown open with delay
  const handleDropdownOpen = (dropdownType: 'team' | 'offerings' | 'careers') => {
    clearAllTimeouts();
    
    // Clear the timeout for this specific dropdown
    if (dropdownTimeoutRefs.current[dropdownType]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownType]!);
      dropdownTimeoutRefs.current[dropdownType] = null;
    }
    
    // Close other dropdowns immediately
    if (dropdownType !== 'team') setIsTeamDropdownOpen(false);
    if (dropdownType !== 'offerings') setIsOfferingsDropdownOpen(false);
    if (dropdownType !== 'careers') setIsCareersDropdownOpen(false);
    
    // Open this dropdown
    switch (dropdownType) {
      case 'team':
        setIsTeamDropdownOpen(true);
        break;
      case 'offerings':
        setIsOfferingsDropdownOpen(true);
        break;
      case 'careers':
        setIsCareersDropdownOpen(true);
        break;
    }
  };

  // Handle dropdown close with delay
  const handleDropdownClose = (dropdownType: 'team' | 'offerings' | 'careers') => {
    // Clear any existing timeout for this dropdown
    if (dropdownTimeoutRefs.current[dropdownType]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownType]!);
    }
    
    // Set timeout to close dropdown after 300ms
    dropdownTimeoutRefs.current[dropdownType] = setTimeout(() => {
      switch (dropdownType) {
        case 'team':
          setIsTeamDropdownOpen(false);
          break;
        case 'offerings':
          setIsOfferingsDropdownOpen(false);
          break;
        case 'careers':
          setIsCareersDropdownOpen(false);
          break;
      }
      dropdownTimeoutRefs.current[dropdownType] = null;
    }, 300);
  };

  // Close all dropdowns when location changes
  useEffect(() => {
    setIsTeamDropdownOpen(false);
    setIsOfferingsDropdownOpen(false);
    setIsCareersDropdownOpen(false);
    setIsMenuOpen(false);
    clearAllTimeouts();
  }, [location]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link 
          to="/" 
          className={`header-logo ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          YANC
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navItems.map((item) => {
            if (item.label === "Our Offerings" && item.hasDropdown) {
              return (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownOpen('offerings')}
                  onMouseLeave={() => handleDropdownClose('offerings')}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsOfferingsDropdownOpen(!isOfferingsDropdownOpen)}
                  >
                    {item.label}
                  </button>
                  
                  {isOfferingsDropdownOpen && (
                    <div 
                      className="dropdown-menu"
                      onMouseEnter={() => handleDropdownOpen('offerings')}
                      onMouseLeave={() => handleDropdownClose('offerings')}
                    >
                      {offeringsDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="dropdown-item"
                        >
                          {dropdownItem.label}
                        </Link>
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
                  onMouseEnter={() => handleDropdownOpen('team')}
                  onMouseLeave={() => handleDropdownClose('team')}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  >
                    {item.label}
                  </button>
                  
                  {isTeamDropdownOpen && (
                    <div 
                      className="team-dropdown"
                      onMouseEnter={() => handleDropdownOpen('team')}
                      onMouseLeave={() => handleDropdownClose('team')}
                    >
                      {teamDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="team-dropdown-item"
                        >
                          {dropdownItem.label}
                        </Link>
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
                  onMouseEnter={() => handleDropdownOpen('careers')}
                  onMouseLeave={() => handleDropdownClose('careers')}
                >
                  <button
                    className="header-nav-link flex items-center"
                    onClick={() => setIsCareersDropdownOpen(!isCareersDropdownOpen)}
                  >
                    {item.label}
                  </button>
                  
                  {isCareersDropdownOpen && (
                    <div 
                      className="dropdown-menu"
                      onMouseEnter={() => handleDropdownOpen('careers')}
                      onMouseLeave={() => handleDropdownClose('careers')}
                    >
                      {careersDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="dropdown-item"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Home") {
              return (
                <button 
                  key={item.label}
                  className="header-nav-link"
                  onClick={() => {
                    sessionStorage.setItem('fromNavigation', 'true');
                    navigate('/');
                  }}
                >
                  {item.label}
                </button>
              );
            } else {
              return (
                <Link key={item.label} to={item.href} className="header-nav-link">
                  {item.label}
                </Link>
              );
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
          <Link to="/signup" className="hidden md:flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-accent transition-colors">
            Join
          </Link>
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
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOfferingsDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOfferingsDropdownOpen && (
                    <div className="pl-4 py-2">
                      {offeringsDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
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
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isTeamDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTeamDropdownOpen && (
                    <div className="pl-4 py-2">
                      {teamDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
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
                  >
                    {item.label}
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-200 ${isCareersDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCareersDropdownOpen && (
                    <div className="pl-4 py-2">
                      {careersDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block py-2 text-sm text-foreground hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else if (item.label === "Home") {
              return (
                <button
                  key={item.label}
                  className="mobile-nav-link w-full text-left"
                  onClick={() => {
                    sessionStorage.setItem('fromNavigation', 'true');
                    setIsMenuOpen(false);
                    navigate('/');
                  }}
                >
                  {item.label}
                </button>
              );
            } else {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }
          })}
          <Link to="/signup" className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-center text-sm font-medium hover:bg-primary/90 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Join
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
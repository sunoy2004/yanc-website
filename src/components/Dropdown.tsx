import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownProps {
  triggerLabel: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  dropdownRef?: React.RefObject<HTMLDivElement>;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ triggerLabel, items, isOpen, onToggle, isMobile = false, dropdownRef }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle keyboard events for accessibility
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onToggle();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [onToggle]);

    return (
      <div 
        className="relative" 
        ref={dropdownRef}
      >
        <button
          ref={buttonRef}
          className="header-nav-link flex items-center"
          onClick={onToggle}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label={`${triggerLabel} menu`}
        >
          {triggerLabel}
        </button>
        
        {isOpen && (
          <div 
            className={`dropdown-menu ${!isOpen ? 'collapsed' : ''}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby={`${triggerLabel.toLowerCase()}-menu-button`}
          >
            {items.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="dropdown-item"
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = item.href;
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
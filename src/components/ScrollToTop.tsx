import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, try to scroll the target element into view.
    if (typeof window === 'undefined') return null;

    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Use smooth scrolling where available
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        } catch {
          el.scrollIntoView();
          return;
        }
      }
    }

    // Default: scroll to top on navigation
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}


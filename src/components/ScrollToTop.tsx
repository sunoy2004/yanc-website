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
        // Scroll instantly to the target element (no smooth animation)
        try {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        } catch {
          el.scrollIntoView();
          return;
        }
      }
    }

    // Default: scroll to top on navigation
    try {
      // Use instant scroll (no smooth animation)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}


import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { aboutUsContent as mockAboutUs } from '../../data/mockData';

export const useAboutUsData = (options?: { skipCache?: boolean; refreshInterval?: number }) => {
  const { skipCache = false, refreshInterval } = options || {};
  const [aboutUsData, setAboutUsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Clear in-memory cache if requested (still reads from static content.json)
      if (skipCache) {
        if (import.meta.env.DEV) {
          console.log('[content.json] Clearing in-memory cache and reloading about-us data...');
        }
        cmsService.clearCache();
      }
      
      // Fetch About Us via cmsService (which reads from static content.json)
      const cmsAboutUs = await cmsService.getAboutUs();
      
      if (cmsAboutUs) {
        if (import.meta.env.DEV) {
          console.log('[content.json] About-us data loaded from static content.json:', cmsAboutUs);
        }
        setAboutUsData(cmsAboutUs);
      } else {
        if (import.meta.env.DEV) {
          console.log('[content.json] No about-us content in static content.json, falling back to mock data');
        }
        setAboutUsData(mockAboutUs);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('[content.json] Error loading about-us content, using mock data:', err);
      }
      setAboutUsData(mockAboutUs);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Optional periodic refresh if interval is specified (still from static content.json)
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const intervalId = setInterval(() => {
        if (import.meta.env.DEV) {
          console.log(`[content.json] Auto-refreshing about-us data every ${refreshInterval}ms`);
        }
        fetchData();
      }, refreshInterval);

      return () => clearInterval(intervalId);
    }
  }, [refreshInterval]);

  // Expose a manual refresh helper
  const refreshData = () => {
    fetchData();
  };

  return { aboutUsData, loading, error, refreshData };
};
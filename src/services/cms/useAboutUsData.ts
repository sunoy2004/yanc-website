import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { aboutUsContent as mockAboutUs } from '../../data/mockData';

export const useAboutUsData = () => {
  const [aboutUsData, setAboutUsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS
        const cmsAboutUs = await cmsService.getAboutUs();
        
        if (cmsAboutUs) {
          // CMS has published content, use it
          console.log('ℹ️ Using CMS about us data');
          setAboutUsData(cmsAboutUs);
        } else {
          // CMS has no published content, fall back to mock data
          console.log('ℹ️ No published CMS about us found, falling back to mock data');
          setAboutUsData(mockAboutUs);
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching about us from CMS, using mock data:', err);
        setAboutUsData(mockAboutUs);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  return { aboutUsData, loading, error };
};
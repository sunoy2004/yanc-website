import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { programs as mockPrograms } from '../../data/mockData';

// Define the interface for program data
export interface ProgramData {
  id: string;
  title: string;
  description: string;
  icon: string;
  mediaItems?: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    alt: string;
  }>;
}

export const useProgramsData = () => {
  const [programsData, setProgramsData] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS
        const cmsPrograms = await cmsService.getPrograms();
        
        if (cmsPrograms && cmsPrograms.length > 0) {
          // CMS has published content, use it
          console.log('ℹ️ Using CMS programs data');
          setProgramsData(cmsPrograms);
        } else {
          // CMS has no published content, fall back to mock data
          console.log('ℹ️ No published CMS programs found, falling back to mock data');
          setProgramsData(mockPrograms);
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching programs from CMS, using mock data:', err);
        setProgramsData(mockPrograms);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProgramsData();
  }, []);

  return { programsData, loading, error };
};
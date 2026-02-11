import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { founders as mockFounders } from '../../data/mockData';
import { TeamMemberUI } from '../../lib/cms/types';

export const useFoundersData = () => {
  const [foundersData, setFoundersData] = useState<TeamMemberUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoundersData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS
        const cmsFounders = await cmsService.getFounders();
        
        if (cmsFounders && cmsFounders.length > 0) {
          // CMS has published content, use it
          console.log('ℹ️ Using CMS founders data');
          setFoundersData(cmsFounders);
        } else {
          // CMS has no published content, fall back to mock data
          console.log('ℹ️ No published CMS founders found, falling back to mock data');
          // Convert mockFounders to TeamMemberUI format
          const mockFoundersAsTeamMembers: TeamMemberUI[] = mockFounders.map(f => ({
            id: f.id,
            name: f.name,
            role: f.title,
            title: f.title,
            bio: f.bio,
            image: f.image,
            socialLinks: f.socialLinks
          }));
          setFoundersData(mockFoundersAsTeamMembers);
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching founders from CMS, using mock data:', err);
        // Convert mockFounders to TeamMemberUI format
        const mockFoundersAsTeamMembers: TeamMemberUI[] = mockFounders.map(f => ({
          id: f.id,
          name: f.name,
          role: f.title,
          title: f.title,
          bio: f.bio,
          image: f.image,
          socialLinks: f.socialLinks
        }));
        setFoundersData(mockFoundersAsTeamMembers);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchFoundersData();
  }, []);

  return { foundersData, loading, error };
};
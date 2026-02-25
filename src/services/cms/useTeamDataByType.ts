import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { teamMembers as mockTeamMembers } from '../../data/mockData';
import { TeamMemberUI } from '../../lib/cms/types';

export const useTeamDataByType = (type: string) => {
  const [teamData, setTeamData] = useState<TeamMemberUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        
        // Attempt to fetch from CMS by type
        const cmsTeam = await cmsService.getTeamMembersByType(type);
        
        if (cmsTeam && cmsTeam.length > 0) {
          // CMS has published content for this type, use it
          console.log(`ℹ️ Using CMS ${type} team data`);
          setTeamData(cmsTeam);
        } else {
          // CMS has no published content for this type, fall back to mock data
          console.log(`ℹ️ No published CMS ${type} team found, falling back to mock data`);
          setTeamData(mockTeamMembers);
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error(`⚠️ Error fetching ${type} team from CMS, using mock data:`, err);
        setTeamData(mockTeamMembers);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [type]);

  return { teamData, loading, error };
};
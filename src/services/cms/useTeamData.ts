import { useState, useEffect } from 'react';
import { cmsService } from '../../lib/cms/service';
import { teamMembers as mockTeamMembers, founders as mockFounders, mentors as mockMentors, advisors as mockAdvisors } from '../../data/mockData';
import { TeamMemberUI } from '../../lib/cms/types';
import { serializeMockTeamMembers, serializeMockFounders } from '../../lib/cms/serializers';

export const useTeamData = (type?: string, section?: string) => {
  const [teamData, setTeamData] = useState<TeamMemberUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 useTeamData called with type:', type, 'section:', section);
    
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        
        if (section) {
          // Fetch team members by section if specified (new approach)
          const cmsTeam = await cmsService.getTeamMembersBySection(section);
          
          if (cmsTeam && cmsTeam.length > 0) {
            // CMS has published content for this section, use it
            console.log(`ℹ️ Using CMS ${section} team data`);
            setTeamData(cmsTeam);
          } else {
            // CMS has no published content for this section, fall back to mock data
            console.log(`ℹ️ No published CMS ${section} team found, falling back to mock data`);
            
            // Use appropriate mock data array based on section
            let filteredMockData: TeamMemberUI[] = [];
            switch (section) {
              case 'executive_management':
                filteredMockData = serializeMockFounders(mockFounders); // Executive Management
                console.log('📊 Setting executive management data:', filteredMockData.length, 'members');
                break;
              case 'cohort_founders':
                filteredMockData = serializeMockTeamMembers(mockTeamMembers); // Cohort Founders
                console.log('📊 Setting cohort founders data:', filteredMockData.length, 'members');
                break;
              case 'advisory_board':
                filteredMockData = serializeMockFounders(mockAdvisors); // Advisory Board
                console.log('📊 Setting advisory board data:', filteredMockData.length, 'members');
                break;
              case 'global_mentors':
                filteredMockData = serializeMockFounders(mockMentors); // Global Mentors
                console.log('📊 Setting global mentors data:', filteredMockData.length, 'members');
                break;
              default:
                filteredMockData = serializeMockTeamMembers(mockTeamMembers);
                console.log('📊 Setting default data:', filteredMockData.length, 'members');
            }
            setTeamData(filteredMockData);
          }
        } else if (type) {
          // Fetch team members by type if specified (legacy approach)
          const cmsTeam = await cmsService.getTeamMembersByType(type);
          
          if (cmsTeam && cmsTeam.length > 0) {
            // CMS has published content for this type, use it
            console.log(`ℹ️ Using CMS ${type} team data`);
            setTeamData(cmsTeam);
          } else {
            // CMS has no published content for this type, fall back to mock data
            console.log(`ℹ️ No published CMS ${type} team found, falling back to mock data`);
            
            // Use appropriate mock data array based on type and serialize it properly
            let filteredMockData: TeamMemberUI[] = [];
            switch (type) {
              case 'executive':
                filteredMockData = serializeMockFounders(mockFounders); // Executive Management
                console.log('📊 Setting executive data:', filteredMockData.length, 'members');
                break;
              case 'cohort_founder':
                filteredMockData = serializeMockTeamMembers(mockTeamMembers); // Cohort Founders
                console.log('📊 Setting cohort founder data:', filteredMockData.length, 'members');
                break;
              case 'global_mentor':
                filteredMockData = serializeMockFounders(mockMentors); // Global Mentors
                console.log('📊 Setting global mentor data:', filteredMockData.length, 'members');
                break;
              case 'advisory':
                filteredMockData = serializeMockFounders(mockAdvisors); // Advisory Board
                console.log('📊 Setting advisory data:', filteredMockData.length, 'members');
                break;
              default:
                filteredMockData = serializeMockTeamMembers(mockTeamMembers);
                console.log('📊 Setting default data:', filteredMockData.length, 'members');
            }
            setTeamData(filteredMockData);
          }
        } else {
          // Fetch all team members
          const cmsTeam = await cmsService.getTeamMembers();
          
          if (cmsTeam && cmsTeam.length > 0) {
            // CMS has published content, use it
            console.log('ℹ️ Using CMS team data');
            setTeamData(cmsTeam);
          } else {
            // CMS has no published content, fall back to mock data
            console.log('ℹ️ No published CMS team found, falling back to mock data');
            const allMockData = [
              ...serializeMockFounders(mockFounders),
              ...serializeMockTeamMembers(mockTeamMembers),
              ...serializeMockFounders(mockMentors),
              ...serializeMockFounders(mockAdvisors)
            ];
            console.log('📊 Setting all team data:', allMockData.length, 'members total');
            setTeamData(allMockData);
          }
        }
      } catch (err) {
        // CMS is down or had an error, fall back to mock data
        console.error('⚠️ Error fetching team from CMS, using mock data:', err);
        
        // Use appropriate mock data based on section or type
        let fallbackData: TeamMemberUI[] = [];
        if (section) {
          switch (section) {
            case 'executive_management':
              fallbackData = serializeMockFounders(mockFounders);
              console.log('❌ Fallback - executive management data:', fallbackData.length, 'members');
              break;
            case 'cohort_founders':
              fallbackData = serializeMockTeamMembers(mockTeamMembers);
              console.log('❌ Fallback - cohort founders data:', fallbackData.length, 'members');
              break;
            case 'advisory_board':
              fallbackData = serializeMockFounders(mockAdvisors);
              console.log('❌ Fallback - advisory board data:', fallbackData.length, 'members');
              break;
            case 'global_mentors':
              fallbackData = serializeMockFounders(mockMentors);
              console.log('❌ Fallback - global mentors data:', fallbackData.length, 'members');
              break;
            default:
              fallbackData = serializeMockTeamMembers(mockTeamMembers);
              console.log('❌ Fallback - default data:', fallbackData.length, 'members');
          }
        } else if (type) {
          switch (type) {
            case 'executive':
              fallbackData = serializeMockFounders(mockFounders);
              console.log('❌ Fallback - executive data:', fallbackData.length, 'members');
              break;
            case 'cohort_founder':
              fallbackData = serializeMockTeamMembers(mockTeamMembers);
              console.log('❌ Fallback - cohort founder data:', fallbackData.length, 'members');
              break;
            case 'global_mentor':
              fallbackData = serializeMockFounders(mockMentors);
              console.log('❌ Fallback - global mentor data:', fallbackData.length, 'members');
              break;
            case 'advisory':
              fallbackData = serializeMockFounders(mockAdvisors);
              console.log('❌ Fallback - advisory data:', fallbackData.length, 'members');
              break;
            default:
              fallbackData = serializeMockTeamMembers(mockTeamMembers);
              console.log('❌ Fallback - default data:', fallbackData.length, 'members');
          }
        } else {
          fallbackData = [
            ...serializeMockFounders(mockFounders),
            ...serializeMockTeamMembers(mockTeamMembers),
            ...serializeMockFounders(mockMentors),
            ...serializeMockFounders(mockAdvisors)
          ];
          console.log('❌ Fallback - all data:', fallbackData.length, 'members total');
        }
        
        setTeamData(fallbackData);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [type, section]);

  console.log('📤 Returning teamData:', teamData.length, 'members for type:', type);
  return { teamData, loading, error };
};
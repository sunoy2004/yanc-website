import { useMemo } from 'react';
import { useContent } from '@/hooks/useContent';
import { serializeTeamMembers, serializeMockTeamMembers, serializeMockFounders } from '../../lib/cms/serializers';
import { teamMembers as mockTeamMembers, founders as mockFounders, mentors as mockMentors, advisors as mockAdvisors } from '../../data/mockData';
import type { TeamMemberUI } from '../../lib/cms/types';

function filterBySection(members: Record<string, unknown>[], section: string): Record<string, unknown>[] {
  return members.filter((m) => {
    if (m.section === section || m.team_section === section) return true;
    const t = (m.type as string)?.toUpperCase();
    switch (section) {
      case 'cohort_founders': return t === 'FOUNDER';
      case 'executive_management': return t === 'REGULAR';
      case 'advisory_board': return t === 'ADVISOR';
      case 'global_mentors': return t === 'MENTOR';
      default: return false;
    }
  });
}

function filterByType(members: Record<string, unknown>[], type: string): Record<string, unknown>[] {
  return members.filter((m) => {
    const t = (m.type as string)?.toLowerCase();
    const mt = (m.member_type as string)?.toLowerCase();
    return t === type || mt === type;
  });
}

export const useTeamData = (type?: string, section?: string) => {
  const content = useContent();
  const rawMembers = (content.teamMembers ?? []) as Record<string, unknown>[];

  const { teamData, loading, error } = useMemo(() => {
    let filtered: Record<string, unknown>[] = rawMembers;
    if (section) {
      filtered = filterBySection(rawMembers, section);
    } else if (type) {
      filtered = filterByType(rawMembers, type);
    }

    const serialized = serializeTeamMembers(filtered as any);
    if (serialized.length > 0) {
      return { teamData: serialized, loading: false, error: null };
    }

    // Fallback to mock when content has no members for this section/type
    let mockData: TeamMemberUI[] = [];
    if (section) {
      switch (section) {
        case 'executive_management': mockData = serializeMockFounders(mockFounders); break;
        case 'cohort_founders': mockData = serializeMockTeamMembers(mockTeamMembers); break;
        case 'advisory_board': mockData = serializeMockFounders(mockAdvisors); break;
        case 'global_mentors': mockData = serializeMockFounders(mockMentors); break;
        default: mockData = serializeMockTeamMembers(mockTeamMembers);
      }
    } else if (type) {
      switch (type) {
        case 'executive': mockData = serializeMockFounders(mockFounders); break;
        case 'cohort_founder': mockData = serializeMockTeamMembers(mockTeamMembers); break;
        case 'global_mentor': mockData = serializeMockFounders(mockMentors); break;
        case 'advisory': mockData = serializeMockFounders(mockAdvisors); break;
        default: mockData = serializeMockTeamMembers(mockTeamMembers);
      }
    } else {
      mockData = [
        ...serializeMockFounders(mockFounders),
        ...serializeMockTeamMembers(mockTeamMembers),
        ...serializeMockFounders(mockMentors),
        ...serializeMockFounders(mockAdvisors),
      ];
    }
    return { teamData: mockData, loading: false, error: null };
  }, [rawMembers, section, type]);

  return { teamData, loading, error };
};

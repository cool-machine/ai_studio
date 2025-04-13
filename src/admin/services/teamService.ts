import { TeamMember } from '../../types';
import { teamMembers as initialTeamMembers } from '../../data/team';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for team members
let teamMembers = [...initialTeamMembers];

// Get all team members
export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
};

// Get team member by ID
export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

// Create new team member
export const createTeamMember = (memberData: Omit<TeamMember, 'id'>): TeamMember => {
  const newMember: TeamMember = {
    id: uuidv4(),
    ...memberData
  };
  
  teamMembers = [...teamMembers, newMember];
  return newMember;
};

// Update team member
export const updateTeamMember = (id: string, memberData: Partial<TeamMember>): TeamMember | undefined => {
  const memberIndex = teamMembers.findIndex(member => member.id === id);
  
  if (memberIndex === -1) {
    return undefined;
  }
  
  const updatedMember = {
    ...teamMembers[memberIndex],
    ...memberData
  };
  
  teamMembers = [
    ...teamMembers.slice(0, memberIndex),
    updatedMember,
    ...teamMembers.slice(memberIndex + 1)
  ];
  
  return updatedMember;
};

// Delete team member
export const deleteTeamMember = (id: string): boolean => {
  const memberIndex = teamMembers.findIndex(member => member.id === id);
  
  if (memberIndex === -1) {
    return false;
  }
  
  teamMembers = [
    ...teamMembers.slice(0, memberIndex),
    ...teamMembers.slice(memberIndex + 1)
  ];
  
  return true;
};

// Search team members
export const searchTeamMembers = (query: string): TeamMember[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return teamMembers.filter(member => 
    member.name.toLowerCase().includes(lowercaseQuery) ||
    member.role.toLowerCase().includes(lowercaseQuery) ||
    member.bio.toLowerCase().includes(lowercaseQuery)
  );
};
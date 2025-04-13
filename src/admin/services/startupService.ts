import { Startup } from '../../types';
import { startups as initialStartups } from '../../data/startups';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for startups
let startups = [...initialStartups];

// Get all startups
export const getAllStartups = (): Startup[] => {
  return startups;
};

// Get startup by ID
export const getStartupById = (id: string): Startup | undefined => {
  return startups.find(startup => startup.id === id);
};

// Create new startup
export const createStartup = (startupData: Omit<Startup, 'id'>): Startup => {
  const newStartup: Startup = {
    id: uuidv4(),
    ...startupData
  };
  
  startups = [...startups, newStartup];
  return newStartup;
};

// Update startup
export const updateStartup = (id: string, startupData: Partial<Startup>): Startup | undefined => {
  const startupIndex = startups.findIndex(startup => startup.id === id);
  
  if (startupIndex === -1) {
    return undefined;
  }
  
  const updatedStartup = {
    ...startups[startupIndex],
    ...startupData
  };
  
  startups = [
    ...startups.slice(0, startupIndex),
    updatedStartup,
    ...startups.slice(startupIndex + 1)
  ];
  
  return updatedStartup;
};

// Delete startup
export const deleteStartup = (id: string): boolean => {
  const startupIndex = startups.findIndex(startup => startup.id === id);
  
  if (startupIndex === -1) {
    return false;
  }
  
  startups = [
    ...startups.slice(0, startupIndex),
    ...startups.slice(startupIndex + 1)
  ];
  
  return true;
};

// Search startups
export const searchStartups = (query: string): Startup[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return startups.filter(startup => 
    startup.name.toLowerCase().includes(lowercaseQuery) ||
    startup.description.toLowerCase().includes(lowercaseQuery)
  );
};
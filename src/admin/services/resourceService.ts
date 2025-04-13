import { Resource } from '../../types';
import { resources as initialResources } from '../../data/resources';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for resources
let resources = [...initialResources];

// Get all resources
export const getAllResources = (): Resource[] => {
  return resources;
};

// Get resource by ID
export const getResourceById = (id: string): Resource | undefined => {
  return resources.find(resource => resource.id === id);
};

// Create new resource
export const createResource = (resourceData: Omit<Resource, 'id'>): Resource => {
  const newResource: Resource = {
    id: uuidv4(),
    ...resourceData
  };
  
  resources = [...resources, newResource];
  return newResource;
};

// Update resource
export const updateResource = (id: string, resourceData: Partial<Resource>): Resource | undefined => {
  const resourceIndex = resources.findIndex(resource => resource.id === id);
  
  if (resourceIndex === -1) {
    return undefined;
  }
  
  const updatedResource = {
    ...resources[resourceIndex],
    ...resourceData
  };
  
  resources = [
    ...resources.slice(0, resourceIndex),
    updatedResource,
    ...resources.slice(resourceIndex + 1)
  ];
  
  return updatedResource;
};

// Delete resource
export const deleteResource = (id: string): boolean => {
  const resourceIndex = resources.findIndex(resource => resource.id === id);
  
  if (resourceIndex === -1) {
    return false;
  }
  
  resources = [
    ...resources.slice(0, resourceIndex),
    ...resources.slice(resourceIndex + 1)
  ];
  
  return true;
};

// Search resources
export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return resources.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery)
  );
};
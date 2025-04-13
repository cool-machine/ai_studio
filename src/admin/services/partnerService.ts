import { Partner } from '../../types';
import { partners as initialPartners } from '../../data/partners';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for partners
let partners = [...initialPartners];

// Get all partners
export const getAllPartners = (): Partner[] => {
  return partners;
};

// Get partner by ID
export const getPartnerById = (id: string): Partner | undefined => {
  return partners.find(partner => partner.id === id);
};

// Create new partner
export const createPartner = (partnerData: Omit<Partner, 'id'>): Partner => {
  const newPartner: Partner = {
    id: uuidv4(),
    ...partnerData
  };
  
  partners = [...partners, newPartner];
  return newPartner;
};

// Update partner
export const updatePartner = (id: string, partnerData: Partial<Partner>): Partner | undefined => {
  const partnerIndex = partners.findIndex(partner => partner.id === id);
  
  if (partnerIndex === -1) {
    return undefined;
  }
  
  const updatedPartner = {
    ...partners[partnerIndex],
    ...partnerData
  };
  
  partners = [
    ...partners.slice(0, partnerIndex),
    updatedPartner,
    ...partners.slice(partnerIndex + 1)
  ];
  
  return updatedPartner;
};

// Delete partner
export const deletePartner = (id: string): boolean => {
  const partnerIndex = partners.findIndex(partner => partner.id === id);
  
  if (partnerIndex === -1) {
    return false;
  }
  
  partners = [
    ...partners.slice(0, partnerIndex),
    ...partners.slice(partnerIndex + 1)
  ];
  
  return true;
};

// Search partners
export const searchPartners = (query: string): Partner[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return partners.filter(partner => 
    partner.name.toLowerCase().includes(lowercaseQuery)
  );
};
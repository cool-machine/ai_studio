import { SiteSettings } from '../../types';

// Default settings
const defaultSettings: SiteSettings = {
  siteName: 'Wharton Alumni AI Studio',
  tagline: 'Connecting Wharton alumni to foster innovation, knowledge sharing, and collaboration in the AI space.',
  logoUrl: '/wharton.png',
  contactEmail: 'info@whartonaistudio.org',
  contactPhone: '(215) 555-1234',
  address: '3730 Walnut Street, Philadelphia, PA 19104',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
  },
  heroBackgroundUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
};

// Mock storage for settings
let settings: SiteSettings = { ...defaultSettings };

// Get settings
export const getSettings = (): SiteSettings => {
  return settings;
};

// Update settings
export const updateSettings = (newSettings: Partial<SiteSettings>): SiteSettings => {
  settings = {
    ...settings,
    ...newSettings,
  };
  
  return settings;
};

// Reset settings to default
export const resetSettings = (): SiteSettings => {
  settings = { ...defaultSettings };
  return settings;
};
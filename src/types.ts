export interface NavItem {
  name: string;
  path: string;
  children?: NavItem[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  type: 'upcoming' | 'past';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  category: 'article' | 'video' | 'podcast' | 'tool';
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  resource: 'events' | 'startups' | 'resources' | 'team' | 'partners' | 'pages' | 'settings';
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface Role {
  id: string;
  name: 'admin' | 'editor' | 'viewer';
  permissions: Permission[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  heroBackgroundUrl: string;
}
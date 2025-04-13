import { Page } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Mock storage for pages
let pages: Page[] = [
  {
    id: '1',
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `
      <h1>Privacy Policy</h1>
      <p>Last updated: January 1, 2025</p>
      <p>This Privacy Policy describes how Wharton Alumni AI Studio collects, uses, and discloses your information when you use our website and services.</p>
      <h2>Information We Collect</h2>
      <p>We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us.</p>
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.</p>
      <h2>Sharing of Information</h2>
      <p>We do not share your personal information with third parties except as described in this Privacy Policy.</p>
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at info@whartonaistudio.org.</p>
    `,
    metaDescription: 'Privacy Policy for Wharton Alumni AI Studio',
    isPublished: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `
      <h1>Terms of Service</h1>
      <p>Last updated: January 1, 2025</p>
      <p>These Terms of Service govern your use of the Wharton Alumni AI Studio website and services.</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing or using our services, you agree to be bound by these Terms of Service.</p>
      <h2>User Accounts</h2>
      <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.</p>
      <h2>Intellectual Property</h2>
      <p>The content, features, and functionality of our services are owned by Wharton Alumni AI Studio and are protected by copyright, trademark, and other intellectual property laws.</p>
      <h2>Termination</h2>
      <p>We may terminate or suspend your access to our services at any time, without prior notice or liability, for any reason.</p>
      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms of Service, please contact us at info@whartonaistudio.org.</p>
    `,
    metaDescription: 'Terms of Service for Wharton Alumni AI Studio',
    isPublished: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'About Us',
    slug: 'about-us',
    content: `
      <h1>About Wharton Alumni AI Studio</h1>
      <p>Founded in 2023, the Wharton Alumni AI Studio is a community-driven initiative that brings together Wharton alumni who are passionate about artificial intelligence and its applications across industries.</p>
      <h2>Our Mission</h2>
      <p>Our mission is to leverage the collective expertise of Wharton alumni to foster innovation, knowledge sharing, and collaboration in the rapidly evolving field of artificial intelligence.</p>
      <h2>Our Vision</h2>
      <p>We envision a future where AI technology is developed and deployed responsibly, with a deep understanding of its potential impacts on business and society.</p>
      <h2>Our Team</h2>
      <p>Our team consists of dedicated Wharton alumni with diverse backgrounds in technology, business, and academia, all united by a common interest in advancing AI for the benefit of society.</p>
      <h2>Join Us</h2>
      <p>Whether you're a Wharton alum interested in AI, a startup founder seeking guidance, or an industry expert looking to share your knowledge, we welcome you to be part of our growing community.</p>
    `,
    metaDescription: 'Learn about the Wharton Alumni AI Studio, our mission, vision, and team',
    isPublished: true,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
  {
    id: '4',
    title: 'Contact Us',
    slug: 'contact-us',
    content: `
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Whether you have questions about our programs, want to propose a collaboration, or are interested in volunteering, please reach out using the information below.</p>
      <h2>General Inquiries</h2>
      <p>Email: info@whartonaistudio.org</p>
      <p>Phone: (215) 555-1234</p>
      <h2>Office Location</h2>
      <p>Wharton Alumni AI Studio<br>3730 Walnut Street<br>Philadelphia, PA 19104</p>
      <h2>Connect With Us</h2>
      <p>Follow us on social media for the latest updates:</p>
      <ul>
        <li>LinkedIn: <a href="https://linkedin.com/company/wharton-alumni-ai-studio">Wharton Alumni AI Studio</a></li>
        <li>Twitter: <a href="https://twitter.com/whartonai">@WhartonAI</a></li>
      </ul>
    `,
    metaDescription: 'Contact the Wharton Alumni AI Studio team for inquiries, collaborations, or to get involved',
    isPublished: true,
    createdAt: '2025-01-20T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
  },
  {
    id: '5',
    title: 'FAQ',
    slug: 'faq',
    content: `
      <h1>Frequently Asked Questions</h1>
      <h2>General Questions</h2>
      <h3>What is the Wharton Alumni AI Studio?</h3>
      <p>The Wharton Alumni AI Studio is a community-driven initiative that brings together Wharton alumni who are passionate about artificial intelligence and its applications across industries.</p>
      <h3>Do I need to be a Wharton alum to participate?</h3>
      <p>While our core community consists of Wharton alumni, we welcome participation from the broader Penn community and occasionally host events that are open to the public.</p>
      <h2>Membership Questions</h2>
      <h3>How can I join the Wharton Alumni AI Studio?</h3>
      <p>Wharton alumni can join by filling out the membership form on our Get Involved page. Once your alumni status is verified, you'll receive access to our community resources.</p>
      <h3>Is there a membership fee?</h3>
      <p>Currently, there is no fee to join our community. We operate primarily through volunteer efforts and occasional sponsorships.</p>
      <h2>Event Questions</h2>
      <h3>How often do you host events?</h3>
      <p>We typically host 1-2 events per month, including webinars, in-person meetups, and workshops.</p>
      <h3>Can I propose or host an event?</h3>
      <p>Absolutely! We encourage community members to propose events. Please contact us with your ideas.</p>
    `,
    metaDescription: 'Find answers to frequently asked questions about the Wharton Alumni AI Studio',
    isPublished: true,
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2025-02-01T00:00:00Z',
  }
];

// Get all pages
export const getAllPages = (): Page[] => {
  return pages;
};

// Get published pages
export const getPublishedPages = (): Page[] => {
  return pages.filter(page => page.isPublished);
};

// Get page by ID
export const getPageById = (id: string): Page | undefined => {
  return pages.find(page => page.id === id);
};

// Get page by slug
export const getPageBySlug = (slug: string): Page | undefined => {
  return pages.find(page => page.slug === slug);
};

// Create new page
export const createPage = (pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Page => {
  const now = new Date().toISOString();
  const newPage: Page = {
    id: uuidv4(),
    ...pageData,
    createdAt: now,
    updatedAt: now,
  };
  
  pages = [...pages, newPage];
  return newPage;
};

// Update page
export const updatePage = (id: string, pageData: Partial<Omit<Page, 'id' | 'createdAt' | 'updatedAt'>>): Page | undefined => {
  const pageIndex = pages.findIndex(page => page.id === id);
  
  if (pageIndex === -1) {
    return undefined;
  }
  
  const updatedPage = {
    ...pages[pageIndex],
    ...pageData,
    updatedAt: new Date().toISOString(),
  };
  
  pages = [
    ...pages.slice(0, pageIndex),
    updatedPage,
    ...pages.slice(pageIndex + 1)
  ];
  
  return updatedPage;
};

// Delete page
export const deletePage = (id: string): boolean => {
  const pageIndex = pages.findIndex(page => page.id === id);
  
  if (pageIndex === -1) {
    return false;
  }
  
  pages = [
    ...pages.slice(0, pageIndex),
    ...pages.slice(pageIndex + 1)
  ];
  
  return true;
};

// Search pages
export const searchPages = (query: string): Page[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return pages.filter(page => 
    page.title.toLowerCase().includes(lowercaseQuery) ||
    page.content.toLowerCase().includes(lowercaseQuery) ||
    page.slug.toLowerCase().includes(lowercaseQuery)
  );
};

// Check if slug exists
export const slugExists = (slug: string, excludeId?: string): boolean => {
  return pages.some(page => page.slug === slug && page.id !== excludeId);
};
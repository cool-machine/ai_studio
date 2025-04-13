import { NavItem } from '../types';

export const navigation: NavItem[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Startup Community',
    path: '/startup-community',
    children: [
      {
        name: 'Give Back Program',
        path: '/startup-community/give-back',
      },
      {
        name: 'Startups',
        path: '/startup-community/startups',
      },
    ],
  },
  {
    name: 'Events',
    path: '/events',
    children: [
      {
        name: 'Upcoming',
        path: '/events/upcoming',
      },
      {
        name: 'Past',
        path: '/events/past',
      },
    ],
  },
  {
    name: 'Get Involved',
    path: '/get-involved',
    children: [
      {
        name: 'Newsletter',
        path: '/get-involved/newsletter',
      },
      {
        name: 'WhatsApp Group',
        path: '/get-involved/whatsapp',
      },
      {
        name: 'Become a Mentor',
        path: '/get-involved/mentor',
      },
      {
        name: 'Volunteer',
        path: '/get-involved/volunteer',
      },
    ],
  },
  {
    name: 'About Us',
    path: '/about',
  },
  {
    name: 'Resources',
    path: '/resources',
  },
];
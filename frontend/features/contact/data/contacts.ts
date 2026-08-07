// features/contact/data/contacts.ts

import { OfficeLocation, ContactMethod, SocialLink } from '../types';

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'lucknow-hq',
    city: 'Lucknow',
    country: 'India',
    region: 'Uttar Pradesh',
    address: 'GyaanByte HQ, Lucknow',
    postalCode: '226031',
    coordinates: {
      lat: 26.8467,
      lng: 80.9462,
    },
    timezone: 'Asia/Kolkata',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
    isHeadquarters: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    phone: '+91 63883 19121',
    email: 'contact@gyaanbyte.com',
  },
];

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'sales-channel',
    type: 'sales',
    title: 'Direct Call / WhatsApp',
    description: 'Discuss custom software projects, student source code, or training programs instantly.',
    primaryValue: '+91 63883 19121',
    actionLabel: 'Call +91 63883 19121',
    actionHref: 'tel:+916388319121',
    badge: 'Fastest Response',
    responseTime: 'Instant / < 30 mins',
    iconName: 'building',
  },
  {
    id: 'support-channel',
    type: 'support',
    title: 'Technical & Code Support',
    description: 'Get help with project setup, bug fixing, architecture guidance, or execution issues.',
    primaryValue: 'support@gyaanbyte.com',
    actionLabel: 'Call Support Line',
    actionHref: 'tel:+916388319121',
    responseTime: '9:00 AM - 7:00 PM IST',
    iconName: 'life-buoy',
  },
  {
    id: 'mentorship-channel',
    type: 'general',
    title: 'Training & Mentorship',
    description: '1-on-1 technical guidance, viva preparation, stack training, and career mentorship.',
    primaryValue: 'mentorship@gyaanbyte.com',
    actionLabel: 'Book Mentorship Session',
    actionHref: '/contact',
    responseTime: '< 2 hours',
    iconName: 'message-square',
  },
  {
    id: 'partnerships-channel',
    type: 'partnerships',
    title: 'College & Corporate Tie-ups',
    description: 'Collaborate on campus training workshops, custom batch projects, or institutional alliances.',
    primaryValue: 'partners@gyaanbyte.com',
    actionLabel: 'Partner with Us',
    actionHref: '/contact',
    responseTime: '< 1 business day',
    iconName: 'mail',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/company/gyaanbyte',
    label: 'LinkedIn',
  },
  {
    platform: 'github',
    url: 'https://github.com/gyaanbyte',
    label: 'GitHub',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/gyaanbyte',
    label: 'X (formerly Twitter)',
  },
  {
    platform: 'discord',
    url: 'https://discord.gg/gyaanbyte',
    label: 'Discord Community',
  },
];

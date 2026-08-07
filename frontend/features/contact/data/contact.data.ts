// features/contact/data/contact.data.ts

import { ContactPageConfig, ContactCategory } from '../types';

export const CONTACT_PAGE_CONFIG: ContactPageConfig = {
  metaTitle: 'Contact Us | GyaanByte',
  metaDescription:
    'Connect with the GyaanByte team based in Lucknow, UP. Whether you have questions about custom software solutions, technical training, source code, or project guidance, we are here to help.',
  heroBadge: 'Direct Support Channel',
  heroTitle: "Let's build something exceptional together",
  heroSubtitle:
    'Have a project in mind, need technical assistance, or want to consult with our Lucknow team? Choose your option below or call us directly at +91 63883 19121.',
};

export interface CategoryOption {
  value: ContactCategory;
  label: string;
  description: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: 'sales',
    label: 'Projects & Custom Development',
    description: 'Custom software solutions, project guidance & pricing',
  },
  {
    value: 'support',
    label: 'Technical Support',
    description: 'Code assistance, project setup & bug fixes',
  },
  {
    value: 'partnerships',
    label: 'Strategic Partnerships',
    description: 'Institutional alliances, co-programs & collaborations',
  },
  {
    value: 'general',
    label: 'General Inquiry',
    description: 'Any other questions or feedback for the GyaanByte team',
  },
];

export const BUDGET_RANGES: { value: string; label: string }[] = [
  { value: 'under-10k', label: 'Under ₹10,000' },
  { value: '10k-25k', label: '₹10,000 - ₹25,000' },
  { value: '25k-50k', label: '₹25,000 - ₹50,000' },
  { value: '50k-1L', label: '₹50,000 - ₹1 Lakh' },
  { value: '1L-plus', label: '₹1 Lakh+' },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const CONTACT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How quickly will the GyaanByte team respond to my inquiry?',
    answer:
      'Our team responds to all incoming inquiries within 2 hours during standard IST business hours (9:00 AM - 7:00 PM IST). You can also call or WhatsApp us directly at +91 63883 19121.',
  },
  {
    id: 'faq-2',
    question: 'Can I directly call or WhatsApp for project discussion?',
    answer:
      'Yes! For quick resolution or detailed project discussions, feel free to call or message us directly on +91 63883 19121.',
  },
  {
    id: 'faq-3',
    question: 'Where is GyaanByte located?',
    answer:
      'Our main office is located in Lucknow, Uttar Pradesh (226031), India. We serve clients and students across India remotely as well as in-person.',
  },
  {
    id: 'faq-4',
    question: 'What payment modes are supported for Indian clients?',
    answer:
      'We support all standard Indian payment options including UPI (GPay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, and Direct Bank Transfers.',
  },
];

export const TRUST_METRICS = [
  { label: 'Average Response Time', value: '< 2 hrs' },
  { label: 'Direct Call / WhatsApp', value: '+91 63883 19121' },
  { label: 'Headquarters', value: 'Lucknow, UP' },
  { label: 'Projects Delivered', value: '500+' },
];

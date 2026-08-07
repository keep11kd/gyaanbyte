// features/contact/types/Contact.types.ts

export type ContactCategory =
  | 'general'
  | 'sales'
  | 'support'
  | 'press'
  | 'partnerships';

export interface OfficeLocation {
  id: string;
  city: string;
  country: string;
  region: string;
  address: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  hours: string;
  isHeadquarters?: boolean;
  image: string;
  phone: string;
  email: string;
}

export interface ContactMethod {
  id: string;
  type: ContactCategory;
  title: string;
  description: string;
  primaryValue: string;
  actionLabel: string;
  actionHref: string;
  badge?: string;
  responseTime: string;
  iconName: 'mail' | 'phone' | 'message-square' | 'building' | 'life-buoy';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  category: ContactCategory;
  budgetRange?: string;
  subject: string;
  message: string;
  consent: boolean;
}

export type FormFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState {
  status: SubmissionStatus;
  errors: FormFieldErrors;
  serverMessage?: string;
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'youtube' | 'discord';
  url: string;
  label: string;
}

export interface ContactPageConfig {
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
}

export type FAQCategory =
  | "All"
  | "Training"
  | "Projects"
  | "IEEE"
  | "Support"
  | "Payments";

export interface FAQLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;

  /** Highlight on homepage accordion */
  featured?: boolean;

  /** Keywords/tags for search indexing and quick filtering */
  tags?: readonly string[];

  /** Call-to-action link specific to this answer (e.g., "Download Setup Guide") */
  actionLink?: FAQLink;

  /** Helpful metrics (optional for interactive UI feedback) */
  helpfulCount?: number;

  /** Last revised date string (e.g., "2026-03-15") */
  updatedAt?: string;
}

export interface FAQContent {
  badge: {
    text: string;
    iconName?: string;
  };

  heading: {
    line1: string;
    highlight: string;
    line2?: string;
  };

  description: string;

  actions?: {
    primary?: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };

  categories: readonly FAQCategory[];
  faqs: readonly FAQ[];
}

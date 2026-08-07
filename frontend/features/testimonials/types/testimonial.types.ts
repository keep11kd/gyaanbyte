/* ===========================================================
   Testimonial Interfaces
   =========================================================== */

export type TestimonialCategory =
  | "All"
  | "Students"
  | "Professionals"
  | "Corporate"
  | "Academic Projects";

export interface Testimonial {
  /** Unique identifier */
  id: string;

  /** Full name of the reviewer */
  name: string;

  /** Job title or academic status (e.g. "Software Engineer", "B.Tech CSE") */
  role: string;

  /** Company or Institution (e.g. "HCL Technologies", "AKTU") */
  organization: string;

  /** Image URL for avatar */
  avatar: string;

  /** Rating score out of 5 (e.g. 5) */
  rating: number;

  /** Review text content */
  message: string;

  /** Highlight on homepage or featured carousel */
  featured?: boolean;

  /** Optional LinkedIn profile link */
  linkedin?: string;

  /** Optional company/university logo URL */
  companyLogo?: string;

  /** Optional category tag for filtering */
  category?: Exclude<TestimonialCategory, "All">;

  /** Optional badge indicating verified buyer or student */
  verified?: boolean;

  /** Optional date string (e.g., "2026-03-15") */
  date?: string;
}

/* ===========================================================
   Action & Layout Interfaces
   =========================================================== */

export interface TestimonialsAction {
  label: string;
  href: string;
}

export interface TestimonialsContent {
  badge: {
    text: string;
  };

  heading: {
    line1: string;
    highlight: string;
  };

  description: string;

  actions: {
    primary: TestimonialsAction;
    secondary?: TestimonialsAction;
  };

  /** Available filter categories */
  categories?: readonly TestimonialCategory[];

  /** Master list of testimonials */
  testimonials: readonly Testimonial[];
}

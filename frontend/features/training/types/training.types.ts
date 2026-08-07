/* ===========================================================
   Training Categories
   =========================================================== */

export const TRAINING_CATEGORIES = [
  "All",
  "Programming",
  "Software Engineering",
  "Full Stack",
  "Artificial Intelligence",
  "Data Science",
  "Cyber Security",
  "Cloud & DevOps",
] as const;

export type TrainingCategory =
  (typeof TRAINING_CATEGORIES)[number];

/* ===========================================================
   Training Level
   =========================================================== */

export type TrainingLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

/* ===========================================================
   Training Mode
   =========================================================== */

export type TrainingMode =
  | "Online"
  | "Offline"
  | "Hybrid";

/* ===========================================================
   Training Program
   =========================================================== */

export interface TrainingProgram {
  /** Unique identifier */
  id: string;

  /** URL friendly identifier */
  slug: string;

  /** Training title */
  title: string;

  /** Main category */
  category: Exclude<TrainingCategory, "All">;

  /** Short description */
  description: string;

  /** Thumbnail */
  image: string;

  /** Duration */
  duration: string;

  /** Difficulty */
  level: TrainingLevel;

  /** Delivery mode */
  mode: TrainingMode;

  /** Technologies covered */
  technologies: readonly string[];

  /** Show on homepage */
  featured: boolean;
}

/* ===========================================================
   CTA
   =========================================================== */

export interface TrainingAction {
  label: string;
  href: string;
}

/* ===========================================================
   Training Page Content
   =========================================================== */

export interface TrainingContent {
  badge: {
    text: string;
  };

  heading: {
    line1: string;
    highlight: string;
  };

  description: string;

  actions: {
    primary: TrainingAction;
    secondary?: TrainingAction;
  };

  categories: readonly TrainingCategory[];

  trainings: readonly TrainingProgram[];
}

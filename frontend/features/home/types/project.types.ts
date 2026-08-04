export const PROJECT_CATEGORIES = [
  "All",
  "AI & Data Science",
  "Enterprise Software",
  "Web Development",
  "Mobile Apps",
  "IoT & Embedded",
  "IEEE Research",
] as const;

export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[number];

export type ProjectDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type ProjectClient =
  | "Student"
  | "Business"
  | "Startup"
  | "Enterprise"
  | "Government";

export interface Project {
  /** Unique identifier */
  id: string;

  /** Project title */
  title: string;

  /** Main category */
  category: Exclude<ProjectCategory, "All">;

  /** Optional secondary grouping */
  subcategory?: string;

  /** Eligible branches */
  academicBranches: string[];

  /** Project overview */
  description: string;

  /** Thumbnail */
  image: string;

  /** Tech stack */
  technologies: string[];

  /** Estimated duration */
  duration: string;

  /** Project complexity */
  difficulty?: ProjectDifficulty;

  /** Featured on homepage */
  featured: boolean;
  isNew?: boolean;
  isPopular?: boolean;

  /** Intended audience */
  client?: ProjectClient;

  /** IEEE support available */
  ieeePaperSupported: boolean;

  /** Deliverables */
  deliverables: string[];

  /** Live Demo */
  demoUrl?: string;

  /** GitHub / Docs */
  docsUrl?: string;
}

export interface ProjectsAction {
  label: string;
  href: string;
}

export interface ProjectsContent {
  badge: {
    text: string;
  };

  heading: {
    line1: string;
    highlight: string;
  };

  description: string;

  actions: {
    primary: ProjectsAction;
    secondary?: ProjectsAction;
  };

categories: readonly ProjectCategory[];
  projects: Project[];
}

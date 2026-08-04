import type { ProjectsContent } from "../types/project.types";
import { PROJECT_CATEGORIES } from "../types";
import { projects } from "../projects";

export const projectsContent: ProjectsContent = {
  badge: {
    text: "Academic Capstones & Enterprise Showcase",
  },

  heading: {
    line1: "Real-World Projects That Drive",
    highlight: "Academic & Industry Success",
  },

  description:
    "Explore production-grade academic, enterprise, AI, IoT and full-stack software projects built for students, startups and businesses.",

  actions: {
    primary: {
      label: "Explore All Projects",
      href: "/projects",
    },
    secondary: {
      label: "Request Project Consultation",
      href: "/contact",
    },
  },

  // ✅ Add this
  categories: PROJECT_CATEGORIES,

  // ✅ And this
  projects,
};

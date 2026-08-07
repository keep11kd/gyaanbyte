import type { TrainingContent } from "../types";
import { TRAINING_CATEGORIES } from "../types";
import { trainings } from "./trainings";

export const trainingContent: TrainingContent = {
  badge: {
    text: "Professional Training & Career Programs",
  },

  heading: {
    line1: "Build Your Career With",
    highlight: "Industry-Focused Training",
  },

  description:
    "Master in-demand technologies through practical, project-based training designed for students and professionals.",

  actions: {
    primary: {
      label: "Explore All Trainings",
      href: "/training",
    },
    secondary: {
      label: "Request Training",
      href: "/request?type=training",
    },
  },

  categories: TRAINING_CATEGORIES,

  trainings,
};

import type { TestimonialsContent } from "../types";
import { testimonials } from "./testimonials";

export const testimonialsContent: TestimonialsContent = {
  badge: {
    text: "Success Stories & Testimonials",
  },

  heading: {
    line1: "Trusted by Students &",
    highlight: "Professionals",
  },

  description:
    "Hear what students, professionals and organizations say about their experience with GyaanByte's training, academic projects and technical guidance.",

  actions: {
    primary: {
      label: "Explore All Testimonials",
      href: "/testimonials",
    },
    secondary: {
      label: "Share Your Experience",
      href: "/testimonials/share-experience",
    },
  },

  categories: [
    "All",
    "Students",
    "Professionals",
    "Academic Projects",
  ],

  testimonials,
};

import type { FAQContent } from "../types";
import { faqs } from "./faqs";

export const faqContent: FAQContent = {
  badge: {
    text: "Got Questions?",
    iconName: "HelpCircle",
  },
  heading: {
    line1: "Frequently Asked",
    highlight: "Questions",
    line2: "Answered",
  },
  description:
    "Everything you need to know about our hands-on industrial training, end-to-end academic project packages, IEEE paper implementations, and dedicated technical support.",
  actions: {
    primary: {
      label: "Explore All FAQs",
      href: "/faq",
    },
    secondary: {
      label: "Ask a Question",
      href: "/contact",
    },
  },
  categories: [
    "All",
    "Training",
    "Projects",
    "IEEE",
    "Support",
    "Payments",
  ],
  faqs,
};

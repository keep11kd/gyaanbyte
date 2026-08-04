import type { Project } from "../types/project.types";

export const webProjects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Modern E-Commerce Platform",
    category: "Web Development",
    subcategory: "E-Commerce",
    academicBranches: [
      "B.Tech",
      "BCA",
      "MCA",
    ],
    description:
      "Scalable e-commerce platform with customer portal, admin dashboard, product management, payment integration and order tracking.",
    image: "/images/projects/ecommerce-platform.webp",
    technologies: [
      "Next.js",
      "React",
      "Spring Boot",
      "PostgreSQL",
      "Stripe",
      "Docker",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Source Code",
      "Admin Dashboard",
      "Payment Gateway",
      "Deployment Guide",
    ],
  },

  {
    id: "real-estate-platform",
    title: "Real Estate Property Portal",
    category: "Web Development",
    subcategory: "Property Management",
    academicBranches: [
      "B.Tech",
      "MCA",
    ],
    description:
      "Property listing platform featuring lead management, interactive maps, booking requests and admin analytics.",
    image: "/images/projects/real-estate-platform.webp",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Google Maps",
    ],
    duration: "4 Weeks",
    difficulty: "Intermediate",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Source Code",
      "CMS Dashboard",
      "Documentation",
      "Deployment",
    ],
  },
];

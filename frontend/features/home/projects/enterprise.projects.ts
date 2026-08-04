import type { Project } from "../types/project.types";

export const enterpriseProjects: Project[] = [
  {
    id: "hospital-management-system",
    title: "Multi-Tenant Smart Hospital ERP Platform",
    category: "Enterprise Software",
    subcategory: "Healthcare ERP",
    academicBranches: [
      "B.Tech (CS/IT)",
      "BCA",
      "MCA",
    ],
    description:
      "Complete hospital ERP featuring patient management, appointments, pharmacy, billing and electronic medical records.",
    image: "/images/projects/hospital-erp-dashboard.webp",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "React",
      "Docker",
    ],
    duration: "6 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Source Code",
      "ER Diagram",
      "Documentation",
      "Deployment Guide",
    ],
  },

  {
    id: "university-cloud-erp",
    title: "University & Examination ERP",
    category: "Enterprise Software",
    subcategory: "Education ERP",
    academicBranches: [
      "B.Tech",
      "MCA",
      "M.Tech",
    ],
    description:
      "Modern university ERP managing attendance, examinations, grades, faculty workload and student records.",
    image: "/images/projects/college-management-erp.webp",
    technologies: [
      "Next.js",
      "Spring Boot",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    duration: "2 Months",
    difficulty: "Advanced",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Source Code",
      "Admin Dashboard",
      "ER Diagram",
      "Deployment Guide",
    ],
  },
];

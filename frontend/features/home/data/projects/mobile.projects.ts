import type { Project } from "../../types/project.types";

export const mobileProjects: Project[] = [
  {
    id: "food-delivery-app",
    title: "Food Delivery Mobile Application",
    category: "Mobile Apps",
    subcategory: "Food Delivery",
    academicBranches: [
      "B.Tech",
      "BCA",
      "MCA",
    ],
    description:
      "Complete food ordering application with customer app, restaurant dashboard, delivery tracking and secure online payments.",
    image: "/images/projects/food-delivery-app.webp",
    technologies: [
      "Flutter",
      "Firebase",
      "Google Maps",
      "Node.js",
      "Stripe",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Android App",
      "Admin Dashboard",
      "Backend API",
      "Deployment Guide",
    ],
  },

  {
    id: "doctor-appointment-app",
    title: "Doctor Appointment & Telemedicine App",
    category: "Mobile Apps",
    subcategory: "Healthcare",
    academicBranches: [
      "B.Tech",
      "BCA",
      "MCA",
    ],
    description:
      "Healthcare application with appointment booking, online consultation, patient records and prescription management.",
    image: "/images/projects/doctor-appointment-app.webp",
    technologies: [
      "Flutter",
      "Spring Boot",
      "Firebase",
      "PostgreSQL",
    ],
    duration: "4 Weeks",
    difficulty: "Intermediate",
    featured: true,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Android App",
      "Admin Portal",
      "API",
      "Documentation",
    ],
  },

  {
    id: "elearning-mobile-app",
    title: "E-Learning Mobile Platform",
    category: "Mobile Apps",
    subcategory: "Education",
    academicBranches: [
      "B.Tech",
      "BCA",
      "MCA",
    ],
    description:
      "Learning management application with video courses, quizzes, certificates, progress tracking and student analytics.",
    image: "/images/projects/elearning-mobile-app.webp",
    technologies: [
      "Flutter",
      "Firebase",
      "Cloud Storage",
      "Node.js",
    ],
    duration: "4 Weeks",
    difficulty: "Intermediate",
    featured: false,
    client: "Business",
    ieeePaperSupported: false,
    deliverables: [
      "Android App",
      "Instructor Panel",
      "Student Dashboard",
      "Documentation",
    ],
  },

  {
    id: "expense-tracker-app",
    title: "Personal Expense Tracker",
    category: "Mobile Apps",
    subcategory: "Finance",
    academicBranches: [
      "B.Tech",
      "BCA",
      "MCA",
    ],
    description:
      "Finance management application with budgeting, expense tracking, charts, recurring transactions and reports.",
    image: "/images/projects/expense-tracker-app.webp",
    technologies: [
      "Kotlin",
      "Room Database",
      "Material Design",
      "Firebase",
    ],
    duration: "3 Weeks",
    difficulty: "Beginner",
    featured: false,
    client: "Student",
    ieeePaperSupported: false,
    deliverables: [
      "Android App",
      "Source Code",
      "Documentation",
      "APK",
    ],
  },
];

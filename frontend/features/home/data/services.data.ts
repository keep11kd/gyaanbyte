import {
  Bot,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  FolderGit2,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  href: string;
  accent: "lime" | "sky" | "orange" | "purple";
}

export const servicesContent = {
  badge: {
    text: "What We Offer",
  },

  heading: {
    line1: "Industry Training, Capstone Projects",
    highlight: "& Scalable Tech Solutions",
  },

  description:
    "From complete minor/major IEEE project guidance for B.Tech, BCA, MCA & M.Tech students (CS, IT, EC) to corporate software development, GyaanByte bridges the gap between academic learning and industry execution.",

  services: [
    {
      title: "Minor & Major Capstone Projects",
      description:
        "Turnkey B.Tech, BCA, MCA & M.Tech projects (CS, IT, EC). Includes IEEE base papers, complete source code, synopses, & 1-on-1 viva guidance.",
      icon: FolderGit2,
      features: [
        "IEEE Base Papers",
        "Full Source Code",
        "Synopsis & PPT",
        "1-on-1 Viva Prep",
      ],
      href: "/services/academic-projects",
      accent: "lime",
    },
    {
      title: "Industrial Training & Internships",
      description:
        "45-day & 6-month project-based industrial training programs tailored to make engineering students job-ready with verified certificates.",
      icon: GraduationCap,
      features: [
        "Live Corporate Projects",
        "MNC Mentors",
        "ISO Certification",
        "Placement Support",
      ],
      href: "/training",
      accent: "purple",
    },
    {
      title: "AI, RAG & ML Engineering",
      description:
        "Custom AI agents, LLM fine-tuning, RAG pipelines, and intelligent automation built for both enterprise software and research-level thesis projects.",
      icon: Bot,
      features: [
        "OpenAI & LangChain",
        "RAG Systems",
        "Python & PyTorch",
        "Custom AI Agents",
      ],
      href: "/services/ai-solutions",
      accent: "sky",
    },
    {
      title: "Full-Stack Web & Cloud Platforms",
      description:
        "High-performance web applications, enterprise portals, e-commerce, and scalable web solutions built on modern React and cloud architectures.",
      icon: Globe,
      features: [
        "Next.js & React",
        "Tailwind & TypeScript",
        "Cloud Deployment",
        "SEO Optimized",
      ],
      href: "/services/web-development",
      accent: "lime",
    },
    {
      title: "Custom Software & ERP Systems",
      description:
        "End-to-end enterprise software, CRM, ERP, and robust REST APIs designed for reliability, high concurrency, and seamless database scaling.",
      icon: Code2,
      features: [
        "Java & Spring Boot",
        "Microservices",
        "PostgreSQL",
        "REST & GraphQL",
      ],
      href: "/services/software-development",
      accent: "orange",
    },
    {
      title: "Embedded Systems, IoT & Hardware",
      description:
        "Tailored hardware-software integration, microcontroller programming (Arduino, ESP32, Raspberry Pi), and IoT sensor systems for EC & IT projects.",
      icon: Cpu,
      features: [
        "Arduino & ESP32",
        "Raspberry Pi",
        "IoT Protocols",
        "PCB & Sensors",
      ],
      href: "/services/iot-embedded",
      accent: "orange",
    },
  ] satisfies Service[],
  cta: {
  badge: {
    text: "Let's Build Something Amazing",
  },

  heading: {
    line1: "Have an Idea?",
    highlight: "Let's Turn It Into Reality.",
  },

  description:
    "Whether you're a student looking for project guidance or a business planning custom software, we'll help you choose the right solution and build it together.",

  actions: {
    primary: {
      label: "Book Free Consultation",
      href: "/contact",
    },

    secondary: {
      label: "Explore All Services",
      href: "/services",
    },
  },

  trust: [
    "Free Consultation",
    "Student Friendly",
    "Business Ready Solutions",
  ],
},
};


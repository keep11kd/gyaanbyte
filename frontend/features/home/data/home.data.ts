export const heroContent = {
  badge: {
    text: "Empowering Students & Businesses",
  },

  heading: {
    line1: "Build Smarter",
    line2: "With Technology",
    highlight: "That Delivers",
  },

  description:
    "From Final Year Projects and custom business software to AI solutions, modern websites, and industry-ready training, GyaanByte helps students and businesses transform ideas into reality.",

  actions: {
    primary: {
      label: "Start Your Project",
      href: "/contact",
    },

    secondary: {
      label: "Explore Services",
      href: "/services",
    },
  },

  technologies: [
    "Java",
    "Spring Boot",
    "Next.js",
    "React",
    "Python",
    "Docker",
    "MySQL",
    "PostgreSQL",
  ],

  statistics: [
    {
      value: "50+",
      label: "Projects Delivered",
    },
    {
      value: "200+",
      label: "Students Guided",
    },
    {
      value: "15+",
      label: "Business Clients",
    },
    {
      value: "100%",
      label: "Commitment",
    },
  ],
};

export const projectsContent = {
  badge: {
    text: "Our Portfolio",
  },

  heading: {
    line1: "Projects That Showcase",
    highlight: "Engineering Excellence",
  },

  description:
    "From IEEE academic projects and AI-powered applications to enterprise software and scalable web platforms, GyaanByte delivers solutions designed for performance, innovation, and real-world impact.",

  actions: {
    primary: {
      label: "View All Projects",
      href: "/projects",
    },
  },

  projects: [
    {
      title: "AI Resume Analyzer",
      category: "AI",
      description:
        "AI-powered resume screening using Spring Boot, React and OpenAI.",
      image: "/images/projects/resume-analyzer.webp",
      technologies: ["Spring Boot", "React", "OpenAI"],
      duration: "3 Weeks",
      featured: true,
    },

    {
      title: "Hospital Management System",
      category: "Java",
      description:
        "Complete patient, billing and appointment management platform.",
      image: "/images/projects/hms.webp",
      technologies: ["Java", "Spring Boot", "MySQL"],
      duration: "6 Weeks",
    },

    {
      title: "College ERP",
      category: "Education",
      description:
        "Student management, attendance, faculty and examination system.",
      image: "/images/projects/college-erp.webp",
      technologies: ["React", "Spring Boot"],
      duration: "2 Months",
    },

    {
      title: "Business CRM",
      category: "Enterprise",
      description:
        "Customer relationship platform with analytics and reporting.",
      image: "/images/projects/crm.webp",
      technologies: ["Next.js", "PostgreSQL"],
      duration: "5 Weeks",
    },
  ],
};

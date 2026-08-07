import type { AboutContent } from "../types";

export const aboutContent: AboutContent = {
  brand: {
    name: "GyaanByte",
    tagline: "Learn. Build. Succeed.",
    description:
      "Founded by engineers and technical mentors, GyaanByte bridges the critical gap between university curriculum and industry-grade engineering. We help students turn theoretical knowledge into fully functional, production-ready software.",
  },
  mission: {
    heading: "Bridging Academics with Production-Ready Engineering",
    description:
      "We replace dry theoretical learning with 100% practical, live-executed project delivery. Our mission is to ensure every BCA, B.Tech, MCA, and M.Tech student masters their code architecture and defends their project with absolute confidence.",
    highlights: [
      "100% Practical & Live Execution on Your System",
      "Line-by-Line Code & Architecture Walkthroughs",
      "Comprehensive Documentation & Viva Prep Kits",
      "Direct 1-on-1 Mentorship from Experienced Engineers",
    ],
  },
  targetAudience: ["BCA", "B.Tech", "MCA", "M.Tech"],
  values: [
    {
      id: "originality",
      title: "100% Original & Customized",
      description: "Tailored code solutions built according to your project requirements with zero plagiarism.",
      iconName: "ShieldCheck",
    },
    {
      id: "punctuality",
      title: "On-Time Delivery",
      description: "Strict adherence to submission timelines so you are always ahead for university evaluations.",
      iconName: "Clock",
    },
    {
      id: "complete-support",
      title: "End-to-End Assistance",
      description: "From environment setup via AnyDesk to final viva defense, we stay with you every step of the way.",
      iconName: "Headphones",
    },
  ],
  services: [
    {
      id: "academic-projects",
      title: "Academic Projects",
      description: "End-to-end custom project development for final-year submission.",
      iconName: "GraduationCap",
    },
    {
      id: "java-training",
      title: "Java Training (Virtual)",
      description: "Live interactive Java 8+ and Spring Boot mentorship programs.",
      iconName: "Code2",
    },
    {
      id: "python-projects",
      title: "Python Projects",
      description: "Data Science, Machine Learning, and Django/FastAPI web solutions.",
      iconName: "Terminal",
    },
    {
      id: "ai-projects",
      title: "AI & ML Projects",
      description: "Cutting-edge IEEE paper implementations using Deep Learning & AI models.",
      iconName: "Cpu",
    },
    {
      id: "web-development",
      title: "Web Development",
      description: "Modern, responsive Web Apps built with Next.js, React, and Full-Stack APIs.",
      iconName: "Layout",
    },
    {
      id: "docs-viva-support",
      title: "Documentation & Viva Support",
      description: "IEEE-format project reports, SRS, UML diagrams, PPTs, and mock viva prep.",
      iconName: "FileText",
    },
  ],
  team: [
    {
      id: "shivam",
      name: "Shivam Singh Yadav",
      role: "Founder",
      qualification: "M.Tech",
      phone: "+91 63883 19121",
      bio: "Expert in Machine Learning algorithms, Python-based enterprise apps, and research paper implementations.",
    },
    {
      id: "roshan-thakur",
      name: "Roshan Thakur",
      role: "Co-Founder & Tech Mentor",
      qualification: "M.Tech",
      phone: "+91 70077 61492",
      bio: "Specializes in advanced system architecture, academic research projects, and core tech mentoring.",
    },
    {
      id: "abdul-bari",
      name: "Abdul Bari",
      role: "Software Engineer & Co-Founder",
      qualification: "B.Tech • Software Engineer",
      phone: "+91 63883 19121",
      bio: "Industry Software Engineer specializing in enterprise Java systems, web architecture, and full-stack solutions.",
    },
  ],
  contact: {
    email: "support@gyaanbyte.com",
    location: "Lucknow, Uttar Pradesh (226031), India",
  },
};

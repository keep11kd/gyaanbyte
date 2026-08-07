import type { WhyUsContent } from "../types";

export const whyUsContent: WhyUsContent = {
  badge: {
    text: "Why Choose GyaanByte",
    iconName: "Sparkles",
  },
  heading: {
    line1: "Accelerate Your Tech Journey with",
    highlight: "Industry Proof",
    line2: "Execution",
  },
  description:
    "We don't just deliver code—we build production-grade projects, mentor you 1-on-1 through live line-by-line debugging, and ensure complete architectural clarity for college vivas and tech interviews.",
  stats: [
    {
      value: "500+",
      label: "Projects Delivered",
      description: "Full-stack, ML & IEEE base papers",
    },
    {
      value: "100%",
      label: "Live Execution",
      description: "Guaranteed setup on your system",
    },
    {
      value: "4.9/5",
      label: "Student Rating",
      description: "From B.Tech, MCA & M.Tech grads",
    },
    {
      value: "24/7",
      label: "Mentorship Support",
      description: "Direct assistance via AnyDesk/WhatsApp",
    },
  ],
  actions: {
    primary: {
      label: "Explore Programs",
      href: "/training",
    },
    secondary: {
      label: "Talk to a Mentor",
      href: "https://wa.me/919999999999?text=Hi%20GyaanByte%2C%20I%20want%20to%20know%20more%20about...",
    },
  },
  features: [
    {
      id: "practical-learning",
      title: "100% Practical & Project-Driven",
      subtitle: "No Boring Theory",
      description:
        "Learn by building production-level applications using modern tech stacks like Next.js, Java Spring Boot, Microservices, and Cloud deployments.",
      iconName: "Code2",
      highlightBadge: "Core Value",
      benefits: [
        "Real-world enterprise application design",
        "Clean architecture & industry coding standards",
        "Git version control & deployment workflows",
      ],
      metric: {
        value: "100%",
        label: "Hands-on Coding",
      },
      accentColor: "lime",
      featured: true,
    },
    {
      id: "live-setup-support",
      title: "Zero-Friction System Setup",
      subtitle: "AnyDesk & Remote Desktop",
      description:
        "Stuck with setup errors? Our engineers connect remotely via AnyDesk/TeamViewer to configure your IDEs, databases, and dependencies seamlessly.",
      iconName: "MonitorCheck",
      highlightBadge: "Hassle Free",
      benefits: [
        "1-on-1 remote desktop installation",
        "Database configuration & seed scripts",
        "Environment bug fixing & execution guarantee",
      ],
      metric: {
        value: "< 15 Min",
        label: "Resolution Time",
      },
      accentColor: "emerald",
      featured: true,
    },
    {
      id: "complete-documentation",
      title: "End-to-End Documentation",
      subtitle: "University Ready",
      description:
        "Get comprehensive academic project deliverables including Synopsis, SRS documentation, UML diagrams, DB schemas, and polished PPT presentations.",
      iconName: "FileText",
      highlightBadge: "All-in-One",
      benefits: [
        "Comprehensive IEEE-format project report",
        "System Architecture & Data Flow Diagrams",
        "Customizable PowerPoint slides for presentation",
      ],
      metric: {
        value: "Complete",
        label: "Deliverables Kit",
      },
      accentColor: "teal",
      featured: true,
    },
    {
      id: "viva-preparation",
      title: "Dedicated Viva & Code Walkthrough",
      subtitle: "Ace Your Evaluation",
      description:
        "We don't leave you stranded after project delivery. Get 1-on-1 viva prep sessions explaining internal workflows, database queries, and key algorithms.",
      iconName: "GraduationCap",
      benefits: [
        "Line-by-line code explanation sessions",
        "Top expected viva questions & mock Q&A",
        "Confidence boost for external examiner rounds",
      ],
      metric: {
        value: "99.4%",
        label: "Viva Success Rate",
      },
      accentColor: "sky",
    },
    {
      id: "ieee-research",
      title: "Latest IEEE Base Paper Implementations",
      subtitle: "Cutting-Edge Domain",
      description:
        "We implement high-impact research papers from Machine Learning, Deep Learning, Cybersecurity, and Cloud Computing with custom dataset enhancements.",
      iconName: "BookOpenCheck",
      benefits: [
        "Recent year (2025-2026) IEEE paper algorithms",
        "Model evaluation metrics (Accuracy, F1-Score, Precision)",
        "Originality enhancement to ensure zero plagiarism",
      ],
      metric: {
        value: "Plagiarism",
        label: "Free Code",
      },
      accentColor: "indigo",
    },
    {
      id: "transparent-pricing",
      title: "Affordable & Student-Friendly Pricing",
      subtitle: "No Hidden Costs",
      description:
        "Get premium industrial mentorship and project source codes at transparent prices with flexible installment options tailored for students.",
      iconName: "ShieldCheck",
      benefits: [
        "Flexible 2-part installment payment plans",
        "No hidden charges or post-delivery fees",
        "Verified GST invoice & official receipt",
      ],
      metric: {
        value: "Flexible",
        label: "Payment Plans",
      },
      accentColor: "lime",
    },
  ],
};

import type { FAQ } from "../types";

export const faqs: FAQ[] = [
  // ---------------------------------------------------------------------------
  // Training
  // ---------------------------------------------------------------------------
  {
    id: "faq-training-1",
    category: "Training",
    question: "How are the training programs structured?",
    answer:
      "Our training programs are 100% practical and project-driven. You work directly on industry-standard technology stacks (like Java Spring Boot, React, Next.js, Microservices) with hands-on coding, live 1-on-1 mentorship, and real-time enterprise problem solving.",
    featured: true,
    tags: ["training", "curriculum", "structure", "java", "react", "mentorship", "syllabus"],
    actionLink: {
      label: "Explore Training Programs",
      href: "/training",
    },
    helpfulCount: 142,
    updatedAt: "2026-03-01",
  },
  {
    id: "faq-training-2",
    category: "Training",
    question: "Will I get a certificate upon completing the training?",
    answer:
      "Yes, upon successful project submission and evaluation, you receive a verified Training & Internship Completion Certificate along with a recommendation letter that can be verified online.",
    featured: false,
    tags: ["certificate", "internship", "completion", "verification", "credentials"],
    actionLink: {
      label: "View Sample Certificate",
      href: "/training#certificate",
    },
    helpfulCount: 98,
    updatedAt: "2026-02-15",
  },
  {
    id: "faq-training-3",
    category: "Training",
    question: "Is this training suitable for working professionals or final-year students?",
    answer:
      "Absolutely. We offer flexible evening and weekend batches specifically designed for final-year students balancing college and working engineers aiming for tier-1/FAANG product role switches.",
    featured: false,
    tags: ["schedule", "timing", "flexible", "working professional", "students"],
    helpfulCount: 76,
    updatedAt: "2026-02-20",
  },

  // ---------------------------------------------------------------------------
  // Projects
  // ---------------------------------------------------------------------------
  {
    id: "faq-projects-1",
    category: "Projects",
    question: "Do you provide full source code and documentation for academic projects?",
    answer:
      "Yes! Every academic project package includes the complete, clean source code, SQL database scripts, comprehensive project reports (Synopsis, SRS, Design Diagrams), setup guides, and presentation slides (PPT).",
    featured: true,
    tags: ["source code", "documentation", "srs", "synopsis", "ppt", "academic project", "btech", "mca"],
    actionLink: {
      label: "Browse Project Catalog",
      href: "/projects",
    },
    helpfulCount: 210,
    updatedAt: "2026-03-05",
  },
  {
    id: "faq-projects-2",
    category: "Projects",
    question: "Can I request custom modifications or new features in a project?",
    answer:
      "Yes, our engineering team can customize any existing project or build a completely custom full-stack application according to your specific college or university requirements.",
    featured: false,
    tags: ["customization", "modifications", "custom project", "unique features"],
    helpfulCount: 89,
    updatedAt: "2026-02-28",
  },

  // ---------------------------------------------------------------------------
  // IEEE
  // ---------------------------------------------------------------------------
  {
    id: "faq-ieee-1",
    category: "IEEE",
    question: "Are IEEE research paper base projects available?",
    answer:
      "Absolutely. We offer end-to-end implementation support for recent IEEE base papers across domains like AI/Machine Learning, Deep Learning, Cloud Security, Web Applications, and Android Development.",
    featured: true,
    tags: ["ieee", "research paper", "machine learning", "deep learning", "ai", "base paper"],
    actionLink: {
      label: "View IEEE Projects",
      href: "/projects?category=IEEE",
    },
    helpfulCount: 165,
    updatedAt: "2026-03-02",
  },
  {
    id: "faq-ieee-2",
    category: "IEEE",
    question: "How do you ensure the originality and uniqueness of IEEE implementations?",
    answer:
      "We provide customized execution flows, updated dataset integrations, and enhanced model algorithms so your project output is distinct and plagiarism-free.",
    featured: false,
    tags: ["plagiarism", "originality", "datasets", "unique code", "ieee implementation"],
    helpfulCount: 112,
    updatedAt: "2026-02-18",
  },

  // ---------------------------------------------------------------------------
  // Support
  // ---------------------------------------------------------------------------
  {
    id: "faq-support-1",
    category: "Support",
    question: "What kind of technical support do I get during project setup?",
    answer:
      "We provide step-by-step video installation guides as well as direct 1-on-1 remote desktop support via AnyDesk or TeamViewer to ensure the project runs seamlessly on your system.",
    featured: true,
    tags: ["installation", "anydesk", "teamviewer", "remote support", "setup guidance", "bug fix"],
    actionLink: {
      label: "Contact Support Team",
      href: "/contact",
    },
    helpfulCount: 305,
    updatedAt: "2026-03-10",
  },
  {
    id: "faq-support-2",
    category: "Support",
    question: "Will you assist me with viva and project explanation preparation?",
    answer:
      "Yes, we conduct dedicated viva preparation sessions covering system architecture, code walkthroughs, database schemas, and expected viva questions.",
    featured: false,
    tags: ["viva", "explanation", "architecture", "code walkthrough", "presentation help"],
    helpfulCount: 184,
    updatedAt: "2026-03-01",
  },

  // ---------------------------------------------------------------------------
  // Payments
  // ---------------------------------------------------------------------------
  {
    id: "faq-payments-1",
    category: "Payments",
    question: "What payment options and installment plans are available?",
    answer:
      "We accept all major UPI apps (Google Pay, PhonePe, Paytm), Net Banking, and Credit/Debit Cards. For long-term training programs, flexible 2-part installment plans are also available.",
    featured: false,
    tags: ["payment", "upi", "installment", "netbanking", "pricing", "fees"],
    helpfulCount: 120,
    updatedAt: "2026-01-25",
  },
  {
    id: "faq-payments-2",
    category: "Payments",
    question: "Do I get an official tax invoice for my payment?",
    answer:
      "Yes, an official GST invoice and payment receipt are automatically generated and sent to your registered email address upon successful payment.",
    featured: false,
    tags: ["invoice", "receipt", "gst", "proof of payment"],
    helpfulCount: 64,
    updatedAt: "2026-02-10",
  },
];

import type { Project } from "../../types/project.types";

export const ieeeProjects: Project[] = [
  {
    id: "blockchain-land-registry",
    title: "Blockchain-Based Land Registry System",
    category: "IEEE Research",
    subcategory: "Blockchain",
    academicBranches: [
      "B.Tech (CS/IT)",
      "M.Tech",
    ],
    description:
      "Secure decentralized land ownership platform using Ethereum smart contracts for tamper-proof property registration.",
    image: "/images/projects/blockchain-land-registry.webp",
    technologies: [
      "Solidity",
      "Ethereum",
      "Hardhat",
      "React",
      "Ethers.js",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Base Paper",
      "Smart Contracts",
      "Source Code",
      "Presentation",
    ],
  },

  {
    id: "blockchain-voting-system",
    title: "Blockchain Secure Voting Platform",
    category: "IEEE Research",
    subcategory: "Blockchain",
    academicBranches: [
      "B.Tech",
      "M.Tech",
    ],
    description:
      "Tamper-proof online voting platform using Ethereum smart contracts with decentralized vote verification.",
    image: "/images/projects/blockchain-voting-system.webp",
    technologies: [
      "Solidity",
      "Ethereum",
      "React",
      "Hardhat",
    ],
    duration: "4 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Paper",
      "Smart Contracts",
      "Documentation",
      "Presentation",
    ],
  },

  {
    id: "medical-diagnosis-ai",
    title: "AI Medical Diagnosis Assistant",
    category: "IEEE Research",
    subcategory: "Healthcare AI",
    academicBranches: [
      "B.Tech",
      "MCA",
      "M.Tech",
    ],
    description:
      "AI-powered medical diagnosis platform using deep learning for disease prediction and medical image analysis.",
    image: "/images/projects/medical-diagnosis-ai.webp",
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "FastAPI",
    ],
    duration: "6 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Paper",
      "Research Report",
      "Source Code",
      "Presentation",
    ],
  },

  {
    id: "driver-drowsiness-detection",
    title: "AI Driver Drowsiness Detection",
    category: "IEEE Research",
    subcategory: "Computer Vision",
    academicBranches: [
      "B.Tech",
      "MCA",
    ],
    description:
      "Computer vision based driver monitoring system that detects eye closure and fatigue to prevent road accidents.",
    image: "/images/projects/driver-drowsiness-detection.webp",
    technologies: [
      "Python",
      "OpenCV",
      "TensorFlow",
      "YOLO",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: false,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Paper",
      "Research Report",
      "Source Code",
      "PPT",
    ],
  },

  {
    id: "fake-news-detection",
    title: "AI Fake News Detection System",
    category: "IEEE Research",
    subcategory: "Natural Language Processing",
    academicBranches: [
      "B.Tech",
      "MCA",
    ],
    description:
      "NLP-based fake news detection using transformer models and machine learning classification.",
    image: "/images/projects/fake-news-detection.webp",
    technologies: [
      "Python",
      "Transformers",
      "BERT",
      "FastAPI",
    ],
    duration: "4 Weeks",
    difficulty: "Advanced",
    featured: false,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Paper",
      "Dataset",
      "Source Code",
      "Presentation",
    ],
  },

  {
    id: "smart-energy-grid",
    title: "Smart Energy Grid Monitoring",
    category: "IEEE Research",
    subcategory: "Smart Grid",
    academicBranches: [
      "B.Tech (EE)",
      "B.Tech (EC)",
    ],
    description:
      "IoT-enabled smart grid monitoring system with energy analytics and predictive maintenance.",
    image: "/images/projects/smart-energy-grid.webp",
    technologies: [
      "ESP32",
      "MQTT",
      "Python",
      "Node.js",
    ],
    duration: "5 Weeks",
    difficulty: "Advanced",
    featured: false,
    client: "Student",
    ieeePaperSupported: true,
    deliverables: [
      "IEEE Paper",
      "Circuit Diagram",
      "Source Code",
      "Documentation",
    ],
  },
];

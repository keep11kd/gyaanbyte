import type { Project } from "../../types/project.types";

export const aiProjects: Project[] = [
  {
    id: "ai-rag-thesis-analyzer",
    title: "RAG-Based AI Document & Thesis Analyzer",
    category: "AI & Data Science",
    subcategory: "Retrieval-Augmented Generation",
    academicBranches: [
      "B.Tech (CS/IT)",
      "MCA",
      "M.Tech",
    ],
    description:
      "Enterprise-grade Retrieval-Augmented Generation platform for intelligent document search using vector databases and LLM-powered contextual responses.",
    image: "/images/projects/ai-rag-document-assistant.webp",
    technologies: [
      "Python",
      "LangChain",
      "OpenAI",
      "Pinecone",
      "FastAPI",
      "React",
    ],
    duration: "4 Weeks",
    difficulty: "Advanced",
    featured: true,
    client: "Business",
    ieeePaperSupported: true,
    deliverables: [
      "Full Source Code",
      "IEEE Base Paper",
      "Synopsis",
      "PPT",
      "Viva Guide",
    ],
  },

  {
    id: "autonomous-ai-resume-screener",
    title: "AI Resume & ATS Candidate Matcher",
    category: "AI & Data Science",
    subcategory: "Generative AI",
    academicBranches: [
      "B.Tech",
      "MCA",
    ],
    description:
      "AI-powered ATS system that evaluates resumes, matches job descriptions and provides recruiter-ready candidate insights.",
    image: "/images/projects/ai-resume-ats-analyzer.webp",
    technologies: [
      "Python",
      "OpenAI",
      "React",
      "FastAPI",
      "MySQL",
    ],
    duration: "3 Weeks",
    difficulty: "Intermediate",
    featured: true,
    client: "Business",
    ieeePaperSupported: true,
    deliverables: [
      "Source Code",
      "Synopsis",
      "Setup Guide",
      "Presentation",
    ],
  },
];

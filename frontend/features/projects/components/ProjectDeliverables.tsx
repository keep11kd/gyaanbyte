"use client";

import {
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  Presentation,
  ShieldCheck,
  Terminal,
  HelpCircle,
} from "lucide-react";

import type { Project } from "@/features/home/types";

interface ProjectDeliverablesProps {
  project: Project & {
    deliverables?: string[];
  };
}

// Icon mapper helper for common deliverable categories
const getDeliverableIcon = (item: string) => {
  const lower = item.toLowerCase();
  if (lower.includes("code") || lower.includes("source"))
    return <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />;
  if (lower.includes("report") || lower.includes("synopsis") || lower.includes("paper"))
    return <FileText className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />;
  if (lower.includes("ppt") || lower.includes("presentation"))
    return <Presentation className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />;
  if (lower.includes("setup") || lower.includes("guide") || lower.includes("installation"))
    return <Terminal className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />;

  return <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />;
};

// Default deliverables if none provided in project model
const DEFAULT_DELIVERABLES = [
  "Complete Well-Commented Source Code",
  "IEEE Base Paper & Project Synopsis",
  "Editable Final Project Report (Word / PDF)",
  "PowerPoint Presentation (.PPTX) for Viva",
  "Step-by-Step System Setup & Execution Guide",
  "1-on-1 Demonstration & Support Call",
];

export default function ProjectDeliverables({
  project,
}: ProjectDeliverablesProps) {
  const deliverablesList =
    project.deliverables && project.deliverables.length > 0
      ? project.deliverables
      : DEFAULT_DELIVERABLES;

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <BookOpen className="h-5 w-5 text-lime-600" />
            <span>What You Get With This Project</span>
          </h2>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            Complete end-to-end package tailored for academic submission,
            presentation, demonstration, and college evaluation.
          </p>
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
        {deliverablesList.map((item: string) => (
          <div
            key={item}
            className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-xs"
          >
            {getDeliverableIcon(item)}

            <div className="flex-1">
              <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-slate-900">
                {item}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Assurance Footer Note */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-lime-500/10 p-4 ring-1 ring-lime-500/20">
        <ShieldCheck className="h-5 w-5 shrink-0 text-lime-700" />
        <p className="text-xs font-medium text-slate-700">
          All project files are verified for working code, plagiarism standards, and build readiness before delivery.
        </p>
      </div>
    </section>
  );
}

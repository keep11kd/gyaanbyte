"use client";

import { FolderSearch } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Project } from "../../types";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: readonly Project[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

export default function ProjectsGrid({
  projects,
  columns = 3,
  className,
}: ProjectsGridProps) {
  /* Empty State Fallback */
  if (!projects || projects.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/50 p-8 text-center transition-all">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 ring-1 ring-slate-200/60">
          <FolderSearch className="h-6 w-6 text-slate-600" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          No projects found
        </h3>
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500">
          We couldn&apos;t find any capstone projects matching your selected filters or search query. Try clearing or broadening your selection.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 transition-all duration-300",
        COLUMN_CLASSES[columns],
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

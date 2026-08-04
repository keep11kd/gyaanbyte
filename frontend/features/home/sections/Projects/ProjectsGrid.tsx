import { cn } from "@/lib/utils";

import type { Project } from "../../types";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: readonly Project[];
  limit?: number;
  className?: string;
}

export default function ProjectsGrid({
  projects,
  limit,
  className,
}: ProjectsGridProps) {
  const displayedProjects = limit
    ? projects.slice(0, limit)
    : projects;

  if (displayedProjects.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
        <p className="text-base font-medium text-slate-600">
          No projects found in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {displayedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}

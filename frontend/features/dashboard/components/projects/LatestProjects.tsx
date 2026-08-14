"use client";

import { ArrowRight } from "lucide-react";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import ProjectRow, { type ProjectStatus } from "./ProjectRow";

export interface Project {
  id: number | string;
  name: string;
  category: string;
  status: ProjectStatus;
  updatedAt: string;
}

interface LatestProjectsProps {
  projects: Project[];
  onViewAll?: () => void;
}

export default function LatestProjects({
  projects,
  onViewAll,
}: Readonly<LatestProjectsProps>) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-xs">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Latest Projects</h2>

          <p className="mt-1 text-xs text-slate-500">Recently updated projects</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-1 pt-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectRow
              key={project.id}
              name={project.name}
              category={project.category}
              status={project.status}
              updatedAt={project.updatedAt}
            />
          ))
        ) : (
          <div className="flex h-40 items-center justify-center text-sm text-slate-400">
            No projects found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

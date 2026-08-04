"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import type { Project } from "@/features/home/types";
import { projectsContent } from "@/features/home/data";
import ProjectsGrid from "@/features/home/sections/Projects/ProjectsGrid";

interface RelatedProjectsProps {
  currentProject: Project;
}

export default function RelatedProjects({
  currentProject,
}: RelatedProjectsProps) {
  const relatedProjects = useMemo(() => {
    const sameSubcategory = projectsContent.projects.filter(
      (project) =>
        project.id !== currentProject.id &&
        project.category === currentProject.category &&
        project.subcategory === currentProject.subcategory
    );

    const sameCategory = projectsContent.projects.filter(
      (project) =>
        project.id !== currentProject.id &&
        project.category === currentProject.category &&
        project.subcategory !== currentProject.subcategory
    );

    return [...sameSubcategory, ...sameCategory].slice(0, 3);
  }, [currentProject]);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200/80 py-16">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-600">
              <Sparkles className="h-4 w-4" />
              Recommended Projects
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Related Projects
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Explore more projects from{" "}
              <span className="font-semibold text-slate-900">
                {currentProject.category}
              </span>
              .
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/projects"
            className="hidden items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-lime-600 sm:inline-flex"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Related Projects */}
        <ProjectsGrid
          projects={relatedProjects}
          columns={3}
        />

        {/* Mobile CTA */}
        <div className="flex justify-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-lime-600"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

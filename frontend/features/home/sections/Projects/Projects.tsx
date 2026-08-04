"use client";

import { useMemo, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import SearchProjects from "./SearchProjects";
import CategoryFilter from "./CategoryFilter";
import ProjectsGrid from "./ProjectsGrid";
import ProjectsHeader from "./ProjectsHeader";

import type { ProjectCategory } from "../../types";
import { projectsContent } from "../../data";

interface ProjectsProps {
  className?: string;
  limit?: number;
}

const PROJECTS_PER_PAGE = 6;

export default function Projects({ className, limit }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered =
      selectedCategory === "All"
        ? projectsContent.projects
        : projectsContent.projects.filter(
            (project) => project.category === selectedCategory
          );

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();

      filtered = filtered.filter((project) => {
  return (
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query) ||
    project.subcategory?.toLowerCase().includes(query) ||
    project.academicBranches.some((branch) =>
      branch.toLowerCase().includes(query)
    ) ||
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(query)
    )
  );
});
    }

    // Homepage limit view filters featured projects only
    if (limit) {
      filtered = filtered.filter((project) => project.featured);
    }

    return filtered;
  }, [selectedCategory, searchTerm, limit]);

  const displayedProjects = limit
    ? filteredProjects.slice(0, limit)
    : filteredProjects.slice(0, visibleCount);

  const hasMoreProjects =
    !limit && displayedProjects.length < filteredProjects.length;

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  return (
    <section
      id="projects"
      className={cn(
        "relative overflow-hidden border-b border-slate-200/80 bg-white py-20 lg:py-28",
        className
      )}
    >
      {/* Visual Background Elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      >
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[140px]" />
        <div className="absolute -bottom-20 left-10 h-[350px] w-[500px] rounded-full bg-lime-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Container size="xl">
        {/* Header Section */}
        <ProjectsHeader />

        {/* Search Bar with Live Result Match Counter */}
        <SearchProjects
          value={searchTerm}
          resultCount={filteredProjects.length}
          onChange={(value) => {
            setSearchTerm(value);
            setVisibleCount(PROJECTS_PER_PAGE);
          }}
        />

        {/* Category Pills Filter */}
        <CategoryFilter
          className="mt-8"
          categories={projectsContent.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category as ProjectCategory | "All");
            setVisibleCount(PROJECTS_PER_PAGE);
          }}
        />

        {/* Main Grid or Empty State */}
        {displayedProjects.length > 0 ? (
          <ProjectsGrid className="mt-12 sm:mt-16" projects={displayedProjects} />
        ) : (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Sparkles className="h-6 w-6 text-lime-600" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900">
              No matching projects found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              We couldn&apos;t find any project matching &quot;{searchTerm}&quot; in{" "}
              {selectedCategory === "All" ? "any category" : selectedCategory}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-lime-400 shadow-md hover:bg-slate-800 transition-all active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination / Load More Button */}
        {hasMoreProjects && (
          <div className="mt-14 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => count + PROJECTS_PER_PAGE)
              }
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:bg-lime-600 hover:text-slate-950 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50"
            >
              <span>Load More Projects</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-lime-400 group-hover:bg-lime-700 group-hover:text-white transition-colors">
                +{filteredProjects.length - displayedProjects.length}
              </span>
            </button>
            <p className="text-xs text-slate-400 font-medium">
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

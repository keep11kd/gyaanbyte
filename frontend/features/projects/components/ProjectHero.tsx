"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Layers,
  Sparkles,
  Code2,
} from "lucide-react";

import type { Project } from "@/features/home/types";

interface ProjectHeroProps {
  project: Project & {
    academicBranches?: string[];
  };
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  // Gracefully handle either string[] or single string for academic branches
  const branchList = Array.isArray(project.academicBranches)
    ? project.academicBranches
    : project.academicBranches
    ? [project.academicBranches]
    : ["B.Tech / MCA / M.Tech"];

  return (
    <>
      {/* Breadcrumb Navigation Bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 rounded-lg px-2 py-1 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Capstone Projects</span>
        </Link>

        <span className="rounded-full border border-slate-200/90 bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-2xs">
          ID: {project.id}
        </span>
      </div>

      {/* Main Hero Card Container */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">

        {/* Badges Container */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Badge */}
          <span className="rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-lime-400">
            {project.category}
          </span>

          {/* IEEE Base Paper Badge */}
          {project.ieeePaperSupported && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/20 px-3.5 py-1 text-xs font-bold text-slate-900 ring-1 ring-lime-500/30">
              <Sparkles className="h-3.5 w-3.5 text-lime-600" />
              IEEE Base Paper Supported
            </span>
          )}

          {/* Academic Branch Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-700">
            <GraduationCap className="h-3.5 w-3.5 text-slate-500" />
            {branchList.join(" • ")}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {project.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {project.description}
        </p>

        {/* Image Preview Banner */}
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-inner group">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-slate-400">
              <div className="text-center">
                <Layers className="mx-auto h-12 w-12 text-lime-400" />
                <p className="mt-3 text-sm font-semibold text-slate-300">
                  Architecture & Flow Diagram Preview
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Technologies & Frameworks Chips */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Code2 className="h-4 w-4 text-lime-600" />
            Technologies & Tools
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

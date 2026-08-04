import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import type { Project } from "../../types/project.types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({
  project,
  className,
}: ProjectCardProps) {
  const {
    id,
    title,
    category,
    featured,
  isPopular,
  isNew,
    academicBranches,
    description,
    image,
    technologies,
    duration,
    ieeePaperSupported = false,
    deliverables,
    client,
  } = project;
  return (
    <Link
     href={`/request-project?project=${project.id}`}
      className={cn(
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.015] hover:border-lime-400/60 hover:shadow-[0_30px_80px_rgba(132,204,22,0.15)]",
        className
      )}
    >
      {/* Project Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay for Image Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

        {/* Top Badges (Category & IEEE Badge) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-start justify-between gap-2 pointer-events-none select-none">
  {/* Left Badges Group */}
  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
    {/* Category Badge */}
    {category && (
      <span className="inline-flex items-center rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-105">
        {category}
      </span>
    )}

    {/* Featured Badge */}
    {featured && (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-slate-950 shadow-md shadow-amber-400/20 transition-all duration-300 group-hover:scale-105">
        <span className="text-xs">⭐</span>
        <span>Featured</span>
      </span>
    )}

    {/* Popular Badge */}
    {isPopular && (
      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-105">
        <span className="text-xs">🔥</span>
        <span>Popular</span>
      </span>
    )}

    {/* New Badge */}
    {isNew && (
      <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white shadow-md shadow-sky-500/20">
        <span className="text-xs">✨</span>
        <span>New</span>
      </span>
    )}
  </div>

  {/* Right IEEE/Academic Paper Badge */}
  {client === "Student" && ieeePaperSupported && (
    <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-slate-950 shadow-md shadow-lime-400/30 ring-1 ring-lime-300 transition-all duration-300 group-hover:scale-105">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
      <span>IEEE</span>
    </span>
  )}
</div>

        {/* Bottom Image Overlay Info (Academic Branch & Duration) */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 font-medium">
         {academicBranches.length > 0 && (
  <div className="flex items-center gap-1 text-lime-400 font-semibold">
    <GraduationCap className="h-3.5 w-3.5" />

    <span className="truncate">
      {academicBranches.slice(0, 2).join(", ")}

      {academicBranches.length > 2 && " +"}
    </span>
  </div>
)}

          <div className="flex items-center gap-1 ml-auto text-slate-300">
            <Clock3 className="h-3.5 w-3.5 text-slate-400" />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-lime-600 sm:text-2xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {description}
        </p>

        {/* Technologies List */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-lime-200 group-hover:bg-lime-50"            >
              {tech}
            </span>
          ))}
        </div>

        {/* Optional Deliverables Summary */}
        {deliverables && deliverables.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 font-medium">
              {deliverables.slice(0, 4).map((item) => (
                <div key={item} className="flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="h-3.5 w-3.5 text-lime-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card Footer Call to Action */}
        <div className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-slate-900">
          <span className="transition-colors duration-300 group-hover:text-lime-600">
            Get This Project →
          </span>
          <div className="rounded-full bg-slate-100 p-2 text-slate-600 group-hover:bg-lime-500 group-hover:text-slate-950 transition-all duration-300 group-hover:scale-105">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

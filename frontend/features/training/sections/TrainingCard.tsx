"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  GraduationCap,
  Monitor,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { TrainingProgram } from "../types";

interface TrainingCardProps {
  training: TrainingProgram;
  className?: string;
}

function getLevelBadgeClasses(level: TrainingProgram["level"]) {
  switch (level) {
    case "Beginner":
      return "bg-emerald-500/90 text-emerald-50 border-emerald-400/40";
    case "Intermediate":
      return "bg-amber-500/90 text-amber-50 border-amber-400/40";
    case "Advanced":
      return "bg-rose-500/90 text-rose-50 border-rose-400/40";
    default:
      return "bg-slate-900/90 text-slate-100 border-slate-700/40";
  }
}

export default function TrainingCard({
  training,
  className,
}: TrainingCardProps) {
  // Defensive fallbacks to prevent runtime breaks
  const technologies = training.technologies || [];
  const displayedTechnologies = technologies.slice(0, 4);
  const remainingTechnologies = technologies.length - displayedTechnologies.length;

  return (
    <Link
      href={`/request?type=training&id=${training.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-lime-400/80 hover:shadow-2xl hover:shadow-lime-500/10",
        className
      )}
    >
      {/* Thumbnail Banner Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <Image
          src={training.image}
          alt={training.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
        />

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-slate-950/10 transition-opacity duration-300 group-hover:opacity-0" />

        {/* Top Floating Glass Badges */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
            <Sparkles className="h-3 w-3 text-lime-400" aria-hidden="true" />
            {training.category}
          </span>

          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md",
              getLevelBadgeClasses(training.level)
            )}
          >
            {training.level}
          </span>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta Info Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">
            <Clock3 className="h-3.5 w-3.5 text-lime-600" aria-hidden="true" />
            <span>{training.duration}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700">
            <Monitor className="h-3.5 w-3.5 text-lime-600" aria-hidden="true" />
            <span>{training.mode}</span>
          </div>
        </div>

        {/* Program Title */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-lime-600">
          {training.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {training.description}
        </p>

        {/* Learned Skills Section */}
        <div className="mt-6 pt-2">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <GraduationCap className="h-4 w-4 text-lime-600" aria-hidden="true" />
            <span>Skills You&apos;ll Learn</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {displayedTechnologies.map((technology, index) => (
              <span
                key={`${technology}-${index}`}
                className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors group-hover:border-slate-300"
              >
                {technology}
              </span>
            ))}

            {remainingTechnologies > 0 && (
              <span className="rounded-lg border border-lime-300/80 bg-lime-50 px-2.5 py-1 text-xs font-bold text-lime-800">
                +{remainingTechnologies} more
              </span>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover:text-lime-600">
              Request Training
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-lime-400 group-hover:text-slate-950 group-hover:shadow-md">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

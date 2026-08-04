import Link from "next/link";
import { Sparkles, ArrowRight, BookOpenCheck } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import { projectsContent } from "../../data/projects.data";

interface ProjectsHeaderProps {
  className?: string;
}

export default function ProjectsHeader({
  className,
}: ProjectsHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl text-center select-none",
        className
      )}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-700 transition-all duration-300 hover:border-lime-500/40 hover:bg-lime-500/15 sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-lime-600 animate-pulse" />
        <span className="tracking-tight">{projectsContent.badge.text}</span>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {projectsContent.heading.line1}{" "}
        <span className="block bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          {projectsContent.heading.highlight}
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {projectsContent.description}
      </p>



      {/* Primary & Secondary Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href={projectsContent.actions.primary.href}>
          <Button size="lg" className="group shadow-lg shadow-slate-950/10">
            <span>{projectsContent.actions.primary.label}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </Link>

        {projectsContent.actions.secondary && (
          <Link href={projectsContent.actions.secondary.href}>
            <Button variant="outline" size="lg" className="group border-slate-300 hover:bg-slate-50">
              <BookOpenCheck className="mr-2 h-4 w-4 text-lime-600 transition-transform duration-200 group-hover:scale-110" />
              <span>{projectsContent.actions.secondary.label}</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

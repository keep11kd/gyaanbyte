import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

import { servicesContent } from "../../data/services.data";

interface ServicesHeaderProps {
  className?: string;
}

export default function ServicesHeader({
  className,
}: ServicesHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl text-center select-none",
        className
      )}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-700 transition-all duration-300 hover:border-lime-500/40 hover:bg-lime-500/15 sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-lime-600" />

        <span className="tracking-tight">
          {servicesContent.badge.text}
        </span>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {servicesContent.heading.line1}

        <span className="block bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-600 bg-clip-text text-transparent">
          {servicesContent.heading.highlight}
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {servicesContent.description}
      </p>
    </div>
  );
}

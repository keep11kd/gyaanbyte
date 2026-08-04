import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  accent?: "lime" | "sky" | "orange" | "purple";
  className?: string;
}

const accentStyles = {
  lime: {
    icon: "bg-lime-500/10 text-lime-600 border-lime-500/20 group-hover:bg-lime-500 group-hover:text-slate-950",
    border: "hover:border-lime-500/50 hover:shadow-lime-500/10",
    textHover: "group-hover:text-lime-600",
    tag: "bg-lime-50 text-lime-700 border-lime-200/60",
    arrow: "group-hover:text-lime-600",
    topLine: "bg-gradient-to-r from-lime-500 via-emerald-400 to-transparent",
  },
  sky: {
    icon: "bg-sky-500/10 text-sky-600 border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white",
    border: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    textHover: "group-hover:text-sky-600",
    tag: "bg-sky-50 text-sky-700 border-sky-200/60",
    arrow: "group-hover:text-sky-600",
    topLine: "bg-gradient-to-r from-sky-500 via-blue-400 to-transparent",
  },
  orange: {
    icon: "bg-orange-500/10 text-orange-600 border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white",
    border: "hover:border-orange-500/50 hover:shadow-orange-500/10",
    textHover: "group-hover:text-orange-600",
    tag: "bg-orange-50 text-orange-700 border-orange-200/60",
    arrow: "group-hover:text-orange-600",
    topLine: "bg-gradient-to-r from-orange-500 via-amber-400 to-transparent",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-600 border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white",
    border: "hover:border-purple-500/50 hover:shadow-purple-500/10",
    textHover: "group-hover:text-purple-600",
    tag: "bg-purple-50 text-purple-700 border-purple-200/60",
    arrow: "group-hover:text-purple-600",
    topLine: "bg-gradient-to-r from-purple-500 via-indigo-400 to-transparent",
  },
};

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  accent = "lime",
  className,
}: ServiceCardProps) {
  const style = accentStyles[accent];

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl select-none",
        style.border,
        className
      )}
    >
      {/* Top Accent Gradient Border Glow on Hover */}
      <div
        className={cn(
          "absolute top-0 left-0 h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          style.topLine
        )}
      />

      {/* Header: Icon Container */}
      <div className="mb-6 flex items-center justify-between">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
            style.icon
          )}
        >
          {icon}
        </div>

        {/* Subtle Arrow Action Icon Top Right */}
        <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition-colors duration-300 group-hover:bg-slate-100">
          <ArrowUpRight className={cn("h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5", style.arrow)} />
        </div>
      </div>

      {/* Title */}
      <h3 className={cn("text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 sm:text-2xl", style.textHover)}>
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>

      {/* Feature Pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {features.map((feature) => (
          <span
            key={feature}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              style.tag
            )}
          >
            <CheckCircle2 className="h-3 w-3 shrink-0 opacity-70" />
            <span>{feature}</span>
          </span>
        ))}
      </div>

      {/* Card Footer Call to Action */}
      <div className="mt-auto flex items-center gap-2 pt-8 font-semibold text-slate-900">
        <span className={cn("text-sm transition-colors duration-300", style.textHover)}>
          Explore Program & Details
        </span>
        <span className={cn("transition-transform duration-300 group-hover:translate-x-1.5", style.arrow)}>
          →
        </span>
      </div>
    </Link>
  );
}

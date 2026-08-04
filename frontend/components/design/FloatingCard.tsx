import type { ReactNode } from "react";

interface FloatingCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tags?: string[];
  className?: string;
  accent?: "lime" | "sky" | "orange" | "purple";
}

const accentStyles = {
  lime: {
    icon: "border-lime-500/20 bg-lime-500/10 text-lime-400",
    tag: "border-lime-500/20 bg-lime-500/10 text-lime-300",
    border: "hover:border-lime-500/50 hover:shadow-lime-500/10",
    glow: "group-hover:bg-lime-500/10",
  },
  sky: {
    icon: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    tag: "border-sky-500/20 bg-sky-500/10 text-sky-300",
    border: "hover:border-sky-500/50 hover:shadow-sky-500/10",
    glow: "group-hover:bg-sky-500/10",
  },
  orange: {
    icon: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    tag: "border-orange-500/20 bg-orange-500/10 text-orange-300",
    border: "hover:border-orange-500/50 hover:shadow-orange-500/10",
    glow: "group-hover:bg-orange-500/10",
  },
  purple: {
    icon: "border-purple-500/20 bg-purple-500/10 text-purple-400",
    tag: "border-purple-500/20 bg-purple-500/10 text-purple-300",
    border: "hover:border-purple-500/50 hover:shadow-purple-500/10",
    glow: "group-hover:bg-purple-500/10",
  },
};

export default function FloatingCard({
  icon,
  title,
  description,
  tags,
  className = "",
  accent = "lime",
}: FloatingCardProps) {
  const style = accentStyles[accent];

  return (
    <div
      className={`group absolute z-30 w-64 rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${style.border} ${className}`}
    >
      {/* Background Soft Glow on Hover */}
      <div
        className={`pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 transition-opacity duration-300 ${style.glow}`}
      />

      {/* Card Header & Icon */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${style.icon} transition-transform duration-300 group-hover:scale-105`}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-tight text-white transition-colors group-hover:text-slate-100">
            {title}
          </h4>
        </div>
      </div>

      {/* Description */}
      <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
        {description}
      </p>

      {/* Tags Pill Container */}
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-2 py-0.5 text-[9px] font-medium transition-colors ${style.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

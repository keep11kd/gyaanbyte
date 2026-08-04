import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactNode;
}

export default function TechBadge({
  label,
  icon,
  className,
  ...props
}: TechBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md select-none",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 text-slate-500">{icon}</span>}
      <span>{label}</span>
    </div>
  );
}

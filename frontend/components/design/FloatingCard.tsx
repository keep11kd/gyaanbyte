import type { ReactNode } from "react";

interface FloatingCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function FloatingCard({
  icon,
  title,
  description,
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`absolute rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
        {icon}
      </div>

      <h4 className="text-sm font-semibold text-slate-900">
        {title}
      </h4>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

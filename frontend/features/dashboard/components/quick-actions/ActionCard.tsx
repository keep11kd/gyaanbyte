"use client";

import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export default function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
}: Readonly<ActionCardProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        transition-all
        duration-200
        hover:border-indigo-200
        hover:bg-indigo-50/40
        hover:shadow-xs
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500/20
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-indigo-50
          text-indigo-600
          transition-colors
          group-hover:bg-indigo-100
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}

"use client";

import { LucideIcon, ChevronRight } from "lucide-react";

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  onClick?: () => void;
}

interface QuickActionButtonProps {
  action: QuickActionItem;
}

export default function QuickActionButton({
  action,
}: Readonly<QuickActionButtonProps>) {
  const Icon = action.icon;

  return (
    <button
      type="button"
      onClick={action.onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-slate-100
        bg-slate-50/50
        p-3.5
        text-left
        transition-all
        duration-150
        hover:border-indigo-100
        hover:bg-indigo-50/40
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500/20
      "
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 border border-slate-100 shadow-2xs group-hover:scale-105 group-hover:text-indigo-700 transition-transform">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-xs font-bold text-slate-900 group-hover:text-indigo-950">
              {action.title}
            </h4>
            {action.badge && (
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                {action.badge}
              </span>
            )}
          </div>
          <p className="truncate text-[11px] text-slate-500 mt-0.5">
            {action.description}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" />
    </button>
  );
}

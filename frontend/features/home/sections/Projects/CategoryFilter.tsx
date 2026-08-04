"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "../../types";

export interface CategoryFilterProps {
  categories: readonly ProjectCategory[];
  selectedCategory: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter project categories"
      className={cn(
        "mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 select-none",
        className
      )}
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50",
              isActive
                ? "border-slate-900 bg-slate-900 text-lime-400 shadow-md shadow-slate-950/10"
                : "border-slate-200/90 bg-white text-slate-600 hover:border-lime-500/50 hover:bg-lime-50/50 hover:text-slate-900"
            )}
          >
            {/* Active Pill Indicator Glow */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-lime-400 blur-[2px]" />
            )}

            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
}

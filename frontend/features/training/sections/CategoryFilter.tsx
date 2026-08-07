"use client";

import { cn } from "@/lib/utils";
import type { TrainingCategory } from "../types";

export interface CategoryFilterProps {
  categories: readonly TrainingCategory[];
  selectedCategory: TrainingCategory;
  onCategoryChange: (category: TrainingCategory) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: CategoryFilterProps) {
  /* Handle Arrow Navigation across Category Tabs */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % categories.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    } else {
      return;
    }
    e.preventDefault();
    onCategoryChange(categories[nextIndex]);
  };

  return (
    <div
      role="tablist"
      aria-label="Filter training categories"
      className={cn(
        "mt-8 flex flex-wrap items-center justify-center gap-2 select-none sm:gap-2.5",
        className
      )}
    >
      {categories.map((category, index) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onCategoryChange(category)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "group relative flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 sm:text-sm",
              isActive
                ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-950/15"
                : "border-slate-200/90 bg-white text-slate-600 hover:border-lime-500/60 hover:bg-lime-50/40 hover:text-slate-900"
            )}
          >
            {/* Active Indicator Dot */}
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]"
                  : "bg-slate-300 opacity-0 group-hover:opacity-100"
              )}
            />

            <span>{category}</span>
          </button>
        );
      })}
    </div>
  );
}

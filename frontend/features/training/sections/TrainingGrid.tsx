"use client";

import { GraduationCap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

import type { TrainingProgram } from "../types";
import TrainingCard from "./TrainingCard";

interface TrainingGridProps {
  trainings: readonly TrainingProgram[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  onResetFilters?: () => void;
}

const COLUMN_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

export default function TrainingGrid({
  trainings,
  columns = 3,
  className,
  onResetFilters,
}: TrainingGridProps) {
  /* Empty State with Action Button */
  if (!trainings || trainings.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/50 p-8 text-center transition-all duration-300">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-200/80">
          <GraduationCap className="h-7 w-7 text-lime-600" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900">
          No training programs found
        </h3>

        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500">
          We couldn&apos;t find any training programs matching your selected
          filters or search query. Try clearing or broadening your selection.
        </p>

        {onResetFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5 text-lime-400" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 transition-all duration-300",
        COLUMN_CLASSES[columns],
        className
      )}
    >
      {trainings.map((training) => (
        <div
          key={training.id}
          className="transition-transform duration-300"
        >
          <TrainingCard training={training} />
        </div>
      ))}
    </div>
  );
}

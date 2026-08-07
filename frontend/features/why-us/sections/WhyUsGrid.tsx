"use client";

import { cn } from "@/lib/utils";
import type { WhyUsFeature } from "../types";
import WhyUsCard from "./WhyUsCard";

interface WhyUsGridProps {
  features: readonly WhyUsFeature[];
  className?: string;
  columns?: 2 | 3;
}

export default function WhyUsGrid({
  features,
  className,
  columns = 3,
}: WhyUsGridProps) {
  if (!features || features.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-slate-300 p-8 text-center">
        <p className="text-sm font-medium text-slate-500">
          No features available to display.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:gap-8",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {features.map((feature) => (
        <WhyUsCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
}

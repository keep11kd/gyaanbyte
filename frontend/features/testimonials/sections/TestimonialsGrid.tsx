"use client";

import { MessageSquareQuote } from "lucide-react";

import { cn } from "@/lib/utils";

import type { Testimonial } from "../types";
import TestimonialCard from "./TestimonialCard";

interface TestimonialsGridProps {
  testimonials: readonly Testimonial[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

export default function TestimonialsGrid({
  testimonials,
  columns = 3,
  className,
}: TestimonialsGridProps) {
  /* Empty State Handling */
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-slate-50/50 p-8 text-center backdrop-blur-xs">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-600">
          <MessageSquareQuote className="h-6 w-6" />
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-900">
          No Testimonials Available
        </h3>

        <p className="mt-1.5 max-w-sm text-sm text-slate-500 leading-relaxed">
          Student success stories and client feedback matching your criteria will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 items-stretch",
        COLUMN_CLASSES[columns],
        className
      )}
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          className="h-full animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <TestimonialCard testimonial={testimonial} className="h-full" />
        </div>
      ))}
    </div>
  );
}

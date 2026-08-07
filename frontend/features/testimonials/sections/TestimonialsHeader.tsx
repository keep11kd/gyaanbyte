"use client";

import Link from "next/link";
import { ArrowRight, MessageSquareQuote, Sparkles } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import type { TestimonialsContent } from "../types";

interface TestimonialsHeaderProps {
  content: TestimonialsContent;
  showActions?: boolean;
  className?: string;
}

export default function TestimonialsHeader({
  content,
  showActions = true,
  className,
}: TestimonialsHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl text-center select-none",
        className
      )}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-700 backdrop-blur-xs transition-all duration-300 hover:border-lime-500/40 hover:bg-lime-500/15 sm:text-sm">
        <Sparkles className="h-4 w-4 animate-pulse text-lime-600" />
        <span>{content.badge.text}</span>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        {content.heading.line1}{" "}
        <span className="inline bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {content.heading.highlight}
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {content.description}
      </p>

      {/* CTA Actions */}
      {showActions && content.actions && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {content.actions.primary && (
            <Link href={content.actions.primary.href}>
              <Button
                size="lg"
                className="group border-slate-900 bg-slate-900 shadow-lg shadow-slate-950/10 transition-all duration-300 hover:bg-slate-800"
              >
                <MessageSquareQuote className="mr-2 h-5 w-5 text-lime-400" />
                <span>{content.actions.primary.label}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          )}

          {content.actions.secondary && (
            <Link href={content.actions.secondary.href}>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-200 bg-white hover:bg-slate-50"
              >
                <span>{content.actions.secondary.label}</span>
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

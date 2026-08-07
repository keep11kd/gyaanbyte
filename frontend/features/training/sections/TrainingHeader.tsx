"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import type { TrainingContent } from "../types";

interface TrainingHeaderProps {
  content: TrainingContent;
  className?: string;
}

export default function TrainingHeader({
  content,
  className,
}: TrainingHeaderProps) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-4xl text-center select-none",
        className
      )}
    >
      {/* Decorative Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-lime-400/20 blur-3xl"
      />

      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-800 shadow-sm transition-all duration-300 hover:border-lime-500/50 hover:bg-lime-500/20 sm:text-sm">
        <Sparkles className="h-4 w-4 shrink-0 animate-pulse text-lime-600" />
        <span>{content.badge.text}</span>
      </div>

      {/* Main Heading */}
      <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
        {content.heading.line1}{" "}
        <span className="mt-1 block bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
          {content.heading.highlight}
        </span>
      </h2>

      {/* Hero Subtitle Description */}
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
        {content.description}
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {/* Primary Action */}
        <Link href={content.actions.primary.href}>
          <Button
            size="lg"
            className="group relative overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/15 transition-all duration-300 hover:bg-slate-800 hover:shadow-2xl active:scale-[0.98]"
          >
            <GraduationCap className="mr-2 h-5 w-5 text-lime-400 transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-semibold">{content.actions.primary.label}</span>
            <ArrowRight className="ml-2 h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
          </Button>
        </Link>

        {/* Optional Secondary Action */}
        {content.actions.secondary && (
          <Link href={content.actions.secondary.href}>
            <Button
              variant="outline"
              size="lg"
              className="group border-slate-300/80 bg-white shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
            >
              <BookOpen className="mr-2 h-4 w-4 text-lime-600 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-semibold text-slate-800">
                {content.actions.secondary.label}
              </span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

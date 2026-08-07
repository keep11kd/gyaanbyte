"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import type { WhyUsContent } from "../types";

interface WhyUsHeaderProps {
  content: WhyUsContent;
  showActions?: boolean;
  showStats?: boolean;
}

export default function WhyUsHeader({
  content,
  showActions = true,
  showStats = true,
}: WhyUsHeaderProps) {
  const { badge, heading, description, stats, actions } = content;

  // Resolve dynamic icon if provided in badge
  const DynamicIcon = badge.iconName
    ? (LucideIcons[badge.iconName as keyof typeof LucideIcons] as React.ElementType) || Sparkles
    : Sparkles;

  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-700 shadow-xs backdrop-blur-xs">
        <DynamicIcon className="h-3.5 w-3.5 text-lime-600 animate-pulse" />
        <span>{badge.text}</span>
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
        {heading.line1}{" "}
        <span className="bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {heading.highlight}
        </span>
        {heading.line2 && (
          <span className="block sm:inline sm:ml-2 text-slate-900">
            {heading.line2}
          </span>
        )}
      </h2>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {description}
      </p>

      {/* Optional Call to Action Buttons */}
      {showActions && actions?.primary && (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={actions.primary.href}>
            <Button
              size="lg"
              className="group border-slate-900 bg-slate-900 text-white shadow-md transition-all duration-300 hover:bg-slate-800"
            >
              <span>{actions.primary.label}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          {actions.secondary && (
            <Link href={actions.secondary.href} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                {actions.secondary.label}
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Stats Bar */}
      {showStats && stats && stats.length > 0 && (
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm sm:grid-cols-4 sm:gap-6 sm:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-lime-700 sm:text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-lime-600 shrink-0" />
                {stat.label}
              </span>
              {stat.description && (
                <span className="mt-0.5 text-[11px] text-slate-500 hidden sm:block">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

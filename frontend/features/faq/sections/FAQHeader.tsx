"use client";

import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { HelpCircle, ArrowRight } from "lucide-react";

import { Button } from "@/components/primitives/Button";
import type { FAQContent } from "../types";

interface FAQHeaderProps {
  content: FAQContent;
  showActions?: boolean;
}

export default function FAQHeader({ content, showActions = true }: FAQHeaderProps) {
  const { badge, heading, description, actions } = content;

  // Dynamically resolve icon if iconName is passed in data
  const DynamicIcon = badge.iconName
    ? (LucideIcons[badge.iconName as keyof typeof LucideIcons] as React.ElementType) || HelpCircle
    : HelpCircle;

  return (
    <div className="mx-auto max-w-3xl text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-xs font-semibold text-lime-700 shadow-xs backdrop-blur-xs">
        <DynamicIcon className="h-3.5 w-3.5 text-lime-600" />
        <span>{badge.text}</span>
      </div>

      {/* Heading */}
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {heading.line1}{" "}
        <span className="bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          {heading.highlight}
        </span>
        {heading.line2 && (
          <span className="block text-slate-900 sm:inline sm:ml-2">
            {heading.line2}
          </span>
        )}
      </h2>

      {/* Description */}
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        {description}
      </p>

      {/* Header Actions (Optional) */}
      {showActions && actions?.primary && (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={actions.primary.href}>
            <Button
              size="lg"
              className="group border-slate-900 bg-slate-900 shadow-md transition-all duration-300 hover:bg-slate-800 text-white"
            >
              <span>{actions.primary.label}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          {actions.secondary && (
            <Link href={actions.secondary.href}>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              >
                {actions.secondary.label}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

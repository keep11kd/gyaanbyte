"use client";

import * as LucideIcons from "lucide-react";
import { CheckCircle2, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { WhyUsFeature } from "../types";

interface WhyUsCardProps {
  feature: WhyUsFeature;
  className?: string;
}

// Accent color mapping for borders, backgrounds, and badges
const colorStyles = {
  lime: {
    borderHover: "hover:border-lime-500/50",
    iconBg: "bg-lime-500/10 text-lime-700",
    badge: "bg-lime-100 text-lime-800 border-lime-200/60",
    glow: "group-hover:shadow-lime-500/5",
    metricBg: "bg-lime-50 text-lime-800 border-lime-200/50",
  },
  emerald: {
    borderHover: "hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10 text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200/60",
    glow: "group-hover:shadow-emerald-500/5",
    metricBg: "bg-emerald-50 text-emerald-800 border-emerald-200/50",
  },
  teal: {
    borderHover: "hover:border-teal-500/50",
    iconBg: "bg-teal-500/10 text-teal-700",
    badge: "bg-teal-100 text-teal-800 border-teal-200/60",
    glow: "group-hover:shadow-teal-500/5",
    metricBg: "bg-teal-50 text-teal-800 border-teal-200/50",
  },
  sky: {
    borderHover: "hover:border-sky-500/50",
    iconBg: "bg-sky-500/10 text-sky-700",
    badge: "bg-sky-100 text-sky-800 border-sky-200/60",
    glow: "group-hover:shadow-sky-500/5",
    metricBg: "bg-sky-50 text-sky-800 border-sky-200/50",
  },
  indigo: {
    borderHover: "hover:border-indigo-500/50",
    iconBg: "bg-indigo-500/10 text-indigo-700",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-200/60",
    glow: "group-hover:shadow-indigo-500/5",
    metricBg: "bg-indigo-50 text-indigo-800 border-indigo-200/50",
  },
};

export default function WhyUsCard({ feature, className }: WhyUsCardProps) {
  const colorKey = feature.accentColor || "lime";
  const styles = colorStyles[colorKey];

  // Dynamic Lucide icon lookup with fallback
  const IconComponent =
    (LucideIcons[feature.iconName as keyof typeof LucideIcons] as React.ElementType) ||
    HelpCircle;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8",
        styles.borderHover,
        styles.glow,
        feature.featured && "ring-1 ring-slate-900/5",
        className
      )}
    >
      <div>
        {/* Header Row: Icon + Highlight Badge / Metric */}
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
              styles.iconBg
            )}
          >
            <IconComponent className="h-6 w-6" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {feature.highlightBadge && (
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
                  styles.badge
                )}
              >
                {feature.highlightBadge}
              </span>
            )}
            {feature.metric && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold",
                  styles.metricBg
                )}
              >
                <span className="font-extrabold">{feature.metric.value}</span>
                <span className="text-[10px] opacity-80">{feature.metric.label}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {feature.subtitle}
          </span>
          <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
            {feature.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {feature.description}
        </p>

        {/* Benefits List */}
        {feature.benefits && feature.benefits.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
            {feature.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-xs font-medium text-slate-700 sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-600" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

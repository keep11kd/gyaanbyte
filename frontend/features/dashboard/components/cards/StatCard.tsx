"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge, Card } from "@/components/ui";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | React.ReactNode;
  change: number | string;
  description: string;
  isPositive?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  description,
  isPositive,
  isLoading = false,
  className,
}: Readonly<StatCardProps>) {
  if (isLoading) {
    return (
      <Card className={`p-6 animate-pulse ${className ?? ""}`.trim()}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-3 w-20 rounded bg-slate-200" />
            <div className="h-8 w-28 rounded bg-slate-200" />
          </div>
          <div className="h-11 w-11 rounded-xl bg-slate-200" />
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="h-5 w-14 rounded-full bg-slate-200" />
          <div className="h-3 w-24 rounded bg-slate-200" />
        </div>
      </Card>
    );
  }

  const positive =
    isPositive !== undefined
      ? isPositive
      : typeof change === "number"
      ? change >= 0
      : !String(change).startsWith("-");

  const renderIcon = () => {
    if (React.isValidElement(Icon)) {
      return Icon;
    }
    if (typeof Icon === "function") {
      const IconComponent = Icon as LucideIcon;
      return <IconComponent className="h-5 w-5" />;
    }
    return Icon;
  };

  const renderChangeText = () => {
    if (typeof change === "number") {
      return `${Math.abs(change)}%`;
    }
    return change.replace(/^[-+]/, "");
  };

  const trendLabel = positive
    ? `Increased by ${renderChangeText()}`
    : `Decreased by ${renderChangeText()}`;

  return (
    <Card
      className={`
        p-6
        group
        relative
        overflow-hidden
        transition-all
        duration-300
        hover:border-indigo-200/80
        hover:shadow-lg
        hover:shadow-indigo-500/5
        ${className ?? ""}
      `.trim()}
    >
      {/* Ambient background accent glow on hover */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-50/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      {/* Header: Title, Value & Icon Badge */}
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-600 shadow-2xs transition-transform duration-300 group-hover:scale-105">
          {renderIcon()}
        </div>
      </div>

      {/* Footer: Trend Percentage Badge & Context Description */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100/80 pt-4 relative z-10">
        <Badge
          variant={positive ? "success" : "danger"}
          size="sm"
          className="gap-1 rounded-full px-2.5 py-0.5 font-semibold tracking-wide shadow-2xs shrink-0"
          aria-label={trendLabel}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 shrink-0" />
          )}
          <span>{renderChangeText()}</span>
        </Badge>

        <span
          className="text-xs font-medium text-slate-400 truncate max-w-[60%] hover:text-slate-600 transition-colors cursor-default"
          title={description}
        >
          {description}
        </span>
      </div>
    </Card>
  );
}

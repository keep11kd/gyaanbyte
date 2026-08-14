"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";

export interface DashboardHeaderAction {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: DashboardHeaderAction;
  className?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
  action,
  className,
}: Readonly<DashboardHeaderProps>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Button
          type="button"
          onClick={action.onClick}
          className="w-full sm:w-auto"
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </section>
  );
}

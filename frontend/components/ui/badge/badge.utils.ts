import { cn } from "@/lib/cn";
import type { BadgeSize, BadgeVariant } from "./badge.types";

export const badgeBase =
  "inline-flex items-center justify-center font-medium transition-colors select-none shrink-0";

export const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 border border-slate-200/80",

  primary: "bg-lime-400/20 text-lime-950 border border-lime-400/40",

  secondary: "bg-slate-800 text-white border border-slate-700",

  success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",

  warning: "bg-amber-50 text-amber-700 border border-amber-200/80",

  danger: "bg-red-50 text-red-700 border border-red-200/80",

  info: "bg-sky-50 text-sky-700 border border-sky-200/80",

  outline: "bg-transparent text-slate-700 border border-slate-300",
};

export const badgeDotColors: Record<BadgeVariant, string> = {
  default: "bg-slate-400",
  primary: "bg-lime-600",
  secondary: "bg-slate-200",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-sky-500",
  outline: "bg-slate-500",
};

export const badgeSizes: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-xs gap-1 rounded-md",
  md: "h-6 px-2.5 text-xs gap-1.5 rounded-lg",
  lg: "h-7 px-3 text-sm gap-1.5 rounded-xl",
};

interface GetBadgeClassesOptions {
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  className?: string;
}

export function getBadgeClasses({
  variant = "default",
  size = "md",
  pill = false,
  className,
}: GetBadgeClassesOptions = {}): string {
  return cn(
    badgeBase,
    badgeVariants[variant],
    badgeSizes[size],
    pill && "rounded-full px-3",
    className
  );
}

import { cn } from "@/lib/cn";
import type { SpinnerSize, SpinnerVariant } from "./spinner.types";

export const spinnerBase = "animate-spin shrink-0";

export const spinnerSizes: Record<SpinnerSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export const spinnerVariants: Record<SpinnerVariant, string> = {
  primary: "text-indigo-600",
  secondary: "text-slate-600",
  white: "text-white",
  slate: "text-slate-400",
  current: "text-current",
};

interface GetSpinnerClassesOptions {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
}

export function getSpinnerClasses({
  size = "md",
  variant = "primary",
  className,
}: GetSpinnerClassesOptions = {}): string {
  return cn(
    spinnerBase,
    spinnerSizes[size],
    spinnerVariants[variant],
    className
  );
}

import { cn } from "@/lib/cn";
import type { InputSize } from "./input.types";

export const inputBase =
  "w-full rounded-xl border bg-white text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60";

export const inputSizes: Record<InputSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export const inputDefaultState =
  "border-slate-200 hover:border-slate-300 focus:border-lime-500 focus:ring-4 focus:ring-lime-400/20";

export const inputErrorState =
  "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20";

interface GetInputClassesOptions {
  size?: InputSize;
  error?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  className?: string;
}

/**
 * Helper utility to compose class names for the Input element with support for icon offsets and error states.
 */
export function getInputClasses({
  size = "md",
  error = false,
  hasLeftIcon = false,
  hasRightIcon = false,
  className,
}: GetInputClassesOptions = {}): string {
  const leftIconPadding = {
    sm: "pl-9",
    md: "pl-10",
    lg: "pl-11",
  };

  const rightIconPadding = {
    sm: "pr-9",
    md: "pr-10",
    lg: "pr-11",
  };

  return cn(
    inputBase,
    inputSizes[size],
    error ? inputErrorState : inputDefaultState,
    hasLeftIcon && leftIconPadding[size],
    hasRightIcon && rightIconPadding[size],
    className
  );
}

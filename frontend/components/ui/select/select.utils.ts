import { cn } from "@/lib/cn";
import type { SelectSize } from "./select.types";

export const selectBase =
  "w-full appearance-none rounded-xl border text-sm transition-colors duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 bg-white cursor-pointer";

export const selectDefaultState =
  "border-slate-200 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 hover:border-slate-300";

export const selectErrorState =
  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20 text-red-900";

export const selectSizes: Record<SelectSize, string> = {
  sm: "h-8 pl-3 pr-8 text-xs",
  md: "h-10 pl-3.5 pr-10 text-sm",
  lg: "h-12 pl-4 pr-11 text-base",
};

interface GetSelectClassesOptions {
  size?: SelectSize;
  error?: boolean;
  className?: string;
}

export function getSelectClasses({
  size = "md",
  error = false,
  className,
}: GetSelectClassesOptions = {}): string {
  return cn(
    selectBase,
    selectSizes[size],
    error ? selectErrorState : selectDefaultState,
    className
  );
}

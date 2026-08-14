import { cn } from "@/lib/cn";
import type { TextareaResize, TextareaSize } from "./textarea.types";

export const textareaBase =
  "w-full rounded-xl border text-sm transition-colors duration-150 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-slate-400 text-slate-900 bg-white";

export const textareaDefaultState =
  "border-slate-200 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 hover:border-slate-300";

export const textareaErrorState =
  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20 text-red-900";

export const textareaSizes: Record<TextareaSize, string> = {
  sm: "p-2.5 text-xs min-h-[80px]",
  md: "p-3 text-sm min-h-[100px]",
  lg: "p-4 text-base min-h-[120px]",
};

export const textareaResize: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

interface GetTextareaClassesOptions {
  size?: TextareaSize;
  resize?: TextareaResize;
  error?: boolean;
  className?: string;
}

export function getTextareaClasses({
  size = "md",
  resize = "vertical",
  error = false,
  className,
}: GetTextareaClassesOptions = {}): string {
  return cn(
    textareaBase,
    textareaSizes[size],
    textareaResize[resize],
    error ? textareaErrorState : textareaDefaultState,
    className
  );
}

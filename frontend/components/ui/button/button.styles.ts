import type { ButtonSize, ButtonVariant } from "./button.types";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white shadow-2xs shadow-indigo-200 hover:bg-indigo-700 focus-visible:ring-indigo-500/30",

  secondary:
    "bg-slate-100 text-slate-900 border border-slate-200/80 hover:bg-slate-200/70 focus-visible:ring-slate-400/30",

  outline:
    "border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 focus-visible:ring-indigo-500/20",

  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 focus-visible:ring-slate-400/20",

  danger:
    "bg-red-600 text-white shadow-2xs shadow-red-200 hover:bg-red-700 focus-visible:ring-red-500/30",

  success:
    "bg-emerald-600 text-white shadow-2xs shadow-emerald-200 hover:bg-emerald-700 focus-visible:ring-emerald-500/30",

  subtle:
    "bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100/80 focus-visible:ring-indigo-500/20",
};

export const buttonSizes: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 text-xs gap-1.5 rounded-lg",

  sm: "h-9 px-3.5 text-xs gap-2 rounded-lg",

  md: "h-10 px-4 text-sm gap-2 rounded-xl",

  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",

  icon: "h-10 w-10 p-0 justify-center rounded-xl",

  "icon-sm": "h-8 w-8 p-0 justify-center rounded-lg",
};

export const buttonBase = `
  inline-flex
  items-center
  justify-center
  font-semibold
  whitespace-nowrap
  transition-all
  duration-150
  disabled:pointer-events-none
  disabled:opacity-50
  outline-none
  focus-visible:ring-2
  active:scale-[0.98]
`.trim();

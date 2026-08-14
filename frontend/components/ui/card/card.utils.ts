import type { CardVariant } from "./card.types";

export const cardVariants: Record<CardVariant, string> = {
  default:
    "border border-slate-200/80 bg-white shadow-2xs text-slate-900",

  elevated:
    "border border-slate-100 bg-white shadow-md shadow-slate-200/50 text-slate-900",

  outline:
    "border border-slate-200 bg-white text-slate-900",

  ghost:
    "border border-transparent bg-slate-50/60 text-slate-900",
};

export const cardBase =
  "rounded-2xl transition-all duration-200 overflow-hidden";

import { cn } from "@/lib/cn";
import type { AlertVariant } from "./alert.types";

export const alertBase =
  "relative flex w-full items-start gap-3.5 rounded-xl border p-4 text-sm transition-all";

export const alertVariants: Record<AlertVariant, string> = {
  default:
    "bg-slate-50 text-slate-800 border-slate-200/80 [&_svg]:text-slate-600",

  info: "bg-sky-50/80 text-sky-950 border-sky-200/80 [&_svg]:text-sky-600",

  success:
    "bg-emerald-50/80 text-emerald-950 border-emerald-200/80 [&_svg]:text-emerald-600",

  warning:
    "bg-amber-50/80 text-amber-950 border-amber-200/80 [&_svg]:text-amber-600",

  danger: "bg-red-50/80 text-red-950 border-red-200/80 [&_svg]:text-red-600",
};

interface GetAlertClassesOptions {
  variant?: AlertVariant;
  className?: string;
}

export function getAlertClasses({
  variant = "info",
  className,
}: GetAlertClassesOptions = {}): string {
  return cn(alertBase, alertVariants[variant], className);
}

import { cn } from "@/lib/cn";
import type { SkeletonAnimation, SkeletonVariant } from "./skeleton.types";

export const skeletonBase =
  "bg-slate-200/80 select-none pointer-events-none shrink-0";

export const skeletonVariants: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-md my-1",
  circular: "rounded-full",
  rectangular: "rounded-none",
  rounded: "rounded-xl",
};

export const skeletonAnimations: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  shimmer:
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
  none: "",
};

interface GetSkeletonClassesOptions {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  className?: string;
}

export function getSkeletonClasses({
  variant = "rounded",
  animation = "pulse",
  className,
}: GetSkeletonClassesOptions = {}): string {
  return cn(
    skeletonBase,
    skeletonVariants[variant],
    skeletonAnimations[animation],
    className
  );
}

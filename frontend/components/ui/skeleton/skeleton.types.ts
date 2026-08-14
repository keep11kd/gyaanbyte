import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "shimmer" | "none";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape preset for the skeleton */
  variant?: SkeletonVariant;

  /** Animation effect type */
  animation?: SkeletonAnimation;

  /** Width override (e.g., "100%", "120px", 48) */
  width?: string | number;

  /** Height override (e.g., "20px", "100%", 16) */
  height?: string | number;

  /** Render multiple stacked skeleton lines or elements */
  count?: number;

  /** Class name for the container wrapper when count > 1 */
  containerClassName?: string;
}

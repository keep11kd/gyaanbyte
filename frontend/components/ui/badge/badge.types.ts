import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge text or inner content */
  children?: ReactNode;

  /** Visual style variant */
  variant?: BadgeVariant;

  /** Size preset for padding, height, and font scale */
  size?: BadgeSize;

  /** Renders a small colored status dot on the left */
  dot?: boolean;

  /** Optional icon rendered on the left side */
  leftIcon?: ReactNode;

  /** Optional icon rendered on the right side */
  rightIcon?: ReactNode;

  /** Applies fully rounded pill styling (`rounded-full`) */
  pill?: boolean;
}

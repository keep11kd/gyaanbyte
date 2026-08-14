"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

import type { BadgeProps } from "./badge.types";
import {
  badgeBase,
  badgeDotColors,
  badgeSizes,
  badgeVariants,
} from "./badge.utils";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      dot = false,
      leftIcon,
      rightIcon,
      pill = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeBase,
          badgeVariants[variant],
          badgeSizes[size],
          pill && "rounded-full px-3",
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full shrink-0",
              badgeDotColors[variant] ?? "bg-slate-400"
            )}
            aria-hidden="true"
          />
        )}

        {leftIcon && (
          <span className="inline-flex shrink-0 [&>svg]:h-3 [&>svg]:w-3">
            {leftIcon}
          </span>
        )}

        {children && <span>{children}</span>}

        {rightIcon && (
          <span className="inline-flex shrink-0 [&>svg]:h-3 [&>svg]:w-3">
            {rightIcon}
          </span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

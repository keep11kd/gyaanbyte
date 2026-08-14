"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { SkeletonProps } from "./skeleton.types";
import { getSkeletonClasses } from "./skeleton.utils";

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "rounded",
      animation = "pulse",
      width,
      height,
      count = 1,
      containerClassName,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const inlineStyles = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      ...style,
    };

    const skeletonClasses = getSkeletonClasses({
      variant,
      animation,
      className,
    });

    if (count > 1) {
      return (
        <div
          className={cn("flex flex-col gap-2.5 w-full", containerClassName)}
          aria-hidden="true"
        >
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={skeletonClasses}
              style={inlineStyles}
              {...props}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={skeletonClasses}
        style={inlineStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;

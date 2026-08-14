"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

import { cardBase, cardVariants } from "./card.utils";
import type { CardProps } from "./card.types";

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardBase,
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

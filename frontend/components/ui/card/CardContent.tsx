"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

import type { CardSectionProps } from "./card.types";

const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export default CardContent;

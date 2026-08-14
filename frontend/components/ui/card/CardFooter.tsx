"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

import type { CardSectionProps } from "./card.types";

const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center border-t border-slate-100 p-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

export default CardFooter;

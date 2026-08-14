"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { CardSectionProps } from "./card.types";

const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5 border-b border-slate-100 p-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export default CardHeader;

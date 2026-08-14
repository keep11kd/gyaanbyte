"use client";

import { forwardRef } from "react";

import type { SpinnerProps } from "./spinner.types";
import { getSpinnerClasses } from "./spinner.utils";

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      size = "md",
      variant = "primary",
      label = "Loading...",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span className="inline-flex items-center justify-center">
        <svg
          ref={ref}
          role="status"
          aria-label={label}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={getSpinnerClasses({ size, variant, className })}
          {...props}
        >
          {/* Track Circle */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />

          {/* Spinner Arc */}
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {/* Accessible screen-reader text */}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;

"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

import type { InputProps } from "./input.types";
import { getInputClasses } from "./input.utils";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: customId,
      size = "md",
      label,
      helperText,
      error = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      containerClassName,
      labelClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth ? "w-full" : "w-auto inline-flex",
          containerClassName
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-xs font-semibold text-slate-700 select-none",
              disabled && "opacity-50 cursor-not-allowed",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <span className="absolute left-3.5 z-10 flex items-center justify-center text-slate-400 pointer-events-none shrink-0 [&>svg]:h-4 [&>svg]:w-4">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={getInputClasses({
              size,
              error: hasError,
              hasLeftIcon: Boolean(leftIcon),
              hasRightIcon: Boolean(rightIcon),
              className,
            })}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 z-10 flex items-center justify-center text-slate-400 pointer-events-none shrink-0 [&>svg]:h-4 [&>svg]:w-4">
              {rightIcon}
            </span>
          )}
        </div>

        {(errorMessage || helperText) && (
          <p
            className={cn(
              "text-xs leading-relaxed",
              hasError ? "text-red-500 font-medium" : "text-slate-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

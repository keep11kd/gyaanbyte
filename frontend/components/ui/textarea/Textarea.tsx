"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

import type { TextareaProps } from "./textarea.types";
import { getTextareaClasses } from "./textarea.utils";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id: customId,
      size = "md",
      resize = "vertical",
      label,
      helperText,
      error = false,
      fullWidth = true,
      className,
      containerClassName,
      labelClassName,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = customId || generatedId;
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
            htmlFor={textareaId}
            className={cn(
              "text-xs font-semibold text-slate-700 select-none",
              disabled && "opacity-50 cursor-not-allowed",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={getTextareaClasses({
            size,
            resize,
            error: hasError,
            className,
          })}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;

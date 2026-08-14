"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

import type { SelectProps } from "./select.types";
import { getSelectClasses } from "./select.utils";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id: customId,
      size = "md",
      label,
      helperText,
      error = false,
      fullWidth = true,
      options,
      placeholder,
      children,
      className,
      containerClassName,
      labelClassName,
      disabled,
      defaultValue,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = customId || generatedId;
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
            htmlFor={selectId}
            className={cn(
              "text-xs font-semibold text-slate-700 select-none",
              disabled && "opacity-50 cursor-not-allowed",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
            aria-invalid={hasError || undefined}
            className={getSelectClasses({
              size,
              error: hasError,
              className,
            })}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {options
              ? options.map((opt) => (
                  <option
                    key={String(opt.value)}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          {/* Custom Chevron Arrow Icon */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

Select.displayName = "Select";

export default Select;

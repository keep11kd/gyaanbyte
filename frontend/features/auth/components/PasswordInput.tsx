"use client";

import { forwardRef, useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text for the input field */
  label?: string;
  /** Validation error message string */
  error?: string;
  /** Supplementary helper text rendered below input when there is no error */
  helperText?: string;
  /** Custom left icon (defaults to Lucide Lock icon) */
  leftIcon?: LucideIcon | null;
  /** Hide the left icon completely */
  hideLeftIcon?: boolean;
  /** Custom wrapper container classes */
  containerClassName?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon = Lock,
      hideLeftIcon = false,
      containerClassName = "",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const autoId = useId();
    const inputId = id || autoId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Associate accessibility descriptors
    const describedBy = [
      error ? errorId : null,
      helperText && !error ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`space-y-1.5 ${containerClassName}`.trim()}>
        {/* Input Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-slate-200"
          >
            {label}
          </label>
        )}

        {/* Input Field Container */}
        <div className="group relative">
          {/* Left Icon */}
          {!hideLeftIcon && LeftIcon && (
            <LeftIcon
              className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
                error
                  ? "text-red-400"
                  : "text-slate-500 group-focus-within:text-lime-400"
              }`}
            />
          )}

          {/* Input Element */}
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy || undefined}
            className={`
              h-12 w-full rounded-xl border bg-slate-900/70 text-sm text-white placeholder:text-slate-500
              outline-none transition-all duration-200
              disabled:cursor-not-allowed disabled:opacity-50
              ${
                hideLeftIcon || !LeftIcon ? "pl-4" : "pl-12"
              }
              pr-12
              ${
                error
                  ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                  : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
              }
              ${className}
            `.trim()}
            {...props}
          />

          {/* Toggle Password Visibility Button */}
          <button
            type="button"
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/30 disabled:pointer-events-none"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5 shrink-0" />
            ) : (
              <Eye className="h-4.5 w-4.5 shrink-0" />
            )}
          </button>
        </div>

        {/* Validation Error / Helper Text */}
        {error ? (
          <p
            id={errorId}
            className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

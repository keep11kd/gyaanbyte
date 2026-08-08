"use client";

import { forwardRef, useId } from "react";
import { Check } from "lucide-react";

export interface RememberMeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Label text for the checkbox (defaults to "Remember me for 30 days") */
  label?: string;
  /** Controlled checked state */
  checked?: boolean;
  /** Controlled change handler */
  onChange?: (checked: boolean) => void;
  /** Validation error message */
  error?: string;
  /** Custom wrapper container classes */
  containerClassName?: string;
}

const RememberMe = forwardRef<HTMLInputElement, RememberMeProps>(
  (
    {
      label = "Remember me for 30 days",
      checked,
      onChange,
      error,
      containerClassName = "",
      className = "",
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className={`space-y-1 ${containerClassName}`.trim()}>
        <label
          htmlFor={inputId}
          className={`group inline-flex items-center gap-3 select-none ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Native Checkbox (Hidden for Custom Styling) */}
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={(e) => onChange?.(e.target.checked)}
              className="peer sr-only"
              {...props}
            />

            {/* Custom Checkbox Box */}
            <div
              className={`
                flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                bg-slate-900/80 transition-all duration-200
                peer-focus-visible:ring-2 peer-focus-visible:ring-lime-400/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950
                peer-checked:border-lime-400 peer-checked:bg-lime-400
                peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:opacity-100
                ${
                  error
                    ? "border-red-500/80"
                    : "border-slate-700 group-hover:border-slate-500 peer-checked:group-hover:border-lime-300"
                }
                ${className}
              `.trim()}
            >
              {/* Check Icon */}
              <Check className="h-3.5 w-3.5 scale-50 stroke-[3] text-slate-950 opacity-0 transition-all duration-200" />
            </div>
          </div>

          {/* Label Text */}
          {label && (
            <span className="text-sm font-medium text-slate-300 transition-colors duration-150 group-hover:text-white">
              {label}
            </span>
          )}
        </label>

        {/* Validation Error */}
        {error && (
          <p className="text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

RememberMe.displayName = "RememberMe";

export default RememberMe;

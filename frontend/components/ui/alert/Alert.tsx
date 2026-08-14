"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { AlertProps, AlertVariant } from "./alert.types";
import { getAlertClasses } from "./alert.utils";

const DEFAULT_ICONS: Record<AlertVariant, React.ReactNode> = {
  default: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  danger: (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      title,
      children,
      variant = "info",
      icon = true,
      onClose,
      action,
      className,
      ...props
    },
    ref
  ) => {
    const renderIcon = () => {
      if (icon === false) return null;
      if (typeof icon === "boolean" || icon === undefined) {
        return DEFAULT_ICONS[variant];
      }
      return icon;
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={getAlertClasses({ variant, className })}
        {...props}
      >
        {renderIcon() && <div className="mt-0.5 shrink-0">{renderIcon()}</div>}

        <div className="flex-1 space-y-1">
          {title && (
            <h5 className="font-semibold leading-none tracking-tight">
              {title}
            </h5>
          )}
          {children && (
            <div className="text-xs leading-relaxed opacity-90">
              {children}
            </div>
          )}
        </div>

        {action && <div className="shrink-0">{action}</div>}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
            aria-label="Close alert"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;

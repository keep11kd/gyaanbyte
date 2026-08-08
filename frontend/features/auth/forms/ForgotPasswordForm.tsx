"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import type { ForgotPasswordFormValues } from "../types";

export interface ForgotPasswordFormProps {
  /** Callback fired upon submitting valid password recovery email */
  onSubmit?: (values: ForgotPasswordFormValues) => Promise<void> | void;
  /** Global loading state for submit action */
  isLoading?: boolean;
  /** Top-level API server error message */
  serverError?: string | null;
  /** Top-level API success confirmation message */
  successMessage?: string | null;
  /** Custom wrapper container classes */
  className?: string;
}

export default function ForgotPasswordForm({
  onSubmit,
  isLoading = false,
  serverError = null,
  successMessage = null,
  className = "",
}: Readonly<ForgotPasswordFormProps>) {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  // Email Validation Handler
  const validateForm = (): boolean => {
    if (!email.trim()) {
      setFieldError("Email address is required.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError("Please enter a valid email address.");
      return false;
    }

    setFieldError(null);
    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit?.({ email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={`mt-8 space-y-6 ${className}`.trim()}>
      {/* Success Confirmation Alert */}
      {successMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-300 animate-in fade-in-50 duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <div className="space-y-1">
            <p className="font-semibold text-emerald-200">Reset link dispatched!</p>
            <p className="leading-relaxed text-emerald-300/90">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Top Server Error Alert Banner */}
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Registered Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
          Registered Email Address
        </label>

        <div className="group relative">
          <Mail
            className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
              fieldError ? "text-red-400" : "text-slate-500 group-focus-within:text-lime-400"
            }`}
          />

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            disabled={isLoading}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldError) setFieldError(null);
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className={`
              h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
              outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50
              ${
                fieldError
                  ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                  : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
              }
            `.trim()}
          />
        </div>

        {fieldError ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{fieldError}</span>
          </p>
        ) : (
          <p className="text-xs leading-5 text-slate-500">
            Enter the email associated with your account. We&apos;ll send a secure password reset link.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          group relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl
          bg-lime-400 text-sm font-bold text-slate-950 shadow-lg shadow-lime-950/30
          transition-all duration-200
          hover:bg-lime-300 hover:shadow-lime-400/20
          focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
          active:scale-[0.99]
          disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100
        "
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
            <span>Sending Reset Link...</span>
          </>
        ) : (
          <span>Send Reset Link</span>
        )}
      </button>

      {/* Navigation Link Back to Login */}
      <div className="pt-2">
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg py-1 text-sm font-medium text-slate-400 transition-colors hover:text-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </Link>
      </div>
    </form>
  );
}

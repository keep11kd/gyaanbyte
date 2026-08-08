"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Check, CheckCircle2, Loader2 } from "lucide-react";

import PasswordInput from "../components/PasswordInput";
import type { ResetPasswordFormValues } from "../types";

export interface ResetPasswordFormProps {
  /** The password reset token from the URL */
  token?: string;
  /** Callback fired upon submitting valid new password credentials */
  onSubmit?: (values: ResetPasswordFormValues) => Promise<void> | void;
  /** Global loading state for submit action */
  isLoading?: boolean;
  /** Top-level API server error message */
  serverError?: string | null;
  /** Top-level API success confirmation message */
  successMessage?: string | null;
  /** Flag indicating whether a valid reset token is present in URL */
  hasValidToken?: boolean;
  /** Custom wrapper container classes */
  className?: string;
}

export default function ResetPasswordForm({
  token = "",
  onSubmit,
  isLoading = false,
  serverError = null,
  successMessage = null,
  hasValidToken = true,
  className = "",
}: Readonly<ResetPasswordFormProps>) {
  // 1. Local state only tracks user inputs
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Real-time Password Complexity Checkers
  const requirements = [
    { id: "length", label: "Minimum 8 characters", valid: formData.password.length >= 8 },
    { id: "upper", label: "At least one uppercase letter", valid: /[A-Z]/.test(formData.password) },
    { id: "lower", label: "At least one lowercase letter", valid: /[a-z]/.test(formData.password) },
    { id: "number", label: "At least one number", valid: /[0-9]/.test(formData.password) },
    { id: "special", label: "At least one special character", valid: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  const isPasswordComplexityValid = requirements.every((req) => req.valid);

  // Validation Logic
  const validateForm = (): boolean => {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!formData.password) {
      errors.password = "New password is required.";
    } else if (!isPasswordComplexityValid) {
      errors.password = "Password does not meet all security requirements.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasValidToken) return;
    if (!validateForm()) return;

    // 2. Attach token on submission to satisfy ResetPasswordFormValues type
    await onSubmit?.({
      ...formData,
      token,
    });
  };

  const isFormDisabled = isLoading || !hasValidToken || Boolean(successMessage);

  return (
    <form onSubmit={handleSubmit} noValidate className={`mt-8 space-y-6 ${className}`.trim()}>
      {/* Success Banner */}
      {successMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-300 animate-in fade-in-50 duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <div className="space-y-1">
            <p className="font-semibold text-emerald-200">Password Reset Complete!</p>
            <p className="leading-relaxed text-emerald-300/90">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Invalid Token Alert Banner */}
      {!hasValidToken && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-medium text-amber-300 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-200">Invalid or Expired Link</p>
            <p className="leading-relaxed text-amber-300/90">
              This password reset link is invalid or has expired. Please request a new recovery link.
            </p>
          </div>
        </div>
      )}

      {/* Top Server Error Banner */}
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* New Password Field */}
      <PasswordInput
        label="New Password"
        name="password"
        value={formData.password}
        error={fieldErrors.password}
        disabled={isFormDisabled}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, password: e.target.value }));
          if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder="Create a strong password"
        autoComplete="new-password"
      />

      {/* Confirm Password Field */}
      <PasswordInput
        label="Confirm New Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        error={fieldErrors.confirmPassword}
        disabled={isFormDisabled}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
          if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        placeholder="Re-enter your new password"
        autoComplete="new-password"
      />

      {/* Real-time Interactive Password Requirements Checklist */}
      <div className="rounded-xl border border-lime-400/20 bg-lime-400/5 p-4 transition-all duration-200">
        <h4 className="text-sm font-semibold text-lime-400">
          Password Requirements
        </h4>

        <ul className="mt-3 space-y-2 text-xs leading-5">
          {requirements.map((req) => (
            <li
              key={req.id}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                req.valid ? "font-medium text-lime-300" : "text-slate-400"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] transition-all duration-200 ${
                  req.valid
                    ? "bg-lime-400/20 text-lime-400"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {req.valid ? <Check className="h-2.5 w-2.5 stroke-[3]" /> : "•"}
              </span>
              <span>{req.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isFormDisabled}
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
            <span>Updating Password...</span>
          </>
        ) : (
          <span>Update Password</span>
        )}
      </button>

      {/* Back to Login Link */}
      <div className="pt-1">
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, Mail } from "lucide-react";

import PasswordInput from "../components/PasswordInput";
import RememberMe from "../components/RememberMe";
import AuthDivider from "../components/AuthDivider";
import SocialLoginButtons from "../components/SocialLoginButtons";
import type { LoginFormValues, SocialProviderId } from "../types";

export interface LoginFormProps {
  /** Callback fired upon submitting valid form credentials */
  onSubmit?: (values: LoginFormValues) => Promise<void> | void;
  /** Callback fired when a social login button is clicked */
  onSocialLogin?: (providerId: SocialProviderId) => void;
  /** Global loading state for submit action */
  isLoading?: boolean;
  /** Active social provider ID currently processing authentication */
  loadingProviderId?: SocialProviderId | null;
  /** Top-level API server error message (e.g., "Invalid credentials") */
  serverError?: string | null;
  /** Custom wrapper container classes */
  className?: string;
}

export default function LoginForm({
  onSubmit,
  onSocialLogin,
  isLoading = false,
  loadingProviderId = null,
  serverError = null,
  className = "",
}: Readonly<LoginFormProps>) {
  // Form State
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});

  // Client-side Validation Handler
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof LoginFormValues, string>> = {};

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit?.(formData);
  };

  const isSubmitting = isLoading || Boolean(loadingProviderId);

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-5 ${className}`.trim()}>
      {/* Top Server Error Alert Banner */}
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
          Email Address
        </label>

        <div className="group relative">
          <Mail
            className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
              fieldErrors.email ? "text-red-400" : "text-slate-500 group-focus-within:text-lime-400"
            }`}
          />

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="name@example.com"
            autoComplete="email"
            className={`
              h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
              outline-none transition-all duration-200
              disabled:cursor-not-allowed disabled:opacity-50
              ${
                fieldErrors.email
                  ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                  : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
              }
            `.trim()}
          />
        </div>

        {fieldErrors.email && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{fieldErrors.email}</span>
          </p>
        )}
      </div>

      {/* Password Input */}
      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        error={fieldErrors.password}
        disabled={isSubmitting}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, password: e.target.value }));
          if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <RememberMe
          checked={formData.rememberMe}
          disabled={isSubmitting}
          onChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked }))}
        />

        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-lime-400 transition-colors duration-150 hover:text-lime-300 hover:underline underline-offset-4"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          group relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl
          bg-lime-400 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-lime-950/30
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
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Divider */}
      <AuthDivider />

      {/* Social Login Buttons */}
      <SocialLoginButtons
        disabled={isSubmitting}
        isLoading={isLoading}
        loadingProviderId={loadingProviderId}
        onSelectProvider={onSocialLogin}
      />
    </form>
  );
}

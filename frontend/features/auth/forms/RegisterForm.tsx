"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, Mail, Phone, User } from "lucide-react";

import PasswordInput from "../components/PasswordInput";
import AuthDivider from "../components/AuthDivider";
import SocialLoginButtons from "../components/SocialLoginButtons";
import type { RegisterFormValues, SocialProviderId } from "../types";

export interface RegisterFormProps {
  /** Callback fired upon submitting valid registration form credentials */
  onSubmit?: (values: RegisterFormValues) => Promise<void> | void;
  /** Callback fired when a social login button is clicked */
  onSocialLogin?: (providerId: SocialProviderId) => void;
  /** Global loading state for submit action */
  isLoading?: boolean;
  /** Active social provider ID currently processing authentication */
  loadingProviderId?: SocialProviderId | null;
  /** Top-level API server error message */
  serverError?: string | null;
  /** Custom wrapper container classes */
  className?: string;
}

export default function RegisterForm({
  onSubmit,
  onSocialLogin,
  isLoading = false,
  loadingProviderId = null,
  serverError = null,
  className = "",
}: Readonly<RegisterFormProps>) {
  // Form State initialized with acceptTerms
  const [formData, setFormData] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});

  // Form Validation Logic
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.phone && !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.termsAgreed) {
      errors.termsAgreed = "You must agree to the Terms and Privacy Policy.";
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
    <form onSubmit={handleSubmit} noValidate className={`mt-8 space-y-5 ${className}`.trim()}>
      {/* Top Server Error Alert Banner */}
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{serverError}</span>
        </div>
      )}

      {/* First Name & Last Name Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First Name */}
        <div className="space-y-1.5">
          <label htmlFor="firstName" className="block text-sm font-semibold text-slate-200">
            First Name
          </label>

          <div className="group relative">
            <User
              className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
                fieldErrors.firstName ? "text-red-400" : "text-slate-500 group-focus-within:text-lime-400"
              }`}
            />

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                if (fieldErrors.firstName) setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
              placeholder="First name"
              autoComplete="given-name"
              className={`
                h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
                outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  fieldErrors.firstName
                    ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                    : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
                }
              `.trim()}
            />
          </div>

          {fieldErrors.firstName && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.firstName}</span>
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label htmlFor="lastName" className="block text-sm font-semibold text-slate-200">
            Last Name
          </label>

          <div className="group relative">
            <User
              className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
                fieldErrors.lastName ? "text-red-400" : "text-slate-500 group-focus-within:text-lime-400"
              }`}
            />

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              disabled={isSubmitting}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                if (fieldErrors.lastName) setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
              placeholder="Last name"
              autoComplete="family-name"
              className={`
                h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
                outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50
                ${
                  fieldErrors.lastName
                    ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                    : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
                }
              `.trim()}
            />
          </div>

          {fieldErrors.lastName && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{fieldErrors.lastName}</span>
            </p>
          )}
        </div>
      </div>

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
            placeholder="you@example.com"
            autoComplete="email"
            className={`
              h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
              outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50
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

      {/* Mobile Phone Input */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-200">
          Mobile Number <span className="text-xs font-normal text-slate-400">(Optional)</span>
        </label>

        <div className="group relative">
          <Phone
            className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
              fieldErrors.phone ? "text-red-400" : "text-slate-500 group-focus-within:text-lime-400"
            }`}
          />

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, phone: e.target.value }));
              if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            placeholder="+91 9876543210"
            autoComplete="tel"
            className={`
              h-12 w-full rounded-xl border bg-slate-900/70 pl-12 pr-4 text-sm text-white placeholder:text-slate-500
              outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50
              ${
                fieldErrors.phone
                  ? "border-red-500/80 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                  : "border-slate-800 focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
              }
            `.trim()}
          />
        </div>

        {fieldErrors.phone && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{fieldErrors.phone}</span>
          </p>
        )}
      </div>

      {/* Password Inputs */}
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
        placeholder="Create a strong password (min 8 chars)"
        autoComplete="new-password"
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        error={fieldErrors.confirmPassword}
        disabled={isSubmitting}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
          if (fieldErrors.confirmPassword) setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        placeholder="Re-enter your password"
        autoComplete="new-password"
      />

      {/* Terms & Conditions Checkbox */}
      <div className="space-y-1.5 pt-1">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={formData.termsAgreed}
            disabled={isSubmitting}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }));
              if (fieldErrors.termsAgreed) setFieldErrors((prev) => ({ ...prev, acceptTerms: undefined }));
            }}
            className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-lime-400 focus:ring-lime-400/50 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          />

          <span className="text-sm leading-relaxed text-slate-400">
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-lime-400 underline-offset-4 hover:text-lime-300 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-lime-400 underline-offset-4 hover:text-lime-300 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        {fieldErrors.termsAgreed && (
          <p className="flex items-center gap-1.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{fieldErrors.termsAgreed}</span>
          </p>
        )}
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
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
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

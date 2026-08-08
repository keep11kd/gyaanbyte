"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MailCheck,
  RefreshCw,
} from "lucide-react";

export interface VerifyEmailFormProps {
  /** Targeted email address passed from search params or session */
  email?: string;
  /** Verification token extracted from URL parameter */
  token?: string | null;
  /** Loading state during automatic token verification execution */
  isVerifying?: boolean;
  /** Loading state for manual resend link request */
  isResending?: boolean;
  /** State indicating successful email verification */
  isVerified?: boolean;
  /** Server or API error message */
  serverError?: string | null;
  /** Success confirmation message */
  successMessage?: string | null;
  /** Callback handler for dispatching resend verification link requests */
  onResend?: (email?: string) => Promise<void> | void;
  /** Custom wrapper container classes */
  className?: string;
}

export default function VerifyEmailForm({
  email = "",
  token = null,
  isVerifying = false,
  isResending = false,
  isVerified = false,
  serverError = null,
  successMessage = null,
  onResend,
  className = "",
}: Readonly<VerifyEmailFormProps>) {
  // Resend Handler
  const handleResendClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await onResend?.(email);
  };

  // State 1: Active Token Verification in Progress
  if (isVerifying) {
    return (
      <div className={`mt-8 space-y-6 text-center ${className}`.trim()}>
        <div className="flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-lime-400/30 bg-lime-400/10 shadow-lg shadow-lime-400/10">
            <Loader2 className="h-10 w-10 animate-spin text-lime-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Verifying Your Email</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Please wait while we validate your verification token...
          </p>
        </div>
      </div>
    );
  }

  // State 2: Verification Succeeded
  if (isVerified) {
    return (
      <div className={`mt-8 space-y-6 text-center ${className}`.trim()}>
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-lg shadow-emerald-400/10">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Email Verified!</h3>
          <p className="text-sm leading-relaxed text-slate-300">
            {successMessage || "Your email address has been successfully verified. You can now access your account."}
          </p>
        </div>

        <Link
          href="/login"
          className="
            inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-lime-400 text-sm font-bold text-slate-950 shadow-lg shadow-lime-950/30
            transition-all duration-200 hover:bg-lime-300 hover:shadow-lime-400/20
            focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:ring-offset-2 focus:ring-offset-slate-950
            active:scale-[0.99]
          "
        >
          Proceed to Login
        </Link>
      </div>
    );
  }

  // State 3: Default Pending Inbox Check / Resend State
  return (
    <form onSubmit={handleResendClick} className={`mt-8 space-y-6 ${className}`.trim()}>
      {/* Success Notification Alert */}
      {successMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-300 animate-in fade-in-50 duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <div className="space-y-1 text-left">
            <p className="font-semibold text-emerald-200">Email Dispatched</p>
            <p className="leading-relaxed text-emerald-300/90">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Top Server Error Alert Banner */}
      {serverError && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-400 animate-in fade-in-50 duration-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span className="text-left">{serverError}</span>
        </div>
      )}

      {/* Main Header Visual */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lime-400/20 bg-lime-400/10 shadow-lg shadow-lime-400/5">
          <MailCheck className="h-10 w-10 text-lime-400" />
        </div>
      </div>

      {/* Information Header */}
      <div className="space-y-3 text-center">
        <h3 className="text-xl font-bold text-white">Check Your Inbox</h3>

        <p className="text-sm leading-relaxed text-slate-400">
          We&apos;ve sent a verification email to{" "}
          {email ? (
            <span className="font-semibold text-lime-400 underline decoration-lime-400/40 underline-offset-4">
              {email}
            </span>
          ) : (
            "your registered email address"
          )}
          . Click the link inside to activate your GyaanByte account.
        </p>
      </div>

      {/* Troubleshooting Tips Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4.5 backdrop-blur-sm">
        <p className="text-sm font-semibold text-slate-300">
          Didn&apos;t receive the email?
        </p>

        <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400/60 shrink-0" />
            <span>Check your Spam or Junk mail folders.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400/60 shrink-0" />
            <span>Verify that you registered with the correct email.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400/60 shrink-0" />
            <span>Allow a few minutes before requesting another link.</span>
          </li>
        </ul>
      </div>

      {/* Resend Action Button */}
      <button
        type="submit"
        disabled={isResending}
        className="
          inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl
          border border-lime-400/30 bg-lime-400/10 text-sm font-semibold text-lime-400
          transition-all duration-200
          hover:border-lime-400/50 hover:bg-lime-400/20 hover:shadow-lg hover:shadow-lime-400/10
          focus:outline-none focus:ring-2 focus:ring-lime-400/40 focus:ring-offset-2 focus:ring-offset-slate-950
          active:scale-[0.99]
          disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
        "
      >
        {isResending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-lime-400" />
            <span>Resending Email...</span>
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 text-lime-400" />
            <span>Resend Verification Email</span>
          </>
        )}
      </button>

      {/* Back to Login Navigation Link */}
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

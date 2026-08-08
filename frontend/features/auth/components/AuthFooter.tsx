"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { authBrand } from "../data";
import type { AuthPageContent } from "../types";

export interface AuthFooterProps {
  /** Optional alternate action object directly from AuthPageContent */
  alternateAction?: AuthPageContent["alternateAction"];
  /** Direct prompt/question override (e.g., "Don't have an account?") */
  question?: string;
  /** Direct action link label override (e.g., "Create an account") */
  actionLabel?: string;
  /** Direct action target link override (e.g., "/register") */
  actionHref?: string;
  /** Render a "Back to Sign In" link for recovery/verification flows */
  showBackToLogin?: boolean;
  /** Target link for back action (defaults to "/login") */
  backToLoginHref?: string;
  /** Toggle legal terms & privacy policy display (defaults to true) */
  showTerms?: boolean;
  /** Toggle copyright notice display (defaults to true) */
  showCopyright?: boolean;
  /** Optional custom container class overrides */
  className?: string;
}

export default function AuthFooter({
  alternateAction,
  question: questionProp,
  actionLabel: actionLabelProp,
  actionHref: actionHrefProp,
  showBackToLogin = false,
  backToLoginHref = "/login",
  showTerms = true,
  showCopyright = true,
  className = "",
}: Readonly<AuthFooterProps>) {
  // Priority given to individual props, falling back to the alternateAction object
  const prompt = questionProp ?? alternateAction?.prompt;
  const label = actionLabelProp ?? alternateAction?.label;
  const href = actionHrefProp ?? alternateAction?.href;

  return (
    <div
      className={`space-y-5 border-t border-slate-800/80 pt-6 ${className}`.trim()}
    >
      {/* Primary Alternate Action (e.g. Switch between Login / Register) */}
      {prompt && label && href && (
        <div className="text-center text-sm text-slate-400">
          <span>{prompt} </span>
          <Link
            href={href}
            className="font-semibold text-lime-400 transition-colors duration-200 hover:text-lime-300 hover:underline underline-offset-4"
          >
            {label}
          </Link>
        </div>
      )}

      {/* Back to Login Link (Password Recovery, Verify Email, etc.) */}
      {showBackToLogin && (
        <div className="text-center">
          <Link
            href={backToLoginHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 text-lime-400 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      )}

      {/* Legal & Copyright Section */}
      {(showTerms || showCopyright) && (
        <div className="space-y-2 text-center text-xs">
          {showTerms && (
            <p className="text-slate-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium text-slate-400 underline underline-offset-2 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-slate-400 underline underline-offset-2 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              .
            </p>
          )}

          {showCopyright && (
            <p className="text-slate-600 font-normal">
              {authBrand.copyright}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

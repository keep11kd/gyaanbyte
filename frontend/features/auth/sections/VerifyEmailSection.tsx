"use client";

import AuthCard from "../components/AuthCard";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import VerifyEmailForm from "../forms/VerifyEmailForm";
import { authBrand, authFeatures, verifyEmailContent } from "../data";

export interface VerifyEmailSectionProps {
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

export default function VerifyEmailSection({
  email = "",
  token = null,
  isVerifying = false,
  isResending = false,
  isVerified = false,
  serverError = null,
  successMessage = null,
  onResend,
  className = "",
}: Readonly<VerifyEmailSectionProps>) {
  return (
    <section className={`relative min-h-screen overflow-hidden bg-slate-950 ${className}`.trim()}>
      {/* Ambient Lighting Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[140px]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side: Brand Marketing & Feature Highlights */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              {/* Brand Tagline Badge */}
              <span className="inline-flex items-center rounded-full border border-lime-400/25 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lime-400 shadow-sm backdrop-blur-md">
                {authBrand.tagline}
              </span>

              {/* Main Headline */}
              <h1 className="mt-8 text-5xl font-black tracking-tight text-white xl:text-6xl">
                Verify Your
                <br />
                <span className="bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                  Email Address
                </span>
              </h1>

              {/* Sub-headline / Description */}
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                One final step before you begin. Verify your email address to
                activate your account and unlock the complete GyaanByte platform.
              </p>

              {/* Feature Highlights List */}
              <div className="mt-10 grid gap-4">
                {authFeatures.slice(0, 4).map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.id}
                      className="group relative flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-slate-950/50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 text-lime-400 transition-transform duration-300 group-hover:scale-105 group-hover:bg-lime-400/20">
                        {Icon && <Icon className="h-6 w-6 shrink-0" />}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white transition-colors duration-150 group-hover:text-lime-300">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-sm leading-relaxed text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Auth Card & Verification Form */}
          <div className="mx-auto w-full max-w-lg">
            <AuthCard>
              <AuthHeader content={verifyEmailContent} />

              <VerifyEmailForm
                email={email}
                token={token}
                isVerifying={isVerifying}
                isResending={isResending}
                isVerified={isVerified}
                serverError={serverError}
                successMessage={successMessage}
                onResend={onResend}
              />

              <div className="mt-8">
                <AuthFooter
                  question="Already verified?"
                  actionLabel="Sign In"
                  actionHref="/login"
                />
              </div>
            </AuthCard>
          </div>
        </div>
      </div>
    </section>
  );
}

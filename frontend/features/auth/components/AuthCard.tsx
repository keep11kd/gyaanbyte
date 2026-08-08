"use client";

import type { ReactNode } from "react";

export interface AuthCardProps {
  /** Card body contents */
  children: ReactNode;
  /** Custom wrapper container classes */
  className?: string;
  /** Custom inner container padding or layout classes */
  innerClassName?: string;
  /** Enable top gradient accent border (defaults to true) */
  showAccent?: boolean;
  /** Custom gradient classes for top accent line */
  accentGradient?: string;
  /** Enable background ambient glow blobs (defaults to true) */
  glow?: boolean;
  /** Visual variant styling options */
  variant?: "glass" | "solid" | "bordered";
}

const variantStyles: Record<NonNullable<AuthCardProps["variant"]>, string> = {
  glass:
    "border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-black/40",
  solid:
    "border-slate-800 bg-slate-900 shadow-xl shadow-black/50",
  bordered:
    "border-lime-500/20 bg-slate-950/80 backdrop-blur-md shadow-2xl shadow-lime-950/20",
};

export default function AuthCard({
  children,
  className = "",
  innerClassName = "p-6 sm:p-8 md:p-10",
  showAccent = true,
  accentGradient = "from-lime-400 via-emerald-400 to-cyan-400",
  glow = true,
  variant = "glass",
}: Readonly<AuthCardProps>) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-3xl border
        transition-all duration-300
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {/* Top Accent Gradient Bar */}
      {showAccent && (
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accentGradient}`}
        />
      )}

      {/* Decorative Background Glow Blobs */}
      {glow && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-75"
          />
        </>
      )}

      {/* Card Content Container */}
      <div className={`relative z-10 ${innerClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}

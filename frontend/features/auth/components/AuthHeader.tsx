"use client";

import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import type { AuthPageContent } from "../types";

export interface AuthHeaderProps {
  /** Optional content object containing badge, title, and description */
  content?: AuthPageContent;
  /** Direct title override */
  title?: string;
  /** Direct badge override */
  badge?: string;
  /** Direct description override */
  description?: string;
  /** Custom badge icon (defaults to Sparkles) */
  icon?: LucideIcon;
  /** Optional container class name overrides */
  className?: string;
  /** Enable optional subtle gradient text effect on the title */
  gradientTitle?: boolean;
}

export default function AuthHeader({
  content,
  title: titleProp,
  badge: badgeProp,
  description: descriptionProp,
  icon: Icon = Sparkles,
  className = "",
  gradientTitle = false,
}: Readonly<AuthHeaderProps>) {
  // Extract values with priority given to individual props over the content object
  const badge = badgeProp ?? content?.badge;
  const title = titleProp ?? content?.title;
  const description = descriptionProp ?? content?.description;

  return (
    <div className={`text-center ${className}`.trim()}>
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/25 bg-lime-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime-400 shadow-sm shadow-lime-950/50 backdrop-blur-md transition-all">
          <Icon className="h-3.5 w-3.5 text-lime-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* Heading */}
      {title && (
        <h1
          className={`mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl ${
            gradientTitle
              ? "bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
              : ""
          }`}
        >
          {title}
        </h1>
      )}

      {/* Description */}
      {description && (
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

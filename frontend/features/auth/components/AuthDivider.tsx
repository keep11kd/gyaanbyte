"use client";

export interface AuthDividerProps {
  /** Text to render inside the divider pill (defaults to "or continue with") */
  text?: string;
  /** Custom wrapper container class overrides */
  className?: string;
  /** Custom class overrides for the divider text pill */
  pillClassName?: string;
  /** Custom class overrides for the horizontal gradient lines */
  lineClassName?: string;
}

export default function AuthDivider({
  text = "or continue with",
  className = "",
  pillClassName = "",
  lineClassName = "",
}: Readonly<AuthDividerProps>) {
  return (
    <div
      role="separator"
      aria-label={text || "divider"}
      className={`relative flex items-center justify-center py-2 ${className}`.trim()}
    >
      {/* Left Gradient Line */}
      <div
        className={`h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-700 ${lineClassName}`.trim()}
      />

      {/* Center Text Pill */}
      {text && (
        <span
          className={`
            mx-3 shrink-0 rounded-full border border-slate-800/80
            bg-slate-900/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest
            text-slate-400 shadow-sm backdrop-blur-md
            ${pillClassName}
          `.trim()}
        >
          {text}
        </span>
      )}

      {/* Right Gradient Line */}
      <div
        className={`h-px flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-700 ${lineClassName}`.trim()}
      />
    </div>
  );
}

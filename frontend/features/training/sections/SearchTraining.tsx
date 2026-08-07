"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  X,
  Command,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface SearchTrainingProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  placeholder?: string;
  className?: string;
}

const POPULAR_KEYWORDS = [
  "Java",
  "Python",
  "AI",
  "Cyber Security",
  "React",
  "Docker",
  "Cloud",
];

export default function SearchTraining({
  value,
  onChange,
  resultCount,
  placeholder = "Search training programs, technologies or skills (e.g. Java, React, AI, Docker...)",
  className,
}: SearchTrainingProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  /* Detect OS safely on initial client evaluation without extra render cycles */
  const [isMac] = useState(() => {
    if (typeof window === "undefined") return false;
    const platform = navigator.userAgent || navigator.platform || "";
    return /Mac|iPod|iPhone|iPad/i.test(platform);
  });

  /* Keyboard Shortcuts (⌘K / Ctrl+K or /) */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input/textarea
      const targetTag = (e.target as HTMLElement)?.tagName;
      const isInput = targetTag === "INPUT" || targetTag === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto mt-8 max-w-2xl select-none",
        className
      )}
    >
      <div className="group relative">
        {/* Ambient Gradient Glow on Focus */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-500/40 via-emerald-500/30 to-teal-500/40 opacity-0 blur-lg transition-all duration-500 group-focus-within:opacity-100" />

        {/* Main Search Input Card */}
        <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white/90 p-1.5 shadow-sm backdrop-blur-xl transition-all duration-300 group-focus-within:border-lime-500/60 group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:shadow-lime-500/5">
          {/* Search Icon */}
          <div className="flex items-center justify-center pl-3.5 pr-2 text-slate-400 transition-colors duration-300 group-focus-within:text-lime-600">
            <Search className="h-5 w-5" />
          </div>

          {/* Input Box */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent py-2.5 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
          />

          {/* Right Action / Shortcut Badge */}
          <div className="flex items-center gap-2 pr-2">
            {value && typeof resultCount === "number" ? (
              <span className="hidden items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 sm:inline-flex">
                <Sparkles className="h-3 w-3 text-lime-600" />
                {resultCount} {resultCount === 1 ? "program" : "programs"}
              </span>
            ) : (
              <div className="hidden items-center gap-1 rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-400 sm:flex">
                {isMac ? (
                  <Command className="h-3 w-3 text-slate-500" />
                ) : (
                  <span className="text-[10px]">CTRL</span>
                )}
                <span>K</span>
              </div>
            )}

            {/* Clear Input Button */}
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  inputRef.current?.focus();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900 active:scale-90"
                aria-label="Clear search query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Search Chips */}
      {!value && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-400">
            <SlidersHorizontal className="h-3 w-3 text-lime-600" />
            Popular searches:
          </span>

          {POPULAR_KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => onChange(keyword)}
              className="rounded-full border border-slate-200/60 bg-slate-100/80 px-2.5 py-0.5 font-semibold text-slate-600 transition-all duration-200 hover:border-lime-300 hover:bg-lime-50 hover:text-lime-700 active:scale-95"
            >
              +{keyword}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

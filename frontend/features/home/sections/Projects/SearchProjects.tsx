"use client";

import { useEffect, useRef } from "react";
import { Search, X, Command, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchProjectsProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  placeholder?: string;
  className?: string;
}

export default function SearchProjects({
  value,
  onChange,
  resultCount,
  placeholder = "Search projects, IEEE base papers, stacks (e.g. ESP32, React, RAG)...",
  className,
}: SearchProjectsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Shortcut (⌘K or /) to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={cn("mx-auto mt-8 max-w-2xl select-none", className)}>
      <div className="relative group">
        {/* Glow Halo behind search input on focus */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-500/30 via-emerald-500/20 to-sky-500/30 opacity-0 blur-md transition duration-300 group-focus-within:opacity-100" />

        {/* Main Search Input Container */}
        <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white/90 p-1.5 shadow-sm transition-all duration-300 backdrop-blur-xl group-focus-within:border-slate-900 group-focus-within:bg-white group-focus-within:shadow-xl">

          {/* Search Icon */}
          <div className="flex items-center justify-center pl-3.5 pr-2 text-slate-400 group-focus-within:text-lime-600 transition-colors">
            <Search className="h-5 w-5" />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent py-2.5 pr-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none"
          />

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 pr-2">
            {/* Live Filter Result Count Badge */}
            {value && typeof resultCount === "number" && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {resultCount} {resultCount === 1 ? "match" : "matches"}
              </span>
            )}

            {/* Clear Button */}
            {value ? (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  inputRef.current?.focus();
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                aria-label="Clear search query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              /* Shortcut Badge (⌘K) */
              <div className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200/80 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-400">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helper Tech Tags below search input */}
      {!value && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-400">
            <SlidersHorizontal className="h-3 w-3" /> Quick keywords:
          </span>
          {["IEEE Papers", "Spring Boot", "ESP32", "Python RAG", "IoT", "Next.js"].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onChange(tag)}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600 hover:bg-lime-500/10 hover:text-lime-700 transition-colors"
            >
              +{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg">
      {/* Search Icon */}
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

      {/* Input Field */}
      <input
        type="search"
        placeholder="Search courses, projects, students..."
        className="
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-slate-50/80
          pl-10
          pr-12
          text-sm
          text-slate-900
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-indigo-500
          focus:bg-white
          focus:ring-4
          focus:ring-indigo-500/10
        "
      />

      {/* Keyboard Shortcut Indicator */}
      <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-2xs sm:flex">
        <span>⌘</span>K
      </div>
    </div>
  );
}

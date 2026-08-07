"use client";

import { Search, X } from "lucide-react";

interface FAQSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function FAQSearch({
  value,
  onChange,
  placeholder = "Search questions, keywords, or topics...",
}: FAQSearchProps) {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-lime-600" />

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200/80 bg-white py-3.5 pl-12 pr-10 text-sm font-medium text-slate-900 shadow-xs outline-none transition-all placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-4 focus:ring-lime-500/10"
      />

      {/* Clear Search Button */}
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

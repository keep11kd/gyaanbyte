"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ExternalLink,
  ThumbsUp,
  Tag,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import type { FAQ } from "../types";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  const [likes, setLikes] = useState<number>(faq.helpfulCount ?? 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const handleHelpfulClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300",
        isOpen
          ? "border-lime-500/40 bg-white shadow-md shadow-lime-500/5 ring-1 ring-lime-500/20"
          : "border-slate-200/80 bg-white shadow-xs hover:border-slate-300"
      )}
    >
      {/* Header / Question Button */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-5 text-left transition-colors focus:outline-none sm:p-6"
        aria-expanded={isOpen}
      >
        <div className="pr-4">
          <span className="text-base font-semibold text-slate-900 sm:text-lg">
            {faq.question}
          </span>

          {/* Category Chip (Shown when collapsed) */}
          {!isOpen && (
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {faq.category}
              </span>
            </div>
          )}
        </div>

        {/* Chevron Icon */}
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300",
            isOpen && "rotate-180 bg-lime-500/10 text-lime-700"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      {/* Expanded Accordion Body */}
      {isOpen && (
        <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
          {/* Answer Text */}
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {faq.answer}
          </p>

          {/* Action Link Button (if available) */}
          {faq.actionLink && (
            <div className="mt-4">
              <Link href={faq.actionLink.href}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-lime-600/30 bg-lime-50 text-lime-800 hover:bg-lime-100/80"
                >
                  <span>{faq.actionLink.label}</span>
                  {faq.actionLink.isExternal ? (
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  )}
                </Button>
              </Link>
            </div>
          )}

          {/* Tag Badges */}
          {faq.tags && faq.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer Metadata & Helpful Upvote Counter */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100/80 pt-4 text-xs font-medium text-slate-500">
            {faq.updatedAt && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                Updated: {faq.updatedAt}
              </span>
            )}

            <button
              type="button"
              onClick={handleHelpfulClick}
              className={cn(
                "ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                hasLiked
                  ? "border-lime-500/40 bg-lime-50 text-lime-700"
                  : "border-slate-200/80 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
              )}
            >
              <ThumbsUp
                className={cn(
                  "h-3.5 w-3.5",
                  hasLiked && "fill-lime-600 text-lime-600"
                )}
              />
              <span>Helpful ({likes})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

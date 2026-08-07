"use client";

import { useState } from "react";
import { ChevronsDownUp, ChevronsUpDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "../types";
import FAQItem from "./FAQItem";

interface FAQAccordionProps {
  faqs: readonly FAQ[];
  className?: string;
  allowExpandAll?: boolean;
}

export default function FAQAccordion({
  faqs,
  className,
  allowExpandAll = true,
}: FAQAccordionProps) {
  // Store open IDs in a Set for multi-expand support if requested, or fallback to single open
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(faqs[0]?.id ? [faqs[0].id] : [])
  );

  const isAllExpanded = faqs.length > 0 && openIds.size === faqs.length;

  const handleToggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setOpenIds(new Set());
    } else {
      setOpenIds(new Set(faqs.map((f) => f.id)));
    }
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-slate-900">
          No FAQs found
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-3xl space-y-4", className)}>
      {/* Expand / Collapse All Bar */}
      {allowExpandAll && faqs.length > 1 && (
        <div className="flex justify-end pb-1">
          <button
            type="button"
            onClick={toggleExpandAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-lime-700"
          >
            {isAllExpanded ? (
              <>
                <ChevronsDownUp className="h-3.5 w-3.5" />
                <span>Collapse All</span>
              </>
            ) : (
              <>
                <ChevronsUpDown className="h-3.5 w-3.5" />
                <span>Expand All</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* FAQ Items */}
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isOpen={openIds.has(faq.id)}
          onToggle={() => handleToggle(faq.id)}
        />
      ))}
    </div>
  );
}

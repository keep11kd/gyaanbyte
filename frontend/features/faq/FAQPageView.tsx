"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, MessageCircle, RotateCcw } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import FAQSearch from "./components/FAQSearch";
import { faqContent } from "./data";
import FAQAccordion from "./sections/FAQAccordion";
import FAQHeader from "./sections/FAQHeader";
import type { FAQCategory } from "./types";

export default function FAQPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>("All");

  // Filter logic including tags search support
  const filteredFaqs = useMemo(() => {
    return faqContent.faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuestion = faq.question.toLowerCase().includes(query);
      const matchesAnswer = faq.answer.toLowerCase().includes(query);
      const matchesTags = faq.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return matchesCategory && (matchesQuestion || matchesAnswer || matchesTags);
    });
  }, [searchQuery, selectedCategory]);

  // Compute category count map for pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: faqContent.faqs.length };
    faqContent.faqs.forEach((faq) => {
      counts[faq.category] = (counts[faq.category] || 0) + 1;
    });
    return counts;
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const isFiltered = searchQuery.trim().length > 0 || selectedCategory !== "All";

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24">
      {/* Background Decorative Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-200/30 to-emerald-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 -z-10 h-80 w-80 rounded-full bg-gradient-to-bl from-teal-200/20 to-lime-200/20 blur-3xl"
      />

      <Container size="xl">
        <FAQHeader content={faqContent} showActions={false} />

        {/* Search Bar & Category Filter Pills */}
        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          <FAQSearch value={searchQuery} onChange={setSearchQuery} />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {faqContent.categories.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-md shadow-slate-950/10"
                      : "border border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected
                        ? "bg-slate-800 text-lime-400"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Clear Notice */}
          {isFiltered && (
            <div className="flex items-center justify-between rounded-xl bg-lime-50/80 px-4 py-2 text-xs font-medium text-lime-800 border border-lime-200/50">
              <span>
                Showing <strong>{filteredFaqs.length}</strong> result
                {filteredFaqs.length !== 1 ? "s" : ""}
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-semibold text-lime-700 hover:text-lime-900 focus:outline-none"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Accordion View or Empty State */}
        <div className="mt-10">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion faqs={filteredFaqs} />
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <HelpCircle className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                No matching questions found
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                We couldn&apos;t find any FAQs matching your search query or selected category.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="border-slate-200"
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  Clear Search
                </Button>
                <Link href="/contact">
                  <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                    Ask Us Directly
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Contact Help Banner */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Need specialized project guidance?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Speak directly with our engineering mentors about your IEEE papers, custom projects, or training modules.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button
                size="lg"
                className="group border-slate-900 bg-slate-900 shadow-md transition-all duration-300 hover:bg-slate-800 text-white"
              >
                <span>Get Instant Support</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

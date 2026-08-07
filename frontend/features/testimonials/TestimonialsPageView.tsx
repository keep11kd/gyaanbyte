"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Filter,
  MessageSquarePlus,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

import { testimonialsContent } from "./data";
import TestimonialsGrid from "./sections/TestimonialsGrid";
import TestimonialsHeader from "./sections/TestimonialsHeader";
import type { TestimonialCategory, Testimonial } from "./types";

export default function TestimonialsPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TestimonialCategory>("All");

  /* Client-side Filtering Logic */
  const filteredTestimonials = useMemo<readonly Testimonial[]>(() => {
    return testimonialsContent.testimonials.filter((item) => {
      // 1. Filter by Category
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      // 2. Filter by Search Query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = item.name.toLowerCase().includes(query);
      const matchesRole = item.role.toLowerCase().includes(query);
      const matchesOrg = item.organization.toLowerCase().includes(query);
      const matchesMessage = item.message.toLowerCase().includes(query);

      return (
        matchesCategory &&
        (matchesName || matchesRole || matchesOrg || matchesMessage)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const categories = testimonialsContent.categories || [
    "All",
    "Students",
    "Professionals",
    "Academic Projects",
  ];

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24">
      {/* Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[140px]" />
      </div>

      <Container size="xl">
        {/* Header Hero Section */}
        <TestimonialsHeader
          content={testimonialsContent}
          showActions={false}
        />

        {/* Filter & Search Bar Controls */}
        <div className="mx-auto mt-12 max-w-4xl space-y-6">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search testimonials by name, role, university, or company..."
              className="w-full rounded-2xl border border-slate-200/80 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition-all focus:border-lime-500 focus:outline-hidden focus:ring-2 focus:ring-lime-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as TestimonialCategory)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm cursor-pointer",
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-950/10"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="mx-auto mt-8 max-w-7xl flex items-center justify-between border-b border-slate-200/60 pb-4">
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredTestimonials.length}</span> success stories
          </p>

          {testimonialsContent.actions?.secondary && (
            <Link href={testimonialsContent.actions.secondary.href}>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 bg-white hover:bg-slate-50"
              >
                <MessageSquarePlus className="mr-1.5 h-3.5 w-3.5 text-slate-600" />
                <span>Submit Feedback</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Main Grid or Filtered Empty State */}
        {filteredTestimonials.length > 0 ? (
          <TestimonialsGrid
            className="mt-8"
            testimonials={filteredTestimonials}
          />
        ) : (
          <div className="mx-auto mt-12 max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-600">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No Reviews Found
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              We couldn&apos;t find any review matching &quot;{searchQuery}&quot;
              {selectedCategory !== "All" && ` in ${selectedCategory}`}.
            </p>

            <Button
              onClick={handleResetFilters}
              variant="outline"
              className="mt-6 border-slate-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset All Filters
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
}

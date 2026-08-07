"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";


import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { trainingContent } from "./data";
import CategoryFilter from "./sections/CategoryFilter";
import SearchTraining from "./sections/SearchTraining";
import TrainingGrid from "./sections/TrainingGrid";
import TrainingHeader from "./sections/TrainingHeader";
import type { TrainingCategory, TrainingProgram } from "./types";

export default function TrainingPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TrainingCategory>("All");

  /* Client-side Filtering Logic */
  const filteredTrainings = useMemo<readonly TrainingProgram[]>(() => {
    return trainingContent.trainings.filter((training) => {
      // 1. Filter by Category
      const matchesCategory =
        selectedCategory === "All" ||
        training.category === selectedCategory;

      // 2. Filter by Search Query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesTitle = training.title.toLowerCase().includes(query);
      const matchesDescription = training.description
        .toLowerCase()
        .includes(query);
      const matchesCategoryName = training.category
        .toLowerCase()
        .includes(query);
      const matchesTech = training.technologies?.some((tech) =>
        tech.toLowerCase().includes(query)
      );

      return (
        matchesCategory &&
        (matchesTitle ||
          matchesDescription ||
          matchesCategoryName ||
          matchesTech)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 py-16 lg:py-24">
      {/* Ambient Radial Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[140px]" />
      </div>

      <Container size="xl">
        {/* Header Hero Section */}
        <TrainingHeader content={trainingContent} />

        {/* Live Search Input Component */}
        <SearchTraining
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={filteredTrainings.length}
        />

        {/* Category Pills Filter */}
        <CategoryFilter
          categories={trainingContent.categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Main Content Grid / Empty State */}
        {filteredTrainings.length > 0 ? (
          <TrainingGrid
            className="mt-12"
            trainings={filteredTrainings}
          />
        ) : (
          /* Empty Search Results State */
          <div className="mx-auto mt-16 max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-600">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No Training Programs Found
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              We couldn&apos;t find any training matching &quot;{searchQuery}&quot;
              {selectedCategory !== "All" && ` in ${selectedCategory}`}. Try
              searching for another skill like Java, Python, or React.
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

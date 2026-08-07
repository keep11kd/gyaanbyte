"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { trainingContent } from "../data";
import TrainingGrid from "./TrainingGrid";
import TrainingHeader from "./TrainingHeader";
import { useState } from "react";

export default function Training() {
  // Select top 3 featured or primary programs
  const featuredTrainings = trainingContent.trainings.slice(0, 3);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 lg:py-28">
      {/* Background Decorative Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/10 blur-[140px]" />
      </div>

      <Container size="xl">
        {/* Section Header */}
        <TrainingHeader content={trainingContent} />

        {/* Featured Programs Grid */}
        <TrainingGrid
          className="mt-12 lg:mt-16"
         trainings={
        expanded
            ? trainingContent.trainings
            : trainingContent.trainings.slice(0, 3)
    }
        />

        {/* Bottom Call To Action */}
        <div className="mt-14 flex flex-col items-center justify-center text-center">
          <p className="mb-4 text-sm font-medium text-slate-600">
            Looking for something else? Explore our full catalog of hands-on programs.
          </p>

         <Button
  size="lg"
  onClick={() => setExpanded((prev) => !prev)}
  className="group border-slate-900 bg-slate-900 shadow-md shadow-slate-950/10 transition-all duration-300 hover:bg-slate-800"
>
  <Sparkles className="mr-2 h-4 w-4 text-lime-400" />

  <span>
    {expanded ? "Show Less" : "View All Training Programs"}
  </span>

  <ArrowRight
    className={`ml-2 h-4 w-4 transition-transform duration-300 ${
      expanded ? "rotate-90" : "group-hover:translate-x-1"
    }`}
  />
</Button>
        </div>
      </Container>
    </section>
  );
}

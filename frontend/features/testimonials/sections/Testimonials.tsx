"use client";

import Link from "next/link";
import { ArrowRight, MessageSquarePlus, Sparkles } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { testimonialsContent } from "../data";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsHeader from "./TestimonialsHeader";

export default function Testimonials() {
  // Prefer featured testimonials for homepage showcase, fallback to top 3
  const featuredTestimonials = testimonialsContent.testimonials
    .filter((t) => t.featured)
    .slice(0, 3);

  const displayTestimonials =
    featuredTestimonials.length > 0
      ? featuredTestimonials
      : testimonialsContent.testimonials.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 lg:py-28">
      {/* Ambient Glow Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/10 blur-[140px]" />
      </div>

      <Container size="xl">
        {/* Section Header: Pass showActions={false} so buttons don't duplicate above cards */}
        <TestimonialsHeader
          content={testimonialsContent}
          showActions={false}
        />

        {/* Featured Testimonials Grid */}
        <TestimonialsGrid
          className="mt-12 lg:mt-16"
          testimonials={displayTestimonials}
        />

        {/* Bottom Call To Action Bar */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={testimonialsContent.actions.primary.href}>
            <Button
              size="lg"
              className="group border-slate-900 bg-slate-900 shadow-md shadow-slate-950/10 transition-all duration-300 hover:bg-slate-800"
            >
              <Sparkles className="mr-2 h-4 w-4 text-lime-400" />
              <span>{testimonialsContent.actions.primary.label}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          {testimonialsContent.actions.secondary && (
            <Link href={testimonialsContent.actions.secondary.href}>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-200 bg-white hover:bg-slate-50"
              >
                <MessageSquarePlus className="mr-2 h-4 w-4 text-slate-600" />
                <span>{testimonialsContent.actions.secondary.label}</span>
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}

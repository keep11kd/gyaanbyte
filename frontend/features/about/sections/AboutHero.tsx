"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { aboutContent } from "../data";

export default function AboutHero() {
  const { brand, mission } = aboutContent;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">
      {/* Neon Glow Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-500/20 to-emerald-500/10 blur-[120px]"
      />

      <Container size="xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lime-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{brand.tagline}</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About <span className="text-lime-400">{brand.name}</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
            {brand.description}
          </p>
        </div>

        {/* Mission Box */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Our Mission</span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {mission.heading}
              </h2>
              <p className="mt-4 text-sm text-slate-300 sm:text-base">
                {mission.description}
              </p>

              <div className="mt-6">
                <Link href="#team">
                  <Button size="lg" className="bg-lime-400 font-semibold text-slate-950 hover:bg-lime-300">
                    Meet the Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mission Highlights */}
            <ul className="space-y-3.5">
              {mission.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-950/50 p-3.5 text-sm font-medium text-slate-200">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-400/20 text-xs font-bold text-lime-400">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

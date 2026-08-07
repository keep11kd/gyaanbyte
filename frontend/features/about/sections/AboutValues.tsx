"use client";

import { CheckCircle2, ShieldCheck, Clock, Headphones } from "lucide-react";
import Container from "@/components/layout/Container";
import { aboutContent } from "../data";

export default function AboutValues() {
  const { values, targetAudience } = aboutContent;

  return (
    <section className="bg-slate-900 py-20 text-white lg:py-28">
      <Container size="xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Core Principles</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Our Commitments & Trust Points
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Delivering quality education and project execution with absolute transparency and commitment.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.id}
              className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition-all duration-300 hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-500/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-lime-400/30 bg-lime-400/10 text-lime-400">
                {v.id === "originality" && <ShieldCheck className="h-6 w-6" />}
                {v.id === "punctuality" && <Clock className="h-6 w-6" />}
                {v.id === "complete-support" && <Headphones className="h-6 w-6" />}
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-lime-400">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* Target Audience Segment */}
        <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-950/80 p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold text-white">Target Curriculums We Support</h3>
          <p className="mt-2 text-xs text-slate-400">Tailored technical mentorship for students across domains:</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {targetAudience.map((degree) => (
              <div key={degree} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-bold text-lime-400 shadow-xs">
                {degree}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

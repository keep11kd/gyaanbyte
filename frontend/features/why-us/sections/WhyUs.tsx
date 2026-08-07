"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { whyUsContent } from "../data/why-us.data";
import WhyUsGrid from "./WhyUsGrid";
import WhyUsHeader from "./WhyUsHeader";

interface WhyUsProps {
  className?: string;
}

export default function WhyUs({ className }: WhyUsProps) {
  return (
    <section className={`relative overflow-hidden bg-slate-50/50 py-20 lg:py-28 ${className ?? ""}`}>
      {/* Ambient Radial Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-200/30 to-emerald-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-teal-200/20 to-lime-200/20 blur-3xl"
      />

      <Container size="xl">
        {/* Header with Stats Bar */}
        <WhyUsHeader content={whyUsContent} showActions={false} showStats={true} />

        {/* Feature Cards Grid */}
        <div className="mt-16">
          <WhyUsGrid features={whyUsContent.features} columns={3} />
        </div>

        {/* Bottom CTA Banner */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8 lg:p-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="max-w-xl">
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Ready to build something extraordinary?
              </h3>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                Join hundreds of students and developers who aced their academic projects and career transitions with GyaanByte mentorship.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              {whyUsContent.actions?.primary && (
                <Link href={whyUsContent.actions.primary.href}>
                  <Button
                    size="lg"
                    className="group border-slate-900 bg-slate-900 text-white shadow-md transition-all duration-300 hover:bg-slate-800"
                  >
                    <span>{whyUsContent.actions.primary.label}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}

              {whyUsContent.actions?.secondary && (
                <Link href={whyUsContent.actions.secondary.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-emerald-600" />
                    <span>{whyUsContent.actions.secondary.label}</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

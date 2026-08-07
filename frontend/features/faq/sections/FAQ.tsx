"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { faqContent } from "../data";
import FAQAccordion from "./FAQAccordion";
import FAQHeader from "./FAQHeader";

export default function FAQ() {
  const featuredFaqs = faqContent.faqs.filter((f) => f.featured);
  const displayFaqs = featuredFaqs.length > 0 ? featuredFaqs : faqContent.faqs;

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 lg:py-28">
      {/* Background Decorative Gradients & Glow Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-200/30 to-emerald-200/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full bg-gradient-to-bl from-teal-200/20 to-lime-200/20 blur-2xl"
      />

      <Container size="xl">
        {/* Header Component */}
        <FAQHeader content={faqContent} showActions={false} />

        {/* Accordion List */}
        <FAQAccordion className="mt-12" faqs={displayFaqs} />

        {/* Bottom CTA Card Section */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900">
                Still have unanswered questions?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Can&apos;t find what you&apos;re looking for? Reach out to our technical team anytime.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              {faqContent.actions?.primary && (
                <Link href={faqContent.actions.primary.href}>
                  <Button
                    size="lg"
                    className="group border-slate-900 bg-slate-900 shadow-md transition-all duration-300 hover:bg-slate-800 text-white"
                  >
                    <span>{faqContent.actions.primary.label}</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}

              {faqContent.actions?.secondary && (
                <Link href={faqContent.actions.secondary.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <MessageCircle className="mr-2 h-4 w-4 text-slate-500" />
                    <span>{faqContent.actions.secondary.label}</span>
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

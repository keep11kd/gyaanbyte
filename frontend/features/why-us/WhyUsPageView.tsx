"use client";

import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Sparkles, X } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { whyUsContent } from "./data/why-us.data";
import WhyUsGrid from "./sections/WhyUsGrid";
import WhyUsHeader from "./sections/WhyUsHeader";

interface WhyUsPageViewProps {
  className?: string;
}

// Comparison Matrix Data
const comparisonData = [
  {
    feature: "Live System Setup & Execution",
    gyaanByte: "Guaranteed 1-on-1 via AnyDesk/Remote Desktop",
    others: "Zip file download with basic README notes",
  },
  {
    feature: "Viva & Oral Prep Support",
    gyaanByte: "Line-by-line code walk-through & mock Q&A",
    others: "No post-delivery explanation",
  },
  {
    feature: "Academic Documentation",
    gyaanByte: "Complete IEEE Synopsis, SRS, PPT & Reports",
    others: "Extra charge or low-quality templates",
  },
  {
    feature: "Bug Fixing & Guarantee",
    gyaanByte: "Unlimited setup assistance until presentation",
    others: "No post-sales support",
  },
  {
    feature: "Tech Stack Modernity",
    gyaanByte: "2025-2026 IEEE implementations & modern stacks",
    others: "Outdated legacy project code bases",
  },
];

export default function WhyUsPageView({ className }: WhyUsPageViewProps) {
  return (
    <div className={`relative overflow-hidden bg-slate-50/50 py-12 lg:py-20 ${className ?? ""}`}>
      {/* Ambient Background Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-lime-200/30 via-emerald-200/20 to-teal-200/20 blur-3xl"
      />

      <Container size="xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
          <ol className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <li>
              <Link href="/" className="transition-colors hover:text-slate-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900">Why Choose Us</li>
          </ol>
        </nav>

        {/* Page Header */}
        <WhyUsHeader content={whyUsContent} showActions={true} showStats={true} />

        {/* Main Features Grid */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Our Core Pillars of Excellence
            </h3>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Everything we do is structured around real student success and technical mastery.
            </p>
          </div>

          <WhyUsGrid features={whyUsContent.features} columns={3} />
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="mt-20 sm:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-700">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              <span>The GyaanByte Difference</span>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              How We Compare to Traditional Providers
            </h3>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              See why hundreds of engineering students switch to GyaanByte for project completion and mentorship.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-900">
                    <th className="p-4 font-bold sm:p-5">Deliverable / Feature</th>
                    <th className="bg-lime-500/10 p-4 font-extrabold text-lime-900 sm:p-5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-lime-600" />
                        <span>GyaanByte Experience</span>
                      </div>
                    </th>
                    <th className="p-4 font-bold text-slate-500 sm:p-5">Other Online Sellers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="transition-colors hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-900 sm:p-5">{row.feature}</td>
                      <td className="bg-lime-500/5 p-4 font-medium text-slate-800 sm:p-5">
                        <div className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-600" />
                          <span>{row.gyaanByte}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 sm:p-5">
                        <div className="flex items-start gap-2">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                          <span>{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Consultation CTA Banner */}
        <div className="mx-auto mt-20 max-w-4xl rounded-3xl bg-slate-900 p-8 text-white shadow-xl sm:p-12">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-lime-400">
                Guaranteed Satisfaction
              </span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Need a Custom Academic or Enterprise Solution?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Connect directly with our senior developers to discuss your project requirements, custom tech stack, or training goals.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              {whyUsContent.actions?.secondary && (
                <Link
                  href={whyUsContent.actions.secondary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="border-lime-500 bg-lime-500 text-slate-950 font-bold hover:bg-lime-400 shadow-lg"
                  >
                    <span>Schedule Free Call</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ChevronDown,
  GraduationCap,
  Layers,
  Monitor,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

interface TrainingDetailsViewProps {
  trainingId: string;
}

// Mock syllabus data structure (or dynamically matched by trainingId)
const SYLLABUS_MODULES = [
  {
    id: "mod-1",
    title: "Module 1: Core Fundamentals & Enterprise Setup",
    duration: "Week 1 - 2",
    topics: [
      "Environment setup, CLI tools, and repository architecture",
      "Core syntax, type systems, and modern paradigm patterns",
      "Dependency management & internal project structures",
    ],
  },
  {
    id: "mod-2",
    title: "Module 2: Advanced Architecture & System Design",
    duration: "Week 3 - 5",
    topics: [
      "State management, API integration, and async protocols",
      "Database schema modeling, ORM queries, and caching tiers",
      "Security best practices, auth flows, and role management",
    ],
  },
  {
    id: "mod-3",
    title: "Module 3: Hands-on Capstone & Deployment Pipeline",
    duration: "Week 6 - 8",
    topics: [
      "Building a production-ready end-to-end fullstack application",
      "CI/CD setup, containerization with Docker, and cloud hosting",
      "Performance optimization, code reviews, and mock technical interviews",
    ],
  },
];

const OUTCOMES = [
  "Master enterprise-grade patterns and codebases",
  "Build 2 real-world capstone projects for your portfolio",
  "1-on-1 resume reviews and mock technical interview preparation",
  "Official Certification of Completion to showcase on LinkedIn",
];

export default function TrainingDetailsView({
  trainingId,
}: TrainingDetailsViewProps) {
  const [openModule, setOpenModule] = useState<string>("mod-1");

  // Format training ID display name
  const formattedTitle = trainingId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 lg:py-20">
      <Container className="max-w-6xl">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-8">
          <Link href="/training">
            <Button
              variant="outline"
              size="sm"
              className="group border-slate-200/80 bg-white shadow-xs hover:bg-slate-100/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to All Trainings</span>
            </Button>
          </Link>
        </div>

        {/* Hero Banner Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900 p-8 text-white shadow-xl sm:p-12">
          {/* Ambient Glow Effects */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-semibold text-lime-400 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Enterprise Training Program</span>
            </div>

            {/* Title */}
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {formattedTitle || "Software Engineering & Architecture"}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Gain job-ready practical expertise through industry-guided
              modules, real-world project builds, and direct mentor guidance.
            </p>

            {/* Key Meta Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-slate-800 pt-6 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-lime-400" />
                <span>8 Weeks (Flexible)</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-lime-400" />
                <span>Live Interactive & Hands-on</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-lime-400" />
                <span>Verified Certification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid Content Layout */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main Left Content Area */}
          <div className="space-y-10 lg:col-span-2">
            {/* Key Outcomes Section */}
            <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-700">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  What You Will Learn & Accomplish
                </h2>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {OUTCOMES.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-sm font-medium text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-lime-600" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Interactive Curriculum Roadmap Accordion */}
            <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-500/10 text-lime-700">
                  <Layers className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Curriculum & Syllabus Breakdown
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {SYLLABUS_MODULES.map((module) => {
                  const isOpen = openModule === module.id;
                  return (
                    <div
                      key={module.id}
                      className={cn(
                        "overflow-hidden rounded-2xl border transition-all duration-300",
                        isOpen
                          ? "border-lime-500/60 bg-lime-500/5 shadow-xs"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenModule(isOpen ? "" : module.id)
                        }
                        className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-4 w-4 text-lime-600" />
                          <span className="text-base sm:text-lg">
                            {module.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="hidden text-xs font-semibold text-slate-500 sm:inline">
                            {module.duration}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-slate-500 transition-transform duration-300",
                              isOpen && "rotate-180 text-lime-700"
                            )}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="border-t border-slate-200/60 p-5 pt-3">
                          <ul className="space-y-2">
                            {module.topics.map((topic, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-slate-600"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-lime-600" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Sticky Enrollment Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
              <h3 className="text-xl font-bold text-slate-900">
                Ready to Enroll or Request Details?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Get a personalized syllabus outline, fee structure, and live session scheduling.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/request?type=training&id=${trainingId}`}
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    className="group w-full bg-slate-900 shadow-md shadow-slate-950/15 transition-all duration-300 hover:bg-slate-800"
                  >
                    <span>Request This Training</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/training" className="block w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-slate-200 hover:bg-slate-50"
                  >
                    <span>Explore Other Programs</span>
                  </Button>
                </Link>
              </div>

              {/* Guarantees List */}
              <div className="mt-8 border-t border-slate-100 pt-6 space-y-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-lime-600" />
                  <span>Small batches for direct mentor interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-lime-600" />
                  <span>100% practical, project-driven learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

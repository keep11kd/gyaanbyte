"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  FileText,
  Sparkles,
  Download,
  MessageSquare,
  Layers,
  BookOpen
} from "lucide-react";

import { Button } from "@/components/primitives/Button";
import Container from "@/components/layout/Container";
import { projectsContent } from "@/features/home/data";

interface ProjectDetailsViewProps {
  projectId: string;
}

export default function ProjectDetailsView({ projectId }: ProjectDetailsViewProps) {
  // Find project by ID or fallback to first project
const project = projectsContent.projects.find(
  (project) => project.id === projectId
);

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Project Not Found</h1>
        <p className="mt-2 text-slate-600">No project matches ID: {projectId}</p>
        <Link href="/projects" className="mt-6 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <main className="relative bg-slate-50/50 pb-20 pt-8 lg:pb-28">
      {/* Ambient Tech Mesh Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
      >
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      <Container size="xl">
        {/* Breadcrumb & Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Capstone Projects</span>
          </Link>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-2xs">
            ID: {project.id}
          </span>
        </div>

        {/* Top Header Card Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

          {/* Left Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">

            {/* Main Details Box */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-lime-400">
                  {project.category}
                </span>

                {project.ieeePaperSupported && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/20 px-3.5 py-1 text-xs font-bold text-slate-900 ring-1 ring-lime-500/30">
                    <Sparkles className="h-3.5 w-3.5 text-lime-600" />
                    IEEE Base Paper Supported
                  </span>
                )}

                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-medium text-slate-600">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-500" />
                  {project.academicBranches}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                {project.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {project.description}
              </p>

              {/* Cover Thumbnail / Diagram Banner */}
              <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-slate-400">
                    <Layers className="h-12 w-12 text-lime-500" />
                    <span className="mt-2 text-sm font-medium">Architecture Diagram & Source Code</span>
                  </div>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technologies & Frameworks Used
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-1.5 text-xs font-semibold text-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Checklist Box */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <BookOpen className="h-5 w-5 text-lime-600" />
                <span>What You Get With This Project</span>
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete end-to-end package tailored for university thesis submission and viva defense.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:bg-white hover:shadow-xs"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar CTA & Specs (4 Columns) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <div className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white shadow-xl">
              <span className="text-xs font-semibold text-lime-400 uppercase tracking-wide">
                GyaanByte Capstone Support
              </span>

              <h3 className="mt-2 text-xl font-bold">Need Guidance or Base Paper?</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Get full source code, synopsis setup, and step-by-step installation support on your machine.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/919999999999?text=Hi%20GyaanByte,%20I%20am%20interested%20in%20project:%20${encodeURIComponent(
                    project.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-lime-400 text-slate-950 font-bold hover:bg-lime-300">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Enquire on WhatsApp
                  </Button>
                </a>

                <Link href="/contact" className="block">
                  <Button variant="outline" size="lg" className="w-full border-slate-700 text-white hover:bg-slate-800">
                    <FileText className="mr-2 h-4 w-4 text-lime-400" />
                    Request Synopsis / PPT
                  </Button>
                </Link>
              </div>

              {/* Execution Specs */}
              <div className="mt-8 border-t border-slate-800 pt-6 space-y-4 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="h-4 w-4 text-lime-400" /> Estimated Timeframe
                  </span>
                  <span className="font-semibold text-white">{project.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Download className="h-4 w-4 text-lime-400" /> Source Code Access
                  </span>
                  <span className="font-semibold text-white">GitHub / Zip Download</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}

"use client";

import Link from "next/link";

import Container from "@/components/layout/Container";
import { Button } from "@/components/primitives/Button";

import { projectsContent } from "@/features/home/data";
import type { Project } from "@/features/home/types";

import {
  ProjectHero,
  ProjectSidebar,
  ProjectDeliverables,
  RelatedProjects,
} from "@/features/projects";

interface ProjectDetailsViewProps {
  projectId: string;
}
interface RelatedProjectsProps {
  currentProject: Project;
}


export default function ProjectDetailsView({
  projectId,
}: ProjectDetailsViewProps) {
  const project = projectsContent.projects.find(
    (project) => project.id === projectId
  );

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">
          Project Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          We couldn&apos;t find the requested project.
        </p>

        <Link
          href="/projects"
          className="mt-6 inline-block"
        >
          <Button variant="outline">
            Back to Projects
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <main className="relative overflow-hidden bg-slate-50 pb-20 pt-8 lg:pb-28">

      {/* Background */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[140px]" />
      </div>

      <Container size="xl">

        <div className="grid gap-10 lg:grid-cols-12">

          {/* Main Content */}

          <div className="space-y-8 lg:col-span-8">

            <ProjectHero
              project={project}
            />

            <ProjectDeliverables
              project={project}
            />

            {/* <RelatedProjects
              currentProject={project}
            /> */}

          </div>

          {/* Sidebar */}

          <div className="lg:col-span-4">

            <ProjectSidebar
              project={project}
            />

          </div>

        </div>

      </Container>

    </main>
  );
}

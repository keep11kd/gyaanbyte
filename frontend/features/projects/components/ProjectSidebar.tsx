"use client";

import Link from "next/link";
import {
  Clock,
  Download,
  FileText,
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/primitives/Button";
import type { Project } from "@/features/home/types";

interface ProjectSidebarProps {
  project: Project & {
    price?: string | number;
    duration?: string;
    complexity?: string;
  };
}

export default function ProjectSidebar({ project }: ProjectSidebarProps) {
  // Configurable contact details
  const whatsappNumber = "919999999999"; // Replace with your actual WhatsApp support number
  const prefilledMessage = `Hi GyaanByte, I need complete details and support for Project ID [${project.id}]: "${project.title}".`;

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Main Conversion CTA Card */}
      <div className="rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/10">

        {/* Support Header Badge */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-lime-400">
            <Zap className="h-3.5 w-3.5" />
            GyaanByte Academic Direct
          </span>
          <span className="rounded-full bg-lime-400/10 px-2.5 py-0.5 text-[11px] font-bold text-lime-400 ring-1 ring-lime-400/20">
            Active
          </span>
        </div>

        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white">
          Get Complete Project Package
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Get full working source code, IEEE base paper, customized documentation, viva prep questions, and remote setup assistance.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 space-y-3">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              prefilledMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="lg"
              className="w-full bg-lime-400 font-bold text-slate-950 transition-transform active:scale-[0.98] hover:bg-lime-300 shadow-md shadow-lime-400/20"
            >
              <MessageSquare className="mr-2 h-4 w-4 fill-slate-950" />
              Inquire on WhatsApp
            </Button>
          </a>

          <Link href="/contact" className="block">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-slate-700 bg-slate-800/50 font-semibold text-white transition-colors hover:bg-slate-800 hover:text-lime-300"
            >
              <FileText className="mr-2 h-4 w-4 text-lime-400" />
              Request Formal Proposal
            </Button>
          </Link>
        </div>

        {/* Technical & Delivery Specs Table */}
        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="space-y-3.5 text-xs">
            {/* Delivery Timeframe */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <Clock className="h-4 w-4 text-slate-400" />
                Est. Delivery
              </span>
              <span className="font-semibold text-slate-100">
                {project.duration || "Instant / 24 Hours"}
              </span>
            </div>

            {/* Package Inclusion */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <Download className="h-4 w-4 text-slate-400" />
                Deliverables
              </span>
              <span className="font-semibold text-lime-400">
                Code + Report + PPT
              </span>
            </div>

            {/* Support Type */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="h-4 w-4 text-slate-400" />
                Setup Guarantee
              </span>
              <span className="font-semibold text-slate-100">
                100% Working Code
              </span>
            </div>
          </div>
        </div>

        {/* Feature Highlights List */}
        <div className="mt-6 rounded-2xl bg-slate-800/60 p-3.5 ring-1 ring-slate-800">
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-lime-400" />
              <span>Full plagiarism-free report & source code</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-lime-400" />
              <span>Free AnyDesk / TeamViewer remote setup</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-lime-400" />
              <span>Viva voce Q&A guide included</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Help Box */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 text-center">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/80 text-slate-700">
          <HelpCircle className="h-4 w-4" />
        </div>
        <h4 className="mt-2 text-xs font-bold text-slate-900">
          Have Custom Requirements?
        </h4>
        <p className="mt-1 text-[11px] text-slate-500">
          We can customize features, tech stack, or modules according to your university guide&apos;s instructions.
        </p>
      </div>
    </aside>
  );
}

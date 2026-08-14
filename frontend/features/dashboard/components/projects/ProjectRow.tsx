"use client";

import { FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui";

export type ProjectStatus = "active" | "pending" | "completed";

interface ProjectRowProps {
  name: string;
  category: string;
  status: ProjectStatus;
  updatedAt: string;
}

const statusVariant: Record<ProjectStatus, "success" | "warning" | "info"> = {
  active: "success",
  pending: "warning",
  completed: "info",
};

export default function ProjectRow({
  name,
  category,
  status,
  updatedAt,
}: Readonly<ProjectRowProps>) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-xl
        border
        border-transparent
        p-3
        transition-colors
        hover:border-slate-100
        hover:bg-slate-50
      "
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <FolderKanban className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900">
          {name}
        </h3>

        <p className="mt-1 text-xs text-slate-500">{category}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs text-slate-400">Updated</p>

        <p className="mt-1 text-xs font-medium text-slate-600">{updatedAt}</p>
      </div>

      <Badge variant={statusVariant[status]} size="sm" className="capitalize">
        {status}
      </Badge>
    </div>
  );
}

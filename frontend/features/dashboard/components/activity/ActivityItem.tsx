"use client";

import { Clock } from "lucide-react";
import { Avatar, Badge } from "@/components/ui";

interface ActivityItemProps {
  title: string;
  time: string;
  category: string;
}

export default function ActivityItem({
  title,
  time,
  category,
}: Readonly<ActivityItemProps>) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        border
        border-transparent
        p-3
        transition-colors
        hover:border-slate-100
        hover:bg-slate-50
      "
    >
      <Avatar
        alt={category}
        fallback={category.charAt(0).toUpperCase()}
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-xs font-semibold text-slate-900">
            {title}
          </h4>

          <Badge variant="default" size="sm" className="shrink-0">
            {category}
          </Badge>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

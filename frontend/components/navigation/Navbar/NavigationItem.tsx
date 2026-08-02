"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavigationItem as NavigationItemType } from "@/constants/navigation";

interface NavigationItemProps {
  item: NavigationItemType;
  active: boolean;
}

export default function NavigationItem({
  item,
  active,
}: NavigationItemProps) {
  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors",
          active
            ? "text-lime-600"
            : "text-slate-700 hover:text-lime-600"
        )}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="group flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-lime-600"
    >
      {item.title}

      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
    </button>
  );
}

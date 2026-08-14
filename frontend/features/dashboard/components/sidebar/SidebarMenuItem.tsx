"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SidebarMenuItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  isCollapsed?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export default function SidebarMenuItem({
  title,
  href,
  icon: Icon,
  active = false,
  isCollapsed = false,
  badge,
  onClick,
}: Readonly<SidebarMenuItemProps>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={isCollapsed ? title : undefined}
      className={`
        group
        flex
        items-center
        gap-3.5
        rounded-xl
        px-3.5
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-150
        ${
          active
            ? "bg-indigo-50 text-indigo-600 font-semibold"
            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
        }
        ${isCollapsed ? "justify-center px-0" : ""}
      `.trim()}
    >
      <Icon
        className={`h-5 w-5 shrink-0 transition-colors ${
          active
            ? "text-indigo-600"
            : "text-slate-400 group-hover:text-slate-700"
        }`}
      />

      {!isCollapsed && (
        <>
          <span className="flex-1 truncate">{title}</span>

          {badge !== undefined && (
            <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

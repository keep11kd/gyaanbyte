"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface SidebarLogoProps {
  isCollapsed?: boolean;
}

export default function SidebarLogo({
  isCollapsed = false,
}: Readonly<SidebarLogoProps>) {
  return (
    <Link
      href="/dashboard"
      className={`
        flex
        h-20
        items-center
        gap-3.5
        border-b
        border-slate-200/80
        px-5
        transition-colors
        duration-200
        hover:bg-slate-50/80
        ${isCollapsed ? "justify-center px-0" : ""}
      `.trim()}
    >
      {/* Brand Icon Badge */}
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-indigo-600
          text-white
          shadow-sm
          shadow-indigo-100
          transition-transform
          duration-200
          hover:scale-105
        "
      >
        <GraduationCap className="h-6 w-6" />
      </div>

      {/* Brand Text Details */}
      {!isCollapsed && (
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-lg font-bold tracking-tight text-slate-900 truncate leading-snug">
            GyaanByte
          </h1>
          <p className="text-[11px] font-medium tracking-wider text-slate-500 uppercase truncate">
            Engineering Platform
          </p>
        </div>
      )}
    </Link>
  );
}

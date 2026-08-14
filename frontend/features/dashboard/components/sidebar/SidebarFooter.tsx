"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";

interface SidebarFooterProps {
  isCollapsed?: boolean;
}

export default function SidebarFooter({
  isCollapsed = false,
}: Readonly<SidebarFooterProps>) {
  return (
    <div className="border-t border-slate-200/80 p-3 space-y-2">
      {/* User Profile Card */}
      <div
        className={`
          flex
          items-center
          gap-3
          rounded-xl
          bg-slate-50
          p-2.5
          border
          border-slate-200/60
          transition-all
          ${isCollapsed ? "justify-center p-1.5 border-transparent bg-transparent" : ""}
        `.trim()}
        title={isCollapsed ? "Abdul Bari (Software Engineer)" : undefined}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white text-sm shadow-xs">
          A
        </div>

        {!isCollapsed && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <h3 className="truncate text-xs font-semibold text-slate-900 leading-tight">
              Abdul Bari
            </h3>
            <p className="truncate text-[11px] font-medium text-slate-500">
              Software Engineer
            </p>
          </div>
        )}
      </div>

      {/* Footer Navigation Actions */}
      <div className="space-y-1">
        <Link
          href="/profile"
          title={isCollapsed ? "Account Settings" : undefined}
          className={`
            flex
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-xs
            font-medium
            text-slate-600
            transition-colors
            hover:bg-slate-100/80
            hover:text-slate-900
            ${isCollapsed ? "justify-center px-0" : ""}
          `.trim()}
        >
          <Settings className="h-4.5 w-4.5 shrink-0 text-slate-500" />
          {!isCollapsed && <span>Account Settings</span>}
        </Link>

        <button
          type="button"
          title={isCollapsed ? "Sign Out" : undefined}
          className={`
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            text-xs
            font-medium
            text-red-600
            transition-colors
            hover:bg-red-50
            hover:text-red-700
            ${isCollapsed ? "justify-center px-0" : ""}
          `.trim()}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0 text-red-500" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}

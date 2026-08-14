"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  isMobileOpen?: boolean;
  isCollapsed?: boolean;
  onCloseMobile?: () => void;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  isMobileOpen = false,
  isCollapsed = false,
  onCloseMobile,
  onToggleCollapse,
}: Readonly<SidebarProps>) {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside
        className={`
          fixed
          top-0
          bottom-0
          left-0
          z-50
          flex
          flex-col
          border-r
          border-slate-200/80
          bg-white
          shadow-sm
          transition-all
          duration-300
          ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `.trim()}
      >
        {/* Desktop Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="
              hidden
              lg:flex
              absolute
              -right-3.5
              top-5
              z-10
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-xs
              transition-all
              hover:bg-slate-50
              hover:text-slate-900
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/20
            "
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Logo Header */}
        <SidebarLogo isCollapsed={isCollapsed} />

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-200">
          <SidebarMenu isCollapsed={isCollapsed} onItemClick={onCloseMobile} />
        </div>

        {/* Footer Section */}
        <SidebarFooter isCollapsed={isCollapsed} />
      </aside>
    </>
  );
}

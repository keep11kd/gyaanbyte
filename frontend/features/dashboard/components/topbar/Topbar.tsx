"use client";

import { Menu } from "lucide-react";

import SearchBar from "./SearchBar";
import NotificationMenu from "./NotificationMenu";
import UserMenu from "./UserMenu";

interface TopbarProps {
  onOpenMobileSidebar?: () => void;
}

export default function Topbar({
  onOpenMobileSidebar,
}: Readonly<TopbarProps>) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200/80
        bg-white/80
        px-4
        backdrop-blur-md
        sm:px-6
        md:px-8
      "
    >
      {/* Left Section: Mobile Menu Toggle & Search Bar */}
      <div className="flex flex-1 items-center gap-3 sm:gap-4">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-xs
              transition-colors
              hover:bg-slate-50
              hover:text-slate-900
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/20
              lg:hidden
            "
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <SearchBar />
      </div>

      {/* Right Section: Notifications & User Menu */}
      <div className="ml-4 flex items-center gap-3 sm:gap-4">
        <NotificationMenu />

        <div className="hidden h-6 w-px bg-slate-200/80 sm:block" />

        <UserMenu />
      </div>
    </header>
  );
}

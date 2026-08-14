"use client";

import { Bell } from "lucide-react";

export default function NotificationMenu() {
  const unreadCount = 3;

  return (
    <button
      type="button"
      aria-label="Notifications"
      className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        text-slate-600
        shadow-2xs
        transition-all
        duration-200
        hover:border-slate-300
        hover:bg-slate-50
        hover:text-slate-900
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500/20
      "
    >
      {/* Bell Icon */}
      <Bell className="h-5 w-5" />

      {/* Unread Badge Counter */}
      {unreadCount > 0 && (
        <>
          <span
            className="
              absolute
              -right-1
              -top-1
              z-10
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
              ring-2
              ring-white
            "
          >
            {unreadCount}
          </span>

          <span className="absolute -right-1 -top-1 h-5 w-5 animate-ping rounded-full bg-red-400/40" />
        </>
      )}
    </button>
  );
}

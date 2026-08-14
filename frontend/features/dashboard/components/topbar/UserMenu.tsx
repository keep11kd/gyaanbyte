"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

export default function UserMenu() {
  return (
    <div className="group relative">
      {/* Menu Trigger Button */}
      <button
        type="button"
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          shadow-2xs
          transition-all
          duration-200
          hover:border-slate-300
          hover:bg-slate-50
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/20
        "
      >
        <Image
          src="https://ui-avatars.com/api/?name=Abdul+Bari&background=4f46e5&color=ffffff"
          alt="User Avatar"
          width={36}
          height={36}
          unoptimized
          className="rounded-full ring-2 ring-indigo-100 object-cover"
        />

        <div className="hidden text-left lg:block">
          <h3 className="text-xs font-bold text-slate-900 leading-tight">
            Abdul Bari
          </h3>
          <p className="text-[11px] font-medium text-slate-500">
            Administrator
          </p>
        </div>

        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown Menu Container */}
      <div
        className="
          invisible
          absolute
          right-0
          z-50
          mt-2
          w-64
          rounded-2xl
          border
          border-slate-200/80
          bg-white
          opacity-0
          shadow-xl
          shadow-slate-200/50
          transition-all
          duration-200
          group-hover:visible
          group-hover:opacity-100
        "
      >
        {/* User Header Info */}
        <div className="border-b border-slate-100 bg-slate-50/50 p-4 rounded-t-2xl">
          <h3 className="text-xs font-bold text-slate-900">
            Abdul Bari
          </h3>
          <p className="mt-0.5 text-xs font-medium text-slate-500 truncate">
            abdul@example.com
          </p>
        </div>

        {/* Dropdown Navigation Actions */}
        <div className="p-1.5 space-y-0.5">
          <Link
            href="/profile"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-3.5
              py-2.5
              text-xs
              font-medium
              text-slate-600
              transition-colors
              hover:bg-slate-100/80
              hover:text-slate-900
            "
          >
            <User className="h-4 w-4 text-slate-400" />
            My Profile
          </Link>

          <Link
            href="/settings"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-3.5
              py-2.5
              text-xs
              font-medium
              text-slate-600
              transition-colors
              hover:bg-slate-100/80
              hover:text-slate-900
            "
          >
            <Settings className="h-4 w-4 text-slate-400" />
            Settings
          </Link>

          <hr className="my-1 border-slate-100" />

          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3.5
              py-2.5
              text-left
              text-xs
              font-medium
              text-red-600
              transition-colors
              hover:bg-red-50
              hover:text-red-700
            "
          >
            <LogOut className="h-4 w-4 text-red-500" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

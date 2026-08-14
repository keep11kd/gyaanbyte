"use client";

import Link from "next/link";
import {
  LogOut,
  UserCircle,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/primitives/Button";
import MobileNavigation from "./MobileNavigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function NavbarActions() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {/* Desktop CTA */}
      <div className="hidden lg:block">
        <Button>
          Book Consultation
        </Button>
      </div>

      {/* Authentication */}
      <div className="hidden items-center gap-2 lg:flex">
        {isAuthenticated && user ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
              <UserCircle className="h-5 w-5 text-slate-500" />

              <span className="max-w-[110px] truncate font-semibold">
                {user.fullName}
              </span>
            </div>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Sign out of account"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <MobileNavigation />
    </div>
  );
}

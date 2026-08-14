"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";
import type { UserRole } from "@/features/auth/types/auth.types";

/**
 * Centralized mapping of roles to their portal destinations.
 */
const ROLE_REDIRECT_ROUTES: Record<UserRole, string> = {
  ROLE_ADMIN: "/admin",
  ROLE_INSTRUCTOR: "/trainer",
  ROLE_SALES: "/sales",
  ROLE_STUDENT: "/student",
};

/**
 * Role precedence when a user has multiple roles.
 */
const ROLE_PRECEDENCE: UserRole[] = [
  "ROLE_ADMIN",
  "ROLE_INSTRUCTOR",
  "ROLE_SALES",
  "ROLE_STUDENT",
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || !user) {
      const encodedCallback = encodeURIComponent(pathname);

      router.replace(
        `/login?callbackUrl=${encodedCallback}`
      );

      return;
    }

    const matchedRole = ROLE_PRECEDENCE.find(
      (role) => user.roles.includes(role)
    );

    if (matchedRole) {
      router.replace(
        ROLE_REDIRECT_ROUTES[matchedRole]
      );

      return;
    }

    router.replace("/unauthorized");
  }, [
    isAuthenticated,
    user,
    isLoading,
    router,
    pathname,
  ]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />

        <p className="animate-pulse text-sm font-medium text-slate-500">
          Routing to your dashboard...
        </p>
      </div>
    </div>
  );
}

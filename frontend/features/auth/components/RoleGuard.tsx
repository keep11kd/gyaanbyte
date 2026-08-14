"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth.types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function RoleGuard({
  children,
  allowedRoles,
}: Readonly<RoleGuardProps>) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    isAuthenticated,
    isLoading,
    hasAnyRole,
  } = useAuth();

  const hasPermission =
    hasAnyRole(allowedRoles);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const callbackUrl = encodeURIComponent(pathname);

      router.replace(
        `/login?callbackUrl=${callbackUrl}`
      );

      return;
    }

    if (!hasPermission) {
      router.replace("/unauthorized");
    }
  }, [
    isAuthenticated,
    isLoading,
    hasPermission,
    pathname,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="animate-pulse text-sm font-medium text-slate-400">
          Verifying authorization...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !hasPermission) {
    return null;
  }

  return <>{children}</>;
}

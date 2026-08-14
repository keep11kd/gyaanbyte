"use client";

import type { ReactNode } from "react";

import DashboardShell from "./DashboardShell";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <DashboardShell>
      <div className="w-full space-y-6 animate-in fade-in-50 duration-200">
        {children}
      </div>
    </DashboardShell>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "../components/sidebar";
import { Topbar } from "../components/topbar";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: Readonly<DashboardShellProps>) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          isCollapsed={isCollapsed}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        />

        {/* Main Content Workspace */}
        <div
          className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out ${
            isCollapsed ? "lg:ml-20" : "lg:ml-72"
          }`}
        >
          {/* Top Navigation Bar */}
          <Topbar
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />

          {/* Page Workspace Area */}
          <main className="flex-1 bg-slate-50/70 px-4 py-6 sm:px-6 md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

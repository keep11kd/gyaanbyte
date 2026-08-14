"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  UserCheck,
  ShieldAlert,
  BookPlus,
  Settings,
  FileText,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import {
  adminStats,
  adminActivities,
  adminQuickActions,
  adminPerformanceData,
} from "../data/admin.data";

// Ensure these match your actual export style (default vs named).
// If your components use `export function Name`, use curly braces: `{ StatsGrid }`.
import DashboardHeader from "../components/shared/DashboardHeader";
import StatsGrid from "../components/cards/StatsGrid";
import PlatformPerformanceChart from "../components/charts/PlatformPerformanceChart";
import ActivityFeed from "../components/activity/ActivityFeed";

export default function AdminDashboard() {
  // Clean dictionary mapping for KPI icons
  const statIcons: Record<string, React.ReactNode> = {
    users: <Users className="h-5 w-5 text-indigo-600" />,
    students: <GraduationCap className="h-5 w-5 text-blue-600" />,
    trainers: <UserCheck className="h-5 w-5 text-emerald-600" />,
    approvals: <ShieldAlert className="h-5 w-5 text-amber-600" />,
  };

  const formattedStats = adminStats.map((stat) => ({
    ...stat,
    icon: statIcons[stat.icon] || <Users className="h-5 w-5 text-indigo-600" />,
  }));

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case "UserCheck":
        return <UserCheck className="h-4 w-4" />;
      case "BookPlus":
        return <BookPlus className="h-4 w-4" />;
      case "Settings":
        return <Settings className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Reusable Dashboard Header (Fixed 'href' to 'onClick') */}
      <DashboardHeader
        title="Admin Control Center"
        subtitle="Monitor platform health, verify instructors, and oversee catalog operations."
        action={{
          label: "Review Pending Approvals",
          icon: <ShieldAlert className="h-4 w-4" />,
          onClick: () => {
            window.location.href = "/dashboard/admin/approvals";
          },
        }}
      />

      {/* 2. Reusable Stats Grid */}
      <StatsGrid stats={formattedStats} />

      {/* 3. Main Dashboard Grid (Configurable Performance Chart & Quick Actions / Security) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PlatformPerformanceChart
            title="Platform Growth & Activity"
            subtitle="Active learners scaling month over month"
            data={adminPerformanceData}
          />
        </div>

        {/* Admin Quick Actions & Highlights */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Admin Quick Actions</h2>
            <div className="space-y-2.5">
              {adminQuickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className={`flex items-center justify-between rounded-xl p-3 text-xs font-semibold transition-all ${
                    action.highlight
                      ? "bg-indigo-600 text-white shadow-xs shadow-indigo-500/20 hover:bg-indigo-700"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100/80 border border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {getActionIcon(action.icon)}
                    <span>{action.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">System Security Status</h3>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              All core database nodes and authentication gateways are operating at 99.98% uptime. No anomalies detected.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Reusable Activity Feed */}
      <ActivityFeed activities={adminActivities} />
    </div>
  );
}

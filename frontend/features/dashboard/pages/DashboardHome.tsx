"use client";

import {
  GraduationCap,
  FolderKanban,
  TrendingUp,
  ArrowUpRight,
  Plus,
  BookOpen,
} from "lucide-react";

import { PlatformPerformanceChart } from "../components/charts";
import { ActivityFeed } from "../components/activity";
import { DashboardHeader } from "@/features/dashboard/components/shared";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12.5%",
    isPositive: true,
    icon: GraduationCap,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  },
  {
    title: "Active Courses",
    value: "24",
    change: "4 New",
    isPositive: true,
    icon: BookOpen,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
  },
  {
    title: "Projects Managed",
    value: "42",
    change: "+88%",
    isPositive: true,
    icon: FolderKanban,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
  },
  {
    title: "Placement Rate",
    value: "94.2%",
    change: "+3.1%",
    isPositive: true,
    icon: TrendingUp,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Java Backend Microservices Module Updated",
    time: "2 hours ago",
    category: "Training",
  },
  {
    id: 2,
    title: "New Student Batch Enrolled (Spring 2026)",
    time: "5 hours ago",
    category: "Students",
  },
  {
    id: 3,
    title: "Anti-Theft App Review Milestone Achieved",
    time: "1 day ago",
    category: "Projects",
  },
];

export default function DashboardHome() {
  const handleNewBatch = () => {
    // Add navigation or modal trigger here
    console.log("Create new batch or course clicked");
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      {/* Reusable Page Header */}
      <DashboardHeader
        title="Welcome back, Abdul Bari! 👋"
        subtitle="Here is what's happening across your GyaanByte platform today."
        action={{
          label: "New Batch / Course",
          icon: <Plus className="h-4 w-4" />,
          onClick: handleNewBatch,
        }}
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-5
                shadow-2xs
                transition-all
                hover:shadow-md
                hover:border-slate-300
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                  <Icon className="h-4.5 w-4.5 text-indigo-600" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${stat.badgeColor}`}
                >
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Performance Chart Workspace & Activity Side Feed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Live Recharts Analytics Container */}
        <div className="lg:col-span-2">
          <PlatformPerformanceChart />
        </div>

        {/* Right Side: Reusable Activity Feed Component */}
        <ActivityFeed activities={recentActivities} />
      </div>
    </div>
  );
}

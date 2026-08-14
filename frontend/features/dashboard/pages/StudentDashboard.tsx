"use client";

import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import {
  StatsGrid,
} from "../components/cards";

import {
  ActivityFeed,
} from "../components/activity";

import {
  LatestProjects,
} from "../components/projects";

import {
  DashboardHeader,
} from "../components/shared";

import {
  useStudentDashboard,
} from "../hooks/useStudentDashboard";

import type {
  StudentDashboardData,
} from "../types/student-dashboard.types";

import type {
  Project,
} from "../components/projects/LatestProjects";

function getProjectStatus(
  status: string
): "active" | "pending" | "completed" {
  const normalized =
    status.trim().toLowerCase();

  if (
    normalized.includes("complete") ||
    normalized.includes("done")
  ) {
    return "completed";
  }

  if (
    normalized.includes("progress") ||
    normalized.includes("active")
  ) {
    return "active";
  }

  return "pending";
}

function getStats(
  data: StudentDashboardData
) {
  return [
    {
      title: "Enrolled Courses",
      value: data.stats.enrolledCourses,
      change: 0,
      description: "active courses",
      icon: BookOpen,
      isPositive: true,
    },
    {
      title: "Course Progress",
      value: `${data.stats.courseProgress}%`,
      change: 0,
      description: "overall progress",
      icon: TrendingUp,
      isPositive: true,
    },
    {
      title: "Attendance",
      value: `${data.stats.attendance}%`,
      change: 0,
      description: "current attendance",
      icon: GraduationCap,
      isPositive: true,
    },
    {
      title: "Assignments",
      value: data.stats.pendingAssignments,
      change: 0,
      description: "pending submissions",
      icon: ClipboardCheck,
      isPositive:
        data.stats.pendingAssignments === 0,
    },
  ];
}

export default function StudentDashboard() {
  const {
    data,
    isLoading,
    error,
    refresh,
  } = useStudentDashboard();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <DashboardHeader
          title="Student Dashboard"
          subtitle="Loading your learning activity..."
        />

        <StatsGrid
          stats={[]}
        />

        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <DashboardHeader
          title="Student Dashboard"
          subtitle="We couldn't load your dashboard."
        />

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={() => {
              void refresh();
            }}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-8">
        <DashboardHeader
          title="Student Dashboard"
          subtitle="No dashboard data is available."
        />
      </div>
    );
  }

  const stats = getStats(data);

  const projects: Project[] =
    data.projects.map((project) => ({
      id: project.id,
      name: project.name,
      category: project.category,
      status: getProjectStatus(
        project.status
      ),
      updatedAt: "Recently",
    }));

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-200">
      <DashboardHeader
        title={`Welcome back, ${data.user.name}! 👋`}
        subtitle="Here is what's happening with your GyaanByte learning journey."
        action={{
          label: "Refresh",
          onClick: () => {
            void refresh();
          },
        }}
      />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityFeed
          activities={data.recentActivities}
        />

        <LatestProjects
          projects={projects}
        />
      </div>
    </div>
  );
}

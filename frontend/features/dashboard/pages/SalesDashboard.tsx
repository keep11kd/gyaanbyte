"use client";

import {
  BookOpen,
  CheckSquare,
  ClipboardCheck,
  GraduationCap,
  CalendarDays,
  ArrowRight,
  FolderKanban,
} from "lucide-react";

import { DashboardHeader } from "../components/shared";
import StatsGrid from "../components/cards/StatsGrid";
import ActivityFeed from "../components/activity/ActivityFeed";
import { useAuth } from "@/features/auth/hooks/useAuth";

import {
  studentStats,
  studentActivities,
  studentUpcomingClasses,
  studentProjects,
} from "../data/student.data";

export default function StudentDashboard() {
  const { user } = useAuth();

  // Personalized header title using authenticated user's first name
  const welcomeTitle = user?.firstName
    ? `Welcome back, ${user.firstName}!`
    : "Welcome back!";

  const stats = studentStats.map((stat) => {
    const iconMap = {
      courses: BookOpen,
      progress: GraduationCap,
      attendance: ClipboardCheck,
      assignments: CheckSquare,
    };

    // Fallback to BookOpen icon if key is unrecognized
    const IconComponent =
      iconMap[stat.icon as keyof typeof iconMap] || BookOpen;

    return {
      title: stat.title,
      value: stat.value,
      change: stat.change,
      isPositive: stat.isPositive,
      description: stat.description,
      icon: IconComponent,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <DashboardHeader
        title={welcomeTitle}
        subtitle="Track your learning progress, upcoming classes, assignments, and projects."
      />

      {/* Statistics */}
      <StatsGrid stats={stats} />

      {/* Upcoming Classes + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Upcoming Classes */}
        <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Upcoming Classes
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Your next learning sessions
              </p>
            </div>
            <CalendarDays className="h-4 w-4 text-slate-400" />
          </div>

          <div className="space-y-3 p-4">
            {studentUpcomingClasses.length > 0 ? (
              studentUpcomingClasses.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.trainer}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      {item.time}
                    </span>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No upcoming classes scheduled.
              </div>
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <ActivityFeed activities={studentActivities} />
      </div>

      {/* Projects */}
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              My Projects
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Track your current project progress
            </p>
          </div>
          <FolderKanban className="h-4 w-4 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          {studentProjects.length > 0 ? (
            studentProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-indigo-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {project.category}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    {project.status}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      Progress
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {project.progress}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                      style={{
                        width: project.progress,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-xs text-slate-400">
              No active projects found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

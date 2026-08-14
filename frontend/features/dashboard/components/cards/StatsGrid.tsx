"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  Users,
  type LucideIcon,
} from "lucide-react";

import StatCard, { type StatCardProps } from "./StatCard";

interface StatsGridProps {
  stats?: StatCardProps[];
}

const defaultStatistics: readonly StatCardProps[] = [
  {
    title: "Students",
    value: "2,584",
    icon: Users,
    change: 12.5,
    description: "vs last month",
  },
  {
    title: "Courses",
    value: "48",
    icon: BookOpen,
    change: 8.2,
    description: "active courses",
  },
  {
    title: "Projects",
    value: "136",
    icon: FolderKanban,
    change: 15.4,
    description: "published",
  },
  {
    title: "Services",
    value: "24",
    icon: BriefcaseBusiness,
    change: -2.3,
    description: "this month",
  },
];

export default function StatsGrid({ stats }: Readonly<StatsGridProps>) {
  const displayStats = stats ?? defaultStatistics;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {displayStats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}

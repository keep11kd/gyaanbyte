export const adminStats = [
  {
    title: "Total Users",
    value: "3,420",
    change: 12,
    description: "active platform users",
    icon: "users",
  },
  {
    title: "Students",
    value: "2,840",
    change: 15,
    description: "enrolled learners",
    icon: "students",
  },
  {
    title: "Trainers",
    value: "180",
    change: 4,
    description: "verified instructors",
    icon: "trainers",
  },
  {
    title: "Pending Approvals",
    value: "24",
    change: -5,
    description: "requires review",
    icon: "approvals",
  },
];

export const adminPerformanceData = [
  { month: "Jan", students: 1200, engagement: 68 },
  { month: "Feb", students: 1900, engagement: 72 },
  { month: "Mar", students: 2400, engagement: 76 },
  { month: "Apr", students: 2800, engagement: 81 },
  { month: "May", students: 3100, engagement: 86 },
  { month: "Jun", students: 3420, engagement: 91 },
];

export const adminActivities = [
  {
    id: 1,
    title: "New trainer profile submitted for review",
    time: "10 mins ago",
    category: "User Management",
  },
  {
    id: 2,
    title: "New course published: Advanced Java 8",
    time: "45 mins ago",
    category: "Catalog",
  },
  {
    id: 3,
    title: "Batch B-4 enrollment capacity reached",
    time: "2 hours ago",
    category: "Batches",
  },
];

export const adminQuickActions = [
  {
    name: "Approve Trainers",
    href: "/dashboard/admin/approvals",
    icon: "UserCheck",
    highlight: true,
  },
  {
    name: "Add New Course",
    href: "/dashboard/courses/new",
    icon: "BookPlus",
    highlight: false,
  },
  {
    name: "System Settings",
    href: "/dashboard/settings",
    icon: "Settings",
    highlight: false,
  },
];

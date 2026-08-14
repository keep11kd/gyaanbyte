export const trainerStats = [
  {
    title: "Active Courses",
    value: "4",
    change: "0%",
    isPositive: true,
    description: "assigned modules",
    icon: "courses",
  },
  {
    title: "Total Students",
    value: "320",
    change: "+18",
    isPositive: true,
    description: "across all batches",
    icon: "students",
  },
  {
    title: "Active Batches",
    value: "8",
    change: "+2",
    isPositive: true,
    description: "running concurrently",
    icon: "batches",
  },
  {
    title: "Pending Reviews",
    value: "12",
    change: "Action needed",
    isPositive: false,
    description: "student submissions",
    icon: "reviews",
  },
];

export const trainerActivities = [
  {
    id: 1,
    title: "Assignment graded for Abdul Bari Sheikh",
    time: "15 mins ago",
    category: "Grading",
  },
  {
    id: 2,
    title: "Live session scheduled: Microservices Architecture",
    time: "2 hours ago",
    category: "Schedule",
  },
  {
    id: 3,
    title: "Course material uploaded for Batch A",
    time: "Yesterday",
    category: "Resources",
  },
];

export const trainerQuickActions = [
  {
    name: "Grade Submissions",
    href: "/dashboard/trainer/grades",
    icon: "CheckSquare",
    highlight: true,
  },
  {
    name: "Schedule Live Session",
    href: "/dashboard/trainer/schedule",
    icon: "CalendarPlus",
    highlight: false,
  },
  {
    name: "Upload Material",
    href: "/dashboard/trainer/materials",
    icon: "Upload",
    highlight: false,
  },
];

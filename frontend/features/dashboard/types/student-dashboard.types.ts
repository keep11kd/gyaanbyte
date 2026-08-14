import type {
  ApiResponse,
  AuthUser,
} from "@/features/auth/types/auth.types";

export interface StudentDashboardStats {
  enrolledCourses: number;
  courseProgress: number;
  attendance: number;
  pendingAssignments: number;
}

export interface StudentUpcomingClass {
  id: string;
  title: string;
  time: string;
  trainer: string;
  category: string;
}

export interface StudentRecentActivity {
  id: string;
  title: string;
  time: string;
  category: string;
}

export interface StudentProject {
  id: string;
  name: string;
  progress: string;
  status: string;
  category: string;
}

export interface StudentDashboardData {
  user: AuthUser;

  stats: StudentDashboardStats;

  upcomingClasses: StudentUpcomingClass[];

  recentActivities: StudentRecentActivity[];

  projects: StudentProject[];
}

export type StudentDashboardResponse =
  ApiResponse<StudentDashboardData>;

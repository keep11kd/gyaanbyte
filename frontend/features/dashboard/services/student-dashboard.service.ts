import { apiClient } from "@/lib/api";

import type {
  StudentDashboardResponse,
} from "@/features/dashboard/types/student-dashboard.types";

export const studentDashboardService = {
  async getDashboard(): Promise<StudentDashboardResponse> {
    return apiClient<StudentDashboardResponse>(
      "/api/v1/student/dashboard",
      {
        method: "GET",
      }
    );
  },
};

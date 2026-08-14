package com.gyaanbyte.backend.features.student.dto;

import com.gyaanbyte.backend.features.auth.dto.UserResponse;

import java.util.List;

public record StudentDashboardResponse(
        UserResponse user,
        StudentStats stats,
        List<UpcomingClass> upcomingClasses,
        List<RecentActivity> recentActivities,
        List<StudentProject> projects
) {

    public record StudentStats(
            int enrolledCourses,
            int courseProgress,
            int attendance,
            int pendingAssignments
    ) {
    }

    public record UpcomingClass(
            String id,
            String title,
            String time,
            String trainer,
            String category
    ) {
    }

    public record RecentActivity(
            String id,
            String title,
            String time,
            String category
    ) {
    }

    public record StudentProject(
            String id,
            String name,
            String progress,
            String status,
            String category
    ) {
    }
}

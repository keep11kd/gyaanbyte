package com.gyaanbyte.backend.features.student.service;

import com.gyaanbyte.backend.features.student.dto.StudentDashboardResponse;

public interface StudentDashboardService {

    StudentDashboardResponse getDashboard(String email);
}

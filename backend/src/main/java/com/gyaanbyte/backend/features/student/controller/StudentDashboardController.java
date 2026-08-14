package com.gyaanbyte.backend.features.student.controller;

import com.gyaanbyte.backend.common.response.ApiResponse;
import com.gyaanbyte.backend.features.student.dto.StudentDashboardResponse;
import com.gyaanbyte.backend.features.student.service.StudentDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/student")
@RequiredArgsConstructor
@Tag(
        name = "Student",
        description = "Student portal endpoints"
)
public class StudentDashboardController {

    private final StudentDashboardService studentDashboardService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(
            summary = "Get student dashboard",
            description = "Returns dashboard information for the authenticated student."
    )
    public ApiResponse<StudentDashboardResponse> dashboard(
            Authentication authentication,
            HttpServletRequest request
    ) {

        StudentDashboardResponse response =
                studentDashboardService.getDashboard(
                        authentication.getName()
                );

        return ApiResponse.success(
                "Student dashboard retrieved successfully.",
                response,
                request.getRequestURI()
        );
    }
}
